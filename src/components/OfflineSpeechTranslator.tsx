import React, { useState } from 'react';
import { 
  Volume2, 
  ArrowLeftRight, 
  Mic, 
  Sparkles, 
  Copy, 
  Check, 
  Compass,
  ShieldAlert
} from 'lucide-react';
import { sound, speakEnglish, speakPersian, speakArabic } from '../utils/audio';

export interface OfflineTranslationEntry {
  id: string;
  category:
    | 'taxi_direction'
    | 'restaurant_food'
    | 'hotel_stay'
    | 'emergency_help'
    | 'courtesy_shopping'
    | 'street_slang_idioms'
    | 'proverbs_c2'
    | 'carpet_bazaar'
    | 'mature_17plus';
  levelTag: 'A1-B1 (روزمره)' | 'B2-C1 (پیشرفته و محاوره)' | 'C2 Grandmaster (فوق پیشرفته و ادبی)' | '17+ Street (رده سنی ۱۷+ سال)';
  categoryLabelFa: string;
  categoryLabelEn: string;
  fa: string;
  faColloquial?: string;
  en: string;
  enSlangVariant?: string;
  ar?: string;
  fingilish: string;
  pronunciationEn: string;
  explanationFa: string;
  isMature17Plus?: boolean;
}

export const OFFLINE_TRANSLATION_DATABASE: OfflineTranslationEntry[] = [
  // ==========================================
  // 1. TAXI & DIRECTIONS
  // ==========================================
  {
    id: 'tr_1',
    category: 'taxi_direction',
    levelTag: 'A1-B1 (روزمره)',
    categoryLabelFa: 'تاکسی و آدرس‌یابی 🚕',
    categoryLabelEn: 'Taxi & Directions',
    fa: 'سلام، بی‌زحمت من رو به این آدرس یا نزدیک‌ترین ایستگاه مترو ببرید.',
    faColloquial: 'سلام داداش، بی‌زحمت ما رو می‌رسونی این آدرس یا دم مترو؟',
    en: 'Hello, could you please take me to this address or the nearest metro station?',
    enSlangVariant: 'Hey mate, could you drop me off at this spot or by the nearest tube/subway?',
    fingilish: 'Salam, bi-zahmat man ro be in adres ya nazdiktarin istgahe metro bebarid.',
    pronunciationEn: 'hel-LO, kood yoo pleez tayk mee too this ad-DRES',
    explanationFa: 'جمله‌ای بسیار محترمانه (همراه با نسخه عامیانه) برای تاکسی و مترو.'
  },
  {
    id: 'tr_2',
    category: 'taxi_direction',
    levelTag: 'A1-B1 (روزمره)',
    categoryLabelFa: 'تاکسی و آدرس‌یابی 🚕',
    categoryLabelEn: 'Taxi & Directions',
    fa: 'کرایه چقدر شد؟ کارتخوان دارید یا نقدی پرداخت کنم؟',
    faColloquial: 'چقدر تقدیم کنم؟ کارت می‌کشید یا نقد بدم خدمتتون؟',
    en: 'How much is the fare? Do you take tap-to-pay/card or cash only?',
    fingilish: 'Kerayeh cheghadr shod? Kart-khan darid ya naghdi pardakht konam?',
    pronunciationEn: 'how much iz theh fayr? doo yoo tayk kard or kash?',
    explanationFa: 'جمله کاربردی برای تسویه حساب در تاکسی.'
  },
  {
    id: 'tr_3',
    category: 'taxi_direction',
    levelTag: 'A1-B1 (روزمره)',
    categoryLabelFa: 'تاکسی و آدرس‌یابی 🚕',
    categoryLabelEn: 'Taxi & Directions',
    fa: 'لطفاً همین گوشه نگه‌دارید، پیاده می‌شم. دست شما درد نکنه!',
    faColloquial: 'بی‌زحمت همین بغل بزن کنار پیاده شم، دمت گرم!',
    en: 'Please pull over right here at the corner. Thanks a million!',
    fingilish: 'Lotfan hamin goosheh negah-darid, piyadeh misham. Daste shoma dard nakoneh!',
    pronunciationEn: 'pleez pool oh-ver ryte heer at theh kor-ner',
    explanationFa: 'پیاده شدن راحت در مقصد به همراه تشکر اصیل و عامیانه.'
  },

  // ==========================================
  // 2. RESTAURANT & FOOD
  // ==========================================
  {
    id: 'tr_4',
    category: 'restaurant_food',
    levelTag: 'A1-B1 (روزمره)',
    categoryLabelFa: 'رستوران و کافه 🍽️',
    categoryLabelEn: 'Restaurant & Café',
    fa: 'سلام، لطفاً منو را بیاورید. غذای سنتی و پرطرفدار شما چیست؟',
    en: 'Hello, could we see the menu please? What is your signature local dish?',
    fingilish: 'Salam, lotfan menu ra biavarid. Ghazaye sonnatiye shoma chist?',
    pronunciationEn: 'kood wee see theh men-yoo? whut iz yoor sig-nuh-cher dish?',
    explanationFa: 'پرسش درباره منو و بهترین غذای سرآشپز.'
  },
  {
    id: 'tr_5',
    category: 'restaurant_food',
    levelTag: 'A1-B1 (روزمره)',
    categoryLabelFa: 'رستوران و کافه 🍽️',
    categoryLabelEn: 'Restaurant & Café',
    fa: 'بی‌زحمت این غذا فلفل تند یا مواد حساسیت‌زا نداشته باشد.',
    en: 'Please make sure this dish is mild and free of any food allergens.',
    fingilish: 'Bi-zahmat in ghaza felfele tond ya mavade hassasiyat-za nadashteh bashad.',
    pronunciationEn: 'pleez mayk shoor this dish iz myld and al-er-jen free',
    explanationFa: 'جلوگیری از حساسیت غذایی یا تندی زیاد.'
  },

  // ==========================================
  // 3. HOTEL & EMERGENCY
  // ==========================================
  {
    id: 'tr_7',
    category: 'hotel_stay',
    levelTag: 'A1-B1 (روزمره)',
    categoryLabelFa: 'هتل و اقامتگاه 🏨',
    categoryLabelEn: 'Hotel & Stay',
    fa: 'سلام، من از قبل اتاق رزرو کرده‌ام، رمز وای‌فای و ساعت صبحانه چیست؟',
    en: 'Hello, I have a booking under my name. What is the Wi-Fi password and breakfast time?',
    fingilish: 'Salam, man otagh rezerv kardeh-am, ramze Wi-Fi va sa\'ate sobhaneh chist?',
    pronunciationEn: 'eye hav ah book-ing. whut iz theh wye-fye and brek-fust tyme?',
    explanationFa: 'پذیرش سریع در هتل بدون نیاز به مکالمه پیچیده.'
  },
  {
    id: 'tr_9',
    category: 'emergency_help',
    levelTag: 'A1-B1 (روزمره)',
    categoryLabelFa: 'اورژانس و کمک فوری 🚨',
    categoryLabelEn: 'Emergency & Help',
    fa: 'لطفاً کمکم کنید! من مسیرم را گم کرده‌ام، گوشی‌ام شارژ ندارد و زبان بلد نیستم.',
    en: 'Please help me! I have lost my way, my phone battery is dead, and I do not speak the language.',
    fingilish: 'Lotfan komakam konid! Man masiram ra gom kardeh-am va zaban balad nistam.',
    pronunciationEn: 'pleez help mee, eye am lost and mye fohn iz ded',
    explanationFa: 'جمله نجات‌بخش فوری در کوچه و خیابان.'
  },

  // ==========================================
  // 4. STREET SLANG & COLLOQUIAL IDIOMS (محاوره عامیانه کوچه و خیابان)
  // ==========================================
  {
    id: 'tr_slang_1',
    category: 'street_slang_idioms',
    levelTag: 'B2-C1 (پیشرفته و محاوره)',
    categoryLabelFa: 'محاوره عامیانه و اصطلاحات خیابانی 🗣️',
    categoryLabelEn: 'Street Slang & Colloquial',
    fa: 'دمت گرم رفیق، خیلی مرام گذاشتی! جبران کنم برات.',
    faColloquial: 'ایول داری داداش، سنگ تموم گذاشتی! ایشالا جبران کنیم.',
    en: 'You are a total legend, mate! You really came through for me—I owe you one!',
    enSlangVariant: 'Mad respect bro, you went all out! I got your back next time.',
    fingilish: 'Damet garm rafigh, kheyli marâm gozâshti! Jobrân konam barât.',
    pronunciationEn: 'yoo ar ah toh-tul lej-end mayt! eye oh yoo wun!',
    explanationFa: 'معادل دقیق «دمت گرم / سنگ تموم گذاشتی / مرام گذاشتی» در انگلیسی محاوره‌ای خیابانی.'
  },
  {
    id: 'tr_slang_2',
    category: 'street_slang_idioms',
    levelTag: 'B2-C1 (پیشرفته و محاوره)',
    categoryLabelFa: 'محاوره عامیانه و اصطلاحات خیابانی 🗣️',
    categoryLabelEn: 'Street Slang & Colloquial',
    fa: 'حوصله سر رفته و کلافه‌ام؛ بیا بریم یه چرخی بزنیم هوایی عوض کنیم.',
    faColloquial: 'پوکیدم از بی‌حوصلگی؛ پایه هستی بریم یه دوری بزنیم؟',
    en: 'I am bored out of my mind and going stir-crazy; fancy going for a spin to clear our heads?',
    enSlangVariant: 'I’m dead bored; you down to bounce and grab some fresh air?',
    fingilish: 'Pookidam az bi-howselegi; pâyeh hasti berim ye dowri bezanim?',
    pronunciationEn: 'eye am bord owt ov mye mynd; yoo down too bowns?',
    explanationFa: 'ترجمه طبیعی اصطلاح عامیانه «پوکیدم / پایه هستی بریم دور بزنیم؟».'
  },
  {
    id: 'tr_slang_3',
    category: 'street_slang_idioms',
    levelTag: 'B2-C1 (پیشرفته و محاوره)',
    categoryLabelFa: 'محاوره عامیانه و اصطلاحات خیابانی 🗣️',
    categoryLabelEn: 'Street Slang & Colloquial',
    fa: 'سر کارم گذاشتی؟ با من شوخی نکن، قضیه جدیه!',
    faColloquial: 'ما رو گرفتی؟ دستمون ننداز تو رو خدا، شوخی بردار نیست!',
    en: 'Are you pulling my leg? Stop messing with me—this is no laughing matter!',
    enSlangVariant: 'Are you winding me up? Quit playing, dead serious right now!',
    fingilish: 'Mâ ro gerefti? Dastemoon nandâz, ghalziyeh jeddiyeh!',
    pronunciationEn: 'ar yoo pool-ing mye leg? stop mes-ing with mee!',
    explanationFa: 'معادل اصطلاحی «ما رو گرفتی؟ / سر کار گذاشتن / دست انداختن».'
  },
  {
    id: 'tr_slang_4',
    category: 'street_slang_idioms',
    levelTag: 'B2-C1 (پیشرفته و محاوره)',
    categoryLabelFa: 'محاوره عامیانه و اصطلاحات خیابانی 🗣️',
    categoryLabelEn: 'Street Slang & Colloquial',
    fa: 'اصلاً به روی خودش نیاورد و شانه خالی کرد!',
    faColloquial: 'زیرآبی رفت و زد زیر همه‌چی، انگار نه انگار!',
    en: 'He played completely dumb and wormed his way out of responsibility!',
    enSlangVariant: 'He straight-up ghosted his promise and acted like nothing happened!',
    fingilish: 'Aslan be rooye khodesh nayâvard va zad zire hameh-chi!',
    pronunciationEn: 'hee playd kum-pleet-lee dum and wermd hiz way owt!',
    explanationFa: 'اصطلاح «به روی خود نیاوردن / شانه خالی کردن / زدن زیر حرف».'
  },

  // ==========================================
  // 5. GRANDMASTER C2 PROVERBS & LITERARY IDIOMS (فوق پیشرفته و ضرب‌المثل‌ها)
  // ==========================================
  {
    id: 'tr_prov_1',
    category: 'proverbs_c2',
    levelTag: 'C2 Grandmaster (فوق پیشرفته و ادبی)',
    categoryLabelFa: 'ضرب‌المثل‌ها و سطح فوق‌پیشرفته (C2) 📜',
    categoryLabelEn: 'Proverbs & C2 Mastery',
    fa: 'مارگزیده از ریسمان سیاه و سفید می‌ترسد.',
    en: 'Once bitten, twice shy. (A scalded cat fears even cold water.)',
    fingilish: 'Mâr-gazideh az rismâne siyâh o sefid mitarsad.',
    pronunciationEn: 'wuns bit-en, twys shye',
    explanationFa: 'ضرب‌المثل اصیل فارسی و معادل دقیق انگلیسی آن در مذاکرات و مکالمات سطح C2.'
  },
  {
    id: 'tr_prov_2',
    category: 'proverbs_c2',
    levelTag: 'C2 Grandmaster (فوق پیشرفته و ادبی)',
    categoryLabelFa: 'ضرب‌المثل‌ها و سطح فوق‌پیشرفته (C2) 📜',
    categoryLabelEn: 'Proverbs & C2 Mastery',
    fa: 'با یک گل بهار نمی‌شود، اما نشانه رسیدن بهار است.',
    en: 'One swallow does not a summer make, yet it heralds the coming of spring.',
    fingilish: 'Bâ yek gol bahâr nemishavad.',
    pronunciationEn: 'wun swol-oh duz not ah sum-er mayk',
    explanationFa: 'کاربرد در سخنرانی‌ها، مقالات آکادمیک و مناظرات سطح فوق‌پیشرفته.'
  },
  {
    id: 'tr_prov_3',
    category: 'proverbs_c2',
    levelTag: 'C2 Grandmaster (فوق پیشرفته و ادبی)',
    categoryLabelFa: 'ضرب‌المثل‌ها و سطح فوق‌پیشرفته (C2) 📜',
    categoryLabelEn: 'Proverbs & C2 Mastery',
    fa: 'آشپز که دو تا شد، آش یا شور می‌شود یا بی‌نمک.',
    en: 'Too many cooks spoil the broth.',
    fingilish: 'Âshpaz ke do tâ shod, âsh yâ shoor mishavad yâ bi-namak.',
    pronunciationEn: 'too men-ee kooks spoyl theh broth',
    explanationFa: 'معادل دقیق ضرب‌المثل «آشپز که دو تا شد...» در مدیریت و مکالمه.'
  },
  {
    id: 'tr_prov_4',
    category: 'proverbs_c2',
    levelTag: 'C2 Grandmaster (فوق پیشرفته و ادبی)',
    categoryLabelFa: 'ضرب‌المثل‌ها و سطح فوق‌پیشرفته (C2) 📜',
    categoryLabelEn: 'Proverbs & C2 Mastery',
    fa: 'هر که بامش بیش، برفش بیشتر (هر قدر جایگاه بالاتر، مسئولیت سنگین‌تر).',
    en: 'Uneasy lies the head that wears a crown. (With great stature comes greater burden.)',
    fingilish: 'Har ke bâmesh bish, barfash bishtar.',
    pronunciationEn: 'un-ee-zee lyez theh hed that wayrz ah krown',
    explanationFa: 'معادل شکسپیری و فوق‌پیشرفته ضرب‌المثل «هر که بامش بیش، برفش بیشتر».'
  },

  // ==========================================
  // 6. PERSIAN CARPET BAZAAR & EXPORT (اصطلاحات تخصصی فرش و بازار)
  // ==========================================
  {
    id: 'tr_carpet_1',
    category: 'carpet_bazaar',
    levelTag: 'B2-C1 (پیشرفته و محاوره)',
    categoryLabelFa: 'تجارت تخصصی فرش (قالی، ذرع، کهنه ذاتی) 🧶',
    categoryLabelEn: 'Persian Carpet Trade',
    fa: 'این قالیچه دو ذرع (۲۰۰×۱۳۵ سانت) صد در صد «کهنه ذاتی» و رنگ گیاهی است، نه کهنه‌شویی شیمیایی.',
    en: 'This Dozar area rug (200×135 cm / 4.5×6.7 ft) has a 100% authentic naturally aged patina (Kohneh Zaati) and pure vegetable dyes—never chemically washed.',
    ar: 'هذه السجادة (قاليجه دوزرع ٢٠٠×١٣٥ سم) معتّقة طبيعياً (كهنه ذاتي) وبأصباغ نباتية خالصة بدون أي غسيل كيميائي.',
    fingilish: 'In ghâlicheh-ye Dozar sad-dar-sad Kohneh-ye Zâti va rang-e giyâhi ast.',
    pronunciationEn: 'this doh-zar rug haz aw-then-tik nach-ur-uh-lee aydjd puh-tee-nuh and vej-tuh-bul dyez',
    explanationFa: 'جمله کلیدی فرش‌فروشان برای پرزنت قالیچه دو ذرع و کهنه ذاتی به مشتری انگلیسی و عرب‌زبان.'
  },
  {
    id: 'tr_carpet_2',
    category: 'carpet_bazaar',
    levelTag: 'B2-C1 (پیشرفته و محاوره)',
    categoryLabelFa: 'تجارت تخصصی فرش (قالی، ذرع، کهنه ذاتی) 🧶',
    categoryLabelEn: 'Persian Carpet Trade',
    fa: 'ما انواع قالی، قالیچه ذرع و نیم (۱۵۰×۱۰۵)، ذرع و چارک (۱۲۵×۸۰)، گلیم، پشتی و فرش مربع را با شناسنامه اصالت و ارسال هوایی داریم.',
    en: 'We carry hand-knotted Ghali carpets, Zar-o-Nim (150×105 cm), Zar-o-Charak (125×80 cm), flat-woven Kilims, Poshti cushions, and Square rugs—with Certificate of Authenticity and insured worldwide shipping.',
    ar: 'لدينا قالي يدوي فاخر، وقاليجه ذرع ونصف، وذرع وربع، وكليم، وبشتي، وسجاد مربع مع شهادة أصالة وشحن جوي مؤمّن.',
    fingilish: 'Mâ anvâ-e Ghâli, Ghâlicheh Zar-o-Nim, Zar-o-Chârak, Gelim, Poshti va Morabba dârim.',
    pronunciationEn: 'wee kar-ee hand-not-ed gha-lee, zar-oh-neem, zar-oh-cha-rak, kee-leem, and posh-tee',
    explanationFa: 'پوشش کامل واژگان تخصصی سایز و نوع فرش به سه زبان فارسی، انگلیسی و عربی.'
  },

  // ==========================================
  // 7. 17+ STREET & MATURE IDIOMS (پوشش الفاظ و اصطلاحات تند خیابانی رده سنی ۱۷+ سال)
  // ==========================================
  {
    id: 'tr_17_1',
    category: 'mature_17plus',
    levelTag: '17+ Street (رده سنی ۱۷+ سال)',
    categoryLabelFa: 'اصطلاحات تند و خیابانی (رده سنی ۱۷+ سال) 🔞',
    categoryLabelEn: '17+ Street & Edgy Slang',
    fa: 'چرت و پرت نگو / چرند نگو! داری کلاه سر ما می‌ذاری؟',
    faColloquial: 'شعر نگو / خالی نبند! می‌خوای سر ما رو شیره بمالی؟',
    en: 'Cut the crap / Stop the bullshit! Are you trying to rip me off?',
    enSlangVariant: 'Quit bullshitting me! You trying to scam me or what?',
    fingilish: 'Chert o part nagoo / Khâli naband! Dâri kolâh sare mâ mizâri?',
    pronunciationEn: 'kut theh krap! ar yoo try-ing too rip mee off?',
    explanationFa: 'رده سنی ۱۷+: برای فهمیدن یا دفاع از خود در برابر کلاهبرداری یا بحث‌های تند خیابانی (Cut the crap / Bullshit / Rip off).',
    isMature17Plus: true
  },
  {
    id: 'tr_17_2',
    category: 'mature_17plus',
    levelTag: '17+ Street (رده سنی ۱۷+ سال)',
    categoryLabelFa: 'اصطلاحات تند و خیابانی (رده سنی ۱۷+ سال) 🔞',
    categoryLabelEn: '17+ Street & Edgy Slang',
    fa: 'گند زدی به همه‌چیز! سرت به کار خودت باشه و مزاحم نشو!',
    faColloquial: 'تر زدی به کل قضیه! سرت تو لاک خودت باشه و دست از سر ما بردار!',
    en: 'You totally screwed everything up! Mind your own damn business and back off!',
    enSlangVariant: 'You messed it all up big time! Piss off and mind your own business!',
    fingilish: 'Gand zadi be hameh-chiz! Saret be kâre khodet bâsheh!',
    pronunciationEn: 'yoo skrood ev-ree-thing up! mynd yoor ohn dam biz-nes and bak off!',
    explanationFa: 'رده سنی ۱۷+: شناخت الفاظ تند اعتراضی در فیلم‌ها یا مشاجرات خیابانی (Screwed up / Piss off / Damn business).',
    isMature17Plus: true
  },
  {
    id: 'tr_17_3',
    category: 'mature_17plus',
    levelTag: '17+ Street (رده سنی ۱۷+ سال)',
    categoryLabelFa: 'اصطلاحات تند و خیابانی (رده سنی ۱۷+ سال) 🔞',
    categoryLabelEn: '17+ Street & Edgy Slang',
    fa: 'اعصابم خرد است و خونم به جوش آمده؛ الان اصلاً حوصله چانه زدن و بحث ندارم!',
    faColloquial: 'سگ‌اخلاقم و قاطی کردم؛ الان رو مخ من نرو!',
    en: 'I am pissed off and my blood is boiling right now; stop getting on my nerves!',
    enSlangVariant: 'I’mproper ticked off; don’t push my buttons right now!',
    fingilish: 'A\'sâbam khord ast va ghâti kardam; alân roo mokhe man naro!',
    pronunciationEn: 'eye am pist off right now; stop get-ing on mye nervz!',
    explanationFa: 'رده سنی ۱۷+: اصطلاح خیابانی «قاطی کردن / رو مخ رفتن» و معادل «Pissed off / Getting on my nerves».',
    isMature17Plus: true
  }
];

