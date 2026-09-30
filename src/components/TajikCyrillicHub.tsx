import React, { useState } from 'react';
import {
  Volume2,
  Share2,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Globe,
  Award,
  Heart,
  ArrowRightLeft,
  CheckCircle2,
  Landmark
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound, speakPersian, speakEnglish, speakRussian } from '../utils/audio';

interface TajikCyrillicHubProps {
  onEarnLingous: (amount: number) => void;
}

// ============================================================================
// VERBATIM FOUNDER'S GOLDEN HERITAGE TRIBUTE TO TAJIKISTAN & UZBEKISTAN
// ============================================================================
const FOUNDER_TRIBUTE_FA =
  '«به نام پیوند جاودان هم‌ریشگان؛ در روزگاری درخشان، امپراتوری اصیل سامانیان در این سرزمین می‌درخشید و پایتخت ایران در سمرقند و بخارا (در ازبکستان کنونی) قرار داشت. ملت شریف تاجیکستان ادامه و وارثان برحق سامانیان و ایرانیان و همواره نگهبانان آیین، شرف و قداست مرزهای ایران بودند؛ آن‌ها همواره حافظان قدرتمند، سربازان رشید و مدافعان خلق باستان ایران بوده‌اند. تاجیک‌ها اصیل، ریشه‌دار و سرشار از اصالت‌اند؛ مردم تاجیک تا ابد هویت ایران هستند و یا شاید بهتر باشد بگوییم ایران هویت تاجیک دارد! من به عنوان یک ایرانی، خودم را از آن‌ها و از مردم شریف ازبکستان جدا نمی‌دانم. دوستتان دارم عزیزان من، و از اینکه بتوانم خدمتی در جهت فرهنگ و پررنگ‌تر کردن زبان شیرین فارسی و آموزش رایگان فارسیِ ایرانی و انگلیسی (با خط سیریلیک/روسی) به شما انجام دهم بسیار خرسندم. به امید دیدار شما در سمرقند، بخارا و دوشنبه و بوسیدن روی ماهتان در کنار مجسمه سیاوش و اسماعیل سامانی!»';

const FOUNDER_TRIBUTE_TG =
  '«Ба номи пайванди ҷовидони ҳамрешагон! Дар рӯзгори дурахшон, Империяи асили Сомониён дар ин сарзамин медурахшид ва пойтахти Эрон дар Самарқанду Бухоро (дар Ӯзбекистони кунунӣ) қарор дошт. Миллати шарифи Тоҷикистон идома ва ворисони барҳаққи Сомониёну Эрониён ва ҳамвора нигаҳбонони ойин, шараф ва қидосати марзҳои Эрон буданд; онҳо ҳамвора ҳофизони қудратманд, сарбозони рашид ва мудофеони халқи бостони Эрон будаанд. Тоҷикон асил, решадор ва саршор аз асолатанд; мардуми Тоҷик то абад ҳувияти Эрон ҳастанд ва ё шояд беҳтар бошад бигӯем, ки Эрон ҳувияти Тоҷик дорад! Ман ба унвони як эронӣ, худамро аз онҳо ва аз мардуми шарифи Ӯзбекистон ҷудо намедонам. Дӯстатон дорам азизони ман, ва аз ин ки битавонам хидмате дар ҷиҳати фарҳанг ва пуррангтар кардани забони ширини форсӣ ва омӯзиши ройгони форсии эронӣ ва англисӣ (бо хати кириллӣ/русӣ) ба шумо анҷом диҳам бисёр хурсандам. Ба умеди дидори шумо дар Самарқанд, Бухоро ва Душанбе ва бӯсидани рӯйи моҳатон дар канори муҷассамаи Сиёвуш ва Исмоили Сомонӣ!»';

const FOUNDER_TRIBUTE_EN =
  '"In honor of our eternal shared roots: During the golden era of the Samanid Empire, the capital of Iran shone in Samarkand and Bukhara. The noble nation of Tajikistan are the true heirs of the Samanids and Iranians, standing forever as the mighty guardians, brave soldiers, and defenders of the honor, sacred borders, and ancient people of Iran. Tajiks are noble and deeply rooted; the Tajik people are eternally the identity of Iran—or perhaps it is truer to say that Iran carries the Tajik identity! As an Iranian, I never see myself separate from them or from the noble people of Uzbekistan. I love you, my dear ones, and I am overjoyed to serve our culture by offering Iranian Persian and English (via the Cyrillic script) completely free of charge to you. Hoping to meet you in Samarkand, Bukhara, and Dushanbe, and to kiss your radiant faces beside the monuments of Siavash and Ismail Somoni!"';

