import React, { useState, useEffect } from 'react';
import {
  Ear,
  Eye,
  Brain,
  Play,
  Pause,
  RotateCcw,
  Waves,
  GraduationCap,
  Store,
  Crown,
  Briefcase,
  CreditCard,
  Landmark,
  MessageSquare,
  Trophy,
  Settings,
  Sparkles,
  Maximize2,
  Type
} from 'lucide-react';
import { CarpetTradeAcademy } from './components/CarpetTradeAcademy';
import { EnglishLearningHub, EnglishCategoryTab } from './components/EnglishLearningHub';
import { PersianForDiasporaHub } from './components/PersianForDiasporaHub';
import { TajikCyrillicHub } from './components/TajikCyrillicHub';
import { VictoryPathHub } from './components/VictoryPathHub';
import { CreditClinic850 } from './components/CreditClinic850';
import { AbleWayCityHub } from './components/AbleWayCityHub';
import { GlobalLiveChat5Channel } from './components/GlobalLiveChat5Channel';
import { MindSportsClub8 } from './components/MindSportsClub8';
import { OwnerAdminPanel } from './components/OwnerAdminPanel';
import {
  sound,
  speakPersian,
  VisualCaptionEventDetail
} from './utils/audio';

export type TopLevelArea =
  | 'persian_for_english'
  | 'tajik_cyrillic_hub'
  | 'english_learning'
  | 'victory_path'
  | 'credit_clinic_850'
  | 'ableway_city'
  | 'live_chat_5ch'
  | 'mind_sports_8'
  | 'persian_carpet';

