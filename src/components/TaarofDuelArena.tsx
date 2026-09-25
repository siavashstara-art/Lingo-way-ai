import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Volume2, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HeartHandshake, 
  Award, 
  ArrowRight,
  Info
} from 'lucide-react';
import { TAAROF_DUELS, TaarofScenario } from '../data/taarofDuel';
import { speakPersian, sound } from '../utils/audio';
import { ScriptDisplayMode } from './PersianForEnglishLab';

interface TaarofDuelArenaProps {
  completedDuelIds: string[];
  currentRating: number;
  onCompleteDuel: (duelId: string, rewardLingous: number) => void;
  speechVoiceRate: number;
  scriptMode: ScriptDisplayMode;
}

export const TaarofDuelArena: React.FC<TaarofDuelArenaProps> = ({
  completedDuelIds,
  currentRating,
  onCompleteDuel,
  speechVoiceRate,
  scriptMode
}) => {
  const [selectedDuelId, setSelectedDuelId] = useState<string>(TAAROF_DUELS[0].id);
  const [currentRoundIdx, setCurrentRoundIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [duelHistory, setDuelHistory] = useState<{ round: number; correct: boolean }[]>([]);
  const [isDuelFinished, setIsDuelFinished] = useState<boolean>(false);

  const activeDuel = TAAROF_DUELS.find(d => d.id === selectedDuelId) || TAAROF_DUELS[0];
  const activeRound = activeDuel.rounds[currentRoundIdx];

  const handlePlayAudio = (text: string) => {
    sound.playClick();
    speakPersian(text, speechVoiceRate || 0.85);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedOptionIdx(idx);
    setIsAnswerSubmitted(true);

    const chosenOption = activeRound.options[idx];
    const isCorrect = chosenOption.isCulturallyCorrect;

    if (isCorrect) {
      sound.playLevelUp();
      setDuelHistory(prev => [...prev, { round: currentRoundIdx, correct: true }]);
    } else {
      sound.playError();
      setDuelHistory(prev => [...prev, { round: currentRoundIdx, correct: false }]);
    }
  };

  const handleNextStep = () => {
    sound.playClick();
    if (currentRoundIdx + 1 < activeDuel.rounds.length) {
      setCurrentRoundIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsDuelFinished(true);
      const allCorrect = duelHistory.every(h => h.correct) && (selectedOptionIdx !== null && activeRound.options[selectedOptionIdx].isCulturallyCorrect);
      if (allCorrect) {
        try {
          confetti({ particleCount: 90, spread: 80 });
        } catch {}
        onCompleteDuel(activeDuel.id, activeDuel.rewardLingous);
      }
    }
  };

  const handleRestartDuel = () => {
    sound.playClick();
    setCurrentRoundIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswerSubmitted(false);
    setDuelHistory([]);
    setIsDuelFinished(false);
  };

  const allPassed = duelHistory.length > 0 && duelHistory.every(h => h.correct);

  return (
    <div className="space-y-6">
      {/* Header with simple words */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white p-6 sm:p-7 rounded-3xl border border-amber-400 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تمرین عملی تعارف ایرانی • مثل یک ایرانی باادب صحبت کنید</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              بازی تعارف ایرانی: چطور در تاکسی و مهمانی حساب کنیم؟ 🇮🇷
            </h2>

            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-normal">
              در ایران وقتی کسی می‌گوید «قابل ندارد» یا «مهمان ما باشید»، واقعاً منظورش این نیست که پول ندهید! این یک تعارف محترمانه است. شما باید با زبان خوش اصرار کنید تا پول را حساب کند. اینجا قدم‌به‌قدم این مکالمه را یاد می‌گیرید.
            </p>
          </div>

          <div className="bg-black/25 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white w-full md:w-64 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-200">
              <span>میزان مهارت در تعارف:</span>
              <span className="font-mono text-amber-300 font-black">{currentRating}%</span>
            </div>

            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all"
                style={{ width: `${currentRating}%` }}
              />
            </div>

            <div className="text-[11px] text-amber-100 flex items-center justify-between pt-1">
              <span>مراحل کامل‌شده:</span>
              <span className="font-bold">{completedDuelIds.length} از {TAAROF_DUELS.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Duel Scenario Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TAAROF_DUELS.map(duel => {
          const isSelected = duel.id === selectedDuelId;
          const isDone = completedDuelIds.includes(duel.id);

          return (
            <div
              key={duel.id}
              onClick={() => {
                if (selectedDuelId !== duel.id) {
                  sound.playClick();
                  setSelectedDuelId(duel.id);
                  handleRestartDuel();
                }
              }}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/70 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-amber-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-white rounded-xl border border-slate-100 shadow-xs">
                  {duel.avatar}
                </span>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                    {duel.titleFa}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    {duel.titleEn}
                  </p>
                </div>
              </div>

              <div className="text-right">
                {isDone ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    ✓ یاد گرفته شد
                  </span>
                ) : (
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    +{duel.rewardLingous} سکه طلا 🪙
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Duel Stage */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Opponent Info Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{activeDuel.avatar}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base text-slate-900">{activeDuel.opponentName}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {activeDuel.opponentRole}
                </span>
              </div>
              <span className="text-xs text-slate-500">
                محل مکالمه: {activeDuel.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            <span>مرحله {currentRoundIdx + 1} از {activeDuel.rounds.length}</span>
          </div>
        </div>

        {/* Duel Dialogue Box */}
        {!isDuelFinished ? (
          <div className="space-y-6">
            
            {/* Statement Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                  {activeRound.npcRole}
                </span>

                <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>راهنمای ساده: {activeRound.npcIntentHint}</span>
                </span>
              </div>

              {/* Spoken voice line */}
              <div className="space-y-1 py-1">
                {(scriptMode === 'fingilish_only' || scriptMode === 'both') && (
                  <p className="font-mono text-base sm:text-lg font-black text-slate-900">
                    "{activeRound.npcFingilish}"
                  </p>
                )}

                {(scriptMode === 'persian_only' || scriptMode === 'both') && (
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug">
                    "{activeRound.npcPersian}"
                  </h3>
                )}
              </div>

              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => handlePlayAudio(activeRound.npcVoiceText)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-transform active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>شنیدن لحن و صدای راننده 🔊</span>
                </button>

                <span className="text-xs text-slate-500">
                  {activeRound.situationContext}
                </span>
              </div>
            </div>

            {/* User Response Options */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>پاسخ شما چیه؟ (کدام جواب باادبانه‌تر و درست‌تر است؟):</span>
                <span className="text-[11px] text-slate-400">روی گزینه درست کلیک کنید</span>
              </div>

              <div className="space-y-2.5">
                {activeRound.options.map((opt, oIdx) => {
                  const isSelected = selectedOptionIdx === oIdx;
                  let style = 'bg-slate-50 border-slate-200 hover:border-amber-400 text-slate-800';

                  if (isAnswerSubmitted) {
                    if (opt.isCulturallyCorrect) {
                      style = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold shadow-xs';
                    } else if (isSelected) {
                      style = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                    } else {
                      style = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-right p-4 rounded-2xl border text-xs sm:text-sm transition-all space-y-1 ${style}`}
                    >
                      {(scriptMode === 'fingilish_only' || scriptMode === 'both') && (
                        <div className="font-mono font-bold text-slate-900">
                          {opt.fingilish}
                        </div>
                      )}

                      {(scriptMode === 'persian_only' || scriptMode === 'both') && (
                        <div className="font-semibold text-slate-800">
                          {opt.persian}
                        </div>
                      )}

                      <div className="text-[11px] text-slate-500 italic">
                        English Meaning: {opt.englishMeaning}
                      </div>

                      {isAnswerSubmitted && isSelected && (
                        <div className={`text-xs font-bold pt-1 ${opt.isCulturallyCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                          {opt.isCulturallyCorrect ? '✓ ' : '✗ '} {opt.feedbackMessage}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Round Button */}
            {isAnswerSubmitted && (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">
                  {activeRound.options[selectedOptionIdx!].isCulturallyCorrect 
                    ? 'خیلی عالی بود! پاسخ شما کاملاً درست و مؤدبانه بود.' 
                    : 'اشتباه شد! در تعارف نباید جمله را تحت‌اللفظی برداشت کنید.'}
                </span>

                <button
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
                >
                  <span>{currentRoundIdx + 1 < activeDuel.rounds.length ? 'رفتن به مرحله بعد' : 'دیدن نتیجه نهایی'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        ) : (
          /* Duel Completed Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-3xl shadow-xs">
              {allPassed ? '🏆' : '⚖️'}
            </div>

            <h3 className="font-black text-xl text-slate-900">
              {allPassed ? 'آفرین! شما تعارف ایرانی را مثل بلبل یاد گرفتید!' : 'این مرحله تمام شد'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {allPassed 
                ? `شما تمام مراحل تعارف با ${activeDuel.opponentName} را با ادب و مهارت کامل رد کردید. پاداش +${activeDuel.rewardLingous} سکه طلا برای شما ثبت شد!`
                : 'در چند مرحله اشتباه پیش آمد. می‌توانید دوباره با خیال راحت تمرین کنید.'}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestartDuel}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>تمرین دوباره این مرحله</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
