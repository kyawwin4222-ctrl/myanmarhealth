import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  Crown,
  Trash2,
  Ban,
  Unlock,
  ShieldCheck,
  RefreshCw,
  PlusCircle,
  XCircle,
  Clock,
  Sparkles,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  Settings,
  DollarSign,
  Save,
  CreditCard
} from "lucide-react";
import { UserProfile } from "../context/AuthContext";

interface AdminDashboardProps {
  lang: "mm" | "en";
  onClose?: () => void;
}

interface PricingForm {
  monthlyPriceMmk: number;
  yearlyPriceMmk: number;
  kpayName: string;
  kpayNumber: string;
  promoNoteMm: string;
  promoNoteEn: string;
}

const BACKEND_URL = "";

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onClose }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<"users" | "subscriptions" | "pricing">("users");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Pricing Form State
  const [pricingForm, setPricingForm] = useState<PricingForm>({
    monthlyPriceMmk: 5000,
    yearlyPriceMmk: 50000,
    kpayName: "U Kyaw Win (ဦးကျော်ဝင်း)",
    kpayNumber: "095106872",
    promoNoteMm: "နှစ်စဉ် အဖွဲ့ဝင်ယူပါက ၂ လစာ သက်သာပါသည် (Save 17%)",
    promoNoteEn: "Save 17% with Annual VIP billing (2 Months Free)",
  });
  const [isSavingPricing, setIsSavingPricing] = useState<boolean>(false);

  // Modal for setting subscription
  const [subModalUser, setSubModalUser] = useState<UserProfile | null>(null);
  const [selectedTier, setSelectedTier] = useState<"monthly" | "yearly">("monthly");
  const [customDays, setCustomDays] = useState<number>(30);

  const fetchPricing = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/settings/pricing`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.monthlyPriceMmk) {
          setPricingForm(data);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/users`);
      if (!res.ok) throw new Error("Failed to fetch user list from Go backend");
      const data: UserProfile[] = await res.json();
      setUsers(data || []);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPricing();
  }, []);

  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPricing(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/settings/pricing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pricingForm),
      });

      if (!res.ok) throw new Error("Failed to save pricing settings");
      const data = await res.json();
      setPricingForm(data);
      showNotification(
        lang === "mm"
          ? "ဈေးနှုန်းနှင့် KPay အချက်အလက်များကို အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ"
          : "Pricing and KPay settings updated successfully!"
      );
    } catch (err: any) {
      alert(err.message || "Error saving pricing");
    } finally {
      setIsSavingPricing(false);
    }
  };

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // 1. Delete User
  const handleDeleteUser = async (user: UserProfile) => {
    const confirmMsg =
      lang === "mm"
        ? `အသုံးပြုသူ "${user.displayName || user.email}" အား Database မှ အပြီးတိုင် ဖျက်ပစ်ရန် သေချာပါသလား?`
        : `Are you sure you want to permanently delete user "${user.displayName || user.email}"?`;

    if (!window.confirm(confirmMsg)) return;

    setActionLoadingId(user.id);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/users/${user.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");

      setUsers(prev => prev.filter(u => u.id !== user.id));
      showNotification(lang === "mm" ? "အသုံးပြုသူအား ပယ်ဖျက်ပြီးပါပြီ" : "User successfully deleted");
    } catch (err: any) {
      alert(err.message || "Error deleting user");
    } finally {
      setActionLoadingId(null);
    }
  };

  // 2. Suspend / Access Toggle
  const handleToggleSuspend = async (user: UserProfile) => {
    const willSuspend = user.status !== "suspended";
    const confirmMsg = willSuspend
      ? lang === "mm"
        ? `အသုံးပြုသူ "${user.displayName}" အား AI အသုံးပြုခွင့် ပိတ် (Suspend) လိုပါသလား?`
        : `Suspend AI consultation access for "${user.displayName}"?`
      : lang === "mm"
        ? `အသုံးပြုသူ "${user.displayName}" အား ပုံမှန်အသုံးပြုခွင့် ပြန်ပေး (Access) လိုပါသလား?`
        : `Restore AI consultation access for "${user.displayName}"?`;

    if (!window.confirm(confirmMsg)) return;

    setActionLoadingId(user.id);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/users/${user.id}/suspend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suspended: willSuspend }),
      });

      if (!res.ok) throw new Error("Failed to update suspension status");
      const updated: UserProfile = await res.json();

      setUsers(prev => prev.map(u => (u.id === user.id ? updated : u)));
      showNotification(
        willSuspend
          ? lang === "mm"
            ? "အသုံးပြုသူအား Suspend ပြုလုပ်ပြီးပါပြီ"
            : "User suspended from AI requests"
          : lang === "mm"
            ? "အသုံးပြုသူအား Access ပြန်လည်ပေးအပ်ပြီးပါပြီ"
            : "User access restored"
      );
    } catch (err: any) {
      alert(err.message || "Error updating user");
    } finally {
      setActionLoadingId(null);
    }
  };

  // 3. Remove Subscription -> Becomes Free user
  const handleRemoveSubscription = async (user: UserProfile) => {
    const confirmMsg =
      lang === "mm"
        ? `"${user.displayName}" ၏ Premium Subscription ကို ပယ်ဖျက်ပြီး Free User အဖြစ် ပြောင်းလဲလိုပါသလား?`
        : `Remove subscription for "${user.displayName}" and revert tier to Free?`;

    if (!window.confirm(confirmMsg)) return;

    setActionLoadingId(user.id);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/users/${user.id}/subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: "free", days: 0 }),
      });

      if (!res.ok) throw new Error("Failed to remove subscription");
      const updated: UserProfile = await res.json();

      setUsers(prev => prev.map(u => (u.id === user.id ? updated : u)));
      showNotification(lang === "mm" ? "Subscription ပယ်ဖျက်ပြီး Free Tier သို့ ပြောင်းလဲလိုက်ပါပြီ" : "Subscription removed. User is now on Free tier.");
    } catch (err: any) {
      alert(err.message || "Error updating subscription");
    } finally {
      setActionLoadingId(null);
    }
  };

  // 4. Grant / Upgrade Subscription
  const handleGrantSubscription = async () => {
    if (!subModalUser) return;
    setActionLoadingId(subModalUser.id);
    try {
      const days = selectedTier === "yearly" ? 365 : customDays;
      const res = await fetch(`${BACKEND_URL}/api/admin/users/${subModalUser.id}/subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: selectedTier, days: days }),
      });

      if (!res.ok) throw new Error("Failed to assign subscription");
      const updated: UserProfile = await res.json();

      setUsers(prev => prev.map(u => (u.id === subModalUser.id ? updated : u)));
      setSubModalUser(null);
      showNotification(lang === "mm" ? "Subscription အောင်မြင်စွာ ထည့်သွင်းပြီးပါပြီ" : "Subscription granted successfully");
    } catch (err: any) {
      alert(err.message || "Error granting subscription");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 text-amber-800 p-3 rounded-2xl shadow-inner">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-display text-slate-800 flex items-center gap-2">
              <span>{lang === "mm" ? "Admin စီမံခန့်ခွဲမှု Dashboard" : "Admin Management Dashboard"}</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-mono px-2 py-0.5 rounded-full uppercase font-bold">
                Go Backend
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === "mm" ? "အသုံးပြုသူများနှင့် စာရင်းသွင်းမှုများကို တိုက်ရိုက် စီမံခန့်ခွဲပါ" : "Manage users, AI access suspension, and subscription tiers"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchUsers}
            disabled={isLoading}
            className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>{lang === "mm" ? "ပြန်လည်ရယူပါ" : "Refresh Data"}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="text-xs font-bold bg-teal-800 hover:bg-teal-700 text-white px-4 py-2 rounded-xl transition-all"
            >
              {lang === "mm" ? "Dashboard ပိတ်ပါ" : "Exit Admin"}
            </button>
          )}
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-2xl text-xs font-medium flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-900 px-4 py-3 rounded-2xl text-xs font-medium flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="flex gap-2 border-b border-slate-100 pb-3">
        <button
          onClick={() => setActiveAdminTab("users")}
          className={`flex items-center gap-2 py-2.5 px-5 rounded-2xl text-xs font-bold transition-all ${
            activeAdminTab === "users"
              ? "bg-teal-800 text-white shadow-md"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>{lang === "mm" ? "အသုံးပြုသူများ စီမံခန့်ခွဲမှု (User Management)" : "User Management"}</span>
          <span className="bg-teal-950/40 text-teal-100 text-[10px] px-2 py-0.5 rounded-full ml-1">
            {users.length}
          </span>
        </button>

        <button
          onClick={() => setActiveAdminTab("subscriptions")}
          className={`flex items-center gap-2 py-2.5 px-5 rounded-2xl text-xs font-bold transition-all ${
            activeAdminTab === "subscriptions"
              ? "bg-teal-800 text-white shadow-md"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Crown className="h-4 w-4" />
          <span>{lang === "mm" ? "စာရင်းသွင်းမှု စီမံခန့်ခွဲမှု (Subscription Management)" : "Subscription Management"}</span>
          <span className="bg-teal-950/40 text-teal-100 text-[10px] px-2 py-0.5 rounded-full ml-1">
            {users.filter(u => u.subscriptionTier !== "free").length} Premium
          </span>
        </button>

        <button
          onClick={() => setActiveAdminTab("pricing")}
          className={`flex items-center gap-2 py-2.5 px-5 rounded-2xl text-xs font-bold transition-all ${
            activeAdminTab === "pricing"
              ? "bg-teal-800 text-white shadow-md"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>{lang === "mm" ? "ဈေးနှုန်းနှင့် Store စီမံခန့်ခွဲခြင်း (Pricing Settings)" : "Pricing & Store Settings"}</span>
        </button>
      </div>

      {/* TAB 1: USER MANAGEMENT TABLE */}
      {activeAdminTab === "users" && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-150">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">No</th>
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Gmail</th>
                  <th className="py-3.5 px-4">Status (Suspended? New?)</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {users.map((user, idx) => {
                  const isActionLoading = actionLoadingId === user.id;

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* No */}
                      <td className="py-3.5 px-4 font-mono text-slate-400 font-semibold">{idx + 1}</td>

                      {/* Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={user.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                            alt={user.displayName}
                            className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                          />
                          <div>
                            <span className="font-bold text-slate-800 block">{user.displayName || "Anonymous"}</span>
                            {user.role === "admin" && (
                              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded font-mono">
                                ADMIN
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Gmail */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{user.email || "No email"}</td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {user.status === "suspended" ? (
                          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 font-bold px-2.5 py-1 rounded-full text-[11px]">
                            <Ban className="h-3 w-3" />
                            Suspended (No AI)
                          </span>
                        ) : user.status === "new" ? (
                          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-full text-[11px]">
                            <Sparkles className="h-3 w-3" />
                            New User
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[11px]">
                            <CheckCircle2 className="h-3 w-3" />
                            Active
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* Suspend or Access */}
                          {user.status === "suspended" ? (
                            <button
                              onClick={() => handleToggleSuspend(user)}
                              disabled={isActionLoading}
                              className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold transition-all"
                              title="Restore AI consultation access"
                            >
                              <Unlock className="h-3.5 w-3.5" />
                              <span>Access (ပြန်ဖွင့်)</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleToggleSuspend(user)}
                              disabled={isActionLoading}
                              className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-xl font-bold transition-all"
                              title="Block AI consultation requests"
                            >
                              <Ban className="h-3.5 w-3.5" />
                              <span>Suspend (ပိတ်ရန်)</span>
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteUser(user)}
                            disabled={isActionLoading}
                            className="flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-xl font-bold transition-all"
                            title="Delete profile from Database"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SUBSCRIPTION MANAGEMENT TABLE */}
      {activeAdminTab === "subscriptions" && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-150">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">No</th>
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Subscription (Monthly, Yearly, Free)</th>
                  <th className="py-3.5 px-4">Remaining Days</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {users.map((user, idx) => {
                  const isActionLoading = actionLoadingId === user.id;
                  const isPremium = user.subscriptionTier === "monthly" || user.subscriptionTier === "yearly";

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* No */}
                      <td className="py-3.5 px-4 font-mono text-slate-400 font-semibold">{idx + 1}</td>

                      {/* Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={user.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                            alt={user.displayName}
                            className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                          />
                          <div>
                            <span className="font-bold text-slate-800 block">{user.displayName || "Anonymous"}</span>
                            <span className="text-[11px] text-slate-400">{user.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Subscription Tier */}
                      <td className="py-3.5 px-4">
                        {user.subscriptionTier === "yearly" ? (
                          <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-900 font-bold px-3 py-1 rounded-full text-xs">
                            <Crown className="h-3.5 w-3.5 text-purple-600" />
                            Premium Yearly VIP
                          </span>
                        ) : user.subscriptionTier === "monthly" ? (
                          <span className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-900 font-bold px-3 py-1 rounded-full text-xs">
                            <Crown className="h-3.5 w-3.5 text-teal-700" />
                            Premium Monthly
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-full text-xs">
                            Free User
                          </span>
                        )}
                      </td>

                      {/* Remaining Days */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-mono">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          <span className={`font-bold ${isPremium ? "text-teal-800 font-sans" : "text-slate-400 font-sans"}`}>
                            {user.remainingDays > 0 ? `${user.remainingDays} Days` : "0 (No active plan)"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* If Premium: Remove subscription -> Reverts to Free */}
                          {isPremium ? (
                            <button
                              onClick={() => handleRemoveSubscription(user)}
                              disabled={isActionLoading}
                              className="flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 px-3 py-1.5 rounded-xl font-bold transition-all"
                              title="Remove Subscription (User tier becomes Free)"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              <span>Remove Subscription</span>
                            </button>
                          ) : (
                            /* If Free: Grant / Upgrade button */
                            <button
                              onClick={() => {
                                setSubModalUser(user);
                                setSelectedTier("monthly");
                                setCustomDays(30);
                              }}
                              disabled={isActionLoading}
                              className="flex items-center gap-1 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 px-3 py-1.5 rounded-xl font-bold transition-all"
                              title="Grant Premium Subscription"
                            >
                              <PlusCircle className="h-3.5 w-3.5" />
                              <span>Grant Premium</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PRICING & STORE SETTINGS */}
      {activeAdminTab === "pricing" && (
        <div className="space-y-6">
          <form onSubmit={handleSavePricing} className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-800 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-teal-700" />
                  <span>{lang === "mm" ? "Premium ဈေးနှုန်းများနှင့် ငွေပေးချေမှု အချက်အလက်များ" : "Subscription Pricing & KBZPay Configuration"}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === "mm" ? "ဤနေရာတွင် ပြောင်းလဲသတ်မှတ်လိုက်သော ဈေးနှုန်းများသည် Store Modal တွင် ချက်ချင်း ပြောင်းလဲသွားပါမည်" : "Changes made here immediately reflect in the user Store Modal."}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSavingPricing}
                className="flex items-center gap-1.5 bg-teal-800 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition-all"
              >
                <Save className="h-4 w-4" />
                <span>{isSavingPricing ? (lang === "mm" ? "သိမ်းဆည်းနေသည်..." : "Saving...") : (lang === "mm" ? "သိမ်းဆည်းမည်" : "Save Changes")}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Pricing */}
              <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                  <Crown className="h-4 w-4" />
                  <span>{lang === "mm" ? "အစီအစဉ် ဈေးနှုန်းများ (MMK)" : "Plan Prices (MMK)"}</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "mm" ? "Premium (လစဉ်) ဈေးနှုန်း (ကျပ်):" : "Monthly Plan Price (MMK):"}
                  </label>
                  <input
                    type="number"
                    value={pricingForm.monthlyPriceMmk}
                    onChange={(e) => setPricingForm({ ...pricingForm, monthlyPriceMmk: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "mm" ? "Premium (နှစ်စဉ် VIP) ဈေးနှုန်း (ကျပ်):" : "Yearly VIP Plan Price (MMK):"}
                  </label>
                  <input
                    type="number"
                    value={pricingForm.yearlyPriceMmk}
                    onChange={(e) => setPricingForm({ ...pricingForm, yearlyPriceMmk: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "mm" ? "နှစ်စဉ် ပရိုမိုးရှင်း စာသား (မြန်မာ):" : "Yearly Promo Note (Myanmar):"}
                  </label>
                  <input
                    type="text"
                    value={pricingForm.promoNoteMm}
                    onChange={(e) => setPricingForm({ ...pricingForm, promoNoteMm: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "mm" ? "နှစ်စဉ် ပရိုမိုးရှင်း စာသား (အင်္ဂလိပ်):" : "Yearly Promo Note (English):"}
                  </label>
                  <input
                    type="text"
                    value={pricingForm.promoNoteEn}
                    onChange={(e) => setPricingForm({ ...pricingForm, promoNoteEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-none"
                  />
                </div>
              </div>

              {/* Right Column: KBZPay Merchant Details */}
              <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <CreditCard className="h-4 w-4" />
                  <span>{lang === "mm" ? "KBZPay (KPay) အကောင့် အချက်အလက်များ" : "KBZPay Merchant Account"}</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "mm" ? "လက်ခံမည့် KPay အမည်:" : "KPay Account Name:"}
                  </label>
                  <input
                    type="text"
                    value={pricingForm.kpayName}
                    onChange={(e) => setPricingForm({ ...pricingForm, kpayName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "mm" ? "KPay ဖုန်းနံပါတ်:" : "KPay Phone Number:"}
                  </label>
                  <input
                    type="text"
                    value={pricingForm.kpayNumber}
                    onChange={(e) => setPricingForm({ ...pricingForm, kpayNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-blue-700 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-none"
                    required
                  />
                </div>

                <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs text-blue-900 space-y-1">
                  <span className="font-bold block">📷 QR Code Image:</span>
                  <p className="text-[11px] text-blue-800">
                    QR Code ပုံရိပ်အား <code className="bg-blue-100 px-1 py-0.5 rounded font-mono text-blue-900">/assets/QR.jpg</code> မှ အလိုအလျောက် ရယူပြသထားပါသည်။
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Grant / Change Subscription Modal */}
      {subModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 space-y-4">
            <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
              <Crown className="h-5 w-5 text-teal-700" />
              <span>Grant Subscription to {subModalUser.displayName}</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-600 block mb-1">Select Tier:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setSelectedTier("monthly"); setCustomDays(30); }}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      selectedTier === "monthly"
                        ? "bg-teal-800 text-white border-teal-800"
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    Monthly (30 days)
                  </button>
                  <button
                    onClick={() => { setSelectedTier("yearly"); setCustomDays(365); }}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      selectedTier === "yearly"
                        ? "bg-purple-800 text-white border-purple-800"
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    Yearly (365 days)
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSubModalUser(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleGrantSubscription}
                className="px-4 py-2 rounded-xl text-xs bg-teal-800 hover:bg-teal-700 text-white font-bold shadow-sm"
              >
                Confirm Grant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
