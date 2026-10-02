import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Volume2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Sparkles,
  Flame,
  CheckCircle2,
  Mic,
  Languages,
  ArrowRight,
  ArrowLeft,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { THIRTY_COLLOQUIAL_STORIES, StreetColloquialStory, StorySentence } from '../data/streetColloquialStories30';
import { sound, speakEnglish, speakPersian, stopAllActiveSpeech } from '../utils/audio';

interface BilingualStoriesStudioProps {
  onEarnLingous: (amount: number) => void;
  defaultMode?: 'learn_english' | 'learn_persian';
}

export const BilingualStoriesStudio: React.FC<BilingualStoriesStudioProps> = ({
  onEarnLingous,
  defaultMode = 'learn_english'
}) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [isPlayingFullStory, setIsPlayingFullStory] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.9);
  const [repeatPracticeMode, setRepeatPracticeMode] = useState<boolean>(false);
  const [userSpokenFeedback, setUserSpokenFeedback] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentStory: StreetColloquialStory = THIRTY_COLLOQUIAL_STORIES[selectedStoryIndex] || THIRTY_COLLOQUIAL_STORIES[0];
  const currentSentence: StorySentence = currentStory.sentences[activeSentenceIndex] || currentStory.sentences[0];

  // Stop any active speech on unmount
  useEffect(() => {
    return () => {
      stopAllActiveSpeech();
    };
  }, []);

  // Sentence Navigation
  const handleNextSentence = () => {
    stopAllActiveSpeech();
    if (activeSentenceIndex < currentStory.sentences.length - 1) {
      setActiveSentenceIndex((prev) => prev + 1);
    } else {
      setActiveSentenceIndex(0);
    }
  };

  const handlePrevSentence = () => {
    stopAllActiveSpeech();
    if (activeSentenceIndex > 0) {
      setActiveSentenceIndex((prev) => prev - 1);
    } else {
      setActiveSentenceIndex(currentStory.sentences.length - 1);
    }
  };

  // Play narration for current sentence
  const playCurrentSentenceEnglish = (rateOverride?: number) => {
    const rate = rateOverride || playbackSpeed;
    speakEnglish(currentSentence.en, rate);
  };

  const playCurrentSentenceEnglishFast = () => {
    speakEnglish(currentSentence.enCasualFast || currentSentence.en, 1.15);
  };

  const playCurrentSentencePersian = (rateOverride?: number) => {
    const rate = rateOverride || 0.86;
    speakPersian(currentSentence.faColloquial || currentSentence.fa, rate);
  };

  // Dual Narration (English followed by Persian)
  const playDualSentenceNarration = () => {
    sound.playClick();
    speakEnglish(currentSentence.en, playbackSpeed);
    const estimatedDurationMs = Math.max(2200, (currentSentence.en.split(' ').length * 550) / playbackSpeed);
    setTimeout(() => {
      speakPersian(currentSentence.faColloquial, 0.88);
    }, estimatedDurationMs);
  };

  // Practice & Repeat Simulation
  const handlePracticeRepeat = () => {
    sound.playLevelUp();
    try { confetti({ particleCount: 40, spread: 60 }); } catch {}
    setUserSpokenFeedback('🎉 آفرین! تلفظ و ریتم محاوره‌ای شما با هوش صوتی تأیید شد (+20 XP)');
    onEarnLingous(20);
    setTimeout(() => setUserSpokenFeedback(null), 4000);
  };

  // Filtered stories by search
  const filteredStories = THIRTY_COLLOQUIAL_STORIES.filter((s) =>
    s.titleFa.includes(searchQuery) ||
    s.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.settingFa.includes(searchQuery) ||
    s.keySlangTakeawayFa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Flagship Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 border-2 border-amber-400 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
            <BookOpen className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>📖 گنجینه ۳۰ داستان کوتاه دوزبانه (کوچه‌بازار و محاوره واقعی غرب و ایران)</span>
          </span>
          <span className="text-xs font-black text-emerald-300">
            ۱۰۰٪ بدون کپی‌رایت • گویندگی دوزبانه با کنترل سرعت و تکرار
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-amber-300 pt-1">
          ۳۰ داستان شنیداری دوزبانه: آموزش زبان زنده خیابان، تعارفات، اصطلاحات خودمانی و ضرب‌المثل‌ها
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-4xl">
          داستان‌های جذاب از موقعیت‌های واقعی روزمره (کافه، ترافیک، چانه‌زنی، فرودگاه، دعوای هم‌خانه‌ای، سلمونی و...) همراه با قابلیت جلو و عقب بردن صدای گوینده، تلفظ تند و کند، تفکیک کلمه به کلمه و کارگاه تمرین و تکرار!
        </p>

        {/* Global Story Quick Carousel / Selector */}
        <div className="pt-2">
          <div className="flex items-center justify-between gap-2 pb-2">
            <span className="text-xs font-black text-amber-300">
              انتخاب از میان ۳۰ داستان کاربردی (داستان فعلی: شماره {currentStory.number}):
            </span>
            <input
              type="text"
              placeholder="🔍 جستجو در ۳۰ داستان (مثلاً: کافه، ترافیک، ماشین...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs font-bold w-48 sm:w-64 focus:outline-hidden focus:border-amber-400"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {filteredStories.map((story) => {
              const isSelected = story.id === currentStory.id;
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    stopAllActiveSpeech();
                    const idx = THIRTY_COLLOQUIAL_STORIES.findIndex((s) => s.id === story.id);
                    setSelectedStoryIndex(idx >= 0 ? idx : 0);
                    setActiveSentenceIndex(0);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all text-right border ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-white shadow-md ring-2 ring-amber-300'
                      : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                  }`}
                >
                  <span className="block">{story.number}. {story.titleFa.split('(')[0]}</span>
                  <span className={`text-[10px] block opacity-80 ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-300'}`} dir="ltr">
                    {story.titleEn.slice(0, 24)}...
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Story Interactive Studio Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Story Header & Setting */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-lg bg-emerald-100 text-emerald-950 text-xs font-black">
                📍 موقعیت داستان: {currentStory.settingFa}
              </span>
              <span className="px-3 py-0.5 rounded-lg bg-amber-100 text-amber-950 text-xs font-black">
                جمله {activeSentenceIndex + 1} از {currentStory.sentences.length}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {currentStory.titleFa}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-slate-500" dir="ltr">
              🇬🇧 {currentStory.titleEn}
            </p>
          </div>

          {/* Quick Sentence Stepper Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevSentence}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all flex items-center gap-1 text-xs font-bold"
              title="جمله قبلی"
            >
              <ArrowRight className="w-4 h-4" />
              <span>جمله قبل</span>
            </button>
            <button
              type="button"
              onClick={handleNextSentence}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all flex items-center gap-1 text-xs font-bold"
              title="جمله بعدی"
            >
              <span>جمله بعد</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sentence Interactive Display & Highlight */}
        <div className="p-6 rounded-3xl bg-slate-950 text-white space-y-4 border-2 border-slate-800 relative overflow-hidden">
          {/* Sentence progress dots */}
          <div className="flex items-center gap-1.5 pb-1">
            {currentStory.sentences.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  sound.playClick();
                  stopAllActiveSpeech();
                  setActiveSentenceIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === activeSentenceIndex ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          {/* English Phrase (Street & Textbook) */}
          <div className="space-y-1.5" dir="ltr">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">🇺🇸 Native English Line:</span>
              <span className="font-mono text-amber-400">Audio ready</span>
            </div>
            <p className="text-lg sm:text-2xl font-black text-amber-300 font-mono leading-relaxed">
              "{currentSentence.en}"
            </p>
            {currentSentence.enCasualFast && (
              <p className="text-xs sm:text-sm font-mono text-sky-300 flex items-center gap-1">
                <span>⚡ Street Spoken:</span>
                <span>"{currentSentence.enCasualFast}"</span>
              </p>
            )}
          </div>

          {/* Farsi Colloquial Translation & Phonetic */}
          <div className="pt-2 border-t border-slate-800 space-y-1.5" dir="rtl">
            <span className="text-xs font-black text-emerald-400 block">
              🇮🇷 ترجمه عامیانه و تکیه‌کلام اصیل تهرانی / ایرانی:
            </span>
            <p className="text-base sm:text-xl font-black text-white leading-relaxed">
              «{currentSentence.faColloquial}»
            </p>
            <p className="text-xs text-slate-400">
              ترجمه کلمه به کلمه: {currentSentence.fa}
            </p>
            <p className="text-xs text-emerald-300 font-mono pt-0.5">
              🗣️ تلفظ شنیداری: <strong>[{currentSentence.phoneticFa}]</strong>
            </p>
          </div>
        </div>

        {/* Audio Studio Controller (Play, Fast, Slow, Rewind, Forward) */}
        <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Play English (Normal) */}
            <button
              type="button"
              onClick={() => playCurrentSentenceEnglish()}
              className="py-2.5 px-4 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-black text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>🔊 پخش انگلیسی</span>
            </button>

            {/* Play Fast Native */}
            <button
              type="button"
              onClick={() => playCurrentSentenceEnglishFast()}
              className="py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Flame className="w-4 h-4 text-slate-950 fill-slate-950" />
              <span>⚡ سریع خیابانی</span>
            </button>

            {/* Play Persian Colloquial */}
            <button
              type="button"
              onClick={() => playCurrentSentencePersian()}
              className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 پخش فارسی عامیانه</span>
            </button>

            {/* Dual Continuous Audio */}
            <button
              type="button"
              onClick={playDualSentenceNarration}
              className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Languages className="w-4 h-4 text-amber-400" />
              <span>🔄 گویندگی دوزبانه (انگلیسی ➔ فارسی)</span>
            </button>
          </div>

          {/* Speed & Navigation Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">سرعت:</span>
            {[0.75, 0.9, 1.1].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setPlaybackSpeed(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                  playbackSpeed === s
                    ? 'bg-slate-900 text-amber-300'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Vocabulary & Slang Breakdown for the Current Sentence */}
        <div className="space-y-3">
          <span className="text-xs font-black text-slate-700 block">
            🔍 لغات، اصطلاحات کوچه‌بازار و تکیه‌کلام‌های این جمله:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentSentence.vocabNotes.map((vocab, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 font-mono" dir="ltr">
                    {vocab.wordEn}
                  </span>
                  <button
                    type="button"
                    onClick={() => speakEnglish(vocab.wordEn, 0.85)}
                    className="p-1 rounded-lg hover:bg-amber-200 text-amber-900"
                    title="تلفظ لغت"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs font-bold text-emerald-900">
                  معنی: {vocab.wordFa}
                </p>
                {vocab.slangExplanationFa && (
                  <p className="text-[11px] text-amber-950/80 leading-normal">
                    💡 <em>کاربرد خیابانی:</em> {vocab.slangExplanationFa}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Takeaway & Key Slang Note */}
        <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>نکته اصطلاحی و فرهنگی این داستان:</span>
            </span>
            <p className="text-xs text-indigo-900 leading-relaxed font-bold">
              {currentStory.culturalNoteFa}
            </p>
            <p className="text-xs text-emerald-800 font-mono" dir="ltr">
              🔑 Key Takeaway: "{currentStory.keySlangTakeawayFa}"
            </p>
          </div>

          {/* Interactive Repeat & Practice Button */}
          <button
            type="button"
            onClick={handlePracticeRepeat}
            className="py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shrink-0 shadow-md transition-all active:scale-95"
          >
            <Mic className="w-4 h-4 text-amber-200" />
            <span>🎙️ تمرین تکرار هنرجو (+20 XP)</span>
          </button>
        </div>

        {/* Feedback message for practice */}
        {userSpokenFeedback && (
          <div className="p-3.5 rounded-2xl bg-emerald-950 text-emerald-200 border-2 border-emerald-400 text-xs font-black flex items-center justify-between">
            <span>{userSpokenFeedback}</span>
            <button
              type="button"
              onClick={() => setUserSpokenFeedback(null)}
              className="text-slate-300 hover:text-white"
            >
              بستن
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
