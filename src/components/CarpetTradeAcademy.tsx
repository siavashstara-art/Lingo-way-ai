import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Award,
  Ruler,
  BookOpen,
  MessageSquare,
  CheckCircle2,
  Search,
  Copy,
  Check,
  Store,
  Heart,
  Mic,
  MicOff,
  Send,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  CARPET_TERMINOLOGY_DB,
  CARPET_MERCHANT_DIALOGUES,
  CARPET_NEGOTIATION_QUIZZES,
  CarpetTermItem
} from '../data/carpetTradeData';
import {
  sound,
  speakEnglish,
  speakPersian,
  speakArabic,
  transliteratePersianToFingilish
} from '../utils/audio';

interface CarpetTradeAcademyProps {
  onEarnLingous: (amount: number, reason: string) => void;
  speechVoiceRate?: number;
}

interface ShowroomChatMessage {
  id: string;
  sender: 'merchant_fa' | 'buyer_foreign';
  originalText: string;
  translatedEn: string;
  translatedAr?: string;
  translatedFa?: string;
  pronunciation: string;
  bazaarNote?: string;
  timestamp: string;
}

const STANDARD_CARPET_DIMENSIONS = [
  { nameFa: 'پشتی (Poshti)', zar: 'نیم ذرع', metric: '60 × 90 cm', imperial: "2'0\" × 3'0\" ft", arabic: 'بشتي (٦٠×٩٠ سم)', useFa: 'پادری لوکس، روکش پشتی سنتی' },
  { nameFa: 'ذرع و چارک (Zar-o-Charak)', zar: '۱.۲۵ ذرع', metric: '80 × 125 cm', imperial: "2'7\" × 4'1\" ft", arabic: 'ذرع وربع (٨٠×١٢٥ سم)', useFa: 'ورودی، تابلوفرش یا پای مبل' },
  { nameFa: 'ذرع و نیم (Zar-o-Nim)', zar: '۱.۵ ذرع', metric: '105 × 155 cm', imperial: "3'5\" × 5'1\" ft", arabic: 'ذرع ونصف (١٠٥×١٥٥ سم)', useFa: 'قالیچه محبوب دکوراتیو و کلکسیونی' },
  { nameFa: 'دو ذرع / قالیچه (Dozar)', zar: '۲ ذرع', metric: '135 × 205 cm', imperial: "4'5\" × 6'7\" ft", arabic: 'دوزرع / قاليجه (١٣٥×٢٠٥ سم)', useFa: 'پرفروش‌ترین سایز قالیچه صادراتی جهان' },
  { nameFa: 'پرده‌ای (Pardeh-i)', zar: '۲.۵ ذرع', metric: '150 × 250 cm', imperial: "5'0\" × 8'2\" ft", arabic: 'برده إي (١٥٠×٢٥٠ سم)', useFa: 'سالن‌های متوسط و اتاق مطالعه' },
  { nameFa: 'قالی ۶ متری (6-Meter / Seh-Zar)', zar: '۳ ذرع', metric: '200 × 300 cm', imperial: "6'7\" × 9'10\" ft", arabic: 'قالي ٦ أمتار (٢٠٠×٣٠٠ سم)', useFa: 'استاندارد اصلی پذیرایی و نشیمن' },
  { nameFa: 'قالی ۹ متری (9-Meter)', zar: '۳.۵ در ۲.۵ ذرع', metric: '250 × 350 cm', imperial: "8'2\" × 11'6\" ft", arabic: 'قالي ٩ أمتار (٢٥٠×٣٥٠ سم)', useFa: 'تالارها و سالن‌های پذیرایی بزرگ' },
  { nameFa: 'قالی ۱۲ متری (12-Meter / Chahar-Zar)', zar: '۴ ذرع', metric: '300 × 400 cm', imperial: "9'10\" × 13'1\" ft", arabic: 'قالي ١٢ متراً (٣٠٠×٤٠٠ سم)', useFa: 'قصرها، مجالس بزرگ و لابی‌های مجلل' },
  { nameFa: 'کناره (Kenareh / Runner)', zar: 'عرض ۰.۸ تا ۱.۲ ذرع', metric: '80–120 × 250–600 cm', imperial: "2'7\"–4' × 8'–20' ft", arabic: 'كناره / ممر طويل', useFa: 'راهروها، پله‌ها و ورودی‌های کشیده' },
  { nameFa: 'فرش مربع (Morabba / Square)', zar: '۲×۲ یا ۳×۳ ذرع', metric: '200×200 / 300×300 cm', imperial: "6'7\"×6'7\" or 10'×10' ft", arabic: 'سجادة مربعة (٢×٢ أو ٣×٣ م)', useFa: 'زیر میز ناهارخوری گرد یا مربعی و اتاق‌های متقارن' }
];

