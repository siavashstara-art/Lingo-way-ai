import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Dumbbell, 
  Flame, 
  Award, 
  CheckCircle2, 
  Volume2, 
  RotateCcw, 
  ArrowRight, 
  Zap, 
  BookOpen, 
  HelpCircle,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { UserProgress, ApprenticeStage } from '../types';
import { sound, speakEnglish } from '../utils/audio';
import { getStageTitle } from '../utils/storage';
import { AccessibilitySettings } from '../utils/accessibility';

interface MasterApprenticeGymProps {
  progress: UserProgress;
  accessibility: AccessibilitySettings;
  onCompleteWorkout: (workoutId: string, rewardLingous: number, apprenticeExp: number) => void;
  onLevelUpStage: (newStage: ApprenticeStage) => void;
}

interface ShadowingExercise {
  id: string;
  phrase: string;
  phonetic: string;
  faMeaning: string;
  coachAdvice: string;
  repsNeeded: number;
}

const SHADOWING_EXERCISES: ShadowingExercise[] = [
  {
    id: 'sh_1',
    phrase: 'Could you please do me a quick favor?',
    phonetic: '/kʊd juː pliːz duː miː ə kwɪk ˈfeɪ.vər/',
    faMeaning: 'میشه لطفاً یک لطف یا کمک فوری در حق من بکنی؟',
    coachAdvice: 'استاد می‌گوید: به کلمه Could you وصل شو (کودیو). کلمات را جدا جدا تلفظ نکن، ریتم روان مثل آب داشته باش.',
    repsNeeded: 3
  },
  {
    id: 'sh_2',
    phrase: 'I really appreciate you taking the time to meet with me.',
    phonetic: '/aɪ ˈrɪə.li əˈpriː.ʃi.eɪt juː ˈteɪ.kɪŋ ðə taɪm tuː miːt wɪð miː/',
    faMeaning: 'واقعاً ممنونم که وقت گذاشتی تا با من دیدار کنی.',
    coachAdvice: 'استاد می‌گوید: استرس و تاکید روی appreciate و time است. این جمله کلید طلایی ایجاد احترام و صمیمیت در مکالمات است.',
    repsNeeded: 3
  },
  {
    id: 'sh_3',
    phrase: 'Let me sleep on it and get back to you tomorrow morning.',
    phonetic: '/let miː sliːp ɒn ɪt ənd ɡet bæk tuː juː təˈmɒr.əʊ ˈmɔː.nɪŋ/',
    faMeaning: 'اجازه بده تا فردا بهش فکر کنم و صبح بهت خبر بدم.',
    coachAdvice: 'استاد می‌گوید: اصطلاح Sleep on it یعنی عجله نکنم و بعد از فکر کردن تصمیم بگیرم. این یک اصطلاح بسیار رایج و پخته در زبان روزمره است.',
    repsNeeded: 3
  }
];

const MENTOR_RULES = [
  {
    principle: '۱. اصل تکرار گوش و زبان (Gym Shadowing)',
    desc: 'زبان‌آموزی مثل پرورش عضلات در باشگاه (جیم) است؛ با حفظ کردن کلمه به زبان نمی‌آید. باید صدا را بشنوید و بلافاصله تکرار کنید تا زبان به عضلات گفتار عادت کند.'
  },
  {
    principle: '۲. خطای شیرین و اصلاح بلادرنگ (Apprentice Feedback)',
    desc: 'شاگرد خوب کسی نیست که خطا نکند، کسی است که سریع اشتباه کند و سریع اصلاح شود. در متد ما هیچ خجالتی وجود ندارد.'
  },
  {
    principle: '۳. پیوستگی زنجیره تمرین (Daily Habit Streak)',
    desc: 'روزانه فقط ۱۰ دقیقه تمرین سبک بهتر از ۵ ساعت خواندن یکباره در آخر هفته است. حفظ زنجیره آتش روزانه، نشانه تعهد شاگرد به استاد است.'
  }
];

