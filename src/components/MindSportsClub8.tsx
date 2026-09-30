import React, { useState } from 'react';
import {
  Trophy,
  Sparkles,
  Volume2,
  RotateCcw,
  Dice5,
  Award,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound, speakPersian, speakEnglish, speakMultilingual } from '../utils/audio';

interface MindSportsClub8Props {
  onEarnLingous: (amount: number) => void;
}

type GameId =
  | 'quiz_duel'
  | 'uno_color8'
  | 'backgammon'
  | 'chess'
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

export const MindSportsClub8: React.FC<MindSportsClub8Props> = ({ onEarnLingous }) => {
  const [activeGame, setActiveGame] = useState<GameId>('quiz_duel');
  const [leaguePoints, setLeaguePoints] = useState<Record<GameId, number>>({
    quiz_duel: 420,
    uno_color8: 380,
    backgammon: 510,
    chess: 640,
    ludo_mensch: 340,
    daberna_5lang: 490,
    hokm_spades: 580,
    math11_cards: 460
  });

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
    { id: 'backgammon', icon: '🎲', titleFa: '۳. تخته‌نرد اصیل و فکری', titleEn: 'Strategic Backgammon Pro' },
    { id: 'chess', icon: '♟️', titleFa: '۴. شطرنج فکری استادبزرگ', titleEn: 'Grandmaster Chess' },
    { id: 'ludo_mensch', icon: '🎯', titleFa: '۵. منچ و لودو شاد خانوادگی', titleEn: 'Family Ludo & Mensch' },
    { id: 'daberna_5lang', icon: '🔢', titleFa: '۶. دبرنای ۵ زبانه (FA/EN/ES/FR/DE)', titleEn: '5-Language Family Daberna' },
    { id: 'hokm_spades', icon: '👑', titleFa: '۷. بازی فکری و تیمی حکم ۲ و ۴ نفره', titleEn: 'Royal Team Hokm / Spades' },
    { id: 'math11_cards', icon: '🧮', titleFa: '۸. چهاربرگ ریاضی و حافظه (جمع تا ۱۱)', titleEn: 'Math-11 Memory Cards' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 border-2 border-amber-400 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
              <Trophy className="w-4 h-4" />
              <span>🎮 MODULE 5: 8 BILINGUAL FAMILY MIND SPORTS & INDEPENDENT 5-TIER LEAGUES (100% ETHICAL)</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 pt-1">
              باشگاه بزرگ ۸ ورزش فکری و خانوادگی دوزبانه (هر بازی دارای لیگ مستقل ۵ سطحی — ۱۰۰٪ اخلاقی و بدون قمار)
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100">
              تمامی ۸ بازی برای تقویت حافظه، ریاضی، تفکر استراتژیک و یادگیری اعداد و رنگ‌ها به فارسی و انگلیسی طراحی شده‌اند و هر بازی جدول رده‌بندی مستقل خود را در ۵ سطح (<strong>Bronze, Silver, Gold, Diamond, Grandmaster</strong>) دارد.
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

      {/* ACTIVE GAME ARENA */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
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

        {/* GAME 3: STRATEGIC BACKGAMMON PRO */}
        {activeGame === 'backgammon' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-xl font-black text-slate-900">
                🎲 ۳. تخته‌نرد اصیل و فکری (Strategic Backgammon Pro — همراه با خوانش سنتی اعداد تاس به فارسی و انگلیسی)
              </h3>
              <span className="text-xs font-black text-emerald-800">
                لیگ تخته‌نرد: {getTierName(leaguePoints.backgammon)} ({leaguePoints.backgammon} PTS)
              </span>
            </div>

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
                        return 24;
                      }
                      speakPersian(`تاس ${d1} و ${d2}`, 0.85);
                      return next;
                    });
                  }}
                  className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-md"
                >
                  <Dice5 className="w-5 h-5" />
                  <span>🎲 پرتاب تاس و حرکت استراتژیک مهره (+XP)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GAME 4: GRANDMASTER CHESS */}
        {activeGame === 'chess' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-xl font-black text-slate-900">
                ♟️ ۴. شطرنج فکری استادبزرگ (Grandmaster Chess Tactical Mate-in-1 Arena)
              </h3>
              <span className="text-xs font-black text-emerald-800">
                لیگ شطرنج: {getTierName(leaguePoints.chess)} ({leaguePoints.chess} PTS)
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
              <p className="text-sm font-black text-amber-300">{chessMoveMsg}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" dir="ltr">
                {[
                  { move: '♕ Qh7# (Queen to h7 — Checkmate!)', win: true, fa: 'وزیر در خانه h7 کیش‌ومات!' },
                  { move: '♘ Nf3 (Knight to f3 — Defensive)', win: false, fa: 'حرکت اسب به f3 (پشتیبانی)' },
                  { move: '♖ Re1 (Rook to e1 — Control file)', win: false, fa: 'حرکت رخ به ستون e1' }
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
                      } else {
                        sound.playClick();
                        setChessMoveMsg('💡 این حرکت خوب است اما کیش‌ومات فوری نیست؛ حرکت وزیر Qh7# را امتحان کنید!');
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

      {/* 8 INDEPENDENT 5-TIER LEADERBOARDS TABLE */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-3 shadow-xs">
        <h3 className="text-sm sm:text-base font-black text-slate-900">
          🏆 جدول رده‌بندی مستقل ۸ لیگ ورزش‌های فکری (Bronze ➔ Silver ➔ Gold ➔ Diamond ➔ Grandmaster)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {GAMES_META.map((g) => {
            const pts = leaguePoints[g.id];
            const tier = getTierName(pts);
            return (
              <div key={g.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="text-xs font-black text-slate-900">{g.icon} {g.titleFa}</p>
                <div className="flex items-center justify-between text-xs pt-1" dir="ltr">
                  <span className="font-black text-emerald-800">🏅 {tier}</span>
                  <span className="font-mono font-black text-slate-900 tabular-nums">{pts} PTS</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
