import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Volume2,
  Users,
  Globe,
  ShieldCheck,
  Languages
} from 'lucide-react';
import { sound, speakPersian, speakEnglish, speakRussian, transliteratePersianToFingilish } from '../utils/audio';

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

// The 5 Language & Script Community Chat Rooms mapped to our 5 real-time server channels
const CHANNELS_META: Array<{
  id: ChatChannelId;
  roomTitleNative: string;
  roomTitleFa: string;
  roomSubtitle: string;
  badge: string;
  inputDir: 'rtl' | 'ltr';
  placeholder: string;
}> = [
  {
    id: 'farsi_english_exchange',
    roomTitleNative: '1. Толори Тоҷикӣ (Кириллӣ)',
    roomTitleFa: '۱. اتاق چت اختصاصی تاجیکان به خط سیریلیک (Толори Тоҷикӣ)',
    roomSubtitle: 'Душанбе, Хуҷанд, Кӯлоб ва Бадахшон • LTR Cyrillic Keyboard',
    badge: '🇹🇯',
    inputDir: 'ltr',
    placeholder: 'Паёми худро ба хати кириллӣ (Тоҷикӣ) нависед...'
  },
  {
    id: 'ableway_city_council',
    roomTitleNative: '2. Oʻzbekcha Xona (Samarqand & Buxoro)',
    roomTitleFa: '۲. اتاق چت اختصاصی ازبک‌ها به خط ازبکی (Oʻzbekcha Xona)',
    roomSubtitle: 'Samarqand, Buxoro, Toshkent va Xiva • LTR Uzbek Script',
    badge: '🇺🇿',
    inputDir: 'ltr',
    placeholder: 'Xabaringizni oʻzbek tilida yozing (Samarqand, Buxoro, Toshkent)...'
  },
  {
    id: 'mind_sports_leagues',
    roomTitleNative: '۳. اتاق چت فارسی‌زبانان (ایران و افغانستان)',
    roomTitleFa: '۳. اتاق چت فارسی‌زبانان (تهران، کابل، هرات، بلخ و شیراز)',
    roomSubtitle: 'خط فارسی و دری • جهت راست‌به‌چپ (RTL Persian/Dari)',
    badge: '🇮🇷🇦🇫',
    inputDir: 'rtl',
    placeholder: 'پیام خود را به خط شیرین فارسی یا دری بنویسید...'
  },
  {
    id: 'dynasty_and_heba30',
    roomTitleNative: '4. English Practice Room (International)',
    roomTitleFa: '۴. اتاق چت انگلیسی و بین‌المللی (English Practice Room)',
    roomSubtitle: 'USA, Canada, UK, Europe & Australia • LTR English',
    badge: '🇺🇸🇬🇧',
    inputDir: 'ltr',
    placeholder: 'Write your message in English to practice with global citizens...'
  },
  {
    id: 'credit850_and_visa',
    roomTitleNative: '5. ქართული და Русский Зал (Georgia & Russian)',
    roomTitleFa: '۵. اتاق چت گرجی و روس‌زبانان (تفلیس و ۲۵۰ میلیون روس‌زبان)',
    roomSubtitle: 'თბილისი (ქართული) • Русскоязычный Мир • LTR Script',
    badge: '🇬🇪🇷🇺',
    inputDir: 'ltr',
    placeholder: 'Напишите сообщение на русском или грузинском (ქართული)...'
  }
];

