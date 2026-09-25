import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Users, 
  Volume2, 
  MessageSquare, 
  Sparkles, 
  Globe, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Send,
  Languages,
  Coffee
} from 'lucide-react';
import { TANDEM_PARTNERS, TandemPartner } from '../data/tandemExchange';
import { speakPersian, speakEnglish, sound } from '../utils/audio';

interface TandemExchangeRoomProps {
  completedSessionIds: string[];
  onCompleteTandemSession: (partnerId: string, rewardLingous: number) => void;
  speechVoiceRate: number;
}

export const TandemExchangeRoom: React.FC<TandemExchangeRoomProps> = ({
  completedSessionIds,
  onCompleteTandemSession,
  speechVoiceRate
}) => {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(TANDEM_PARTNERS[0].id);
  const [activeSessionStage, setActiveSessionStage] = useState<'persian_half' | 'english_half'>('persian_half');
  const [userCustomMessage, setUserCustomMessage] = useState<string>('');
  const [chatLog, setChatLog] = useState<{ sender: 'partner' | 'user'; text: string; lang: 'fa' | 'en' }[]>([
    {
      sender: 'partner',
      text: TANDEM_PARTNERS[0].partnerVoiceText,
      lang: TANDEM_PARTNERS[0].partnerSpeechLanguage
    }
  ]);

  const activePartner = TANDEM_PARTNERS.find(p => p.id === selectedPartnerId) || TANDEM_PARTNERS[0];

  const handleSelectPartner = (partner: TandemPartner) => {
    sound.playClick();
    setSelectedPartnerId(partner.id);
    setActiveSessionStage('persian_half');
    setChatLog([
      {
        sender: 'partner',
        text: partner.partnerVoiceText,
        lang: partner.partnerSpeechLanguage
      }
    ]);
  };

  const handlePlayVoice = (text: string, lang: 'fa' | 'en') => {
    sound.playClick();
    if (lang === 'fa') {
      speakPersian(text, speechVoiceRate || 0.85);
    } else {
      speakEnglish(text, speechVoiceRate || 0.9);
    }
  };

  const handleSendMessage = () => {
    if (!userCustomMessage.trim()) return;
    sound.playClick();

    const msg = userCustomMessage;
    setUserCustomMessage('');

    setChatLog(prev => [
      ...prev,
      {
        sender: 'user',
        text: msg,
        lang: activeSessionStage === 'persian_half' ? 'fa' : 'en'
      }
    ]);

    // Simulated Intelligent Partner Response
    setTimeout(() => {
      sound.playLevelUp();
      let reply = '';
      if (activeSessionStage === 'persian_half') {
        reply = `آفرین! لحن و کلمات جمله‌ات خیلی صمیمی و زیبا بود. حالا بیا نوبت بخش انگلیسی بشه تا من تمرین کنم!`;
      } else {
        reply = `Brilliant pronunciation! Your phrasing was completely authentic and natural. Thank you for this tandem practice!`;
      }

      setChatLog(prev => [
        ...prev,
        {
          sender: 'partner',
          text: reply,
          lang: activeSessionStage === 'persian_half' ? 'fa' : 'en'
        }
      ]);
    }, 700);
  };

  const handleFinishTandem = () => {
    sound.playLevelUp();
    try {
      confetti({ particleCount: 75, spread: 70 });
    } catch {}
    onCompleteTandemSession(activePartner.id, 40);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-sky-700 text-white p-6 sm:p-7 rounded-3xl border border-teal-500 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold">
              <Globe className="w-3.5 h-3.5" />
              <span>گفت‌وگوی دوستانه دوطرفه • فارسی و انگلیسی با هم</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              اتاق گپ‌زدن دوطرفه: تو به من یاد بده، من به تو! 🌐
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
              خیلی ساده است: شما به دوست خارجی فارسی یاد می‌دهید، و او به شما انگلیسی یاد می‌دهد! ۱۵ دقیقه به فارسی گپ می‌زنید و ۱۵ دقیقه به انگلیسی. مثل دو تا دوست صمیمی کلمات و لهجه همدیگر را درست می‌کنید.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white w-full md:w-60 space-y-1 text-center">
            <span className="text-xs text-amber-200 font-bold block">جلسات گفت‌وگو:</span>
            <div className="text-2xl font-black text-amber-300">
              {completedSessionIds.length} جلسه
            </div>
            <span className="text-[11px] text-white/80 block">+۴۰ سکه طلا برای هر تمرین</span>
          </div>
        </div>
      </div>

      {/* Partner Directory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {TANDEM_PARTNERS.map(partner => {
          const isSelected = partner.id === selectedPartnerId;
          const isDone = completedSessionIds.includes(partner.id);

          return (
            <div
              key={partner.id}
              onClick={() => handleSelectPartner(partner)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                    {partner.avatar}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{partner.name}</h3>
                    <span className="text-[11px] text-slate-500">{partner.city}</span>
                  </div>
                </div>

                {isDone && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    ✓ تبادل انجام شد
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {partner.bio}
              </p>

              <div className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 p-2 rounded-xl border border-emerald-200">
                {partner.topicTitleFa}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tandem Session Stage */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Session Stage Toggle (15 min Fa / 15 min En) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activePartner.avatar}</span>
            <div>
              <h3 className="font-black text-base text-slate-900">
                اتاق تبادل زنده با {activePartner.name}
              </h3>
              <p className="text-xs text-slate-500">
                {activePartner.topicTitleEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => { sound.playClick(); setActiveSessionStage('persian_half'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSessionStage === 'persian_half'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇮🇷 بخش فارسی (۱۵ دقیقه)
            </button>

            <button
              onClick={() => { sound.playClick(); setActiveSessionStage('english_half'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSessionStage === 'english_half'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇬🇧 بخش انگلیسی (۱۵ دقیقه)
            </button>
          </div>
        </div>

        {/* Suggested Practice Prompts */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-amber-950">
            <span>💡 پیشنهاد هوش مصنوعی برای شروع مکالمه در این بخش:</span>
            <button
              onClick={() => {
                const textToUse = activeSessionStage === 'persian_half' ? activePartner.persianPhrasePrompt : activePartner.englishPhrasePrompt;
                setUserCustomMessage(textToUse);
              }}
              className="text-amber-800 underline hover:text-amber-950"
            >
              قرار دادن در کادر پیام
            </button>
          </div>

          <p className="font-medium text-slate-800">
            {activeSessionStage === 'persian_half' 
              ? activePartner.persianPhrasePrompt
              : activePartner.englishPhrasePrompt}
          </p>

          {activeSessionStage === 'persian_half' && (
            <p className="font-mono text-[11px] text-emerald-950 font-bold">
              Fingilish: {activePartner.persianFingilish}
            </p>
          )}
        </div>

        {/* Chat / Audio Dialogue Stream */}
        <div className="space-y-3 max-h-72 overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-200">
          {chatLog.map((chat, idx) => {
            const isUser = chat.sender === 'user';
            return (
              <div 
                key={idx}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <span className="text-xl shrink-0">
                  {isUser ? '👤' : activePartner.avatar}
                </span>

                <div className={`p-3.5 rounded-2xl max-w-md text-xs sm:text-sm space-y-1 ${
                  isUser 
                    ? 'bg-emerald-700 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                }`}>
                  <p className="leading-relaxed font-medium">
                    {chat.text}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => handlePlayVoice(chat.text, chat.lang)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                        isUser ? 'text-amber-200 hover:text-white' : 'text-emerald-700 hover:text-emerald-900'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>پخش صوتی</span>
                    </button>

                    <span className="text-[10px] opacity-70">
                      {chat.lang === 'fa' ? 'فارسی' : 'English'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Box */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={userCustomMessage}
            onChange={(e) => setUserCustomMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={activeSessionStage === 'persian_half' ? 'عبارت یا سوال فارسی خود را بنویسید...' : 'Type your English message or response...'}
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm font-medium"
          />

          <button
            onClick={handleSendMessage}
            className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>ارسال</span>
          </button>
        </div>

        {/* Finish Session Bar */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            با تکمیل ۳ تبادل در اتاق، مهارت روان‌گویی هر دو طرف تثبیت می‌گردد.
          </span>

          <button
            onClick={handleFinishTandem}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
          >
            ثبت پایان جلسه تبادل (+۴۰ سکه طلای لینگو) 🪙
          </button>
        </div>

      </div>
    </div>
  );
};
