import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Volume2
} from 'lucide-react';
import { GrammarLesson, UserProgress } from '../types';
import { GRAMMAR_LESSONS } from '../data/grammar';
import { sound, speakEnglish } from '../utils/audio';

interface GrammarHallProps {
  progress: UserProgress;
  onCompleteLesson: (lessonId: string, rewardLingous: number) => void;
}

export const GrammarHall: React.FC<GrammarHallProps> = ({
  progress,
  onCompleteLesson
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(GRAMMAR_LESSONS[0].id);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});

  const currentLesson = GRAMMAR_LESSONS.find(l => l.id === selectedLessonId) || GRAMMAR_LESSONS[0];
  const isLessonCompleted = progress.completedLessonIds.includes(currentLesson.id);

  const handleSelectOption = (exerciseId: string, optionIndex: number) => {
    sound.playClick();
    setUserAnswers(prev => ({ ...prev, [exerciseId]: optionIndex }));
  };

  const handleCheckAnswer = (exerciseId: string, correctIndex: number) => {
    const selected = userAnswers[exerciseId];
    if (selected === undefined) return;

    setCheckedExercises(prev => ({ ...prev, [exerciseId]: true }));
    if (selected === correctIndex) {
      sound.playChime();
    } else {
      sound.playError();
    }

    const allCorrect = currentLesson.practice.every(ex => {
      if (ex.id === exerciseId) return selected === correctIndex;
      return userAnswers[ex.id] === ex.correctAnswer && checkedExercises[ex.id];
    });

    if (allCorrect && !isLessonCompleted) {
      sound.playLevelUp();
      onCompleteLesson(currentLesson.id, 50);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-slate-50 border border-blue-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-blue-800 text-xs font-bold uppercase tracking-wider mb-1">
          <span>🧩 بخش ۲</span>
          <span>•</span>
          <span>جمله‌سازی سرراست و کاربردی</span>
        </div>
        <h1 className="font-bold text-xl sm:text-2xl text-slate-900">
          جمله‌سازی آسان، بدون اصطلاحات پیچیده کتابی
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
          یاد بگیرید چطور کلمات را مثل پازل درست کنار هم بگذارید تا منظور خود را روان و واضح برسانید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Lesson Selector */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block px-1">
            موضوعات درس‌ها:
          </span>

          <div className="space-y-2">
            {GRAMMAR_LESSONS.map((lesson) => {
              const active = lesson.id === selectedLessonId;
              const completed = progress.completedLessonIds.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedLessonId(lesson.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    active
                      ? 'bg-blue-50/70 border-blue-400 text-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {lesson.district}
                    </span>
                    {completed && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" /> تکمیل شد
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 mb-1">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {lesson.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Lesson */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase">
                {currentLesson.district}
              </span>
              <h2 className="font-bold text-lg sm:text-xl text-slate-900 mt-0.5">
                {currentLesson.title}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {currentLesson.summary}
            </p>

            {/* Formula */}
            {currentLesson.formula && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300">
                <span className="text-xs font-bold text-amber-900 block mb-1">
                  الگوی ساده جمله:
                </span>
                <p className="font-mono text-xs sm:text-sm text-slate-900 font-bold">
                  {currentLesson.formula}
                </p>
              </div>
            )}

            {/* Rules */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 block">
                نکات کلیدی برای به خاطر سپردن:
              </span>
              <ul className="space-y-1.5">
                {currentLesson.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="text-blue-500 font-bold text-sm">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Examples */}
            <div className="border-t border-slate-100 pt-4">
              <span className="text-xs font-bold text-slate-800 block mb-3">
                مثال‌های کاربردی روزمره:
              </span>
              <div className="space-y-2.5">
                {currentLesson.examples.map((ex, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                        <span>"{ex.correct}"</span>
                      </div>
                      <button
                        onClick={() => speakEnglish(ex.correct, progress.speechVoiceRate)}
                        className="p-1 rounded-lg text-slate-500 hover:text-amber-600"
                        title="شنیدن تلفظ"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {ex.wrong && (
                      <div className="flex items-center gap-2 text-xs text-rose-500 line-through pl-6">
                        <XCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>"{ex.wrong}"</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-500 pl-6">
                      💡 {ex.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Practice Questions */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-base text-slate-900">
                  تمرین و تثبیت آموخته‌ها
                </h3>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                +۵۰ سکه پاداش
              </span>
            </div>

            <div className="space-y-4">
              {currentLesson.practice.map((exercise, index) => {
                const selectedOpt = userAnswers[exercise.id];
                const isChecked = checkedExercises[exercise.id];
                const isCorrect = selectedOpt === exercise.correctAnswer;

                return (
                  <div key={exercise.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      {index + 1}. {exercise.prompt}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {exercise.options.map((option, optIdx) => {
                        const isThisSelected = selectedOpt === optIdx;
                        let optionStyle = 'bg-white border-slate-200 text-slate-700 hover:border-blue-400';

                        if (isChecked) {
                          if (optIdx === exercise.correctAnswer) {
                            optionStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                          } else if (isThisSelected && !isCorrect) {
                            optionStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                          }
                        } else if (isThisSelected) {
                          optionStyle = 'bg-blue-100 border-blue-400 text-blue-950 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(exercise.id, optIdx)}
                            className={`p-2.5 rounded-xl border text-right text-xs sm:text-sm font-medium transition-all ${optionStyle}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleCheckAnswer(exercise.id, exercise.correctAnswer)}
                        disabled={selectedOpt === undefined}
                        className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-bold transition-transform active:scale-95"
                      >
                        بررسی پاسخ
                      </button>

                      {isChecked && (
                        <p className="text-xs font-bold text-slate-700 bg-white p-1.5 rounded-lg border border-slate-200">
                          {exercise.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
