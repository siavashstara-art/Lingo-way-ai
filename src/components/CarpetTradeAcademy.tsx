import React, { useState } from 'react';
import {
  Volume2,
  Award,
  Ruler,
  BookOpen,
  MessageSquare,
  CheckCircle2,
  Search,
  Copy,
  Check,
  Store,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  CARPET_TERMINOLOGY_DB,
  CARPET_MERCHANT_DIALOGUES,
  CARPET_NEGOTIATION_QUIZZES,
  CarpetTermItem
} from '../data/carpetTradeData';
import { sound, speakEnglish, speakPersian, speakArabic } from '../utils/audio';

interface CarpetTradeAcademyProps {
  onEarnLingous: (amount: number, reason: string) => void;
  speechVoiceRate?: number;
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

export const CarpetTradeAcademy: React.FC<CarpetTradeAcademyProps> = ({
  onEarnLingous,
  speechVoiceRate = 0.85
}) => {
  const [activeTab, setActiveTab] = useState<'lexicon' | 'dimensions' | 'dialogues' | 'simulator'>('lexicon');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [completedQuizIds, setCompletedQuizIds] = useState<string[]>([]);

  const handleCopy = (text: string, id: string) => {
    sound.playCoin();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
            <span>۱۰۰٪ آفلاین (فارسی • انگلیسی • عربی)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black leading-tight text-amber-50">
            آکادمی تخصصی تجارت جهانی فرش و مکالمه با مشتریان خارجی 🧶
          </h1>

          {/* Tribute Box in Memory of Late Father Haj Hassan Agha Ali Miri */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/35 border border-amber-400/40 space-y-2">
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-bold">
              🌹 این بخش در پاسداشت و کمک به ترویج تجارت هنر بومی فرش دستباف ایران و در بزرگداشت پدر مرحومم <strong className="text-amber-300 underline decoration-amber-400/60 underline-offset-4">شادروان حاج حسن آقای علی‌میری</strong> که از تاجران بنام، خوش‌نام و صاحب‌سبک فرش ایران و جهان بودند، به صورت کاملاً رایگان و آفلاین تقدیم به تمامی فرش‌فروشان، بافندگان و علاقه‌مندان فرش ایرانی می‌گردد.
            </p>
            <p className="text-[11px] sm:text-xs text-amber-200/80 italic">
              Dedicated in loving memory of the late Master Merchant Haj Hassan Agha Ali Miri, a distinguished pioneer of Iranian & international handwoven carpet trade.
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
          <span>مکالمه حجره با مشتری انگلیسی و عرب‌زبان</span>
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
          <span>آزمون و شبیه‌ساز فروش به توریست و تاجر خارجی</span>
        </button>
      </div>

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
                        onClick={() => speakArabic(item.termAr, speechVoiceRate)}
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
                      onClick={() => speakArabic(item.merchantPitchAr, speechVoiceRate)}
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
                      onClick={() => speakArabic(dlg.merchantReplyAr, speechVoiceRate)}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>🔊 پخش صوتی پاسخ به عربی برای مشتری</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-xs text-rose-950 font-medium">
                  ✨ <strong>راز حجره و تجارت (به یاد حاج حسن آقا علی‌میری):</strong> {dlg.tradeTipFa}
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
