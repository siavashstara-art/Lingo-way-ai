export type LearningDirection = 'en_to_fa' | 'fa_to_en';

export interface BilingualUnit {
  id: string;
  topic: string;
  topicFa: string;
  // English version
  englishPhrase: string;
  englishPhonetic: string;
  englishExplanation: string;
  // Persian version (with Fingilish phonetic for English speakers learning Persian!)
  persianPhrase: string;
  persianPhonetic: string; // e.g. "Khasteh nabashid", "Ghorban-e shoma"
  persianExplanation: string;
  // Everyday culture & street context
  contextFa: string;
  contextEn: string;
  category: 'daily' | 'hospitality' | 'work' | 'shopping' | 'travel';
}

export const BILINGUAL_KNOWLEDGE_BASE: BilingualUnit[] = [
  {
    id: 'bi_1',
    topic: 'Warm Greetings & Respect',
    topicFa: 'احوالپرسی گرم و احترام صمیمانه',
    englishPhrase: 'How are things going with you lately?',
    englishPhonetic: '/haʊ ɑːr θɪŋz ˈɡəʊɪŋ wɪð juː ˈleɪtli/',
    englishExplanation: 'A warm, casual way to ask how someone is doing in English.',
    persianPhrase: 'اوضاع و احوال چطوره؟ روبه‌راهی؟',
    persianPhonetic: 'Ozâ o ahvâl chetoreh? Roo-be-râhi?',
    persianExplanation: 'Common, warm conversational Persian greeting between friends and acquaintances.',
    contextFa: 'یک شروع صمیمانه و روزمره برای دیدار دوستان یا همکاران.',
    contextEn: 'A warm daily opening for greeting colleagues or friends in Iran or abroad.',
    category: 'daily'
  },
  {
    id: 'bi_2',
    topic: 'Appreciation & Gratitude (Persian Taarof vs. English Politeness)',
    topicFa: 'تشکر، قدردانی و تعارفات شیرین روزمره',
    englishPhrase: 'I really appreciate your great kindness.',
    englishPhonetic: '/aɪ ˈrɪə.li əˈpriː.ʃi.eɪt jɔːr ɡreɪt ˈkaɪnd.nəs/',
    englishExplanation: 'Used in English to show heartfelt thanks without sounding overly formal.',
    persianPhrase: 'دستت درد نکنه، خیلی محبت کردی!',
    persianPhonetic: 'Dastet dard nakoneh, kheyli mohabbat kardi!',
    persianExplanation: 'Literally "May your hand not ache" — the most authentic Persian everyday expression of thanks.',
    contextFa: 'وقتی کسی برات کاری انجام می‌ده یا هدیه‌ای می‌آره، این صمیمی‌ترین تشکره.',
    contextEn: 'Essential Persian cultural phrase whenever someone serves tea, helps you, or hands you a gift.',
    category: 'hospitality'
  },
  {
    id: 'bi_3',
    topic: 'Ordering in a Café / Restaurant',
    topicFa: 'سفارش دادن غذا یا نوشیدنی در کافه و رستوران',
    englishPhrase: 'Could I please get a cup of hot black tea?',
    englishPhonetic: '/kʊd aɪ pliːz ɡet ə kʌp əv hɒt blæk tiː/',
    englishExplanation: 'Polite, natural phrasing to order in English restaurants without barking commands.',
    persianPhrase: 'بی‌زحمت برام یک استکان چای داغ بیارید.',
    persianPhonetic: 'Bi-zahmat barâm yek estekân châye dâgh biyârid.',
    persianExplanation: '"Bi-zahmat" (literally without trouble) is the Persian equivalent of the polite "Please / Could you".',
    contextFa: 'کلمه «بی‌زحمت» همه درخواست‌ها رو محترمانه و نرم می‌کنه.',
    contextEn: 'Adding "Bi-zahmat" at the start of any Persian request makes it immediately friendly and polite.',
    category: 'shopping'
  },
  {
    id: 'bi_4',
    topic: 'Hard Work Appreciation (Untranslatable Persian Gem)',
    topicFa: 'خداقوت و خسته‌نباشید روزمره',
    englishPhrase: 'More power to your elbow! / Keep up the awesome work!',
    englishPhonetic: '/kiːp ʌp ðiː ˈɔː.səm wɜːk/',
    englishExplanation: 'Encouraging colleagues or workers who are diligently busy with a task.',
    persianPhrase: 'خسته نباشید، خدا قوت!',
    persianPhonetic: 'Khasteh nabâshid, khodâ ghovvat!',
    persianExplanation: 'Literally "May you not be tired, God give you strength." Universal Persian greeting for anyone working.',
    contextFa: 'در ورود به مغازه، تاکسی یا پایان جلسه کاری، اصیل‌ترین رسم ماست.',
    contextEn: 'You say this to taxi drivers, shopkeepers, and colleagues. It radiates warmth and human connection.',
    category: 'work'
  },
  {
    id: 'bi_5',
    topic: 'Saying Goodbye Casually',
    topicFa: 'خداحافظی خودمانی و مراقبت',
    englishPhrase: 'Take good care of yourself, see you around!',
    englishPhonetic: '/teɪk ɡʊd keər əv jɔːˈself siː juː əˈraʊnd/',
    englishExplanation: 'Warm farewell among peers and friendly acquaintances.',
    persianPhrase: 'مراقب خودت باش، فعلاً یا علی!',
    persianPhonetic: 'Morâghebe khodet bâsh, fe\'lan yâ Ali!',
    persianExplanation: 'Warm parting phrase wishing someone safety and safety till the next meeting.',
    contextFa: 'یک پایان صمیمانه و باانرژی برای صحبت‌های روزانه.',
    contextEn: 'Common, heartwarming way friends conclude conversations in Persian-speaking communities.',
    category: 'daily'
  },
  {
    id: 'bi_6',
    topic: 'Asking for the Price / Market Haggling',
    topicFa: 'پرسیدن قیمت و خرید در بازار',
    englishPhrase: 'How much does this cost altogether?',
    englishPhonetic: '/haʊ mʌtʃ dʌz ðɪs kɒst ˌɔːl.təˈɡeð.ər/',
    englishExplanation: 'Clear, direct inquiry for total cost in shopping.',
    persianPhrase: 'این کلاً چقدر تقدیمتون میشه؟ قابل نداره؟',
    persianPhonetic: 'In kollan cheghadr taghdimetoon misheh? Ghâbel nadâreh?',
    persianExplanation: '"Ghâbel nadâreh" is the iconic Persian polite dance of "It is of no value to you (free for you)".',
    contextFa: 'در خرید از بازارهای سنتی یا مغازه‌ها همه‌روزه شنیده می‌شود.',
    contextEn: 'In Persian markets, the seller will first say "Ghâbel nadareh" (It\'s a gift), to which you politely reply "Khahesh mikonam" and pay.',
    category: 'shopping'
  },
  {
    id: 'bi_7',
    topic: 'Asking for Directions / Travel',
    topicFa: 'پرسیدن آدرس و جهت در سفر',
    englishPhrase: 'Excuse me, could you point me toward the city center?',
    englishPhonetic: '/ɪkˈskjuːz miː kʊd juː pɔɪnt miː təˈwɔːd ðə ˈsɪti ˈsentər/',
    englishExplanation: 'Polite way to approach a stranger for navigation assistance.',
    persianPhrase: 'ببخشید، از کدوم مسیر می‌تونم برم سمت میدان اصلی شهر؟',
    persianPhonetic: 'Bebakhshid, az kodoom masir mitoonam beram samte meydâne asliye shahr?',
    persianExplanation: '"Bebakhshid" is the universal magic word for "Excuse me / Sorry" in Persian.',
    contextFa: 'برای پرسیدن آدرس از عابران پیاده در خیابان.',
    contextEn: 'Always precede any question in Iran with "Bebakhshid" to get the friendliest local guidance.',
    category: 'travel'
  }
];

