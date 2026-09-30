import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  Heart,
  Sparkles,
  MessageCircle,
  Award,
  Mic,
  Headphones,
  CheckCircle2,
  Languages
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound, speakPersian, speakEnglish, setPersianVoiceGender, transliteratePersianToFingilish } from '../utils/audio';
import { PersianAlphabetCanvasStudio } from './PersianAlphabetCanvasStudio';

interface PersianForDiasporaHubProps {
  onEarnLingous: (amount: number) => void;
}

interface AlphabetGroup {
  id: string;
  groupTitleEn: string;
  groupTitleFa: string;
  letters: Array<{
    char: string;
    forms?: string;
    nameEn: string;
    soundEn: string;
    exampleFa: string;
    exampleFingilish: string;
    exampleMeaningEn: string;
  }>;
}

interface ColloquialBridgeItem {
  id: string;
  ruleTitleEn: string;
  ruleTitleFa: string;
  formalFa: string;
  formalFingilish: string;
  spokenTehraniFa: string;
  spokenFingilish: string;
  meaningEn: string;
  explanationEn: string;
}

interface FamilyHeritagePhrase {
  id: string;
  category:
    | 'grandparents_family'
    | 'diplomatic_economic'
    | 'taarof_politeness'
    | 'cool_slang'
    | 'boundaries_daily'
    | 'nowruz_yalda';
  categoryBadgeEn: string;
  persianScript: string;
  fingilish: string;
  pronunciationGuideEn: string;
  englishMeaning: string;
  literalMeaningEn: string;
  whenToUseEn: string;
}

interface BilingualStoryItem {
  id: string;
  titleEn: string;
  titleFa: string;
  levelBadge: string;
  persianParagraph: string;
  fingilishParagraph: string;
  englishParagraph: string;
  keyVocab: Array<{
    fa: string;
    fingilish: string;
    en: string;
  }>;
  culturalLessonEn: string;
}

const PERSIAN_ALPHABET_ESSENTIALS: AlphabetGroup[] = [
  {
    id: 'alg_1',
    groupTitleEn: '1. The 6 Vowel Sounds of Persian (۳ مصوت بلند و ۳ مصوت کوتاه)',
    groupTitleFa: '۱. شش صدای اصلی فارسی (مصوت‌های بلند آ، او، ای و کوتاه َ ِ ُ)',
    letters: [
      {
        char: 'آ / ا',
        forms: 'آ / ا / ـا',
        nameEn: 'Alef (Long Ā / Short a, e, o)',
        soundEn: '"aa" as in father',
        exampleFa: 'آب / ایران / مادر',
        exampleFingilish: 'Āb / Irān / Mādar',
        exampleMeaningEn: 'Water / Iran / Mother'
      },
      {
        char: 'و',
        forms: 'و / ـو',
        nameEn: 'Vāv (V / Long OO / O)',
        soundEn: '"v" as in vine OR "oo" as in moon',
        exampleFa: 'دوست / ورزش / نوروز',
        exampleFingilish: 'Doost / Varzesh / Nowrooz',
        exampleMeaningEn: 'Friend / Sport / Nowruz'
      },
      {
        char: 'ی',
        forms: 'یـ / ـیـ / ـی',
        nameEn: 'Ye (Y / Long EE)',
        soundEn: '"y" as in yes OR "ee" as in see',
        exampleFa: 'شیرین / چای / ایرانی',
        exampleFingilish: 'Shirin / Chāy / Irāni',
        exampleMeaningEn: 'Sweet / Tea / Iranian'
      },
      {
        char: 'َ  ِ  ُ',
        forms: 'اَ (a) • اِ (e) • اُ (o)',
        nameEn: '3 Short Vowels (Zabar, Zir, Pish)',
        soundEn: '"a" (cat), "e" (bed), "o" (go)',
        exampleFa: 'دَر / دِل / گُل',
        exampleFingilish: 'Dar / Del / Gol',
        exampleMeaningEn: 'Door / Heart / Flower'
      }
    ]
  },
  {
    id: 'alg_2',
    groupTitleEn: '2. The 4 Exclusive Persian Letters (پ، چ، ژ، گ — چهار حرف ویژه فارسی)',
    groupTitleFa: '۲. چهار حرف اختصاصی زبان فارسی که در عربی و انگلیسی به این شکل نیستند (پ، چ، ژ، گ)',
    letters: [
      {
        char: 'پ',
        forms: 'پـ / ـپـ / پ',
        nameEn: 'Pe (3 dots below)',
        soundEn: '"p" as in Pārsi (Persian)',
        exampleFa: 'پدر / پرنده / پشتی',
        exampleFingilish: 'Pedar / Parandeh / Poshti',
        exampleMeaningEn: 'Father / Bird / Cushion'
      },
      {
        char: 'چ',
        forms: 'چـ / ـچـ / چ',
        nameEn: 'Che (3 dots inside)',
        soundEn: '"ch" as in chair',
        exampleFa: 'چشم / چای / قالیچه',
        exampleFingilish: 'Cheshm / Chāy / Ghālicheh',
        exampleMeaningEn: 'Eye / Tea / Fine small rug'
      },
      {
        char: 'ژ',
        forms: 'ژ / ـژ (No left join)',
        nameEn: 'Zhe (3 dots above)',
        soundEn: '"zh" as in treasure / vision',
        exampleFa: 'ژاله / مژده / پژمان',
        exampleFingilish: 'Zhāleh / Mozhdeh / Pezhmān',
        exampleMeaningEn: 'Dew / Good news / Pezhman'
      },
      {
        char: 'گ',
        forms: 'گـ / ـگـ / گ',
        nameEn: 'Gāf (double top stroke)',
        soundEn: '"g" as in garden',
        exampleFa: 'گل / گفتگو / گلیم',
        exampleFingilish: 'Gol / Goftogoo / Gelim',
        exampleMeaningEn: 'Flower / Conversation / Kilim'
      }
    ]
  },
  {
    id: 'alg_3',
    groupTitleEn: '3. The 7 "Non-Connector" Letters (حروفی که به حرفِ بعدیِ سمت چپ نمی‌چسبند)',
    groupTitleFa: '۳. راز خواندن خط فارسی: ۷ حرفی که به سمت چپ نمی‌چسبند (ا، د، ذ، ر، ز، ژ، و)',
    letters: [
      {
        char: 'د / ذ',
        forms: 'د / ـد',
        nameEn: 'Dāl & Zāl ("D" & "Z")',
        soundEn: 'Connects from right, breaks on left',
        exampleFa: 'مادر / دل / فردا',
        exampleFingilish: 'Mādar / Del / Fardā',
        exampleMeaningEn: 'Mother / Heart / Tomorrow'
      },
      {
        char: 'ر / ز / ژ',
        forms: 'ر / ز / ژ',
        nameEn: 'Re, Ze, Zhe ("R", "Z", "Zh")',
        soundEn: 'Connects from right, breaks on left',
        exampleFa: 'باران / روز / شیراز',
        exampleFingilish: 'Bārān / Rooz / Shirāz',
        exampleMeaningEn: 'Rain / Day / Shiraz'
      },
      {
        char: 'آ / ا / و',
        forms: 'ا / ـا • و / ـو',
        nameEn: 'Alef & Vāv',
        soundEn: 'Never joins to the next letter on the left',
        exampleFa: 'آبادان / داوود',
        exampleFingilish: 'Ābādān / Dāvood',
        exampleMeaningEn: 'Abadan / Davood'
      },
      {
        char: 'س / ص / ث  و  ت / ط',
        forms: 'Same-Sound Families',
        nameEn: 'Same Sound in Spoken Persian!',
        soundEn: 'س=ص=ث ("S") • ت=ط ("T") • ز=ذ=ض=ظ ("Z")',
        exampleFa: 'سلام / صبح / تهران / طلا',
        exampleFingilish: 'Salām / Sobh / Tehrān / Talā',
        exampleMeaningEn: 'Hello / Morning / Tehran / Gold'
      }
    ]
  }
];

// The #1 Secret for Diaspora Kids: Bridging Textbook Persian to Real Spoken Tehrani Persian!
const TEXTBOOK_VS_SPOKEN_TEHRANI: ColloquialBridgeItem[] = [
  {
    id: 'cb_1',
    ruleTitleEn: 'Rule 1: "Ān" (آن) before N or M becomes "Oon" (اون)',
    ruleTitleFa: 'قانون ۱: تبدیل «آن» در کتاب به «اون» در گفتار روزمره (نان ⬅ نون، خانه ⬅ خونه)',
    formalFa: 'نان و باران در خیابانِ تهران',
    formalFingilish: 'Nān va bārān dar khiyābān-e Tehrān',
    spokenTehraniFa: 'نون و بارون تو خیابونِ تهرون',
    spokenFingilish: 'Noon o bāroon too khiyāboon-e Tehroon',
    meaningEn: 'Bread and rain in the streets of Tehran',
    explanationEn: 'In everyday spoken Persian, long "ā" before "n" almost always shifts to "oo" (Nān → Noon, Khāneh → Khooneh, Ān-hā → Oonā, Jān → Joon).'
  },
  {
    id: 'cb_2',
    ruleTitleEn: 'Rule 2: Verb Shortening (می‌خواهم بروم ➔ می‌خوام برم)',
    ruleTitleFa: 'قانون ۲: کوتاه شدن فعل‌ها در محاوره (می‌خواهم ⬅ می‌خوام، می‌روم ⬅ می‌رم)',
    formalFa: 'می‌خواهم به خانه بروم و استراحت کنم.',
    formalFingilish: 'Mikhāham be khāneh beravam va esterāhat konam.',
    spokenTehraniFa: 'می‌خوام برم خونه و استراحت کنم.',
    spokenFingilish: 'Mikhām beram khooneh o esterāhat konam.',
    meaningEn: 'I want to go home and rest.',
    explanationEn: 'Spoken Persian drops the middle "h" and "v" in common verbs: Mikhāham → Mikhām, Miravam → Miram, Miguyam → Migam, Midānam → Midoonam, Mitavānam → Mitoonam.'
  },
  {
    id: 'cb_3',
    ruleTitleEn: 'Rule 3: Object Marker "Rā" (را) becomes "Ro" or "O" (رو / و)',
    ruleTitleFa: 'قانون ۳: تبدیل علامت مفعولی «را» به «رو» یا «و»',
    formalFa: 'این کتاب را خواندم و غذایم را خوردم.',
    formalFingilish: 'In ketāb rā khāndam va ghazāyam rā khordam.',
    spokenTehraniFa: 'این کتابو خوندم و غذامو خوردم.',
    spokenFingilish: 'In ketābo khoondam o ghazāmo khordam.',
    meaningEn: 'I read this book and ate my food.',
    explanationEn: 'Never say "rā" in casual conversation! After a consonant it becomes "-o" (ketāb-o), and after a vowel it becomes "ro" (ghazā-ro).'
  },
  {
    id: 'cb_4',
    ruleTitleEn: 'Rule 4: Present Continuous with "Dāram..." (دارم میام / دارم می‌رم)',
    ruleTitleFa: 'قانون ۴: ساختار «دارم میام / دارم می‌رم» برای کاری که همین لحظه انجام می‌دهید',
    formalFa: 'در حال آمدن هستم، پنج دقیقه دیگر می‌رسم.',
    formalFingilish: 'Dar hāl-e āmadan hastam, panj daghigheh-ye digar miresam.',
    spokenTehraniFa: 'دارم میام، پنج دقیقه دیگه می‌رسم!',
    spokenFingilish: 'Dāram miyām, panj deygheh digeh miresam!',
    meaningEn: 'I am on my way coming right now, I’ll arrive in five minutes!',
    explanationEn: 'Native Persian speakers use "Dāram + present verb" (Dāram miyām = I am coming, Dāram mikhoram = I am eating) constantly in daily life.'
  },
  {
    id: 'cb_5',
    ruleTitleEn: 'Rule 5: "Ast" (است = is) shortens to "-eh" or "-st" (سرد است ➔ سرده)',
    ruleTitleFa: 'قانون ۵: تبدیل «است» به «ـه» در آخر کلمات (قشنگ است ⬅ قشنگه)',
    formalFa: 'هوا خیلی سرد است اما این چای داغ و خوشمزه است.',
    formalFingilish: 'Havā kheyli sard ast ammā in chāy dāgh va khoshmazeh ast.',
    spokenTehraniFa: 'هوا خیلی سرده ولی این چایی داغ و خوشمزه‌ست!',
    spokenFingilish: 'Havā kheyli sardeh vali in chāyi dāgh o khoshmazast!',
    meaningEn: 'The weather is very cold, but this tea is hot and delicious!',
    explanationEn: 'In spoken Farsi, "sard ast" becomes "sardeh", "khoob ast" becomes "khoobeh", and "khoshmazeh ast" becomes "khoshmazast".'
  },
  {
    id: 'cb_6',
    ruleTitleEn: 'Rule 6: Question Words & Pronouns (چه چیز ➔ چی • ایشان ➔ ایشون)',
    ruleTitleFa: 'قانون ۶: کلمات پرسشی و ضمایر در محاوره (چه کار می‌کنی؟ ⬅ چیکار می‌کنی؟)',
    formalFa: 'حالتان چطور است و امروز چه کار می‌کنید؟',
    formalFingilish: 'Hāletān chetor ast va emrooz che kār mikonid?',
    spokenTehraniFa: 'حالتون چطوره و امروز چیکار می‌کنید؟',
    spokenFingilish: 'Hāletoon chetoreh o emrooz chikār mikonid?',
    meaningEn: 'How are you doing and what are you up to today?',
    explanationEn: '"Che kār" merges into "Chikār", "-tān" (your) becomes "-toon", and "Chetor ast" becomes "Chetoreh".'
  }
];

