// Tandem Cultural Exchange (اتاق‌های تبادل فرهنگی دوطرفه)
// Matches English speakers learning Persian with Iranian speakers learning English

export interface TandemPartner {
  id: string;
  name: string;
  avatar: string;
  nativeLanguage: 'persian' | 'english';
  targetLanguage: 'english' | 'persian';
  city: string;
  bio: string;
  topicTitleEn: string;
  topicTitleFa: string;
  persianPhrasePrompt: string;
  persianFingilish: string;
  englishPhrasePrompt: string;
  partnerVoiceText: string;
  partnerSpeechLanguage: 'fa' | 'en';
}

export const TANDEM_PARTNERS: TandemPartner[] = [
  {
    id: 'tp_1',
    name: 'Sara from Shiraz',
    avatar: '👩🏻‍🏫',
    nativeLanguage: 'persian',
    targetLanguage: 'english',
    city: 'Shiraz, Iran',
    bio: 'Architecture student from Shiraz. I love explaining Hafez poetry in Persian and practicing English conversation for university!',
    topicTitleEn: '15 min Persian: Hafez & City of Gardens / 15 min English: Everyday Idioms',
    topicTitleFa: '۱۵ دقیقه فارسی: شیراز و شعر حافظ / ۱۵ دقیقه انگلیسی: اصطلاحات روزمره',
    persianPhrasePrompt: 'سلام سارا! بی‌زحمت یک بیت زیبا از حافظ به من یاد میدی؟',
    persianFingilish: 'Salâm Sara! Bi-zahmat yek beyte zibâ az Hâfez be man yâd midi?',
    englishPhrasePrompt: 'Hello Sara! Can you teach me a poetic phrase about Shiraz gardens?',
    partnerVoiceText: 'سلام دوست من! خیلی خوشحالم که داری فارسی یاد می‌گیری! بیا با هم شعر «درخت دوستی بنشان» رو تمرین کنیم!',
    partnerSpeechLanguage: 'fa'
  },
  {
    id: 'tp_2',
    name: 'Oliver from London',
    avatar: '👨🏼‍💼',
    nativeLanguage: 'english',
    targetLanguage: 'persian',
    city: 'London, UK',
    bio: 'Historian learning Persian for an upcoming research trip to Isfahan and Yazd. Happy to help Iranian friends with British idioms!',
    topicTitleEn: '15 min English: Natural British Phrasal Verbs / 15 min Persian: Bazaar Haggling',
    topicTitleFa: '۱۵ دقیقه انگلیسی: افعال دو کلمه‌ای طبیعی / ۱۵ دقیقه فارسی: رسم خرید در بازار',
    persianPhrasePrompt: 'چطوری الیور؟ آیا تلفظ کلمه «قابلی نداره» رو درست میگم؟',
    persianFingilish: 'Chetori Oliver? Âyâ talaffoze kalameye "Ghâbeli nadâreh" ro dorost migam?',
    englishPhrasePrompt: 'Hey Oliver! How do British people naturally say "Good luck with your exam"?',
    partnerVoiceText: 'Hello mate! Your Persian pronunciation of Ghabel Nadareh sounds wonderfully natural! Let me show you how we say "Break a leg" in London!',
    partnerSpeechLanguage: 'en'
  },
  {
    id: 'tp_3',
    name: 'Arash from Isfahan',
    avatar: '👨🏻‍🎨',
    nativeLanguage: 'persian',
    targetLanguage: 'english',
    city: 'Isfahan, Iran',
    bio: 'Traditional Persian miniature artisan. Excited to teach carpet & bazaar terms in Persian while refining English business greetings.',
    topicTitleEn: '15 min Persian: Handcrafts & Souvenirs / 15 min English: Job Interview Practice',
    topicTitleFa: '۱۵ دقیقه فارسی: صنایع دستی و سوغات / ۱۵ دقیقه انگلیسی: آمادگی مصاحبه کاری',
    persianPhrasePrompt: 'آرش جان، توی بازار سنتی برای تعارف کردن چی بگیم که مودبانه باشه؟',
    persianFingilish: 'Ârash jân, tooye bâzâre sonnati barâye ta\'arof kardan chi begim?',
    englishPhrasePrompt: 'Arash, what is the best word to describe an exquisite Persian carpet?',
    partnerVoiceText: 'درود بر شما! در بازار همیشه باید بگی «قربان لطف شما، زحمت کشیدید»! حالا بیا من ازت درباره مصاحبه انگلیسی بپرسم!',
    partnerSpeechLanguage: 'fa'
  }
];
