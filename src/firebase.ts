import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx-P2V-WDVHgUu-Vyd2fVsiJBnfdP3jVk",
  authDomain: "myanmar-health-9d171.firebaseapp.com",
  projectId: "myanmar-health-9d171",
  storageBucket: "myanmar-health-9d171.firebasestorage.app",
  messagingSenderId: "545541480868",
  appId: "1:545541480868:web:3fd90036bcfd510f89a131",
  measurementId: "G-ZBSXVXESPM"
};

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use local browser storage persistence so tracking prevention won't block auth state
if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn("Could not set local persistence:", err);
  });
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Google Sign-in helper with fallback
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error("Firebase Google Sign-In error:", error);
    // If popup is blocked by browser tracking prevention, fallback to redirect
    if (error.code === "auth/popup-blocked" || error.code === "auth/popup-closed-by-user") {
      try {
        await signInWithRedirect(auth, googleProvider);
        return null;
      } catch (redirectErr) {
        console.error("Redirect login error:", redirectErr);
        throw redirectErr;
      }
    }
    throw error;
  }
};

// Check for redirect result on app load
export const checkRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  } catch (error) {
    console.error("Error getting redirect result:", error);
    return null;
  }
};

// Logout helper
export const logOutUser = async () => {
  return signOut(auth);
};