const DIASPORA_HERITAGE_PHRASES: FamilyHeritagePhrase[] = [
  // 1. Talking to Grandparents & Family
  {
    id: 'dhp_1',
    category: 'grandparents_family',
    categoryBadgeEn: '👵🏼 Talking to Grandparents & Family',
    persianScript: 'سلام مامان‌بزرگ و بابابزرگ عزیزم، دلم براتون خیلی تنگ شده بود!',
    fingilish: 'Salām Māmān-bozorg o Bābā-bozorg-e azizam, delam barātoon kheyli tang shodeh bood!',
    pronunciationGuideEn: 'sa-LAWM maw-MAWN bo-ZORG, DEH-lam ba-RAW-toon KHEY-lee tang sho-DEH bood',
    englishMeaning: 'Hello my dear Grandma and Grandpa, I missed you both so much!',
    literalMeaningEn: '"My heart had become very tight for you!" (Persian idiom for missing someone)',
    whenToUseEn: 'The warmest way to greet your Iranian grandparents or family on a video call or in person.'
  },
  {
    id: 'dhp_2',
    category: 'grandparents_family',
    categoryBadgeEn: '👵🏼 Talking to Grandparents & Family',
    persianScript: 'دست شما درد نکنه، قرمه‌سبزی و تهچین شما تو دنیا لنگه نداره!',
    fingilish: 'Dast-e shomā dard nakoneh, ghormeh-sabzi o tahchin-e shomā too donyā lengeh nadāreh!',
    pronunciationGuideEn: 'DAS-teh sho-MAW dard na-KO-neh, too don-YAW len-GEH na-DAW-reh',
    englishMeaning: 'Thank you so much for cooking—your Ghormeh Sabzi and Tahchin are unmatched in the whole world!',
    literalMeaningEn: '"May your hands never ache—your cooking has no twin in the world!"',
    whenToUseEn: 'Say this after a family meal to make your Iranian parents or grandparents beam with pride.'
  },
  {
    id: 'dhp_3',
    category: 'grandparents_family',
    categoryBadgeEn: '👵🏼 Talking to Grandparents & Family',
    persianScript: 'قربون دستت مامان جون، جای همگی خیلی خالی بود!',
    fingilish: 'Ghorboon-e dastet Māmān joon, jā-ye hamegi kheyli khāli bood!',
    pronunciationGuideEn: 'ghor-BOO-neh das-TET maw-MAWN joon, JAW-yeh ha-meh-GEE KHAW-lee bood',
    englishMeaning: 'Bless your hands, dear Mom—we really wished everyone could have been here with us!',
    literalMeaningEn: '"May I be sacrificed for your hand, Mom dear; everyone’s place was empty!"',
    whenToUseEn: 'Used constantly in affectionate Iranian family conversations.'
  },

  // 2. Taarof & Politeness (ادب و تعارف اصیل ایرانی)
  {
    id: 'dhp_4',
    category: 'taarof_politeness',
    categoryBadgeEn: '🫖 Mastering Persian Taarof & Politeness',
    persianScript: 'خواهش می‌کنم، قابلی نداره! قدم رنجه فرمودید، خونه خودتونه.',
    fingilish: 'Khāhesh mikonam, ghābeli nadāreh! Ghadam ranjeh farmoodid, khooneh-ye khodetooneh.',
    pronunciationGuideEn: 'KHAW-hesh mee-ko-nam, ghaw-be-LEE na-DAW-reh! KHOO-neh kho-de-TOO-neh',
    englishMeaning: 'You’re very welcome, it is nothing compared to your worth! Thank you for visiting, make yourself at home.',
    literalMeaningEn: '"It isn’t worthy of you! You troubled your footsteps to come, this is your own house."',
    whenToUseEn: 'Essential Persian hospitality (Taarof) when welcoming guests or receiving a compliment.'
  },
  {
    id: 'dhp_5',
    category: 'taarof_politeness',
    categoryBadgeEn: '🫖 Mastering Persian Taarof & Politeness',
    persianScript: 'خیلی زحمت کشیدید، راضی به زحمت شما نبودیم! نوش جان!',
    fingilish: 'Kheyli zahmat keshidid, rāzi be zahmat-e shomā naboodim! Noosh-e jān!',
    pronunciationGuideEn: 'KHEY-lee zah-MAT ke-shee-DEED! NOO-sheh JAWN!',
    englishMeaning: 'You went to so much trouble for us, we didn’t want to trouble you! Bon appétit (May it nourish your soul)!',
    literalMeaningEn: '"You pulled a lot of trouble! May it be sweet to your soul (Noosh-e jān)."',
    whenToUseEn: 'Used when a host serves tea, fruit, sweets, or dinner.'
  },

  // 3. Cool Everyday Street Slang (کوچه‌بازار و تکیه‌کلام‌های روزمره جوانان)
  {
    id: 'dhp_6',
    category: 'cool_slang',
    categoryBadgeEn: '😎 Cool Everyday Slang & Youth Talk',
    persianScript: 'دمت گرم رفیق، واقعاً سنگ تموم گذاشتی! خیلی باحالی.',
    fingilish: 'Damet garm rafigh, vāghe’an sang tamoom gozāshti! Kheyli bāhāli.',
    pronunciationGuideEn: 'DA-met garm ra-FEEGH, sang ta-MOOM go-ZAWSH-tee! KHEY-lee baw-HAW-lee',
    englishMeaning: 'You’re awesome, my friend—you really went all out! You’re super cool.',
    literalMeaningEn: '"May your breath be warm, comrade, you put down the final stone!"',
    whenToUseEn: 'The most popular friendly slang among Iranians to thank a friend or cousin enthusiastically.'
  },
  {
    id: 'dhp_7',
    category: 'cool_slang',
    categoryBadgeEn: '😎 Cool Everyday Slang & Youth Talk',
    persianScript: 'بی‌خیال بابا، سخت نگیر! رو چشمم، حتماً ردیفش می‌کنم.',
    fingilish: 'Bi-khiyāl bābā, sakht nagir! Roo cheshmam, hatman radifesh mikonam.',
    pronunciationGuideEn: 'bee-khee-YAWL baw-BAW, sakht na-GEER! roo CHESH-mam, ra-DEE-fesh mee-ko-nam',
    englishMeaning: 'Take it easy, man, don’t stress! Gladly (upon my eyes), I’ll sort it out for sure.',
    literalMeaningEn: '"Be without worry! Upon my eye, I will line it up!"',
    whenToUseEn: 'Used every day to comfort a friend and promise you will take care of something.'
  },

  // 4. Everyday Boundaries & Standing Up for Yourself in Persian (حدهای روزمره و دفاع از حق خود)
  {
    id: 'dhp_10',
    category: 'boundaries_daily',
    categoryBadgeEn: '🛡️ Everyday Boundaries & Street Smarts',
    persianScript: 'ببخشید آقا/خانم، نوبت من بود! لطفاً حق بقیه رو رعایت کنید.',
    fingilish: 'Bebakhshid āghā/khānoom, nowbat-e man bood! Lotfan hagh-e baghiyeh ro ra’āyat konid.',
    pronunciationGuideEn: 'be-bakh-SHEED, now-BA-teh man bood! LOT-fan HAGH-eh ba-ghee-YEH ro ra-aw-YAT ko-need',
    englishMeaning: 'Excuse me sir/ma’am, it was my turn in line! Please respect other people’s rights.',
    literalMeaningEn: '"Forgive me, it was my turn! Please observe the right of others."',
    whenToUseEn: 'Polite yet firm everyday boundary when someone cuts in line or oversteps in public.'
  },
  {
    id: 'dhp_11',
    category: 'boundaries_daily',
    categoryBadgeEn: '🛡️ Everyday Boundaries & Street Smarts',
    persianScript: 'لطفاً مزاحم نشید و حد خودتون رو نگه دارید، من علاقه‌ای به ادامه این بحث ندارم.',
    fingilish: 'Lotfan mozāhem nashid o hadd-e khodetoon ro negah dārid, man alāgheh-i be edāmeh-ye in bahs nadāram.',
    pronunciationGuideEn: 'LOT-fan mo-zaw-HEM na-SHEED o HAD-deh kho-de-TOON ro ne-GAH daw-reed',
    englishMeaning: 'Please do not bother me and respect my boundaries; I have no interest in continuing this discussion.',
    literalMeaningEn: '"Please do not become an intruder and keep your own boundary."',
    whenToUseEn: 'Clear, dignified Persian for setting personal boundaries in the street or workplace.'
  },

  // 5. Nowruz, Yalda & Poetic Heritage
  {
    id: 'dhp_8',
    category: 'nowruz_yalda',
    categoryBadgeEn: '🌱 Nowruz, Yalda & Cultural Roots',
    persianScript: 'نوروزتان پیروز، هر روزتان نوروز! سال نو مبارک و صد سال به این سال‌ها.',
    fingilish: 'Nowroozetān pirooz, har roozetān Nowrooz! Sāl-e no mobārak o sad sāl be in sāl-hā.',
    pronunciationGuideEn: 'now-roo-ze-TAWN pee-ROOZ! SAW-leh noh mo-BAW-rak!',
    englishMeaning: 'May your Nowruz be victorious, and may every day of yours be Nowruz! Happy New Year and wishing you a hundred more years like this.',
    literalMeaningEn: 'Classic Persian Spring Equinox (New Year) blessing.',
    whenToUseEn: 'The most cherished greeting to say or text to your entire Iranian family at Nowruz.'
  },
  {
    id: 'dhp_9',
    category: 'nowruz_yalda',
    categoryBadgeEn: '🌱 Nowruz, Yalda & Cultural Roots',
    persianScript: 'توانا بود هر که دانا بود — ز دانش دل پیر برنا بود (حکیم فردوسی)',
    fingilish: 'Tavānā bovad har ke dānā bovad — Ze dānesh del-e pir bornā bovad (Ferdowsi)',
    pronunciationGuideEn: 'ta-vaw-NAW bo-VAD har keh daw-NAW bo-VAD',
    englishMeaning: '"Powerful is the one who has knowledge — Through wisdom, even an old heart stays young." (Epic poet Ferdowsi)',
    literalMeaningEn: 'The most famous couplet from the Shahnameh, which preserved the Persian language for over a millennium.',
    whenToUseEn: 'Every Iranian around the world knows this verse by heart—learning it connects you directly to 1,000 years of Persian literature.'
  },

  // 6. Diplomatic, Political Missions & Economic Trade Persian (ویژه دیپلمات‌ها، دفاتر نمایندگی سیاسی و مراودات اقتصادی با ۳۰۰ میلیون فارسی‌زبان)
  {
    id: 'dhp_12',
    category: 'diplomatic_economic',
    categoryBadgeEn: '🏛️ Diplomatic, Political & Economic Trade Persian',
    persianScript: 'مایه افتخار و خرسندی است که در راستای گسترش روابط اقتصادی، تجاری و فرهنگی با کشورهای فارسی‌زبان گفتگو می‌کنیم.',
    fingilish: 'Māyeh-ye eftekhār va khorsandi ast ke dar rāstā-ye gostaresh-e ravābet-e eghtesādi, tejāri va farhangi bā keshvar-hā-ye Fārsi-zabān goftogoo mikonim.',
    pronunciationGuideEn: 'maw-YEH-yeh ef-te-KHAWR va khor-san-DEE ast keh dar raws-TAW-yeh gos-ta-RE-sheh ra-vaw-BE-teh egh-te-saw-DEE gof-to-GOO mee-ko-neem',
    englishMeaning: 'It is an honor and a pleasure to hold talks toward expanding economic, commercial, and cultural relations with Persian-speaking countries.',
    literalMeaningEn: '"It is a source of pride and satisfaction that in the direction of expanding economic, trade, and cultural relations with Persian-speaking nations we converse."',
    whenToUseEn: 'Ideal for diplomats, embassy attachés, foreign chambers of commerce, and executives opening meetings across the 300-million Persian-speaking region.'
  },
  {
    id: 'dhp_13',
    category: 'diplomatic_economic',
    categoryBadgeEn: '🏛️ Diplomatic, Political & Economic Trade Persian',
    persianScript: 'دفتر نمایندگی سیاسی و بازرگانی ما آماده همکاری‌های دوجانبه، سرمایه‌گذاری مشترک و تبادل هیئت‌های تجاری است.',
    fingilish: 'Daftar-e namāyandegi-ye siyāsi va bāzargāni-ye mā āmādeh-ye hamkāri-hā-ye do-jānebeh, sarmāyeh-gozāri-ye moshtarak va tabādol-e hey’at-hā-ye tejāri ast.',
    pronunciationGuideEn: 'daf-TA-reh na-maw-yan-de-GEE-yeh see-yaw-SEE va baw-zar-gaw-NEE aw-maw-DEH-yeh ham-kaw-REE-haw-yeh do-jaw-ne-BEH ast',
    englishMeaning: 'Our political and commercial representation office is ready for bilateral cooperation, joint investment, and the exchange of trade delegations.',
    literalMeaningEn: '"Our political and commercial representation office is ready for bilateral cooperations and joint investment."',
    whenToUseEn: 'Used by diplomatic missions, consulates, and international trade representatives working with Iran, Tajikistan, Afghanistan, and regional partners.'
  },
  {
    id: 'dhp_14',
    category: 'diplomatic_economic',
    categoryBadgeEn: '🏛️ Diplomatic, Political & Economic Trade Persian',
    persianScript: 'با احترام فراوان، از مهمان‌نوازی گرم شما سپاسگزاریم و امیدواریم این تفاهم‌نامه آغازگر یک همکاری بلندمدت و سازنده باشد.',
    fingilish: 'Bā ehterām-e farāvān, az mehmān-navāzi-ye garm-e shomā sepāsgozārim va omidvārim in tafāhom-nāmeh āghāzgar-e yek hamkāri-ye boland-moddat va sāzandeh bāshad.',
    pronunciationGuideEn: 'baw eh-te-RAW-meh fa-raw-VAWN, az meh-mawn-na-vaw-ZEE-yeh GAR-meh sho-MAW se-paws-go-zaw-REEM',
    englishMeaning: 'With deep respect, we thank you for your warm hospitality and hope this memorandum of understanding (MoU) marks the beginning of a long-term, constructive partnership.',
    literalMeaningEn: '"With abundant respect, from your warm hospitality we are grateful and hope this MoU is the initiator of a long-term partnership."',
    whenToUseEn: 'High-protocol Persian for closing diplomatic meetings, signing commercial contracts, or addressing official banquets.'
  }
];