export function App() {
  // Primary #1 Flagship Identity:
  // Pole 1 (#1 Default): Learn Persian / Farsi / Dari for English Speakers & Diaspora (Triple-Script + 32-Letter Canvas)
  // Pole 2: Exclusive Tajik Cyrillic Hub (Тоҷикӣ / Uzbekistan & Tajikistan Samanid Tribute + Tajik➔Persian & Tajik➔English)
  // Pole 3: Learn English, US Spanish & Canadian French for Persian Speakers
  // + VictoryPath Hub + 450->850 Credit Clinic + AbleWay City Capital + 5-Channel Global Chat + 8 Mind Sports + Persian Carpet Heritage
  const [topArea, setTopArea] = useState<TopLevelArea>('persian_for_english');
  const [englishCategory, setEnglishCategory] = useState<EnglishCategoryTab>('embassy_visa');
  const [lingous, setLingous] = useState<number>(350);
  const [showOwnerAdminModal, setShowOwnerAdminModal] = useState<boolean>(false);

  // Ultra-Clean "Like Drinking Water" (مثل آب خوردن) UI Simplification State (Default ON so pages are never crowded)
  const [easyCleanUiMode, setEasyCleanUiMode] = useState<boolean>(true);
  const [showAccessibilityDrawer, setShowAccessibilityDrawer] = useState<boolean>(false);
  const [showMoreHubsDrawer, setShowMoreHubsDrawer] = useState<boolean>(false);
  const [activeFamilyClanForGame, setActiveFamilyClanForGame] = useState<{
    clanTitleFa: string;
    captainName: string;
    deputyName: string;
    secretaryName: string;
  } | null>(null);
  const [showQuickStartStrip, setShowQuickStartStrip] = useState<boolean>(true);
  const [dailyStreakDone, setDailyStreakDone] = useState<boolean>(false);

  // AbleWay Accessibility & ADHD Focus Bar States
  const [deafVisualCaptionsEnabled, setDeafVisualCaptionsEnabled] = useState<boolean>(true);
  const [latestCaption, setLatestCaption] = useState<VisualCaptionEventDetail | null>({
    text: 'LingoEnglish (by AbleWay City) • ۱۰۰٪ رایگان • ۳ قطب زبانی (فارسی به انگلیسی‌زبانان، ویژه تاجیکان با خط سیریلیک و لوح زرین سامانیان، و انگلیسی/اسپانیایی/فرانسوی)',
    lang: 'fa',
    phonetic: '100% Free Global Super-App: English➔Persian, Tajik Cyrillic Hub (Тоҷикӣ), and Persian➔English/Spanish/French',
    timestamp: 'فعال'
  });
  const [blindHighContrast, setBlindHighContrast] = useState<boolean>(false);
  const [largeMotorButtons, setLargeMotorButtons] = useState<boolean>(false);
  const [dyslexiaFontMode, setDyslexiaFontMode] = useState<boolean>(false);
  const [bionicReadingMode, setBionicReadingMode] = useState<boolean>(false);
  const [focusTunnelMode, setFocusTunnelMode] = useState<boolean>(false);

  // ADHD 2-Minute (120s), 60-Second & 5-Minute Micro-Sprint Timer + Brown Noise
  const [adhdSprintDuration, setAdhdSprintDuration] = useState<60 | 120 | 300>(120);
  const [adhdSecondsLeft, setAdhdSecondsLeft] = useState<number>(120);
  const [adhdTimerRunning, setAdhdTimerRunning] = useState<boolean>(false);
  const [brownNoiseOn, setBrownNoiseOn] = useState<boolean>(false);

  // Listen to global visual caption events for Deaf & Hard-of-Hearing accessibility
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<VisualCaptionEventDetail>;
      if (custom.detail) {
        setLatestCaption(custom.detail);
      }
    };
    window.addEventListener('lingou-visual-caption', handler);
    return () => window.removeEventListener('lingou-visual-caption', handler);
  }, []);

  // ADHD Timer Countdown
  useEffect(() => {
    if (!adhdTimerRunning) return;
    const interval = setInterval(() => {
      setAdhdSecondsLeft((prev) => {
        if (prev <= 1) {
          setAdhdTimerRunning(false);
          sound.playLevelUp();
          speakPersian('آفرین! دوره تمرکز عمیق به پایان رسید و بیست و پنج امتیاز شهروندی دریافت کردید!');
          setLingous((l) => l + 25);
          return adhdSprintDuration;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [adhdTimerRunning, adhdSprintDuration]);

  const handleEarnLingous = (amount: number) => {
    setLingous((prev) => prev + amount);
  };

  // Blind Screen Audio Guide (قرائت صوتی صفحه برای نابینایان)
  const handleBlindAudioGuide = () => {
    sound.playClick();
    const descriptions: Record<TopLevelArea, string> = {
      persian_for_english:
        'شما در قطب اول، یعنی آموزش زبان شیرین فارسی به انگلیسی‌زبانان و فرزندان ایرانیان و افغانستانی‌ها با نمایش سه خطی همزمان و تخته هوشمند ۳۲ حرف الفبای فارسی هستید.',
      tajik_cyrillic_hub:
        'شما در قطب دوم، یعنی بخش ویژه و انحصاری تاجیکان و ازبکستان با خط سیریلیک و لوح زرین پیام مهر بنیان‌گذار در پاسداشت امپراتوری سامانیان، سمرقند، بخارا و دوشنبه هستید.',
      english_learning:
        'شما در قطب سوم، یعنی آموزش زبان انگلیسی، اسپانیایی ویژه بازار آمریکا و فرانسوی ویژه مهاجرت کانادا به فارسی‌زبانان هستید.',
      victory_path:
        'شما در بخش طلایی پیروز ویکتوری‌پث هاب هستید؛ شامل شبیه‌ساز مصاحبه شغلی و چانه‌زنی حقوق دلاری، مصاحبه بورسیه فول‌فاند، افسر ویزای ۵ کشور و بانک سوالات رسمی آزمون پاسپورت.',
      credit_clinic_850:
        'شما در کلینیک دوزبانه ارتقای کردیت اسکور از ۴۵۰ به ۸۵۰ هستید؛ شامل اسکنر کردیت، نامه‌نگاری حقوقی حذف بدهی، فرمول ای‌زدئی‌او و ماشین‌حساب سود وام مسکن و خودرو.',
      ableway_city:
        'شما در پایتخت دموکراسی ثروت ایبل‌وی سیتی هستید؛ دارای لیگ جهانی معرفان، ۷ مقام دموکراتیک، سند زمین و حق تجاری، تأسیس خاندان جهانی و موتور قانونی هبه ۳۰ درصدی.',
      live_chat_5ch:
        'شما در تالار گفتگوی زنده جهانی ۵ کاناله هستید و می‌توانید به صورت بلادرنگ با زبان‌آموزان و شهروندان گفتگو کنید.',
      mind_sports_8:
        'شما در باشگاه ۸ ورزش فکری خانواده و لیگ‌های جهانی هستید؛ صد در صد اخلاقی و بدون قمار، شامل شطرنج، تخته‌نرد، دبرنای ۵ زبانه، حکم، منچ و دوئل اطلاعات.',
      persian_carpet:
        'شما در بخش اصیل فرش دستباف ایران به یاد شادروان حاج حسین آقای علی‌میری، پلاک ۴۸ بازار فرش ایران هستید.'
    };
    speakPersian(descriptions[topArea], 0.85);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      className={`min-h-screen transition-all ${
        blindHighContrast ? 'bg-slate-950 text-amber-300' : 'bg-slate-50 text-slate-900'
      } ${largeMotorButtons ? 'text-lg leading-relaxed' : ''} ${
        dyslexiaFontMode ? 'tracking-wide font-mono' : ''
      } ${bionicReadingMode ? 'font-extrabold' : ''}`}
    >
      {/* =================================================================== */}
      {/* PERMANENT TOP BAR: ABLEWAY ACCESSIBILITY & ADHD FOCUS BAR           */}
      {/* + OWNER ADMIN PANEL BUTTON ("پنل مدیریت مالک (فارسی)")              */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white border-b-2 border-amber-400/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-2.5 space-y-2">
          {/* Top Row: Global Brand Name + XP + Owner Admin Panel Button */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇮🇷</span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-black text-xs sm:text-sm md:text-base text-amber-300 leading-tight">
                    LingoEnglish &amp; Farsi Bridge (AbleWay City Capital)
                  </h1>
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-[11px] font-black">
                    100% FREE • ZERO GAMBLING
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 text-[11px] font-black">
                    ⭐ {lingous} XP
                  </span>
                </div>
                <p className="text-[11px] text-amber-100/90">
                  Learn Persian (Farsi/Dari/Tajik) for English Speakers &amp; Learn English for Persian Speakers • پایتخت دوزبانه توانا و پاسداشت زبان فارسی
                </p>
              </div>
            </div>

            {/* Dedicated Owner Admin Panel Button + Easy UI Mode & Accessibility Toggles */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setEasyCleanUiMode((prev) => !prev);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${
                  easyCleanUiMode
                    ? 'bg-emerald-400 text-slate-950 border-white shadow-sm'
                    : 'bg-white/10 text-emerald-200 border-emerald-400/40 hover:bg-white/20'
                }`}
              >
                {easyCleanUiMode
                  ? '🌊 رابط کاربری ساده و خلوت (مثل آب خوردن): فعال'
                  : '🌊 فعال‌سازی نمای ساده و خلوت'}
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowAccessibilityDrawer((prev) => !prev);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${
                  showAccessibilityDrawer
                    ? 'bg-teal-400 text-slate-950 border-white'
                    : 'bg-white/10 text-teal-200 border-teal-400/40 hover:bg-white/20'
                }`}
              >
                ♿ ابزار تمرکز و دسترس‌پذیری {showAccessibilityDrawer ? '▲' : '▼'}
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowOwnerAdminModal(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md border border-white/40"
              >
                <Settings className="w-4 h-4" />
                <span>👑 پنل مدیریت مالک (فارسی)</span>
              </button>
            </div>
          </div>

          {/* Collapsible "AbleWay Accessibility & ADHD Focus Bar" (Keeps UI clean & uncluttered by default) */}
          {(showAccessibilityDrawer || !easyCleanUiMode) && (
          <div
            role="region"
            aria-label="AbleWay Accessibility and ADHD Focus Bar"
            className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/90 border border-indigo-400/40 px-3 py-2 rounded-2xl"
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="text-[11px] font-black text-amber-300">
                ♿ AbleWay Accessibility &amp; ADHD Focus Bar:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {/* 1. Bionic Reading Toggle */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setBionicReadingMode(!bionicReadingMode);
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-black border transition-all ${
                  bionicReadingMode
                    ? 'bg-emerald-400 text-slate-950 border-emerald-200'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                }`}
              >
                ⚡ Bionic Reading {bionicReadingMode ? 'ON' : 'OFF'}
              </button>

              {/* 2. Focus Tunnel Toggle */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setFocusTunnelMode(!focusTunnelMode);
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-black border flex items-center gap-1 transition-all ${
                  focusTunnelMode
                    ? 'bg-amber-400 text-slate-950 border-amber-200'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                }`}
              >
                <Maximize2 className="w-3 h-3" />
                <span>🎯 تونل تمرکز (Focus Tunnel)</span>
              </button>

              {/* 3. 2-Minute / 60-Second / 5-Min ADHD Timer + Brown Noise */}
              <div className="flex items-center gap-1 bg-indigo-950 border border-indigo-400/40 px-2 py-1 rounded-xl">
                <Brain className="w-3.5 h-3.5 text-indigo-300" />
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    const nextDur = adhdSprintDuration === 120 ? 60 : adhdSprintDuration === 60 ? 300 : 120;
                    setAdhdSprintDuration(nextDur);
                    setAdhdSecondsLeft(nextDur);
                  }}
                  className="text-[11px] font-mono font-black text-amber-300 hover:underline"
                  title="تغییر بین تایمر میکرولرنینگ ۲ دقیقه‌ای، ۶۰ ثانیه‌ای و ۵ دقیقه‌ای ADHD"
                >
                  ⏱️ {adhdSprintDuration === 120 ? '2m ADHD' : adhdSprintDuration === 60 ? '60s Sprint' : '5m Sprint'}: {formatTimer(adhdSecondsLeft)}
                </button>
                <button
                  type="button"
                  onClick={() => setAdhdTimerRunning(!adhdTimerRunning)}
                  className="p-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
                  title="شروع یا توقف تایمر تمرکز ADHD"
                >
                  {adhdTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
                <button
                  type="button"
                  onClick={() => setAdhdSecondsLeft(adhdSprintDuration)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                  title="ریست تایمر"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const state = sound.toggleBrownNoise();
                    setBrownNoiseOn(state);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-black flex items-center gap-1 ${
                    brownNoiseOn ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-indigo-200'
                  }`}
                >
                  <Waves className="w-3 h-3" />
                  <span>{brownNoiseOn ? 'Brown Noise: ON' : 'Brown Noise'}</span>
                </button>
              </div>

              {/* 4. Blind Screen Reader Audio Guide */}
              <button
                type="button"
                onClick={handleBlindAudioGuide}
                className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>🦯 نابینایان (Screen Reader)</span>
              </button>

              {/* 5. Deaf Visual Subtitles Toggle */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDeafVisualCaptionsEnabled(!deafVisualCaptionsEnabled);
                }}
                className={`px-2.5 py-1 rounded-xl font-black text-[11px] flex items-center gap-1 border ${
                  deafVisualCaptionsEnabled
                    ? 'bg-teal-400 text-slate-950 border-teal-200'
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                <Ear className="w-3.5 h-3.5" />
                <span>🦻 زیرنویس ناشنوایان</span>
              </button>

              {/* 6. Large Motor-Friendly Buttons & High Contrast */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setLargeMotorButtons(!largeMotorButtons);
                  setBlindHighContrast(!blindHighContrast);
                }}
                className={`px-2.5 py-1 rounded-xl font-black text-[11px] border ${
                  largeMotorButtons
                    ? 'bg-yellow-300 text-slate-950 border-yellow-200'
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                ✋ دکمه بزرگ حرکتی / کنتراست
              </button>

              {/* 7. Dyslexia-Friendly Font */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDyslexiaFontMode(!dyslexiaFontMode);
                }}
                className={`px-2.5 py-1 rounded-xl font-black text-[11px] flex items-center gap-1 border ${
                  dyslexiaFontMode
                    ? 'bg-rose-400 text-slate-950 border-rose-200'
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                <Type className="w-3 h-3" />
                <span>فونت دیسلکسیا</span>
              </button>
            </div>
          </div>
          )}

          {/* LIVE VISUAL SUBTITLE BAR FOR DEAF & HARD-OF-HEARING USERS */}
          {deafVisualCaptionsEnabled && latestCaption && (showAccessibilityDrawer || !easyCleanUiMode) && (
            <div
              role="status"
              aria-live="polite"
              className="p-2 rounded-2xl bg-black/85 border border-teal-400/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-lg bg-teal-400 text-slate-950 font-black text-[11px] shrink-0">
                  🦻 زیرنویس زنده صوتی (Deaf Live Caption)
                </span>
                <p className="text-xs sm:text-sm font-black text-amber-300" dir="auto">
                  {latestCaption.text}
                </p>
              </div>
              {latestCaption.phonetic && latestCaption.phonetic !== latestCaption.text && (
                <span className="text-xs font-mono text-teal-200 shrink-0" dir="ltr">
                  [{latestCaption.phonetic}]
                </span>
              )}
            </div>
          )}

          {/* =============================================================== */}
          {/* CLEAN, EFFORTLESS NAVIGATION ("مثل آب خوردن" — UNCLUTTERED UI)  */}
          {/* =============================================================== */}
          {!focusTunnelMode && (
            <div className="space-y-2 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                {/* 1. Persian for English Speakers */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTopArea('persian_for_english');
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-right transition-all flex items-center justify-between gap-2 ${
                    topArea === 'persian_for_english'
                      ? 'bg-gradient-to-r from-emerald-800 to-teal-900 text-white border-amber-300 shadow-md'
                      : 'bg-white/10 text-slate-200 border-amber-400/30 hover:bg-white/20'
                  }`}
                >
                  <div>
                    <span className="text-xs font-black block text-amber-300">
                      🇮🇷 ۱. آموزش خودمانی فارسی
                    </span>
                    <span className="text-[10px] text-emerald-100 block">
                      تخته الفبا + جمله‌سازی و محاوره
                    </span>
                  </div>
                </button>

                {/* 2. Tajik & Kindred Hub */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTopArea('tajik_cyrillic_hub');
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-right transition-all flex items-center justify-between gap-2 ${
                    topArea === 'tajik_cyrillic_hub'
                      ? 'bg-gradient-to-r from-cyan-800 to-emerald-900 text-white border-amber-300 shadow-md'
                      : 'bg-cyan-950/60 text-cyan-100 border-cyan-400/40 hover:bg-cyan-900/60'
                  }`}
                >
                  <div>
                    <span className="text-xs font-black block text-amber-300">
                      🇹🇯🇺🇿 ۲. بخش تاجیکان و هم‌ریشگان
                    </span>
                    <span className="text-[10px] text-cyan-100 block">
                      تخته سیریلیک + اصطلاحات خودمانی ایران
                    </span>
                  </div>
                </button>

                {/* 3. English Learning */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTopArea('english_learning');
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-right transition-all flex items-center justify-between gap-2 ${
                    topArea === 'english_learning'
                      ? 'bg-gradient-to-r from-indigo-800 to-blue-900 text-white border-amber-300 shadow-md'
                      : 'bg-white/10 text-slate-200 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div>
                    <span className="text-xs font-black block text-amber-300">
                      🇬🇧 ۳. آموزش خودمانی انگلیسی
                    </span>
                    <span className="text-[10px] text-indigo-100 block">
                      تخته الفبای A-Z + مکالمه روزمره
                    </span>
                  </div>
                </button>

                {/* 4. Regional Family Clans: Voice Chat + Text Chat + Play Together */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTopArea('live_chat_5ch');
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-right transition-all flex items-center justify-between gap-2 ${
                    topArea === 'live_chat_5ch'
                      ? 'bg-gradient-to-r from-sky-700 to-indigo-900 text-white border-amber-300 shadow-md'
                      : 'bg-sky-950/70 text-sky-100 border-sky-400/50 hover:bg-sky-900/70'
                  }`}
                >
                  <div>
                    <span className="text-xs font-black block text-amber-300">
                      🎙️💬 ۴. اتاق‌های فامیلی (ویس و چت)
                    </span>
                    <span className="text-[10px] text-sky-100 block">
                      کاپیتان، معاون، منشی + بازی با دوستان
                    </span>
                  </div>
                </button>

                {/* 5. Expand/Collapse Other Specialized Hubs (Keeps screen clean & uncrowded!) */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setShowMoreHubsDrawer((prev) => !prev);
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-right transition-all flex items-center justify-between gap-2 ${
                    showMoreHubsDrawer ||
                    ['persian_carpet', 'mind_sports_8', 'victory_path', 'credit_clinic_850', 'ableway_city'].includes(topArea)
                      ? 'bg-amber-400 text-slate-950 border-white shadow-md'
                      : 'bg-white/10 text-amber-200 border-amber-400/40 hover:bg-white/20'
                  }`}
                >
                  <div>
                    <span className="text-xs font-black block">
                      {showMoreHubsDrawer ? '🔼 بستن سایر بخش‌ها' : '➕ ۵. سایر بخش‌ها (فرش، بازی و...)'}
                    </span>
                    <span className="text-[10px] opacity-85 block">
                      فرش دستباف، ۸ بازی، پیروز و شهر توانا
                    </span>
                  </div>
                </button>
              </div>

              {/* Collapsible Secondary Hubs Bar (Only shown when clicked or when active) */}
              {(showMoreHubsDrawer ||
                !easyCleanUiMode ||
                ['persian_carpet', 'mind_sports_8', 'victory_path', 'credit_clinic_850', 'ableway_city'].includes(
                  topArea
                )) && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                    <span className="text-[11px] font-black text-amber-300">
                      🌍 کارگاه‌های کاربردی زندگی، فرهنگ و مهارت‌های دوزبانه (Applied Life, Culture & Gamified Immersion):
                    </span>
                    <span className="text-[10px] text-emerald-300 font-bold">
                      آموزش زبان در موقعیت‌های واقعی زندگی، کسب‌وکار، بازی و شهروندی
                    </span>
                  </div>
                  <nav
                    aria-label="بخش‌های تخصصی سوپراپ"
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
                  >
                  {/* Persian Carpet Heritage */}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setTopArea('persian_carpet');
                    }}
                    className={`p-2 rounded-xl border text-right transition-all flex items-center justify-between ${
                      topArea === 'persian_carpet'
                        ? 'bg-rose-800 text-white border-amber-300 shadow-md'
                        : 'bg-white/10 text-slate-200 border-white/15 hover:bg-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black block">🧶 هوش مصنوعی و اصالت فرش</span>
                      <span className="text-[10px] text-rose-100 block">تشخیص نقشه، رج‌شمار و مترجم بازار</span>
                    </div>
                    <Store className="w-4 h-4 text-amber-300 shrink-0" />
                  </button>

                  {/* 9 Family Mind Sports Club */}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setTopArea('mind_sports_8');
                    }}
                    className={`p-2 rounded-xl border text-right transition-all flex items-center justify-between ${
                      topArea === 'mind_sports_8'
                        ? 'bg-purple-800 text-white border-amber-300 shadow-md'
                        : 'bg-white/10 text-slate-200 border-white/15 hover:bg-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black block">♟️ باشگاه ۹ ورزش فکری (لیگ برندگان/بازندگان)</span>
                      <span className="text-[10px] text-purple-100 block">شطرنج، تخته، بیلیارد + جایزه زمین AbleWay</span>
                    </div>
                    <Trophy className="w-4 h-4 text-amber-300 shrink-0" />
                  </button>

                  {/* AbleWay City Capital */}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setTopArea('ableway_city');
                    }}
                    className={`p-2 rounded-xl border text-right transition-all flex items-center justify-between ${
                      topArea === 'ableway_city'
                        ? 'bg-amber-500 text-slate-950 border-white shadow-md'
                        : 'bg-white/10 text-slate-200 border-white/15 hover:bg-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black block">🏛️ شهر توانا و لیگ معرفان</span>
                      <span className="text-[10px] opacity-90 block">سند زمین، خاندان و هبه ۳۰٪</span>
                    </div>
                    <Landmark className="w-4 h-4 shrink-0" />
                  </button>

                  {/* VictoryPath Hub */}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setTopArea('victory_path');
                    }}
                    className={`p-2 rounded-xl border text-right transition-all flex items-center justify-between ${
                      topArea === 'victory_path'
                        ? 'bg-indigo-700 text-white border-amber-300 shadow-md'
                        : 'bg-white/10 text-slate-200 border-white/15 hover:bg-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black block">🏆 بخش پیروز (VictoryPath)</span>
                      <span className="text-[10px] text-indigo-100 block">شغل، فول‌فاند، ویزا و پاسپورت</span>
                    </div>
                    <Briefcase className="w-4 h-4 text-amber-300 shrink-0" />
                  </button>

                  {/* 450 -> 850 Credit Clinic */}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setTopArea('credit_clinic_850');
                    }}
                    className={`p-2 rounded-xl border text-right transition-all flex items-center justify-between ${
                      topArea === 'credit_clinic_850'
                        ? 'bg-emerald-700 text-white border-amber-300 shadow-md'
                        : 'bg-white/10 text-slate-200 border-white/15 hover:bg-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black block">💳 کلینیک کردیت ۸۵۰</span>
                      <span className="text-[10px] text-emerald-100 block">450➔850 • حذف بدهی و وام</span>
                    </div>
                    <CreditCard className="w-4 h-4 text-emerald-300 shrink-0" />
                  </button>
                  </nav>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* =================================================================== */}
      {/* OWNER ADMIN PANEL MODAL (فارسی)                                     */}
      {/* =================================================================== */}
      {showOwnerAdminModal && (
        <OwnerAdminPanel onClose={() => setShowOwnerAdminModal(false)} />
      )}

      {/* =================================================================== */}
      {/* MAIN CONTENT AREA                                                   */}
      {/* =================================================================== */}
      <main
        className={`mx-auto px-4 py-6 transition-all space-y-5 ${
          focusTunnelMode ? 'max-w-4xl ring-4 ring-amber-400/60 rounded-3xl my-4 bg-white/95 shadow-2xl' : 'max-w-7xl'
        }`}
      >
        {/* =============================================================== */}
        {/* 30-SECOND "EASY AS DRINKING WATER" QUICK-START & DAILY STREAK   */}
        {/* =============================================================== */}
        {showQuickStartStrip && !focusTunnelMode && (
          <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white p-4 sm:p-5 border-2 border-amber-400/70 shadow-lg space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
                  🌊 شروع سریع در ۳۰ ثانیه (مثل آب خوردن)
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-200">
                  بدون هیچ پیچیدگی: یکی از ۳ گام زیر را انتخاب کنید یا اصطلاح خودمانی امروز را بشنوید!
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTopArea('ableway_city');
                  }}
                  className="px-3 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400 text-emerald-200 text-[11px] font-black transition-all"
                >
                  🎓 چرخه شاگرد ⇄ استاد: ۹/۱۰ چالش تا نامزدی استادی (Teacher Duel)
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuickStartStrip(false)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-[11px] font-bold"
                >
                  ✕ بستن راهنمای سریع
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {/* Step 1: Smart Blackboard with Auto-Type & Top Dictation Bar */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setTopArea('persian_for_english');
                  speakPersian(
                    'گام اول: تخته هوشمند با تایپ خودکار و نمایش دیکته و کل جمله صحیح در نوار بالای تخته.',
                    0.88
                  );
                }}
                className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-400/50 text-right transition-all flex items-center justify-between gap-2"
              >
                <div>
                  <span className="text-xs font-black text-amber-300 block">
                    ✍️ گام ۱: تخته هوشمند (تایپ خودکار + نوار دیکته بالا)
                  </span>
                  <span className="text-[11px] text-emerald-100 block mt-0.5">
                    حرف را با انگشت بکشید؛ اگر جمله را نتوانستید بسازید کل جمله در نوار بالا می‌آید!
                  </span>
                </div>
              </button>

              {/* Step 2: 60-Second Daily Colloquial Idiom Challenge */}
              <button
                type="button"
                onClick={() => {
                  sound.playLevelUp();
                  speakPersian(
                    'اصطلاح خودمانی امروز: این روزا دستم خیلی خالیه، ولی حالم میزونه و دمت گرم که کنارمی!',
                    0.88
                  );
                  if (!dailyStreakDone) {
                    setDailyStreakDone(true);
                    handleEarnLingous(25);
                  }
                }}
                className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-400/60 text-right transition-all flex items-center justify-between gap-2"
              >
                <div>
                  <span className="text-xs font-black text-amber-300 block">
                    🔥 گام ۲: اصطلاح خودمانی و کوچه‌بازاری روز (+25 XP)
                  </span>
                  <span className="text-[11px] text-amber-100 block mt-0.5">
                    «این روزا دستم خیلی خالیه / همه چی میزونه!» — کلیک کنید و با صدای طبیعی بشنوید
                  </span>
                </div>
                <span className="px-2 py-1 rounded-lg bg-amber-400 text-slate-950 text-[10px] font-black shrink-0">
                  {dailyStreakDone ? '✅ انجام شد' : '🔊 بشنوید'}
                </span>
              </button>

              {/* Step 3: Regional Family Voice/Text Chat & Play Together */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setTopArea('live_chat_5ch');
                  speakPersian(
                    'گام سوم: ورود به اتاق فامیل هم‌منطقه‌ای، ویس‌چت و چت متنی با کاپیتان، معاون و منشی و شروع بازی با دوستان!',
                    0.88
                  );
                }}
                className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-sky-400/50 text-right transition-all flex items-center justify-between gap-2"
              >
                <div>
                  <span className="text-xs font-black text-amber-300 block">
                    🎙️🎮 گام ۳: اتاق ویس‌چت فامیلی + بازی با دوستان
                  </span>
                  <span className="text-[11px] text-sky-100 block mt-0.5">
                    جذب فامیل منطقه‌ای خود شوید، ویس‌چت کنید و دسته‌جمعی وارد بازی شوید!
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}

        {topArea === 'persian_for_english' && (
          <PersianForDiasporaHub onEarnLingous={handleEarnLingous} />
        )}
        {topArea === 'tajik_cyrillic_hub' && (
          <TajikCyrillicHub onEarnLingous={handleEarnLingous} />
        )}
        {topArea === 'english_learning' && (
          <EnglishLearningHub
            activeCategory={englishCategory}
            onSelectCategory={setEnglishCategory}
            onEarnLingous={handleEarnLingous}
          />
        )}
        {topArea === 'victory_path' && (
          <VictoryPathHub onEarnLingous={handleEarnLingous} />
        )}
        {topArea === 'credit_clinic_850' && (
          <CreditClinic850 onEarnLingous={handleEarnLingous} />
        )}
        {topArea === 'ableway_city' && (
          <AbleWayCityHub lingous={lingous} onEarnLingous={handleEarnLingous} />
        )}
        {topArea === 'live_chat_5ch' && (
          <GlobalLiveChat5Channel
            onEarnLingous={handleEarnLingous}
            onNavigateToFamilyGames={(clanInfo) => {
              setActiveFamilyClanForGame(clanInfo);
              setTopArea('mind_sports_8');
            }}
          />
        )}
        {topArea === 'mind_sports_8' && (
          <MindSportsClub8
            onEarnLingous={handleEarnLingous}
            activeFamilyClanInfo={activeFamilyClanForGame}
            onBackToFamilyRoom={() => setTopArea('live_chat_5ch')}
          />
        )}
        {topArea === 'persian_carpet' && (
          <CarpetTradeAcademy onEarnLingous={handleEarnLingous} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-amber-400/50 bg-slate-950 text-white py-8 px-4 text-center text-xs space-y-4">
        <div className="max-w-5xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/90 via-slate-900 to-emerald-950/90 border border-amber-400/50 space-y-2 shadow-md">
          <p className="text-xs sm:text-sm font-black text-amber-300 leading-relaxed">
            🧶 اصالت و ریشهٔ بخش فرش برنامه: این بخش را فرزندی بزرگ‌شده بر سرِ سفرهٔ پُربرکتِ فرش دستباف در ایران‌زمین ساخته است • به یاد پدر بزرگوار، شادروان حاج حسین آقای علی‌میری
          </p>
          <p className="text-xs sm:text-sm font-black text-white leading-relaxed">
            📍 نشانی حجره و نمایشگاه مرکزی: تهران، خیابان خیام شمالی، جنب مترو خیام، بازار فرش ایران، طبقه همکف، پلاک ۴۸ — «فرش حسین علی‌میری و پسران»
          </p>
          <p className="text-[11px] sm:text-xs font-bold text-amber-200/90 leading-relaxed" dir="ltr">
            🏛️ <strong>Heritage &amp; Official Showroom Address:</strong> Crafted by a son raised at the blessed table of Persian carpet artistry in Iran • <strong>Hossein Ali-Miri &amp; Sons Persian Carpets</strong> — Ground Floor, No. 48, Iran Carpet Bazaar (Bazaar-e Farsh-e Iran), Next to Khayyam Metro Station, North Khayyam St., Tehran, Iran.
          </p>
        </div>

        <p className="font-black text-amber-300 text-xs sm:text-sm">
          🇮🇷 LingoEnglish &amp; Farsi Bridge (AbleWay City Capital) • ۱۰۰٪ رایگان و اخلاق‌مدار • در حمایت و پاسداشت زبان شیرین و مادری فارسی • توسعه‌دهنده: سیاوش علی‌میری
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setTopArea('persian_for_english');
            }}
            className="text-emerald-300 font-black hover:underline"
          >
            👑 آموزش فارسی سه خطی (Learn Persian / Farsi)
          </button>
          <span className="text-slate-500">•</span>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setTopArea('victory_path');
            }}
            className="text-indigo-300 font-black hover:underline"
          >
            🏆 VictoryPath Hub (شغل، ویزا و پاسپورت)
          </button>
          <span className="text-slate-500">•</span>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setTopArea('credit_clinic_850');
            }}
            className="text-teal-300 font-black hover:underline"
          >
            💳 کلینیک کردیت ۸۵۰ (450➔850 Credit Clinic)
          </button>
          <span className="text-slate-500">•</span>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setTopArea('ableway_city');
            }}
            className="text-amber-300 font-black hover:underline"
          >
            🏛️ پایتخت AbleWay City و هبه ۳۰٪
          </button>
          <span className="text-slate-500">•</span>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setTopArea('mind_sports_8');
            }}
            className="text-purple-300 font-black hover:underline"
          >
            ♟️ باشگاه ۸ ورزش فکری خانواده
          </button>
          <span className="text-slate-500">•</span>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setTopArea('persian_carpet');
            }}
            className="text-rose-300 font-black hover:underline"
          >
            🧶 فرش حسین علی‌میری و پسران (پلاک ۴۸)
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
