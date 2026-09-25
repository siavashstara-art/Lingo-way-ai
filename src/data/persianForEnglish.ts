// Persian for English Speakers (آموزش جامع زبان فارسی به انگلیسی‌زبانان از مبتدی تا پیشرفته)
// Structured Curriculum Levels:
// 1. Beginner (A1-A2): Greetings, Alphabet & Sounds, Daily Survival, Polite Requests
// 2. Intermediate (B1-B2): Ta'arof Mastery, Bazaar Haggling, Street Idioms, Dining & Metro
// 3. Advanced (C1-C2): Poetic Nuances, Classical Persian Wisdom, Complex Discourse, Cultural Subtext

export type PersianLevel = 'beginner' | 'intermediate' | 'advanced';

export interface PersianLessonUnit {
  id: string;
  orderIndex: number;
  level: PersianLevel;
  levelTitleEn: string;
  levelTitleFa: string;
  category: 'alphabet' | 'taarof_culture' | 'street_persian' | 'bazaar_shopping' | 'hospitality' | 'grammar_nuance' | 'literature_proverbs';
  categoryTitleEn: string;
  categoryTitleFa: string;
  titleEn: string;
  titleFa: string;
  persianScript: string;
  fingilishPhonetic: string;
  englishLiteral: string;
  englishNatural: string;
  culturalInsight: string;
  pedagogicalTip: string;
  audioPronunciationText: string;
  practiceExercise: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const PERSIAN_CURRICULUM: PersianLessonUnit[] = [
  // ==========================================
  // LEVEL 1: BEGINNER (مبتدی - پایه‌ها و مکالمه فوری)
  // ==========================================
  {
    id: 'p_beg_1',
    orderIndex: 1,
    level: 'beginner',
    levelTitleEn: 'Level 1: Absolute Beginner (مبتدی)',
    levelTitleFa: 'سطح ۱: مبتدی و ضروریات اولیه',
    category: 'alphabet',
    categoryTitleEn: 'Basics & First Greetings',
    categoryTitleFa: 'سلام، احوالپرسی و پایه‌ها',
    titleEn: 'Friendly Universal Greeting ("Salâm! Chetori?")',
    titleFa: 'سلام و احوالپرسی پایه و روزمره',
    persianScript: 'سلام! روزتون به‌خیر، حالتون چطوره؟',
    fingilishPhonetic: 'Salâm! Roozetoon be-kheyr, hâletoon chetoreh?',
    englishLiteral: 'Peace! Your day to good, your state how is it?',
    englishNatural: 'Hello! Good day, how are you doing?',
    culturalInsight: '"Salam" is the universal magic key in Persian. It works everywhere from a casual bakery to a formal embassy.',
    pedagogicalTip: 'Notice the friendly rhythm: "Salâm" has a stressed final vowel (sa-LÂM).',
    audioPronunciationText: 'سلام! روزتون به‌خیر، حالتون چطوره؟',
    practiceExercise: {
      question: 'What is the universally understood, polite greeting to say upon meeting someone in Iran?',
      options: [
        'Salâm! (سلام)',
        'Khodâhâfez (خداحافظ)',
        'Baleh (بله)',
        'Na (نه)'
      ],
      correctIndex: 0,
      explanation: '"Salâm" is the essential opening greeting for all times of day.'
    }
  },
  {
    id: 'p_beg_2',
    orderIndex: 2,
    level: 'beginner',
    levelTitleEn: 'Level 1: Absolute Beginner (مبتدی)',
    levelTitleFa: 'سطح ۱: مبتدی و ضروریات اولیه',
    category: 'hospitality',
    categoryTitleEn: 'Daily Courtesy & Gratitude',
    categoryTitleFa: 'تشکر صمیمانه و ادب روزمره',
    titleEn: 'Heartfelt Gratitude ("Dast-et Dard Nakoneh")',
    titleFa: 'تشکر گرم ایرانی: دستت درد نکنه',
    persianScript: 'خیلی ممنون، دستت درد نکنه!',
    fingilishPhonetic: 'Kheyli mamnoon, dast-et dard nakoneh!',
    englishLiteral: 'Very grateful, may your hand not ache!',
    englishNatural: 'Thank you so much, I truly appreciate your help!',
    culturalInsight: 'Iranians bless the physical body part that performed the kindness—saying "may your hand never hurt" when receiving food, tea, or a gift.',
    pedagogicalTip: 'Use "Dastet dard nakoneh" with friends, and "Daste shomâ dard nakoneh" with elders and professionals.',
    audioPronunciationText: 'خیلی ممنون، دستت درد نکنه',
    practiceExercise: {
      question: 'When someone pours you a warm cup of Persian tea or hands you a gift, what is the warmest authentic thank you?',
      options: [
        'Dastet dard nakoneh! (دستت درد نکنه)',
        'Man gorosneh hastam. (من گرسنه هستم)',
        'Sa\'at chande? (ساعت چنده؟)',
        'Hich-chi (هیچی)'
      ],
      correctIndex: 0,
      explanation: '"Dastet dard nakoneh" expresses deep warmth by wishing health to the giver\'s hands.'
    }
  },
  {
    id: 'p_beg_3',
    orderIndex: 3,
    level: 'beginner',
    levelTitleEn: 'Level 1: Absolute Beginner (مبتدی)',
    levelTitleFa: 'سطح ۱: مبتدی و ضروریات اولیه',
    category: 'bazaar_shopping',
    categoryTitleEn: 'Everyday Needs & Requests',
    categoryTitleFa: 'خرید آب و نان و درخواست محترمانه',
    titleEn: 'Polite Requests ("Lotfan" & "Bi-Zahmat")',
    titleFa: 'درخواست مودبانه: لطفاً و بی‌زحمت',
    persianScript: 'بی‌زحمت یک بطری آب و نان تازه لطفاً.',
    fingilishPhonetic: 'Bi-zahmat yek botri âb va nâne tâzeh lotfan.',
    englishLiteral: 'Without trouble, one bottle water and fresh bread, please.',
    englishNatural: 'Could I please have a bottle of water and fresh bread?',
    culturalInsight: '"Bi-zahmat" literally means "without putting you through trouble"—the cornerstone of Persian polite customer interactions.',
    pedagogicalTip: '"Lotfan" is placed at the end of the sentence, while "Bi-zahmat" opens the request.',
    audioPronunciationText: 'بی‌زحمت یک بطری آب و نان تازه لطفاً',
    practiceExercise: {
      question: 'How do you politely ask for something in a bakery or store without sounding demanding?',
      options: [
        'Bi-zahmat... lotfan (بی‌زحمت... لطفاً)',
        'Zood bash bedeh (زود باش بده)',
        'Hameh ro mikham (همه رو می‌خوام)',
        'Pool nadaram (پول ندارم)'
      ],
      correctIndex: 0,
      explanation: 'Beginning with "Bi-zahmat" and closing with "Lotfan" creates a soft, respectful demeanor.'
    }
  },

  // ==========================================
  // LEVEL 2: INTERMEDIATE (متوسط - تعارف، چانه‌زنی و کوچه بازار)
  // ==========================================
  {
    id: 'p_int_1',
    orderIndex: 4,
    level: 'intermediate',
    levelTitleEn: 'Level 2: Intermediate (متوسط)',
    levelTitleFa: 'سطح ۲: متوسط - تعارفات و مهارت‌های اجتماعی',
    category: 'taarof_culture',
    categoryTitleEn: 'The Art of Persian Ta\'arof (تعارف)',
    categoryTitleFa: 'فرهنگ اصیل تعارف و احترام',
    titleEn: 'Welcoming Guests ("Ghadam-et Rooye Cheshm")',
    titleFa: 'استقبال گرم: قدمت روی چشم',
    persianScript: 'قدمت روی چشم، خیلی خوش آمدید به منزل ما!',
    fingilishPhonetic: 'Ghadamet rooye cheshm, kheyli khosh âmadid be manzele mâ!',
    englishLiteral: 'Your footsteps upon my eyes; very welcome to our home!',
    englishNatural: 'You honor us with your presence, welcome with all our hearts!',
    culturalInsight: 'Hosting a guest is seen as a divine gift in Iranian heritage. Saying "upon my eyes" signifies placing the visitor above everything.',
    pedagogicalTip: 'Glide smoothly through "Ghadamet" (soft guttural Gh sound at the back of the throat).',
    audioPronunciationText: 'قدمت روی چشم، خیلی خوش آمدید',
    practiceExercise: {
      question: 'When your host welcomes you at their doorstep with "Ghadamet rooye cheshm", what is the most graceful reply?',
      options: [
        'Khahesh mikonam, khedmat az mâst! (خواهش می‌کنم، خدمت از ماست - The honor is all ours!)',
        'Where is the television?',
        'I am very tired.',
        'No thank you.'
      ],
      correctIndex: 0,
      explanation: '"Khahesh mikonam, khedmat az mast" demonstrates mutual elegance and humility.'
    }
  },
  {
    id: 'p_int_2',
    orderIndex: 5,
    level: 'intermediate',
    levelTitleEn: 'Level 2: Intermediate (متوسط)',
    levelTitleFa: 'سطح ۲: متوسط - تعارفات و مهارت‌های اجتماعی',
    category: 'bazaar_shopping',
    categoryTitleEn: 'Bazaar Etiquette & The "Ghabel Nadareh" Dance',
    categoryTitleFa: 'رسم قابل نداره و چانه‌زنی در بازار',
    titleEn: 'Deciphering "It Has No Value" ("Ghâbel Nadâreh")',
    titleFa: 'رمزگشایی تعارف بازار: قابل نداره',
    persianScript: 'مهمان ما باشید، اصلاً قابل نداره!',
    fingilishPhonetic: 'Mehmâne mâ bâshid, aslan ghâbel nadâreh!',
    englishLiteral: 'Be our guest, it has no worth compared to you!',
    englishNatural: 'Please consider it a gift, it\'s of no value compared to your honor! (Standard courtesy — never take it for free!)',
    culturalInsight: 'When a merchant or taxi driver says "Ghabel nadareh", do NOT walk away without paying! You must insist: "Ghorbân-e shomâ, khahesh mikonam hesâb konid".',
    pedagogicalTip: 'Expect this polite dance 2 to 3 times before the actual price is revealed. It is not dishonesty; it is social etiquette.',
    audioPronunciationText: 'مهمان ما باشید، اصلاً قابل نداره',
    practiceExercise: {
      question: 'A taxi driver in Tehran says "Ghâbel nadâreh" when you reach your destination. What must you do?',
      options: [
        'Insist politely: "Khahesh mikonam hesâb konid" and pay the fare.',
        'Say thank you and walk away without paying.',
        'Call the police.',
        'Argue angrily.'
      ],
      correctIndex: 0,
      explanation: 'Ta\'arof requires you to insist on paying until the driver gives the final fare.'
    }
  },
  {
    id: 'p_int_3',
    orderIndex: 6,
    level: 'intermediate',
    levelTitleEn: 'Level 2: Intermediate (متوسط)',
    levelTitleFa: 'سطح ۲: متوسط - تعارفات و مهارت‌های اجتماعی',
    category: 'street_persian',
    categoryTitleEn: 'Street Persian & True Conversational Flow',
    categoryTitleFa: 'مکالمات خودمانی خیابان و رفاقت',
    titleEn: 'Casual Inquiries ("Chetori? Robe-râhi?")',
    titleFa: 'احوالپرسی رفاقتی: چطوری؟ روبه‌راهی؟',
    persianScript: 'چطوری رفیق؟ همه‌چی میزونه؟ سلامتی؟',
    fingilishPhonetic: 'Chetori rafigh? Hameh-chi meezooneh? Salâmati?',
    englishLiteral: 'How are you friend? Everything tuned/aligned? Health?',
    englishNatural: 'How are you doing buddy? Is everything on track and good?',
    culturalInsight: 'Street Persian drops formal suffixes and uses metaphors like "meezân" (balanced, tuned like an instrument).',
    pedagogicalTip: 'Respond with "Ghorbânet" (affectionate thanks) or "Nokaram" among close male friends.',
    audioPronunciationText: 'چطوری رفیق؟ همه‌چی میزونه؟',
    practiceExercise: {
      question: 'What is the natural conversational Persian reply to "Chetori rafigh?"',
      options: [
        'Ghorbânet, shokr khobam, to chetori? (قربانت، شکر خوبم، تو چطوری؟)',
        'I have a blue pen.',
        'Today is Monday.',
        'Good night.'
      ],
      correctIndex: 0,
      explanation: '"Ghorbanet" reflects natural camaraderie without stiff textbook grammar.'
    }
  },

  // ==========================================
  // LEVEL 3: ADVANCED (پیشرفته - شعر، ظرافت و ضرب‌المثل‌های اصیل)
  // ==========================================
  {
    id: 'p_adv_1',
    orderIndex: 7,
    level: 'advanced',
    levelTitleEn: 'Level 3: Advanced & Mastery (پیشرفته)',
    levelTitleFa: 'سطح ۳: پیشرفته - ضرب‌المثل‌ها و حکمت پارسی',
    category: 'literature_proverbs',
    categoryTitleEn: 'Ancient Wisdom & Classic Proverbs',
    categoryTitleFa: 'ضرب‌المثل‌های کهن و اصطلاحات نغز',
    titleEn: 'Patience & Sweet Triumph ("Gar Sabr Koni")',
    titleFa: 'حکمت صبر: گر صبر کنی ز غوره حلوا سازی',
    persianScript: 'گر صبر کنی ز غوره حلوا سازی، نگران نباش.',
    fingilishPhonetic: 'Gar sabr koni ze ghooreh halvâ sâzi, negarân nabâsh.',
    englishLiteral: 'If you have patience, from sour unripe grapes you will make sweet halva; do not worry.',
    englishNatural: 'With steadfast patience, even the sourest moments turn into sweetest triumphs.',
    culturalInsight: 'Iranians quote classical poetry and proverbs in everyday conversation, from corporate boardrooms to family dinners.',
    pedagogicalTip: 'Notice the meter and rhyme: "Ghooreh" matches "Halva", capturing centuries of Persian philosophical resilience.',
    audioPronunciationText: 'گر صبر کنی ز غوره حلوا سازی',
    practiceExercise: {
      question: 'When a Persian friend advises you "Ze ghooreh halva sazi", what are they encouraging you to do?',
      options: [
        'Be patient and persevere; success will sweeten with time.',
        'Cook a dessert immediately.',
        'Eat sour grapes right now.',
        'Give up and walk away.'
      ],
      correctIndex: 0,
      explanation: 'This iconic proverb celebrates patience as the alchemical transformer of life\'s sour difficulties into sweet victory.'
    }
  },
  {
    id: 'p_adv_2',
    orderIndex: 8,
    level: 'advanced',
    levelTitleEn: 'Level 3: Advanced & Mastery (پیشرفته)',
    levelTitleFa: 'سطح ۳: پیشرفته - ضرب‌المثل‌ها و حکمت پارسی',
    category: 'grammar_nuance',
    categoryTitleEn: 'Poetic Cadence & The Melodic Ezafe',
    categoryTitleFa: 'آهنگین بودن کلام و موسیقی کسره اضافه',
    titleEn: 'The Musical Ezafe Vowel ("-e" / "-ye")',
    titleFa: 'جادوی کسره اضافه در پیوند کلمات',
    persianScript: 'هوایِ دل‌انگیزِ بهاریِ شیراز، جان‌فزا است.',
    fingilishPhonetic: 'Havâ-ye del-angiz-e bahâri-ye Shirâz, jân-fazâ ast.',
    englishLiteral: 'Air-of soul-inspiring-of spring-of Shiraz, soul-nourishing is.',
    englishNatural: 'The invigorating springtime breeze of Shiraz revitalizes the very soul.',
    culturalInsight: 'The Ezafe connects nouns, adjectives, and possessives like musical notes in a symphony. It turns spoken Persian into flowing song.',
    pedagogicalTip: 'A word ending in a consonant takes a short "-e", while words ending in vowels (like Hawa) take "-ye".',
    audioPronunciationText: 'هوای دل‌انگیز بهاری شیراز',
    practiceExercise: {
      question: 'Why does Persian use the "Ezafe" (-e / -ye) sound between words?',
      options: [
        'To smoothly link nouns and descriptors into a musical, unbroken sentence.',
        'To delete letters from words.',
        'It is a punctuation mark for questions only.',
        'It has no function.'
      ],
      correctIndex: 0,
      explanation: 'Ezafe creates the characteristic flowing, melodious cadence of the Persian language.'
    }
  },
  {
    id: 'p_adv_3',
    orderIndex: 9,
    level: 'advanced',
    levelTitleEn: 'Level 3: Advanced & Mastery (پیشرفته)',
    levelTitleFa: 'سطح ۳: پیشرفته - ضرب‌المثل‌ها و حکمت پارسی',
    category: 'literature_proverbs',
    categoryTitleEn: 'Profound Human Connection (Saadi\'s Legacy)',
    categoryTitleFa: 'شعر مشهور سعدی: بنی‌آدم اعضای یکدیگرند',
    titleEn: 'Saadi\'s Universal Compassion ("Bani Âdam")',
    titleFa: 'شاهکار جهانی سعدی: همه فرزندان یک پیکریم',
    persianScript: 'بنی‌آدم اعضایِ یکدیگرند، که در آفرینش زِ یک گوهرند.',
    fingilishPhonetic: 'Bani âdam a\'zâ-ye yek-digarand, ke dar âfarinesh ze yek gowharand.',
    englishLiteral: 'Human beings are members of one another, who in creation are from one single essence.',
    englishNatural: 'All human beings are limbs of a single body, crafted in creation from the identical pure jewel.',
    culturalInsight: 'Inscribed on the entrance of the United Nations headquarters in New York, this couplet by Saadi of Shiraz represents the pinnacle of Persian humanistic philosophy.',
    pedagogicalTip: 'Practice the solemn, rhythmic cadence of Persian classical verse. Each hemistich carries equal weight and melody.',
    audioPronunciationText: 'بنی‌آدم اعضای یکدیگرند، که در آفرینش ز یک گوهرند',
    practiceExercise: {
      question: 'What is the core message of Saadi\'s famous poem "Bani Adam"?',
      options: [
        'Universal human solidarity: if one person suffers, all of humanity feels the pain.',
        'Humans should live on separate planets.',
        'Grammar rules are more important than empathy.',
        'Only doctors should care about human bodies.'
      ],
      correctIndex: 0,
      explanation: 'Saadi teaches that all humanity shares one soul; our pain and joy are completely intertwined.'
    }
  }
];

export interface CheckpointReviewQuestion {
  id: string;
  promptEn: string;
  promptFa: string;
  sourceLessonTitle: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const CHECKPOINT_REVIEWS: Record<number, {
  milestoneTitleEn: string;
  milestoneTitleFa: string;
  summaryTextEn: string;
  summaryTextFa: string;
  questions: CheckpointReviewQuestion[];
}> = {
  3: {
    milestoneTitleEn: 'Beginner Milestone: Lessons 1 to 3 Master Review',
    milestoneTitleFa: 'ایستگاه مرور مبتدی: خلاصه و آزمون دروس ۱ تا ۳',
    summaryTextEn: 'In Lessons 1-3, you mastered foundational greetings ("Salam! Chetori?"), heartfelt gratitude ("Dastet dard nakoneh"), and polite bazaar requests ("Bi-zahmat"). Score 100% to unlock Intermediate Level!',
    summaryTextFa: 'در این ۳ درس اصول پایه را یاد گرفتید: سلام و احوالپرسی گرم، تشکر با دستت درد نکنه، و درخواست مودبانه با بی‌زحمت. برای ورود به سطح متوسط، به سوالات پاسخ دهید.',
    questions: [
      {
        id: 'rev_1',
        promptEn: 'What does "Dastet dard nakoneh" literally wish for the other person?',
        promptFa: 'عبارت «دستت درد نکنه» چه دعایی برای طرف مقابل دارد؟',
        sourceLessonTitle: 'Lesson 2: Daily Gratitude',
        options: [
          'May your hands never ache or feel pain.',
          'Please wash your hands.',
          'I want more tea.',
          'Your hands are very cold.'
        ],
        correctIndex: 0,
        explanation: 'It blesses the hands that performed the favor.'
      },
      {
        id: 'rev_2',
        promptEn: 'How do you open a polite request for bread or water in a Persian shop?',
        promptFa: 'چطور در مغازه درخواست مودبانه می‌کنید؟',
        sourceLessonTitle: 'Lesson 3: Polite Requests',
        options: [
          'Bi-zahmat... (بی‌زحمت...)',
          'Sari bash (سریع باش)',
          'Pool nadaram (پول ندارم)',
          'Khodahafez (خداحافظ)'
        ],
        correctIndex: 0,
        explanation: '"Bi-zahmat" softens any request by honoring the merchant\'s effort.'
      },
      {
        id: 'rev_3',
        promptEn: 'What is the universally beloved greeting in Persian for any time of day?',
        promptFa: 'کدام کلمه سلام و احوالپرسی جهانی فارسی است؟',
        sourceLessonTitle: 'Lesson 1: Basics & Greetings',
        options: [
          'Salâm! (سلام)',
          'Shab be-kheyr (شب به‌خیر)',
          'Khodahafez (خداحافظ)',
          'Mamnoon (ممنون)'
        ],
        correctIndex: 0,
        explanation: '"Salam" is the ultimate universal opening greeting.'
      }
    ]
  },
  6: {
    milestoneTitleEn: 'Intermediate Milestone: Lessons 4 to 6 Synthesis',
    milestoneTitleFa: 'ایستگاه مرور متوسط: خلاصه و آزمون دروس ۴ تا ۶',
    summaryTextEn: 'You have conquered Iranian social customs: Ta\'arof at the doorstep ("Ghadamet rooye cheshm"), Bazaar negotiation courtesy ("Ghabel nadareh"), and Street conversation ("Chetori rafigh?"). Pass this test to unlock the Advanced Literature & Poetry Tier!',
    summaryTextFa: 'شما رسوم مهم اجتماعی را یاد گرفتید: تعارف و احترام به مهمان، چانه‌زنی محترمانه در بازار، و رفاقت در کوچه و خیابان. با قبولی در این آزمون، بخش پیشرفته و شعر پارسی برای شما باز می‌شود.',
    questions: [
      {
        id: 'rev_4',
        promptEn: 'If a merchant in Shiraz says "Aslan ghâbel nadâreh", what should an informed foreigner do?',
        promptFa: 'اگر فروشنده گفت «اصلاً قابل نداره»، چه کار باید بکنید؟',
        sourceLessonTitle: 'Lesson 5: Bazaar Rituals',
        options: [
          'Politely insist on paying: "Khahesh mikonam hesâb konid".',
          'Take the item for free and walk away.',
          'Shout loudly.',
          'Ask for double items.'
        ],
        correctIndex: 0,
        explanation: 'Ta\'arof in trade is a courtesy dance; payment is always expected.'
      },
      {
        id: 'rev_5',
        promptEn: 'What does "Ghadamet rooye cheshm" express to an arriving guest?',
        promptFa: 'اصطلاح «قدمت روی چشم» نشانه چیست؟',
        sourceLessonTitle: 'Lesson 4: Taarof & Hospitality',
        options: [
          'Placing the guest in the highest place of honor and reverence.',
          'An eye doctor consultation.',
          'Watch your steps on the floor.',
          'Please take off your shoes.'
        ],
        correctIndex: 0,
        explanation: 'It metaphorically places the guest\'s footsteps upon the host\'s eyes with deep love.'
      },
      {
        id: 'rev_6',
        promptEn: 'What does the friendly inquiry "Hameh-chi meezooneh?" ask about?',
        promptFa: 'جمله خودمانی «همه‌چی میزونه؟» یعنی چه؟',
        sourceLessonTitle: 'Lesson 6: Street Persian',
        options: [
          'Is everything going well and running smoothly?',
          'Do you have a table?',
          'What time is lunch?',
          'Where is the metro?'
        ],
        correctIndex: 0,
        explanation: '"Meezoon" implies balance and harmony in one\'s life and mood.'
      }
    ]
  }
};

export interface PersianSurvivalPhrase {
  en: string;
  fa: string;
  fingilish: string;
  usageTip: string;
  audioKey: string;
}

export const PERSIAN_SURVIVAL_PHRASES: PersianSurvivalPhrase[] = [
  {
    en: 'Hello & Good Day!',
    fa: 'سلام، روزتون به‌خیر و شادی!',
    fingilish: 'Salâm, roozetoon be-kheyr o shâdi!',
    usageTip: 'Universal polite greeting suitable for morning, afternoon, and meeting anyone.',
    audioKey: 'سلام، روزتون به‌خیر'
  },
  {
    en: 'Thank you very much! (May your hand not ache)',
    fa: 'خیلی ممنون، دست شما درد نکنه!',
    fingilish: 'Kheyli mamnoon, daste shomâ dard nakoneh!',
    usageTip: 'The ultimate respectful gratitude phrase in Iranian culture.',
    audioKey: 'خیلی ممنون، دست شما درد نکنه'
  },
  {
    en: 'Excuse me / I am sorry',
    fa: 'ببخشید، معذرت می‌خوام',
    fingilish: 'Bebakhshid, ma\'zerat mikham',
    usageTip: 'Essential for opening conversations, asking directions, or passing by someone.',
    audioKey: 'ببخشید، معذرت می‌خوام'
  },
  {
    en: 'Please / Here you go / Go ahead',
    fa: 'بفرمایید، در خدمت شما هستیم',
    fingilish: 'Befarmâyid, dar khedmate shomâ hastim',
    usageTip: 'Use when offering a seat, handing over an item, or inviting someone in.',
    audioKey: 'بفرمایید، در خدمت شما هستیم'
  },
  {
    en: 'I would love some fresh hot tea, please!',
    fa: 'بی‌زحمت یک استکان چای تازه دم میل دارم',
    fingilish: 'Bi-zahmat yek estekân châye tâzeh-dam meyl dâram',
    usageTip: 'Polite and authentic ordering phrase in any traditional tea house or gathering.',
    audioKey: 'بی‌زحمت یک استکان چای تازه دم میل دارم'
  },
  {
    en: 'Goodbye! May God protect you!',
    fa: 'خداحافظ، به سلامت، در پناه حق!',
    fingilish: 'Khodâhâfez, be salâmat, dar panâhe hagh!',
    usageTip: 'Heartfelt departure blessing used among friends and family.',
    audioKey: 'خداحافظ، به سلامت'
  }
];