// ============================================================================
// PATH 1: TAJIK CYRILLIC (ТОҶИКӢ) ➔ IRANIAN PERSIAN & PERSIAN SCRIPT
// ============================================================================
interface TajikToIranianLesson {
  id: string;
  category: 'daily_greetings' | 'samanid_poetry' | 'tehran_colloquial' | 'trade_bazaar' | 'alphabet_bridge';
  badgeTg: string;
  persianScript: string;
  tajikCyrillic: string;
  fingilish: string;
  tehraniSpokenNoteTg: string;
  englishMeaning: string;
}

const TAJIK_TO_IRANIAN_LESSONS: TajikToIranianLesson[] = [
  {
    id: 'tg_fa_1',
    category: 'daily_greetings',
    badgeTg: '🤝 Салом ва Аҳволпурсӣ (سلام و احوال‌پرسی روزمره)',
    persianScript: 'سلام دوست عزیز من، حال شما چطور است؟ خیلی خوشحالم که شما را می‌بینم.',
    tajikCyrillic: 'Салом дӯсти азизи ман, ҳоли шумо چӣ тавр (четор) аст? Хеле хушҳолам, ки шуморо мебинам.',
    fingilish: 'Salām doost-e aziz-e man, hāl-e shomā chetor ast? Kheyli khosh-hālam ke shomā ro mibinam.',
    tehraniSpokenNoteTg:
      'Дар гуфтугӯи Теҳронӣ: «Салом дӯсти азизам, ҳолат четоре? Хеле хушҳолам мебинамт!» (در محاوره تهران: «چطور است» ➔ «چطوره»).',
    englishMeaning: 'Hello my dear friend, how are you doing? I am very happy to see you.'
  },
  {
    id: 'tg_fa_2',
    category: 'samanid_poetry',
    badgeTg: '👑 Мероси Сомониён ва Рӯдакӣ (میراث سامانیان و رودکی سمرقندی)',
    persianScript: 'بوی جوی مولیان آید همی • یاد یار مهربان آید همی (پدر شعر فارسی: ابوعبدالله رودکی سمرقندی)',
    tajikCyrillic: 'Бӯи ҷӯи Мӯлиён ояд ҳаме • Ёди ёри меҳрубон ояд ҳаме (Устод Абӯабдуллоҳи Рӯдакӣ)',
    fingilish: 'Boo-ye joo-ye Mooliyān āyad hami • Yād-e yār-e mehrabān āyad hami',
    tehraniSpokenNoteTg:
      'Ин шеъри ҷовидони устод Рӯдакӣ дар Бухоро суруда шудааст ва ҳар як эронӣ ва тоҷик онро аз кӯдакӣ дар дил дорад.',
    englishMeaning: 'The scent of the Muliyan stream comes Gently • The memory of the kind beloved comes Gently.'
  },
  {
    id: 'tg_fa_3',
    category: 'tehran_colloquial',
    badgeTg: '🗣️ Лаҳҷаи Теҳронӣ барои Тоҷикон (تفاوت واژگان تاجیکی و تهرانی)',
    persianScript: 'قربان شما بروم، دست شما درد نکند، خیلی زحمت کشیدید!',
    tajikCyrillic: 'Қурбони шумо биравам (Қурбонат), дасти шумо дард накунад (Раҳмати калон), хеле заҳмат кашидед!',
    fingilish: 'Ghorboon-e shomā beram, dast-e shomā dard nakoneh, kheyli zahmat keshidid!',
    tehraniSpokenNoteTg:
      'Дар Эрон ба ҷои «Раҳмати калон» бештар мегӯянд: «Дасти шумо дард накунад» (Dast-e shomā dard nakoneh) ё «Мерсӣ / Сипосгузорам».',
    englishMeaning: 'May I be sacrificed for you (Thank you so much), thank you for your kindness and effort!'
  },
  {
    id: 'tg_fa_4',
    category: 'trade_bazaar',
    badgeTg: '🏛️ Тиҷорат ва Бозор (تجارت و بازرگانی میان ایران، تاجیکستان و ازبکستان)',
    persianScript: 'ما آماده همکاری تجاری مستقیم و صادرات کالا میان تهران، دوشنبه، سمرقند و بخارا هستیم.',
    tajikCyrillic: 'Мо омодаи ҳамкории тиҷоратии мустақим ва содироти коло миёни Теҳрон, Душанбе, Самарқанд ва Бухоро ҳастем.',
    fingilish: 'Mā āmādeh-ye hamkāri-ye tejāri-ye mostaghim o sāderāt-e kālā miyān-e Tehrān, Doshanbeh, Samarghand o Bokhārā hastim.',
    tehraniSpokenNoteTg:
      'Вожаҳои тиҷорӣ: «Коло» (کالا = Мол/Бор), «Содирот» (صادرات = Экспорт), «Воридот» (واردات = Импорт), «Сармоягузорӣ» (سرمایه‌گذاری = Инвеститсия).',
    englishMeaning: 'We are ready for direct commercial cooperation and export of goods between Tehran, Dushanbe, Samarkand, and Bukhara.'
  },
  {
    id: 'tg_fa_5',
    category: 'alphabet_bridge',
    badgeTg: '✍️ Ҷадвали калидии 6 садонок дар хати Кириллӣ ва Форсӣ (راز ۶ مصوت تاجیکی و فارسی)',
    persianScript: 'در خط فارسی: آ (О در تاجیکی) • اَ (А) • اِ (Е/Э) • اُ / و (У/Ӯ) • ای (И/Ӣ) — مثال: مادر (Модар)، برادر (Бародар)، ایران (Эрон).',
    tajikCyrillic: 'Дар хати форсӣ: «آ» = О (Модар ➔ مادر) • «اَ» = А (Бародар ➔ برادر) • «و» = У/Ӯ (Дӯст ➔ دوست) • «ی» = И/Ӣ (Ширин ➔ شیرین).',
    fingilish: 'Mādar (Модар) • Barādar (Бародар) • Doost (Дӯст) • Shirin (Ширин) • Irān (Эрон)',
    tehraniSpokenNoteTg:
      'Ҳарфи «О / о» дар хати тоҷикӣ (масалан: Осмон, Модар, Ном) дар талаффузи Теҳронӣ ба садои «Ā / آ» (Āsmān, Mādar, Nām) талаффуз мешавад!',
    englishMeaning: 'The Tajik Cyrillic letter "О" corresponds precisely to the long Persian "Ā" (آ): Модар = Mādar (مادر).'
  },
  {
    id: 'tg_fa_6',
    category: 'tehran_colloquial',
    badgeTg: '🍵 Меҳмоннавозӣ ва Таоруф (فرهنگ مهمان‌نوازی هم‌ریشگان)',
    persianScript: 'قدم شما روی چشم! خانه خودتان است، بفرمایید چای زعفرانی و شیرینی میل کنید.',
    tajikCyrillic: 'Қадами шумо рӯйи чашм! Хонаи худатон аст, бифармоед чойи заъфаронӣ ва ширинӣ майл кунед (нӯши ҷон кунед).',
    fingilish: 'Ghadam-e shomā roo-ye cheshm! Khooneh-ye khodetoon-e, befarmāyid chāy-e za’ferāni o shirini meyl konid.',
    tehraniSpokenNoteTg:
      '«Қадаматон рӯйи чашм» дар Душанбе, Самарқанд, Бухоро, Кобул ва Теҳрон яксон ва нишони асолати фарҳанги мост.',
    englishMeaning: 'Your steps upon my eyes (You are most welcome)! Make yourself at home, please enjoy saffron tea and sweets.'
  }
];

