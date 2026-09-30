import React, { useState } from 'react';
import {
  GraduationCap,
  Globe,
  ShieldCheck,
  HeartPulse,
  Music,
  Volume2,
  CheckCircle2,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { sound, speakEnglish, speakPersian, transliteratePersianToFingilish } from '../utils/audio';
import { EmbassyVisaEnglish } from './EmbassyVisaEnglish';

export type EnglishCategoryTab =
  | 'core'
  | 'real_life'
  | 'embassy_visa'
  | 'medical'
  | 'music';

interface EnglishLearningHubProps {
  activeCategory: EnglishCategoryTab;
  onSelectCategory: (cat: EnglishCategoryTab) => void;
  onEarnLingous: (amount: number) => void;
}

const CORE_ENGLISH_LESSONS = [
  {
    id: 'core_1',
    level: 'A1–A2 Foundation',
    titleEn: '1. Present Simple vs. Present Continuous (بیان شغل دائمی در برابر کارِ در حال انجام)',
    en: 'I work as a software developer every day, and right now I am preparing for an international project.',
    pron: 'eye wurk az ah SOFT-wair di-VEL-uh-per, and ryte now eye am pri-PAIR-ing for an in-ter-NASH-un-ul PROJ-ekt',
    fa: 'من هر روز به عنوان توسعه‌دهنده نرم‌افزار کار می‌کنم و هم‌اکنون در حال آماده‌سازی برای یک پروژه بین‌المللی هستم.',
    grammarTipFa: 'برای بیان شغل، عادت و واقعیت‌های همیشگی از حال ساده (I work) و برای کاری که همین لحظه در جریان است از حال استمراری (I am preparing) استفاده کنید.'
  },
  {
    id: 'core_2',
    level: 'B1 Intermediate',
    titleEn: '2. Present Perfect for Life Experience (بیان تجربیات و سوابق تا امروز)',
    en: 'I have studied English for three years, and I have completed two professional courses.',
    pron: 'eye hav STUD-eed ING-glish for three yeerz, and eye hav kum-PLEE-ted too pruh-FESH-un-ul KOR-sez',
    fa: 'من به مدت سه سال زبان انگلیسی خوانده‌ام و دو دوره تخصصی را به پایان رسانده‌ام.',
    grammarTipFa: 'ساختار have/has + Past Participle بهترین ساختار برای بیان سوابق تحصیلی، کاری و تجربیات زندگی بدون ذکر ساعت دقیق است.'
  },
  {
    id: 'core_3',
    level: 'B2 Upper-Intermediate',
    titleEn: '3. Polite Requests & Conditional Sentences (درخواست‌های محترمانه و جملات شرطی)',
    en: 'Could you please clarify this requirement? If I receive the documents today, I will submit the form tomorrow.',
    pron: 'kood yoo pleez KLAR-i-fye this ri-KWYRE-munt? if eye ri-SEEV theh DOK-yuh-munts tuh-DAY, eye wil sub-MIT theh form tuh-MOR-oh',
    fa: 'آیا ممکن است لطفاً این پیش‌نیاز را توضیح دهید؟ اگر مدارک را امروز دریافت کنم، فردا فرم را ارسال خواهم کرد.',
    grammarTipFa: 'شروع جمله با "Could you please..." یا "Would you mind..." لحن شما را در محیط‌های رسمی و بین‌المللی بسیار محترمانه می‌کند.'
  },
  {
    id: 'core_4',
    level: 'C1 Advanced',
    titleEn: '4. Expressing Cause, Purpose & Future Goals (بیان هدف و برنامه‌های آینده)',
    en: 'In order to expand my professional skills, I intend to pursue advanced training in my field.',
    pron: 'in OR-der too ik-SPAND mye pruh-FESH-un-ul skilz, eye in-TEND too per-SOO ad-VANST TRAY-ning',
    fa: 'به منظور گسترش مهارت‌های حرفه‌ای خود، قصد دارم آموزش‌های پیشرفته در رشته‌ام را دنبال کنم.',
    grammarTipFa: 'عبارات "In order to..." و "I intend to..." جایگزین‌های عالی و رسمی برای "because" و "I want to" هستند.'
  }
];

interface RealLifeItem {
  id: string;
  subCategory: 'daily_travel' | 'street_colloquial' | 'boundaries_street' | 'proverbs_idioms';
  badgeFa: string;
  place: string;
  en: string;
  enCasualVariant?: string;
  pron: string;
  fa: string;
  faColloquial?: string;
  vocabFa: string;
}

const REAL_LIFE_SCENARIOS: RealLifeItem[] = [
  // 1. Everyday & Travel Scenarios
  {
    id: 'rl_1',
    subCategory: 'daily_travel',
    badgeFa: 'سفر و فرودگاه ✈️',
    place: '✈️ Airport & Check-In (فرودگاه و دریافت کارت پرواز)',
    en: 'Hello, here is my passport and booking confirmation. Could I have an aisle seat, please?',
    pron: 'hel-LO, heer iz mye PAS-port and BOOK-ing kon-fer-MAY-shun. kood eye hav an EYLE seet, pleez?',
    fa: 'سلام، بفرمایید این پاسپورت و تاییدیه رزرو من است. آیا ممکن است لطفاً یک صندلی کنار راهرو به من بدهید؟',
    vocabFa: 'Aisle seat (صندلی کنار راهرو) • Window seat (صندلی کنار پنجره) • Boarding pass (کارت پرواز)'
  },
  {
    id: 'rl_2',
    subCategory: 'daily_travel',
    badgeFa: 'هتل و اقامت 🏨',
    place: '🏨 Hotel Check-In & Stay (پذیرش هتل و اقامت)',
    en: 'Good afternoon, I have a reservation under the name Ali Miri for four nights. Is breakfast included?',
    pron: 'good af-ter-NOON, eye hav ah rez-er-VAY-shun UN-der theh naym Ali Miri. iz BREK-fust in-KLOO-ded?',
    fa: 'ظهر بخیر، من به نام علی‌میری برای چهار شب رزرو دارم. آیا صبحانه شامل اقامت است؟',
    vocabFa: 'Reservation (رزرو) • Check-out time (ساعت تحویل اتاق) • Deposit (ودیعه)'
  },
  {
    id: 'rl_3',
    subCategory: 'daily_travel',
    badgeFa: 'بانک و خدمات روزمره 🏦',
    place: '🏦 Banking & Everyday Services (بانک، خرید و خدمات روزمره)',
    en: 'Excuse me, I would like to open a student bank account and activate mobile banking.',
    pron: 'ik-SKYOOZ mee, eye wood lyke too OH-pun ah STOO-dunt bank uh-KOWNT',
    fa: 'ببخشید، تمایل دارم یک حساب بانکی دانشجویی باز کنم و همراه بانک را فعال نمایم.',
    vocabFa: 'Checking account (حساب جاری) • Savings account (حساب پس‌انداز) • Proof of address (مدرک اثبات آدرس)'
  },
  {
    id: 'rl_4',
    subCategory: 'daily_travel',
    badgeFa: 'مترو و آدرس‌یابی 🚆',
    place: '🚆 Public Transit & Directions (حمل‌ونقل عمومی و آدرس‌یابی)',
    en: 'Excuse me, which platform does the express train to downtown depart from?',
    pron: 'wich PLAT-form duz theh ik-SPRES trayn too DOWN-town di-PART from?',
    fa: 'ببخشید، قطار سریع‌السیر به مقصد مرکز شهر از کدام سکو حرکت می‌کند؟',
    vocabFa: 'Platform (سکو) • Round-trip ticket (بلیط رفت و برگشت) • Transfer (تعویض خط)'
  },

  // 2. Street / Bazaar Slang & Friendly Colloquial Conversation (محاوره خودمانی و کوچه‌بازار)
  {
    id: 'rl_slang_1',
    subCategory: 'street_colloquial',
    badgeFa: 'محاوره خودمانی و کوچه‌بازار 🗣️',
    place: '🤝 تشکر صمیمی و مرام گذاشتن (دمت گرم / سنگ تموم گذاشتی)',
    en: 'You are a total legend, mate! You really came through for me—I owe you one!',
    enCasualVariant: 'Mad respect bro, you went all out! I’ve got your back next time.',
    pron: 'yoo ar ah TOH-tul LEJ-end mayt! yoo REE-lee kaym throo for mee — eye OH yoo wun!',
    fa: 'دمت گرم رفیق، واقعاً مرام گذاشتی و کارم رو راه انداختی! ایشالا جبران کنم.',
    faColloquial: 'ایول داداش، سنگ تموم گذاشتی! جبران کنیم برات.',
    vocabFa: 'Come through for someone (به داد کسی رسیدن / کار کسی را راه انداختن) • I owe you one (یکی طلبکار من شدی / جبران می‌کنم)'
  },
  {
    id: 'rl_slang_2',
    subCategory: 'street_colloquial',
    badgeFa: 'محاوره خودمانی و کوچه‌بازار 🗣️',
    place: '☕ تعارف خودمانی و حساب کردن دنگی یا مهمان کردن (قابلی نداره / مهمون من)',
    en: 'Put your wallet away—this one is on me! Or if you prefer, we can go Dutch next time.',
    enCasualVariant: 'Don’t even mention it, it’s my treat today!',
    pron: 'poot yor WAW-lit uh-WAY — this wun iz on mee! it iz mye treet!',
    fa: 'کیفت رو بذار جیبت، قابلی نداره امروز مهمون من باش! دفعه بعد خواستی دنگی حساب می‌کنیم.',
    faColloquial: 'دست تو جیبت نبر، این دفعه با منه!',
    vocabFa: 'It’s on me / My treat (مهمون من باش) • Go Dutch / Split the bill (دنگی حساب کردن)'
  },
  {
    id: 'rl_slang_3',
    subCategory: 'street_colloquial',
    badgeFa: 'محاوره خودمانی و کوچه‌بازار 🗣️',
    place: '👋 احوال‌پرسی گرم خیابانی و قرار گذاشتن (چه خبر؟ / کم‌پیدایی / پایه‌ای؟)',
    en: 'What’s up, stranger? Long time no see! Are you down to grab a coffee and catch up?',
    enCasualVariant: 'How’s it going? Let’s hang out tonight if you’re free!',
    pron: 'whuts up STRAYN-jer? long tyme noh see! ar yoo down too grab ah KAW-fee?',
    fa: 'چه خبر رفیق؟ کم‌پیدایی! پایه‌ای بریم یه قهوه بخوریم و از احوال هم باخبر بشیم؟',
    faColloquial: 'چطوری کم‌پیدا؟ پایه‌ای امشب بریم بیرون گپ بزنیم؟',
    vocabFa: 'Long time no see (کم‌پیدایی / پارسال دوست امسال آشنا) • Are you down? (پایه هستی؟) • Catch up (از حال هم باخبر شدن)'
  },
  {
    id: 'rl_slang_4',
    subCategory: 'street_colloquial',
    badgeFa: 'محاوره خودمانی و کوچه‌بازار 🗣️',
    place: '😅 دلداری خودمانی، خستگی و حواس‌پرتی (بی‌خیال سخت نگیر / جنازه‌ام از خستگی)',
    en: 'Don’t sweat it, take it easy! My bad if I spaced out earlier—I’m completely wiped out today.',
    enCasualVariant: 'Chill out bro, it’s no big deal! I’m just dead tired after work.',
    pron: 'dohnt swet it, tayk it EE-zee! mye bad if eye spayst owt — eym wypt owt!',
    fa: 'بی‌خیال بابا، سخت نگیر! تقصیر من بود که حواسم پرت شد، امروز از خستگی واقعاً له و جنازه‌ام.',
    faColloquial: 'غصه نخور درست میشه! امروز دهنم از کار سرویس شد.',
    vocabFa: 'Don’t sweat it (سخت نگیر / غصه نخور) • My bad (تقصیر من بود) • Space out (حواس‌پرت شدن) • Wiped out / Beat (له و خسته بودن)'
  },

  // 3. Everyday Boundaries & Street/Bazaar Self-Defense (حدهای روزمره و دفاع از حق خود در کوچه و بازار)
  {
    id: 'rl_bound_1',
    subCategory: 'boundaries_street',
    badgeFa: 'حدهای روزمره و دفاع از خود 🛡️',
    place: '🛑 تعیین حدومرز شخصی و رد قاطعانه مزاحمت یا اصرار بیش از حد',
    en: 'No thank you, I am not interested at all. Please respect my personal boundaries and do not push it.',
    enCasualVariant: 'Back off, please! I said no, so drop it right now.',
    pron: 'noh thank yoo, eye am not IN-tres-ted. pleez ri-SPEKT mye BOWN-dreez and dohnt poosh it.',
    fa: 'نه ممنون، اصلاً تمایلی ندارم. لطفاً به حد و حریم شخصی من احترام بگذارید و اصرار نکنید.',
    faColloquial: 'لطفاً گیر نده و پاپیچ نشو! گفتم نه، تمومش کن.',
    vocabFa: 'Personal boundaries (حدومرز شخصی) • Don’t push it (پافشاری و اصرار بی‌جا نکن) • Back off (عقب بایست / مزاحم نشو)'
  },
  {
    id: 'rl_bound_2',
    subCategory: 'boundaries_street',
    badgeFa: 'حدهای روزمره و دفاع از خود 🛡️',
    place: '💸 مچ‌گیری گران‌فروشی و کلاهبرداری در کوچه و بازار (سر ما کلاه نذار!)',
    en: 'Hold on, I wasn’t born yesterday! That price is a total rip-off—stop trying to overcharge me.',
    enCasualVariant: 'Quit pulling my leg / Cut the crap! Are you trying to rip me off?',
    pron: 'hold on, eye WUZ-unt born YES-ter-day! that prys iz ah TOH-tul RIP-off!',
    fa: 'صبر کن ببینم، من که از پشت کوه نیومدم! این قیمت رسماً گرون‌فروشیه؛ نخواه سر ما کلاه بذاری.',
    faColloquial: 'خالی نبند و چرت‌وپرت نگو! می‌خوای سر ما رو شیره بمالی؟',
    vocabFa: 'A total rip-off (کلاهبرداری / گران‌فروشی محض) • Pull someone’s leg (سر کار گذاشتن / خالی بستن) • Overcharge (اضافه حساب کردن)'
  },
  {
    id: 'rl_bound_3',
    subCategory: 'boundaries_street',
    badgeFa: 'حدهای روزمره و دفاع از خود 🛡️',
    place: '⚖️ تذکر جدی درباره نوبت، ادب و سوءاستفاده در جمع',
    en: 'Excuse me, there is a line here—please wait your turn and don’t take advantage of people’s politeness.',
    enCasualVariant: 'Hey, don’t cut in line! Wait your turn like everyone else.',
    pron: 'ik-SKYOOZ mee, thair iz ah lyne heer — pleez wayt yor turn and dohnt kut in lyne!',
    fa: 'ببخشید، اینجا صف هست؛ لطفاً نوبت رو رعایت کنید و از ادب مردم سوءاستفاده نکنید.',
    faColloquial: 'آقا نزن تو صف! مثل بقیه وایسا نوبتت بشه.',
    vocabFa: 'Cut in line (زدن توی صف) • Wait your turn (منتظر نوبت خود ماندن) • Take advantage of (سوءاستفاده کردن از)'
  },

  // 4. Proverbs & Everyday Cultural Idioms (ضرب‌المثل‌ها و کنایه‌های روزمره)
  {
    id: 'rl_prov_1',
    subCategory: 'proverbs_idioms',
    badgeFa: 'ضرب‌المثل و کنایه روزمره 📜',
    place: '🐍 مارگزیده از ریسمان سیاه و سفید می‌ترسد (احتیاط بعد از تجربه تلخ)',
    en: 'Once bitten, twice shy. After getting burned last time, I always read the fine print.',
    pron: 'wuns BIT-en, twys shye. eye AWL-wayz reed theh fyne print.',
    fa: 'مارگزیده از ریسمان سیاه و سفید می‌ترسد؛ بعد از اینکه دفعه قبل ضرر کردم، همیشه جزئیات رو کامل می‌خونم.',
    vocabFa: 'Once bitten, twice shy (مارگزیده از ریسمان سیاه و سفید می‌ترسد) • Read the fine print (خواندن ریزه‌کاری‌های قرارداد)'
  },
  {
    id: 'rl_prov_2',
    subCategory: 'proverbs_idioms',
    badgeFa: 'ضرب‌المثل و کنایه روزمره 📜',
    place: '🌾 مرغ همسایه غازه / نابرده رنج گنج میسر نمی‌شود',
    en: 'People think the grass is always greener on the other side, but in reality, no pain, no gain!',
    pron: 'theh gras iz AWL-wayz GREE-ner on theh UTH-er syde, but noh payn, noh gayn!',
    fa: 'همه فکر می‌کنن مرغ همسایه غازه، ولی در واقعیت نابرده رنج گنج میسر نمیشه!',
    vocabFa: 'The grass is always greener (مرغ همسایه غازه) • No pain, no gain (نابرده رنج گنج میسر نمی‌شود)'
  }
];

const MEDICAL_HEALTH_LESSONS = [
  {
    id: 'med_1',
    situation: '🩺 Describing Symptoms to a Doctor (شرح علائم به پزشک)',
    en: 'Doctor, I have had a sore throat, mild fever, and dizziness since yesterday morning.',
    pron: 'DOK-ter, eye hav had ah sor throht, myld FEE-ver, and DIZ-ee-nis sins YES-ter-day MOR-ning',
    fa: 'آقای دکتر / خانم دکتر، از دیروز صبح گلودرد، تب خفیف و سرگیجه داشته‌ام.',
    keyTermsFa: 'Sore throat (گلودرد) • Mild fever (تب خفیف) • Dizziness (سرگیجه) • Nausea (حالت تهوع)'
  },
  {
    id: 'med_2',
    situation: '💊 Allergies & Current Medications (حساسیت‌های دارویی و سوابق پزشکی)',
    en: 'I am allergic to penicillin, and I take blood pressure medication once a day.',
    pron: 'eye am uh-LER-jik too pen-i-SIL-in, and eye tayk blud PRESH-er med-i-KAY-shun wuns ah day',
    fa: 'من به پنی‌سیلین حساسیت (آلرژی) دارم و روزی یک بار داروی فشار خون مصرف می‌کنم.',
    keyTermsFa: 'Allergic to (حساسیت داشتن به) • Blood pressure (فشار خون) • Prescription (نسخه پزشک)'
  },
  {
    id: 'med_3',
    situation: '🏥 Pharmacy & Dosage Instructions (داروخانه و نحوه مصرف دارو)',
    en: 'Should I take this medicine before or after meals, and does it cause drowsiness?',
    pron: 'shood eye tayk this MED-i-sin bi-FOR or AF-ter meelz, and duz it kawz DROW-zee-nis?',
    fa: 'آیا باید این دارو را قبل یا بعد از غذا مصرف کنم، و آیا باعث خواب‌آلودگی می‌شود؟',
    keyTermsFa: 'After meals (بعد از غذا) • Drowsiness (خواب‌آلودگی) • Side effects (عوارض جانبی)'
  },
  {
    id: 'med_4',
    situation: '🚑 Urgent Care & Dental/Medical Appointment (نوبت فوری پزشکی و اورژانس)',
    en: 'I have severe toothache on my lower right side. Do you have an urgent appointment available today?',
    pron: 'eye hav si-VEER TOOTH-ayk. doo yoo hav an UR-junt uh-POYNT-munt uh-VAY-luh-bul tuh-DAY?',
    fa: 'در سمت راست فک پایینم دندان‌درد شدید دارم. آیا امروز نوبت اورژانسی خالی دارید؟',
    keyTermsFa: 'Severe pain (درد شدید) • Urgent appointment (نوبت فوری) • Health insurance (بیمه درمانی)'
  }
];

const MUSIC_RHYTHM_LESSONS = [
  {
    id: 'mus_1',
    title: '🎵 1. Connected Speech & Melodic Flow (اتصال کلمات در ریتم موسیقی انگلیسی)',
    lyricLineEn: '"Hold on to the light when the night is cold — every step you take makes your story bold."',
    spokenRhythmEn: 'HOL-don to-the-LYTE wen-the-NYTE iz KOLD — EV-ree STEP yoo TAYK mayks yor STOR-ee BOLD.',
    meaningFa: '«وقتی شب سرد است به روشنایی تکیه کن — هر قدمی که برمی‌داری داستان زندگی‌ات را جسورانه‌تر می‌کند.»',
    teachingPointFa: 'در موسیقی و گفتار طبیعی انگلیسی، کلمه ختم‌شده به حرف بی‌صدا به حرف صدادار بعدی می‌چسبد: "Hold on" به صورت "Hol-don" شنیده می‌شود.'
  },
  {
    id: 'mus_2',
    title: '🎵 2. Word Stress & Emotional Intonation (تکیه واژگان و آهنگ جمله)',
    lyricLineEn: '"We are rising higher than the clouds above — building bridges with hope and love."',
    spokenRhythmEn: 'wee ar RYE-zing HYE-er than theh KLOWDZ uh-BUV — BIL-ding BRIJ-ez with HOHP and LUV.',
    meaningFa: '«ما بالاتر از ابرهای آسمان اوج می‌گیریم — و با امید و محبت پل می‌سازیم.»',
    teachingPointFa: 'در ریتم انگلیسی، کلمات محتوایی (افعال، اسم‌ها و صفت‌ها مانند Rising, Higher, Clouds) کشیده و پرانرژی تلفظ می‌شوند و حروف اضافه (to, with, and) کوتاه ادا می‌شوند.'
  },
  {
    id: 'mus_3',
    title: '🎵 3. Contractions & Natural Phrasing in Song Lyrics (مخفف‌های رایج در ترانه‌ها)',
    lyricLineEn: '"I’ve been walking down this road so long, now I’m singing a brand-new song."',
    spokenRhythmEn: 'EYEV bin WAW-king down this ROHD soh LONG, now EYM SING-ing ah BRAND-noo SONG.',
    meaningFa: '«مدت‌هاست که در این مسیر قدم زده‌ام و اکنون ترانه‌ای کاملاً تازه می‌خوانم.»',
    teachingPointFa: 'تمرین ریتمیک ساختار Present Perfect Continuous (I’ve been walking) به شما کمک می‌کند بدون مکث و لکنت جملات طولانی بگویید.'
  }
];

export const EnglishLearningHub: React.FC<EnglishLearningHubProps> = ({
  activeCategory,
  onSelectCategory,
  onEarnLingous
}) => {
  const [slowMode, setSlowMode] = useState<boolean>(false);
  const [realLifeFilter, setRealLifeFilter] = useState<
    'all' | 'daily_travel' | 'street_colloquial' | 'boundaries_street' | 'proverbs_idioms'
  >('all');
  const rate = slowMode ? 0.68 : 0.88;

  const filteredRealLife = REAL_LIFE_SCENARIOS.filter((item) =>
    realLifeFilter === 'all' ? true : item.subCategory === realLifeFilter
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Category Navigation Bar for the 5 Frozen English Learning Modules */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border-2 border-teal-500/30 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex flex-wrap items-center gap-2">
            <GraduationCap className="w-5 h-5 text-teal-700" />
            <span className="text-xs sm:text-sm font-black text-slate-900">
              🎓 بخش دوطرفه آموزش زبان (انگلیسی برای فارسی‌زبانان ⇄ فارسی اصیل و فینگلیش برای فرزندان ایرانیان خارج از کشور):
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setSlowMode(!slowMode);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-black border ${
              slowMode
                ? 'bg-amber-400 text-slate-950 border-amber-300'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            🐢 {slowMode ? 'پخش صوتی شمرده: روشن (0.68x)' : 'پخش صوتی عادی (کلیک برای شمرده)'}
          </button>
        </div>

        {/* Iranian Diaspora & Heritage Learners Banner */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <p className="font-bold text-teal-950">
            🌍 <strong>ویژه ایرانیان مقیم خارج از کشور و انگلیسی‌زبانان (Farsi for Iranian Diaspora & Heritage Learners):</strong> تمامی دروس علاوه بر آموزش انگلیسی، دارای <strong>خط فارسی، نگارش آوایی فینگلیش (Fingilish) و پخش صوتی فارسی</strong> هستند تا فرزندان ایرانیان خارج از کشور نیز فارسی رسمی و محاوره‌ای را به آسانی بیاموزند.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {[
            {
              id: 'core' as const,
              icon: '🎓',
              titleEn: 'Core English Learning',
              titleFa: '۱. آموزش پایه و گرامر کاربردی'
            },
            {
              id: 'real_life' as const,
              icon: '🌍',
              titleEn: 'Real-Life & Colloquial English',
              titleFa: '۲. محاوره روزمره، خودمانی و کوچه‌بازار'
            },
            {
              id: 'embassy_visa' as const,
              icon: '🛂',
              titleEn: 'Embassy & Visa Interview',
              titleFa: '۳. انگلیسی مصاحبه سفارت و ویزا'
            },
            {
              id: 'medical' as const,
              icon: '🏥',
              titleEn: 'Medical & Health English',
              titleFa: '۴. انگلیسی پزشکی و سلامت'
            },
            {
              id: 'music' as const,
              icon: '🎵',
              titleEn: 'Learn English with Music',
              titleFa: '۵. یادگیری انگلیسی با موسیقی'
            }
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSelectCategory(tab.id);
                }}
                className={`p-3 rounded-2xl border-2 text-right transition-all ${
                  isActive
                    ? 'bg-teal-800 text-white border-teal-600 shadow-md'
                    : 'bg-slate-50 hover:bg-teal-50/50 text-slate-800 border-slate-200'
                }`}
              >
                <div className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                  <span>{tab.icon}</span>
                  <span>{tab.titleFa}</span>
                </div>
                <div
                  className={`text-[11px] font-bold mt-0.5 ${
                    isActive ? 'text-amber-300' : 'text-slate-500'
                  }`}
                  dir="ltr"
                >
                  {tab.titleEn}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 1. 🎓 CORE ENGLISH LEARNING                                         */}
      {/* =================================================================== */}
      {activeCategory === 'core' && (
        <div className="space-y-5">
          <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white p-6 sm:p-8 shadow-lg space-y-2">
            <span className="text-xs font-black text-amber-300">🎓 MODULE 1 • CORE ENGLISH LEARNING</span>
            <h2 className="text-2xl sm:text-3xl font-black">
              پایه‌های اصلی گرامر، جمله‌سازی و تلفظ انگلیسی (A1 تا C1)
            </h2>
            <p className="text-xs sm:text-sm text-teal-100">
              ساختارهای ضروری برای صحبت کردن بدون غلط گرامری همراه با راهنمای آوایی، ترجمه فارسی و پخش صوتی.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CORE_ENGLISH_LESSONS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="inline-block px-3 py-1 rounded-xl bg-teal-50 text-teal-900 font-black text-xs">
                    {item.level}
                  </span>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">{item.titleEn}</h3>
                  <p className="text-sm sm:text-base font-black text-teal-950" dir="ltr">
                    "{item.en}"
                  </p>
                  <p className="text-xs font-mono text-slate-500" dir="ltr">
                    🔊 EN Phonetic: [{item.pron}]
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">🇮🇷 «{item.fa}»</p>
                  <p className="text-xs font-mono text-emerald-800 bg-emerald-50/80 px-2.5 py-1.5 rounded-xl border border-emerald-200" dir="ltr">
                    🇮🇷 Fingilish (Farsi Pronunciation): [{transliteratePersianToFingilish(item.fa)}]
                  </p>
                  <p className="text-xs text-amber-950 bg-amber-50 p-3 rounded-2xl border border-amber-200">
                    💡 <strong>نکته آموزشی:</strong> {item.grammarTipFa}
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      speakEnglish(item.en, rate);
                      onEarnLingous(5);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-black text-xs flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 Listen in English</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => speakPersian(item.fa, rate)}
                    className="py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs"
                  >
                    🔊 Speak Farsi (پخش فارسی)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. 🌍 REAL-LIFE & COLLOQUIAL STREET ENGLISH                         */}
      {/* =================================================================== */}
      {activeCategory === 'real_life' && (
        <div className="space-y-5">
          <div className="rounded-3xl bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 text-white p-6 sm:p-8 shadow-lg space-y-2">
            <span className="text-xs font-black text-amber-300">
              🌍 MODULE 2 • REAL-LIFE, STREET SLANG & COLLOQUIAL ENGLISH
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              انگلیسی روزمره، محاوره خودمانی، اصطلاحات کوچه‌بازار و حدهای روزمره 🗣️
            </h2>
            <p className="text-xs sm:text-sm text-sky-100">
              شامل موقعیت‌های سفر و زندگی روزمره، تکیه‌کلام‌های صمیمی و خودمانی، دفاع از حق خود و حدومرزهای روزمره در کوچه و بازار، و ضرب‌المثل‌های کاربردی.
            </p>
          </div>

          {/* Sub-Category Filter Bar for Real-Life & Street Colloquial */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-wrap gap-2 shadow-xs">
            {[
              { id: 'all' as const, label: 'همه بخش‌های روزمره و محاوره (۱۲ مورد)' },
              { id: 'street_colloquial' as const, label: '🗣️ محاوره خودمانی و اصطلاحات کوچه‌بازار' },
              { id: 'boundaries_street' as const, label: '🛡️ حدهای روزمره و دفاع از حق خود در خیابان و بازار' },
              { id: 'daily_travel' as const, label: '✈️ موقعیت‌های سفر (فرودگاه، هتل، بانک، مترو)' },
              { id: 'proverbs_idioms' as const, label: '📜 ضرب‌المثل‌ها و کنایه‌های روزمره' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setRealLifeFilter(f.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
                  realLifeFilter === f.id
                    ? 'bg-sky-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRealLife.map((sc) => (
              <div
                key={sc.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-sky-50 text-sky-900 font-black text-[11px] border border-sky-200">
                      {sc.badgeFa}
                    </span>
                  </div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">{sc.place}</h3>
                  <p className="text-sm sm:text-base font-black text-slate-950" dir="ltr">
                    🇬🇧 "{sc.en}"
                  </p>
                  {sc.enCasualVariant && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-2" dir="ltr">
                      <p className="text-xs font-black text-amber-950">
                        🔥 Street / Casual Variant: "{sc.enCasualVariant}"
                      </p>
                      <button
                        type="button"
                        onClick={() => speakEnglish(sc.enCasualVariant!, rate)}
                        className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] shrink-0"
                      >
                        🔊 Slang
                      </button>
                    </div>
                  )}
                  <p className="text-xs font-mono text-slate-500" dir="ltr">
                    🔊 EN Phonetic: [{sc.pron}]
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">🇮🇷 فارسی معیار: «{sc.fa}»</p>
                  {sc.faColloquial && (
                    <p className="text-xs font-black text-rose-900 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                      🗣️ محاوره خودمانی و کوچه‌بازاری: «{sc.faColloquial}»
                    </p>
                  )}
                  <p className="text-xs font-mono text-emerald-800 bg-emerald-50/80 px-2.5 py-1.5 rounded-xl border border-emerald-200" dir="ltr">
                    🇮🇷 Fingilish (for Diaspora & English Speakers): [{transliteratePersianToFingilish(sc.faColloquial || sc.fa)}]
                  </p>
                  <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950">
                    🔑 اصطلاحات و نکات کلیدی: {sc.vocabFa}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      speakEnglish(sc.en, rate);
                      onEarnLingous(5);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-sky-800 hover:bg-sky-700 text-white font-black text-xs flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 Listen in English</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => speakPersian(sc.faColloquial || sc.fa, rate)}
                    className="py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs"
                  >
                    🔊 Speak Farsi (پخش فارسی)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. 🛂 EMBASSY & VISA INTERVIEW ENGLISH                              */}
      {/* =================================================================== */}
      {activeCategory === 'embassy_visa' && (
        <EmbassyVisaEnglish onEarnReward={onEarnLingous} />
      )}

      {/* =================================================================== */}
      {/* 4. 🏥 MEDICAL & HEALTH ENGLISH                                      */}
      {/* =================================================================== */}
      {activeCategory === 'medical' && (
        <div className="space-y-5">
          <div className="rounded-3xl bg-gradient-to-r from-rose-900 via-red-900 to-slate-900 text-white p-6 sm:p-8 shadow-lg space-y-2">
            <span className="text-xs font-black text-amber-300">🏥 MODULE 4 • MEDICAL & HEALTH ENGLISH</span>
            <h2 className="text-2xl sm:text-3xl font-black">
              انگلیسی پزشکی، سلامت، داروخانه و اورژانس (Medical & Health Communication)
            </h2>
            <p className="text-xs sm:text-sm text-rose-100">
              توانایی توضیح دقیق علائم بیماری، حساسیت‌های دارویی و درک دستورات پزشک یا داروساز به زبان انگلیسی.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MEDICAL_HEALTH_LESSONS.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <h3 className="font-black text-sm sm:text-base text-rose-900">{med.situation}</h3>
                  <p className="text-sm sm:text-base font-black text-slate-950" dir="ltr">
                    "{med.en}"
                  </p>
                  <p className="text-xs font-mono text-slate-500" dir="ltr">
                    🔊 [{med.pron}]
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">🇮🇷 «{med.fa}»</p>
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-950">
                    🩺 واژگان حیاتی پزشکی: {med.keyTermsFa}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      speakEnglish(med.en, rate);
                      onEarnLingous(5);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-rose-800 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 پخش صوتی انگلیسی</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => speakPersian(med.fa, 0.85)}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
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
      {/* 5. 🎵 LEARN ENGLISH WITH MUSIC                                      */}
      {/* =================================================================== */}
      {activeCategory === 'music' && (
        <div className="space-y-5">
          <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-fuchsia-900 to-slate-900 text-white p-6 sm:p-8 shadow-lg space-y-2">
            <span className="text-xs font-black text-amber-300">🎵 MODULE 5 • LEARN ENGLISH WITH MUSIC</span>
            <h2 className="text-2xl sm:text-3xl font-black">
              یادگیری ریتم، اتصال کلمات (Connected Speech) و لحن طبیعی با موسیقی
            </h2>
            <p className="text-xs sm:text-sm text-purple-100">
              تقویت حافظه شنیداری و روان‌گویی در زبان انگلیسی از طریق وزن، قافیه و تکیه کلمات در اشعار آهنگین.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MUSIC_RHYTHM_LESSONS.map((song) => (
              <div
                key={song.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <h3 className="font-black text-sm text-purple-900">{song.title}</h3>
                  <p className="text-sm font-black text-slate-950 italic" dir="ltr">
                    {song.lyricLineEn}
                  </p>
                  <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs font-mono text-purple-950" dir="ltr">
                    🎶 Rhythm: {song.spokenRhythmEn}
                  </div>
                  <p className="text-xs font-bold text-slate-700">{song.meaningFa}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    💡 {song.teachingPointFa}
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      speakEnglish(song.lyricLineEn, 0.88);
                      onEarnLingous(5);
                    }}
                    className="w-full py-2.5 rounded-xl bg-purple-800 hover:bg-purple-700 text-white font-black text-xs flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 پخش با ریتم عادی</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => speakEnglish(song.lyricLineEn, 0.65)}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                  >
                    🐢 پخش شمرده برای تمرین هم‌خوانی (Shadowing)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
