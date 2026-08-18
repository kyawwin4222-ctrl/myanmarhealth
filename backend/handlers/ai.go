package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"myanmarhealth-backend/models"
	"myanmarhealth-backend/store"
)

const (
	OpenRouterAPIURL = "https://openrouter.ai/api/v1/chat/completions"
	OpenRouterModel  = "google/gemini-3.7-flash"
)

const AdvisorSystemInstruction = `
You are a highly professional, caring, and knowledgeable Burmese Traditional Medicine and Home Remedies Consultant (မြန်မာ့ရိုးရာ တိုင်းရင်းဆေးနှင့် အိမ်တွင်းကုသမှု အကြံပေးပညာရှင်).
Your goal is to provide helpful, safe, and actionable home remedy advice, herbal descriptions, and wellness suggestions in both Burmese (Unicode) and English as requested (defaulting to friendly, compassionate Burmese).

Safety rules:
1. Always begin or end with a compassionate disclaimer in Burmese explaining that your advice is for educational/informational purposes and is NOT a substitute for professional medical diagnosis or treatment (ဤအကြံပြုချက်များသည် ယေဘုယျကျန်းမာရေးဗဟုသုတအတွက်သာဖြစ်ပြီး ဆရာဝန်နှင့် တိုင်ပင်ကုသရန် လိုအပ်ချက်ကို အစားမထိုးနိုင်ပါ။).
2. If the user describes emergency/red-flag symptoms (e.g., severe chest pain, extreme difficulty breathing, persistent high fever, unconsciousness, severe bleeding, stroke symptoms, sudden paralysis), clearly advise them in bold to seek immediate professional medical attention or go to the nearest hospital (အရေးပေါ် ဆေးကုသမှု ခံယူပါ သို့မဟုတ် ဆေးရုံ/ဆေးခန်းသို့ ချက်ချင်းသွားပါ) as these are dangerous and cannot be treated at home.
3. Suggest common household herbs and natural remedies (like Ginger/ချင်း, Garlic/ကြက်သွန်ဖြူ, Turmeric/နနွင်း, Honey/ပျားရည်, Lemon/သံပရာ, Lemongrass/စပါးလင်, Neem/တမာ, Tamarind/မန်ကျည်း, Mint/ပူဒီနာ, Green Tea, etc.) and explain how they can be prepared and used safely.
4. Keep the tone warm, comforting, and informative.
5. Format your response beautifully using clear Markdown lists, bold terms, and headings.
`

type AiHandler struct {
	store *store.Store
}

func NewAiHandler(s *store.Store) *AiHandler {
	return &AiHandler{store: s}
}

func (h *AiHandler) Advisor(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.AiAdvisorRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Message == "" {
		http.Error(w, "Message is required", http.StatusBadRequest)
		return
	}

	// 1. Suspension Check
	if req.FirebaseUID != "" {
		user, err := h.store.GetUserByFirebaseUID(req.FirebaseUID)
		if err == nil && user != nil {
			if user.Status == models.StatusSuspended {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusForbidden)
				_ = json.NewEncoder(w).Encode(map[string]string{
					"error": "အကောင့်အား ခေတ္တပိတ်ထားပါသည် (Your account is suspended from AI requests). ကျေးဇူးပြု၍ Admin သို့ ဆက်သွယ်ပါ။",
				})
				return
			}
		}
	}

	apiKey := os.Getenv("OPENROUTER_API_KEY")
	if apiKey == "" {
		http.Error(w, "OPENROUTER_API_KEY is not configured", http.StatusInternalServerError)
		return
	}

	// 2. Prepare OpenAI-compatible message array
	chatMessages := []models.ChatMessage{
		{Role: "system", Content: AdvisorSystemInstruction},
	}

	for _, h := range req.History {
		chatMessages = append(chatMessages, models.ChatMessage{
			Role:    h.Role,
			Content: h.Content,
		})
	}

	chatMessages = append(chatMessages, models.ChatMessage{
		Role:    "user",
		Content: req.Message,
	})

	openRouterReqBody := map[string]interface{}{
		"model":       OpenRouterModel,
		"messages":    chatMessages,
		"temperature": 0.7,
		"stream":      true,
	}

	jsonBytes, err := json.Marshal(openRouterReqBody)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpReq, err := http.NewRequestWithContext(r.Context(), http.MethodPost, OpenRouterAPIURL, bytes.NewBuffer(jsonBytes))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpReq.Header.Set("Content-Type", "application/json")
	httpReq.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiKey))
	httpReq.Header.Set("HTTP-Referer", os.Getenv("APP_URL"))
	httpReq.Header.Set("X-Title", "Myanmar Health - Go Backend")

	client := &http.Client{}
	resp, err := client.Do(httpReq)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to contact OpenRouter: %v", err), http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	// 3. Set SSE response headers
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("X-Accel-Buffering", "no")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
		return
	}

	buf := make([]byte, 1024)
	for {
		n, err := resp.Body.Read(buf)
		if n > 0 {
			_, _ = w.Write(buf[:n])
			flusher.Flush()
		}
		if err == io.EOF {
			break
		}
		if err != nil {
			break
		}
	}
}
