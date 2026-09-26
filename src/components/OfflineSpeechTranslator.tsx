import React, { useState, useRef, useEffect } from 'react';
import { 
  Volume2, 
  Mic, 
  MicOff,
  Sparkles, 
  Copy, 
  Check, 
  Compass,
  ShieldAlert,
  Send,
  Trash2,
  MessageSquare,
  VolumeX
} from 'lucide-react';
import {
  sound,
  speakEnglish,
  speakPersian,
  speakArabic,
  transliteratePersianToFingilish
} from '../utils/audio';

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

export interface ChatTurnMessage {
  id: string;
  sender: 'fa_speaker' | 'en_speaker';
  originalText: string;
  translatedText: string;
  colloquialVariant?: string;
  pronunciation: string;
  noteFa?: string;
  timestamp: string;
}

export const OFFLINE_TRANSLATION_DATABASE: OfflineTranslationEntry[] = [
  // 1. TAXI & DIRECTIONS
  {
    id: 'tr_1',
    category: 'taxi_direction',
    levelTag: 'A1-B1 (روزمره)',
    categoryLabelFa: 'تاکسی و آدرس‌یابی 🚕',
    categoryLabelEn: 'Taxi & Directions',
    fa: 'سلام، بی‌زحمت من رو به این آدرس یا نزدیک‌ترین ایستگاه مترو ببرید.',
    faColloquial: 'سلام داداش، بی‌زحمت ما رو می‌رسونی این آدرس یا دم مترو؟',
    en: 'Hello, could you please take me to this address or the nearest metro station?',
    enSlangVariant: 'Hey mate, could you drop me off at this spot or by the nearest subway?',
    fingilish: 'Salaam, bi-zahmat man ro be in adres ya nazdiktarin istgahe metro bebarid.',
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
    en: 'How much is the fare? Do you take card or cash only?',
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
    en: 'Please pull over right here at the corner. Thank you so much!',
    fingilish: 'Lotfan hamin goosheh negah-darid, piyadeh misham. Daste shoma dard nakoneh!',
    pronunciationEn: 'pleez pool oh-ver ryte heer at theh kor-ner',
    explanationFa: 'پیاده شدن راحت در مقصد به همراه تشکر اصیل و عامیانه.'
  },

  // 2. RESTAURANT & FOOD
  {
    id: 'tr_4',
    category: 'restaurant_food',
    levelTag: 'A1-B1 (روزمره)',
    categoryLabelFa: 'رستوران و کافه 🍽️',
    categoryLabelEn: 'Restaurant & Café',
    fa: 'سلام، لطفاً منو را بیاورید. غذای سنتی و پرطرفدار شما چیست؟',
    en: 'Hello, could we see the menu please? What is your signature traditional dish?',
    fingilish: 'Salaam, lotfan menu ra biavarid. Ghazaye sonnatiye shoma chist?',
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
    en: 'Please make sure this dish is not spicy and has no food allergens.',
    fingilish: 'Bi-zahmat in ghaza felfele tond ya mavade hassasiyat-za nadashteh bashad.',
    pronunciationEn: 'pleez mayk shoor this dish iz not spye-see',
    explanationFa: 'جلوگیری از حساسیت غذایی یا تندی زیاد.'
  },

  // 3. HOTEL & EMERGENCY
  {
    id: 'tr_7',
    category: 'hotel_stay',
    levelTag: 'A1-B1 (روزمره)',
    categoryLabelFa: 'هتل و اقامتگاه 🏨',
    categoryLabelEn: 'Hotel & Stay',
    fa: 'سلام، من از قبل اتاق رزرو کرده‌ام، رمز وای‌فای و ساعت صبحانه چیست؟',
    en: 'Hello, I have a room reservation. What is the Wi-Fi password and breakfast time?',
    fingilish: 'Salaam, man otagh rezerv kardeh-am, ramze Wi-Fi va sa\'ate sobhaneh chist?',
    pronunciationEn: 'eye hav ah room reh-zer-vay-shun. whut iz theh wye-fye and brek-fust tyme?',
    explanationFa: 'پذیرش سریع در هتل بدون نیاز به مکالمه پیچیده.'
  },
  {
    id: 'tr_9',
    category: 'emergency_help',
    levelTag: 'A1-B1 (روزمره)',
    categoryLabelFa: 'اورژانس و کمک فوری 🚨',
    categoryLabelEn: 'Emergency & Help',
    fa: 'لطفاً کمکم کنید! من مسیرم را گم کرده‌ام و زبان بلد نیستم.',
    en: 'Please help me! I have lost my way and I do not speak the language well.',
    fingilish: 'Lotfan komakam konid! Man masiram ra gom kardeh-am va zaban balad nistam.',
    pronunciationEn: 'pleez help mee, eye am lost',
    explanationFa: 'جمله نجات‌بخش فوری در کوچه و خیابان.'
  },

  // 4. STREET SLANG & COLLOQUIAL IDIOMS
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
    en: 'I am bored out of my mind; fancy going for a spin to clear our heads?',
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
    en: 'Are you pulling my leg? Stop messing with me—this is dead serious!',
    enSlangVariant: 'Are you winding me up? Quit playing, dead serious right now!',
    fingilish: 'Mâ ro gerefti? Dastemoon nandâz, ghaziyeh jeddiyeh!',
    pronunciationEn: 'ar yoo pool-ing mye leg? stop mes-ing with mee!',
    explanationFa: 'معادل اصطلاحی «ما رو گرفتی؟ / سر کار گذاشتن / دست انداختن».'
  },

  // 5. GRANDMASTER C2 PROVERBS
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
    fa: 'آشپز که دو تا شد، آش یا شور می‌شود یا بی‌نمک.',
    en: 'Too many cooks spoil the broth.',
    fingilish: 'Âshpaz ke do tâ shod, âsh yâ shoor mishavad yâ bi-namak.',
    pronunciationEn: 'too men-ee kooks spoyl theh broth',
    explanationFa: 'معادل دقیق ضرب‌المثل «آشپز که دو تا شد...» در مدیریت و مکالمه.'
  },

  // 6. PERSIAN CARPET BAZAAR & EXPORT
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

  // 7. 17+ STREET & MATURE IDIOMS
  {
    id: 'tr_17_1',
    category: 'mature_17plus',
    levelTag: '17+ Street (رده سنی ۱۷+ سال)',
    categoryLabelFa: 'اصطلاحات تند و خیابانی (رده سنی ۱۷+ سال) 🔞',
    categoryLabelEn: '17+ Street & Edgy Slang',
    fa: 'چرت و پرت نگو / خالی نبند! داری کلاه سر ما می‌ذاری؟',
    faColloquial: 'شعر نگو / خالی نبند! می‌خوای سر ما رو شیره بمالی؟',
    en: 'Cut the crap / Stop the bullshit! Are you trying to rip me off?',
    enSlangVariant: 'Quit bullshitting me! You trying to scam me or what?',
    fingilish: 'Chert o part nagoo / Khâli naband! Dâri kolâh sare mâ mizâri?',
    pronunciationEn: 'kut theh krap! ar yoo try-ing too rip mee off?',
    explanationFa: 'رده سنی ۱۷+: برای فهمیدن یا دفاع از خود در برابر کلاهبرداری یا بحث‌های تند خیابانی.',
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
    explanationFa: 'رده سنی ۱۷+: شناخت الفاظ تند اعتراضی در فیلم‌ها یا مشاجرات خیابانی.',
    isMature17Plus: true
  }
];

