package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"myanmarhealth-backend/models"
	"myanmarhealth-backend/store"
)

type AdminHandler struct {
	store *store.Store
}

func NewAdminHandler(s *store.Store) *AdminHandler {
	return &AdminHandler{store: s}
}

// ListUsers returns all users in the system
func (h *AdminHandler) ListUsers(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	users := h.store.GetAllUsers()
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(users)
}

// HandleUserRoutes handles individual user operations like Suspend, Delete, and Subscription
func (h *AdminHandler) HandleUserRoutes(w http.ResponseWriter, r *http.Request) {
	// Expected paths:
	// /api/admin/users/{id}
	// /api/admin/users/{id}/suspend
	// /api/admin/users/{id}/subscription

	path := strings.TrimPrefix(r.URL.Path, "/api/admin/users/")
	parts := strings.Split(path, "/")

	if len(parts) == 0 || parts[0] == "" {
		http.Error(w, "User ID required", http.StatusBadRequest)
		return
	}

	userID := parts[0]

	// 1. DELETE /api/admin/users/{id}
	if len(parts) == 1 && r.Method == http.MethodDelete {
		if err := h.store.DeleteUser(userID); err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]string{"message": "User deleted successfully", "id": userID})
		return
	}

	// 2. POST /api/admin/users/{id}/suspend
	if len(parts) == 2 && parts[1] == "suspend" && r.Method == http.MethodPost {
		var req models.SuspendRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		user, err := h.store.SetSuspension(userID, req.Suspended)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(user)
		return
	}

	// 3. POST /api/admin/users/{id}/subscription
	if len(parts) == 2 && parts[1] == "subscription" && r.Method == http.MethodPost {
		var req models.SubscriptionUpdateRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		user, err := h.store.SetSubscription(userID, req.Tier, req.Days)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(user)
		return
	}

	http.Error(w, "Not found", http.StatusNotFound)
}

// GetPricingSettings returns current pricing and KBZPay merchant info
func (h *AdminHandler) GetPricingSettings(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	p := h.store.GetPricing()
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(p)
}

// UpdatePricingSettings updates pricing and KBZPay merchant info
func (h *AdminHandler) UpdatePricingSettings(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.PricingSettings
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	updated, err := h.store.UpdatePricing(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(updated)
}

