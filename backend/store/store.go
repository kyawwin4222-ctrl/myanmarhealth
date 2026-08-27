package store

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"math"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"myanmarhealth-backend/models"
)

type Store struct {
	mu          sync.RWMutex
	filePath    string
	settingPath string
	users       map[string]*models.User
	pricing     models.PricingSettings
	db          *sql.DB
}

func (s *Store) SetDatabase(db *sql.DB) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.db = db
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS users (firebase_uid TEXT PRIMARY KEY, user_data JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`)
	if err != nil { return err }
	var count int
	if err = db.QueryRow(`SELECT COUNT(*) FROM users`).Scan(&count); err != nil { return err }
	if count == 0 {
		if err = s.saveDatabase(); err != nil { return err }
	} else {
		rows, queryErr := db.Query(`SELECT user_data FROM users`)
		if queryErr != nil { return queryErr }
		defer rows.Close()
		loaded := make(map[string]*models.User)
		for rows.Next() {
			var data []byte
			if err = rows.Scan(&data); err != nil { return err }
			var user models.User
			if err = json.Unmarshal(data, &user); err != nil { return err }
			loaded[user.ID] = &user
		}
		if err = rows.Err(); err != nil { return err }
		s.users = loaded
	}
	return nil
}

func (s *Store) saveDatabase() error {
	if s.db == nil { return nil }
	for _, user := range s.users {
		data, err := json.Marshal(user)
		if err != nil { return err }
		if _, err = s.db.Exec(`INSERT INTO users (firebase_uid, user_data) VALUES ($1, $2) ON CONFLICT (firebase_uid) DO UPDATE SET user_data = EXCLUDED.user_data, updated_at = NOW()`, user.FirebaseUID, data); err != nil { return err }
	}
	return nil
}

func NewStore(filePath string) (*Store, error) {
	dir := filepath.Dir(filePath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return nil, err
	}

	settingPath := filepath.Join(dir, "settings.json")

	s := &Store{
		filePath:    filePath,
		settingPath: settingPath,
		users:       make(map[string]*models.User),
		pricing: models.PricingSettings{
			MonthlyPriceMMK: 5000,
			YearlyPriceMMK:  50000,
			KpayName:        "U Kyaw Win (ဦးကျော်ဝင်း)",
			KpayNumber:      "095106872",
			PromoNoteMm:     "နှစ်စဉ် အဖွဲ့ဝင်ယူပါက ၂ လစာ သက်သာပါသည် (Save 17%)",
			PromoNoteEn:     "Save 17% with Annual VIP billing (2 Months Free)",
		},
	}

	s.loadPricing()

	if err := s.load(); err != nil {
		// If file doesn't exist, seed initial sample data
		s.seedInitialData()
		_ = s.save()
	}

	return s, nil
}

func (s *Store) seedInitialData() {
	now := time.Now()
	oneMonth := now.AddDate(0, 1, 0)
	oneYear := now.AddDate(1, 0, 0)

	sampleUsers := []*models.User{
		{
			ID:               "admin-1",
			FirebaseUID:      "admin-firebase-uid",
			Email:            "admin@myanmarhealth.org",
			DisplayName:      "System Admin",
			PhotoURL:         "https://api.dicebear.com/7.x/bottts/svg?seed=Admin",
			Role:             models.RoleAdmin,
			Status:           models.StatusActive,
			SubscriptionTier: models.TierYearly,
			SubscriptionExpiresAt: &oneYear,
			CreatedAt:        now.AddDate(0, -2, 0),
			LastLoginAt:      now,
		},
		{
			ID:               "user-1",
			FirebaseUID:      "sample-uid-1",
			Email:            "mgmg.health@gmail.com",
			DisplayName:      "Mg Mg",
			PhotoURL:         "https://api.dicebear.com/7.x/avataaars/svg?seed=MgMg",
			Role:             models.RoleUser,
			Status:           models.StatusActive,
			SubscriptionTier: models.TierMonthly,
			SubscriptionExpiresAt: &oneMonth,
			CreatedAt:        now.AddDate(0, -1, 0),
			LastLoginAt:      now.AddDate(0, 0, -2),
		},
		{
			ID:               "user-2",
			FirebaseUID:      "sample-uid-2",
			Email:            "susu.mandalay@gmail.com",
			DisplayName:      "Su Su",
			PhotoURL:         "https://api.dicebear.com/7.x/avataaars/svg?seed=SuSu",
			Role:             models.RoleUser,
			Status:           models.StatusNew,
			SubscriptionTier: models.TierFree,
			CreatedAt:        now.AddDate(0, 0, -5),
			LastLoginAt:      now.AddDate(0, 0, -1),
		},
		{
			ID:               "user-3",
			FirebaseUID:      "sample-uid-3",
			Email:            "kyawkyaw.yangon@gmail.com",
			DisplayName:      "Kyaw Kyaw",
			PhotoURL:         "https://api.dicebear.com/7.x/avataaars/svg?seed=KyawKyaw",
			Role:             models.RoleUser,
			Status:           models.StatusSuspended,
			SubscriptionTier: models.TierFree,
			CreatedAt:        now.AddDate(0, 0, -20),
			LastLoginAt:      now.AddDate(0, 0, -3),
		},
	}

	for _, u := range sampleUsers {
		s.calculateRemainingDays(u)
		s.users[u.ID] = u
	}
}

func (s *Store) calculateRemainingDays(u *models.User) {
	if u.SubscriptionTier == models.TierFree || u.SubscriptionExpiresAt == nil {
		u.RemainingDays = 0
		return
	}

	diff := time.Until(*u.SubscriptionExpiresAt)
	if diff <= 0 {
		u.SubscriptionTier = models.TierFree
		u.SubscriptionExpiresAt = nil
		u.RemainingDays = 0
	} else {
		u.RemainingDays = int(math.Ceil(diff.Hours() / 24))
	}
}

func (s *Store) load() error {
	data, err := os.ReadFile(s.filePath)
	if err != nil {
		return err
	}

	var list []*models.User
	if err := json.Unmarshal(data, &list); err != nil {
		return err
	}

	for _, u := range list {
		s.calculateRemainingDays(u)
		s.users[u.ID] = u
	}
	return nil
}

func (s *Store) save() error {
	var list []*models.User
	for _, u := range s.users {
		s.calculateRemainingDays(u)
		list = append(list, u)
	}

	data, err := json.MarshalIndent(list, "", "  ")
	if err != nil {
		return err
	}

	if err := os.WriteFile(s.filePath, data, 0644); err != nil { return err }
	return s.saveDatabase()
}

func (s *Store) GetAllUsers() []*models.User {
	s.mu.Lock()
	defer s.mu.Unlock()

	var result []*models.User
	for _, u := range s.users {
		s.calculateRemainingDays(u)
		result = append(result, u)
	}
	return result
}

func (s *Store) GetUserByID(id string) (*models.User, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	u, exists := s.users[id]
	if !exists {
		return nil, errors.New("user not found")
	}
	s.calculateRemainingDays(u)
	return u, nil
}

func (s *Store) GetUserByFirebaseUID(uid string) (*models.User, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	for _, u := range s.users {
		if u.FirebaseUID == uid {
			s.calculateRemainingDays(u)
			return u, nil
		}
	}
	return nil, errors.New("user not found")
}

func (s *Store) SyncFirebaseUser(req models.SyncUserRequest) (*models.User, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	now := time.Now()

	const AdminEmail = "kyawwin.tm.mm@gmail.com"

	// Check if user exists by Firebase UID or Email
	for _, u := range s.users {
		if u.FirebaseUID == req.FirebaseUID || (req.Email != "" && strings.EqualFold(u.Email, req.Email)) {
			u.FirebaseUID = req.FirebaseUID
			if req.DisplayName != "" {
				u.DisplayName = req.DisplayName
			}
			if req.PhotoURL != "" {
				u.PhotoURL = req.PhotoURL
			}
			if req.Email != "" {
				u.Email = req.Email
			}
			u.LastLoginAt = now
			if u.Status == models.StatusNew {
				u.Status = models.StatusActive
			}
			// Enforce admin role strictly for kyawwin.tm.mm@gmail.com
			if strings.EqualFold(u.Email, AdminEmail) {
				u.Role = models.RoleAdmin
			}
			s.calculateRemainingDays(u)
			_ = s.save()
			return u, nil
		}
	}

	// Create new user
	newID := fmt.Sprintf("user-%d", time.Now().UnixNano())
	userRole := models.RoleUser
	if strings.EqualFold(req.Email, AdminEmail) {
		userRole = models.RoleAdmin
	}

	newUser := &models.User{
		ID:               newID,
		FirebaseUID:      req.FirebaseUID,
		Email:            req.Email,
		DisplayName:      req.DisplayName,
		PhotoURL:         req.PhotoURL,
		Role:             userRole,
		Status:           models.StatusNew,
		SubscriptionTier: models.TierFree,
		CreatedAt:        now,
		LastLoginAt:      now,
		RemainingDays:    0,
	}

	s.users[newID] = newUser
	_ = s.save()
	return newUser, nil
}

func (s *Store) DeleteUser(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, exists := s.users[id]; !exists {
		return errors.New("user not found")
	}

	delete(s.users, id)
	return s.save()
}

func (s *Store) SetSuspension(id string, suspended bool) (*models.User, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	u, exists := s.users[id]
	if !exists {
		return nil, errors.New("user not found")
	}

	if suspended {
		u.Status = models.StatusSuspended
	} else {
		u.Status = models.StatusActive
	}

	s.calculateRemainingDays(u)
	_ = s.save()
	return u, nil
}

func (s *Store) SetSubscription(id string, tier models.SubscriptionTier, days int) (*models.User, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	u, exists := s.users[id]
	if !exists {
		return nil, errors.New("user not found")
	}

	if tier == models.TierFree || days <= 0 {
		u.SubscriptionTier = models.TierFree
		u.SubscriptionExpiresAt = nil
		u.RemainingDays = 0
	} else {
		u.SubscriptionTier = tier
		expiresAt := time.Now().AddDate(0, 0, days)
		u.SubscriptionExpiresAt = &expiresAt
		s.calculateRemainingDays(u)
	}

	_ = s.save()
	return u, nil
}

func (s *Store) loadPricing() {
	data, err := os.ReadFile(s.settingPath)
	if err != nil {
		return
	}
	var p models.PricingSettings
	if err := json.Unmarshal(data, &p); err == nil {
		if p.MonthlyPriceMMK > 0 {
			s.pricing = p
		}
	}
}

func (s *Store) savePricing() error {
	data, err := json.MarshalIndent(s.pricing, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(s.settingPath, data, 0644)
}

func (s *Store) GetPricing() models.PricingSettings {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.pricing
}

func (s *Store) UpdatePricing(p models.PricingSettings) (models.PricingSettings, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if p.MonthlyPriceMMK > 0 {
		s.pricing.MonthlyPriceMMK = p.MonthlyPriceMMK
	}
	if p.YearlyPriceMMK > 0 {
		s.pricing.YearlyPriceMMK = p.YearlyPriceMMK
	}
	if p.KpayName != "" {
		s.pricing.KpayName = p.KpayName
	}
	if p.KpayNumber != "" {
		s.pricing.KpayNumber = p.KpayNumber
	}
	if p.PromoNoteMm != "" {
		s.pricing.PromoNoteMm = p.PromoNoteMm
	}
	if p.PromoNoteEn != "" {
		s.pricing.PromoNoteEn = p.PromoNoteEn
	}

	_ = s.savePricing()
	return s.pricing, nil
}

