import React, { useState, useEffect } from 'react';
import {
  Zap,
  Volume2,
  Ear,
  AlertTriangle,
  Flame,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  RotateCcw,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound, speakEnglish, speakPersian } from '../utils/audio';

interface FluencyAcceleratorProps {
  onEarnLingous: (amount: number) => void;
}

type SubModule = 'reflex_engine' | 'speech_decrypter' | 'high_stakes' | 'farsi_interference';

// =========================================================================
// 1. REFLEX ENGINE (توقف ترجمه فارسی در مغز با چالش ۵ ثانیه‌ای)
// =========================================================================
interface ReflexChallenge {
  id: string;
  situationFa: string;
  promptScenarioEn: string;
  options: {
    textEn: string;
    isNative: boolean;
    explanationFa: string;
  }[];
}

const REFLEX_CHALLENGES: ReflexChallenge[] = [
  {
    id: 'ref_1',
    situationFa: 'دوستت خبر ناگهانی و عجیب داده؛ می‌خواهی بگی «شوخی می‌کنی؟! غیرممکنه!» چی می‌گی؟',
    promptScenarioEn: 'Your friend just said they won a million dollars! Respond instantly:',
    options: [
      { textEn: 'No way! Are you pulling my leg?!', isNative: true, explanationFa: '✅ فوق‌العاده نیتیو! یعنی اصلاً امکان نداره! سر کارم گذاشتی؟' },
      { textEn: 'Do you joke? It is not possible!', isNative: false, explanationFa: '❌ ترجمه کلمه به کلمه فارسی است و بسیار رباتیک شنیده می‌شود.' },
      { textEn: 'Are you having fun with me?', isNative: false, explanationFa: '❌ معنی متفاوتی می‌دهد و نیتیو نیست.' }
    ]
  },
  {
    id: 'ref_2',
    situationFa: 'در کافه هستی و می‌خواهی حساب کنی و بگی «این دست مهمون من!» چی می‌گی؟',
    promptScenarioEn: 'The waiter brings the check. You want to pay for everyone:',
    options: [
      { textEn: 'I got this! It’s on me!', isNative: true, explanationFa: '✅ اصطلاح صددرصد اصیل آمریکایی و صمیمی برای مهمان کردن.' },
      { textEn: 'This hand is my guest!', isNative: false, explanationFa: '❌ فاجعه ترجمه تحت‌اللفظی «این دست مهمون من»!' },
      { textEn: 'I want to give money for you.', isNative: false, explanationFa: '❌ بسیار ابتدایی و مصنوعی.' }
    ]
  },
  {
    id: 'ref_3',
    situationFa: 'یک نفر در اداره مدام به کار شما گیر می‌دهد و می‌خواهی بگی «روی اعصاب من راه نرو!» چی می‌گی؟',
    promptScenarioEn: 'A colleague won’t stop nagging you. Tell them to back off:',
    options: [
      { textEn: 'Stop getting on my nerves and give me some space!', isNative: true, explanationFa: '✅ کاملاً روان و طبیعی: رو اعصابم نرو و یه کم به من فضا بده.' },
      { textEn: 'Do not walk on my nerve wires!', isNative: false, explanationFa: '❌ خنده‌دار! سیم عصب و راه رفتن وجود ندارد.' },
      { textEn: 'You are hurting my brain.', isNative: false, explanationFa: '❌ غلط مصطلح.' }
    ]
  },
  {
    id: 'ref_4',
    situationFa: 'می‌خواهی تلفنی بگی «صدات قطع و وصل می‌شه؛ می‌شه تکرار کنی؟»',
    promptScenarioEn: 'Bad cell reception. What do you say immediately?',
    options: [
      { textEn: 'You’re breaking up. Could you say that again?', isNative: true, explanationFa: '✅ استاندارد بین‌المللی: You’re breaking up' },
      { textEn: 'Your sound is cutting and connecting!', isNative: false, explanationFa: '❌ ترجمه کلمه به کلمه فارسی که برای خارجی‌ها نامفهوم است.' },
      { textEn: 'Your telephone has problem.', isNative: false, explanationFa: '❌ غلط و ناقص.' }
    ]
  }
];

// =========================================================================
// 2. CONNECTED SPEECH & STREET SLANG DECRYPTER (رمزگشایی گوش ایرانی از انگلیسی سریع)
// =========================================================================
interface DecrypterLesson {
  id: string;
  bookText: string;
  streetSpoken: string;
  phoneticFa: string;
  ruleTitleFa: string;
  ruleExplanationFa: string;
  meaningFa: string;
  audioSlow: string;
  audioFast: string;
}

