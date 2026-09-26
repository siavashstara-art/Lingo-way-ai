export type CityDistrictId = 
  | 'map'
  | 'persian_for_english' // Priority #1: Dedicated Persian Language & Taarof Cultural Lab for English Speakers
  | 'carpet_trade' // Specialized Persian Carpet Trade & Bazaar Academy (in memory of Haj Hassan Agha Ali Miri)
  | 'offline_translator' // 100% Offline Real-Time Speech Communicator for Travelers
  | 'mentor' // Master-Apprentice Gamification System & Student Peer Teaching Rooms (برای آموزش انگلیسی به فارسی‌زبانان)
  | 'bilingual_ai' // AI Foundation & Dual-Direction Offline Teacher (آموزش دوجانبه انگلیسی-فارسی)
  | 'vocabulary'
  | 'grammar'
  | 'dialogues'
  | 'pronunciation'
  | 'quiz'
  | 'vault'
  | 'shop';

export type CEFRLevel = 'A1-A2' | 'B1-B2' | 'C1-C2';

export type LearningTrack = 'en_for_persian' | 'fa_for_english';

export type LanguageProficiencyTier = 
  | 'beginner'          // مبتدی
  | 'intermediate'      // اینترمدیت
  | 'upper_intermediate'// آپر اینترمدیت
  | 'professional'      // حرفه‌ای
  | 'grandmaster';      // فوق حرفه‌ای

export interface VocabularyWord {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'idiom' | 'phrase';
  definition: string;
  example: string;
  tavanaContext?: string;
  category: 'daily' | 'tech-business' | 'city-travel' | 'idioms-slang' | 'academic' | 'custom';
  level: CEFRLevel;
  audioText?: string;
  mastered?: boolean;
}

export interface GrammarExercise {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  district: string;
  level: CEFRLevel;
  summary: string;
  formula?: string;
  keyPoints: string[];
  examples: { correct: string; wrong?: string; note: string }[];
  practice: GrammarExercise[];
}

export interface DialogueChoice {
  text: string;
  isOptimal: boolean;
  feedback: string;
  response: string;
  nextStepId?: string;
}

export interface DialogueStep {
  id: string;
  speaker: string;
  speakerRole: string;
  speakerAvatar: string;
  message: string;
  choices: DialogueChoice[];
}

export interface DialogueScenario {
  id: string;
  title: string;
  location: string;
  character: string;
  role: string;
  level: CEFRLevel;
  description: string;
  steps: DialogueStep[];
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'sentence-scramble' | 'fill-blank';
  category: string;
  level: CEFRLevel;
  question: string;
  options?: string[];
  scrambledWords?: string[];
  correctAnswer: string | number;
  explanation: string;
  lingouReward: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rewardLingous: number;
}

export interface ShopItem {
  id: string;
  title: string;
  titleFa: string;
  description: string;
  descriptionFa: string;
  icon: string;
  category: 'subscription' | 'lingou-pack' | 'powerup' | 'avatar';
  realPriceToman?: number;
  realPriceUSD?: number;
  lingouPrice?: number;
  featured?: boolean;
  perks: string[];
  perksFa: string[];
}

// Master-Apprentice & Gym/Gamification Types (سیستم استاد شاگردی جیم‌فیکیشن)
export type ApprenticeStage = 'novice' | 'learner' | 'practitioner' | 'expert' | 'mentor';

export interface MentorAdvice {
  id: string;
  title: string;
  masterSays: string;
  apprenticeTask: string;
  stageRequired: ApprenticeStage;
  lingouBonus: number;
  completed: boolean;
}

export interface DailyWorkout {
  id: string;
  title: string;
  durationMinutes: number;
  category: 'shadowing' | 'sentence_gym' | 'speed_vocab' | 'live_dialogue';
  targetReps: number;
  currentReps: number;
  isFinished: boolean;
  rewardLingous: number;
}

export interface UserProgress {
  lingous: number;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  masteredWordIds: string[];
  bookmarkedWordIds: string[];
  completedLessonIds: string[];
  completedDialogueIds: string[];
  quizHighScore: number;
  unlockedDistricts: CityDistrictId[];
  customWords: VocabularyWord[];
  soundEnabled: boolean;
  speechVoiceRate: number;
  isVipMember: boolean;
  vipExpiryDate?: string;
  equippedAvatar: string;
  ownedAvatarIds: string[];
  streakShields: number;

  // Master-Apprentice Gymfication fields
  apprenticeStage: ApprenticeStage;
  apprenticePoints: number;
  completedWorkoutIds: string[];
  shadowingAudioListenedCount: number;
  completedMentorQuestIds: string[];

  // Bilingual AI Foundation & Offline Learning Track
  learningTrack: LearningTrack; // 'en_for_persian' | 'fa_for_english'
  completedBilingualUnitIds: string[];
  offlineModeForced: boolean;

  // Tiered Hierarchy & Student-Teacher Room System (سلسله‌مراتب استادیاری و چالش سه‌گانه)
  proficiencyTier: LanguageProficiencyTier;
  placementScore: number;
  hasPassedPlacementTest: boolean;
  failedChallengeCount: number; // 0, 1, 2 (If reaches 3 -> demoted to lower tier!)
  totalStudentsTaught: number;
  myHostedRoomId?: string;
  myHostedRoomTitle?: string;
  teachingSalaryAccumulated: number;

  // Strict Sequential Mastery & Review Checkpoints (قانون پیش‌نیاز قطعی و آزمون مرور کلان)
  masteredPersianLessonIds: string[]; // e.g. ['p_1']
  passedCheckpointReviews: number[]; // e.g. [3, 5]

  // Innovation #1: Reverse-Ta'arof Radar & Duel Mastery
  completedTaarofDuelIds: string[];
  taarofFinesseRating: number; // 0 to 100%

  // Innovation #2: Master Teaching Chair & Golden Stars (کرسی استادی رسمی هوش مصنوعی)
  teachingGoldenStars: number; // Stars awarded by junior students (e.g., 8 out of 10)
  hasOfficialChairSeal: boolean; // 2x teaching salary unlocked!

  // Innovation #3: Tandem Cultural Exchange (اتاق‌های تبادل فرهنگی دوطرفه)
  completedTandemSessionIds: string[];
}
