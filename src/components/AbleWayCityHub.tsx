import React, { useState } from 'react';
import {
  Crown,
  Landmark,
  HeartHandshake,
  Users,
  Award,
  FileCheck2,
  Building2,
  Sparkles,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound, speakPersian, speakEnglish } from '../utils/audio';

interface AbleWayCityHubProps {
  lingous: number;
  onEarnLingous: (amount: number) => void;
}

const SEVEN_DEMOCRATIC_RANKS = [
  { rank: 1, titleEn: '1. Citizen Pioneer • Шаҳрванд • Fuqaro', titleFa: '۱. شهروند پیشگام (Шаҳрванд / Citizen Pioneer)', minXp: 0, badge: '🌱', rightsFa: 'حق رأی شهری، دریافت آموزش ۱۰۰٪ رایگان و شرکت در ۸ لیگ ورزش فکری' },
  { rank: 2, titleEn: '2. Cultural Ambassador • Сафири Фарҳанг • Madaniyat Elchisi', titleFa: '۲. سفیر فرهنگی و استاد صنف (Сафири Фарҳанг)', minXp: 300, badge: '⚒️', rightsFa: 'دریافت پروانه کسب‌وکار دیجیتال (Иҷозатномаи Тиҷорат) در بازار شهر توانا' },
  { rank: 3, titleEn: '3. District Councilor • Узви Шӯро • Kengash Aʼzosi', titleFa: '۳. عضو شورای محله (Узви Шӯро / District Councilor)', minXp: 600, badge: '🏛️', rightsFa: 'دریافت سند رسمی مالکیت زمین (Эҳдои Замин) در بلوارهای سمرقند، بخارا، دوشنبه و تفلیس' },
  { rank: 4, titleEn: '4. Dynasty Founder • Асосгузори Оила / Хонадон', titleFa: '۴. مؤسس فامیل و خاندان جهانی (Асосгузори Оила / Хонадон)', minXp: 1000, badge: '🛡️', rightsFa: 'تأسیس رسمی فامیل/خاندان جهانی و فعال‌سازی موتور قانونی هبه ۳۰٪ تا ۳۹٪ (Ҳадяи 30% то 39% EXP)' },
  { rank: 5, titleEn: '5. City Senator • Сенатори Шаҳри Тавоно • Senator', titleFa: '۵. سناتور منتخب شهر توانا (Сенатор / City Senator)', minXp: 2000, badge: '⚖️', rightsFa: 'عضویت در سنای دموکراسی ثروت و قدرت (Демократияи Сарват ва Қудрат)' },
  { rank: 6, titleEn: '6. Cabinet Minister • Вазири Девон • Vazir', titleFa: '۶. وزیر کابینه فرهنگ و اقتصاد (Вазири Девон / Cabinet Minister)', minXp: 3500, badge: '👑', rightsFa: 'مدیریت کلان تالارهای ۵ گانه گفتگو و لیگ‌های جهانی' },
  { rank: 7, titleEn: '7. Supreme Council Seat • Курсии Шӯрои Олии Шаҳри Тавоно', titleFa: '۷. کرسی شورای عالی شهر توانا (Курсии Шӯрои Олии Шаҳри Тавоно)', minXp: 5000, badge: '🌟', rightsFa: 'بالاترین کرسی دموکراسی ثروت و قدرت در شهر توانا (AbleWay / Tavana City)' }
];

const CITY_DISTRICTS = [
  { id: 'd_1', nameFa: 'بلوار فردوسی و تالار زبان پارسی', nameEn: 'Ferdowsi Royal Boulevard', plotCode: 'AWC-FERDOWSI-101', businessType: 'آکادمی دوزبانه و کتابخانه دیجیتال' },
  { id: 'd_2', nameFa: 'بلوار زرین سمرقند، بخارا و دوشنبه (Хиёбони Самарқанду Бухоро ва Душанбе)', nameEn: 'Samarkand, Bukhara & Dushanbe Royal Avenue', plotCode: 'AWC-SAMARKAND-777', businessType: 'مرکز تجارت و فرهنگ سامانیان (Эҳдои Замин ва Иҷозатномаи Тиҷорат)' },
  { id: 'd_3', nameFa: 'بلوار تفلیس، هرات، بلخ و کابل (თბილისი • هرات و بلخ)', nameEn: 'Tbilisi, Herat, Balkh & Kabul Heritage Plaza', plotCode: 'AWC-TBILISI-BALKH-303', businessType: 'نگارخانه دوستی ملل، شعر مولانا و تجارت منطقه‌ای' },
  { id: 'd_4', nameFa: 'چهارراه بازار بزرگ فرش و هنر اصیل ایران (پلاک ۴۸)', nameEn: 'Grand Persian Carpet & Heritage Plaza', plotCode: 'AWC-CARPET-48', businessType: 'نگارخانه فرش دستباف و صادرات جهانی' },
  { id: 'd_5', nameFa: 'میدان فناوری، کردیت ۸۵۰ و تجارت جهانی', nameEn: 'Silicon & 850 FinTech Square', plotCode: 'AWC-FINTECH-850', businessType: 'دفتر مشاوره مالی، استارتاپ و حقوق بین‌الملل' }
];

