import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  ArrowRight
} from 'lucide-react';
import { QuizQuestion, UserProgress } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { sound } from '../utils/audio';

interface QuizArenaProps {
  progress: UserProgress;
  onFinishQuiz: (score: number, earnedLingous: number) => void;
}

export const QuizArena: React.FC<QuizArenaProps> = ({
  progress,
  onFinishQuiz
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [scramblePicks, setScramblePicks] = useState<string[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const [score, setScore] = useState(0);
  const [comboStreak, setComboStreak] = useState(0);
  const [totalEarnedLingous, setTotalEarnedLingous] = useState(0);
  const [isRoundFinished, setIsRoundFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handlePickScrambleWord = (word: string, index: number) => {
    sound.playClick();
    if (scramblePicks.includes(`${word}-${index}`)) {
      setScramblePicks(prev => prev.filter(w => w !== `${word}-${index}`));
    } else {
      setScramblePicks(prev => [...prev, `${word}-${index}`]);
    }
  };

  const handleSelectMultipleChoice = (optIdx: number) => {
    sound.playClick();
    setSelectedOption(optIdx);
  };

  const handleSubmitAnswer = () => {
    let correct = false;

    if (currentQ.type === 'multiple-choice') {
      correct = selectedOption === currentQ.correctAnswer;
    } else if (currentQ.type === 'sentence-scramble') {
      const constructed = scramblePicks.map(w => w.split('-')[0]).join(' ').toLowerCase().trim();
      const target = (currentQ.correctAnswer as string).toLowerCase().trim();
      correct = constructed === target;
    }

    setIsAnswerSubmitted(true);
    setIsAnswerCorrect(correct);

    if (correct) {
      sound.playChime();
      const newCombo = comboStreak + 1;
      setComboStreak(newCombo);
      const points = 100 * (1 + newCombo * 0.1);
      setScore(prev => Math.round(prev + points));
      setTotalEarnedLingous(prev => prev + currentQ.lingouReward);
    } else {
      sound.playError();
      setComboStreak(0);
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    setSelectedOption(null);
    setScramblePicks([]);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(false);

    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsRoundFinished(true);
      sound.playLevelUp();
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {
        //
      }
      onFinishQuiz(score, totalEarnedLingous);
    }
  };

  const handleRestartQuiz = () => {
    sound.playClick();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScramblePicks([]);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(false);
    setScore(0);
    setComboStreak(0);
    setTotalEarnedLingous(0);
    setIsRoundFinished(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-slate-50 border border-rose-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-rose-800 text-xs font-bold uppercase tracking-wider mb-1">
          <span>⚡ بخش ۵</span>
          <span>•</span>
          <span>کوییز و خودآزمایی سریع</span>
        </div>
        <h1 className="font-bold text-xl sm:text-2xl text-slate-900">
          تست و سنجش تسلط به مکالمه
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
          با سوالات چندگزینه‌ای و مرتب کردن جملات کاربردی، ببینید چقدر آماده صحبت کردن در موقعیت‌های روزمره هستید.
        </p>
      </div>

      {!isRoundFinished ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              سؤال {currentQuestionIndex + 1} از {QUIZ_QUESTIONS.length}
            </span>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                <span>زنجیره پاسخ‌های درست: {comboStreak}</span>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>{score} امتیاز</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-700">
              پاداش این سوال: +{currentQ.lingouReward} سکه لینگو 🪙
            </span>
            <h2 className="font-bold text-lg sm:text-xl text-slate-900 leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Multiple choice */}
          {currentQ.type === 'multiple-choice' && currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'bg-slate-50 border-slate-200 hover:border-amber-400 text-slate-800';

                if (isAnswerSubmitted) {
                  if (idx === currentQ.correctAnswer) {
                    btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                  } else if (isSelected && !isAnswerCorrect) {
                    btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-amber-100 border-amber-400 text-amber-950 font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !isAnswerSubmitted && handleSelectMultipleChoice(idx)}
                    disabled={isAnswerSubmitted}
                    className={`p-3.5 rounded-xl border text-right text-xs sm:text-sm font-semibold transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* Scramble */}
          {currentQ.type === 'sentence-scramble' && currentQ.scrambledWords && (
            <div className="space-y-3">
              <div className="min-h-[60px] p-3.5 rounded-xl bg-amber-50/60 border-2 border-dashed border-amber-300 flex flex-wrap items-center gap-2">
                {scramblePicks.length === 0 ? (
                  <span className="text-xs text-slate-400 font-medium">
                    روی کلمات زیر کلیک کنید تا جمله صحیح ساخته شود:
                  </span>
                ) : (
                  scramblePicks.map((pick, pIdx) => {
                    const word = pick.split('-')[0];
                    return (
                      <span
                        key={pIdx}
                        onClick={() => !isAnswerSubmitted && handlePickScrambleWord(word, parseInt(pick.split('-')[1]))}
                        className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow-sm"
                      >
                        {word}
                      </span>
                    );
                  })
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {currentQ.scrambledWords.map((word, wIdx) => {
                  const isPicked = scramblePicks.includes(`${word}-${wIdx}`);
                  return (
                    <button
                      key={wIdx}
                      onClick={() => !isAnswerSubmitted && handlePickScrambleWord(word, wIdx)}
                      disabled={isAnswerSubmitted || isPicked}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                        isPicked
                          ? 'opacity-30 border-slate-200 bg-slate-100 text-slate-400'
                          : 'bg-white border-slate-300 hover:border-amber-400 text-slate-800'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={
                  currentQ.type === 'multiple-choice'
                    ? selectedOption === null
                    : scramblePicks.length === 0
                }
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
              >
                بررسی پاسخ نهایی
              </button>
            ) : (
              <div className="w-full flex items-center justify-between gap-3">
                <div className="text-xs font-bold">
                  {isAnswerCorrect ? (
                    <span className="text-emerald-800 flex items-center gap-1 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> کاملاً درست و دقیق!
                    </span>
                  ) : (
                    <span className="text-rose-600 flex items-center gap-1 text-xs sm:text-sm">
                      <XCircle className="w-4 h-4" /> پاسخ درست نبود؛ مجدد بررسی کنید.
                    </span>
                  )}
                  <p className="text-slate-500 font-normal mt-1 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1 transition-transform active:scale-95"
                >
                  <span>{currentQuestionIndex + 1 === QUIZ_QUESTIONS.length ? 'مشاهده نتیجه' : 'سوال بعدی'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4 shadow-sm max-w-md mx-auto">
          <div className="text-4xl">🎉</div>
          <h2 className="font-bold text-2xl text-slate-900">
            تمرین این مرحله به پایان رسید!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            امتیازهای شما ثبت و سکه‌های طلای لینگو به حسابتان اضافه شد.
          </p>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <span className="text-lg font-bold text-amber-900 block">+{totalEarnedLingous} سکه طلا 🪙</span>
          </div>
          <button
            onClick={handleRestartQuiz}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm"
          >
            تکرار مجدد کوییز
          </button>
        </div>
      )}
    </div>
  );
};
