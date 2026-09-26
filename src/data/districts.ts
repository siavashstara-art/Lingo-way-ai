import { CityDistrictId } from '../types';

export interface DistrictInfo {
  id: CityDistrictId;
  name: string;
  subtitle: string;
  tagline: string;
  icon: string;
  color: string;
  accentBg: string;
  borderColor: string;
  description: string;
  landmarks: string[];
}

export const DISTRICTS: DistrictInfo[] = [
  {
    id: 'persian_for_english',
    name: 'آکادمی آموزش زبان و فرهنگ فارسی (Persian Immersion)',
    subtitle: 'اولویت نخست: آموزش رایگان فارسی به انگلیسی‌زبانان و جهانیان',
    tagline: 'رمزگشایی تعارف، شعر، خرید در بازار سنتی و تلفظ فینگیلیش (۱۰۰٪ رایگان)',
    icon: '🌹',
    color: 'text-emerald-600',
    accentBg: 'bg-emerald-600/10 hover:bg-emerald-600/20',
    borderColor: 'border-emerald-600/30',
    description: 'آموزش عمیق و اصیل زبان فارسی به همراه تلفظ‌های استاندارد، حکمت‌های کلامی تعارف، نحوه سفارش در چایخانه سنتی و اصطلاحات روزمره برای انگلیسی‌زبانان و سایر زبان‌های جهان (کاملاً رایگان).',
    landmarks: ['مدرسه تعارف و مهمان‌نوازی', 'کتابچه اصطلاحات مسافر', 'آوای شعر و موسیقی زبان فارسی']
  },
  {
    id: 'carpet_trade',
    name: 'آکادمی تخصصی تجارت فرش دستباف ایران (Carpet Bazaar Academy)',
    subtitle: 'به یاد شادروان حاج حسن آقای علی‌میری • مکمل برنامه «فرش بازار»',
    tagline: 'اصطلاحات قالی، قالیچه، گلیم، کهنه ذاتی، ذرع و نیم، دو ذرع و مکالمه با مشتری انگلیسی و عرب',
    icon: '🧶',
    color: 'text-rose-700',
    accentBg: 'bg-rose-700/10 hover:bg-rose-700/20',
    borderColor: 'border-rose-700/30',
    description: 'آموزش ۱۰۰٪ آفلاین واژگان تخصصی و مکالمات حجره فرش‌فروشان ایرانی با خریداران انگلیسی‌زبان و عرب‌زبان؛ در بزرگداشت تاجر بنام فرش ایران و جهان مرحوم حاج حسن آقای علی‌میری و معرفی برنامه «فرش بازار».',
    landmarks: ['واژه‌نامه کهنه ذاتی و رج‌شمار', 'جدول تبدیل ذرع به فوت و متر', 'مکالمه فروش فرش به انگلیسی و عربی']
  },
  {
    id: 'offline_translator',
    name: 'مترجم صوتی و سخنگوی هوشمند آفلاین (Offline Voice Communicator)',
    subtitle: 'تعامل فوری مسافرتی بدون نیاز به اینترنت',
    tagline: 'اگر نتوانستید صحبت کنید، مترجم به جای شما صحبت می‌کند!',
    icon: '🎙️',
    color: 'text-teal-600',
    accentBg: 'bg-teal-600/10 hover:bg-teal-600/20',
    borderColor: 'border-teal-600/30',
    description: 'ابزار مسافرتی برای فارسی‌زبانانی که به کشورهای انگلیسی‌زبان می‌روند یا انگلیسی‌زبانانی که به ایران می‌آیند. با یک دکمه یا تایپ، ترجمه بلادرنگ همراه با تلفظ صوتی رسا پخش می‌شود.',
    landmarks: ['میکروفون گفت‌وگوی دوطرفه', 'سخنگوی اضطراری تاکسی و هتل', 'دفترچه عبارات نجات مسافر']
  },
  {
    id: 'mentor',
    name: 'سامانه استادیاری و روم‌های تدریس انگلیسی',
    subtitle: 'آموزش شاگرد به شاگرد و متدهای تدریس',
    tagline: 'احداث روم تدریس، تربیت مدرس و آزمون ۳ چالش',
    icon: '🏛️',
    color: 'text-amber-500',
    accentBg: 'bg-amber-500/10 hover:bg-amber-500/20',
    borderColor: 'border-amber-500/30',
    description: 'در این سیستم شاگردان با پیشرفت تحصیلی روم احداث می‌کنند و به سطوح پایین‌تر درس می‌دهند. آزمون تعیین سطح و قانون ۳ بار چالش مدرس در این بخش مستقر است.',
    landmarks: ['تالار احداث روم تدریس', 'اتاق داوری چالش شاگردان', 'آزمون سنجش شایستگی تدریس']
  },
  {
    id: 'bilingual_ai',
    name: 'هوش مصنوعی آفلاین و دوجانبه (فارسی-انگلیسی)',
    subtitle: 'پایه‌گذار آموزش عمومی بدون نیاز به اینترنت',
    tagline: 'آموزش انگلیسی به فارسی‌زبانان و فارسی به انگلیسی‌زبانان',
    icon: '🤖',
    color: 'text-sky-500',
    accentBg: 'bg-sky-500/10 hover:bg-sky-500/20',
    borderColor: 'border-sky-500/30',
    description: 'هوش مصنوعی ۱۰۰٪ آفلاین؛ آموزش تعارفات و اصطلاحات روزمره، تلفظ دقیق صوتی دوطرفه و تحلیل ساختار جملات بدون قطعی و فیلترینگ.',
    landmarks: ['موتور گفت‌وگوی آفلاین', 'تطبیق فرهنگی تعارفات', 'پل ساختار گرامری SOV/SVO']
  },
  {
    id: 'vocabulary',
    name: 'The Vocabulary Bazaar',
    subtitle: 'Word Market of Tavana',
    tagline: 'Trade in words, acquire golden Lingous',
    icon: '🗣️',
    color: 'text-amber-400',
    accentBg: 'bg-amber-500/10 hover:bg-amber-500/20',
    borderColor: 'border-amber-500/30',
    description: 'واژگان کاربردی و روزمره به همراه تلفظ شفاف، مثال‌های ملموس و قابلیت ثبت در لیست کلمات یادگرفته‌شده.',
    landmarks: ['Lexicon Square', 'Synonym Arcade', 'Personal Deck Vault']
  },
  {
    id: 'grammar',
    name: 'Downtown Grammar Hall',
    subtitle: 'Architecture of Language',
    tagline: 'Build rock-solid sentence structures',
    icon: '🧩',
    color: 'text-blue-400',
    accentBg: 'bg-blue-500/10 hover:bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    description: 'الگوهای سرراست جمله‌سازی بدون اصطلاحات پیچیده و فرمول‌های خشک کتابی.',
    landmarks: ['Tense Observatory', 'Conditional Bridges', 'Syntax Forum']
  },
  {
    id: 'dialogues',
    name: 'Café Tavana & Dialogue Metro',
    subtitle: 'Conversational Capital',
    tagline: 'Real conversations with virtual citizens',
    icon: '☕',
    color: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10 hover:bg-emerald-500/20',
    borderColor: 'border-emerald-500/30',
    description: 'مکالمات واقعی در کافه، خرید، فرودگاه و احوالپرسی روزمره با بازخورد اصلاحی سریع.',
    landmarks: ['Café Tavana Central', 'Central Metro Hub', 'Skyline Boardroom']
  },
  {
    id: 'pronunciation',
    name: 'Pronunciation & Listening Lab',
    subtitle: 'Acoustics of English',
    tagline: 'Train your ear, refine your voice',
    icon: '🎙️',
    color: 'text-purple-400',
    accentBg: 'bg-purple-500/10 hover:bg-purple-500/20',
    borderColor: 'border-purple-500/30',
    description: 'آزمایشگاه سنجش شنوایی، تلفظ‌خوان متن دلخواه و تنظیم سرعت خوانش گفتار.',
    landmarks: ['Phonetics Echo Chamber', 'Accent Synthesizer', 'Audio Challenge Pod']
  },
  {
    id: 'quiz',
    name: 'The Quiz Arena',
    subtitle: 'Test of Speed & Mind',
    tagline: 'Compete, solve scrambled sentences, score high',
    icon: '⚡',
    color: 'text-rose-400',
    accentBg: 'bg-rose-500/10 hover:bg-rose-500/20',
    borderColor: 'border-rose-500/30',
    description: 'کوییز و خودآزمایی سریع برای محک زدن تسلط به مکالمات و دریافت پاداش سکه طلا.',
    landmarks: ['Speed Quiz Stage', 'Sentence Puzzle Floor', 'High Score Obelisk']
  },
  {
    id: 'vault',
    name: 'Lingou Treasury & Monuments',
    subtitle: 'Rewards of Tavana',
    tagline: 'Vault your earnings and unlock city landmarks',
    icon: '🪙',
    color: 'text-yellow-400',
    accentBg: 'bg-yellow-500/10 hover:bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    description: 'صندوقچه دارایی‌های طلایی لینگو، ارتقای سطح و مشاهده دستاوردها.',
    landmarks: ['The Golden Vault', 'Grand Fountain', 'Tavana Sky Tower']
  },
  {
    id: 'shop',
    name: 'Tavana VIP Store',
    subtitle: 'Exclusive Privileges',
    tagline: 'Subscriptions, Gold packs and protections',
    icon: '🛍️',
    color: 'text-amber-500',
    accentBg: 'bg-amber-500/10 hover:bg-amber-500/20',
    borderColor: 'border-amber-500/30',
    description: 'فروشگاه رسمی برای ارتقا به حساب طلایی VIP، بسته‌های سکه لینگو و سپرهای محافظ.',
    landmarks: ['VIP Lounge', 'Coin Exchange', 'Perks Emporium']
  }
];
