import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, CheckCircle2, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

interface ADHDMicroTimerProps {
  onCompleteChunk?: () => void;
}

export const ADHDMicroTimer: React.FC<ADHDMicroTimerProps> = ({ onCompleteChunk }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(300); // 5 minutes (300 seconds)
  const [isActive, setIsActive] = useState<boolean>(true);
  const [completedChunks, setCompletedChunks] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      sound.playLevelUp();
      setCompletedChunks((prev) => prev + 1);
      setSecondsLeft(300);
      setIsActive(false);
      if (onCompleteChunk) onCompleteChunk();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft, onCompleteChunk]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = ((300 - secondsLeft) / 300) * 100;

  return (
    <div className="fixed bottom-4 left-4 z-40 bg-slate-900/95 text-white border-2 border-sky-400 p-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-4">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg className="w-10 h-10 -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="currentColor"
            strokeWidth="3.5"
            className="text-slate-700"
            fill="transparent"
          />
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="currentColor"
            strokeWidth="3.5"
            className="text-sky-400 transition-all duration-300"
            fill="transparent"
            strokeDasharray={100}
            strokeDashoffset={100 - progressPercent}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[11px] font-mono font-black text-sky-300">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>

      <div className="text-right">
        <div className="text-[11px] font-bold text-sky-200 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-sky-400" />
          <span>تمرکز ۵ دقیقه‌ای ADHD</span>
        </div>
        <div className="text-[10px] text-slate-400">
          {completedChunks > 0 ? `${completedChunks} لقمه آموزشی کامل شد ✔️` : 'بدون خستگی ذهنی'}
        </div>
      </div>

      <div className="flex items-center gap-1 pr-1 border-r border-slate-700 mr-1">
        <button
          onClick={() => {
            sound.playClick();
            setIsActive(!isActive);
          }}
          className="p-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold"
          title={isActive ? 'توقف موقت' : 'ادامه'}
        >
          {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setSecondsLeft(300);
            setIsActive(false);
          }}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
          title="شروع مجدد ۵ دقیقه"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