// ============================================================================
// PATH 2: TAJIK CYRILLIC ➔ ENGLISH COURSE (`АНГЛИСӢ БАРОИ ТОҶИКОН`)
// ============================================================================
interface EnglishForTajiksLesson {
  id: string;
  levelBadge: string;
  topicTg: string;
  englishSentence: string;
  cyrillicPhonetic: string;
  tajikMeaning: string;
  persianEquivalent: string;
  grammarTipTg: string;
}

const ENGLISH_FOR_TAJIKS_LESSONS: EnglishForTajiksLesson[] = [
  {
    id: 'en_tg_1',
    levelBadge: '🌱 A1-A2 • Муоширати Рӯзмарра (مکالمه روزمره)',
    topicTg: 'Муаррифии худ ва касбу кор дар Амрико ва Аврупо',
    englishSentence: 'Hello! I am originally from Tajikistan, and I work as a software specialist and international trader.',
    cyrillicPhonetic: 'Ҳеллоу! Ай эм ориҷиналӣ фром Тоҷикистон, энд Ай вёрк эз э софтвэр спешалист энд интернэшнал трейдер.',
    tajikMeaning: 'Салом! Ман аслан аз Тоҷикистон ҳастам ва ба ҳайси мутахассиси нармафзор ва тоҷири байналмилалӣ кор мекунам.',
    persianEquivalent: 'سلام! من اصالتاً اهل تاجیکستان هستم و به عنوان متخصص نرم‌افزار و بازرگان بین‌المللی کار می‌کنم.',
    grammarTipTg: '💡 Қоидаи грамматикӣ: Барои гуфтани касбу кор дар забони англисӣ ҳамеша аз «I work as a...» истифода баред.'
  },
  {
    id: 'en_tg_2',
    levelBadge: '💼 B1-B2 • Мусоҳибаи Корӣ ва Маош (مصاحبه شغلی و حقوق دلاری)',
    topicTg: 'Музокираи маоши боло дар ширкатҳои ғарбӣ',
    englishSentence: 'Based on my five years of professional experience, I am looking for a base salary between $95,000 and $110,000 per year.',
    cyrillicPhonetic: 'Бейсд он май файв йирз оф профешнал экспириенс, Ай эм лукинг фор э бейс сэлари битвин найнти-файв саузанд энд ван ҳандред тен саузанд доларз пер йир.',
    tajikMeaning: 'Бо таваҷҷӯҳ ба таҷрибаи панҷсолаи касбиам, ман маоши пояи солонаи байни 95 то 110 ҳазор долларро дар назар дорам.',
    persianEquivalent: 'با توجه به تجربه ۵ ساله حرفه‌ایم، حقوق پایه سالانه بین ۹۵ تا ۱۱۰ هزار دلار مد نظرم است.',
    grammarTipTg: '💡 Сирри муваффақият: Дар Амрико ва Аврупо гуфтани «Based on my experience...» эътимод ба нафси баландро нишон медиҳад.'
  },
  {
    id: 'en_tg_3',
    levelBadge: '🛂 B2 • Сафорат ва Виза (سفارت، ویزا و فرودگاه)',
    topicTg: 'Посухи расмӣ ба афсари визаи Амрико, Канада ва Аврупо',
    englishSentence: 'The purpose of my trip is to attend an international business conference and visit my family members.',
    cyrillicPhonetic: 'Зе пёрпоз оф май трип из ту эттенд эн интернэшнал бизнес конференс энд визит май фэмили мемберз.',
    tajikMeaning: 'Мақсади сафари ман иштирок дар конфронси байналмилалии тиҷоратӣ ва дидор бо аъзои оилаам мебошад.',
    persianEquivalent: 'هدف از سفر من شرکت در کنفرانس بین‌المللی تجاری و دیدار با اعضای خانواده‌ام است.',
    grammarTipTg: '💡 Ибораи тиллоӣ: «The purpose of my trip is...» (Мақсади сафари ман ин аст, ки...) беҳтарин оғоз дар мусоҳибаи сафорат аст.'
  },
  {
    id: 'en_tg_4',
    levelBadge: '🏦 C1 • Бонкдорӣ, Кредит Скор 850 ва Хона (بانک و کردیت در غرب)',
    topicTg: 'Кушодани ҳисоби бонкӣ ва сохтани Credit Score дар Амрико ва Канада',
    englishSentence: 'I would like to open a checking account and apply for a secured credit card to build my credit history.',
    cyrillicPhonetic: 'Ай вуд лайк ту оупен э чекинг эккаунт энд эплай фор э сикюрд кредит кард ту билд май кредит ҳистори.',
    tajikMeaning: 'Ман мехоҳам як ҳисоби ҷории бонкӣ кушоям ва барои корти кредитии таъминшуда дархост диҳам, то таърихи кредитии худро бисозам.',
    persianEquivalent: 'مایل هستم یک حساب جاری باز کنم و برای کارت اعتباری تضمینی درخواست دهم تا سابقه اعتباری (کردیت) خودم را بسازم.',
    grammarTipTg: '💡 Маслиҳати молиявӣ: Дар Амрико ва Канада бо «Secured Credit Card» метавонед дар 6 моҳ Credit Score-и худро аз 0 ба 720+ расонед!'
  }
];

