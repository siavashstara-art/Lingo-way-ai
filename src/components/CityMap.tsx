import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Target,
  Sparkles,
  Zap
} from 'lucide-react';
import { CityDistrictId, UserProgress } from '../types';
import { DISTRICTS } from '../data/districts';
import { sound } from '../utils/audio';
import { calculateLevel, getCitizenRank } from '../utils/storage';
import { AccessibilitySettings } from '../utils/accessibility';

interface CityMapProps {
  progress: UserProgress;
  onSelectDistrict: (id: CityDistrictId) => void;
  onClaimDailyQuest: (questId: string, reward: number) => void;
  accessibility: AccessibilitySettings;
}

export const CityMap: React.FC<CityMapProps> = ({
  progress,
  onSelectDistrict,
  onClaimDailyQuest,
  accessibility,
}) => {
  const { level, progressPercent } = calculateLevel(progress.xp);
  const isFa = accessibility.language === 'fa';

  const dailyQuests = [
    {
      id: 'dq_vocab',
      title: isFa ? 'یادگیری کلمات روزمره' : 'Learn Daily Words',
      description: isFa ? '۱ کلمه کاربردی از بخش کلمات را مرور و ذخیره کن' : 'Master 1 useful word in the vocabulary section',
      reward: 30,
      completed: progress.masteredWordIds.length > 0,
    },
    {
      id: 'dq_grammar',
      title: isFa ? 'یک تمرین ساده جمله‌سازی' : 'Simple Sentence Practice',
      description: isFa ? 'یک تمرین کوتاه برای درک ساختار درست جملات حل کن' : 'Complete 1 quick sentence exercise',
      reward: 40,
      completed: progress.completedLessonIds.length > 0,
    },
    {
      id: 'dq_quiz',
      title: isFa ? 'تست و خودآزمایی سریع' : 'Quick Self-Test',
      description: isFa ? 'در بخش کوییز، میزان یادگیری‌ات را تست کن' : 'Check your learning in the quiz section',
      reward: 50,
      completed: progress.quizHighScore > 0,
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Hero: Warm, Simple, Conversational */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200 p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>able way city • {isFa ? 'مسیر یادگیری روان و بی‌دغدغه' : 'Simple & Natural Learning'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            {isFa 
              ? 'انگلیسی رو ساده، روزمره و بدون استرس یاد بگیر!' 
              : 'Learn English Naturally & Without Stress!'}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isFa 
              ? 'بدون فرمول‌های پیچیده و حفظی؛ اینجا کلمه‌ها رو توی جمله‌های واقعی می‌شنوی، صحبت می‌کنی و قدم به قدم پیشرفت می‌کنی. چه برای مکالمه روزمره، سفر یا کار، همه‌چیز سرراست و راحت طراحی شده.'
              : 'No complicated academic jargon. Hear real spoken sentences, practice listening and talking, and build practical speaking skills step by step.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                onSelectDistrict('vocabulary');
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
            >
              <span>{isFa ? 'شروع با کلمات کاربردی' : 'Start with Words'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onSelectDistrict('dialogues');
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 shadow-sm transition-colors"
            >
              <span>{isFa ? 'مکالمه و صحبت در کافه ☕' : 'Spoken Dialogue'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Daily Quests: Practical Goals */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {isFa ? 'برنامه تمرین امروز شما' : "Today's Practice Plan"}
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {isFa ? 'پاداش با سکه‌های طلای لینگو' : 'Earn Golden Lingous'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dailyQuests.map((quest) => (
            <div 
              key={quest.id}
              className={`p-4 rounded-2xl border transition-all ${
                quest.completed 
                  ? 'bg-emerald-50/60 border-emerald-300' 
                  : 'bg-slate-50 border-slate-200 hover:border-amber-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-sm text-slate-900">{quest.title}</h3>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                  +{quest.reward} 🪙
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">{quest.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                {quest.completed ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> {isFa ? 'انجام شد' : 'Done'}
                  </span>
                ) : (
                  <span className="text-slate-400 font-medium">{isFa ? 'هنوز انجام نشده' : 'Not yet'}</span>
                )}

                <button
                  onClick={() => {
                    if (quest.id === 'dq_vocab') onSelectDistrict('vocabulary');
                    else if (quest.id === 'dq_grammar') onSelectDistrict('grammar');
                    else onSelectDistrict('quiz');
                  }}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-transform active:scale-95"
                >
                  {isFa ? 'شروع تمرین' : 'Start'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main City Sections: Clear & Down-to-earth */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {isFa ? 'بخش‌های آموزشی برنامه' : 'Learning Zones'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {isFa ? 'روی هر بخش کلیک کنید تا تمرین‌ها باز شوند' : 'Pick a zone to begin practice'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DISTRICTS.map((district) => (
            <div
              key={district.id}
              onClick={() => {
                sound.playClick();
                onSelectDistrict(district.id);
              }}
              className="group rounded-2xl bg-white border border-slate-200 p-5 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-xl bg-slate-50 border border-slate-200 group-hover:scale-105 transition-transform">
                  {district.icon}
                </span>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  {isFa ? 'آماده ورود' : 'Active'}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                {isFa 
                  ? (district.id === 'vocabulary' ? 'کلمه‌ها و اصطلاحات کاربردی'
                    : district.id === 'grammar' ? 'جمله‌سازی آسان و بدون فرمول'
                    : district.id === 'dialogues' ? 'مکالمه روزمره (کافه، خرید و سفر)'
                    : district.id === 'pronunciation' ? 'آزمایشگاه صدا و تلفظ روان'
                    : district.id === 'quiz' ? 'کوییز و خودآزمایی سریع'
                    : district.id === 'shop' ? 'فروشگاه و امکانات VIP'
                    : 'صندوق سکه‌ها و دستاوردها')
                  : district.name}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium mb-3">
                {district.description}
              </p>

              <div className="flex items-center justify-between text-xs font-bold text-amber-700 pt-2 border-t border-slate-100">
                <span>{isFa ? 'ورود به بخش' : 'Enter'}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