const DECRYPTER_LESSONS: DecrypterLesson[] = [
  {
    id: 'dec_1',
    bookText: 'What are you going to do?',
    streetSpoken: 'Whatcha gonna do? /whət-ʃə gʌ-nə duː/',
    phoneticFa: 'واچا گانا دو؟',
    ruleTitleFa: 'ادغام What are you به Whatcha و Going to به Gonna',
    ruleExplanationFa: 'در گفتار سریع نیتیو، ترکیب What are you تبدیل به یک هجای "واچا" می‌شود. هرگز منتظر شنیدن ۴ کلمه مجزا نباشید!',
    meaningFa: 'می‌خوای چیکار کنی؟ چه برنامه‌ای داری؟',
    audioSlow: 'What are you going to do?',
    audioFast: 'Whatcha gonna do?'
  },
  {
    id: 'dec_2',
    bookText: 'Could you tell him that I called?',
    streetSpoken: 'Couldja tellim that I called? /kʊ-dʒə ˈtel-ɪm/',
    phoneticFa: 'کوجا تِلیم دَت آی کالد؟',
    ruleTitleFa: 'حذف صدای H در him/her و تبدیل Could you به Couldja',
    ruleExplanationFa: 'ضمایر him و her صدای H اولیه خود را از دست می‌دهند و به کلمه قبل می‌چسبند: tell him -> تِلیم.',
    meaningFa: 'می‌شه بهش بگی من زنگ زدم؟',
    audioSlow: 'Could you tell him that I called?',
    audioFast: 'Couldja tellim that I called?'
  },
  {
    id: 'dec_3',
    bookText: 'I have got to go right now.',
    streetSpoken: 'I gotta go right now! /aɪ ˈɡɑː-t̬ə ɡoʊ/',
    phoneticFa: 'آی گاتا گو رایت ناو!',
    ruleTitleFa: 'تبدیل have got to به Gotta و Flap T نرم',
    ruleExplanationFa: 'صدای حرف t در بین دو مصوت تبدیل به یک صدای نرم شبیه "ر" سبک می‌شود و سرعت تکلم را ۳ برابر می‌کند.',
    meaningFa: 'همین الان باید برم، دیرم شد!',
    audioSlow: 'I have got to go right now.',
    audioFast: 'I gotta go right now.'
  },
  {
    id: 'dec_4',
    bookText: 'Do you want a cup of water?',
    streetSpoken: 'Wanna cuppa water? /wɑː-nə kʌ-pə wɑː-t̬ər/',
    phoneticFa: 'وانا کاپا وادر؟',
    ruleTitleFa: 'حذف do you و تبدیل cup of به Cuppa و water به وا-در',
    ruleExplanationFa: 'در محاوره آمریکایی، Do you ابتدایی کاملاً حذف می‌شود و of تبدیل به صدای ضعیف "اَ" (Schwa) می‌شود.',
    meaningFa: 'یه لیوان آب می‌خوای؟',
    audioSlow: 'Do you want a cup of water?',
    audioFast: 'Wanna cuppa water?'
  }
];

// =========================================================================
// 3. HIGH-STAKES EMERGENCIES (اتاق وضعیت اضطراری در خارج از کشور)
// =========================================================================
interface HighStakesScenario {
  id: string;
  titleFa: string;
  badge: string;
  contextFa: string;
  keyPhraseEn: string;
  phoneticFa: string;
  meaningFa: string;
  survivalTipFa: string;
}

