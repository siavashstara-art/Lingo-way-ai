import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  PenTool,
  Eraser,
  Sparkles,
  Heart,
  BookOpen,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { sound, speakPersian, speakEnglish, speakMultilingual } from '../utils/audio';

interface PersianAlphabetCanvasStudioProps {
  speechRate: number;
  onEarnLingous: (amount: number) => void;
}

interface TripleScriptPhrase {
  id: string;
  category: 'alphabet_trace' | 'grandparents_family' | 'rumi_hafez_poetry' | 'dari_tajik_bridge' | 'global_trade';
  titleEn: string;
  persianStandard: string;
  fingilish: string;
  englishNative: string;
  spanishUs: string;
  frenchCa: string;
  germanDe: string;
  dariAfghanNote?: string;
  tajikCyrillicNote?: string;
  culturalInsight: string;
}

const TRIPLE_SCRIPT_LETTERS = [
  { char: 'آ / ا', name: 'Alef (آ)', wordFa: 'آزادی و ایران', fingilish: 'Āzādi o Irān', en: 'Freedom & Iran', es: 'Libertad e Irán', fr: 'Liberté et Iran', de: 'Freiheit und Iran' },
  { char: 'ب', name: 'Be (ب)', wordFa: 'بابابزرگ مهربان', fingilish: 'Bābā-bozorg-e mehrabān', en: 'Kind Grandfather', es: 'Abuelo amable', fr: 'Grand-père bienveillant', de: 'Liebevoller Großvater' },
  { char: 'پ', name: 'Pe (پ — Exclusive Persian)', wordFa: 'پروانه و پارسی', fingilish: 'Parvāneh o Pārsi', en: 'Butterfly & Persian', es: 'Mariposa y Persa', fr: 'Papillon et Persan', de: 'Schmetterling & Persisch' },
  { char: 'ت', name: 'Te (ت)', wordFa: 'تمدن و تعارف', fingilish: 'Tamaddon o Ta’ārof', en: 'Civilization & Hospitality', es: 'Civilización y cortesía', fr: 'Civilisation et hospitalité', de: 'Zivilisation & Gastfreundschaft' },
  { char: 'چ', name: 'Che (چ — Exclusive Persian)', wordFa: 'چای زعفرانی', fingilish: 'Chāy-e za’ferāni', en: 'Saffron Tea', es: 'Té de azafrán', fr: 'Thé au safran', de: 'Safrantee' },
  { char: 'خ', name: 'Khe (خ)', wordFa: 'خورشید و خانواده', fingilish: 'Khorshid o Khānevādeh', en: 'Sun & Family', es: 'Sol y Familia', fr: 'Soleil et Famille', de: 'Sonne und Familie' },
  { char: 'ژ', name: 'Zhe (ژ — Exclusive Persian)', wordFa: 'ژاله صبحگاهی', fingilish: 'Zhāleh-ye sobhgāhi', en: 'Morning Dew', es: 'Rocío de la mañana', fr: 'Rosée du matin', de: 'Morgentau' },
  { char: 'ش', name: 'Shin (ش)', wordFa: 'شعر شیرین شیراز', fingilish: 'She’r-e shirin-e Shirāz', en: 'Sweet Poetry of Shiraz', es: 'Dulce poesía de Shiraz', fr: 'Douce poésie de Chiraz', de: 'Süße Poesie aus Schiras' },
  { char: 'ع', name: 'Ayn (ع)', wordFa: 'عشق و عرفان', fingilish: 'Eshgh o Erfān', en: 'Love & Mysticism', es: 'Amor y Misticismo', fr: 'Amour et Mysticisme', de: 'Liebe und Mystik' },
  { char: 'ق', name: 'Ghāf (ق)', wordFa: 'قالیچه دستباف', fingilish: 'Ghālicheh-ye dastbāf', en: 'Hand-knotted Persian Rug', es: 'Alfombra persa tejida a mano', fr: 'Tapis persan noué à la main', de: 'Handgeknüpfter Perserteppich' },
  { char: 'گ', name: 'Gāf (گ — Exclusive Persian)', wordFa: 'گلستان و گفتگو', fingilish: 'Golestān o Goftogoo', en: 'Rose Garden & Dialogue', es: 'Jardín de rosas y diálogo', fr: 'Roseraie et dialogue', de: 'Rosengarten & Dialog' },
  { char: 'م', name: 'Mim (م)', wordFa: 'مامان‌بزرگ عزیزم', fingilish: 'Māmān-bozorg-e azizam', en: 'My Dear Grandmother', es: 'Mi querida abuela', fr: 'Ma chère grand-mère', de: 'Meine liebe Großmutter' }
];

