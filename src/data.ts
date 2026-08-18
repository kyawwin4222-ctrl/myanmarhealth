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
    warningsMm: "တမာရွက်ပြုတ်ရည်ကို သောက်သုံးရန်အတွက် အလွန်အကျွံ အသုံးမပြုသင့်ပါ။ ကိုယ်ဝန်ဆောင်များနှင့် ကလေးငယ်များ မသောက်သုံးသင့်ပါ။",
    warningsEn: "Avoid oral consumption in high amounts. Not recommended for pregnant women or young children.",
    imageAlt: "Green neem leaves"
  },
  {
    id: "aloe-vera",
    nameMm: "ရှားစောင်းလက်ပတ်",
    nameEn: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    category: "general",
    benefitsMm: [
      "မီးလောင်နာ၊ နေလောင်နာနှင့် အပူလောင်ဒဏ်ရာများကို ချက်ချင်း အေးမြသက်သာစေခြင်း",
      "အသားအရေ စိုပြေဝင်းပစေပြီး အမာရွတ်များကို မှေးမှိန်စေခြင်း",
      "အစာခြေလမ်းကြောင်းကို အေးမြစေပြီး ဝမ်းချုပ်ခြင်းကို သက်သာစေခြင်း"
    ],
    benefitsEn: [
      "Soothes minor burns, sunburns, and heat-induced skin irritations instantly",
      "Hydrates skin, promotes tissue repair, and fades minor scars",
      "Cools the digestive tract and provides natural gentle laxative action"
    ],
    preparationMm: "ရှားစောင်းလက်ပတ်၏ အပေါ်ခွံစိမ်းနှင့် အဝါရောင်အစေးများကို သေချာဖယ်ရှားပါ။ အတွင်းမှ ကြည်လင်သောအနှစ် (Gel) ကို အနာပေါ် သို့မဟုတ် မျက်နှာပေါ် သုတ်လိမ်းပေးပါ။ ဖျော်ရည်အဖြစ် သောက်သုံးလိုပါက အနှစ်ကို သေချာဆေးကြောပြီး သံပရာရည်၊ ပျားရည်တို့ဖြင့် ဖျော်သောက်နိုင်ပါသည်။",
    preparationEn: "Peel off the green outer skin and wash away the yellow aloin latex. Apply the clear inner gel directly to sunburns or irritated skin. For internal wellness, blend washed gel with water, honey, and lime juice.",
    warningsMm: "အဝါရောင်အစေး (Aloin) ပါဝင်ပါက ဗိုက်ရစ်ပြီး ဝမ်းလျှောစေနိုင်သဖြင့် သေချာဆေးကြောပြီးမှ သုံးစွဲရပါမည်။ ကိုယ်ဝန်ဆောင်များ အတွင်းသားကို မစားသုံးသင့်ပါ။",
    warningsEn: "Wash off the yellow latex completely as it can cause strong intestinal cramps. Pregnant women should avoid oral ingestion.",
    imageAlt: "Fresh cut Aloe Vera leaf and gel"
  },
  {
    id: "lemongrass",
    nameMm: "စပါးလင်",
    nameEn: "Lemongrass",
    scientificName: "Cymbopogon citratus",
    category: "respiratory",
    benefitsMm: [
      "အဖျားကျစေပြီး ချွေးထွက်စေကာ တုပ်ကွေးဝေဒနာကို ယူပစ်သလို သက်သာစေခြင်း",
      "သွေးတိုးကျစေပြီး သွေးလည်ပတ်မှုကို ကောင်းမွန်စေခြင်း",
      "လေထိုးလေအောင့်နှင့် အစာမကြေခြင်းကို ပျောက်ကင်းစေခြင်း"
    ],
    benefitsEn: [
      "Reduces fever, promotes sweating, and eases flu chills",
      "Helps regulate blood pressure and supports cardiovascular circulation",
      "Calms stomach cramps, digestive spasms, and bloating"
    ],
    preparationMm: "စပါးလင် (၂-၃) ပင်ကို ထုထောင်းပြီး ရေ (၁) လီတာခန့်တွင် (၁၀) မိနစ်ခန့် ပြုတ်ပါ။ ရရှိလာသော စပါးလင်ရေနွေးကြမ်းကို ပူပူနွေးနွေး သောက်သုံးပေးခြင်းဖြင့် အဖျားကျပြီး ချွေးထွက်သက်သာစေပါသည်။",
    preparationEn: "Crush 2-3 stalks of lemongrass and simmer in a pot of water for 10 minutes. Strain and drink hot as a herbal tea to induce therapeutic sweating and relieve fever.",
    warningsMm: "ကိုယ်ဝန်ဆောင်မိခင်များ အလွန်အကျွံ သောက်သုံးခြင်းကို ရှောင်ကြဉ်သင့်ပါသည်။",
    warningsEn: "Pregnant women should avoid consuming highly concentrated lemongrass decoctions.",
    imageAlt: "Fresh stalks of lemongrass"
  },
  {
    id: "lemon",
    nameMm: "သံပရာသီး / သံပရိုသီး",
    nameEn: "Lemon / Lime",
    scientificName: "Citrus aurantiifolia",
    category: "immunity",
    benefitsMm: [
      "ဗီတာမင်စီ (Vitamin C) အလွန်ကြွယ်ဝသဖြင့် ကိုယ်ခံစွမ်းအားကို သိသိသာသာ တက်စေခြင်း",
      "လည်ချောင်းနာခြင်းနှင့် ချွဲသလိပ်ကျပ်ခြင်းကို သက်သာစေခြင်း",
      "အဆီကျစေပြီး ခန္ဓာကိုယ်တွင်း အဆိပ်အတောက်များကို သန့်စင်ပေးခြင်း"
    ],
    benefitsEn: [
      "Exceptionally rich in Vitamin C, boosting overall immunity",
      "Dissolves stubborn phlegm and soothes irritated throat linings",
      "Aids natural detox and stimulates digestive enzymes"
    ],
    preparationMm: "သံပရာသီးတစ်ခြမ်းကို ရေနွေးနွေးတစ်ဖန်ခွက်ထဲသို့ ညှစ်ထည့်ပြီး ပျားရည် လက်ဖက်ရည်ဇွန်း (၁) ဇွန်း ရောစပ်ကာ နံနက်စောစော သောက်သုံးပေးနိုင်ပါသည်။",
    preparationEn: "Squeeze half a fresh lime or lemon into a glass of lukewarm water, stir in 1 teaspoon of raw honey, and drink in the morning for best vitality.",
    warningsMm: "အစာအိမ်အချဉ်ပေါက်တတ်သူများ သံပရာရည်ကို ရေများများမရောဘဲ အပြင်းစား မသောက်သင့်ပါ။ သွားကြွေလွှာကို မထိခိုက်စေရန် သောက်ပြီးပါက ရေဖြင့် ပလုတ်ကျင်းပေးပါ။",
    warningsEn: "Those with severe acid reflux should dilute lemon juice well. Rinse mouth with plain water after drinking to protect tooth enamel.",
    imageAlt: "Fresh green limes and sliced lemons"
  },
  {
    id: "tamarind",
    nameMm: "မန်ကျည်းသီး",
    nameEn: "Tamarind",
    scientificName: "Tamarindus indica",
    category: "digestive",
    benefitsMm: [
      "ဝမ်းမှန်စေပြီး ဝမ်းချုပ်ခြင်းကို အမြန်ဆုံး သက်သာစေခြင်း",
      "အပူငြိမ်းစေပြီး နေလောင်အပူလျှပ်ခြင်းကို ကာကွယ်ပေးခြင်း",
      "သွေးတွင်းကိုလက်စထရောကို လျှော့ချပေးပြီး အသည်းကျန်းမာရေးကို အထောက်အကူပြုခြင်း"
    ],
    benefitsEn: [
      "Natural mild laxative that promotes healthy, regular bowel movement",
      "Cools internal body heat and protects against heat exhaustion",
      "Supports liver wellness and aids in natural cholesterol management"
    ],
    preparationMm: "မန်ကျည်းမှည့်ကို ရေနွေးတွင် ခေတ္တစိမ်၍ ချေပြီး အနှစ်ရအောင် ပြုလုပ်ပါ။ ထန်းလျက် သို့မဟုတ် သကြားအနည်းငယ်၊ ဆားအနည်းငယ်ထည့်၍ မန်ကျည်းဖျော်ရည်အဖြစ် သောက်သုံးနိုင်ပါသည်။",
    preparationEn: "Soak ripe tamarind pulp in warm water and squeeze to extract the rich juice. Mix with a little palm sugar (jaggery) and a pinch of salt to make a cooling Tamarind beverage.",
    warningsMm: "ဝမ်းလျှောနေသူများ မန်ကျည်းသီး မစားသုံးသင့်ပါ။",
    warningsEn: "Avoid consuming tamarind when experiencing acute diarrhea or loose stools.",
    imageAlt: "Ripe tamarind pods and pulp"
  },
  {
    id: "amla",
    nameMm: "ဆီးဖြူသီး",
    nameEn: "Indian Gooseberry (Amla)",
    scientificName: "Phyllanthus emblica",
    category: "immunity",
    benefitsMm: [
      "သဘာဝဗီတာမင်စီ အကြွယ်ဝဆုံး အသီးဖြစ်ပြီး ကိုယ်ခံစွမ်းအားကို အလွန်အမင်း တိုးတက်စေခြင်း",
      "မျက်စိအားကောင်းစေပြီး ဆံပင်ကျွတ်ခြင်းကို သက်သာစေခြင်း",
      "ဆီးချိုသွေးချိုနှင့် သွေးတိုးကို ထိန်းညှိပေးပြီး အိုမင်းရင့်ရော်မှုကို တားဆီးပေးခြင်း"
    ],
    benefitsEn: [
      "One of the richest natural sources of Vitamin C and powerful antioxidants",
      "Strengthens hair roots, prevents premature graying, and enhances eyesight",
      "Helps balance blood glucose levels and slows cellular aging"
    ],
    preparationMm: "ဆီးဖြူသီး လတ်လတ်ဆတ်ဆတ်ကို ဒီအတိုင်း ဝါးစားနိုင်သလို၊ ထောင်းပြီး အရည်ညှစ်ကာ ပျားရည်နှင့် ရောစပ်သောက်သုံးနိုင်ပါသည်။ အခြောက်လှန်းထားသော အမှုန့်ကိုလည်း ရေနွေးဖြင့် သောက်သုံးနိုင်ပါသည်။",
    preparationEn: "Eat fresh amla fruits directly, or extract the juice by pounding and mix with honey. Amla dried powder can also be mixed into warm water.",
    warningsMm: "ခွဲစိတ်မှုခံယူရန်ရှိသူများ ဆီးဖြူသီး အများအပြား စားသုံးခြင်းကို ခေတ္တရှောင်ကြဉ်သင့်ပါသည်။",
    warningsEn: "May increase risk of bleeding in individuals with bleeding disorders or those undergoing surgery.",
    imageAlt: "Fresh green amla gooseberries"
  },
  {
    id: "tulsi",
    nameMm: "ပင်စိမ်းရွက်",
    nameEn: "Holy Basil (Tulsi)",
    scientificName: "Ocimum tenuiflorum",
    category: "respiratory",
    benefitsMm: [
      "ပန်းနာရင်ကျပ်၊ ချောင်းဆိုးနှင့် အသက်ရှူလမ်းကြောင်းပိုးဝင်ခြင်းကို သက်သာစေခြင်း",
      "စိတ်ဖိစီးမှုနှင့် စိုးရိမ်ပူပန်မှုကို လျော့ကျစေပြီး ဦးနှောက်ကြည်လင်စေခြင်း",
      "အဖျားကျစေပြီး ခန္ဓာကိုယ်အပူချိန်ကို ပုံမှန်ဖြစ်စေခြင်း"
    ],
    benefitsEn: [
      "Powerful adaptogen that relieves asthma, bronchitis, and respiratory congestion",
      "Reduces psychological stress and improves cognitive clarity",
      "Acts as a gentle antipyretic to normalize body temperature during fevers"
    ],
    preparationMm: "ပင်စိမ်းရွက် (၅-၁၀) ရွက်ကို ရေနွေးဆူဆူတွင် (၅) မိနစ်ခန့် စိမ်၍ ရေနွေးကြမ်းအဖြစ် သောက်သုံးပါ။ အရွက်ကို ကြိတ်ပြီး ရရှိသော အရည်ကို ပျားရည်နှင့် ရော၍ ချောင်းဆိုးသက်သာစေရန် လျက်ပေးနိုင်ပါသည်။",
    preparationEn: "Steep 5-10 fresh tulsi leaves in hot water for 5 minutes as herbal tea. Or extract fresh leaf juice and blend with honey for instant cough relief.",
    warningsMm: "ဆီးချိုကျဆေး သောက်နေသူများ ပင်စိမ်းကို သောက်သုံးပါက သွေးတွင်းသကြားဓာတ် ပိုကျသွားနိုင်သဖြင့် သတိပြုသင့်ပါသည်။",
    warningsEn: "May enhance the effects of blood-sugar-lowering medications; monitor glucose levels if using regularly.",
    imageAlt: "Fresh holy basil tulsi leaves"
  },
  {
    id: "gotu-kola",
    nameMm: "မြင်းခွာရွက် (မိုးနှံနံ)",
    nameEn: "Pennywort (Gotu Kola)",
    scientificName: "Centella asiatica",
    category: "general",
    benefitsMm: [
      "မှတ်ဉာဏ်ကောင်းစေပြီး ဦးနှောက်နှင့် အာရုံကြောစနစ်ကို အားကောင်းစေခြင်း",
      "သွေးတိုးကျစေပြီး သွေးကြောများကို ကျန်းမာစေခြင်း",
      "အပူငြိမ်းစေပြီး ခန္ဓာကိုယ်တွင်း အနာကျက်မြန်စေခြင်း"
    ],
    benefitsEn: [
      "Enhances memory retention, focus, and supports nervous system health",
      "Improves blood circulation and helps lower high blood pressure",
      "Cools internal inflammation and promotes faster wound healing"
    ],
    preparationMm: "မြင်းခွာရွက်ကို သုပ်စားနိုင်သလို၊ အရွက်ကို သန့်စင်အောင်ဆေးပြီး ဖျော်စက်ဖြင့် ကြိတ်ကာ သံပရာရည်၊ သကြားအနည်းငယ် ထည့်၍ မြင်းခွာရွက်ဖျော်ရည်အဖြစ် သောက်သုံးနိုင်ပါသည်။",
    preparationEn: "Enjoy as a fresh herb salad, or blend fresh leaves with water, a dash of lime juice, and sweeten lightly for a rejuvenating brain tonic drink.",
    warningsMm: "အသည်းရောဂါ ပြင်းထန်စွာ ခံစားနေရသူများ အလွန်အကျွံ မသောက်သုံးသင့်ပါ။",
    warningsEn: "Large excessive amounts over extended periods should be avoided by patients with severe liver disorders.",
    imageAlt: "Fresh gotu kola pennywort leaves"
  },
  {
    id: "papaya-leaf",
    nameMm: "သင်္ဘောရွက် / သင်္ဘောသီး",
    nameEn: "Papaya / Papaya Leaf",
    scientificName: "Carica papaya",
    category: "digestive",
    benefitsMm: [
      "သင်္ဘောရွက်အရည်သည် သွေးလွန်တုပ်ကွေးဖြစ်ပွားချိန်တွင် သွေးဥမွှား (Platelets) များကို တက်စေရန် ကူညီပေးခြင်း",
      "သင်္ဘောသီးမှည့်သည် အစာကြေလွယ်စေပြီး ဝမ်းချုပ်ခြင်းကို သဘာဝအတိုင်း ဖြေရှင်းပေးခြင်း",
      "အစာအိမ်အတွင်းရှိ ပိုးမွှားများနှင့် သန်ကောင်များကို နှိမ်နင်းပေးခြင်း"
    ],
    benefitsEn: [
      "Papaya leaf extract is renowned for supporting blood platelet counts during viral fevers",
      "Ripe papaya fruit eases constipation through its papain digestive enzymes",
      "Seeds and raw fruit help combat intestinal parasites and optimize gut flora"
    ],
    preparationMm: "သွေးဥမွှားတက်စေရန်အတွက် သင်္ဘောရွက်နု (၂) ရွက်ကို သန့်ရှင်းစွာ ဆေးကြောပြီး ထောင်းကာ အရည်စစ်ယူပါ။ ထမင်းစားဇွန်း (၁-၂) ဇွန်းခန့်ကို တစ်နေ့ (၂) ကြိမ် သောက်ပေးနိုင်ပါသည်။ ဝမ်းမှန်စေရန် သင်္ဘောသီးမှည့်ကို နေ့စဉ် စားပေးပါ။",
    preparationEn: "For platelet support, wash 2 tender papaya leaves, crush and squeeze out the fresh juice (take 1-2 tablespoons twice daily). For digestive ease, consume ripe papaya slices daily.",
    warningsMm: "သင်္ဘောသီးစိမ်းနှင့် သင်္ဘောရွက်တွင်ပါသော အစေးများသည် သားအိမ်ကျုံ့စေနိုင်သဖြင့် ကိုယ်ဝန်ဆောင်မိခင်များ လုံးဝ (လုံးဝ) မစားသုံးသင့်ပါ။",
    warningsEn: "Pregnant women must strictly avoid raw green papaya and papaya leaf extract due to uterine stimulation risks.",
    imageAlt: "Fresh papaya fruit and green leaves"
  },
  {
    id: "betel-leaf",
    nameMm: "ကွမ်းရွက်",
    nameEn: "Betel Leaf",
    scientificName: "Piper betle",
    category: "respiratory",
    benefitsMm: [
      "ကလေးငယ်များ ရင်ကျပ်၊ ချွဲကျပ်သည့်အခါ ရင်ဘတ်ပေါ် ကပ်ပေးပါက အသက်ရှူချောင်စေခြင်း",
      "ခံတွင်းပိုးမွှားများကို သေစေပြီး သွားဖုံးသွေးယိုခြင်းကို သက်သာစေခြင်း",
      "အဆစ်အမြစ်ရောင်ရမ်းခြင်းနှင့် ခေါင်းကိုက်ခြင်းကို လျော့ပါးစေခြင်း"
    ],
    benefitsEn: [
      "Warmed leaves applied on the chest relieve congestion and open pediatric airways",
      "Antimicrobial properties freshen breath and heal swollen, bleeding gums",
      "Topical application reduces joint inflammation and tension headaches"
    ],
    preparationMm: "ရင်ကျပ်လျှင် ကွမ်းရွက်ကို မီးအေးအေးဖြင့် ကင်ပြီး နှမ်းဆီ သို့မဟုတ် မုန်ညင်းဆီ အနည်းငယ်သုတ်ကာ ရင်ဘတ်ပေါ်သို့ နွေးနွေးလေး အုံပေးပါ။ ခံတွင်းအတွက် ကွမ်းရွက်ကို ရေနွေးဖြင့် ပြုတ်၍ ပလုတ်ကျင်းပေးနိုင်ပါသည်။",
    preparationEn: "Warm a betel leaf gently over mild heat, smear with a drop of sesame or mustard oil, and place warm on the chest to relieve tightness. Boil leaves in water to create an antiseptic mouth rinse.",
    warningsMm: "ကွမ်းယာအဖြစ် ထုံး၊ ဆေးရွက်ကြီးတို့နှင့် တွဲဖက်စားသုံးခြင်းသည် ခံတွင်းကင်ဆာ ဖြစ်စေနိုင်သဖြင့် ဆေးဖက်ဝင်နည်းလမ်းအတိုင်းသာ သီးသန့် အသုံးပြုရပါမည်။",
    warningsEn: "Do not chew betel leaves combined with tobacco or slaked lime as that causes oral malignancies; use only as isolated medicinal therapy.",
    imageAlt: "Heart shaped green betel leaves"
  },
  {
    id: "moringa",
    nameMm: "ဒန့်ဒလွန်ရွက် / ဒန့်ဒလွန်သီး",
    nameEn: "Moringa (Drumstick Tree)",
    scientificName: "Moringa oleifera",
    category: "immunity",
    benefitsMm: [
      "ဗီတာမင်၊ သံဓာတ်၊ ကယ်လ်စီယမ်နှင့် အာဟာရဓာတ်များ အလွန်ကြွယ်ဝသဖြင့် သွေးအားနည်းရောဂါကို ကာကွယ်ပေးခြင်း",
      "သွေးတိုးနှင့် သွေးတွင်းသကြားဓာတ်ကို ကျဆင်းစေခြင်း",
      "နို့တိုက်မိခင်များတွင် မိခင်နို့ရည် ထွက်ရှိမှုကို အားပေးခြင်း"
    ],
    benefitsEn: [
      "Superfood dense in iron, calcium, and essential vitamins; prevents anemia",
      "Assists in lowering high blood pressure and regulating blood sugar",
      "Acts as a powerful natural galactagogue, boosting breast milk supply in nursing mothers"
    ],
    preparationMm: "ဒန့်ဒလွန်ရွက်နုကို ဟင်းခါးချက်သောက်ပါ သို့မဟုတ် အရွက်ကို အခြောက်လှန်း အမှုန့်ပြုလုပ်၍ နေ့စဉ် ဟင်းလျာများ၊ ရေနွေးထဲသို့ လက်ဖက်ရည်ဇွန်း (၁) ဇွန်း ထည့်သွင်းသောက်သုံးနိုင်ပါသည်။",
    preparationEn: "Cook fresh moringa leaves into clear vegetable soups, or add 1 teaspoon of dried moringa leaf powder into hot water or smoothies daily.",
    warningsMm: "ဒန့်ဒလွန်ပင်၏ အမြစ်နှင့် အခေါက်များကို ကိုယ်ဝန်ဆောင်များ မစားသုံးသင့်ပါ။",
    warningsEn: "Pregnant women should avoid consuming moringa root or bark preparations.",
    imageAlt: "Fresh green moringa leaves and drumsticks"
  },
  {
    id: "red-onion",
    nameMm: "ကြက်သွန်နီ",
    nameEn: "Shallot / Red Onion",
    scientificName: "Allium cepa",
    category: "respiratory",
    benefitsMm: [
      "နှာစေး၊ နှာပိတ်နေချိန်တွင် အနံ့ရှူပေးရုံဖြင့် နှာခေါင်းချက်ချင်း ပွင့်စေခြင်း",
      "ချောင်းဆိုးခြင်းနှင့် လည်ချောင်းနာခြင်းကို သက်သာစေခြင်း",
      "သွေးတွင်းသကြားဓာတ်ကို ထိန်းညှိပေးပြီး နှလုံးကျန်းမာရေးကို ကောင်းမွန်စေခြင်း"
    ],
    benefitsEn: [
      "Inhaling crushed shallot aroma quickly clears blocked nasal passages and sinus congestion",
      "Suppresses bacterial throat irritations and soothes nagging coughs",
      "Helps regulate cholesterol and supports overall heart circulation"
    ],
    preparationMm: "နှာပိတ်လျှင် ကြက်သွန်နီကို ထက်ခြမ်းခြမ်း၍ ညင်သာစွာ ရှူရှိုက်ပေးပါ။ ချောင်းဆိုးလျှင် ကြက်သွန်နီကို ပါးပါးလှီးပြီး ပျားရည်နှင့် (၂) နာရီခန့် စိမ်ထားပြီး ထွက်လာသော အရည်ကို သောက်ပေးပါ။",
    preparationEn: "For nasal congestion, cut a red onion in half and inhale the pungent vapor. For coughs, macerate sliced onion in honey for 2 hours and sip the resulting syrup.",
    warningsMm: "အစိမ်းအလွန်အကျွံ စားပါက လေပွခြင်းနှင့် ခံတွင်းအနံ့နံခြင်း ဖြစ်စေနိုင်ပါသည်။",
    warningsEn: "Consuming excessive raw onions may cause gas, bloating, and temporary bad breath.",
    imageAlt: "Fresh red onions and shallots"
  },
  {
    id: "haritaki",
    nameMm: "ဖန်ခါးသီး",
    nameEn: "Chebulic Myrobalan (Haritaki)",
    scientificName: "Terminalia chebula",
    category: "digestive",
    benefitsMm: [
      "မြန်မာ့ရိုးရာ တိုင်းရင်းဆေးတွင် 'ဆေးဘုရင်' ဟု တင်စားပြီး အစာခြေစနစ်ကို အထူးကောင်းမွန်စေခြင်း",
      "ဝမ်းချုပ်ခြင်း၊ လိပ်ခေါင်းနှင့် အစာအိမ်ရောဂါများကို ပျောက်ကင်းစေခြင်း",
      "သွေးသန့်စေပြီး အသက်ရှည်ကျန်းမာစေခြင်း"
    ],
    benefitsEn: [
      "Revered as the 'King of Medicines' in traditional healing for complete digestive rejuvenation",
      "Relieves chronic constipation, hemorrhoids, and gastrointestinal ulcers",
      "Purifies blood and enhances long-term cellular vitality"
    ],
    preparationMm: "ဖန်ခါးသီးအခြောက်မှုန့် လက်ဖက်ရည်ဇွန်း (၁) ဇွန်းကို ရေနွေးနွေး သို့မဟုတ် ပျားရည်နှင့် ရောစပ်၍ ညအိပ်ရာမဝင်မီ သောက်သုံးပေးခြင်းဖြင့် နံနက်တွင် ဝမ်းမှန်ကန်စွာ သွားစေပါသည်။",
    preparationEn: "Mix 1 teaspoon of Haritaki powder with warm water or honey and take before bedtime for gentle, natural bowel cleansing the next morning.",
    warningsMm: "ရေဓာတ်ခန်းခြောက်နေသူများနှင့် ကိုယ်ဝန်ဆောင်များ မသောက်သုံးသင့်ပါ။",
    warningsEn: "Avoid using if you are dehydrated, emaciated, or during pregnancy.",
    imageAlt: "Dried Haritaki myrobalan fruits"
  },
  {
    id: "cinnamon",
    nameMm: "သစ်ကြံပိုးခေါက်",
    nameEn: "Cinnamon",
    scientificName: "Cinnamomum verum",
    category: "general",
    benefitsMm: [
      "သွေးတွင်းသကြားဓာတ်ကို ကျဆင်းစေပြီး ဆီးချိုရောဂါရှင်များအတွက် အထူးသင့်လျော်ခြင်း",
      "သွေးလည်ပတ်မှု ကောင်းမွန်စေပြီး ကိုယ်တွင်းအအေးပတ်ခြင်းကို သက်သာစေခြင်း",
      "ခံတွင်းနံ့ဆိုးများကို ပျောက်ကင်းစေပြီး အစာကြေစေခြင်း"
    ],
    benefitsEn: [
      "Potent insulin-mimetic that helps regulate blood sugar levels naturally",
      "Warms internal circulation and relieves chills or sluggish metabolism",
      "Fights oral bacteria and stimulates sluggish digestion"
    ],
    preparationMm: "သစ်ကြံပိုးခေါက်အနည်းငယ်ကို ရေနွေးထဲတွင် (၁၀) မိနစ်ခန့် စိမ်၍ ရေနွေးကြမ်းအဖြစ် သောက်သုံးနိုင်ပါသည်။ နနွင်း၊ ပျားရည်တို့နှင့် ရောစပ်သောက်သုံးပါက ကိုယ်ခံအားကို ပိုမိုတက်စေပါသည်။",
    preparationEn: "Simmer a cinnamon stick in hot water for 10 minutes to brew Cinnamon Tea. Combine with honey and turmeric for a warm immunity elixir.",
    warningsMm: "အသည်းရောဂါရှိသူများ Cassia သစ်ကြံပိုးခေါက်ကို အလွန်အကျွံ စားသုံးခြင်းမှ ရှောင်ကြဉ်ရပါမည် (Coumarin ဓာတ်ကြောင့်ဖြစ်သည်)။",
    warningsEn: "Avoid large excessive daily doses if you have liver conditions due to coumarin compounds.",
    imageAlt: "Cinnamon sticks and ground powder"
  },
  {
    id: "clove",
    nameMm: "လေးညှင်းပွင့်",
    nameEn: "Clove",
    scientificName: "Syzygium aromaticum",
    category: "general",
    benefitsMm: [
      "သွားကိုက်ခြင်းနှင့် သွားဖုံးနာခြင်းကို ချက်ချင်း ထုံကျင်သက်သာစေခြင်း (Eugenol ဓာတ်ပါဝင်ခြင်း)",
      "ခံတွင်းအနံ့ဆိုးများကို ချက်ချင်း ပျောက်ကင်းစေခြင်း",
      "အစာမကြေခြင်းနှင့် ပျို့အန်ခြင်းကို သက်သာစေခြင်း"
    ],
    benefitsEn: [
      "Provides rapid numbing and pain relief for toothaches and gum soreness (rich in eugenol)",
      "Instantly eradicates foul breath and oral bacteria",
      "Relieves nausea, bloating, and stomach upset"
    ],
    preparationMm: "သွားကိုက်ပါက လေးညှင်းပွင့် (၁-၂) ပွင့်ကို ကိုက်နေသော သွားကြားတွင် ညှပ်ထားပေးပါ သို့မဟုတ် လေးညှင်းဆီ (Clove Oil) တစ်စက်ကို ဂွမ်းစဖြင့် တို့၍ သွားပေါ်သို့ တင်ထားပေးပါ။",
    preparationEn: "For toothaches, gently crush 1-2 whole cloves between the affected teeth, or apply a drop of clove oil diluted in olive oil on a cotton swab.",
    warningsMm: "လေးညှင်းဆီ အပြင်းစားကို သွားဖုံးအရေပြားပေါ် တိုက်ရိုက် မထိတွေ့စေရပါ (လောင်ကျွမ်းစေနိုင်သဖြင့် အဆီအခြားတစ်ခုဖြင့် ရောစပ်သုံးရပါမည်)။",
    warningsEn: "Do not apply undiluted essential clove oil directly onto sensitive gums as it may cause burning irritation.",
    imageAlt: "Dried whole cloves"
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
      "ချွဲထဲတွင် သွေးပါခြင်း သို့မဟုတ် အမည်းရောင်ချွဲများ ထွက်ခြင်း",
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
      "ရေပတ်တိုက်ပေးခြင်း - ရေနွေးနွေး သို့မဟုတ် ရေရိုးရိုးသုံး၍ နဖူး၊ ဂျိုင်း၊ ပေါင်ခြံတို့ကို သန့်ရှင်းသောမျက်နှာသုတ်ပဝါဖြင့် ခပ်ဖွဖွ ပွတ်တိုက်ပေးပါ (ရေခဲရေ မသုံးရပါ)",
      "ရေ၊ ဓာတ်ဆားရည်နှင့် စပါးလင်ရေနွေးကြမ်းများ သောက်ပေး၍ ရေဓာတ်ပြည့်ဝအောင် ထိန်းပါ",
      "ပေါ့ပေါ့ပါးပါး အဝတ်အစားများကို ဝတ်ဆင်ပြီး လေဝင်လေထွက်ကောင်းသော အခန်းတွင် အနားယူပါ",
      "ဆရာဝန်ညွှန်ကြားချက်အတိုင်း ပါရာစီတမောကို သင့်တော်သောပမာဏဖြင့် သောက်ပါ"
    ],
    remediesEn: [
      "Lukewarm sponge bath - wipe forehead, underarms, and groin using a wet cloth (Do NOT use cold water or ice water)",
      "Stay hydrated by drinking plenty of water, broth, lemongrass tea, or rehydration salts (ORS)",
      "Wear lightweight, breathable clothing and rest in a well-ventilated room",
      "Take Paracetamol (Acetaminophen) as directed in standard dosage guidelines"
    ],
    redFlagsMm: [
      "ကိုယ်အပူချိန် (၁၀၃) ဒီဂရီဖာရင်ဟိုက် ထက် ကျော်လွန်ခြင်း",
      "ဇက်ခိုင်ခြင်း၊ ခေါင်းပြင်းထန်စွာကိုက်ခြင်း၊ အလင်းရောင်မခံနိုင်ခြင်း (ဦးနှောက်အမြှေးရောင် သံသယ)",
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
      "နို့၊ အကြော်အလှော်နှင့် ဂျုံကဲ့သို့ လေထစေသော အစားအစာများကို ခေတ္တရှောင်ပါ"
    ],
    remediesEn: [
      "Sip warm Ginger Tea or Mint Tea slowly to relax intestinal muscles",
      "Apply a hot water bottle or warm compress over your stomach to ease cramps",
      "Eat light, easily digestible meals in small portions (e.g., rice porridge, banana)",
      "Avoid carbonated drinks, dairy, deep fried items, and heavy foods that cause excess gas"
    ],
    redFlagsMm: [
      "ဗိုက်ကို ထိ၍မရလောက်အောင် ချက်ချင်း ပြင်းထန်စွာ နာကျင်အောင့်တက်လာခြင်း (အူအတက်ပေါက်ခြင်း သံသယ)",
      "အန်ခြင်း၊ အန်ဖတ်ထဲတွင် သွေးပါခြင်း သို့မဟုတ် ဝမ်းအမည်းရောင်သွားခြင်း",
      "ဗိုက်နာခြင်းနှင့်အတူ အဖျားတက်ခြင်းနှင့် မူးဝေမိန်းမောခြင်း"
    ],
    redFlagsEn: [
      "Sudden, localized, and agonizing pain, especially in the lower right abdomen",
      "Persistent vomiting, vomiting blood, or passing dark, tarry black stools",
      "Severe abdominal pain accompanied by high fever and lightheadedness"
    ],
    iconName: "Activity"
  },
  {
    id: "headache",
    titleMm: "ခေါင်းကိုက်ခြင်းနှင့် ဇက်ကြောတက်ခြင်း",
    titleEn: "Headache & Neck Tension",
    descriptionMm: "စိတ်ဖိစီးမှု၊ အိပ်ရေးပျက်ခြင်း၊ ရေဓာတ်ခမ်းခြောက်ခြင်း သို့မဟုတ် ကွန်ပျူတာ/ဖုန်း အကြည့်များခြင်းတို့ကြောင့် ဦးခေါင်းနှင့် ဇက်ကြောများ တင်းမာကိုက်ခဲတတ်ပါသည်။",
    descriptionEn: "Tension headaches and neck stiffness are commonly caused by stress, dehydration, lack of sleep, or prolonged screen time.",
    remediesMm: [
      "ရေအေး သို့မဟုတ် ရေနွေးနွေး ဖန်ခွက် (၂) ခွက်ခန့်ကို ချက်ချင်း သောက်ပေးပါ (ရေဓာတ်ဖြည့်ရန်)",
      "ပူဒီနာဆီ သို့မဟုတ် ချင်းရည်ကို နားထင်နှင့် ဇက်ကြောတွင် ညင်သာစွာ နှိပ်နယ်ပေးပါ",
      "အလင်းရောင်မှိန်မှိန်ရှိသော တိတ်ဆိတ်သည့်အခန်းတွင် မျက်စိမှိတ်၍ (၁၅-၃၀) မိနစ်ခန့် အနားယူပါ",
      "နဖူးပေါ်တွင် ရေအေးဝတ် သို့မဟုတ် ရေခဲအိတ် အုံပေးပါ"
    ],
    remediesEn: [
      "Drink 2 large glasses of water immediately to resolve possible dehydration",
      "Gently massage temples and back of the neck with diluted peppermint oil",
      "Rest in a quiet, dimly lit room with closed eyes for 15-30 minutes",
      "Place a cool damp cloth or ice pack over your forehead and eyes"
    ],
    redFlagsMm: [
      "မကြုံစဖူး ပြင်းထန်လွန်းသော လျှပ်စီးလက်သလို ခေါင်းကိုက်ခြင်း (Thunderclap headache)",
      "မျက်နှာတစ်ခြမ်း ရွဲ့ခြင်း၊ စကားပြောမသဲကွဲခြင်း သို့မဟုတ် ခြေလက်များ အားနည်းသွားခြင်း (လေဖြတ် သံသယ)",
      "ခေါင်းကိုက်ခြင်းနှင့်အတူ ဇက်ခိုင်ပြီး မေးစေ့ကို ရင်ဘတ်နှင့် ထိ၍မရခြင်း"
    ],
    redFlagsEn: [
      "Sudden, excruciating, worst headache of your life (Thunderclap headache)",
      "Facial drooping, slurred speech, or weakness/numbness in one side of the body",
      "Inability to bend neck forward to touch chin to chest with high fever"
    ],
    iconName: "Activity"
  },
  {
    id: "diarrhea",
    titleMm: "ဝမ်းလျှော/ဝမ်းပျက်ခြင်း",
    titleEn: "Diarrhea & Loose Stools",
    descriptionMm: "မသန့်ရှင်းသော အစားအစာ၊ ရေ သို့မဟုတ် အစာအိမ်ပိုးဝင်ခြင်းကြောင့် ဝမ်းခဏခဏသွားခြင်း ဖြစ်တတ်ပြီး အဓိကအန္တရာယ်မှာ ခန္ဓာကိုယ်မှ ရေဓာတ်နှင့် ဆားဓာတ်များ ဆုံးရှုံးသွားခြင်း ဖြစ်သည်။",
    descriptionEn: "Diarrhea is frequently triggered by food poisoning, viral gastroenteritis, or unclean water. The primary danger is acute dehydration and electrolyte depletion.",
    remediesMm: [
      "ဓာတ်ဆားရည် (ORS) ကို ဝမ်းတစ်ကြိမ်သွားတိုင်း တစ်ဖန်ခွက်နှုန်းဖြင့် မကြာခဏ သောက်ပေးပါ",
      "ဆန်ပြုတ်ရည်၊ ငှက်ပျောသီး၊ ပေါင်မုန့်မီးကင်ကဲ့သို့ အစာပျော့ပျော့များကို စားပါ",
      "ဖန်ခါးသီး သို့မဟုတ် လက်ဖက်ရည်ကြမ်း ခပ်ဖန်ဖန် သောက်ပေးပါ",
      "နို့ထွက်ပစ္စည်းများ၊ အဆီများသော အစားအစာများနှင့် အစပ်များကို လုံးဝရှောင်ကြဉ်ပါ"
    ],
    remediesEn: [
      "Sip Oral Rehydration Salts (ORS) solution continuously after every loose stool",
      "Follow the BRAT diet: Bananas, Rice porridge, Applesauce, Toast",
      "Drink mild black tea or a pinch of Haritaki powder to bind loose stools",
      "Strictly avoid dairy products, oily/fried foods, and spicy seasonings"
    ],
    redFlagsMm: [
      "ဝမ်းထဲတွင် သွေးစများ၊ ပြည်များ သို့မဟုတ် အကျိအချွဲများ ပါရှိခြင်း",
      "ရေ လုံးဝသောက်မရဘဲ အဆက်မပြတ် အန်နေခြင်း",
      "ဆီးလုံးဝမထွက်ခြင်း၊ နှုတ်ခမ်းခြောက်သွေ့ပြီး မျက်တွင်းဟောက်ပက်ဖြစ်ခြင်း (ပြင်းထန် ရေဓာတ်ခန်းခြောက်မှု)",
      "ဝမ်းလျှောခြင်းသည် (၂) ရက်ထက်ကျော်လွန်ပြီး အဖျားတက်လာခြင်း"
    ],
    redFlagsEn: [
      "Presence of blood, pus, or heavy mucus in stools (Dysentery)",
      "Inability to keep any fluids down due to persistent vomiting",
      "No urination for 8+ hours, extreme thirst, sunken eyes, dry mouth (Severe dehydration)",
      "High fever and diarrhea lasting longer than 48 hours"
    ],
    iconName: "Activity"
  },
  {
    id: "constipation",
    titleMm: "ဝမ်းချုပ်ခြင်း",
    titleEn: "Constipation",
    descriptionMm: "ရေသောက်နည်းခြင်း၊ အမျှင်ဓာတ်ပါသော အသီးအရွက် စားသုံးမှုနည်းခြင်း သို့မဟုတ် လှုပ်ရှားမှုနည်းခြင်းတို့ကြောင့် ဝမ်းသွားရခက်ခဲခြင်း ဖြစ်တတ်ပါသည်။",
    descriptionEn: "Infrequent or painful bowel movements are commonly caused by low dietary fiber, inadequate hydration, or a sedentary routine.",
    remediesMm: [
      "မန်ကျည်းမှည့်ဖျော်ရည် သို့မဟုတ် သင်္ဘောသီးမှည့်ကို နေ့စဉ် စားသုံးပေးပါ",
      "တစ်နေ့လျှင် ရေ (၂) လီတာမှ (၃) လီတာအထိ ပြည့်ဝစွာ သောက်ပါ",
      "ဖန်ခါးသီးအမှုန့်ကို ညအိပ်ရာဝင်ချိန်တွင် ရေနွေးနွေးဖြင့် ဖျော်သောက်ပါ",
      "လတ်ဆတ်သော ဟင်းသီးဟင်းရွက်နှင့် သစ်သီးဝလံများ (အမျှင်ဓာတ်) ကို ပိုမိုစားသုံးပါ"
    ],
    remediesEn: [
      "Drink tamarind pulp juice or eat generous servings of ripe papaya",
      "Drink at least 2 to 3 liters of clean water throughout the day",
      "Take 1 teaspoon of Haritaki (ဖန်ခါးသီး) powder in warm water before bedtime",
      "Increase daily dietary fiber intake with leafy greens, beans, and whole grains"
    ],
    redFlagsMm: [
      "ဝမ်းလုံးဝမသွားသည့်အပြင် လေလည်ခြင်းပါ မရှိတော့ဘဲ ဗိုက်ဖောင်းတင်းလာခြင်း (အူပိတ်ခြင်း သံသယ)",
      "ပြင်းထန်စွာ ဗိုက်အောင့်ခြင်းနှင့် အန်ခြင်းတွဲဖြစ်ခြင်း",
      "ဝမ်းသွားရာတွင် သွေးနီရဲရဲများ အများအပြား ပါလာခြင်း"
    ],
    redFlagsEn: [
      "Complete inability to pass stool or gas accompanied by severe abdominal swelling",
      "Vomiting combined with intense cramping abdominal pain",
      "Significant rectal bleeding or sudden unexplained change in bowel habits"
    ],
    iconName: "Activity"
  },
  {
    id: "sore-throat",
    titleMm: "လည်ချောင်းနာ/အသံဝင်ခြင်း",
    titleEn: "Sore Throat & Hoarseness",
    descriptionMm: "ဗိုင်းရပ်စ်ပိုးဝင်ခြင်း၊ အအေးမိခြင်း သို့မဟုတ် စကားအပြောများခြင်းတို့ကြောင့် လည်ချောင်းအတွင်း နာကျင်ယားယံပြီး အသံဝင်တတ်ပါသည်။",
    descriptionEn: "Throat inflammation and hoarseness are typically triggered by viral infections, colds, post-nasal drip, or vocal strain.",
    remediesMm: [
      "ဆားရည်နွေးနွေး (ရေနွေး ၁ ဖန်ခွက်တွင် ဆား လက်ဖက်ရည်ဇွန်းတစ်ဝက်) ဖြင့် တစ်နေ့ ၃-၄ ကြိမ် လည်ချောင်းဆေး (Gargle) ပါ",
      "ပျားရည်နှင့် သံပရာရည်ကို ရေနွေးနွေးတွင် ဖျော်၍ ဖြည်းဖြည်းချင်း သောက်ပါ",
      "နနွင်းမှုန့် အနည်းငယ်ထည့်ထားသော ရေနွေးကြမ်းကို သောက်ပါ",
      "ရေခဲရေနှင့် အစပ်/အကြော်များကို ခေတ္တရှောင်ကြဉ်ပြီး စကားကျယ်ကျယ် မပြောပါနှင့်"
    ],
    remediesEn: [
      "Gargle with warm salt water (1/2 tsp salt in 1 cup warm water) 3-4 times daily",
      "Sip warm water with 1 tbsp raw honey and fresh lemon juice",
      "Drink warm turmeric tea to reduce local throat inflammation",
      "Rest your voice and avoid iced drinks, spicy food, and oily fries"
    ],
    redFlagsMm: [
      "တံတွေးနှင့် ရေပင် မျိုချ၍မရလောက်အောင် လည်ချောင်းပြင်းထန်စွာ နာကျင်ခြင်း",
      "အသက်ရှူရ ခက်ခဲလာခြင်း သို့မဟုတ် လည်ချောင်းအတွင်း တစ်စို့စို့ဖြစ်လာခြင်း",
      "လည်ချောင်းအတွင်း အာသီးပေါ်တွင် အဖြူရောင် ပြည်ကွက်များ တွေ့ရခြင်း",
      "ပါးစပ်ဟ၍မရလောက်အောင် မေးရိုးတောင့်တင်းလာခြင်း"
    ],
    redFlagsEn: [
      "Inability to swallow liquids or saliva due to severe throat obstruction",
      "Difficulty breathing or stridor sounds when inhaling",
      "Visible white patches or pus exudates on swollen tonsils (Strep throat)",
      "Difficulty opening the mouth wide (Trismus/Peritonsillar abscess)"
    ],
    iconName: "Activity"
  },
  {
    id: "common-cold",
    titleMm: "နှာစေး/နှာပိတ်/ထိပ်ကပ်နာ",
    titleEn: "Common Cold & Nasal Congestion",
    descriptionMm: "ရာသီဥတုအပြောင်းအလဲတွင် အအေးမိဗိုင်းရပ်စ်ပိုးကြောင့် နှာရည်ယိုခြင်း၊ နှာပိတ်ခြင်းနှင့် မျက်စိစပ်ခြင်းတို့ ဖြစ်ပေါ်တတ်ပါသည်။",
    descriptionEn: "Viral upper respiratory infections cause nasal mucosal swelling, runny nose, sneezing, and sinus blockage.",
    remediesMm: [
      "ကြက်သွန်နီကို ထက်ခြမ်းခြမ်း၍ နှာခေါင်းဝတွင် အနံ့ရှူပေးပါ",
      "ဇလုံတစ်ခုထဲတွင် ရေနွေးဆူဆူထည့်ပြီး ပူဒီနာဆီ (သို့) ယူကလစ်ဆီ အနည်းငယ်ထည့်ကာ မျက်နှာသုတ်ပဝါအုပ်၍ ရေနွေးငွေ့ရှူပါ",
      "စပါးလင်နှင့် ချင်းပြုတ်ရည် ပူပူနွေးနွေးကို သောက်ပေးပါ",
      "ဆားရည်စစ်စစ် (Saline spray) ဖြင့် နှာခေါင်းအတွင်း ဆေးကြောပါ"
    ],
    remediesEn: [
      "Inhale the pungent vapors of a freshly sliced red onion or shallot",
      "Perform steam inhalation over a bowl of steaming water with a drop of eucalyptus or mint oil",
      "Drink hot lemongrass and ginger herbal brew",
      "Use sterile saline nasal rinses to clear nasal passages"
    ],
    redFlagsMm: [
      "နဖူးနှင့် ပါးရိုးတစ်ဝိုက် ပြင်းထန်စွာ ကိုက်ခဲရောင်ရမ်းပြီး အဝါရောင်/အစိမ်းရောင် ပြည်ချွဲများ ထွက်ခြင်း",
      "(၁၀) ရက်ကျော်လွန်သည်အထိ လုံးဝမသက်သာခြင်း",
      "အသက်ရှူရခက်ခဲပြီး ရင်ဘတ်အောင့်လာခြင်း"
    ],
    redFlagsEn: [
      "Severe facial/sinus pain around eyes and forehead with foul-smelling green discharge",
      "Symptoms worsening significantly after 10 days",
      "Shortness of breath or sharp chest discomfort"
    ],
    iconName: "Activity"
  },
  {
    id: "acid-reflux",
    titleMm: "ရင်ပူ/အစာမကြေ လေချဉ်တက်ခြင်း",
    titleEn: "Acid Reflux & Heartburn",
    descriptionMm: "အစာအိမ်အတွင်းရှိ အစာခြေအက်ဆစ်များ အထက်သို့ ပြန်တက်လာခြင်းကြောင့် ရင်ဘတ်အလယ်တွင် ပူလောင်ခြင်းနှင့် လေချဉ်တက်ခြင်းတို့ ဖြစ်ပွားတတ်ပါသည်။",
    descriptionEn: "Gastroesophageal reflux occurs when stomach acid flows back into the esophagus, causing burning chest discomfort and sour burping.",
    remediesMm: [
      "အစာစားပြီးပြီးချင်း လှဲအိပ်ခြင်းမှ ရှောင်ကြဉ်ပါ (အနည်းဆုံး ၂-၃ နာရီ စောင့်ပါ)",
      "ငှက်ပျောသီးမှည့် သို့မဟုတ် ရှားစောင်းလက်ပတ်ဖျော်ရည်ကို သောက်ပေးပါ",
      "အစာကို တစ်ခါတည်း အများကြီးမစားဘဲ နည်းနည်းနှင့် ခဏခဏ ခွဲစားပါ",
      "အဆီများသော အကြော်အလှော်၊ ကော်ဖီ၊ လက်ဖက်ရည်အပြင်းနှင့် အစပ်များကို လျှော့ပါ"
    ],
    remediesEn: [
      "Avoid lying down for at least 2-3 hours after eating",
      "Eat a ripe banana or drink diluted pure Aloe Vera juice to coat the stomach",
      "Eat smaller, more frequent meals rather than large heavy dinners",
      "Cut down on greasy fried foods, chocolate, strong coffee, and spicy chilies"
    ],
    redFlagsMm: [
      "ရင်ဘတ်အလယ်မှ တင်းကျပ်စွာ နာကျင်ပြီး လက်မောင်း၊ မေးရိုး သို့မဟုတ် ကျောဘက်သို့ ပျံ့နှံ့သွားခြင်း (နှလုံးရောဂါ သံသယ)",
      "အစာမျိုချရ ခက်ခဲလာခြင်း သို့မဟုတ် နာကျင်ခြင်း",
      "ဝမ်းအမည်းရောင်သွားခြင်း သို့မဟုတ် သွေးအန်ခြင်း"
    ],
    redFlagsEn: [
      "Crushing chest pressure radiating to left arm, neck, or jaw (Heart attack warning)",
      "Difficulty or severe pain when swallowing food (Dysphagia)",
      "Vomiting blood or dark black tarry stools (Internal gastrointestinal bleeding)"
    ],
    iconName: "Activity"
  },
  {
    id: "insomnia",
    titleMm: "အိပ်မပျော်ခြင်းနှင့် စိတ်ဖိစီးခြင်း",
    titleEn: "Insomnia & Stress",
    descriptionMm: "စိတ်ပူပန်မှု၊ ပင်ပန်းနွမ်းနယ်မှု၊ ဖုန်း/ကွန်ပျူတာ အလွန်အကျွံသုံးခြင်းတို့ကြောင့် ညဘက်တွင် နှစ်နှစ်ခြိုက်ခြိုက် အိပ်မပျော်ခြင်း ဖြစ်တတ်ပါသည်။",
    descriptionEn: "Difficulty falling or staying asleep is often fueled by high stress levels, late-night screen exposure, and irregular circadian rhythms.",
    remediesMm: [
      "အိပ်ရာမဝင်မီ နို့နွေးနွေးတစ်ဖန်ခွက် သို့မဟုတ် ပင်စိမ်းရေနွေးကြမ်း သောက်ပါ",
      "ခြေထောက်ကို ရေနွေးနွေးထဲတွင် (၁၅) မိနစ်ခန့် စိမ်ပေးပါ (သွေးလည်ပတ်မှုကောင်းပြီး စိတ်ပြေလျော့စေရန်)",
      "အိပ်ရာမဝင်မီ အနည်းဆုံး (၁) နာရီအလိုတွင် ဖုန်းနှင့် တီဗွီမျက်နှာပြင်များကို ပိတ်ထားပါ",
      "နားထင်နှင့် ဦးခေါင်းကို နှမ်းဆီ သို့မဟုတ် အုန်းဆီဖြင့် ညင်သာစွာ နှိပ်နယ်ပေးပါ"
    ],
    remediesEn: [
      "Drink a glass of warm milk or chamomile/tulsi herbal tea before bedtime",
      "Soak feet in a basin of warm water for 15 minutes to relax nervous tension",
      "Avoid smartphones, tablets, and TV screens for at least 1 hour before sleep",
      "Gently massage the scalp and temples with warm sesame or coconut oil"
    ],
    redFlagsMm: [
      "အိပ်မပျော်ခြင်းနှင့်အတူ အလွန်အမင်း စိတ်ကျဝေဒနာ ခံစားရခြင်း သို့မဟုတ် မိမိကိုယ်ကို ထိခိုက်လိုသည့်အတွေးများ ပေါ်ပေါက်ခြင်း",
      "အိပ်ပျော်နေစဉ် အသက်ရှူရပ်သွားတတ်ခြင်း (Sleep Apnea)",
      "ရက်သတ္တပတ်ပေါင်းများစွာ အိပ်မပျော်ဘဲ နေ့ဘက်တွင် သတိမေ့လျော့ခြင်းများ ဖြစ်ပေါ်လာခြင်း"
    ],
    redFlagsEn: [
      "Insomnia accompanied by severe depressive thoughts or feelings of self-harm",
      "Frequent choking or stopped breathing during sleep (Obstructive Sleep Apnea)",
      "Chronic sleep deprivation causing daytime memory lapses or severe disorientation"
    ],
    iconName: "Activity"
  },
  {
    id: "toothache",
    titleMm: "သွားကိုက်/သွားဖုံးရောင်ခြင်း",
    titleEn: "Toothache & Gum Inflammation",
    descriptionMm: "သွားပိုးစားခြင်း၊ သွားဖုံးပိုးဝင်ခြင်း သို့မဟုတ် သွားအကြောထိခိုက်ခြင်းတို့ကြောင့် သွားနှင့် မေးရိုးများ ပြင်းထန်စွာ ကိုက်ခဲတတ်ပါသည်။",
    descriptionEn: "Dental cavities, gum infections, or cracked teeth cause acute nerve pain and localized swelling.",
    remediesMm: [
      "လေးညှင်းပွင့် (၁) ပွင့်ကို ကိုက်နေသော သွားကြားတွင် ညှပ်ထားပါ (ထုံကျင်သက်သာစေရန်)",
      "ဆားရည်နွေးနွေးဖြင့် ခံတွင်းအနှံ့ ပလုတ်ကျင်းပေးပါ (ပိုးသတ်ရန်)",
      "ပါးပြင်ပေါ်တွင် ရေခဲအိတ် အုံပေးခြင်းဖြင့် ရောင်ရမ်းမှုကို လျှော့ချပါ",
      "အချိုလွန်ကဲသော အစားအစာများနှင့် အလွန်ပူ/အလွန်အေးသော အရာများကို ရှောင်ပါ"
    ],
    remediesEn: [
      "Hold a whole clove directly on the aching tooth or apply diluted clove oil",
      "Rinse mouth thoroughly with warm salt water to clean debris and disinfect",
      "Apply a cold ice pack externally on the cheek to minimize swelling",
      "Avoid very sugary snacks and extreme hot or icy beverages"
    ],
    redFlagsMm: [
      "ပါးပြင်၊ မေးရိုး သို့မဟုတ် လည်ပင်းအထိ ဖူးယောင်တက်လာပြီး အဖျားတက်လာခြင်း (ပြည်တည်နာ သံသယ)",
      "ပါးစပ်ဟရန် သို့မဟုတ် အစာမျိုချရန် ခက်ခဲလာခြင်း",
      "သွားဖုံးမှ သွေးနှင့် ပြည်များ အဆက်မပြတ် ထွက်နေခြင်း"
    ],
    redFlagsEn: [
      "Swelling spreading to the eye, cheek, or neck with high fever (Dental abscess)",
      "Difficulty opening the mouth or swallowing",
      "Continuous bleeding or persistent pus discharge from the gums"
    ],
    iconName: "Activity"
  },
  {
    id: "joint-pain",
    titleMm: "အဆစ်အမြစ်ကိုက်ခဲ/ခါးနာခြင်း",
    titleEn: "Joint Pain & Arthritis",
    descriptionMm: "အသက်အရွယ်ကြီးရင့်ခြင်း၊ အဆစ်ရောင်ခြင်း (Arthritis) သို့မဟုတ် လေးလံသောအရာများ မခြင်းတို့ကြောင့် အဆစ်များနှင့် ခါးများ ကိုက်ခဲတတ်ပါသည်။",
    descriptionEn: "Joint aches, osteoarthritis, and lumbar back stiffness frequently result from joint wear, inflammation, or physical strain.",
    remediesMm: [
      "နနွင်းမှုန့် ရောစပ်ထားသော နို့နွေးနွေးကို နေ့စဉ် သောက်ပေးပါ (ရောင်ရမ်းမှုကျစေရန်)",
      "ချင်း သို့မဟုတ် ကရဝေးရွက် ပြုတ်ရည်ဖြင့် ရေနွေးအိတ်ကပ်ပေးပါ",
      "အဆစ်များပေါ်တွင် နှမ်းဆီနွေးနွေး သို့မဟုတ် ချင်းဆီဖြင့် ညင်သာစွာ လိမ်းကျံနှိပ်နယ်ပါ",
      "ခန္ဓာကိုယ်အလေးချိန်ကို ထိန်းညှိပြီး ပေါ့ပေါ့ပါးပါး ကိုယ်လက်လှုပ်ရှားမှု ပြုလုပ်ပါ"
    ],
    remediesEn: [
      "Drink warm Golden Milk (turmeric with warm milk) daily for natural anti-inflammatory relief",
      "Apply warm herbal compresses with ginger to stiff joints",
      "Gently massage aching areas with warm sesame oil or medicated herbal oils",
      "Engage in low-impact movement like walking or gentle stretching"
    ],
    redFlagsMm: [
      "အဆစ်တစ်ခုတည်း အလွန်အမင်း နီရဲပူလောင် ဖူးယောင်လာပြီး အဖျားကြီးခြင်း (Septic arthritis သံသယ)",
      "ခါးနာခြင်းနှင့်အတူ ဆီး/ဝမ်း မထိန်းနိုင်တော့ခြင်း သို့မဟုတ် ခြေထောက်များ ထုံကျင်သွားခြင်း",
      "မတော်တဆ ပြုတ်ကျခြင်း/ထိခိုက်မိပြီးနောက် အရိုးပုံပျက်သွားခြင်း (အရိုးကျိုး သံသယ)"
    ],
    redFlagsEn: [
      "Sudden hot, red, extremely swollen joint with high fever (Joint infection)",
      "Back pain accompanied by loss of bowel/bladder control or progressive leg numbness (Cauda Equina Syndrome)",
      "Deformity, inability to bear weight after a fall or trauma (Fracture)"
    ],
    iconName: "Activity"
  },
  {
    id: "skin-rash",
    titleMm: "အရေပြားယားယံ/အင်ပြင်ထခြင်း",
    titleEn: "Skin Rash & Itching (Hives)",
    descriptionMm: "အစားအစာဓာတ်မတည့်ခြင်း၊ အပင်/ပိုးမွှားများနှင့် ထိတွေ့မိခြင်း သို့မဟုတ် အပူလောင်ခြင်းကြောင့် အရေပြားနီရဲယားယံပြီး အင်ပြင်များ ထတတ်ပါသည်။",
    descriptionEn: "Skin redness, hives, and allergic rashes occur from food sensitivities, insect bites, or contact with environmental irritants.",
    remediesMm: [
      "ရှားစောင်းလက်ပတ်ဂျယ်လ် (Aloe Vera) ကို ယားယံသောနေရာများပေါ်တွင် အေးမြစွာ သုတ်လိမ်းပါ",
      "တမာရွက်ပြုတ်ရည်ဖြင့် ကိုယ်လက်သန့်စင်ဆေးကြောပါ",
      "နနွင်းမှုန့်ကို ရေဖြင့် ပျစ်ပျစ်ဖျော်၍ အင်ပြင်များပေါ်တွင် သုတ်လိမ်းပေးပါ",
      "အနာများကို လက်သည်းဖြင့် ပြင်းထန်စွာ ကုတ်ခြစ်ခြင်းမှ ရှောင်ကြဉ်ပါ (ပိုးဝင်နိုင်သောကြောင့်ဖြစ်သည်)"
    ],
    remediesEn: [
      "Apply pure cooling Aloe Vera gel generously over itchy rashes",
      "Wash affected skin with cooled neem leaf decoction for natural antiseptic relief",
      "Apply a gentle paste of turmeric powder and water over hives",
      "Avoid vigorous scratching with fingernails to prevent secondary skin infections"
    ],
    redFlagsMm: [
      "အင်ပြင်ထခြင်းနှင့်အတူ နှုတ်ခမ်း၊ လျှာ၊ မျက်နှာ ဖူးယောင်လာပြီး အသက်ရှူကျပ်လာခြင်း (Anaphylaxis အသက်အန္တရာယ်ရှိသော ဓာတ်မတည့်မှု)",
      "အရေပြားပေါ်တွင် အရည်ကြည်ဖုများ ပြန့်နှံ့ပေါက်လာပြီး အရေခွံများ ကွာကျလာခြင်း",
      "အင်ပြင်များ ပြည်တည်လာပြီး အဖျားတက်လာခြင်း"
    ],
    redFlagsEn: [
      "Rash accompanied by swelling of lips, tongue, throat, and sudden wheezing/shortness of breath (Anaphylactic shock - CALL 192)",
      "Widespread blistering, skin peeling, or involvement of mucosal membranes",
      "Signs of secondary bacterial infection with fever and pus formation"
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