const BILINGUAL_HERITAGE_STORIES: BilingualStoryItem[] = [
  {
    id: 'story_1',
    titleEn: '1. Friday Lunch at Grandma’s House (ناهار روز جمعه خونه مامان‌بزرگ)',
    titleFa: '۱. ناهار روز جمعه خونه مامان‌بزرگ و عطر برنج زعفرونی',
    levelBadge: 'Level 1 • Spoken Family Persian',
    persianParagraph:
      'روز جمعه که می‌شه، همه فامیل خونه مامان‌بزرگ جمع می‌شن. از دم در، بوی قرمه‌سبزی و برنج زعفرونی آدمو مست می‌کنه! مامان‌بزرگ با خنده می‌گه: «خوش اومدید قربونتون برم، سفره آماده‌ست، بفرمایید بشینید!»',
    fingilishParagraph:
      'Rooz-e jom’eh ke misheh, hameh-ye fāmil khooneh-ye Māmān-bozorg jam mishan. Az dam-e dar, boo-ye ghormeh-sabzi o berenj-e za’ferooni ādam-o mast mikoneh! Māmān-bozorg bā khandeh migeh: "Khosh oomadid ghorboonetoon beram, sofreh āmādast, befarmāyid beshinid!"',
    englishParagraph:
      'When Friday comes, the whole family gathers at Grandma’s house. Right from the doorway, the aroma of Ghormeh Sabzi and saffron rice enchants you! Grandma says with a smile: "Welcome my darlings, the dining cloth (sofreh) is ready, please come sit down!"',
    keyVocab: [
      { fa: 'جمع می‌شن', fingilish: 'Jam mishan', en: 'They gather together' },
      { fa: 'قربونتون برم', fingilish: 'Ghorboonetoon beram', en: 'My darlings (affectionate idiom)' },
      { fa: 'سفره آماده‌ست', fingilish: 'Sofreh āmādast', en: 'The table/spread is ready' }
    ],
    culturalLessonEn:
      'In Iranian families across the world, gathering around the "Sofreh" (dining spread) with saffron rice and warm blessings is the heart of family bonding.'
  },
  {
    id: 'story_2',
    titleEn: '2. A Walk Through the Bazaar & Persian Carpets (گردش در بازار سنتی و هنر فرش ایرانی)',
    titleFa: '۲. گردش در بازار سنتی و تماشای قالی و قالیچه دستباف ایرانی',
    levelBadge: 'Level 2 • Cultural & Heritage Persian',
    persianParagraph:
      'دیروز با پدرم رفتیم بازار سنتی تا فرش‌های دستباف ایرانی رو از نزدیک ببینیم. حجره‌دار با استکان کمر‌باریک چای از ما پذیرایی کرد و گفت: «هر گره این قالی و قالیچه با عشق و رنگ‌های طبیعی گیاهی بافته شده و یک اثر هنری ماندگاره.»',
    fingilishParagraph:
      'Dirooz bā pedaram raftim bāzār-e sonnati tā farsh-hā-ye dastbāf-e Irāni ro az nazdik bebinim. Hojreh-dār bā estekān-e kamar-bārik-e chāy az mā pazirāyi kard o goft: "Har gereh-ye in ghāli o ghālicheh bā eshgh o rang-hā-ye tabi’i-ye giyāhi bāfteh shodeh o yek asar-e honari-ye māndegāreh."',
    englishParagraph:
      'Yesterday I went with my father to the traditional bazaar to see hand-woven Persian carpets up close. The showroom merchant welcomed us with traditional waisted glasses of tea and said: "Every knot of this Ghali and Ghalicheh is woven with love and natural botanical dyes—it is a timeless work of art."',
    keyVocab: [
      { fa: 'فرش دستباف', fingilish: 'Farsh-e dastbāf', en: 'Hand-woven carpet' },
      { fa: 'پذیرایی کرد', fingilish: 'Pazirāyi kard', en: 'Welcomed / Hosted warmly' },
      { fa: 'اثر هنری ماندگار', fingilish: 'Asar-e honari-ye māndegār', en: 'Timeless work of art' }
    ],
    culturalLessonEn:
      'The Persian carpet is the ambassador of Iranian art across the globe; knowing words like "Dastbāf" (hand-woven) and "Ghālicheh" connects you to centuries of craftsmanship.'
  }
];

const DIASPORA_QUIZ_ITEMS = [
  {
    id: 'dq_1',
    questionEn: '1. In everyday spoken Tehran Persian, how do native speakers say "می‌خواهم به خانه بروم" (I want to go home)?',
    options: [
      {
        textFa: 'می‌خوام برم خونه (Mikhām beram khooneh)',
        isCorrect: true,
        feedbackEn: 'Spot on! "Mikhāham" shortens to "Mikhām", "beravam" becomes "beram", and "khāneh" becomes "khooneh"!'
      },
      {
        textFa: 'من خانه رفتن هستم (Man khāneh raftan hastam)',
        isCorrect: false,
        feedbackEn: 'Not quite—remember that spoken Persian shortens "Mikhāham beravam khāneh" into "Mikhām beram khooneh".'
      }
    ]
  },
  {
    id: 'dq_2',
    questionEn: '2. When your Iranian grandma or host serves you delicious food, what does "دست شما درد نکنه (Dast-e shomā dard nakoneh)" mean?',
    options: [
      {
        textFa: 'Thank you so much for your kindness and effort! (Lit: May your hands never ache)',
        isCorrect: true,
        feedbackEn: 'Bravo! "Dast-e shomā dard nakoneh" is the most heartfelt Persian way to thank someone who cooked or did something kind for you.'
      },
      {
        textFa: 'My hand is hurting right now',
        isCorrect: false,
        feedbackEn: 'Look closely at "nakoneh" (may it NOT ache)—it is a warm blessing meaning "Thank you so much for your hard work!"'
      }
    ]
  },
  {
    id: 'dq_3',
    questionEn: '3. What does a friend mean when they tell you in Persian: "دمت گرم، سنگ تموم گذاشتی! (Damet garm, sang tamoom gozāshti!)"?',
    options: [
      {
        textFa: 'You’re awesome, my friend—you really went all out!',
        isCorrect: true,
        feedbackEn: 'Awesome job! "Damet garm" and "Sang tamoom gozāshti" are top-tier friendly Persian idioms.'
      },
      {
        textFa: 'The weather is hot and there are stones on the ground',
        isCorrect: false,
        feedbackEn: 'That’s the literal word-by-word translation—idiomatically it means "You’re a legend, you went above and beyond!"'
      }
    ]
  },
  {
    id: 'dq_4',
    questionEn: '4. Which 4 letters exist in the Persian alphabet (پ، چ، ژ، گ) for sounds like P, Ch, Zh, and G?',
    options: [
      {
        textFa: 'پ (Pe), چ (Che), ژ (Zhe), گ (Gāf)',
        isCorrect: true,
        feedbackEn: 'Correct! Those 4 letters (پ، چ، ژ، گ) are signature Persian letters representing P, Ch, Zh, and hard G.'
      },
      {
        textFa: 'ص، ض، ط، ظ',
        isCorrect: false,
        feedbackEn: 'Remember: پ (P), چ (Ch), ژ (Zh), and گ (G) are the 4 distinctive Persian letters!'
      }
    ]
  }
];

interface StructuredRoadmapLesson {
  id: string;
  stageId: 'stage_1' | 'stage_2' | 'stage_3' | 'stage_4' | 'stage_5';
  stageTitleEn: string;
  stageTitleFa: string;
  lessonNumber: number;
  titleEn: string;
  persianSpoken: string;
  persianFormal: string;
  fingilish: string;
  englishMeaning: string;
  grammarSecretEn: string;
  wordBreakdown: Array<{
    fa: string;
    fingilish: string;
    en: string;
    role: string;
  }>;
}

const STRUCTURED_FARSI_ROADMAP: StructuredRoadmapLesson[] = [
  // STAGE 1: A1 BEGINNER — SURVIVAL & FIRST CONVERSATIONS
  {
    id: 'srl_1',
    stageId: 'stage_1',
    stageTitleEn: 'Stage 1 (A1): First Words, Greetings & Politeness',
    stageTitleFa: 'مرحله ۱ (مبتدی A1): شروع مکالمه، سلام و احوالپرسی گرم',
    lessonNumber: 1,
    titleEn: 'Lesson 1: Warm Greeting & Asking How Someone Is',
    persianSpoken: 'سلام، حال شما چطوره؟ خیلی خوشوقتم!',
    persianFormal: 'سلام، حال شما چطور است؟ بسیار خوشوقتم.',
    fingilish: 'Salām, hāl-e shomā chetoreh? Kheyli khoshvaghtam!',
    englishMeaning: 'Hello, how are you doing? Very nice to meet you!',
    grammarSecretEn:
      'In Persian, "-am" at the end of "khoshvaght-am" means "I am" (Fortunate-I-am = Nice to meet you!). No separate word for "am" is needed!',
    wordBreakdown: [
      { fa: 'سلام', fingilish: 'Salām', en: 'Hello / Peace', role: 'Greeting' },
      { fa: 'حالِ شما', fingilish: 'Hāl-e shomā', en: 'Your condition/health', role: 'Subject' },
      { fa: 'چطوره؟', fingilish: 'Chetoreh?', en: 'How is it?', role: 'Question + Verb' },
      { fa: 'خیلی خوشوقتم', fingilish: 'Kheyli khoshvaghtam', en: 'Very pleased to meet you', role: 'Polite Closing' }
    ]
  },
  {
    id: 'srl_2',
    stageId: 'stage_1',
    stageTitleEn: 'Stage 1 (A1): First Words, Greetings & Politeness',
    stageTitleFa: 'مرحله ۱ (مبتدی A1): شروع مکالمه، سلام و احوالپرسی گرم',
    lessonNumber: 2,
    titleEn: 'Lesson 2: Introducing Yourself & Your Heritage',
    persianSpoken: 'اسم من آرشه و دارم هر روز فارسی یاد می‌گیرم.',
    persianFormal: 'نام من آرش است و هر روز زبان فارسی یاد می‌گیرم.',
    fingilish: 'Esm-e man Ārash-eh o dāram har rooz Fārsi yād migiram.',
    englishMeaning: 'My name is Arash and I am learning Persian every day.',
    grammarSecretEn:
      'The tiny "-e" sound (Ezāfeh) between "Esm-e man" connects two nouns together to mean "Name OF me" = "My name"!',
    wordBreakdown: [
      { fa: 'اسمِ من', fingilish: 'Esm-e man', en: 'My name', role: 'Subject' },
      { fa: 'آرشه', fingilish: 'Ārash-eh', en: 'is Arash', role: 'Predicate' },
      { fa: 'دارم ... یاد می‌گیرم', fingilish: 'Dāram ... yād migiram', en: 'I am learning', role: 'Present Continuous Verb' },
      { fa: 'هر روز فارسی', fingilish: 'Har rooz Fārsi', en: 'Persian every day', role: 'Time + Object' }
    ]
  },

  // STAGE 2: A2 ELEMENTARY — SENTENCE BUILDING & DAILY LIFE
  {
    id: 'srl_3',
    stageId: 'stage_2',
    stageTitleEn: 'Stage 2 (A2): Everyday Needs, Family & Sentence Logic',
    stageTitleFa: 'مرحله ۲ (پایه A2): ساختار جمله فارسی، خانواده و نیازهای روزمره',
    lessonNumber: 3,
    titleEn: 'Lesson 3: Expressing Wants & Going Places (S-O-V Order)',
    persianSpoken: 'امروز می‌خوام با خانواده‌م برم بازار و خرید کنم.',
    persianFormal: 'امروز می‌خواهم با خانواده‌ام به بازار بروم و خرید کنم.',
    fingilish: 'Emrooz mikhām bā khānevādam beram bāzār o kharid konam.',
    englishMeaning: 'Today I want to go to the bazaar with my family and shop.',
    grammarSecretEn:
      'Golden Rule of Persian Word Order: Time ("Emrooz") comes first, and the Action Verb ("beram" / "kharid konam") comes at the end of the clause.',
    wordBreakdown: [
      { fa: 'امروز', fingilish: 'Emrooz', en: 'Today', role: 'Time' },
      { fa: 'می‌خوام برم', fingilish: 'Mikhām beram', en: 'I want to go', role: 'Modal + Verb' },
      { fa: 'با خانواده‌م', fingilish: 'Bā khānevādam', en: 'With my family', role: 'Companion' },
      { fa: 'بازار و خرید کنم', fingilish: 'Bāzār o kharid konam', en: 'To the bazaar and shop', role: 'Destination + Verb' }
    ]
  },
  {
    id: 'srl_4',
    stageId: 'stage_2',
    stageTitleEn: 'Stage 2 (A2): Everyday Needs, Family & Sentence Logic',
    stageTitleFa: 'مرحله ۲ (پایه A2): ساختار جمله فارسی، خانواده و نیازهای روزمره',
    lessonNumber: 4,
    titleEn: 'Lesson 4: Ordering Food, Tea & Polite Requests',
    persianSpoken: 'بی‌زحمت دو تا چای تازه و یک پرس کباب زعفرونی بیارید.',
    persianFormal: 'لطفاً دو استکان چای تازه و یک پرس کباب زعفرانی بیاورید.',
    fingilish: 'Bi-zahmat do tā chāy-e tāzeh o yek pors kabāb-e za’ferooni biyārid.',
    englishMeaning: 'Please (without trouble) bring two fresh teas and one plate of saffron kebab.',
    grammarSecretEn:
      '"Bi-zahmat" (literally: without trouble) is the most natural, warm Persian way to say "Please" when asking for something.',
    wordBreakdown: [
      { fa: 'بی‌زحمت', fingilish: 'Bi-zahmat', en: 'Please (No trouble)', role: 'Polite Opener' },
      { fa: 'دو تا چای تازه', fingilish: 'Do tā chāy-e tāzeh', en: 'Two fresh teas', role: 'Direct Object 1' },
      { fa: 'یک پرس کباب زعفرونی', fingilish: 'Yek pors kabāb-e za’ferooni', en: 'One order of saffron kebab', role: 'Direct Object 2' },
      { fa: 'بیارید', fingilish: 'Biyārid', en: 'Bring (polite plural)', role: 'Verb at End' }
    ]
  },

  // STAGE 3: B1 INTERMEDIATE — SPOKEN TEHRANI, TAAROF, SLANG & BOUNDARIES
  {
    id: 'srl_5',
    stageId: 'stage_3',
    stageTitleEn: 'Stage 3 (B1): Real Spoken Tehrani, Taarof & Street Slang',
    stageTitleFa: 'مرحله ۳ (متوسط B1): محاوره تهرانی، تعارف، کوچه‌بازار و حدهای روزمره',
    lessonNumber: 5,
    titleEn: 'Lesson 5: Authentic Taarof, Gratitude & Friendly Street Talk',
    persianSpoken: 'دستت درد نکنه رفیق، واقعاً سنگ تموم گذاشتی! جبران کنم.',
    persianFormal: 'از زحمات شما بسیار سپاسگزارم دوست عزیز، لطف شما را جبران خواهم کرد.',
    fingilish: 'Dastet dard nakoneh rafigh, vāghe’an sang tamoom gozāshti! Jobrān konam.',
    englishMeaning: 'Thank you so much my friend, you truly went all out! Let me make it up to you.',
    grammarSecretEn:
      'Saying "Jobrān konam" (May I make it up to you / return the favor) after someone hosts or helps you is peak native Persian fluency.',
    wordBreakdown: [
      { fa: 'دستت درد نکنه', fingilish: 'Dastet dard nakoneh', en: 'Thank you (May your hand not ache)', role: 'Idiom of Gratitude' },
      { fa: 'رفیق', fingilish: 'Rafigh', en: 'Close friend / Buddy', role: 'Vocative' },
      { fa: 'سنگ تموم گذاشتی', fingilish: 'Sang tamoom gozāshti', en: 'You went all out / did your absolute best', role: 'Colloquial Idiom' },
      { fa: 'جبران کنم', fingilish: 'Jobrān konam', en: 'May I return the favor', role: 'Taarof Response' }
    ]
  },
  {
    id: 'srl_6',
    stageId: 'stage_3',
    stageTitleEn: 'Stage 3 (B1): Real Spoken Tehrani, Taarof & Street Slang',
    stageTitleFa: 'مرحله ۳ (متوسط B1): محاوره تهرانی، تعارف، کوچه‌بازار و حدهای روزمره',
    lessonNumber: 6,
    titleEn: 'Lesson 6: Setting Clear Everyday Boundaries in Spoken Persian',
    persianSpoken: 'ببخشید، الان نوبت منه؛ لطفاً حق بقیه رو رعایت کنید.',
    persianFormal: 'عذر می‌خواهم، اکنون نوبت من است؛ لطفاً حقوق دیگران را رعایت فرمایید.',
    fingilish: 'Bebakhshid, alān nowbat-e man-eh; lotfan hagh-e baghiyeh ro ra’āyat konid.',
    englishMeaning: 'Excuse me, it is my turn right now; please respect everyone else’s rights.',
    grammarSecretEn:
      'Notice how "nowbat-e man ast" (it is my turn) naturally contracts to "nowbat-e man-eh" in real spoken Persian.',
    wordBreakdown: [
      { fa: 'ببخشید', fingilish: 'Bebakhshid', en: 'Excuse me / Pardon', role: 'Polite Attention' },
      { fa: 'الان نوبتِ منه', fingilish: 'Alān nowbat-e man-eh', en: 'Right now it is my turn', role: 'Statement' },
      { fa: 'لطفاً حقِ بقیه رو', fingilish: 'Lotfan hagh-e baghiyeh ro', en: 'Please the right of others [obj]', role: 'Object Phrase' },
      { fa: 'رعایت کنید', fingilish: 'Ra’āyat konid', en: 'Respect / Observe', role: 'Imperative Verb' }
    ]
  },

  // STAGE 4: B2 UPPER-INTERMEDIATE — READING & WRITING PERSIAN SCRIPT IN REAL LIFE
  {
    id: 'srl_7',
    stageId: 'stage_4',
    stageTitleEn: 'Stage 4 (B2): Reading & Writing Persian Script Fluently',
    stageTitleFa: 'مرحله ۴ (فرامتوسط B2): مهارت خواندن و نوشتن خط فارسی در زندگی واقعی',
    lessonNumber: 7,
    titleEn: 'Lesson 7: Reading & Writing Warm Messages to Family & Friends',
    persianSpoken: 'هر جا هستی برات آرزوی سلامتی، شادی و موفقیت دارم.',
    persianFormal: 'هر کجا که هستید برایتان آرزوی تندرستی، شادکامی و پیروزی دارم.',
    fingilish: 'Har jā hasti barāt ārezoo-ye salāmati, shādi o movaffaghiyat dāram.',
    englishMeaning: 'Wherever you are, I wish you health, happiness, and success.',
    grammarSecretEn:
      '"Barā-ye to" (for you) shortens to "Barāt" in spoken and texted Persian ("Barātoon" = for you plural/respectful).',
    wordBreakdown: [
      { fa: 'هر جا هستی', fingilish: 'Har jā hasti', en: 'Wherever you are', role: 'Clause 1' },
      { fa: 'برات', fingilish: 'Barāt', en: 'For you (Spoken form of Barā-ye to)', role: 'Preposition + Pronoun' },
      { fa: 'آرزوی سلامتی و شادی', fingilish: 'Ārezoo-ye salāmati o shādi', en: 'Wish of health and joy', role: 'Object' },
      { fa: 'دارم', fingilish: 'Dāram', en: 'I have / I hold', role: 'Main Verb' }
    ]
  },

  // STAGE 5: C1 ADVANCED — DIPLOMATIC, ECONOMIC TRADE & LITERARY PERSIAN (300M WORLD)
  {
    id: 'srl_8',
    stageId: 'stage_5',
    stageTitleEn: 'Stage 5 (C1): Diplomatic, Economic Trade & Poetic Mastery',
    stageTitleFa: 'مرحله ۵ (پیشرفته C1): فارسی دیپلماتیک، بازرگانی (ویژه بازار ۳۰۰ میلیونی) و ادبی',
    lessonNumber: 8,
    titleEn: 'Lesson 8: High-Level Diplomatic & Commercial Negotiation in Persian',
    persianSpoken: 'ما آماده گسترش همکاری‌های اقتصادی و تجاری با کشورهای فارسی‌زبان هستیم.',
    persianFormal: 'ما آماده گسترش همکاری‌های دوجانبه اقتصادی، تجاری و فرهنگی با کشورهای فارسی‌زبان هستیم.',
    fingilish: 'Mā āmādeh-ye gostaresh-e hamkāri-hā-ye do-jānebeh-ye eghtesādi va tejāri bā keshvar-hā-ye Fārsi-zabān hastim.',
    englishMeaning: 'We are ready to expand bilateral economic, commercial, and cultural cooperation with Persian-speaking countries.',
    grammarSecretEn:
      'Adding "-hā" (ها) makes nouns plural ("hamkāri-hā" = cooperations, "keshvar-hā" = countries), linked smoothly with the "-ye" Ezāfeh connector.',
    wordBreakdown: [
      { fa: 'ما آمادهٔ گسترشِ', fingilish: 'Mā āmādeh-ye gostaresh-e', en: 'We are ready for the expansion of', role: 'Subject + Readiness' },
      { fa: 'همکاری‌های دوجانبهٔ اقتصادی', fingilish: 'Hamkāri-hā-ye do-jānebeh-ye eghtesādi', en: 'Bilateral economic cooperations', role: 'Formal Object' },
      { fa: 'با کشورهای فارسی‌زبان', fingilish: 'Bā keshvar-hā-ye Fārsi-zabān', en: 'With Persian-speaking nations', role: 'Target Partner' },
      { fa: 'هستیم', fingilish: 'Hastim', en: 'We are', role: 'Formal Verb' }
    ]
  }
];

