import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  Volume2,
  Sliders,
  Plus,
  Minus,
  Award,
  Flashlight,
  RefreshCw,
  Eye,
  ShieldCheck,
  Ruler,
  AlertTriangle,
  MousePointerClick,
  Target,
  Layers
} from 'lucide-react';
import {
  sound,
  speakPersian,
  speakEnglish,
  speakArabic,
  speakChinese,
  speakRussian
} from '../utils/audio';

export interface RajScanResult {
  knotsInWindow: number;
  windowCm: 1 | 3.5 | 7;
  exactRaj: number;
  commercialRajClass: string;
  knotsPerCm: number;
  knotsPerSqm: number;
  kpsi: number;
  qualityTierFa: string;
  qualityTierEn: string;
  detectedPeaksX: number[];
  weaveRealismNoteFa: string;
  localTerminologyNoteFa: string;
  localTerminologyNoteEn: string;
  patternSimilarityEn?: string;
  patternSimilarityFa?: string;
  isMachineMadeMode?: boolean;
  machineShaneh?: number;
}

export interface PatternSimilarityResult {
  originGroup: 'iranian' | 'non_iranian_world';
  countryLabelFa: string;
  countryLabelEn: string;
  nonIranianAlertFa?: string;
  nonIranianAlertEn?: string;
  primaryStyleEn: string;
  primaryStyleFa: string;
  secondaryStyleEn: string;
  secondaryStyleFa: string;
  visualFeaturesEn: string;
  visualFeaturesFa: string;
  localTerminologyEn: string;
  localTerminologyFa: string;
  disclaimerEn: string;
  disclaimerFa: string;
}

interface OfflineRajScannerProps {
  onApplyToCertificate?: (summaryEn: string, summaryFa: string, result: RajScanResult) => void;
}

interface PresetWeaveSample {
  id: string;
  titleFa: string;
  originFa: string;
  targetRaj: number;
  knotsPer1Cm: number;
  knotColorA: string;
  knotColorB: string;
  weftColor: string;
  descFa: string;
  localTermFa: string;
  localTermEn: string;
}

const PRESET_WEAVE_SAMPLES: PresetWeaveSample[] = [
  {
    id: 'raj_25',
    titleFa: 'نمونه ۲۵ رج (سبک هریس / گبه و عشایری)',
    originFa: 'درشت‌باف پشم دست‌ریس • حدود ۳.۶ گره در هر سانتی‌متر (تخمین: ~۲۵ رج در ۷ سانت)',
    targetRaj: 25,
    knotsPer1Cm: 3.6,
    knotColorA: '#7f1d1d',
    knotColorB: '#1e3a8a',
    weftColor: '#d6d3d1',
    descFa: 'شباهت ساختاری به قالی‌های درشت‌باف هریس، بخشایش، گبه و عشایری با گره متقارن',
    localTermFa: 'اصطلاح محلی: رج (آذربایجان و هریس: حدود ۲۵ رج) | گره متقارن (ترکی)',
    localTermEn: 'Local Terminology: Raj (~25 Raj in Northwest/Heriz tradition) | Symmetrical (Turkish) Knot'
  },
  {
    id: 'raj_30',
    titleFa: 'نمونه ۳۰ رج (سبک کاشان / مشهد / تبریز تجاری)',
    originFa: 'استاندارد بازار • حدود ۴.۳ گره در هر سانتی‌متر (تخمین: ~۳۰ رج در ۷ سانت)',
    targetRaj: 30,
    knotsPer1Cm: 4.3,
    knotColorA: '#881337',
    knotColorB: '#1e40af',
    weftColor: '#e5e5e5',
    descFa: 'شباهت ساختاری به بافت‌های استاندارد کاشان، مشهد، اراک و تبریز ۳۰ رج',
    localTermFa: 'اصطلاح محلی: رج (تبریز/تهران) | خانه (در سنت کاشان و اصفهان) | خفته (در سنت مشهد و خراسان)',
    localTermEn: 'Local Terminology: Raj (Tabriz) | Khaneh (Kashan/Isfahan tradition) | Khofteh (Mashhad/Khorasan tradition)'
  },
  {
    id: 'raj_35',
    titleFa: 'نمونه ۳۵ رج (سبک تبریز / اراک / بختیاری مرغوب)',
    originFa: 'بافت متراکم بازار • ۵.۰ گره در هر سانتی‌متر (تخمین: ~۳۵ رج در ۷ سانت)',
    targetRaj: 35,
    knotsPer1Cm: 5.0,
    knotColorA: '#7c2d12',
    knotColorB: '#1e3a8a',
    weftColor: '#e7e5e4',
    descFa: 'تراکم رایج در قالی‌های مرغوب خانگی ایران',
    localTermFa: 'اصطلاح محلی: ۳۵ رج (تبریز) | خفته (خراسان) | خانه (کاشان)',
    localTermEn: 'Local Terminology: Estimated ~35 Raj | Regional terms: Raj / Khaneh / Khofteh'
  },
  {
    id: 'raj_40',
    titleFa: 'نمونه ۴۰ رج (سبک تبریز ماهی / نائین ۹ لا / بیجار)',
    originFa: 'نیمه‌ریز‌باف مرینوس و گل‌ابریشم • حدود ۵.۷ گره در هر سانتی‌متر (تخمین: ~۴۰ رج)',
    targetRaj: 40,
    knotsPer1Cm: 5.7,
    knotColorA: '#991b1b',
    knotColorB: '#d97706',
    weftColor: '#e7e5e4',
    descFa: 'شباهت ساختاری به بافت‌های ۴۰ رج تبریز، ماهی خوی، بیجار و نائین ۹ لا',
    localTermFa: 'اصطلاح محلی: ۴۰ رج (تبریز و بیجار) | ۹ لا (در سنت نائین — تعداد نخ تابیده چله)',
    localTermEn: 'Local Terminology: ~40 Raj (Tabriz/Bidjar) | 9-La (in Nain warp ply terminology)'
  },
  {
    id: 'raj_50',
    titleFa: 'نمونه ۵۰ رج (سبک اصفهان / تبریز علیا / نائین ۶ لا)',
    originFa: 'ریزباف اعلا گل‌ابریشم • حدود ۷.۱ گره در هر سانتی‌متر (تخمین: ~۵۰ رج)',
    targetRaj: 50,
    knotsPer1Cm: 7.1,
    knotColorA: '#881337',
    knotColorB: '#065f46',
    weftColor: '#f5f5f4',
    descFa: 'شباهت ساختاری به بافت‌های ریزباف اصفهان، تبریز ۵۰ رج و نائین ۶ لا',
    localTermFa: 'اصطلاح محلی: ۵۰ رج (تبریز) | خانه (اصفهان) | ۶ لا (در سنت نائین)',
    localTermEn: 'Local Terminology: ~50 Raj (Tabriz) | Khaneh (Isfahan) | 6-La (Nain tradition)'
  },
  {
    id: 'raj_60',
    titleFa: 'نمونه ۶۰ رج (سبک چله ابریشم تبریز / قم / نائین ۴ لا)',
    originFa: 'چله ابریشم بسیار نفیس • حدود ۸.۶ گره در هر سانتی‌متر (تخمین: ~۶۰ رج)',
    targetRaj: 60,
    knotsPer1Cm: 8.6,
    knotColorA: '#4c0519',
    knotColorB: '#b45309',
    weftColor: '#fef3c7',
    descFa: 'تراکم بسیار بالا روی چله ابریشم یا نائین ۴ لا',
    localTermFa: 'اصطلاح محلی: ۶۰ رج (تبریز و قم) | ۴ لا (در سنت فوق‌ریزباف نائین)',
    localTermEn: 'Local Terminology: ~60 Raj (Tabriz/Qom Silk Foundation) | 4-La (Ultra-fine Nain tradition)'
  }
];

