export interface Herb {
  id: string;
  nameMm: string;
  nameEn: string;
  scientificName: string;
  benefitsMm: string[];
  benefitsEn: string[];
  preparationMm: string;
  preparationEn: string;
  warningsMm: string;
  warningsEn: string;
  imageAlt: string;
  category: "digestive" | "respiratory" | "immunity" | "general";
}

export interface SymptomGuide {
  id: string;
  titleMm: string;
  titleEn: string;
  descriptionMm: string;
  descriptionEn: string;
  remediesMm: string[];
  remediesEn: string[];
  redFlagsMm: string[];
  redFlagsEn: string[];
  iconName: string;
}

export interface FirstAidStep {
  step: number;
  titleMm: string;
  titleEn: string;
  descMm: string;
  descEn: string;
}

export interface FirstAidGuide {
  id: string;
  titleMm: string;
  titleEn: string;
  descriptionMm: string;
  descriptionEn: string;
  steps: FirstAidStep[];
  dontsMm: string[];
  dontsEn: string[];
  iconName: string;
}

export interface EmergencyContact {
  nameMm: string;
  nameEn: string;
  phone: string;
  descriptionMm: string;
  descriptionEn: string;
}

export const HERBS_DATA: Herb[] = [
  {
    id: "ginger",
    nameMm: "ချင်း (ဂျင်း)",
    nameEn: "Ginger",
    scientificName: "Zingiber officinale",
    category: "digestive",
    benefitsMm: [
      "အစာမကြေခြင်းနှင့် လေပွခြင်းကို သက်သာစေခြင်း",
      "ပျို့အန်ခြင်းနှင့် ခရီးသွားစဉ် ကားမူးခြင်းကို ကာကွယ်ပေးခြင်း",
      "ချောင်းဆိုး၊ လည်ချောင်းနာနှင့် အအေးမိခြင်းကို ပျောက်ကင်းစေခြင်း"
    ],
    benefitsEn: [
      "Relieves indigestion, bloating, and gas",
      "Reduces nausea, morning sickness, and motion sickness",
      "Eases coughs, sore throat, and common cold symptoms"
    ],
    preparationMm: "ချင်းကို ပါးပါးလှီးပြီး ရေနွေးဖြင့် (၁၀) မိနစ်ခန့် ပြုတ်ပါ။ ထို့နောက် ပျားရည် သို့မဟုတ် သံပရာရည် အနည်းငယ်ထည့်၍ ချင်းရေနွေးကြမ်းအဖြစ် တစ်နေ့ (၂) ကြိမ် သောက်ပေးနိုင်ပါသည်။",
    preparationEn: "Slice fresh ginger root and boil in water for 10 minutes. Strain and add a spoonful of honey or a squeeze of lemon to make warm Ginger Tea. Drink 2 times a day.",
    warningsMm: "သွေးကျဆေး သောက်နေရသူများ သို့မဟုတ် ခွဲစိတ်ကုသမှု ခံယူရန်ရှိသူများ ချင်းကို အလွန်အကျွံ စားသုံးခြင်းမှ ရှောင်ကြဉ်ရပါမည်။",
    warningsEn: "Avoid consuming excessive ginger if you are taking blood thinners or preparing for a surgical procedure.",
    imageAlt: "Fresh ginger roots"
  },
  {
    id: "garlic",
    nameMm: "ကြက်သွန်ဖြူ",
    nameEn: "Garlic",
    scientificName: "Allium sativum",
    category: "immunity",
    benefitsMm: [
      "ကိုယ်ခံအားစနစ်ကို မြှင့်တင်ပေးပြီး ပိုးမွှားများကို တိုက်ဖျက်ပေးခြင်း",
      "သွေးတိုးခြင်းနှင့် သွေးတွင်းကိုလက်စထရောကို ကျဆင်းစေခြင်း",
      "နှာစေး၊ နှာပိတ်နှင့် တုပ်ကွေးဝေဒနာများကို သက်သာစေခြင်း"
    ],
    benefitsEn: [
      "Boosts immune system and acts as a natural antimicrobial",
      "Helps regulate high blood pressure and lower cholesterol",
      "Reduces severity of common cold, flu, and congestion"
    ],
    preparationMm: "ကြက်သွန်ဖြူ (၁-၂) မွှာကို ဓားပြားရိုက်ပြီး (၁၀) မိနစ်ခန့် ထားပါ။ ထို့နောက် ဒီအတိုင်း ဝါးစားနိုင်သလို၊ ပျားရည်နှင့် ရောစပ်၍လည်း စားသုံးနိုင်ပါသည်။",
    preparationEn: "Crush 1-2 raw garlic cloves and let them sit for 10 minutes to activate beneficial compounds. Consume it raw, or mix with a teaspoon of honey.",
    warningsMm: "အစာအိမ်အနာရှိသူများ ဗိုက်ဟောင်းနေချိန်တွင် အစိမ်းစားပါက ရင်ပူခြင်း၊ ဗိုက်အောင့်ခြင်း ဖြစ်စေနိုင်ပါသည်။",
    warningsEn: "Consuming raw garlic on an empty stomach may cause heartburn or stomach irritation, especially for individuals with ulcers.",
    imageAlt: "Garlic bulbs and cloves"
  },
  {
    id: "turmeric",
    nameMm: "နနွင်း",
    nameEn: "Turmeric",
    scientificName: "Curcuma longa",
    category: "general",
    benefitsMm: [
      "ရောင်ရမ်းမှုကို ကျဆင်းစေပြီး ကိုယ်လက်ကိုက်ခဲမှုကို သက်သာစေခြင်း",
      "အနာစိမ်းများနှင့် အရေပြားယားယံမှုများကို သက်သာစေခြင်း",
      "လည်ချောင်းနာခြင်းနှင့် အသက်ရှူလမ်းကြောင်းဆိုင်ရာ အအေးမိခြင်းများကို ကုသပေးခြင်း"
    ],
    benefitsEn: [
      "Strong anti-inflammatory and pain-relieving properties",
      "Heals minor skin wounds, boils, and relieves itching",
      "Soothes sore throats and respiratory congestion"
    ],
    preparationMm: "လည်ချောင်းနာပါက နနွင်းမှုန့် လက်ဖက်ရည်ဇွန်းတစ်ဝက်ကို ရေနွေးနွေးတစ်ဖန်ခွက်တွင် ဖျော်၍ လည်ချောင်းဆေး (Gargle) ပေးပါ။ အရေပြားအတွက် နနွင်းမှုန့်ကို ရေ သို့မဟုတ် ပျားရည်နှင့် ပျစ်ပျစ်ဖျော်၍ လိမ်းပေးနိုင်ပါသည်။",
    preparationEn: "For sore throat, mix 1/2 teaspoon of turmeric powder in a glass of warm water and gargle. For skin issues, mix turmeric powder with a little water or honey to make a paste and apply to affected areas.",
    warningsMm: "သည်းခြေအိတ် ကျောက်တည်ဖူးသူများ သို့မဟုတ် သည်းခြေပြွန်ပိတ်ဆို့နေသူများ နနွင်းကို အလွန်အကျွံ စားသုံးခြင်း မပြုရပါ။",
    warningsEn: "Avoid large doses of turmeric if you have gallstones or bile duct obstructions.",
    imageAlt: "Golden turmeric powder and rhizomes"
  },
  {
    id: "honey",
    nameMm: "ပျားရည်",
    nameEn: "Honey",
    scientificName: "Mel depuratum",
    category: "respiratory",
    benefitsMm: [
      "လည်ချောင်းယားယံခြင်းနှင့် ချောင်းဆိုးခြင်းကို ထိရောက်စွာ သက်သာစေခြင်း",
      "ပိုးသတ်အာနိသင်ရှိပြီး မီးလောင်နာနှင့် ပြတ်ရှနာများကို အနာကျက်မြန်စေခြင်း",
      "အသားအရေကို စိုပြေစေပြီး အားအင်ဖြစ်ထွန်းစေခြင်း"
    ],
    benefitsEn: [
      "Highly effective natural cough suppressant and throat coat",
      "Antibacterial qualities speed up healing of minor burns and cuts",
      "Moisturizes skin and provides a natural energy boost"
    ],
    preparationMm: "ချောင်းဆိုးလျှင် ပျားရည် လက်ဖက်ရည်ဇွန်း (၁) ဇွန်းကို ဒီအတိုင်းသောက်ပါ သို့မဟုတ် သံပရာရည်ညှစ်ထားသော ရေနွေးနွေးထဲသို့ ရောစပ်သောက်ပါ။ အနာများအတွက် ပျားရည်စစ်စစ်ကို တိုက်ရိုက် သုတ်လိမ်းပေးနိုင်ပါသည်။",
    preparationEn: "Take 1 teaspoon of pure honey directly for cough relief, or mix with warm water and lemon juice. For minor burns/cuts, apply a thin layer of pure raw honey to the wound.",
    warningsMm: "အသက် (၁) နှစ်အောက် ကလေးငယ်များကို ပျားရည် လုံးဝ (လုံးဝ) မတိုက်ရပါ။ (Infant Botulism ရောဂါ ဖြစ်ပွားနိုင်သောကြောင့် ဖြစ်ပါသည်။)",
    warningsEn: "NEVER give honey to children under 1 year of age due to the risk of infant botulism.",
    imageAlt: "Jar of pure natural honey"
  },
  {
    id: "mint",
    nameMm: "ပူဒီနာ (ပူစီနံ)",
    nameEn: "Peppermint / Mint",
    scientificName: "Mentha piperita",
    category: "digestive",
    benefitsMm: [
      "ရင်ပြည့်ရင်ကယ်ဖြစ်ခြင်းနှင့် လေထိုးလေအောင့်ကို လျော့ပါးစေခြင်း",
      "ခေါင်းကိုက်ခြင်းနှင့် ဇက်ကြောတက်ခြင်းကို ပြေလျော့စေခြင်း",
      "ခံတွင်းအနံ့ဆိုးများကို ပျောက်ကင်းစေခြင်း"
    ],
    benefitsEn: [
      "Relieves digestive spasms, bloating, and abdominal pain",
      "Soothes tension headaches and relaxes stiff muscles",
      "Refreshes breath and combats oral bacteria"
    ],
    preparationMm: "ပူဒီနာအရွက်လတ်လတ်ဆတ်ဆတ် (၆-၈) ရွက်ကို ရေနွေးထဲတွင် (၅) မိနစ်ခန့်စိမ်၍ ပူဒီနာရေနွေးကြမ်းအဖြစ် သောက်သုံးနိုင်ပါသည်။ ခေါင်းကိုက်လျှင် ပူဒီနာဆီ သို့မဟုတ် အရွက်ကိုခြေပြီး နားထင်တွင် ပွတ်လိမ်းပေးပါ။",
    preparationEn: "Steep 6-8 fresh mint leaves in boiling water for 5 minutes to make refreshing Mint Tea. For headaches, apply diluted peppermint oil or crushed leaves to temples and forehead.",
    warningsMm: "ရင်ပူနာ (Gastroesophageal Reflux Disease - GERD) ဝေဒနာရှင်များ ပူဒီနာသောက်သုံးပါက ရင်ပူခြင်းကို ပိုမိုဆိုးရွားစေနိုင်ပါသည်။",
    warningsEn: "People with gastroesophageal reflux disease (GERD) or severe heartburn should limit mint usage as it may relax the esophageal sphincter.",
    imageAlt: "Fresh green mint leaves"
  },
  {
    id: "neem",
    nameMm: "တမာရွက်",
    nameEn: "Neem",
    scientificName: "Azadirachta indica",
    category: "immunity",
    benefitsMm: [
      "ပြင်းထန်သော ပိုးသတ်အာနိသင်ရှိပြီး အရေပြားယားယံခြင်းကို ပျောက်ကင်းစေခြင်း",
      "နှင်းခူ၊ ဝက်ခြံနှင့် ဒက်ပေါက်ခြင်းများကို သက်သာစေခြင်း",
      "သွားဖုံးရောင်ခြင်းနှင့် ခံတွင်းကျန်းမာရေးကို ကောင်းမွန်စေခြင်း"
    ],
    benefitsEn: [
      "Powerful antiseptic, antifungal, and antibacterial properties",
      "Relieves eczema, acne, dandruff, and skin infections",
      "Improves gum health and prevents plaque formation"
    ],
    preparationMm: "တမာရွက်ကို ရေနွေးဖြင့် ပြုတ်၍ ရရှိလာသောဆေးရည်ဖြင့် ကိုယ်လက်သန့်စင်ပေးပါ သို့မဟုတ် ယားယံသည့်နေရာများကို ဆေးကြောပေးပါ။ အရွက်ကို ကြိတ်၍ အနာများပေါ်တွင် အုံပေးနိုင်ပါသည်။",
    preparationEn: "Boil a handful of neem leaves in water, cool it, and use the liquid to wash affected skin areas, dandruff-prone hair, or minor wounds. Crushed leaves can be applied as a poultice.",
    warningsMm: "တမာရွက်ပြုတ်ရည်ကို သောက်သုံးရန်အတွက် အလွန်အကျွံ အသုံးမပြုသင့်ပါ။ ကိုယ်ဝန်ဆောင်များနှင့် ကလေးများ မသောက်သုံးသင့်ပါ။",
    warningsEn: "Avoid oral consumption in high amounts. Not recommended for pregnant women or young children.",
    imageAlt: "Green neem leaves"
  }
];

