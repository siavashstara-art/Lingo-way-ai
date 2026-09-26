import React, { useState, useRef } from 'react';
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
  Trash2,
  RotateCw,
  Layers,
  Sparkles,
  Calculator,
  Camera,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  CARPET_TERMINOLOGY_DB,
  CARPET_MERCHANT_DIALOGUES,
  CARPET_NEGOTIATION_QUIZZES,
  CarpetTermItem
} from '../data/carpetTradeData';
import { CarpetSmartTools } from './CarpetSmartTools';
import { OfflineRajScanner } from './OfflineRajScanner';
import {
  sound,
  speakEnglish,
  speakPersian,
  speakArabic,
  speakChinese,
  speakRussian,
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
  translatedAr: string;
  translatedZh: string;
  translatedRu: string;
  translatedFa?: string;
  pronunciation: string;
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

const CARPET_MULTILINGUAL_RULES: Array<{
  keywords: string[];
  en: string;
  ar: string;
  zh: string;
  ru: string;
  pronEn: string;
}> = [
  {
    keywords: ['خوش آمدید', 'بفرمایید', 'چای'],
    en: 'Welcome to our carpet showroom! Please enjoy fresh saffron tea while we unroll our finest carpets for you.',
    ar: 'أهلاً وسهلاً بكم في معرض السجاد الإيراني! تفضّلوا بشرب الشاي بالزعفران بينما نفرش لكم أجمل السجاد.',
    zh: '欢迎光临我们的波斯地毯展厅！请品尝藏红花茶，我们为您展示精美手工地毯。',
    ru: 'Добро пожаловать в наш салон персидских ковров! Угощайтесь шафрановым чаем, пока мы покажем вам лучшие ковры.',
    pronEn: 'wel-kum too owr kar-pet show-room! pleez en-joy saf-ron tee'
  },
  {
    keywords: ['کهنه ذاتی'],
    en: 'This piece is 100% "Kohneh Zaati"—authentic naturally aged patina mellowed over decades, with zero chemical washing.',
    ar: 'هذه القطعة «كهنه ذاتي» أي معتّقة طبيعياً بمرور السنين بدون أي غسيل كيميائي.',
    zh: '这张地毯是100%天然岁月包浆（Kohneh Zaati），绝无化学水洗。',
    ru: 'Этот ковер на 100% «Кохне Заати» — благородная естественная патина десятилетий без химической стирки.',
    pronEn: 'this pees iz koh-neh zaa-tee — aw-then-tik nach-ur-uh-lee aydjd'
  },
  {
    keywords: ['دو ذرع', 'دوزرع'],
    en: 'It is a classic "Dozar" Ghalicheh size, measuring 200 by 135 centimeters (4.5 by 6.7 feet).',
    ar: 'مقاسها «دوزرع» الكلاسيكي، وأبعادها ٢٠٠ في ١٣٥ سنتيمتراً (٤.٥ في ٦.٧ قدم).',
    zh: '这是经典的“Dozar”尺寸（200×135厘米 / 4.5×6.7英尺）。',
    ru: 'Это классический размер «Дозар» — 200 на 135 сантиметров (4,5 на 6,7 футов).',
    pronEn: 'doh-zar syze, 200 bye 135 cm (4.5 bye 6.7 feet)'
  },
  {
    keywords: ['ذرع و نیم', 'زرع و نیم'],
    en: 'It is a "Zar-o-Nim" area rug size, measuring 150 by 105 centimeters (3.5 by 5 feet).',
    ar: 'مقاسها «ذرع ونصف»، وأبعادها ١٥٠ في ١٠٥ سنتيمتر (٣.٥ في ٥ قدم).',
    zh: '这是“Zar-o-Nim”尺寸（150×105厘米 / 3.5×5英尺），非常适合放入行李箱。',
    ru: 'Это размер «Зар-о-Ним» — 150 на 105 сантиметров (3,5 на 5 футов).',
    pronEn: 'zar-oh-neem rug, 150 bye 105 cm (3.5 bye 5 feet)'
  },
  {
    keywords: ['ذرع و چارک', 'چارک'],
    en: 'It is a "Zar-o-Charak" size, measuring 125 by 80 centimeters (2.7 by 4.1 feet).',
    ar: 'مقاسها «ذرع وربع»، وأبعادها ١٢٥ في ٨٠ سنتيمتراً.',
    zh: '这是“Zar-o-Charak”精致尺寸（125×80厘米）。',
    ru: 'Это размер «Зар-о-Чарак» — 125 на 80 сантиметров.',
    pronEn: 'zar-oh-cha-rak syze, 125 bye 80 cm'
  },
  {
    keywords: ['ابریشم', 'چله', 'کرک', 'رج'],
    en: 'Woven with high knot density (50–70 Raj) on a 100% pure silk foundation with Kork lambswool and natural vegetable dyes.',
    ar: 'منسوجة بكثافة عقد عالية (٥٠-٧٠ رج) على أساس من الحرير الخالص وصوف الكرك وأصباغ نباتية ١٠٠٪.',
    zh: '高密度手工打结（50至70 Raj），100%纯真丝经纬基底，顶级羔羊毛与天然植物染色。',
    ru: 'Высокая плотность узлов (50–70 Радж) на основе из 100% чистого шелка, шерсть Корк и растительные красители.',
    pronEn: 'pyoor silk fown-day-shun with kork wool and vej-tuh-bul dyez'
  },
  {
    keywords: ['تخفیف', 'قیمت', 'قابل نداره', 'شناسنامه', 'ارسال'],
    en: 'It is unworthy of your honor! I offer a special collector discount with an official Certificate of Authenticity and insured air shipping.',
    ar: 'مقدّمة لكم! أقدم لكم خصماً خاصاً مع شهادة أصالة رسمية وشحن جوي مؤمّن.',
    zh: '为您奉上特别收藏折扣，附带官方真品证书及全球航空保价配送。',
    ru: 'Для вас специальная скидка коллекционера, официальный сертификат подлинности и авиадоставка со страховкой.',
    pronEn: 'spesh-ul dis-kownt with ser-tif-i-kut ov aw-then-tis-i-tee'
  }
];

const CARPET_BUYER_FOREIGN_TO_FA: Array<{
  keywords: string[];
  fa: string;
}> = [
  {
    keywords: ['how much', 'price', 'cost', 'dollar', 'كم السعر', 'بكم', 'سعر', '多少钱', '가격', 'сколько'],
    fa: 'مشتری می‌پرسد: «قیمت این فرش چقدر است و با چه ارزی حساب می‌کنید؟»'
  },
  {
    keywords: ['discount', 'best price', 'cheaper', 'خصم', '便宜', 'скидк'],
    fa: 'مشتری می‌پرسد: «بهترین قیمت با تخفیف پای معامله چقدر است؟»'
  },
  {
    keywords: ['size', 'dimension', 'feet', 'meter', 'مقاس', 'ابعاد', '尺寸', 'размер'],
    fa: 'مشتری می‌پرسد: «ابعاد دقیق این فرش به متر و فوت چقدر است؟ (دو ذرع است یا ذرع و نیم؟)»'
  },
  {
    keywords: ['old', 'age', 'antique', 'naturally aged', 'chemical', 'قديم', 'معتق', '天然', 'возраст'],
    fa: 'مشتری می‌پرسد: «قدمت این فرش چند سال است و آیا واقعاً کهنه ذاتی و رنگ گیاهی است؟»'
  },
  {
    keywords: ['silk', 'wool', 'foundation', 'حرير', 'صوف', '真丝', 'шелк'],
    fa: 'مشتری می‌پرسد: «آیا چله و پرز این فرش ابریشم خالص است یا پشم کرک؟»'
  },
  {
    keywords: ['ship', 'certificate', 'flight', 'شحن', 'شهادة', '证书', 'сертификат'],
    fa: 'مشتری می‌پرسد: «آیا شناسنامه اصالت فرش می‌دهید و ارسال هوایی دارید؟»'
  }
];

export const CarpetTradeAcademy: React.FC<CarpetTradeAcademyProps> = ({
  onEarnLingous,
  speechVoiceRate = 0.85
}) => {
  const [activeTab, setActiveTab] = useState<'showroom_interpreter' | 'raj_scanner' | 'smart_tools' | 'lexicon' | 'dimensions' | 'dialogues' | 'simulator'>('showroom_interpreter');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [completedQuizIds, setCompletedQuizIds] = useState<string[]>([]);

  const [merchantFaInput, setMerchantFaInput] = useState<string>('');
  const [buyerForeignInput, setBuyerForeignInput] = useState<string>('');
  const [targetBuyerLang, setTargetBuyerLang] = useState<'all' | 'en' | 'ar' | 'zh' | 'ru'>('all');
  const [autoSpeakShowroom, setAutoSpeakShowroom] = useState<boolean>(true);
  const [flipTopDeck180, setFlipTopDeck180] = useState<boolean>(false);
  const [listeningRole, setListeningRole] = useState<'merchant_fa' | 'buyer_en' | 'buyer_ar' | null>(null);
  const [micAlert, setMicAlert] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const [builderType, setBuilderType] = useState<string>('قالیچه دستباف');
  const [builderSize, setBuilderSize] = useState<string>('دو ذرع (۲۰۰×۱۳۵ سانت)');
  const [builderAge, setBuilderAge] = useState<string>('کهنه ذاتی');
  const [builderMaterial, setBuilderMaterial] = useState<string>('چله ابریشم، رنگ گیاهی و ۶۰ رج');

  const [latestMerchantPitch, setLatestMerchantPitch] = useState<{
    fa: string;
    en: string;
    ar: string;
    zh: string;
    ru: string;
    pron: string;
  }>({
    fa: 'به حجره فرش ما خوش آمدید! این قالیچه دو ذرع، صد در صد کهنه ذاتی، رنگ گیاهی و چله ابریشم است.',
    en: 'Welcome to our Persian carpet showroom! This Dozar Ghalicheh (200×135 cm / 4.5×6.7 ft) is 100% Kohneh Zaati (naturally aged patina), with pure vegetable dyes and a silk foundation.',
    ar: 'أهلاً وسهلاً بكم في معرض السجاد الإيراني! هذه القاليجه مقاس دوزرع (٢٠٠×١٣٥ سم)، معتّقة طبيعياً (كهنه ذاتي) ١٠٠٪، بأصباغ نباتية وأساس من الحرير الخالص.',
    zh: '欢迎光临波斯地毯展厅！这张“Dozar”地毯（200×135厘米）是100%天然岁月包浆（Kohneh Zaati），纯真丝基底与天然植物染色。',
    ru: 'Добро пожаловать в наш салон! Этот ковер «Дозар» (200×135 см) — 100% «Кохне Заати» (естественное старение), шелковая основа и растительные красители.',
    pron: 'wel-kum! this doh-zar rug iz koh-neh zaa-tee with vej-tuh-bul dyez and silk fown-day-shun.'
  });

  const [latestBuyerQuestion, setLatestBuyerQuestion] = useState<{
    foreignText: string;
    faTranslation: string;
    pronFa: string;
  }>({
    foreignText: 'Is this vintage rug naturally aged over time, and what are its exact dimensions in feet?',
    faTranslation: 'مشتری می‌پرسد: «آیا این فرش واقعاً کهنه ذاتی و طبیعی است و ابعاد دقیق آن به فوت و متر چقدر است؟»',
    pronFa: 'Moshtari miporsad: Aya in farsh kohneh zaati ast va ab-aade aan cheghadr ast?'
  });

  const [showroomMessages, setShowroomMessages] = useState<ShowroomChatMessage[]>([]);

  const handleCopy = (text: string, id: string) => {
    sound.playCoin();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 100% Synchronous 0ms Offline Carpet Translator (FA -> EN, AR, ZH, RU)
  const translateMerchantInstant = (faText: string) => {
    const trimmed = faText.trim();
    const enList: string[] = [];
    const arList: string[] = [];
    const zhList: string[] = [];
    const ruList: string[] = [];
    const pronList: string[] = [];

    for (const rule of CARPET_MULTILINGUAL_RULES) {
      if (rule.keywords.some(kw => trimmed.includes(kw))) {
        enList.push(rule.en);
        arList.push(rule.ar);
        zhList.push(rule.zh);
        ruList.push(rule.ru);
        pronList.push(rule.pronEn);
      }
    }

    if (enList.length > 0) {
      return {
        en: enList.join(' '),
        ar: arList.join(' '),
        zh: zhList.join(' '),
        ru: ruList.join(' '),
        pron: pronList.join(' | ')
      };
    }

    const fing = transliteratePersianToFingilish(trimmed);
    return {
      en: `Authentic hand-knotted Persian carpet (${fing}) woven with pure wool, silk foundation, and natural vegetable dyes.`,
      ar: 'سجادة إيرانية يدوية أصيلة منسوجة من الصوف الطبيعي والحرير والأصباغ النباتية الخالصة.',
      zh: '正宗伊朗手工波斯地毯，采用天然植物染色与纯手工编织。',
      ru: 'Подлинный иранский ковер ручной работы из натуральной шерсти, шелка и растительных красителей.',
      pron: fing
    };
  };

  const translateBuyerInstant = (foreignText: string) => {
    const trimmed = foreignText.trim();
    const lower = trimmed.toLowerCase();
    const matchedFa: string[] = [];

    for (const item of CARPET_BUYER_FOREIGN_TO_FA) {
      if (item.keywords.some(kw => lower.includes(kw))) {
        matchedFa.push(item.fa);
      }
    }

    const finalFa =
      matchedFa.length > 0
        ? matchedFa.join(' | ')
        : `مشتری خارجی می‌گوید: «${trimmed}» (درخواست راهنمایی درباره اصالت، سایز یا قیمت فرش)`;

    return {
      fa: finalFa,
      pronFa: transliteratePersianToFingilish(finalFa)
    };
  };

  // Instant 0ms Merchant Send
  const handleMerchantSend = (textToUse?: string) => {
    sound.playClick();
    const text =
      (textToUse ?? merchantFaInput).trim() ||
      `این ${builderType} در سایز ${builderSize}، ${builderAge} و دارای ${builderMaterial} است.`;

    if (!textToUse) setMerchantFaInput('');

    const res = translateMerchantInstant(text);
    setLatestMerchantPitch({
      fa: text,
      en: res.en,
      ar: res.ar,
      zh: res.zh,
      ru: res.ru,
      pron: res.pron
    });

    const msg: ShowroomChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'merchant_fa',
      originalText: text,
      translatedEn: res.en,
      translatedAr: res.ar,
      translatedZh: res.zh,
      translatedRu: res.ru,
      pronunciation: res.pron,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setShowroomMessages(prev => [msg, ...prev]);

    if (autoSpeakShowroom) {
      if (targetBuyerLang === 'ar') speakArabic(res.ar, speechVoiceRate);
      else if (targetBuyerLang === 'zh') speakChinese(res.zh, speechVoiceRate, res.en);
      else if (targetBuyerLang === 'ru') speakRussian(res.ru, speechVoiceRate, res.en);
      else speakEnglish(res.en, speechVoiceRate);
    }

    // Zero-Touch Automated Server Refinement for free-form merchant statements
    fetch('/api/ai/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        sourceLang: 'fa',
        targetLang: targetBuyerLang === 'all' ? 'en' : targetBuyerLang,
        domain: 'carpet_and_travel'
      })
    })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.translation && data.translation.trim()) {
          setLatestMerchantPitch(prev => ({
            ...prev,
            en: targetBuyerLang === 'all' || targetBuyerLang === 'en' ? data.translation : prev.en,
            ar: data.arabicText || (targetBuyerLang === 'ar' ? data.translation : prev.ar),
            zh: targetBuyerLang === 'zh' ? data.translation : prev.zh,
            ru: targetBuyerLang === 'ru' ? data.translation : prev.ru,
            pron: data.pronunciation || prev.pron
          }));
        }
      })
      .catch(() => {
        // Offline 0ms translation is already active
      });
  };

  // Instant 0ms Buyer Send
  const handleBuyerSend = (textToUse?: string) => {
    sound.playClick();
    const text =
      (textToUse ?? buyerForeignInput).trim() ||
      'Is this Kohneh Zaati (naturally aged) and what is the best price?';

    if (!textToUse) setBuyerForeignInput('');

    const res = translateBuyerInstant(text);
    setLatestBuyerQuestion({
      foreignText: text,
      faTranslation: res.fa,
      pronFa: res.pronFa
    });

    const msg: ShowroomChatMessage = {
      id: `b_${Date.now()}`,
      sender: 'buyer_foreign',
      originalText: text,
      translatedEn: text,
      translatedAr: '',
      translatedZh: '',
      translatedRu: '',
      translatedFa: res.fa,
      pronunciation: res.pronFa,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setShowroomMessages(prev => [msg, ...prev]);

    if (autoSpeakShowroom) {
      speakPersian(res.fa, speechVoiceRate, res.pronFa);
    }

    // Zero-Touch Automated Server Refinement for free-form buyer questions
    fetch('/api/ai/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        sourceLang: 'auto',
        targetLang: 'fa',
        domain: 'carpet_and_travel'
      })
    })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.translation && data.translation.trim()) {
          const faText = `مشتری می‌پرسد: «${data.translation.trim()}»`;
          setLatestBuyerQuestion({
            foreignText: text,
            faTranslation: faText,
            pronFa: data.pronunciation || transliteratePersianToFingilish(faText)
          });
        }
      })
      .catch(() => {
        // Offline 0ms translation is already active
      });
  };

  const handleToggleShowroomMic = (role: 'merchant_fa' | 'buyer_en' | 'buyer_ar') => {
    sound.playClick();
    const androidBridge = (window as any).AndroidBridge;
    if (androidBridge && typeof androidBridge.startVoiceRecognition === 'function') {
      setListeningRole(role);
      androidBridge.startVoiceRecognition(
        role === 'merchant_fa' ? 'fa-IR' : role === 'buyer_ar' ? 'ar-SA' : 'en-US',
        role === 'merchant_fa' ? 'fa' : 'en'
      );
      return;
    }

    if (listeningRole === role) {
      try { recognitionRef.current?.stop(); } catch {}
      setListeningRole(null);
      setMicAlert(null);
      return;
    }

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setMicAlert('💡 برای تایپ صوتی، روی کادر متن کلیک کرده و دکمه میکروفون کیبورد گوشی را بزنید یا از جمله‌ساز فوری زیر استفاده کنید.');
      return;
    }

    try { recognitionRef.current?.stop(); } catch {}

    try {
      const rec = new SpeechRecognitionAPI();
      rec.lang = role === 'merchant_fa' ? 'fa-IR' : role === 'buyer_ar' ? 'ar-SA' : 'en-US';
      rec.interimResults = false;
      rec.onstart = () => setListeningRole(role);
      rec.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          if (role === 'merchant_fa') handleMerchantSend(transcript);
          else handleBuyerSend(transcript);
        }
      };
      rec.onerror = () => setListeningRole(null);
      rec.onend = () => setListeningRole(null);
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
        item.fingilish.toLowerCase().includes(q))
    );
  });

  const handleSelectQuizOption = (quizId: string, optionIdx: number, isCorrect: boolean) => {
    sound.playClick();
    setQuizAnswers(prev => ({ ...prev, [quizId]: optionIdx }));
    if (isCorrect && !completedQuizIds.includes(quizId)) {
      sound.playLevelUp();
      try { confetti({ particleCount: 50, spread: 60 }); } catch {}
      setCompletedQuizIds(prev => [...prev, quizId]);
      onEarnLingous(45, 'Mastered International Carpet Trade Negotiation');
    } else if (!isCorrect) {
      sound.playError();
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Memorial Dedication Banner in Honored Memory of Haj Hossein Agha Ali Miri */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-950 via-red-900 to-amber-950 text-white p-6 sm:p-8 shadow-xl border-2 border-amber-500/40">
        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-amber-300">
            <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>یادمان ماندگار و پاسداشت هنر و تجارت اصیل فرش دستباف ایران</span>
            <span>·</span>
            <span>مترجم صوتی دو طبقه ۵ زبانه (فارسی ⇄ انگلیسی ⇄ عربی ⇄ چینی ⇄ روسی)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black leading-tight text-amber-50">
            مترجم صوتی دو طبقه فرش‌فروشان، صدور شناسنامه و آکادمی فرش 🧶
          </h1>

          <div className="p-4 sm:p-5 rounded-2xl bg-black/35 border border-amber-400/40 space-y-2">
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-bold">
              🌹 این بخش در پاسداشت و کمک به ترویج تجارت هنر بومی فرش دستباف ایران و در بزرگداشت پدر مرحومم <strong className="text-amber-300 underline decoration-amber-400/60 underline-offset-4">شادروان حاج حسین آقای علی‌میری</strong> که از تاجران بنام، خوش‌نام و صاحب‌سبک فرش ایران و جهان بودند، به صورت کاملاً رایگان و آفلاین تقدیم به تمامی فرش‌فروشان، بافندگان و علاقه‌مندان فرش ایرانی می‌گردد.
            </p>
            <p className="text-[11px] sm:text-xs text-amber-200/80 italic">
              Dedicated in loving memory of the late Master Merchant Haj Hossein Agha Ali Miri, a distinguished pioneer of Iranian & international handwoven carpet trade.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-300/40 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-black text-amber-200">
                مکمل رسمی برنامه «فرش بازار (Farsh Bazaar)»
              </h2>
              <p className="text-xs text-amber-100/90 mt-0.5">
                فرش‌فروشان و علاقه‌مندان می‌توانند از برنامه جامع <strong>«فرش بازار»</strong> (توسعه‌یافته توسط سیاوش علی‌میری) نیز بازدید و استفاده نمایند.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => { sound.playClick(); setActiveTab('showroom_interpreter'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap ${
            activeTab === 'showroom_interpreter' ? 'bg-rose-800 text-white' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>🎙️ مترجم صوتی دو طبقه ۵ زبانه (حجره)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('raj_scanner'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap border-2 transition-all ${
            activeTab === 'raj_scanner'
              ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-md'
              : 'bg-amber-50 text-rose-950 border-amber-300 hover:bg-amber-100'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>📸 رجشمار نوری آفلاین با دوربین (ختم مشاجرات رج قالی)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('smart_tools'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap ${
            activeTab === 'smart_tools' ? 'bg-rose-800 text-white' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>🖨️ صدور شناسنامه اصالت + محاسبه‌گر ذرع و ارز جهانی</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('lexicon'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap ${
            activeTab === 'lexicon' ? 'bg-rose-800 text-white' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>واژه‌نامه تخصصی (کهنه ذاتی، ذرع، قالی، گلیم)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('dimensions'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap ${
            activeTab === 'dimensions' ? 'bg-rose-800 text-white' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Ruler className="w-4 h-4" />
          <span>جدول ابعاد (ذرع، متر و فوت)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('dialogues'); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap ${
            activeTab === 'dialogues' ? 'bg-rose-800 text-white' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>مکالمات آماده حجره</span>
        </button>
      </div>

      {/* TAB: DEDICATED OFFLINE OPTICAL CAMERA RAJ-SHOMAR */}
      {activeTab === 'raj_scanner' && (
        <OfflineRajScanner
          onApplyToCertificate={() => {
            setActiveTab('smart_tools');
          }}
        />
      )}

      {/* TAB 1: SMART TOOLS (CERTIFICATE GENERATOR + CURRENCY/DIMENSION CALCULATOR + STORYTELLER) */}
      {activeTab === 'smart_tools' && <CarpetSmartTools />}

      {/* TAB 0: TWO-TIER 5-LANGUAGE SHOWROOM INTERPRETER */}
      {activeTab === 'showroom_interpreter' && (
        <div className="space-y-5">
          {/* Top Control Bar */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
            <div>
              <h2 className="text-sm sm:text-base font-black text-amber-300">
                مترجم صوتی دو طبقه ۵ زبانه حجره فرش (به یاد شادروان حاج حسین آقای علی‌میری)
              </h2>
              <p className="text-xs text-slate-300">
                پشتیبانی همزمان از خریداران <strong>انگلیسی 🇬🇧، عربی 🇸🇦، چینی 🇨🇳 و روسی 🇷🇺</strong> با پاسخ در صفر ثانیه
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => { sound.playClick(); setFlipTopDeck180(!flipTopDeck180); }}
                className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 border ${
                  flipTopDeck180 ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-white/10 text-white border-white/20'
                }`}
              >
                <RotateCw className="w-4 h-4" />
                <span>{flipTopDeck180 ? 'حالت رومیزی ۱۸۰ درجه: فعال' : '🔄 چرخش ۱۸۰ درجه طبقه بالا (رومیزی)'}</span>
              </button>

              <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/15 text-xs font-bold">
                {[
                  { id: 'all', label: 'همه ۴ زبان' },
                  { id: 'en', label: '🇬🇧 EN' },
                  { id: 'ar', label: '🇸🇦 AR' },
                  { id: 'zh', label: '🇨🇳 中文' },
                  { id: 'ru', label: '🇷🇺 RU' }
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setTargetBuyerLang(l.id as any)}
                    className={`px-2.5 py-1 rounded-lg ${targetBuyerLang === l.id ? 'bg-rose-600 text-white font-black' : 'text-white/80'}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {micAlert && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl px-5 py-3 text-xs font-bold text-amber-950 flex items-center justify-between">
              <span>{micAlert}</span>
              <button onClick={() => setMicAlert(null)} className="underline text-rose-800">بستن</button>
            </div>
          )}

          {/* TIER 1 (TOP DECK): FOREIGN BUYER IN 4 LANGUAGES (EN / AR / ZH / RU) */}
          <div
            className={`rounded-3xl border-2 border-amber-500/70 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 sm:p-6 shadow-lg space-y-4 transition-transform duration-300 ${
              flipTopDeck180 ? 'rotate-180' : ''
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-3">
              <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-black text-xs">
                طبقه اول (بالا) • FOREIGN CUSTOMER DECK (EN / AR / 中文 / RU)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleShowroomMic('buyer_en')}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center gap-1"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>🇬🇧 Buyer Mic</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleShowroomMic('buyer_ar')}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>🇸🇦 ميكروفون</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(targetBuyerLang === 'all' || targetBuyerLang === 'en') && (
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-600">🇬🇧 ENGLISH:</span>
                    <button
                      onClick={() => speakEnglish(latestMerchantPitch.en, speechVoiceRate)}
                      className="px-3 py-1 rounded-xl bg-rose-800 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>🔊 Speak English</span>
                    </button>
                  </div>
                  <p className="text-sm sm:text-base font-black text-slate-950" dir="ltr">"{latestMerchantPitch.en}"</p>
                </div>
              )}

              {(targetBuyerLang === 'all' || targetBuyerLang === 'ar') && (
                <div className="p-4 rounded-2xl bg-white border border-amber-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-900">🇸🇦 العربية:</span>
                    <button
                      onClick={() => speakArabic(latestMerchantPitch.ar, speechVoiceRate)}
                      className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>🔊 نطق عربي</span>
                    </button>
                  </div>
                  <p className="text-sm sm:text-base font-black text-slate-950">«{latestMerchantPitch.ar}»</p>
                </div>
              )}

              {(targetBuyerLang === 'all' || targetBuyerLang === 'zh') && (
                <div className="p-4 rounded-2xl bg-white border border-red-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-red-800">🇨🇳 中文 (چینی ماندارین):</span>
                    <button
                      onClick={() => speakChinese(latestMerchantPitch.zh, speechVoiceRate, latestMerchantPitch.en)}
                      className="px-3 py-1 rounded-xl bg-red-700 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>🔊 播放中文</span>
                    </button>
                  </div>
                  <p className="text-sm sm:text-base font-black text-slate-950" dir="ltr">{latestMerchantPitch.zh}</p>
                </div>
              )}

              {(targetBuyerLang === 'all' || targetBuyerLang === 'ru') && (
                <div className="p-4 rounded-2xl bg-white border border-indigo-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-900">🇷🇺 РУССКИЙ (روسی):</span>
                    <button
                      onClick={() => speakRussian(latestMerchantPitch.ru, speechVoiceRate, latestMerchantPitch.en)}
                      className="px-3 py-1 rounded-xl bg-indigo-800 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>🔊 По-русски</span>
                    </button>
                  </div>
                  <p className="text-sm sm:text-base font-black text-slate-950" dir="ltr">{latestMerchantPitch.ru}</p>
                </div>
              )}
            </div>

            {/* Foreign Customer Input */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2" dir="ltr">
              <input
                type="text"
                value={buyerForeignInput}
                onChange={(e) => setBuyerForeignInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleBuyerSend(); }}
                placeholder="Customer: Type question in English, Arabic, Chinese, or Russian..."
                className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-amber-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
              />
              <button
                type="button"
                onClick={() => handleBuyerSend()}
                className="px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Ask Merchant (ترجمه فوری به فارسی)</span>
              </button>
            </div>
          </div>

          {/* TIER 2 (BOTTOM DECK): IRANIAN CARPET MERCHANT */}
          <div className="rounded-3xl border-2 border-rose-700/60 bg-gradient-to-br from-rose-50 via-white to-amber-50/40 p-5 sm:p-6 shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-200 pb-3">
              <span className="px-3 py-1 rounded-xl bg-rose-800 text-white font-black text-xs">
                طبقه دوم (پایین) • پنل تخصصی فرش‌فروش ایرانی
              </span>
              <button
                type="button"
                onClick={() => handleToggleShowroomMic('merchant_fa')}
                className="px-4 py-2 rounded-xl bg-rose-800 text-white font-black text-xs flex items-center gap-1.5"
              >
                <Mic className="w-4 h-4" />
                <span>🎙️ میکروفون صوتی فرش‌فروش</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300">🔔 ترجمه فارسی صحبت خریدار خارجی برای شما:</span>
                <button
                  onClick={() => speakPersian(latestBuyerQuestion.faTranslation, speechVoiceRate, latestBuyerQuestion.pronFa)}
                  className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>🔊 پخش صدای فارسی</span>
                </button>
              </div>
              <p className="text-base sm:text-lg font-black text-amber-200">{latestBuyerQuestion.faTranslation}</p>
            </div>

            {/* 4-Dropdown Smart Carpet Pitch Builder */}
            <div className="p-4 rounded-2xl bg-white border-2 border-rose-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                <select value={builderType} onChange={(e) => setBuilderType(e.target.value)} className="p-2.5 rounded-xl border border-slate-300 font-bold bg-slate-50">
                  <option value="قالیچه دستباف">قالیچه دستباف (Ghalicheh)</option>
                  <option value="قالی دستباف">قالی دستباف (Ghali)</option>
                  <option value="گلیم دستباف">گلیم دستباف (Kilim)</option>
                  <option value="پشتی سنتی">پشتی سنتی (Poshti)</option>
                  <option value="فرش مربع">فرش مربع (Square Rug)</option>
                </select>
                <select value={builderSize} onChange={(e) => setBuilderSize(e.target.value)} className="p-2.5 rounded-xl border border-slate-300 font-bold bg-slate-50">
                  <option value="دو ذرع (۲۰۰×۱۳۵ سانت)">دو ذرع (200×135 cm)</option>
                  <option value="ذرع و نیم (۱۵۰×۱۰۵ سانت)">ذرع و نیم (150×105 cm)</option>
                  <option value="ذرع و چارک (۱۲۵×۸۰ سانت)">ذرع و چارک (125×80 cm)</option>
                  <option value="۶ متری (۲۰۰×۳۰۰ سانت)">قالی ۶ متری (200×300 cm)</option>
                  <option value="۹ متری (۲۵۰×۳۵۰ سانت)">قالی ۹ متری (250×350 cm)</option>
                  <option value="۱۲ متری (۳۰۰×۴۰۰ سانت)">قالی ۱۲ متری (300×400 cm)</option>
                </select>
                <select value={builderAge} onChange={(e) => setBuilderAge(e.target.value)} className="p-2.5 rounded-xl border border-slate-300 font-bold bg-slate-50">
                  <option value="کهنه ذاتی">کهنه ذاتی (پاخور طبیعی)</option>
                  <option value="نوبافت">نوبافت (آکبند)</option>
                  <option value="کارکرده">کارکرده سالم و گوشت‌دار</option>
                  <option value="قدیمی و عتیقه">قدیمی و عتیقه (Antique)</option>
                </select>
                <select value={builderMaterial} onChange={(e) => setBuilderMaterial(e.target.value)} className="p-2.5 rounded-xl border border-slate-300 font-bold bg-slate-50">
                  <option value="چله ابریشم، رنگ گیاهی و ۶۰ رج">چله ابریشم + رنگ گیاهی + ۶۰ رج</option>
                  <option value="پشم کرک دست‌ریس و رنگ گیاهی">پشم کرک + رنگ گیاهی</option>
                  <option value="شناسنامه اصالت و ارسال هوایی">همراه با شناسنامه اصالت و کارگو</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => handleMerchantSend(`این ${builderType} در سایز ${builderSize}، ${builderAge} و دارای ${builderMaterial} است.`)}
                className="w-full py-3 px-4 rounded-2xl bg-rose-800 hover:bg-rose-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 ساخت جمله تخصصی، ارسال به طبقه بالا و پخش صوتی ۵ زبانه</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={merchantFaInput}
                onChange={(e) => setMerchantFaInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleMerchantSend(); }}
                placeholder="فرش‌فروش: هر جمله‌ای را به فارسی بنویسید (یا مستقیم دکمه روبرو را بزنید)..."
                className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-rose-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
              />
              <button
                type="button"
                onClick={() => handleMerchantSend()}
                className="px-5 py-2.5 rounded-2xl bg-rose-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>🇮🇷 ثبت و پخش در طبقه بالا</span>
              </button>
            </div>
          </div>

          {/* Also embed Smart Tools right below the Two-Tier Interpreter for instant access! */}
          <CarpetSmartTools />
        </div>
      )}

      {/* TAB 2: LEXICON */}
      {activeTab === 'lexicon' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredTerms.map((item: CarpetTermItem) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs text-rose-800 font-bold">
                <span>{item.categoryLabelFa}</span>
                <button onClick={() => handleCopy(`${item.termEn} | ${item.termAr}`, item.id)}>
                  {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <h3 className="text-lg font-black text-slate-900">{item.termFa}</h3>
              <p className="text-sm font-black text-slate-900" dir="ltr">🇬🇧 {item.termEn}</p>
              <p className="text-sm font-black text-amber-900">🇸🇦 {item.termAr}</p>
              <p className="text-xs text-slate-600">💡 {item.technicalNoteFa}</p>
              <div className="flex gap-2 pt-2">
                <button onClick={() => speakEnglish(item.merchantPitchEn, speechVoiceRate)} className="flex-1 py-2 rounded-xl bg-rose-800 text-white text-xs font-bold">
                  🔊 پخش انگلیسی
                </button>
                <button onClick={() => speakArabic(item.merchantPitchAr, speechVoiceRate)} className="flex-1 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold">
                  🔊 پخش عربی
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: DIMENSIONS TABLE */}
      {activeTab === 'dimensions' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50 font-black">
                <th className="p-3">نام قطع</th>
                <th className="p-3">ذرع</th>
                <th className="p-3">سانتی‌متر</th>
                <th className="p-3">فوت (Feet)</th>
                <th className="p-3">عربی</th>
                <th className="p-3">پخش صوتی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {STANDARD_CARPET_DIMENSIONS.map((row, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-black">{row.nameFa}</td>
                  <td className="p-3 font-bold text-rose-800">{row.zar}</td>
                  <td className="p-3 font-mono" dir="ltr">{row.metric}</td>
                  <td className="p-3 font-mono font-black text-emerald-800" dir="ltr">{row.imperial}</td>
                  <td className="p-3 font-bold text-amber-900">{row.arabic}</td>
                  <td className="p-3">
                    <button
                      onClick={() => speakEnglish(`${row.nameFa}, ${row.metric}, ${row.imperial}`, speechVoiceRate)}
                      className="px-3 py-1 rounded-lg bg-rose-800 text-white font-bold text-xs"
                    >
                      🔊 بگو
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: DIALOGUES */}
      {activeTab === 'dialogues' && (
        <div className="space-y-4">
          {CARPET_MERCHANT_DIALOGUES.map((dlg) => (
            <div key={dlg.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3">
              <h3 className="text-base font-black text-rose-900">{dlg.stageTitleFa}</h3>
              <p className="text-sm font-bold text-slate-800">🇮🇷 «{dlg.merchantReplyFa}»</p>
              <p className="text-sm font-black text-slate-950" dir="ltr">🇬🇧 "{dlg.merchantReplyEn}"</p>
              <p className="text-sm font-black text-amber-950">🇸🇦 «{dlg.merchantReplyAr}»</p>
              <p className="text-xs text-rose-900 font-bold">✨ {dlg.tradeTipFa}</p>
              <div className="flex gap-2">
                <button onClick={() => speakEnglish(dlg.merchantReplyEn, speechVoiceRate)} className="px-4 py-2 rounded-xl bg-rose-800 text-white text-xs font-bold">
                  🔊 پخش انگلیسی
                </button>
                <button onClick={() => speakArabic(dlg.merchantReplyAr, speechVoiceRate)} className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold">
                  🔊 پخش عربی
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