const TRIPLE_SCRIPT_MASTER_MODULES: TripleScriptPhrase[] = [
  {
    id: 'ts_1',
    category: 'rumi_hafez_poetry',
    titleEn: '🕊️ Rumi (Mowlana) Masterpiece: Come, Come, Whoever You Are',
    persianStandard: 'بیا، بیا، هر آنچه هستی بیا! گر کافر و گبر و بت‌پرستی بیا — این درگه ما درگه نومیدی نیست، صد بار اگر توبه شکستی بازآ!',
    fingilish: 'Biyā, biyā, har āncheh hasti biyā! Gar kāfar o gabr o bot-parasti biyā — In dargah-e mā dargah-e nowmidi nist, sad bār agar towbeh shekasti bāz-ā!',
    englishNative: 'Come, come, whoever you are! Wanderer, idolater, worshipper of fire, come — Ours is not a caravan of despair; even if you have broken your vows a hundred times, come, come again!',
    spanishUs: '¡Ven, ven, quienquiera que seas! Nuestro umbral no es de desesperanza; aunque hayas roto tu promesa cien veces, ¡ven otra vez!',
    frenchCa: 'Viens, viens, qui que tu sois ! Notre demeure n’est pas celle du désespoir ; même si tu as rompu tes vœux cent fois, reviens !',
    germanDe: 'Komm, komm, wer immer du bist! Unsere Schwelle ist kein Ort der Hoffnungslosigkeit; selbst wenn du dein Gelübde hundertmal gebrochen hast, komm wieder!',
    dariAfghanNote: '🇦🇫 دری (افغانستان/بلخ، زادگاه مولانا): تلفظ اصیل «بیا» و «بازآ» با واژگان مشترک خراسان بزرگ.',
    tajikCyrillicNote: '🇹🇯 تاجیکی (خط سیریلیک): Биё, биё, ҳар он чӣ ҳастӣ биё! Ин даргаҳи мо даргаҳи навмедӣ нест!',
    culturalInsight: 'Rumi (Mowlana Jalaluddin Balkhi) is the best-selling poet in America and Europe. Hearing his verse in original Persian reveals its breathtaking internal rhyme!'
  },
  {
    id: 'ts_2',
    category: 'rumi_hafez_poetry',
    titleEn: '🌹 Hafez of Shiraz: The Immortal Tree of Friendship',
    persianStandard: 'درخت دوستی بنشان که کام دل به بار آرد — نهال دشمنی برکن که رنج بی‌شمار آرد (لسان‌الغیب حافظ شیرازی)',
    fingilish: 'Derakht-e doosti benshān ke kām-e del be bār ārad — Nahāl-e doshmani barkan ke ranj-e bi-shomār ārad.',
    englishNative: 'Plant the tree of friendship, for it bears the fulfillment of the heart’s desire — Uproot the sapling of hostility, for it brings countless sorrows.',
    spanishUs: 'Planta el árbol de la amistad, pues dará el fruto del corazón — Arranca el brote de la enemistad, pues trae penas sin fin.',
    frenchCa: 'Plante l’arbre de l’amitié qui comble les désirs du cœur — Déracine l’arbuste de l’inimitié qui apporte d’innombrables tourments.',
    germanDe: 'Pflanze den Baum der Freundschaft, denn er trägt die Erfüllung des Herzens — Reiße den Setzling der Feindschaft aus, denn er bringt zahlloses Leid.',
    dariAfghanNote: '🇦🇫 دری: «درخت دوستی بنشان» در کابل، هرات و مزارشریف دقیقاً با همین وزن خوانده می‌شود.',
    tajikCyrillicNote: '🇹🇯 تاجیکی: Дарахти дӯстӣ биншон, ки коми дил ба бор орад!',
    culturalInsight: 'A favorite couplet quoted by diplomats, peacebuilders, and Iranian families around the world.'
  },
  {
    id: 'ts_3',
    category: 'grandparents_family',
    titleEn: '👵🏼 Heartfelt Call to Grandparents (مکالمه عاطفی با پدربزرگ و مادربزرگ)',
    persianStandard: 'سلام مامان‌بزرگ و بابابزرگ عزیزم، قربون صدای مهربونتون برم! خیلی دلم برای بغل گرمتون و دورهمی‌های خونه‌تون تنگ شده.',
    fingilish: 'Salām Māmān-bozorg o Bābā-bozorg-e azizam, ghorboon-e sedā-ye mehraboonetoon beram! Kheyli delam barāye baghal-e garmetoon o dorehami-hā-ye khoonatoon tang shodeh.',
    englishNative: 'Hello my dear Grandma and Grandpa, I adore your kind voices! I miss your warm hugs and our family gatherings at your home so much.',
    spanishUs: '¡Hola mis queridos abuela y abuelo! Extraño muchísimo sus cálidos abrazos y nuestras reuniones familiares.',
    frenchCa: 'Bonjour mes chers grand-mère et grand-père ! Vos câlins chaleureux et nos réunions de famille me manquent tellement.',
    germanDe: 'Hallo meine liebe Oma und mein lieber Opa! Ich vermisse eure herzlichen Umarmungen und unsere Familientreffen so sehr.',
    dariAfghanNote: '🇦🇫 در گویش شیرین دری کابل: «سلام مادرکلان و پدرکلان قندم، بسیار دلم پشتتان دق شده!» (Mādar-kalān o Padar-kalān)',
    tajikCyrillicNote: '🇹🇯 در تاجیکی دوشنبه: «Салом бибиҷон ва бобоҷони азизам, дилам бароятон хеле танг шудааст!» (Bibijon o Bobojon)',
    culturalInsight: 'Notice how Farsi (Tehran), Dari (Kabul), and Tajik (Dushanbe) are one single Persian language with endearing local words for Grandma/Grandpa!'
  },
  {
    id: 'ts_4',
    category: 'global_trade',
    titleEn: '🤝 Silk Road & Global Persian Business Greeting (تجارت و بازرگانی)',
    persianStandard: 'از آشنایی و همکاری تجاری با مجموعهٔ شما بسیار خرسندیم؛ کیفیت و اصالت، خط قرمز و افتخار کار ماست.',
    fingilish: 'Az āshnāyi o hamkāri-ye tejāri bā majmoo’eh-ye shomā besyār khorsandim; keyfiyat o esālat, khatt-e ghermez o eftekhār-e kār-e māst.',
    englishNative: 'We are delighted to meet and partner commercially with your organization; quality and authenticity are our non-negotiable standard and pride.',
    spanishUs: 'Estamos encantados de colaborar comercialmente con su organización; la calidad y la autenticidad son nuestro orgullo.',
    frenchCa: 'Nous sommes ravis de collaborer commercialement avec votre organisation ; la qualité et l’authenticité sont notre fierté.',
    germanDe: 'Wir freuen uns sehr über die geschäftliche Zusammenarbeit mit Ihrem Unternehmen; Qualität und Authentizität sind unser Stolz.',
    culturalInsight: 'High-trust business Persian for merchants, startups, and international trade across North America, Europe, and the 300M Persian world.'
  }
];

