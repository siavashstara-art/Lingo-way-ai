import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Ear,
  Sparkles, 
  Zap, 
  X, 
  Languages, 
  Activity, 
  Glasses,
  Clock,
  Volume2,
  VolumeX,
  Layers,
  Search,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { AccessibilitySettings, TRANSLATIONS } from '../utils/accessibility';
import { sound } from '../utils/audio';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[settings.language];
  const isRtl = settings.language === 'fa';

  const [activeCategory, setActiveCategory] = useState<'low_vision' | 'hard_of_hearing' | 'adhd'>('low_vision');

  const handleToggleNoise = () => {
    const nextState = !settings.calmBackgroundSound;
    onUpdateSettings({ calmBackgroundSound: nextState });
    if (nextState) {
      sound.startCalmBrownNoise();
    } else {
      sound.stopCalmBrownNoise();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      dir={isRtl ? 'rtl' : 'ltr'}
      role="dialog"
      aria-modal="true"
      aria-label={t.accessibilityPanel}
    >
      <div className="w-full max-w-2xl bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 animate-in fade-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
                <span>بهینه‌سازی ویژه کم‌بینایان، کم‌شنوایان و ADHD</span>
              </div>
              <h2 className="font-display font-black text-lg sm:text-xl text-white pt-1">
                {t.accessibilityPanel}
              </h2>
              <p className="text-xs text-slate-400">
                برنامه بدون نیاز به فشار چشم، بدون نیاز اجباری به شنیدن، و بدون خستگی ذهنی طراحی شده است.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Main Target Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => { sound.playClick(); setActiveCategory('low_vision'); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === 'low_vision'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>ویژه کم‌بینایان 👁️</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveCategory('hard_of_hearing'); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === 'hard_of_hearing'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Ear className="w-4 h-4" />
            <span>ویژه کم‌شنوایان 🦻</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveCategory('adhd'); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === 'adhd'
                ? 'bg-sky-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>ویژه ADHD ⚡</span>
          </button>
        </div>

        {/* SECTION 1: LOW VISION */}
        {activeCategory === 'low_vision' && (
          <div className="space-y-3.5 max-h-[55vh] overflow-y-auto pr-1">
            {/* Ultra High Contrast */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-sm text-white block">
                    {t.highContrast}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed block pt-0.5">
                    {t.highContrastDesc}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  settings.highContrast ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.highContrast ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Font Scale Huge */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-sm text-white block">
                  {t.fontSize}
                </span>
                <span className="text-xs text-slate-300">
                  درشت کردن متن‌ها تا حد فوق‌العاده بزرگ برای خواندن راحت بدون عینک
                </span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
                {(['normal', 'large', 'extra-large', 'huge'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => onUpdateSettings({ fontSize: size })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      settings.fontSize === size
                        ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {size === 'normal' ? 'عادی' : size === 'large' ? 'بزرگ' : size === 'extra-large' ? 'خیلی بزرگ' : 'فوق‌درشت'}
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Ruler */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-sm text-white block">
                    {t.readingRuler}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed block pt-0.5">
                    {t.readingRulerDesc}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ readingRuler: !settings.readingRuler })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  settings.readingRuler ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.readingRuler ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        )}

        {/* SECTION 2: HARD OF HEARING */}
        {activeCategory === 'hard_of_hearing' && (
          <div className="space-y-3.5 max-h-[55vh] overflow-y-auto pr-1">
            {/* Visual Captions */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-emerald-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Ear className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-sm text-white block">
                    {t.visualCaptions}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed block pt-0.5">
                    {t.visualCaptionsDesc}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ visualCaptionsForDeaf: !settings.visualCaptionsForDeaf })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  settings.visualCaptionsForDeaf ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.visualCaptionsForDeaf ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Lip Sync & Tongue Guide */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl shrink-0">👄</span>
                <div>
                  <span className="font-bold text-sm text-white block">
                    {t.lipSyncGuide}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed block pt-0.5">
                    {t.lipSyncGuideDesc}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ lipSyncGuide: !settings.lipSyncGuide })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  settings.lipSyncGuide ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.lipSyncGuide ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Visual Flash for Sounds */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-sm text-white block">
                    {t.visualFlashCue}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed block pt-0.5">
                    {t.visualFlashCueDesc}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ soundHapticVibration: !settings.soundHapticVibration })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  settings.soundHapticVibration ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.soundHapticVibration ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Slow Speech for Hearing Aid Assistance */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <span className="font-bold text-sm text-white block">
                    {t.speechSpeedSlow}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed block pt-0.5">
                    {t.speechSpeedSlowDesc}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ speechSpeedSlow: !settings.speechSpeedSlow })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  settings.speechSpeedSlow ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.speechSpeedSlow ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        )}

        {/* SECTION 3: ADHD */}
        {activeCategory === 'adhd' && (
          <div className="space-y-3.5 max-h-[55vh] overflow-y-auto pr-1">
            {/* ADHD Declutter Mode */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-sky-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-400 shrink-0" />
                <div>
                  <span className="font-bold text-sm text-white block">
                    {t.adhdMode}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed block pt-0.5">
                    حذف بنرهای اضافی تا فقط تمرین فعال در مرکز نگاه باشد.
                  </span>
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ adhdFocusMode: !settings.adhdFocusMode })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  settings.adhdFocusMode ? 'bg-sky-500' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.adhdFocusMode ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* 5-Min Timer */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-sky-400 shrink-0" />
                <div>
                  <span className="font-bold text-sm text-white block">
                    {t.adhdTimer}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed block pt-0.5">
                    تقسیم درس‌ها به لقمه‌های ۵ دقیقه‌ای ضد خستگی ذهن.
                  </span>
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ adhdSingleTaskTimer: !settings.adhdSingleTaskTimer })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  settings.adhdSingleTaskTimer ? 'bg-sky-500' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.adhdSingleTaskTimer ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Calming Noise */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {settings.calmBackgroundSound ? (
                  <Volume2 className="w-6 h-6 text-emerald-400 shrink-0 animate-pulse" />
                ) : (
                  <VolumeX className="w-6 h-6 text-slate-400 shrink-0" />
                )}
                <div>
                  <span className="font-bold text-sm text-white block">
                    {t.calmNoise}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed block pt-0.5">
                    پخش صدای ملایم باران برای مهار سرگردانی ذهن.
                  </span>
                </div>
              </div>
              <button
                onClick={handleToggleNoise}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  settings.calmBackgroundSound ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.calmBackgroundSound ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
          <button
            onClick={() => {
              sound.stopCalmBrownNoise();
              onUpdateSettings({
                highContrast: false,
                fontSize: 'normal',
                visualCaptionsForDeaf: true,
                soundHapticVibration: true,
                lipSyncGuide: true,
                speechSpeedSlow: false,
                adhdFocusMode: false,
                adhdSingleTaskTimer: false,
                bionicReading: false,
                reducedMotion: false,
                readingRuler: false,
                calmBackgroundSound: false,
              });
            }}
            className="text-xs text-slate-400 hover:text-amber-400 transition-colors"
          >
            تنظیمات پیش‌فرض
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition-colors shadow-lg shadow-amber-500/20"
          >
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
};