const SEED_COMMUNITY_MESSAGES: Record<ChatChannelId, ServerChatMessage[]> = {
  farsi_english_exchange: [
    {
      id: 'seed_tg_1',
      channelId: 'farsi_english_exchange',
      senderName: 'Рустам аз Душанбе',
      senderRole: 'Сафири Фарҳанг (سفیر فرهنگی)',
      countryFlag: '🇹🇯',
      textFa: 'Салом ба ҳамаи бародарону хоҳарони ҳамреша! Ман ифтихор мекунам, ки тоҷик ва эрониам!',
      textFingilish: 'Salom ba hamai barodaronu khoharoni hamresha! Man iftikhor mekunam, ki tojik va eroniam!',
      textEn: 'سلام به همه برادران و خواهران هم‌ریشه! من افتخار می‌کنم که تاجیک و ایرانی‌ام! | Hello to all brothers and sisters of shared roots!',
      timestamp: 'آنلاین'
    }
  ],
  ableway_city_council: [
    {
      id: 'seed_uz_1',
      channelId: 'ableway_city_council',
      senderName: 'Ulugʻbek (Samarqand)',
      senderRole: 'Samarqand Senator',
      countryFlag: '🇺🇿',
      textFa: 'Assalomu alaykum aziz doʻstlar! Samarqand va Buxorodan barcha Eron va Tojikiston ahliga alangali salom!',
      textFingilish: 'Assalomu alaykum aziz dostlar! Samarqand va Buxorodan salom!',
      textEn: 'سلام بر دوستان عزیز! از سمرقند و بخارا به همه مردم ایران و تاجیکستان درود گرم می‌فرستم! | Warm greetings from Samarkand and Bukhara!',
      timestamp: 'آنلاین'
    }
  ],
  mind_sports_leagues: [
    {
      id: 'seed_fa_1',
      channelId: 'mind_sports_leagues',
      senderName: 'سهراب و ملالی (تهران و هرات)',
      senderRole: 'مؤسس فامیل در شهر توانا',
      countryFlag: '🇮🇷',
      textFa: 'درود بر همه هم‌زبانان عزیز از تهران و شیراز تا هرات، بلخ و کابل! چقدر زیباست که همه در شهر توانا کنار هم هستیم.',
      textFingilish: 'Dorood bar hameh ham-zabānān-e aziz az Tehrān o Shirāz tā Herāt, Balkh o Kābol!',
      textEn: 'Greetings to all dear fellow Persian speakers from Tehran and Shiraz to Herat, Balkh, and Kabul!',
      timestamp: 'آنلاین'
    }
  ],
  dynasty_and_heba30: [
    {
      id: 'seed_en_1',
      channelId: 'dynasty_and_heba30',
      senderName: 'Aria (Los Angeles & Toronto)',
      senderRole: 'Citizen Pioneer',
      countryFlag: '🇺🇸',
      textFa: 'Welcome to the English Practice Room! Feel free to write in English and click "Translate Message" anytime.',
      textFingilish: 'Welcome to the English Practice Room!',
      textEn: 'به اتاق تمرین انگلیسی خوش آمدید! به راحتی به انگلیسی بنویسید و در هر زمان دکمه «ترجمه فوری پیام» را بزنید.',
      timestamp: 'آنلاین'
    }
  ],
  credit850_and_visa: [
    {
      id: 'seed_ka_1',
      channelId: 'credit850_and_visa',
      senderName: 'Гиорги (Тбилиси / თბილისი)',
      senderRole: 'Посол Культуры (سفیر تفلیس)',
      countryFlag: '🇬🇪',
      textFa: 'გამარჯობა თბილისიდან! Привет из солнечного Тбилиси! Мы очень любим персидскую культуру и поэзию Руми и Хафиза.',
      textFingilish: 'Gamarjoba Tbilisidan! Privet iz solnechnogo Tbilisi!',
      textEn: 'درود از تفلیس آفتابی! ما فرهنگ ایرانی و شعر مولانا و حافظ را بسیار دوست داریم. | Greetings from sunny Tbilisi!',
      timestamp: 'آنلاین'
    }
  ]
};

// Automatic Ethical Filter to keep all rooms 100% respectful and educational
const sanitizeEthicalMessage = (raw: string): { clean: string; filtered: boolean } => {
  const blockedPatterns = /\b(fuck|shit|bitch|asshole|احمق|بیشعور|کثافت)\b/gi;
  const filtered = blockedPatterns.test(raw);
  const clean = raw.replace(blockedPatterns, '🌷 [محترمانه]');
  return { clean, filtered };
};