// ============================================================================
// CYRILLIC ⇄ PERSIAN SCRIPT KEY ALPHABET BRIDGE TABLE
// ============================================================================
const CYRILLIC_PERSIAN_BRIDGE = [
  { cyrillic: 'А а / О о', persian: 'آ / ا / ـا', sound: 'a / ā (آ)', exampleTg: 'Осмон / Модар', exampleFa: 'آسمان / مادر', en: 'Sky / Mother' },
  { cyrillic: 'Б б / П п', persian: 'ب / پ', sound: 'b / p', exampleTg: 'Бародар / Падар', exampleFa: 'برادر / پدر', en: 'Brother / Father' },
  { cyrillic: 'Ҷ ҷ / Ч ч', persian: 'ج / چ', sound: 'j / ch', exampleTg: 'Ҷон / Чой', exampleFa: 'جان / چای', en: 'Soul / Tea' },
  { cyrillic: 'Х х / Ҳ ҳ', persian: 'خ / هـ ح', sound: 'kh / h', exampleTg: 'Хуршед / Ҳаёт', exampleFa: 'خورشید / حیات', en: 'Sun / Life' },
  { cyrillic: 'Ғ ғ / Қ қ', persian: 'غ / ق', sound: 'gh / q', exampleTg: 'Ғазал / Қанд', exampleFa: 'غزل / قند', en: 'Lyric Poem / Sugar' },
  { cyrillic: 'Г г / К к', persian: 'گ / ک', sound: 'g / k', exampleTg: 'Гулистон / Китоб', exampleFa: 'گلستان / کتاب', en: 'Rose Garden / Book' },
  { cyrillic: 'Ӯ ӯ / У у', persian: 'و (او / ُ)', sound: 'ū / u', exampleTg: 'Дӯст / Рӯдакӣ', exampleFa: 'دوست / رودکی', en: 'Friend / Rudaki' },
  { cyrillic: 'Ӣ ӣ / И и / Й й', persian: 'ی (ای / ی)', sound: 'ī / i / y', exampleTg: 'Тоҷикӣ / Эронӣ', exampleFa: 'تاجیکی / ایرانی', en: 'Tajik / Iranian' }
];