// Specialized Offline Carpet Trade Compositional Dictionary (Merchant <-> Foreign Buyer)
const CARPET_MERCHANT_FA_TO_EN_AR: Array<{
  keywords: string[];
  en: string;
  ar: string;
  pronEn: string;
  noteFa: string;
}> = [
  {
    keywords: ['خوش آمدید', 'بفرمایید', 'چای'],
    en: 'Welcome to our carpet showroom! Please have a seat and enjoy fresh saffron tea while we unroll the carpets for you.',
    ar: 'أهلاً وسهلاً بكم في معرض السجاد الإيراني! تفضّلوا بالجلوس لشرب الشاي بالزعفران بينما نفرش لكم السجاد.',
    pronEn: 'wel-kum too owr kar-pet show-room! pleez hav ah seet and en-joy saf-ron tee',
    noteFa: 'خوش‌آمدگویی سنتی حجره فرش'
  },
  {
    keywords: ['کهنه ذاتی'],
    en: 'This rug is 100% "Kohneh Zaati"—meaning it has an authentic, naturally aged patina mellowed organically over decades, with zero chemical washing.',
    ar: 'هذه السجادة «كهنه ذاتي» أي معتّقة طبيعياً بمرور السنين والاستخدام الأصيل بدون أي غسيل كيميائي.',
    pronEn: 'this rug iz koh-neh zaa-tee — aw-then-tik nach-ur-uh-lee aydjd puh-tee-nuh',
    noteFa: 'توضیح تخصصی «کهنه ذاتی» در برابر کهنه‌شویی شیمیایی'
  },
  {
    keywords: ['دو ذرع', 'دوزرع'],
    en: 'This Ghalicheh is a classic "Dozar" size, measuring 200 by 135 centimeters (4 foot 5 inches by 6 foot 7 inches).',
    ar: 'هذه القاليجه بمقاس «دوزرع» الكلاسيكي، وأبعادها ٢٠٠ في ١٣٥ سنتيمتراً (٤.٥ في ٦.٧ قدم).',
    pronEn: 'this iz ah doh-zar syze, 200 bye 135 sen-ti-mee-terz (4.5 bye 6.7 feet)',
    noteFa: 'معادل دقیق سایز دو ذرع به سانتی‌متر و فوت'
  },
  {
    keywords: ['ذرع و نیم', 'زرع و نیم'],
    en: 'This piece is a "Zar-o-Nim" area rug, measuring 150 by 105 centimeters (approximately 3.5 by 5 feet).',
    ar: 'هذه القطعة بمقاس «ذرع ونصف»، وأبعادها ١٥٠ في ١٠٥ سنتيمتر (٣.٥ في ٥ قدم).',
    pronEn: 'this iz ah zar-oh-neem rug, 150 bye 105 sen-ti-mee-terz (3.5 bye 5 feet)',
    noteFa: 'معادل دقیق سایز ذرع و نیم به متر و فوت'
  },
  {
    keywords: ['ذرع و چارک', 'زرع و چارک', 'چارک'],
    en: 'This rug is a "Zar-o-Charak" size, measuring 125 by 80 centimeters (2 foot 7 inches by 4 foot 1 inch).',
    ar: 'هذه السجادة بمقاس «ذرع وربع»، وأبعادها ١٢٥ في ٨٠ سنتيمتراً (٢.٧ في ٤.١ قدم).',
    pronEn: 'this iz ah zar-oh-cha-rak syze, 125 bye 80 sen-ti-mee-terz',
    noteFa: 'معادل دقیق سایز ذرع و چارک'
  },
  {
    keywords: ['گلیم'],
    en: 'This is a 100% handwoven flat-weave Persian Kilim (pileless tribal tapestry), reversible and dyed with natural plants.',
    ar: 'هذا كليم إيراني أصيل منسوج يدوياً بدون وبر (مسطح)، قابل للاستخدام على الوجهين وبأصباغ نباتية.',
    pronEn: 'this iz ah hand-woh-ven flat-weev per-zhen kee-leem',
    noteFa: 'معرفی تخصصی گلیم دستباف دوطرفه'
  },
  {
    keywords: ['پشتی'],
    en: 'This is a traditional hand-knotted Persian "Poshti" (90 by 60 cm / 2 by 3 feet), used as a bolster cushion or luxury accent mat.',
    ar: 'هذا «بشتي» إيراني تقليدي منسوج يدوياً (٩٠×٦٠ سم)، يستخدم كمسند فاخر للمجالس أو سجادة مدخل.',
    pronEn: 'this iz ah hand-not-ed per-zhen posh-tee (2 bye 3 feet)',
    noteFa: 'معرفی تخصصی پشتی دستباف'
  },
  {
    keywords: ['مربع', 'گرد', 'کناره'],
    en: 'We have custom Square rugs (Morabba), Round medallion rugs, and long hallway Runners (Kenareh) woven on specialized looms.',
    ar: 'لدينا سجاد مربع (مربع)، وسجاد دائري، وسجاد ممرات طويلة (كناره) منسوجة على أنوال خاصة.',
    pronEn: 'wee hav skwair rugz, rownd rugz, and long hawl-way run-erz (ke-na-reh)',
    noteFa: 'معرفی فرش مربع، گرد و کناره'
  },
  {
    keywords: ['نوبافت'],
    en: 'This carpet is "Now-baft"—newly woven and unwalked straight off the master weaver’s loom, in pristine condition.',
    ar: 'هذه السجادة «نوبافت» أي حديثة النسيج وجديدة تماماً من النول ولم تُفرش من قبل.',
    pronEn: 'this kar-pet iz now-baft — noo-lee woh-ven strayt off theh loom',
    noteFa: 'توضیح فرش نوبافت (آکبند)'
  },
  {
    keywords: ['کارکرده'],
    en: 'This is a gently pre-owned vintage carpet in excellent full-pile condition—professionally washed and ready for immediate use.',
    ar: 'هذه سجادة مستعملة بحالة ممتازة ووبر كامل، مغسولة ومعقمة وجاهزة للفرش.',
    pronEn: 'this iz ah pree-ohnd vin-tij kar-pet inool-pyle kun-dish-un',
    noteFa: 'توضیح فرش کارکرده سالم و گوشت‌دار'
  },
  {
    keywords: ['قدیمی', 'عتیقه', 'آنتیک'],
    en: 'This is a rare semi-antique / antique collector’s piece with investment value and historic natural dyes.',
    ar: 'هذه سجادة قديمة وأثرية نادرة (أنتيك) ذات قيمة استثمارية عالية وأصباغ تاريخية.',
    pronEn: 'this iz ah rayr an-teek kuh-lek-terz pees with in-vest-ment val-yoo',
    noteFa: 'توضیح فرش قدیمی و عتیقه کلکسیونی'
  },
  {
    keywords: ['رج', 'رجشمار', 'رج‌شمار'],
    en: 'The knot density is very high (50 to 70 Raj—meaning 50 to 70 knots per 7 centimeters, over 550 knots per square inch).',
    ar: 'كثافة العقد عالية جداً (من ٥٠ إلى ٧٠ رج، أي ٥٠ إلى ٧٠ عقدة في كل ٧ سنتيمترات).',
    pronEn: 'theh not den-si-tee iz फिफ्टी too sev-en-tee raj (over 550 nots per skwair inch)',
    noteFa: 'توضیح رج‌شمار و تراکم گره به استاندارد جهانی'
  },
  {
    keywords: ['ابریشم', 'چله', 'کرک'],
    en: 'It is woven on a 100% pure silk foundation (Chelleh Abrisham) with hand-spun Kork lambswool and luminous silk highlights.',
    ar: 'منسوجة على أساس (سدى) من الحرير الخالص مع صوف الكرك الناعم ولمسات الحرير الطبيعي المضيئة.',
    pronEn: 'woh-ven on ah pyoor silk fown-day-shun with kork wool and silk hye-lytes',
    noteFa: 'توضیح چله ابریشم، گل ابریشم و پشم کرک'
  },
  {
    keywords: ['رنگ گیاهی', 'گیاهی', 'روناس', 'گردو'],
    en: 'All colors are 100% natural vegetable dyes extracted from madder root, walnut husk, pomegranate skin, and indigo.',
    ar: 'جميع الألوان نباتية طبيعية ١٠٠٪ مستخلصة من جذور الفوة وقشر الجوز والرمان والنيلة.',
    pronEn: 'awl kul-erz ar nach-ur-ul vej-tuh-bul dyez frum mad-er root and wol-nut',
    noteFa: 'توضیح رنگ‌های ۱۰۰٪ گیاهی و طبیعی'
  },
  {
    keywords: ['تخفیف', 'قیمت', 'چند', 'دلار', 'قابل نداره'],
    en: 'It is unworthy of your honor ("Ghabel nadareh")! For you as a valued collector, I will give a special showroom discount so it brings blessing to your home.',
    ar: 'مقدّمة لكم ولا تغلى عليكم! وتقديراً لذوقكم الرفيع سأقدم لكم خصماً خاصاً من المعرض مباركاً لمنزلكم.',
    pronEn: 'for yoo eye wil giv ah spesh-ul show-room dis-kownt',
    noteFa: 'پاسخ محترمانه قیمت و تخفیف پای معامله'
  },
  {
    keywords: ['شناسنامه', 'ارسال', 'پست', 'هوایی', 'گمرک', 'وکیوم'],
    en: 'We provide an official signed Certificate of Authenticity, and we can vacuum-pack it for your flight or ship it insured via DHL/Air Cargo directly to your home address.',
    ar: 'نقدم شهادة أصالة ومنشأ رسمية، ويمكننا تغليفها حرارياً للطائرة أو شحنها جوياً مع التأمين الشامل حتى باب منزلكم.',
    pronEn: 'wee pro-vyde ah ser-tif-i-kut ov aw-then-tis-i-tee and ship in-shoord too yoor hohm',
    noteFa: 'توضیح صدور شناسنامه اصالت، بسته‌بندی چمدانی و کارگو هوایی'
  }
];