const SENTENCE_ASSEMBLER_DRILLS = [
  {
    id: 'sad_1',
    englishTarget: 'I want to learn Persian very well!',
    correctOrder: [
      { fa: 'من می‌خوام', fingilish: 'Man mikhām', en: 'I want' },
      { fa: 'زبانِ فارسی رو', fingilish: 'zabān-e Fārsi ro', en: 'the Persian language [obj]' },
      { fa: 'خیلی خوب', fingilish: 'kheyli khoob', en: 'very well' },
      { fa: 'یاد بگیرم!', fingilish: 'yād begiram!', en: 'to learn!' }
    ]
  },
  {
    id: 'sad_2',
    englishTarget: 'Grandma, thank you so much for everything!',
    correctOrder: [
      { fa: 'مامان‌بزرگ جون،', fingilish: 'Māmān-bozorg joon,', en: 'Dear Grandma,' },
      { fa: 'بابتِ همه‌چیز', fingilish: 'bābat-e hameh-chiz', en: 'for everything' },
      { fa: 'دستِ شما', fingilish: 'dast-e shomā', en: 'your hand' },
      { fa: 'درد نکنه!', fingilish: 'dard nakoneh!', en: 'may it never ache (thank you)!' }
    ]
  },
  {
    id: 'sad_3',
    englishTarget: 'We are ready for economic cooperation with Persian-speaking countries.',
    correctOrder: [
      { fa: 'ما آمادهٔ', fingilish: 'Mā āmādeh-ye', en: 'We are ready for' },
      { fa: 'همکاریِ اقتصادی', fingilish: 'hamkāri-ye eghtesādi', en: 'economic cooperation' },
      { fa: 'با کشورهای فارسی‌زبان', fingilish: 'bā keshvar-hā-ye Fārsi-zabān', en: 'with Persian-speaking countries' },
      { fa: 'هستیم.', fingilish: 'hastim.', en: 'are.' }
    ]
  }
];

const FARSI_SENTENCE_BUILDER_PRESETS = [
  {
    id: 'fsb_1',
    englishPrompt: 'I missed you so much, Grandma & Grandpa!',
    spokenFa: 'مامان‌بزرگ و بابابزرگ جون، دلم براتون خیلی تنگ شده بود!',
    spokenFingilish: 'Māmān-bozorg o Bābā-bozorg joon, delam barātoon kheyli tang shodeh bood!',
    formalFa: 'مادربزرگ و پدربزرگ گرامی، بسیار دلتنگ شما بودم.',
    grammarNoteEn: '"Joon" (جان / جون = dear soul) is added after a family member’s name to show deep affection.'
  },
  {
    id: 'fsb_2',
    englishPrompt: 'I would love to visit Iran and see Shiraz and Isfahan.',
    spokenFa: 'خیلی دوست دارم بیام ایران و شیراز و اصفهان رو ببینم!',
    spokenFingilish: 'Kheyli doost dāram biyām Irān o Shirāz o Esfahān ro bebinam!',
    formalFa: 'بسیار علاقه‌مندم به ایران سفر کنم و شیراز و اصفهان را ببینم.',
    grammarNoteEn: 'In Persian, the main verb ("bebinam" = that I see) always goes at the very end of the clause.'
  },
  {
    id: 'fsb_3',
    englishPrompt: 'My Persian isn’t perfect yet, but I’m practicing every day!',
    spokenFa: 'فارسیم هنوز کامل نیست، ولی دارم هر روز تمرین می‌کنم!',
    spokenFingilish: 'Fārsim hanooz kāmel nist, vali dāram har rooz tamrin mikonam!',
    formalFa: 'زبان فارسی من هنوز کامل نیست، اما هر روز در حال تمرین هستم.',
    grammarNoteEn: 'Adding "-am / -im" to the end of a noun ("Fārsi-m") means "My Persian"!'
  },
  {
    id: 'fsb_4',
    englishPrompt: 'Thank you for everything, you went all out for us!',
    spokenFa: 'دستتون درد نکنه، واقعاً سنگ تموم گذاشتید!',
    spokenFingilish: 'Dastetoon dard nakoneh, vāghe’an sang tamoom gozāshtid!',
    formalFa: 'از لطف و محبت بیکران شما صمیمانه سپاسگزارم.',
    grammarNoteEn: 'Combine warm gratitude ("Dastetoon dard nakoneh") with the idiom "Sang tamoom gozāshtid" to sound like a true native.'
  }
];

interface C2ProverbAnd17PlusItem {
  id: string;
  tier: 'proverb_c2' | 'colloquial_idiom' | 'pg17_street_defense';
  badgeEn: string;
  badgeFa: string;
  englishSlangOrProverb: string;
  persianSpokenStreet: string;
  persianFormalOrProverb: string;
  fingilish: string;
  europeanBridges: string;
  explanationEnFa: string;
}

