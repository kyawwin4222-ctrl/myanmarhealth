import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Sparkles, Heart, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "mm" | "en";
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, lang }) => {
  const { loginWithGoogle, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 relative"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 p-6 text-white text-center relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-teal-200 hover:text-white p-1 rounded-lg hover:bg-teal-700/50 transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-teal-700/60 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 shadow-inner text-teal-100">
              <Sparkles className="h-6 w-6" />
            </div>

            <h3 className="font-display font-bold text-xl text-white">
              {lang === "mm" ? "အကောင့်ဝင်ရောက်ရန်" : "Sign In to Myanmar Health"}
            </h3>
            <p className="text-xs text-teal-200 mt-1">
              {lang === "mm"
                ? "ရိုးရာဆေးနည်းများနှင့် AI အကြံပေးစနစ်ကို အပြည့်အဝ အသုံးပြုပါ"
                : "Unlock full access to traditional remedies and AI consultant"}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {/* Feature Perks */}
            <div className="bg-teal-50/50 rounded-2xl p-4 border border-teal-100/60 space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-teal-900 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{lang === "mm" ? "Gemini AI ဆေးကုသမှု အကြံပေးချက်များ ရယူနိုင်ခြင်း" : "Personalized Gemini AI traditional medicine consultations"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-teal-900 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{lang === "mm" ? "မိမိနှစ်သက်သော ဆေးဖက်ဝင်အပင်များကို မှတ်သားထားနိုင်ခြင်း" : "Bookmark favorite herbs and emergency guides"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-teal-900 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{lang === "mm" ? "Premium ဝန်ဆောင်မှုနှင့် တိုင်ပင်ဆွေးနွေးမှု မှတ်တမ်းများ" : "Manage Premium subscription and query history"}</span>
              </div>
            </div>

            {/* Google Sign-in Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3.5 px-4 rounded-2xl border border-slate-300 shadow-sm hover:shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {/* Google SVG Icon */}
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{lang === "mm" ? "Google ဖြင့် အကောင့်ဝင်ရန် / ဖွင့်ရန်" : "Continue with Google"}</span>
            </button>

            {/* Privacy notice */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
              <span>{lang === "mm" ? "Firebase Google Sign-In ဖြင့် လုံခြုံစွာ ချိတ်ဆက်ထားပါသည်" : "Protected by Firebase Google Authentication"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
