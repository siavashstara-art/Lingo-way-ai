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
    id: 'mentor',
    name: 'باشگاه استاد-شاگردی (جیم)',
    subtitle: 'تمرینگاه مهارت‌های کلامی',
    tagline: 'تکرار همزمان (Shadowing) و فیدبک مستقیم استاد',
    icon: '🥋',
    color: 'text-amber-500',
    accentBg: 'bg-amber-500/10 hover:bg-amber-500/20',
    borderColor: 'border-amber-500/30',
    description: 'در این بخش زبان را مثل پرورش عضلات با تکرارهای همزمان با استاد (Shadowing Reps) تمرین کرده و مدارج شاگردی را ارتقا می‌دهید.',
    landmarks: ['سکوی تکرار گفتار', 'اصول استاد-شاگردی', 'جدول رتبه‌های شاگرد']
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