const HIGH_STAKES_SCENARIOS: HighStakesScenario[] = [
  {
    id: 'hs_police',
    titleFa: '🚨 توقف پلیس در اتوبان (Traffic Stop)',
    badge: 'پلیس و قانون آمریکا و کانادا',
    contextFa: 'پلیس پشت سرت آژیر کشیده و کنارت توقف کرده. هر حرکت اشتباهی ممکن است خطر جانی یا دستگیری داشته باشد!',
    keyPhraseEn: 'Officer, my hands are on the steering wheel. May I reach into my glove box for my license and registration?',
    phoneticFa: 'آفیسِر، مای هندز آر آن دِ ستیرینگ ویل. مِی آی ریچ اینتو مای گلاو باکس فور مای لایسِنس اَند رِجیسترِیشِن؟',
    meaningFa: 'جناب افسر، دست‌های من روی فرمان است. آیا اجازه دارم برای برداشتن گواهینامه و کارت ماشین دستم را داخل داشبورد ببرم؟',
    survivalTipFa: 'دست‌هایتان را از روی فرمان برندارید و بدون اجازه ناگهانی دستتان را به سمت جیب یا داشبورد نبرید.'
  },
  {
    id: 'hs_er',
    titleFa: '🏥 اتاق اورژانس بیمارستان (Emergency Room)',
    badge: 'اورژانس و سلامت حیاتی',
    contextFa: 'درد شدید قفسه سینه یا تنگی نفس ناگهانی داری و باید سریعاً اولویت رسیدگی (Triage) را بگیری:',
    keyPhraseEn: 'I have severe crushing chest pain radiating to my left arm, and I am extremely short of breath.',
    phoneticFa: 'آی هَو سِویر کراشینگ چِست پِین رِیدیِیتینگ تو مای لِفت آرم، اَند آی اَم اِکستریملِی شُورت آو برِث.',
    meaningFa: 'درد شدید کوبنده در قفسه سینه‌ام دارم که به دست چپم می‌زند و به شدت تنگی نفس دارم.',
    survivalTipFa: 'کلمه Radiating (پخش شدن درد به دست چپ) و Short of breath کدهای قرمز تریاژ در بیمارستان‌های غربی هستند.'
  },
  {
    id: 'hs_landlord',
    titleFa: '🏠 مشکل حاد خانه و نشت لوله به صاحب‌خانه (Tenant Emergency)',
    badge: 'اجاره و مسکن در خارج',
    contextFa: 'سقف حمام آب می‌دهد و صاحب‌خانه جواب نمی‌دهد؛ باید پیام اولتیماتوم قانونی بفرستید:',
    keyPhraseEn: 'There is an active major water leak from the ceiling causing property damage. This requires immediate emergency dispatch, or I will withhold rent under tenancy laws.',
    phoneticFa: 'دِر ایز اَن اَکتیو مِیجِر واتر لیک فرام دِ سیلینگ کازینگ پراپرتی دَمِیج...',
    meaningFa: 'نشت شدید و فعال آب از سقف وجود دارد که در حال آسیب به ملک است. این امر نیازمند اعزام فوری تعمیرکار است، در غیر این صورت طبق قوانین مستاجری اقدام خواهم کرد.',
    survivalTipFa: 'عبارت Active leak و Emergency dispatch مسئولیت قانونی را متوجه صاحب‌خانه می‌کند.'
  }
];

// =========================================================================
// 4. FARSI INTERFERENCE LAB (آزمایشگاه خنثی‌سازی ترجمه مستقیم فارسی)
// =========================================================================
interface FarsiInterferenceItem {
  id: string;
  farsiCommon: string;
  wrongChinglish: string;
  nativeEnglish: string;
  whyWrongFa: string;
  culturalNoteFa: string;
}

const FARSI_INTERFERENCE_LIST: FarsiInterferenceItem[] = [
  {
    id: 'fi_1',
    farsiCommon: 'خسته نباشید!',
    wrongChinglish: '❌ Don’t be tired! / You should not be tired!',
    nativeEnglish: '✅ Good job today! / Have a good one! / Thanks for your hard work!',
    whyWrongFa: 'خارجی‌ها کلمه Don’t be tired را امری تلقی می‌کنند و می‌گویند: مگه تو می‌تونی به من دستور بدی خسته نشم؟!',
    culturalNoteFa: 'در فرهنگ انگلیسی مفهومی به نام خسته نباشید تعارفی وجود ندارد؛ به جایش از زحمت طرف تشکر می‌کنند (Thanks for your help) یا آرزوی روز خوب می‌کنند (Have a great evening).'
  },
  {
    id: 'fi_2',
    farsiCommon: 'دست شما درد نکند!',
    wrongChinglish: '❌ May your hand not hurt! / Don’t pain your hand!',
    nativeEnglish: '✅ I truly appreciate it! / That’s so kind of you! / Thanks a million!',
    whyWrongFa: 'ترجمه دست درد نکند برای یک انگلیسی‌زبان کاملاً نامفهوم و حتی وحشتناک به نظر می‌رسد!',
    culturalNoteFa: 'بهترین معادل‌های نیتیو و محترمانه: That was very thoughtful of you یا I really appreciate your help.'
  },
  {
    id: 'fi_3',
    farsiCommon: 'دلم برایت یک ذره شده!',
    wrongChinglish: '❌ My heart became one small dot for you!',
    nativeEnglish: '✅ I miss you so much! / I’ve been dying to see you!',
    whyWrongFa: 'قلب و ذره شدن در انگلیسی وجود ندارد و ترجمه تحت‌اللفظی اسباب خنده می‌شود!',
    culturalNoteFa: 'اصطلاح "I’ve been dying to see you" یعنی مشتاقانه چشم‌انتظار دیدنت بودم.'
  },
  {
    id: 'fi_4',
    farsiCommon: 'قربانت بروم / فدات بشم!',
    wrongChinglish: '❌ I want to sacrifice myself for you!',
    nativeEnglish: '✅ You’re a lifesaver! / You’re the best! / Love you, man!',
    whyWrongFa: 'قربانی شدن در غرب مفهوم مرگ مذهبی یا فیزیکی دارد، نه ابراز محبت دوستانه!',
    culturalNoteFa: 'وقتی کسی کارتان را راه می‌اندازد به جای فدات بشم بگویید: You’re a lifesaver (فرشته نجاتم شدی).'
  }
];