const C2_PROVERBS_SLANG_AND_17PLUS_DB: C2ProverbAnd17PlusItem[] = [
  {
    id: 'c2_1',
    tier: 'pg17_street_defense',
    badgeEn: '🔥 17+ Street Slang & Calling Out BS',
    badgeFa: '🔥 رده سنی +۱۷ • مچ‌گیری دروغ و خالی‌بندی در کوچه و خیابان',
    englishSlangOrProverb: 'Quit bullshitting me / Cut the crap and stop trying to play me for a fool!',
    persianSpokenStreet: 'خالی نبند و چرت‌وپرت نگو! فکر کردی از پشت کوه اومدم که می‌خوای سرم رو شیره بمالی؟',
    persianFormalOrProverb: 'لطفاً سخن غیرواقعی نگویید و تلاش نکنید مرا فریب دهید.',
    fingilish: 'Khāli naband o chert-o-pert nagoo! Fekr kardi az posht-e kooh oomadam ke mikhāy saram ro shireh bemāli?',
    europeanBridges: '🇩🇪 Hör auf, mir Bullshit zu erzählen! • 🇫🇷 Arrête de me raconter des conneries ! • 🇸🇪 Sluta snacka skit!',
    explanationEnFa: 'Covers real-life 17+ street expressions: "Khāli naband" (quit bullshitting/bluffing), "Chert-o-pert" (crap/nonsense), "Sar-e kasi ro shireh mālidan" (to con/fool someone).'
  },
  {
    id: 'c2_2',
    tier: 'pg17_street_defense',
    badgeEn: '🔥 17+ Street Defense & Telling Someone to Back Off',
    badgeFa: '🔥 رده سنی +۱۷ • رد قاطعانه مزاحمت خیابانی و دفاع از خود',
    englishSlangOrProverb: 'Get the hell out of my face / Back the hell off and mind your own damn business!',
    persianSpokenStreet: 'بزن به چاک و گمشو اون‌ور! سرت تو لاک خودت باشه و پاپیچِ من نشو!',
    persianFormalOrProverb: 'لطفاً از من فاصله بگیرید و در امور شخصی من دخالت نکنید.',
    fingilish: 'Bezan be chāk o gomsho oon-var! Saret too lāk-e khodet bāsheh o pāpich-e man nasho!',
    europeanBridges: '🇩🇪 Zieh Leine und kümmere dich um deinen eigenen Kram! • 🇫🇷 Fiche le camp, mêle-toi de tes affaires !',
    explanationEnFa: 'Essential 17+ street self-defense: "Bezan be chāk" (hit the road / get lost), "Saret too lāk-e khodet bāsheh" (mind your own damn business), "Pāpich nasho" (stop harassing/pestering me).'
  },
  {
    id: 'c2_3',
    tier: 'pg17_street_defense',
    badgeEn: '🔥 17+ Street Idiom • Two-Faced & Backstabber',
    badgeFa: '🔥 رده سنی +۱۷ • آدم دورو، آب‌زیرکاه و خنجر از پشت',
    englishSlangOrProverb: 'Watch out, that guy is a two-faced snake in the grass who will stab you in the back!',
    persianSpokenStreet: 'حواست رو جمع کن، طرف خیلی آب‌زیرکاه و هفت‌خطه؛ تا چشمت رو دور ببینه از پشت خنجر می‌زنه!',
    persianFormalOrProverb: 'مراقب باشید، ایشان فردی ریاکار و غیرقابل اعتماد است.',
    fingilish: 'Havāset ro jam kon, taraf kheyli āb-zir-e-kāh o haft-khat-eh; tā cheshmet ro door bebineh az posht khanjar mizaneh!',
    europeanBridges: '🇩🇪 Vorsicht, er ist falsch und hinterlistig! • 🇫🇷 Méfie-toi, c’est un hypocrite sournois !',
    explanationEnFa: '"Āb-zir-e-kāh" (water under straw = snake in the grass) and "Haft-khat" (seven-lined = ultra-cunning hustler) are C2 Persian street idioms every adult & 17+ youth must understand.'
  },
  {
    id: 'c2_4',
    tier: 'proverb_c2',
    badgeEn: '📜 C2 Proverb Mastery (ضرب‌المثل فوق‌پیشرفته)',
    badgeFa: '📜 ضرب‌المثل سطح فوق‌پیشرفته C2 • تجربه تلخ و احتیاط',
    englishSlangOrProverb: 'Once bitten, twice shy! / People who live in glass houses shouldn’t throw stones.',
    persianSpokenStreet: 'مارگزیده از ریسمان سیاه و سفید می‌ترسه! / کسی که خونه‌ش شیشه‌ایه به مردم سنگ نمی‌زنه!',
    persianFormalOrProverb: 'آزموده را آزمودن خطاست • مارگزیده از ریسمان سیاه و سفید می‌ترسد.',
    fingilish: 'Mār-gazideh az rismān-e siyāh o sefid mitarseh! / Āzmoodeh rā āzmoodan khatāst.',
    europeanBridges: '🇩🇪 Gebranntes Kind scheut das Feuer • 🇫🇷 Chat échaudé craint l’eau froide',
    explanationEnFa: 'Direct proverb-to-proverb mapping between English/European and classical/spoken Persian.'
  },
  {
    id: 'c2_5',
    tier: 'proverb_c2',
    badgeEn: '📜 C2 Proverb Mastery (ضرب‌المثل اصیل ایرانی)',
    badgeFa: '📜 ضرب‌المثل سطح فوق‌پیشرفته C2 • ادعا بدون عمل',
    englishSlangOrProverb: 'Empty vessels make the most noise / All bark and no bite (Actions speak louder than words).',
    persianSpokenStreet: 'طبل توخالی صداش بلنده! / به عمل کار برآید به سخندانی نیست (حرف مفت که مالیات نداره!).',
    persianFormalOrProverb: 'درخت هرچه پربارتر، سر به زیرتر • دو صد گفته چون نیم کردار نیست.',
    fingilish: 'Tabl-e too-khāli sedāsh bolandeh! / Be amal kār bar-āyad be sokhandāni nist.',
    europeanBridges: '🇩🇪 Hunde, die bellen, beißen nicht • 🇫🇷 Les tonneaux vides font le plus de bruit',
    explanationEnFa: 'Teaches both the classical Saadi/Ferdowsi proverb and the sharp street retort "Harf-e moft ke māliyāt nadāreh!" (Cheap talk has no tax!).'
  },
  {
    id: 'c2_6',
    tier: 'colloquial_idiom',
    badgeEn: '😎 High-Energy Youth & Street Praise (17+)',
    badgeFa: '😎 اصطلاحات پرانرژی جوانان و تحسین خودمانی',
    englishSlangOrProverb: 'You absolutely killed it bro, you’re badass! I’m dead tired today though, totally wiped out.',
    persianSpokenStreet: 'ایول داداش، رسماً ترکوندی، آخرشی! ولی من امروز از خستگی جنازه‌م و دهنم سرویس شده.',
    persianFormalOrProverb: 'آفرین بر شما، عملکرد فوق‌العاده‌ای داشتید؛ اما من امروز بسیار خسته هستم.',
    fingilish: 'Eyval dādāsh, rasman terkoondi, ākhare-shi! Vali man emrooz az khastegi jenāzam o dahanam servis shodeh.',
    europeanBridges: '🇩🇪 Du hast es echt gerockt, Bruder! Ich bin heute völlig fertig. • 🇫🇷 Tu as tout déchiré frérot ! Je suis crevé.',
    explanationEnFa: '"Terkoondi" (you blew it up / killed it), "Ākhare-shi" (you’re the ultimate/best), and the 17+ colloquial "Dahanam servis shodeh" (I got worked to death / exhausted).'
  }
];