export const SYMPTOMS_DATA: SymptomGuide[] = [
  {
    id: "cough",
    titleMm: "ချောင်းဆိုးခြင်း",
    titleEn: "Coughing",
    descriptionMm: "ချောင်းဆိုးခြင်းသည် အသက်ရှူလမ်းကြောင်းအတွင်းရှိ ဖုန်မှုန့်များနှင့် ချွဲသလိပ်များကို သန့်စင်ရန် ခန္ဓာကိုယ်၏ သဘာဝတုံ့ပြန်မှုတစ်ခု ဖြစ်သည်။ သို့သော် အအေးမိခြင်း သို့မဟုတ် ပိုးဝင်ခြင်းကြောင့် အဆက်မပြတ် ဆိုးနေပါက ကုသရန် လိုအပ်ပါသည်။",
    descriptionEn: "Coughing is a natural reflex to clear irritants and mucus from your airway. Persistent coughing from a cold or throat irritation can be managed effectively at home.",
    remediesMm: [
      "ပျားရည် လက်ဖက်ရည်ဇွန်း (၁) ဇွန်းကို ရေနွေးနွေး သို့မဟုတ် သံပရာရည်နှင့် ရောသောက်ပါ (အသက် ၁ နှစ်အထက်သာ)",
      "ချင်းပြုတ်ရည် (Ginger Tea) နွေးနွေးကို တစ်နေ့ ၂-၃ ကြိမ် သောက်ပေးပါ",
      "ဆားရည်နွေးနွေးဖြင့် တစ်နေ့ ၃ ကြိမ် လည်ချောင်းဆေး (Gargle) ပေးပါ",
      "ရေနွေးငွေ့ ရှူပေးခြင်း (Steam Inhalation) ဖြင့် ချွဲများကို ပျော်ဆင်းစေပါ"
    ],
    remediesEn: [
      "Take 1 teaspoon of honey directly or mixed with warm water and lemon (Ages 1+ only)",
      "Drink warm Ginger Tea 2-3 times daily to soothe the airways",
      "Gargle with warm salt water (1/2 tsp salt in 1 cup water) 3 times a day",
      "Inhale steam from a bowl of hot water to loosen stubborn mucus"
    ],
    redFlagsMm: [
      "အသက်ရှူရ ခက်ခဲခြင်း သို့မဟုတ် အသက်ရှူလျှင် အသံတရွှီရွှီမြည်ခြင်း",
      "ချွဲထဲတွင် သွေးပါခြင်း",
      "ချောင်းဆိုးခြင်းသည် (၃) ပတ်ထက်ကျော်လွန်ပြီး မသက်သာဘဲ ပိုမိုဆိုးရွားလာခြင်း",
      "ဖျားခြင်း၊ ရင်ဘတ်အောင့်ခြင်းနှင့်အတူ အားအင်ကုန်ခမ်းခြင်း"
    ],
    redFlagsEn: [
      "Difficulty breathing, shortness of breath, or wheezing sounds",
      "Coughing up blood or rust-colored phlegm",
      "Cough lasting longer than 3 weeks without improvement",
      "High fever, localized chest pain, and severe fatigue"
    ],
    iconName: "Activity"
  },
  {
    id: "fever",
    titleMm: "အဖျားတက်ခြင်း",
    titleEn: "Fever (Warmth)",
    descriptionMm: "ခန္ဓာကိုယ်အပူချိန် မြင့်တက်လာခြင်းသည် ပိုးဝင်မှုများကို တိုက်ဖျက်ရန် ကိုယ်ခံအားစနစ်က လုပ်ဆောင်နေသည့် လက္ခဏာဖြစ်သည်။ အပူချိန် အလွန်မကြီးပါက အိမ်တွင် စနစ်တကျ ပြုစုကုသနိုင်ပါသည်။",
    descriptionEn: "A temporary increase in body temperature is a sign that your immune system is actively fighting off an infection. Mild fevers can be comfortably managed at home.",
    remediesMm: [
      "ရေပတ်တိုက်ပေးခြင်း - ရေနွေးနွေး သို့မဟုတ် ရေရိုးရိုးသုံး၍ နဖူး၊ ဂျိုင်း၊ ပေါင်ခြံတို့ကို သန့်ရှင်းသောမျက်နှာသုတ်ပဝါဖြင့် ခပ်ဖွဖွ ပွတ်တိုက်ပေးပါ (ရေအေး သို့မဟုတ် ရေခဲရေ မသုံးရပါ)",
      "ရေနှင့် သစ်သီးဖျော်ရည်များ အပါအဝင် အရည်များများ သောက်ပေးပါ",
      "ပေါ့ပေါ့ပါးပါး အဝတ်အစားများကို ဝတ်ဆင်ပြီး လေဝင်လေထွက်ကောင်းသော အခန်းတွင် အနားယူပါ",
      "ဆရာဝန်ညွှန်ကြားချက်အတိုင်း ပါရာစီတမောကို သင့်တော်သောပမာဏဖြင့် သောက်ပါ"
    ],
    remediesEn: [
      "Lukewarm sponge bath - wipe forehead, underarms, and groin using a wet cloth (Do NOT use cold water or ice water)",
      "Stay hydrated by drinking plenty of water, broth, or rehydration salts (ORS)",
      "Wear lightweight, breathable clothing and rest in a well-ventilated room",
      "Take Paracetamol (Acetaminophen) as directed in standard dosage guidelines"
    ],
    redFlagsMm: [
      "ကိုယ်အပူချိန် (၁၀၃) ဒီဂရီဖာရင်ဟိုက် ထက် ကျော်လွန်ခြင်း",
      "ဇက်ခိုင်ခြင်း၊ ခေါင်းပြင်းထန်စွာကိုက်ခြင်း၊ အလင်းရောင်မခံနိုင်ခြင်း",
      "သတိလွတ်ခြင်း၊ ကယောင်ကတမ်းဖြစ်ခြင်း သို့မဟုတ် တက်ခြင်း",
      "အဖျားသည် (၃) ရက်ထက်ကျော်လွန်ပြီး လုံးဝမကျခြင်း"
    ],
    redFlagsEn: [
      "Body temperature exceeding 103°F (39.4°C) that doesn't respond to medicine",
      "Stiff neck, severe headache, or high sensitivity to bright light",
      "Confusion, extreme drowsiness, hallucinations, or convulsions/seizures",
      "Fever lasting more than 3 consecutive days"
    ],
    iconName: "Activity"
  },
  {
    id: "stomachache",
    titleMm: "ဗိုက်နာ/လေပွခြင်း",
    titleEn: "Stomachache & Bloating",
    descriptionMm: "ဗိုက်နာခြင်းနှင့် လေပွခြင်းသည် အစာမကြေခြင်း၊ အစားမှားခြင်း သို့မဟုတ် လေထိုးလေအောင့်ဖြစ်ခြင်းတို့ကြောင့် အဖြစ်များတတ်သည်။",
    descriptionEn: "Abdominal discomfort, bloating, and gas often stem from simple indigestion, eating high-fiber foods too quickly, or mild food irritation.",
    remediesMm: [
      "ချင်းရေနွေးကြမ်း သို့မဟုတ် ပူဒီနာရေနွေးကြမ်း ပူပူနွေးနွေးကို ဖြည်းဖြည်းချင်း သောက်ပေးပါ",
      "ဗိုက်ပေါ်တွင် ရေနွေးအိတ် (Warm compress) အုံပေးပါ",
      "အစာကို နူးနူးညံ့ညံ့နှင့် ပမာဏနည်းနည်းစီ ခွဲစားပါ (ဥပမာ - ဆန်ပြုတ်၊ ငှက်ပျောသီး)",
      "နို့နှင့် ဂျုံကဲ့သို့ လေထစေသော အစားအစာများကို ခေတ္တရှောင်ပါ"
    ],
    remediesEn: [
      "Sip warm Ginger Tea or Mint Tea slowly to relax intestinal muscles",
      "Apply a hot water bottle or warm compress over your stomach to ease cramps",
      "Eat light, easily digestible meals in small portions (e.g., rice porridge, banana)",
      "Avoid carbonated drinks, dairy, and heavy foods that cause excess gas"
    ],
    redFlagsMm: [
      "ဗိုက်ကို ထိ၍မရလောက်အောင် ချက်ချင်း ပြင်းထန်စွာ နာကျင်အောင့်တက်လာခြင်း (အတက်ပေါက်ခြင်း သံသယ)",
      "အန်ခြင်း၊ အန်ဖတ်ထဲတွင် သွေးပါခြင်း သို့မဟုတ် ဝမ်းအမည်းရောင်သွားခြင်း",
      "ဗိုက်နာခြင်းနှင့်အတူ အဖျားတက်ခြင်းနှင့် မူးဝေမိန်းမောခြင်း"
    ],
    redFlagsEn: [
      "Sudden, localized, and agonizing pain, especially in the lower right abdomen",
      "Persistent vomiting, vomiting blood, or passing dark, tarry black stools",
      "Severe abdominal pain accompanied by high fever and lightheadedness"
    ],
    iconName: "Activity"
  }
];

