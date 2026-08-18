import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, logOutUser } from "../firebase";

export interface UserProfile {
  id: string;
  firebaseUid: string;
  email: string;
  displayName: string;
  photoUrl: string;
  role: "admin" | "user";
  status: "new" | "active" | "suspended";
  subscriptionTier: "free" | "monthly" | "yearly";
  subscriptionExpiresAt?: string;
  remainingDays: number;
  createdAt: string;
  lastLoginAt: string;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  isSuspended: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const BACKEND_URL = "http://localhost:8080";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const syncedUidRef = useRef<string | null>(null);

  const syncWithBackend = async (fbUser: FirebaseUser) => {
    if (syncedUidRef.current === fbUser.uid && userProfile) {
      return;
    }
    syncedUidRef.current = fbUser.uid;

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUid: fbUser.uid,
          email: fbUser.email || "",
          displayName: fbUser.displayName || "User",
          photoUrl: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.uid}`,
        }),
      });

      if (res.ok) {
        const profile: UserProfile = await res.json();
        setUserProfile(profile);
      }
    } catch (err) {
      console.error("Failed to sync user with Go backend:", err);
    }
  };

  const refreshProfile = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/profile?uid=${currentUser.uid}`);
      if (res.ok) {
        const profile: UserProfile = await res.json();
        setUserProfile(profile);
      }
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setCurrentUser(fbUser);
      if (fbUser) {
        await syncWithBackend(fbUser);
      } else {
        syncedUidRef.current = null;
        setUserProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const fbUser = await signInWithGoogle();
      if (fbUser) {
        await syncWithBackend(fbUser);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await logOutUser();
    syncedUidRef.current = null;
    setUserProfile(null);
    setCurrentUser(null);
  };

  const ADMIN_EMAIL = "kyawwin.tm.mm@gmail.com";
  const isAdmin =
    (currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() ||
     userProfile?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() ||
     userProfile?.role === "admin") &&
    (currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() ||
     userProfile?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
  const isSuspended = userProfile?.status === "suspended";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        isLoading,
        isAdmin,
        isSuspended,
        loginWithGoogle,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
