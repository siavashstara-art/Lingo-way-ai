import React from 'react';
import { 
  CityDistrictId, 
  UserProgress 
} from '../types';
import { sound } from '../utils/audio';
import { AccessibilitySettings } from '../utils/accessibility';
import { 
  Volume2, 
  VolumeX, 
  Eye, 
  Languages, 
  ShoppingBag,
  Crown,
  Flame,
  Dumbbell,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentDistrict: CityDistrictId;
  onSelectDistrict: (district: CityDistrictId) => void;
  progress: UserProgress;
  onToggleSound: () => void;
  accessibility: AccessibilitySettings;
  onOpenAccessibility: () => void;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDistrict,
  onSelectDistrict,
  progress,
  onToggleSound,
  accessibility,
  onOpenAccessibility,
  onToggleLanguage
}) => {
  const isFa = accessibility.language === 'fa';

  const navItems: { id: CityDistrictId; label: string; icon: string; highlight?: boolean }[] = [
    { id: 'map', label: isFa ? 'نقشه شهر' : 'City Map', icon: '🗺️' },
    { id: 'persian_for_english', label: isFa ? 'آموزش فارسی (رایگان)' : 'Learn Persian (Free) 🇮🇷', icon: '🌹', highlight: true },
    { id: 'carpet_trade', label: isFa ? 'تجارت فرش ایران' : 'Persian Carpet Trade', icon: '🧶', highlight: true },
    { id: 'offline_translator', label: isFa ? 'مترجم صوتی مسافرتی' : 'Voice Communicator', icon: '🎙️', highlight: true },
    { id: 'mentor', label: isFa ? 'استادیاری و روم‌ها' : 'Mentor Hierarchy', icon: '🏛️' },
    { id: 'bilingual_ai', label: isFa ? 'هوش مصنوعی آفلاین' : 'Offline AI', icon: '🤖' },
    { id: 'vocabulary', label: isFa ? 'کلمه‌های کاربردی' : 'Words', icon: '🗣️' },
    { id: 'grammar', label: isFa ? 'جمله‌سازی آسون' : 'Sentences', icon: '🧩' },
    { id: 'dialogues', label: isFa ? 'مکالمه و صحبت' : 'Talk & Café', icon: '☕' },
    { id: 'pronunciation', label: isFa ? 'شنیدن و تلفظ' : 'Voice & Sound', icon: '🎙️' },
    { id: 'quiz', label: isFa ? 'کوییز و تمرین' : 'Quick Quiz', icon: '⚡' },
    { id: 'vault', label: isFa ? 'سکه و پاداش' : 'Rewards', icon: '🪙' },
    { id: 'shop', label: isFa ? 'فروشگاه' : 'Store', icon: '🛍️' },
  ];

  const handleNavClick = (id: CityDistrictId) => {
    sound.playClick();
    onSelectDistrict(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner: able way city */}
      <div className="bg-gradient-to-r from-emerald-600 via-amber-500 to-orange-400 py-1 px-4 text-center font-bold text-xs text-white flex items-center justify-center gap-2">
        <span className="font-mono uppercase font-black tracking-widest text-xs sm:text-sm text-amber-200">
          able way city
        </span>
        <span className="opacity-60 hidden sm:inline">•</span>
        <span className="text-[11px] sm:text-xs font-semibold hidden sm:inline">
          {isFa ? 'اولویت آموزش زبان شیرین فارسی به جهان + متد استادیاری زبان انگلیسی' : 'Persian for the World & English Peer-Teaching'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          
          {/* Logo & Brand: Clean, warm, and universal */}
          <div 
            onClick={() => handleNavClick('map')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-amber-400 flex items-center justify-center text-white font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
              <span>🌹</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {isFa ? 'انگلیش لینگو' : 'English-lingou'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-950 border border-emerald-300">
                  able way city
                </span>
                {progress.isVipMember && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 border border-amber-500 flex items-center gap-0.5">
                    <Crown className="w-3 h-3 fill-current" />
                    <span>VIP</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                {isFa ? 'آموزش فارسی به خارجی‌ها + استادیاری انگلیسی به ایرانیان' : 'Dual Persian-English Peer Mentorship'}
              </p>
            </div>
          </div>

          {/* Quick Actions & Meters */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Direct Priority Button: Learn Persian */}
            <button
              onClick={() => handleNavClick('persian_for_english')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-black text-xs shadow-sm transition-transform active:scale-95"
            >
              <span>🌹</span>
              <span>{isFa ? 'آموزش فارسی' : 'Learn Persian'}</span>
            </button>

            {/* Quick Rooms button */}
            <button
              onClick={() => handleNavClick('mentor')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              <Dumbbell className="w-3.5 h-3.5 text-amber-600" />
              <span>{isFa ? 'روم‌های تدریس' : 'Rooms'}</span>
            </button>

            {/* Quick Store */}
            <button
              onClick={() => handleNavClick('shop')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
              <span>{isFa ? 'فروشگاه' : 'Store'}</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold transition-colors"
              title="تغییر زبان"
            >
              <Languages className="w-3.5 h-3.5 text-amber-600" />
              <span>{isFa ? 'فارسی' : 'EN'}</span>
            </button>

            {/* Accessibility & ADHD Guide */}
            <button
              onClick={onOpenAccessibility}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                accessibility.adhdFocusMode || accessibility.bionicReading || accessibility.highContrast
                  ? 'bg-amber-100 text-amber-950 border-amber-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title="تنظیمات راحتی و آرامش"
            >
              <Eye className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline">
                {isFa ? 'راحتی' : 'Comfort'}
              </span>
            </button>

            {/* Coins / Lingous */}
            <div 
              onClick={() => handleNavClick('vault')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 cursor-pointer hover:bg-amber-100 transition-colors"
              title="موجودی سکه‌های لینگو"
            >
              <span className="text-sm">🪙</span>
              <span className="font-bold text-xs sm:text-sm text-amber-900">
                {progress.lingous}
              </span>
            </div>

            {/* Streak */}
            <div 
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-rose-50 border border-rose-200"
              title="روزهای متوالی تمرین"
            >
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span className="font-bold text-xs text-rose-700">
                {progress.streak}
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors border border-slate-200"
              title={progress.soundEnabled ? "قطع صدا" : "وصل صدا"}
            >
              {progress.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar border-t border-slate-100">
          {navItems.map((item) => {
            const isActive = currentDistrict === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : item.highlight
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