// Compositional Offline Dictionary (Word & Phrase Stems for 100% Offline Free-Form Sentence Construction)
const OFFLINE_FA_TO_EN_PHRASES: Array<[string, string]> = [
  ['حالت چطوره', 'How are you doing?'],
  ['حالتون چطوره', 'How are you doing?'],
  ['خسته نباشید', 'Thank you for your hard work / Good job!'],
  ['خوشبختم', 'Nice to meet you!'],
  ['اسم من', 'My name is'],
  ['اسم شما چیه', 'What is your name?'],
  ['چند سالته', 'How old are you?'],
  ['اهل کجایی', 'Where are you from?'],
  ['اهل ایران هستم', 'I am from Iran'],
  ['من ایرانی هستم', 'I am Iranian'],
  ['گرسنه هستم', 'I am hungry'],
  ['تشنه هستم', 'I am thirsty'],
  ['خسته هستم', 'I am tired'],
  ['می‌خواهم', 'I want to'],
  ['میخوام', 'I want to'],
  ['نمی‌خواهم', 'I do not want'],
  ['نمیخوام', 'I do not want'],
  ['دوست دارم', 'I like / I love'],
  ['کجاست', 'where is it?'],
  ['چقدر است', 'how much is it?'],
  ['چنده', 'how much is it?'],
  ['قیمت این', 'the price of this'],
  ['تخفیف بده', 'please give me a discount'],
  ['تخفیف داره', 'does it have a discount?'],
  ['خیلی گرونه', 'it is too expensive!'],
  ['خیلی خوبه', 'it is very good!'],
  ['عالیه', 'that is awesome!'],
  ['دمت گرم', 'thank you so much, you rock!'],
  ['دستت درد نکنه', 'thank you very much for your kindness!'],
  ['قابل نداره', 'it is a gift for you, please do not mention the price!'],
  ['کهنه ذاتی', 'authentic naturally aged patina (Kohneh Zaati)'],
  ['ذرع و نیم', 'Zar-o-Nim rug size (150 by 105 cm / 3.5 by 5 feet)'],
  ['دو ذرع', 'Dozar rug size (200 by 135 cm / 4.5 by 6.7 feet)'],
  ['ذرع و چارک', 'Zar-o-Charak rug size (125 by 80 cm / 2.7 by 4.1 feet)'],
  ['قالیچه', 'fine handwoven Persian area rug (Ghalicheh)'],
  ['قالی', 'hand-knotted Persian carpet (Ghali)'],
  ['گلیم', 'flat-woven Persian Kilim'],
  ['پشتی', 'traditional Persian bolster cushion rug (Poshti)'],
  ['نوبافت', 'newly woven off-the-loom carpet'],
  ['کارکرده', 'pre-owned vintage condition carpet'],
  ['چرت و پرت نگو', 'cut the crap / stop talking nonsense!'],
  ['خالی نبند', 'stop pulling my leg / stop exaggerating!'],
  ['قاطی کردم', 'I am really pissed off right now!'],
  ['رو مخ من نرو', 'stop getting on my nerves!'],
  ['سرویس بهداشتی', 'restroom / bathroom'],
  ['دستشویی', 'restroom / toilet'],
  ['فرودگاه', 'the airport'],
  ['ایستگاه مترو', 'the metro station'],
  ['بیمارستان', 'the hospital'],
  ['داروخانه', 'the pharmacy'],
  ['پلیس', 'the police'],
  ['امروز', 'today'],
  ['فردا', 'tomorrow'],
  ['دیروز', 'yesterday'],
  ['الان', 'right now'],
  ['بله', 'yes'],
  ['نه', 'no'],
  ['شاید', 'maybe'],
  ['حتماً', 'certainly / for sure'],
  ['باشه', 'okay, sounds good'],
  ['خداحافظ', 'Goodbye, take care!'],
  ['فعلاً خداحافظ', 'See you later, bye!']
];

