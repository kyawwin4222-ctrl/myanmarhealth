package models

import (
	"time"
)

type UserRole string

const (
	RoleAdmin UserRole = "admin"
	RoleUser  UserRole = "user"
)

type UserStatus string

const (
	StatusNew       UserStatus = "new"
	StatusActive    UserStatus = "active"
	StatusSuspended UserStatus = "suspended"
)

type SubscriptionTier string

const (
	TierFree    SubscriptionTier = "free"
	TierMonthly SubscriptionTier = "monthly"
	TierYearly  SubscriptionTier = "yearly"
)

type User struct {
	ID                    string           `json:"id"`
	FirebaseUID           string           `json:"firebaseUid"`
	Email                 string           `json:"email"`
	DisplayName           string           `json:"displayName"`
	PhotoURL              string           `json:"photoUrl"`
	Role                  UserRole         `json:"role"`
	Status                UserStatus       `json:"status"`
	SubscriptionTier      SubscriptionTier `json:"subscriptionTier"`
	SubscriptionExpiresAt *time.Time       `json:"subscriptionExpiresAt,omitempty"`
	RemainingDays         int              `json:"remainingDays"`
	CreatedAt             time.Time        `json:"createdAt"`
	LastLoginAt           time.Time        `json:"lastLoginAt"`
}

type SyncUserRequest struct {
	FirebaseUID string `json:"firebaseUid"`
	Email       string `json:"email"`
	DisplayName string `json:"displayName"`
	PhotoURL    string `json:"photoUrl"`
}

type SuspendRequest struct {
	Suspended bool `json:"suspended"`
}

type SubscriptionUpdateRequest struct {
	Tier SubscriptionTier `json:"tier"`
	Days int              `json:"days"`
}

type PricingSettings struct {
	MonthlyPriceMMK int    `json:"monthlyPriceMmk"`
	YearlyPriceMMK  int    `json:"yearlyPriceMmk"`
	KpayName        string `json:"kpayName"`
	KpayNumber      string `json:"kpayNumber"`
	PromoNoteMm     string `json:"promoNoteMm"`
	PromoNoteEn     string `json:"promoNoteEn"`
}

type ChatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type AiAdvisorRequest struct {
	Message     string        `json:"message"`
	History     []ChatMessage `json:"history,omitempty"`
	FirebaseUID string        `json:"firebaseUid,omitempty"`
}

