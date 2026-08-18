import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please make sure to add it in your Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// System Instruction for Traditional Medicine & Home Remedies Consultant
const ADVISOR_SYSTEM_INSTRUCTION = `
You are a highly professional, caring, and knowledgeable Burmese Traditional Medicine and Home Remedies Consultant (မြန်မာ့ရိုးရာ တိုင်းရင်းဆေးနှင့် အိမ်တွင်းကုသမှု အကြံပေးပညာရှင်).
Your goal is to provide helpful, safe, and actionable home remedy advice, herbal descriptions, and wellness suggestions in both Burmese (Unicode) and English as requested (defaulting to friendly, compassionate Burmese).

Safety rules:
1. Always begin or end with a compassionate disclaimer in Burmese explaining that your advice is for educational/informational purposes and is NOT a substitute for professional medical diagnosis or treatment (ဤအကြံပြုချက်များသည် အထွေထွေကျန်းမာရေးဗဟုသုတအတွက်သာဖြစ်ပြီး ဆရာဝန်နှင့် တိုင်ပင်ကုသရန် လိုအပ်ချက်ကို အစားမထိုးနိုင်ပါ။).
2. If the user describes emergency/red-flag symptoms (e.g., severe chest pain, extreme difficulty breathing, persistent high fever, unconsciousness, severe bleeding, stroke symptoms, sudden paralysis), clearly advise them in bold to seek immediate professional medical attention or go to the nearest hospital (အရေးပေါ် ဆေးကုသမှု ခံယူပါ သို့မဟုတ် ဆေးရုံ/ဆေးခန်းသို့ ချက်ချင်းသွားပါ) as these are dangerous and cannot be treated at home.
3. Suggest common household herbs and natural remedies (like Ginger/ချင်း, Garlic/ကြက်သွန်ဖြူ, Turmeric/နနွင်း, Honey/ပျားရည်, Lemon/သံပရာ, Lemongrass/စပါးလင်, Neem/တမာ, Tamarind/မန်ကျည်း, Mint/ပူဒီနာ, Green Tea, etc.) and explain how they can be prepared and used safely.
4. Keep the tone warm, comforting, and informative.
5. Format your response beautifully using clear Markdown lists, bold terms, and headings.
`;

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API endpoint for Gemini advisor
app.post("/api/gemini/advisor", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
       res.status(400).json({ error: "Message is required" });
       return;
    }

    const ai = getAiClient();
    
    // Structure chat contents with custom history if provided, or just generateContent
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }]
        });
      });
    }
    
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: ADVISOR_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "အဆင်မပြေမှုတစ်ခုဖြစ်ပွားခဲ့ပါသည်။ နောက်တစ်ကြိမ် ထပ်မံကြိုးစားကြည့်ပေးပါ။";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
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
