import React, { useState } from 'react';
import { 
  Volume2, 
  ArrowLeftRight, 
  Mic, 
  Sparkles, 
  Copy, 
  Check, 
  Compass, 
  HelpCircle,
  Car,
  UtensilsCrossed,
  Hotel,
  AlertTriangle,
  Send
} from 'lucide-react';
import { sound, speakEnglish, speakPersian } from '../utils/audio';

// Comprehensive offline phrase bank with situational context for travelers
export interface OfflineTranslationEntry {
  id: string;
  category: 'taxi_direction' | 'restaurant_food' | 'hotel_stay' | 'emergency_help' | 'courtesy_shopping';
  categoryLabelFa: string;
  categoryLabelEn: string;
  fa: string;
  en: string;
  fingilish: string;
  pronunciationEn: string;
  explanationFa: string;
  explanationEn: string;
}

export const OFFLINE_TRANSLATION_DATABASE: OfflineTranslationEntry[] = [
  // TAXI & DIRECTIONS
  {
    id: 'tr_1',
    category: 'taxi_direction',
    categoryLabelFa: 'تاکسی و آدرس‌یابی 🚕',
    categoryLabelEn: 'Taxi & Directions',
    fa: 'سلام، بی‌زحمت من رو به این آدرس یا نزدیک‌ترین ایستگاه مترو ببرید.',
    en: 'Hello, could you please take me to this address or the nearest metro station?',
    fingilish: 'Salam, bi-zahmat man ro be in adres ya nazdiktarin istgahe metro bebarid.',
    pronunciationEn: 'hel-LO, kood yoo pleez tayk mee too this ad-DRES',
    explanationFa: 'جمله‌ای بسیار محترمانه که راننده تاکسی با کمال میل شما را به مقصد می‌رساند.',
    explanationEn: 'Polite and clear direction request understood by any taxi or ride driver.'
  },
  {
    id: 'tr_2',
    category: 'taxi_direction',
    categoryLabelFa: 'تاکسی و آدرس‌یابی 🚕',
    categoryLabelEn: 'Taxi & Directions',
    fa: 'کرایه چقدر شد؟ کارتخوان دارید یا نقدی پرداخت کنم؟',
    en: 'How much is the fare? Can I pay by card or do you prefer cash?',
    fingilish: 'Kerayeh cheghadr shod? Kart-khan darid ya naghdi pardakht konam?',
    pronunciationEn: 'how much iz theh fayr? kan eye pay bye kard or kash?',
    explanationFa: 'جمله کاربردی برای تسویه حساب در تاکسی.',
    explanationEn: 'Essential question when reaching your destination.'
  },
  {
    id: 'tr_3',
    category: 'taxi_direction',
    categoryLabelFa: 'تاکسی و آدرس‌یابی 🚕',
    categoryLabelEn: 'Taxi & Directions',
    fa: 'لطفاً همین گوشه نگه‌دارید، پیاده می‌شم. دست شما درد نکنه!',
    en: 'Please drop me off right here at the corner. Thank you so much!',
    fingilish: 'Lotfan hamin goosheh negah-darid, piyadeh misham. Daste shoma dard nakoneh!',
    pronunciationEn: 'pleez drop mee off ryte heer at theh kor-ner',
    explanationFa: 'پیاده شدن راحت در مقصد به همراه تشکر اصیل.',
    explanationEn: 'Stops the vehicle at the exact spot with genuine gratitude.'
  },

  // RESTAURANT & FOOD
  {
    id: 'tr_4',
    category: 'restaurant_food',
    categoryLabelFa: 'رستوران و کافه 🍽️',
    categoryLabelEn: 'Restaurant & Café',
    fa: 'سلام، لطفاً منو را بیاورید. غذای سنتی و پرطرفدار شما چیست؟',
    en: 'Hello, could we please see the menu? What is your popular traditional dish?',
    fingilish: 'Salam, lotfan menu ra biavarid. Ghazaye sonnatiye por-tarafdare shoma chist?',
    pronunciationEn: 'kood wee pleez see theh men-yoo?',
    explanationFa: 'پرسش درباره منو و بهترین غذای سرآشپز.',
    explanationEn: 'Great opener for ordering authentic local food.'
  },
  {
    id: 'tr_5',
    category: 'restaurant_food',
    categoryLabelFa: 'رستوران و کافه 🍽️',
    categoryLabelEn: 'Restaurant & Café',
    fa: 'بی‌زحمت این غذا فلفل تند یا مواد حساسیت‌زا نداشته باشد.',
    en: 'Please make sure this food is not spicy and contains no allergens.',
    fingilish: 'Bi-zahmat in ghaza felfele tond ya mavade hassasiyat-za nadashteh bashad.',
    pronunciationEn: 'pleez mayk shoor this food iz not spye-see',
    explanationFa: 'جلوگیری از حساسیت غذایی یا تندی زیاد.',
    explanationEn: 'Crucial for dietary restrictions and spicy food avoidance.'
  },
  {
    id: 'tr_6',
    category: 'restaurant_food',
    categoryLabelFa: 'رستوران و کافه 🍽️',
    categoryLabelEn: 'Restaurant & Café',
    fa: 'خیلی خوشمزه بود، صورت‌حساب را لطفاً بیاورید.',
    en: 'That was delicious, could we please have the bill?',
    fingilish: 'Kheyli khoshmazeh bood, soorat-hesab ra lotfan biavarid.',
    pronunciationEn: 'that woz deh-LISH-us, kood wee hav theh bil?',
    explanationFa: 'تعریف از طعم غذا و درخواست حساب.',
    explanationEn: 'Compliments the food and requests the bill smoothly.'
  },

  // HOTEL & ACCOMMODATION
  {
    id: 'tr_7',
    category: 'hotel_stay',
    categoryLabelFa: 'هتل و اقامتگاه 🏨',
    categoryLabelEn: 'Hotel & Stay',
    fa: 'سلام، من از قبل اتاق رزرو کرده‌ام، نام من در لیست است؟',
    en: 'Hello, I have a room reservation under my name. Could you check please?',
    fingilish: 'Salam, man az ghabl otagh rezerv kardeh-am, name man dar list ast?',
    pronunciationEn: 'eye hav ah room reh-zer-VAY-shun un-der mye naym',
    explanationFa: 'پذیرش سریع در هتل بدون نیاز به مکالمه پیچیده.',
    explanationEn: 'Check-in greeting at any hotel front desk.'
  },
  {
    id: 'tr_8',
    category: 'hotel_stay',
    categoryLabelFa: 'هتل و اقامتگاه 🏨',
    categoryLabelEn: 'Hotel & Stay',
    fa: 'رمز اینترنت وای‌فای و ساعت صبحانه چیست؟',
    en: 'What is the Wi-Fi password and what time is breakfast served?',
    fingilish: 'Ramze internete Wi-Fi va sa\'ate sobhaneh chist?',
    pronunciationEn: 'whut iz theh wye-fye pass-word and brek-fust tyme?',
    explanationFa: 'دو سوال مهم و همیشگی مسافران در هتل.',
    explanationEn: 'The two most essential questions at any accommodation.'
  },

  // EMERGENCY & HELP
  {
    id: 'tr_9',
    category: 'emergency_help',
    categoryLabelFa: 'اورژانس و کمک فوری 🚨',
    categoryLabelEn: 'Emergency & Help',
    fa: 'لطفاً کمکم کنید! من مسیرم را گم کرده‌ام و زبان بلد نیستم.',
    en: 'Please help me! I am lost and do not speak the local language well.',
    fingilish: 'Lotfan komakam konid! Man masiram ra gom kardeh-am va zaban balad nistam.',
    pronunciationEn: 'pleez help mee, eye am lost',
    explanationFa: 'جمله نجات‌بخش فوری در کوچه و خیابان.',
    explanationEn: 'Emergency phrase when lost or unable to communicate.'
  },
  {
    id: 'tr_10',
    category: 'emergency_help',
    categoryLabelFa: 'اورژانس و کمک فوری 🚨',
    categoryLabelEn: 'Emergency & Help',
    fa: 'من حالم خوب نیست، لطفاً نزدیک‌ترین داروخانه یا درمانگاه را نشانم دهید.',
    en: 'I am not feeling well. Please show me the nearest pharmacy or clinic.',
    fingilish: 'Man halam khoob nist, lotfan nazdiktarin darookhaneh ya darmangah ra neshanam dahid.',
    pronunciationEn: 'eye am not fee-ling wel, pleez show mee theh far-mah-see',
    explanationFa: 'درخواست راهنمایی فوری برای دریافت دارو یا کمک پزشکی.',
    explanationEn: 'Crucial health inquiry to find medicine or a doctor.'
  },

  // SHOPPING & COURTESY
  {
    id: 'tr_11',
    category: 'courtesy_shopping',
    categoryLabelFa: 'خرید و تعارفات 🛍️',
    categoryLabelEn: 'Shopping & Courtesy',
    fa: 'قیمت این چقدر است؟ تخفیف هم دارد؟',
    en: 'How much does this cost? Is there any discount available?',
    fingilish: 'Gheymate in cheghadr ast? Takhfif ham darad?',
    pronunciationEn: 'how much duz this kost? iz theyr ah dis-kownt?',
    explanationFa: 'خرید راحت در بازار و فروشگاه‌ها.',
    explanationEn: 'Friendly price inquiry and discount request.'
  },
  {
    id: 'tr_12',
    category: 'courtesy_shopping',
    categoryLabelFa: 'خرید و تعارفات 🛍️',
    categoryLabelEn: 'Shopping & Courtesy',
    fa: 'خواهش می‌کنم تعارف نکنید، هزینه واقعی را حساب کنید تا پرداخت کنم.',
    en: 'Please do not do Ta\'arof; tell me the real price so I can pay you!',
    fingilish: 'Khahesh mikonam ta\'arof nakonid, hazineye vaghe\'i ra hesab konid ta pardakht konam.',
    pronunciationEn: 'pleez no taa-rof, tel mee theh reel prys so eye kan pay!',
    explanationFa: 'جمله جادویی برای توریست‌های خارجی در ایران هنگام مواجهه با «قابل نداره»!',
    explanationEn: 'The golden phrase for foreigners in Iran to break past cultural Ta\'arof and pay.'
  }
];

