import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Volume2,
  Users,
  Sparkles,
  Globe
} from 'lucide-react';
import { sound, speakPersian, speakEnglish, transliteratePersianToFingilish } from '../utils/audio';

export type ChatChannelId =
  | 'farsi_english_exchange'
  | 'ableway_city_council'
  | 'mind_sports_leagues'
  | 'dynasty_and_heba30'
  | 'credit850_and_visa';

interface ServerChatMessage {
  id: string;
  channelId: ChatChannelId;
  senderName: string;
  senderRole: string;
  countryFlag: string;
  textFa: string;
  textFingilish: string;
  textEn: string;
  timestamp: string;
}

interface GlobalLiveChat5ChannelProps {
  onEarnLingous: (amount: number) => void;
}

const CHANNELS_META: Array<{
  id: ChatChannelId;
  titleFa: string;
  titleEn: string;
  badge: string;
}> = [
  {
    id: 'farsi_english_exchange',
    titleFa: '۱. تمرین مکالمه فارسی-انگلیسی (سه‌خطی)',
    titleEn: 'Farsi ⇄ English Triple-Script Practice',
    badge: '🇮🇷⇄🇬🇧'
  },
  {
    id: 'ableway_city_council',
    titleFa: '۲. شورای شهروندان AbleWay City و زمین‌ها',
    titleEn: 'AbleWay City Council & Land Deeds',
    badge: '🏛️'
  },
  {
    id: 'mind_sports_leagues',
    titleFa: '۳. هماهنگی ۸ لیگ ورزش‌های فکری خانوادگی',
    titleEn: '8 Mind Sports Leagues Matchmaking',
    badge: '🏆'
  },
  {
    id: 'dynasty_and_heba30',
    titleFa: '۴. فامیل‌ها، خاندان‌ها و هبه ۳۰٪',
    titleEn: 'Global Dynasties & 30% Heba Gifts',
    badge: '💝'
  },
  {
    id: 'credit850_and_visa',
    titleFa: '۵. مشاوره کردیت ۸۵۰، وام و سفارت ۵ کشور',
    titleEn: '850 Credit Clinic & 5-Embassy Visa Lounge',
    badge: '💳'
  }
];

