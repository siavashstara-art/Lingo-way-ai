import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Bot, 
  WifiOff, 
  ArrowLeftRight, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  BookOpen, 
  Layers, 
  Check, 
  Globe2, 
  Zap,
  RotateCcw,
  Languages
} from 'lucide-react';
import { UserProgress, LearningTrack } from '../types';
import { BILINGUAL_KNOWLEDGE_BASE, OFFLINE_GRAMMAR_BRIDGE, BilingualUnit } from '../data/bilingual';
import { evaluateOfflineBidirectional, OfflineEvaluationResult } from '../utils/offlineAI';
import { speakEnglish, speakPersian, sound } from '../utils/audio';
import { AccessibilitySettings } from '../utils/accessibility';

interface BilingualAIFoundationProps {
  progress: UserProgress;
  accessibility: AccessibilitySettings;
  onUpdateTrack: (track: LearningTrack) => void;
  onCompleteUnit: (unitId: string, rewardLingous: number) => void;
  onToggleOfflineForced: () => void;
}

export const BilingualAIFoundation: React.FC<BilingualAIFoundationProps> = ({
  progress,
  accessibility,
  onUpdateTrack,
  onCompleteUnit,
  onToggleOfflineForced
}) => {
  const isPersianLearningEnglish = progress.learningTrack === 'en_for_persian';
  const [selectedUnitId, setSelectedUnitId] = useState<string>(BILINGUAL_KNOWLEDGE_BASE[0].id);
  const [userChatInput, setUserChatInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{
    sender: 'user' | 'ai';
    text: string;
    feedback?: string;
    score?: number;
    phonetic?: string;
    isOffline: boolean;
  }>>([
    {
      sender: 'ai',
      text: isPersianLearningEnglish
        ? 'سلام و درود! من معلم هوش مصنوعی دوطرفه شما هستم. این بخش ۱۰۰٪ بدون نیاز به اینترنت و به صورت آفلاین کار می‌کند. می‌توانید هم انگلیسی و هم فارسی را تمرین کنید.'
        : 'Welcome! I am your Offline AI Language Companion. I can teach you Persian from English, or English from Persian, fully offline without any internet connection!',
      isOffline: true
    }
  ]);
  const [activeTab, setActiveTab] = useState<'bilingual_gym' | 'interactive_ai' | 'grammar_bridge'>('bilingual_gym');

  const currentUnit = BILINGUAL_KNOWLEDGE_BASE.find(u => u.id === selectedUnitId) || BILINGUAL_KNOWLEDGE_BASE[0];

  const handleSwitchTrack = (newTrack: LearningTrack) => {
    sound.playClick();
    onUpdateTrack(newTrack);
    setChatHistory([
      {
        sender: 'ai',
        text: newTrack === 'en_for_persian'
          ? 'حالت آموزش انگلیسی به فارسی‌زبانان فعال شد. تلفظ، مکالمه و ساختار جملات انگلیسی را تمرین کنید.'
          : 'Persian for English Speakers activated! Learn authentic Persian phrasing, taarof culture, and natural speech without needing internet.',
        isOffline: true
      }
    ]);
  };

  const handleSpeak = (text: string, isPersianVoice: boolean) => {
    sound.playClick();
    if (isPersianVoice) {
      speakPersian(text, progress.speechVoiceRate);
    } else {
      speakEnglish(text, progress.speechVoiceRate);
    }
  };

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userChatInput.trim()) return;

    sound.playClick();
    const input = userChatInput;
    setUserChatInput('');

    // Evaluate 100% offline via local offlineAI engine!
    const mode = isPersianLearningEnglish ? 'learn_english' : 'learn_persian';
    const evalResult: OfflineEvaluationResult = evaluateOfflineBidirectional({
      userInput: input,
      targetUnit: currentUnit,
      mode
    });

    if (evalResult.score >= 8) {
      sound.playChime();
    } else {
      sound.playClick();
    }

    setChatHistory(prev => [
      ...prev,
      {
        sender: 'user',
        text: input,
        isOffline: true
      },
      {
        sender: 'ai',
        text: evalResult.reply,
        feedback: evalResult.feedback,
        score: evalResult.score,
        phonetic: evalResult.phoneticHelp,
        isOffline: true
      }
    ]);

    // Reward coins
    onCompleteUnit(currentUnit.id, 20);

    // Speak AI response
    setTimeout(() => {
      handleSpeak(evalResult.reply, !isPersianLearningEnglish);
    }, 300);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner: AI Public Foundation & Dual Offline Learning */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-amber-500 border border-sky-400 p-6 sm:p-8 shadow-sm text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 font-bold text-xs">
              <Bot className="w-3.5 h-3.5" />
              <span>پایه‌گذاری آموزش عمومی با هوش مصنوعی آفلاین (AI Bilingual Foundation)</span>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl tracking-tight leading-tight">
              آموزش دوجانبه: انگلیسی به فارسی‌زبانان و فارسی به انگلیسی‌زبانان 🌍
            </h1>

            <p className="text-xs sm:text-sm font-normal text-sky-100 leading-relaxed">
              این سیستم به صورت <span className="font-bold text-amber-300 underline underline-offset-4">کاملاً آفلاین و درجا</span> طراحی شده است. بدون نیاز به اینترنت، تلفظ‌ها خوانده می‌شوند، گفت‌وگوها تحلیل می‌گردند و پل بین دو زبان و فرهنگ ساخته می‌شود.
            </p>
          </div>

          {/* Dual-Direction Switcher */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-white w-full md:w-auto space-y-2">
            <div className="text-xs font-bold text-sky-200 flex items-center justify-between gap-2">
              <span>مسیر آموزش فعلی:</span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/80 text-[10px] font-black">
                <WifiOff className="w-3 h-3" /> ۱۰۰٪ آفلاین
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSwitchTrack('en_for_persian')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                  isPersianLearningEnglish
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                🇮🇷 به 🇬🇧<br />انگلیسی برای ما
              </button>

              <button
                onClick={() => handleSwitchTrack('fa_for_english')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                  !isPersianLearningEnglish
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                🇬🇧 to 🇮🇷<br />Learn Persian
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => { sound.playClick(); setActiveTab('bilingual_gym'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'bilingual_gym'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>واژگان و مکالمه دوجانبه (Bilingual Units)</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('interactive_ai'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'interactive_ai'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>گفت‌وگوی زنده با هوش مصنوعی آفلاین</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('grammar_bridge'); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'grammar_bridge'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>پل ساختاری گرامر (SOV vs SVO)</span>
        </button>
      </div>

      {/* TAB 1: BILINGUAL UNITS (Dual Perspective) */}
      {activeTab === 'bilingual_gym' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Bilingual Card */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase">
                  {isPersianLearningEnglish ? currentUnit.topicFa : currentUnit.topic}
                </span>
                <h2 className="font-bold text-lg sm:text-xl text-slate-900">
                  {isPersianLearningEnglish ? 'تطبیق اصطلاحات روزمره و فرهنگی' : 'Persian & English Dual Immersion'}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <WifiOff className="w-3.5 h-3.5" />
                <span>عملکرد ۱۰۰٪ آفلاین</span>
              </div>
            </div>

            {/* English Section */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900">
                  English (انگلیسی)
                </span>
                <button
                  onClick={() => handleSpeak(currentUnit.englishPhrase, false)}
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  title="شنیدن تلفظ انگلیسی (آفلاین)"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                "{currentUnit.englishPhrase}"
              </h3>
              <p className="font-mono text-xs text-slate-500">
                {currentUnit.englishPhonetic}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                {currentUnit.englishExplanation}
              </p>
            </div>

            {/* Persian Section (With Fingilish Phonetic for Foreigners) */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950">
                  فارسی (Persian)
                </span>
                <button
                  onClick={() => handleSpeak(currentUnit.persianPhrase, true)}
                  className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors"
                  title="شنیدن تلفظ فارسی (آفلاین)"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                "{currentUnit.persianPhrase}"
              </h3>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <span className="text-[11px] font-bold text-amber-900 block mb-0.5">
                  تلفظ برای انگلیسی‌زبان‌ها (Fingilish / Latin Phonetic):
                </span>
                <p className="font-mono text-xs sm:text-sm text-slate-800 font-bold">
                  {currentUnit.persianPhonetic}
                </p>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {currentUnit.persianExplanation}
              </p>
            </div>

            {/* Cultural Context (Taarof, Politeness, Everyday Life) */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
              <span className="text-xs font-bold text-emerald-900 block">
                💡 نکته ظریف فرهنگی و کاربرد عامیانه:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {isPersianLearningEnglish ? currentUnit.contextFa : currentUnit.contextEn}
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  sound.playLevelUp();
                  onCompleteUnit(currentUnit.id, 25);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ثبت یادگیری این درس (+۲۵ سکه)</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('interactive_ai');
                  setUserChatInput(isPersianLearningEnglish ? currentUnit.englishPhrase : currentUnit.persianPhonetic);
                }}
                className="px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 font-bold text-xs"
              >
                تمرین با ربات آفلاین →
              </button>
            </div>
          </div>

          {/* Right Column: Units List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-sm text-slate-900">
                  واحدهای گفت‌وگوی دوجانبه
                </h3>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-200">
                  {BILINGUAL_KNOWLEDGE_BASE.length} درس آماده
                </span>
              </div>

              <div className="space-y-2">
                {BILINGUAL_KNOWLEDGE_BASE.map((unit) => {
                  const isActive = unit.id === selectedUnitId;
                  const isDone = progress.completedBilingualUnitIds?.includes(unit.id);

                  return (
                    <div
                      key={unit.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedUnitId(unit.id);
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isActive
                          ? 'border-sky-500 bg-sky-50/60 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-900 line-clamp-1">
                          {isPersianLearningEnglish ? unit.topicFa : unit.topic}
                        </span>
                        {isDone && <span className="text-emerald-700 font-bold shrink-0">✔</span>}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {isPersianLearningEnglish ? unit.englishPhrase : unit.persianPhrase}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Offline Intelligence Guarantee Card */}
            <div className="bg-slate-900 text-slate-200 rounded-3xl p-5 space-y-2 shadow-sm text-xs leading-relaxed">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <WifiOff className="w-4 h-4" />
                <span>ضمانت آموزش همگانی و بدون فیلتر:</span>
              </div>
              <p className="text-slate-300">
                این ماژول نیازی به اینترنت، مصرف حجم دیتا و وی‌پی‌ان ندارد. تمامی موتورهای ترکیب صوتی و اعتبارسنجی عبارات در مرورگر کاربر پردازش می‌شوند.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE OFFLINE AI CHAT */}
      {activeTab === 'interactive_ai' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                🤖
              </div>
              <div>
                <h2 className="font-bold text-base sm:text-lg text-slate-900">
                  دستیار هوشمند آفلاین آموزش زبان
                </h2>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <WifiOff className="w-3.5 h-3.5" /> فعال و پردازش درجا (بدون اینترنت)
                </span>
              </div>
            </div>

            <button
              onClick={() => setChatHistory([
                {
                  sender: 'ai',
                  text: isPersianLearningEnglish
                    ? 'گفت‌وگو از نو آغاز شد. هر جمله انگلیسی که دوست دارید بنویسید یا تمرین کنید.'
                    : 'Chat restarted! Type in English or Persian (even in Fingilish letters).',
                  isOffline: true
                }
              ])}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="شروع مجدد گفت‌وگو"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            {chatHistory.map((item, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${item.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 bg-slate-100 border border-slate-200 mt-1">
                  {item.sender === 'user' ? '👤' : '🤖'}
                </div>

                <div className={`max-w-[85%] space-y-1.5 ${
                  item.sender === 'user' ? 'items-end text-left' : 'items-start text-right'
                }`}>
                  <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    item.sender === 'user'
                      ? 'bg-sky-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-100 text-slate-900 font-medium rounded-tl-none border border-slate-200'
                  }`}>
                    {item.text}
                  </div>

                  {item.feedback && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-bold space-y-1">
                      <div>💡 {item.feedback}</div>
                      {item.phonetic && (
                        <div className="font-mono text-slate-600 text-[11px]">
                          تلفظ راهنما: {item.phonetic}
                        </div>
                      )}
                    </div>
                  )}

                  {item.sender === 'ai' && (
                    <button
                      onClick={() => handleSpeak(item.text, !isPersianLearningEnglish)}
                      className="inline-flex items-center gap-1 text-[11px] text-sky-700 hover:text-sky-900 font-bold"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>شنیدن صدای این پاسخ</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendChat} className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={userChatInput}
              onChange={(e) => setUserChatInput(e.target.value)}
              placeholder={
                isPersianLearningEnglish
                  ? 'جمله انگلیسی خود را اینجا بنویسید (مثلاً: How are you doing?)...'
                  : 'Type in English or Persian/Fingilish (e.g. Khasteh nabashid)...'
              }
              className="flex-1 p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-sky-500 text-xs sm:text-sm text-slate-800"
            />

            <button
              type="submit"
              disabled={!userChatInput.trim()}
              className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 flex items-center gap-1"
            >
              <span>ارسال</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: GRAMMAR BRIDGE */}
      {activeTab === 'grammar_bridge' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="max-w-2xl space-y-1">
            <h2 className="font-bold text-xl text-slate-900">
              پل ساختاری زبان: تفاوت‌های کلیدی فارسی و انگلیسی
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              چرا خیلی‌ها کلمات را می‌دانند اما موقع جمله ساختن گیر می‌کنند؟ این الگوها راهگشا هستند:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {OFFLINE_GRAMMAR_BRIDGE.map((bridge) => (
              <div key={bridge.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-bold text-sm text-sky-900 border-b border-slate-200 pb-2">
                  {bridge.titleFa}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {bridge.persianRule}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  {bridge.englishRule}
                </p>
                
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1 font-semibold">
                  <div className="text-emerald-700">فارسی: {bridge.exampleFa}</div>
                  <div className="text-blue-700">English: {bridge.exampleEn}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
