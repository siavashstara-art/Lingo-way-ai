import { UserProgress, ApprenticeStage } from '../types';

const STORAGE_KEY = 'english_lingou_tavana_progress_v4';

export const INITIAL_PROGRESS: UserProgress = {
  lingous: 150, // Starting gold Lingous
  xp: 120,
  level: 1,
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  masteredWordIds: ['v1', 'v2'],
  bookmarkedWordIds: ['v3'],
  completedLessonIds: ['g1'],
  completedDialogueIds: [],
  quizHighScore: 85,
  unlockedDistricts: ['map', 'bilingual_ai', 'mentor', 'vocabulary', 'grammar', 'dialogues', 'pronunciation', 'quiz', 'vault', 'shop'],
  customWords: [],
  soundEnabled: true,
  speechVoiceRate: 0.9,
  isVipMember: false,
  vipExpiryDate: undefined,
  equippedAvatar: '👤',
  ownedAvatarIds: ['default_avatar'],
  streakShields: 1,

  // Master-Apprentice & Gym-fication (استاد-شاگردی جیم‌فیکیشن)
  apprenticeStage: 'novice',
  apprenticePoints: 45,
  completedWorkoutIds: [],
  shadowingAudioListenedCount: 4,
  completedMentorQuestIds: ['mq1'],

  // Bilingual AI Foundation & Offline Learning Track
  learningTrack: 'en_for_persian',
  completedBilingualUnitIds: ['bi_1'],
  offlineModeForced: true, // Default to 100% reliable offline mode!
};

export const loadProgress = (): UserProgress => {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    
    // Check streak update
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (parsed.lastActiveDate === yesterday) {
        parsed.streak = (parsed.streak || 0) + 1;
      } else {
        if (parsed.streakShields && parsed.streakShields > 0) {
          parsed.streakShields -= 1;
        } else {
          parsed.streak = 1;
        }
      }
      parsed.lastActiveDate = today;
    }

    return { ...INITIAL_PROGRESS, ...parsed };
  } catch (e) {
    console.error('Error loading user progress:', e);
    return INITIAL_PROGRESS;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving user progress:', e);
  }
};

export const calculateLevel = (xp: number): { level: number; currentXp: number; nextLevelXp: number; progressPercent: number } => {
  const xpPerLevel = 250;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentXp = xp % xpPerLevel;
  const nextLevelXp = xpPerLevel;
  const progressPercent = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));

  return { level, currentXp, nextLevelXp, progressPercent };
};

export const getCitizenRank = (level: number): { title: string; badge: string; color: string } => {
  if (level >= 10) return { title: 'استاد تمام مکالمه', badge: '👑', color: 'from-amber-400 to-yellow-600' };
  if (level >= 7) return { title: 'یار ارشد استاد', badge: '🏛️', color: 'from-purple-400 to-indigo-600' };
  if (level >= 5) return { title: 'شاگرد باتجربه و پرانرژی', badge: '🏺', color: 'from-blue-400 to-cyan-600' };
  if (level >= 3) return { title: 'شاگرد کوشا و باانگیزه', badge: '🗺️', color: 'from-emerald-400 to-teal-600' };
  return { title: 'شاگرد تازه‌کار و مشتاق', badge: '🌱', color: 'from-slate-400 to-zinc-600' };
};

export const getStageTitle = (stage: ApprenticeStage): { titleFa: string; titleEn: string; icon: string; nextThreshold: number } => {
  switch (stage) {
    case 'novice':
      return { titleFa: 'شاگرد نوآموز (تازه به دوران)', titleEn: 'Novice Apprentice', icon: '🌱', nextThreshold: 100 };
    case 'learner':
      return { titleFa: 'شاگرد فعال (در حال تمرین)', titleEn: 'Active Apprentice', icon: '🥋', nextThreshold: 250 };
    case 'practitioner':
      return { titleFa: 'شاگرد مسلط (ورزشکار کلمات)', titleEn: 'Skilled Practitioner', icon: '⚔️', nextThreshold: 500 };
    case 'expert':
      return { titleFa: 'یار ارشد استاد (آستانه استادی)', titleEn: 'Senior Assistant', icon: '🏅', nextThreshold: 800 };
    case 'mentor':
      return { titleFa: 'استاد راهنما و مربی', titleEn: 'Grand Mentor', icon: '👑', nextThreshold: 1500 };
  }
};