export const GlobalLiveChat5Channel: React.FC<GlobalLiveChat5ChannelProps> = ({ onEarnLingous }) => {
  const [activeChannel, setActiveChannel] = useState<ChatChannelId>('farsi_english_exchange');
  const [channelsData, setChannelsData] = useState<Record<ChatChannelId, ServerChatMessage[]>>({
    farsi_english_exchange: [],
    ableway_city_council: [],
    mind_sports_leagues: [],
    dynasty_and_heba30: [],
    credit850_and_visa: []
  });
  const [onlineCount, setOnlineCount] = useState<number>(18);
  const [senderName, setSenderName] = useState<string>('Citizen (AbleWay)');
  const [countryFlag, setCountryFlag] = useState<string>('🇺🇸');
  const [messageInput, setMessageInput] = useState<string>('');

  // Connect to Server-Authoritative Real-Time SSE Stream (/api/chat/stream)
  useEffect(() => {
    let es: EventSource | null = null;
    try {
      es = new EventSource('/api/chat/stream');
      es.onmessage = (ev) => {
        try {
          const parsed = JSON.parse(ev.data);
          if (parsed.type === 'init' && parsed.channels) {
            setChannelsData(parsed.channels);
            if (parsed.onlineCount) setOnlineCount(parsed.onlineCount);
          } else if (parsed.type === 'message:created' && parsed.message) {
            const msg: ServerChatMessage = parsed.message;
            setChannelsData((prev) => {
              const list = prev[msg.channelId] || [];
              if (list.some((m) => m.id === msg.id)) return prev;
              return {
                ...prev,
                [msg.channelId]: [msg, ...list]
              };
            });
          }
        } catch {}
      };
    } catch {}

    // Also fetch initial state as fallback
    fetch('/api/chat/state')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.channels) setChannelsData(data.channels);
        if (data?.onlineCount) setOnlineCount(data.onlineCount);
      })
      .catch(() => {});

    return () => {
      try {
        es?.close();
      } catch {}
    };
  }, []);

  const handleSendMessage = async () => {
    const clean = messageInput.trim();
    if (!clean) return;
    sound.playClick();
    setMessageInput('');

    const msgId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const fing = transliteratePersianToFingilish(clean);
    const optimisticMsg: ServerChatMessage = {
      id: msgId,
      channelId: activeChannel,
      senderName: senderName.trim() || 'Citizen',
      senderRole: 'Dynasty Founder',
      countryFlag,
      textFa: clean,
      textFingilish: fing,
      textEn: clean,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    // Optimistic update with idempotency
    setChannelsData((prev) => {
      const list = prev[activeChannel] || [];
      if (list.some((m) => m.id === msgId)) return prev;
      return {
        ...prev,
        [activeChannel]: [optimisticMsg, ...list]
      };
    });

    try {
      await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(optimisticMsg)
      });
      onEarnLingous(10);
    } catch {}
  };

  const currentMessages = channelsData[activeChannel] || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-950 text-white p-6 sm:p-8 border-2 border-amber-400 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
              <MessageSquare className="w-4 h-4" />
              <span>💬 MODULE 6: 5-CHANNEL REAL-TIME SERVER-CONNECTED GLOBAL LIVE CHAT</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 pt-1">
              تالار چت عمومی زنده جهانی ۵ کاناله (متصل به سرور برای شهروندان AbleWay City در آمریکا، اروپا، کانادا، استرالیا و ایران)
            </h2>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 font-black text-xs flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>🟢 {onlineCount} شهروند آنلاین در ۵ کانال</span>
          </div>
        </div>

        {/* 5 Channel Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 pt-2">
          {CHANNELS_META.map((ch) => {
            const isSelected = activeChannel === ch.id;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveChannel(ch.id);
                }}
                className={`p-3 rounded-2xl border-2 text-right transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-white font-black shadow-md'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20 font-bold'
                }`}
              >
                <span className="text-xs block">{ch.badge} {ch.titleFa}</span>
                <span className="text-[10px] block opacity-85 mt-0.5" dir="ltr">{ch.titleEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Composer & Triple-Script Message Feed */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
          <div className="sm:col-span-3 flex gap-2">
            <select
              value={countryFlag}
              onChange={(e) => setCountryFlag(e.target.value)}
              className="px-2.5 py-2.5 rounded-xl border border-slate-300 text-xs font-black bg-slate-50"
            >
              <option value="🇺🇸">🇺🇸 USA</option>
              <option value="🇨🇦">🇨🇦 Canada</option>
              <option value="🇬🇧">🇬🇧 UK</option>
              <option value="🇩🇪">🇩🇪 Germany</option>
              <option value="🇦🇺">🇦🇺 Australia</option>
              <option value="🇮🇷">🇮🇷 Iran</option>
            </select>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="نام شما"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
            />
          </div>

          <div className="sm:col-span-7">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="پیام خود را به فارسی یا انگلیسی بنویسید (به صورت سه‌خطی و زنده در سرور منتشر می‌شود)..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={handleSendMessage}
              className="w-full h-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>ارسال زنده (+10 XP)</span>
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-3 pt-2">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{msg.countryFlag}</span>
                  <span className="text-xs sm:text-sm font-black text-amber-300">{msg.senderName}</span>
                  <span className="text-[11px] text-emerald-300">• {msg.senderRole}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => speakPersian(msg.textFa, 0.85, msg.textFingilish)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>🔊 فارسی</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => speakEnglish(msg.textEn, 0.88)}
                    className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold"
                  >
                    🔊 EN
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono">{msg.timestamp}</span>
                </div>
              </div>

              {/* Triple-Script Message Display */}
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-black text-white" dir="rtl">
                  🇮🇷 {msg.textFa}
                </p>
                <p className="text-xs font-mono text-emerald-300" dir="ltr">
                  🗣️ Fingilish: "{msg.textFingilish}"
                </p>
                {msg.textEn && msg.textEn !== msg.textFa && (
                  <p className="text-xs text-slate-300" dir="ltr">
                    🇬🇧 "{msg.textEn}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
