import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Ear,
  Eye,
  Brain,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Map,
  Mic,
  BookOpen,
  Heart,
  Waves
} from 'lucide-react';
import { CityDistrictId } from './types';
import { OfflineSpeechTranslator } from './components/OfflineSpeechTranslator';
import { CarpetTradeAcademy } from './components/CarpetTradeAcademy';
import {
  sound,
  speakEnglish,
  speakPersian,
  VisualCaptionEventDetail
} from './utils/audio';

export function App() {
  const [currentDistrict, setCurrentDistrict] = useState<CityDistrictId>('carpet_trade');
  const [lingous, setLingous] = useState<number>(250);

  // Accessibility States (Deaf, Blind, ADHD)
  const [deafVisualCaptionsEnabled, setDeafVisualCaptionsEnabled] = useState<boolean>(true);
  const [latestCaption, setLatestCaption] = useState<VisualCaptionEventDetail | null>({
    text: 'به شهر دوزبانه توانا و مترجم دو طبقه فرش خوش آمدید (زیرنویس زنده ناشنوایان فعال است)',
    lang: 'fa',
    phonetic: 'Welcome to AbleWay Bilingual City & Two-Tier Carpet Interpreter',
    timestamp: 'فعال'
  });
  const [blindHighContrast, setBlindHighContrast] = useState<boolean>(false);
  const [largeFontMode, setLargeFontMode] = useState<boolean>(false);

  // ADHD 5-Minute Micro-Sprint Timer + Brown Noise
  const [adhdSecondsLeft, setAdhdSecondsLeft] = useState<number>(300);
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
          speakPersian('آفرین! پنج دقیقه تمرکز کامل به پایان رسید. بیست سکه پاداش گرفتید!');
          setLingous((l) => l + 20);
          return 300;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [adhdTimerRunning]);

  const handleEarnLingous = (amount: number) => {
    setLingous((prev) => prev + amount);
  };

  // Blind Screen Audio Guide (قرائت صوتی صفحه برای نابینایان)
  const handleBlindAudioGuide = () => {
    sound.playClick();
    if (currentDistrict === 'carpet_trade') {
      speakPersian(
        'شما در بخش مترجم صوتی دو طبقه فرش‌فروشان و یادمان شادروان حاج حسین آقای علی‌میری هستید. طبقه اول در بالای صفحه برای خریدار خارجی به زبان‌های انگلیسی، عربی، چینی و روسی است و طبقه دوم در پایین برای شماست.',
        0.85
      );
    } else if (currentDistrict === 'offline_translator') {
      speakPersian(
        'شما در بخش مترجم چت و صوت دوطرفه آفلاین هستید. با زدن دکمه ثبت فارسی یا انگلیسی، پیام شما بدون نیاز به اینترنت فوراً ترجمه و با صدای بلند خوانده می‌شود.',
        0.85
      );
    } else {
      speakPersian(
        'شما در بخش آموزش زبان فارسی با فینگلیش و فرهنگ تعارف به انگلیسی‌زبانان هستید.',
        0.85
      );
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        blindHighContrast ? 'bg-slate-950 text-amber-300' : 'bg-slate-50 text-slate-900'
      } ${largeFontMode ? 'text-lg' : ''}`}
    >
      {/* =================================================================== */}
      {/* TOP ACCESSIBILITY & NEURODIVERSITY BAR (DEAF • BLIND • ADHD)        */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white border-b-2 border-teal-500/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Brand Title */}
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🏛️</span>
              <div>
                <h1 className="font-black text-sm sm:text-base text-amber-300 leading-tight">
                  English-lingou • شهر دوزبانه توانا و مترجم دو طبقه فرش
                </h1>
                <p className="text-[11px] text-slate-300">
                  به یاد شادروان حاج حسین آقای علی‌میری • مجهز به دسترس‌پذیری ناشنوایان، نابینایان و ADHD
                </p>
              </div>
            </div>

            {/* Accessibility Quick Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* 1. Blind Screen Reader Audio Guide */}
              <button
                type="button"
                onClick={handleBlindAudioGuide}
                aria-label="راهنمای صوتی صفحه برای نابینایان"
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Eye className="w-4 h-4" />
                <span>🦯 راهنمای صوتی نابینایان</span>
              </button>

              {/* 2. Blind High-Contrast & Giant Font Toggle */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setBlindHighContrast(!blindHighContrast);
                  setLargeFontMode(!largeFontMode);
                }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 border ${
                  blindHighContrast
                    ? 'bg-yellow-300 text-slate-950 border-yellow-200'
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                <span>{blindHighContrast ? '👁️ درشت‌نمایی کم‌بینایان: روشن' : '👁️ درشت‌نمایی و کنتراست بالا'}</span>
              </button>

              {/* 3. Deaf Live Visual Subtitles Toggle */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDeafVisualCaptionsEnabled(!deafVisualCaptionsEnabled);
                }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 border ${
                  deafVisualCaptionsEnabled
                    ? 'bg-teal-500 text-slate-950 border-teal-300'
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                <Ear className="w-4 h-4" />
                <span>{deafVisualCaptionsEnabled ? '🦻 زیرنویس ناشنوایان: روشن' : '🦻 زیرنویس ناشنوایان: خاموش'}</span>
              </button>

              {/* 4. ADHD 5-Min Focus Timer + Brown Noise */}
              <div className="flex items-center gap-1.5 bg-indigo-950/90 border border-indigo-400/40 px-2.5 py-1 rounded-xl">
                <Brain className="w-4 h-4 text-indigo-300" />
                <span className="text-xs font-mono font-black text-indigo-200">
                  ADHD {formatTimer(adhdSecondsLeft)}
                </span>
                <button
                  type="button"
                  onClick={() => setAdhdTimerRunning(!adhdTimerRunning)}
                  className="p-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
                  title="شروع/توقف تایمر ۵ دقیقه‌ای تمرکز ADHD"
                >
                  {adhdTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setAdhdSecondsLeft(300)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                  title="ریست تایمر ۵ دقیقه‌ای"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
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
                  title="صدای آرام‌بخش نویز قهوه‌ای برای افزایش تمرکز ADHD"
                >
                  <Waves className="w-3 h-3" />
                  <span>{brownNoiseOn ? 'نویز آرام‌بخش: روشن' : 'نویز تمرکز'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* LIVE VISUAL SUBTITLE BAR FOR DEAF & HARD-OF-HEARING USERS */}
          {deafVisualCaptionsEnabled && latestCaption && (
            <div
              role="status"
              aria-live="polite"
              className="p-2.5 rounded-2xl bg-black/80 border border-teal-400/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
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

          {/* Main Section Navigation Buttons */}
          <nav className="flex items-center gap-2 overflow-x-auto pt-1">
            <button
              type="button"
              onClick={() => { sound.playClick(); setCurrentDistrict('carpet_trade'); }}
              className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap flex items-center gap-1.5 transition-all ${
                currentDistrict === 'carpet_trade'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              <span>🧶</span>
              <span>مترجم دو طبقه فرش و شناسنامه (یادمان حاج حسین آقای علی‌میری)</span>
            </button>

            <button
              type="button"
              onClick={() => { sound.playClick(); setCurrentDistrict('offline_translator'); }}
              className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap flex items-center gap-1.5 transition-all ${
                currentDistrict === 'offline_translator'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>🎙️ مترجم چت و صوت دوطرفه آفلاین (سفر، محاوره و ۱۷+)</span>
            </button>

            <button
              type="button"
              onClick={() => { sound.playClick(); setCurrentDistrict('persian_for_english'); }}
              className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap flex items-center gap-1.5 transition-all ${
                currentDistrict === 'persian_for_english'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>🇮🇷 آموزش فارسی و تعارف به انگلیسی‌زبانان (Fingilish Lab)</span>
            </button>
          </nav>
        </div>
      </header>

      {/* =================================================================== */}
      {/* MAIN CONTENT AREA                                                   */}
      {/* =================================================================== */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentDistrict === 'carpet_trade' && (
          <CarpetTradeAcademy onEarnLingous={handleEarnLingous} />
        )}

        {currentDistrict === 'offline_translator' && (
          <OfflineSpeechTranslator />
        )}

        {currentDistrict === 'persian_for_english' && (
          <div className="space-y-6 pb-16">
            <div className="rounded-3xl bg-gradient-to-r from-amber-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-3">
              <span className="text-xs font-bold text-amber-300">
                PRIORITY #1 FOR ENGLISH SPEAKERS & TOURISTS • FINGILISH + TAAROF LAB
              </span>
              <h2 className="text-2xl sm:text-4xl font-black">
                Learn Spoken Persian (Farsi) with Fingilish & Taarof Mastery 🇮🇷
              </h2>
              <p className="text-xs sm:text-sm text-amber-100">
                No Persian alphabet required! Every phrase includes Phonetic Latin (Fingilish), cultural Taarof explanation, and instant dual-language voice playback.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  titleEn: '1. The Art of Taarof in the Bazaar & Carpet Showroom',
                  fa: 'قابل شما را ندارد! پیشکش شماست، بفرمایید چای میل کنید.',
                  fingilish: 'Ghâbele shomâ râ nadârad! Pishkeshe shomâst, befarmâyid chây meyl konid.',
                  en: 'It is unworthy of you (Polite Taarof before stating the price)! Please enjoy some tea.',
                  tip: 'When an Iranian merchant says "Ghabel nadareh", smile and say: "Kheyli mamnoon, lotf darid! Chand ast?"'
                },
                {
                  titleEn: '2. Expressing Gratitude Like a Native Iranian',
                  fa: 'دست شما درد نکنه، خیلی زحمت کشیدید! دمتون گرم.',
                  fingilish: 'Daste shomâ dard nakoneh, kheyli zahmat keshidid! Dametoon garm.',
                  en: 'May your hand never hurt—thank you so much for your trouble! You are awesome.',
                  tip: 'The warmest phrase in Iran to thank a host, taxi driver, or carpet merchant.'
                },
                {
                  titleEn: '3. Asking About Authentic Persian Carpets',
                  fa: 'ببخشید، این قالیچه دو ذرع، کهنه ذاتی و رنگ گیاهی است؟',
                  fingilish: 'Bebakhshid, in ghâlicheh-ye Dozar, kohneh-ye zâti va rang-e giyâhi ast?',
                  en: 'Excuse me, is this Dozar rug naturally aged (Kohneh Zaati) with vegetable dyes?',
                  tip: 'Saying "Kohneh Zaati" in Persian shows the merchant you are a knowledgeable connoisseur!'
                },
                {
                  titleEn: '4. Polite Bargaining & Closing the Deal',
                  fa: 'خیلی زیباست! بی‌زحمت قیمت آخر و تخفیف خوب به ما بدهید.',
                  fingilish: 'Kheyli zibâst! Bi-zahmat gheymate âkhar va takhfife khoob be mâ bedahid.',
                  en: 'It is very beautiful! Please give us your best final price and a kind discount.',
                  tip: 'Always compliment the craftsmanship first before asking for a discount.'
                }
              ].map((lesson, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xs text-slate-900">
                  <h3 className="font-black text-sm sm:text-base text-teal-900" dir="ltr">{lesson.titleEn}</h3>
                  <p className="text-base sm:text-lg font-black text-slate-950">{lesson.fa}</p>
                  <p className="text-xs sm:text-sm font-mono font-bold text-rose-800" dir="ltr">
                    Fingilish: {lesson.fingilish}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-700" dir="ltr">
                    Meaning: "{lesson.en}"
                  </p>
                  <p className="text-xs text-amber-900 bg-amber-50 p-3 rounded-xl" dir="ltr">
                    💡 <strong>Cultural Tip:</strong> {lesson.tip}
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => speakPersian(lesson.fa, 0.85, lesson.fingilish)}
                      className="flex-1 py-2.5 rounded-xl bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>🔊 Listen in Persian (Farsi)</span>
                    </button>
                    <button
                      onClick={() => speakEnglish(lesson.en, 0.88)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>🔊 Listen in English</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-600 space-y-2">
        <p className="font-black text-slate-900">
          🌹 به یاد شادروان حاج حسین آقای علی‌میری • مکمل رسمی برنامه «فرش بازار (Farsh Bazaar)» • توسعه‌دهنده: سیاوش علی‌میری
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button onClick={() => setCurrentDistrict('carpet_trade')} className="text-rose-800 font-bold hover:underline">
            مترجم دو طبقه فرش و شناسنامه اصالت 🧶
          </button>
          <span>•</span>
          <button onClick={() => setCurrentDistrict('offline_translator')} className="text-teal-800 font-bold hover:underline">
            مترجم چت و صوت دوطرفه آفلاین 🎙️
          </button>
          <span>•</span>
          <button onClick={() => setCurrentDistrict('persian_for_english')} className="text-amber-800 font-bold hover:underline">
            آموزش فارسی و تعارف به انگلیسی‌زبانان 🇮🇷
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
