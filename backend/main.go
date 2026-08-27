package main

import (
	"bufio"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	_ "github.com/lib/pq"
	"myanmarhealth-backend/handlers"
	"myanmarhealth-backend/store"
)

func loadEnvFile(paths ...string) {
	for _, path := range paths {
		file, err := os.Open(path)
		if err != nil {
			continue
		}
		defer file.Close()

		scanner := bufio.NewScanner(file)
		for scanner.Scan() {
			line := strings.TrimSpace(scanner.Text())
			if line == "" || strings.HasPrefix(line, "#") {
				continue
			}
			parts := strings.SplitN(line, "=", 2)
			if len(parts) == 2 {
				key := strings.TrimSpace(parts[0])
				val := strings.Trim(strings.TrimSpace(parts[1]), "\"'")
				if os.Getenv(key) == "" {
					os.Setenv(key, val)
				}
			}
		}
	}
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	// Load environment variables from .env or parent directory
	loadEnvFile(".env", "../.env", filepath.Join("..", ".env"))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Initialize data store
	dataPath := filepath.Join("data", "users.json")
	userStore, err := store.NewStore(dataPath)
	if err != nil {
		log.Fatalf("Failed to initialize data store: %v", err)
	}

	authHandler := handlers.NewAuthHandler(userStore)
	adminHandler := handlers.NewAdminHandler(userStore)
	var db *sql.DB
	if databaseURL := os.Getenv("DATABASE_URL"); databaseURL != "" {
		db, err = sql.Open("postgres", databaseURL)
		if err != nil {
			log.Fatalf("Failed to open PostgreSQL: %v", err)
		}
		for attempt := 1; attempt <= 30; attempt++ {
			if err = db.Ping(); err == nil {
				break
			}
			if attempt == 30 {
				log.Fatalf("Failed to connect PostgreSQL after %d attempts: %v", attempt, err)
			}
			log.Printf("Waiting for PostgreSQL (%d/30): %v", attempt, err)
			time.Sleep(2 * time.Second)
		}
		_, err = db.Exec(`CREATE TABLE IF NOT EXISTS chat_history (id BIGSERIAL PRIMARY KEY, firebase_uid TEXT NOT NULL, user_message TEXT NOT NULL, ai_response TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`)
		if err != nil {
			log.Fatalf("Failed to initialize chat history: %v", err)
		}
		if err = userStore.SetDatabase(db); err != nil {
			log.Fatalf("Failed to initialize users database: %v", err)
		}
		defer db.Close()
	}
	aiHandler := handlers.NewAiHandler(userStore, db)

	mux := http.NewServeMux()

	// Health check
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"ok","runtime":"golang","version":"1.22+"}`)
	})

	// Auth Endpoints
	mux.HandleFunc("/api/auth/sync", authHandler.SyncUser)
	mux.HandleFunc("/api/auth/profile", authHandler.GetProfile)

	// Admin Endpoints
	mux.HandleFunc("/api/admin/users", adminHandler.ListUsers)
	mux.HandleFunc("/api/admin/users/", adminHandler.HandleUserRoutes)

	// Pricing & Store Settings
	mux.HandleFunc("/api/settings/pricing", adminHandler.GetPricingSettings)
	mux.HandleFunc("/api/admin/settings/pricing", adminHandler.UpdatePricingSettings)

	// AI Advisor Endpoint
	mux.HandleFunc("/api/gemini/advisor", aiHandler.Advisor)

	handler := corsMiddleware(mux)

	fmt.Printf("🚀 Go Backend Server running on http://0.0.0.0:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
