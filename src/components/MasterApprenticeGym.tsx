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
  Sparkles, 
  AlertTriangle, 
  Users, 
  ShieldAlert, 
  GraduationCap, 
  Radio, 
  Play, 
  HelpCircle, 
  Plus, 
  UserCheck, 
  BadgeAlert,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { UserProgress, ApprenticeStage, LanguageProficiencyTier } from '../types';
import { 
  PROFICIENCY_TIERS, 
  INITIAL_TEACHING_ROOMS, 
  STUDENT_CHALLENGES_BANK, 
  PLACEMENT_TEST_QUESTIONS, 
  TeachingRoom, 
  StudentChallengeQuestion, 
  PlacementTestQuestion 
} from '../data/mentorHierarchy';
import { sound, speakEnglish, speakPersian } from '../utils/audio';
import { getStageTitle } from '../utils/storage';
import { AccessibilitySettings } from '../utils/accessibility';
import { TeacherTrainingWorkshop } from './TeacherTrainingWorkshop';

interface MasterApprenticeGymProps {
  progress: UserProgress;
  accessibility: AccessibilitySettings;
  onCompleteWorkout: (workoutId: string, rewardLingous: number, apprenticeExp: number) => void;
  onLevelUpStage: (newStage: ApprenticeStage) => void;
  onUpdateTier: (newTier: LanguageProficiencyTier, score: number) => void;
  onStudentChallengeResult: (passed: boolean) => void;
  onHostTeachingSession: (roomTitle: string, salary: number) => void;
  onAwardTeachingStar: () => void;
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

export const MasterApprenticeGym: React.FC<MasterApprenticeGymProps> = ({
  progress,
  accessibility,
  onCompleteWorkout,
  onLevelUpStage,
  onUpdateTier,
  onStudentChallengeResult,
  onHostTeachingSession,
  onAwardTeachingStar
}) => {
  const isFa = accessibility.language === 'fa';
  const currentTier = progress.proficiencyTier || 'intermediate';
  const tierConfig = PROFICIENCY_TIERS[currentTier];

  const [activeTab, setActiveTab] = useState<'rooms' | 'teacher_training' | 'student_challenges' | 'placement_test' | 'gym_workout'>('rooms');
  
  // Shadowing Gym state
  const [selectedShadowingIdx, setSelectedShadowingIdx] = useState(0);
  const [currentReps, setCurrentReps] = useState<Record<string, number>>({});
  const currentExercise = SHADOWING_EXERCISES[selectedShadowingIdx];
  const userReps = currentReps[currentExercise.id] || 0;
  const isExerciseDone = userReps >= currentExercise.repsNeeded;

  // Rooms State
  const [rooms, setRooms] = useState<TeachingRoom[]>(INITIAL_TEACHING_ROOMS);
  const [activeRoom, setActiveRoom] = useState<TeachingRoom | null>(null);
  const [isHostingNewRoom, setIsHostingNewRoom] = useState(false);
  const [newRoomTitle, setNewRoomTitle] = useState('');
  const [newRoomPhrase, setNewRoomPhrase] = useState('');

  // Student Challenge state
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<number | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);
  const [isChallengeSuccess, setIsChallengeSuccess] = useState<boolean | null>(null);

  // Placement Test state
  const [placementAnswers, setPlacementAnswers] = useState<Record<string, number>>({});
  const [placementSubmitted, setPlacementSubmitted] = useState(false);
  const [placementScore, setPlacementScore] = useState(0);

