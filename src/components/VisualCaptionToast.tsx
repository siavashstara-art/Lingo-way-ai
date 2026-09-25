import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface VisualCaptionToastProps {
  lastAudioEvent: { text: string; type: 'correct' | 'wrong' | 'speech' | 'coin'; timestamp: number } | null;
  showLipSync: boolean;
}

export const VisualCaptionToast: React.FC<VisualCaptionToastProps> = ({ lastAudioEvent, showLipSync }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!lastAudioEvent) return;
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [lastAudioEvent]);

  if (!visible || !lastAudioEvent) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-4 animate-in fade-in slide-in-from-bottom-3 pointer-events-none">
      <div className={`p-4 rounded-2xl shadow-2xl border-2 flex items-center justify-between gap-3 backdrop-blur-md ${
        lastAudioEvent.type === 'correct' 
          ? 'bg-emerald-950/95 text-emerald-100 border-emerald-400' 
          : lastAudioEvent.type === 'wrong'
          ? 'bg-rose-950/95 text-rose-100 border-rose-400'
          : 'bg-slate-900/95 text-amber-200 border-amber-400'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/10 shrink-0">
            {lastAudioEvent.type === 'correct' && <CheckCircle2 className="w-6 h-6 text-emerald-300" />}
            {lastAudioEvent.type === 'wrong' && <XCircle className="w-6 h-6 text-rose-300" />}
            {lastAudioEvent.type === 'speech' && <Volume2 className="w-6 h-6 text-amber-300" />}
            {lastAudioEvent.type === 'coin' && <Sparkles className="w-6 h-6 text-yellow-300" />}
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              {lastAudioEvent.type === 'speech' ? 'زیرنویس همزمان برای کم‌شنوایان' : 'سیگنال تصویری صدا'}
            </span>
            <p className="font-bold text-sm sm:text-base leading-snug">
              {lastAudioEvent.text}
            </p>
          </div>
        </div>

        {showLipSync && lastAudioEvent.type === 'speech' && (
          <div className="hidden sm:flex flex-col items-center bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-center shrink-0">
            <span className="text-xl">👄</span>
            <span className="text-[9px] text-amber-200 font-bold">فرم لب‌ها باز</span>
          </div>
        )}
      </div>
    </div>
  );
};
