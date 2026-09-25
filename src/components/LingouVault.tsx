import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserProgress 
} from '../types';
import { CITY_ACHIEVEMENTS, CITY_MONUMENTS, CityMonuments } from '../data/achievements';
import { calculateLevel, getCitizenRank } from '../utils/storage';
import { sound } from '../utils/audio';

interface LingouVaultProps {
  progress: UserProgress;
  onUnlockMonument: (monumentId: string, cost: number) => void;
  onClaimAchievement: (achievementId: string, rewardLingous: number) => void;
}

export const LingouVault: React.FC<LingouVaultProps> = ({
  progress,
  onUnlockMonument,
  onClaimAchievement
}) => {
  const { level, progressPercent } = calculateLevel(progress.xp);
  const rank = getCitizenRank(level);

  const [unlockedMonuments, setUnlockedMonuments] = useState<string[]>(['mon_fountain']);

  const handleUnlock = (mon: CityMonuments) => {
    if (progress.lingous < mon.cost) {
      sound.playError();
      return;
    }
    sound.playLevelUp();
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch {
      //
    }
    setUnlockedMonuments(prev => [...prev, mon.id]);
    onUnlockMonument(mon.id, mon.cost);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-slate-50 border border-amber-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
          <span>🏦 بخش ۶</span>
          <span>•</span>
          <span>صندوق سکه‌ها و دستاوردها</span>
        </div>
        <h1 className="font-bold text-xl sm:text-2xl text-slate-900">
          موجودی سکه‌های طلای لینگو و پاداش‌های شما
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
          با انجام هر تمرین، مکالمه و یادگیری کلمات، سکه دریافت می‌کنید و می‌توانید از آن‌ها در بخش‌های مختلف یا ارتقای امکانات استفاده کنید.
        </p>
      </div>

      {/* Gold Counter Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 p-6 sm:p-8 shadow-sm text-slate-950 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-right">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/50 px-3 py-1 rounded-full">
            موجودی طلای لینگو
          </span>
          <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
            <h2 className="font-black text-4xl sm:text-5xl text-slate-950">
              {progress.lingous}
            </h2>
            <span className="text-xl font-bold">
              سکه طلا 🪙
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-800 pt-1">
            پاداش‌های حاصل از استمرار و تمرین‌های روزانه
          </p>
        </div>

        <div className="bg-white/95 rounded-2xl p-4 text-center space-y-1.5 border border-amber-200 shadow-sm w-full md:w-60">
          <span className="text-2xl">{rank.badge}</span>
          <h3 className="font-bold text-sm text-slate-900">
            سطح پیشرفت: {level}
          </h3>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="text-[11px] text-slate-500 block">
            {progressPercent}% تا ارتقا به رتبه بعدی
          </span>
        </div>
      </div>

      {/* Landmarks & Upgrades */}
      <div className="space-y-3">
        <h2 className="font-bold text-base sm:text-lg text-slate-900">
          بخش‌های قابل ارتقا با سکه در شهر توانا
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CITY_MONUMENTS.map((mon) => {
            const isUnlocked = unlockedMonuments.includes(mon.id);
            const canAfford = progress.lingous >= mon.cost;

            return (
              <div
                key={mon.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-amber-50/60 border-amber-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl p-1.5 rounded-xl bg-slate-50 border border-slate-200">
                      {mon.icon}
                    </span>
                    {isUnlocked ? (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        فعال شد ✔️
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        {mon.cost} 🪙
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 mb-0.5">
                    {mon.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-2 leading-relaxed font-normal">
                    {mon.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  {!isUnlocked ? (
                    <button
                      onClick={() => handleUnlock(mon)}
                      disabled={!canAfford}
                      className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-transform active:scale-95"
                    >
                      باز کردن با {mon.cost} سکه
                    </button>
                  ) : (
                    <div className="text-center py-1 text-xs text-emerald-700 font-bold">
                      مورد استفاده قرار گرفت
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
