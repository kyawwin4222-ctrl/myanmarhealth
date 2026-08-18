import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Crown,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  QrCode,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  HelpCircle,
  Zap,
  Star
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "mm" | "en";
}

interface PricingInfo {
  monthlyPriceMmk: number;
  yearlyPriceMmk: number;
  kpayName: string;
  kpayNumber: string;
  promoNoteMm: string;
  promoNoteEn: string;
}

const BACKEND_URL = "";

export const StoreModal: React.FC<StoreModalProps> = ({ isOpen, onClose, lang }) => {
  const { userProfile, currentUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");
  const [copiedNumber, setCopiedNumber] = useState<boolean>(false);
  const [pricing, setPricing] = useState<PricingInfo>({
    monthlyPriceMmk: 5000,
    yearlyPriceMmk: 50000,
    kpayName: "U Kyaw Win (ဦးကျော်ဝင်း)",
    kpayNumber: "095106872",
    promoNoteMm: "နှစ်စဉ် အဖွဲ့ဝင်ယူပါက ၂ လစာ သက်သာပါသည် (Save 17%)",
    promoNoteEn: "Save 17% with Annual VIP billing (2 Months Free)",
  });

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/settings/pricing`)
      .then(res => res.json())
      .then(data => {
        if (data && data.monthlyPriceMmk) {
          setPricing(data);
        }
      })
      .catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyKpay = () => {
    navigator.clipboard.writeText(pricing.kpayNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const selectedPrice =
    selectedPlan === "yearly"
      ? pricing.yearlyPriceMmk.toLocaleString()
      : pricing.monthlyPriceMmk.toLocaleString();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-100 my-auto"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-950 p-5 sm:p-6 text-white relative shrink-0">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-teal-200 hover:text-white p-1.5 rounded-xl hover:bg-teal-800/60 transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg shrink-0">
                <Crown className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-300/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Myanmar Health Store
                </span>
                <h3 className="font-display font-bold text-lg sm:text-2xl text-white mt-1">
                  {lang === "mm" ? "Premium စာရင်းသွင်းခြင်း အစီအစဉ်များ" : "Upgrade to Premium Membership"}
                </h3>
                <p className="text-xs text-teal-200 mt-0.5">
                  {lang === "mm"
                    ? "AI အကြံပေးချက်များ ကန့်သတ်ချက်မရှိ မေးမြန်းနိုင်ပြီး VIP ဝန်ဆောင်မှု ရယူပါ"
                    : "Unlimited Gemini AI health consults & priority support"}
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
            
            {/* Current Plan Status (if user is logged in) */}
            {currentUser && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                    {lang === "mm" ? "လက်ရှိ အသုံးပြုနေသော အဆင့်" : "Current Plan"}
                  </span>
                  <span className="font-bold text-slate-800 text-sm capitalize">
                    {userProfile?.subscriptionTier === "yearly"
                      ? "Premium Yearly VIP"
                      : userProfile?.subscriptionTier === "monthly"
                      ? "Premium Monthly"
                      : "Free Tier (အခမဲ့)"}
                  </span>
                </div>
                {userProfile?.remainingDays && userProfile.remainingDays > 0 ? (
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                    {userProfile.remainingDays} {lang === "mm" ? "ရက် ကျန်ရှိ" : "Days remaining"}
                  </span>
                ) : null}
              </div>
            )}

            {/* Plan Selection Cards */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-teal-700" />
                <span>{lang === "mm" ? "အစီအစဉ် ရွေးချယ်ပါ (Select a Plan)" : "Choose Your Plan"}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Monthly Plan */}
                <div
                  onClick={() => setSelectedPlan("monthly")}
                  className={`relative p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPlan === "monthly"
                      ? "border-teal-700 bg-teal-50/40 shadow-md ring-2 ring-teal-700/20"
                      : "border-slate-200 hover:border-teal-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-800">
                      {lang === "mm" ? "Premium (လစဉ်)" : "Premium Monthly"}
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === "monthly" ? "border-teal-700 bg-teal-700 text-white" : "border-slate-300"}`}>
                      {selectedPlan === "monthly" && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 my-2">
                    <span className="text-2xl font-bold text-teal-900 font-sans">{pricing.monthlyPriceMmk.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-medium">{lang === "mm" ? "ကျပ် / (၁) လ" : "MMK / Month"}</span>
                  </div>

                  <ul className="text-xs text-slate-600 space-y-1.5 mt-3 border-t border-slate-100 pt-2.5">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-700 shrink-0" />
                      <span>{lang === "mm" ? "ရက် ၃၀ AI အကြံပေး မေးမြန်းခွင့်" : "30 Days AI Access"}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-700 shrink-0" />
                      <span>{lang === "mm" ? "မြန်မာ့ရိုးရာ ဆေးနည်းအစုံအလင်" : "Full Remedy Catalog"}</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Yearly VIP Plan */}
                <div
                  onClick={() => setSelectedPlan("yearly")}
                  className={`relative p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPlan === "yearly"
                      ? "border-amber-600 bg-gradient-to-br from-amber-50/60 to-teal-50/40 shadow-md ring-2 ring-amber-500/20"
                      : "border-slate-200 hover:border-amber-300 bg-white"
                  }`}
                >
                  {/* Badge */}
                  <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <Star className="h-3 w-3 fill-slate-950" />
                    {lang === "mm" ? "အသက်သာဆုံး (Best Value)" : "Best Value"}
                  </span>

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1">
                      <Crown className="h-4 w-4 text-amber-600" />
                      {lang === "mm" ? "Premium (နှစ်စဉ် VIP)" : "Premium Yearly VIP"}
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === "yearly" ? "border-amber-600 bg-amber-600 text-white" : "border-slate-300"}`}>
                      {selectedPlan === "yearly" && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 my-2">
                    <span className="text-2xl font-bold text-amber-900 font-sans">{pricing.yearlyPriceMmk.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-medium">{lang === "mm" ? "ကျပ် / (၁) နှစ်" : "MMK / Year"}</span>
                  </div>

                  <div className="text-[11px] font-bold text-amber-800 bg-amber-100/70 py-0.5 px-2 rounded-md mb-2 inline-block">
                    {lang === "mm" ? pricing.promoNoteMm : pricing.promoNoteEn}
                  </div>

                  <ul className="text-xs text-slate-600 space-y-1.5 border-t border-amber-100 pt-2.5">
                    <li className="flex items-center gap-1.5 font-medium text-slate-800">
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span>{lang === "mm" ? "ရက် ၃၆၅ VIP အသုံးပြုခွင့် (၂ လစာ အခမဲ့)" : "365 Days VIP Access (2 Months Free)"}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span>{lang === "mm" ? "ဦးစားပေး AI အကြံပေး မြန်နှုန်း" : "Priority AI Response Speed"}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Payment Method Section (KBZPay Only) */}
            <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 rounded-3xl p-5 sm:p-6 border border-blue-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-blue-100/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 text-white p-2 rounded-xl shadow-xs">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">
                      {lang === "mm" ? "KBZPay (KPay) ဖြင့် ငွေလွှဲပေးချေရန်" : "Payment via KBZPay (KPay)"}
                    </h4>
                    <span className="text-[11px] text-blue-700 font-medium">
                      {lang === "mm" ? "တိုက်ရိုက် ငွေလွှဲ သို့မဟုတ် QR Scan ဖတ်နိုင်ပါသည်" : "Direct Transfer or Scan QR code"}
                    </span>
                  </div>
                </div>

                <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  KPay Only
                </span>
              </div>

              {/* QR and Account Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                {/* Left: QR Code from assets */}
                <div className="bg-white p-3 rounded-2xl border border-blue-100 shadow-xs flex flex-col items-center text-center">
                  <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-50 flex items-center justify-center">
                    <img
                      src="/assets/QR.jpg"
                      alt="KBZPay QR Code"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback in case image format is different
                        (e.target as HTMLImageElement).src = "/assets/QR.png";
                      }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium mt-2 flex items-center gap-1">
                    <QrCode className="h-3.5 w-3.5 text-blue-600" />
                    {lang === "mm" ? "KPay အက်ပ်ဖြင့် Scan ဖတ်ပါ" : "Scan with KBZPay App"}
                  </span>
                </div>

                {/* Right: Account details */}
                <div className="space-y-3">
                  {/* Account Name */}
                  <div className="bg-white p-3 rounded-xl border border-blue-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      {lang === "mm" ? "လက်ခံမည့် KPay အမည်" : "Account Name"}
                    </span>
                    <span className="font-bold text-slate-800 text-sm">
                      {pricing.kpayName}
                    </span>
                  </div>

                  {/* Account Number with Copy */}
                  <div className="bg-white p-3 rounded-xl border border-blue-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        {lang === "mm" ? "KPay ဖုန်းနံပါတ်" : "KPay Number"}
                      </span>
                      <span className="font-mono font-bold text-base text-blue-700">
                        {pricing.kpayNumber}
                      </span>
                    </div>

                    <button
                      onClick={handleCopyKpay}
                      className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-blue-200"
                    >
                      {copiedNumber ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{lang === "mm" ? "ကူးပြီး" : "Copied"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>{lang === "mm" ? "ကူးယူမည်" : "Copy"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Amount to transfer */}
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-center justify-between">
                    <span className="text-xs text-amber-900 font-medium">
                      {lang === "mm" ? "လွှဲရမည့် ပမာဏ:" : "Amount:"}
                    </span>
                    <span className="font-bold text-amber-950 text-sm font-sans">
                      {selectedPrice} MMK
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-white/80 rounded-2xl p-4 border border-blue-100 text-xs text-slate-600 space-y-2">
                <span className="font-bold text-slate-800 block">
                  {lang === "mm" ? "📌 ငွေလွှဲပြီးနောက် ပြုလုပ်ရန်:" : "📌 How to activate your plan:"}
                </span>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>
                    {lang === "mm"
                      ? "KPay ဖြင့် အထက်ပါနံပါတ် (သို့) QR သို့ သတ်မှတ်ငွေပမာဏ လွှဲပေးပါ"
                      : "Transfer the amount to the KBZPay number or QR above"}
                  </li>
                  <li>
                    {lang === "mm"
                      ? "ငွေလွှဲပြေစာ (Transaction Slip Screenshot) နှင့် မိမိ Gmail အကောင့်ကို Admin ထံ ပေးပို့ပေးပါ"
                      : "Take a screenshot of the transaction slip and note your registered Gmail"}
                  </li>
                  <li>
                    {lang === "mm"
                      ? "Admin မှ စစ်ဆေးပြီး ချက်ချင်း (၅ မှ ၁၀ မိနစ်အတွင်း) Premium ဖွင့်ပေးမည်ဖြစ်ပါသည်"
                      : "Your account will be upgraded to Premium within 5-10 minutes"}
                  </li>
                </ol>
              </div>
            </div>

            {/* Direct Contact Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <a
                href={`tel:${pricing.kpayNumber}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3 px-5 rounded-2xl transition-all"
              >
                <MessageCircle className="h-4 w-4 text-slate-500" />
                <span>{lang === "mm" ? "အကူအညီ / ဆက်သွယ်ရန်" : "Contact Admin"}</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-teal-800 hover:bg-teal-700 text-white text-xs font-bold py-3 px-6 rounded-2xl transition-all shadow-md"
              >
                {lang === "mm" ? "နားလည်ပါပြီ (ပိတ်မည်)" : "Got It (Close)"}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
