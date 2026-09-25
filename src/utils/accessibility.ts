export type AppLanguage = 'en' | 'fa';

export interface AccessibilitySettings {
  language: AppLanguage;

  // ویژگی‌های حیاتی برای کم‌بینایان (Low Vision & Visual Impairment)
  highContrast: boolean; // کنتراست فوق‌العاده بالا با مشکی OLED و زرد شب‌تاب
  fontSize: 'normal' | 'large' | 'extra-large' | 'huge'; // اندازه قلم تا درشت‌ترین حد (Huge: 24px)
  magnifierLens: boolean; // ذره‌بین شناور برای درشت‌نمایی موضعی با حرکت موس یا لمس
  screenReaderOptimized: boolean; // توضیحات صوتی و برچسب‌های کامل برای صفحه‌خوان (ARIA)
  dyslexicFont: boolean; // فاصله زیاد بین حروف و کلمات برای خوانایی بی‌نقص
  readingRuler: boolean; // خط‌کش راهنمای چشم

  // ویژگی‌های حیاتی برای کم‌شنوایان و ناشنوایان (Deaf & Hard of Hearing)
  visualCaptionsForDeaf: boolean; // زیرنویس و رونوشت متنی کامل برای تمام صوت‌ها و تلفظ‌ها
  soundHapticVibration: boolean; // فلاش نوری ملایم یا ویبره به جای بوق و صدای بازی
  lipSyncGuide: boolean; // راهنمای تصویری فرم لب و دهان و هجاها برای یادگیری تلفظ بدون نیاز به شنیدن
  speechSpeedSlow: boolean; // پخش صدای بسیار شمرده و کشیده با بیس تقویت‌شده برای باقیمانده شنوایی

  // ویژگی‌های آرامش ذهن و ADHD
  adhdFocusMode: boolean; // خلوت‌سازی کامل و حذف هرگونه بنر اضافی
  adhdSingleTaskTimer: boolean; // زمان‌بند لقمه‌های ۵ دقیقه‌ای ضد خستگی ذهنی
  bionicReading: boolean; // برجسته کردن اول کلمات
  reducedMotion: boolean; // توقف انیمیشن‌ها و لرزش‌ها
  calmBackgroundSound: boolean; // نویز قهوه‌ای آرامش‌بخش
  oneStepAtATime: boolean; // فقط یک سوال در لحظه
  keyboardOnlyNav: boolean; // کار فقط با کیبورد
}

export const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  language: 'fa',
  highContrast: false,
  fontSize: 'normal',
  magnifierLens: false,
  screenReaderOptimized: true,
  dyslexicFont: false,
  readingRuler: false,

  // کم‌شنوایان
  visualCaptionsForDeaf: true, // به طور پیش‌فرض برای کمک به کم‌شنوایان روشن
  soundHapticVibration: true,
  lipSyncGuide: true,
  speechSpeedSlow: false,

  // ADHD
  adhdFocusMode: false,
  adhdSingleTaskTimer: false,
  bionicReading: false,
  reducedMotion: false,
  calmBackgroundSound: false,
  oneStepAtATime: false,
  keyboardOnlyNav: true,
};