const FRONT_PATTERN_STYLE_PROFILES: PatternSimilarityResult[] = [
  {
    originGroup: 'iranian',
    countryLabelFa: '🇮🇷 ایران — سبک کاشان',
    countryLabelEn: 'Iran — Kashan Style',
    primaryStyleEn: 'Kashan-style visual similarity (Central Medallion & Shah Abbasi Floral Field)',
    primaryStyleFa: 'نقشه با اصالت بصری ایرانی — شباهت بصری به سبک لچک و ترنج کاشان (گل‌های شاه‌عباسی)',
    secondaryStyleEn: 'Closest visual similarities: Kashan-style, Isfahan-style, and Central Persian classical medallion designs',
    secondaryStyleFa: 'نزدیک‌ترین شباهت‌های بصری: سبک کاشان، سبک اصفهان و طرح‌های کلاسیک لچک‌ترنج مرکز ایران',
    visualFeaturesEn: 'Crimson/lacquer red or navy field, curvilinear floral arabesques (Eslimi), central medallion (Toranj), and four-corner spandrels (Lachak).',
    visualFeaturesFa: 'زمینه لاکی یا سرمه‌ای، گردش اسلیمی و ختایی، ترنج مرکزی و چهار لچک متقارن در گوشه‌ها با حاشیه پهن.',
    localTerminologyEn: 'Local Terminology: Khaneh (Kashan/Isfahan traditional count) • asymmetric (Persian) knot • cotton warp / wool pile',
    localTerminologyFa: 'اصطلاحات محلی مرتبط: «خانه» (واحد سنتی کاشان و اصفهان) • گره نامتقارن (فارسی) • چله نخ پنبه و پرز پشم/کرک',
    disclaimerEn: 'A photograph alone cannot conclusively determine a carpet\'s origin, authenticity, or value.',
    disclaimerFa: 'تصویر فرش به‌تنهایی نمی‌تواند محل بافت، اصالت یا ارزش فرش را به‌طور قطعی تعیین کند.'
  },
  {
    originGroup: 'iranian',
    countryLabelFa: '🇮🇷 ایران — سبک تبریز و ماهی',
    countryLabelEn: 'Iran — Tabriz / Mahi Style',
    primaryStyleEn: 'Tabriz / Mahi-style visual similarity (All-Over Herati / Fish Motif & Medallion)',
    primaryStyleFa: 'نقشه با اصالت بصری ایرانی — شباهت بصری به سبک تبریز و طرح ماهی در هم (هراتی / علیا / خطیبی)',
    secondaryStyleEn: 'Closest visual similarities: Tabriz-style, Khoy Mahi-style, and Bidjar Herati-style',
    secondaryStyleFa: 'نزدیک‌ترین شباهت‌های بصری: سبک تبریز (ماهی، علیا، خطیبی)، سبک ماهی خوی و سبک هراتی بیجار',
    visualFeaturesEn: 'Fine repeating diamond lattice with four curving leaves ("Mahi" / fish motif) around a rosette, often highlighted with silk.',
    visualFeaturesFa: 'نقش‌مایه‌های ریز و تکرارشونده ماهی در هم (هراتی)، خطوط دقیق و گل‌ابریشم در دورگیری نقوش.',
    localTerminologyEn: 'Local Terminology: Raj (knots per ~7 cm in Tabriz tradition, e.g., 35, 40, 50, 60 Raj) • symmetrical (Turkish) knot',
    localTerminologyFa: 'اصطلاحات محلی مرتبط: «رج» (تعداد گره در ۷ سانتی‌متر در سنت تبریز: ۳۵، ۴۰، ۵۰ یا ۶۰ رج) • گره متقارن (ترکی)',
    disclaimerEn: 'A photograph alone cannot conclusively determine a carpet\'s origin, authenticity, or value.',
    disclaimerFa: 'تصویر فرش به‌تنهایی نمی‌تواند محل بافت، اصالت یا ارزش فرش را به‌طور قطعی تعیین کند.'
  },
  {
    originGroup: 'iranian',
    countryLabelFa: '🇮🇷 ایران — سبک نائین و اصفهان',
    countryLabelEn: 'Iran — Nain / Isfahan Style',
    primaryStyleEn: 'Nain / Isfahan-style visual similarity (Ivory-Cream & Lapis/Turquoise Floral Medallion)',
    primaryStyleFa: 'نقشه با اصالت بصری ایرانی — شباهت بصری به سبک نائین و اصفهان (زمینه کرم/پوست‌پیازی و لاجوردی)',
    secondaryStyleEn: 'Closest visual similarities: Nain-style (9-La / 6-La), Isfahan-style, and Qom-style',
    secondaryStyleFa: 'نزدیک‌ترین شباهت‌های بصری: سبک نائین (۹ لا و ۶ لا)، سبک شاه‌عباسی اصفهان و سبک قم',
    visualFeaturesEn: 'Ivory, beige, or royal blue palette with intricate floral vines, delicate medallions, and silk outline highlights.',
    visualFeaturesFa: 'پالت رنگی روشن (کرم، بژ، لاجوردی و فیروزه‌ای) با شاخه‌های ظریف ختایی و دورگیری ابریشم.',
    localTerminologyEn: 'Local Terminology: La (Nain warp ply count: 9-La, 6-La, 4-La) & Khaneh (Isfahan tradition)',
    localTerminologyFa: 'اصطلاحات محلی مرتبط: «لا» در سنت نائین (۹ لا، ۶ لا، ۴ لا بر اساس تعداد نخ تابیده چله) و «خانه» در اصفهان',
    disclaimerEn: 'A photograph alone cannot conclusively determine a carpet\'s origin, authenticity, or value.',
    disclaimerFa: 'تصویر فرش به‌تنهایی نمی‌تواند محل بافت، اصالت یا ارزش فرش را به‌طور قطعی تعیین کند.'
  },
  {
    originGroup: 'iranian',
    countryLabelFa: '🇮🇷 ایران — سبک هریس و کُردی',
    countryLabelEn: 'Iran — Heriz & Kurdish Style',
    primaryStyleEn: 'Heriz / Northwest Geometric & Kurdish Tribal visual similarity',
    primaryStyleFa: 'نقشه با اصالت بصری ایرانی — شباهت بصری به سبک هندسی هریس، عشایری و فرش کُرد (بیجار و سنه)',
    secondaryStyleEn: 'Closest visual similarities: Heriz-style, Bakshaish-style, Bidjar/Senneh Kurdish-style, and Qashqai geometric designs',
    secondaryStyleFa: 'نزدیک‌ترین شباهت‌های بصری: سبک هندسی هریس و بخشایش، سبک کُردی (بیجار و سنه) و نقوش عشایری',
    visualFeaturesEn: 'Bold geometric stepped medallion, angular corner motifs, warm terracotta/rust-red and indigo vegetable-dyed wool palette.',
    visualFeaturesFa: 'ترنج هندسی و شکسته‌نگار، خطوط زاویه‌دار قدرتمند، رنگ‌های گرم روناسی، مسی و سرمه‌ای با پشم دست‌ریس.',
    localTerminologyEn: 'Local Terminology: Raj (25–35 Raj in Heriz/Bidjar) • compacted weave ("Lool-baft" in Bidjar)',
    localTerminologyFa: 'اصطلاحات محلی مرتبط: «رج» (۲۵ تا ۳۵ رج در هریس و بیجار) • بافت لول و متراکم در قالی کُرد بیجار',
    disclaimerEn: 'A photograph alone cannot conclusively determine a carpet\'s origin, authenticity, or value.',
    disclaimerFa: 'تصویر فرش به‌تنهایی نمی‌تواند محل بافت، اصالت یا ارزش فرش را به‌طور قطعی تعیین کند.'
  },
  {
    originGroup: 'iranian',
    countryLabelFa: '🇮🇷 ایران — سبک مشهد و خراسان',
    countryLabelEn: 'Iran — Mashhad / Khorasan Style',
    primaryStyleEn: 'Mashhad / Khorasan-style visual similarity (Rich Burgundy Floral & Afshan / Gol-Farang)',
    primaryStyleFa: 'نقشه با اصالت بصری ایرانی — شباهت بصری به سبک مشهد و خراسان (زمینه عنابی/لاکی، افشان و گل‌فرنگ)',
    secondaryStyleEn: 'Closest visual similarities: Mashhad-style, Mood/Birjand-style, and Kashmar-style',
    secondaryStyleFa: 'نزدیک‌ترین شباهت‌های بصری: سبک مشهد، سبک مود و بیرجند (ماهی و لچک‌ترنج) و کاشمر',
    visualFeaturesEn: 'Deep magenta/burgundy red field with sweeping floral sprays, palmettes, and soft Khorasan wool pile.',
    visualFeaturesFa: 'زمینه عنابی و لاکی پخته با گل‌های پرکار شاه‌عباسی، افشان یا لچک‌ترنج و پشم نرم خراسان.',
    localTerminologyEn: 'Local Terminology: Khofteh (traditional Khorasan knot-density unit, e.g., 30 or 35 Khofteh)',
    localTerminologyFa: 'اصطلاحات محلی مرتبط: «خفته» (واحد سنتی شمارش تراکم گره در مشهد و خراسان، مانند ۳۰ یا ۳۵ خفته)',
    disclaimerEn: 'A photograph alone cannot conclusively determine a carpet\'s origin, authenticity, or value.',
    disclaimerFa: 'تصویر فرش به‌تنهایی نمی‌تواند محل بافت، اصالت یا ارزش فرش را به‌طور قطعی تعیین کند.'
  },
  // ============================================================================
  // 5 NON-IRANIAN / REGIONAL WORLD CARPET TRADITIONS
  // (1. Caucasus | 2. Turkey | 3. Pakistan | 4. Afghanistan | 5. Egypt)
  // ============================================================================
  {
    originGroup: 'non_iranian_world',
    countryLabelFa: '🏔️ ناحیه قفقاز (قزاق، شیروان، قره‌باغ، قوبا)',
    countryLabelEn: 'Caucasus Region (Kazak, Shirvan, Karabakh, Kuba)',
    nonIranianAlertFa:
      '🔍 تشخیص کلی: این نقشه به نظر ایرانی کلاسیک نیست و بیشترین شباهت بصری را به فرش‌های دستباف «ناحیه قفقاز» دارد.',
    nonIranianAlertEn:
      '🔍 Primary Classification: This pattern does not appear typically Iranian; it shows closest visual similarity to Caucasian Carpet Designs.',
    primaryStyleEn: 'Non-Iranian Pattern Profile — Caucasian Carpet visual similarity (Kazak, Shirvan, Karabakh, Kuba & Dagestan styles)',
    primaryStyleFa: 'این نقشه به نظر ایرانی نیست و شبیه نقشه فرش‌های «ناحیه قفقاز» (سبک قزاق، شیروان، قره‌باغ، قوبا یا داغستان) است',
    secondaryStyleEn: 'Closest regional/city similarities within the Caucasus: Kazak (Lori-Pambak / Fachralo bold geometric medallions), Shirvan & Kuba (stepped polygons & star lattices), Karabakh & Ganja',
    secondaryStyleFa: 'نزدیک‌ترین مناطق احتمالی در قفقاز (در صورت تشخیص زیرشاخه): سبک قزاق (ترنج‌های درشت هندسی و صلیبی)، شیروان و قوبا (ستاره‌های هشت‌پر و گل‌های هندسی)، قره‌باغ و گنجه',
    visualFeaturesEn: 'Sharp angular geometry, bold octagonal/latch-hook medallions, stylized animal/bird motifs, and high-contrast primary colors (madder red, cobalt blue, ivory, saffron yellow, emerald green).',
    visualFeaturesFa: 'اشکال هندسی کاملاً زاویه‌دار، مدالیون‌های قلاب‌دار و ستاره‌های هشت‌پر، نقوش انتزاعی پرندگان و تضاد رنگی تند و درخشان (قرمز، آبی لاجوردی، سفید عاجی و زرد زعفرانی).',
    localTerminologyEn: 'Structure & Terminology: Symmetrical (Ghiordes/Turkish) knot • Wool warp & weft in tribal Kazak or cotton weft in Kuba (~20–35 Raj equivalent)',
    localTerminologyFa: 'ساختار و اصطلاحات: گره متقارن (ترکی/قفقازی) • چله پشمی در قزاق یا نخی در قوبا • تراکم معادل حدود ۲۰ تا ۳۵ رج',
    disclaimerEn: 'A photograph alone cannot conclusively determine exact city of origin; this indicates closest visual similarity to Caucasian designs.',
    disclaimerFa: 'تصویر فرش به‌تنهایی شهر دقیق بافت را قطعی نمی‌کند، اما نشان‌دهنده شباهت بارز این نقشه به خانواده فرش‌های قفقاز است.'
  },
  {
    originGroup: 'non_iranian_world',
    countryLabelFa: '🇹🇷 ترکیه / آناتولی (هرکه، عوشاق، قونیه، برگاما)',
    countryLabelEn: 'Turkey / Anatolia (Hereke, Oushak, Konya, Bergama)',
    nonIranianAlertFa:
      '🔍 تشخیص کلی: این نقشه به نظر ایرانی نیست و بیشترین شباهت بصری را به فرش‌های دستباف کشور «ترکیه (آناتولی)» دارد.',
    nonIranianAlertEn:
      '🔍 Primary Classification: This pattern does not appear Iranian; it shows closest visual similarity to Turkish (Anatolian) Carpet Designs.',
    primaryStyleEn: 'Non-Iranian Pattern Profile — Turkish / Anatolian Carpet visual similarity (Oushak, Hereke, Konya, Bergama & Milas styles)',
    primaryStyleFa: 'این نقشه به نظر ایرانی نیست و شبیه نقشه فرش کشور «ترکیه / آناتولی» (سبک عوشاق/اوشاک، هرکه، قونیه، برگاما یا میلاس) است',
    secondaryStyleEn: 'Closest regional/city similarities within Turkey: Oushak/Uşak (large-scale open floral & star medallions in soft gold/terracotta/sky-blue), Hereke (Ottoman court silk & double-column Mihrab prayer designs), Bergama & Konya (bold Anatolian geometric)',
    secondaryStyleFa: 'نزدیک‌ترین شهرهای احتمالی در ترکیه: سبک عوشاق / اوشاک (گل‌های درشت و باز با رنگ‌های ملایم طلایی، کرم و آبی)، سبک هرکه (ابریشم ریزباف و طرح‌های محرابی عثمانی)، قونیه و برگاما',
    visualFeaturesEn: 'Either large-scale spaced floral palmettes with soft pastel/golden earth tones (Oushak style), Ottoman court tulip/carnation motifs (Hereke), or stepped Anatolian prayer niches (Mihrab).',
    visualFeaturesFa: 'گل‌های شاه‌عباسی و برگ‌های بسیار درشت و باز با فاصله زیاد و رنگ‌های ملایم طلایی/دارچینی (سبک عوشاق) یا طرح‌های محرابی ستون‌دار و لاله‌های عثمانی (سبک هرکه و قونیه).',
    localTerminologyEn: 'Structure & Terminology: Turkish Double Knot (Ghiordes symmetrical knot) • Hereke measured in knots per sq.cm (e.g., 10x10 or 12x12)',
    localTerminologyFa: 'ساختار و اصطلاحات: گره متقارن دوبل ترکی (Ghiordes) • در فرش‌های ابریشم هرکه ترکیه تراکم بر حسب گره در سانتی‌متر مربع (مثلاً ۱۰×۱۰) سنجیده می‌شود',
    disclaimerEn: 'A photograph alone cannot conclusively determine exact city of origin; this indicates closest visual similarity to Turkish/Anatolian designs.',
    disclaimerFa: 'تصویر فرش به‌تنهایی شهر دقیق بافت را قطعی نمی‌کند، اما نشان‌دهنده شباهت بارز این نقشه به خانواده فرش‌های ترکیه است.'
  },
  {
    originGroup: 'non_iranian_world',
    countryLabelFa: '🇵🇰 پاکستان (موری/بخارای پاکستانی، لاهور، پیشاور)',
    countryLabelEn: 'Pakistan (Pakistani Bokhara/Mori, Lahore, Peshawar)',
    nonIranianAlertFa:
      '🔍 تشخیص کلی: این نقشه به نظر ایرانی نیست و بیشترین شباهت بصری را به فرش‌های دستباف کشور «پاکستان» دارد.',
    nonIranianAlertEn:
      '🔍 Primary Classification: This pattern does not appear Iranian; it shows closest visual similarity to Pakistani Carpet Designs.',
    primaryStyleEn: 'Non-Iranian Pattern Profile — Pakistani Carpet visual similarity (Pakistani Mori/Bokhara, Lahore & Peshawar Chobi/Ziegler styles)',
    primaryStyleFa: 'این نقشه به نظر ایرانی نیست و شبیه نقشه فرش کشور «پاکستان» (سبک موری/بخارای پاکستانی، لاهور یا چوبی پیشاور) است',
    secondaryStyleEn: 'Closest regional/style similarities within Pakistan: Pakistani Mori / Bokhara (repeating rows of octagonal Tekke Göl motifs on lustrous washed wool), Peshawar Chobi / Ziegler (open floral vines with muted vegetable dyes), Lahore workshop weaves',
    secondaryStyleFa: 'نزدیک‌ترین سبک‌های احتمالی در پاکستان: سبک موری / بخارای پاکستانی (ردیف‌های منظم حوضک و گُل روی زمینه قرمز، سبز، کرم یا طلایی با پشم بسیار نرم و براق)، سبک چوبی پیشاور (Ziegler) و بافت لاهور',
    visualFeaturesEn: 'Repeating rows of small octagonal "Göl" medallions on a high-sheen mercerized wool field (Bokhara/Mori) or open palmette patterns with antique-washed muted tones (Peshawar Chobi).',
    visualFeaturesFa: 'ردیف‌های تکرارشونده «گُل / حوضک» هشت‌ضلعی با حاشیه‌های هندسی ظریف و شست‌وشوی بسیار براق و ابریشم‌گونه پرز پشم (در سبک بخارای پاکستانی) یا گل‌های باز با رنگ‌های ملایم گیاهی (سبک چوبی پیشاور).',
    localTerminologyEn: 'Structure & Terminology: Pakistani Mori count (e.g., 9/18 or 16/18 ply/quality system) • asymmetric (Persian/Senneh) knot on cotton warp',
    localTerminologyFa: 'ساختار و اصطلاحات: در بازار پاکستان تراکم با سیستم «موری (Mori)» مانند ۹/۱۸ یا ۱۶/۱۸ روی چله نخ پنبه و گره نامتقارن سنجیده می‌شود',
    disclaimerEn: 'A photograph alone cannot conclusively determine exact city of origin; this indicates closest visual similarity to Pakistani designs.',
    disclaimerFa: 'تصویر فرش به‌تنهایی شهر دقیق بافت را قطعی نمی‌کند، اما نشان‌دهنده شباهت بارز این نقشه به خانواده فرش‌های پاکستان است.'
  },
  {
    originGroup: 'non_iranian_world',
    countryLabelFa: '🇦🇫 افغانستان (خال‌محمدی، آقچه، بلخ، هرات)',
    countryLabelEn: 'Afghanistan (Khal Mohammadi, Aqcha, Balkh, Herat)',
    nonIranianAlertFa:
      '🔍 تشخیص کلی: این نقشه به نظر ایرانی مرکزی نیست و بیشترین شباهت بصری را به قالی‌های اصیل کشور «افغانستان» دارد.',
    nonIranianAlertEn:
      '🔍 Primary Classification: This pattern does not appear Central Iranian; it shows closest visual similarity to Afghan Carpet Designs.',
    primaryStyleEn: 'Non-Iranian Pattern Profile — Afghan Carpet visual similarity (Khal Mohammadi, Aqcha, Balkh/Mazar-i-Sharif & Herat/Afghan Baluch styles)',
    primaryStyleFa: 'این نقشه به نظر ایرانی نیست و شبیه نقشه قالی کشور «افغانستان» (سبک خال‌محمدی، آقچه، بلخ/مزارشریف یا هرات) است',
    secondaryStyleEn: 'Closest regional/city similarities within Afghanistan: Khal Mohammadi & Kunduz (deep madder-crimson field with octagonal Elephant-Foot / Fil-Pa Göls), Aqcha & Balkh (northern geometric medallions), Herat & Ghazni wool weaves',
    secondaryStyleFa: 'نزدیک‌ترین مناطق احتمالی در افغانستان: سبک خال‌محمدی و قندوز (زمینه قرمز روناسی و جگری تیره با گُل‌های هشت‌ضلعی فیل‌پا)، سبک آقچه و بلخ/مزارشریف، و سبک هرات و غزنی',
    visualFeaturesEn: 'Deep rich burgundy/madder-red and dark indigo palette, bold repeating octagonal "Fil-Pa" (Elephant Foot) medallions, geometric borders, and flatwoven kilim skirts at both ends.',
    visualFeaturesFa: 'طیف عمیق قرمز روناسی، جگری و عنابی تیره همراه با سرمه‌ای، نقوش هشت‌ضلعی درشت موسوم به «فیل‌پا (پای فیل)» در ردیف‌های متقارن و گلیم‌باف پهن در دو سر قالی.',
    localTerminologyEn: 'Structure & Terminology: Fil-Pa (Elephant Foot Göl) • Ghazni hand-spun wool • asymmetric knot on wool or goat-hair warp (~20–35 Raj equivalent)',
    localTerminologyFa: 'ساختار و اصطلاحات: نقش «فیل‌پا» • پشم دست‌ریس غزنی • چله پشمی و گلیم‌باف دو سر قالی (تراکم معادل حدود ۲۰ تا ۳۵ رج)',
    disclaimerEn: 'A photograph alone cannot conclusively determine exact city of origin; this indicates closest visual similarity to Afghan designs.',
    disclaimerFa: 'تصویر فرش به‌تنهایی شهر دقیق بافت را قطعی نمی‌کند، اما نشان‌دهنده شباهت بارز این نقشه به خانواده قالی‌های افغانستان است.'
  },
  {
    originGroup: 'non_iranian_world',
    countryLabelFa: '🇪🇬 مصر (مملوکی قاهره، فسطاط، اسیوط)',
    countryLabelEn: 'Egypt (Mamluk Cairo, Fustat, Assiut)',
    nonIranianAlertFa:
      '🔍 تشخیص کلی: این نقشه به نظر ایرانی نیست و بیشترین شباهت بصری را به فرش‌های دستباف کشور «مصر (سبک مملوکی قاهره)» دارد.',
    nonIranianAlertEn:
      '🔍 Primary Classification: This pattern does not appear Iranian; it shows closest visual similarity to Egyptian (Mamluk Cairo) Carpet Designs.',
    primaryStyleEn: 'Non-Iranian Pattern Profile — Egyptian Carpet visual similarity (Mamluk Cairo Kaleidoscopic Geometric & Assiut/Fustat styles)',
    primaryStyleFa: 'این نقشه به نظر ایرانی نیست و شبیه نقشه فرش کشور «مصر» (سبک هندسی مملوکی قاهره، فسطاط یا اسیوط) است',
    secondaryStyleEn: 'Closest regional/style similarities within Egypt: Cairo Mamluk style (kaleidoscopic central octagon surrounded by radiating stars, cypress trees, and umbrella-leaf medallions), Fustat & Assiut workshop weaves',
    secondaryStyleFa: 'نزدیک‌ترین سبک‌ها و شهرهای احتمالی در مصر: سبک مملوکی قاهره (ترنج هشت‌ضلعی کالیدوسکوپی و ستاره‌های هشت‌پر الهام‌گرفته از معماری قاهره)، کارگاه‌های فسطاط، اسیوط و دمنهور',
    visualFeaturesEn: 'Distinctive kaleidoscopic geometric medallion (interlocking octagons, 8-pointed stars, and papyrus/umbrella-leaf motifs) in a luminous palette of Venetian crimson, Egyptian turquoise-blue, olive-green, and saffron yellow.',
    visualFeaturesFa: 'ترکیب منحصربه‌فرد هندسی و ستاره‌ای تودرتو (شبیه چرخ‌وفلک نور و کاشی‌کاری مملوکی قاهره) با پالت رنگی خاص قرمز لاکی، آبی فیروزه‌ای مصری، سبز زیتونی و زرد طلایی.',
    localTerminologyEn: 'Structure & Terminology: Mamluk Cairo geometric weave • Traditionally S-spun wool with asymmetric knot open to the left',
    localTerminologyFa: 'ساختار و اصطلاحات: نقشه هندسی مملوکی قاهره (Mamluk Carpet) • پرز پشمی درخشان با هندسه ستاره‌ای هشت‌ضلعی',
    disclaimerEn: 'A photograph alone cannot conclusively determine exact city of origin; this indicates closest visual similarity to Egyptian designs.',
    disclaimerFa: 'تصویر فرش به‌تنهایی شهر دقیق بافت را قطعی نمی‌کند، اما نشان‌دهنده شباهت بارز این نقشه به خانواده فرش‌های مصر است.'
  }
];

