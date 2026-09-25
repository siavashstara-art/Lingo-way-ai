import React, { useState } from 'react';
import { X, Plus, Sparkles, BookOpen, Loader2, Wand2 } from 'lucide-react';
import { CEFRLevel, VocabularyWord } from '../types';
import { sound } from '../utils/audio';
import { explainWordWithAI } from '../utils/aiClient';

interface CustomWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWord: (word: VocabularyWord) => void;
}

export const CustomWordModal: React.FC<CustomWordModalProps> = ({
  isOpen,
  onClose,
  onAddWord
}) => {
  const [word, setWord] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState<VocabularyWord['partOfSpeech']>('noun');
  const [level, setLevel] = useState<CEFRLevel>('B1-B2');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [isAiExplaining, setIsAiExplaining] = useState(false);

  if (!isOpen) return null;

  const handleAutoFillWithAi = async () => {
    if (!word.trim() || isAiExplaining) return;
    sound.playClick();
    setIsAiExplaining(true);

    try {
      const data = await explainWordWithAI(word.trim());
      sound.playChime();
      if (data.phonetic) setPhonetic(data.phonetic);
      if (data.definition) setDefinition(data.definition);
      if (data.examples && data.examples[0]) setExample(data.examples[0]);
      if (data.cefrLevel) setLevel(data.cefrLevel as CEFRLevel);
    } finally {
      setIsAiExplaining(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !definition.trim()) return;

    const newWord: VocabularyWord = {
      id: `custom_${Date.now()}`,
      word: word.trim(),
      phonetic: phonetic.trim() || `/${word.toLowerCase()}/`,
      partOfSpeech,
      definition: definition.trim(),
      example: example.trim() || `I practiced the word "${word}" in Virtual Tavana City.`,
      category: 'custom',
      level,
      tavanaContext: 'User custom addition to personal vocabulary vault.'
    };

    sound.playCoin();
    onAddWord(newWord);
    onClose();

    // Reset form
    setWord('');
    setPhonetic('');
    setDefinition('');
    setExample('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="font-display font-bold text-lg text-white">
              Add Word to Personal Bazaar
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Word or Phrase *
                </label>
                <button
                  type="button"
                  onClick={handleAutoFillWithAi}
                  disabled={!word.trim() || isAiExplaining}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 disabled:opacity-40"
                  title="Generate definition and phonetic via secure Server Gemini API"
                >
                  {isAiExplaining ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-3 h-3" />
                      <span>Auto-Fill AI</span>
                    </>
                  )}
                </button>
              </div>
              <input
                type="text"
                required
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="e.g. serendipity"
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Phonetic IPA (optional)
              </label>
              <input
                type="text"
                value={phonetic}
                onChange={(e) => setPhonetic(e.target.value)}
                placeholder="e.g. /ˌser.ənˈdɪp.ə.ti/"
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Part of Speech
              </label>
              <select
                value={partOfSpeech}
                onChange={(e) => setPartOfSpeech(e.target.value as VocabularyWord['partOfSpeech'])}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="noun">Noun</option>
                <option value="verb">Verb</option>
                <option value="adjective">Adjective</option>
                <option value="adverb">Adverb</option>
                <option value="idiom">Idiom</option>
                <option value="phrase">Phrase</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target CEFR Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as CEFRLevel)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="A1-A2">A1-A2 (Beginner/Elementary)</option>
                <option value="B1-B2">B1-B2 (Intermediate)</option>
                <option value="C1-C2">C1-C2 (Advanced/Proficient)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Definition / Meaning *
            </label>
            <input
              type="text"
              required
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="e.g. The occurrence of events by chance in a happy or beneficial way"
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Example Sentence in Context
            </label>
            <textarea
              rows={2}
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="e.g. Finding that cozy café in the Tavana side alley was pure serendipity."
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Save to Bazaar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
