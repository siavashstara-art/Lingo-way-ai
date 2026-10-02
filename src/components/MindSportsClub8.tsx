import React, { useState } from 'react';
import {
  Trophy,
  Sparkles,
  Volume2,
  RotateCcw,
  Dice5,
  Award,
  CheckCircle2,
  Mic,
  MicOff,
  MessageSquare,
  Send,
  Users,
  ShieldAlert,
  Landmark,
  FileCheck2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound, speakPersian, speakEnglish, speakMultilingual } from '../utils/audio';

interface MindSportsClub8Props {
  onEarnLingous: (amount: number) => void;
  activeFamilyClanInfo?: {
    clanTitleFa: string;
    captainName: string;
    deputyName: string;
    secretaryName: string;
  } | null;
  onBackToFamilyRoom?: () => void;
}

type GameId =
  | 'quiz_duel'
  | 'uno_color8'
  | 'backgammon'
  | 'chess'
  | 'billiards_8ball'
  | 'ludo_mensch'
  | 'daberna_5lang'
  | 'hokm_spades'
  | 'math11_cards';

interface LeagueStanding {
  gameId: GameId;
  titleFa: string;
  titleEn: string;
  icon: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | 'Grandmaster';
  points: number;
}

const NUMBER_WORDS_5LANG: Record<number, { fa: string; en: string; es: string; fr: string; de: string }> = {
  1: { fa: 'یک', en: 'One', es: 'Uno', fr: 'Un', de: 'Eins' },
  2: { fa: 'دو', en: 'Two', es: 'Dos', fr: 'Deux', de: 'Zwei' },
  3: { fa: 'سه', en: 'Three', es: 'Tres', fr: 'Trois', de: 'Drei' },
  4: { fa: 'چهار', en: 'Four', es: 'Cuatro', fr: 'Quatre', de: 'Vier' },
  5: { fa: 'پنج', en: 'Five', es: 'Cinco', fr: 'Cinq', de: 'Fünf' },
  6: { fa: 'شش', en: 'Six', es: 'Seis', fr: 'Six', de: 'Sechs' },
  7: { fa: 'هفت', en: 'Seven', es: 'Siete', fr: 'Sept', de: 'Sieben' },
  8: { fa: 'هشت', en: 'Eight', es: 'Ocho', fr: 'Huit', de: 'Acht' },
  9: { fa: 'نه', en: 'Nine', es: 'Nueve', fr: 'Neuf', de: 'Neun' },
  10: { fa: 'ده', en: 'Ten', es: 'Diez', fr: 'Dix', de: 'Zehn' },
  11: { fa: 'یازده', en: 'Eleven', es: 'Once', fr: 'Onze', de: 'Elf' },
  12: { fa: 'دوازده', en: 'Twelve', es: 'Doce', fr: 'Douze', de: 'Zwölf' },
  20: { fa: 'بیست', en: 'Twenty', es: 'Veinte', fr: 'Vingt', de: 'Zwanzig' },
  25: { fa: 'بیست و پنج', en: 'Twenty-Five', es: 'Veinticinco', fr: 'Vingt-cinq', de: 'Fünfundzwanzig' },
  30: { fa: 'سی', en: 'Thirty', es: 'Treinta', fr: 'Trente', de: 'Dreißig' },
  40: { fa: 'چهل', en: 'Forty', es: 'Cuarenta', fr: 'Quarante', de: 'Vierzig' },
  50: { fa: 'پنجاه', en: 'Fifty', es: 'Cincuenta', fr: 'Cinquante', de: 'Fünfzig' },
  60: { fa: 'شصت', en: 'Sixty', es: 'Sesenta', fr: 'Soixante', de: 'Sechzig' },
  70: { fa: 'هفتاد', en: 'Seventy', es: 'Setenta', fr: 'Soixante-dix', de: 'Siebzig' },
  80: { fa: 'هشتاد', en: 'Eighty', es: 'Ochenta', fr: 'Quatre-vingts', de: 'Achtzig' },
  90: { fa: 'نود', en: 'Ninety', es: 'Noventa', fr: 'Quatre-vingt-dix', de: 'Neunzig' }
};

const DABERNA_POOL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 20, 25, 30, 40, 50, 60, 70, 80, 90];

