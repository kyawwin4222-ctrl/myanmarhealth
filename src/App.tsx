/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Leaf,
  Search,
  Activity,
  ShieldAlert,
  PhoneCall,
  Sparkles,
  AlertTriangle,
  Languages,
  ChevronRight,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  User,
  HelpCircle,
  Copy,
  Check,
  Send,
  Plus,
  BookOpen,
  Heart,
  X
} from "lucide-react";
import {
  HERBS_DATA,
  SYMPTOMS_DATA,
  FIRST_AID_DATA,
  EMERGENCY_CONTACTS,
  Herb,
  SymptomGuide,
  FirstAidGuide
} from "./data";

export default function App() {
  const [lang, setLang] = useState<"mm" | "en">("mm");
  const [activeTab, setActiveTab] = useState<"ai" | "herbs" | "symptoms" | "firstaid" | "emergency">("ai");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Herbs Filter Category
  const [selectedHerbCategory, setSelectedHerbCategory] = useState<string>("all");

  // Selected details modal state
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomGuide | null>(null);
  const [selectedFirstAid, setSelectedFirstAid] = useState<FirstAidGuide | null>(null);

  // AI Chat States
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat with a warm greeting in selected language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: lang === "mm" 
            ? "မင်္ဂလာပါ! ကျွန်ုပ်က မြန်မာ့ရိုးရာ တိုင်းရင်းဆေးနှင့် အိမ်တွင်းကုသမှု အကြံပေး AI ဖြစ်ပါတယ်။ \n\nအိမ်တွင်းဖြစ် ဝေဒနာများ (ဥပမာ - ချောင်းဆိုးခြင်း၊ နှာစေးခြင်း၊ ဗိုက်နာခြင်း) အတွက် သဘာဝဆေးနည်းများ၊ ဆေးဖက်ဝင်အပင်များ သို့မဟုတ် ကျန်းမာရေးဗဟုသုတများကို မေးမြန်းစုံစမ်းနိုင်ပါသည်။\n\n*အထူးသတိပေးချက် - ကျွန်ုပ်၏အကြံပြုချက်များသည် ဆရာဝန်ပြသရန်လိုအပ်ချက်ကို အစားမထိုးနိုင်ပါ။ အရေးပေါ်လူနာများအတွက် အရေးပေါ်အကူအညီ ချက်ချင်းရယူပါ။*"
            : "Hello! I am your Traditional Medicine and Safe Home Remedies AI Advisor. \n\nYou can ask me about natural remedies for common home ailments (like cough, cold, stomach discomfort), information on medicinal plants, or safe first-aid guides.\n\n*Disclaimer: My suggestions are for educational purposes only and are not a substitute for professional medical treatment. Seek emergency medical care if needed.*"
        }
      ]);
    }
  }, [lang]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiLoading]);

  // Translate labels helper
  const t = {
    title: lang === "mm" ? "အိမ်တွင်းဆေးကုသမှုနှင့် ကျန်းမာရေးလမ်းညွှန်" : "Home Remedies & Medical Guide",
    subtitle: lang === "mm" ? "အိမ်တွင်းဖြစ်ဝေဒနာများ၊ သဘာဝဆေးဖက်ဝင်အပင်များနှင့် ရှေးဦးသူနာပြုစုနည်းများ" : "Safe traditional medicine, herb catalog, and emergency first aid",
    searchPlaceholder: lang === "mm" ? "အပင်များ၊ ရောဂါလက္ခဏာများ သို့မဟုတ် ရှေးဦးသူနာပြုစုနည်းများကို ရှာဖွေပါ..." : "Search herbs, symptoms, or first aid...",
    tabAi: lang === "mm" ? "AI အမေး/အဖြေ" : "AI Advisor",
    tabHerbs: lang === "mm" ? "ဆေးဖက်ဝင်အပင်များ" : "Herbal Catalog",
    tabSymptoms: lang === "mm" ? "ရောဂါလက္ခဏာများ" : "Symptoms Guide",
    tabFirstAid: lang === "mm" ? "ရှေးဦးသူနာပြုစုနည်း" : "First Aid",
    tabEmergency: lang === "mm" ? "အရေးပေါ်ဖုန်းများ" : "Emergency Dial",
    warningTitle: lang === "mm" ? "အရေးကြီး သတိပေးချက်" : "Important Medical Disclaimer",
    warningText: lang === "mm" 
      ? "ဤအပလီကေးရှင်းတွင်ဖော်ပြထားသော အချက်အလက်များနှင့် AI ၏ အကြံပြုချက်များသည် ယေဘုယျကျန်းမာရေးဗဟုသုတအတွက်သာ ဖြစ်ပါသည်။ ဆရာဝန် သို့မဟုတ် ကျွမ်းကျင်ကျန်းမာရေးဝန်ထမ်းများ၏ ကုသမှု/ညွှန်ကြားချက်များကို အစားထိုးရန် မဟုတ်ပါ။ ပြင်းထန်သော ဝေဒနာများအတွက် နီးစပ်ရာ ဆေးရုံ/ဆေးခန်းသို့ ချက်ချင်း သွားရောက်ကုသမှု ခံယူပါ။"
      : "The information and AI advice provided in this app are for educational and general wellness purposes only. They are not a substitute for professional medical advice, diagnosis, or treatment. Always consult a doctor for serious illnesses or emergency conditions.",
    categoryAll: lang === "mm" ? "အားလုံး" : "All",
    categoryDigestive: lang === "mm" ? "အစာခြေစနစ်" : "Digestive",
    categoryRespiratory: lang === "mm" ? "အသက်ရှူလမ်းကြောင်း" : "Respiratory",
    categoryImmunity: lang === "mm" ? "ကိုယ်ခံအားစနစ်" : "Immunity Booster",
    categoryGeneral: lang === "mm" ? "အထွေထွေကျန်းမာရေး" : "General Health",
    benefits: lang === "mm" ? "ဆေးဖက်ဝင် အကျိုးကျေးဇူးများ" : "Medicinal Benefits",
    preparation: lang === "mm" ? "အသုံးပြုပုံ/ဆေးဖော်စပ်နည်း" : "Preparation & Usage",
    warnings: lang === "mm" ? "အထူးသတိပြုရန်/ရှောင်ရန်များ" : "Safety Cautions & Warnings",
    readMore: lang === "mm" ? "အသေးစိတ် ဖတ်ရှုရန်" : "Read Full Details",
    redFlags: lang === "mm" ? "ချက်ချင်းဆေးရုံသွားရမည့် စိုးရိမ်ရလက္ခဏာများ" : "Emergency Red Flags (See Doctor)",
    homeRemedies: lang === "mm" ? "အိမ်တွင်းကုသနိုင်သော သဘာဝနည်းလမ်းများ" : "Safe Home Treatment Remedies",
    steps: lang === "mm" ? "လုပ်ဆောင်ရမည့် အဆင့်ဆင့်" : "Step-by-step Procedures",
    donts: lang === "mm" ? "လုံးဝ (လုံးဝ) မပြုလုပ်ရမည့်အရာများ" : "What You Must NEVER Do (Cautions)",
    callNow: lang === "mm" ? "ချက်ချင်းဖုန်းခေါ်ဆိုရန်" : "Call Helpline Now",
    scientificName: lang === "mm" ? "ရုက္ခဗေဒအမည်" : "Scientific Name",
    send: lang === "mm" ? "မေးမြန်းမည်" : "Send Query",
    suggestedQueries: lang === "mm" ? "အမေးများသော မေးခွန်းနမူနာများ" : "Suggested Common Queries",
    noResults: lang === "mm" ? "ရှာဖွေမှု မတွေ့ရှိပါ။ အခြားစာလုံးဖြင့် ထပ်မံရှာဖွေကြည့်ပါ။" : "No results found. Try searching with other terms.",
    searchResultsTitle: lang === "mm" ? "ရှာဖွေမှု ရလဒ်များ" : "Search Results"
  };

  // Pre-defined quick AI prompts
  const suggestedPrompts = lang === "mm" ? [
    { label: "ချင်း (ဂျင်း) ရဲ့ ကျန်းမာရေး အကျိုးကျေးဇူးတွေက ဘာလဲ?", query: "ချင်း (ဂျင်း) ၏ ဆေးဖက်ဝင် အကျိုးကျေးဇူးများနှင့် အသုံးပြုပုံများကို အသေးစိတ် ရှင်းပြပေးပါ။" },
    { label: "ချောင်းဆိုး နှာစေးနေရင် အိမ်တွင်းမှာ ဘယ်လိုကုသရမလဲ?", query: "နှာစေးချောင်းဆိုးနေရင် အိမ်မှာ အလွယ်တကူ လုပ်နိုင်တဲ့ သဘာဝအိမ်တွင်း ဆေးနည်းကောင်းတွေကို လမ်းညွှန်ပေးပါ။" },
    { label: "ဗိုက်နာ လေပွတာအတွက် အမြန်သက်သာစေမယ့် ဆေးနည်း", query: "ရင်ပြည့်ရင်ကယ်ဖြစ်ပြီး ဗိုက်နာ လေပွတာတွေအတွက် သဘာဝ တိုင်းရင်းဆေးနည်းနဲ့ သက်သာအောင် ဘယ်လိုလုပ်ရမလဲ?" },
    { label: "မီးလောင်သွားရင် ပထမဦးဆုံး ဘာလုပ်ရမလဲ?", query: "မီးလောင်ရင် သို့မဟုတ် ရေနွေးပူလောင်ရင် ရှေးဦးသူနာပြုစုနည်း (First Aid) ကို အဆင့်ဆင့် ပြောပြပေးပါ။" }
  ] : [
    { label: "What are the health benefits of Ginger?", query: "Tell me about the health benefits and traditional preparations of Ginger." },
    { label: "How to treat a common cold and cough at home?", query: "What are safe, natural home remedies to relieve common cold and persistent coughing?" },
    { label: "Natural remedy for stomach bloating and gas?", query: "Can you provide traditional home remedies for treating stomach gas, indigestion, and bloating?" },
    { label: "What is the first aid for a minor skin burn?", query: "What are the immediate step-by-step first aid procedures and dangerous things to avoid for a minor kitchen burn?" }
  ];

  // Search filter logic
  const filteredHerbs = HERBS_DATA.filter(herb => {
    const matchesSearch = 
      herb.nameMm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      herb.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      herb.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      herb.benefitsMm.some(b => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
      herb.benefitsEn.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedHerbCategory === "all" || herb.category === selectedHerbCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredSymptoms = SYMPTOMS_DATA.filter(symptom => {
    return (
      symptom.titleMm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      symptom.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      symptom.descriptionMm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      symptom.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredFirstAid = FIRST_AID_DATA.filter(fa => {
    return (
      fa.titleMm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fa.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fa.descriptionMm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fa.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle AI send
  const handleSendAi = async (textToSend: string) => {
    const prompt = textToSend.trim();
    if (!prompt) return;

    // Add user message
    const updatedMessages = [...messages, { role: "user" as const, content: prompt }];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsAiLoading(true);

    try {
      const response = await fetch("/api/gemini/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          history: messages.slice(1).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Gemini server.");
      }

      const data = await response.json();
      setMessages([...updatedMessages, { role: "assistant" as const, content: data.reply }]);
    } catch (error: any) {
      console.error(error);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant" as const,
          content: lang === "mm" 
            ? "စိတ်မကောင်းပါဘူး၊ AI အမေးအဖြေစနစ်နှင့် ချိတ်ဆက်ရာတွင် အဆင်မပြေဖြစ်သွားပါသည်။ ကျေးဇူးပြု၍ ဆာဗာ သို့မဟုတ် အင်တာနက်ချိတ်ဆက်မှုကို စစ်ဆေးပြီး ထပ်မံကြိုးစားကြည့်ပါ။"
            : "Sorry, I am having trouble communicating with the server. Please check your internet connection or try again shortly."
        }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased selection:bg-teal-200">
      
      {/* Top Banner Warning Notification - Collapsible */}
      <div className="bg-amber-50 border-b border-amber-200 py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed font-sans">
            <span className="font-semibold">{t.warningTitle}: </span>
            {t.warningText}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-teal-900 text-white shadow-md sticky top-0 z-40 transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-teal-700 p-2.5 rounded-xl text-teal-100 shadow-inner">
              <Leaf className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                {t.title}
                <span className="bg-teal-800 text-[10px] uppercase font-mono py-0.5 px-2 rounded-full tracking-wider border border-teal-700">Traditional</span>
              </h1>
              <p className="text-xs text-teal-200 font-sans mt-0.5">{t.subtitle}</p>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* Language Switcher */}
            <button
              id="btn-lang-toggle"
              onClick={() => setLang(lang === "mm" ? "en" : "mm")}
              className="flex items-center gap-2 bg-teal-800 hover:bg-teal-700 text-teal-100 py-1.5 px-3 rounded-lg border border-teal-700 text-xs font-medium transition-all"
            >
              <Languages className="h-3.5 w-3.5" />
              <span>{lang === "mm" ? "English" : "မြန်မာဘာသာ"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero & Search Header section */}
      <section className="bg-gradient-to-b from-teal-900 to-teal-950 text-white pb-20 pt-8 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="bg-teal-800 text-teal-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
            {lang === "mm" ? "အိမ်တွင်းရှေးဦးကုသမှု ကျန်းမာရေးဗဟုသုတ" : "Verified Home Remedies & First-Aid Knowledge"}
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-teal-50 mb-4">
            {lang === "mm" ? "ကျန်းမာရေးမေးခွန်းများ မေးမြန်းရန်နှင့် ရှာဖွေရန်" : "Ask or Search Health Remedies Instantly"}
          </h2>
          
          {/* Main Search Bar */}
          <div className="relative max-w-2xl mx-auto mt-6 shadow-xl rounded-2xl overflow-hidden">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-teal-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="block w-full pl-11 pr-24 py-4 bg-white/95 text-slate-900 placeholder-slate-400 font-sans rounded-2xl border-none focus:ring-4 focus:ring-teal-500 text-sm md:text-base outline-none transition-all"
            />
            {searchQuery && (
              <button
                id="btn-clear-search"
                onClick={() => setSearchQuery("")}
                className="absolute right-16 inset-y-0 px-2 flex items-center text-slate-400 hover:text-slate-600 text-xs font-medium"
              >
                Clear
              </button>
            )}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-teal-800 text-teal-200 font-mono text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
              Bilingual
            </div>
          </div>
        </div>
        
        {/* Floating background blobs */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-50 rounded-t-[30px]" />
      </section>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 pb-20 flex-grow -mt-10 relative z-10">
        
        {/* Tab Navigation Menu */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-2.5 mb-8 flex flex-wrap justify-between items-center gap-1">
          <nav className="flex flex-wrap w-full md:w-auto gap-1" id="main-navigation">
            <button
              id="tab-ai-trigger"
              onClick={() => { setActiveTab("ai"); setSearchQuery(""); }}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === "ai"
                  ? "bg-teal-800 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>{t.tabAi}</span>
            </button>

            <button
              id="tab-herbs-trigger"
              onClick={() => { setActiveTab("herbs"); }}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === "herbs"
                  ? "bg-teal-800 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Leaf className="h-4 w-4" />
              <span>{t.tabHerbs}</span>
            </button>

            <button
              id="tab-symptoms-trigger"
              onClick={() => { setActiveTab("symptoms"); }}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === "symptoms"
                  ? "bg-teal-800 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Activity className="h-4 w-4" />
              <span>{t.tabSymptoms}</span>
            </button>

            <button
              id="tab-firstaid-trigger"
              onClick={() => { setActiveTab("firstaid"); }}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === "firstaid"
                  ? "bg-teal-800 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              <span>{t.tabFirstAid}</span>
            </button>

            <button
              id="tab-emergency-trigger"
              onClick={() => { setActiveTab("emergency"); }}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === "emergency"
                  ? "bg-teal-800 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <PhoneCall className="h-4 w-4" />
              <span>{t.tabEmergency}</span>
            </button>
          </nav>

          {/* Quick status offline pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 text-xs text-teal-800 font-sans font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{lang === "mm" ? "အိမ်တွင်းဆေးကုသမှု အချက်အလက်များ" : "Verified Safe Database Ready"}</span>
          </div>
        </div>

        {/* Global Search Results Panel (Overrides tabs if query is entered) */}
        {searchQuery && (
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 mb-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-lg md:text-xl font-display font-bold text-slate-800 flex items-center gap-2">
                <Search className="h-5 w-5 text-teal-600" />
                {t.searchResultsTitle} ({filteredHerbs.length + filteredSymptoms.length + filteredFirstAid.length})
              </h3>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-teal-800 hover:underline font-medium"
              >
                {lang === "mm" ? "ရှာဖွေမှု ပိတ်ပါ" : "Close Search"}
              </button>
            </div>

            {/* If empty */}
            {filteredHerbs.length === 0 && filteredSymptoms.length === 0 && filteredFirstAid.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-sans text-sm">{t.noResults}</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-xs font-medium bg-teal-800 text-teal-50 px-4 py-2 rounded-xl"
                >
                  {lang === "mm" ? "အားလုံး ပြန်ပြပါ" : "Show All Information"}
                </button>
              </div>
            )}

            {/* Herbs results */}
            {filteredHerbs.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-3 flex items-center gap-2">
                  <Leaf className="h-3.5 w-3.5" />
                  {t.tabHerbs} ({filteredHerbs.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredHerbs.map(herb => (
                    <div
                      key={herb.id}
                      onClick={() => setSelectedHerb(herb)}
                      className="border border-slate-100 hover:border-teal-200 hover:bg-teal-50/20 p-4 rounded-xl cursor-pointer flex justify-between items-center transition-all group"
                    >
                      <div>
                        <h5 className="font-sans font-bold text-slate-800 group-hover:text-teal-900">
                          {lang === "mm" ? herb.nameMm : herb.nameEn}
                        </h5>
                        <p className="text-xs text-slate-400 font-serif italic mt-0.5">{herb.scientificName}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Symptoms results */}
            {filteredSymptoms.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-3 flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5" />
                  {t.tabSymptoms} ({filteredSymptoms.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSymptoms.map(symptom => (
                    <div
                      key={symptom.id}
                      onClick={() => setSelectedSymptom(symptom)}
                      className="border border-slate-100 hover:border-teal-200 hover:bg-teal-50/20 p-4 rounded-xl cursor-pointer flex justify-between items-center transition-all group"
                    >
                      <div>
                        <h5 className="font-sans font-bold text-slate-800 group-hover:text-teal-900">
                          {lang === "mm" ? symptom.titleMm : symptom.titleEn}
                        </h5>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {lang === "mm" ? symptom.descriptionMm : symptom.descriptionEn}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* First Aid results */}
            {filteredFirstAid.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-3 flex items-center gap-2">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  {t.tabFirstAid} ({filteredFirstAid.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredFirstAid.map(fa => (
                    <div
                      key={fa.id}
                      onClick={() => setSelectedFirstAid(fa)}
                      className="border border-slate-100 hover:border-teal-200 hover:bg-teal-50/20 p-4 rounded-xl cursor-pointer flex justify-between items-center transition-all group"
                    >
                      <div>
                        <h5 className="font-sans font-bold text-slate-800 group-hover:text-teal-900">
                          {lang === "mm" ? fa.titleMm : fa.titleEn}
                        </h5>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {lang === "mm" ? fa.descriptionMm : fa.descriptionEn}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Normal Tab contents */}
        {!searchQuery && (
          <AnimatePresence mode="wait">
            
            {/* 1. AI CHAT TAB */}
            {activeTab === "ai" && (
              <motion.div
                id="panel-ai"
                key="ai"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                
                {/* Chat window column */}
                <div className="lg:col-span-2 flex flex-col bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden min-h-[500px] h-[600px]">
                  
                  {/* Chat header status */}
                  <div className="bg-teal-800 text-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-teal-700/60 p-2 rounded-lg text-teal-100">
                        <Sparkles className="h-5 w-5 animate-spin-slow" />
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-sm sm:text-base">
                          {lang === "mm" ? "အိမ်တွင်းကုသမှု အကြံပေး AI" : "Traditional Medicine AI Advisor"}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-teal-200 flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {lang === "mm" ? "အမြဲတမ်းအသင့်ရှိပါသည်" : "Gemini 3.5 Ready"}
                        </p>
                      </div>
                    </div>

                    <button
                      id="btn-reset-chat"
                      onClick={() => {
                        if (confirm(lang === "mm" ? "စကားပြောစနစ်ကို အစမှ ပြန်စလိုပါသလား?" : "Do you want to reset the conversation?")) {
                          setMessages([
                            {
                              role: "assistant",
                              content: lang === "mm" 
                                ? "မင်္ဂလာပါ! ကျွန်ုပ်က မြန်မာ့ရိုးရာ တိုင်းရင်းဆေးနှင့် အိမ်တွင်းကုသမှု အကြံပေး AI ဖြစ်ပါတယ်။ \n\nအိမ်တွင်းဖြစ် ဝေဒနာများ (ဥပမာ - ချောင်းဆိုးခြင်း၊ နှာစေးခြင်း၊ ဗိုက်နာခြင်း) အတွက် သဘာဝဆေးနည်းများ၊ ဆေးဖက်ဝင်အပင်များ သို့မဟုတ် ကျန်းမာရေးဗဟုသုတများကို မေးမြန်းစုံစမ်းနိုင်ပါသည်။\n\n*အထူးသတိပေးချက် - ကျွန်ုပ်၏အကြံပြုချက်များသည် ဆရာဝန်ပြသရန်လိုအပ်ချက်ကို အစားမထိုးနိုင်ပါ။ အရေးပေါ်လူနာများအတွက် အရေးပေါ်အကူအညီ ချက်ချင်းရယူပါ။*"
                                : "Hello! I am your Traditional Medicine and Safe Home Remedies AI Advisor. \n\nYou can ask me about natural remedies for common home ailments (like cough, cold, stomach discomfort), information on medicinal plants, or safe first-aid guides.\n\n*Disclaimer: My suggestions are for educational purposes only and are not a substitute for professional medical treatment. Seek emergency medical care if needed.*"
                            }
                          ]);
                        }
                      }}
                      title="Reset Conversation"
                      className="text-teal-200 hover:text-white p-2 rounded-lg hover:bg-teal-700 transition-all"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Message body */}
                  <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 max-w-[85%] ${
                          msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                            msg.role === "user" ? "bg-teal-700 text-white" : "bg-white border border-teal-100 text-teal-800"
                          }`}
                        >
                          {msg.role === "user" ? <User className="h-4 w-4" /> : <Leaf className="h-4 w-4" />}
                        </div>

                        {/* Speech Bubble */}
                        <div className="relative group">
                          <div
                            className={`p-3.5 sm:p-4 rounded-2xl shadow-sm leading-relaxed text-sm whitespace-pre-line font-sans ${
                              msg.role === "user"
                                ? "bg-teal-800 text-teal-50 rounded-tr-none"
                                : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                            }`}
                          >
                            {msg.content}
                          </div>

                          {/* Quick copy bubble */}
                          <button
                            onClick={() => copyToClipboard(msg.content, index)}
                            className={`absolute -bottom-2 ${
                              msg.role === "user" ? "-left-2" : "-right-2"
                            } bg-white hover:bg-slate-50 border border-slate-100 p-1.5 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-slate-500`}
                          >
                            {copiedIndex === index ? (
                              <Check className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5 hover:text-slate-700" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Loading skeleton */}
                    {isAiLoading && (
                      <div className="flex gap-3 max-w-[70%] mr-auto">
                        <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                          <Leaf className="h-4 w-4 animate-spin-slow" />
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-slate-100 rounded-tl-none shadow-sm w-full space-y-2">
                          <div className="h-3 bg-slate-100 rounded-full w-2/3 animate-pulse" />
                          <div className="h-3 bg-slate-100 rounded-full w-5/6 animate-pulse" />
                          <div className="h-3 bg-slate-100 rounded-full w-1/2 animate-pulse" />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendAi(inputMessage);
                    }}
                    className="border-t border-slate-100 p-4 bg-white flex gap-2"
                  >
                    <input
                      id="ai-chat-input"
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      disabled={isAiLoading}
                      placeholder={
                        lang === "mm" 
                          ? "ဥပမာ- 'ဗိုက်အောင့်ရင် ဘယ်လိုလုပ်ရမလဲ' ဟု မေးမြန်းပါ..."
                          : "E.g., 'What are the remedies for a sore throat?'..."
                      }
                      className="flex-grow px-4 py-3 bg-slate-50 text-slate-800 placeholder-slate-400 font-sans border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white text-sm transition-all"
                    />
                    <button
                      id="btn-send-message"
                      type="submit"
                      disabled={isAiLoading || !inputMessage.trim()}
                      className="bg-teal-800 hover:bg-teal-700 disabled:bg-slate-100 disabled:text-slate-400 text-white p-3.5 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>

                {/* FAQ Template Side-Panel column */}
                <div className="space-y-6">
                  
                  {/* AI Quick start suggestions */}
                  <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-teal-700" />
                      {t.suggestedQueries}
                    </h3>
                    <div className="space-y-2.5">
                      {suggestedPrompts.map((item, idx) => (
                        <button
                          key={idx}
                          id={`suggested-prompt-${idx}`}
                          onClick={() => handleSendAi(item.query)}
                          disabled={isAiLoading}
                          className="w-full text-left p-3.5 bg-slate-50 hover:bg-teal-50/40 hover:text-teal-900 border border-slate-100 hover:border-teal-100 rounded-xl text-xs sm:text-sm font-sans font-medium text-slate-700 transition-all flex justify-between items-center group"
                        >
                          <span className="line-clamp-2 pr-2">{item.label}</span>
                          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 shrink-0 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Disclaimers card */}
                  <div className="bg-teal-50/40 border border-teal-100 rounded-3xl p-6">
                    <h4 className="text-xs font-bold uppercase text-teal-900 tracking-wider mb-2 flex items-center gap-1.5">
                      <ShieldAlert className="h-4 w-4 text-teal-700" />
                      {lang === "mm" ? "အိမ်တွင်းကုသခြင်း စည်းမျဉ်း" : "Safety Checklist"}
                    </h4>
                    <ul className="space-y-2 text-xs text-teal-900 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{lang === "mm" ? "မေးခွန်းများကို ရိုးရှင်းစွာမေးပါ" : "Keep questions direct and precise"}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{lang === "mm" ? "အရေးပေါ်ဖြစ်ပါက ဖုန်းချက်ချင်းခေါ်ပါ" : "Call emergency helplines for trauma"}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{lang === "mm" ? "ဆေးနည်းများကို သတိထားသုံးစွဲပါ" : "Use home remedies strictly in moderation"}</span>
                      </li>
                    </ul>
                  </div>

                </div>

              </motion.div>
            )}

            {/* 2. HERBAL CATALOG TAB */}
            {activeTab === "herbs" && (
              <motion.div
                id="panel-herbs"
                key="herbs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                
                {/* Categories Switchers */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { id: "all", label: t.categoryAll },
                    { id: "digestive", label: t.categoryDigestive },
                    { id: "respiratory", label: t.categoryRespiratory },
                    { id: "immunity", label: t.categoryImmunity },
                    { id: "general", label: t.categoryGeneral }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedHerbCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        selectedHerbCategory === cat.id
                          ? "bg-teal-800 text-white shadow-md"
                          : "bg-white text-slate-600 border border-slate-150 hover:bg-slate-100"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Grid listing */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredHerbs.map(herb => (
                    <div
                      key={herb.id}
                      className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden"
                    >
                      <div className="p-6">
                        {/* Title and Category */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-1 rounded-md">
                              {herb.category === "digestive" ? t.categoryDigestive : herb.category === "respiratory" ? t.categoryRespiratory : herb.category === "immunity" ? t.categoryImmunity : t.categoryGeneral}
                            </span>
                            <h3 className="text-lg font-bold text-slate-800 mt-2">
                              {lang === "mm" ? herb.nameMm : herb.nameEn}
                            </h3>
                            <p className="text-xs text-slate-400 italic font-serif mt-0.5">{herb.scientificName}</p>
                          </div>
                          
                          <div className="bg-teal-50 p-2.5 rounded-2xl text-teal-800">
                            <Leaf className="h-5 w-5" />
                          </div>
                        </div>

                        {/* Short benefits summary */}
                        <div className="mt-4 space-y-2">
                          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.benefits}</h4>
                          <ul className="space-y-1.5 text-xs text-slate-600">
                            {(lang === "mm" ? herb.benefitsMm : herb.benefitsEn).slice(0, 2).map((b, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-teal-600 font-bold shrink-0">•</span>
                                <span className="line-clamp-1">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Action trigger footer */}
                      <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedHerb(herb)}
                          className="text-teal-800 hover:text-teal-950 font-sans text-xs font-bold flex items-center gap-1 group/btn"
                        >
                          <span>{t.readMore}</span>
                          <ChevronRight className="h-4 w-4 text-teal-700 group-hover/btn:translate-x-0.5 transition-all" />
                        </button>

                        <button
                          onClick={() => handleSendAi(lang === "mm" ? `${herb.nameMm} အပင်၏ အခြားဆေးဖက်ဝင်ပုံများနှင့် ဆိုးကျိုးများကို ပြောပြပါ` : `Explain all benefits and medical cautions of ${herb.nameEn}`)}
                          className="text-slate-500 hover:text-teal-800"
                          title="Ask AI about this"
                        >
                          <Sparkles className="h-4 w-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </motion.div>
            )}

            {/* 3. SYMPTOMS TAB */}
            {activeTab === "symptoms" && (
              <motion.div
                id="panel-symptoms"
                key="symptoms"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredSymptoms.map(symptom => (
                  <div
                    key={symptom.id}
                    className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-red-50 p-3 rounded-2xl text-red-600 shadow-inner">
                          <Activity className="h-5 w-5" />
                        </div>
                        <h3 className="font-display font-bold text-lg text-slate-800">
                          {lang === "mm" ? symptom.titleMm : symptom.titleEn}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                        {lang === "mm" ? symptom.descriptionMm : symptom.descriptionEn}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedSymptom(symptom)}
                        className="bg-teal-50 hover:bg-teal-100 text-teal-900 py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1 group/btn"
                      >
                        <span>{t.readMore}</span>
                        <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-all" />
                      </button>

                      <button
                        onClick={() => handleSendAi(lang === "mm" ? `${symptom.titleMm} ဖြစ်ရခြင်းအကြောင်းရင်းများနှင့် အိမ်တွင်းကုသနည်းများကို ပြောပြပါ` : `Explain causes and remedies of ${symptom.titleEn}`)}
                        className="text-slate-500 hover:text-teal-800 text-xs font-medium flex items-center gap-1"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>AI Help</span>
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* 4. FIRST AID TAB */}
            {activeTab === "firstaid" && (
              <motion.div
                id="panel-firstaid"
                key="firstaid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredFirstAid.map(guide => (
                  <div
                    key={guide.id}
                    className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col justify-between"
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-4">
                        <div className="bg-amber-50 p-3 rounded-2xl text-amber-600">
                          <ShieldAlert className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-lg sm:text-xl text-slate-800">
                            {lang === "mm" ? guide.titleMm : guide.titleEn}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">Emergency Guide</p>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                        {lang === "mm" ? guide.descriptionMm : guide.descriptionEn}
                      </p>

                      {/* Display Steps Preview */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.steps}</h4>
                        <div className="space-y-3">
                          {guide.steps.map((s, idx) => (
                            <div key={idx} className="flex gap-3">
                              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {s.step}
                              </span>
                              <div>
                                <h5 className="text-xs sm:text-sm font-bold text-slate-700">
                                  {lang === "mm" ? s.titleMm : s.titleEn}
                                </h5>
                                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                                  {lang === "mm" ? s.descMm : s.descEn}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedFirstAid(guide)}
                        className="bg-teal-800 hover:bg-teal-900 text-white font-sans text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1 group/btn"
                      >
                        <span>{lang === "mm" ? "အဆင့်ဆင့် လေ့လာရန်" : "Show Full Guide"}</span>
                        <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-all" />
                      </button>

                      <button
                        onClick={() => handleSendAi(lang === "mm" ? `${guide.titleMm} ဖြစ်လျှင် ပြုလုပ်ရန် ရှေးဦးသူနာပြုစုနည်းအသေးစိတ်ကို ပြောပြပါ` : `Full first aid procedure for ${guide.titleEn}`)}
                        className="text-xs text-teal-800 font-semibold flex items-center gap-1"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>AI Details</span>
                      </button>
                    </div>

                  </div>
                ))}
              </motion.div>
            )}

            {/* 5. EMERGENCY CONTACTS TAB */}
            {activeTab === "emergency" && (
              <motion.div
                id="panel-emergency"
                key="emergency"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-red-50 border border-red-200 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-4 text-red-950">
                  <div className="bg-red-600 text-white p-3.5 rounded-full shrink-0">
                    <AlertTriangle className="h-6 w-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg">
                      {lang === "mm" ? "စိုးရိမ်ရသော အရေးပေါ်ကျန်းမာရေးအခြေအနေများ" : "Critical Emergency Conditions"}
                    </h3>
                    <p className="text-xs sm:text-sm text-red-800 leading-relaxed mt-1">
                      {lang === "mm" 
                        ? "အသက်ရှူလမ်းကြောင်း လုံးဝပိတ်ဆို့ခြင်း၊ သတိလစ်မေ့မြောခြင်း၊ ပြင်းထန်သော ရင်ဘတ်အောင့်ခြင်း သို့မဟုတ် အဆက်မပြတ် သွေးထွက်ခြင်းများ ဖြစ်ပွားပါက အိမ်တွင်းဆေးမြီးတိုများဖြင့် အချိန်မဆွဲဘဲ အောက်ပါအရေးပေါ်ဝန်ဆောင်မှုဖုန်းများကို ချက်ချင်းခေါ်ဆို၍ သက်ဆိုင်ရာ ပြည်သူ့ဆေးရုံကြီးများသို့ အမြန်ဆုံး ဆက်သွယ်ပါ။"
                        : "For severe incidents such as heart attack, sudden stroke, respiratory failure, heavy uncontrolled bleeding, or coma, do NOT delay. Skip home remedies and call the municipal emergency services instantly."}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {EMERGENCY_CONTACTS.map((contact, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="font-display font-bold text-base sm:text-lg text-slate-800">
                          {lang === "mm" ? contact.nameMm : contact.nameEn}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">Helpline Contact</p>
                        
                        <div className="mt-4 bg-slate-50 border border-slate-100 py-3 px-4 rounded-2xl text-teal-800 font-mono text-lg font-bold flex items-center gap-2">
                          <PhoneCall className="h-5 w-5 text-teal-700" />
                          <span>{contact.phone}</span>
                        </div>

                        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                          {lang === "mm" ? contact.descriptionMm : contact.descriptionEn}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <a
                          id={`emergency-call-anchor-${idx}`}
                          href={`tel:${contact.phone}`}
                          className="w-full bg-teal-800 hover:bg-teal-700 text-white font-sans text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                        >
                          <PhoneCall className="h-4 w-4" />
                          <span>{t.callNow}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        )}

      </main>

      {/* Deep-Dive Modals */}
      
      {/* 1. HERB MODAL */}
      <AnimatePresence>
        {selectedHerb && (
          <motion.div
            id="modal-herb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-1 rounded-md">
                    {t.tabHerbs}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mt-2">
                    {lang === "mm" ? selectedHerb.nameMm : selectedHerb.nameEn}
                  </h3>
                  <p className="text-xs text-slate-400 italic font-serif mt-0.5">
                    {t.scientificName}: {selectedHerb.scientificName}
                  </p>
                </div>
                <button
                  id="btn-close-herb-modal"
                  onClick={() => setSelectedHerb(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Benefits */}
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Heart className="h-4 w-4 text-emerald-600" />
                    {t.benefits}
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {(lang === "mm" ? selectedHerb.benefitsMm : selectedHerb.benefitsEn).map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation & Usage */}
                <div className="bg-teal-50/40 rounded-2xl p-5 space-y-3 border border-teal-100">
                  <h4 className="text-xs sm:text-sm font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-teal-800" />
                    {t.preparation}
                  </h4>
                  <p className="text-sm text-teal-950 leading-relaxed">
                    {lang === "mm" ? selectedHerb.preparationMm : selectedHerb.preparationEn}
                  </p>
                </div>

                {/* Warnings */}
                <div className="bg-rose-50/50 rounded-2xl p-5 space-y-3 border border-rose-100">
                  <h4 className="text-xs sm:text-sm font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-rose-800" />
                    {t.warnings}
                  </h4>
                  <p className="text-sm text-rose-950 leading-relaxed">
                    {lang === "mm" ? selectedHerb.warningsMm : selectedHerb.warningsEn}
                  </p>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                <button
                  id="btn-ask-ai-from-herb-modal"
                  onClick={() => {
                    handleSendAi(lang === "mm" ? `${selectedHerb.nameMm} အပင်၏ အခြားဆေးဖက်ဝင်ပုံများနှင့် အိမ်တွင်းဆေးကုထုံးများကို ဆက်လက်ရှင်းပြပေးပါ` : `Tell me more details about cooking or medicinal remedies of ${selectedHerb.nameEn}`);
                    setSelectedHerb(null);
                    setActiveTab("ai");
                  }}
                  className="w-full sm:w-auto bg-teal-800 hover:bg-teal-700 text-white font-sans text-xs font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{lang === "mm" ? "ဤအပင်အကြောင်း AI ကို ထပ်မေးမည်" : "Ask AI About This Herb"}</span>
                </button>
                <button
                  id="btn-close-herb-modal-footer"
                  onClick={() => setSelectedHerb(null)}
                  className="w-full sm:w-auto text-xs text-slate-500 hover:text-slate-800 font-medium py-2 text-center"
                >
                  {lang === "mm" ? "ပိတ်မည်" : "Close"}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. SYMPTOM MODAL */}
      <AnimatePresence>
        {selectedSymptom && (
          <motion.div
            id="modal-symptom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-1 rounded-md">
                    {t.tabSymptoms}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mt-2">
                    {lang === "mm" ? selectedSymptom.titleMm : selectedSymptom.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {lang === "mm" ? selectedSymptom.descriptionMm : selectedSymptom.descriptionEn}
                  </p>
                </div>
                <button
                  id="btn-close-symptom-modal"
                  onClick={() => setSelectedSymptom(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Remedies (Good stuff) */}
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-teal-600" />
                    {t.homeRemedies}
                  </h4>
                  <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed">
                    {(lang === "mm" ? selectedSymptom.remediesMm : selectedSymptom.remediesEn).map((rem, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i+1}
                        </span>
                        <span>{rem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Red flags (Bad stuff - Urgent) */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-red-700" />
                    {t.redFlags}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-red-950 leading-relaxed list-disc list-inside">
                    {(lang === "mm" ? selectedSymptom.redFlagsMm : selectedSymptom.redFlagsEn).map((flag, i) => (
                      <li key={i} className="font-sans font-medium text-red-900">
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                <button
                  id="btn-ask-ai-from-symptom-modal"
                  onClick={() => {
                    handleSendAi(lang === "mm" ? `${selectedSymptom.titleMm} ရဲ့ အကြောင်းရင်းများ၊ အန္တရာယ်ရှိပုံများနှင့် အိမ်တွင်းကုသနည်းများကို ရှင်းပြပေးပါ` : `Explain detailed wellness tips and medical advice for ${selectedSymptom.titleEn}`);
                    setSelectedSymptom(null);
                    setActiveTab("ai");
                  }}
                  className="w-full sm:w-auto bg-teal-800 hover:bg-teal-700 text-white font-sans text-xs font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{lang === "mm" ? "ဤရောဂါအကြောင်း AI အကြံပေးချက်တောင်းရန်" : "Ask AI For Quick Remedy"}</span>
                </button>
                <button
                  id="btn-close-symptom-modal-footer"
                  onClick={() => setSelectedSymptom(null)}
                  className="w-full sm:w-auto text-xs text-slate-500 hover:text-slate-800 font-medium py-2 text-center"
                >
                  {lang === "mm" ? "ပိတ်မည်" : "Close"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. FIRST AID MODAL */}
      <AnimatePresence>
        {selectedFirstAid && (
          <motion.div
            id="modal-firstaid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                    {t.tabFirstAid}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mt-2">
                    {lang === "mm" ? selectedFirstAid.titleMm : selectedFirstAid.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {lang === "mm" ? selectedFirstAid.descriptionMm : selectedFirstAid.descriptionEn}
                  </p>
                </div>
                <button
                  id="btn-close-firstaid-modal"
                  onClick={() => setSelectedFirstAid(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Steps listing */}
                <div className="space-y-4">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                    {t.steps}
                  </h4>
                  <div className="space-y-4">
                    {selectedFirstAid.steps.map((s, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-2xl p-4 sm:p-5 flex gap-4 border border-slate-100">
                        <span className="w-6 h-6 rounded-full bg-teal-800 text-teal-50 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {s.step}
                        </span>
                        <div>
                          <h5 className="font-sans font-bold text-sm sm:text-base text-slate-800">
                            {lang === "mm" ? s.titleMm : s.titleEn}
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                            {lang === "mm" ? s.descMm : s.descEn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What NOT to do (Cautions) */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-red-700" />
                    {t.donts}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-red-950 leading-relaxed list-disc list-inside">
                    {(lang === "mm" ? selectedFirstAid.dontsMm : selectedFirstAid.dontsEn).map((d, i) => (
                      <li key={i} className="font-sans font-medium text-red-900">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                <button
                  id="btn-ask-ai-from-firstaid-modal"
                  onClick={() => {
                    handleSendAi(lang === "mm" ? `${selectedFirstAid.titleMm} ရဲ့ အဆင့်ဆင့် ပြုစုပုံအပြည့်အစုံနဲ့ အိမ်တွင်းကုသနည်းများကို လမ်းညွှန်ပေးပါ` : `Explain full traditional first aid and standard medical steps for ${selectedFirstAid.titleEn}`);
                    setSelectedFirstAid(null);
                    setActiveTab("ai");
                  }}
                  className="w-full sm:w-auto bg-teal-800 hover:bg-teal-700 text-white font-sans text-xs font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{lang === "mm" ? "ဤအခြေအနေအတွက် AI လမ်းညွှန်ချက်တောင်းရန်" : "Ask AI For Extended Guide"}</span>
                </button>
                <button
                  id="btn-close-firstaid-modal-footer"
                  onClick={() => setSelectedFirstAid(null)}
                  className="w-full sm:w-auto text-xs text-slate-500 hover:text-slate-800 font-medium py-2 text-center"
                >
                  {lang === "mm" ? "ပိတ်မည်" : "Close"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern, elegant Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 mt-auto border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Leaf className="h-5 w-5 text-teal-500" />
            <span className="font-display font-bold text-white text-base">{t.title}</span>
          </div>
          
          <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {lang === "mm" 
              ? "ဤစနစ်ရှိ အကြံပြုချက်များသည် အချက်အလက်များ လေ့လာစရာအဖြစ်သာ ရည်ရွယ်ပြီး ကျွမ်းကျင်ဆေးကုသမှုကို အစားမထိုးပါ။"
              : "This service provides educational recommendations and should not replace clinical medical consults."}
          </p>

          <div className="text-[10px] text-slate-600 font-mono">
            &copy; {new Date().getFullYear()} - ဆေးပညာနှင့် အိမ်တွင်းဆေးကုသခြင်း | Dual-Language Built with Gemini
          </div>
        </div>
      </footer>

    </div>
  );
}
