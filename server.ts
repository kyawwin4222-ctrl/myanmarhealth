import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// OpenRouter API configuration
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "google/gemini-3.7-flash";

function getApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required.");
  }
  return apiKey;
}

// System Instruction for Traditional Medicine & Home Remedies Consultant
const ADVISOR_SYSTEM_INSTRUCTION = `
You are a highly professional, caring, and knowledgeable Burmese Traditional Medicine and Home Remedies Consultant (မြန်မာ့ရိုးရာ တိုင်းရင်းဆေးနှင့် အိမ်တွင်းကုသမှု အကြံပေးပညာရှင်).
Your goal is to provide helpful, safe, and actionable home remedy advice, herbal descriptions, and wellness suggestions in both Burmese (Unicode) and English as requested (defaulting to friendly, compassionate Burmese).

Safety rules:
1. Always begin or end with a compassionate disclaimer in Burmese explaining that your advice is for educational/informational purposes and is NOT a substitute for professional medical diagnosis or treatment (ဤအကြံပြုချက်များသည် ယေဘုယျကျန်းမာရေးဗဟုသုတအတွက်သာဖြစ်ပြီး ဆရာဝန်နှင့် တိုင်ပင်ကုသရန် လိုအပ်ချက်ကို အစားမထိုးနိုင်ပါ။).
2. If the user describes emergency/red-flag symptoms (e.g., severe chest pain, extreme difficulty breathing, persistent high fever, unconsciousness, severe bleeding, stroke symptoms, sudden paralysis), clearly advise them in bold to seek immediate professional medical attention or go to the nearest hospital (အရေးပေါ် ဆေးကုသမှု ခံယူပါ သို့မဟုတ် ဆေးရုံ/ဆေးခန်းသို့ ချက်ချင်းသွားပါ) as these are dangerous and cannot be treated at home.
3. Suggest common household herbs and natural remedies (like Ginger/ချင်း, Garlic/ကြက်သွန်ဖြူ, Turmeric/နနွင်း, Honey/ပျားရည်, Lemon/သံပရာ, Lemongrass/စပါးလင်, Neem/တမာ, Tamarind/မန်ကျည်း, Mint/ပူဒီနာ, Green Tea, etc.) and explain how they can be prepared and used safely.
4. Keep the tone warm, comforting, and informative.
5. Format your response beautifully using clear Markdown lists, bold terms, and headings.
`;

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API endpoint for Gemini advisor via OpenRouter (Streaming)
app.post("/api/gemini/advisor", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
       res.status(400).json({ error: "Message is required" });
       return;
    }

    const apiKey = getApiKey();
    
    // Build messages array in OpenAI chat format
    const chatMessages: Array<{ role: string; content: string }> = [
      { role: "system", content: ADVISOR_SYSTEM_INSTRUCTION }
    ];

    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        chatMessages.push({
          role: h.role === "user" ? "user" : "assistant",
          content: h.content
        });
      });
    }
    
    chatMessages.push({ role: "user", content: message });

    // Set SSE headers for streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
        "X-Title": "Myanmar Health - Traditional Medicine Advisor"
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: chatMessages,
        temperature: 0.7,
        stream: true,
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter API error response:", errorData);
      res.write(`data: ${JSON.stringify({ error: `API error: ${response.status}` })}\n\n`);
      res.end();
      return;
    }

    const reader = (response.body as any)?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      res.write(`data: ${JSON.stringify({ error: "No response body" })}\n\n`);
      res.end();
      return;
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      res.write(chunk);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error: any) {
    console.error("Streaming error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error?.message || "Internal Server Error" });
    } else {
      res.write(`data: ${JSON.stringify({ error: error?.message || "Internal Server Error" })}\n\n`);
      res.end();
    }
  }
});

// Setup Vite or Static assets serving
async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve index.html for all non-API paths
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

initializeServer();
