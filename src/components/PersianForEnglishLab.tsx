import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Volume2, 
  BookOpen, 
  HeartHandshake, 
  ShoppingBag, 
  Coffee, 
  CheckCircle2, 
  HelpCircle, 
  WifiOff, 
  Compass, 
  Languages, 
  ArrowRight,
  Flame,
  Award,
  Lock,
  Unlock,
  AlertCircle,
  FileCheck2,
  RotateCcw,
  Type,
  Eye,
  Swords,
  Globe,
  Radio
} from 'lucide-react';
import { UserProgress } from '../types';
import { 
  PERSIAN_CURRICULUM, 
  CHECKPOINT_REVIEWS, 
  PERSIAN_SURVIVAL_PHRASES, 
  PersianLessonUnit, 
  CheckpointReviewQuestion 
} from '../data/persianForEnglish';
import { speakPersian, speakEnglish, sound } from '../utils/audio';
import { TaarofDuelArena } from './TaarofDuelArena';
import { TandemExchangeRoom } from './TandemExchangeRoom';

export type ScriptDisplayMode = 'both' | 'fingilish_only' | 'persian_only';

interface PersianForEnglishLabProps {
  progress: UserProgress;
  onEarnLingous: (amount: number, reason: string) => void;
  onMasterLesson: (lessonId: string) => void;
  onPassCheckpoint: (checkpointNumber: number) => void;
  onCompleteTaarofDuel: (duelId: string, reward: number) => void;
  onCompleteTandemSession: (partnerId: string, reward: number) => void;
}