export const OfflineSpeechTranslator: React.FC = () => {
  const [direction, setDirection] = useState<'fa_to_en' | 'en_to_fa'>('fa_to_en');
  const [customText, setCustomText] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [enable17PlusSlang, setEnable17PlusSlang] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Intelligent Offline Semantic, Slang, Idiom, Carpet & C2 Dictionary Engine
  const handleTranslateCustom = (text: string): { translation: string; pronunciation: string; noteFa?: string } => {
    const trimmed = text.trim().toLowerCase();
    if (!trimmed) return { translation: '', pronunciation: '' };

    // 1. Check full offline database (including colloquial & slang variants)
    const dbMatch = OFFLINE_TRANSLATION_DATABASE.find(item =>
      item.fa.toLowerCase().includes(trimmed) ||
      (item.faColloquial && item.faColloquial.toLowerCase().includes(trimmed)) ||
      item.fingilish.toLowerCase().includes(trimmed) ||
      item.en.toLowerCase().includes(trimmed) ||
      (item.enSlangVariant && item.enSlangVariant.toLowerCase().includes(trimmed))
    );

    if (dbMatch) {
      return {
        translation: direction === 'fa_to_en' ? dbMatch.en : dbMatch.fa,
        pronunciation: direction === 'fa_to_en' ? dbMatch.pronunciationEn : dbMatch.fingilish,
        noteFa: dbMatch.explanationFa
      };
    }

    // 2. Comprehensive Offline Keyword & Slang/Carpet/Idiom Lexicon
    const richLexicon: Record<string, { en: string; fa: string; phon: string; note?: string }> = {
      // Carpet specialized terms
      'قالیچه': { en: 'Fine Persian area rug (Ghalicheh / Dozar size)', fa: 'قالیچه دستباف اصیل ایرانی', phon: 'fyne per-zhen air-ee-uh rug', note: 'اصطلاح تخصصی فرش' },
      'قالی': { en: 'Hand-knotted large Persian pile carpet (Ghali)', fa: 'قالی دستباف بزرگ‌پارچه', phon: 'hand-not-ed per-zhen pyle kar-pet' },
      'گلیم': { en: 'Flat-woven tribal Persian Kilim (pileless tapestry)', fa: 'گلیم دستباف سنتی (بدون پرز)', phon: 'flat-woh-ven kee-leem' },
      'پشتی': { en: 'Traditional handwoven Persian bolster cushion rug (Poshti - 2x3 ft)', fa: 'پشتی دستباف سنتی (۶۰×۹۰ سانت)', phon: 'posh-tee kuh-shun rug' },
      'ذرع و نیم': { en: 'Zar-o-Nim rug size (approx. 150×105 cm / 3.5×5 feet)', fa: 'سایز ذرع و نیم (حدود ۱۵۰ در ۱۰۵ سانتی‌متر)', phon: 'zar-oh-neem (3.5 by 5 feet)' },
      'زرع و نیم': { en: 'Zar-o-Nim rug size (approx. 150×105 cm / 3.5×5 feet)', fa: 'سایز ذرع و نیم (حدود ۱۵۰ در ۱۰۵ سانتی‌متر)', phon: 'zar-oh-neem (3.5 by 5 feet)' },
      'دو ذرع': { en: 'Dozar classic rug size (approx. 200×135 cm / 4.5×6.7 feet)', fa: 'سایز دو ذرع قالیچه (حدود ۲۰۰ در ۱۳۵ سانتی‌متر)', phon: 'doh-zar (4.5 by 6.7 feet)' },
      'دوزرع': { en: 'Dozar classic rug size (approx. 200×135 cm / 4.5×6.7 feet)', fa: 'سایز دو ذرع قالیچه (حدود ۲۰۰ در ۱۳۵ سانتی‌متر)', phon: 'doh-zar (4.5 by 6.7 feet)' },
      'چارک': { en: 'Zar-o-Charak rug size (approx. 125×80 cm / 2.7×4.1 feet)', fa: 'سایز ذرع و چارک (حدود ۱۲۵ در ۸۰ سانتی‌متر)', phon: 'zar-oh-cha-rak (2.7 by 4.1 feet)' },
      'کهنه ذاتی': { en: '100% Authentic naturally aged patina (Kohneh Zaati — organically foot-worn over decades, zero chemical wash)', fa: 'کهنه ذاتی (پاخورده طبیعی در طول دهه‌ها بدون مواد شیمیایی)', phon: 'aw-then-tik nach-ur-uh-lee aydjd puh-tee-nuh' },
      'نوبافت': { en: 'Newly woven unwalked carpet straight off the loom (Now-baft)', fa: 'فرش نوبافت و آکبند', phon: 'noo-lee woh-ven kar-pet' },
      'کارکرده': { en: 'Pre-owned vintage carpet in excellent full-pile condition', fa: 'فرش کارکرده سالم و گوشت‌دار', phon: 'pree-ohnd vin-tij kar-pet' },
      // Slang, Colloquial & 17+ Idioms
      'دمت گرم': { en: 'You rock, mate! Thanks a ton, I really appreciate it!', fa: 'دمت گرم رفیق، خیلی لطف کردی!', phon: 'yoo rok mayt, thanks ah tun' },
      'چطوری': { en: 'How’s it going, buddy? Everything good with you?', fa: 'چطوری رفیق؟ اوضاع روبه‌راهه؟', phon: 'howz it goh-ing bud-ee' },
      'خالی نبند': { en: 'Stop exaggerating / Stop pulling my leg!', fa: 'خالی نبند / اغراق نکن!', phon: 'stop pool-ing mye leg' },
      'چرت و پرت': { en: 'Cut the crap / Stop talking nonsense (17+ Street)', fa: 'چرت و پرت نگو / حرف بی‌ربط نزن', phon: 'kut theh krap / stop non-sens' },
      'قاطی کردم': { en: 'I am pissed off and losing my temper right now (17+ Street)', fa: 'خیلی عصبانی شدم و قاطی کردم', phon: 'eye am pist off ryte now' },
      'رو مخ': { en: 'Stop getting on my nerves / Stop bugging me!', fa: 'رو مخ من نرو / کلافه‌ام نکن!', phon: 'stop get-ing on mye nervz' },
      'bullshit': { en: 'Stop the bullshit / Cut the crap', fa: 'چرت و پرت نگو / خالی نبند! (محاوره تند ۱۷+)', phon: 'Chert o part nagoo!' },
      'pissed off': { en: 'I am really pissed off', fa: 'اعصابم به شدت خرده و قاطی کردم! (محاوره ۱۷+)', phon: 'Asabam kheyli khordeh!' },
      'rip off': { en: 'This is a rip-off!', fa: 'این رسماً سرگردنه و کلاهبرداریه! گران حساب نکنید.', phon: 'In kolah-bardariyeh!' },
      // Everyday Survival
      'سلام': { en: 'Hello, good day!', fa: 'سلام، روزتون به‌خیر!', phon: 'hel-LO, good day' },
      'ممنون': { en: 'Thank you very much, I truly appreciate it!', fa: 'خیلی ممنون، دست شما درد نکنه!', phon: 'thank yoo ver-ee much' },
      'ببخشید': { en: 'Excuse me, pardon me.', fa: 'ببخشید، معذرت می‌خوام.', phon: 'ek-SKYOOZ mee' },
      'کجاست': { en: 'Where is it located? How can I get there?', fa: 'کجاست؟ چطور می‌توانم بروم؟', phon: 'wayr iz it loh-kay-ted' },
      'آب': { en: 'Could I have a bottle of water, please?', fa: 'بی‌زحمت یک بطری آب لطفاً.', phon: 'kood eye hav ah bot-ul ov wah-ter pleez' },
      'کمک': { en: 'Please help me, I need assistance!', fa: 'لطفاً به من کمک کنید!', phon: 'pleez help mee' },
      'تاکسی': { en: 'I need a taxi to this address, please.', fa: 'من یک تاکسی به این آدرس می‌خواهم.', phon: 'eye need ah tak-see' },
      'مترو': { en: 'Where is the nearest metro/subway station?', fa: 'نزدیک‌ترین ایستگاه مترو کجاست؟', phon: 'wayr iz theh meh-troh stay-shun' },
      'هتل': { en: 'Please take me to this hotel.', fa: 'لطفاً من را به این هتل ببرید.', phon: 'pleez tayk mee too this hoh-tel' },
      'حساب': { en: 'Could we have the bill/check, please?', fa: 'صورت‌حساب لطفاً.', phon: 'kood wee hav theh bil pleez' }
    };

    for (const [key, val] of Object.entries(richLexicon)) {
      if (trimmed.includes(key)) {
        return {
          translation: direction === 'fa_to_en' ? val.en : val.fa,
          pronunciation: val.phon,
          noteFa: val.note
        };
      }
    }

    if (direction === 'fa_to_en') {
      return {
        translation: `Excuse me, regarding "${text}", could you please help or explain clearly?`,
        pronunciation: 'ek-skyooz mee, kood yoo pleez help or ek-splayn kleer-lee?'
      };
    } else {
      return {
        translation: `ببخشید، در مورد «${text}»، ممکن است به زبان ساده راهنمایی بفرمایید؟`,
        pronunciation: 'Bebakhshid, momken ast be zabane sadeh rahnamayi befarmayid?'
      };
    }
  };

  const currentTranslation = handleTranslateCustom(customText);

  const handleSpeak = (text: string, lang: 'en' | 'fa' | 'ar') => {
    if (lang === 'en') speakEnglish(text, 0.85);
    else if (lang === 'ar') speakArabic(text, 0.85);
    else speakPersian(text, 0.85);
  };

  const handleCopy = (text: string, id: string) => {
    sound.playCoin();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPhrases = OFFLINE_TRANSLATION_DATABASE.filter(item => {
    if (!enable17PlusSlang && item.isMature17Plus) return false;
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Hero Communicator Header */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-800 via-emerald-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-4xl space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>۱۰۰٪ آفلاین • پوشش کامل از مکالمه روزمره تا سطح فوق‌پیشرفته (C2)، ضرب‌المثل‌ها، فرش و اصطلاحات ۱۷+ سال</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            مترجم صوتی و سخنگوی هوشمند آفلاین (حرفه‌ای، عامیانه و تجاری) 🎙️
          </h1>

          <p className="text-teal-100 text-xs sm:text-sm leading-relaxed">
            این مترجم هم <strong>زبان عامیانه و خیابانی (Slang)</strong>، هم <strong>ضرب‌المثل‌ها و سطوح فوق‌پیشرفته (C2)</strong>، هم <strong>اصطلاحات تخصصی فرش</strong> و هم <strong>الفاظ تند رده سنی ۱۷+ سال</strong> را می‌فهمد و با صدای بلند به جای شما با طرف مقابل صحبت می‌کند!
          </p>

          {/* Direction & 17+ Toggle Controls */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setDirection(direction === 'fa_to_en' ? 'en_to_fa' : 'fa_to_en');
                setCustomText('');
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-transform active:scale-95"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>
                {direction === 'fa_to_en' 
                  ? '🇮🇷 فارسی به 🇬🇧 انگلیسی (مسافر و تاجر ایرانی)' 
                  : '🇬🇧 انگلیسی به 🇮🇷 فارسی (توریست و مشتری خارجی در ایران)'}
              </span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setEnable17PlusSlang(!enable17PlusSlang);
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm border transition-all ${
                enable17PlusSlang
                  ? 'bg-rose-600/90 border-rose-400 text-white'
                  : 'bg-white/10 border-white/20 text-teal-100 hover:bg-white/20'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>
                {enable17PlusSlang
                  ? '🔞 پوشش اصطلاحات تند و خیابانی (۱۷+ سال): فعال'
                  : 'پوشش اصطلاحات ۱۷+ سال: غیرفعال'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* INSTANT INTERACTIVE COMMUNICATOR BOX */}
      <div className="bg-white border-2 border-teal-500/40 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-slate-900">
                مترجم و سخنگوی آنی (عامیانه، ضرب‌المثل، فرش و روزمره)
              </h2>
              <p className="text-xs text-slate-500">
                هر واژه عامیانه، اصطلاح خیابانی، سایز فرش (ذرع و نیم، کهنه ذاتی) یا جمله مسافرتی را بنویسید یا انتخاب کنید:
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-teal-800">
            موتور صوتی آفلاین فعال ✔️
          </span>
        </div>

        {/* Input Area */}
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={
                direction === 'fa_to_en' 
                  ? 'بنویسید: مثلاً «دمت گرم»، «کهنه ذاتی»، «دو ذرع»، «مارگزیده»، «چرت و پرت»، «تاکسی»...' 
                  : 'Type slang, proverb, carpet term, or travel phrase: e.g. "bullshit", "rip off", "taxi", "water"...'
              }
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
            />
            {customText && (
              <button
                onClick={() => setCustomText('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-800 font-bold bg-slate-100 px-2.5 py-1 rounded-lg"
              >
                پاک کردن
              </button>
            )}
          </div>

          {/* Quick Suggestion Chips including Slang, Carpet & Proverbs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-bold">امتحان سریع:</span>
            {(direction === 'fa_to_en' 
              ? ['دمت گرم', 'کهنه ذاتی', 'دو ذرع', 'ذرع و نیم', 'مارگزیده', 'سر کارم گذاشتی', 'چرت و پرت', 'قاطی کردم', 'تاکسی'] 
              : ['bullshit', 'pissed off', 'rip off', 'hello', 'taxi', 'water', 'help']
            ).map((keyword) => (
              <button
                key={keyword}
                onClick={() => {
                  sound.playClick();
                  setCustomText(keyword);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-100 text-slate-700 hover:text-teal-900 font-bold transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>

        {/* Real-Time Speech Output Box */}
        {customText.trim() && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50 border-2 border-teal-300 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-800">
                {direction === 'fa_to_en' ? 'ترجمه صوتی به انگلیسی (رسمی و محاوره):' : 'ترجمه صوتی به فارسی:'}
              </span>

              <button
                onClick={() => handleCopy(currentTranslation.translation, 'custom')}
                className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors"
                title="کپی کردن متن"
              >
                {copiedId === 'custom' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug" dir="auto">
                "{currentTranslation.translation}"
              </h3>
              <p className="font-mono text-xs font-bold text-teal-800" dir="ltr">
                Pronunciation: {currentTranslation.pronunciation}
              </p>
              {currentTranslation.noteFa && (
                <p className="text-xs text-slate-600 pt-1">
                  💡 {currentTranslation.noteFa}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleSpeak(currentTranslation.translation, direction === 'fa_to_en' ? 'en' : 'fa')}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-teal-700 hover:bg-teal-600 text-white font-black text-sm sm:text-base shadow-lg transition-all active:scale-95"
              >
                <Volume2 className="w-6 h-6" />
                <span>
                  {direction === 'fa_to_en' 
                    ? '🔊 با صدای رسا به انگلیسی بگو (Speak on My Behalf)' 
                    : '🔊 با صدای رسا به فارسی بگو (Speak in Persian)'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SITUATIONAL, SLANG, PROVERB & CARPET PHRASE DATABASE */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-600" />
              <span>بانک جامع جملات سخنگو (از سفر و تجارت فرش تا محاوره خیابانی، ضرب‌المثل C2 و ۱۷+ سال)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              روی هر دسته کلیک کنید تا جملات رسمی، عامیانه (Slang)، ضرب‌المثل‌های سطح فوق‌پیشرفته و اصطلاحات تند ۱۷+ سال را ببینید و پخش کنید:
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'همه دسته‌ها' },
              { id: 'street_slang_idioms', label: 'محاوره عامیانه و کوچه بازار 🗣️' },
              { id: 'proverbs_c2', label: 'ضرب‌المثل‌ها و فوق‌پیشرفته (C2) 📜' },
              { id: 'carpet_bazaar', label: 'تجارت فرش (قالی، ذرع، کهنه ذاتی) 🧶' },
              { id: 'mature_17plus', label: 'الفاظ و اصطلاحات تند (۱۷+ سال) 🔞' },
              { id: 'taxi_direction', label: 'تاکسی و مترو 🚕' },
              { id: 'restaurant_food', label: 'رستوران 🍽️' },
              { id: 'hotel_stay', label: 'هتل 🏨' },
              { id: 'emergency_help', label: 'اورژانس 🚨' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Phrases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPhrases.map((phrase) => {
            const isEnglishTarget = direction === 'fa_to_en';
            const speakTargetText = isEnglishTarget ? phrase.en : phrase.fa;

            return (
              <div
                key={phrase.id}
                className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                  phrase.isMature17Plus
                    ? 'border-rose-300 bg-rose-50/30'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white'
                }`}
              >
                <div className="space-y-2.5">
                  {/* Unboxed metadata header */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 font-bold text-teal-900">
                      <span>{phrase.categoryLabelFa}</span>
                      <span aria-hidden="true">·</span>
                      <span className={phrase.isMature17Plus ? 'text-rose-700 font-black' : 'text-slate-500'}>
                        {phrase.levelTag}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(speakTargetText, phrase.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                      title="کپی"
                    >
                      {copiedId === phrase.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Persian Formal & Colloquial */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 font-bold block">🇮🇷 فارسی (معیار و عامیانه):</span>
                    <p className="font-bold text-sm text-slate-900 leading-snug">
                      {phrase.fa}
                    </p>
                    {phrase.faColloquial && (
                      <p className="text-xs font-bold text-amber-900">
                        🗣️ عامیانه کوچه بازار: «{phrase.faColloquial}»
                      </p>
                    )}
                  </div>

                  {/* English Formal & Slang */}
                  <div className="pt-2 border-t border-slate-200/70 space-y-1">
                    <span className="text-[11px] text-slate-500 font-bold block">🇬🇧 English (Standard & Street Slang):</span>
                    <p className="font-black text-sm text-teal-950 leading-snug" dir="ltr">
                      "{phrase.en}"
                    </p>
                    {phrase.enSlangVariant && (
                      <p className="text-xs font-bold text-indigo-900" dir="ltr">
                        🔥 Street Slang: "{phrase.enSlangVariant}"
                      </p>
                    )}
                  </div>

                  {/* Optional Arabic for Carpet Trade */}
                  {phrase.ar && (
                    <div className="pt-1 border-t border-slate-200/70">
                      <span className="text-[11px] text-amber-800 font-bold block">🇸🇦🇦🇪 عربی تجاری:</span>
                      <p className="font-bold text-xs text-slate-900">
                        «{phrase.ar}»
                      </p>
                    </div>
                  )}

                  {/* Phonetic & Pedagogical Note */}
                  <p className="font-mono text-xs text-slate-500" dir="ltr">
                    {isEnglishTarget ? `Pronunciation: ${phrase.pronunciationEn}` : `Fingilish: ${phrase.fingilish}`}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    💡 {phrase.explanationFa}
                  </p>
                </div>

                {/* Speaker Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleSpeak(speakTargetText, isEnglishTarget ? 'en' : 'fa')}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>
                      {isEnglishTarget ? '🔊 بگو (انگلیسی)' : '🔊 بگو (فارسی)'}
                    </span>
                  </button>

                  {phrase.enSlangVariant && isEnglishTarget && (
                    <button
                      onClick={() => handleSpeak(phrase.enSlangVariant!, 'en')}
                      className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>لحن خیابانی (Slang)</span>
                    </button>
                  )}

                  {phrase.ar && (
                    <button
                      onClick={() => handleSpeak(phrase.ar!, 'ar')}
                      className="px-3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>عربی</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