export interface OfflineRuleUnit {
  id: string;
  titleFa: string;
  titleEn: string;
  persianRule: string;
  englishRule: string;
  exampleFa: string;
  exampleEn: string;
  phoneticFa: string;
}

export const OFFLINE_GRAMMAR_BRIDGE: OfflineRuleUnit[] = [
  {
    id: 'og_1',
    titleFa: 'ترتیب کلمات در جمله: فاعل، مفعول، فعل (SOV در مقابل SVO)',
    titleEn: 'Word Order: Persian (SOV) vs. English (SVO)',
    persianRule: 'در فارسی فعل معمولاً در انتهای جمله می‌آید: «من (فاعل) چای (مفعول) می‌نوشم (فعل)».',
    englishRule: 'In English, the verb immediately follows the subject: "I (Subject) drink (Verb) tea (Object)".',
    exampleFa: 'من به دوستم زنگ زدم.',
    exampleEn: 'I called my friend.',
    phoneticFa: 'Man be doostam zang zadam.'
  },
  {
    id: 'og_2',
    titleFa: 'استفاده از «لطفاً» و تعارف مؤدبانه',
    titleEn: 'Polite Requests: "Could you" vs. "بی‌زحمت / لطفاً"',
    persianRule: 'کلمه «بی‌زحمت» یا «لطفاً» در زبان فارسی، مثل «Could you please» در انگلیسی جمله را دلنشین می‌کند.',
    englishRule: 'Using "Could you please..." turns a direct order into a friendly, respectful invitation.',
    exampleFa: 'بی‌زحمت در را باز کنید.',
    exampleEn: 'Could you please open the door?',
    phoneticFa: 'Bi-zahmat dar râ bâz konid.'
  },
  {
    id: 'og_3',
    titleFa: 'احوالپرسی و پاسخ خودمانی',
    titleEn: 'Casual "How are you" Responses',
    persianRule: 'به جای «خوب هستم» خشک کتابی، در فارسی عامیانه می‌گوییم: «ممنون، قربانت، سلامتی». در انگلیسی هم می‌گوییم: "Doing well, thanks!"',
    englishRule: 'Native speakers rarely say "I am fine and you?". They say "Doing great, how about you?" or "Pretty good, thanks!".',
    exampleFa: 'چطوری؟ — ممنون، قربانت، تو چطوری؟',
    exampleEn: 'How are you doing? — Doing well, thanks! How about yourself?',
    phoneticFa: 'Chetori? — Mamnoon, ghorbânet, to chetori?'
  }
];