export const MasterApprenticeGym: React.FC<MasterApprenticeGymProps> = ({
  progress,
  accessibility,
  onCompleteWorkout,
  onLevelUpStage
}) => {
  const isFa = accessibility.language === 'fa';
  const stageInfo = getStageTitle(progress.apprenticeStage || 'novice');

  const [activeTab, setActiveTab] = useState<'gym_workout' | 'master_teachings' | 'mentor_chat'>('gym_workout');
  const [selectedShadowingIdx, setSelectedShadowingIdx] = useState(0);
  const [currentReps, setCurrentReps] = useState<Record<string, number>>({});
  const [isListeningActive, setIsListeningActive] = useState(false);

  const currentExercise = SHADOWING_EXERCISES[selectedShadowingIdx];
  const userReps = currentReps[currentExercise.id] || 0;
  const isExerciseDone = userReps >= currentExercise.repsNeeded;

  const handlePlayVoice = (text: string) => {
    sound.playClick();
    setIsListeningActive(true);
    speakEnglish(text, progress.speechVoiceRate);
    setTimeout(() => setIsListeningActive(false), 2500);
  };

  const handleLogRepetition = () => {
    sound.playClick();
    const newCount = userReps + 1;
    setCurrentReps(prev => ({ ...prev, [currentExercise.id]: newCount }));

    if (newCount === currentExercise.repsNeeded) {
      sound.playLevelUp();
      try {
        confetti({ particleCount: 60, spread: 55 });
      } catch {
        //
      }
      onCompleteWorkout(currentExercise.id, 25, 30);
    } else {
      sound.playChime();
    }
  };

  const handleNextExercise = () => {
    sound.playClick();
    setSelectedShadowingIdx((prev) => (prev + 1) % SHADOWING_EXERCISES.length);
  };

  const handlePrevExercise = () => {
    sound.playClick();
    setSelectedShadowingIdx((prev) => (prev - 1 + SHADOWING_EXERCISES.length) % SHADOWING_EXERCISES.length);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner - Gym & Mentorship */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-500 border border-amber-300 p-6 sm:p-8 shadow-sm text-slate-950">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-300 font-bold text-xs shadow-sm">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>{isFa ? 'باشگاه مهارت‌های کلامی • متد استاد-شاگردی جیم‌فیکیشن' : 'Master-Apprentice Verbal Gym'}</span>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl tracking-tight leading-tight">
              {isFa ? 'تمرینگاه کلامی و ارتقای سطح شاگردی' : 'Gymfication & Mentorship Arena'}
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
              {isFa 
                ? 'در متد استاد-شاگردی، زبان را مثل تمرین ورزشی با تکرار همزمان (Shadowing)، فیدبک مستقیم و تقویت عضلات زبان یاد می‌گیرید؛ ساده، زنده و کاربردی.'
                : 'Train your speech muscles through real-time shadowing, structured feedback, and habit-building workouts.'}
            </p>
          </div>

          {/* Apprentice Stage Status Badge */}
          <div className="bg-white/95 rounded-2xl p-4 border border-amber-300 text-slate-900 shadow-sm w-full md:w-64 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">رتبه در محضر استاد:</span>
              <span className="text-xl">{stageInfo.icon}</span>
            </div>
            <div className="font-black text-sm text-amber-900">{stageInfo.titleFa}</div>
            
            <div className="pt-2">
              <div className="flex justify-between text-[11px] text-slate-600 font-bold mb-1">
                <span>امتیاز شاگردی:</span>
                <span>{progress.apprenticePoints || 45} / {stageInfo.nextThreshold}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, Math.round(((progress.apprenticePoints || 45) / stageInfo.nextThreshold) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('gym_workout')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'gym_workout'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>تمرینات شبیه‌ساز صدا (Gym Shadowing)</span>
        </button>

        <button
          onClick={() => setActiveTab('master_teachings')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'master_teachings'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>اصول استاد-شاگردی</span>
        </button>
      </div>

      {/* TAB 1: Shadowing Workout Gym */}
      {activeTab === 'gym_workout' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Gym Card */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase">
                  ایستگاه تمرین {selectedShadowingIdx + 1} از {SHADOWING_EXERCISES.length}
                </span>
                <h2 className="font-bold text-lg sm:text-xl text-slate-900">
                  تکرار همزمان با صدای استاد (Shadowing Reps)
                </h2>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevExercise}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                  title="تمرین قبلی"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextExercise}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                  title="تمرین بعدی"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Target Phrase Display */}
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3 text-center">
              <span className="text-xs font-bold text-amber-900 bg-amber-200/70 px-3 py-1 rounded-full">
                جمله استاندارد روزمره
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                "{currentExercise.phrase}"
              </h3>

              <p className="font-mono text-xs sm:text-sm text-slate-500">
                {currentExercise.phonetic}
              </p>

              <p className="text-sm font-bold text-amber-950 pt-2 border-t border-amber-200/60">
                معنی روان: {currentExercise.faMeaning}
              </p>

              <button
                onClick={() => handlePlayVoice(currentExercise.phrase)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 mt-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>گوش دادن به تلفظ استاد 🔊</span>
              </button>
            </div>

            {/* Master Coaching Advice */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>توصیه استاد برای این جمله:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {currentExercise.coachAdvice}
              </p>
            </div>

            {/* Reps Counter & Action */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">ست تکرار (Reps):</span>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: currentExercise.repsNeeded }).map((_, rIdx) => (
                    <div
                      key={rIdx}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        rIdx < userReps
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {rIdx < userReps ? '✓' : rIdx + 1}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-slate-500">({userReps} از {currentExercise.repsNeeded})</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleLogRepetition}
                  disabled={isExerciseDone}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isExerciseDone ? 'تکرارها کامل شد ✔️' : 'تکرار کردم (ثبت ست)'}</span>
                </button>

                <button
                  onClick={handleNextExercise}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  جمله بعدی
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Workout Checklist */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-sm text-slate-900">
                  لیست تمرینات امروز شاگرد
                </h3>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                  +۲۵ سکه هر ست
                </span>
              </div>

              <div className="space-y-2">
                {SHADOWING_EXERCISES.map((ex, idx) => {
                  const done = (currentReps[ex.id] || 0) >= ex.repsNeeded;
                  const active = idx === selectedShadowingIdx;

                  return (
                    <div
                      key={ex.id}
                      onClick={() => setSelectedShadowingIdx(idx)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        active
                          ? 'border-amber-400 bg-amber-50/50 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-800 line-clamp-1">{ex.phrase}</span>
                        {done && (
                          <span className="text-emerald-700 font-bold shrink-0">✔ کامل</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {ex.faMeaning}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coach Motive Quote */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 rounded-3xl p-5 space-y-2 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>درس امروز استاد:</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                «زبان‌آموزی با کتاب و دفتر در پستو نمی‌ماند؛ زبان در دهان و روی لب‌ها زنده می‌شود. هر روز ۵ دقیقه با صدای بلند صحبت کنید.»
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Master Principles */}
      {activeTab === 'master_teachings' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="max-w-2xl space-y-1">
            <h2 className="font-bold text-xl text-slate-900">
              اصول راهبردی متد آموزشی استاد-شاگردی
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              این شیوه بر پایه انتقال مستقیم مهارت، حذف موانع ذهنی و بازخورد سریع طراحی شده است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MENTOR_RULES.map((rule, rIdx) => (
              <div key={rIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="font-bold text-sm text-slate-900 text-amber-900">
                  {rule.principle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
