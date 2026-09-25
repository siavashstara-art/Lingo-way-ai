import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Lightbulb, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  Award, 
  ArrowRight,
  UserCheck,
  Zap,
  BookOpen
} from 'lucide-react';
import { TEACHER_TRAINING_LESSONS, ADVANCED_PERSONALIZED_UNITS, TeachingSkillLesson, AdvancedPersonalizedUnit } from '../data/teacherTraining';
import { speakEnglish, sound } from '../utils/audio';

interface TeacherTrainingWorkshopProps {
  onEarnLingous: (amount: number, reason: string) => void;
  userTier: string;
}

export const TeacherTrainingWorkshop: React.FC<TeacherTrainingWorkshopProps> = ({
  onEarnLingous,
  userTier
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'teaching_skills' | 'personalized_advanced'>('teaching_skills');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(TEACHER_TRAINING_LESSONS[0].id);
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<number | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState<boolean>(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  const currentLesson = TEACHER_TRAINING_LESSONS.find(l => l.id === selectedLessonId) || TEACHER_TRAINING_LESSONS[0];

  const handlePlayVoice = (text: string) => {
    sound.playClick();
    speakEnglish(text, 0.9);
  };

  const handleAnswerPractice = (idx: number) => {
    sound.playClick();
    setSelectedPracticeOption(idx);
    setPracticeSubmitted(true);

    if (idx === currentLesson.quickPractice.correctIndex) {
      sound.playLevelUp();
      try {
        confetti({ particleCount: 60, spread: 60 });
      } catch {}
      if (!completedLessonIds.includes(currentLesson.id)) {
        setCompletedLessonIds(prev => [...prev, currentLesson.id]);
        onEarnLingous(30, 'یادگیری فوت‌وفن تدریس زبان');
      }
    } else {
      sound.playError();
    }
  };

  return (
    <div className="space-y-6">
      {/* Friendly Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 sm:p-7 rounded-3xl border border-blue-500 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>کارگاه فوت‌وفن معلمی و دروس اختصاصی • مخصوص کسانی که زبانشان خوب است</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              چطور زبان انگلیسی را خیلی ساده و شیرین به دیگران یاد بدهیم؟ 🎓
            </h2>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
              خیلی‌ها زبانشان خوب است اما نمی‌دانند چطور به یک شاگرد مبتدی یا خجالتی درس بدهند! اینجا یاد می‌گیرید چطور بدون مسخره کردن، اشتباه شاگرد را درست کنید و کاری کنید که خودش با شوق حرف بزند. همچنین اگر تعیین سطحتان بالا بوده، درس‌های پیشرفته و باحال برای شما گلچین شده است.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white w-full md:w-60 space-y-1 text-center">
            <span className="text-xs text-amber-200 font-bold block">فوت‌وفن‌های یادگرفته‌شده:</span>
            <div className="text-2xl font-black text-amber-300">
              {completedLessonIds.length} از {TEACHER_TRAINING_LESSONS.length}
            </div>
            <span className="text-[11px] text-white/80 block">+۳۰ سکه طلا برای هر مهارت</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => { sound.playClick(); setActiveSubTab('teaching_skills'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'teaching_skills'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>فوت‌وفن‌های معلمی (چطور خوب یاد بدهیم؟)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveSubTab('personalized_advanced'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'personalized_advanced'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>درس‌های ویژه سطح بالا (اصطلاحات خودمانی اهل زبان)</span>
        </button>
      </div>

      {/* SUB-TAB 1: TEACHING SKILLS */}
      {activeSubTab === 'teaching_skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Skill Card */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base sm:text-lg text-slate-900">
                {currentLesson.titleFa}
              </h3>

              {completedLessonIds.includes(currentLesson.id) ? (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>یاد گرفتید</span>
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                  در حال یادگیری
                </span>
              )}
            </div>

            {/* Scenario Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 block">
                موقعیتی که در کلاس پیش می‌آید:
              </span>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {currentLesson.problemScenario}
              </p>
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 font-mono text-xs text-amber-950 font-bold">
                حرف شاگرد: {currentLesson.studentQuote}
              </div>
            </div>

            {/* Compare Wrong vs Right Way */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
                <span className="font-bold text-rose-800 block">❌ روش اشتباه و خشک معلم‌های قدیمی:</span>
                <p className="text-slate-700 leading-relaxed font-normal">
                  {currentLesson.wrongTeacherResponse}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <span className="font-bold text-emerald-800 block">✔️ روش درست، صمیمی و دوستانه:</span>
                <p className="text-slate-700 leading-relaxed font-normal">
                  {currentLesson.correctTeacherResponse}
                </p>
              </div>
            </div>

            {/* Golden Rule */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs sm:text-sm font-bold text-blue-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-700 shrink-0" />
              <span>{currentLesson.goldenRule}</span>
            </div>

            {/* Quick Practice Question */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
              <span className="text-xs font-bold text-amber-300 block">
                تست سریع: اگر جای معلم بودید چه می‌کردید؟
              </span>
              <p className="text-xs sm:text-sm font-medium">
                {currentLesson.quickPractice.question}
              </p>

              <div className="space-y-2 pt-1">
                {currentLesson.quickPractice.options.map((opt, oIdx) => {
                  const isSelected = selectedPracticeOption === oIdx;
                  let style = 'bg-slate-800 border-slate-700 text-slate-200 hover:border-amber-400';

                  if (practiceSubmitted) {
                    if (oIdx === currentLesson.quickPractice.correctIndex) {
                      style = 'bg-emerald-900 border-emerald-400 text-emerald-100 font-bold';
                    } else if (isSelected) {
                      style = 'bg-rose-900 border-rose-400 text-rose-100 font-bold';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => !practiceSubmitted && handleAnswerPractice(oIdx)}
                      disabled={practiceSubmitted}
                      className={`w-full text-right p-3 rounded-xl border text-xs sm:text-sm transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {practiceSubmitted && (
                <div className="pt-1 text-xs text-amber-200 leading-relaxed">
                  💡 {currentLesson.quickPractice.simpleExplanation}
                </div>
              )}
            </div>
          </div>

          {/* Side List */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-sm text-slate-900">
              فهرست فوت‌وفن‌های تدریس:
            </h4>
            <div className="space-y-2">
              {TEACHER_TRAINING_LESSONS.map((lesson, idx) => {
                const isSelected = lesson.id === selectedLessonId;
                const isDone = completedLessonIds.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedLessonId(lesson.id);
                      setSelectedPracticeOption(null);
                      setPracticeSubmitted(false);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                      <span>مهارت {idx + 1}</span>
                      {isDone && <span className="text-emerald-700">✓ یاد گرفتید</span>}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {lesson.titleFa}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: PERSONALIZED ADVANCED UNITS */}
      {activeSubTab === 'personalized_advanced' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-amber-950 font-medium">
            💡 اگر تعیین سطح شما بالا بوده، نیازی نیست درس‌های ساده را تکرار کنید. این اصطلاحات به شما کمک می‌کند کلماتی را یاد بگیرید که متولدین لندن یا نیویورک در صحبت‌های روزمره خود استفاده می‌کنند.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADVANCED_PERSONALIZED_UNITS.map(unit => (
              <div key={unit.id} className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
                <div>
                  <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    درس اختصاصی رتبه‌های برتر
                  </span>
                  <h3 className="font-black text-base text-slate-900 pt-1.5">
                    {unit.topicFa}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    {unit.topicEn}
                  </p>
                </div>

                <div className="space-y-3">
                  {unit.proPhrases.map((phrase, pIdx) => (
                    <div key={pIdx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs sm:text-sm font-black text-emerald-950">
                          "{phrase.naturalNative}"
                        </span>
                        <button
                          onClick={() => handlePlayVoice(phrase.naturalNative)}
                          className="p-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white"
                          title="شنیدن صدا"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs text-slate-500">
                        <span className="line-through text-slate-400">جمله کتابی و خشک: "{phrase.textbookBoring}"</span>
                      </div>

                      <p className="text-[11px] text-blue-900 bg-blue-50/70 p-2 rounded-xl leading-relaxed">
                        💡 {phrase.whyItSoundsBetter}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