export const PersianForEnglishLab: React.FC<PersianForEnglishLabProps> = ({
  progress,
  onEarnLingous,
  onMasterLesson,
  onPassCheckpoint,
  onCompleteTaarofDuel,
  onCompleteTandemSession
}) => {
  const masteredIds = progress.masteredPersianLessonIds || ['p_beg_1'];
  const passedCheckpoints = progress.passedCheckpointReviews || [];

  const [selectedTier, setSelectedTier] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(PERSIAN_CURRICULUM[0].id);
  const [activeTab, setActiveTab] = useState<'immersion' | 'checkpoint_review' | 'taarof_duel' | 'tandem_exchange' | 'phrasebook'>('immersion');
  
  // Custom Script View Mode for English speakers who only want spoken conversation
  const [scriptMode, setScriptMode] = useState<ScriptDisplayMode>('both'); // 'both' | 'fingilish_only' | 'persian_only'

  // Lesson Practice State
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [lockWarning, setLockWarning] = useState<string | null>(null);

  // Checkpoint Review State
  const [activeCheckpointNum, setActiveCheckpointNum] = useState<number>(3); // 3 or 6
  const [reviewAnswers, setReviewAnswers] = useState<Record<string, number>>({});
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);
  const [reviewScore, setReviewScore] = useState<number>(0);

  const filteredLessons = selectedTier === 'all' 
    ? PERSIAN_CURRICULUM 
    : PERSIAN_CURRICULUM.filter(l => l.level === selectedTier);

  const currentLesson = PERSIAN_CURRICULUM.find(l => l.id === selectedLessonId) || PERSIAN_CURRICULUM[0];

  // Gating helper: is lesson unlocked?
  const isLessonUnlocked = (lesson: PersianLessonUnit): boolean => {
    if (lesson.orderIndex === 1) return true;
    
    // Check if checkpoint 3 blocks intermediate lessons (orderIndex > 3)
    if (lesson.orderIndex > 3 && !passedCheckpoints.includes(3)) {
      return false;
    }

    // Check if checkpoint 6 blocks advanced lessons (orderIndex > 6)
    if (lesson.orderIndex > 6 && !passedCheckpoints.includes(6)) {
      return false;
    }

    // Previous lesson must be mastered!
    const prevLesson = PERSIAN_CURRICULUM.find(l => l.orderIndex === lesson.orderIndex - 1);
    if (!prevLesson) return true;
    return masteredIds.includes(prevLesson.id);
  };

  const handlePlayPersianVoice = (text: string) => {
    sound.playClick();
    speakPersian(text, progress.speechVoiceRate || 0.85);
  };

  const handlePlayEnglishVoice = (text: string) => {
    sound.playClick();
    speakEnglish(text, progress.speechVoiceRate || 0.9);
  };

  const handleQuizAnswer = (idx: number) => {
    sound.playClick();
    setSelectedQuizOption(idx);
    setQuizSubmitted(true);

    if (idx === currentLesson.practiceExercise.correctIndex) {
      sound.playLevelUp();
      try {
        confetti({ particleCount: 65, spread: 60 });
      } catch {}

      if (!masteredIds.includes(currentLesson.id)) {
        onMasterLesson(currentLesson.id);
        onEarnLingous(35, `Mastered Persian Lesson ${currentLesson.orderIndex}`);
      }
    } else {
      sound.playError();
    }
  };

  const handleSelectLesson = (lesson: PersianLessonUnit) => {
    if (!isLessonUnlocked(lesson)) {
      sound.playError();
      if (lesson.orderIndex > 3 && !passedCheckpoints.includes(3)) {
        setLockWarning(`🔒 قفل آموزشی: برای ورود به درس ${lesson.orderIndex}، ابتدا باید آزمون مرور جامع ایستگاه ۱ (خلاصه دروس ۱ تا ۳) را با موفقیت پاس کنید!`);
      } else {
        setLockWarning(`🔒 قفل آموزشی: شرط ورود به درس بعدی، یادگیری کامل و قبولی در درس ${lesson.orderIndex - 1} است!`);
      }
      return;
    }

    sound.playClick();
    setLockWarning(null);
    setSelectedLessonId(lesson.id);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  // Submit Checkpoint Review
  const handleSubmitCheckpointReview = (checkpointNum: number) => {
    sound.playClick();
    const checkpoint = CHECKPOINT_REVIEWS[checkpointNum];
    if (!checkpoint) return;

    let correctCount = 0;
    checkpoint.questions.forEach(q => {
      if (reviewAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const isPerfect = correctCount === checkpoint.questions.length;
    setReviewScore(correctCount);
    setReviewSubmitted(true);

    if (isPerfect) {
      sound.playLevelUp();
      try {
        confetti({ particleCount: 80, spread: 70 });
      } catch {}
      onPassCheckpoint(checkpointNum);
      onEarnLingous(50, `Passed Milestone Checkpoint Review ${checkpointNum}`);
    } else {
      sound.playError();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Global Persian Cultural Gateway */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 border border-emerald-500 p-6 sm:p-8 shadow-sm text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Spoken Persian for Conversation • آموزش مکالمه روان با الفبای لاتین و فارسی</span>
            </div>

            <h1 className="font-black text-2xl sm:text-3xl tracking-tight leading-tight">
              مکالمه اصیل زبان فارسی به همراه خط لاتین (Fingilish) 🇮🇷
            </h1>

            <p className="text-xs sm:text-sm font-normal text-emerald-100 leading-relaxed">
              برای انگلیسی‌زبانانی که هدفشان صرفاً مکالمه، سفر یا گفت‌وگوی روزمره است و نیازی به یادگیری الفبا و خط فارسی ندارند، تمام عبارات به صورت لاتین (Fingilish) با شیوه تلفظ دقیق فونتیک عرضه شده و با یک کلیک می‌توانید حالت نمایش را تنظیم کنید.
            </p>

            {/* Free Global Access Notice (Sanctions / No Payment Required) */}
            <div className="p-3.5 rounded-2xl bg-black/25 border border-amber-300/40 text-xs text-amber-100 leading-relaxed">
              🎁 <strong>دسترسی ۱۰۰٪ رایگان جهانی (Free Open Access):</strong> با توجه به تحریم‌های بانکی ایران و عدم تعیین سازوکار پرداخت بین‌المللی، فعلاً تمامی سطوح آموزش زبان فارسی به انگلیسی‌زبانان و سایر زبان‌های جهان کاملاً <strong>رایگان و آزاد</strong> در اختیار همه علاقه‌مندان قرار داده شده است.
            </div>
          </div>

          {/* Script Display Mode Switcher */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 text-white w-full md:w-auto space-y-2">
            <div className="text-xs font-bold text-amber-200 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1">
                <Type className="w-3.5 h-3.5" /> حالت نمایش الفبا:
              </span>
              <span className="text-[10px] bg-emerald-500/80 px-2 py-0.5 rounded-full font-bold">
                انتخاب دلخواه
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 bg-black/20 p-1 rounded-xl">
              <button
                onClick={() => { sound.playClick(); setScriptMode('fingilish_only'); }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                  scriptMode === 'fingilish_only'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                title="فقط با حروف انگلیسی / لاتین (ویژه مکالمه سریع)"
              >
                فقط لاتین<br />(Fingilish)
              </button>

              <button
                onClick={() => { sound.playClick(); setScriptMode('both'); }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                  scriptMode === 'both'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                title="نمایش همزمان خط فارسی و تلفظ انگلیسی"
              >
                هردو باهم<br />(Dual View)
              </button>

              <button
                onClick={() => { sound.playClick(); setScriptMode('persian_only'); }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                  scriptMode === 'persian_only'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                title="فقط خط فارسی"
              >
                فقط خط<br />فارسی
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lock warning notification */}
      {lockWarning && (
        <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-400 text-amber-950 font-bold text-xs sm:text-sm flex items-center justify-between shadow-sm animate-pulse">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>{lockWarning}</span>
          </div>
          <button
            onClick={() => setLockWarning(null)}
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            متوجه شدم
          </button>
        </div>
      )}

      {/* Navigation Sub-Tabs (Including Innovations: Taarof Duel & Tandem Exchange) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => { sound.playClick(); setActiveTab('immersion'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'immersion'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>درس‌های متوالی و شرط یادگیری (Sequential Lessons)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('taarof_duel'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'taarof_duel'
              ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
              : 'text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-amber-700" />
          <span>تمرین خوش‌زبانی و تعارف ایرانی (Ta'arof)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('tandem_exchange'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'tandem_exchange'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-300'
          }`}
        >
          <Globe className="w-4 h-4 text-teal-700" />
          <span>اتاق گپ‌زدن دوطرفه انگلیسی و فارسی 🌐</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('checkpoint_review'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'checkpoint_review'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>ایستگاه مرور جامع و آزمون خلاصه (۳ تا ۵ درس یکبار)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('phrasebook'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'phrasebook'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>کتابچه اصطلاحات ضروری (Survival Phrasebook)</span>
        </button>
      </div>

      {/* TAB: REVERSE-TA'AROF DUEL ARENA (Innovation #1) */}
      {activeTab === 'taarof_duel' && (
        <TaarofDuelArena
          completedDuelIds={progress.completedTaarofDuelIds || []}
          currentRating={progress.taarofFinesseRating || 75}
          onCompleteDuel={(duelId, reward) => {
            onCompleteTaarofDuel(duelId, reward);
            onEarnLingous(reward, 'Won Persian Ta\'arof Duel');
          }}
          speechVoiceRate={progress.speechVoiceRate || 0.85}
          scriptMode={scriptMode}
        />
      )}

      {/* TAB: TANDEM CULTURAL EXCHANGE (Innovation #3) */}
      {activeTab === 'tandem_exchange' && (
        <TandemExchangeRoom
          completedSessionIds={progress.completedTandemSessionIds || []}
          onCompleteTandemSession={(partnerId, reward) => {
            onCompleteTandemSession(partnerId, reward);
            onEarnLingous(reward, 'Completed Tandem Cultural Exchange');
          }}
          speechVoiceRate={progress.speechVoiceRate || 0.85}
        />
      )}

      {/* TAB 1: IMMERSION & LESSONS (Strict Progression) */}
      {activeTab === 'immersion' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Lesson Card */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                    currentLesson.level === 'beginner' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : currentLesson.level === 'intermediate'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {currentLesson.levelTitleEn}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    درس {currentLesson.orderIndex} از {PERSIAN_CURRICULUM.length}
                  </span>
                </div>
                <h2 className="font-bold text-lg sm:text-xl text-slate-900">
                  {currentLesson.titleEn}
                </h2>
              </div>

              <div className="flex items-center gap-1.5">
                {masteredIds.includes(currentLesson.id) ? (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>یادگرفته‌شده (Mastered)</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>در حال آزمون و یادگیری</span>
                  </span>
                )}
              </div>
            </div>

            {/* Persian Script & Fingilish Hero Box (Adapts to scriptMode!) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-300 space-y-4 text-center">
              
              {/* Badge indicating script type */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-200/90 text-emerald-950 text-xs font-bold shadow-xs">
                <span>🗣️ Spoken Persian Phrase</span>
                {scriptMode === 'fingilish_only' && <span className="text-amber-800 font-black">• نمایش مکالمه با خط لاتین</span>}
              </div>

              {/* Fingilish Primary (when in fingilish_only or both) */}
              {(scriptMode === 'fingilish_only' || scriptMode === 'both') && (
                <div className="space-y-1 py-1">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {scriptMode === 'fingilish_only' ? 'Spoken Persian (Latin letters for easy pronunciation):' : 'Pronounce with English Letters (Fingilish):'}
                  </div>
                  <h3 className={`font-mono font-black text-slate-950 leading-snug ${
                    scriptMode === 'fingilish_only' ? 'text-3xl sm:text-4xl text-emerald-950' : 'text-xl sm:text-2xl text-emerald-900'
                  }`}>
                    "{currentLesson.fingilishPhonetic}"
                  </h3>
                </div>
              )}

              {/* Persian Script (when in persian_only or both) */}
              {(scriptMode === 'persian_only' || scriptMode === 'both') && (
                <div className={`space-y-1 ${scriptMode === 'both' ? 'pt-3 border-t border-emerald-200/70' : 'py-1'}`}>
                  {scriptMode === 'both' && (
                    <div className="text-[11px] font-bold text-slate-500">
                      نگارش به خط فارسی (Persian Script):
                    </div>
                  )}
                  <h3 className="text-2xl sm:text-4xl font-black text-slate-900 leading-snug">
                    "{currentLesson.persianScript}"
                  </h3>
                </div>
              )}

              {/* Voice Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => handlePlayPersianVoice(currentLesson.audioPronunciationText)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>شنیدن تلفظ روان صوتی 🔊</span>
                </button>

                <button
                  onClick={() => handlePlayEnglishVoice(currentLesson.englishNatural)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>معنی طبیعی انگلیسی</span>
                </button>
              </div>
            </div>

            {/* Meanings Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-500 uppercase">Literal Translation:</span>
                <p className="text-slate-800 font-medium italic">"{currentLesson.englishLiteral}"</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-1">
                <span className="font-bold text-amber-900 uppercase">Natural English Equivalent:</span>
                <p className="text-slate-900 font-bold">"{currentLesson.englishNatural}"</p>
              </div>
            </div>

            {/* Deep Cultural Insight */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                <HeartHandshake className="w-4 h-4 text-emerald-700" />
                <span>حکمت و فرهنگ ایرانی نهفته در کلام:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {currentLesson.culturalInsight}
              </p>
            </div>

            {/* MANDATORY PASSING TEST FOR THIS LESSON (شرط یادگیری) */}
            <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-xs sm:text-sm font-bold">
                    آزمون اجباری تسلط به درس {currentLesson.orderIndex} (شرط عبور به درس بعدی)
                  </span>
                </div>
                <span className="text-xs font-bold text-amber-300">
                  +۳۵ سکه طلای لینگو
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-slate-200">
                {currentLesson.practiceExercise.question}
              </p>

              <div className="space-y-2">
                {currentLesson.practiceExercise.options.map((opt, oIdx) => {
                  const isSelected = selectedQuizOption === oIdx;
                  let style = 'bg-slate-800 border-slate-700 hover:border-amber-400 text-slate-200';

                  if (quizSubmitted) {
                    if (oIdx === currentLesson.practiceExercise.correctIndex) {
                      style = 'bg-emerald-900/80 border-emerald-400 text-emerald-200 font-bold';
                    } else if (isSelected) {
                      style = 'bg-rose-900/80 border-rose-400 text-rose-200 font-bold';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => !quizSubmitted && handleQuizAnswer(oIdx)}
                      disabled={quizSubmitted}
                      className={`w-full text-right p-3.5 rounded-2xl border text-xs sm:text-sm transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="pt-2 text-xs text-amber-200 leading-relaxed">
                  💡 {currentLesson.practiceExercise.explanation}
                </div>
              )}
            </div>

            {/* Next Lesson Action */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              {currentLesson.orderIndex < PERSIAN_CURRICULUM.length ? (
                <button
                  onClick={() => {
                    const nextLesson = PERSIAN_CURRICULUM.find(l => l.orderIndex === currentLesson.orderIndex + 1);
                    if (nextLesson) handleSelectLesson(nextLesson);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 flex items-center gap-2"
                >
                  <span>ورود به درس بعدی (درس {currentLesson.orderIndex + 1})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-700">
                  🎉 تبریک! شما به آخرین درس این دوره رسیده‌اید.
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Sequential Locked/Unlocked Curriculum Path */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-sm text-slate-900">
                  سطوح آموزشی (از مبتدی تا پیشرفته)
                </h3>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Beginner to Advanced
                </span>
              </div>

              {/* Level Filter Buttons */}
              <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl text-center text-xs font-bold">
                <button
                  onClick={() => { sound.playClick(); setSelectedTier('all'); }}
                  className={`py-1.5 rounded-lg transition-all ${
                    selectedTier === 'all'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  همه (۹)
                </button>
                <button
                  onClick={() => { sound.playClick(); setSelectedTier('beginner'); }}
                  className={`py-1.5 rounded-lg transition-all ${
                    selectedTier === 'beginner'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  مبتدی
                </button>
                <button
                  onClick={() => { sound.playClick(); setSelectedTier('intermediate'); }}
                  className={`py-1.5 rounded-lg transition-all ${
                    selectedTier === 'intermediate'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  متوسط
                </button>
                <button
                  onClick={() => { sound.playClick(); setSelectedTier('advanced'); }}
                  className={`py-1.5 rounded-lg transition-all ${
                    selectedTier === 'advanced'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  پیشرفته
                </button>
              </div>

              <div className="space-y-2">
                {filteredLessons.map((lesson) => {
                  const isActive = lesson.id === selectedLessonId;
                  const isDone = masteredIds.includes(lesson.id);
                  const isUnlocked = isLessonUnlocked(lesson);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        !isUnlocked 
                          ? 'border-slate-200 bg-slate-100/80 opacity-70'
                          : isActive
                          ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-900 line-clamp-1">
                          درس {lesson.orderIndex}: {lesson.titleEn}
                        </span>
                        
                        {isDone ? (
                          <span className="text-emerald-700 font-black flex items-center gap-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        ) : !isUnlocked ? (
                          <span className="text-slate-400 font-bold flex items-center gap-0.5">
                            <Lock className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="text-amber-600 font-bold">در دسترس</span>
                        )}
                      </div>

                      {/* Display based on scriptMode */}
                      {scriptMode !== 'fingilish_only' && (
                        <p className="text-xs text-emerald-950 font-bold line-clamp-1">
                          {lesson.persianScript}
                        </p>
                      )}
                      
                      {scriptMode !== 'persian_only' && (
                        <p className="font-mono text-xs font-semibold text-emerald-800 line-clamp-1 mt-0.5">
                          {lesson.fingilishPhonetic}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Taarof Callout Card */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 p-5 rounded-3xl shadow-sm space-y-2 border border-amber-400">
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
                <HeartHandshake className="w-4 h-4 text-slate-950" />
                <span>تمرین تعارفات روزمره (تاکسی و مهمانی):</span>
              </div>
              <p className="text-xs text-slate-900 font-medium leading-relaxed">
                یاد بگیرید چطور کرایه تاکسی را حساب کنید و در مهمانی جلوی بشقاب دوم غذا تعارف کنید!
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('taarof_duel');
                }}
                className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-amber-300 font-bold rounded-xl text-xs shadow-sm transition-transform active:scale-95"
              >
                شروع تمرین تعارفات 🚕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHECKPOINT REVIEWS (۳ تا ۵ درس یکبار) */}
      {activeTab === 'checkpoint_review' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                ایستگاه‌های مرور جامع و خلاصه دوره‌ای
              </span>
              <h2 className="font-bold text-lg sm:text-xl text-slate-900">
                مرور کلان دروس ۱ تا ۳ و ۱ تا ۵
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveCheckpointNum(3);
                  setReviewSubmitted(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCheckpointNum === 3 
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ایستگاه ۱ (دروس ۱ تا ۳)
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveCheckpointNum(6);
                  setReviewSubmitted(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCheckpointNum === 6 
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ایستگاه ۲ (دروس ۴ تا ۶)
              </button>
            </div>
          </div>

          {/* Active Checkpoint Content */}
          {CHECKPOINT_REVIEWS[activeCheckpointNum] && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2">
                <h3 className="font-black text-sm sm:text-base text-emerald-950">
                  {CHECKPOINT_REVIEWS[activeCheckpointNum].milestoneTitleFa}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {CHECKPOINT_REVIEWS[activeCheckpointNum].summaryTextFa}
                </p>
                <p className="text-[11px] text-slate-500 italic pt-1">
                  {CHECKPOINT_REVIEWS[activeCheckpointNum].summaryTextEn}
                </p>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {CHECKPOINT_REVIEWS[activeCheckpointNum].questions.map((q, idx) => (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-900">
                        سوال {idx + 1} ({q.sourceLessonTitle}):
                      </span>
                    </div>

                    <p className="font-bold text-xs sm:text-sm text-slate-900 leading-relaxed">
                      {q.promptFa}
                    </p>
                    <p className="text-[11px] text-slate-500 italic">
                      {q.promptEn}
                    </p>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = reviewAnswers[q.id] === oIdx;
                        let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-emerald-400';

                        if (reviewSubmitted) {
                          if (oIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                          } else if (isSelected) {
                            btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                          }
                        } else if (isSelected) {
                          btnStyle = 'bg-emerald-700 text-white font-bold border-emerald-700';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              if (!reviewSubmitted) {
                                sound.playClick();
                                setReviewAnswers({ ...reviewAnswers, [q.id]: oIdx });
                              }
                            }}
                            className={`w-full text-right p-3 rounded-xl border text-xs font-medium transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action submission */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">
                  پاسخ‌های ثبت‌شده: {Object.keys(reviewAnswers).length} از {CHECKPOINT_REVIEWS[activeCheckpointNum].questions.length}
                </span>

                <button
                  onClick={() => handleSubmitCheckpointReview(activeCheckpointNum)}
                  disabled={Object.keys(reviewAnswers).length < CHECKPOINT_REVIEWS[activeCheckpointNum].questions.length}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
                >
                  ثبت پاسخ‌ها و دریافت تاییدیه هوش مصنوعی
                </button>
              </div>

              {reviewSubmitted && (
                <div className={`p-4 rounded-2xl border text-xs font-bold leading-relaxed space-y-1 ${
                  reviewScore === CHECKPOINT_REVIEWS[activeCheckpointNum].questions.length
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  <div>
                    {reviewScore === CHECKPOINT_REVIEWS[activeCheckpointNum].questions.length
                      ? '🎉 تبریک! شما به تمام سوالات این ایستگاه پاسخ صحیح دادید. قفل درس‌های بعدی با موفقیت باز شد!'
                      : `نمره شما: ${reviewScore} از ${CHECKPOINT_REVIEWS[activeCheckpointNum].questions.length}. برای باز شدن درس‌های بعدی باید به تمام سوالات درست پاسخ دهید. لطفاً دوباره تلاش کنید.`}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PHRASEBOOK */}
      {activeTab === 'phrasebook' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm max-w-2xl space-y-1">
            <h2 className="font-bold text-lg text-slate-900">
              Essential Persian Survival Expressions (اصطلاحات کاربردی مسافر)
            </h2>
            <p className="text-xs text-slate-500">
              Equip yourself with the fundamental phrases that unlock warmth, smiles, and genuine hospitality everywhere in Iran or among Persian speakers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERSIAN_SURVIVAL_PHRASES.map((phrase, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Essential #{idx + 1}
                    </span>

                    <button
                      onClick={() => handlePlayPersianVoice(phrase.audioKey)}
                      className="p-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white transition-colors"
                      title="Hear Audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Primary Latin/Fingilish for conversation lovers */}
                  {(scriptMode === 'fingilish_only' || scriptMode === 'both') && (
                    <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
                      <span className="font-mono text-sm sm:text-base font-bold text-emerald-950 block">
                        "{phrase.fingilish}"
                      </span>
                    </div>
                  )}

                  {/* Persian script */}
                  {(scriptMode === 'persian_only' || scriptMode === 'both') && (
                    <h3 className="font-black text-xl text-slate-900 pt-1 leading-snug">
                      "{phrase.fa}"
                    </h3>
                  )}

                  <p className="text-xs font-bold text-slate-700 pt-1">
                    English Meaning: {phrase.en}
                  </p>

                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    💡 {phrase.usageTip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
