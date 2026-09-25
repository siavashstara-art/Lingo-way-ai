import React, { useState } from 'react';
import { 
  Mic, 
  Volume2, 
  Settings2, 
  Headphones
} from 'lucide-react';
import { UserProgress } from '../types';
import { speakEnglish, sound } from '../utils/audio';

interface PronunciationLabProps {
  progress: UserProgress;
  onUpdateSpeechRate: (rate: number) => void;
  onEarnLingous: (amount: number, reason: string) => void;
}

interface ListeningQuestion {
  id: string;
  sentence: string;
  blankWord: string;
  options: string[];
  explanation: string;
}

const LISTENING_CHALLENGES: ListeningQuestion[] = [
  {
    id: 'lc1',
    sentence: 'Could you please call me back when you have time?',
    blankWord: 'call',
    options: ['call (تماس گرفتن)', 'cook (آشپزی)', 'car (ماشین)', 'cold (سرد)'],
    explanation: 'کلمه مورد نظر call بود: Could you please call me back... (می‌شود وقتی وقت داشتید با من تماس بگیرید؟)'
  },
  {
    id: 'lc2',
    sentence: 'I will definitely recommend this hotel to my colleagues.',
    blankWord: 'recommend',
    options: ['recommend (پیشنهاد دادن)', 'remember (به یاد آوردن)', 'repair (تعمیر)', 'receive (دریافت)'],
    explanation: 'کلمه recommend یعنی پیشنهاد دادن یک مکان یا سرویس خوب به دیگران.'
  },
  {
    id: 'lc3',
    sentence: 'Online meetings are very convenient for our team schedule.',
    blankWord: 'convenient',
    options: ['convenient (راحت و بی‌دردسر)', 'confusing (گیج‌کننده)', 'crowded (شلوغ)', 'costly (گران)'],
    explanation: 'کلمه convenient یعنی کاری که راحت، در دسترس و مناسب انجام می‌شود.'
  }
];

export const PronunciationLab: React.FC<PronunciationLabProps> = ({
  progress,
  onUpdateSpeechRate,
  onEarnLingous
}) => {
  const [selectedAccent, setSelectedAccent] = useState<'en-US' | 'en-GB'>('en-US');
  const [customText, setCustomText] = useState('Hello! I really appreciate your help today.');
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const currentChallenge = LISTENING_CHALLENGES[activeChallengeIdx];

  const handleSpeakCustom = (text: string) => {
    sound.playClick();
    speakEnglish(text, progress.speechVoiceRate, selectedAccent);
  };

  const handlePlayChallengeAudio = () => {
    sound.playClick();
    speakEnglish(currentChallenge.sentence, progress.speechVoiceRate, selectedAccent);
  };

  const handleCheckChallenge = (opt: string) => {
    sound.playClick();
    setSelectedAnswer(opt);
    setIsAnswerChecked(true);

    if (opt.startsWith(currentChallenge.blankWord)) {
      sound.playChime();
      onEarnLingous(20, 'Ear-Training Challenge Correct');
    } else {
      sound.playError();
    }
  };

  const handleNextChallenge = () => {
    sound.playClick();
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setActiveChallengeIdx((prev) => (prev + 1) % LISTENING_CHALLENGES.length);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-slate-50 to-indigo-50 border border-purple-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-purple-800 text-xs font-bold uppercase tracking-wider mb-1">
          <span>🎙️ بخش ۴</span>
          <span>•</span>
          <span>آزمایشگاه صدا و تقویت شنیداری</span>
        </div>
        <h1 className="font-bold text-xl sm:text-2xl text-slate-900">
          تقویت لهجه، شنیدن و تلفظ کلمات انگلیسی
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
          هر متن یا جمله‌ای را وارد کنید تا با تلفظ شفاف انسانی و لهجه‌های معتبر برای شما خوانده شود. سرعت خوانش را نیز می‌توانید متناسب با نیاز خود کم یا زیاد کنید.
        </p>
      </div>

      {/* Voice Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700">انتخاب لهجه:</span>
          <div className="flex items-center gap-1.5">
            {[
              { id: 'en-US', label: 'آمریکایی (US)' },
              { id: 'en-GB', label: 'بریتانیایی (UK)' },
            ].map((acc) => (
              <button
                key={acc.id}
                onClick={() => setSelectedAccent(acc.id as 'en-US' | 'en-GB')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedAccent === acc.id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {acc.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Settings2 className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-700">
            سرعت گفتار: {progress.speechVoiceRate}x
          </span>
          <input
            type="range"
            min="0.6"
            max="1.2"
            step="0.1"
            value={progress.speechVoiceRate}
            onChange={(e) => onUpdateSpeechRate(parseFloat(e.target.value))}
            className="w-24 accent-purple-600 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: TTS Robot */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Mic className="w-4 h-4 text-purple-600" />
            <h2 className="font-bold text-base text-slate-900">
              تلفظ‌خوان هوشمند متون دلخواه
            </h2>
          </div>

          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={3}
            placeholder="جمله یا متن انگلیسی خود را اینجا تایپ کنید..."
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-purple-400 resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => setCustomText('Could you please give me some advice on improving my spoken English?')}
              className="text-xs px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-medium hover:bg-purple-100"
            >
              جمله نمونه روزمره
            </button>

            <button
              onClick={() => handleSpeakCustom(customText)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition-transform active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>پخش تلفظ صوتی</span>
            </button>
          </div>
        </div>

        {/* Right Column: Audio Challenge */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-amber-600" />
              <h2 className="font-bold text-base text-slate-900">
                چالش درک شنیداری (Listening)
              </h2>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              +۲۰ سکه پاداش
            </span>
          </div>

          <p className="text-xs text-slate-600">
            روی دکمه بنفش کلیک کنید تا جمله خوانده شود، سپس کلمه جای خالی را تشخیص دهید:
          </p>

          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 text-center space-y-2">
            <button
              onClick={handlePlayChallengeAudio}
              className="mx-auto w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all"
              title="پخش جمله"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <p className="text-xs font-bold text-purple-900">
              کلیک برای شنیدن فایل صوتی
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {currentChallenge.options.map((opt, oIdx) => (
              <button
                key={oIdx}
                onClick={() => handleCheckChallenge(opt)}
                disabled={isAnswerChecked}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-purple-400 bg-slate-50 text-xs font-medium text-slate-800 text-center transition-all"
              >
                {opt}
              </button>
            ))}
          </div>

          {isAnswerChecked && (
            <div className="space-y-2 pt-1">
              <p className="text-xs font-bold text-slate-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                {currentChallenge.explanation}
              </p>
              <button
                onClick={handleNextChallenge}
                className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                تمرین شنیداری بعدی →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