export const OfflineRajScanner: React.FC<OfflineRajScannerProps> = ({ onApplyToCertificate }) => {
  const [analysisTab, setAnalysisTab] = useState<'back_density' | 'front_pattern'>('back_density');
  const [mode, setMode] = useState<'preset' | 'camera' | 'upload'>('preset');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('raj_40');
  const [windowCm, setWindowCm] = useState<1 | 3.5 | 7>(7);
  const [sensitivity, setSensitivity] = useState<number>(50);
  const [manualOffset, setManualOffset] = useState<number>(0);
  const [lockedTargetRaj, setLockedTargetRaj] = useState<number | null>(null);
  const [machineMadeShaneh, setMachineMadeShaneh] = useState<number | null>(null);
  const [customKnotsX, setCustomKnotsX] = useState<number[] | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [appliedBadge, setAppliedBadge] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<RajScanResult | null>(null);

  // Front-of-carpet pattern similarity state
  const [selectedPatternIdx, setSelectedPatternIdx] = useState<number>(0);
  const [frontImagePreview, setFrontImagePreview] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cleanBufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const uploadedImageRef = useRef<HTMLImageElement | null>(null);

  const getCleanBuffer = (): HTMLCanvasElement => {
    if (!cleanBufferCanvasRef.current) {
      const off = document.createElement('canvas');
      off.width = 760;
      off.height = 220;
      cleanBufferCanvasRef.current = off;
    }
    return cleanBufferCanvasRef.current;
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setTorchOn(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const classifyRajTier = (
    raj: number,
    shaneh: number | null
  ): {
    commercialClass: string;
    tierFa: string;
    tierEn: string;
    realismNoteFa: string;
    localTermFa: string;
    localTermEn: string;
  } => {
    if (shaneh !== null) {
      const equivRaj = Math.round((shaneh / 100) * 7);
      return {
        commercialClass: `فرش ماشینی ${shaneh} شانه (تراکم ظاهری ~${equivRaj} رج در ۷ سانت)`,
        tierFa: `فرش ماشینی ${shaneh} شانه (${shaneh} گره در هر متر عرض) — تقارن ماشینی`,
        tierEn: `Machine-Made ${shaneh}-Shaneh Carpet (~${equivRaj} Raj visual density)`,
        realismNoteFa: 'یکنواختی ردیف‌ها (ویژگی فرش ماشینی در برابر گره دست‌بافت).',
        localTermFa: `اصطلاح ماشینی: ${shaneh} شانه (تعداد گره در یک متر عرض)`,
        localTermEn: `Machine Terminology: ${shaneh} Shaneh (knots per meter width)`
      };
    }
    if (raj < 28) {
      return {
        commercialClass: 'تخمین: حدود ۲۵ رج (درشت‌باف / سبک هریس، گبه و عشایری)',
        tierFa: 'درشت‌باف (حدود ۲۵ رج) — شباهت ساختاری به قالی‌های هریس، گبه و عشایری',
        tierEn: 'Estimated ~25 Raj (Coarse Weave — Heriz / Tribal / Gabbeh style similarity)',
        realismNoteFa: 'گره‌های درشت پشمی (حدود ۳.۵ گره در هر سانتی‌متر).',
        localTermFa: 'اصطلاحات محلی: رج (آذربایجان/هریس: ~۲۵ رج) | خفته (خراسان) | خانه (کاشان)',
        localTermEn: 'Local Terminology: Estimated ~25 Raj | Regional terms: Raj / Khaneh / Khofteh'
      };
    }
    if (raj < 34) {
      return {
        commercialClass: 'تخمین: حدود ۳۰ رج (بافت استاندارد بازار)',
        tierFa: 'حدود ۳۰ رج تجاری استاندارد (بافت پشم دست‌ریس — سبک کاشان، مشهد، اراک و تبریز)',
        tierEn: 'Estimated ~30 Raj (Standard Commercial Persian Weave)',
        realismNoteFa: 'تراکم رایج منازل ایرانی (حدود ۴.۳ گره در هر سانتی‌متر).',
        localTermFa: 'اصطلاحات محلی: ~۳۰ رج (تبریز/تهران) | خانه (کاشان و اصفهان) | خفته (مشهد و خراسان)',
        localTermEn: 'Local Terminology: Estimated ~30 Raj | Khaneh (Kashan/Isfahan) | Khofteh (Mashhad/Khorasan)'
      };
    }
    if (raj < 38) {
      return {
        commercialClass: 'تخمین: حدود ۳۵ رج (بافت متراکم بازار)',
        tierFa: 'حدود ۳۵ رج (۵ گره در هر سانتی‌متر — رایج در قالی‌های مرغوب خانگی)',
        tierEn: 'Estimated ~35 Raj (Medium-Fine Household Weave)',
        realismNoteFa: 'تراکم تقریبی ۵ گره در هر سانتی‌متر (حدود ۳۵ گره در ۷ سانت).',
        localTermFa: 'اصطلاحات محلی: ~۳۵ رج (تبریز/اراک) | خفته (مشهد) | خانه (کاشان/اصفهان)',
        localTermEn: 'Local Terminology: Estimated ~35 Raj | Regional terms: Raj / Khaneh / Khofteh'
      };
    }
    if (raj < 46) {
      return {
        commercialClass: 'تخمین: حدود ۴۰ رج (نیمه‌ریز‌باف مرغوب)',
        tierFa: 'حدود ۴۰ رج نیمه‌ریز‌باف (شباهت تراکمی به تبریز ۴۰ رج، بیجار ریزباف و نائین ۹ لا)',
        tierEn: 'Estimated ~40 Raj (Semi-Fine Weave — Tabriz 40-Raj / Nain 9-La similarity)',
        realismNoteFa: 'تراکم تقریبی ۵.۷ گره در هر سانتی‌متر.',
        localTermFa: 'اصطلاحات محلی: ~۴۰ رج (تبریز و بیجار) | ۹ لا (در سنت نائین) | خانه (اصفهان)',
        localTermEn: 'Local Terminology: Estimated ~40 Raj (Tabriz/Bidjar) | 9-La (Nain warp ply count) | Khaneh'
      };
    }
    if (raj < 56) {
      return {
        commercialClass: 'تخمین: حدود ۵۰ رج (ریزباف اعلا)',
        tierFa: 'حدود ۵۰ رج ریزباف (شباهت تراکمی به تبریز ۵۰ رج، اصفهان و نائین ۶ لا)',
        tierEn: 'Estimated ~50 Raj (Fine Weave — Tabriz 50-Raj / Isfahan / Nain 6-La similarity)',
        realismNoteFa: 'تراکم تقریبی ۷.۱ گره در هر سانتی‌متر.',
        localTermFa: 'اصطلاحات محلی: ~۵۰ رج (تبریز) | خانه (اصفهان و کاشان) | ۶ لا (در سنت نائین)',
        localTermEn: 'Local Terminology: Estimated ~50 Raj (Tabriz) | Khaneh (Isfahan) | 6-La (Nain tradition)'
      };
    }
    if (raj < 66) {
      return {
        commercialClass: 'تخمین: حدود ۶۰ رج (فوق‌ریزباف / چله ابریشم)',
        tierFa: 'حدود ۶۰ رج فوق‌ریزباف (شباهت تراکمی به چله ابریشم تبریز، قم، اصفهان و نائین ۴ لا)',
        tierEn: 'Estimated ~60 Raj (Extra-Fine Silk Foundation / Nain 4-La similarity)',
        realismNoteFa: 'تراکم تقریبی ۸.۶ گره در سانتی‌متر.',
        localTermFa: 'اصطلاحات محلی: ~۶۰ رج (تبریز و قم) | ۴ لا (در سنت نائین) | خانه (اصفهان)',
        localTermEn: 'Local Terminology: Estimated ~60 Raj (Tabriz/Qom) | 4-La (Nain ultra-fine tradition)'
      };
    }
    return {
      commercialClass: 'تخمین: حدود ۷۰ رج (ریزباف تمام ابریشم)',
      tierFa: 'حدود ۷۰ رج (سقف ظرافت بافت با گره دست روی چله ابریشم)',
      tierEn: 'Estimated ~70 Raj (Ultra-Fine Pure Silk Weave)',
      realismNoteFa: 'سقف فیزیکی بافت با گره دست روی چله ابریشم (~۱۰ گره در هر سانتی‌متر).',
      localTermFa: 'اصطلاحات محلی: ~۷۰ رج (قم و تبریز) | ۴ لا (نائین)',
      localTermEn: 'Local Terminology: Estimated ~70 Raj (Qom/Tabriz) | 4-La (Nain)'
    };
  };

  // Analyze uploaded front-of-carpet photo color histogram + geometric vs curvilinear edges
  // to suggest closest visual pattern similarity across BOTH Iranian (0..4) and Non-Iranian World (5..9: Caucasus, Turkey, Pakistan, Afghanistan, Egypt)
  const handleFrontPatternUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    sound.playCoin();

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result;
      if (typeof dataUrl !== 'string') return;
      setFrontImagePreview(dataUrl);

      const img = new Image();
      img.onload = () => {
        const off = document.createElement('canvas');
        off.width = 160;
        off.height = 160;
        const ctx = off.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, 160, 160);
        const data = ctx.getImageData(0, 0, 160, 160).data;

        let lightIvoryPixels = 0;
        let crimsonRedPixels = 0;
        let deepBurgundyAfghanPixels = 0;
        let rustEarthPixels = 0;
        let oliveTurquoiseMamlukPixels = 0;
        let softGoldPastelTurkishPixels = 0;
        let highContrastPrimaryCaucasianPixels = 0;
        let sharpStepEdges = 0;
        const total = 160 * 160;

        for (let y = 1; y < 159; y++) {
          for (let x = 1; x < 159; x++) {
            const idx = (y * 160 + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            const rightIdx = (y * 160 + (x + 1)) * 4;
            const diffH =
              Math.abs(r - data[rightIdx]) +
              Math.abs(g - data[rightIdx + 1]) +
              Math.abs(b - data[rightIdx + 2]);
            if (diffH > 135) sharpStepEdges++;

            if (r > 190 && g > 180 && b > 155) {
              lightIvoryPixels++;
            } else if (r > 95 && r < 165 && g < 45 && b < 50) {
              deepBurgundyAfghanPixels++;
            } else if (r > 140 && g < 65 && b < 75) {
              crimsonRedPixels++;
            } else if (r > 135 && g > 70 && g < 125 && b < 75) {
              rustEarthPixels++;
            } else if ((g > 110 && b > 100 && r < 110) || (r > 110 && g > 125 && b < 80)) {
              oliveTurquoiseMamlukPixels++;
            } else if (r > 175 && g > 145 && g < 190 && b > 95 && b < 150) {
              softGoldPastelTurkishPixels++;
            } else if ((b > 130 && r < 70) || (r > 190 && g > 165 && b < 65)) {
              highContrastPrimaryCaucasianPixels++;
            }
          }
        }

        const angularRatio = sharpStepEdges / total;

        if (oliveTurquoiseMamlukPixels / total > 0.16 && angularRatio > 0.08) {
          setSelectedPatternIdx(9); // Egypt (Mamluk Cairo geometric kaleidoscope)
        } else if (deepBurgundyAfghanPixels / total > 0.28 && angularRatio > 0.07) {
          setSelectedPatternIdx(8); // Afghanistan (Khal Mohammadi / Aqcha Fil-Pa)
        } else if (highContrastPrimaryCaucasianPixels / total > 0.16 && angularRatio > 0.1) {
          setSelectedPatternIdx(5); // Caucasus (Kazak / Shirvan / Karabakh)
        } else if (softGoldPastelTurkishPixels / total > 0.22) {
          setSelectedPatternIdx(6); // Turkey / Anatolia (Oushak / Hereke)
        } else if (crimsonRedPixels / total > 0.26 && lightIvoryPixels / total > 0.12 && angularRatio > 0.09) {
          setSelectedPatternIdx(7); // Pakistan (Bokhara / Mori repeating Göl)
        } else if (lightIvoryPixels / total > 0.28) {
          setSelectedPatternIdx(2); // Iran: Nain / Isfahan
        } else if (rustEarthPixels / total > 0.22) {
          setSelectedPatternIdx(3); // Iran: Heriz / Kurdish
        } else if (crimsonRedPixels / total > 0.25) {
          setSelectedPatternIdx(0); // Iran: Kashan
        } else {
          setSelectedPatternIdx(1); // Iran: Tabriz / Mahi
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  // True Autocorrelation Pitch Estimator + Optical Knot Crown Finder
  const runOpticalKnotDetection = useCallback(() => {
    const displayCanvas = canvasRef.current;
    const cleanCanvas = getCleanBuffer();
    if (!displayCanvas || !cleanCanvas) return;

    const displayCtx = displayCanvas.getContext('2d');
    const cleanCtx = cleanCanvas.getContext('2d');
    if (!displayCtx || !cleanCtx) return;

    const width = displayCanvas.width;
    const height = displayCanvas.height;

    displayCtx.clearRect(0, 0, width, height);
    displayCtx.drawImage(cleanCanvas, 0, 0, width, height);

    const startX = Math.floor(width * 0.1);
    const endX = Math.floor(width * 0.9);
    const regionWidth = endX - startX; // 608 px
    const scanY = Math.floor(height * 0.5);

    const imageData = cleanCtx.getImageData(startX, scanY - 5, regionWidth, 11).data;
    const rawLuminance: number[] = new Array(regionWidth).fill(0);

    for (let x = 0; x < regionWidth; x++) {
      let sumLum = 0;
      for (let dy = 0; dy < 11; dy++) {
        const idx = (dy * regionWidth + x) * 4;
        const r = imageData[idx];
        const g = imageData[idx + 1];
        const b = imageData[idx + 2];
        sumLum += 0.299 * r + 0.587 * g + 0.114 * b;
      }
      rawLuminance[x] = sumLum / 11;
    }

    const smoothed: number[] = new Array(regionWidth).fill(0);
    const radius = 4;
    for (let x = 0; x < regionWidth; x++) {
      let wSum = 0;
      let valSum = 0;
      for (let k = -radius; k <= radius; k++) {
        const sx = Math.min(regionWidth - 1, Math.max(0, x + k));
        const w = radius + 1 - Math.abs(k);
        valSum += rawLuminance[sx] * w;
        wSum += w;
      }
      smoothed[x] = valSum / wSum;
    }

    let minL = 255;
    let maxL = 0;
    let meanL = 0;
    for (let x = 0; x < regionWidth; x++) {
      if (smoothed[x] < minL) minL = smoothed[x];
      if (smoothed[x] > maxL) maxL = smoothed[x];
      meanL += smoothed[x];
    }
    meanL /= regionWidth;
    const dynamicRange = Math.max(10, maxL - minL);

    let estimatedRajIn7Cm = 40;

    if (lockedTargetRaj !== null) {
      estimatedRajIn7Cm = lockedTargetRaj;
    } else if (mode === 'preset') {
      const preset =
        PRESET_WEAVE_SAMPLES.find((p) => p.id === selectedPresetId) || PRESET_WEAVE_SAMPLES[3];
      estimatedRajIn7Cm = preset.targetRaj;
    } else {
      const centered = smoothed.map((v) => v - meanL);
      let bestLag = 16;
      let bestCorr = -Infinity;

      for (let lag = 12; lag <= 22; lag++) {
        let sumProd = 0;
        let count = 0;
        for (let x = 0; x < regionWidth - lag; x++) {
          sumProd += centered[x] * centered[x + lag];
          count++;
        }
        const avgCorr = sumProd / Math.max(1, count);
        if (avgCorr > bestCorr) {
          bestCorr = avgCorr;
          bestLag = lag;
        }
      }

      const baseRajFromPitch = Math.round(regionWidth / bestLag);
      const sensitivityDelta = Math.round((sensitivity - 50) / 4);
      estimatedRajIn7Cm = Math.max(25, Math.min(65, baseRajFromPitch + sensitivityDelta));
    }

    let detectedPeaksX: number[] = [];

    if (customKnotsX !== null) {
      detectedPeaksX = [...customKnotsX].sort((a, b) => a - b);
    } else {
      const expectedKnotsInWindow = Math.max(
        3,
        Math.round((estimatedRajIn7Cm / 7) * windowCm)
      );
      const cellWidth = regionWidth / expectedKnotsInWindow;

      for (let i = 0; i < expectedKnotsInWindow; i++) {
        const cellStart = Math.max(2, Math.floor(i * cellWidth + cellWidth * 0.15));
        const cellEnd = Math.min(
          regionWidth - 3,
          Math.ceil((i + 1) * cellWidth - cellWidth * 0.15)
        );
        let bestX = Math.round((i + 0.5) * cellWidth);
        let bestVal = -1;
        for (let x = cellStart; x <= cellEnd; x++) {
          if (smoothed[x] > bestVal) {
            bestVal = smoothed[x];
            bestX = x;
          }
        }
        detectedPeaksX.push(bestX);
      }
    }

    const effectiveKnotsInWindow = Math.max(2, detectedPeaksX.length + manualOffset);
    const multiplierTo7Cm = 7 / windowCm;
    const rawRaj =
      customKnotsX === null && manualOffset === 0
        ? estimatedRajIn7Cm
        : Math.round(effectiveKnotsInWindow * multiplierTo7Cm);

    const exactRaj = Math.max(20, Math.min(85, rawRaj));
    const knotsPerCm = Number((exactRaj / 7).toFixed(1));
    const knotsPerSqm = Math.round(Math.pow((exactRaj / 7) * 100, 2));
    const kpsi = Math.round(Math.pow((exactRaj / 7) * 2.54, 2));
    const tierInfo = classifyRajTier(exactRaj, machineMadeShaneh);
    const activePattern = FRONT_PATTERN_STYLE_PROFILES[selectedPatternIdx];

    displayCtx.save();
    displayCtx.fillStyle = 'rgba(2, 6, 23, 0.44)';
    displayCtx.fillRect(0, 0, width, scanY - 46);
    displayCtx.fillRect(0, scanY + 46, width, height - (scanY + 46));

    displayCtx.strokeStyle = '#fbbf24';
    displayCtx.lineWidth = 3;
    displayCtx.strokeRect(startX, scanY - 44, regionWidth, 88);

    const totalTicks = windowCm === 1 ? 10 : 14;
    for (let t = 0; t <= totalTicks; t++) {
      const tx = startX + (t / totalTicks) * regionWidth;
      const isMajor = t % 2 === 0;
      displayCtx.beginPath();
      displayCtx.moveTo(tx, scanY - 44);
      displayCtx.lineTo(tx, scanY - 44 + (isMajor ? 14 : 8));
      displayCtx.strokeStyle = isMajor ? '#fbbf24' : '#fde68a';
      displayCtx.lineWidth = isMajor ? 2.5 : 1.2;
      displayCtx.stroke();
    }

    displayCtx.beginPath();
    displayCtx.moveTo(startX, scanY);
    displayCtx.lineTo(endX, scanY);
    displayCtx.strokeStyle = 'rgba(244, 63, 94, 0.85)';
    displayCtx.lineWidth = 2;
    displayCtx.stroke();

    detectedPeaksX.forEach((relX, idx) => {
      const absX = startX + relX;
      displayCtx.beginPath();
      displayCtx.arc(absX, scanY, 7.5, 0, Math.PI * 2);
      displayCtx.fillStyle = '#10b981';
      displayCtx.fill();
      displayCtx.lineWidth = 1.5;
      displayCtx.strokeStyle = '#ffffff';
      displayCtx.stroke();

      displayCtx.fillStyle = '#ffffff';
      displayCtx.font = 'bold 8px sans-serif';
      displayCtx.textAlign = 'center';
      displayCtx.textBaseline = 'middle';
      displayCtx.fillText(String(idx + 1), absX, scanY);
    });

    displayCtx.fillStyle = '#fef08a';
    displayCtx.font = 'bold 12px sans-serif';
    displayCtx.textAlign = 'left';
    displayCtx.fillText(
      `تخمین کولیس ۷ سانت: حدود ${exactRaj} رج (~${knotsPerCm} گره در سانتی‌متر)`,
      startX + 8,
      scanY - 54
    );
    displayCtx.restore();

    const waveCanvas = waveCanvasRef.current;
    if (waveCanvas) {
      const wCtx = waveCanvas.getContext('2d');
      if (wCtx) {
        const ww = waveCanvas.width;
        const wh = waveCanvas.height;
        wCtx.clearRect(0, 0, ww, wh);
        wCtx.fillStyle = '#0f172a';
        wCtx.fillRect(0, 0, ww, wh);

        wCtx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
        wCtx.lineWidth = 1;
        wCtx.beginPath();
        wCtx.moveTo(0, wh / 2);
        wCtx.lineTo(ww, wh / 2);
        wCtx.stroke();

        wCtx.beginPath();
        for (let x = 0; x < regionWidth; x++) {
          const px = (x / regionWidth) * ww;
          const norm = (smoothed[x] - minL) / dynamicRange;
          const py = wh - 12 - norm * (wh - 24);
          if (x === 0) wCtx.moveTo(px, py);
          else wCtx.lineTo(px, py);
        }
        wCtx.strokeStyle = '#38bdf8';
        wCtx.lineWidth = 2;
        wCtx.stroke();

        detectedPeaksX.forEach((relX) => {
          const px = (relX / regionWidth) * ww;
          const clampedX = Math.min(regionWidth - 1, Math.max(0, relX));
          const norm = (smoothed[clampedX] - minL) / dynamicRange;
          const py = wh - 12 - norm * (wh - 24);
          wCtx.beginPath();
          wCtx.arc(px, py, 4, 0, Math.PI * 2);
          wCtx.fillStyle = '#fbbf24';
          wCtx.fill();
        });
      }
    }

    setScanResult({
      knotsInWindow: effectiveKnotsInWindow,
      windowCm,
      exactRaj,
      commercialRajClass: tierInfo.commercialClass,
      knotsPerCm,
      knotsPerSqm,
      kpsi,
      qualityTierFa: tierInfo.tierFa,
      qualityTierEn: tierInfo.tierEn,
      detectedPeaksX,
      weaveRealismNoteFa: tierInfo.realismNoteFa,
      localTerminologyNoteFa: tierInfo.localTermFa,
      localTerminologyNoteEn: tierInfo.localTermEn,
      patternSimilarityEn: activePattern.primaryStyleEn,
      patternSimilarityFa: activePattern.primaryStyleFa,
      isMachineMadeMode: machineMadeShaneh !== null,
      machineShaneh: machineMadeShaneh ?? undefined
    });
  }, [
    windowCm,
    sensitivity,
    manualOffset,
    mode,
    selectedPresetId,
    customKnotsX,
    lockedTargetRaj,
    machineMadeShaneh,
    selectedPatternIdx
  ]);

  const drawPresetWeaveOnCanvas = useCallback(
    (preset: PresetWeaveSample) => {
      const cleanCanvas = getCleanBuffer();
      const ctx = cleanCanvas.getContext('2d');
      if (!ctx) return;

      const width = cleanCanvas.width;
      const height = cleanCanvas.height;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, width, height);

      const startX = Math.floor(width * 0.1);
      const endX = Math.floor(width * 0.9);
      const regionWidth = endX - startX;

      const activeRaj = lockedTargetRaj ?? preset.targetRaj;
      const expectedKnotsInWindow = Math.max(3, Math.round((activeRaj / 7) * windowCm));
      const knotPitchPx = regionWidth / expectedKnotsInWindow;
      const rowHeightPx = Math.max(10, Math.min(24, knotPitchPx * 0.85));

      for (let y = 0; y < height; y += rowHeightPx) {
        ctx.fillStyle = 'rgba(120, 113, 108, 0.35)';
        ctx.fillRect(0, y + rowHeightPx * 0.78, width, Math.max(2, rowHeightPx * 0.18));

        for (let i = -3; i < expectedKnotsInWindow + 4; i++) {
          const x = startX + i * knotPitchPx;
          const rowIdx = Math.round(y / rowHeightPx);
          const isHighlight = (i + rowIdx) % 3 === 0;

          const knotCenterX = x + knotPitchPx * 0.5;
          const knotWidth = Math.max(3, knotPitchPx * 0.72);
          const knotTop = y + rowHeightPx * 0.08;
          const knotH = rowHeightPx * 0.68;

          const grad = ctx.createLinearGradient(
            knotCenterX - knotWidth / 2,
            knotTop,
            knotCenterX + knotWidth / 2,
            knotTop
          );
          grad.addColorStop(0, '#292524');
          grad.addColorStop(0.5, isHighlight ? preset.weftColor : '#e7e5e4');
          grad.addColorStop(1, '#292524');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(knotCenterX - knotWidth / 2, knotTop, knotWidth, knotH, 3);
          ctx.fill();

          ctx.fillStyle = isHighlight ? preset.knotColorA : preset.knotColorB;
          ctx.globalAlpha = 0.28;
          ctx.fillRect(knotCenterX - knotWidth * 0.4, knotTop + 2, knotWidth * 0.8, knotH * 0.35);
          ctx.globalAlpha = 1;
        }
      }

      runOpticalKnotDetection();
    },
    [windowCm, lockedTargetRaj, runOpticalKnotDetection]
  );

  useEffect(() => {
    if (mode === 'preset') {
      const preset =
        PRESET_WEAVE_SAMPLES.find((p) => p.id === selectedPresetId) || PRESET_WEAVE_SAMPLES[3];
      drawPresetWeaveOnCanvas(preset);
    } else if (mode === 'upload' && uploadedImageRef.current) {
      const cleanCanvas = getCleanBuffer();
      const ctx = cleanCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, cleanCanvas.width, cleanCanvas.height);
        ctx.drawImage(uploadedImageRef.current, 0, 0, cleanCanvas.width, cleanCanvas.height);
        runOpticalKnotDetection();
      }
    } else {
      runOpticalKnotDetection();
    }
  }, [
    mode,
    selectedPresetId,
    windowCm,
    sensitivity,
    manualOffset,
    customKnotsX,
    lockedTargetRaj,
    machineMadeShaneh,
    selectedPatternIdx,
    drawPresetWeaveOnCanvas,
    runOpticalKnotDetection
  ]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !scanResult) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const clickX = (e.clientX - rect.left) * scaleX;

    const startX = Math.floor(canvas.width * 0.1);
    const endX = Math.floor(canvas.width * 0.9);
    if (clickX < startX || clickX > endX) return;

    sound.playClick();
    const relX = Math.round(clickX - startX);
    const currentList = customKnotsX !== null ? [...customKnotsX] : [...scanResult.detectedPeaksX];

    const existingIdx = currentList.findIndex((px) => Math.abs(px - relX) <= 12);
    if (existingIdx >= 0 && currentList.length > 2) {
      currentList.splice(existingIdx, 1);
    } else {
      currentList.push(relX);
    }
    setCustomKnotsX(currentList);
  };

  const startMobileCamera = async () => {
    sound.playClick();
    setCameraError(null);
    setMode('camera');
    setCustomKnotsX(null);
    stopCamera();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      streamRef.current = stream;
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setCameraError(
        'دسترسی مستقیم به دوربین زنده در این مرورگر محدود شده است. می‌توانید از دکمه «📸 عکس‌برداری با دوربین سیستم / گالری گوشی» استفاده کنید یا نمونه‌های آماده بازار را تست نمایید.'
      );
      setCameraActive(false);
    }
  };

  const toggleCameraTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (!track) return;
    try {
      const nextTorch = !torchOn;
      await (track as any).applyConstraints({
        advanced: [{ torch: nextTorch }]
      });
      setTorchOn(nextTorch);
    } catch {
      // Torch not supported on desktop/some devices
    }
  };

  const captureCameraFrameAndAnalyze = () => {
    sound.playCoin();
    const video = videoRef.current;
    const cleanCanvas = getCleanBuffer();
    if (!video || !cleanCanvas) return;
    const ctx = cleanCanvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, cleanCanvas.width, cleanCanvas.height);
    ctx.drawImage(video, 0, 0, cleanCanvas.width, cleanCanvas.height);
    stopCamera();
    setManualOffset(0);
    setCustomKnotsX(null);
    runOpticalKnotDetection();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    sound.playClick();
    stopCamera();
    setMode('upload');
    setManualOffset(0);
    setCustomKnotsX(null);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        uploadedImageRef.current = img;
        const cleanCanvas = getCleanBuffer();
        const ctx = cleanCanvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, cleanCanvas.width, cleanCanvas.height);
          ctx.drawImage(img, 0, 0, cleanCanvas.width, cleanCanvas.height);
          runOpticalKnotDetection();
        }
      };
      if (typeof ev.target?.result === 'string') {
        img.src = ev.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyToCertificate = () => {
    if (!scanResult) return;
    sound.playLevelUp();
    const summaryEn = `Estimated ~${scanResult.exactRaj} Raj (${scanResult.localTerminologyNoteEn}) • Pattern: ${scanResult.patternSimilarityEn}`;
    const summaryFa = `تراکم تقریبی: حدود ${scanResult.exactRaj} رج (${scanResult.localTerminologyNoteFa}) • طرح: ${scanResult.patternSimilarityFa}`;
    if (onApplyToCertificate) {
      onApplyToCertificate(summaryEn, summaryFa, scanResult);
    }
    setAppliedBadge(true);
    setTimeout(() => setAppliedBadge(false), 3000);
  };

  const currentPatternProfile = FRONT_PATTERN_STYLE_PROFILES[selectedPatternIdx];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white rounded-3xl p-5 sm:p-7 border-2 border-amber-400/70 shadow-2xl space-y-6">
      {/* =================================================================== */}
      {/* MANDATORY PRE-SCAN BILINGUAL DISCLAIMER (SECTION 11)                */}
      {/* =================================================================== */}
      <div
        role="alert"
        className="p-4 sm:p-5 rounded-2xl bg-amber-500/15 border-2 border-amber-400 text-amber-100 space-y-2 shadow-lg"
      >
        <div className="flex items-center gap-2 text-amber-300 font-black text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
          <span>⚠️ اطلاعیه و سلب مسئولیت مهم پیش از اسکن تصویری فرش (Important Analytical Disclaimer)</span>
        </div>
        <p className="text-xs sm:text-sm font-black text-white leading-relaxed">
          🇮🇷 «تصویر فرش به‌تنهایی نمی‌تواند محل بافت، اصالت یا ارزش فرش را به‌طور قطعی تعیین کند.»
        </p>
        <p className="text-xs sm:text-sm font-bold text-amber-200 leading-relaxed" dir="ltr">
          🇬🇧 "A photograph alone cannot conclusively determine a carpet's origin, authenticity, or value. The system provides analytical assistance, not professional certification."
        </p>
      </div>

      {/* Header Banner & Sub-Module Switcher (A. Front Pattern Similarity | B. Back-of-Carpet Density & Raj/Khaneh/Khofteh/La) */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-amber-400/30 pb-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-black">
            <Sparkles className="w-4 h-4" />
            <span>ماژول هوش بصری فرش دستباف (Carpet Intelligence Module) • به یاد شادروان حاج حسین آقای علی‌میری</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-amber-300 flex items-center gap-2">
            <Camera className="w-6 h-6 text-amber-400 shrink-0" />
            <span>تحلیل شباهت بصری طرح (روی فرش) + تخمین تراکم و رج‌شمار (پشت فرش: رج / خانه / خفته / لا)</span>
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setAnalysisTab('back_density');
            }}
            className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 transition-all ${
              analysisTab === 'back_density'
                ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-lg'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <Ruler className="w-4 h-4" />
            <span>🔬 ۱. تحلیل پشت فرش و تخمین تراکم (رج / خانه / خفته / لا)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setAnalysisTab('front_pattern');
            }}
            className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 transition-all ${
              analysisTab === 'front_pattern'
                ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-lg'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>🎨 ۲. تحلیل تصویر روی فرش (Closest Visual Pattern Similarities)</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SUB-MODULE A: FRONT PHOTO -> PATTERN SIMILARITY ANALYSIS (SEC 4)    */}
      {/* =================================================================== */}
      {analysisTab === 'front_pattern' && (
        <div className="space-y-5 bg-black/35 p-5 rounded-3xl border border-amber-400/40">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-base sm:text-lg font-black text-amber-300">
                🎨 تحلیل شباهت بصری نقشه و سبک روی فرش (Front Photo ➔ Pattern &amp; Style Visual Similarity)
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                عکس روی فرش را بارگذاری کنید یا یکی از الگوهای مرجع را انتخاب نمایید تا «نزدیک‌ترین شباهت‌های بصری (Closest visual similarities)» به دوزبان فارسی و انگلیسی گزارش شود.
              </p>
            </div>

            <label className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md">
              <Upload className="w-4 h-4" />
              <span>📸 بارگذاری / عکس‌برداری از روی فرش (Front Photo)</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFrontPatternUpload}
                className="hidden"
              />
            </label>
          </div>

          {frontImagePreview && (
            <div className="p-3 rounded-2xl bg-slate-900 border border-amber-400/40 flex flex-col sm:flex-row items-center gap-4">
              <img
                src={frontImagePreview}
                alt="Front of carpet preview"
                className="w-36 h-24 object-cover rounded-xl border border-amber-300"
              />
              <div className="text-xs space-y-1">
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-black inline-block">
                  ✓ تصویر روی فرش تحلیل شد (Visual Feature &amp; Palette Matching)
                </span>
                <p className="text-amber-200 font-bold">
                  نتیجه تحلیل به صورت «نزدیک‌ترین شباهت‌های بصری (Closest visual similarities)» بدون ادعای قطعی اصالت یا محل بافت استخراج گردید.
                </p>
              </div>
            </div>
          )}

          {/* Reference Style Selector Chips: 5 Iranian + 5 Non-Iranian World (Caucasus, Turkey, Pakistan, Afghanistan, Egypt) */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <span className="text-xs font-black text-amber-300 block">
                🇮🇷 الف) ۵ خانواده اصلی نقوش فرش ایران (Iranian Carpet Pattern Families):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                {[
                  { idx: 0, labelFa: '🇮🇷 سبک لچک‌ترنج کاشان', labelEn: 'Iran: Kashan-style' },
                  { idx: 1, labelFa: '🇮🇷 سبک ماهی و تبریز', labelEn: 'Iran: Tabriz / Mahi-style' },
                  { idx: 2, labelFa: '🇮🇷 سبک نائین و اصفهان', labelEn: 'Iran: Nain / Isfahan-style' },
                  { idx: 3, labelFa: '🇮🇷 سبک هندسی هریس و کُرد', labelEn: 'Iran: Heriz / Kurdish-style' },
                  { idx: 4, labelFa: '🇮🇷 سبک مشهد و خراسان', labelEn: 'Iran: Mashhad / Khorasan-style' }
                ].map((st) => (
                  <button
                    key={st.idx}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedPatternIdx(st.idx);
                    }}
                    className={`p-3 rounded-xl border text-right transition-all ${
                      selectedPatternIdx === st.idx
                        ? 'bg-amber-400 text-slate-950 border-amber-200 font-black shadow-md'
                        : 'bg-white/5 text-white border-white/15 hover:bg-white/10 font-bold'
                    }`}
                  >
                    <span className="text-xs block">{st.labelFa}</span>
                    <span className="text-[10px] opacity-80 block" dir="ltr">{st.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-black text-cyan-300 block">
                🌍 ب) تشخیص نقشه‌های غیرایرانی (قفقاز، ترکیه، پاکستان، افغانستان و مصر — Non-Iranian Regional Carpet Families):
              </span>
              <p className="text-[11px] text-slate-300">
                اگر نقشه فرش ایرانی نباشد، حتی در صورتی که شهر دقیق آن مشخص نشود، سیستم اعلام می‌کند که «این نقشه به نظر ایرانی نیست و شبیه نقشه فرش کدام کشور یا ناحیه است»:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                {[
                  { idx: 5, labelFa: '🏔️ ناحیه قفقاز (قزاق/شیروان/قره‌باغ)', labelEn: 'Caucasus (Kazak / Shirvan)' },
                  { idx: 6, labelFa: '🇹🇷 ترکیه (عوشاق / هرکه / قونیه)', labelEn: 'Turkey (Oushak / Hereke)' },
                  { idx: 7, labelFa: '🇵🇰 پاکستان (موری / بخارا / پیشاور)', labelEn: 'Pakistan (Bokhara / Mori)' },
                  { idx: 8, labelFa: '🇦🇫 افغانستان (خال‌محمدی / آقچه / بلخ)', labelEn: 'Afghanistan (Khal Mohammadi)' },
                  { idx: 9, labelFa: '🇪🇬 مصر (مملوکی قاهره / اسیوط)', labelEn: 'Egypt (Mamluk Cairo)' }
                ].map((st) => (
                  <button
                    key={st.idx}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedPatternIdx(st.idx);
                    }}
                    className={`p-3 rounded-xl border text-right transition-all ${
                      selectedPatternIdx === st.idx
                        ? 'bg-cyan-400 text-slate-950 border-cyan-200 font-black shadow-md'
                        : 'bg-cyan-950/40 text-cyan-100 border-cyan-400/30 hover:bg-cyan-900/50 font-bold'
                    }`}
                  >
                    <span className="text-xs block">{st.labelFa}</span>
                    <span className="text-[10px] opacity-80 block" dir="ltr">{st.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Non-Iranian Pattern Alert Banner when a foreign carpet family is active */}
          {currentPatternProfile.originGroup === 'non_iranian_world' && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/90 via-amber-950/90 to-slate-900 border-2 border-amber-400 space-y-1.5 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
                  🌍 تشخیص نقشه غیرایرانی ({currentPatternProfile.countryLabelFa})
                </span>
                <span className="text-xs font-black text-cyan-300" dir="ltr">
                  {currentPatternProfile.countryLabelEn}
                </span>
              </div>
              <p className="text-sm font-black text-amber-200">
                {currentPatternProfile.nonIranianAlertFa}
              </p>
              <p className="text-xs font-bold text-slate-200" dir="ltr">
                {currentPatternProfile.nonIranianAlertEn}
              </p>
            </div>
          )}

          {/* Bilingual Pattern Similarity Output Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-900 border border-amber-400/50 space-y-2">
              <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-xs inline-block">
                🇮🇷 گزارش فارسی: نزدیک‌ترین شباهت‌های بصری طرح
              </span>
              <p className="text-sm font-black text-amber-300">{currentPatternProfile.primaryStyleFa}</p>
              <p className="text-xs text-slate-200 leading-relaxed">{currentPatternProfile.secondaryStyleFa}</p>
              <p className="text-xs text-emerald-300 font-bold">{currentPatternProfile.visualFeaturesFa}</p>
              <p className="text-xs text-sky-300">{currentPatternProfile.localTerminologyFa}</p>
              <p className="text-[11px] text-amber-200/90 border-t border-white/10 pt-2">
                ⚠️ {currentPatternProfile.disclaimerFa}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-400/50 space-y-2" dir="ltr">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-400 text-slate-950 font-black text-xs inline-block">
                🇬🇧 English Report: Closest Visual Similarities
              </span>
              <p className="text-sm font-black text-cyan-300">{currentPatternProfile.primaryStyleEn}</p>
              <p className="text-xs text-slate-200 leading-relaxed">{currentPatternProfile.secondaryStyleEn}</p>
              <p className="text-xs text-emerald-300 font-bold">{currentPatternProfile.visualFeaturesEn}</p>
              <p className="text-xs text-sky-300">{currentPatternProfile.localTerminologyEn}</p>
              <p className="text-[11px] text-amber-200/90 border-t border-white/10 pt-2">
                ⚠️ Disclaimer: {currentPatternProfile.disclaimerEn}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUB-MODULE B: BACK-OF-CARPET VISUAL ANALYSIS & DENSITY (SEC 3 & 5)  */}
      {/* =================================================================== */}
      {analysisTab === 'back_density' && (
        <>
          {/* Mode Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={startMobileCamera}
              className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-2 transition-all ${
                mode === 'camera'
                  ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-lg'
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
              }`}
            >
              <Camera className="w-5 h-5" />
              <span>📸 ۱. اسکن زنده پشت فرش با دوربین موبایل</span>
            </button>

            <label
              className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-2 cursor-pointer transition-all ${
                mode === 'upload'
                  ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-lg'
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
              }`}
            >
              <Upload className="w-5 h-5" />
              <span>🖼️ ۲. عکس‌برداری ماکرو / انتخاب از گالری گوشی</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                stopCamera();
                setMode('preset');
                setManualOffset(0);
                setCustomKnotsX(null);
              }}
              className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-2 transition-all ${
                mode === 'preset'
                  ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-lg'
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
              }`}
            >
              <Eye className="w-5 h-5" />
              <span>🧶 ۳. مقایسه با ۶ نمونه بافت مرجع (۲۵ تا ۶۰ رج)</span>
            </button>
          </div>

          {/* Instant 1-Tap Calibration Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-amber-400/50 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-xs sm:text-sm font-black text-amber-300">
                  🎯 کالیبراسیون فاصلهٔ دوربین و مقایسه تقریبی رده‌های تراکم (رج / خانه / خفته / لا):
                </span>
              </div>
              <span className="text-[11px] text-emerald-300 font-bold">
                تخمین تقریبی تراکم در ۷ سانتی‌متر بدون فرمول‌های ساختگی
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setLockedTargetRaj(null);
                  setMachineMadeShaneh(null);
                  setManualOffset(0);
                  setCustomKnotsX(null);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-black border transition-all ${
                  lockedTargetRaj === null && machineMadeShaneh === null
                    ? 'bg-emerald-400 text-slate-950 border-emerald-200 shadow-md'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                }`}
              >
                🤖 تخمین خودکار نوری (۳۰ تا ۵۰ رج)
              </button>

              {[
                { raj: 25, label: '~۲۵ رج (درشت‌باف)' },
                { raj: 30, label: '~۳۰ رج (کاشان/مشهد)' },
                { raj: 35, label: '~۳۵ رج (تبریز/اراک)' },
                { raj: 40, label: '~۴۰ رج (تبریز/نائین ۹ لا)' },
                { raj: 45, label: '~۴۵ رج (ریزباف)' },
                { raj: 50, label: '~۵۰ رج (اصفهان/نائین ۶ لا)' },
                { raj: 60, label: '~۶۰ رج (چله ابریشم/۴ لا)' },
                { raj: 70, label: '~۷۰ رج (تمام ابریشم)' }
              ].map((item) => (
                <button
                  key={item.raj}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setLockedTargetRaj(item.raj);
                    setMachineMadeShaneh(null);
                    setManualOffset(0);
                    setCustomKnotsX(null);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-black border transition-all ${
                    lockedTargetRaj === item.raj && machineMadeShaneh === null
                      ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-md'
                      : 'bg-white/10 text-amber-100 border-white/15 hover:bg-white/20'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {[
                { shaneh: 700, equivRaj: 49, label: '🏭 ماشینی ۷۰۰ شانه' },
                { shaneh: 1200, equivRaj: 60, label: '🏭 ماشینی ۱۲۰۰ شانه' }
              ].map((m) => (
                <button
                  key={m.shaneh}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setLockedTargetRaj(m.equivRaj);
                    setMachineMadeShaneh(m.shaneh);
                    setManualOffset(0);
                    setCustomKnotsX(null);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-black border transition-all ${
                    machineMadeShaneh === m.shaneh
                      ? 'bg-cyan-400 text-slate-950 border-cyan-200 shadow-md'
                      : 'bg-cyan-950/60 text-cyan-200 border-cyan-400/30 hover:bg-cyan-900/60'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preset Selector Chips */}
          {mode === 'preset' && (
            <div className="space-y-2 bg-black/30 p-4 rounded-2xl border border-amber-400/30">
              <span className="text-xs font-bold text-amber-300 block">
                یک نمونه بافت مرجع را برای مشاهده شمارش تقریبی و اصطلاحات محلی (رج / خانه / خفته / لا) انتخاب کنید:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {PRESET_WEAVE_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedPresetId(sample.id);
                      setLockedTargetRaj(null);
                      setMachineMadeShaneh(null);
                      setManualOffset(0);
                      setCustomKnotsX(null);
                    }}
                    className={`p-3 rounded-xl text-right border transition-all ${
                      selectedPresetId === sample.id && lockedTargetRaj === null
                        ? 'bg-amber-400 text-slate-950 border-amber-200 font-black shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-amber-100 border-white/15 font-bold'
                    }`}
                  >
                    <div className="text-xs font-black">{sample.titleFa}</div>
                    <div
                      className={`text-[10px] mt-1 ${
                        selectedPresetId === sample.id && lockedTargetRaj === null
                          ? 'text-slate-800'
                          : 'text-amber-200/75'
                      }`}
                    >
                      {sample.originFa}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {cameraError && (
            <div className="p-4 rounded-2xl bg-rose-900/70 border border-rose-400 text-xs text-rose-100 flex flex-wrap items-center justify-between gap-3">
              <span>{cameraError}</span>
              <label className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black cursor-pointer shrink-0">
                📸 باز کردن دوربین بومی گوشی / گالری
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* Caliper Scale & Optical Sensitivity Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/5 p-4 rounded-2xl border border-white/15">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Ruler className="w-4 h-4" />
                <span>مقیاس کولیس خط‌کش روی تصویر (پیش‌فرض: ۷ سانت استاندارد):</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { val: 7 as const, label: '۷ سانت کامل (۱ رج)' },
                  { val: 3.5 as const, label: '۳.۵ سانت نیم‌رج (×۲)' },
                  { val: 1 as const, label: '۱ سانت ماکرو (×۷)' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setWindowCm(opt.val);
                      setManualOffset(0);
                      setCustomKnotsX(null);
                    }}
                    className={`py-2 px-2 rounded-xl text-[11px] font-black border ${
                      windowCm === opt.val
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : 'bg-black/40 text-slate-200 border-white/15'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  <span>تنظیم ظرافت بافت (درشت‌باف ⬅️ ریزباف):</span>
                </span>
                <span className="font-mono text-amber-400">{sensitivity}%</span>
              </label>
              <input
                type="range"
                min={20}
                max={90}
                value={sensitivity}
                onChange={(e) => {
                  setCustomKnotsX(null);
                  setLockedTargetRaj(null);
                  setSensitivity(Number(e.target.value));
                }}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-300 block">
                کالیبراسیون دستی توافقی (±۱ گره):
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setManualOffset((prev) => prev - 1);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-rose-800/80 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-1"
                >
                  <Minus className="w-4 h-4" />
                  <span>کسر ۱ گره</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setManualOffset(0);
                    setCustomKnotsX(null);
                  }}
                  className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 font-bold text-xs"
                  title="بازنشانی شمارش"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setManualOffset((prev) => prev + 1);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن ۱ گره</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Camera Viewfinder + Optical Canvas Analyzer */}
          <div className="space-y-3">
            {cameraActive && (
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400 bg-black">
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                  <div className="w-4/5 h-24 border-2 border-amber-400 bg-amber-400/10 rounded-lg relative flex items-center">
                    <div className="w-full h-0.5 bg-rose-500 shadow-sm" />
                    <span className="absolute -top-6 right-0 bg-slate-950/90 text-amber-300 text-[11px] font-black px-2.5 py-0.5 rounded-md border border-amber-400/40">
                      ردیف گره‌های پشت فرش را روی خط قرمز وسط کادر تنظیم کنید ({windowCm} سانتی‌متر)
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/90 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={captureCameraFrameAndAnalyze}
                    className="flex-1 py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Camera className="w-5 h-5" />
                    <span>📸 ثبت تصویر پشت فرش و تخمین تقریبی رج</span>
                  </button>
                  <button
                    type="button"
                    onClick={toggleCameraTorch}
                    className="py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-amber-300 font-bold text-xs flex items-center gap-1.5"
                  >
                    <Flashlight className="w-4 h-4" />
                    <span>چراغ‌قوه حجره</span>
                  </button>
                </div>
              </div>
            )}

            <div className="rounded-2xl overflow-hidden border-2 border-amber-400/60 bg-slate-950 p-3 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-black text-amber-300 flex items-center gap-1.5">
                  <MousePointerClick className="w-4 h-4 text-emerald-400" />
                  <span>🔬 تصویر تحلیل‌شده پشت قالی (با کلیک روی خط قرمز می‌توانید نشانگر گره را اصلاح کنید):</span>
                </span>
                <span className="text-emerald-300 font-bold">
                  {scanResult
                    ? `تخمین تقریبی: ~${scanResult.exactRaj} رج در ۷ سانتی‌متر (Estimated ~${scanResult.exactRaj} Raj)`
                    : 'در حال تحلیل...'}
                </span>
              </div>

              <canvas
                ref={canvasRef}
                width={760}
                height={220}
                onClick={handleCanvasClick}
                title="برای افزودن یا حذف دستی نشانگر گره روی خط قرمز کلیک کنید"
                className="w-full h-44 sm:h-56 rounded-xl border border-amber-500/40 object-cover bg-slate-900 cursor-crosshair"
              />

              <div className="space-y-1 pt-1">
                <span className="text-[11px] text-sky-300 font-bold block">
                  📈 نمودار سیگنال نوری بازتاب گره‌ها (تحلیل کمک‌کارشناسی — بدون ادعای گواهی قطعی از روی عکس):
                </span>
                <canvas
                  ref={waveCanvasRef}
                  width={760}
                  height={68}
                  className="w-full h-16 rounded-xl border border-sky-500/30 bg-slate-950"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* =================================================================== */}
      {/* BILINGUAL ANALYTICAL SUMMARY & LOCAL TERMINOLOGY (RAJ/KHANEH/KHOFTEH/LA) */}
      {/* =================================================================== */}
      {scanResult && (
        <div className="bg-black/45 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-400/30 pb-3">
            <div>
              <span className="text-xs font-bold text-amber-300 block">
                📊 گزارش تحلیلی دوزبانه تراکم و اصطلاحات محلی بافت (Analytical Density &amp; Local Terminology):
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {scanResult.isMachineMadeMode
                  ? `فرش ماشینی ${scanResult.machineShaneh} شانه`
                  : `Estimated ~${scanResult.exactRaj} Raj (تخمین تقریبی: حدود ${scanResult.exactRaj} رج)`}{' '}
                — <span className="text-amber-400">{scanResult.commercialRajClass}</span>
              </h4>
              <p className="text-xs text-emerald-300 font-bold mt-1">
                ✓ {scanResult.localTerminologyNoteFa}
              </p>
              <p className="text-xs text-cyan-300 font-bold mt-0.5" dir="ltr">
                ✓ {scanResult.localTerminologyNoteEn}
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-200 text-xs font-black">
              Analytical Assistance Only
            </span>
          </div>

          {/* Local Terminology Reference Box (Raj / Khaneh / Khofteh / La) without inventing formulas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-400/30 space-y-1">
              <span className="font-black text-amber-300 block">۱. رج (Raj — تبریز، قم، تهران):</span>
              <p className="text-slate-200 leading-relaxed">
                تعداد گره‌ها در عرض تقریبی <strong>۷ سانتی‌متر</strong> (یک گره ذرع). تخمین فعلی: <strong>حدود {scanResult.exactRaj} رج</strong>.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-400/30 space-y-1">
              <span className="font-black text-amber-300 block">۲. خانه (Khaneh — کاشان، اصفهان):</span>
              <p className="text-slate-200 leading-relaxed">
                واحد سنتی شمارش گره در کاشان، اصفهان و کرمان بر پایه تقسیمات «گره ذرع» در سنت نقشهخوانی محلی.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-400/30 space-y-1">
              <span className="font-black text-amber-300 block">۳. خفته (Khofteh — مشهد و خراسان):</span>
              <p className="text-slate-200 leading-relaxed">
                واحد سنتی تراکم بافت در خراسان و مشهد (مانند بافت‌های ۳۰ خفته یا ۳۵ خفته در کارگاه‌های خراسان).
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-400/30 space-y-1">
              <span className="font-black text-amber-300 block">۴. لا (La — نائین: ۹ لا، ۶ لا، ۴ لا):</span>
              <p className="text-slate-200 leading-relaxed">
                تعداد رشته‌های ظریف تابیده در نخ چله نائین؛ هرچه عدد «لا» کمتر باشد (۹ لا ⬅️ ۶ لا ⬅️ ۴ لا) بافت ظریف‌تر است.
              </p>
            </div>
          </div>

          {/* 5-Language Audio Announcement */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-200 block">
              🔊 قرائت صوتی گزارش تحلیلی دوزبانه و ۵ زبانه:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              <button
                type="button"
                onClick={() =>
                  speakPersian(
                    `گزارش تحلیلی فرش: تراکم تقریبی حدود ${scanResult.exactRaj} رج در هفت سانتی‌متر. توجه: تصویر فرش به‌تنهایی نمی‌تواند محل بافت، اصالت یا ارزش فرش را به‌طور قطعی تعیین کند.`,
                    0.88
                  )
                }
                className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🇮🇷 قرائت فارسی</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  speakEnglish(
                    `Analytical carpet report: Pattern shows ${currentPatternProfile.primaryStyleEn}. Approximate density is estimated at ${scanResult.exactRaj} Raj. Disclaimer: A photograph alone cannot conclusively determine a carpet's origin, authenticity, or value.`,
                    0.88
                  )
                }
                className="py-2.5 px-3 rounded-xl bg-rose-800 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🇬🇧 English Report</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  speakArabic(
                    `التقرير التحليلي للسجادة: الكثافة التقريبية حوالي ${scanResult.exactRaj} رج في كل سبعة سنتيمترات. تنبيه: الصورة وحدها لا تحدد مصدر السجادة أو أصالتها بشكل قاطع.`,
                    0.85
                  )
                }
                className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🇸🇦 التقرير بالعربية</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  speakChinese(
                    `地毯分析报告：估计密度约为每7厘米 ${scanResult.exactRaj} Raj。照片本身不能完全确定地毯的产地或真伪。`,
                    0.85
                  )
                }
                className="py-2.5 px-3 rounded-xl bg-red-700 hover:bg-red-600 text-white font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🇨🇳 中文播报</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  speakRussian(
                    `Аналитический отчет: ориентировочная плотность около ${scanResult.exactRaj} Радж на 7 сантиметров. Фотография сама по себе не определяет точное происхождение ковра.`,
                    0.85
                  )
                }
                className="py-2.5 px-3 rounded-xl bg-indigo-800 hover:bg-indigo-700 text-white font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🇷🇺 По-русски</span>
              </button>
            </div>
          </div>

          {onApplyToCertificate && (
            <button
              type="button"
              onClick={handleApplyToCertificate}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              {appliedBadge ? <CheckCircle2 className="w-5 h-5 text-emerald-800" /> : <Award className="w-5 h-5" />}
              <span>
                {appliedBadge
                  ? `✅ نتیجه تحلیل تقریبی (~${scanResult.exactRaj} رج) به گزارش دوزبانه منتقل شد!`
                  : `📋 انتقال نتیجه تحلیل (~${scanResult.exactRaj} رج + شباهت طرح) به گزارش دوزبانه فرش (Bilingual Report)`}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