const CARPET_BUYER_FOREIGN_TO_FA: Array<{
  keywords: string[];
  fa: string;
  enEcho: string;
  pronFa: string;
}> = [
  {
    keywords: ['how much', 'price', 'cost', 'dollar', 'euro', 'کم السعر', 'بكم', 'سعر'],
    fa: 'مشتری می‌پرسد: «قیمت این فرش چقدر است و به دلار/یورو چند حساب می‌کنید؟»',
    enEcho: 'Customer asks: What is the price of this carpet?',
    pronFa: 'Gheymate in farsh cheghadr ast?'
  },
  {
    keywords: ['discount', 'best price', 'cheaper', 'two rugs', 'خصم', 'نهائي'],
    fa: 'مشتری می‌پرسد: «اگر نقد یا دو تخته بخریم، بهترین قیمت و تخفیف پای معامله شما چقدر است؟»',
    enEcho: 'Customer asks: What is your best merchant price with a discount?',
    pronFa: 'Behtarin gheymat va takhfife shoma cheghadr ast?'
  },
  {
    keywords: ['size', 'dimension', 'feet', 'meter', 'how big', 'مقاس', 'ابعاد', 'كم متر'],
    fa: 'مشتری می‌پرسد: «ابعاد دقیق این فرش به متر و فوت چقدر است؟ (ذرع و نیم است یا دو ذرع یا بزرگ‌تر؟)»',
    enEcho: 'Customer asks: What are the exact dimensions in feet and meters?',
    pronFa: 'Ab-aade daghighe in farsh cheghadr ast?'
  },
  {
    keywords: ['old', 'age', 'antique', 'vintage', 'naturally aged', 'chemical', 'قديم', 'معتق', 'عمر'],
    fa: 'مشتری می‌پرسد: «قدمت این فرش چند سال است؟ آیا واقعاً کهنه ذاتی و طبیعی است یا کهنه‌شویی شیمیایی شده؟»',
    enEcho: 'Customer asks: How old is this rug, and is it naturally aged (Kohneh Zaati)?',
    pronFa: 'Ghedmate in farsh chand saal ast va aya kohneh zaati ast?'
  },
  {
    keywords: ['silk', 'wool', 'material', 'camel', 'foundation', 'warp', 'حرير', 'صوف'],
    fa: 'مشتری می‌پرسد: «جنس پرز و چله (تار و پود) این فرش چیست؟ ابریشم خالص است یا پشم کرک؟»',
    enEcho: 'Customer asks: Is the foundation and pile pure silk or Kork wool?',
    pronFa: 'Jense cheleh va porze in farsh chist? Abrisham ya pashm?'
  },
  {
    keywords: ['color', 'dye', 'vegetable', 'natural', 'synthetic', 'wash', 'الوان', 'نباتي'],
    fa: 'مشتری می‌پرسد: «آیا رنگ‌های این فرش ۱۰۰٪ گیاهی و طبیعی است و در شست‌وشو رنگ پس نمی‌دهد؟»',
    enEcho: 'Customer asks: Are the dyes 100% natural vegetable dyes and colorfast?',
    pronFa: 'Aya rang-haye in farsh sad-dar-sad giyahi va sabet ast?'
  },
  {
    keywords: ['ship', 'shipping', 'cargo', 'flight', 'luggage', 'customs', 'certificate', 'شحن', 'شهادة', 'مطار'],
    fa: 'مشتری می‌پرسد: «چطور می‌توانیم این فرش را با پرواز ببریم یا به کشورمان ارسال (کارگو) کنید؟ آیا شناسنامه اصالت می‌دهید؟»',
    enEcho: 'Customer asks: Can you ship this internationally and provide a Certificate of Authenticity?',
    pronFa: 'Chetor mitavanim in farsh ra ersal konim va aya shenasnameh midahid?'
  },
  {
    keywords: ['city', 'where made', 'tribal', 'tabriz', 'isfahan', 'kashan', 'qom', 'nain', 'shiraz', 'من اين', 'تبريز', 'اصفهان', 'قم'],
    fa: 'مشتری می‌پرسد: «این فرش بافت کدام شهر یا ایل ایران است (تبریز، اصفهان، قم، کاشان، نائین، قشقایی یا بختیاری) و چند رج است؟»',
    enEcho: 'Customer asks: Which Iranian city or tribe wove this rug, and what is the knot density?',
    pronFa: 'In farsh baafte kodaam shahr ast va chand raj ast?'
  }
];