export const AbleWayCityHub: React.FC<AbleWayCityHubProps> = ({ lingous, onEarnLingous }) => {
  const [subTab, setSubTab] = useState<'city_map_deed' | 'ranks_7' | 'dynasty_heba30'>('city_map_deed');
  const [citizenName, setCitizenName] = useState<string>('S. Ali-Miri');
  const [selectedDistrict, setSelectedDistrict] = useState(CITY_DISTRICTS[0]);
  const [deedIssued, setDeedIssued] = useState<boolean>(true);

  // Dynasty & 30% Heba State
  const [dynastyName, setDynastyName] = useState<string>('خاندان بزرگ علی‌میری و پارسیان (Ali-Miri & Parsian Global Dynasty)');
  const [recipientName, setRecipientName] = useState<string>('فرزند / عضو فامیل یا زبان‌آموز دارای ADHD');
  const [hebaPercentage, setHebaPercentage] = useState<number>(30);
  const [hebaHistory, setHebaHistory] = useState<
    Array<{ id: string; recipient: string; amount: number; pct: number; date: string }>
  >([
    {
      id: 'hb_1',
      recipient: 'آریا (فرزند خانواده در تورنتو 🇨🇦)',
      amount: 75,
      pct: 30,
      date: 'امروز'
    }
  ]);

  // =========================================================================
  // MASTER–STUDENT INTERNAL LEARNING RANK & TEACHER DUEL SYSTEM STATE
  // =========================================================================
  const [learningRankStatus, setLearningRankStatus] = useState<
    'STUDENT' | 'TEACHER_CANDIDATE' | 'TEACHER_RANK' | 'TEACHER_RANK_REVIEW'
  >('STUDENT');
  const [successfulChallengesCount, setSuccessfulChallengesCount] = useState<number>(9);
  const [teacherDefeatStrikes, setTeacherDefeatStrikes] = useState<number>(0);
  const [aiAssessmentPassed, setAiAssessmentPassed] = useState<boolean>(false);
  const [selectedAssessmentAnswer, setSelectedAssessmentAnswer] = useState<number | null>(null);
  const [duelStatusMessage, setDuelStatusMessage] = useState<string | null>(null);
  const [activeLeagueGroup, setActiveLeagueGroup] = useState<'WINNERS_GROUP' | 'CHALLENGERS_GROUP'>('WINNERS_GROUP');

  // =========================================================================
  // TEAM LEAGUE STRATEGIC STUDENT SELECTION & NO-AI-ON-LOSS REFLECTION STATE
  // =========================================================================
  const [selectedTeammateId, setSelectedTeammateId] = useState<string>('student_a');
  const [teamMatchOutcome, setTeamMatchOutcome] = useState<'IDLE' | 'WIN' | 'LOSS'>('IDLE');
  const [showSelfReflectionPad, setShowSelfReflectionPad] = useState<boolean>(false);
  const [learnerSelfReflectionNote, setLearnerSelfReflectionNote] = useState<string>('');
  const [teammateCovenantSigned, setTeammateCovenantSigned] = useState<boolean>(true);

  const TEACHER_OWN_PROFILE = {
    strengthsEn: 'Strong Grammar & Vocabulary • Structured Explanation',
    strengthsFa: 'نقطه قوت شما (استاد): گرامر و دایره واژگان قوی • نیاز به مکمل در مهارت شنیداری سریع (Listening)',
    weaknessAreaFa: 'مهارت شنیداری سریع در محاوره و مدیریت فشار زمانی'
  };

  const ELIGIBLE_TEAM_STUDENTS = [
    {
      id: 'student_a',
      code: 'STUDENT A',
      nameFa: 'هنرجو الف (سهراب — تمرکز روی شنیدار و مکالمه)',
      strengthsEn: 'Listening + Speaking',
      strengthsFa: 'مهارت شنیداری (Listening) عالی + مکالمه خودمانی روان (Speaking)',
      metricsFa: 'عملکرد اخیر: بالا • حل مسئله و کار تحت فشار: قوی • ثبات و مسؤلیت‌پذیری: بالا',
      complementarityFa: 'مکمل بسیار قوی برای پوشش دادن بخش شنیداری و سرعت پاسخ‌گویی تیم شما',
      potentialContribution: 'High (مکمل بالا با پروفایل استاد)'
    },
    {
      id: 'student_b',
      code: 'STUDENT B',
      nameFa: 'هنرجو ب (نگار — تمرکز روی گرامر و واژگان)',
      strengthsEn: 'Grammar + Vocabulary',
      strengthsFa: 'گرامر دقیق (Grammar) + دایره واژگان گسترده (Vocabulary)',
      metricsFa: 'عملکرد اخیر: خوب • دقت نوشتاری: بالا • هم‌پوشانی مهارتی با نقاط قوت خود استاد',
      complementarityFa: 'تقویت مضاعف بخش گرامر، اما پوشش کمتر در بخش شنیداری سریع',
      potentialContribution: 'Medium / High (متوسط تا بالا)'
    },
    {
      id: 'student_c',
      code: 'STUDENT C',
      nameFa: 'هنرجو ج (آرش — دوست صمیمی / در حال توسعه مهارت‌های پایه)',
      strengthsEn: 'Developing Foundations + Enthusiastic Learner',
      strengthsFa: 'انگیزه بالا و آشنایی قبلی • در حال تقویت ثبات در چالش‌های پرفشار',
      metricsFa: 'عملکرد چالش‌ها: در حال رشد • نیازمند هماهنگی و آماده‌سازی بیشتر پیش از مسابقه',
      complementarityFa: 'انتخاب بر پایه آشنایی؛ نیازمند تمرین و هماهنگی بیشتر برای رقابت‌های سنگین',
      potentialContribution: 'Developing (نیازمند آماده‌سازی هدفمند)'
    }
  ];

  const TEN_AI_TEACHER_ASSESSMENT_CRITERIA = [
    { id: 1, en: '1. Subject Knowledge', fa: '۱. دانش موضوعی (تسلط بر واژگان، محاوره و ساختار زبان)' },
    { id: 2, en: '2. Conceptual Understanding', fa: '۲. درک مفهومی (فهم عمیق تفاوت زبان کتابی و خودمانی)' },
    { id: 3, en: '3. Explanation Quality', fa: '۳. کیفیت توضیح‌دهی (بیان شفاف و قابل فهم برای دیگر زبان‌آموزان)' },
    { id: 4, en: '4. Ability to Simplify Concepts', fa: '۴. توانایی ساده‌سازی مفاهیم («مثل آب خوردن» کردن مطالب)' },
    { id: 5, en: '5. Ability to Answer Questions', fa: '۵. توانایی پاسخ‌گویی دقیق به پرسش‌های هنرجویان' },
    { id: 6, en: '6. Error Detection', fa: '۶. تشخیص خطا (شناسایی غلط املایی یا خطای جمله‌سازی)' },
    { id: 7, en: '7. Error Correction', fa: '۷. اصلاح خطا (ارائه دیکته صحیح و کل جمله درست با احترام)' },
    { id: 8, en: '8. Adaptation to Learner Level', fa: '۸. تطبیق با سطح زبان‌آموز (مبتدی، کودک یا بزرگسال)' },
    { id: 9, en: '9. Teaching Communication', fa: '۹. ارتباط آموزشی صمیمی، انگیزشی و بدون تحقیر' },
    { id: 10, en: '10. Consistency', fa: '۱۰. پیوستگی و ثبات در یادگیری و آموزش مستمر' }
  ];

  const maxHebaAmount = Math.max(15, Math.floor((lingous * hebaPercentage) / 100));

  const handleExecuteHeba = () => {
    sound.playLevelUp();
    try { confetti({ particleCount: 55, spread: 70 }); } catch {}
    const entry = {
      id: `hb_${Date.now()}`,
      recipient: recipientName.trim() || 'فرزند / زبان‌آموز دارای ADHD',
      amount: maxHebaAmount,
      pct: hebaPercentage,
      date: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };
    setHebaHistory((prev) => [entry, ...prev]);
    onEarnLingous(25);
    speakPersian(
      `گواهی رسمی هبه سی درصد صادر شد! مبلغ ${maxHebaAmount} امتیاز با موفقیت به ${entry.recipient} هدیه گردید.`,
      0.85
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 border-2 border-amber-400 shadow-xl space-y-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
            <Crown className="w-4 h-4" />
            <span>🏛️ MODULE 4: ABLEWAY CITY VIRTUAL METAVERSE — 100% IN-APP GAMIFIED ECONOMY & CITIZENSHIP</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-300 pt-1">
            شهر مجازی و آرمانی AbleWay City: اقتصاد بازی‌وارشده درون‌برنامه‌ای، اسناد مجازی شهروندی، خاندان و هبه ۳۰٪
          </h2>
          <div className="p-3 rounded-2xl bg-black/40 border border-amber-400/50 space-y-1">
            <span className="text-[11px] font-black text-amber-300 block">
              ⚖️ شفاف‌سازی قانونی و خط‌مشی گوگل پلی و اپ استور (Legal & Google Play Compliance Policy):
            </span>
            <p className="text-xs text-amber-100 leading-relaxed">
              <strong>شهر توانا (AbleWay City) یک دنیای مجازی و اکوسیستم بازی‌وارشده (In-App Virtual Gamified World) در داخل همین برنامه است.</strong> تمامی اسناد، قطعات زمین، پروانه‌های کسب، پلاک‌ها و مناصب صرفاً <strong>امتیازات و دارایی‌های مجازی درون‌برنامه‌ای (In-App Virtual Assets)</strong> برای ایجاد انگیزه، آموزش سواد مالی و شبیه‌سازی کارآفرینی هستند و هیچ‌گونه ادعا یا تعهد ملکی در دنیای فیزیکی و املاک واقعی خارج از برنامه ندارند.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          {[
            { id: 'city_map_deed' as const, label: '🗺️ ۱. نقشه شهر، سند زمین و پروانه کسب‌وکار', icon: FileCheck2 },
            { id: 'ranks_7' as const, label: '👑 ۲. هفت منصب مدیریتی + نظام شاگرد و استاد (Teacher Duel)', icon: Landmark },
            { id: 'dynasty_heba30' as const, label: '💝 ۳. تأسیس فامیل/خاندان و موتور قانونی هبه ۳۰٪', icon: HeartHandshake }
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSubTab(t.id);
                }}
                className={`p-3.5 rounded-2xl border-2 text-right font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  subTab === t.id
                    ? 'bg-amber-400 text-slate-950 border-white shadow-md'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. INTERACTIVE MAP + OFFICIAL LAND DEED & BUSINESS LICENSE */}
      {subTab === 'city_map_deed' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6 bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              🗺️ نقشه تعاملی پایتخت AbleWay City (انتخاب ناحیه برای صدور رایگان سند زمین و پروانه کسب):
            </h3>
            <div className="space-y-2.5">
              {CITY_DISTRICTS.map((dist) => {
                const isSelected = selectedDistrict.id === dist.id;
                return (
                  <button
                    key={dist.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedDistrict(dist);
                      setDeedIssued(true);
                    }}
                    className={`w-full p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-950 text-white border-amber-400 shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-200'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-black">{dist.nameFa}</p>
                      <p className="text-xs text-amber-400 font-mono" dir="ltr">
                        {dist.nameEn} • Plot: {dist.plotCode}
                      </p>
                      <p className={`text-xs mt-1 ${isSelected ? 'text-emerald-200' : 'text-slate-600'}`}>
                        🏢 حق کسب‌وکار: {dist.businessType}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs shrink-0">
                      {isSelected ? 'انتخاب‌شده' : 'انتخاب زمین'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <label className="text-xs font-black text-slate-700 block mb-1">
                نام صاحب سند و پروانه کسب‌وکار (Citizen Owner Name):
              </label>
              <input
                type="text"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
              />
            </div>
          </div>

          {/* Official Land Deed & Commercial Business License Certificate */}
          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 border-4 border-double border-amber-400 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-amber-400/40 pb-3">
                <div>
                  <span className="text-xs font-black text-amber-300 block" dir="ltr">
                    🏛️ OFFICIAL ABLEWAY CITY LAND DEED & COMMERCIAL LICENSE
                  </span>
                  <h4 className="text-lg font-black text-white mt-0.5">
                    سند رسمی مالکیت زمین و پروانه کسب‌وکار شهر آرمانی
                  </h4>
                </div>
                <Award className="w-9 h-9 text-amber-400 shrink-0" />
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <p className="flex justify-between border-b border-white/10 py-1.5">
                  <span className="text-slate-300">نام مالک (Titled Citizen):</span>
                  <span className="font-black text-amber-300">{citizenName}</span>
                </p>
                <p className="flex justify-between border-b border-white/10 py-1.5">
                  <span className="text-slate-300">ناحیه و پلاک ثبتی زمین:</span>
                  <span className="font-black text-emerald-300">{selectedDistrict.nameFa}</span>
                </p>
                <p className="flex justify-between border-b border-white/10 py-1.5" dir="ltr">
                  <span className="text-slate-300">Deed Registry Code:</span>
                  <span className="font-mono font-black text-amber-300">{selectedDistrict.plotCode}</span>
                </p>
                <p className="flex justify-between border-b border-white/10 py-1.5">
                  <span className="text-slate-300">پروانه حق کسب‌وکار (Business Right):</span>
                  <span className="font-black text-white">{selectedDistrict.businessType}</span>
                </p>
                <p className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300">وضعیت مالیات و هزینه صدور:</span>
                  <span className="font-black text-emerald-400">۱۰۰٪ رایگان (هدیه لیگ معرفان و شهروندان فعال)</span>
                </p>
                <p className="text-[10px] text-amber-200/80 pt-1 leading-normal">
                  📌 ماهیت سند: این سند، یک دارایی مجازی درون‌برنامه‌ای (In-App Virtual Deed) برای بازی‌وارسازی و شبیه‌سازی شهروندی در اکوسیستم آموزشی شهر توانا (AbleWay City) است.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playLevelUp();
                try { confetti({ particleCount: 50, spread: 65 }); } catch {}
                onEarnLingous(20);
                speakPersian(
                  `سند رسمی مالکیت زمین و پروانه کسب‌وکار در ${selectedDistrict.nameFa} به نام ${citizenName} ثبت و صادر گردید.`,
                  0.85
                );
              }}
              className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md"
            >
              📜 ثبت قطعی سند زمین و دریافت +20 XP پاداش شهروندی
            </button>
          </div>
        </div>
      )}

      {/* 2. SEVEN DEMOCRATIC LEADERSHIP RANKS + MASTER–STUDENT LEARNING RANK SYSTEM */}
      {subTab === 'ranks_7' && (
        <div className="space-y-6">
          {/* =============================================================== */}
          {/* MASTER–STUDENT SYSTEM & TEACHER DUEL (چرخه شاگرد ⇄ استاد لینگـو) */}
          {/* =============================================================== */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-emerald-950 text-white p-6 sm:p-7 border-2 border-amber-400 shadow-xl space-y-5">
            {/* Core Clarification Banner */}
            <div className="p-4 rounded-2xl bg-black/45 border border-amber-400/60 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
                  🎓 IMPORTANT CLARIFICATION — MASTER–STUDENT SYSTEM (نظام درون‌برنامه‌ای شاگرد و استاد)
                </span>
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 font-black text-xs">
                  وضعیت فعلی شما:{' '}
                  {learningRankStatus === 'STUDENT'
                    ? '📘 زبان‌آموز (Student Rank)'
                    : learningRankStatus === 'TEACHER_CANDIDATE'
                    ? '🌟 نامزد رتبه استادی (Teacher Candidate)'
                    : learningRankStatus === 'TEACHER_RANK'
                    ? '👑 دارای رتبه استادی (Teacher Rank)'
                    : '⚖️ در حال بازبینی رتبه و آماده دوئل استادی (Teacher Rank Review)'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-200 font-black leading-relaxed">
                شفاف‌سازی مهم آموزشی: شرکت‌کنندگان در این سیستم استاد دانشگاه یا معلم بیرونی نیستند؛ بلکه <strong>همگی زبان‌آموزان (Learners / Students) سیستم آموزشی Lingo</strong> هستند و واژهٔ «استاد / Teacher» صرفاً یک <strong>رتبهٔ آموزشی عملکردمحور (Performance-Based Internal Rank)</strong> در دل بازی‌وارسازی و متد آموزشی این برنامه است.
              </p>
              <p className="text-xs text-slate-200 leading-relaxed">
                از دست دادن رتبهٔ استادی به هیچ عنوان تنبیه یا اخراج از برنامه نیست! زبان‌آموز در داخل Lingo باقی می‌ماند، به مسیر یادگیری برمی‌گردد و هر زمان با تمرین و پیروزی در چالش‌ها می‌تواند دوباره به رتبهٔ استادی بازگردد:
                <strong className="text-emerald-300 block mt-1" dir="ltr">
                  LEARN → TEACH → BE CHALLENGED → DEFEND YOUR LEVEL → IMPROVE → RETURN → TEACH AGAIN
                </strong>
              </p>
            </div>

            {/* ============================================================= */}
            {/* OFFICIAL PEDAGOGICAL INVENTION & GLOBAL UNIVERSITY CHARTER     */}
            {/* (سند ثبت اختراع و منشور پیشنهادی به دانشگاه‌های جهان — سیاوش علی‌میری) */}
            {/* ============================================================= */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-950/90 via-slate-950 to-indigo-950 border-4 border-double border-amber-400 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-400/40 pb-3">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-[11px]" dir="ltr">
                    📜 OFFICIAL PEDAGOGICAL PRIOR-ART & GLOBAL ACADEMIC CHARTER • REGISTRY #AWC-EDU-2026-001
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-amber-300 pt-1">
                    سند ثبت نوآوری و منشور جهانی «متد آموزشی استاد–شاگردی پویا و جهش کوانتومی علم» (مخترع و نظریه‌پرداز: سیاوش علی‌میری)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    sound.playLevelUp();
                    speakPersian(
                      'سند ثبت نوآوری و منشور جهانی متد آموزشی استاد شاگردی پویا، اثر سیاوش علی‌میری. شامل شش اصل طلایی: اول، حفظ کامل کرامت و پیشکسوتی اساتید و محرمانگی ارزیابی‌ها. دوم، افزایش حقوق و مزایای اساتید پویا و پاسخ‌گو. سوم، تدریس دانشجویان دکتری در مقطع ارشد و دانشجویان ارشد در مقطع کارشناسی به عنوان واحد درسی مهارت معلمی. چهارم، مسابقات تیمی استاد و شاگرد برگزیده در دانشگاه‌ها و مراکز فنی و حرفه‌ای. پنجم، چالش سه مرحله‌ای و دوئل علمی میان دانشجویان دکتری مدرس در مقطع ارشد. و ششم، جهش کوانتومی علم در علوم عقلی، نقلی، فنی و حرفه‌ای، ورزش و هنر.',
                      0.86
                    );
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md shrink-0"
                >
                  🔊 قرائت رسمی سند ثبت نوآوری
                </button>
              </div>

              <p className="text-xs sm:text-sm text-amber-100 leading-relaxed text-justify">
                این سند به عنوان <strong>گواهی رسمی تقدم علمی و ثبت مالکیت فکری و معنوی (Prior-Art & Pedagogical Invention Record)</strong> به نام <strong>سیاوش علی‌میری (Siyavash Ali-Miri)</strong> — که پیش‌تر نیز کلیات آن به اساتید دانشگاه‌ها و هیئت‌های علمی در سطح جهان معرفی گردیده است — جهت ماندگاری در تاریخ آموزش و ارائهٔ محترمانه به دانشگاه‌ها، وزارتخانه‌های علوم و مراکز آموزشی سراسر جهان به ثبت می‌رسد:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-amber-400/50 space-y-1.5">
                  <span className="font-black text-amber-300 block">
                    ۱. حفظ مطلق کرامت، کسوت («ریش‌سفیدی و موی‌سفیدی») و محرمانگی استاد:
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    در صورت بهره‌گیری دانشگاه‌ها از این متد، شأن، احترام، پیشکسوتی و موی‌سفیدی اساتید گرانقدر کاملاً محفوظ و مقدس شمرده می‌شود و نتایج چالش‌های علمی کاملاً <strong>محرمانه</strong> باقی می‌ماند تا هیچ‌گاه خدشه‌ای به جایگاه معنوی استاد وارد نشود.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-emerald-400/50 space-y-1.5">
                  <span className="font-black text-emerald-300 block">
                    ۲. ارتقای رتبه، حقوق و مزایا برای اساتید پویا و به‌روز ماندن دائمی علم:
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    اساتیدی که در چالش‌های علمی و پاسخ‌گویی به پرسشگری دانشجویان برنده و پیشگام می‌شوند، از <strong>رتبه‌های علمی بالاتر، حقوق، مزایا و امکانات پژوهشی بیشتر</strong> بهره‌مند می‌گردند. بدین‌ترتیب استاد همواره از نظر علمی <strong>به‌روز (Up-to-date)</strong> و آمادهٔ پاسخ‌گویی به عمیق‌ترین پرسش‌های دانشجویان خواهد بود.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-cyan-400/50 space-y-1.5">
                  <span className="font-black text-cyan-300 block">
                    ۳. واحد درسی رسمی «مهارت تدریس» (تدریس دکتری در ارشد و ارشد در کارشناسی):
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    با صلاح‌دید و نظارت کادر آموزشی دانشگاه، هر <strong>دانشجوی توانمند دکتری (PhD)</strong> می‌تواند در مقطع <strong>فوق‌لیسانس (کارشناسی ارشد)</strong> و هر <strong>دانشجوی برجستهٔ فوق‌لیسانس</strong> در مقطع <strong>لیسانس (کارشناسی)</strong> به عنوان یک <strong>واحد درسی رسمی (واحد مهارت‌های آموزش و معلمی)</strong> تدریس کند؛ الگویی بی‌نظیر برای <strong>تربیت اساتید آینده</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-rose-400/50 space-y-1.5">
                  <span className="font-black text-rose-300 block">
                    ۴. تیم «استاد + شاگرد برگزیده (سوگلی علمی استاد)» در مسابقات بین‌دانشگاهی:
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    در دانشگاه‌ها و مؤسسات فنی و حرفه‌ای، هر استاد می‌تواند بهترین و مکمل‌ترین شاگرد خود را انتخاب کرده و با او یک <strong>تیم دونفره (استاد + شاگرد)</strong> برای دوئل و رقابت علمی با تیم‌های سایر اساتید تشکیل دهد؛ این سازوکار شور و رقابتی شگفت‌انگیز میان دانشجویان ایجاد می‌کند تا با تلاش علمی، به عنوان <strong>شاگرد برگزیده و هم‌تیمی استاد («سوگلی علمی استاد»)</strong> انتخاب شوند.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-teal-400/50 space-y-1.5">
                  <span className="font-black text-teal-300 block">
                    ۵. چالش ۳ مرحله‌ای و دوئل استادی میان دانشجویان دکتری مدرس در فوق‌لیسانس:
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    در کلاس‌های تدریس پلکانی نیز سیستم چالش برقرار است: اگر دانشجویی در مقطع فوق‌لیسانس بتواند <strong>دانشجوی دکتری (استاد درس خود) را ۳ بار به چالش علمی معتبر بکشد</strong>، آن دانشجوی دکتری باید با یک دانشجوی دکتری دیگر که او نیز ۳ بار به چالش کشیده شده است <strong>دوئل علمی (Teacher Duel)</strong> برگزار کند؛ <strong>برندهٔ دوئل</strong> به تدریس در کلاس‌های فوق‌لیسانس ادامه می‌دهد و <strong>نفر دیگر</strong> بدون هیچ‌گونه آسیب یا جریمه، صرفاً به ادامهٔ تحصیل و پژوهش خود در مقطع دکتری بازمی‌گردد.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-purple-400/50 space-y-1.5">
                  <span className="font-black text-purple-300 block">
                    ۶. جهش کوانتومی علم در علوم عقلی، نقلی، فنی‌وحرفه‌ای، ورزش و هنر:
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    این چرخهٔ پویا در تمامی شئون و رشته‌های دانش بشری — اعم از <strong>علوم عقلی، علوم نقلی، رشته‌های فنی و حرفه‌ای، ورزش و هنر</strong> — در کلیهٔ سطوح آموزشی و پرورشی جهان قابل اجراست و زمینه‌ساز <strong>جهش کوانتومی علم</strong> به نفع کل بشریت خواهد بود.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-400/30 flex flex-wrap items-center justify-between gap-2 text-[11px] text-amber-200 font-bold">
                <span>✍️ بنیان‌گذار و صاحب دکترین: سیاوش علی‌میری (Siyavash Ali-Miri — Founder of AbleWay City & Lingo Methodology)</span>
                <span dir="ltr">Status: Permanently Enshrined & Timestamped Prior-Art Record</span>
              </div>
            </div>

            {/* Lingo League Tree: Winners Group vs Challengers Group + Visual Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-900/90 border border-indigo-400/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-amber-300">
                    🏆 ساختار لیگ آموزشی (Lingo League Flow)
                  </h4>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setActiveLeagueGroup('WINNERS_GROUP');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-black ${
                        activeLeagueGroup === 'WINNERS_GROUP'
                          ? 'bg-emerald-400 text-slate-950'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      Winners Group ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setActiveLeagueGroup('CHALLENGERS_GROUP');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-black ${
                        activeLeagueGroup === 'CHALLENGERS_GROUP'
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      Challengers Group
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-xs space-y-1.5 leading-relaxed">
                  {activeLeagueGroup === 'WINNERS_GROUP' ? (
                    <>
                      <p className="font-black text-emerald-300">
                        🌟 گروه برندگان (WINNERS GROUP → رقابت‌های بعدی → Promotion ↑):
                      </p>
                      <p className="text-slate-200">
                        زبان‌آموزان برتر با کسب <strong>۱۰ چالش موفق در برابر دارندگان رتبهٔ استادی</strong> به مرحلهٔ <strong>نامزدی استادی (Teaching Candidate)</strong> می‌رسند و پس از قبولی در <strong>آزمون ۱۰ معیارهٔ هوش مصنوعی</strong> یا پیروزی در <strong>دوئل استادی (Candidate A vs Candidate B)</strong> به رتبهٔ استادی ارتقا می‌یابند.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-black text-amber-300">
                        🔥 گروه چالشگران (CHALLENGERS GROUP → رقابت‌های بعدی → Improvement):
                      </p>
                      <p className="text-slate-200">
                        زبان‌آموزان با به چالش کشیدن محترمانهٔ دارندگان رتبهٔ استادی، هم باعث تثبیت دانش و کیفیت آموزش می‌شوند و هم خودشان گام‌به‌گام به مرحلهٔ نامزدی استادی نزدیک می‌شوند.
                      </p>
                    </>
                  )}
                </div>

                {/* Compact Visual Cycle Diagram */}
                <div className="p-3 rounded-xl bg-slate-950 border border-amber-400/30 font-mono text-[11px] text-emerald-200 space-y-1" dir="ltr">
                  <div>LEARNER → 10 SUCCESSFUL CHALLENGES → TEACHING CANDIDATE</div>
                  <div>TEACHING CANDIDATE + AI 10-CRITERIA ASSESSMENT → TEACHER DUEL</div>
                  <div>TEACHER DUEL: WIN → TEACHER RANK | LOSE → REMAINS LEARNER</div>
                  <div>TEACHER CHALLENGES: HOLD → KEEP RANK | 3 FAILS → TEACHER DUEL</div>
                </div>
              </div>

              {/* Step 1 & Step 2: 10 Successful Challenges -> Teacher Candidacy + 10-Criteria AI Assessment */}
              <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-900/90 border border-emerald-400/50 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-amber-300">
                      ⚡ مرحله ۱: ثبت ۱۰ چالش موفق برای باز شدن «نامزدی رتبه استادی (Teacher Candidacy)»
                    </h4>
                    <p className="text-xs text-slate-300">
                      توجه: ۱۰ چالش موفق به‌صورت خودکار فرد را استاد نمی‌کند، بلکه قفل «نامزدی استادی» و «آزمون ۱۰ معیاره هوش مصنوعی» را باز می‌کند.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
                    چالش‌های موفق شما: {successfulChallengesCount} / 10
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playLevelUp();
                      const next = Math.min(10, successfulChallengesCount + 1);
                      setSuccessfulChallengesCount(next);
                      onEarnLingous(15);
                      if (next >= 10 && learningRankStatus === 'STUDENT') {
                        setLearningRankStatus('TEACHER_CANDIDATE');
                        setDuelStatusMessage(
                          '🎉 تبریک! شما ۱۰ چالش موفق را تکمیل کردید و به «نامزد رتبه استادی (TEACHER CANDIDACY)» رسیدید! اکنون آزمون ۱۰ معیاره هوش مصنوعی را در کادر زیر تکمیل کنید.'
                        );
                        speakPersian(
                          'تبریک! شما ده چالش موفق را تکمیل کردید و اکنون نامزد رتبه استادی هستید. برای دریافت رتبه استادی، آزمون ده معیاره هوش مصنوعی را بگذرانید.',
                          0.88
                        );
                      } else {
                        setDuelStatusMessage(
                          `✅ چالش علمی با موفقیت ثبت شد (${next} از ۱۰ چالش موفق).`
                        );
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs shadow-md"
                  >
                    ⚔️ انجام چالش علمی با دارنده رتبه استادی (+15 XP)
                  </button>

                  {successfulChallengesCount >= 10 && (
                    <span className="px-3 py-1.5 rounded-xl bg-amber-400/20 border border-amber-400 text-amber-200 text-xs font-black">
                      🔓 نامزدی استادی (Teacher Candidacy) باز شد!
                    </span>
                  )}
                </div>

                {/* Step 2: AI-Designed 10-Criteria Teacher Assessment */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-400/50 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-black text-amber-300">
                      🧠 مرحله ۲: آزمون ۱۰ معیاره هوش مصنوعی ویژه نامزدهای استادی (AI-Designed Teacher Assessment)
                    </span>
                    {aiAssessmentPassed && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-400 text-slate-950 text-[11px] font-black">
                        ✅ قبولی در هر ۱۰ معیار تایید شد
                      </span>
                    )}
                  </div>

                  {/* All 10 Required Evaluation Criteria */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                    {TEN_AI_TEACHER_ASSESSMENT_CRITERIA.map((crit) => (
                      <div
                        key={crit.id}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between gap-2"
                      >
                        <span className="font-bold text-slate-200">{crit.fa}</span>
                        <span className="text-emerald-400 font-black shrink-0">
                          {aiAssessmentPassed ? '100%' : 'ارزیابی'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Teaching Scenario Question to Pass the 10-Criteria AI Assessment */}
                  <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-400/40 space-y-2">
                    <p className="text-xs font-black text-amber-200">
                      📋 سناریوی سنجش مهارت استادی: اگر زبان‌آموزی در تخته هوشمند واژه «سلام» را «صلام» بنویسد یا نتواند جملهٔ خودمانی «این روزا دستم خیلی خالیه» را بسازد، بهترین روش آموزشی چیست؟
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {[
                        {
                          idx: 0,
                          label:
                            'الف) بدون هیچ‌گونه سرزنش، دیکته صحیح («سلام») و کل جمله صحیح خودمانی («این روزا دستم خیلی خالیه») را به زبان ساده در نوار بالای صفحه نشان داده و با تلفظ صوتی توضیح دهیم.'
                        },
                        {
                          idx: 1,
                          label:
                            'ب) فقط به او نمره منفی بدهیم و توضیحی درباره دیکته صحیح یا معنی خودمانی جمله ندهیم.'
                        }
                      ].map((opt) => (
                        <button
                          key={opt.idx}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setSelectedAssessmentAnswer(opt.idx);
                            if (opt.idx === 0) {
                              sound.playLevelUp();
                              setAiAssessmentPassed(true);
                              setLearningRankStatus('TEACHER_RANK');
                              onEarnLingous(35);
                              setDuelStatusMessage(
                                '👑 آفرین! شما در هر ۱۰ معیار آزمون هوش مصنوعی (دانش، درک مفهومی، ساده‌سازی، تشخیص و اصلاح خطا و ارتباط آموزشی) پذیرفته شدید و به «رتبه استادی (TEACHER RANK)» ارتقا یافتید!'
                              );
                              speakPersian(
                                'تبریک! شما در آزمون ده معیاره هوش مصنوعی پذیرفته شدید و به رتبه استادی ارتقا یافتید.',
                                0.88
                              );
                            } else {
                              setDuelStatusMessage(
                                '💡 راهنمای آزمون استادی: هدف سیستم آموزشی Lingo یادگیری بدون تحقیر و نمایش دیکته و کل جمله صحیح به زبان ساده است. گزینه الف را انتخاب کنید!'
                              );
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-right text-xs font-bold transition-all ${
                            selectedAssessmentAnswer === opt.idx
                              ? opt.idx === 0
                                ? 'bg-emerald-500 text-slate-950 border-white font-black'
                                : 'bg-rose-800 text-white border-rose-400'
                              : 'bg-slate-900 text-slate-200 border-white/15 hover:bg-slate-800'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Teacher 3-Challenge Defense & Teacher Duel (Candidate A vs Candidate B) */}
            <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-amber-400/60 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm sm:text-base font-black text-amber-300">
                    ⚔️ مرحله ۳: قانون «۳ شکست در چالش = بازبینی رتبه (Teacher Rank Review)» و «دوئل استادی (Teacher Duel)»
                  </h4>
                  <p className="text-xs text-slate-300">
                    اگر دارندهٔ رتبه استادی ۳ بار در چالش‌های معتبر شکست بخورد، وارد مرحلهٔ بازبینی رتبه و <strong>دوئل استادی (Candidate A vs Candidate B)</strong> می‌شود. برنده رتبهٔ استادی را حفظ/احیا می‌کند و نفر دیگر <strong>بدون حذف شدن از برنامه، به عنوان زبان‌آموز (Learner)</strong> ادامه می‌دهد.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-rose-500/20 border border-rose-400 text-rose-200 text-xs font-black">
                  شکست‌های ثبت‌شده در دفاع از رتبه: {teacherDefeatStrikes} / 3
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    sound.playLevelUp();
                    setTeacherDefeatStrikes(0);
                    setLearningRankStatus('TEACHER_RANK');
                    onEarnLingous(20);
                    setDuelStatusMessage(
                      '🛡️ دفاع موفق (HOLD → KEEP RANK): شما به پرسش چالشگر به درستی پاسخ دادید و رتبه استادی خود را حفظ کردید!'
                    );
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs"
                >
                  🛡️ دفاع موفق در برابر چالش (HOLD → Keep Teacher Rank)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    const nextStrikes = Math.min(3, teacherDefeatStrikes + 1);
                    setTeacherDefeatStrikes(nextStrikes);
                    if (nextStrikes >= 3) {
                      setLearningRankStatus('TEACHER_RANK_REVIEW');
                      setDuelStatusMessage(
                        '⚖️ ۳ شکست معتبر ثبت شد (3 FAILS → TEACHER RANK REVIEW): رتبه استادی موقتاً وارد بازبینی و دوئل استادی شد. شما هرگز از برنامه حذف نمی‌شوید و می‌توانید در دوئل استادی شرکت کنید!'
                      );
                    } else {
                      setDuelStatusMessage(
                        `⚠️ شکست شماره ${nextStrikes} از ۳ در چالش ثبت شد. با ۳ شکست معتبر، وارد بازبینی رتبه و دوئل استادی می‌شوید.`
                      );
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-black text-xs"
                >
                  ⚠️ شبیه‌سازی ۳ بار شکست در چالش (3 Fails → Rank Review)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playLevelUp();
                    try {
                      confetti({ particleCount: 55, spread: 70 });
                    } catch {}
                    setTeacherDefeatStrikes(0);
                    setLearningRankStatus('TEACHER_RANK');
                    onEarnLingous(30);
                    setDuelStatusMessage(
                      '🏆 پیروزی در دوئل استادی (TEACHER DUEL WIN): شما در رقابت علمی بین Candidate A و Candidate B پیروز شدید و رتبه استادی خود را پس گرفتید! هم‌رقابت شما نیز بدون حذف شدن، در مسیر یادگیری باقی می‌ماند.'
                    );
                    speakPersian(
                      'آفرین! شما در دوئل علمی استادی پیروز شدید و رتبه استادی را به دست آوردید. رقیب شما نیز بدون حذف شدن در مسیر یادگیری باقی می‌ماند.',
                      0.88
                    );
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md"
                >
                  ⚡ برگزاری دوئل استادی (Candidate A vs Candidate B → Win / Regain Rank)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setLearningRankStatus('STUDENT');
                    setTeacherDefeatStrikes(0);
                    setDuelStatusMessage(
                      '📘 بازگشت محترمانه و موقت به رتبه زبان‌آموز (TEMPORARY RETURN TO STUDENT RANK): شما در سیستم Lingo باقی مانده‌اید و هر زمان با تمرین بیشتر می‌توانید دوباره به رتبه استادی برگردید!'
                    );
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-200 font-black text-xs"
                >
                  🔄 بازگشت موقت به مسیر زبان‌آموز (بدون حذف • ادامه رشد)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playCoin();
                    const viralInviteText =
                      '🔥 60-SECOND TEACHER DUEL CHALLENGE! I just reached Teacher Rank in Lingo (AbleWay City). Dare to challenge my Teacher Rank in a 60-second Real Slang vs. Formal Language Duel? 👑 | من در سیستم شاگرد و استاد Lingo به رتبه استادی رسیدم! آیا می‌توانی در دوئل ۶۰ ثانیه‌ای زبان خودمانی مرا به چالش بکشی؟ Code: AWC-SIYAVASH-777';
                    navigator.clipboard?.writeText(viralInviteText);
                    if (navigator.share) {
                      navigator.share({
                        title: 'Lingo 60-Second Teacher Duel Challenge',
                        text: viralInviteText
                      }).catch(() => {});
                    }
                    onEarnLingous(25);
                    setDuelStatusMessage(
                      '💎 کارت دعوت ویروسی «دوئل ۶۰ ثانیه‌ای استادی (به انگلیسی و فارسی)» کپی و آماده ارسال در واتساپ، تلگرام و iMessage شد (+25 XP)!'
                    );
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-amber-400 to-emerald-400 text-slate-950 font-black text-xs shadow-lg"
                >
                  💎 دعوت ۱ کلیکه به «دوئل ۶۰ ثانیه‌ای استادی» (US/EU Viral Share +25 XP)
                </button>
              </div>

              {duelStatusMessage && (
                <div className="p-3 rounded-xl bg-black/60 border border-amber-400/60 text-xs font-black text-amber-200">
                  {duelStatusMessage}
                </div>
              )}
            </div>

            {/* ============================================================= */}
            {/* STEP 4: TEAM SELECTION — STRATEGIC STUDENT SELECTION          */}
            {/* ============================================================= */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/95 border-2 border-cyan-400/60 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-lg bg-cyan-400 text-slate-950 font-black text-[11px]">
                    🤝 مرحله ۴: انتخاب راهبردی هم‌تیمی در لیگ تیمی (TEAM SELECTION — STRATEGIC STUDENT SELECTION)
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-amber-300 pt-1">
                    پیش‌نمایش استراتژی تیم (Team Strategy Preview): آزادی کامل انتخاب + درک مکمل بودن مهارت‌ها
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-xl bg-white/10 text-cyan-200 text-xs font-black" dir="ltr">
                  TEACHER + STUDENT + COMPLEMENTARITY = TEAM PROFILE
                </span>
              </div>

              {/* Respectful Strategic Decision-Making Principle Banner */}
              <div className="p-3.5 rounded-xl bg-indigo-950/90 border border-amber-400/50 space-y-1.5">
                <p className="text-xs sm:text-sm font-black text-amber-300" dir="ltr">
                  "Your choice is yours. Consider which learner's abilities best complement your own and give your team the strongest combination of skills."
                </p>
                <p className="text-xs text-slate-200 leading-relaxed">
                  <strong>اصل راهبردی (CHOOSE FOR TEAM VALUE, NOT PERSONAL PREFERENCE):</strong> انتخاب کاملاً در اختیار خود شماست و سیستم هیچ زبان‌آموزی را به شما تحمیل نمی‌کند. با بررسی شواهد زیر ببینید مهارت‌های کدام زبان‌آموز (شنیدار، گفتار، حل مسئله، ثبات و کار تحت فشار) مکمل نقاط قوت شماست تا متعادل‌ترین تیم شکل بگیرد.
                </p>
                <p className="text-xs text-emerald-300 font-bold">
                  👤 پروفایل فعلی شما (Teacher Profile): {TEACHER_OWN_PROFILE.strengthsFa}
                </p>
              </div>

              {/* Team Strategy Preview Cards for Eligible Students */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ELIGIBLE_TEAM_STUDENTS.map((stu) => {
                  const isChosen = selectedTeammateId === stu.id;
                  return (
                    <button
                      key={stu.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedTeammateId(stu.id);
                        setTeamMatchOutcome('IDLE');
                      }}
                      className={`p-4 rounded-2xl border-2 text-right transition-all flex flex-col justify-between gap-2.5 ${
                        isChosen
                          ? 'bg-emerald-950 border-amber-400 shadow-lg ring-2 ring-amber-400/40'
                          : 'bg-slate-950/90 border-white/15 hover:bg-slate-800'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px]" dir="ltr">
                            {stu.code}
                          </span>
                          <span className="text-[11px] font-black text-emerald-300">
                            {isChosen ? '✅ انتخاب فعلی شما' : 'مشاهده و انتخاب'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-black text-white">{stu.nameFa}</p>
                        <p className="text-[11px] font-mono text-amber-200" dir="ltr">
                          Strengths: {stu.strengthsEn}
                        </p>
                        <p className="text-xs text-emerald-200 font-bold">
                          💪 نقاط قوت: {stu.strengthsFa}
                        </p>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          📊 شاخص‌ها: {stu.metricsFa}
                        </p>
                        <p className="text-[11px] text-cyan-200 leading-relaxed">
                          🧩 هم‌افزایی تیمی: {stu.complementarityFa}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Potential Team Contribution:</span>
                        <span className="font-black text-amber-300" dir="ltr">
                          {stu.potentialContribution}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Golden Teammate Covenant (میثاق اخلاقی هم‌تیمی‌ها قبل از شروع مسابقه) */}
              <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-amber-400/50 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-amber-300 block">
                    📜 قولنامه و میثاق اخلاقی هم‌تیمی‌ها (Golden Teammate Responsibility Covenant):
                  </span>
                  <p className="text-xs text-slate-200">
                    «پیروزی ما حاصل هم‌افزایی ماست و اگر در این نوبت پیروز نشویم، بدون سرزنش یکدیگر، هر کدام سهم خودمان را کشف و برای پیروزی فردا اصلاح می‌کنیم.»
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTeammateCovenantSigned((prev) => !prev);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all ${
                    teammateCovenantSigned
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-white/10 text-amber-300 border border-amber-400/40'
                  }`}
                >
                  {teammateCovenantSigned ? '🤝 میثاق هم‌تیمی امضا شد' : '✍️ امضای میثاق هم‌تیمی'}
                </button>
              </div>

              {/* Compete in Team Match (Result is Earned, No Automatic Winner + Strict No-AI-on-Loss Rule) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-xs text-slate-300">
                  ⚖️ <strong>قانون عدم برنده خودکار (NO AUTOMATIC WINNER):</strong> آمارها صرفاً اطلاعات تصمیم‌گیری هستند، نه نتیجهٔ از پیش تعیین‌شده. نتیجه در میدان مسابقه رقم می‌خورد و عملکرد هر دو عضو تیم مؤثر است.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playLevelUp();
                      setTeamMatchOutcome('WIN');
                      setShowSelfReflectionPad(false);
                      onEarnLingous(25);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs"
                  >
                    🏆 اجرای مسابقه تیمی (نتیجه: پیروزی تیم +25 XP)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setTeamMatchOutcome('LOSS');
                      setShowSelfReflectionPad(false);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-black text-xs"
                  >
                    🎯 تجربه نتیجه «MATCH RESULT: LOSS» (بدون دخالت هوش مصنوعی)
                  </button>
                </div>
              </div>

              {/* =========================================================== */}
              {/* STEP 5: FAILURE IS A LESSON — NO AI ANALYSIS AFTER LOSS     */}
              {/* =========================================================== */}
              {teamMatchOutcome === 'WIN' && (
                <div className="p-4 rounded-2xl bg-emerald-950 border-2 border-emerald-400 text-xs sm:text-sm font-black text-emerald-200 flex items-center justify-between">
                  <span>MATCH RESULT: WIN • تبریک! هماهنگی شما و هم‌تیمی‌تان در این مسابقه به پیروزی انجامید.</span>
                  <button
                    type="button"
                    onClick={() => setTeamMatchOutcome('IDLE')}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs"
                  >
                    بستن نتیجه
                  </button>
                </div>
              )}

              {teamMatchOutcome === 'LOSS' && (
                <div className="p-5 rounded-2xl bg-slate-950 border-2 border-rose-500/80 space-y-3">
                  {/* Simple, Uncluttered Result Screen — ZERO Automatic AI Explanation or Blame */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="px-3 py-1 rounded-lg bg-rose-600 text-white font-mono font-black text-sm" dir="ltr">
                        MATCH RESULT: LOSS
                      </span>
                      <p className="text-xs text-slate-300 pt-1">
                        فلسفه آموزشی Lingo: پس از عدم پیروزی، هوش مصنوعی هیچ تحلیل خودکار، سرزنش یا سخنرانی تحمیلی ارائه نمی‌دهد. کشف علت و درس گرفتن از این تجربه، حق و مسئولیت مستقل خود شماست.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setShowSelfReflectionPad((prev) => !prev)}
                        className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs"
                      >
                        {showSelfReflectionPad
                          ? 'بستن دفترچه تفکر مستقل'
                          : '🧭 بازبینی و کشف مستقل توسط خود من (Self-Directed Reflection)'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTeamMatchOutcome('IDLE');
                          setShowSelfReflectionPad(false);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                      >
                        خروج از صفحه نتیجه و ادامه مسیر یادگیری
                      </button>
                    </div>
                  </div>

                  {/* Optional Learner-Initiated Self-Reflection Pad (Zero AI lecturing) */}
                  {showSelfReflectionPad && (
                    <div className="p-4 rounded-xl bg-slate-900 border border-amber-400/40 space-y-2.5">
                      <p className="text-xs font-black text-amber-300" dir="ltr">
                        FAIL → REFLECT INDEPENDENTLY → DISCOVER THE CAUSE → UNDERSTAND THE LESSON → CORRECT THE WEAKNESS → PREPARE → TRY AGAIN → IMPROVE → WIN
                      </p>
                      <label className="text-xs font-black text-white block">
                        💭 پرسش شخصی از خودتان: «قبل از تلاش بعدی، خودم چه چیزی را در آمادگی، دانش یا استراتژی تیمی‌ام باید تغییر دهم؟» (What must I change before my next attempt?)
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={learnerSelfReflectionNote}
                          onChange={(e) => setLearnerSelfReflectionNote(e.target.value)}
                          placeholder="یادداشت شخصی خودتان برای پیروزی فردا (بدون دخالت هوش مصنوعی)..."
                          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-white/20 text-white text-xs font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            sound.playSuccess();
                            onEarnLingous(15);
                            setTeamMatchOutcome('IDLE');
                            setShowSelfReflectionPad(false);
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shrink-0"
                        >
                          ✅ ثبت تصمیم شخصی و بازگشت قوی‌تر (+15 XP)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Existing 7 Democratic Leadership Ranks (Preserved 100%) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SEVEN_DEMOCRATIC_RANKS.map((rk) => {
            const unlocked = lingous >= rk.minXp;
            return (
              <div
                key={rk.rank}
                className={`rounded-3xl border-2 p-5 space-y-2.5 flex flex-col justify-between ${
                  unlocked
                    ? 'bg-white border-emerald-500 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-90'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{rk.badge}</span>
                    <span
                      className={`px-2.5 py-1 rounded-xl text-xs font-black ${
                        unlocked
                          ? 'bg-emerald-100 text-emerald-950'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {unlocked ? '✅ منصب فعال شما' : `نیازمند ${rk.minXp} XP`}
                    </span>
                  </div>
                  <h4 className="font-black text-sm sm:text-base text-slate-900">{rk.titleFa}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{rk.rightsFa}</p>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      )}

      {/* 3. GLOBAL DYNASTY, REFERRAL LEAGUE & LEGAL 30% HEBA ENGINE */}
      {subTab === 'dynasty_heba30' && (
        <div className="space-y-5">
          {/* Global Referral League Banner */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 text-white rounded-3xl p-5 sm:p-6 border-2 border-amber-400/60 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
                  🌍 ЛИГАИ МУАРРИФОНИ ТОҶИКИСТОН, ӮЗБЕКИСТОН, АФҒОНИСТОН ВА ГУРҶИСТОН • لیگ معرفان به خط خود هر ملت
                </span>
                <h4 className="text-base sm:text-lg font-black text-amber-300 pt-1">
                  منشور دموکراسی ثروت و قدرت در شهر توانا (Демократияи Сарват ва Қудрат дар Шаҳри Тавоно) • کد دعوت: <span className="font-mono bg-white/15 px-2.5 py-0.5 rounded-lg text-emerald-300">AWC-SIYAVASH-777</span>
                </h4>
                <p className="text-xs text-slate-200">
                  وعده رسمی شهر توانا: صدرنشینان لیگ معرفان تاجیکستان، ازبکستان، افغانستان، گرجستان، ایران و غرب به کرسی‌های شورای عالی شهر، سند رایگان زمین در بلوارهای سمرقند، بخارا، دوشنبه و تفلیس و حق تأسیس فامیل می‌رسند.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playCoin();
                  navigator.clipboard?.writeText('AWC-SIYAVASH-777');
                  onEarnLingous(25);
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md shrink-0"
              >
                📋 کپی کد دعوت (+25 XP)
              </button>
            </div>

            {/* Independent Native-Script Leaderboard for Tajikistan, Uzbekistan, Georgia & Afghanistan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs" dir="ltr">
              <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 space-y-1">
                <span className="font-black text-amber-300 block">🇹🇯 #1 Тоҷикистон (Душанбе)</span>
                <p className="font-bold text-white">Сиёвуш Сомонӣ — 4,850 XP</p>
                <span className="text-[11px] text-cyan-200 block">Курсии Шӯрои Олии Шаҳри Тавоно</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-400/50 space-y-1">
                <span className="font-black text-amber-300 block">🇺🇿 #1 Oʻzbekiston (Samarqand)</span>
                <p className="font-bold text-white">Ulugʻbek Buxoriy — 4,420 XP</p>
                <span className="text-[11px] text-emerald-200 block">Oliy Kengash Raisi • Samarqand Deed</span>
              </div>
              <div className="p-3 rounded-2xl bg-rose-950/80 border border-amber-300/50 space-y-1">
                <span className="font-black text-amber-300 block">🇬🇪 #1 საქართველო (თბილისი)</span>
                <p className="font-bold text-white">გიორგი თბილისელი — 3,910 XP</p>
                <span className="text-[11px] text-amber-200 block">სاپატიო სენატორი (Tbilisi Senator)</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/90 border border-amber-400/50 space-y-1" dir="rtl">
                <span className="font-black text-amber-300 block">🇦🇫🇮🇷 #1 هرات، بلخ، کابل و تهران</span>
                <p className="font-bold text-white">احمدشاه و آریا — 4,950 XP</p>
                <span className="text-[11px] text-emerald-300 block">کرسی شورای عالی شهر توانا</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              💝 موتور قانونی «هبه کردن تا ۳۰٪ امتیازات کسب‌شده» به فرزندان، اعضای فامیل یا افراد دارای معلولیت و ADHD
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              بر اساس قانون اساسی شهر آرمانی AbleWay City، هر پدر، مادر یا عضو خاندان می‌تواند تا سقف <strong>۳۰٪ از امتیازات و دارایی آموزشی خود</strong> را به صورت کاملاً قانونی و بلاعوض (عقد هبه) به فرزندان خود در خارج از کشور، اعضای فامیل یا زبان‌آموزان دارای معلولیت و ADHD هدیه دهد تا انگیزهٔ یادگیری در کل خانواده دوچندان شود.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  🛡️ نام خاندان / فامیل جهانی شما (Global Dynasty Name):
                </label>
                <input
                  type="text"
                  value={dynastyName}
                  onChange={(e) => setDynastyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  🎁 نام هبه‌گیرنده (فرزند، عضو فامیل یا فرد دارای معلولیت/ADHD):
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  درصد هبه مجاز (Ҳадяи 30% то 39% EXP ба Дӯстон — از ۵٪ تا سقف ۳۹٪): {hebaPercentage}% (معادل {maxHebaAmount} XP)
                </label>
                <input
                  type="range"
                  min={5}
                  max={39}
                  step={1}
                  value={hebaPercentage}
                  onChange={(e) => setHebaPercentage(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>

              <button
                type="button"
                onClick={handleExecuteHeba}
                className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md"
              >
                💝 امضا و اجرای رسمی هبه {hebaPercentage}% ({maxHebaAmount} XP) به «{recipientName}»
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl border-2 border-amber-400 p-6 space-y-3">
            <h4 className="text-sm sm:text-base font-black text-amber-300">
              📜 دفتر ثبت رسمی اسناد هبه ۳۰٪ و خاندان «{dynastyName}»
            </h4>
            <div className="space-y-2.5">
              {hebaHistory.map((h) => (
                <div key={h.id} className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/40 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-amber-300">🎁 هبه‌گیرنده: {h.recipient}</span>
                    <span className="text-emerald-300 font-mono font-black">+{h.amount} XP ({h.pct}%)</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    صادرشده از طرف خاندان در ساعت {h.date} • ۱۰۰٪ قانونی و بدون کسر جریمه
                  </p>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};
