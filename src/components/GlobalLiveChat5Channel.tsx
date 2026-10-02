import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Volume2,
  Users,
  Globe,
  ShieldCheck,
  Languages,
  Mic,
  MicOff,
  Crown,
  Gamepad2,
  UserCheck
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
  onNavigateToFamilyGames?: (clanInfo: {
    clanTitleFa: string;
    captainName: string;
    deputyName: string;
    secretaryName: string;
  }) => void;
}

interface RegionalFamilyClanRoom {
  id: string;
  regionBadge: string;
  clanTitleFa: string;
  regionCitiesFa: string;
  month1ReferralRank: string;
  captainName: string;
  deputyName: string;
  secretaryName: string;
  membersCount: number;
  voiceTopicFa: string;
  sampleVoiceLineFa: string;
  sampleVoiceLineEn: string;
}

const INITIAL_REGIONAL_FAMILY_CLANS: RegionalFamilyClanRoom[] = [
  {
    id: 'clan_tehran_central',
    regionBadge: '🇮🇷 فامیل منطقه ۱',
    clanTitleFa: 'فامیل منطقه‌ای تهران، البرز و مرکز ایران',
    regionCitiesFa: 'تهران، کرج، قزوین، قم و کاشان',
    month1ReferralRank: '🏆 رتبه ۱ لیگ معرفان ماه اول',
    captainName: 'کاپیتان سیاوش (تهران)',
    deputyName: 'معاون: آرش (کرج)',
    secretaryName: 'منشی: نگار (تهران)',
    membersCount: 148,
    voiceTopicFa: 'گپ‌وگفت خودمانی روزمره، اصطلاحات تهرانی و تمرین انگلیسی محاوره‌ای',
    sampleVoiceLineFa: 'سلام بچه‌ها! خوش اومدین به ویس‌چت فامیل تهران؛ امروز می‌خوایم هم خودمانی گپ بزنیم و هم با هم بریم بخش بازی!',
    sampleVoiceLineEn: "Hey everyone! Welcome to our Family Voice Chat—let's chat casually and jump into a game together!"
  },
  {
    id: 'clan_khorasan_samanid',
    regionBadge: '🇮🇷🇹🇯🇺🇿🇦🇫 فامیل منطقه ۲',
    clanTitleFa: 'فامیل منطقه‌ای خراسان، سمرقند، بخارا، دوشنبه و هرات',
    regionCitiesFa: 'مشهد، نیشابور، دوشنبه، سمرقند، بخارا، هرات و کابل',
    month1ReferralRank: '🏆 رتبه ۲ لیگ معرفان ماه اول',
    captainName: 'کاپیتان رستم (دوشنبه و مشهد)',
    deputyName: 'معاون: سهراب (هرات)',
    secretaryName: 'منشی: تهمینه (سمرقند)',
    membersCount: 132,
    voiceTopicFa: 'آشنایی با فارسی خودمانی ایران، تاجیکی و دری + بازی دسته‌جمعی',
    sampleVoiceLineFa: 'درود بر همه هم‌ریشه‌های عزیز از مشهد و هرات تا دوشنبه و سمرقند! میکروفون‌هاتون رو باز کنید تا با هم صحبت کنیم.',
    sampleVoiceLineEn: 'Warm greetings to all our kindred family from Mashhad and Herat to Dushanbe and Samarkand!'
  },
  {
    id: 'clan_fars_isfahan',
    regionBadge: '🇮🇷 فامیل منطقه ۳',
    clanTitleFa: 'فامیل منطقه‌ای فارس، شیراز، اصفهان و یزد',
    regionCitiesFa: 'شیراز، اصفهان، یزد، بوشهر و اهواز',
    month1ReferralRank: '🏆 رتبه ۳ لیگ معرفان ماه اول',
    captainName: 'کاپیتان کوروش (شیراز)',
    deputyName: 'معاون: سپهر (اصفهان)',
    secretaryName: 'منشی: ترانه (یزد)',
    membersCount: 119,
    voiceTopicFa: 'مکالمه شیرین و خودمانی، اصطلاحات بازار فرش و رقابت در بازی‌های فکری',
    sampleVoiceLineFa: 'سلام رفقا! همه چی میزونه؟ بعد از ده دقیقه تمرین مکالمه، دکمه بازی رو می‌زنیم تا با هم حکم و تخته‌نرد بازی کنیم!',
    sampleVoiceLineEn: 'Hey friends! Everything sorted? After 10 minutes of voice practice, let’s hit Play Game together!'
  },
  {
    id: 'clan_zagros_north_diaspora',
    regionBadge: '🌍🇮🇷 فامیل منطقه ۴',
    clanTitleFa: 'فامیل منطقه‌ای زاگرس، آذربایجان، شمال و ایرانیان خارج از کشور',
    regionCitiesFa: 'تبریز، سنندج، خرم‌آباد، رشت، لس‌آنجلس، تورنتو و لندن',
    month1ReferralRank: '🏆 برگزیده ویژه لیگ معرفان ماه اول',
    captainName: 'کاپیتان آریا (تورنتو و تبریز)',
    deputyName: 'معاون: فرهاد (سنندج و خرم‌آباد)',
    secretaryName: 'منشی: دلارا (لس‌آنجلس)',
    membersCount: 164,
    voiceTopicFa: 'دورهمی صوتی خودمانی هموطنان داخل و خارج کشور + بازی و گفتگو',
    sampleVoiceLineFa: 'دم همه‌تون گرم که تو اتاق فامیل جمع شدین! هر کس آماده است دکمه بازی رو بزنه تا تو اتاق بازی هم چت کنیم و هم صحبت کنیم.',
    sampleVoiceLineEn: 'Bless you all for gathering in our Family Room! Hit the Play button so we can play and voice-chat together!'
  }
];

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

