import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CityMap } from './components/CityMap';
import { MasterApprenticeGym } from './components/MasterApprenticeGym';
import { VocabularyBazaar } from './components/VocabularyBazaar';
import { GrammarHall } from './components/GrammarHall';
import { CafeDialogue } from './components/CafeDialogue';
import { PronunciationLab } from './components/PronunciationLab';
import { QuizArena } from './components/QuizArena';
import { LingouVault } from './components/LingouVault';
import { CityShop } from './components/CityShop';
import { CustomWordModal } from './components/CustomWordModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { CityDistrictId, UserProgress, VocabularyWord, ApprenticeStage } from './types';
import { loadProgress, saveProgress } from './utils/storage';
import { sound } from './utils/audio';
import { AccessibilitySettings, DEFAULT_ACCESSIBILITY } from './utils/accessibility';

const ACCESSIBILITY_STORAGE_KEY = 'english_lingou_accessibility_v1';

export const App: React.FC = () => {
  const [currentDistrict, setCurrentDistrict] = useState<CityDistrictId>('map');
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);

  // Accessibility & ADHD state
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_ACCESSIBILITY;
    try {
      const saved = localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
      return saved ? { ...DEFAULT_ACCESSIBILITY, ...JSON.parse(saved) } : DEFAULT_ACCESSIBILITY;
    } catch {
      return DEFAULT_ACCESSIBILITY;
    }
  });

  const [rulerY, setRulerY] = useState<number>(100);

  useEffect(() => {
    sound.enabled = progress.soundEnabled;
  }, [progress.soundEnabled]);

  const handleUpdateAccessibility = (newSettings: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const handleToggleLanguage = () => {
    handleUpdateAccessibility({
      language: accessibility.language === 'fa' ? 'en' : 'fa',
    });
  };

  useEffect(() => {
    if (!accessibility.readingRuler) return;
    const handleMouseMove = (e: MouseEvent) => {
      setRulerY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [accessibility.readingRuler]);

  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  };

  const handleToggleSound = () => {
    updateProgress((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  const handleToggleMastered = (wordId: string) => {
    const isAlreadyMastered = progress.masteredWordIds.includes(wordId);
    const multiplier = progress.isVipMember ? 2 : 1;
    if (!isAlreadyMastered) {
      sound.playCoin();
      updateProgress((prev) => ({
        ...prev,
        lingous: prev.lingous + (10 * multiplier),
        xp: prev.xp + (15 * multiplier),
        masteredWordIds: [...prev.masteredWordIds, wordId],
      }));
    } else {
      sound.playClick();
      updateProgress((prev) => ({
        ...prev,
        masteredWordIds: prev.masteredWordIds.filter((id) => id !== wordId),
      }));
    }
  };

  const handleToggleBookmark = (wordId: string) => {
    sound.playClick();
    updateProgress((prev) => {
      const exists = prev.bookmarkedWordIds.includes(wordId);
      return {
        ...prev,
        bookmarkedWordIds: exists
          ? prev.bookmarkedWordIds.filter((id) => id !== wordId)
          : [...prev.bookmarkedWordIds, wordId],
      };
    });
  };

  const handleAddCustomWord = (newWord: VocabularyWord) => {
    updateProgress((prev) => ({
      ...prev,
      customWords: [newWord, ...prev.customWords],
      xp: prev.xp + 25,
      lingous: prev.lingous + 15,
    }));
  };

  const handleCompleteLesson = (lessonId: string, rewardLingous: number) => {
    const multiplier = progress.isVipMember ? 2 : 1;
    updateProgress((prev) => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      return {
        ...prev,
        lingous: prev.lingous + (rewardLingous * multiplier),
        xp: prev.xp + (45 * multiplier),
        completedLessonIds: [...prev.completedLessonIds, lessonId],
      };
    });
  };

  const handleCompleteDialogue = (dialogueId: string, reward: number) => {
    const multiplier = progress.isVipMember ? 2 : 1;
    updateProgress((prev) => {
      const already = prev.completedDialogueIds.includes(dialogueId);
      return {
        ...prev,
        lingous: prev.lingous + (reward * multiplier),
        xp: prev.xp + (40 * multiplier),
        completedDialogueIds: already ? prev.completedDialogueIds : [...prev.completedDialogueIds, dialogueId],
      };
    });
  };

  const handleUpdateSpeechRate = (rate: number) => {
    updateProgress((prev) => ({
      ...prev,
      speechVoiceRate: rate,
    }));
  };

  const handleEarnLingous = (amount: number, reason: string) => {
    const multiplier = progress.isVipMember ? 2 : 1;
    updateProgress((prev) => ({
      ...prev,
      lingous: prev.lingous + (amount * multiplier),
      xp: prev.xp + Math.round(amount * 1.2 * multiplier),
    }));
  };

  const handleFinishQuiz = (score: number, earnedLingous: number) => {
    const multiplier = progress.isVipMember ? 2 : 1;
    updateProgress((prev) => ({
      ...prev,
      lingous: prev.lingous + (earnedLingous * multiplier),
      xp: prev.xp + Math.round(score * 0.4 * multiplier),
      quizHighScore: Math.max(prev.quizHighScore, score),
    }));
  };

  const handleUnlockMonument = (monumentId: string, cost: number) => {
    updateProgress((prev) => ({
      ...prev,
      lingous: Math.max(0, prev.lingous - cost),
      xp: prev.xp + 60,
    }));
  };

  const handleClaimDailyQuest = (questId: string, reward: number) => {
    sound.playCoin();
    updateProgress((prev) => ({
      ...prev,
      lingous: prev.lingous + reward,
      xp: prev.xp + 30,
    }));
  };

  const handleClaimAchievement = (achId: string, rewardLingous: number) => {
    updateProgress((prev) => ({
      ...prev,
      lingous: prev.lingous + rewardLingous,
      xp: prev.xp + 50,
    }));
  };

  // Master-Apprentice Workout Handler
  const handleCompleteWorkout = (workoutId: string, rewardLingous: number, apprenticeExp: number) => {
    const multiplier = progress.isVipMember ? 2 : 1;
    updateProgress((prev) => {
      const updatedPts = (prev.apprenticePoints || 0) + apprenticeExp;
      let nextStage = prev.apprenticeStage || 'novice';
      if (updatedPts >= 800) nextStage = 'mentor';
      else if (updatedPts >= 500) nextStage = 'expert';
      else if (updatedPts >= 250) nextStage = 'practitioner';
      else if (updatedPts >= 100) nextStage = 'learner';

      return {
        ...prev,
        lingous: prev.lingous + (rewardLingous * multiplier),
        xp: prev.xp + (35 * multiplier),
        apprenticePoints: updatedPts,
        apprenticeStage: nextStage,
        completedWorkoutIds: prev.completedWorkoutIds.includes(workoutId)
          ? prev.completedWorkoutIds
          : [...prev.completedWorkoutIds, workoutId]
      };
    });
  };

  const handleLevelUpStage = (newStage: ApprenticeStage) => {
    updateProgress((prev) => ({
      ...prev,
      apprenticeStage: newStage,
    }));
  };

  // Monetization Handlers
  const handlePurchaseVip = (planId: string) => {
    updateProgress((prev) => ({
      ...prev,
      isVipMember: true,
      lingous: prev.lingous + (planId === 'vip_annual' ? 1000 : 300),
      streakShields: prev.streakShields + (planId === 'vip_annual' ? 10 : 3),
      xp: prev.xp + 200,
    }));
  };

  const handlePurchaseLingouPack = (amount: number) => {
    updateProgress((prev) => ({
      ...prev,
      lingous: prev.lingous + amount,
    }));
  };

  const handleBuyItemWithLingous = (itemId: string, lingouPrice: number): boolean => {
    if (progress.lingous < lingouPrice) {
      sound.playError();
      return false;
    }
    updateProgress((prev) => {
      let extraShields = 0;
      if (itemId === 'streak_shield') extraShields = 1;
      return {
        ...prev,
        lingous: prev.lingous - lingouPrice,
        streakShields: prev.streakShields + extraShields,
      };
    });
    return true;
  };

  const isRtl = accessibility.language === 'fa';
  const isFa = accessibility.language === 'fa';

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-gradient-to-b from-sky-50 via-amber-50/40 to-slate-50 text-slate-800 flex flex-col font-sans transition-colors duration-200"
    >
      {/* ADHD Reading Ruler Guide */}
      {accessibility.readingRuler && (
        <div 
          className="fixed left-0 right-0 h-10 pointer-events-none z-50 bg-amber-400/20 border-y-2 border-amber-400 shadow-lg transition-all duration-75"
          style={{ top: `${Math.max(10, rulerY - 20)}px` }}
        />
      )}

      {/* Header */}
      <Header
        currentDistrict={currentDistrict}
        onSelectDistrict={setCurrentDistrict}
        progress={progress}
        onToggleSound={handleToggleSound}
        accessibility={accessibility}
        onOpenAccessibility={() => setIsAccessibilityModalOpen(true)}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* ADHD Focus Banner */}
      {accessibility.adhdFocusMode && (
        <aside className="bg-amber-100 border-b border-amber-300 py-1.5 px-4 text-center text-xs font-bold text-amber-950 flex items-center justify-center gap-2">
          <span>⚡ {isFa ? 'حالت تمرکز فعال است: شلوغی‌های محیطی برداشته شده تا راحت‌تر مطالعه کنید.' : 'Focus Mode Active'}</span>
          <button
            onClick={() => handleUpdateAccessibility({ adhdFocusMode: false })}
            className="underline hover:text-amber-800"
          >
            {isFa ? 'خروج' : 'Turn Off'}
          </button>
        </aside>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentDistrict === 'map' && (
          <CityMap
            progress={progress}
            onSelectDistrict={setCurrentDistrict}
            onClaimDailyQuest={handleClaimDailyQuest}
            accessibility={accessibility}
          />
        )}

        {currentDistrict === 'mentor' && (
          <MasterApprenticeGym
            progress={progress}
            accessibility={accessibility}
            onCompleteWorkout={handleCompleteWorkout}
            onLevelUpStage={handleLevelUpStage}
          />
        )}

        {currentDistrict === 'vocabulary' && (
          <VocabularyBazaar
            progress={progress}
            onToggleMastered={handleToggleMastered}
            onToggleBookmark={handleToggleBookmark}
            onOpenCustomModal={() => setIsCustomModalOpen(true)}
          />
        )}

        {currentDistrict === 'grammar' && (
          <GrammarHall
            progress={progress}
            onCompleteLesson={handleCompleteLesson}
          />
        )}

        {currentDistrict === 'dialogues' && (
          <CafeDialogue
            progress={progress}
            onCompleteDialogue={handleCompleteDialogue}
          />
        )}

        {currentDistrict === 'pronunciation' && (
          <PronunciationLab
            progress={progress}
            onUpdateSpeechRate={handleUpdateSpeechRate}
            onEarnLingous={handleEarnLingous}
          />
        )}

        {currentDistrict === 'quiz' && (
          <QuizArena
            progress={progress}
            onFinishQuiz={handleFinishQuiz}
          />
        )}

        {currentDistrict === 'vault' && (
          <LingouVault
            progress={progress}
            onUnlockMonument={handleUnlockMonument}
            onClaimAchievement={handleClaimAchievement}
          />
        )}

        {currentDistrict === 'shop' && (
          <CityShop
            progress={progress}
            accessibility={accessibility}
            onPurchaseVip={handlePurchaseVip}
            onPurchaseLingouPack={handlePurchaseLingouPack}
            onBuyItemWithLingous={handleBuyItemWithLingous}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">
              {isFa ? 'انگلیش لینگو' : 'English-lingou'}
            </span>
            <span>•</span>
            <span>{isFa ? 'able way city | متد استاد-شاگردی جیم‌فیکیشن' : 'Master-Apprentice Verbal Gym'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentDistrict('mentor')}
              className="text-amber-700 hover:underline font-bold"
            >
              {isFa ? 'باشگاه گفتار استاد-شاگردی' : 'Verbal Gym'}
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentDistrict('shop')}
              className="text-slate-600 hover:underline font-bold"
            >
              {isFa ? 'فروشگاه و اشتراک طلایی' : 'VIP Store'}
            </button>
            <span>•</span>
            <button
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="text-slate-600 hover:underline font-bold"
            >
              {isFa ? 'تنظیمات راحتی' : 'Comfort Settings'}
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
        settings={accessibility}
        onUpdateSettings={handleUpdateAccessibility}
      />

      <CustomWordModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onAddWord={handleAddCustomWord}
      />
    </div>
  );
};

export default App;