export const FIRST_AID_DATA: FirstAidGuide[] = [
  {
    id: "burns",
    titleMm: "မီးလောင်/ရေနွေးပူလောင်ခြင်း",
    titleEn: "Minor Burns",
    descriptionMm: "မီးဖိုချောင်တွင်ဖြစ်စေ၊ အိမ်တွင်းအလုပ်များလုပ်ရာတွင်ဖြစ်စေ မတော်တဆ အပူလောင်မိပါက အရေပြားကို အမြန်ဆုံး အအေးပေးရန် လိုအပ်ပါသည်။",
    descriptionEn: "For minor (first-degree) burns from kitchen stoves, hot water, or steam, immediate cooling is key to reducing skin damage.",
    steps: [
      {
        step: 1,
        titleMm: "ရေအေးအေးဖြင့် ဆေးကြောပါ",
        titleEn: "Cool Running Water",
        descMm: "လောင်သွားသော နေရာကို စီးကျနေသော ရေအေး (ရေခဲရေမဟုတ်) ဖြင့် (၁၀) မိနစ်မှ (၂၀) မိနစ်ခန့် စဉ်ဆက်မပြတ် လောင်းပေးပါ။ သို့မဟုတ် ရေစိမ်ထားပေးပါ။",
        descEn: "Hold the burned area under cool (not freezing) running tap water for 10 to 20 minutes, or submerge it until pain subsides."
      },
      {
        step: 2,
        titleMm: "လက်ဝတ်ရတနာများ ချွတ်ပါ",
        titleEn: "Remove Tight Items",
        descMm: "အနာရှိသော နေရာတွင် ဝတ်ဆင်ထားသော လက်စွပ်၊ လက်ကောက်များကို ဖူးရောင်မလာမီ ညင်သာစွာ အမြန်ချွတ်ထားပါ။",
        descEn: "Gently slip off rings, bracelets, or tight clothing from the burned limb before swelling begins."
      },
      {
        step: 3,
        titleMm: "အနာကို ဖုံးအုပ်ပါ",
        titleEn: "Cover with Clean Cloth",
        descMm: "သန့်ရှင်းပြီး ပိုးသတ်ထားသော ပတ်တီး သို့မဟုတ် ချည်ထည်စအခြောက်ဖြင့် အနာကို ဖုန်မဝင်အောင် ပတ်ပေးထားပါ။ အနာကို တင်းတင်းကျပ်ကျပ် မစည်းရပါ။",
        descEn: "Cover the burn loosely with a sterile, non-stick bandage or a clean dry cloth to shield it from bacteria."
      }
    ],
    dontsMm: [
      "ရေခဲ သို့မဟုတ် ရေခဲရေ တိုက်ရိုက်မတင်ရပါ (အရေပြားတစ်ရှူးများကို ပျက်စီးစေနိုင်၍ဖြစ်သည်)",
      "သွားတိုက်ဆေး၊ ထောပတ်၊ ဆီ သို့မဟုတ် သနပ်ခါးများ တိုက်ရိုက်မလိမ်းရပါ (ပိုးဝင်စေနိုင်သလို အပူကို အထဲတွင် ပိတ်မိစေနိုင်သောကြောင့်ဖြစ်သည်)",
      "ထွက်လာသော ရေကြည်ဖုများကို အပ်ဖြင့် ထိုးဖောက်ခြင်း လုံးဝမပြုလုပ်ရပါ"
    ],
    dontsEn: [
      "Do NOT apply ice or freezing ice water directly (can cause tissue frostbite)",
      "Do NOT apply toothpaste, butter, oil, soy sauce, or herbs (traps heat and increases infection risk)",
      "Do NOT pop blister bubbles, as the intact skin acts as a sterile shield against infection"
    ],
    iconName: "ShieldAlert"
  },
  {
    id: "bleeding",
    titleMm: "သွေးထွက်သံယိုဖြစ်ခြင်း",
    titleEn: "Bleeding & Cuts",
    descriptionMm: "ပြတ်ရှနာ သို့မဟုတ် ထိခိုက်မိ၍ သွေးအလွန်အကျွံ ထွက်ပါက အဓိကရည်ရွယ်ချက်မှာ သွေးတိတ်စေရန် ဖိအားပေးခြင်း ဖြစ်သည်။",
    descriptionEn: "For minor and moderate cuts or punctures, the immediate first-aid priority is to control blood loss through steady pressure.",
    steps: [
      {
        step: 1,
        titleMm: "တိုက်ရိုက် ဖိအားပေးပါ",
        titleEn: "Direct Pressure",
        descMm: "သန့်ရှင်းသော အဝတ်စ သို့မဟုတ် ဂွမ်းပတ်တီးကို အသုံးပြု၍ သွေးထွက်နေသော နေရာပေါ်သို့ လက်ဖြင့် (၅) မိနစ်ခန့် တောက်လျှောက် ဖိထားပေးပါ။",
        descEn: "Place a clean cloth, sterile gauze, or your bare hand (if clean) over the wound and apply firm, continuous pressure for 5 minutes."
      },
      {
        step: 2,
        titleMm: "အနာကို မြှင့်ထားပါ",
        titleEn: "Elevate the Wound",
        descMm: "ဖြစ်နိုင်လျှင် သွေးထွက်နေသော အစိတ်အပိုင်း (ဥပမာ - လက်၊ ခြေ) ကို နှလုံးရှိရာ အမြင့်ထက် မြင့်အောင် မြှောက်ထားပေးပါ။",
        descEn: "If possible, raise the injured limb above the level of the patient's heart to reduce blood pressure to the site."
      },
      {
        step: 3,
        titleMm: "ဆေးကြောသန့်စင်ပါ",
        titleEn: "Clean and Protect",
        descMm: "သွေးတိတ်သွားပါက အနာပတ်ဝန်းကျင်ကို ရေနှင့် ဆပ်ပြာသုံး၍ ညင်သာစွာ ဆေးကြောပါ၊ ထို့နောက် ပိုးသတ်ဆေးလိမ်းကာ ပတ်တီးစည်းပါ။",
        descEn: "Once bleeding stops, rinse the wound gently with clean water, pat dry, apply antiseptic cream, and cover with a sterile band-aid."
      }
    ],
    dontsMm: [
      "အနာအတွင်း စိုက်ဝင်နေသော သံချောင်း သို့မဟုတ် မှန်စများကို ကိုယ်တိုင် ဆွဲမနှုတ်ရပါ (သွေးပိုထွက်စေနိုင်သဖြင့် ဆေးရုံတွင်သာ လုပ်ဆောင်ရပါမည်)",
      "ညစ်ပေသော အဝတ်စများဖြင့် သွေးတိတ်အောင် မဖိရပါ"
    ],
    dontsEn: [
      "Do NOT pull out deeply embedded objects like glass or rusty nails yourself (may trigger massive internal bleeding)",
      "Do NOT use dirty rugs or leaves to apply pressure, as this easily introduces tetanus germs"
    ],
    iconName: "ShieldAlert"
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    nameMm: "အရေးပေါ် လူနာတင်ယာဉ် (Ambulance)",
    nameEn: "Emergency Ambulance Services",
    phone: "192",
    descriptionMm: "မြန်မာနိုင်ငံတစ်ဝန်း အရေးပေါ် ကျန်းမာရေးနှင့် ဆေးရုံပို့ဆောင်ရေး ဝန်ဆောင်မှု",
    descriptionEn: "National emergency medical and ambulance dispatch across Myanmar"
  },
  {
    nameMm: "မြန်မာနိုင်ငံ ကြက်ခြေနီအသင်း (Red Cross)",
    nameEn: "Myanmar Red Cross Society",
    phone: "01392030",
    descriptionMm: "ရှေးဦးသူနာပြုစုခြင်းနှင့် အရေးပေါ်ကယ်ဆယ်ရေး လုပ်ငန်းများ",
    descriptionEn: "First-aid services, emergency response, and community health"
  },
  {
    nameMm: "မီးသတ်ဦးစီးဌာန (Fire & Rescue)",
    nameEn: "Fire & Rescue Department",
    phone: "191",
    descriptionMm: "မီးလောင်မှုများနှင့် ရှာဖွေကယ်ဆယ်ရေး လုပ်ငန်းများ",
    descriptionEn: "Fire emergencies and disaster search-and-rescue assistance"
  },
  {
    nameMm: "ရန်ကုန် ပြည်သူ့ဆေးရုံကြီး (Yangon General Hospital)",
    nameEn: "Yangon General Hospital (Emergency)",
    phone: "01373155",
    descriptionMm: "ရန်ကုန်မြို့ရှိ အရေးပေါ်ဌာနနှင့် ဆေးကုသမှု",
    descriptionEn: "Main emergency room and trauma service in Yangon region"
  }
];
