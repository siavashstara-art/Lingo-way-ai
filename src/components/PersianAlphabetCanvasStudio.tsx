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
  { char: 'آ / ا', name: '1. Alef (آ / ا)', wordFa: 'آزادی و ایران', fingilish: 'Āzādi o Irān', en: 'Freedom & Iran', es: 'Libertad e Irán', fr: 'Liberté et Iran', de: 'Freiheit und Iran' },
  { char: 'ب', name: '2. Be (ب)', wordFa: 'بابابزرگ مهربان', fingilish: 'Bābā-bozorg-e mehrabān', en: 'Kind Grandfather', es: 'Abuelo amable', fr: 'Grand-père bienveillant', de: 'Liebevoller Großvater' },
  { char: 'پ', name: '3. Pe (پ — Exclusive Persian)', wordFa: 'پروانه و پارسی', fingilish: 'Parvāneh o Pārsi', en: 'Butterfly & Persian', es: 'Mariposa y Persa', fr: 'Papillon et Persan', de: 'Schmetterling & Persisch' },
  { char: 'ت', name: '4. Te (ت)', wordFa: 'تمدن و تعارف', fingilish: 'Tamaddon o Ta’ārof', en: 'Civilization & Hospitality', es: 'Civilización y cortesía', fr: 'Civilisation et hospitalité', de: 'Zivilisation & Gastfreundschaft' },
  { char: 'ث', name: '5. Se (ث)', wordFa: 'ثروت و ثمر', fingilish: 'Servat o Samar', en: 'Wealth & Fruit', es: 'Riqueza y Fruto', fr: 'Richesse et Fruit', de: 'Wohlstand & Frucht' },
  { char: 'ج', name: '6. Jim (ج)', wordFa: 'جان و جهان', fingilish: 'Jān o Jahān', en: 'Soul & World', es: 'Alma y Mundo', fr: 'Âme et Monde', de: 'Seele und Welt' },
  { char: 'چ', name: '7. Che (چ — Exclusive Persian)', wordFa: 'چای زعفرانی', fingilish: 'Chāy-e za’ferāni', en: 'Saffron Tea', es: 'Té de azafrán', fr: 'Thé au safran', de: 'Safrantee' },
  { char: 'ح', name: '8. He-Jimi (ح)', wordFa: 'حافظ شیرازی', fingilish: 'Hāfez-e Shirāzi', en: 'Hafez of Shiraz', es: 'Hafez de Shiraz', fr: 'Hafez de Chiraz', de: 'Hafis von Schiras' },
  { char: 'خ', name: '9. Khe (خ)', wordFa: 'خورشید و خانواده', fingilish: 'Khorshid o Khānevādeh', en: 'Sun & Family', es: 'Sol y Familia', fr: 'Soleil et Famille', de: 'Sonne und Familie' },
  { char: 'د', name: '10. Dāl (د)', wordFa: 'دل و دوستی', fingilish: 'Del o Doosti', en: 'Heart & Friendship', es: 'Corazón y Amistad', fr: 'Cœur et Amitié', de: 'Herz und Freundschaft' },
  { char: 'ذ', name: '11. Zāl (ذ)', wordFa: 'ذوق و ذکاوت', fingilish: 'Zowgh o Zakāvat', en: 'Passion & Intelligence', es: 'Pasión e Inteligencia', fr: 'Passion et Intelligence', de: 'Begeisterung & Klugheit' },
  { char: 'ر', name: '12. Re (ر)', wordFa: 'رودکی و روشنایی', fingilish: 'Roodaki o Rowshanāyi', en: 'Rudaki & Light', es: 'Rudaki y Luz', fr: 'Roudaki et Lumière', de: 'Rudaki und Licht' },
  { char: 'ز', name: '13. Ze (ز)', wordFa: 'زندگی و زیبایی', fingilish: 'Zendegi o Zibāyi', en: 'Life & Beauty', es: 'Vida y Belleza', fr: 'Vie et Beauté', de: 'Leben und Schönheit' },
  { char: 'ژ', name: '14. Zhe (ژ — Exclusive Persian)', wordFa: 'ژاله صبحگاهی', fingilish: 'Zhāleh-ye sobhgāhi', en: 'Morning Dew', es: 'Rocío de la mañana', fr: 'Rosée du matin', de: 'Morgentau' },
  { char: 'س', name: '15. Sin (س)', wordFa: 'سمرقند و سیاوش', fingilish: 'Samarghand o Siyāvash', en: 'Samarkand & Siavash', es: 'Samarcanda y Siavash', fr: 'Samarcande et Siavash', de: 'Samarkand & Siawasch' },
  { char: 'ش', name: '16. Shin (ش)', wordFa: 'شعر شیرین شیراز', fingilish: 'She’r-e shirin-e Shirāz', en: 'Sweet Poetry of Shiraz', es: 'Dulce poesía de Shiraz', fr: 'Douce poésie de Chiraz', de: 'Süße Poesie aus Schiras' },
  { char: 'ص', name: '17. Sād (ص)', wordFa: 'صداقت و صفا', fingilish: 'Sedāghat o Safā', en: 'Honesty & Purity', es: 'Honestidad y Pureza', fr: 'Honnêteté et Pureté', de: 'Ehrlichkeit & Reinheit' },
  { char: 'ض', name: '18. Zād (ض)', wordFa: 'ضیافت خانوادگی', fingilish: 'Ziyāfat-e khānevādegi', en: 'Family Feast', es: 'Banquete familiar', fr: 'Banquet familial', de: 'Familienfest' },
  { char: 'ط', name: '19. Tā (ط)', wordFa: 'طراوت و طبیعت', fingilish: 'Tarāvat o Tabi’at', en: 'Freshness & Nature', es: 'Frescura y Naturaleza', fr: 'Fraîcheur et Nature', de: 'Frische und Natur' },
  { char: 'ظ', name: '20. Zā (ظ)', wordFa: 'ظرافت هنر فرش', fingilish: 'Zarāfat-e honar-e farsh', en: 'Elegance of Carpet Art', es: 'Elegancia del arte persa', fr: 'Élégance de l’art du tapis', de: 'Feinheit der Teppichkunst' },
  { char: 'ع', name: '21. Ayn (ع)', wordFa: 'عشق و عرفان', fingilish: 'Eshgh o Erfān', en: 'Love & Mysticism', es: 'Amor y Misticismo', fr: 'Amour et Mysticisme', de: 'Liebe und Mystik' },
  { char: 'غ', name: '22. Ghayn (غ)', wordFa: 'غزل عاشقانه', fingilish: 'Ghazal-e āsheghāneh', en: 'Romantic Lyric Poem', es: 'Poema lírico', fr: 'Poème lyrique', de: 'Liebesgedicht' },
  { char: 'ف', name: '23. Fe (ف)', wordFa: 'فردوسی و فرهنگ', fingilish: 'Ferdowsi o Farhang', en: 'Ferdowsi & Culture', es: 'Ferdowsi y Cultura', fr: 'Ferdowsi et Culture', de: 'Ferdowsi und Kultur' },
  { char: 'ق', name: '24. Ghāf (ق)', wordFa: 'قالیچه دستباف', fingilish: 'Ghālicheh-ye dastbāf', en: 'Hand-knotted Persian Rug', es: 'Alfombra persa tejida a mano', fr: 'Tapis persan noué à la main', de: 'Handgeknüpfter Perserteppich' },
  { char: 'ک', name: '25. Kāf (ک)', wordFa: 'کتاب و کوشش', fingilish: 'Ketāb o Kooshesh', en: 'Book & Effort', es: 'Libro y Esfuerzo', fr: 'Livre et Effort', de: 'Buch und Mühe' },
  { char: 'گ', name: '26. Gāf (گ — Exclusive Persian)', wordFa: 'گلستان و گفتگو', fingilish: 'Golestān o Goftogoo', en: 'Rose Garden & Dialogue', es: 'Jardín de rosas y diálogo', fr: 'Roseraie et dialogue', de: 'Rosengarten & Dialog' },
  { char: 'ل', name: '27. Lām (ل)', wordFa: 'لبخند و لبو', fingilish: 'Labkhand o Laboo', en: 'Smile & Sweet Beet', es: 'Sonrisa', fr: 'Sourire', de: 'Lächeln' },
  { char: 'م', name: '28. Mim (م)', wordFa: 'مامان‌بزرگ عزیزم', fingilish: 'Māmān-bozorg-e azizam', en: 'My Dear Grandmother', es: 'Mi querida abuela', fr: 'Ma chère grand-mère', de: 'Meine liebe Großmutter' },
  { char: 'ن', name: '29. Noon (ن)', wordFa: 'نوروز باستانی', fingilish: 'Nowrooz-e bāstāni', en: 'Ancient Nowruz New Year', es: 'Nowruz antiguo', fr: 'Norouz ancien', de: 'Nouruz-Neujahrsfest' },
  { char: 'و', name: '30. Vāv (و)', wordFa: 'وطن و وفاداری', fingilish: 'Vatan o Vafādāri', en: 'Homeland & Loyalty', es: 'Patria y Lealtad', fr: 'Patrie et Loyauté', de: 'Heimat und Treue' },
  { char: 'ه', name: '31. He (ه)', wordFa: 'هم‌ریشگی و همدلی', fingilish: 'Ham-rishegi o Hamdeli', en: 'Shared Roots & Empathy', es: 'Raíces compartidas', fr: 'Racines communes', de: 'Gemeinsame Wurzeln' },
  { char: 'ی', name: '32. Ye (ی)', wordFa: 'یلدا و یکدلی', fingilish: 'Yaldā o Yekdeli', en: 'Yalda Night & Unity', es: 'Noche de Yalda y Unidad', fr: 'Nuit de Yalda et Unité', de: 'Yalda-Nacht und Einheit' }
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
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [strokeCount, setStrokeCount] = useState<number>(0);

  // Smart Auto-Type Ink-to-Text state for Persian Blackboard
  const [autoTypeEnabled, setAutoTypeEnabled] = useState<boolean>(true);
  const [autoAdvanceNext, setAutoAdvanceNext] = useState<boolean>(true);
  const [typedPersianLine, setTypedPersianLine] = useState<string>('');
  const [lastTypedFlash, setLastTypedFlash] = useState<string | null>(null);
  const [activeSentenceIdx, setActiveSentenceIdx] = useState<number>(0);
  const [forceShowFullSentenceTopBar, setForceShowFullSentenceTopBar] = useState<boolean>(true);
  const [sentenceBuildErrorNote, setSentenceBuildErrorNote] = useState<string | null>(null);
  const autoTypeTimerRef = useRef<number | null>(null);

  const PERSIAN_COLLOQUIAL_SENTENCE_DRILLS = [
    {
      id: 'pcs_1',
      targetWord: 'خالیه',
      wrongSample: 'این روزا دستم خیلی خالیع',
      fullCorrectColloquialSentence: 'این روزا دستم خیلی خالیه!',
      formalComparison: 'این روزها از نظر مالی دستم خالی است (کنایه از وضع نامساعد مالی).',
      fingilish: 'In roozā dastam kheyli khāliyeh!',
      englishMeaning: "I'm really strapped for cash / short on money these days!",
      wordBlocks: ['این روزا', 'دستم', 'خیلی', 'خالیه!'],
      spellingHintFa: 'در فارسی محاوره‌ای صدای «ـه» در پایان «خالیه» (خالی است) با حرف «ه» نوشته می‌شود، نه «ع».'
    },
    {
      id: 'pcs_2',
      targetWord: 'میزونه',
      wrongSample: 'رفیق همه چی میزونع',
      fullCorrectColloquialSentence: 'رفیق حالت چطوره؟ همه چی میزونه؟',
      formalComparison: 'دوست عزیز حال شما چطور است؟ آیا همه‌چیز روبه‌راه است؟',
      fingilish: 'Rafigh hālet chetoreh? Hameh chi mizooneh?',
      englishMeaning: 'How are you doing buddy? Is everything sorted and going well?',
      wordBlocks: ['رفیق', 'حالت چطوره؟', 'همه چی', 'میزونه؟'],
      spellingHintFa: 'واژه محاوره‌ای «میزونه» (روبه‌راه و تنظیم است) با «ز» و «ه» پایانی نوشته می‌شود.'
    },
    {
      id: 'pcs_3',
      targetWord: 'سنگ تموم',
      wrongSample: 'دمت گرم صنگ تموم گزاشتی',
      fullCorrectColloquialSentence: 'دمت گرم رفیق، واقعاً سنگ تموم گذاشتی!',
      formalComparison: 'از محبت شما سپاسگزارم، واقعاً نهایت لطف را به جا آوردید.',
      fingilish: 'Damet garm rafigh, vāghe’an sang tamoom gozāshti!',
      englishMeaning: 'Bless you my friend, you really went all out for us!',
      wordBlocks: ['دمت گرم', 'رفیق،', 'واقعاً', 'سنگ تموم گذاشتی!'],
      spellingHintFa: '«سنگ» با «س» (سین) و «گذاشتی» با حرف «ذ» (ذال) نوشته می‌شود.'
    },
    {
      id: 'pcs_4',
      targetWord: 'کشتی‌هات',
      wrongSample: 'چته کشتی هات قرق شده',
      fullCorrectColloquialSentence: 'چته کشتی‌هات غرق شده؟ بابا انقدر رو مخ من راه نرو!',
      formalComparison: 'چرا این‌قدر پکر و غمگین هستی؟ لطفاً این‌قدر مرا کلافه نکن.',
      fingilish: 'Cheteh keshti-hāt ghargh shodeh? Bābā enghadr roo mokh-e man rāh naro!',
      englishMeaning: 'Why the long face, did your ships sink? Man, stop walking on my nerves!',
      wordBlocks: ['چته', 'کشتی‌هات غرق شده؟', 'بابا انقدر', 'رو مخ من راه نرو!'],
      spellingHintFa: 'واژه «غرق» با حرف «غ» (غین) نوشته می‌شود، نه «ق».'
    }
  ];

  const activeDrill = PERSIAN_COLLOQUIAL_SENTENCE_DRILLS[activeSentenceIdx] || PERSIAN_COLLOQUIAL_SENTENCE_DRILLS[0];

  // Evaluate Persian Dictation & Sentence Building accuracy
  const evaluatePersianBoardDictation = () => {
    const cleaned = typedPersianLine.trim();
    if (!cleaned) {
      return {
        hasSpellingOrOrderError: Boolean(sentenceBuildErrorNote),
        errorReasonFa:
          sentenceBuildErrorNote ||
          'برای ساختن جمله روی کلمات کلیک کنید یا با انگشت روی تخته بنویسید. کل جمله صحیح و دیکته درست در نوار بالای تخته نمایش داده شده است.'
      };
    }

    const commonPersianMisspellings: Record<string, string> = {
      صلام: 'املای صحیح «سلام» با حرف «س» است، نه «ص».',
      طهران: 'املای استاندارد امروز «تهران» با «ت» دو نقطه است.',
      خاهش: 'واژه «خواهش» دارای «و» معدوله است (خ-و-ا-ه-ش).',
      قرق: 'در عبارت «کشتی‌هات غرق شده»، واژه «غرق» با حرف «غ» نوشته می‌شود.',
      گزاشتی: 'واژه «گذاشتی» با حرف «ذ» نوشته می‌شود (گ-ذ-ا-ش-ت-ی).',
      صنگ: 'واژه «سنگ» با حرف «س» نوشته می‌شود.',
      خالیع: 'در پایان «خالیه» حرف «ه» قرار می‌گیرد، نه «ع».',
      میزونع: 'در پایان «میزونه» حرف «ه» قرار می‌گیرد، نه «ع».'
    };

    for (const [wrongWord, hint] of Object.entries(commonPersianMisspellings)) {
      if (cleaned.includes(wrongWord)) {
        return {
          hasSpellingOrOrderError: true,
          errorReasonFa: hint
        };
      }
    }

    const normalizedTargetSentence = activeDrill.fullCorrectColloquialSentence.replace(/[!؟?،.]/g, '').trim();
    const normalizedCleaned = cleaned.replace(/[!؟?،.]/g, '').trim();

    if (
      normalizedCleaned.length > 1 &&
      !normalizedTargetSentence.startsWith(normalizedCleaned) &&
      !activeDrill.targetWord.startsWith(normalizedCleaned) &&
      normalizedCleaned !== normalizedTargetSentence
    ) {
      return {
        hasSpellingOrOrderError: true,
        errorReasonFa:
          sentenceBuildErrorNote ||
          `نوشته شما («${cleaned}») با دیکته یا ترتیب صحیح جمله هدف تفاوت دارد. کل جمله صحیح و دیکته کامل را در نوار بالا ببینید.`
      };
    }

    return {
      hasSpellingOrOrderError: Boolean(sentenceBuildErrorNote),
      errorReasonFa: sentenceBuildErrorNote || activeDrill.spellingHintFa
    };
  };

  const persianDictationState = evaluatePersianBoardDictation();

  const currentLetter = TRIPLE_SCRIPT_LETTERS[selectedLetterIdx] || TRIPLE_SCRIPT_LETTERS[0];
  const activeSinglePersianChar = currentLetter.char.split(' ')[0].trim();

  // Draw guide watermark on Canvas whenever selected letter changes
  const drawLetterWatermark = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Top Auto-Typed Standard Strip + Correct Full Sentence Strip inside the Persian Blackboard
    ctx.save();
    ctx.fillStyle = persianDictationState.hasSpellingOrOrderError
      ? 'rgba(136, 19, 55, 0.94)'
      : 'rgba(2, 44, 34, 0.94)';
    ctx.fillRect(8, 6, canvas.width - 16, 48);
    ctx.strokeStyle = persianDictationState.hasSpellingOrOrderError
      ? 'rgba(251, 113, 133, 0.9)'
      : 'rgba(251, 191, 36, 0.75)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(8, 6, canvas.width - 16, 48);

    ctx.font = 'bold 13px Vazirmatn, sans-serif';
    ctx.fillStyle = '#fde047';
    ctx.textAlign = 'right';
    const topCorrectBarText = `✅ دیکته و جمله صحیح: ${activeDrill.fullCorrectColloquialSentence}`;
    ctx.fillText(topCorrectBarText, canvas.width - 16, 24);

    ctx.font = 'bold 14px Vazirmatn, sans-serif';
    ctx.fillStyle = '#ffffff';
    const userLineOnBoard =
      typedPersianLine.length > 0
        ? `✍️ نوشته شما: ${typedPersianLine}▋`
        : '✍️ با کشیدن حرف یا کلیک روی کلمات، جمله خودمانی اینجا ساخته می‌شود...';
    ctx.fillText(userLineOnBoard, canvas.width - 16, 44);
    ctx.restore();

    // Subtle baseline
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.28)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(24, canvas.height * 0.76);
    ctx.lineTo(canvas.width - 24, canvas.height * 0.76);
    ctx.stroke();
    ctx.setLineDash([]);

    // Guide Persian Character
    ctx.fillStyle = 'rgba(251, 191, 36, 0.22)';
    ctx.font = '900 102px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(activeSinglePersianChar, canvas.width / 2, canvas.height * 0.62);
  };

  useEffect(() => {
    drawLetterWatermark();
    setStrokeCount(0);
  }, [selectedLetterIdx, typedPersianLine, activeSentenceIdx, sentenceBuildErrorNote]);

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
    if (autoTypeTimerRef.current) {
      window.clearTimeout(autoTypeTimerRef.current);
      autoTypeTimerRef.current = null;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = getPointerPos(e);
    setIsDrawing(true);
    ctx.strokeStyle = isEraser ? '#0f172a' : '#fbbf24';
    ctx.lineWidth = isEraser ? 26 : 10;
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
    if (!isEraser) {
      setStrokeCount((prev) => {
        const next = prev + 1;
        if (next === 2) {
          sound.playCoin();
          onEarnLingous(15);
        }
        return next;
      });

      if (autoTypeEnabled) {
        if (autoTypeTimerRef.current) {
          window.clearTimeout(autoTypeTimerRef.current);
        }
        autoTypeTimerRef.current = window.setTimeout(() => {
          sound.playPop();
          setTypedPersianLine((prev) => prev + activeSinglePersianChar);
          setLastTypedFlash(activeSinglePersianChar);
          setTimeout(() => setLastTypedFlash(null), 900);
          speakPersian(activeSinglePersianChar, speechRate);
          onEarnLingous(5);
          if (autoAdvanceNext) {
            setSelectedLetterIdx((prev) =>
              prev < TRIPLE_SCRIPT_LETTERS.length - 1 ? prev + 1 : 0
            );
          }
        }, 650);
      }
    }
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
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-amber-300">
                🖐️ تخته هوشمند مشق الفبای فارسی (با تایپ خودکار و پاک‌کن):
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setAutoTypeEnabled((prev) => !prev);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-black border ${
                    autoTypeEnabled
                      ? 'bg-amber-400 text-slate-950 border-amber-200'
                      : 'bg-slate-800 text-slate-300 border-slate-600'
                  }`}
                >
                  {autoTypeEnabled ? '✨ تایپ خودکار: روشن' : 'تایپ خودکار: خاموش'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIsEraser((prev) => !prev);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-black flex items-center gap-1 border ${
                    isEraser
                      ? 'bg-rose-500 text-white border-rose-300'
                      : 'bg-slate-800 text-rose-200 border-rose-500/40'
                  }`}
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>{isEraser ? 'پاک‌کن دستی (فعال)' : 'پاک‌کن دستی'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    drawLetterWatermark();
                    setStrokeCount(0);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-black text-[11px]"
                >
                  پاک کردن تخته
                </button>
              </div>
            </div>

            {/* TOP-OF-BLACKBOARD DICTATION & COMPLETE COLLOQUIAL SENTENCE BAR */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border-2 border-amber-400/80 space-y-2 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <span className="font-black text-amber-300">
                  🎯 نوار بالای تخته (دیکته صحیح و نمایش کل جمله خودمانی):
                </span>
                <div className="flex flex-wrap gap-1">
                  {PERSIAN_COLLOQUIAL_SENTENCE_DRILLS.map((d, idx) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setActiveSentenceIdx(idx);
                        setTypedPersianLine('');
                        setSentenceBuildErrorNote(null);
                      }}
                      className={`px-2 py-0.5 rounded-lg font-black transition-all ${
                        activeSentenceIdx === idx
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      جمله {idx + 1}: {d.targetWord}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prominent Top Bar showing Correct Dictation & Full Correct Sentence */}
              {(forceShowFullSentenceTopBar || persianDictationState.hasSpellingOrOrderError) && (
                <div
                  className={`p-2.5 rounded-xl border-2 space-y-1 ${
                    persianDictationState.hasSpellingOrOrderError
                      ? 'bg-rose-950/95 border-rose-400 animate-pulse'
                      : 'bg-slate-950/90 border-emerald-500/60'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black">
                      {persianDictationState.hasSpellingOrOrderError
                        ? '🚨 اصلاح دیکته و نمایش کل جمله صحیح در نوار بالا'
                        : '✅ نوار دیکته صحیح و کل جمله خودمانی هدف'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          speakPersian(
                            activeDrill.fullCorrectColloquialSentence,
                            speechRate,
                            activeDrill.fingilish
                          )
                        }
                        className="px-2 py-0.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-[10px] font-black flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>🔊 شنیدن جمله صحیح</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setTypedPersianLine(activeDrill.fullCorrectColloquialSentence);
                          setSentenceBuildErrorNote(null);
                          speakPersian(
                            activeDrill.fullCorrectColloquialSentence,
                            speechRate,
                            activeDrill.fingilish
                          );
                        }}
                        className="px-2 py-0.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-black"
                      >
                        ✨ درج کل جمله صحیح
                      </button>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-black text-amber-300" dir="rtl">
                    🌟 کل جمله صحیح (عامیانه و خودمانی): «{activeDrill.fullCorrectColloquialSentence}»
                  </p>
                  <p className="text-[11px] font-bold text-emerald-200" dir="rtl">
                    ✅ دیکته صحیح واژه کلیدی: «{activeDrill.targetWord}» ({activeDrill.targetWord.split('').join(' - ')})
                  </p>
                  <p className="text-[11px] font-mono text-cyan-200" dir="ltr">
                    🗣️ Finglish: "{activeDrill.fingilish}" — {activeDrill.englishMeaning}
                  </p>
                  {persianDictationState.hasSpellingOrOrderError && (
                    <p className="text-[11px] text-rose-200 font-bold" dir="rtl">
                      💡 راهنمای املا و جمله‌سازی: {persianDictationState.errorReasonFa}
                    </p>
                  )}
                </div>
              )}

              {/* Word-by-word Sentence Builder Chips + "Show Full Correct Sentence" Rescue Button */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] text-emerald-200">
                  <span className="font-bold">🧩 جمله‌سازی خودمانی (کلمات را به ترتیب بزنید):</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setTypedPersianLine(activeDrill.wrongSample);
                        setSentenceBuildErrorNote(
                          'در صورت اشتباه املایی یا ناتوانی در ساخت جمله، کل جمله صحیح و دیکته درست در نوار بالا به شما نشان داده می‌شود!'
                        );
                      }}
                      className="px-2 py-0.5 rounded bg-rose-500/30 hover:bg-rose-500/50 text-rose-200 font-black border border-rose-400/40"
                    >
                      🧪 تست غلط املایی / ناتوانی در ساخت جمله
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setForceShowFullSentenceTopBar(true);
                        setTypedPersianLine(activeDrill.fullCorrectColloquialSentence);
                        setSentenceBuildErrorNote(null);
                        speakPersian(
                          activeDrill.fullCorrectColloquialSentence,
                          speechRate,
                          activeDrill.fingilish
                        );
                      }}
                      className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black"
                    >
                      👁️ نمایش کل جمله صحیح در نوار بالا
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeDrill.wordBlocks.map((wb, wIdx) => (
                    <button
                      key={wIdx}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        const currentParts = typedPersianLine.trim()
                          ? typedPersianLine.trim().split(/\s+/)
                          : [];
                        const expectedNext = activeDrill.wordBlocks[0];
                        if (currentParts.length === 0 && wb !== expectedNext) {
                          setSentenceBuildErrorNote(
                            `ترتیب جمله درست نبود؛ کل جمله صحیح در نوار بالای تخته برای شما نمایش داده شد: «${activeDrill.fullCorrectColloquialSentence}»`
                          );
                          setForceShowFullSentenceTopBar(true);
                        } else {
                          setSentenceBuildErrorNote(null);
                        }
                        setTypedPersianLine((prev) => (prev ? `${prev.trim()} ${wb}` : wb));
                        speakPersian(wb, speechRate);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-200 border border-amber-400/40 text-xs font-black"
                    >
                      {wb}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editable / Auto-Typed Input Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-emerald-700/60">
                <input
                  type="text"
                  value={typedPersianLine}
                  onChange={(e) => setTypedPersianLine(e.target.value)}
                  dir="rtl"
                  placeholder="با کشیدن حرف روی تخته یا نوشتن در اینجا، دیکته و جمله شما بررسی می‌شود..."
                  className="flex-1 min-w-[160px] bg-transparent text-sm sm:text-base font-black text-amber-200 placeholder:text-[11px] placeholder:text-slate-400 focus:outline-none"
                />
                {lastTypedFlash && (
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black">
                    +{lastTypedFlash}
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setAutoAdvanceNext((prev) => !prev)}
                    className="px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-200 text-[10px] font-bold"
                  >
                    {autoAdvanceNext ? '⏭️ پیشروی حرف' : 'تکرار حرف'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTypedPersianLine((prev) => prev + ' ')}
                    className="px-2 py-0.5 rounded bg-slate-800 text-white text-[10px] font-bold"
                  >
                    فاصله
                  </button>
                  <button
                    type="button"
                    onClick={() => setTypedPersianLine((prev) => prev.slice(0, -1))}
                    className="px-2 py-0.5 rounded bg-slate-800 text-rose-200 text-[10px] font-bold"
                  >
                    ⌫
                  </button>
                  {typedPersianLine && (
                    <button
                      type="button"
                      onClick={() => {
                        setTypedPersianLine('');
                        setSentenceBuildErrorNote(null);
                      }}
                      className="px-2 py-0.5 rounded bg-rose-900/80 text-white text-[10px] font-bold"
                    >
                      پاک کردن سطر
                    </button>
                  )}
                </div>
              </div>
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
