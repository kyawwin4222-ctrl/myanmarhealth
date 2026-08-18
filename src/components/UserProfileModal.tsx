import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, LogOut, Shield, Crown, Clock, AlertTriangle, CheckCircle2, Sparkles, RefreshCw } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
  onOpenStore?: () => void;
  lang: "mm" | "en";
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmin,
  onOpenStore,
  lang,
}) => {
  const { currentUser, userProfile, logout, isAdmin, isSuspended, refreshProfile } = useAuth();

  if (!isOpen || !currentUser) return null;

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "suspended":
        return (
          <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5" />
            {lang === "mm" ? "အကောင့်ပိတ်ထားသည် (Suspended)" : "Suspended"}
          </span>
        );
      case "new":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            {lang === "mm" ? "အသစ် (New)" : "New Member"}
          </span>
        );
      case "active":
      default:
        return (
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {lang === "mm" ? "ပုံမှန် (Active)" : "Active"}
          </span>
        );
    }
  };

  const getTierLabel = (tier?: string) => {
    switch (tier) {
      case "monthly":
        return lang === "mm" ? "Premium (လစဉ် - Monthly)" : "Premium (Monthly)";
      case "yearly":
        return lang === "mm" ? "Premium (နှစ်စဉ် - Yearly VIP)" : "Premium (Yearly VIP)";
      case "free":
      default:
        return lang === "mm" ? "အခမဲ့ အသုံးပြုသူ (Free Tier)" : "Free Tier";
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-950 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-teal-200 hover:text-white p-1 rounded-lg hover:bg-teal-700/50 transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || "User"}
                  className="w-16 h-16 rounded-2xl border-2 border-teal-400 shadow-md object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-teal-700 flex items-center justify-center text-teal-100 border border-teal-500/40">
                  <User className="h-8 w-8" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-white truncate">
                    {userProfile?.displayName || currentUser.displayName || "User"}
                  </h3>
                  {isAdmin && (
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-xs text-teal-200 truncate mt-0.5">{userProfile?.email || currentUser.email}</p>
                <div className="mt-2 flex items-center gap-2">{getStatusBadge(userProfile?.status)}</div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5">
            {/* Suspension Warning Notice */}
            {isSuspended && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-rose-900">
                <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <span className="font-bold">{lang === "mm" ? "အကောင့်ခေတ္တပိတ်ခံထားရသည်: " : "Account Suspended: "}</span>
                  {lang === "mm"
                    ? "သင်၏အကောင့်သည် Admin မှ AI မေးမြန်းခွင့် ပိတ်ထားပါသည်။ အသေးစိတ်သိရှိလိုပါက Admin သို့ ဆက်သွယ်ပါ။"
                    : "Your account is temporarily suspended from sending AI consultation requests by an Admin."}
                </div>
              </div>
            )}

            {/* Subscription Card */}
            <div className="bg-gradient-to-br from-slate-50 to-teal-50/40 rounded-2xl p-5 border border-teal-100/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-teal-800 text-teal-100 p-2 rounded-xl">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {lang === "mm" ? "စာရင်းသွင်းမှု အဆင့်" : "Subscription Plan"}
                    </h4>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">
                      {getTierLabel(userProfile?.subscriptionTier)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-teal-800 font-bold bg-teal-100/70 px-2.5 py-1 rounded-lg">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {userProfile?.remainingDays && userProfile.remainingDays > 0
                        ? `${userProfile.remainingDays} ${lang === "mm" ? "ရက် ကျန်ရှိ" : "Days Left"}`
                        : lang === "mm" ? "သက်တမ်းကုန် / အခမဲ့" : "Free / No Expiry"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200/60 pt-3 flex items-center justify-between text-xs text-slate-500">
                <span>{lang === "mm" ? "အဖွဲ့ဝင်စတင်သည့်ရက်" : "Member Since"}:</span>
                <span className="font-medium text-slate-700">
                  {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : "Today"}
                </span>
              </div>

              {/* Upgrade / Store Button */}
              {onOpenStore && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenStore();
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <Crown className="h-4 w-4 fill-slate-950" />
                  <span>{lang === "mm" ? "Premium အဆင့်မြှင့်တင်ရန် (Store)" : "Upgrade / Renew Plan"}</span>
                </button>
              )}
            </div>

            {/* Admin Dashboard Quick Access (Visible only if Admin: kyawwin.tm.mm@gmail.com) */}
            {isAdmin && onOpenAdmin && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="w-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Shield className="h-4 w-4 text-amber-700" />
                <span>{lang === "mm" ? "Admin Dashboard သို့ သွားမည်" : "Open Admin Dashboard"}</span>
              </button>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-3">
              <button
                onClick={() => refreshProfile()}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-800 p-2 rounded-xl hover:bg-slate-100 transition-all"
                title="Refresh Status"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>{lang === "mm" ? "အချက်အလက် ပြန်ဖွင့်ပါ" : "Refresh"}</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold py-2.5 px-4 rounded-xl transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span>{lang === "mm" ? "အကောင့်ထွက်မည်" : "Sign Out"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