export const TajikCyrillicHub: React.FC<TajikCyrillicHubProps> = ({ onEarnLingous }) => {
  const [activeTrack, setActiveTrack] = useState<'tajik_to_persian' | 'tajik_to_english' | 'script_converter'>('tajik_to_persian');
  const [copiedTribute, setCopiedTribute] = useState<boolean>(false);
  const [sharedStatus, setSharedStatus] = useState<string | null>(null);
  const [converterInput, setConverterInput] = useState<string>('Салом дӯсти азизи ман аз Душанбе, Самарқанд ва Бухоро');

  const handleCopyTribute = () => {
    sound.playCoin();
    const fullText = `${FOUNDER_TRIBUTE_TG}\n\n${FOUNDER_TRIBUTE_FA}\n\n${FOUNDER_TRIBUTE_EN}`;
    navigator.clipboard.writeText(fullText);
    setCopiedTribute(true);
    onEarnLingous(25);
    setTimeout(() => setCopiedTribute(false), 2500);
  };

  const handleShareTribute = async () => {
    sound.playLevelUp();
    try {
      confetti({ particleCount: 55, spread: 70 });
    } catch {}
    onEarnLingous(30);
    const shareData = {
      title: 'Паёми меҳр ва ҳамрешагии бунёдгузор ба миллати шарифи Тоҷикистон ва Ӯзбекистон',
      text: `${FOUNDER_TRIBUTE_TG}\n\n${FOUNDER_TRIBUTE_FA}`
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        setSharedStatus('✅ پیام زرین هم‌ریشگی در حافظه کپی شد تا در تلگرام، واتس‌اپ و شبکه‌های اجتماعی تاجیکستان و ازبکستان به اشتراک بگذارید!');
        setTimeout(() => setSharedStatus(null), 4000);
      }
    } catch {
      setSharedStatus('✅ آماده اشتراک‌گذاری با عزیزان تاجیکستان، سمرقند و بخارا!');
    }
  };

  // Interactive Cyrillic-to-Persian Script Converter
  const convertTajikCyrillicToPersianPreview = (input: string): string => {
    const dictionaryMap: Array<[RegExp, string]> = [
      [/салом/gi, 'سلام'],
      [/дӯсти/gi, 'دوستِ'],
      [/дӯст/gi, 'دوست'],
      [/азизи/gi, 'عزیزِ'],
      [/азиз/gi, 'عزیز'],
      [/ман/gi, 'من'],
      [/аз/gi, 'از'],
      [/душанбе/gi, 'دوشنبه'],
      [/самарқанд/gi, 'سمرقند'],
      [/бухоро/gi, 'بخارا'],
      [/тоҷикистон/gi, 'تاجیکستان'],
      [/эрон/gi, 'ایران'],
      [/ӯзбекистон/gi, 'ازبکستان'],
      [/бародар/gi, 'برادر'],
      [/модар/gi, 'مادر'],
      [/падар/gi, 'پدر'],
      [/ва/gi, 'و']
    ];
    let result = input;
    for (const [regex, faWord] of dictionaryMap) {
      result = result.replace(regex, faWord);
    }
    const charMap: Record<string, string> = {
      а: 'اَ', б: 'ب', в: 'و', г: 'گ', ғ: 'غ', д: 'د', е: 'ه', ё: 'یا', ж: 'ژ', з: 'ز',
      и: 'ی', ӣ: 'ی', й: 'ی', к: 'ک', қ: 'ق', л: 'ل', м: 'م', н: 'ن', о: 'آ', п: 'پ',
      р: 'ر', с: 'س', т: 'ت', у: 'و', ӯ: 'و', ф: 'ف', х: 'خ', ҳ: 'ه', ч: 'چ', ҷ: 'ج',
      ш: 'ش', ъ: 'ع', э: 'اِ', ю: 'یو', я: 'یه'
    };
    return result
      .split('')
      .map((ch) => {
        const lower = ch.toLowerCase();
        return charMap[lower] !== undefined ? charMap[lower] : ch;
      })
      .join('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* =================================================================== */}
      {/* ROYAL TURQUOISE & GOLD SAMARKAND / BUKHARA / DUSHANBE TRIBUTE CARD  */}
      {/* (لوح زرین پیام مهر و هم‌ریشگی بنیان‌گذار خطاب به ملت تاجیکستان و ازبکستان) */}
      {/* =================================================================== */}
      <section
        aria-label="لوح زرین پیام مهر و هم‌ریشگی بنیان‌گذار خطاب به ملت شریف تاجیکستان و ازبکستان"
        className="rounded-3xl bg-gradient-to-br from-teal-950 via-cyan-900 to-emerald-950 text-white p-6 sm:p-8 border-4 border-amber-400 shadow-2xl space-y-6 relative overflow-hidden"
      >
        {/* Decorative Samarkand Registan Turquoise & Gold Top Arch Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-amber-400/50 pb-4">
          <div className="space-y-1">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md">
              <Landmark className="w-4 h-4" />
              <span>👑 ЛАВҲИ ЗАРРИНИ ҲАМРЕШАГӢ • لوح زرین پیوند جاودان ایران، تاجیکستان و ازبکستان</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-amber-300 pt-1 leading-snug">
              🇹🇯🇺🇿🇮🇷 پیام مهر و هم‌ریشگی بنیان‌گذار خطاب به ملت شریف تاجیکستان و ازبکستان (سمرقند، بخارا و دوشنبه)
            </h2>
          </div>

          {/* Audio Playback & Share Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                speakPersian(FOUNDER_TRIBUTE_FA, 0.86);
                onEarnLingous(20);
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 پخش صوتی فارسی (تهران)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                speakRussian(FOUNDER_TRIBUTE_TG, 0.85);
                onEarnLingous(20);
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 Шунидан (Тоҷикӣ / Кириллӣ)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                speakEnglish(FOUNDER_TRIBUTE_EN, 0.88);
                onEarnLingous(20);
              }}
              className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-amber-200 border border-amber-300/50 font-black text-xs flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 Listen in English</span>
            </button>

            <button
              type="button"
              onClick={handleShareTribute}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
            >
              <Share2 className="w-4 h-4" />
              <span>📤 اشتراک‌گذاری لوح زرین</span>
            </button>

            <button
              type="button"
              onClick={handleCopyTribute}
              className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 text-amber-300 border border-amber-400/50 font-black text-xs flex items-center gap-1"
            >
              {copiedTribute ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedTribute ? 'کپی شد!' : 'کپی متن ۳ زبانه'}</span>
            </button>
          </div>
        </div>

        {sharedStatus && (
          <div className="p-3 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs text-center shadow-md">
            {sharedStatus}
          </div>
        )}

        {/* 1. Tajik Cyrillic Script (Тоҷикӣ) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/90 via-teal-950/90 to-slate-950/90 border-2 border-cyan-400/60 space-y-2 shadow-lg" dir="ltr">
          <div className="flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-lg bg-cyan-400 text-slate-950 font-black text-xs">
              🇹🇯🇺🇿 Матни Тоҷикӣ (Бо хати Кириллӣ — Душанбе, Самарқанд ва Бухоро)
            </span>
            <span className="text-xs font-bold text-amber-300">Сиёвуш ва Исмоили Сомонӣ</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-cyan-100 leading-relaxed text-justify">
            {FOUNDER_TRIBUTE_TG}
          </p>
        </div>

        {/* 2. Iranian Persian Script (فارسی) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-black/45 border-2 border-amber-400/70 space-y-2 shadow-lg" dir="rtl">
          <div className="flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-xs">
              🇮🇷 متن فارسی (یادداشت بنیان‌گذار: سیاوش علی‌میری)
            </span>
            <span className="text-xs font-bold text-cyan-300">امپراتوری سامانیان • سمرقند، بخارا و دوشنبه</span>
          </div>
          <p className="text-sm sm:text-base font-black text-amber-200 leading-loose text-justify">
            {FOUNDER_TRIBUTE_FA}
          </p>
        </div>

        {/* 3. English Script (Global Tribute) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/10 border border-amber-300/40 space-y-2" dir="ltr">
          <div className="flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-lg bg-white text-slate-950 font-black text-xs">
              🇬🇧🇺🇸 Founder’s Heritage Tribute in English
            </span>
            <span className="text-xs font-bold text-amber-300">100% Free Forever for Tajikistan &amp; Uzbekistan</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-emerald-100 leading-relaxed text-justify">
            {FOUNDER_TRIBUTE_EN}
          </p>
        </div>
      </section>

      {/* =================================================================== */}
      {/* TAJIK HUB NAVIGATION TABS (2 MAIN EDUCATIONAL TRACKS + CONVERTER)   */}
      {/* =================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTrack('tajik_to_persian');
          }}
          className={`p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
            activeTrack === 'tajik_to_persian'
              ? 'bg-gradient-to-r from-teal-800 to-emerald-900 text-white border-amber-400 shadow-lg'
              : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div>
            <span className="text-xs sm:text-sm font-black block">
              🇹🇯➔🇮🇷 ۱. تاجیکی (خط روسی) ➔ فارسی ایرانی و خط فارسی
            </span>
            <span className="text-[11px] opacity-85 block" dir="ltr">
              Омӯзиши хати форсӣ ва гуфтугӯи Эрон барои Тоҷикон
            </span>
          </div>
          <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTrack('tajik_to_english');
          }}
          className={`p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
            activeTrack === 'tajik_to_english'
              ? 'bg-gradient-to-r from-indigo-800 to-cyan-900 text-white border-amber-400 shadow-lg'
              : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div>
            <span className="text-xs sm:text-sm font-black block">
              🇹🇯➔🇬🇧 ۲. آموزش انگلیسی با خط سیریلیک تاجیکی
            </span>
            <span className="text-[11px] opacity-85 block" dir="ltr">
              Англисӣ барои Тоҷикон (Бо тарҷума ва талаффузи Кириллӣ)
            </span>
          </div>
          <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTrack('script_converter');
          }}
          className={`p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
            activeTrack === 'script_converter'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 border-slate-900 shadow-lg'
              : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div>
            <span className="text-xs sm:text-sm font-black block">
              🔄 ۳. مبدل زنده خط سیریلیک تاجیکی ⇄ خط فارسی
            </span>
            <span className="text-[11px] opacity-85 block" dir="ltr">
              Табдилдиҳандаи зиндаи Кириллӣ ⇄ Хати Форсӣ
            </span>
          </div>
          <ArrowRightLeft className="w-5 h-5 shrink-0" />
        </button>
      </div>

      {/* =================================================================== */}
      {/* TRACK 1: TAJIK CYRILLIC ➔ IRANIAN PERSIAN & PERSIAN SCRIPT          */}
      {/* =================================================================== */}
      {activeTrack === 'tajik_to_persian' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {TAJIK_TO_IRANIAN_LESSONS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border-2 border-teal-500/30 p-6 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-xl bg-teal-50 text-teal-950 font-black text-xs border border-teal-200">
                    {item.badgeTg}
                  </span>

                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                    <p className="text-lg sm:text-xl font-black text-amber-300 leading-relaxed" dir="rtl">
                      🇮🇷 خط فارسی: «{item.persianScript}»
                    </p>
                    <p className="text-sm sm:text-base font-black text-cyan-300 leading-relaxed" dir="ltr">
                      🇹🇯 Тоҷикӣ (Кириллӣ): «{item.tajikCyrillic}»
                    </p>
                    <p className="text-xs font-mono text-emerald-300" dir="ltr">
                      🗣️ Tehrani Pronunciation (Finglish): [{item.fingilish}]
                    </p>
                    <p className="text-xs text-slate-300" dir="ltr">
                      🇬🇧 English: "{item.englishMeaning}"
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-bold" dir="ltr">
                    💡 <strong>Шарҳ барои Тоҷикон:</strong> {item.tehraniSpokenNoteTg}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2" dir="ltr">
                  <button
                    type="button"
                    onClick={() => {
                      speakPersian(item.persianScript, 0.86, item.fingilish);
                      onEarnLingous(15);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-black text-xs flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 Талаффузи Теҳронӣ (صدای فارسی ایران)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => speakRussian(item.tajikCyrillic, 0.85)}
                    className="py-2.5 px-3 rounded-xl bg-cyan-100 hover:bg-cyan-200 text-cyan-950 font-black text-xs flex items-center gap-1"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 Кириллӣ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => speakEnglish(item.englishMeaning, 0.88)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                  >
                    🔊 EN
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Key Alphabet Bridge Table: Cyrillic ⇄ Persian Script */}
          <div className="bg-white rounded-3xl border-2 border-amber-400 p-6 space-y-4 shadow-xs">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              🔤 جدول کلیدی تطبیق حروف سیریلیک تاجیکی (Кириллӣ) با الفبای فارسی ایران
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" dir="ltr">
              {CYRILLIC_PERSIAN_BRIDGE.map((row, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    speakPersian(row.exampleFa, 0.85);
                    onEarnLingous(10);
                  }}
                  className="p-4 rounded-2xl bg-teal-50/60 hover:bg-teal-100/80 border border-teal-200 text-left space-y-1.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-teal-950">🇹🇯 {row.cyrillic}</span>
                    <span className="text-xl font-black text-amber-700" dir="rtl">🇮🇷 {row.persian}</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-700">Sound: {row.sound}</p>
                  <p className="text-xs font-black text-slate-900">🇹🇯 {row.exampleTg}</p>
                  <p className="text-xs font-black text-emerald-900 text-right" dir="rtl">🇮🇷 {row.exampleFa} 🔊</p>
                  <p className="text-[11px] text-slate-500">🇬🇧 {row.en}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TRACK 2: ENGLISH FOR TAJIKS (`АНГЛИСӢ БАРОИ ТОҶИКОН`)               */}
      {/* =================================================================== */}
      {activeTrack === 'tajik_to_english' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-indigo-950 text-white space-y-1" dir="ltr">
            <h3 className="text-lg sm:text-xl font-black text-amber-300">
              🇬🇧🇹🇯 Англисӣ барои Тоҷикон (آموزش کامل زبان انگلیسی از پایه تا پیشرفته با خط سیریلیک تاجیکی)
            </h3>
            <p className="text-xs text-indigo-100">
              Ҳар як ҷумлаи англисӣ бо талаффузи дақиқ ба хати кириллӣ, тарҷумаи тоҷикӣ ва муодили форсии эронӣ оварда шудааст.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" dir="ltr">
            {ENGLISH_FOR_TAJIKS_LESSONS.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-3xl border-2 border-indigo-200 p-6 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="px-3 py-1 rounded-xl bg-indigo-100 text-indigo-950 font-black text-xs inline-block">
                    {lesson.levelBadge}
                  </span>
                  <h4 className="text-sm font-black text-slate-800">{lesson.topicTg}</h4>

                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                    <p className="text-base sm:text-lg font-black text-amber-300">
                      🇬🇧 "{lesson.englishSentence}"
                    </p>
                    <p className="text-xs sm:text-sm font-mono text-cyan-300">
                      🗣️ Талаффуз (Кириллӣ): [{lesson.cyrillicPhonetic}]
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-emerald-300">
                      🇹🇯 Тарҷумаи Тоҷикӣ: «{lesson.tajikMeaning}»
                    </p>
                    <p className="text-xs text-slate-300 text-right" dir="rtl">
                      🇮🇷 معادل فارسی ایران: «{lesson.persianEquivalent}»
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-bold">
                    {lesson.grammarTipTg}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      speakEnglish(lesson.englishSentence, 0.86);
                      onEarnLingous(15);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-black text-xs flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 Шунидани Англисӣ (Hear English)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => speakRussian(lesson.tajikMeaning, 0.85)}
                    className="py-2.5 px-3 rounded-xl bg-cyan-100 hover:bg-cyan-200 text-cyan-950 font-black text-xs"
                  >
                    🔊 Тоҷикӣ
                  </button>
                  <button
                    type="button"
                    onClick={() => speakPersian(lesson.persianEquivalent, 0.86)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-black text-xs"
                  >
                    🔊 فارسی
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TRACK 3: LIVE CYRILLIC ⇄ PERSIAN SCRIPT CONVERTER                   */}
      {/* =================================================================== */}
      {activeTrack === 'script_converter' && (
        <div className="bg-white rounded-3xl border-2 border-teal-500 p-6 sm:p-8 space-y-4 shadow-md">
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            🔄 مبدل هوشمند خط سیریلیک تاجیکی به خط فارسی ایران (Табдилдиҳандаи Кириллӣ ба Хати Форсӣ)
          </h3>
          <p className="text-xs text-slate-600">
            هر عبارت به خط سیریلیک تاجیکی بنویسید تا بلافاصله معادل خط فارسی ایران و تلفظ صوتی تهرانی آن را بشنوید:
          </p>

          <input
            type="text"
            value={converterInput}
            onChange={(e) => setConverterInput(e.target.value)}
            dir="ltr"
            className="w-full px-4 py-3 rounded-2xl bg-slate-100 border-2 border-slate-300 font-bold text-sm text-slate-900"
            placeholder="Масалан: Салом дӯсти азизи ман аз Душанбе ва Самарқанд..."
          />

          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-amber-300">🇮🇷 خروجی به خط فارسی ایران:</span>
              <button
                type="button"
                onClick={() => {
                  speakPersian(convertTajikCyrillicToPersianPreview(converterInput), 0.85);
                  onEarnLingous(15);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 شنیدن تلفظ فارسی ایران</span>
              </button>
            </div>
            <p className="text-xl sm:text-2xl font-black text-amber-300" dir="rtl">
              {convertTajikCyrillicToPersianPreview(converterInput)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
