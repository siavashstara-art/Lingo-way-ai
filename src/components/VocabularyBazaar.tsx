import React, { useState } from 'react';
import { 
  Volume2, 
  Search, 
  Bookmark, 
  CheckCircle2, 
  Plus, 
  Layers, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { VocabularyWord, UserProgress } from '../types';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { speakEnglish, sound } from '../utils/audio';

interface VocabularyBazaarProps {
  progress: UserProgress;
  onToggleMastered: (wordId: string) => void;
  onToggleBookmark: (wordId: string) => void;
  onOpenCustomModal: () => void;
}

export const VocabularyBazaar: React.FC<VocabularyBazaarProps> = ({
  progress,
  onToggleMastered,
  onToggleBookmark,
  onOpenCustomModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'flashcards'>('grid');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const allWords: VocabularyWord[] = [...VOCABULARY_LIST, ...progress.customWords];

  const filteredWords = allWords.filter(word => {
    return (
      word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.definition.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];

  const handleSpeak = (text: string) => {
    sound.playClick();
    speakEnglish(text, progress.speechVoiceRate);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % (filteredWords.length || 1));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + filteredWords.length) % (filteredWords.length || 1));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header section - Clean & Direct */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-50 via-yellow-50 to-slate-50 border border-amber-200 rounded-3xl p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span>🗣️ بخش ۱</span>
            <span>•</span>
            <span>کلمات و اصطلاحات روزمره</span>
          </div>
          <h1 className="font-bold text-xl sm:text-2xl text-slate-900">
            بانک واژگان کاربردی و مکالمه‌ای
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
            کلمات بدون فرمول‌های سخت و حفظی؛ با شنیدن تلفظ، کاربرد واقعی در جمله‌ها و امکان علامت‌گذاری لغات آموخته‌شده.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'flashcards' : 'grid')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-slate-800 border border-slate-300 hover:border-amber-400 font-bold text-xs sm:text-sm transition-all shadow-sm"
          >
            <Layers className="w-4 h-4 text-amber-600" />
            <span>{viewMode === 'grid' ? 'حالت فلش‌کارت' : 'نمایش جدولی'}</span>
          </button>

          <button
            onClick={onOpenCustomModal}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-transform active:scale-95 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>افزودن کلمه دلخواه</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 mr-2" />
        <input
          type="text"
          placeholder="جستجوی کلمه به انگلیسی یا معنی به فارسی..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
        />
      </div>

      {/* FLASHCARD MODE */}
      {viewMode === 'flashcards' && filteredWords.length > 0 && (
        <div className="max-w-md mx-auto space-y-4">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[280px] rounded-3xl bg-gradient-to-br from-amber-50 to-white border-2 border-amber-300 p-6 flex flex-col justify-between shadow-md relative select-none hover:border-amber-400 transition-all"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                کارت {flashcardIndex + 1} از {filteredWords.length}
              </span>
              <span className="text-slate-400">
                (لمس کارت برای دیدن معنی)
              </span>
            </div>

            {!isFlipped ? (
              <div className="text-center my-auto py-4">
                <h2 className="font-black text-3xl sm:text-4xl text-slate-900 mb-1">
                  {currentFlashcard.word}
                </h2>
                <p className="text-slate-500 font-mono text-sm mb-4">
                  {currentFlashcard.phonetic}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(currentFlashcard.word);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-sm"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>شنیدن تلفظ صوتی</span>
                </button>
              </div>
            ) : (
              <div className="text-center my-auto py-4 space-y-2.5">
                <span className="text-xs font-bold text-amber-800 block">
                  معنی و مفهوم کاربردی:
                </span>
                <p className="text-lg font-bold text-slate-900">
                  {currentFlashcard.definition}
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                  "{currentFlashcard.example}"
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400">{isFlipped ? "معنی نمایش داده شد" : "برای دیدن معنی لمس کنید"}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMastered(currentFlashcard.id);
                }}
                className={`flex items-center gap-1 font-bold ${
                  progress.masteredWordIds.includes(currentFlashcard.id)
                    ? 'text-emerald-700'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{progress.masteredWordIds.includes(currentFlashcard.id) ? 'یاد گرفته شد ✔️' : 'ثبت در آموخته‌ها'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrevCard}
              className="flex-1 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-amber-400 text-slate-800 text-xs font-bold"
            >
              کارت قبلی
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex-1 py-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold"
            >
              چرخش کارت
            </button>
            <button
              onClick={handleNextCard}
              className="flex-1 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-amber-400 text-slate-800 text-xs font-bold"
            >
              کارت بعدی
            </button>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((word) => {
            const isMastered = progress.masteredWordIds.includes(word.id);
            const isBookmarked = progress.bookmarkedWordIds.includes(word.id);

            return (
              <div
                key={word.id}
                className={`rounded-2xl p-4 sm:p-5 border transition-all duration-200 bg-white ${
                  isMastered
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-slate-200 hover:border-amber-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">
                    {word.phonetic}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onToggleBookmark(word.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked 
                          ? 'text-amber-600 bg-amber-100' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title="نشان کردن برای مرور"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      onClick={() => onToggleMastered(word.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isMastered
                          ? 'text-emerald-700 bg-emerald-100 font-bold'
                          : 'text-slate-400 hover:text-emerald-600'
                      }`}
                      title="ثبت به عنوان آموخته‌شده"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-slate-900">
                    {word.word}
                  </h3>

                  <button
                    onClick={() => handleSpeak(word.word)}
                    className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition-colors"
                    title="پخش تلفظ"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm font-bold text-amber-900 mb-2">
                  {word.definition}
                </p>

                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 mb-2">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    "{word.example}"
                  </p>
                </div>

                {word.tavanaContext && (
                  <p className="text-[11px] text-slate-500 font-medium">
                    💡 {word.tavanaContext}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