const OFFLINE_EN_TO_FA_PHRASES: Array<[string, string]> = [
  ['how are you', 'حالتون چطوره؟ خوبی رفیق؟'],
  ['what is your name', 'اسم شما چیه؟'],
  ['my name is', 'اسم من هست'],
  ['nice to meet you', 'از آشنایی با شما خیلی خوشبختم!'],
  ['where are you from', 'شما اهل کجا هستید؟'],
  ['i am from', 'من اهلِ ... هستم'],
  ['how much is this', 'قیمت این چقدر است؟ (چنده؟)'],
  ['how much does it cost', 'هزینه این چقدر می‌شود؟'],
  ['too expensive', 'خیلی گرانه! می‌شود تخفیف بدهید؟'],
  ['can you give me a discount', 'ممکنه به من تخفیف بدید؟'],
  ['where is the bathroom', 'ببخشید، سرویس بهداشتی کجاست؟'],
  ['where is the restroom', 'ببخشید، سرویس بهداشتی کجاست؟'],
  ['where is the hotel', 'هتل کجاست؟'],
  ['where is the airport', 'فرودگاه کجاست؟'],
  ['i need a taxi', 'من یک تاکسی نیاز دارم.'],
  ['i am hungry', 'من گرسنه هستم.'],
  ['i am thirsty', 'من تشنه هستم، آب می‌خواهم.'],
  ['i want to buy', 'من می‌خواهم بخرم'],
  ['persian carpet', 'فرش دستباف ایرانی'],
  ['persian rug', 'قالیچه دستباف ایرانی'],
  ['naturally aged', 'کهنه ذاتی (پاخورده طبیعی و اصیل)'],
  ['vegetable dye', 'رنگ گیاهی و طبیعی'],
  ['bullshit', 'چرت و پرت / خالی‌بندی (محاوره تند ۱۷+)'],
  ['cut the crap', 'چرت و پرت نگو! (محاوره ۱۷+)'],
  ['pissed off', 'اعصابم خیلی خرده و قاطی کردم! (محاوره ۱۷+)'],
  ['rip off', 'کلاهبرداری و گران‌فروشی!'],
  ['thank you', 'خیلی ممنون، دست شما درد نکنه!'],
  ['thanks a lot', 'دمت گرم، خیلی ممنون!'],
  ['excuse me', 'ببخشید، عذر می‌خواهم'],
  ['i do not understand', 'متوجه نمی‌شوم، لطفاً واضح‌تر بگویید'],
  ['do you speak english', 'آیا شما انگلیسی صحبت می‌کنید؟'],
  ['please help me', 'لطفاً به من کمک کنید!'],
  ['goodbye', 'خداحافظ، به سلامت!']
];

const OFFLINE_WORD_DICT_FA_EN: Record<string, string> = {
  'سلام': 'Hello',
  'درود': 'Greetings',
  'من': 'I',
  'تو': 'you',
  'شما': 'you',
  'ما': 'we',
  'آنها': 'they',
  'این': 'this',
  'آن': 'that',
  'خوب': 'good',
  'بد': 'bad',
  'بزرگ': 'large',
  'کوچک': 'small',
  'زیبا': 'beautiful',
  'قشنگ': 'lovely',
  'فرش': 'carpet',
  'قالی': 'hand-knotted carpet (Ghali)',
  'قالیچه': 'area rug (Ghalicheh)',
  'گلیم': 'flat-woven Kilim',
  'پشتی': 'bolster cushion rug (Poshti)',
  'ابریشم': 'pure silk',
  'پشم': 'natural wool',
  'قیمت': 'price',
  'پول': 'money',
  'دلار': 'dollars',
  'تومان': 'Tomans',
  'غذا': 'food',
  'آب': 'water',
  'چای': 'tea',
  'قهوه': 'coffee',
  'نان': 'bread',
  'کباب': 'kebab',
  'خیابان': 'street',
  'بازار': 'bazaar',
  'مغازه': 'shop',
  'اتاق': 'room',
  'بلیط': 'ticket',
  'تاکسی': 'taxi',
  'مترو': 'metro',
  'اتوبوس': 'bus',
  'هتل': 'hotel',
  'کمک': 'help',
  'دکتر': 'doctor',
  'دارو': 'medicine',
  'دوست': 'friend',
  'رفیق': 'buddy',
  'داداش': 'bro',
  'هستم': 'am',
  'هستی': 'are',
  'است': 'is',
  'نیست': 'is not',
  'دارم': 'have',
  'ندارم': 'do not have',
  'می‌روم': 'am going',
  'میرم': 'am going',
  'می‌آیم': 'am coming',
  'می‌خرم': 'will buy',
  'می‌فروشم': 'sell'
};

