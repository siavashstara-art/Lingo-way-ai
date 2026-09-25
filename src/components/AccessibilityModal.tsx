import React, { useState } from 'react';
import { 
  Eye, 
  Sparkles, 
  Zap, 
  Sliders, 
  X, 
  Languages, 
  Maximize2, 
  Minimize2, 
  Activity, 
  Glasses,
  Volume2
} from 'lucide-react';
import { AccessibilitySettings, TRANSLATIONS } from '../utils/accessibility';

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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      dir={isRtl ? 'rtl' : 'ltr'}
      role="dialog"
      aria-modal="true"
      aria-label={t.accessibilityPanel}
    >
      <div className="w-full max-w-xl bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                {t.accessibilityPanel}
              </h2>
              <p className="text-xs text-slate-400">
                {settings.language === 'fa' 
                  ? 'شخصی‌سازی ویژه افراد دارای ADHD، نقص بینایی، اختلال خوانش و نیازهای شناختی'
                  : 'Tailored for ADHD focus, low vision, dyslexia, and cognitive ease'}
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

        {/* Options list */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          
          {/* Language Toggle */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Languages className="w-5 h-5 text-amber-400" />
              <div>
                <span className="font-bold text-sm text-white block">
                  {settings.language === 'fa' ? 'زبان برنامه (Language)' : 'App Language'}
                </span>
                <span className="text-xs text-slate-400">
                  {settings.language === 'fa' ? 'پشتیبانی کامل دوزبانه فارسی و انگلیسی' : 'Full dual-language English & Persian support'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => onUpdateSettings({ language: 'fa' })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  settings.language === 'fa'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                فارسی
              </button>
              <button
                onClick={() => onUpdateSettings({ language: 'en' })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  settings.language === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* ADHD Focus Mode */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-amber-500/20 hover:border-amber-500/40 transition-colors flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-400 shrink-0" />
              <div>
                <span className="font-bold text-sm text-white block">
                  {t.adhdMode}
                </span>
                <span className="text-xs text-slate-400">
                  {t.adhdModeDesc}
                </span>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ adhdFocusMode: !settings.adhdFocusMode })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 ${
                settings.adhdFocusMode ? 'bg-amber-500' : 'bg-slate-700'
              }`}
              role="switch"
              aria-checked={settings.adhdFocusMode}
            >
              <div
                className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  settings.adhdFocusMode ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Bionic Reading / Cognitive Word Guide */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Glasses className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <span className="font-bold text-sm text-white block">
                  {t.bionicReading}
                </span>
                <span className="text-xs text-slate-400">
                  {t.bionicReadingDesc}
                </span>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ bionicReading: !settings.bionicReading })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 ${
                settings.bionicReading ? 'bg-blue-500' : 'bg-slate-700'
              }`}
              role="switch"
              aria-checked={settings.bionicReading}
            >
              <div
                className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  settings.bionicReading ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reading Ruler Guide */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-sm text-white block">
                  {t.readingRuler}
                </span>
                <span className="text-xs text-slate-400">
                  {t.readingRulerDesc}
                </span>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ readingRuler: !settings.readingRuler })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 ${
                settings.readingRuler ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
              role="switch"
              aria-checked={settings.readingRuler}
            >
              <div
                className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  settings.readingRuler ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* High Contrast */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <span className="font-bold text-sm text-white block">
                  {t.highContrast}
                </span>
                <span className="text-xs text-slate-400">
                  {settings.language === 'fa' ? 'حذف پس‌زمینه‌های مات و اعمال کنتراست تیره مطلق برای شفافیت دید' : 'Solid deep dark background with maximized border highlights'}
                </span>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 ${
                settings.highContrast ? 'bg-purple-500' : 'bg-slate-700'
              }`}
              role="switch"
              aria-checked={settings.highContrast}
            >
              <div
                className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  settings.highContrast ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sliders className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <span className="font-bold text-sm text-white block">
                  {t.reducedMotion}
                </span>
                <span className="text-xs text-slate-400">
                  {settings.language === 'fa' ? 'توقف انیمیشن‌های چرخشی، پالس‌ها و پرتاب فشفشه‌ها برای آرامش ذهنی' : 'Halts looping pulses, rotations, and animations for sensory comfort'}
                </span>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ reducedMotion: !settings.reducedMotion })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 ${
                settings.reducedMotion ? 'bg-rose-500' : 'bg-slate-700'
              }`}
              role="switch"
              aria-checked={settings.reducedMotion}
            >
              <div
                className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  settings.reducedMotion ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Font Size Scaling */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-sm text-white block">
                {t.fontSize}
              </span>
              <span className="text-xs text-slate-400">
                {settings.language === 'fa' ? 'تنظیم درشتی حروف جهت تسهیل مطالعه کم‌بینایان' : 'Scale text sizes for vision comfort'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
              {(['normal', 'large', 'extra-large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => onUpdateSettings({ fontSize: size })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    settings.fontSize === size
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {size === 'normal' ? t.fontNormal : size === 'large' ? t.fontLarge : t.fontXLarge}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
          <button
            onClick={() => onUpdateSettings({
              adhdFocusMode: false,
              bionicReading: false,
              highContrast: false,
              reducedMotion: false,
              readingRuler: false,
              fontSize: 'normal',
            })}
            className="text-xs text-slate-400 hover:text-amber-400 transition-colors"
          >
            {settings.language === 'fa' ? 'بازنشانی به حالت پیش‌فرض' : 'Reset to Defaults'}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-amber-500/20"
          >
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
};
