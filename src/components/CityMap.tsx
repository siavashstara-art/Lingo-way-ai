import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Target,
  Sparkles,
  Zap,
  BookOpen
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
      id: 'dq_persian',
      title: isFa ? 'آموزش زبان فارسی (ویژه)' : 'Learn Persian Unit',
      description: isFa ? 'یک درس از اصطلاحات اصیل فارسی و تعارفات را مرور کن' : 'Master 1 Persian cultural unit',
      reward: 35,
      completed: true,
    },
    {
      id: 'dq_mentor',
      title: isFa ? 'حضور در روم تدریس استادیاری' : 'Join Peer Teaching Room',
      description: isFa ? 'یک جلسه تدریس را مشاهده کرده یا روم شخصی تاسیس کن' : 'Participate in a peer-to-peer teaching session',
      reward: 40,
      completed: (progress.totalStudentsTaught || 0) > 0,
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
      {/* Welcome Hero: Hidden in ADHD Focus Mode to remove distraction */}
      {!accessibility.adhdFocusMode && (
        <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-amber-50 to-orange-50 border border-emerald-300 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-200/80 text-emerald-950 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-800" />
              <span>able way city • {isFa ? 'اولویت آموزش فارسی به جهان + متد استادیاری زبان انگلیسی' : 'Persian for the World & English Mentorship'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              {isFa 
                ? 'آموزش اصیل زبان فارسی به دنیا، و یادگیری مکالمه انگلیسی با متد استادیاری!' 
                : 'Master Authentic Persian Culture & Learn English with Peer Teaching!'}
            </h1>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {isFa 
                ? 'اینجا آموزش زبان فارسی به انگلیسی‌زبانان اولویت ویژه دارد: رمزگشایی رسم تعارف، اصطلاحات شیرین بازار و آوای شعر؛ و همزمان برای ایرانیان، متد مترقی استاد-شاگردی با احداث روم تدریس فعال است.'
                : 'Our priority is teaching Persian to global English speakers with authentic cultural Ta\'arof and Street idioms, combined with an innovative student-to-student English teaching hierarchy.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectDistrict('persian_for_english');
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md transition-transform active:scale-95"
              >
                <span>🌹</span>
                <span>{isFa ? 'آموزش زبان فارسی (اولویت ۱)' : 'Learn Persian Immersion 🇮🇷'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectDistrict('offline_translator');
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-black text-xs sm:text-sm shadow-md transition-transform active:scale-95"
              >
                <span>🎙️</span>
                <span>{isFa ? 'مترجم صوتی و سخنگوی مسافرتی' : 'Offline Voice Communicator'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectDistrict('mentor');
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
              >
                <span>🏛️</span>
                <span>{isFa ? 'سامانه استادیاری' : 'Peer Teaching'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectDistrict('bilingual_ai');
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 shadow-sm transition-colors"
              >
                <span>🤖</span>
                <span>{isFa ? 'هوش مصنوعی آفلاین' : 'Offline AI'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daily Quests: Practical Goals */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-700" />
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
                <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
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
                  <span className="text-slate-400 font-medium">{isFa ? 'در انتظار اجرا' : 'Pending'}</span>
                )}

                <button
                  onClick={() => {
                    if (quest.id === 'dq_persian') onSelectDistrict('persian_for_english');
                    else if (quest.id === 'dq_mentor') onSelectDistrict('mentor');
                    else onSelectDistrict('quiz');
                  }}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-transform active:scale-95"
                >
                  {isFa ? 'ورود' : 'Start'}
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
            {isFa ? 'بخش‌های آموزشی شهر able way city' : 'Learning Zones'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {isFa ? 'روی هر بخش کلیک کنید تا تمرین‌ها و امکانات آن باز شوند' : 'Pick a zone to begin practice'}
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
              className={`group rounded-2xl bg-white border p-5 hover:shadow-md transition-all cursor-pointer ${
                district.id === 'persian_for_english'
                  ? 'border-emerald-400 ring-2 ring-emerald-300/40 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-amber-400'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-xl bg-slate-50 border border-slate-200 group-hover:scale-105 transition-transform">
                  {district.icon}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  district.id === 'persian_for_english'
                    ? 'bg-emerald-100 text-emerald-950 font-black'
                    : 'text-amber-800 bg-amber-100'
                }`}>
                  {district.id === 'persian_for_english' ? (isFa ? 'اولویت ویژه' : 'Priority #1') : (isFa ? 'فعال' : 'Active')}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                {isFa ? district.name : district.subtitle}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium mb-3">
                {district.description}
              </p>

              <div className="flex items-center justify-between text-xs font-bold text-emerald-800 pt-2 border-t border-slate-100">
                <span>{isFa ? 'ورود به این بخش' : 'Enter Zone'}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
