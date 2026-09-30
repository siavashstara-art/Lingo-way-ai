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
            <span>🏛️ MODULE 4: ABLEWAY CITY CAPITAL — WEALTH DEMOCRACY, LAND DEEDS, DYNASTY & 30% HEBA LAW</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-300 pt-1">
            شهر آرمانی AbleWay City: دموکراسی ثروت و مدیریت، اهدای سند زمین، تأسیس خاندان و قانون هبه ۳۰٪
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            شهری اخلاق‌مدار که در آن هر زبان‌آموز و معرف فعال، <strong>سند مالکیت زمین (Official Land Deed)</strong> و <strong>پروانه کسب‌وکار (Commercial Business Right)</strong> رایگان دریافت می‌کند، از <strong>۷ منصب دموکراتیک</strong> بالا می‌رود و می‌تواند تا <strong>۳۰٪ امتیازات خود را به فرزندان، اعضای فامیل یا افراد دارای معلولیت و ADHD هبه کند</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          {[
            { id: 'city_map_deed' as const, label: '🗺️ ۱. نقشه شهر، سند زمین و پروانه کسب‌وکار', icon: FileCheck2 },
            { id: 'ranks_7' as const, label: '👑 ۲. هفت منصب مدیریتی و دموکراسی شهر', icon: Landmark },
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
                <p className="flex justify-between py-1.5">
                  <span className="text-slate-300">وضعیت مالیات و هزینه صدور:</span>
                  <span className="font-black text-emerald-400">۱۰۰٪ رایگان (هدیه لیگ معرفان و شهروندان فعال)</span>
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

      {/* 2. SEVEN DEMOCRATIC LEADERSHIP RANKS */}
      {subTab === 'ranks_7' && (
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