export const PersianAlphabetCanvasStudio: React.FC<PersianAlphabetCanvasStudioProps> = ({
  speechRate,
  onEarnLingous
}) => {
  const [selectedLetterIdx, setSelectedLetterIdx] = useState<number>(2); // Default پ (Pe)
  const [selectedBridgeLang, setSelectedBridgeLang] = useState<'en' | 'es' | 'fr' | 'de'>('en');
  const [showDariTajik, setShowDariTajik] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokeCount, setStrokeCount] = useState<number>(0);

  const currentLetter = TRIPLE_SCRIPT_LETTERS[selectedLetterIdx] || TRIPLE_SCRIPT_LETTERS[0];

  // Draw guide watermark on Canvas whenever selected letter changes
  const drawLetterWatermark = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle baseline
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.28)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(24, canvas.height * 0.65);
    ctx.lineTo(canvas.width - 24, canvas.height * 0.65);
    ctx.stroke();
    ctx.setLineDash([]);

    // Guide Persian Character
    ctx.fillStyle = 'rgba(251, 191, 36, 0.22)';
    ctx.font = '900 118px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentLetter.char.split(' ')[0], canvas.width / 2, canvas.height / 2);
  };

  useEffect(() => {
    drawLetterWatermark();
    setStrokeCount(0);
  }, [selectedLetterIdx]);

  const getPointerPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = getPointerPos(e);
    setIsDrawing(true);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const moveDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = getPointerPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const endDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setStrokeCount((prev) => {
      const next = prev + 1;
      if (next === 2) {
        sound.playCoin();
        onEarnLingous(15);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner: Dual-Direction Priority #1 + Triple-Script & Multi-Language Selector */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950 text-white p-6 sm:p-8 border-2 border-amber-400/60 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
              <PenTool className="w-4 h-4" />
              <span>✍️ MODULE 1: INTERACTIVE FINGER-WRITING BOARD, TRIPLE-SCRIPT & RUMI/HAFEZ STUDIO</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-amber-300 pt-1">
              کارگاه تعاملی نوشتن حروف فارسی با انگشت + نمایش ۳ خطی (فارسی/دری/تاجیکی ⇄ انگلیسی، آلمانی، فرانسوی و اسپانیایی)
            </h3>
          </div>

          {/* Western Language Selector for Line #3 of Triple-Script */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-amber-400/40" dir="ltr">
            <span className="text-[11px] font-black text-amber-200 px-2">3rd Line Bridge:</span>
            {[
              { id: 'en' as const, label: '🇺🇸/🇬🇧 English' },
              { id: 'de' as const, label: '🇩🇪 Deutsch' },
              { id: 'fr' as const, label: '🇫🇷/🇨🇦 Français' },
              { id: 'es' as const, label: '🇪🇸/🇺🇸 Español' }
            ].map((lg) => (
              <button
                key={lg.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedBridgeLang(lg.id);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                  selectedBridgeLang === lg.id
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {lg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Finger-Tracing Persian Calligraphy Canvas + Letter Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch pt-2">
          {/* Left: Letter Picker & Triple-Script Card */}
          <div className="lg:col-span-7 space-y-3 flex flex-col justify-between">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {TRIPLE_SCRIPT_LETTERS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedLetterIdx(idx);
                    speakPersian(item.wordFa, speechRate, item.fingilish);
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-center transition-all ${
                    selectedLetterIdx === idx
                      ? 'bg-amber-400 text-slate-950 border-white font-black shadow-md'
                      : 'bg-white/10 text-white border-white/15 hover:bg-white/20 font-bold'
                  }`}
                >
                  <span className="text-xl block">{item.char}</span>
                  <span className="text-[10px] block truncate" dir="ltr">{item.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Triple-Script Display Box (1. Persian Script, 2. Fingilish, 3. English/DE/FR/ES) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border-2 border-emerald-400/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-300" dir="ltr">
                  ✨ TRIPLE-SCRIPT LIVE DISPLAY ({currentLetter.name})
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => speakPersian(currentLetter.wordFa, speechRate, currentLetter.fingilish)}
                    className="px-3 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>🔊 صدای اصیل فارسی</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      speakMultilingual(
                        selectedBridgeLang === 'de'
                          ? currentLetter.de
                          : selectedBridgeLang === 'fr'
                          ? currentLetter.fr
                          : selectedBridgeLang === 'es'
                          ? currentLetter.es
                          : currentLetter.en,
                        selectedBridgeLang,
                        speechRate
                      )
                    }
                    className="px-3 py-1 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs"
                    dir="ltr"
                  >
                    🔊 {selectedBridgeLang.toUpperCase()} Audio
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-lg sm:text-2xl font-black text-amber-300" dir="rtl">
                  ۱) خط فارسی استاندارد: «{currentLetter.wordFa}»
                </p>
                <p className="text-xs sm:text-sm font-mono font-black text-emerald-300" dir="ltr">
                  2) Fingilish Phonetics: "{currentLetter.fingilish}"
                </p>
                <p className="text-xs sm:text-sm font-black text-white" dir="ltr">
                  3) Native Translation ({selectedBridgeLang.toUpperCase()}): "
                  {selectedBridgeLang === 'de'
                    ? currentLetter.de
                    : selectedBridgeLang === 'fr'
                    ? currentLetter.fr
                    : selectedBridgeLang === 'es'
                    ? currentLetter.es
                    : currentLetter.en}
                  "
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive Finger / Stylus / Mouse Drawing Board */}
          <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-950 border-2 border-amber-400 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-300">
                🖐️ تخته هوشمند مشق الفبای فارسی با انگشت یا ماوس:
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  drawLetterWatermark();
                  setStrokeCount(0);
                }}
                className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-1"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>پاک‌کن تخته</span>
              </button>
            </div>

            <canvas
              ref={canvasRef}
              width={420}
              height={210}
              onMouseDown={startDraw}
              onMouseMove={moveDraw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              onTouchStart={startDraw}
              onTouchMove={moveDraw}
              onTouchEnd={endDraw}
              className="w-full h-44 rounded-2xl bg-slate-900 border border-amber-400/40 cursor-crosshair touch-none"
            />

            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-300 font-bold">
                {strokeCount > 0
                  ? `✅ آفرین! ${strokeCount} حرکت قلم ثبت شد (+15 XP)`
                  : 'با انگشت یا ماوس از راست به چپ روی حرف کم‌رنگ بکشید'}
              </span>
              <span className="text-amber-300 font-mono font-black" dir="ltr">
                Right-to-Left ⬅️
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Triple-Script Poetry (Rumi & Hafez), Grandparents & Dari/Tajik Bridge Cards */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-800" />
          <h4 className="text-sm sm:text-base font-black text-slate-900">
            📜 تالار سه‌خطی شعرخوانی مولانا و حافظ، مکالمه با پدربزرگ و مادربزرگ، و پل زبان فارسی/دری/تاجیکی
          </h4>
        </div>
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setShowDariTajik(!showDariTajik);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black border ${
            showDariTajik
              ? 'bg-emerald-800 text-white border-emerald-900'
              : 'bg-slate-100 text-slate-700 border-slate-300'
          }`}
        >
          🇦🇫🇹🇯 {showDariTajik ? 'نمایش گویش دری و خط تاجیکی: روشن' : 'نمایش گویش دری و تاجیکی'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {TRIPLE_SCRIPT_MASTER_MODULES.map((item) => {
          const translatedLine3 =
            selectedBridgeLang === 'de'
              ? item.germanDe
              : selectedBridgeLang === 'fr'
              ? item.frenchCa
              : selectedBridgeLang === 'es'
              ? item.spanishUs
              : item.englishNative;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-3 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h5 className="text-sm sm:text-base font-black text-slate-900" dir="ltr">
                  {item.titleEn}
                </h5>

                {/* Triple-Script Display Container */}
                <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-2">
                  <div>
                    <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider block" dir="ltr">
                      Line 1 • Standard Persian Script (خط فارسی استاندارد):
                    </span>
                    <p className="text-base sm:text-lg font-black text-amber-300 leading-relaxed" dir="rtl">
                      {item.persianStandard}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-1.5" dir="ltr">
                    <span className="text-[10px] font-black text-emerald-300 uppercase tracking-wider block">
                      Line 2 • Accurate Fingilish Phonetics (برای کسانی که هنوز خط فارسی بلد نیستند):
                    </span>
                    <p className="text-xs sm:text-sm font-mono font-black text-emerald-200">
                      "{item.fingilish}"
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-1.5" dir="ltr">
                    <span className="text-[10px] font-black text-sky-300 uppercase tracking-wider block">
                      Line 3 • Native {selectedBridgeLang.toUpperCase()} Translation:
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      "{translatedLine3}"
                    </p>
                  </div>
                </div>

                {showDariTajik && (item.dariAfghanNote || item.tajikCyrillicNote) && (
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-xs text-amber-950">
                    {item.dariAfghanNote && <p className="font-bold">{item.dariAfghanNote}</p>}
                    {item.tajikCyrillicNote && <p className="font-mono">{item.tajikCyrillicNote}</p>}
                  </div>
                )}

                <p className="text-xs text-slate-600 leading-relaxed" dir="ltr">
                  💡 <strong>Heritage Note:</strong> {item.culturalInsight}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2" dir="ltr">
                <button
                  type="button"
                  onClick={() => {
                    speakPersian(item.persianStandard, speechRate, item.fingilish);
                    onEarnLingous(15);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 Hear Native Persian</span>
                </button>
                <button
                  type="button"
                  onClick={() => speakMultilingual(translatedLine3, selectedBridgeLang, speechRate)}
                  className="py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-900 font-black text-xs"
                >
                  🔊 Hear {selectedBridgeLang.toUpperCase()}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
