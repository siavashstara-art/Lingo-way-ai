export type CityDistrictId = 
  | 'map'
  | 'bilingual_ai' // AI Foundation & Dual-Direction Offline Teacher (آموزش دوجانبه انگلیسی-فارسی)
  | 'mentor' // Master-Apprentice Gamification System (سیستم استاد-شاگردی جیم‌فیکیشن)
  | 'vocabulary'
  | 'grammar'
  | 'dialogues'
  | 'pronunciation'
  | 'quiz'
  | 'vault'
  | 'shop';

export type CEFRLevel = 'A1-A2' | 'B1-B2' | 'C1-C2';

export type LearningTrack = 'en_for_persian' | 'fa_for_english';

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
  learningTrack: LearningTrack; // 'en_for_persian' (آموزش انگلیسی به فارسی‌زبانان) | 'fa_for_english' (آموزش فارسی به انگلیسی‌زبانان)
  completedBilingualUnitIds: string[];
  offlineModeForced: boolean;
}