const OFFLINE_WORD_DICT_EN_FA: Record<string, string> = {
  'hello': 'سلام',
  'hi': 'سلام',
  'hey': 'سلام رفیق',
  'good': 'خوب',
  'morning': 'صبح بخیر',
  'night': 'شب بخیر',
  'please': 'لطفاً',
  'thanks': 'ممنون',
  'yes': 'بله',
  'no': 'نه',
  'water': 'آب',
  'food': 'غذا',
  'tea': 'چای',
  'coffee': 'قهوه',
  'bread': 'نان',
  'taxi': 'تاکسی',
  'bus': 'اتوبوس',
  'metro': 'مترو',
  'hotel': 'هتل',
  'room': 'اتاق',
  'airport': 'فرودگاه',
  'bazaar': 'بازار',
  'carpet': 'فرش دستباف',
  'rug': 'قالیچه',
  'kilim': 'گلیم',
  'silk': 'ابریشم',
  'wool': 'پشم',
  'old': 'قدیمی و کهنه',
  'new': 'جدید و نوبافت',
  'price': 'قیمت',
  'cheap': 'ارزان و مناسب',
  'expensive': 'گران',
  'discount': 'تخفیف',
  'money': 'پول',
  'card': 'کارت بانکی',
  'cash': 'پول نقد',
  'help': 'کمک',
  'doctor': 'پزشک',
  'hospital': 'بیمارستان',
  'police': 'پلیس',
  'friend': 'دوست و رفیق',
  'where': 'کجاست',
  'when': 'چه زمانی',
  'why': 'چرا',
  'how': 'چطور',
  'much': 'چقدر',
  'today': 'امروز',
  'tomorrow': 'فردا'
};