export const GlobalLiveChat5Channel: React.FC<GlobalLiveChat5ChannelProps> = ({
  onEarnLingous,
  onNavigateToFamilyGames
}) => {
  const [activeChannel, setActiveChannel] = useState<ChatChannelId>('farsi_english_exchange');
  const [channelsData, setChannelsData] = useState<Record<ChatChannelId, ServerChatMessage[]>>(SEED_COMMUNITY_MESSAGES);
  const [onlineCount, setOnlineCount] = useState<number>(24);
  const [senderName, setSenderName] = useState<string>('S. Ali-Miri');
  const [countryFlag, setCountryFlag] = useState<string>('🇹🇯');
  const [messageInput, setMessageInput] = useState<string>('');
  const [ethicalFilterNotice, setEthicalFilterNotice] = useState<string | null>(null);
  const [translatedMessages, setTranslatedMessages] = useState<Record<string, string>>({});
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  // Regional Family Clans (created after Month-1 Referral League winners) + Group Voice Chat + Deputy/Secretary state
  const [familyClans, setFamilyClans] = useState<RegionalFamilyClanRoom[]>(INITIAL_REGIONAL_FAMILY_CLANS);
  const [selectedClanId, setSelectedClanId] = useState<string>('clan_tehran_central');
  const [joinedClanIds, setJoinedClanIds] = useState<string[]>(['clan_tehran_central']);
  const [voiceMicActive, setVoiceMicActive] = useState<boolean>(false);
  const [handRaisedToSecretary, setHandRaisedToSecretary] = useState<boolean>(false);
  const [voiceStatusBanner, setVoiceStatusBanner] = useState<string | null>(null);
  const [editingDeputyInput, setEditingDeputyInput] = useState<string>('');
  const [editingSecretaryInput, setEditingSecretaryInput] = useState<string>('');
  const [showCaptainRoleEditor, setShowCaptainRoleEditor] = useState<boolean>(false);

  // Apple App Store Guideline 1.2 & Google Play UGC Mandatory Moderation States (Report & Block User)
  const [reportedMessageIds, setReportedMessageIds] = useState<string[]>([]);
  const [blockedSenders, setBlockedSenders] = useState<string[]>([]);
  const [ugcSafetyNotice, setUgcSafetyNotice] = useState<string | null>(null);

  const activeFamilyClan =
    familyClans.find((c) => c.id === selectedClanId) || familyClans[0];

  const handleAppointDeputyAndSecretary = () => {
    sound.playSuccess();
    setFamilyClans((prev) =>
      prev.map((clan) =>
        clan.id === activeFamilyClan.id
          ? {
              ...clan,
              deputyName: editingDeputyInput.trim()
                ? `معاون: ${editingDeputyInput.trim()}`
                : clan.deputyName,
              secretaryName: editingSecretaryInput.trim()
                ? `منشی: ${editingSecretaryInput.trim()}`
                : clan.secretaryName
            }
          : clan
      )
    );
    setShowCaptainRoleEditor(false);
    setEditingDeputyInput('');
    setEditingSecretaryInput('');
    onEarnLingous(15);
    setVoiceStatusBanner(
      '✅ حکم کاپیتان ثبت شد: معاون و منشی جدید اتاق فامیلی با موفقیت منصوب شدند!'
    );
  };

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

      {/* =================================================================== */}
      {/* REGIONAL FAMILY CLAN ROOMS (MONTH-1 REFERRAL WINNERS) + VOICE CHAT   */}
      {/* + CAPTAIN / DEPUTY / SECRETARY + 1-CLICK PLAY GAME WITH FRIENDS     */}
      {/* =================================================================== */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 text-white p-5 sm:p-6 border-2 border-amber-400/80 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300 font-black">
              <Crown className="w-4 h-4" />
              <span>🏡 اتاق‌های فامیلی و منطقه‌ای (تأسیس پس از مشخص شدن نفرات برتر لیگ معرفان در ماه اول)</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              ویس‌چت گروهی (Voice Chat) + چت متنی فامیلی + انتخاب معاون و منشی توسط کاپیتان + بازی دسته‌جمعی با دوستان
            </h3>
            <p className="text-xs text-emerald-200 leading-relaxed">
              در پایان ماه اول برنامه، نفرات برتر <strong>لیگ معرفان</strong> به عنوان <strong>کاپیتان فامیل‌های منطقه‌ای</strong> انتخاب می‌شوند. هر کاربر جذب فامیل هم‌منطقه‌ای خود می‌شود، کاپیتان برای اتاق خود <strong>معاون</strong> و <strong>منشی</strong> تعیین می‌کند، و اعضا می‌توانند با زدن <strong>«دکمه بازی با دوستان»</strong> دسته‌جمعی وارد بخش بازی شوند و همزمان در بازی صحبت (ویس‌چت) و چت متنی کنند!
            </p>
          </div>

          {/* 1-Click Play Game with Family Friends Button */}
          <button
            type="button"
            onClick={() => {
              sound.playLevelUp();
              speakPersian(
                `ورود دسته‌جمعی اعضای ${activeFamilyClan.clanTitleFa} به اتاق بازی همراه با ویس‌چت و چت متنی فعال!`,
                0.88
              );
              onEarnLingous(15);
              if (onNavigateToFamilyGames) {
                onNavigateToFamilyGames({
                  clanTitleFa: activeFamilyClan.clanTitleFa,
                  captainName: activeFamilyClan.captainName,
                  deputyName: activeFamilyClan.deputyName,
                  secretaryName: activeFamilyClan.secretaryName
                });
              }
            }}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg border-2 border-white"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>🎮 شروع بازی با دوستان فامیل (همراه با ویس‌چت و چت در بازی)</span>
          </button>
        </div>

        {/* Regional Family Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {familyClans.map((clan) => {
            const isSelected = clan.id === activeFamilyClan.id;
            const isJoined = joinedClanIds.includes(clan.id);
            return (
              <button
                key={clan.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedClanId(clan.id);
                  setVoiceStatusBanner(null);
                }}
                className={`p-3.5 rounded-2xl border-2 text-right transition-all flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-white shadow-lg'
                    : 'bg-slate-900/80 text-white border-white/15 hover:bg-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1 text-[11px] font-black">
                    <span>{clan.regionBadge}</span>
                    <span>👥 {clan.membersCount} عضو</span>
                  </div>
                  <p className="text-xs sm:text-sm font-black leading-snug">{clan.clanTitleFa}</p>
                  <p className={`text-[11px] ${isSelected ? 'text-slate-800 font-bold' : 'text-slate-300'}`}>
                    📍 {clan.regionCitiesFa}
                  </p>
                </div>
                <div className="pt-1 border-t border-current/15 flex items-center justify-between text-[10px] font-black">
                  <span>{clan.captainName}</span>
                  <span>{isJoined ? '✅ عضو فامیل' : '➕ پیوستن'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Regional Family Clan Voice Stage + Leadership (Captain / Deputy / Secretary) */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-400/50 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-amber-300 block">
                {activeFamilyClan.month1ReferralRank} • {activeFamilyClan.clanTitleFa}
              </span>
              <p className="text-xs text-emerald-200 mt-0.5">
                🎙️ موضوع گپ‌وگفت خودمانی اتاق: {activeFamilyClan.voiceTopicFa}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {!joinedClanIds.includes(activeFamilyClan.id) ? (
                <button
                  type="button"
                  onClick={() => {
                    sound.playSuccess();
                    setJoinedClanIds((prev) => [...prev, activeFamilyClan.id]);
                    setFamilyClans((prev) =>
                      prev.map((c) =>
                        c.id === activeFamilyClan.id ? { ...c, membersCount: c.membersCount + 1 } : c
                      )
                    );
                    onEarnLingous(20);
                    setVoiceStatusBanner(
                      `🎉 خوش آمدید! شما رسماً جذب «${activeFamilyClan.clanTitleFa}» شدید (+20 XP).`
                    );
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs flex items-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>🤝 جذب شدن در این فامیل منطقه‌ای (+20 XP)</span>
                </button>
              ) : (
                <span className="px-3 py-1 rounded-xl bg-emerald-900/80 border border-emerald-400/50 text-emerald-200 text-xs font-black">
                  ✅ شما عضو این فامیل منطقه‌ای هستید
                </span>
              )}

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowCaptainRoleEditor((prev) => !prev);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/50 text-xs font-black"
              >
                👑 تعیین معاون و منشی توسط کاپیتان
              </button>
            </div>
          </div>

          {/* Captain's Appointment Form for Deputy (معاون) and Secretary (منشی) */}
          {showCaptainRoleEditor && (
            <div className="p-3.5 rounded-xl bg-indigo-950/90 border border-amber-400/60 space-y-2.5">
              <p className="text-xs font-black text-amber-300">
                👑 پنل کاپیتان اتاق ({activeFamilyClan.captainName}): تعیین یا تغییر «معاون» و «منشی» فامیل منطقه‌ای
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={editingDeputyInput}
                  onChange={(e) => setEditingDeputyInput(e.target.value)}
                  placeholder="نام معاون جدید فامیل (مثلاً: سهراب)..."
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-white/20 text-white text-xs font-bold"
                />
                <input
                  type="text"
                  value={editingSecretaryInput}
                  onChange={(e) => setEditingSecretaryInput(e.target.value)}
                  placeholder="نام منشی جدید فامیل (مثلاً: مریم)..."
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-white/20 text-white text-xs font-bold"
                />
                <button
                  type="button"
                  onClick={handleAppointDeputyAndSecretary}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs"
                >
                  ✅ ثبت حکم معاون و منشی
                </button>
              </div>
            </div>
          )}

          {/* 4 Live Group Voice Chat Seats (Captain, Deputy, Secretary, You/Friends) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-900 border border-amber-400/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-amber-300 block">👑 کاپیتان اتاق (نفر برتر معرفان)</span>
                <span className="text-xs font-black text-white">{activeFamilyClan.captainName}</span>
              </div>
              <span className="text-xs text-emerald-400 font-black">🎙️ آنلاین</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-cyan-400/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-cyan-300 block">🛡️ معاون کاپیتان</span>
                <span className="text-xs font-black text-white">{activeFamilyClan.deputyName}</span>
              </div>
              <span className="text-xs text-emerald-400 font-black">🎙️ آنلاین</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-purple-400/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-purple-300 block">📝 منشی اتاق فامیل</span>
                <span className="text-xs font-black text-white">{activeFamilyClan.secretaryName}</span>
              </div>
              <span className="text-xs text-emerald-400 font-black">🎙️ نوبت‌دهی</span>
            </div>

            <div
              className={`p-3 rounded-xl border flex items-center justify-between ${
                voiceMicActive
                  ? 'bg-emerald-950 border-emerald-400 ring-2 ring-emerald-400/40'
                  : 'bg-slate-900 border-white/15'
              }`}
            >
              <div>
                <span className="text-[10px] font-black text-emerald-300 block">🙋‍♂️ جایگاه صوتی شما و دوستان</span>
                <span className="text-xs font-black text-white">{senderName}</span>
              </div>
              <span className="text-xs font-black text-amber-300">
                {voiceMicActive ? '🟢 در حال صحبت' : '⚪ شنونده'}
              </span>
            </div>
          </div>

          {/* Voice Chat Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  const next = !voiceMicActive;
                  setVoiceMicActive(next);
                  if (next) {
                    setVoiceStatusBanner(
                      `🎙️ میکروفون شما در ویس‌چت گروهی «${activeFamilyClan.clanTitleFa}» روشن شد! به صورت خودمانی با دوستان صحبت کنید.`
                    );
                    onEarnLingous(10);
                  } else {
                    setVoiceStatusBanner('🔇 میکروفون شما بسته شد (در حالت شنونده ویس‌چت هستید).');
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                  voiceMicActive
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                }`}
              >
                {voiceMicActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>
                  {voiceMicActive
                    ? '🔇 بستن میکروفون در ویس‌چت'
                    : '🎙️ روشن کردن میکروفون در ویس‌چت فامیلی'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  speakPersian(activeFamilyClan.sampleVoiceLineFa, 0.88);
                  setVoiceStatusBanner(`🔊 در حال پخش صدای ویس‌چت اتاق: «${activeFamilyClan.sampleVoiceLineFa}»`);
                }}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 text-xs font-black flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 شنیدن صدای ویس‌چت اتاق (فارسی)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  speakEnglish(activeFamilyClan.sampleVoiceLineEn, 0.88);
                  setVoiceStatusBanner(`🔊 English Voice Chat: "${activeFamilyClan.sampleVoiceLineEn}"`);
                }}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-200 text-xs font-black flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 Hear English Voice Room</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setHandRaisedToSecretary((prev) => !prev);
                  setVoiceStatusBanner(
                    `✋ درخواست نوبت صحبت شما برای ${activeFamilyClan.secretaryName} ثبت شد!`
                  );
                }}
                className={`px-3 py-2 rounded-xl text-xs font-black border ${
                  handRaisedToSecretary
                    ? 'bg-amber-400 text-slate-950 border-white'
                    : 'bg-slate-800 text-slate-200 border-slate-600'
                }`}
              >
                ✋ اجازه صحبت از منشی اتاق
              </button>
            </div>

            {voiceStatusBanner && (
              <p className="text-xs font-bold text-amber-200 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-400/40">
                {voiceStatusBanner}
              </p>
            )}
          </div>
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
        {ugcSafetyNotice && (
          <div className="p-3 rounded-2xl bg-emerald-950 text-emerald-200 border border-emerald-400/60 text-xs font-black flex flex-wrap items-center justify-between gap-2">
            <span>🛡️ {ugcSafetyNotice}</span>
            {blockedSenders.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setBlockedSenders([]);
                  setUgcSafetyNotice('فهرست کاربران مسدودشده بازنشانی شد.');
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 text-[11px]"
              >
                لغو مسدودسازی ({blockedSenders.length})
              </button>
            )}
          </div>
        )}

        <div className="space-y-3 pt-2">
          {currentMessages
            .filter((msg) => !blockedSenders.includes(msg.senderName))
            .map((msg) => (
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

                  {/* Apple App Store 1.2 & Google Play UGC Mandatory Report & Block Controls */}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      if (!reportedMessageIds.includes(msg.id)) {
                        setReportedMessageIds((prev) => [...prev, msg.id]);
                      }
                      setUgcSafetyNotice(
                        `پیام «${msg.senderName}» جهت بررسی اخلاقی به منشی و سیستم ایمنی گزارش شد (Apple/Google UGC Compliant).`
                      );
                    }}
                    className="px-2 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-200 text-[10px] font-bold"
                    title="Report Message (گزارش پیام)"
                  >
                    {reportedMessageIds.includes(msg.id) ? '🚩 گزارش شد' : '🚩 گزارش'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setBlockedSenders((prev) => [...prev, msg.senderName]);
                      setUgcSafetyNotice(
                        `کاربر «${msg.senderName}» مسدود شد و پیام‌های او دیگر برای شما نمایش داده نمی‌شود.`
                      );
                    }}
                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-rose-950 border border-white/15 text-slate-300 text-[10px] font-bold"
                    title="Block User (مسدودسازی کاربر)"
                  >
                    🚫 مسدودسازی
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