export const PersianForDiasporaHub: React.FC<PersianForDiasporaHubProps> = ({ onEarnLingous }) => {
  const [subTab, setSubTab] = useState<
    | 'roadmap_srs'
    | 'colloquial_proverb_translator'
    | 'phrases'
    | 'spoken_vs_formal'
    | 'alphabet'
    | 'stories'
    | 'quiz'
  >('roadmap_srs');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [phraseFilter, setPhraseFilter] = useState<string>('all');
  const [slowMode, setSlowMode] = useState<boolean>(false);
  const [persianVoice, setPersianVoice] = useState<'female' | 'male'>('female');
  const [selectedBuilderIdx, setSelectedBuilderIdx] = useState<number>(0);

  // State for Live Bilateral C2 Colloquial, Proverb & 17+ Street Translator
  const [liveTransInput, setLiveTransInput] = useState<string>('');
  const [liveTransDirection, setLiveTransDirection] = useState<'en_to_fa' | 'fa_to_en'>('en_to_fa');
  const [liveTransLoading, setLiveTransLoading] = useState<boolean>(false);
  const [liveTransResult, setLiveTransResult] = useState<{
    original: string;
    translation: string;
    colloquialVariant: string;
    pronunciation: string;
    proverbOrIdiomNote: string;
  }>({
    original: 'Quit bullshitting me and don’t try to pull my leg—once bitten, twice shy!',
    translation: 'خالی نبند و نخواه سرم رو شیره بمالی — مارگزیده از ریسمان سیاه و سفید می‌ترسه!',
    colloquialVariant: 'چرت‌وپرت نگو رفیق، ما خودمون ذغال‌فروشیم! آدم عاقل از یه سوراخ دو بار گزیده نمیشه.',
    pronunciation: 'Khāli naband o nakhāh saram ro shireh bemāli — mār-gazideh az rismān-e siyāh o sefid mitarseh!',
    proverbOrIdiomNote: '🎯 معادل دقیق اصطلاح +۱۷ و ضرب‌المثل: "Quit bullshitting" = «خالی نبند / چرت‌وپرت نگو» • "Pull my leg" = «سر کسی را شیره مالیدن / دست انداختن» • "Once bitten, twice shy" = «مارگزیده از ریسمان سیاه و سفید می‌ترسد».'
  });

  const handleTranslateLiveC2 = async (customText?: string, customDir?: 'en_to_fa' | 'fa_to_en') => {
    sound.playClick();
    const dir = customDir || liveTransDirection;
    const text = (customText ?? liveTransInput).trim();
    if (!text) return;

    const lower = text.toLowerCase();
    // Instant 0ms local match against our C2 Proverb & 17+ Street DB
    const matchedPreset = C2_PROVERBS_SLANG_AND_17PLUS_DB.find(
      (item) =>
        item.englishSlangOrProverb.toLowerCase().includes(lower) ||
        item.persianSpokenStreet.includes(text) ||
        lower.includes('bullshit') ||
        lower.includes('once bitten')
    );

    if (matchedPreset && customText) {
      const resObj = {
        original: text,
        translation: dir === 'en_to_fa' ? matchedPreset.persianSpokenStreet : matchedPreset.englishSlangOrProverb,
        colloquialVariant: dir === 'en_to_fa' ? matchedPreset.persianFormalOrProverb : matchedPreset.europeanBridges,
        pronunciation: matchedPreset.fingilish,
        proverbOrIdiomNote: matchedPreset.explanationEnFa
      };
      setLiveTransResult(resObj);
      if (dir === 'en_to_fa') {
        speakPersian(matchedPreset.persianSpokenStreet, speechRate, matchedPreset.fingilish);
      } else {
        speakEnglish(matchedPreset.englishSlangOrProverb, speechRate);
      }
      onEarnLingous(15);
      return;
    }

    setLiveTransLoading(true);
    try {
      const resp = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sourceLang: dir === 'en_to_fa' ? 'en' : 'fa',
          targetLang: dir === 'en_to_fa' ? 'fa' : 'en',
          domain: 'c2_colloquial_proverbs_idioms_and_17plus_street_slang'
        })
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data?.translation) {
          const finalTrans = data.translation;
          const finalColloq = data.colloquialVariant || finalTrans;
          const finalPron =
            data.pronunciation ||
            (dir === 'en_to_fa' ? transliteratePersianToFingilish(finalTrans) : finalTrans);
          setLiveTransResult({
            original: text,
            translation: finalTrans,
            colloquialVariant: finalColloq,
            pronunciation: finalPron,
            proverbOrIdiomNote:
              data.proverbOrIdiomNote ||
              'ترجمه سطح فوق‌پیشرفته (C2) با پوشش کامل اصطلاحات عامیانه، ضرب‌المثل‌ها و کوچه‌بازار.'
          });
          if (dir === 'en_to_fa') {
            speakPersian(finalTrans, speechRate, finalPron);
          } else {
            speakEnglish(finalTrans, speechRate);
          }
          onEarnLingous(15);
        }
      }
    } catch {
      const fallbackPron = transliteratePersianToFingilish(text);
      setLiveTransResult({
        original: text,
        translation: text,
        colloquialVariant: text,
        pronunciation: fallbackPron,
        proverbOrIdiomNote: 'پخش صوتی و آوانگاری آفلاین فعال است.'
      });
    } finally {
      setLiveTransLoading(false);
    }
  };

  const handleSelectPersianVoice = (gender: 'female' | 'male') => {
    sound.playClick();
    setPersianVoice(gender);
    setPersianVoiceGender(gender);
  };
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [spokenPracticeStatus, setSpokenPracticeStatus] = useState<Record<string, string>>({});

  // Spaced Repetition & 3x Practice Counter persisted in localStorage
  const [repetitionCounts, setRepetitionCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('lingo_farsi_reps_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [reviewQueueIds, setReviewQueueIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('lingo_farsi_review_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [onlyShowReviewQueue, setOnlyShowReviewQueue] = useState<boolean>(false);

  // Interactive Sentence Assembler State
  const [activeDrillIdx, setActiveDrillIdx] = useState<number>(0);
  const [pickedChunks, setPickedChunks] = useState<number[]>([]);

  const speechRate = slowMode ? 0.68 : 0.88;
  const currentBuilder = FARSI_SENTENCE_BUILDER_PRESETS[selectedBuilderIdx] || FARSI_SENTENCE_BUILDER_PRESETS[0];

  const handleIncrementRepetition = (lesson: StructuredRoadmapLesson) => {
    speakPersian(lesson.persianSpoken, speechRate, lesson.fingilish);
    setRepetitionCounts((prev) => {
      const nextCount = (prev[lesson.id] || 0) + 1;
      const updated = { ...prev, [lesson.id]: nextCount };
      try {
        localStorage.setItem('lingo_farsi_reps_v1', JSON.stringify(updated));
      } catch {}
      if (nextCount === 3) {
        sound.playLevelUp();
        try {
          confetti({ particleCount: 40, spread: 60 });
        } catch {}
        onEarnLingous(30);
      } else {
        onEarnLingous(10);
      }
      return updated;
    });
  };

  const handleToggleReviewQueue = (lessonId: string) => {
    sound.playClick();
    setReviewQueueIds((prev) => {
      const updated = { ...prev, [lessonId]: !prev[lessonId] };
      try {
        localStorage.setItem('lingo_farsi_review_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const masteredLessonsCount = STRUCTURED_FARSI_ROADMAP.filter(
    (l) => (repetitionCounts[l.id] || 0) >= 3
  ).length;
  const totalRepetitionsDone = (Object.values(repetitionCounts) as number[]).reduce((a, b) => a + b, 0);
  const masteryPercentage = Math.round((masteredLessonsCount / STRUCTURED_FARSI_ROADMAP.length) * 100);

  const filteredRoadmapLessons = STRUCTURED_FARSI_ROADMAP.filter((l) => {
    if (onlyShowReviewQueue && !reviewQueueIds[l.id]) return false;
    if (selectedStage !== 'all' && l.stageId !== selectedStage) return false;
    return true;
  });

  const currentAssemblerDrill = SENTENCE_ASSEMBLER_DRILLS[activeDrillIdx] || SENTENCE_ASSEMBLER_DRILLS[0];

  const filteredPhrases = DIASPORA_HERITAGE_PHRASES.filter((p) =>
    phraseFilter === 'all' ? true : p.category === phraseFilter
  );

  const handlePracticeSpeakingFarsi = (itemId: string) => {
    sound.playClick();
    setSpokenPracticeStatus((prev) => ({
      ...prev,
      [itemId]: '🎙️ Listening in Persian (در حال شنیدن صدای فارسی شما...)'
    }));
    try {
      const SpeechRec =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRec) {
        setSpokenPracticeStatus((prev) => ({
          ...prev,
          [itemId]: '💡 با شنیدن صدای فارسی (🔊) و تکرار ۳ مرحله‌ای با صدای بلند تمرین کنید.'
        }));
        return;
      }
      const rec = new SpeechRec();
      rec.lang = 'fa-IR';
      rec.interimResults = false;
      rec.onresult = (event: any) => {
        const transcript = event?.results?.[0]?.[0]?.transcript || '';
        sound.playCoin();
        onEarnLingous(15);
        setSpokenPracticeStatus((prev) => ({
          ...prev,
          [itemId]: `✅ آفرین! صدای شما دریافت شد: «${transcript}» (+15 XP)`
        }));
      };
      rec.onerror = () => {
        setSpokenPracticeStatus((prev) => ({
          ...prev,
          [itemId]: '💡 با شنیدن صدای فارسی (🔊) و تکرار ۳ مرحله‌ای با صدای بلند تمرین کنید.'
        }));
      };
      rec.start();
    } catch {
      setSpokenPracticeStatus((prev) => ({
        ...prev,
        [itemId]: '💡 با شنیدن صدای فارسی (🔊) و تکرار ۳ مرحله‌ای با صدای بلند تمرین کنید.'
      }));
    }
  };

  const handleSelectQuiz = (qId: string, idx: number, isCorrect: boolean) => {
    sound.playClick();
    setQuizAnswers((prev) => ({ ...prev, [qId]: idx }));
    if (isCorrect) {
      sound.playLevelUp();
      try {
        confetti({ particleCount: 45, spread: 65 });
      } catch {}
      onEarnLingous(25);
    } else {
      sound.playError();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* =================================================================== */}
      {/* PERMANENT EPIC & EMOTIONAL COVENANT SECTION                         */}
      {/* (پاسداشت حماسی و احساسی زبان فارسی: زبان قلب، تمدن ایرانی و نسل جدید) */}
      {/* =================================================================== */}
      <section
        aria-label="منشور حماسی و احساسی پاسداشت زبان شیرین و مادری فارسی"
        className="rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-amber-950 text-white p-6 sm:p-8 border-2 border-amber-400 shadow-2xl space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-400/30 pb-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs sm:text-sm">
              👑 عهدنامهٔ جاودان پاسداشت زبان مادری • زبانِ قلب و تمدن ایران‌زمین
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-amber-300 leading-snug pt-1">
              زبان شیرین پارسی؛ تپشِ قلبِ ما، شکوهِ تمدنِ نیاکان و میراثِ مقدس نسل جدید
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                speakPersian(
                  'بسی رنج بردم در این سال سی، عجم زنده کردم بدین پارسی. من عاشق زبان فارسی‌ام و آرزومند بسط و اشاعه و گسترش آن و آشنا شدن نسل جدید با زبان شیرین فارسی هستم. زبان فارسی، زبان قلب من، زبان مهر مادرم، زبان برکت نان پدرم بر سر سفره، و زبان گفتگوی عاشقانه من با پروردگار جهان است. فرزندان عزیز ایران در سراسر جهان! زبان فارسی شناسنامه روح شما و پل پیوند شما با هزاران سال خرد، شعر، ادب و تمدن ایران‌زمین است.',
                  0.85
                )
              }
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 شنیدن سرود و پیام حماسی به فارسی</span>
            </button>

            <button
              type="button"
              onClick={() =>
                speakEnglish(
                  'Persian is not merely a language; it is the heartbeat of an ancient civilization, the warmth of a mother’s love, the blessing of a father’s honest bread, and the sacred bridge connecting the new generation of Iranians abroad to thousands of years of wisdom, poetry, and identity.',
                  0.88
                )
              }
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-amber-200 border border-amber-300/40 font-black text-xs flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 Listen in English (For Diaspora Youth)</span>
            </button>
          </div>
        </div>

        {/* Epic Ferdowsi & Classical Couplet Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-amber-500/20 border border-amber-400/50 text-center space-y-1">
          <p className="text-base sm:text-xl font-black text-amber-300 tracking-wide">
            «بسی رنج بردم در این سال سی &nbsp;•&nbsp; عجم زنده کردم بدین پارسی»
          </p>
          <p className="text-xs text-amber-100/90 font-bold">
            حکیم ابوالقاسم فردوسی — پاسدار بزرگ هویت و زبان پارسی در درازنای تاریخ
          </p>
        </div>

        {/* Heartfelt & Epic Manifesto of the Founder (Siavash Ali-Miri) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-black/45 border-2 border-amber-400/60 space-y-3">
          <p className="text-sm sm:text-base font-black text-amber-200 leading-loose text-justify">
            «ای فرزندانِ ایران‌زمین در سراسر گیتی و ای دوستداران فرهنگ و تمدن بشری! زبان فارسی تنها واژگانی بر روی کاغذ نیست؛ <strong className="text-amber-300">فارسی تپشِ قلبِ ماست که روحمان را به جهانیان عرضه می‌کند.</strong> فارسی، زبانِ لالایی و مهرِ بی‌پایانِ مادرم، و زبانِ برکتِ نانِ حلالِ پدرم بر سرِ سفرهٔ ماست؛ زبانِ درد و دل، زبانِ اشک و لبخند، و زبانِ راز و نیاز و گفتگوی صمیمیِ من با خدای مالک و خالقِ جهانم است. فارسی، زبانِ عشق و امید و آرزوی من، زبانِ تنفس و زبانِ زندگیِ من است. من اگر در تمام عمرم هیچ برنامه‌ای نمی‌ساختم، تنها برای سپاسگزاری و ادای دِین به این زبانِ مادری و تمدنِ کهن، این اثر را بنا می‌کردم تا مشعلِ فروزانِ زبانِ شیرین فارسی در دستِ نسلِ جدیدِ ایرانیان خارج از کشور و جهانیان، جاودانه بدرخشد.»
          </p>
          <p className="text-xs font-bold text-emerald-200 leading-relaxed" dir="ltr">
            🕊️ <strong>To the New Generation of Iranians Abroad & Friends of Persian Worldwide:</strong> "Persian is the pulse of our heart and the mirror of our soul. It is the language of my mother’s boundless love, the blessing of my father’s bread upon our family table, and my intimate prayer with God, the Creator of the universe. Even if I had never built any other work in my life, I would have built this sanctuary out of pure gratitude to my mother tongue—so that the children of the 10 million Iranians living abroad never feel distant from their roots, their grandparents’ embrace, or the immortal civilization of Ferdowsi, Hafez, Rumi, and Saadi." — <em>Siavash Ali-Miri (Raised at the blessed table of Persian carpet artistry — Hossein Ali-Miri & Sons, Iran Carpet Bazaar, No. 48)</em>
          </p>
        </div>

        {/* 3 Permanent Pillars: Heart, Civilization & New Generation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-white/10 border border-amber-300/40 space-y-1.5">
            <h3 className="text-sm font-black text-amber-300">
              ❤️ ۱. زبانِ قلب، مهر مادر و برکت نان پدر
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              زبان فارسی، کانون عاطفه و اصالت خانوادهٔ ایرانی است؛ زبانی که گرمای دعای خیر مادر و برکت تلاش پدر را در دل هر فرزند ایرانی زنده نگه می‌دارد و پلِ ارتباطِ عاشقانهٔ انسان با پروردگار خویش است.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-amber-300/40 space-y-1.5">
            <h3 className="text-sm font-black text-amber-300">
              🏛️ ۲. ستون استوار تمدن و خرد هزارسالهٔ ایران
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              از منشور کوروش و حماسه‌های شاهنامهٔ فردوسی تا پیام نوع‌دوستی سعدی («بنی‌آدم اعضای یکدیگرند») و غزل‌های حافظ و مولانا؛ زبان فارسی یکی از بزرگ‌ترین گنجینه‌های تمدن‌ساز بشریت در میان بیش از ۳۰۰ میلیون گویش‌ور منطقه‌ای و جهانی است.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-amber-300/40 space-y-1.5">
            <h3 className="text-sm font-black text-amber-300">
              🌱 ۳. میراث ماندگار برای نسل جدید ایرانیان خارج از کشور
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              آموزش فارسی به فرزندان ۱۰ میلیون ایرانی مقیم خارج از کشور، حفظ ریشه و هویت آن‌هاست؛ تا هر نوجوان و جوان ایرانی در هر نقطهٔ دنیا بتواند با افتخار به زبان نیاکان خود سخن بگوید، بخواند، بنویسد و به ایرانی بودن خود ببالد.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Banner Specifically for the 300M Persian World, 10M Iranian Diaspora & English Speakers Learning Persian */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-8 border-2 border-amber-400/60 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
              <Sparkles className="w-4 h-4" />
              <span>🇮🇷 #1 FLAGSHIP: LEARN PERSIAN (FARSI) FOR US, EUROPE, 10M DIASPORA & 300M PERSIAN WORLD</span>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-xs">
              🎁 ۱۰۰٪ رایگان برای تمام زبان‌ها در آمریکا، اروپا و جهان (100% Free Global Access)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Native Iranian Voice Selector (گوینده اصیل ایرانی: خانم دلارا / آقای فرید) */}
            <div className="inline-flex items-center rounded-xl bg-black/40 p-1 border border-amber-400/50">
              <button
                type="button"
                onClick={() => handleSelectPersianVoice('female')}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  persianVoice === 'female'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-amber-100 hover:bg-white/10'
                }`}
              >
                👩 صدای خانم ایرانی (دلارا - لهجه اصیل تهرانی)
              </button>
              <button
                type="button"
                onClick={() => handleSelectPersianVoice('male')}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  persianVoice === 'male'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-amber-100 hover:bg-white/10'
                }`}
              >
                👨 صدای آقای ایرانی (فرید - لهجه اصیل تهرانی)
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setSlowMode(!slowMode);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all ${
                slowMode
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              🐢 {slowMode ? 'Slow Pronunciation: ON (0.68x)' : 'Normal Speed (Click for Slow Farsi Audio)'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-7 space-y-2" dir="ltr">
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 leading-tight">
              The Complete Persian (Farsi) Academy for English Speakers, Diaspora Youth, Diplomats & Global Trade
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Over <strong>300 million people worldwide</strong> speak or understand Persian across strategic economic and cultural hubs, and <strong>10 million Iranians live abroad</strong> whose children want to master their mother tongue. Unlike weak generic apps, this flagship section teaches: <strong>1) Family, Taarof, Colloquial Street Slang & Boundaries, 2) Diplomatic, Political & Economic Trade Persian, 3) Spoken Tehrani vs. Textbook Farsi, 4) Persian Script & Alphabet, and 5) Bilingual Audio Stories</strong>.
            </p>
          </div>

          <div className="lg:col-span-5 p-4 rounded-2xl bg-black/40 border-2 border-amber-400/50 space-y-1.5">
            <h3 className="text-xs sm:text-sm font-black text-amber-300">
              🌟 بال پرواز و برگ برنده بی‌رقیب برنامه در جهان:
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              پوشش هم‌زمان <strong>۳ گروه بزرگ جهانی</strong> که هیچ اپلیکیشن قدرتمندی نداشتند:
              <br />
              ۱) <strong>فرزندان ۱۰ میلیون ایرانی خارج از کشور</strong> (مکالمه با خانواده، محاوره تهرانی، تعارف و کوچه‌بازار)
              <br />
              ۲) <strong>دیپلمات‌ها، دفاتر نمایندگی سیاسی و تجار خارجی</strong> در ارتباط با بازار <strong>۳۰۰ میلیون نفری فارسی‌زبانان</strong>
              <br />
              ۳) <strong>انگلیسی‌زبانان علاقه‌مند به فرهنگ، شعر و خط شیرین فارسی</strong>.
            </p>
          </div>
        </div>

        {/* Interactive Instant Farsi Sentence Studio for English Speakers */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border border-amber-300/40 space-y-3" dir="ltr">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-black text-amber-300">
              🎯 Interactive Farsi Sentence Studio (Click an English thought to see & hear how Iranians actually say it!):
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {FARSI_SENTENCE_BUILDER_PRESETS.map((preset, idx) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedBuilderIdx(idx);
                  speakPersian(preset.spokenFa, speechRate, preset.spokenFingilish);
                }}
                className={`p-3 rounded-xl text-left text-xs font-black border transition-all ${
                  selectedBuilderIdx === idx
                    ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-md'
                    : 'bg-black/30 text-white border-white/20 hover:bg-white/15'
                }`}
              >
                🇬🇧 "{preset.englishPrompt}"
              </button>
            ))}
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-400/50 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 space-y-1.5">
              <p className="text-base sm:text-xl font-black text-amber-300" dir="rtl">
                🇮🇷 محاوره روزمره: «{currentBuilder.spokenFa}»
              </p>
              <p className="text-xs sm:text-sm font-mono font-black text-emerald-300">
                🗣️ Fingilish: "{currentBuilder.spokenFingilish}"
              </p>
              <p className="text-xs text-slate-300" dir="rtl">
                📘 صورت رسمی و کتابی: «{currentBuilder.formalFa}»
              </p>
              <p className="text-[11px] text-amber-200/90">
                💡 <strong>Grammar Tip:</strong> {currentBuilder.grammarNoteEn}
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  handleSelectPersianVoice('female');
                  speakPersian(currentBuilder.spokenFa, speechRate, currentBuilder.spokenFingilish, 'female');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 صدای خانم ایرانی (دلارا - لهجه اصیل فارسی)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSelectPersianVoice('male');
                  speakPersian(currentBuilder.spokenFa, speechRate, currentBuilder.spokenFingilish, 'male');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 صدای آقای ایرانی (فرید - لهجه اصیل فارسی)</span>
              </button>
              <button
                type="button"
                onClick={() => speakPersian(currentBuilder.formalFa, speechRate, undefined, persianVoice)}
                className="w-full py-2 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs"
              >
                📘 شنیدن صورت رسمی و کتابی (لهجه اصیل ایرانی)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MODULE 1 FEATURED: TRIPLE-SCRIPT (FA + FINGILISH + EN/ES/FR/DE)     */}
      {/* & TOUCH-SCREEN PERSIAN ALPHABET CANVAS + RUMI/HAFEZ + DARI/TAJIK    */}
      {/* =================================================================== */}
      <PersianAlphabetCanvasStudio speechRate={speechRate} onEarnLingous={onEarnLingous} />

      {/* Sub-Navigation Tabs (6 Complete Persian Mastery Pillars for English Speakers) */}
      <div className="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-2xl border-2 border-emerald-500/40 shadow-sm">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setSubTab('roadmap_srs');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap flex items-center gap-2 ${
            subTab === 'roadmap_srs'
              ? 'bg-amber-400 text-slate-950 shadow-sm border border-amber-500'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>🗺️ 1. Structured Mastery Path (مسیر گام‌به‌گام + تکرار)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setSubTab('colloquial_proverb_translator');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap flex items-center gap-2 ${
            subTab === 'colloquial_proverb_translator'
              ? 'bg-rose-700 text-white shadow-sm'
              : 'bg-rose-50 text-rose-950 border border-rose-200 hover:bg-rose-100'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>🔥 2. C2 Colloquial, Proverbs & 17+ Street Translator (مترجم عامیانه، ضرب‌المثل و +۱۷)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setSubTab('phrases');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap flex items-center gap-2 ${
            subTab === 'phrases' ? 'bg-emerald-800 text-white' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>3. Family, Diplomacy, Taarof & Slang (خانواده، دیپلماسی ۳۰۰ میلیونی و کوچه‌بازار)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setSubTab('spoken_vs_formal');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap flex items-center gap-2 ${
            subTab === 'spoken_vs_formal' ? 'bg-emerald-800 text-white' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>3. Spoken Tehrani vs. Textbook (فرمول تبدیل کتابی به تهرانی)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setSubTab('alphabet');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap flex items-center gap-2 ${
            subTab === 'alphabet' ? 'bg-emerald-800 text-white' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>4. Persian Alphabet & Reading (آموزش الفبا و خواندن خط فارسی)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setSubTab('stories');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap flex items-center gap-2 ${
            subTab === 'stories' ? 'bg-emerald-800 text-white' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>5. Bilingual Stories & Listening (داستان‌های صوتی دوزبانه ایران)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setSubTab('quiz');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap flex items-center gap-2 ${
            subTab === 'quiz' ? 'bg-emerald-800 text-white' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>6. Interactive Farsi Quiz (آزمون مهارت فارسی)</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* SUB-TAB: LIVE C2 COLLOQUIAL, PROVERBS & 17+ STREET TRANSLATOR       */}
      {/* =================================================================== */}
      {subTab === 'colloquial_proverb_translator' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-rose-950 to-indigo-950 text-white p-6 sm:p-8 border-2 border-amber-400/60 shadow-xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
                  🔥 C2 ULTRA-ADVANCED COLLOQUIAL, PROVERB & PG-17 STREET TRANSLATOR
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-amber-300 pt-1">
                  مترجم دوطرفه فوق‌پیشرفته عامیانه، ضرب‌المثل‌ها، کنایه‌ها و الفاظ خیابانی (+۱۷ سال)
                </h3>
                <p className="text-xs sm:text-sm text-rose-100">
                  درک و ترجمهٔ عمیق‌ترین اصطلاحات کوچه‌بازاری، ضرب‌المثل‌های اصیل (C2) و الفاظ تند و خودمانی رده سنی ۱۷+ سال (برای اینکه جوانان ایرانی در آمریکا و اروپا یا فارسی‌زبانان در مواجهه با صحبت‌های خیابانی، متلک‌ها و کنایه‌ها کاملاً مسلط باشند) — با پشتیبانی رایگان برای انگلیسی و زبان‌های اروپایی (آلمانی، فرانسوی، سوئدی).
                </p>
              </div>
            </div>

            {/* Live Input Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/45 border border-amber-400/40 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setLiveTransDirection('en_to_fa');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                      liveTransDirection === 'en_to_fa'
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    🇬🇧/🇪🇺 English or European Slang/Proverb ➔ 🇮🇷 فارسی محاوره‌ای و اصیل
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setLiveTransDirection('fa_to_en');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                      liveTransDirection === 'fa_to_en'
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    🇮🇷 فارسی عامیانه / ضرب‌المثل / +۱۷ ➔ 🇬🇧 Native English Slang & Idiom
                  </button>
                </div>
                <span className="text-[11px] font-bold text-emerald-300">
                  🎁 ۱۰۰٪ رایگان و بدون محدودیت (Free Global Access)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={liveTransInput}
                  onChange={(e) => setLiveTransInput(e.target.value)}
                  placeholder={
                    liveTransDirection === 'en_to_fa'
                      ? 'Type any English/European slang, proverb, or 17+ street phrase (e.g., Quit bullshitting me / Once bitten twice shy)...'
                      : 'هر اصطلاح عامیانه، ضرب‌المثل یا جمله کوچه‌بازاری (+۱۷) را بنویسید (مثلاً: خالی نبند / آب زیر کاه / مارگزیده)...'
                  }
                  dir="auto"
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900/90 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm font-bold focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => handleTranslateLiveC2()}
                  disabled={liveTransLoading}
                  className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap shadow-md"
                >
                  {liveTransLoading ? 'در حال ترجمه عمیق...' : '⚡ ترجمه فوق‌پیشرفته + پخش صوتی'}
                </button>
              </div>

              {/* Output Display */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-400/50 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-black text-amber-300">
                    🎯 نتیجه ترجمهٔ فوق‌پیشرفته (C2 Idiomatic & 17+ Street Equivalent):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        speakPersian(
                          liveTransDirection === 'en_to_fa'
                            ? liveTransResult.translation
                            : liveTransResult.original,
                          speechRate,
                          liveTransResult.pronunciation
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>🔊 شنیدن با لهجه اصیل ایرانی ({persianVoice === 'female' ? 'دلارا' : 'فرید'})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        speakEnglish(
                          liveTransDirection === 'fa_to_en'
                            ? liveTransResult.translation
                            : liveTransResult.original,
                          speechRate
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>🔊 Hear English</span>
                    </button>
                  </div>
                </div>

                <p className="text-base sm:text-xl font-black text-amber-300" dir="auto">
                  {liveTransResult.translation}
                </p>
                {liveTransResult.colloquialVariant && (
                  <p className="text-xs sm:text-sm font-bold text-rose-200" dir="auto">
                    🗣️ معادل کوچه‌بازاری / اروپایی: {liveTransResult.colloquialVariant}
                  </p>
                )}
                <p className="text-xs font-mono text-emerald-300" dir="ltr">
                  🗣️ Phonetic / Fingilish: [{liveTransResult.pronunciation}]
                </p>
                {liveTransResult.proverbOrIdiomNote && (
                  <p className="text-xs text-amber-100 bg-white/5 p-2.5 rounded-xl border border-amber-400/30" dir="auto">
                    {liveTransResult.proverbOrIdiomNote}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Curated C2 Proverbs, Colloquial Idioms & 17+ Street-Smart Bank */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {C2_PROVERBS_SLANG_AND_17PLUS_DB.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-xl bg-rose-50 text-rose-950 font-black text-xs border border-rose-200">
                      {item.badgeFa}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500" dir="ltr">
                      {item.badgeEn}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-1.5">
                    <p className="text-sm sm:text-base font-black text-amber-300" dir="ltr">
                      🇬🇧 "{item.englishSlangOrProverb}"
                    </p>
                    <p className="text-base sm:text-lg font-black text-emerald-300" dir="rtl">
                      🇮🇷 محاوره و کوچه‌بازار: «{item.persianSpokenStreet}»
                    </p>
                    <p className="text-xs text-slate-300" dir="rtl">
                      📘 معادل رسمی / ضرب‌المثل کلاسیک: «{item.persianFormalOrProverb}»
                    </p>
                    <p className="text-xs font-mono text-amber-200" dir="ltr">
                      🗣️ Fingilish: "{item.fingilish}"
                    </p>
                  </div>

                  <p className="text-xs font-bold text-indigo-950 bg-indigo-50 p-2.5 rounded-xl border border-indigo-200" dir="ltr">
                    🌍 <strong>European Diaspora Bridges (DE / FR / SV):</strong> {item.europeanBridges}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed" dir="ltr">
                    💡 {item.explanationEnFa}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2" dir="ltr">
                  <button
                    type="button"
                    onClick={() => {
                      speakPersian(item.persianSpokenStreet, speechRate, item.fingilish);
                      onEarnLingous(15);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 بشنو به فارسی اصیل ({persianVoice === 'female' ? 'دلارا' : 'فرید'})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => speakEnglish(item.englishSlangOrProverb, speechRate)}
                    className="py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-900 font-black text-xs"
                  >
                    🔊 Hear English Slang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUB-TAB 0 (#1 DEFAULT): STRUCTURED 5-STAGE MASTERY PATH & SRS       */}
      {/* =================================================================== */}
      {subTab === 'roadmap_srs' && (
        <div className="space-y-6">
          {/* Spaced Repetition & Mastery Progress Dashboard */}
          <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1" dir="ltr">
                <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-950 font-black text-xs">
                  🔁 SPACED REPETITION & STEP-BY-STEP FLUENCY ENGINE (مسیر منسجم تمرین و تکرار هدفمند)
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  Your Planned Pathway from Zero to Fluent Persian (A1 ➔ C1)
                </h3>
                <p className="text-xs text-slate-600">
                  Practice and repeat each lesson <strong>3 times out loud (3x Drill)</strong> to lock it into long-term memory. Click any individual word to hear its pronunciation and grammatical role!
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3" dir="ltr">
                <div className="px-4 py-2.5 rounded-2xl bg-emerald-950 text-white text-center">
                  <span className="text-[11px] text-emerald-200 block font-bold">Lessons Mastered (3/3)</span>
                  <span className="text-lg font-black text-amber-300">
                    ✅ {masteredLessonsCount} / {STRUCTURED_FARSI_ROADMAP.length} ({masteryPercentage}%)
                  </span>
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-center">
                  <span className="text-[11px] text-slate-300 block font-bold">Total Repetitions</span>
                  <span className="text-lg font-black text-teal-300">🔁 {totalRepetitionsDone} Reps</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setOnlyShowReviewQueue(!onlyShowReviewQueue);
                  }}
                  className={`px-4 py-2.5 rounded-2xl font-black text-xs border-2 transition-all ${
                    onlyShowReviewQueue
                      ? 'bg-amber-400 text-slate-950 border-amber-600'
                      : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  🔄 {onlyShowReviewQueue ? 'Showing Review Queue Only' : 'Filter: Needs Review Queue'}
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-400 transition-all duration-500"
                style={{ width: `${Math.max(8, masteryPercentage)}%` }}
              />
            </div>

            {/* 5-Stage Filter Buttons */}
            <div className="flex flex-wrap gap-2 pt-1" dir="ltr">
              {[
                { id: 'all', label: '🗺️ All 5 Stages (Complete Path)' },
                { id: 'stage_1', label: '🌱 Stage 1 (A1): Greetings & First Words' },
                { id: 'stage_2', label: '🧱 Stage 2 (A2): Sentence Building & Daily Needs' },
                { id: 'stage_3', label: '🗣️ Stage 3 (B1): Spoken Tehrani, Taarof & Slang' },
                { id: 'stage_4', label: '✍️ Stage 4 (B2): Reading & Writing Real Messages' },
                { id: 'stage_5', label: '🏛️ Stage 5 (C1): Diplomatic & Economic Trade (300M Market)' }
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedStage(st.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
                    selectedStage === st.id
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Structured Lesson Cards with Word-by-Word Breakdown & 3x Spaced Repetition */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredRoadmapLessons.map((lesson) => {
              const reps = repetitionCounts[lesson.id] || 0;
              const isMastered = reps >= 3;
              const inReview = !!reviewQueueIds[lesson.id];

              return (
                <div
                  key={lesson.id}
                  className={`bg-white rounded-3xl border-2 p-6 space-y-4 shadow-xs flex flex-col justify-between transition-all ${
                    isMastered ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2" dir="ltr">
                      <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-950 font-black text-xs">
                        {lesson.stageTitleEn}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2.5 py-1 rounded-xl text-xs font-black ${
                            isMastered
                              ? 'bg-emerald-600 text-white'
                              : 'bg-amber-100 text-amber-950 border border-amber-300'
                          }`}
                        >
                          {isMastered ? `✅ Mastered (${reps}x)` : `🔁 Practice: ${reps}/3 Reps`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleReviewQueue(lesson.id)}
                          className={`px-2.5 py-1 rounded-xl text-xs font-black border ${
                            inReview
                              ? 'bg-rose-600 text-white border-rose-700'
                              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {inReview ? '🔄 In Review Queue' : '📌 Mark for Review'}
                        </button>
                      </div>
                    </div>

                    <div dir="ltr">
                      <h4 className="text-base sm:text-lg font-black text-slate-900">{lesson.titleEn}</h4>
                      <p className="text-xs font-bold text-emerald-800" dir="rtl">
                        {lesson.stageTitleFa}
                      </p>
                    </div>

                    {/* Persian Script + Spoken vs Formal + Fingilish */}
                    <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-1.5">
                      <p className="text-lg sm:text-xl font-black text-amber-300 leading-relaxed" dir="rtl">
                        🇮🇷 محاوره: «{lesson.persianSpoken}»
                      </p>
                      <p className="text-xs text-slate-300" dir="rtl">
                        📘 رسمی/کتابی: «{lesson.persianFormal}»
                      </p>
                      <p className="text-xs sm:text-sm font-mono font-black text-emerald-200" dir="ltr">
                        🗣️ Fingilish: "{lesson.fingilish}"
                      </p>
                      <p className="text-xs sm:text-sm font-black text-white pt-1" dir="ltr">
                        🇬🇧 Meaning: "{lesson.englishMeaning}"
                      </p>
                    </div>

                    {/* Interactive Word-by-Word Breakdown (Click any word to hear it!) */}
                    <div className="space-y-1.5" dir="ltr">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
                        🔍 Word-by-Word Breakdown (Click any block to hear its Persian sound):
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {lesson.wordBreakdown.map((wb, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => speakPersian(wb.fa, speechRate, wb.fingilish)}
                            className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-left transition-all"
                          >
                            <p className="text-sm font-black text-slate-900 text-right" dir="rtl">
                              {wb.fa} 🔊
                            </p>
                            <p className="text-xs font-mono font-bold text-emerald-800">{wb.fingilish}</p>
                            <p className="text-[11px] font-bold text-slate-700">{wb.en}</p>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-bold inline-block mt-1">
                              {wb.role}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950" dir="ltr">
                      💡 <strong>Fluency Secret:</strong> {lesson.grammarSecretEn}
                    </div>
                  </div>

                  {/* 3x Practice & Repetition Action Bar */}
                  <div className="space-y-2 pt-2" dir="ltr">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleIncrementRepetition(lesson)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>
                          🔁 Listen & Repeat Out Loud ({Math.min(reps, 3)}/3)
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePracticeSpeakingFarsi(lesson.id)}
                        className="py-2.5 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1"
                      >
                        <Mic className="w-4 h-4" />
                        <span>🎙️ Test Voice</span>
                      </button>
                    </div>
                    {spokenPracticeStatus[lesson.id] && (
                      <p
                        className="text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-right"
                        dir="rtl"
                      >
                        {spokenPracticeStatus[lesson.id]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* =============================================================== */}
          {/* INTERACTIVE SENTENCE ASSEMBLER LAB FOR ENGLISH SPEAKERS         */}
          {/* =============================================================== */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-400/40 space-y-4" dir="ltr">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
                  🧩 INTERACTIVE SENTENCE BUILDER DRILL (کارگاه جمله‌سازی گام‌به‌گام فارسی)
                </span>
                <h3 className="text-lg sm:text-xl font-black text-amber-300 mt-1">
                  Build the Persian Sentence Block-by-Block
                </h3>
              </div>

              <div className="flex gap-2">
                {SENTENCE_ASSEMBLER_DRILLS.map((d, idx) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setActiveDrillIdx(idx);
                      setPickedChunks([]);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black ${
                      activeDrillIdx === idx
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Drill #{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm sm:text-base font-bold text-indigo-100">
              🎯 Target English Sentence: <span className="text-amber-300 font-black">"{currentAssemblerDrill.englishTarget}"</span>
            </p>

            {/* Clickable Word Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {currentAssemblerDrill.correctOrder.map((chunk, idx) => {
                const isAdded = pickedChunks.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      speakPersian(chunk.fa, speechRate, chunk.fingilish);
                      if (!isAdded) {
                        const next = [...pickedChunks, idx];
                        setPickedChunks(next);
                        if (next.length === currentAssemblerDrill.correctOrder.length) {
                          sound.playLevelUp();
                          onEarnLingous(20);
                        }
                      }
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      isAdded
                        ? 'bg-emerald-600/40 border-emerald-400 text-white'
                        : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-300">Part {idx + 1}</span>
                      <span className="text-base font-black" dir="rtl">{chunk.fa}</span>
                    </div>
                    <p className="text-xs font-mono text-emerald-300 mt-1">{chunk.fingilish}</p>
                    <p className="text-[11px] text-slate-300">{chunk.en}</p>
                  </button>
                );
              })}
            </div>

            {/* Assembled Output */}
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-400/40 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] text-emerald-300 font-bold block">
                  Your Assembled Persian Sentence (Click blocks above in order 1 ➔ 4):
                </span>
                <p className="text-base sm:text-xl font-black text-amber-300" dir="rtl">
                  {pickedChunks.length > 0
                    ? pickedChunks.map((i) => currentAssemblerDrill.correctOrder[i].fa).join(' ')
                    : 'روی قطعات بالا کلیک کنید تا جمله فارسی ساخته و خوانده شود...'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    speakPersian(
                      currentAssemblerDrill.correctOrder.map((c) => c.fa).join(' '),
                      speechRate,
                      currentAssemblerDrill.correctOrder.map((c) => c.fingilish).join(' ')
                    )
                  }
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs"
                >
                  🔊 Hear Full Sentence
                </button>
                <button
                  type="button"
                  onClick={() => setPickedChunks([])}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* CREATIVE INNOVATION: PERSIAN CIVILIZATION & SHARED ROOTS        */}
          {/* =============================================================== */}
          <div className="bg-white rounded-3xl border-2 border-amber-400 p-6 space-y-4 shadow-xs" dir="ltr">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-950 font-black text-xs">
                  🏛️ PERSIAN IN WORLD CIVILIZATION (هم‌ریشگی تاریخی فارسی و انگلیسی در تمدن بشری)
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  Surprise! You Already Know Dozens of Persian Words in English
                </h3>
                <p className="text-xs text-slate-600">
                  Persian and English belong to the same Indo-European language family, and Persian civilization gifted many iconic words to English:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {[
                { fa: 'پردیس (Pardis)', en: 'Paradise', note: 'Old Persian "Pairi-daeza" (Walled Royal Garden)' },
                { fa: 'پدر (Pedar)', en: 'Father', note: 'Shared Indo-European family root' },
                { fa: 'مادر (Mādar)', en: 'Mother', note: 'Shared Indo-European family root' },
                { fa: 'برادر (Barādar)', en: 'Brother', note: 'Shared Indo-European family root' },
                { fa: 'ستاره (Setāreh)', en: 'Star', note: 'Identical ancient root for Star' },
                { fa: 'بازار / کاروان', en: 'Bazaar / Caravan', note: 'Gifted from Persian Silk Road trade to the world' }
              ].map((root, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => speakPersian(root.fa.split(' ')[0], speechRate, root.fa)}
                  className="p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100 border border-amber-200 text-left space-y-1 transition-all"
                >
                  <p className="text-sm font-black text-emerald-950" dir="rtl">{root.fa} 🔊</p>
                  <p className="text-xs font-black text-slate-900">🇬🇧 {root.en}</p>
                  <p className="text-[10px] text-slate-600 leading-snug">{root.note}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUB-TAB 1: FAMILY, TAAROF, SLANG, BOUNDARIES & HERITAGE PHRASES     */}
      {/* =================================================================== */}
      {subTab === 'phrases' && (
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-wrap gap-2" dir="ltr">
            {[
              { id: 'all', label: '🌐 All Essential Farsi Phrases (14)' },
              { id: 'grandparents_family', label: '👵🏼 Family & Diaspora Youth (خانواده و فرزندان)' },
              { id: 'diplomatic_economic', label: '🏛️ Diplomatic, Political & Economic Trade (دیپلماسی و تجارت ۳۰۰ میلیونی)' },
              { id: 'taarof_politeness', label: '🫖 Persian Taarof & Hospitality (تعارف اصیل)' },
              { id: 'cool_slang', label: '😎 Cool Street Slang (محاوره و کوچه‌بازار)' },
              { id: 'boundaries_daily', label: '🛡️ Everyday Boundaries (حدهای روزمره)' },
              { id: 'nowruz_yalda', label: '🌱 Nowruz, Yalda & Ferdowsi Poetry' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPhraseFilter(cat.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
                  phraseFilter === cat.id
                    ? 'bg-emerald-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredPhrases.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2" dir="ltr">
                    <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-900 font-black text-xs border border-emerald-200">
                      {item.categoryBadgeEn}
                    </span>
                  </div>

                  {/* Big Clear Persian Script */}
                  <div className="p-3.5 rounded-2xl bg-emerald-950 text-white space-y-1.5">
                    <p className="text-lg sm:text-xl font-black text-amber-300 leading-relaxed">
                      🇮🇷 {item.persianScript}
                    </p>
                    <p className="text-xs sm:text-sm font-mono font-black text-emerald-200" dir="ltr">
                      🗣️ Fingilish: "{item.fingilish}"
                    </p>
                    <p className="text-[11px] font-mono text-slate-300" dir="ltr">
                      🔊 Sound It Out: [{item.pronunciationGuideEn}]
                    </p>
                  </div>

                  {/* English Meaning & Cultural Context for Diaspora Youth */}
                  <div className="space-y-1.5" dir="ltr">
                    <p className="text-sm sm:text-base font-black text-slate-900">
                      🇬🇧 Meaning: "{item.englishMeaning}"
                    </p>
                    <p className="text-xs text-slate-600">
                      🔍 <strong>Literal Translation:</strong> {item.literalMeaningEn}
                    </p>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                      💡 <strong>When to use:</strong> {item.whenToUseEn}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-3" dir="ltr">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        speakPersian(item.persianScript, speechRate, item.fingilish);
                        onEarnLingous(10);
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>🔊 Hear Native Persian</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePracticeSpeakingFarsi(item.id)}
                      className="py-2.5 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1"
                    >
                      <Mic className="w-4 h-4" />
                      <span>🎙️ Practice Speaking</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => speakEnglish(item.englishMeaning, speechRate)}
                      className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                    >
                      🔊 English
                    </button>
                  </div>
                  {spokenPracticeStatus[item.id] && (
                    <p className="text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-right" dir="rtl">
                      {spokenPracticeStatus[item.id]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUB-TAB 2: SPOKEN TEHRANI VS. TEXTBOOK FARSI                        */}
      {/* =================================================================== */}
      {subTab === 'spoken_vs_formal' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-indigo-950 text-white space-y-1" dir="ltr">
            <h3 className="text-base sm:text-lg font-black text-amber-300">
              🔑 The #1 Secret to Sounding Like a Native Speaker: Spoken Tehrani vs. Textbook Persian
            </h3>
            <p className="text-xs text-indigo-100">
              Many diaspora learners get confused because written Persian books say "Nān" and "Mikhāham beravam", while Iranians in real life say "Noon" and "Mikhām beram". Master these 6 golden rules to understand every Iranian movie, song, and family gathering!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TEXTBOOK_VS_SPOKEN_TEHRANI.map((rule) => (
              <div
                key={rule.id}
                className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-black text-indigo-950" dir="ltr">
                      {rule.ruleTitleEn}
                    </h4>
                    <p className="text-xs font-bold text-slate-600">{rule.ruleTitleFa}</p>
                  </div>

                  {/* Formal Book Version */}
                  <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 space-y-1">
                    <span className="text-[11px] font-black text-slate-500 block" dir="ltr">
                      📘 FORMAL / TEXTBOOK PERSIAN (فارسی کتابی):
                    </span>
                    <p className="text-sm font-bold text-slate-800">{rule.formalFa}</p>
                    <p className="text-xs font-mono text-slate-600" dir="ltr">
                      [{rule.formalFingilish}]
                    </p>
                  </div>

                  {/* Spoken Tehrani Version */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 space-y-1">
                    <span className="text-[11px] font-black text-emerald-900 block" dir="ltr">
                      🗣️ REAL SPOKEN TEHRANI PERSIAN (فارسی محاوره‌ای و روزمره):
                    </span>
                    <p className="text-base font-black text-emerald-950">{rule.spokenTehraniFa}</p>
                    <p className="text-xs font-mono font-black text-emerald-800" dir="ltr">
                      [{rule.spokenFingilish}]
                    </p>
                  </div>

                  <div className="space-y-1" dir="ltr">
                    <p className="text-xs font-black text-slate-900">
                      🇬🇧 English Meaning: "{rule.meaningEn}"
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      💡 {rule.explanationEn}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2" dir="ltr">
                  <button
                    type="button"
                    onClick={() => speakPersian(rule.spokenTehraniFa, speechRate, rule.spokenFingilish)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs"
                  >
                    🔊 Hear Spoken Tehrani
                  </button>
                  <button
                    type="button"
                    onClick={() => speakPersian(rule.formalFa, speechRate, rule.formalFingilish)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
                  >
                    🔊 Hear Textbook Form
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUB-TAB 3: PERSIAN ALPHABET & READING GUIDE                         */}
      {/* =================================================================== */}
      {subTab === 'alphabet' && (
        <div className="space-y-5">
          {PERSIAN_ALPHABET_ESSENTIALS.map((group) => (
            <div key={group.id} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-base font-black text-emerald-950" dir="ltr">
                  {group.groupTitleEn}
                </h3>
                <p className="text-xs font-bold text-slate-600">{group.groupTitleFa}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {group.letters.map((ltr, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-emerald-900">{ltr.char}</span>
                        <button
                          type="button"
                          onClick={() => speakPersian(ltr.exampleFa, speechRate, ltr.exampleFingilish)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white text-xs font-black"
                        >
                          🔊 بشنو
                        </button>
                      </div>
                      {ltr.forms && (
                        <p className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-lg inline-block">
                          اشکال در کلمه: {ltr.forms}
                        </p>
                      )}
                      <p className="text-xs font-black text-slate-900" dir="ltr">{ltr.nameEn}</p>
                      <p className="text-[11px] text-slate-600" dir="ltr">Sound: {ltr.soundEn}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs space-y-0.5">
                      <p className="font-black text-slate-900">{ltr.exampleFa}</p>
                      <p className="font-mono text-emerald-800" dir="ltr">{ltr.exampleFingilish}</p>
                      <p className="text-[11px] text-slate-500" dir="ltr">{ltr.exampleMeaningEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =================================================================== */}
      {/* SUB-TAB 4: BILINGUAL STORIES & LISTENING FOR DIASPORA YOUTH         */}
      {/* =================================================================== */}
      {subTab === 'stories' && (
        <div className="space-y-5">
          {BILINGUAL_HERITAGE_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-950 font-black text-xs">
                    {story.levelBadge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1" dir="ltr">
                    {story.titleEn}
                  </h3>
                  <p className="text-xs font-bold text-emerald-800">{story.titleFa}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      speakPersian(story.persianParagraph, speechRate, story.fingilishParagraph);
                      onEarnLingous(20);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 Listen to Story in Persian (پخش صوتی داستان)</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-2">
                <p className="text-base sm:text-lg font-black text-amber-300 leading-loose">
                  🇮🇷 {story.persianParagraph}
                </p>
                <p className="text-xs sm:text-sm font-mono text-emerald-200 leading-relaxed" dir="ltr">
                  🗣️ <strong>Fingilish:</strong> {story.fingilishParagraph}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2" dir="ltr">
                <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                  🇬🇧 <strong>English Translation:</strong> {story.englishParagraph}
                </p>
                <p className="text-xs text-teal-900 bg-teal-50 p-2.5 rounded-xl border border-teal-200">
                  🏛️ <strong>Cultural Root Note:</strong> {story.culturalLessonEn}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" dir="ltr">
                {story.keyVocab.map((v, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => speakPersian(v.fa, speechRate, v.fingilish)}
                    className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left transition-all flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-black text-slate-900" dir="rtl">{v.fa}</p>
                      <p className="text-xs font-mono font-bold text-emerald-800">{v.fingilish}</p>
                      <p className="text-[11px] text-slate-600">{v.en}</p>
                    </div>
                    <span className="text-xs font-black text-emerald-800">🔊</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =================================================================== */}
      {/* SUB-TAB 5: INTERACTIVE FARSI CHALLENGE FOR DIASPORA LEARNERS        */}
      {/* =================================================================== */}
      {subTab === 'quiz' && (
        <div className="space-y-4" dir="ltr">
          {DIASPORA_QUIZ_ITEMS.map((q) => {
            const selected = quizAnswers[q.id];
            return (
              <div key={q.id} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
                <h3 className="text-sm sm:text-base font-black text-slate-900">{q.questionEn}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, idx) => {
                    const isPicked = selected === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectQuiz(q.id, idx, opt.isCorrect)}
                        className={`p-4 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all ${
                          isPicked
                            ? opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                              : 'bg-rose-50 border-rose-400 text-rose-950'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        {opt.textFa}
                      </button>
                    );
                  })}
                </div>
                {selected !== undefined && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold ${
                      q.options[selected].isCorrect
                        ? 'bg-emerald-100 text-emerald-950'
                        : 'bg-amber-100 text-amber-950'
                    }`}
                  >
                    {q.options[selected].feedbackEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