export const GlobalLiveChat5Channel: React.FC<GlobalLiveChat5ChannelProps> = ({ onEarnLingous }) => {
  const [activeChannel, setActiveChannel] = useState<ChatChannelId>('farsi_english_exchange');
  const [channelsData, setChannelsData] = useState<Record<ChatChannelId, ServerChatMessage[]>>(SEED_COMMUNITY_MESSAGES);
  const [onlineCount, setOnlineCount] = useState<number>(24);
  const [senderName, setSenderName] = useState<string>('S. Ali-Miri');
  const [countryFlag, setCountryFlag] = useState<string>('🇹🇯');
  const [messageInput, setMessageInput] = useState<string>('');
  const [ethicalFilterNotice, setEthicalFilterNotice] = useState<string | null>(null);
  const [translatedMessages, setTranslatedMessages] = useState<Record<string, string>>({});
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  const currentRoomMeta = CHANNELS_META.find((c) => c.id === activeChannel) || CHANNELS_META[0];

  // Connect to Server-Authoritative Real-Time SSE Stream (/api/chat/stream)
  useEffect(() => {
    let es: EventSource | null = null;
    try {
      es = new EventSource('/api/chat/stream');
      es.onmessage = (ev) => {
        try {
          const parsed = JSON.parse(ev.data);
          if (parsed.type === 'init' && parsed.channels) {
            setChannelsData((prev) => ({
              farsi_english_exchange: [...SEED_COMMUNITY_MESSAGES.farsi_english_exchange, ...(parsed.channels.farsi_english_exchange || [])],
              ableway_city_council: [...SEED_COMMUNITY_MESSAGES.ableway_city_council, ...(parsed.channels.ableway_city_council || [])],
              mind_sports_leagues: [...SEED_COMMUNITY_MESSAGES.mind_sports_leagues, ...(parsed.channels.mind_sports_leagues || [])],
              dynasty_and_heba30: [...SEED_COMMUNITY_MESSAGES.dynasty_and_heba30, ...(parsed.channels.dynasty_and_heba30 || [])],
              credit850_and_visa: [...SEED_COMMUNITY_MESSAGES.credit850_and_visa, ...(parsed.channels.credit850_and_visa || [])]
            }));
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

    return () => {
      try {
        es?.close();
      } catch {}
    };
  }, []);

  const handleSendMessage = async () => {
    const raw = messageInput.trim();
    if (!raw) return;
    sound.playClick();

    const { clean, filtered } = sanitizeEthicalMessage(raw);
    if (filtered) {
      setEthicalFilterNotice('🛡️ فیلتر اخلاقی خودکار شهر توانا: کلمات نامناسب به صورت خودکار تلطیف شدند تا محیطی محترمانه و آموزشی حفظ شود.');
      setTimeout(() => setEthicalFilterNotice(null), 4000);
    }
    setMessageInput('');

    const msgId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const fing = transliteratePersianToFingilish(clean);
    const optimisticMsg: ServerChatMessage = {
      id: msgId,
      channelId: activeChannel,
      senderName: senderName.trim() || 'Citizen',
      senderRole: 'Шаҳрванд / شهروند شهر توانا',
      countryFlag,
      textFa: clean,
      textFingilish: fing,
      textEn: clean,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

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

  // Instant Message Translation Button Handler ("ترجمه فوری پیام")
  const handleInstantTranslateMessage = async (msg: ServerChatMessage) => {
    sound.playClick();
    if (translatedMessages[msg.id]) return;
    setTranslatingId(msg.id);
    try {
      const resp = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: msg.textFa,
          sourceLang: 'auto',
          targetLang: 'fa',
          domain: 'community_chat_instant_translation'
        })
      });
      if (resp.ok) {
        const data = await resp.json();
        const tr = data?.translation || msg.textEn || msg.textFa;
        setTranslatedMessages((prev) => ({
          ...prev,
          [msg.id]: `🇮🇷 ترجمه فارسی/انگلیسی: ${tr} (${msg.textEn})`
        }));
      } else {
        setTranslatedMessages((prev) => ({
          ...prev,
          [msg.id]: `🌐 ترجمه فوری: ${msg.textEn || msg.textFa}`
        }));
      }
    } catch {
      setTranslatedMessages((prev) => ({
        ...prev,
        [msg.id]: `🌐 ترجمه فوری: ${msg.textEn || msg.textFa}`
      }));
    } finally {
      setTranslatingId(null);
      onEarnLingous(5);
    }
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
              <span>💬 COMMUNITY &amp; LANGUAGE CHAT ROOMS • بخش تالارهای گفتگو و جوامع زبانی تفکیک‌شده</span>
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-amber-300 pt-1">
              جامعه و گفتگو (Community Hub): ۵ اتاق چت مجزا بر اساس زبان و خط کاربر + ترجمه فوری پیام و فیلتر اخلاقی
            </h2>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 font-black text-xs flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>🟢 {onlineCount} هم‌ریشه آنلاین در ۵ تالار</span>
          </div>
        </div>

        {/* 5 Language-Specific Room Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-2">
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
                className={`p-3.5 rounded-2xl border-2 text-right transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-white font-black shadow-lg'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20 font-bold'
                }`}
              >
                <span className="text-xs font-black block" dir="ltr">
                  {ch.badge} {ch.roomTitleNative}
                </span>
                <span className="text-[11px] block mt-1">{ch.roomTitleFa}</span>
                <span className="text-[10px] block opacity-80 mt-1" dir="ltr">
                  {ch.roomSubtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Room Info & Ethical Filter Badge */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {currentRoomMeta.badge} {currentRoomMeta.roomTitleFa}
            </h3>
            <p className="text-xs text-slate-500" dir="ltr">
              {currentRoomMeta.roomTitleNative} • Direction: {currentRoomMeta.inputDir.toUpperCase()}
            </p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-black flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>فیلتر اخلاقی خودکار فعال • دکمه ترجمه فوری کنار هر پیام</span>
          </span>
        </div>

        {ethicalFilterNotice && (
          <div className="p-3 rounded-2xl bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black">
            {ethicalFilterNotice}
          </div>
        )}

        {/* Composer with Automatic RTL / LTR Script Direction */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
          <div className="sm:col-span-3 flex gap-2">
            <select
              value={countryFlag}
              onChange={(e) => setCountryFlag(e.target.value)}
              className="px-2.5 py-2.5 rounded-xl border border-slate-300 text-xs font-black bg-slate-50"
            >
              <option value="🇹🇯">🇹🇯 Тоҷикистон</option>
              <option value="🇺🇿">🇺🇿 Oʻzbekiston</option>
              <option value="🇮🇷">🇮🇷 ایران</option>
              <option value="🇦🇫">🇦🇫 افغانستان</option>
              <option value="🇬🇪">🇬🇪 საქართველო</option>
              <option value="🇷🇺">🇷🇺 Россия</option>
              <option value="🇺🇸">🇺🇸 USA</option>
              <option value="🇨🇦">🇨🇦 Canada</option>
              <option value="🇪🇺">🇪🇺 Europe</option>
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
              dir={currentRoomMeta.inputDir}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={currentRoomMeta.placeholder}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-teal-500/40 focus:border-teal-600 text-xs sm:text-sm font-bold outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={handleSendMessage}
              className="w-full h-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>ارسال پیام (+10 XP)</span>
            </button>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="space-y-3 pt-2">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{msg.countryFlag}</span>
                  <span className="text-xs sm:text-sm font-black text-amber-300">{msg.senderName}</span>
                  <span className="text-[11px] text-emerald-300">• {msg.senderRole}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Instant Translate Message Button */}
                  <button
                    type="button"
                    onClick={() => handleInstantTranslateMessage(msg)}
                    className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-black flex items-center gap-1 shadow-xs"
                  >
                    <Languages className="w-3.5 h-3.5" />
                    <span>
                      {translatingId === msg.id ? 'در حال ترجمه...' : '🌐 ترجمه فوری پیام (Translate Message)'}
                    </span>
                  </button>

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
                    onClick={() => speakRussian(msg.textFa, 0.85)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-black"
                  >
                    🔊 Кириллӣ
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

              {/* Message Text in Room Direction */}
              <div className="space-y-1.5">
                <p
                  className="text-sm sm:text-base font-black text-white leading-relaxed"
                  dir={currentRoomMeta.inputDir}
                >
                  {msg.textFa}
                </p>
                {translatedMessages[msg.id] && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-400/50 text-xs font-bold text-amber-200" dir="auto">
                    {translatedMessages[msg.id]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