export const MindSportsClub8: React.FC<MindSportsClub8Props> = ({
  onEarnLingous,
  activeFamilyClanInfo,
  onBackToFamilyRoom
}) => {
  const [activeGame, setActiveGame] = useState<GameId>('quiz_duel');
  const [inGameMicOn, setInGameMicOn] = useState<boolean>(true);
  const [inGameChatInput, setInGameChatInput] = useState<string>('');
  const [inGameChatMessages, setInGameChatMessages] = useState<
    Array<{ id: string; sender: string; role: string; text: string; time: string }>
  >([
    {
      id: 'ig_1',
      sender: activeFamilyClanInfo?.captainName || 'کاپیتان سیاوش',
      role: '👑 کاپیتان فامیل',
      text: 'بچه‌ها خوش اومدین به میز بازی فامیل! میکروفون‌هاتون رو باز بذارین تا هم گپ بزنیم و هم بازی کنیم!',
      time: 'آنلاین'
    },
    {
      id: 'ig_2',
      sender: activeFamilyClanInfo?.deputyName || 'معاون: آرش',
      role: '🛡️ معاون اتاق',
      text: 'دمت گرم کاپیتان! نوبت هر کی شد تو ویس بگه چه حرکتی می‌زنه!',
      time: 'آنلاین'
    },
    {
      id: 'ig_3',
      sender: activeFamilyClanInfo?.secretaryName || 'منشی: نگار',
      role: '📝 منشی فامیل',
      text: 'امتیازات این دست رو برای جدول فامیل ثبت می‌کنم. بزنین بریم!',
      time: 'آنلاین'
    }
  ]);

  const handleSendInGameChat = () => {
    const trimmed = inGameChatInput.trim();
    if (!trimmed) return;
    sound.playClick();
    setInGameChatMessages((prev) => [
      {
        id: `ig_${Date.now()}`,
        sender: 'شما (هم‌بازی و عضو فامیل)',
        role: '🎮 بازیکن آنلاین',
        text: trimmed,
        time: 'الان'
      },
      ...prev
    ]);
    setInGameChatInput('');
    onEarnLingous(5);
  };
  const [leaguePoints, setLeaguePoints] = useState<Record<GameId, number>>({
    quiz_duel: 420,
    uno_color8: 380,
    backgammon: 510,
    chess: 640,
    billiards_8ball: 550,
    ludo_mensch: 340,
    daberna_5lang: 490,
    hokm_spades: 580,
    math11_cards: 460
  });

  // Opponent Mode (Play vs Machine OR Play vs Real Opponent) + Interactive Training Academy Toggle
  const [opponentMode, setOpponentMode] = useState<'VS_MACHINE' | 'VS_REAL_PLAYER'>('VS_MACHINE');
  const [showAcademyTutorial, setShowAcademyTutorial] = useState<boolean>(true);
  const [machineLastActionMsg, setMachineLastActionMsg] = useState<string | null>(null);

  // League Tournament Bracket: Winners Bracket vs. Losers Bracket
  const [activeBracketGroup, setActiveBracketGroup] = useState<'WINNERS_BRACKET' | 'LOSERS_BRACKET'>('WINNERS_BRACKET');
  
  // AbleWay City Land Deed & Business License Prize Claim State for League Champions
  const [claimedDeedPrizes, setClaimedDeedPrizes] = useState<Record<string, { plotCode: string; districtFa: string; businessFa: string; claimedAt: string }>>({
    chess: {
      plotCode: 'AWC-PLOT-CHESS-GM',
      districtFa: 'پردیس علم و حکمت شهر توانا (Central Wisdom District)',
      businessFa: 'آکادمی بین‌المللی شطرنج و تفکر استراتژیک (Chess & Strategy Hub)',
      claimedAt: 'صادرشده برای صدرنشین'
    }
  });
  const [prizeNotice, setPrizeNotice] = useState<string | null>(null);

  const getTierName = (pts: number): LeagueStanding['tier'] => {
    if (pts >= 800) return 'Grandmaster';
    if (pts >= 600) return 'Diamond';
    if (pts >= 450) return 'Gold';
    if (pts >= 300) return 'Silver';
    return 'Bronze';
  };

  const awardGamePoints = (gId: GameId, pts: number) => {
    sound.playLevelUp();
    try { confetti({ particleCount: 40, spread: 60 }); } catch {}
    setLeaguePoints((prev) => ({ ...prev, [gId]: prev[gId] + pts }));
    onEarnLingous(pts);
  };

  // Game 1: 1v1 & 4p Bilingual Quiz Duel State
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const quizQuestions = [
    {
      q: 'What is the spoken Tehrani Persian equivalent of «می‌خواهم به خانه بروم» (I want to go home)?',
      opts: ['می‌خوام برم خونه (Mikhām beram khooneh)', 'من خانه رفتن (Man khāneh raftan)'],
      ans: 0
    },
    {
      q: 'In Persian hospitality (Taarof), what does «قدمتان روی چشم» (Ghadametān rooye cheshm) mean?',
      opts: ['You are most welcome! (Your footsteps upon our eyes)', 'Please walk carefully'],
      ans: 0
    },
    {
      q: 'Which city is the historic birthplace of Hafez and Saadi?',
      opts: ['شیراز (Shiraz)', 'تبریز (Tabriz)'],
      ans: 0
    }
  ];

  // Game 2: Color-Blind Accessible UNO / Color-8 State
  const [unoTopCard, setUnoTopCard] = useState<{ color: string; colorFa: string; symbol: string; num: number }>({
    color: 'Red',
    colorFa: 'قرمز (Ghermez)',
    symbol: '▲',
    num: 7
  });
  const [unoStatus, setUnoStatus] = useState<string>('کارت هم‌رنگ یا هم‌شماره (با نماد مخصوص افراد کوررنگ) را بازی کنید!');
  const unoHand = [
    { color: 'Red', colorFa: 'قرمز (Ghermez)', symbol: '▲', num: 9, bg: 'bg-rose-600' },
    { color: 'Blue', colorFa: 'آبی (Ābi)', symbol: '●', num: 7, bg: 'bg-sky-600' },
    { color: 'Green', colorFa: 'سبز (Sabz)', symbol: '■', num: 8, bg: 'bg-emerald-600' },
    { color: 'Yellow', colorFa: 'زرد (Zard)', symbol: '◆', num: 8, bg: 'bg-amber-500 text-slate-950' }
  ];

  // Game 3: Strategic Backgammon Pro State
  const [bgDice, setBgDice] = useState<[number, number]>([6, 6]);
  const [bgPipPos, setBgPipPos] = useState<number>(24);
  const PERSIAN_DICE_NAMES: Record<number, string> = {
    1: 'یک (Yek)',
    2: 'دو (Do)',
    3: 'سه (Se)',
    4: 'چهار (Chahār)',
    5: 'پنج (Panj)',
    6: 'شش (Shesh — جفت شش: دو شش طلایی!)'
  };

  // Game 4: Grandmaster Chess Tactics State
  const [chessSolved, setChessSolved] = useState<boolean>(false);
  const [chessMoveMsg, setChessMoveMsg] = useState<string>('نوبت سفید است: حرکت کیش‌ومات (Checkmate) با وزیر را انتخاب کنید!');

  // Game 4B (New #5): 8-Ball Pool & Billiards State (vs Machine & vs Real Player)
  const [billiardsBallsPocketed, setBilliardsBallsPocketed] = useState<number>(3);
  const [billiardsMachineBalls, setBilliardsMachineBalls] = useState<number>(2);
  const [billiardsStatusMsg, setBilliardsStatusMsg] = useState<string>(
    '🎱 زاویه چوب بیلیارد (Cue Stick) و شدت ضربه را انتخاب کنید تا توپ هدف پاکت شود!'
  );

  // Game 5: Family Ludo & Mensch State
  const [menschDice, setMenschDice] = useState<number>(6);
  const [menschSteps, setMenschSteps] = useState<number>(12);

  // Game 6: 5-Language Daberna / Housie State
  const [dabernaCurrentNum, setDabernaCurrentNum] = useState<number>(25);
  const [dabernaCalled, setDabernaCalled] = useState<number[]>([1, 7, 12, 25]);
  const [dabernaLang, setDabernaLang] = useState<'fa' | 'en' | 'es' | 'fr' | 'de'>('fa');

  // Game 7: Royal Team Hokm / Spades State
  const [hokmSuit, setHokmSuit] = useState<'♠ پیک (Spades)' | '♥ دل (Hearts)' | '♦ خشت (Diamonds)' | '♣ گشنیز (Clubs)'>('♠ پیک (Spades)');
  const [hokmTricksWon, setHokmTricksWon] = useState<number>(5);
  const [hokmLastPlay, setHokmLastPlay] = useState<string>('تیم شما حاکم است! یک کارت قوی بازی کنید تا دست ۶ و ۷ را ببرید.');

  // Game 8: Math-11 Memory Cards (چهاربرگ ریاضی جمع تا ۱۱)
  const [tableCards11, setTableCards11] = useState<number[]>([4, 3, 8, 2]);
  const [math11Score, setMath11Score] = useState<number>(2);
  const [math11Msg, setMath11Msg] = useState<string>('کارت دست خود را طوری انتخاب کنید که جمع آن با یکی از کارت‌های روی میز دقیقاً ۱۱ شود!');

  const GAMES_META: Array<{ id: GameId; icon: string; titleFa: string; titleEn: string }> = [
    { id: 'quiz_duel', icon: '⚡', titleFa: '۱. دوئل کوییز دوزبانه ۱ به ۱ و تیمی', titleEn: '1v1 & 4p Bilingual Quiz Duel' },
    { id: 'uno_color8', icon: '🃏', titleFa: '۲. بازی UNO / Color-8 (ویژه کوررنگی)', titleEn: 'Color-8 / UNO (Color-Blind Accessible)' },
    { id: 'backgammon', icon: '🎲', titleFa: '۳. تخته‌نرد اصیل (آموزش + بازی با ماشین/حریف)', titleEn: 'Backgammon Academy & Pro' },
    { id: 'chess', icon: '♟️', titleFa: '۴. شطرنج استادبزرگ (آموزش + بازی با ماشین/حریف)', titleEn: 'Chess Academy & Grandmaster' },
    { id: 'billiards_8ball', icon: '🎱', titleFa: '۵. بیلیارد و ایت‌بال (با ماشین و حریف واقعی)', titleEn: '8-Ball Pool & Billiards Pro' },
    { id: 'ludo_mensch', icon: '🎯', titleFa: '۶. منچ و لودو شاد خانوادگی', titleEn: 'Family Ludo & Mensch' },
    { id: 'daberna_5lang', icon: '🔢', titleFa: '۷. دبرنای ۵ زبانه (FA/EN/ES/FR/DE)', titleEn: '5-Language Family Daberna' },
    { id: 'hokm_spades', icon: '👑', titleFa: '۸. بازی فکری و تیمی حکم ۲ و ۴ نفره', titleEn: 'Royal Team Hokm / Spades' },
    { id: 'math11_cards', icon: '🧮', titleFa: '۹. چهاربرگ ریاضی و حافظه (جمع تا ۱۱)', titleEn: 'Math-11 Memory Cards' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 border-2 border-amber-400 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
              <Trophy className="w-4 h-4" />
              <span>🎮 MODULE 5: 9 BILINGUAL MIND SPORTS • DOUBLE BRACKET LEAGUE & ABLEWAY CITY LAND PRIZES</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 pt-1">
              باشگاه ورزش‌های فکری: لیگ گروه برندگان و بازندگان شطرنج، تخته‌نرد و بیلیارد با جایزه زمین و پروانه کسب در شهر توانا
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100">
              لیگ‌های مستقل با سیستم صعود و سقوط: برندگان در <strong>گروه برندگان (Winners Bracket)</strong> و بازندگان در <strong>گروه بازندگان (Losers Bracket)</strong> رقابت می‌کنند. صدرنشینان و قهرمانان هر لیگ <strong>سند رسمی زمین و پروانه کسب‌وکار در AbleWay City</strong> جایزه می‌گیرند!
            </p>
          </div>
        </div>

        {/* 8 Game Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
          {GAMES_META.map((g) => {
            const pts = leaguePoints[g.id];
            const tier = getTierName(pts);
            const isSelected = activeGame === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveGame(g.id);
                }}
                className={`p-3 rounded-2xl border-2 text-right transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-white shadow-md'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black">{g.icon} {g.titleFa}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] mt-1.5 pt-1 border-t border-current/15" dir="ltr">
                  <span className="font-black">🏆 {tier} League</span>
                  <span className="font-mono font-black tabular-nums">{pts} PTS</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* IN-GAME LIVE FAMILY VOICE CHAT & GROUP TEXT CHAT BAR                */}
      {/* =================================================================== */}
      <div className="rounded-3xl bg-slate-900 text-white p-5 border-2 border-emerald-400/70 shadow-lg space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-black text-amber-300">
              <Users className="w-4 h-4" />
              <span>
                🎙️💬 ویس‌چت و چت متنی همزمان در حین بازی با دوستان (
                {activeFamilyClanInfo?.clanTitleFa || 'اتاق فامیلی و دوستان هم‌ریشه'})
              </span>
            </div>
            <p className="text-xs text-emerald-200">
              در حین بازی با دوستان فامیل می‌توانید هم با میکروفون صحبت کنید (ویس‌چت) و هم پیام متنی بفرستید!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setInGameMicOn((prev) => !prev);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 ${
                inGameMicOn
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-rose-600 text-white'
              }`}
            >
              {inGameMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              <span>
                {inGameMicOn
                  ? '🎙️ میکروفون شما در بازی: باز (در حال گفتگو با هم‌بازی‌ها)'
                  : '🔇 میکروفون در بازی: بسته'}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                speakPersian(
                  'سلام رفقا! چه دست خوبی شد، نوبت هر کس هست حرکتش رو بزنه، دمتون گرم!',
                  0.88
                )
              }
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 text-xs font-black flex items-center gap-1"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 شنیدن صدای دوستان سر میز بازی</span>
            </button>

            {onBackToFamilyRoom && (
              <button
                type="button"
                onClick={onBackToFamilyRoom}
                className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black"
              >
                🔙 بازگشت به تالار فامیل
              </button>
            )}
          </div>
        </div>

        {/* Live Voice Players Bar + Instant In-Game Text Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          <div className="lg:col-span-5 flex flex-wrap gap-2">
            {[
              { name: activeFamilyClanInfo?.captainName || 'کاپیتان سیاوش', status: '🎙️ روی خط ویس بازی' },
              { name: activeFamilyClanInfo?.deputyName || 'معاون: آرش', status: '🎙️ روی خط ویس بازی' },
              { name: activeFamilyClanInfo?.secretaryName || 'منشی: نگار', status: '📝 داور و منشی میز' }
            ].map((pl, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs flex items-center gap-2"
              >
                <span className="font-black text-amber-300">{pl.name}</span>
                <span className="text-[10px] text-emerald-300 font-bold">{pl.status}</span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 flex gap-2">
            <input
              type="text"
              value={inGameChatInput}
              onChange={(e) => setInGameChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendInGameChat();
              }}
              placeholder="در حین بازی برای دوستانت پیام خودمانی بنویس (مثلاً: دست خوش! نوبت توئه رفیق)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-amber-400"
            />
            <button
              type="button"
              onClick={handleSendInGameChat}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ارسال در چت بازی</span>
            </button>
          </div>
        </div>

        {/* Recent In-Game Chat Messages Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {inGameChatMessages.slice(0, 3).map((m) => (
            <div
              key={m.id}
              className="p-2.5 rounded-xl bg-slate-950/90 border border-white/10 text-xs flex items-start justify-between gap-2"
            >
              <div>
                <span className="font-black text-amber-300 block">
                  {m.sender} <span className="text-[10px] text-emerald-300">({m.role})</span>
                </span>
                <p className="text-white font-bold mt-0.5">{m.text}</p>
              </div>
              <button
                type="button"
                onClick={() => speakPersian(m.text, 0.88)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 shrink-0"
                title="شنیدن پیام"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVE GAME ARENA */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        {/* ================================================================= */}
        {/* UNIVERSAL OPPONENT MODE SWITCHER (VS MACHINE / VS REAL PLAYER)    */}
        {/* + ACADEMY TUTORIAL TOGGLE FOR CHESS, BACKGAMMON & BILLIARDS       */}
        {/* ================================================================= */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white border border-amber-400/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-amber-300">🎮 انتخاب نوع حریف و آموزش:</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setOpponentMode('VS_MACHINE');
                setMachineLastActionMsg('🤖 حریف ماشین (AI Bot) آماده بازی و تمرین با شماست!');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
                opponentMode === 'VS_MACHINE'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🤖 بازی با ماشین هوشمند (Play vs. Machine)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setOpponentMode('VS_REAL_PLAYER');
                setMachineLastActionMsg('👥 حالت بازی با حریف واقعی و دوستان فامیل (همراه با ویس‌چت) فعال شد!');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
                opponentMode === 'VS_REAL_PLAYER'
                  ? 'bg-emerald-400 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              👥 بازی با حریف واقعی (Play vs. Real Opponent)
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowAcademyTutorial((prev) => !prev);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black border transition-all ${
              showAcademyTutorial
                ? 'bg-indigo-600 text-white border-amber-300'
                : 'bg-white/10 text-amber-200 border-white/20'
            }`}
          >
            {showAcademyTutorial
              ? '🎓 درس‌نامه آموزش شطرنج، تخته‌نرد و بیلیارد: روشن'
              : '🎓 نمایش آموزش گام‌به‌گام بازی'}
          </button>
        </div>

        {/* ================================================================= */}
        {/* TOURNAMENT BRACKET SELECTOR: WINNERS BRACKET VS. LOSERS BRACKET   */}
        {/* + ABLEWAY CITY LAND DEED & BUSINESS PERMIT PRIZE REWARDS          */}
        {/* ================================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-emerald-950 text-white border-2 border-amber-400 space-y-3.5 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-2.5">
            <div className="space-y-0.5">
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black text-[11px] inline-block">
                🏆 سیستم رسمی مسابقات حذفی دوگانه (Double-Elimination Tournament Brackets)
              </span>
              <h4 className="text-sm sm:text-base font-black text-amber-300 pt-0.5">
                گروه مسابقات فعلی: {activeBracketGroup === 'WINNERS_BRACKET' ? '🟢 جدول برندگان (Winners Bracket)' : '🟠 جدول بازندگان و فرصت مجدد (Losers Bracket)'}
              </h4>
              <p className="text-xs text-slate-200">
                در این سیستم هیچ بازیکنی با یک باخت حذف نمی‌شود! برندگان در گروه برندگان بازی می‌کنند و بازندگان در گروه بازندگان با یکدیگر به رقابت می‌پردازند.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveBracketGroup('WINNERS_BRACKET');
                  setMachineLastActionMsg('🟢 وارد گروه برندگان (Winners Bracket) شدید: رقابت برای صعود به فینال قهرمانی!');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeBracketGroup === 'WINNERS_BRACKET'
                    ? 'bg-emerald-400 text-slate-950 shadow-md ring-2 ring-white'
                    : 'bg-white/10 text-emerald-300 hover:bg-white/20'
                }`}
              >
                🟢 گروه برندگان (Winners Bracket)
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveBracketGroup('LOSERS_BRACKET');
                  setMachineLastActionMsg('🟠 وارد گروه بازندگان (Losers Bracket) شدید: رقابت قهرمانان برگشته برای کسب رتبه سوم و بازگشت به فینال!');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeBracketGroup === 'LOSERS_BRACKET'
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-white'
                    : 'bg-white/10 text-amber-200 hover:bg-white/20'
                }`}
              >
                🟠 گروه بازندگان (Losers Bracket)
              </button>
            </div>
          </div>

          {/* AbleWay City Land Deed & Business License Grand Prize Notice for League Champions */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-amber-400/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 max-w-xl">
              <div className="flex items-center gap-1.5 text-amber-300 font-black">
                <Landmark className="w-4 h-4 text-amber-400" />
                <span>🏛️ جایزه بزرگ صدرنشینان و قهرمانان لیگ‌های فکری (شطرنج، تخته‌نرد، بیلیارد):</span>
              </div>
              <p className="text-slate-200 leading-relaxed text-[11px]">
                صدرنشینان جدول برندگان (Winners Bracket)، برندهٔ <strong>سند مجازی زمین و پروانه کسب در شهر مجازی AbleWay City</strong> (دارایی افتخاری درون‌برنامه‌ای برای کارآفرینی و بازی‌وارسازی) می‌شوند!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {claimedDeedPrizes[activeGame] ? (
                <div className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-400 text-emerald-200 text-xs font-black flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  <span>📜 سند زمین برای صدرنشین صادر شد ({claimedDeedPrizes[activeGame].plotCode})</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    sound.playLevelUp();
                    try { confetti({ particleCount: 50, spread: 70 }); } catch {}
                    const newPlotCode = `AWC-PLOT-${activeGame.toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
                    const gameTitle = GAMES_META.find((g) => g.id === activeGame)?.titleFa || 'لیگ فکری';
                    setClaimedDeedPrizes((prev) => ({
                      ...prev,
                      [activeGame]: {
                        plotCode: newPlotCode,
                        districtFa: 'پردیس مرکزی نخبگان شهر توانا (AbleWay Champions Boulevard)',
                        businessFa: `باشگاه رسمی و آکادمی ${gameTitle}`,
                        claimedAt: 'صادرشده برای قهرمان'
                      }
                    }));
                    onEarnLingous(50);
                    setPrizeNotice(
                      `🎉 تبریک! سند رسمی زمین در AbleWay City با کد ثبتی ${newPlotCode} و پروانه کسب باشگاه به عنوان جایزه صدرنشینی صادر شد (+50 XP)!`
                    );
                    speakPersian(
                      `تبریک! سند رسمی زمین و پروانه کسب‌وکار در شهر توانا به عنوان جایزه صدرنشینی برای شما صادر گردید.`,
                      0.85
                    );
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Award className="w-4 h-4" />
                  <span>📜 ثبت و دریافت جایزه سند زمین و پروانه کسب صدرنشین (+50 XP)</span>
                </button>
              )}
            </div>
          </div>

          {prizeNotice && (
            <div className="p-3 rounded-xl bg-emerald-950 text-emerald-200 border border-emerald-400 text-xs font-black flex items-center justify-between">
              <span>{prizeNotice}</span>
              <button
                type="button"
                onClick={() => setPrizeNotice(null)}
                className="text-slate-300 hover:text-white text-[11px]"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {machineLastActionMsg && (
          <div className="p-3 rounded-xl bg-indigo-950 text-amber-200 border border-indigo-400/50 text-xs font-black flex items-center justify-between">
            <span>{machineLastActionMsg}</span>
            <button
              type="button"
              onClick={() => setMachineLastActionMsg(null)}
              className="text-slate-300 hover:text-white text-[11px]"
            >
              ✕
            </button>
          </div>
        )}
        {/* GAME 1: 1V1 & 4P TEAM QUIZ DUEL */}
        {activeGame === 'quiz_duel' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-xl font-black text-slate-900">
                ⚡ ۱. دوئل کوییز دوزبانه واژگان فارسی-انگلیسی و اطلاعات عمومی (1v1 & 4-Player Team Quiz Duel)
              </h3>
              <span className="text-xs font-black text-emerald-800">
                امتیاز دور فعلی: {quizScore} • لیگ مستقل: {getTierName(leaguePoints.quiz_duel)} ({leaguePoints.quiz_duel} PTS)
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4" dir="ltr">
              <p className="text-sm sm:text-lg font-black text-amber-300">
                Question {quizIdx + 1} / {quizQuestions.length}: {quizQuestions[quizIdx].q}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizQuestions[quizIdx].opts.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (idx === quizQuestions[quizIdx].ans) {
                        setQuizScore((s) => s + 1);
                        awardGamePoints('quiz_duel', 25);
                        speakPersian('آفرین! پاسخ کاملاً صحیح بود و ۲۵ امتیاز در لیگ کوییز گرفتید.', 0.85);
                      } else {
                        sound.playClick();
                      }
                      setQuizIdx((prev) => (prev + 1) % quizQuestions.length);
                    }}
                    className="p-4 rounded-2xl bg-white/10 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm border border-white/20 text-left transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GAME 2: COLOR-8 / UNO WITH COLOR-BLIND SYMBOLS */}
        {activeGame === 'uno_color8' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-xl font-black text-slate-900">
                🃏 ۲. بازی کارتی UNO / Color-8 خانوادگی (مجهز به نمادهای ▲ ● ■ ◆ ویژه افراد کوررنگ + آموزش رنگ و عدد)
              </h3>
              <span className="text-xs font-black text-emerald-800">
                لیگ UNO: {getTierName(leaguePoints.uno_color8)} ({leaguePoints.uno_color8} PTS)
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs text-amber-300 font-black block">کارت وسط میز (Active Table Card):</span>
                <p className="text-lg font-black">
                  {unoTopCard.symbol} رنگ: {unoTopCard.colorFa} ({unoTopCard.color}) — عدد: {unoTopCard.num}
                </p>
                <p className="text-xs text-emerald-200">{unoStatus}</p>
              </div>
              <div className="w-24 h-32 rounded-2xl bg-white text-slate-950 border-4 border-amber-400 flex flex-col items-center justify-center font-black shadow-lg">
                <span className="text-xl">{unoTopCard.symbol}</span>
                <span className="text-3xl">{unoTopCard.num}</span>
                <span className="text-[10px]">{unoTopCard.color}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {unoHand.map((card, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (card.color === unoTopCard.color || card.num === unoTopCard.num || card.num === 8) {
                      setUnoTopCard({ color: card.color, colorFa: card.colorFa, symbol: card.symbol, num: card.num });
                      setUnoStatus(`✅ آفرین! کارت ${card.colorFa} شماره ${card.num} بازی شد (+20 امتیاز لیگ)`);
                      speakPersian(`${card.colorFa}، شماره ${card.num}`, 0.85);
                      awardGamePoints('uno_color8', 20);
                    } else {
                      sound.playClick();
                      setUnoStatus('💡 کارتی را انتخاب کنید که هم‌رنگ یا هم‌شماره با کارت وسط باشد (یا عدد ۸ جایگزین)!');
                    }
                  }}
                  className={`p-4 rounded-2xl ${card.bg} text-white font-black text-center space-y-1 shadow-md hover:scale-105 transition-transform`}
                >
                  <span className="text-2xl block">{card.symbol} {card.num}</span>
                  <span className="text-xs block">{card.colorFa}</span>
                  <span className="text-[11px] block opacity-90" dir="ltr">{card.color} #{card.num}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 3: STRATEGIC BACKGAMMON PRO + ACADEMY + VS MACHINE / REAL PLAYER */}
        {activeGame === 'backgammon' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-xl font-black text-slate-900">
                🎲 ۳. تخته‌نرد اصیل و فکری (آموزش گام‌به‌گام + بازی با ماشین هوشمند و حریف واقعی)
              </h3>
              <span className="text-xs font-black text-emerald-800">
                حریف فعلی: {opponentMode === 'VS_MACHINE' ? '🤖 ماشین هوشمند' : '👥 حریف واقعی'} • لیگ تخته‌نرد: {getTierName(leaguePoints.backgammon)} ({leaguePoints.backgammon} PTS)
              </span>
            </div>

            {/* Interactive Backgammon Training Academy for Learners */}
            {showAcademyTutorial && (
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-900 text-amber-200 font-black text-xs">
                    🎓 آکادمی آموزش تخته‌نرد به دو زبان (Backgammon Step-by-Step Academy)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      speakPersian(
                        'آموزش تخته‌نرد: هر بازیکن ۱۵ مهره دارد. با پرتاب دو تاس، مهره‌ها را در ۲۴ خانه حرکت دهید. اگر دو مهره یا بیشتر در یک خانه قرار دهید، آن خانه بسته می‌شود و حریف نمی‌تواند آنجا بنشیند. اگر تاس جفت بیاید، چهار بار بازی می‌کنید!',
                        0.86
                      )
                    }
                    className="px-3 py-1 rounded-lg bg-amber-800 text-white text-xs font-black"
                  >
                    🔊 شنیدن درس‌نامه صوتی تخته‌نرد
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-amber-200">
                    <strong className="text-amber-900 block">۱. قانون حرکت و جفت آوردن (Doubles):</strong>
                    <span className="text-slate-700">
                      مهره‌ها بر اساس عدد دو تاس حرکت می‌کنند. اگر <strong>جفت شش (Double Sixes)</strong> بیاورید، ۴ بار خانهٔ ۶ تایی حرکت می‌کنید!
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-amber-200">
                    <strong className="text-amber-900 block">۲. خانه بستن و زدن مهره تک (Hitting a Blot):</strong>
                    <span className="text-slate-700">
                      وقتی ۲ مهره روی هم بگذارید، یک <strong>خانه امن (Point)</strong> ساخته‌اید. مهرهٔ تنها (تک) را می‌توان زد تا از اول بازی وارد شود.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-amber-200">
                    <strong className="text-amber-900 block">۳. جمع کردن مهره‌ها (Bearing Off):</strong>
                    <span className="text-slate-700">
                      وقتی هر ۱۵ مهره وارد ۶ خانهٔ خودی شدند، آن‌ها را از صفحه خارج می‌کنید تا برنده شوید.
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="p-6 rounded-3xl bg-amber-950 text-white border-2 border-amber-400 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm sm:text-lg font-black text-amber-300">
                    🎲 تاس فعلی شما: [{bgDice[0]}] و [{bgDice[1]}] — {PERSIAN_DICE_NAMES[bgDice[0]]} و {PERSIAN_DICE_NAMES[bgDice[1]]}
                  </p>
                  <p className="text-xs text-amber-100">
                    فاصله مهره پیشتاز تا خانه آخر (Bearing Off): <strong>{bgPipPos} خانه</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const d1 = Math.floor(Math.random() * 6) + 1;
                    const d2 = Math.floor(Math.random() * 6) + 1;
                    setBgDice([d1, d2]);
                    setBgPipPos((prev) => {
                      const next = prev - (d1 + d2);
                      if (next <= 0) {
                        awardGamePoints('backgammon', 30);
                        speakPersian('تبریک! تمام مهره‌های تخته‌نرد به خانه رسیدند و ۳۰ امتیاز لیگ دریافت کردید!', 0.85);
                        if (opponentMode === 'VS_MACHINE') {
                          setMachineLastActionMsg('🏆 شما در تخته‌نرد، حریف ماشین (AI Bot) را شکست دادید!');
                        }
                        return 24;
                      }
                      speakPersian(`تاس ${d1} و ${d2}`, 0.85);
                      if (opponentMode === 'VS_MACHINE') {
                        const m1 = Math.floor(Math.random() * 6) + 1;
                        const m2 = Math.floor(Math.random() * 6) + 1;
                        setMachineLastActionMsg(
                          `🤖 پاسخ فوری ماشین در تخته‌نرد: ماشین تاس [${m1} و ${m2}] آورد و خانهٔ دفاعی ساخت. نوبت شماست!`
                        );
                      } else {
                        setMachineLastActionMsg(
                          `👥 نوبت حریف واقعی شماست! در ویس‌چت با هم‌بازی خود گفتگو کنید.`
                        );
                      }
                      return next;
                    });
                  }}
                  className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-md"
                >
                  <Dice5 className="w-5 h-5" />
                  <span>
                    🎲 پرتاب تاس در برابر {opponentMode === 'VS_MACHINE' ? 'ماشین هوشمند' : 'حریف واقعی'} (+XP)
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GAME 4: GRANDMASTER CHESS + STEP-BY-STEP CHESS ACADEMY + VS MACHINE / REAL PLAYER */}
        {activeGame === 'chess' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-xl font-black text-slate-900">
                ♟️ ۴. شطرنج فکری استادبزرگ (آموزش کامل شطرنج + بازی با ماشین هوشمند و حریف واقعی)
              </h3>
              <span className="text-xs font-black text-emerald-800">
                حریف فعلی: {opponentMode === 'VS_MACHINE' ? '🤖 ماشین شطرنج' : '👥 حریف واقعی'} • لیگ شطرنج: {getTierName(leaguePoints.chess)} ({leaguePoints.chess} PTS)
              </span>
            </div>

            {/* Interactive Step-by-Step Chess Academy for New Chess Students */}
            {showAcademyTutorial && (
              <div className="p-4 rounded-2xl bg-slate-100 border-2 border-slate-300 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-amber-300 font-black text-xs">
                    🎓 آکادمی آموزش گام‌به‌گام شطرنج ویژه هنرجویان (Chess Academy: From Beginner to Master)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      speakPersian(
                        'آموزش شطرنج: وزیر قوی‌ترین مهره است و در تمام جهات حرکت می‌کند. اسب به شکل حرف ال حرکت می‌کند و از روی مهره‌ها می‌پرد. هدف نهایی، کیش و مات کردن شاه حریف است.',
                        0.86
                      )
                    }
                    className="px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-black"
                  >
                    🔊 شنیدن درس‌نامه صوتی شطرنج
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <strong className="text-slate-900 block">۱. حرکت مهره‌ها (Piece Movements):</strong>
                    <span className="text-slate-700">
                      ♕ <strong>وزیر (Queen):</strong> ستونی، عرضی و قطری • ♖ <strong>رخ (Rook):</strong> مستقیم • ♗ <strong>فیل (Bishop):</strong> قطری • ♘ <strong>اسب (Knight):</strong> حرکت L و پرش از روی مهره‌ها.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <strong className="text-slate-900 block">۲. تاکتیک چنگال و آچمز (Fork & Pin):</strong>
                    <span className="text-slate-700">
                      <strong>چنگال (Fork):</strong> حمله همزمان به دو مهره با اسب یا وزیر • <strong>آچمز (Pin):</strong> قفل کردن مهره حریف در برابر شاه.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <strong className="text-slate-900 block">۳. کنترل مرکز و کیش‌ومات (Checkmate):</strong>
                    <span className="text-slate-700">
                      در شروع بازی ۴ خانهٔ مرکزی (e4, d4, e5, d5) را کنترل کنید، شاه را قلعه ببرید (Castling) و شاه حریف را کیش‌ومات کنید.
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
              <p className="text-sm font-black text-amber-300">{chessMoveMsg}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" dir="ltr">
                {[
                  { move: '♕ Qh7# (Queen to h7 — Checkmate!)', win: true, fa: 'وزیر در خانه h7 کیش‌ومات!' },
                  { move: '♘ Nf3 (Knight to f3 — Tactical Fork)', win: false, fa: 'حرکت اسب به f3 (چنگال تاکتیکی و ادامه بازی با ماشین)' },
                  { move: '♖ Re1 (Rook to e1 — Control file)', win: false, fa: 'حرکت رخ به ستون e1 (کنترل ستون باز)' }
                ].map((m, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (m.win) {
                        setChessSolved(true);
                        setChessMoveMsg('✅ کیش‌ومات استادبزرگ! حرکت وزیر Qh7# کاملاً درست بود (+30 امتیاز لیگ شطرنج).');
                        awardGamePoints('chess', 30);
                        speakPersian('کیش و مات! حرکت وزیر کاملاً صحیح بود.', 0.85);
                        if (opponentMode === 'VS_MACHINE') {
                          setMachineLastActionMsg('🤖 ماشین شطرنج: تبریک! شما موتور شطرنج را با حرکت وزیر کیش‌ومات کردید.');
                        }
                      } else {
                        sound.playClick();
                        if (opponentMode === 'VS_MACHINE') {
                          setChessMoveMsg(
                            `🤖 شما حرکت ${m.move} را بازی کردید. ماشین بلافاصله با ♞ Nc6 پاسخ داد! حالا حرکت کیش‌ومات وزیر Qh7# را بزنید!`
                          );
                          setMachineLastActionMsg('🤖 ماشین شطرنج حرکت دفاعی ♞ Nc6 را انجام داد. نوبت شماست!');
                        } else {
                          setChessMoveMsg('💡 حرکت ثبت شد! برای پیروزی قطعی، حرکت کیش‌ومات وزیر Qh7# را امتحان کنید!');
                        }
                      }
                    }}
                    className="p-4 rounded-2xl bg-white/10 hover:bg-emerald-700 border border-white/20 text-left space-y-1 transition-all"
                  >
                    <span className="text-sm font-black text-amber-300 block">{m.move}</span>
                    <span className="text-xs text-slate-200 block" dir="rtl">{m.fa}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GAME 5 (NEW): 8-BALL POOL & BILLIARDS PRO (VS MACHINE & VS REAL PLAYER + ACADEMY) */}
        {activeGame === 'billiards_8ball' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-xl font-black text-slate-900">
                🎱 ۵. بیلیارد و ایت‌بال فکری و زاویه‌سنجی (8-Ball Pool & Billiards — با حریف ماشین، حریف واقعی و آموزش)
              </h3>
              <span className="text-xs font-black text-emerald-800">
                حریف: {opponentMode === 'VS_MACHINE' ? '🤖 ماشین بیلیارد' : '👥 حریف واقعی'} • لیگ بیلیارد: {getTierName(leaguePoints.billiards_8ball)} ({leaguePoints.billiards_8ball} PTS)
              </span>
            </div>

            {/* Interactive Billiards / 8-Ball Academy */}
            {showAcademyTutorial && (
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-amber-300 font-black text-xs">
                    🎓 آکادمی آموزش بیلیارد و ایت‌بال به دو زبان (8-Ball Pool & Angles Academy)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      speakPersian(
                        'آموزش بیلیارد و ایت‌بال: در بازی ایت‌بال، یک نفر توپ‌های تک‌رنگ و نفر دیگر توپ‌های دورنگ را پاکت می‌کند و در پایان کسی که توپ شماره هشت سیاه را به درستی وارد پاکت کند برنده است.',
                        0.86
                      )
                    }
                    className="px-3 py-1 rounded-lg bg-emerald-900 text-white text-xs font-black"
                  >
                    🔊 شنیدن درس‌نامه صوتی بیلیارد
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-emerald-200">
                    <strong className="text-emerald-950 block">۱. توپ‌های تک‌رنگ و دورنگ (Solids vs. Stripes):</strong>
                    <span className="text-slate-700">
                      توپ‌های ۱ تا ۷ <strong>تک‌رنگ (Solids)</strong>، توپ‌های ۹ تا ۱۵ <strong>خط‌دار/دورنگ (Stripes)</strong> و توپ شماره ۸ <strong>توپ نهایی (8-Ball)</strong> است.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-emerald-200">
                    <strong className="text-emerald-950 block">۲. زاویه برخورد و کات (Cut Shot & Bank Shot):</strong>
                    <span className="text-slate-700">
                      <strong>ضربه کات (Cut Shot):</strong> برخورد زاویه‌دار پیاز سفید (Cue Ball) با توپ هدف • <strong>ضربه باند (Bank Shot):</strong> کمک گرفتن از دیواره میز.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-emerald-200">
                    <strong className="text-emerald-950 block">۳. کنترل توپ سفید (Cue Ball Spin / English):</strong>
                    <span className="text-slate-700">
                      ضربه به بالای توپ سفید باعث حرکت رو به جلو (Follow) و ضربه به پایین باعث برگشت به عقب (Draw / Backspin) می‌شود.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Green Velvet Billiards Table Arena */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white border-8 border-amber-900 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-3">
                <div>
                  <span className="text-xs font-black text-amber-300 block">
                    میز رسمی بیلیارد ایت‌بال (8-Ball Pool Match Table)
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{billiardsStatusMsg}</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-black">
                  <span className="px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-400 text-emerald-200">
                    🟢 توپ‌های پاکت‌شده شما: {billiardsBallsPocketed} / 7
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-black/40 border border-amber-400 text-amber-200">
                    {opponentMode === 'VS_MACHINE' ? '🤖 توپ‌های ماشین' : '👥 توپ‌های حریف واقعی'}: {billiardsMachineBalls} / 7
                  </span>
                </div>
              </div>

              {/* Shot Selection Buttons (Direct Shot, 45-Degree Cut Shot, Bank Shot, Final 8-Ball Pocket) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    titleFa: '🎯 ضربه مستقیم (Straight Pocket Shot - زاویه ۰ درجه)',
                    titleEn: 'Center Cue Ball • Direct Corner Pocket',
                    powerBonus: 1
                  },
                  {
                    titleFa: '📐 ضربه زاویه‌دار ۴۵ درجه (45° Cut Shot + Backspin)',
                    titleEn: 'Precision 45° Angle • Draw Control',
                    powerBonus: 1
                  },
                  {
                    titleFa: '🎱 ضربه حرفه‌ای باند و پاکت توپ ۸ (Bank Shot & 8-Ball Win)',
                    titleEn: 'Cushion Bank Shot • Pocket the 8-Ball!',
                    powerBonus: 2
                  }
                ].map((shot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const nextUserBalls = billiardsBallsPocketed + shot.powerBonus;
                      if (nextUserBalls >= 7) {
                        setBilliardsBallsPocketed(0);
                        setBilliardsMachineBalls(0);
                        awardGamePoints('billiards_8ball', 30);
                        setBilliardsStatusMsg(
                          `🏆 ضربه فوق‌العاده! توپ شماره ۸ (8-Ball) وارد پاکت شد و شما در برابر ${
                            opponentMode === 'VS_MACHINE' ? 'ماشین بیلیارد' : 'حریف واقعی'
                          } پیروز شدید (+30 PTS)!`
                        );
                        speakPersian(
                          'آفرین! توپ شماره هشت پاکت شد و شما برنده مسابقه بیلیارد شدید!',
                          0.86
                        );
                      } else {
                        sound.playCoin();
                        setBilliardsBallsPocketed(nextUserBalls);
                        if (opponentMode === 'VS_MACHINE') {
                          const machineNext = Math.min(6, billiardsMachineBalls + 1);
                          setBilliardsMachineBalls(machineNext);
                          setBilliardsStatusMsg(
                            `✅ توپ شما پاکت شد (${nextUserBalls}/7)! 🤖 سپس ماشین بیلیارد یک ضربه زاویه‌دار زد (${machineNext}/7). نوبت ضربه بعدی شماست!`
                          );
                        } else {
                          setBilliardsStatusMsg(
                            `✅ ضربه عالی! توپ شماره ${nextUserBalls} وارد پاکت شد. نوبت ضربه بعدی در برابر حریف واقعی است!`
                          );
                        }
                      }
                    }}
                    className="p-4 rounded-2xl bg-black/35 hover:bg-amber-400 hover:text-slate-950 border-2 border-amber-400/60 text-right transition-all space-y-1"
                  >
                    <span className="text-xs sm:text-sm font-black block">{shot.titleFa}</span>
                    <span className="text-[11px] opacity-85 block font-mono" dir="ltr">
                      {shot.titleEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GAME 5: FAMILY LUDO & MENSCH */}
        {activeGame === 'ludo_mensch' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-xl font-black text-slate-900">
                🎯 ۵. منچ و لودو شاد خانوادگی (Family Ludo & Mensch — بدون حذف اعصاب‌خردکن، ۱۰۰٪ آموزشی)
              </h3>
              <span className="text-xs font-black text-emerald-800">
                لیگ منچ: {getTierName(leaguePoints.ludo_mensch)} ({leaguePoints.ludo_mensch} PTS)
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-950 text-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm sm:text-base font-black text-amber-300">
                  🎲 عدد تاس منچ: {menschDice} • موقعیت مهره شما: خانه {menschSteps} از ۲۰
                </p>
                <p className="text-xs text-indigo-200">
                  هر بار که مهره شما به خانه ۲۰ برسد، ۲۵ امتیاز لیگ منچ خانوادگی دریافت می‌کنید!
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const roll = Math.floor(Math.random() * 6) + 1;
                  setMenschDice(roll);
                  setMenschSteps((prev) => {
                    const next = prev + roll;
                    if (next >= 20) {
                      awardGamePoints('ludo_mensch', 25);
                      speakPersian('آفرین! مهره شما در منچ خانوادگی به خانه امن رسید!', 0.85);
                      return 1;
                    }
                    speakPersian(`عدد ${roll}`, 0.85);
                    return next;
                  });
                }}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm"
              >
                🎲 پرتاب تاس منچ و پیشروی مهره
              </button>
            </div>
          </div>
        )}

        {/* GAME 6: MULTILINGUAL DABERNA / HOUSIE (FA, EN, ES, FR, DE) */}
        {activeGame === 'daberna_5lang' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-xl font-black text-slate-900">
                🔢 ۶. دبرنای شاد خانوادگی با خوانش صوتی اعداد به ۵ زبان (فارسی، انگلیسی، اسپانیایی، فرانسوی و آلمانی)
              </h3>
              <div className="flex gap-1.5" dir="ltr">
                {(['fa', 'en', 'es', 'fr', 'de'] as const).map((lg) => (
                  <button
                    key={lg}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setDabernaLang(lg);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                      dabernaLang === lg ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {lg.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950 text-white flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs text-amber-300 font-black block">آخرین شماره خوانده‌شده دبرنا:</span>
                <p className="text-2xl font-black text-white">
                  🎱 شماره {dabernaCurrentNum} — 🇮🇷 {NUMBER_WORDS_5LANG[dabernaCurrentNum]?.fa} | 🇬🇧 {NUMBER_WORDS_5LANG[dabernaCurrentNum]?.en} | 🇪🇸 {NUMBER_WORDS_5LANG[dabernaCurrentNum]?.es} | 🇫🇷 {NUMBER_WORDS_5LANG[dabernaCurrentNum]?.fr} | 🇩🇪 {NUMBER_WORDS_5LANG[dabernaCurrentNum]?.de}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const nextNum = DABERNA_POOL[Math.floor(Math.random() * DABERNA_POOL.length)];
                  setDabernaCurrentNum(nextNum);
                  if (!dabernaCalled.includes(nextNum)) {
                    setDabernaCalled((prev) => [...prev, nextNum]);
                  }
                  const wordObj = NUMBER_WORDS_5LANG[nextNum];
                  const spokenWord = wordObj ? wordObj[dabernaLang] : String(nextNum);
                  speakMultilingual(spokenWord, dabernaLang, 0.88);
                  awardGamePoints('daberna_5lang', 15);
                }}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm"
              >
                🎱 قرعه شماره بعدی دبرنا + خوانش صوتی ({dabernaLang.toUpperCase()})
              </button>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-7 gap-2" dir="ltr">
              {DABERNA_POOL.slice(0, 14).map((num) => {
                const isMarked = dabernaCalled.includes(num);
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setDabernaCurrentNum(num);
                      const wordObj = NUMBER_WORDS_5LANG[num];
                      speakMultilingual(wordObj ? wordObj[dabernaLang] : String(num), dabernaLang, 0.88);
                    }}
                    className={`p-3 rounded-xl font-black text-center border-2 transition-all ${
                      isMarked
                        ? 'bg-emerald-600 text-white border-amber-300 shadow-xs'
                        : 'bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span className="text-base block tabular-nums">{num}</span>
                    <span className="text-[10px] block">{NUMBER_WORDS_5LANG[num]?.fa}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* GAME 7: ROYAL TEAM HOKM / SPADES (2P & 4P) */}
        {activeGame === 'hokm_spades' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-xl font-black text-slate-900">
                👑 ۷. بازی فکری و تیمی حکم ۲ و ۴ نفره (Royal Team Hokm / Spades — بدون هیچ‌گونه شرط‌بندی)
              </h3>
              <span className="text-xs font-black text-emerald-800">
                خال حکم: {hokmSuit} • دست‌های برده تیم شما: {hokmTricksWon} / 7
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
              <p className="text-xs sm:text-sm font-bold text-amber-300">{hokmLastPlay}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" dir="ltr">
                {[
                  { label: '♠ Ace of Spades (آس پیک - حکم)', win: true },
                  { label: '♥ King of Hearts (شاه دل)', win: true },
                  { label: '♦ Queen of Diamonds (بی‌بی خشت)', win: true },
                  { label: '♣ Jack of Clubs (سرباز گشنیز)', win: true }
                ].map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const nextTricks = hokmTricksWon + 1;
                      if (nextTricks >= 7) {
                        setHokmTricksWon(0);
                        setHokmLastPlay('🏆 آفرین! تیم شما ۷ دست حکم را تکمیل کرد و ۳۰ امتیاز در لیگ حکم گرفتید!');
                        awardGamePoints('hokm_spades', 30);
                        speakPersian('آفرین! تیم شما برنده این دست از بازی فکری حکم شد.', 0.85);
                      } else {
                        sound.playCoin();
                        setHokmTricksWon(nextTricks);
                        setHokmLastPlay(`✅ کارت «${c.label}» بازی شد و دست ${nextTricks} را بردید!`);
                      }
                    }}
                    className="p-4 rounded-2xl bg-white text-slate-950 font-black text-xs sm:text-sm border-2 border-amber-400 hover:bg-amber-50 transition-all"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GAME 8: MATH-11 MEMORY CARDS (چهاربرگ ریاضی جمع تا ۱۱) */}
        {activeGame === 'math11_cards' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-xl font-black text-slate-900">
                🧮 ۸. چهاربرگ ریاضی و تقویت حافظه جمع اعداد تا ۱۱ (Math-11 Memory Cards)
              </h3>
              <span className="text-xs font-black text-emerald-800">
                لیگ چهاربرگ ریاضی: {getTierName(leaguePoints.math11_cards)} ({leaguePoints.math11_cards} PTS)
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-teal-950 text-white space-y-3">
              <p className="text-xs sm:text-sm font-bold text-amber-300">{math11Msg}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-teal-200 font-bold">کارت‌های روی زمین (Table Cards):</span>
                {tableCards11.map((tc, i) => (
                  <span key={i} className="px-3.5 py-2 rounded-xl bg-white text-slate-950 font-black text-sm tabular-nums">
                    [{tc}]
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[7, 8, 3, 9].map((handNum, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      const match = tableCards11.find((tc) => tc + handNum === 11);
                      if (match !== undefined) {
                        setMath11Score((s) => s + 1);
                        setMath11Msg(`✅ عالی! ${handNum} + ${match} = ۱۱ شد! (+20 امتیاز لیگ چهاربرگ ریاضی)`);
                        awardGamePoints('math11_cards', 20);
                        speakPersian(`آفرین! ${handNum} به اضافه ${match} مساوی یازده شد.`, 0.85);
                      } else {
                        sound.playClick();
                        setMath11Msg('💡 کارتی را انتخاب کنید که با یکی از کارت‌های ۴، ۳، ۸ یا ۲ جمعش ۱۱ شود!');
                      }
                    }}
                    className="p-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm"
                  >
                    بازی کردن کارت [{handNum}] (نیاز به {11 - handNum} برای ۱۱)
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 9 INDEPENDENT 5-TIER LEADERBOARDS TABLE + BRACKETS AND ABLEWAY CITY LAND DEED BADGES */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900">
              🏆 جدول رده‌بندی مستقل ۹ لیگ ورزش‌های فکری و وضعیت صعود در جدول برندگان و بازندگان
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              صدرنشینان هر لیگ (شطرنج، تخته‌نرد، بیلیارد و...) صاحب سند زمین و پروانه کسب‌وکار در AbleWay City می‌شوند.
            </p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black">
            🏛️ جایزه AbleWay City: زمین و پروانه کسب برای صدرنشینان
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {GAMES_META.map((g) => {
            const pts = leaguePoints[g.id];
            const tier = getTierName(pts);
            const prize = claimedDeedPrizes[g.id];
            const isWinnerGroupLeader = pts >= 500;
            return (
              <div key={g.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black text-slate-900">{g.icon} {g.titleFa}</p>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${
                      isWinnerGroupLeader
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {isWinnerGroupLeader ? '🟢 گروه برندگان (Winners)' : '🟠 گروه بازندگان (Losers)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1.5" dir="ltr">
                    <span className="font-black text-emerald-800">🏅 {tier} League</span>
                    <span className="font-mono font-black text-slate-900 tabular-nums">{pts} PTS</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 text-[11px]">
                  {prize ? (
                    <div className="flex items-center justify-between text-emerald-700 font-black">
                      <span>📜 سند زمین شهر توانا:</span>
                      <span className="font-mono text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded">{prize.plotCode}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-slate-500">
                      <span>🏛️ جایزه صدرنشینی:</span>
                      <span className="text-amber-700 font-black text-[10px]">زمین + پروانه کسب AbleWay</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