export const FluencyAccelerator: React.FC<FluencyAcceleratorProps> = ({ onEarnLingous }) => {
  const [activeSub, setActiveSub] = useState<SubModule>('reflex_engine');

  // Reflex Engine State
  const [currentReflexIdx, setCurrentReflexIdx] = useState<number>(0);
  const [reflexFeedback, setReflexFeedback] = useState<string | null>(null);
  const [reflexTimer, setReflexTimer] = useState<number>(8);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Countdown timer for reflex engine
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSub === 'reflex_engine' && isTimerRunning && reflexTimer > 0) {
      interval = setInterval(() => {
        setReflexTimer((prev) => prev - 1);
      }, 1000);
    } else if (reflexTimer === 0 && isTimerRunning) {
      setReflexFeedback('⏰ وقت تمام شد! ذهن شما در ترجمه فارسی گیر افتاد. گزینه‌های نیتیو را سریع لمس کنید!');
      sound.playClick();
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [activeSub, isTimerRunning, reflexTimer]);

  const activeReflex = REFLEX_CHALLENGES[currentReflexIdx];

  const handleReflexChoice = (isNative: boolean, explanation: string) => {
    setIsTimerRunning(false);
    if (isNative) {
      sound.playLevelUp();
      try { confetti({ particleCount: 45, spread: 60 }); } catch {}
      setReflexFeedback(explanation);
      onEarnLingous(25);
    } else {
      sound.playClick();
      setReflexFeedback(explanation);
    }
  };

  const handleNextReflex = () => {
    setReflexFeedback(null);
    setReflexTimer(8);
    setIsTimerRunning(true);
    setCurrentReflexIdx((prev) => (prev + 1) % REFLEX_CHALLENGES.length);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Flagship Header */}
      <div className="rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 border-2 border-amber-400 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
            <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>🚀 شتاب‌دهنده انقلابی مکالمه روان (FLUENCY ACCELERATOR FOR IRANIANS)</span>
          </span>
          <span className="text-xs font-black text-emerald-300">
            تکنیک درمان «قفل شدن زبان» و «شکستن ترجمه در ذهن»
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-amber-300 pt-1">
          شکستن قفل مکالمه، رمزگشایی انگلیسی سریع خیابانی و سناریوهای اضطراری آمریکا و اروپا
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-4xl">
          چرا ۹۰٪ ایرانی‌ها بعد از سال‌ها کلاس زبان نمی‌توانند صحبت کنند؟ چون جملات را اول به فارسی می‌سازند و انگلیسی سریع فیلم‌ها را متوجه نمی‌شوند. این بخش با ۴ ابزار روان‌شناختی و زبان‌شناسی، سیم‌کشی مغز شما را به انگلیسی نیتیو تغییر می‌دهد!
        </p>

        {/* 4 Feature Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-3">
          {[
            { id: 'reflex_engine' as const, icon: Zap, labelFa: '۱. عکس‌العمل برق‌آسا (توقف ترجمه)', labelEn: 'Instant Reaction Reflex' },
            { id: 'speech_decrypter' as const, icon: Ear, labelFa: '۲. رمزگشایی انگلیسی سریع خیابان', labelEn: 'Street Speech Decrypter' },
            { id: 'high_stakes' as const, icon: AlertTriangle, labelFa: '۳. اتاق بحران و اضطرار خارج', labelEn: 'High-Stakes Emergency Room' },
            { id: 'farsi_interference' as const, icon: ShieldAlert, labelFa: '۴. آزمایشگاه خطاهای فارسی', labelEn: 'Farsi Interference Lab' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeSub === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveSub(tab.id);
                  setReflexFeedback(null);
                  setReflexTimer(8);
                  setIsTimerRunning(true);
                }}
                className={`p-3.5 rounded-2xl border-2 text-right transition-all flex flex-col justify-between ${
                  isSel
                    ? 'bg-amber-400 text-slate-950 border-white shadow-md'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.labelFa}</span>
                </div>
                <span className={`text-[10px] font-mono mt-1 ${isSel ? 'text-slate-900 font-bold' : 'text-slate-300'}`} dir="ltr">
                  {tab.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 1. REFLEX ENGINE (STOP PERSIAN TRANSLATION IN 5 SECONDS)             */}
      {/* =================================================================== */}
      {activeSub === 'reflex_engine' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black text-rose-600 block">
                🧠 تمرین نورولوژی مغز: قطع اتصال به زبان مادری
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                چالش عکس‌العمل برق‌آسا (پاسخ در ۸ ثانیه بدون ترجمه به فارسی)
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-mono text-sm font-black">
                <span>⏱️ زمان باقی‌مانده:</span>
                <span className={`text-base ${reflexTimer <= 3 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
                  0{reflexTimer}s
                </span>
              </div>
              <button
                type="button"
                onClick={handleNextReflex}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center gap-1"
              >
                <span>سوال بعدی</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 text-white space-y-2 border border-slate-800">
            <span className="text-xs font-black text-amber-300">موقعیت واقعی (Real Scenario):</span>
            <p className="text-base sm:text-lg font-black leading-relaxed text-emerald-200">
              {activeReflex.situationFa}
            </p>
            <p className="text-xs font-mono text-slate-400" dir="ltr">
              Prompt: "{activeReflex.promptScenarioEn}"
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-black text-slate-700 block">
              کدام گزینه در مغز یک فرد نیتیو در کسر ثانیه جرقه می‌زند؟ (لمس سریع):
            </span>
            <div className="grid grid-cols-1 gap-3">
              {activeReflex.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleReflexChoice(opt.isNative, opt.explanationFa)}
                  className="p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/50 text-right transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="space-y-0.5">
                    <span className="text-sm sm:text-base font-black text-slate-900 group-hover:text-amber-950 block font-mono" dir="ltr">
                      {opt.textEn}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-xl bg-white border border-slate-300 text-slate-700 shrink-0">
                    انتخاب پاسخ
                  </span>
                </button>
              ))}
            </div>
          </div>

          {reflexFeedback && (
            <div className="p-4 rounded-2xl bg-indigo-950 text-white border-2 border-amber-400 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-300">💡 تحلیل بازخورد فوری:</span>
                <button
                  type="button"
                  onClick={handleNextReflex}
                  className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black"
                >
                  چالش بعدی (+25 XP)
                </button>
              </div>
              <p className="text-sm font-bold text-slate-100">{reflexFeedback}</p>
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. CONNECTED SPEECH & STREET SLANG DECRYPTER                         */}
      {/* =================================================================== */}
      {activeSub === 'speech_decrypter' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-3 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-xl font-black text-slate-900">
                  🎧 رمزگشایی گوش ایرانی از انگلیسی پرسرعت و ادغام صداها (Connected Speech)
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  تفاوت آنچه در کتاب‌ها می‌نویسند با آنچه در خیابان‌های لندن و نیویورک واقعاً می‌شنوید!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {DECRYPTER_LESSONS.map((dec) => (
                <div key={dec.id} className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-sky-100 text-sky-900 text-xs font-black">
                        {dec.ruleTitleFa}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1">
                      <div className="flex justify-between items-center text-xs text-slate-400">
                        <span>کتابی (آهسته):</span>
                        <span className="font-mono text-slate-300" dir="ltr">{dec.bookText}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-black text-amber-300 pt-1 border-t border-white/10">
                        <span>واقعیت خیابان:</span>
                        <span className="font-mono text-base" dir="ltr">{dec.streetSpoken}</span>
                      </div>
                      <p className="text-xs text-emerald-300 pt-1" dir="rtl">
                        🗣️ تلفظ شنیداری: <strong>«{dec.phoneticFa}»</strong>
                      </p>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      🔍 <strong>راز ناپدید شدن صدا:</strong> {dec.ruleExplanationFa}
                    </p>
                    <p className="text-xs font-bold text-emerald-800">
                      🇮🇷 معنی: {dec.meaningFa}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => {
                        speakEnglish(dec.audioSlow, 0.75);
                      }}
                      className="flex-1 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs flex items-center justify-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>کتابی (آهسته)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        speakEnglish(dec.audioFast, 1.15);
                        onEarnLingous(10);
                      }}
                      className="flex-1 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-xs"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>خیابانی (سریع نیتیو)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. HIGH-STAKES EMERGENCY SIMULATOR                                  */}
      {/* =================================================================== */}
      {activeSub === 'high_stakes' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4 shadow-xs">
            <div>
              <h3 className="text-base sm:text-xl font-black text-rose-950 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>اتاق وضعیت اضطراری و حساس در خارج از کشور (High-Stakes Emergency)</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                جملاتی که ندانستن آن‌ها در خارج از کشور ممکن است منجر به بازداشت پلیس، عدم رسیدگی اورژانس یا ضرر مالی چند هزار دلاری شود!
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {HIGH_STAKES_SCENARIOS.map((hs) => (
                <div key={hs.id} className="p-5 rounded-2xl bg-rose-50/50 border-2 border-rose-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-200 pb-2">
                    <span className="text-sm font-black text-rose-900">{hs.titleFa}</span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-rose-600 text-white font-black text-xs">
                      {hs.badge}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-800">
                    ⚠️ <strong>سناریوی واقعی:</strong> {hs.contextFa}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-950 text-white space-y-1.5" dir="ltr">
                    <span className="text-xs text-amber-300 font-mono block">🛡️ Life-Saving Phrase:</span>
                    <p className="text-sm sm:text-base font-black text-emerald-300 leading-relaxed font-mono">
                      "{hs.keyPhraseEn}"
                    </p>
                    <p className="text-xs text-slate-300" dir="rtl">
                      🗣️ تلفظ دقیق: {hs.phoneticFa}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    <p className="font-bold text-slate-900">
                      🇮🇷 ترجمه مفهومی: «{hs.meaningFa}»
                    </p>
                    <span className="text-rose-800 font-black">
                      📌 نکته طلایی حقوقی/پزشکی: {hs.survivalTipFa}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        speakEnglish(hs.keyPhraseEn, 0.88);
                        onEarnLingous(20);
                      }}
                      className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      <span>🔊 تمرین تلفظ نجات‌بخش با صدای نیتیو (+20 XP)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => speakPersian(hs.meaningFa, 0.88)}
                      className="py-2.5 px-3 rounded-xl bg-rose-200 hover:bg-rose-300 text-rose-950 font-black text-xs"
                    >
                      🔊 شنیدن فارسی
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. FARSI INTERFERENCE LAB                                           */}
      {/* =================================================================== */}
      {activeSub === 'farsi_interference' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4 shadow-xs">
            <div>
              <h3 className="text-base sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <span>آزمایشگاه خنثی‌سازی ترجمه مستقیم فارسی به انگلیسی (Farsi Interference Lab)</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                کلماتی که همه ایرانی‌ها به انگلیسی می‌گویند ولی خارجی‌ها را گیج یا شگفت‌زده می‌کند!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FARSI_INTERFERENCE_LIST.map((item) => (
                <div key={item.id} className="p-5 rounded-2xl bg-amber-50/40 border-2 border-amber-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-200 text-amber-950 font-black text-xs">
                      اصطلاح فارسی: «{item.farsiCommon}»
                    </span>

                    <div className="p-3 rounded-xl bg-rose-950/90 text-rose-200 text-xs font-mono" dir="ltr">
                      {item.wrongChinglish}
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950 text-emerald-200 text-xs sm:text-sm font-black font-mono" dir="ltr">
                      {item.nativeEnglish}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      ❌ <strong>چرا غلطه؟</strong> {item.whyWrongFa}
                    </p>
                    <p className="text-xs text-emerald-900 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                      💡 <strong>نکته فرهنگی:</strong> {item.culturalNoteFa}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      speakEnglish(item.nativeEnglish.replace('✅ ', ''), 0.88);
                      onEarnLingous(15);
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 شنیدن معادل صحیح و نیتیو (+15 XP)</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