export const OfflineSpeechTranslator: React.FC = () => {
  // Dual-side chat inputs
  const [faInput, setFaInput] = useState<string>('');
  const [enInput, setEnInput] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [autoSpeakChat, setAutoSpeakChat] = useState<boolean>(true);

  // Voice Recognition States for BOTH sides
  const [listeningSide, setListeningSide] = useState<'fa' | 'en' | null>(null);
  const [micStatusMessage, setMicStatusMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Chat Messages History
  const [chatHistory, setChatHistory] = useState<ChatTurnMessage[]>([
    {
      id: 'welcome_1',
      sender: 'fa_speaker',
      originalText: 'سلام، به حجره و شهر ما خوش آمدید! هر جمله‌ای را به فارسی یا انگلیسی بنویسید یا با میکروفون بگویید تا فوراً ترجمه و با صدای بلند خوانده شود.',
      translatedText: 'Hello, welcome to our showroom and city! Type or speak any sentence in Persian or English to translate and play it aloud.',
      colloquialVariant: 'Hey there, welcome! Just type or tap the mic in Persian or English and I’ll speak for you.',
      pronunciation: 'hel-LO, wel-kum too owr show-room and sit-ee!',
      timestamp: 'هم‌اکنون'
    }
  ]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [enable17PlusSlang, setEnable17PlusSlang] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Pure Offline Compositional Fallback Translator
  const translateOfflineCompositional = (
    text: string,
    dir: 'fa_to_en' | 'en_to_fa'
  ): { translation: string; colloquialVariant?: string; pronunciation: string; noteFa?: string } => {
    const trimmed = text.trim();
    const lower = trimmed.toLowerCase();

    // 1. Check exact or substring match in OFFLINE_TRANSLATION_DATABASE
    const dbMatch = OFFLINE_TRANSLATION_DATABASE.find(item =>
      dir === 'fa_to_en'
        ? item.fa.toLowerCase().includes(lower) ||
          (item.faColloquial && item.faColloquial.toLowerCase().includes(lower)) ||
          item.fingilish.toLowerCase().includes(lower)
        : item.en.toLowerCase().includes(lower) ||
          (item.enSlangVariant && item.enSlangVariant.toLowerCase().includes(lower))
    );

    if (dbMatch) {
      return {
        translation: dir === 'fa_to_en' ? dbMatch.en : dbMatch.fa,
        colloquialVariant: dir === 'fa_to_en' ? dbMatch.enSlangVariant : dbMatch.faColloquial,
        pronunciation: dir === 'fa_to_en' ? dbMatch.pronunciationEn : dbMatch.fingilish,
        noteFa: dbMatch.explanationFa
      };
    }

    // 2. Phrase & Clause replacement + Word-by-Word assembly
    if (dir === 'fa_to_en') {
      let working = trimmed;
      const matchedChunks: string[] = [];

      for (const [faPhrase, enPhrase] of OFFLINE_FA_TO_EN_PHRASES) {
        if (working.includes(faPhrase)) {
          matchedChunks.push(enPhrase);
          working = working.replace(faPhrase, ' ');
        }
      }

      const remainingWords = working
        .replace(/[؟?،,.!]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);

      for (const w of remainingWords) {
        if (OFFLINE_WORD_DICT_FA_EN[w]) {
          matchedChunks.push(OFFLINE_WORD_DICT_FA_EN[w]);
        }
      }

      if (matchedChunks.length > 0) {
        const joined = matchedChunks.join(' ');
        const formatted = joined.charAt(0).toUpperCase() + joined.slice(1);
        return {
          translation: formatted,
          pronunciation: formatted.toLowerCase(),
          noteFa: 'ترجمه با موتور ترکیبی آفلاین'
        };
      }

      return {
        translation: transliteratePersianToFingilish(trimmed),
        pronunciation: transliteratePersianToFingilish(trimmed),
        noteFa: 'نمایش آوایی آفلاین'
      };
    } else {
      let working = lower;
      const matchedChunks: string[] = [];

      for (const [enPhrase, faPhrase] of OFFLINE_EN_TO_FA_PHRASES) {
        if (working.includes(enPhrase)) {
          matchedChunks.push(faPhrase);
          working = working.replace(enPhrase, ' ');
        }
      }

      const remainingWords = working
        .replace(/[?,.!]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);

      for (const w of remainingWords) {
        if (OFFLINE_WORD_DICT_EN_FA[w]) {
          matchedChunks.push(OFFLINE_WORD_DICT_EN_FA[w]);
        }
      }

      if (matchedChunks.length > 0) {
        const joinedFa = matchedChunks.join(' ');
        return {
          translation: joinedFa,
          pronunciation: transliteratePersianToFingilish(joinedFa),
          noteFa: 'ترجمه با موتور ترکیبی آفلاین'
        };
      }

      return {
        translation: trimmed,
        pronunciation: trimmed,
        noteFa: 'متن انگلیسی'
      };
    }
  };

  // Hybrid Online + Offline Translation Engine (Translates ANY sentence accurately!)
  const performSmartTranslation = async (
    text: string,
    dir: 'fa_to_en' | 'en_to_fa'
  ): Promise<{ translation: string; colloquialVariant?: string; pronunciation: string; noteFa?: string }> => {
    const trimmed = text.trim();
    if (!trimmed) return { translation: '', pronunciation: '' };

    // First check if we have a rich curated entry in our specialized database (for carpet terms, C2 proverbs, 17+ slang)
    const exactCurated = OFFLINE_TRANSLATION_DATABASE.find(item =>
      dir === 'fa_to_en'
        ? item.fa.trim() === trimmed || item.faColloquial?.trim() === trimmed
        : item.en.toLowerCase().trim() === trimmed.toLowerCase()
    );
    if (exactCurated) {
      return {
        translation: dir === 'fa_to_en' ? exactCurated.en : exactCurated.fa,
        colloquialVariant: dir === 'fa_to_en' ? exactCurated.enSlangVariant : exactCurated.faColloquial,
        pronunciation: dir === 'fa_to_en' ? exactCurated.pronunciationEn : exactCurated.fingilish,
        noteFa: exactCurated.explanationFa
      };
    }

    // Try fast neural translation API (Google GTX free endpoint) + Backend AI proxy
    try {
      const sl = dir === 'fa_to_en' ? 'fa' : 'en';
      const tl = dir === 'fa_to_en' ? 'en' : 'fa';
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&dt=rm&q=${encodeURIComponent(trimmed)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && Array.isArray(data[0])) {
          const translatedSegments = data[0]
            .map((seg: any) => (Array.isArray(seg) && typeof seg[0] === 'string' ? seg[0] : ''))
            .join('');
          if (translatedSegments.trim()) {
            const cleanTranslation = translatedSegments.trim();
            const pron = dir === 'fa_to_en'
              ? cleanTranslation
              : transliteratePersianToFingilish(cleanTranslation);
            return {
              translation: cleanTranslation,
              pronunciation: pron,
              noteFa: 'ترجمه دقیق جمله‌ای'
            };
          }
        }
      }
    } catch {
      // Ignore network error and try backend or offline engine
    }

    // Try server-side Gemini proxy if configured
    try {
      const apiRes = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: trimmed,
          direction: dir,
          includeMature17Plus: enable17PlusSlang
        })
      });
      if (apiRes.ok) {
        const json = await apiRes.json();
        if (json.success && json.data?.translation) {
          return {
            translation: json.data.translation,
            colloquialVariant: json.data.colloquialVariant,
            pronunciation: json.data.pronunciation || transliteratePersianToFingilish(json.data.translation),
            noteFa: json.data.noteFa
          };
        }
      }
    } catch {
      // Fallback to 100% offline engine
    }

    return translateOfflineCompositional(trimmed, dir);
  };

  // Send a message from EITHER the Persian speaker OR the English speaker
  const handleSendChatMessage = async (textToSend: string, sender: 'fa_speaker' | 'en_speaker') => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    sound.playClick();
    setIsTranslating(true);

    if (sender === 'fa_speaker') setFaInput('');
    else setEnInput('');

    const dir = sender === 'fa_speaker' ? 'fa_to_en' : 'en_to_fa';
    const result = await performSmartTranslation(trimmed, dir);

    const newMsg: ChatTurnMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      sender,
      originalText: trimmed,
      translatedText: result.translation,
      colloquialVariant: result.colloquialVariant,
      pronunciation: result.pronunciation,
      noteFa: result.noteFa,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, newMsg]);
    setIsTranslating(false);

    // Automatically speak the translated text out loud for the other person!
    if (autoSpeakChat && result.translation) {
      if (sender === 'fa_speaker') {
        speakEnglish(result.translation, 0.88);
      } else {
        speakPersian(result.translation, 0.85, result.pronunciation);
      }
    }
  };

  // Start or stop live voice recognition (Speech-to-Text) for Persian or English speaker
  const handleToggleVoiceMic = (side: 'fa' | 'en') => {
    sound.playClick();

    if (listeningSide === side) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setListeningSide(null);
      setMicStatusMessage(null);
      return;
    }

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setMicStatusMessage(
        'مرورگر فعلی شما از میکروفون مستقیم وب پشتیبانی نمی‌کند؛ لطفاً از کیبورد صوتی گوشی (آیکون میکروفون روی کیبورد موبایل) یا تایپ متنی استفاده کنید.'
      );
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }

      const recognition = new SpeechRecognitionAPI();
      recognition.lang = side === 'fa' ? 'fa-IR' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setListeningSide(side);
        setMicStatusMessage(
          side === 'fa'
            ? '🎙️ میکروفون فارسی روشن است... لطفاً به فارسی صحبت کنید تا به انگلیسی ترجمه و پخش شود!'
            : '🎙️ English Mic Active... Speak in English now to translate & speak in Persian!'
        );
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          if (side === 'fa') {
            setFaInput(transcript);
            handleSendChatMessage(transcript, 'fa_speaker');
          } else {
            setEnInput(transcript);
            handleSendChatMessage(transcript, 'en_speaker');
          }
        }
      };

      recognition.onerror = (event: any) => {
        setListeningSide(null);
        if (event.error === 'not-allowed') {
          setMicStatusMessage(
            '⚠️ دسترسی به میکروفون در مرورگر بسته است. اجازه میکروفون (Allow Microphone) را بدهید و یا از دکمه میکروفونِ روی کیبورد موبایلتان در کادر متن استفاده کنید.'
          );
        } else {
          setMicStatusMessage('صدایی دریافت نشد. دوباره روی دکمه میکروفون بزنید یا متن را بنویسید.');
        }
      };

      recognition.onend = () => {
        setListeningSide(null);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setListeningSide(null);
      setMicStatusMessage('خطا در باز کردن میکروفون؛ لطفاً در کادر زیر تایپ کنید.');
    }
  };

  const handleSpeak = (text: string, lang: 'en' | 'fa' | 'ar', phoneticHint?: string) => {
    if (lang === 'en') speakEnglish(text, 0.85);
    else if (lang === 'ar') speakArabic(text, 0.85, phoneticHint);
    else speakPersian(text, 0.85, phoneticHint);
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
            <span>چت صوتی و متنی دوطرفه (فارسی ⇄ انگلیسی) • پوشش محاوره، ضرب‌المثل C2، فرش و ۱۷+ سال</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            مترجم چت دوطرفه (متنی و صوتی همزمان برای هر دو نفر) 🎙️💬
          </h1>

          <p className="text-teal-100 text-xs sm:text-sm leading-relaxed">
            هم <strong>شما (به فارسی)</strong> و هم <strong>طرف مقابل (به انگلیسی)</strong> می‌توانید با <strong>میکروفون صوتی</strong> یا <strong>تایپ متنی</strong> در چت زیر صحبت کنید؛ مترجم بلافاصله پیام هر نفر را ترجمه کرده و <strong>با صدای بلند برای نفر مقابل می‌خواند!</strong>
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setAutoSpeakChat(!autoSpeakChat);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                autoSpeakChat
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/15 text-white border border-white/20'
              }`}
            >
              {autoSpeakChat ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>
                {autoSpeakChat
                  ? '🔊 سخنگوی خودکار چت: روشن (پخش خودکار صدای ترجمه)'
                  : '🔇 سخنگوی خودکار چت: خاموش'}
              </span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setEnable17PlusSlang(!enable17PlusSlang);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm border transition-all ${
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

      {/* ===================================================================== */}
      {/* TWO-WAY VOICE & TEXT CHAT CONVERSATION ARENA                          */}
      {/* ===================================================================== */}
      <div className="bg-white border-2 border-teal-500/40 rounded-3xl shadow-lg overflow-hidden">
        {/* Chat Top Bar */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-teal-400" />
            <div>
              <h2 className="font-black text-sm sm:text-base">
                اتاق چت و ترجمه زنده دوطرفه (فارسی‌زبان ⇄ انگلیسی‌زبان)
              </h2>
              <p className="text-[11px] text-slate-300">
                هر پیامی که ارسال شود، فوراً ترجمه شده و با صدای بلند خوانده می‌شود
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setChatHistory([]);
            }}
            className="flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-rose-400 bg-white/10 px-3 py-1.5 rounded-xl transition-colors"
            title="پاک کردن تاریخچه چت"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>پاک کردن چت</span>
          </button>
        </div>

        {/* Microphone Status Alert */}
        {micStatusMessage && (
          <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 text-xs font-bold text-amber-950 flex items-center justify-between gap-2">
            <span>{micStatusMessage}</span>
            <button
              onClick={() => setMicStatusMessage(null)}
              className="text-amber-800 underline shrink-0"
            >
              بستن
            </button>
          </div>
        )}

        {/* Chat Messages Timeline */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[430px] overflow-y-auto bg-slate-50/70">
          {chatHistory.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs sm:text-sm font-bold">
              چت خالی است. با یکی از کادرهای پایین (فارسی یا انگلیسی) پیام متنی یا صوتی بفرستید!
            </div>
          ) : (
            chatHistory.map((msg) => {
              const isFaSender = msg.sender === 'fa_speaker';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isFaSender ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`w-full sm:max-w-xl rounded-3xl p-4 sm:p-5 space-y-3 shadow-xs border ${
                      isFaSender
                        ? 'bg-emerald-50/90 border-emerald-300 text-slate-900'
                        : 'bg-sky-50/90 border-sky-300 text-slate-900'
                    }`}
                  >
                    {/* Header of Bubble */}
                    <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200/70 pb-2">
                      <span className="font-black text-slate-800">
                        {isFaSender ? '🇮🇷 گوینده فارسی‌زبان (ترجمه به انگلیسی)' : '🇬🇧 گوینده انگلیسی‌زبان (ترجمه به فارسی)'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span>{msg.timestamp}</span>
                        <button
                          onClick={() => handleCopy(msg.translatedText, msg.id)}
                          className="p-1 text-slate-400 hover:text-slate-800"
                          title="کپی ترجمه"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Original Spoken/Typed Text */}
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs sm:text-sm text-slate-600 font-semibold" dir="auto">
                        متن اصلی: «{msg.originalText}»
                      </p>
                      <button
                        onClick={() =>
                          handleSpeak(
                            msg.originalText,
                            isFaSender ? 'fa' : 'en',
                            msg.pronunciation
                          )
                        }
                        className="text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>صدای اصلی</span>
                      </button>
                    </div>

                    {/* Translated Output (Highlighted) */}
                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2">
                      <p className="text-base sm:text-lg font-black text-slate-950 leading-snug" dir="auto">
                        {msg.translatedText}
                      </p>

                      {msg.colloquialVariant && (
                        <p className="text-xs font-bold text-indigo-900" dir="auto">
                          🗣️ معادل عامیانه / Slang: «{msg.colloquialVariant}»
                        </p>
                      )}

                      <p className="text-xs font-mono text-teal-800" dir="ltr">
                        تلفظ آوایی: {msg.pronunciation}
                      </p>

                      {/* Giant Replay Voice Button inside Chat Bubble */}
                      <button
                        onClick={() =>
                          handleSpeak(
                            msg.translatedText,
                            isFaSender ? 'en' : 'fa',
                            msg.pronunciation
                          )
                        }
                        className={`w-full py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95 ${
                          isFaSender
                            ? 'bg-emerald-700 hover:bg-emerald-600'
                            : 'bg-sky-700 hover:bg-sky-600'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>
                          {isFaSender
                            ? '🔊 پخش صدای انگلیسی (Speak English to Partner)'
                            : '🔊 پخش صدای فارسی (Speak Persian to Partner)'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>

        {/* ===================================================================== */}
        {/* DUAL INPUT CONSOLE: LEFT/TOP = PERSIAN SPEAKER, RIGHT/BOTTOM = ENGLISH */}
        {/* ===================================================================== */}
        <div className="p-4 sm:p-6 bg-white border-t-2 border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* PANEL 1: PERSIAN SPEAKER (فارسی‌زبان -> ترجمه و پخش انگلیسی) */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-400/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black text-emerald-950">
                🇮🇷 نوبت شما (فارسی بنویسید یا بگویید ⬅️ انگلیسی پخش شود)
              </span>
              <button
                type="button"
                onClick={() => handleToggleVoiceMic('fa')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  listeningSide === 'fa'
                    ? 'bg-rose-600 text-white animate-pulse shadow-md'
                    : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                }`}
              >
                {listeningSide === 'fa' ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{listeningSide === 'fa' ? 'توقف میکروفون' : '🎙️ میکروفون فارسی'}</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage(faInput, 'fa_speaker');
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={faInput}
                onChange={(e) => setFaInput(e.target.value)}
                placeholder="به فارسی بنویسید (مثلاً: قیمت این فرش دو ذرع چنده؟ / کجاست؟)..."
                className="flex-1 px-3.5 py-3 rounded-xl border border-emerald-300 bg-white text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                disabled={isTranslating || !faInput.trim()}
                className="px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>ترجمه و بگو</span>
              </button>
            </form>

            {/* Quick One-Tap Persian Chat Chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-emerald-900 font-bold">ارسال سریع فارسی:</span>
              {[
                'سلام، حالتون چطوره؟',
                'این قالیچه دو ذرع کهنه ذاتی است',
                'کرایه تاکسی چقدر شد؟',
                'دمت گرم رفیق!',
                'چرت و پرت نگو!'
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleSendChatMessage(chip, 'fa_speaker')}
                  className="px-2 py-1 rounded-lg bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-200 font-bold transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* PANEL 2: ENGLISH SPEAKER (انگلیسی‌زبان -> ترجمه و پخش فارسی) */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border-2 border-sky-400/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black text-sky-950">
                🇬🇧 نوبت طرف خارجی (انگلیسی بنویسد یا بگوید ⬅️ فارسی پخش شود)
              </span>
              <button
                type="button"
                onClick={() => handleToggleVoiceMic('en')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  listeningSide === 'en'
                    ? 'bg-rose-600 text-white animate-pulse shadow-md'
                    : 'bg-sky-700 hover:bg-sky-600 text-white'
                }`}
              >
                {listeningSide === 'en' ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{listeningSide === 'en' ? 'Stop Mic' : '🎙️ English Mic'}</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage(enInput, 'en_speaker');
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={enInput}
                onChange={(e) => setEnInput(e.target.value)}
                dir="ltr"
                placeholder="Type in English (e.g. How much is this Persian rug? / Where is the hotel?)..."
                className="flex-1 px-3.5 py-3 rounded-xl border border-sky-300 bg-white text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-sky-600"
              />
              <button
                type="submit"
                disabled={isTranslating || !enInput.trim()}
                className="px-4 py-3 rounded-xl bg-sky-700 hover:bg-sky-600 disabled:opacity-50 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Translate & Speak</span>
              </button>
            </form>

            {/* Quick One-Tap English Chat Chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]" dir="ltr">
              <span className="text-sky-900 font-bold">Quick English:</span>
              {[
                'How much is this Persian carpet?',
                'Can you give me a discount?',
                'Where is the nearest hotel?',
                'Thanks a lot, mate!',
                'Stop pulling my leg!'
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleSendChatMessage(chip, 'en_speaker')}
                  className="px-2 py-1 rounded-lg bg-white hover:bg-sky-100 text-sky-950 border border-sky-200 font-bold transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SITUATIONAL, SLANG, PROVERB & CARPET PHRASE DATABASE */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-600" />
              <span>بانک جملات آماده با ارسال مستقیم به چت و پخش صوتی دوطرفه</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              با زدن روی هر دکمه، جمله هم در چت بالا قرار می‌گیرد و هم با صدای بلند به انگلیسی، فارسی یا عربی خوانده می‌شود:
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
          {filteredPhrases.map((phrase) => (
            <div
              key={phrase.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                phrase.isMature17Plus
                  ? 'border-rose-300 bg-rose-50/30'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-white'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-bold text-teal-900">
                    <span>{phrase.categoryLabelFa}</span>
                    <span aria-hidden="true">·</span>
                    <span className={phrase.isMature17Plus ? 'text-rose-700 font-black' : 'text-slate-500'}>
                      {phrase.levelTag}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(phrase.en, phrase.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                    title="کپی"
                  >
                    {copiedId === phrase.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Persian Formal & Colloquial */}
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-500 font-bold block">🇮🇷 فارسی:</span>
                  <p className="font-bold text-sm text-slate-900 leading-snug">
                    {phrase.fa}
                  </p>
                  {phrase.faColloquial && (
                    <p className="text-xs font-bold text-amber-900">
                      🗣️ عامیانه: «{phrase.faColloquial}»
                    </p>
                  )}
                </div>

                {/* English Formal & Slang */}
                <div className="pt-2 border-t border-slate-200/70 space-y-1">
                  <span className="text-[11px] text-slate-500 font-bold block">🇬🇧 English:</span>
                  <p className="font-black text-sm text-teal-950 leading-snug" dir="ltr">
                    "{phrase.en}"
                  </p>
                  {phrase.enSlangVariant && (
                    <p className="text-xs font-bold text-indigo-900" dir="ltr">
                      🔥 Street Slang: "{phrase.enSlangVariant}"
                    </p>
                  )}
                </div>

                {phrase.ar && (
                  <div className="pt-1 border-t border-slate-200/70">
                    <span className="text-[11px] text-amber-800 font-bold block">🇸🇦🇦🇪 عربی تجاری:</span>
                    <p className="font-bold text-xs text-slate-900">
                      «{phrase.ar}»
                    </p>
                  </div>
                )}

                <p className="font-mono text-xs text-slate-500" dir="ltr">
                  Fingilish: {phrase.fingilish}
                </p>
              </div>

              {/* Dual Speaker Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleSpeak(phrase.en, 'en')}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 بگو انگلیسی</span>
                </button>

                <button
                  onClick={() => handleSpeak(phrase.fa, 'fa', phrase.fingilish)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 بگو فارسی</span>
                </button>

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
          ))}
        </div>
      </div>
    </div>
  );
};