export const TRANSLATIONS = {
  fa: {
    appName: 'انگلیش لینگو',
    citySubtitle: 'پایتخت شهر مجازی توانا',
    map: 'نقشه توانا',
    vocab: 'بازار واژگان',
    grammar: 'تالار گرامر',
    dialogues: 'کافه و مترو',
    speech: 'آزمایشگاه تلفظ',
    quiz: 'میدان آزمون',
    vault: 'خزانه لینگو',
    lingous: 'سکه طلا',
    daysStreak: 'روز استمرار',
    level: 'سطح',
    toNextRank: 'تا ارتقای رتبه',
    accessibilityPanel: 'تنظیمات دسترسی‌پذیری ویژه کم‌بینایان، کم‌شنوایان و ADHD',
    
    // Low Vision
    lowVisionGroup: 'امکانات ویژه کم‌بینایان (دید راحت و بدون فشار چشم)',
    highContrast: 'کنتراست فوق‌العاده بالا (پس‌زمینه مشکی خالص با متن زرد درخشان)',
    highContrastDesc: 'تمام رنگ‌های کم‌رنگ به مشکی و زرد فسفری تبدیل می‌شوند تا چشم خسته نشود.',
    magnifierLens: 'ذره‌بین شناور مطالعه',
    magnifierLensDesc: 'با حرکت روی متن، کلمات را با درشت‌نمایی ۲ برابری نشان می‌دهد.',
    fontSize: 'اندازه فونت و نوشته‌ها',
    fontNormal: 'عادی',
    fontLarge: 'بزرگ',
    fontXLarge: 'خیلی بزرگ',
    fontHuge: 'فوق‌العاده درشت',

    // Hard of Hearing
    deafGroup: 'امکانات ویژه کم‌شنوایان و ناشنوایان (یادگیری بدون نیاز به شنیدن)',
    visualCaptions: 'زیرنویس همزمان برای تمام صداها و تلفظ‌ها',
    visualCaptionsDesc: 'هر صدایی در برنامه پخش شود، متن و ریتم آن همزمان به صورت درشت روی صفحه نوشته می‌شود.',
    lipSyncGuide: 'راهنمای تصویری جای لب و زبان (آموزش تلفظ با چشم)',
    lipSyncGuideDesc: 'نشان می‌دهد برای هر صدا، لب‌ها و زبان دقیقاً چطور باید حرکت کنند.',
    visualFlashCue: 'اعلام تصویری پاسخ به جای صدای بوق (فلاش نوری)',
    visualFlashCueDesc: 'وقتی جواب درست یا غلط می‌دهید، به جای صدای زنگ، صفحه نوری ملایم می‌دهد تا با چشم حس کنید.',
    speechSpeedSlow: 'تلفظ بسیار کشیده و شمرده (استفاده از باقی‌مانده شنوایی)',
    speechSpeedSlowDesc: 'صداها با سرعت آهسته و وضوح بم‌تر پخش می‌شوند تا سمعک راحت‌تر دریافت کند.',

    // ADHD
    adhdGroup: 'امکانات تمرکز حواس و ADHD',
    adhdMode: 'حالت خلوت‌سازی کامل (حذف بنرها و شلوغی‌ها)',
    adhdTimer: 'زمان‌بند ۵ دقیقه‌ای (لقمه‌های کوچک ضد خستگی)',
    bionicReading: 'پررنگ کردن اول کلمات (جلوگیری از پرش چشم)',
    reducedMotion: 'توقف تمام انیمیشن‌ها و لرزش‌ها',
    readingRuler: 'خط‌کش راهنمای مطالعه',
    readingRulerDesc: 'نشانگر افقی ملایم که زیر خط مطالعه حرکت می‌کند تا چشم خط را گم نکند.',
    calmNoise: 'صدای ملایم باران/موج (مهار پچ‌پچ‌های ذهنی ADHD)',

    close: 'بستن',
    save: 'ذخیره تنظیمات',
  },
  en: {
    appName: 'English-lingou',
    citySubtitle: 'Capital of Virtual Tavana City',
    map: 'Tavana Map',
    vocab: 'Vocab Bazaar',
    grammar: 'Grammar Hall',
    dialogues: 'Café & Metro',
    speech: 'Speech Lab',
    quiz: 'Quiz Arena',
    vault: 'Lingou Vault',
    lingous: 'Gold Coins',
    daysStreak: 'Days Streak',
    level: 'Level',
    toNextRank: 'to next rank',
    accessibilityPanel: 'Accessibility for Low Vision, Hard of Hearing & ADHD',
    
    lowVisionGroup: 'Low Vision Features',
    highContrast: 'OLED Pure Black & Radiant Yellow',
    highContrastDesc: 'Maximum contrast ratio for eye comfort without strain.',
    magnifierLens: 'Hover Magnifier Lens',
    magnifierLensDesc: 'Magnifies hovered texts 2x for easy reading.',
    fontSize: 'Text Scaling',
    fontNormal: 'Standard',
    fontLarge: 'Large',
    fontXLarge: 'Extra Large',
    fontHuge: 'Ultra Huge',

    deafGroup: 'Deaf & Hard of Hearing Features',
    visualCaptions: 'Live Closed Captions for All Sounds',
    visualCaptionsDesc: 'Displays real-time captions for every spoken word and sound effect.',
    lipSyncGuide: 'Visual Mouth & Tongue Pronunciation Guide',
    lipSyncGuideDesc: 'Shows mouth and tongue placement so you can master pronunciation visually.',
    visualFlashCue: 'Visual Haptic Flash Cue (Instead of Chimes)',
    visualFlashCueDesc: 'Flashes a gentle color ring on correct/wrong answers instead of sounds.',
    speechSpeedSlow: 'Slow & Deep Speech (Aids Hearing Aids)',
    speechSpeedSlowDesc: 'Pronounces words slowly with enriched base clarity.',

    adhdGroup: 'ADHD & Focus Features',
    adhdMode: 'Declutter Mode (Hide extra banners)',
    adhdTimer: '5-Minute Anti-Burnout Timer',
    bionicReading: 'Bionic Reading Assistance',
    reducedMotion: 'Freeze Motion & Shifts',
    readingRuler: 'Reading Focus Line',
    readingRulerDesc: 'A gentle horizontal guide tracking the reading line.',
    calmNoise: 'Calm Brown Noise for Focus',

    close: 'Close',
    save: 'Save Settings',
  }
};