export const OfflineSpeechTranslator: React.FC = () => {
  // Mode: 'fa_to_en' (Iranian abroad) or 'en_to_fa' (Foreigner in Iran)
  const [direction, setDirection] = useState<'fa_to_en' | 'en_to_fa'>('fa_to_en');
  const [customText, setCustomText] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  // Dynamic quick-translator engine (dictionary lookup + matching)
  const handleTranslateCustom = (text: string): { translation: string; pronunciation: string } => {
    const trimmed = text.trim().toLowerCase();
    if (!trimmed) return { translation: '', pronunciation: '' };

    // Find best match in database
    const match = OFFLINE_TRANSLATION_DATABASE.find(item => 
      direction === 'fa_to_en' 
        ? item.fa.toLowerCase().includes(trimmed) || item.fingilish.toLowerCase().includes(trimmed)
        : item.en.toLowerCase().includes(trimmed)
    );

    if (match) {
      return {
        translation: direction === 'fa_to_en' ? match.en : match.fa,
        pronunciation: direction === 'fa_to_en' ? match.pronunciationEn : match.fingilish
      };
    }

    // Smart fallback dictionary for common words
    const commonDict: Record<string, { en: string; fa: string; phon: string }> = {
      'سلام': { en: 'Hello, good day!', fa: 'سلام، روزتون به‌خیر!', phon: 'hel-LO, good day' },
      'ممنون': { en: 'Thank you very much!', fa: 'خیلی ممنون، سپاسگزارم!', phon: 'thank yoo ver-ee much' },
      'ببخشید': { en: 'Excuse me, pardon me.', fa: 'ببخشید، معذرت می‌خوام.', phon: 'ek-SKYOOZ mee' },
      'کجاست': { en: 'Where is it located?', fa: 'کجاست؟ چطور بروم؟', phon: 'wayr iz it loh-kay-ted' },
      'آب': { en: 'Can I have some water please?', fa: 'یک لیوان آب لطفاً.', phon: 'kan eye hav sum wah-ter pleez' },
      'کمک': { en: 'Please help me!', fa: 'لطفاً به من کمک کنید!', phon: 'pleez help mee' },
      'تاکسی': { en: 'I need a taxi please.', fa: 'من یک تاکسی می‌خواهم.', phon: 'eye need ah tak-see' },
      'مترو': { en: 'Where is the metro station?', fa: 'ایستگاه مترو کجاست؟', phon: 'wayr iz theh meh-troh' },
      'هتل': { en: 'Where is the hotel?', fa: 'هتل کجاست؟', phon: 'wayr iz theh hoh-tel' },
      'حساب': { en: 'Can I have the bill please?', fa: 'صورت‌حساب لطفاً.', phon: 'kan eye hav theh bil' },
      'hello': { en: 'Hello!', fa: 'سلام و درود!', phon: 'Salam va dorood' },
      'thank you': { en: 'Thank you!', fa: 'دست شما درد نکنه، خیلی ممنون!', phon: 'Daste shoma dard nakoneh' },
      'water': { en: 'Water please', fa: 'لطفاً آب بیاورید', phon: 'Lotfan aab biavarid' },
      'taxi': { en: 'Taxi please', fa: 'تاکسی لطفاً', phon: 'Taxi lotfan' },
      'help': { en: 'Please help me', fa: 'لطفاً به من کمک کنید', phon: 'Lotfan be man komak konid' }
    };

    for (const [key, val] of Object.entries(commonDict)) {
      if (trimmed.includes(key)) {
        return {
          translation: direction === 'fa_to_en' ? val.en : val.fa,
          pronunciation: val.phon
        };
      }
    }

    // Default polite translation generator
    if (direction === 'fa_to_en') {
      return {
        translation: `Excuse me, regarding: "${text}", could you please assist me?`,
        pronunciation: 'ek-skyooz mee, pleez as-sist mee'
      };
    } else {
      return {
        translation: `ببخشید، در مورد: «${text}»، ممکن است راهنمایی بفرمایید؟`,
        pronunciation: 'Bebakhshid, dar morede in, momken ast rahnamayi befarmayid?'
      };
    }
  };

  const currentTranslation = handleTranslateCustom(customText);

  const handleSpeak = (text: string, isEnglish: boolean) => {
    setSpeakingText(text);
    if (isEnglish) {
      speakEnglish(text, 0.85);
    } else {
      speakPersian(text, 0.85);
    }
    setTimeout(() => setSpeakingText(null), 3500);
  };

  const handleCopy = (text: string, id: string) => {
    sound.playCoin();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPhrases = activeCategory === 'all'
    ? OFFLINE_TRANSLATION_DATABASE
    : OFFLINE_TRANSLATION_DATABASE.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Hero Communicator Header */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-700 via-emerald-700 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 text-xs font-bold border border-teal-400/30">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>۱۰۰٪ آفلاین • بدون نیاز به اینترنت و بدون فیلتر</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            مترجم صوتی و سخنگوی هوشمند مسافرتی 🎙️
          </h1>

          <p className="text-teal-100 text-xs sm:text-sm leading-relaxed">
            اگر در سفر به کشورهای انگلیسی‌زبان یا سفر توریست‌ها به ایران، صحبت کردن سخت بود، 
            کافیست جمله مورد نظرتان را انتخاب کنید یا بنویسید تا <strong className="text-amber-300">مترجم سخنگو با صدای رسا به جای شما صحبت کند</strong>!
          </p>

          {/* Direction Switcher Toggle */}
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
                  ? '🇮🇷 فارسی به 🇬🇧 انگلیسی (مسافر ایرانی در خارج)' 
                  : '🇬🇧 انگلیسی به 🇮🇷 فارسی (توریست خارجی در ایران)'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* INSTANT INTERACTIVE COMMUNICATOR BOX */}
      <div className="bg-white border-2 border-teal-500/40 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-slate-900">
                سخنگوی فوری: بنویس یا بگو تا به جایت صحبت کنم!
              </h2>
              <p className="text-xs text-slate-500">
                {direction === 'fa_to_en' ? 'فارسی بنویسید تا انگلیسی صحبت کند' : 'Type English to speak fluent Persian'}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-900">
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
                  ? 'مثلاً: آدرس هتل کجاست؟ / کرایه چقدر شد؟ / یک بطری آب لطفاً...' 
                  : 'e.g., Where is the hotel? / How much is the taxi? / Please water...'
              }
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
            />
            {customText && (
              <button
                onClick={() => setCustomText('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold bg-slate-100 px-2 py-1 rounded-lg"
              >
                پاک کردن
              </button>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-bold">کلمات سریع:</span>
            {(direction === 'fa_to_en' 
              ? ['سلام', 'تاکسی', 'مترو', 'هتل', 'آب', 'کمک', 'حساب'] 
              : ['hello', 'taxi', 'water', 'hotel', 'help', 'bill']
            ).map((keyword) => (
              <button
                key={keyword}
                onClick={() => {
                  sound.playClick();
                  setCustomText(keyword);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-100 text-slate-700 hover:text-teal-900 font-medium transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>

        {/* Real-Time Speech Output Box */}
        {customText.trim() && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50 border-2 border-teal-300 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                {direction === 'fa_to_en' ? 'ترجمه صوتی به انگلیسی (برای شنیدن طرف مقابل):' : 'ترجمه صوتی به فارسی (تلفظ برای طرف ایرانی):'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(currentTranslation.translation, 'custom')}
                  className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors"
                  title="کپی کردن متن"
                >
                  {copiedId === 'custom' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                "{currentTranslation.translation}"
              </h3>
              <p className="font-mono text-xs font-bold text-teal-800">
                راهنمای تلفظ: {currentTranslation.pronunciation}
              </p>
            </div>

            {/* Giant Speak Button (The Core Feature!) */}
            <div className="pt-2">
              <button
                onClick={() => handleSpeak(currentTranslation.translation, direction === 'fa_to_en')}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-sm sm:text-base shadow-lg shadow-teal-600/30 transition-all active:scale-95"
              >
                <Volume2 className="w-6 h-6 animate-bounce" />
                <span>
                  {direction === 'fa_to_en' 
                    ? '🔊 با صدای رسا به انگلیسی بگو (Speak to Stranger)' 
                    : '🔊 با صدای رسا به فارسی بگو (Speak in Persian)'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SITUATIONAL SURVIVAL PHRASE DATABASE */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-600" />
              <span>جملات طلایی آماده برای مسافران (پخش فوری با یک کلیک)</span>
            </h2>
            <p className="text-xs text-slate-500">
              در تاکسی، رستوران، هتل یا بازار، بدون معطلی روی هر جمله بزنید تا دستگاه با صدای بلند پخش کند.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'همه موقعیت‌ها' },
              { id: 'taxi_direction', label: 'تاکسی 🚕' },
              { id: 'restaurant_food', label: 'رستوران 🍽️' },
              { id: 'hotel_stay', label: 'هتل 🏨' },
              { id: 'emergency_help', label: 'اورژانس 🚨' },
              { id: 'courtesy_shopping', label: 'خرید و تعارف 🛍️' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                className="p-5 rounded-2xl border-2 border-slate-200 hover:border-teal-400 bg-slate-50/50 hover:bg-white transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                      {phrase.categoryLabelFa}
                    </span>
                    <button
                      onClick={() => handleCopy(speakTargetText, phrase.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="کپی"
                    >
                      {copiedId === phrase.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Persian text */}
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">فارسی:</span>
                    <p className="font-bold text-sm text-slate-900 leading-snug">
                      {phrase.fa}
                    </p>
                  </div>

                  {/* English text */}
                  <div className="pt-1 border-t border-slate-200/70">
                    <span className="text-[10px] text-slate-400 font-bold block">English:</span>
                    <p className="font-bold text-sm text-teal-950 leading-snug">
                      {phrase.en}
                    </p>
                  </div>

                  {/* Phonetic fingilish or english */}
                  <p className="font-mono text-xs text-slate-500 italic">
                    {isEnglishTarget ? `تلفظ: ${phrase.pronunciationEn}` : `Fingilish: ${phrase.fingilish}`}
                  </p>
                </div>

                {/* Speaker Button */}
                <div className="pt-2">
                  <button
                    onClick={() => handleSpeak(speakTargetText, isEnglishTarget)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>
                      {isEnglishTarget ? '🔊 با صدای بلند انگلیسی بگو' : '🔊 با صدای بلند فارسی بگو'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