export const CarpetTradeAcademy: React.FC<CarpetTradeAcademyProps> = ({
  onEarnLingous,
  speechVoiceRate = 0.85
}) => {
  // Default to the Live Carpet Showroom Voice & Chat Interpreter!
  const [activeTab, setActiveTab] = useState<'showroom_interpreter' | 'lexicon' | 'dimensions' | 'dialogues' | 'simulator'>('showroom_interpreter');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [completedQuizIds, setCompletedQuizIds] = useState<string[]>([]);

  // Showroom Live Interpreter State
  const [merchantFaInput, setMerchantFaInput] = useState<string>('');
  const [buyerForeignInput, setBuyerForeignInput] = useState<string>('');
  const [targetBuyerLang, setTargetBuyerLang] = useState<'en' | 'ar' | 'both'>('both');
  const [autoSpeakShowroom, setAutoSpeakShowroom] = useState<boolean>(true);
  const [listeningRole, setListeningRole] = useState<'merchant_fa' | 'buyer_en' | 'buyer_ar' | null>(null);
  const [micAlert, setMicAlert] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [showroomMessages, setShowroomMessages] = useState<ShowroomChatMessage[]>([
    {
      id: 'init_carpet_1',
      sender: 'merchant_fa',
      originalText: 'به حجره فرش ما خوش آمدید! این قالیچه دو ذرع، صد در صد کهنه ذاتی، رنگ گیاهی و چله ابریشم است.',
      translatedEn: 'Welcome to our carpet showroom! This Dozar Ghalicheh (200×135 cm / 4.5×6.7 ft) has a 100% authentic naturally aged patina (Kohneh Zaati), pure vegetable dyes, and a silk foundation.',
      translatedAr: 'أهلاً بكم في معرض السجاد! هذه القاليجه مقاس دوزرع (٢٠٠×١٣٥ سم)، معتّقة طبيعياً (كهنه ذاتي) ١٠٠٪، بأصباغ نباتية وأساس من الحرير.',
      pronunciation: 'wel-kum! this doh-zar rug iz koh-neh zaa-tee with vej-tuh-bul dyez and silk fown-day-shun.',
      bazaarNote: 'پرزنت کامل سایز دو ذرع + کهنه ذاتی + رنگ گیاهی به انگلیسی و عربی',
      timestamp: 'آماده مکالمه حضوری'
    }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [showroomMessages]);

  const handleCopy = (text: string, id: string) => {
    sound.playCoin();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Offline & Hybrid Specialized Carpet Translator for Merchant (FA -> EN & AR)
  const translateMerchantFaToForeign = async (faText: string): Promise<{
    en: string;
    ar: string;
    pron: string;
    note?: string;
  }> => {
    const trimmed = faText.trim();
    if (!trimmed) return { en: '', ar: '', pron: '' };

    // 1. Check multi-chunk specialized carpet trade dictionary
    const matchedEn: string[] = [];
    const matchedAr: string[] = [];
    const matchedPron: string[] = [];
    const matchedNotes: string[] = [];

    for (const entry of CARPET_MERCHANT_FA_TO_EN_AR) {
      if (entry.keywords.some(kw => trimmed.includes(kw))) {
        matchedEn.push(entry.en);
        matchedAr.push(entry.ar);
        matchedPron.push(entry.pronEn);
        matchedNotes.push(entry.noteFa);
      }
    }

    if (matchedEn.length > 0) {
      return {
        en: matchedEn.join(' '),
        ar: matchedAr.join(' '),
        pron: matchedPron.join(' | '),
        note: matchedNotes.join(' • ')
      };
    }

    // 2. Check CARPET_TERMINOLOGY_DB direct match
    const termMatch = CARPET_TERMINOLOGY_DB.find(
      t => trimmed.includes(t.termFa.split(' ')[0]) || t.termFa.includes(trimmed)
    );
    if (termMatch) {
      return {
        en: termMatch.merchantPitchEn,
        ar: termMatch.merchantPitchAr,
        pron: termMatch.pronunciationEn,
        note: termMatch.technicalNoteFa
      };
    }

    // 3. Try neural translation if online, otherwise phonetic offline fallback
    try {
      const [resEn, resAr] = await Promise.all([
        fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=fa&tl=en&dt=t&q=${encodeURIComponent(trimmed)}`),
        fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=fa&tl=ar&dt=t&q=${encodeURIComponent(trimmed)}`)
      ]);
      if (resEn.ok) {
        const dataEn = await resEn.json();
        const dataAr = resAr.ok ? await resAr.json() : null;
        const enOut = Array.isArray(dataEn?.[0]) ? dataEn[0].map((s: any) => s?.[0] || '').join('') : '';
        const arOut = Array.isArray(dataAr?.[0]) ? dataAr[0].map((s: any) => s?.[0] || '').join('') : '';
        if (enOut.trim()) {
          return {
            en: enOut.trim(),
            ar: arOut.trim() || 'هذه سجادة إيرانية يدوية أصيلة فاخرة.',
            pron: enOut.trim().toLowerCase(),
            note: 'ترجمه جمله فرش‌فروش'
          };
        }
      }
    } catch {}

    return {
      en: `This is an authentic hand-knotted Persian carpet (${transliteratePersianToFingilish(trimmed)}), woven with natural wool and vegetable dyes.`,
      ar: 'هذه سجادة إيرانية يدوية أصيلة منسوجة من الصوف الطبيعي والأصباغ النباتية.',
      pron: transliteratePersianToFingilish(trimmed),
      note: 'موتور آفلاین اصطلاحات فرش'
    };
  };

  // Offline & Hybrid Specialized Carpet Translator for Foreign Buyer (EN/AR -> FA)
  const translateBuyerForeignToFa = async (foreignText: string): Promise<{
    fa: string;
    enEcho: string;
    pronFa: string;
  }> => {
    const trimmed = foreignText.trim();
    const lower = trimmed.toLowerCase();
    if (!trimmed) return { fa: '', enEcho: '', pronFa: '' };

    const matchedFa: string[] = [];
    for (const item of CARPET_BUYER_FOREIGN_TO_FA) {
      if (item.keywords.some(kw => lower.includes(kw))) {
        matchedFa.push(item.fa);
      }
    }

    if (matchedFa.length > 0) {
      const combinedFa = matchedFa.join(' | ');
      return {
        fa: combinedFa,
        enEcho: trimmed,
        pronFa: transliteratePersianToFingilish(combinedFa)
      };
    }

    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=fa&dt=t&q=${encodeURIComponent(trimmed)}`
      );
      if (res.ok) {
        const data = await res.json();
        const faOut = Array.isArray(data?.[0]) ? data[0].map((s: any) => s?.[0] || '').join('') : '';
        if (faOut.trim()) {
          return {
            fa: faOut.trim(),
            enEcho: trimmed,
            pronFa: transliteratePersianToFingilish(faOut.trim())
          };
        }
      }
    } catch {}

    return {
      fa: `مشتری خارجی می‌گوید: «${trimmed}» (درخواست راهنمایی درباره ابعاد، قدمت یا قیمت فرش)`,
      enEcho: trimmed,
      pronFa: 'Moshtari darbareye farsh soal darad'
    };
  };

  const handleMerchantSend = async (textToUse?: string) => {
    const text = (textToUse ?? merchantFaInput).trim();
    if (!text) return;
    sound.playClick();
    if (!textToUse) setMerchantFaInput('');

    const res = await translateMerchantFaToForeign(text);
    const msg: ShowroomChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'merchant_fa',
      originalText: text,
      translatedEn: res.en,
      translatedAr: res.ar,
      pronunciation: res.pron,
      bazaarNote: res.note,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setShowroomMessages(prev => [...prev, msg]);

    if (autoSpeakShowroom) {
      if (targetBuyerLang === 'ar' && res.ar) {
        speakArabic(res.ar, speechVoiceRate);
      } else {
        speakEnglish(res.en, speechVoiceRate);
      }
    }
  };

  const handleBuyerSend = async (textToUse?: string) => {
    const text = (textToUse ?? buyerForeignInput).trim();
    if (!text) return;
    sound.playClick();
    if (!textToUse) setBuyerForeignInput('');

    const res = await translateBuyerForeignToFa(text);
    const msg: ShowroomChatMessage = {
      id: `b_${Date.now()}`,
      sender: 'buyer_foreign',
      originalText: text,
      translatedEn: res.enEcho,
      translatedFa: res.fa,
      pronunciation: res.pronFa,
      bazaarNote: 'ترجمه صحبت خریدار حضوری برای فرش‌فروش',
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setShowroomMessages(prev => [...prev, msg]);

    if (autoSpeakShowroom) {
      speakPersian(res.fa, speechVoiceRate, res.pronFa);
    }
  };

  const handleToggleShowroomMic = (role: 'merchant_fa' | 'buyer_en' | 'buyer_ar') => {
    sound.playClick();
    if (listeningRole === role) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setListeningRole(null);
      setMicAlert(null);
      return;
    }

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setMicAlert('مرورگر فعلی از میکروفون مستقیم پشتیبانی نمی‌کند؛ لطفاً از دکمه میکروفون روی کیبورد گوشی یا دکمه‌های آماده زیر استفاده کنید.');
      return;
    }

    try {
      recognitionRef.current?.stop();
    } catch {}

    try {
      const rec = new SpeechRecognitionAPI();
      rec.lang = role === 'merchant_fa' ? 'fa-IR' : role === 'buyer_ar' ? 'ar-SA' : 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setListeningRole(role);
        setMicAlert(
          role === 'merchant_fa'
            ? '🎙️ میکروفون فرش‌فروش روشن است... به فارسی درباره فرش توضیح دهید تا به انگلیسی/عربی ترجمه و با صدای بلند برای مشتری خوانده شود!'
            : role === 'buyer_ar'
            ? '🎙️ الميكروفون العربي يعمل... تفضل بالتحدث بالعربية ليتم ترجمته إلى الفارسية!'
            : '🎙️ Foreign Buyer Mic Active... Speak in English so the Iranian merchant hears it in Persian!'
        );
      };

      rec.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          if (role === 'merchant_fa') {
            setMerchantFaInput(transcript);
            handleMerchantSend(transcript);
          } else {
            setBuyerForeignInput(transcript);
            handleBuyerSend(transcript);
          }
        }
      };

      rec.onerror = () => {
        setListeningRole(null);
        setMicAlert('صدایی دریافت نشد یا مجوز میکروفون بسته است. می‌توانید از دکمه‌های آماده حجره یا تایپ استفاده کنید.');
      };

      rec.onend = () => {
        setListeningRole(null);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch {
      setListeningRole(null);
    }
  };

  const filteredTerms = CARPET_TERMINOLOGY_DB.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;
    return (
      matchesCategory &&
      (item.termFa.toLowerCase().includes(q) ||
        item.termEn.toLowerCase().includes(q) ||
        item.termAr.toLowerCase().includes(q) ||
        item.fingilish.toLowerCase().includes(q) ||
        item.technicalNoteFa.toLowerCase().includes(q))
    );
  });

  const handleSelectQuizOption = (quizId: string, optionIdx: number, isCorrect: boolean) => {
    sound.playClick();
    setQuizAnswers(prev => ({ ...prev, [quizId]: optionIdx }));
    if (isCorrect && !completedQuizIds.includes(quizId)) {
      sound.playLevelUp();
      try {
        confetti({ particleCount: 55, spread: 60 });
      } catch {}
      setCompletedQuizIds(prev => [...prev, quizId]);
      onEarnLingous(45, 'Mastered International Carpet Trade Negotiation');
    } else if (!isCorrect) {
      sound.playError();
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Memorial Dedication & Heritage Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-950 via-red-900 to-amber-950 text-white p-6 sm:p-8 shadow-xl border-2 border-amber-500/40 relative overflow-hidden">
        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-amber-300">
            <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>یادمان ماندگار و پاسداشت هنر و تجارت اصیل فرش دستباف ایران</span>
            <span aria-hidden="true">·</span>
            <span>مترجم صوتی حضوری فرش‌فروشان (فارسی ⇄ انگلیسی ⇄ عربی)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black leading-tight text-amber-50">
            مترجم صوتی حضوری فرش‌فروشان و آکادمی تجارت جهانی فرش 🧶
          </h1>

          {/* Tribute Box in Memory of Late Father Haj Hossein Agha Ali Miri */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/35 border border-amber-400/40 space-y-2">
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-bold">
              🌹 این بخش در پاسداشت و کمک به ترویج تجارت هنر بومی فرش دستباف ایران و در بزرگداشت پدر مرحومم <strong className="text-amber-300 underline decoration-amber-400/60 underline-offset-4">شادروان حاج حسین علی‌میری</strong> که از تاجران بنام، خوش‌نام و صاحب‌سبک فرش ایران و جهان بودند، به صورت کاملاً رایگان و آفلاین تقدیم به تمامی فرش‌فروشان، بافندگان و علاقه‌مندان فرش ایرانی می‌گردد.
            </p>
            <p className="text-[11px] sm:text-xs text-amber-200/80 italic">
              Dedicated in loving memory of the late Master Merchant Haj Hossein Ali Miri, a distinguished pioneer of Iranian & international handwoven carpet trade.
            </p>
          </div>

          {/* Companion App Notice: Farsh Bazaar */}
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-300/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-black text-amber-200">
                  دعوت ویژه از فرش‌فروشان و تجار محترم به برنامه «فرش بازار (Farsh Bazaar)»
                </h2>
                <p className="text-xs text-amber-100/90 leading-relaxed mt-0.5">
                  فرش‌فروشان، صادرکنندگان و علاقه‌مندان به تجارت تخصصی فرش می‌توانند از برنامه جامع <strong>«فرش بازار»</strong> که توسط همین توسعه‌دهنده (سیاوش علی‌میری) منتشر شده است نیز بازدید و استفاده بفرمایند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => { sound.playClick(); setActiveTab('showroom_interpreter'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap ${
            activeTab === 'showroom_interpreter'
              ? 'bg-rose-800 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>🎙️ مترجم صوتی و چت حضوری فرش‌فروش با خریدار خارجی</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('lexicon'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap ${
            activeTab === 'lexicon'
              ? 'bg-rose-800 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>واژه‌نامه تخصصی فرش (کهنه ذاتی، ذرع، قالی، گلیم)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('dimensions'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap ${
            activeTab === 'dimensions'
              ? 'bg-rose-800 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Ruler className="w-4 h-4" />
          <span>جدول تبدیل ابعاد فرش (ذرع، متر، فوت و عربی)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('dialogues'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap ${
            activeTab === 'dialogues'
              ? 'bg-rose-800 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>مکالمات آماده حجره (انگلیسی و عربی)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('simulator'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap ${
            activeTab === 'simulator'
              ? 'bg-rose-800 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>شبیه‌ساز مذاکره فروش</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* TAB 0: DEDICATED OFFLINE SHOWROOM VOICE & CHAT INTERPRETER          */}
      {/* =================================================================== */}
      {activeTab === 'showroom_interpreter' && (
        <div className="bg-white border-2 border-rose-700/30 rounded-3xl shadow-lg overflow-hidden">
          {/* Top Interpreter Controls */}
          <div className="bg-gradient-to-r from-rose-950 via-red-900 to-slate-900 text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-black flex items-center gap-2">
                <Mic className="w-5 h-5 text-amber-400" />
                <span>مترجم صوتی دوطرفه ویژه حجره و نمایشگاه فرش (فروشنده ⇄ خریدار حضوری)</span>
              </h2>
              <p className="text-xs text-rose-200 mt-0.5">
                تمام اصطلاحات قالی، قالیچه، گلیم، پشتی، ذرع و نیم، دو ذرع، چارک، کهنه ذاتی، رج‌شمار و چله ابریشم را می‌فهمد و با صدای بلند برای خریدار انگلیسی یا عرب‌زبان می‌خواند!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-black/30 p-1 rounded-xl border border-white/15 text-xs font-bold">
                <button
                  onClick={() => setTargetBuyerLang('both')}
                  className={`px-2.5 py-1.5 rounded-lg ${targetBuyerLang === 'both' ? 'bg-amber-400 text-slate-950 font-black' : 'text-white/80'}`}
                >
                  انگلیسی + عربی
                </button>
                <button
                  onClick={() => setTargetBuyerLang('en')}
                  className={`px-2.5 py-1.5 rounded-lg ${targetBuyerLang === 'en' ? 'bg-amber-400 text-slate-950 font-black' : 'text-white/80'}`}
                >
                  فقط انگلیسی 🇬🇧
                </button>
                <button
                  onClick={() => setTargetBuyerLang('ar')}
                  className={`px-2.5 py-1.5 rounded-lg ${targetBuyerLang === 'ar' ? 'bg-amber-400 text-slate-950 font-black' : 'text-white/80'}`}
                >
                  فقط عربی 🇸🇦
                </button>
              </div>

              <button
                onClick={() => setAutoSpeakShowroom(!autoSpeakShowroom)}
                className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 ${
                  autoSpeakShowroom ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-white'
                }`}
              >
                {autoSpeakShowroom ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{autoSpeakShowroom ? 'پخش خودکار صدا: روشن' : 'پخش خودکار: خاموش'}</span>
              </button>

              <button
                onClick={() => setShowroomMessages([])}
                className="p-2 rounded-xl bg-white/10 hover:bg-rose-600 text-white text-xs flex items-center gap-1"
                title="پاک کردن صفحه مکالمه"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {micAlert && (
            <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 text-xs font-bold text-amber-950 flex items-center justify-between">
              <span>{micAlert}</span>
              <button onClick={() => setMicAlert(null)} className="underline text-rose-800">بستن</button>
            </div>
          )}

          {/* Showroom Conversation History */}
          <div className="p-4 sm:p-6 space-y-4 max-h-[420px] overflow-y-auto bg-slate-50">
            {showroomMessages.map((m) => {
              const isMerchant = m.sender === 'merchant_fa';
              return (
                <div key={m.id} className={`flex flex-col ${isMerchant ? 'items-start' : 'items-end'}`}>
                  <div
                    className={`w-full sm:max-w-2xl rounded-3xl p-5 space-y-3 border shadow-xs ${
                      isMerchant
                        ? 'bg-rose-50/70 border-rose-300 text-slate-900'
                        : 'bg-amber-50/80 border-amber-300 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200/70 pb-2">
                      <span className="font-black text-rose-950">
                        {isMerchant
                          ? '🇮🇷 فرش‌فروش ایرانی (ترجمه تخصصی برای خریدار خارجی)'
                          : '🌍 خریدار حضوری خارجی (ترجمه به فارسی برای فرش‌فروش)'}
                      </span>
                      <span>{m.timestamp}</span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-slate-700" dir="auto">
                      متن گفته شده: «{m.originalText}»
                    </p>

                    {isMerchant ? (
                      <div className="space-y-3">
                        {/* English Output */}
                        {(targetBuyerLang === 'both' || targetBuyerLang === 'en') && (
                          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-slate-500">🇬🇧 ترجمه تخصصی انگلیسی برای مشتری:</span>
                              <button
                                onClick={() => speakEnglish(m.translatedEn, speechVoiceRate)}
                                className="px-3 py-1 rounded-lg bg-rose-800 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>🔊 پخش انگلیسی</span>
                              </button>
                            </div>
                            <p className="text-sm sm:text-base font-black text-slate-950" dir="ltr">
                              "{m.translatedEn}"
                            </p>
                            <p className="text-xs font-mono text-rose-800" dir="ltr">
                              تلفظ: {m.pronunciation}
                            </p>
                          </div>
                        )}

                        {/* Arabic Output */}
                        {(targetBuyerLang === 'both' || targetBuyerLang === 'ar') && m.translatedAr && (
                          <div className="p-3.5 rounded-2xl bg-white border border-amber-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-amber-900">🇸🇦🇦🇪 ترجمه تخصصی عربی برای مشتری عرب:</span>
                              <button
                                onClick={() => speakArabic(m.translatedAr!, speechVoiceRate)}
                                className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>🔊 پخش عربی</span>
                              </button>
                            </div>
                            <p className="text-sm sm:text-base font-black text-slate-950">
                              «{m.translatedAr}»
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-white border border-amber-300 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-900">🇮🇷 ترجمه فارسی صحبت خریدار برای شما:</span>
                          <button
                            onClick={() => speakPersian(m.translatedFa || '', speechVoiceRate, m.pronunciation)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>🔊 پخش صدای فارسی</span>
                          </button>
                        </div>
                        <p className="text-base sm:text-lg font-black text-slate-950">
                          {m.translatedFa}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Dual Input Console: Merchant (Persian) & Foreign Customer (English / Arabic) */}
          <div className="p-4 sm:p-6 bg-white border-t-2 border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* LEFT/TOP: IRANIAN CARPET MERCHANT */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border-2 border-rose-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-black text-rose-950">
                  🇮🇷 پنل فرش‌فروش (فارسی بگویید یا بنویسید ⬅️ پخش انگلیسی/عربی)
                </span>
                <button
                  type="button"
                  onClick={() => handleToggleShowroomMic('merchant_fa')}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 ${
                    listeningRole === 'merchant_fa'
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-rose-800 hover:bg-rose-700 text-white'
                  }`}
                >
                  {listeningRole === 'merchant_fa' ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{listeningRole === 'merchant_fa' ? 'توقف میکروفون' : '🎙️ میکروفون فرش‌فروش'}</span>
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={merchantFaInput}
                  onChange={(e) => setMerchantFaInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleMerchantSend();
                  }}
                  placeholder="بنویسید: مثلاً این قالیچه دو ذرع کهنه ذاتی و رنگ گیاهی است..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-rose-300 bg-white text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-rose-700"
                />
                <button
                  type="button"
                  onClick={() => handleMerchantSend()}
                  className="px-4 py-2.5 rounded-xl bg-rose-800 hover:bg-rose-700 text-white font-black text-xs flex items-center gap-1 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>ترجمه و پخش</span>
                </button>
              </div>

              {/* 1-Click Quick Showroom Merchant Sentences */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-rose-900 block">
                  ⚡ جملات فوری فرش‌فروش در حجره (با یک کلیک ترجمه و برای مشتری بلند خوانده می‌شود):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'این فرش صد در صد کهنه ذاتی و رنگ گیاهی است',
                    'این قالیچه سایز دو ذرع (۲۰۰ در ۱۳۵ سانت) است',
                    'این سایز ذرع و نیم (۱۵۰ در ۱۰۵ سانت) است',
                    'این سایز ذرع و چارک (۱۲۵ در ۸۰ سانت) است',
                    'این گلیم دستباف عشایری بدون پرز و دوطرفه است',
                    'این پشتی سنتی دستباف، چله ابریشم و ۶۰ رج است',
                    'فرش نوبافت و آکبند، تازه از دار پایین آمده است',
                    'فرش کارکرده سالم، گوشت‌دار و شسته‌شده است',
                    'فرش قدیمی و عتیقه کلکسیونی است',
                    'فرش مربع و کناره راهرویی هم موجود داریم',
                    'قابل شما را ندارد، پای معامله تخفیف ویژه تقدیم می‌کنم',
                    'شناسنامه رسمی اصالت و ارسال هوایی درب منزل داریم'
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleMerchantSend(chip)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-800 text-rose-950 hover:text-white border border-rose-200 text-[11px] font-bold transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT/BOTTOM: FOREIGN BUYER IN SHOWROOM */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-300 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-black text-amber-950">
                  🌍 پنل خریدار حضوری خارجی (English / عربي ⬅️ پخش فارسی برای شما)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleToggleShowroomMic('buyer_en')}
                    className={`px-2.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 ${
                      listeningRole === 'buyer_en'
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>🇬🇧 English Mic</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleShowroomMic('buyer_ar')}
                    className={`px-2.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 ${
                      listeningRole === 'buyer_ar'
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-amber-600 hover:bg-amber-500 text-slate-950'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>🇸🇦 ميكروفون عربي</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={buyerForeignInput}
                  onChange={(e) => setBuyerForeignInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleBuyerSend();
                  }}
                  dir="auto"
                  placeholder="Foreign buyer types or speaks here (English or Arabic)..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-amber-700"
                />
                <button
                  type="button"
                  onClick={() => handleBuyerSend()}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Translate</span>
                </button>
              </div>

              {/* 1-Click Common Foreign Buyer Questions */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-amber-950 block">
                  💬 سوالات پرتکرار مشتری خارجی در حجره (مشتری روی هر کدام بزند به فارسی برایتان می‌گوید):
                </span>
                <div className="flex flex-wrap gap-1.5" dir="ltr">
                  {[
                    'Is this naturally aged or chemical wash?',
                    'What is the exact size in feet and meters?',
                    'Is the foundation pure silk or wool?',
                    'Are the dyes 100% natural vegetable dyes?',
                    'What is your best price with discount?',
                    'Can you ship this to my country with a Certificate?',
                    'كم سعر هذه السجادة وما هو مقاسها؟',
                    'هل هذه السجادة حرير طبيعي ومعتقة طبيعياً؟'
                  ].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleBuyerSend(q)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-600 text-slate-900 hover:text-white border border-amber-300 text-[11px] font-bold transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: SPECIALIZED CARPET TERMINOLOGY LEXICON */}
      {activeTab === 'lexicon' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی اصطلاح تخصصی (مثلاً: کهنه ذاتی، ذرع و نیم، دو ذرع، چارک، قالیچه، گلیم، پشتی، رج...)"
                  className="w-full pr-10 pl-4 py-3 rounded-2xl border border-slate-200 focus:border-rose-700 outline-none text-xs sm:text-sm font-bold text-slate-900"
                />
              </div>

              {/* Category Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl">
                {[
                  { id: 'all', label: 'همه اصطلاحات' },
                  { id: 'types', label: 'قالی، قالیچه، گلیم و پشتی' },
                  { id: 'sizes', label: 'ذرع و نیم، دو ذرع، چارک' },
                  { id: 'condition_age', label: 'کهنه ذاتی، قدیمی، نوبافت' },
                  { id: 'structure_materials', label: 'رج‌شمار و ابریشم' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { sound.playClick(); setSelectedCategory(cat.id); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-white text-rose-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredTerms.map((item: CarpetTermItem) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Unboxed Metadata Line */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2 font-bold text-rose-800">
                      <span>{item.categoryLabelFa}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.fingilish}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(`${item.termEn} | ${item.termAr}`, item.id)}
                      className="text-slate-400 hover:text-slate-800 p-1"
                      title="کپی معادل انگلیسی و عربی"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Persian Term */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      {item.termFa}
                    </h3>
                    {item.dimensionsMetric && (
                      <p className="text-xs font-bold text-amber-800 mt-1">
                        📏 ابعاد استاندارد: {item.dimensionsMetric} ({item.dimensionsImperial})
                      </p>
                    )}
                  </div>

                  {/* English Equivalent */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500">🇬🇧 معادل تخصصی انگلیسی:</span>
                      <button
                        onClick={() => speakEnglish(item.termEn, speechVoiceRate)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 hover:text-rose-600"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>تلفظ انگلیسی</span>
                      </button>
                    </div>
                    <p className="text-sm font-black text-slate-900" dir="ltr">
                      {item.termEn}
                    </p>
                    <p className="text-xs font-mono text-slate-500" dir="ltr">
                      Pronunciation: {item.pronunciationEn}
                    </p>
                  </div>

                  {/* Arabic Equivalent */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-900">🇸🇦🇦🇪 معادل تخصصی بازار عربی:</span>
                      <button
                        onClick={() => speakArabic(item.termAr, speechVoiceRate, item.pronunciationAr)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:text-amber-700"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>تلفظ عربی</span>
                      </button>
                    </div>
                    <p className="text-sm font-black text-slate-900">
                      {item.termAr}
                    </p>
                    <p className="text-xs font-mono text-slate-600" dir="ltr">
                      Phonetic: {item.pronunciationAr}
                    </p>
                  </div>

                  {/* Technical Explanation */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    💡 <strong>نکته کارشناسی بازار:</strong> {item.technicalNoteFa}
                  </p>
                </div>

                {/* Ready-to-Speak Sales Pitch for Foreign Customer */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 block">
                    🎙️ جمله آماده پرزنت به مشتری خارجی (پخش صوتی مستقیم):
                  </span>
                  <p className="text-xs font-semibold text-slate-800 italic" dir="ltr">
                    "{item.merchantPitchEn}"
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={() => speakEnglish(item.merchantPitchEn, speechVoiceRate)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-800 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>پخش توضیح برای مشتری انگلیسی‌زبان</span>
                    </button>
                    <button
                      onClick={() => speakArabic(item.merchantPitchAr, speechVoiceRate, item.pronunciationAr)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>پخش برای مشتری عرب‌زبان</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: STANDARD CARPET DIMENSIONS CONVERTER TABLE */}
      {activeTab === 'dimensions' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              جدول مرجع تبدیل ابعاد سنتی فرش ایران (ذرع، متر، فوت انگلیسی و عربی)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              هر «ذرع» سنتی بازار فرش ایران معادل ۱۰۴ تا ۱۰۷ سانتی‌متر است. مشتریان آمریکایی و بریتانیایی ابعاد را با <strong>فوت و اینچ (Feet & Inches)</strong> می‌شناسند و مشتریان عرب و اروپایی با <strong>سانتی‌متر و متر</strong>. روی دکمه صوتی هر ردیف بزنید تا ابعاد به انگلیسی برای مشتری خوانده شود.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 text-xs font-black text-slate-700 bg-slate-50">
                  <th className="p-3.5">نام قطع در بازار ایران</th>
                  <th className="p-3.5">مقیاس سنتی (ذرع)</th>
                  <th className="p-3.5">ابعاد به سانتی‌متر / متر</th>
                  <th className="p-3.5">معادل انگلیسی (Feet & Inches)</th>
                  <th className="p-3.5">اصطلاح بازار عربی</th>
                  <th className="p-3.5">کاربرد و سخنگو</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {STANDARD_CARPET_DIMENSIONS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                    <td className="p-3.5 font-black text-slate-900">{row.nameFa}</td>
                    <td className="p-3.5 font-bold text-rose-800">{row.zar}</td>
                    <td className="p-3.5 font-mono font-bold text-slate-800" dir="ltr">{row.metric}</td>
                    <td className="p-3.5 font-mono font-black text-emerald-800" dir="ltr">{row.imperial}</td>
                    <td className="p-3.5 font-bold text-amber-900">{row.arabic}</td>
                    <td className="p-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-slate-600">{row.useFa}</span>
                        <button
                          onClick={() =>
                            speakEnglish(
                              `${row.nameFa}, measuring ${row.metric}, which is ${row.imperial}`,
                              speechVoiceRate
                            )
                          }
                          className="px-2.5 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-xs flex items-center gap-1 shrink-0"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>بگو</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TRILINGUAL SHOWROOM DIALOGUES */}
      {activeTab === 'dialogues' && (
        <div className="space-y-5">
          {CARPET_MERCHANT_DIALOGUES.map((dlg) => (
            <div
              key={dlg.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs"
            >
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-rose-900">
                    {dlg.stageTitleFa}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{dlg.stageTitleEn}</p>
                </div>
              </div>

              {/* Customer Question in English & Arabic */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>🇬🇧 سوال مشتری انگلیسی‌زبان:</span>
                    <button
                      onClick={() => speakEnglish(dlg.customerQuestionEn, speechVoiceRate)}
                      className="text-rose-800 hover:underline flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>شنیدن سوال</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-900" dir="ltr">
                    "{dlg.customerQuestionEn}"
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong>معنی فارسی:</strong> {dlg.customerMeaningFa}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                    <span>🇸🇦🇦🇪 سوال مشتری عرب‌زبان:</span>
                    <button
                      onClick={() => speakArabic(dlg.customerQuestionAr, speechVoiceRate)}
                      className="text-amber-900 hover:underline flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>شنیدن عربی</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    «{dlg.customerQuestionAr}»
                  </p>
                </div>
              </div>

              {/* Merchant Golden Answer in Persian, English & Arabic */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/70 to-amber-50/70 border border-rose-200 space-y-4">
                <div>
                  <span className="text-xs font-black text-rose-900 block mb-1">
                    🇮🇷 پاسخ اصیل فرش‌فروش ایرانی:
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                    «{dlg.merchantReplyFa}»
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-rose-200/60">
                  {/* English Pitch */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-600 block">
                      🇬🇧 پاسخ شما به انگلیسی (همراه با تلفظ):
                    </span>
                    <p className="text-sm font-black text-slate-950 leading-snug" dir="ltr">
                      "{dlg.merchantReplyEn}"
                    </p>
                    <p className="text-xs font-mono text-rose-800" dir="ltr">
                      Phonetic: {dlg.merchantReplyEnPhonetic}
                    </p>
                    <button
                      onClick={() => speakEnglish(dlg.merchantReplyEn, speechVoiceRate)}
                      className="w-full py-2.5 px-4 rounded-xl bg-rose-800 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>🔊 پخش صوتی پاسخ به انگلیسی برای مشتری</span>
                    </button>
                  </div>

                  {/* Arabic Pitch */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-amber-900 block">
                      🇸🇦🇦🇪 پاسخ شما به عربی فصیح و تجاری:
                    </span>
                    <p className="text-sm font-black text-slate-950 leading-snug">
                      «{dlg.merchantReplyAr}»
                    </p>
                    <p className="text-xs font-mono text-amber-900" dir="ltr">
                      Phonetic: {dlg.merchantReplyArPhonetic}
                    </p>
                    <button
                      onClick={() => speakArabic(dlg.merchantReplyAr, speechVoiceRate, dlg.merchantReplyArPhonetic)}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>🔊 پخش صوتی پاسخ به عربی برای مشتری</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-xs text-rose-950 font-medium">
                  ✨ <strong>راز حجره و تجارت (به یاد شادروان حاج حسین علی‌میری):</strong> {dlg.tradeTipFa}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: INTERACTIVE MERCHANT NEGOTIATION SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {CARPET_NEGOTIATION_QUIZZES.map((quiz) => {
            const selectedIdx = quizAnswers[quiz.id];
            const isMastered = completedQuizIds.includes(quiz.id);

            return (
              <div
                key={quiz.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-rose-800 block">
                      مشتری خارجی در حجره شما:
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {quiz.buyerPersona}
                    </h3>
                  </div>
                  {isMastered && (
                    <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>معامله موفق (+45 Lingous)</span>
                    </span>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">سوال مشتری:</span>
                    <button
                      onClick={() => speakEnglish(quiz.buyerQuoteEn, speechVoiceRate)}
                      className="text-xs font-bold text-rose-800 flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>پخش صدای مشتری</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-900" dir="ltr">
                    "{quiz.buyerQuoteEn}"
                  </p>
                  {quiz.buyerQuoteAr && (
                    <p className="text-sm font-bold text-amber-900 pt-1">
                      «{quiz.buyerQuoteAr}»
                    </p>
                  )}
                  <p className="text-xs text-slate-600 pt-1">
                    <strong>ترجمه خواسته مشتری:</strong> {quiz.buyerQuoteFa}
                  </p>
                </div>

                <p className="text-xs sm:text-sm font-black text-slate-900">
                  {quiz.questionFa}
                </p>

                <div className="space-y-3">
                  {quiz.options.map((opt, idx) => {
                    const isPicked = selectedIdx === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectQuizOption(quiz.id, idx, opt.isCorrect)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-1.5 ${
                          isPicked
                            ? opt.isCorrect
                              ? 'border-emerald-600 bg-emerald-50'
                              : 'border-rose-500 bg-rose-50'
                            : 'border-slate-200 hover:border-rose-300 bg-white'
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-black text-slate-900" dir="ltr">
                          "{opt.textEn}"
                        </p>
                        <p className="text-xs text-slate-600">
                          {opt.textFa}
                        </p>
                        {isPicked && (
                          <p className={`text-xs font-bold pt-2 ${opt.isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                            {opt.feedbackFa}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
