import { ShopItem } from '../types';

export const SHOP_ITEMS: ShopItem[] = [
  // 1. VIP Membership (Subscription)
  {
    id: 'vip_monthly',
    title: 'Tavana Golden Hero (1 Month)',
    titleFa: 'اشتراک طلایی قهرمان توانا (۱ ماهه)',
    description: 'Unlimited AI conversations, 2x Lingou rewards, full ADHD focus kit & certificate.',
    descriptionFa: 'مکالمه نامحدود با هوش مصنوعی، دو برابر سکه طلا، سپر محافظ استمرار و گواهی قهرمانی.',
    icon: '👑',
    category: 'subscription',
    realPriceToman: 99000,
    realPriceUSD: 2.99,
    featured: true,
    perks: ['Unlimited AI spoken chats', '2X Golden Lingou earnings', '5 Free Streak Shields', 'VIP Champion Badge'],
    perksFa: ['مکالمه صوتی و نامحدود با هوش مصنوعی', 'پاداش ۲ برابری سکه‌های طلایی', '۵ سپر محافظ روزهای متوالی', 'نشان ویژه قهرمان طلایی']
  },
  {
    id: 'vip_annual',
    title: 'Tavana Super Star (1 Year)',
    titleFa: 'اشتراک سالانه سوپراستار توانا (با تخفیف ۴۰٪)',
    description: 'The ultimate year-long English immersion for kids with custom learning roadmap.',
    descriptionFa: 'یک سال آموزش شاد و بی‌وقفه زبان انگلیسی به همراه نقشه اختصاصی یادگیری کودک.',
    icon: '⭐',
    category: 'subscription',
    realPriceToman: 690000,
    realPriceUSD: 19.99,
    featured: true,
    perks: ['All VIP perks for 12 months', 'Exclusive avatar outfits', 'Family parent progress reports', 'Direct tutor feedback'],
    perksFa: ['تمام مزایای VIP به مدت یک سال کامل', 'پک کامل لباس‌های آواتار و ابرقهرمانی', 'گزارش پیشرفت هفتگی برای والدین', 'پشتیبانی و بازخورد هوشمند']
  },

  // 2. Lingou Bullion Currency Packs
  {
    id: 'pack_pouch',
    title: 'Pouch of 250 Lingous',
    titleFa: 'کیسه ۲۵۰ سکه طلای لینگو',
    description: 'Quick boost to unlock your favorite city park or custom flashcards.',
    descriptionFa: 'یک کیسه پر از سکه برای باز کردن پارک‌ها و خرید آواتارهای جدید.',
    icon: '💰',
    category: 'lingou-pack',
    realPriceToman: 29000,
    realPriceUSD: 0.99,
    perks: ['+250 Golden Lingous instant credited'],
    perksFa: ['شارژ آنی ۲۵۰ سکه طلای لینگو']
  },
  {
    id: 'pack_chest',
    title: 'Chest of 1,000 Lingous',
    titleFa: 'صندوقچه بزرگ ۱۰۰۰ سکه طلای لینگو',
    description: 'Massive gold treasury to restore monumental landmarks in Tavana.',
    descriptionFa: 'صندوقچه گنج برای ساخت تمام بناهای شهر توانا و پیشرفت موشکی!',
    icon: '🎁',
    category: 'lingou-pack',
    realPriceToman: 89000,
    realPriceUSD: 2.49,
    featured: true,
    perks: ['+1,000 Golden Lingous', '+1 Free Streak Shield'],
    perksFa: ['۱۰۰۰ سکه طلای لینگو', '+۱ سپر محافظ استمرار رایگان']
  },

  // 3. Power-ups & Boosters
  {
    id: 'streak_shield',
    title: 'Streak Freeze Shield',
    titleFa: 'سپر محافظ روزهای متوالی (Streak Freeze)',
    description: 'Missed a day of practice? The shield saves your streak flame from breaking!',
    descriptionFa: 'اگر یک روز وقت نکردی تمرین کنی، این سپر از سوختن امتیاز استمرارت جلوگیری می‌کنه!',
    icon: '🛡️',
    category: 'powerup',
    lingouPrice: 80,
    realPriceToman: 15000,
    perks: ['Protects 1 missed practice day'],
    perksFa: ['محافظت از ۱ روز فراموش‌شده بدون باختن زنجیره']
  },
  {
    id: 'double_xp',
    title: '2X Star XP Potion',
    titleFa: 'معجون جادویی ستاره (۲ برابر تجربه به مدت ۲ ساعت)',
    description: 'Double all earned points and level up twice as fast.',
    descriptionFa: 'به مدت ۲ ساعت تمام امتیازها و ستاره‌های دریافتی‌ت ۲ برابر میشه!',
    icon: '🧪',
    category: 'powerup',
    lingouPrice: 60,
    realPriceToman: 12000,
    perks: ['2X Experience for 2 hours'],
    perksFa: ['۲ برابر تجربه و لول‌آپ سریع']
  },

  // 4. Playful Avatars & Costumes
  {
    id: 'avatar_astronaut',
    title: 'Space Explorer Astro',
    titleFa: 'آواتار فضانورد کوچولو 👨‍🚀',
    description: 'Fly among English stars with your shiny astronaut suit.',
    descriptionFa: 'لباس فضانوردی جادویی برای گشت‌وگذار میان ستاره‌های انگلیسی!',
    icon: '👨‍🚀',
    category: 'avatar',
    lingouPrice: 150,
    perks: ['Exclusive space hero badge'],
    perksFa: ['کارت پروفایل فضایی']
  },
  {
    id: 'avatar_wizard',
    title: 'Magic Word Wizard',
    titleFa: 'آواتار جادوگر دانا 🧙‍♂️',
    description: 'Cast spells using correct English grammar!',
    descriptionFa: 'کلاه و ردای جادویی برای حل کردن سریع پازل‌های گرامری!',
    icon: '🧙‍♂️',
    category: 'avatar',
    lingouPrice: 150,
    perks: ['Sparkle magic effect on quizzes'],
    perksFa: ['افکت جادویی در مسابقات']
  }
];