  const handlePlayVoice = (text: string) => {
    sound.playClick();
    speakEnglish(text, progress.speechVoiceRate);
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
        // Confetti fallback
      }
      onCompleteWorkout(currentExercise.id, 25, 30);
    } else {
      sound.playChime();
    }
  };

  // Student Challenge Response (Three strikes challenge rule!)
  const handleAnswerChallenge = (optionIdx: number) => {
    const q = STUDENT_CHALLENGES_BANK[currentChallengeIdx];
    const option = q.options[optionIdx];
    setSelectedChallengeOption(optionIdx);

    if (option.isCorrectTeachingPedagogy) {
      sound.playLevelUp();
      setIsChallengeSuccess(true);
      setChallengeFeedback(`آفرین استاد! پاسخ شما کاملاً دقیق، علمی و دارای ارزش پداگوژیک بود: ${option.explanation}`);
      onStudentChallengeResult(true);
    } else {
      sound.playError();
      setIsChallengeSuccess(false);
      const newDefeats = progress.failedChallengeCount + 1;
      setChallengeFeedback(
        newDefeats >= 3 
          ? `⚠️ اخطار جدی! شما ۳ بار متوالی توسط شاگردان به چالش کشیده شدید و نتوانستید پاسخ درستی ارائه دهید. بر اساس قوانین هوش مصنوعی، رده استادیاری شما یک سطح تنزل یافت!`
          : `خطا در تدریس! شاگردان توانستند پاسخ شما را به چالش بکشند (${newDefeats} از ۳ شکست تا تنزل مقام استادیاری). ${option.explanation}`
      );
      onStudentChallengeResult(false);
    }
  };

  // Create Room
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomTitle.trim()) return;

    if (!tierConfig.canHostRoom) {
      sound.playError();
      alert('شما در سطح مبتدی هستید. ابتدا در آزمون تعیین سطح شرکت کرده و ارتقا یابید تا هوش مصنوعی مجوز تاسیس روم را به شما اعطا کند.');
      return;
    }

    sound.playLevelUp();
    try {
      confetti({ particleCount: 50 });
    } catch {}

    const newRoom: TeachingRoom = {
      id: `room_${Date.now()}`,
      hostName: 'شما (استادیار)',
      hostTier: currentTier,
      targetTier: tierConfig.canTeachTier || 'beginner',
      title: newRoomTitle,
      topicFa: 'آموزش کلامی و اصطلاحات کاربردی به شاگردان سطح پایین‌تر',
      activeApprenticesCount: 1,
      maxCapacity: 15,
      currentLessonPhrase: newRoomPhrase || 'Practice makes permanent, not just perfect.',
      currentLessonPhonetic: '/ˈpræk.tɪs meɪks ˈpɜː.mə.nənt/',
      pedagogicalFocus: 'متد تدریس فعال و گفت‌وگوی دوطرفه',
      isLive: true,
      consecutiveDefeats: 0
    };

    setRooms([newRoom, ...rooms]);
    setActiveRoom(newRoom);
    setIsHostingNewRoom(false);
    setNewRoomTitle('');
    setNewRoomPhrase('');
    onHostTeachingSession(newRoom.title, tierConfig.teachingSalaryLingous);
  };

  // Complete Placement Test
  const handleSubmitPlacement = () => {
    sound.playClick();
    let score = 0;
    PLACEMENT_TEST_QUESTIONS.forEach(q => {
      if (placementAnswers[q.id] === q.correctIndex) {
        score += 20;
      }
    });

    setPlacementScore(score);
    setPlacementSubmitted(true);

    let assignedTier: LanguageProficiencyTier = 'beginner';
    if (score >= 95) assignedTier = 'grandmaster';
    else if (score >= 80) assignedTier = 'professional';
    else if (score >= 60) assignedTier = 'upper_intermediate';
    else if (score >= 40) assignedTier = 'intermediate';

    sound.playLevelUp();
    onUpdateTier(assignedTier, score);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Hierarchy & Master-Apprentice System */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 border border-amber-300 p-6 sm:p-8 shadow-sm text-slate-950">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-300 font-bold text-xs shadow-sm">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>سلسله‌مراتب استادیاری و آموزش روش تدریس (Master-Apprentice Tiered Hierarchy)</span>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl tracking-tight leading-tight">
              سامانه تدریس شاگرد به شاگرد و اتاق‌های تدریس هوشمند 🏛️
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
              در این سامانه، یادگیرندگان در ضمن تحصیل، متدهای تدریس را نیز می‌آموزند. با ارتقای سطح، به تأیید هوش مصنوعی روم احداث می‌کنید و به افراد سطح پایین‌تر درس می‌دهید؛ اما دقت کنید: <span className="underline underline-offset-4 font-black">اگر شاگردانتان ۳ بار شما را به چالش بکشند، رده استادیاری شما تنزل خواهد یافت!</span>
            </p>
          </div>

          {/* User's Current Teaching Tier Badge */}
          <div className="bg-white/95 rounded-2xl p-4 border border-amber-300 text-slate-900 shadow-sm w-full md:w-72 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">جایگاه علمی شما:</span>
              <span className="text-2xl">{tierConfig.badge}</span>
            </div>
            
            <div className="font-black text-sm text-amber-900 leading-tight">
              {tierConfig.titleFa}
            </div>

            <div className="text-xs text-slate-600 bg-amber-50 p-2 rounded-xl border border-amber-200">
              <div className="font-bold text-amber-900">مجوز تدریس:</div>
              <div>{tierConfig.targetMenteesNameFa}</div>
            </div>

            {/* Official Master Teaching Chair & Golden Stars (کرسی استادی رسمی) */}
            <div className="pt-2 border-t border-amber-200 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-950">
                <span className="flex items-center gap-1">
                  <span>⭐</span> کرسی استادی رسمی هوش مصنوعی:
                </span>
                <span>{progress.teachingGoldenStars || 7} از ۱۰ ستاره</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-400 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, ((progress.teachingGoldenStars || 7) / 10) * 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">
                {progress.hasOfficialChairSeal 
                  ? '👑 دارای کرسی استادی رسمی (درآمد تدریس ۲ برابر فعال است)' 
                  : 'با کسب ۱۰ ستاره طلایی از شاگردان، کرسی رسمی با درآمد ۲ برابری فعال می‌شود'}
              </p>
            </div>

            {/* Strike Counter (Demotion Risk Meter) */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-rose-700">
                <span className="flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> شکست در چالش شاگردان:
                </span>
                <span>{progress.failedChallengeCount || 0} از ۳ (خطر تنزل)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                <div 
                  className={`h-full rounded-full transition-all ${
                    (progress.failedChallengeCount || 0) >= 2 ? 'bg-rose-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${((progress.failedChallengeCount || 0) / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => { sound.playClick(); setActiveTab('rooms'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'rooms'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Radio className="w-4 h-4 text-amber-700" />
          <span>اتاق‌های تدریس زنده (Teaching Rooms)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('teacher_training'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'teacher_training'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <span>کارگاه فوت‌وفن معلمی و دروس اختصاصی 🎓</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('student_challenges'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'student_challenges'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>پاسخ به چالش شاگردان (قانون ۳ بار شکست)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('placement_test'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'placement_test'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>آزمون تعیین سطح و اعطای مدرک استادیاری</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('gym_workout'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'gym_workout'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Dumbbell className="w-4 h-4 text-slate-700" />
          <span>باشگاه شادوینگ و تکرار همزمان (Gym)</span>
        </button>
      </div>

      {/* TAB 1: TEACHING ROOMS & PEER INSTRUCTION */}
      {activeTab === 'rooms' && (
        <div className="space-y-6">
          {/* Action Row: Create Room & Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="font-bold text-base sm:text-lg text-slate-900">
                اتاق‌های تدریس فعال شاگردان و استادیاران
              </h2>
              <p className="text-xs text-slate-500">
                استادان فوق حرفه‌ای به حرفه‌ای‌ها، حرفه‌ای‌ها به آپر-اینترمدیت‌ها و اینترمدیت‌ها به مبتدی‌ها درس می‌دهند.
              </p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setIsHostingNewRoom(!isHostingNewRoom);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>احداث روم تدریس جدید (با صلاحدید هوش مصنوعی)</span>
            </button>
          </div>

          {/* Create Room Form Modal/Card */}
          {isHostingNewRoom && (
            <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-dashed border-amber-300 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-amber-700 animate-pulse" />
                  <h3 className="font-bold text-sm sm:text-base text-amber-950">
                    راه‌اندازی اتاق تدریس شخصی (سطح مجاز شما: {tierConfig.targetMenteesNameFa})
                  </h3>
                </div>
                <button 
                  onClick={() => setIsHostingNewRoom(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  انصراف
                </button>
              </div>

              <form onSubmit={handleCreateRoom} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    عنوان کلاس یا کارگاه تدریس:
                  </label>
                  <input
                    type="text"
                    required
                    value={newRoomTitle}
                    onChange={(e) => setNewRoomTitle(e.target.value)}
                    placeholder="مثال: کارگاه تقویت سرعت پاسخگویی و رفع گیرپاژ کلامی برای مبتدیان"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 text-xs sm:text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    جمله محوری انگلیسی برای تدریس به شاگردان:
                  </label>
                  <input
                    type="text"
                    value={newRoomPhrase}
                    onChange={(e) => setNewRoomPhrase(e.target.value)}
                    placeholder="مثال: Don't hesitate to reach out if you have questions."
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 text-xs sm:text-sm bg-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-600 font-bold">
                    حق‌التدریس شما: +{tierConfig.teachingSalaryLingous} سکه طلای لینگو در هر جلسه 🪙
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-sm"
                  >
                    شروع رسمی کلاس و پذیرش شاگردان
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map((room) => {
              const hostInfo = PROFICIENCY_TIERS[room.hostTier];
              const targetInfo = PROFICIENCY_TIERS[room.targetTier];

              return (
                <div
                  key={room.id}
                  className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                        <span>در حال تدریس زنده</span>
                      </span>

                      <span className="text-slate-500 font-medium">
                        {room.activeApprenticesCount}/{room.maxCapacity} شاگرد
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{hostInfo.badge}</span>
                        <span className="text-xs font-bold text-slate-700">{room.hostName}</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 leading-snug">
                        {room.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {room.topicFa}
                      </p>
                    </div>

                    {/* Lesson Snippet */}
                    <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
                        <span>جمله مورد تدریس:</span>
                        <button
                          onClick={() => handlePlayVoice(room.currentLessonPhrase)}
                          className="hover:text-amber-700"
                          title="پخش تلفظ"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-bold text-xs text-slate-900">
                        "{room.currentLessonPhrase}"
                      </p>
                      <p className="font-mono text-[10px] text-slate-500">
                        {room.currentLessonPhonetic}
                      </p>
                    </div>

                    {/* Pedagogy Method */}
                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-800">روش تدریس: </span>
                      {room.pedagogicalFocus}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                    <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-200">
                      مخاطب: {targetInfo.titleFa}
                    </span>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setActiveRoom(room);
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-transform active:scale-95"
                    >
                      ورود به کلاس
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Class Modal */}
          {activeRoom && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
              <div className="w-full max-w-lg bg-white border border-slate-300 rounded-3xl p-6 shadow-xl space-y-5 text-slate-800">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase">
                      کلاس زنده تدریس شاگرد به شاگرد
                    </span>
                    <h2 className="font-bold text-lg text-slate-900">
                      {activeRoom.title}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setActiveRoom(null)}
                    className="p-1 text-slate-400 hover:text-slate-600 font-bold text-sm"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-2 text-center">
                  <span className="text-xs font-bold text-amber-900 bg-amber-200/60 px-3 py-0.5 rounded-full">
                    مدرس کلاس: {activeRoom.hostName}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 pt-1">
                    "{activeRoom.currentLessonPhrase}"
                  </h3>
                  <button
                    onClick={() => handlePlayVoice(activeRoom.currentLessonPhrase)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-sm hover:bg-amber-400"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>شنیدن گفتار آموزشی مدرس 🔊</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="font-bold text-slate-800">تکنیک تدریس مدرس:</div>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {activeRoom.pedagogicalFocus}
                  </p>
                </div>

                {/* Peer Evaluation Star for the Host */}
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-bold text-amber-950">
                    <span>⭐ ارزیابی پداگوژیک شما از شیوه تدریس استادیار:</span>
                    <button
                      onClick={() => {
                        sound.playLevelUp();
                        onAwardTeachingStar();
                        try {
                          confetti({ particleCount: 50 });
                        } catch {}
                      }}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-[11px] shadow-xs"
                    >
                      اعطای ۱ ستاره طلایی به مدرس ⭐
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    با اعطای ستاره از سوی شاگردان، استادیار به کرسی رسمی استادی هوش مصنوعی و دو برابر شدن حق‌التدریس نزدیک می‌شود.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-700 font-bold">
                    ✓ حضور شما در این جلسه ثبت شد (+۱۵ امتیاز پداگوژیک)
                  </span>
                  <button
                    onClick={() => {
                      sound.playLevelUp();
                      setActiveRoom(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    پایان حضور در کلاس
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB: TEACHER TRAINING WORKSHOP & PERSONALIZED LESSONS */}
      {activeTab === 'teacher_training' && (
        <TeacherTrainingWorkshop
          onEarnLingous={(amount, reason) => {
            sound.playCoin();
            onHostTeachingSession(reason, amount);
          }}
          userTier={currentTier}
        />
      )}

      {/* TAB 2: STUDENT CHALLENGES & THREE-STRIKES DEMOTION */}
      {activeTab === 'student_challenges' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <div>
                <h2 className="font-bold text-base sm:text-lg text-slate-900">
                  اتاق داوری و چالش شاگردان با مدرس
                </h2>
                <span className="text-xs text-slate-500">
                  قانون طلایی: ۳ بار شکست در پاسخ به سوالات چالشی شاگردان = تنزل مقام استادیاری!
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1 rounded-xl text-xs font-bold">
              <span>تعداد شکست‌های شما:</span>
              <span className="text-sm font-black">{progress.failedChallengeCount || 0} / ۳</span>
            </div>
          </div>

          {/* Active Challenge Question */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">
                  پرسش‌کننده: {STUDENT_CHALLENGES_BANK[currentChallengeIdx].askedByStudent}
                </span>
                <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full text-[11px] font-bold">
                  {STUDENT_CHALLENGES_BANK[currentChallengeIdx].context}
                </span>
              </div>

              <p className="font-bold text-sm sm:text-base text-slate-900 leading-relaxed pt-1">
                "{STUDENT_CHALLENGES_BANK[currentChallengeIdx].questionText}"
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                به عنوان مدرس، بهترین پاسخ آموزشی شما چیست؟
              </span>

              {STUDENT_CHALLENGES_BANK[currentChallengeIdx].options.map((opt, oIdx) => {
                const isSelected = selectedChallengeOption === oIdx;
                let btnStyle = 'bg-white border-slate-200 hover:border-amber-400 text-slate-800';

                if (selectedChallengeOption !== null) {
                  if (opt.isCorrectTeachingPedagogy) {
                    btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => selectedChallengeOption === null && handleAnswerChallenge(oIdx)}
                    disabled={selectedChallengeOption !== null}
                    className={`w-full text-right p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all ${btnStyle}`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {/* Feedback alert */}
            {challengeFeedback && (
              <div className={`p-4 rounded-2xl border text-xs font-bold leading-relaxed space-y-1 ${
                isChallengeSuccess
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <div>{challengeFeedback}</div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSelectedChallengeOption(null);
                      setChallengeFeedback(null);
                      setIsChallengeSuccess(null);
                      setCurrentChallengeIdx((prev) => (prev + 1) % STUDENT_CHALLENGES_BANK.length);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                  >
                    چالش بعدی شاگردان →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PLACEMENT TEST & AI ASSESSMENT */}
      {activeTab === 'placement_test' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase">
                سنجش هوشمند شایستگی تدریس
              </span>
              <h2 className="font-bold text-base sm:text-lg text-slate-900">
                آزمون جامع تعیین سطح و سنجش توانایی تدریس
              </h2>
            </div>

            <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              ۵ سوال تخصصی
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            بر اساس نمره این آزمون، هوش مصنوعی جایگاه شما را در سلسله‌مراتب مشخص می‌کند:
            <br />
            • <b>نمره ۹۵ به بالا:</b> استاد فوق حرفه‌ای (تدریس به حرفه‌ای‌ها)
            <br />
            • <b>نمره ۸۰ تا ۹۴:</b> استاد حرفه‌ای (تدریس به آپر-اینترمدیت‌ها)
            <br />
            • <b>نمره ۶۰ تا ۷۹:</b> استاد مرحله متوسط (تدریس به اینترمدیت‌ها)
            <br />
            • <b>نمره ۴۰ تا ۵۹:</b> استادیار مبتدیان (تدریس به مبتدی‌ها)
          </p>

          <div className="space-y-5">
            {PLACEMENT_TEST_QUESTIONS.map((q, qIdx) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-900">سوال {qIdx + 1}:</span>
                  <span className="text-slate-400 font-mono">سطح هدف: {q.tierTarget}</span>
                </div>

                <p className="font-bold text-xs sm:text-sm text-slate-900 leading-relaxed">
                  {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = placementAnswers[q.id] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => {
                          sound.playClick();
                          setPlacementAnswers({ ...placementAnswers, [q.id]: oIdx });
                        }}
                        className={`p-3 rounded-xl border text-right text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                تعداد پاسخ‌ها: {Object.keys(placementAnswers).length} از {PLACEMENT_TEST_QUESTIONS.length}
              </span>

              <button
                onClick={handleSubmitPlacement}
                disabled={Object.keys(placementAnswers).length < PLACEMENT_TEST_QUESTIONS.length}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
              >
                ثبت نهایی و دریافت رتبه استادیاری
              </button>
            </div>

            {placementSubmitted && (
              <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-300 space-y-2 text-center text-indigo-950">
                <span className="text-3xl">🎉</span>
                <h3 className="font-bold text-base sm:text-lg">
                  نمره شما: {placementScore} از ۱۰۰
                </h3>
                <p className="text-xs font-bold text-indigo-800">
                  جایگاه جدید شما در محضر استاد: {PROFICIENCY_TIERS[progress.proficiencyTier].titleFa}
                </p>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  اکنون مجوز تاسیس اتاق تدریس برای شما صادر شده و می‌توانید به شاگردان زیرمجموعه درس بدهید.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: SHADOWING GYM (Verbal Muscle Training) */}
      {activeTab === 'gym_workout' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
                  onClick={() => setSelectedShadowingIdx((prev) => (prev - 1 + SHADOWING_EXERCISES.length) % SHADOWING_EXERCISES.length)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                  title="تمرین قبلی"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedShadowingIdx((prev) => (prev + 1) % SHADOWING_EXERCISES.length)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                  title="تمرین بعدی"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

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

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>توصیه استاد برای این جمله:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {currentExercise.coachAdvice}
              </p>
            </div>

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
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-sm text-slate-900">
                  اصول تدریس به دیگران
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                وقتی جمله‌ای را تدریس می‌کنید، ابتدا صدا را با سرعت آهسته پخش کنید، تکرار شاگرد را بشنوید و سپس استرس کلمات را تصحیح نمایید.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
