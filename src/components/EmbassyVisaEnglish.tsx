import React, { useState, useRef } from 'react';
import {
  Volume2,
  Mic,
  MicOff,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ShieldAlert,
  Globe,
  Headphones,
  MessageSquare,
  RefreshCw,
  Sparkles,
  Check
} from 'lucide-react';
import { sound, speakEnglish, speakPersian } from '../utils/audio';

export type VisaCountryCode = 'ALL' | 'US' | 'CA' | 'GB' | 'AU';

export interface VisaPracticeQuestion {
  id: string;
  number: number;
  categoryLabel: string;
  countryTags: VisaCountryCode[];
  questionEn: string;
  phoneticEn: string;
  meaningFa: string;
  whatOfficerIsAskingEn: string;
  whatOfficerIsAskingFa: string;
  vocabulary: Array<{
    termEn: string;
    meaningFa: string;
    pronunciation: string;
  }>;
  exampleAnswerEn: string;
  exampleAnswerFa: string;
  coachingTipFa: string;
}

export interface CommonInterviewMistake {
  id: string;
  titleEn: string;
  titleFa: string;
  whyItHappensFa: string;
  weakExampleEn: string;
  strongTruthfulExampleEn: string;
  strongTruthfulExampleFa: string;
}

const COUNTRY_PROFILES: Array<{
  code: VisaCountryCode;
  flag: string;
  nameEn: string;
  nameFa: string;
  communicationFocusEn: string;
  communicationFocusFa: string;
}> = [
  {
    code: 'ALL',
    flag: '🌐',
    nameEn: 'All Countries (Core Practice)',
    nameFa: 'همه کشورها (تمرین پایه)',
    communicationFocusEn: 'Universal English listening, clear pronunciation, and concise truthful answers.',
    communicationFocusFa: 'تقویت مهارت شنیداری، تلفظ واضح و پاسخ‌های کوتاه، صادقانه و طبیعی به زبان انگلیسی.'
  },
  {
    code: 'US',
    flag: '🇺🇸',
    nameEn: 'United States',
    nameFa: 'ایالات متحده آمریکا',
    communicationFocusEn: 'Focus on short, direct, spoken answers (often 1–2 sentences) at a counter window.',
    communicationFocusFa: 'تمرکز بر پاسخ‌های بسیار کوتاه و مستقیم (۱ تا ۲ جمله) درباره هدف سفر، شغل و برنامه بازگشت. (قوانین رسمی را از منابع دولتی فعلی بررسی کنید).'
  },
  {
    code: 'CA',
    flag: '🇨🇦',
    nameEn: 'Canada',
    nameFa: 'کانادا',
    communicationFocusEn: 'Clear explanation of study/work/visit purpose, financial support, and home ties.',
    communicationFocusFa: 'توضیح روشن درباره برنامه تحصیلی یا سفر، پشتوانه مالی و وابستگی‌های شغلی/خانوادگی. (قوانین رسمی را از منابع دولتی فعلی بررسی کنید).'
  },
  {
    code: 'GB',
    flag: '🇬🇧',
    nameEn: 'United Kingdom',
    nameFa: 'بریتانیا (انگلستان)',
    communicationFocusEn: 'Clear articulation of course/visit details, accommodation, and funding in British/International English.',
    communicationFocusFa: 'بیان دقیق جزئیات دوره تحصیلی یا سفر، محل اقامت و هزینه‌ها با انگلیسی روان. (قوانین رسمی را از منابع دولتی فعلی بررسی کنید).'
  },
  {
    code: 'AU',
    flag: '🇦🇺',
    nameEn: 'Australia',
    nameFa: 'استرالیا',
    communicationFocusEn: 'Explaining study/career relevance, travel itinerary, and post-study or post-visit plans clearly.',
    communicationFocusFa: 'توضیح شفاف ارتباط رشته تحصیلی یا سفر با سوابق کاری و برنامه پس از فراغت از تحصیل. (قوانین رسمی را از منابع دولتی فعلی بررسی کنید).'
  }
];

export const COMMON_PRACTICE_QUESTIONS: VisaPracticeQuestion[] = [
  {
    id: 'vq_1',
    number: 1,
    categoryLabel: 'Travel Purpose • هدف سفر',
    countryTags: ['ALL', 'US', 'CA', 'GB', 'AU'],
    questionEn: 'What is the purpose of your trip?',
    phoneticEn: 'whut iz theh PUR-pus ov yor trip?',
    meaningFa: 'هدف شما از این سفر چیست؟',
    whatOfficerIsAskingEn: 'The interviewer wants a clear, one-sentence summary of why you are traveling (tourism, visiting family, business conference, or academic study).',
    whatOfficerIsAskingFa: 'مصاحبه‌کننده می‌خواهد در یک جمله روشن و مستقیم بداند دلیل اصلی سفر شما چیست (گردشگری، دیدار خانواده، همایش کاری یا تحصیل دانشگاهی).',
    vocabulary: [
      { termEn: 'Purpose of trip', meaningFa: 'هدف سفر', pronunciation: 'PUR-pus ov trip' },
      { termEn: 'Tourism and sightseeing', meaningFa: 'گردشگری و بازدید از جاذبه‌ها', pronunciation: 'TOOR-iz-um and SYTE-see-ing' },
      { termEn: 'Attend a conference', meaningFa: 'شرکت در یک کنفرانس علمی/کاری', pronunciation: 'uh-TEND ah KON-fer-ens' }
    ],
    exampleAnswerEn: 'I am traveling for a two-week vacation to visit my sister and see historical landmarks.',
    exampleAnswerFa: 'من برای یک تعطیلات دو هفته‌ای جهت دیدار با خواهرم و بازدید از جاذبه‌های تاریخی سفر می‌کنم.',
    coachingTipFa: 'در همان جمله اول، نوع سفر (گردشگری/تحصیلی/دیدار خانواده) و مدت تقریبی آن را صادقانه بیان کنید.'
  },
  {
    id: 'vq_2',
    number: 2,
    categoryLabel: 'Destination Reason • چرایی انتخاب مقصد',
    countryTags: ['ALL', 'US', 'CA', 'GB', 'AU'],
    questionEn: 'Why do you want to visit this country?',
    phoneticEn: 'wye doo yoo wahnt too VIZ-it this KUN-tree?',
    meaningFa: 'چرا می‌خواهید از این کشور بازدید کنید؟',
    whatOfficerIsAskingEn: 'This question checks whether you have a specific, realistic plan and genuine interest in your destination.',
    whatOfficerIsAskingFa: 'این پرسش بررسی می‌کند که آیا شما برنامه مشخص و واقعی برای مقصد خود دارید و بتوانید آن را به انگلیسی طبیعی توضیح دهید.',
    vocabulary: [
      { termEn: 'Specific itinerary', meaningFa: 'برنامه سفر مشخص', pronunciation: 'spuh-SIF-ik eye-TIN-er-er-ee' },
      { termEn: 'Cultural heritage', meaningFa: 'میراث فرهنگی', pronunciation: 'KUL-cher-ul HER-i-tij' },
      { termEn: 'Family reunion', meaningFa: 'دیدار مجدد با خانواده', pronunciation: 'FAM-uh-lee ree-YOON-yun' }
    ],
    exampleAnswerEn: 'I have always wanted to visit the museums in London and spend the holidays with my brother who lives there.',
    exampleAnswerFa: 'همیشه دوست داشتم از موزه‌های لندن دیدن کنم و تعطیلات را در کنار برادرم که آنجا زندگی می‌کند بگذرانم.',
    coachingTipFa: 'از جملات کلیشه‌ای و حفظ‌شده پرهیز کنید؛ یک یا دو دلیل واقعی و شخصی خود را به سادگی بگویید.'
  },
  {
    id: 'vq_3',
    number: 3,
    categoryLabel: 'Accommodation • محل اقامت',
    countryTags: ['ALL', 'US', 'CA', 'GB', 'AU'],
    questionEn: 'Where will you stay?',
    phoneticEn: 'wair wil yoo stay?',
    meaningFa: 'کجا اقامت خواهید داشت؟',
    whatOfficerIsAskingEn: 'The question asks for your residential address, hotel name, university dormitory, or relative’s home during your stay.',
    whatOfficerIsAskingFa: 'این سوال درباره محل اقامت شما (نام هتل، خوابگاه دانشگاه یا شهر و منزل خویشاوندان) در طول سفر می‌پرسد.',
    vocabulary: [
      { termEn: 'Accommodation', meaningFa: 'محل اقامت / اسکان', pronunciation: 'uh-kom-uh-DAY-shun' },
      { termEn: 'University dormitory', meaningFa: 'خوابگاه دانشگاه', pronunciation: 'yoo-nuh-VER-si-tee DOR-mi-tor-ee' },
      { termEn: 'Hotel reservation', meaningFa: 'رزرو هتل', pronunciation: 'hoh-TEL rez-er-VAY-shun' }
    ],
    exampleAnswerEn: 'I will stay at my uncle’s house in Toronto, Ontario, for the entire trip.',
    exampleAnswerFa: 'من در تمام طول سفر در منزل عمویم/دایی‌ام در شهر تورنتو در استان انتاریو اقامت خواهم داشت.',
    coachingTipFa: 'نام شهر و نوع محل اقامت (هتل، خوابگاه یا منزل اقوام) را بدون تردید و با تلفظ صحیح نام شهر بیان کنید.'
  },
  {
    id: 'vq_4',
    number: 4,
    categoryLabel: 'Duration • مدت اقامت',
    countryTags: ['ALL', 'US', 'CA', 'GB', 'AU'],
    questionEn: 'How long will you stay?',
    phoneticEn: 'how long wil yoo stay?',
    meaningFa: 'چه مدت اقامت خواهید داشت؟',
    whatOfficerIsAskingEn: 'The interviewer is asking for the exact length of your trip or academic program.',
    whatOfficerIsAskingFa: 'مصاحبه‌کننده مدت زمان دقیق سفر یا دوره تحصیلی شما را می‌پرسد.',
    vocabulary: [
      { termEn: 'Duration of stay', meaningFa: 'مدت زمان اقامت', pronunciation: 'doo-RAY-shun ov stay' },
      { termEn: 'Three weeks', meaningFa: 'سه هفته', pronunciation: 'three weeks' },
      { termEn: 'Two-year Master’s program', meaningFa: 'دوره دو ساله کارشناسی ارشد', pronunciation: 'too-yeer MAS-terz PROH-gram' }
    ],
    exampleAnswerEn: 'I plan to stay for three weeks, from May 10th to May 31st.',
    exampleAnswerFa: 'برنامه من اقامت به مدت سه هفته، از دهم تا سی و یکم ماه می است.',
    coachingTipFa: 'عدد و واحد زمانی (Days, Weeks, Months, Years) و تاریخ رفت و برگشت خود را کاملاً منطبق با فرم خود تمرین کنید.'
  },
  {
    id: 'vq_5',
    number: 5,
    categoryLabel: 'Occupation • شغل و حرفه',
    countryTags: ['ALL', 'US', 'CA', 'GB', 'AU'],
    questionEn: 'What do you do for a living?',
    phoneticEn: 'whut doo yoo doo for ah LIV-ing?',
    meaningFa: 'شغل شما چیست؟ (از چه راهی امرار معاش می‌کنید؟)',
    whatOfficerIsAskingEn: 'This idiom means "What is your job or occupation?" Explain your current role, company, and years of experience.',
    whatOfficerIsAskingFa: 'اصطلاح "What do you do for a living" یعنی «شغل شما چیست؟». سمت شغلی، محل کار و سابقه خود را در یک یا دو جمله بیان کنید.',
    vocabulary: [
      { termEn: 'Civil engineer', meaningFa: 'مهندس عمران', pronunciation: 'SIV-ul en-ji-NEER' },
      { termEn: 'Business owner / Merchant', meaningFa: 'صاحب کسب‌وکار / بازرگان', pronunciation: 'BIZ-nis OH-ner / MER-chunt' },
      { termEn: 'Full-time employee', meaningFa: 'کارمند تمام‌وقت', pronunciation: 'ful-tyme em-ploy-EE' }
    ],
    exampleAnswerEn: 'I work as a senior accountant at a private manufacturing company in Tehran, where I have worked for six years.',
    exampleAnswerFa: 'من به عنوان حسابدار ارشد در یک شرکت تولیدی خصوصی در تهران کار می‌کنم و شش سال سابقه کار در آنجا دارم.',
    coachingTipFa: 'برای بیان شغلی که هم‌اکنون دارید از زمان حال ساده (I work as...) یا حال کامل (I have worked there for...) استفاده کنید.'
  },
  {
    id: 'vq_6',
    number: 6,
    categoryLabel: 'Education • سوابق تحصیلی',
    countryTags: ['ALL', 'US', 'CA', 'GB', 'AU'],
    questionEn: 'What is your educational background?',
    phoneticEn: 'whut iz yor ej-oo-KAY-shun-ul BAK-grownd?',
    meaningFa: 'سوابق تحصیلی شما چیست؟',
    whatOfficerIsAskingEn: 'The question asks about your highest degree, major/field of study, and the university you graduated from.',
    whatOfficerIsAskingFa: 'این سوال درباره آخرین مدرک تحصیلی، رشته دانشگاهی و نام دانشگاه محل فارغ‌التحصیلی شماست.',
    vocabulary: [
      { termEn: 'Bachelor’s degree', meaningFa: 'مدرک کارشناسی (لیسانس)', pronunciation: 'BACH-uh-lerz di-GREE' },
      { termEn: 'Master’s degree', meaningFa: 'مدرک کارشناسی ارشد (فوق‌لیسانس)', pronunciation: 'MAS-terz di-GREE' },
      { termEn: 'Major / Field of study', meaningFa: 'رشته تحصیلی', pronunciation: 'MAY-jer / feeld ov STUD-ee' }
    ],
    exampleAnswerEn: 'I hold a Bachelor’s degree in Computer Science from the University of Tehran, which I completed in 2022.',
    exampleAnswerFa: 'من دارای مدرک کارشناسی علوم کامپیوتر از دانشگاه تهران هستم که در سال ۲۰۲۲ آن را به پایان رساندم.',
    coachingTipFa: 'نام دقیق رشته تحصیلی و مقطع خود (Bachelor’s, Master’s, PhD) را به انگلیسی روان تمرین کنید.'
  },
  {
    id: 'vq_7',
    number: 7,
    categoryLabel: 'Financial Support • تامین هزینه‌ها',
    countryTags: ['ALL', 'US', 'CA', 'GB', 'AU'],
    questionEn: 'Who is paying for your trip?',
    phoneticEn: 'hoo iz PAY-ing for yor trip?',
    meaningFa: 'چه کسی هزینه‌های سفر (یا تحصیل) شما را پرداخت می‌کند؟',
    whatOfficerIsAskingEn: 'The officer wants to understand how your travel or tuition expenses are funded (personal savings, parents/family sponsor, or university scholarship).',
    whatOfficerIsAskingFa: 'مصاحبه‌کننده می‌خواهد بداند هزینه‌های سفر یا تحصیل شما از چه منبعی تامین می‌شود (پس‌انداز شخصی، حمایت والدین یا بورسیه دانشگاهی).',
    vocabulary: [
      { termEn: 'Self-funded / Personal savings', meaningFa: 'تامین از پس‌انداز شخصی', pronunciation: 'self-FUN-ded / PER-suh-nul SAY-vingz' },
      { termEn: 'Financial sponsor', meaningFa: 'حامی مالی', pronunciation: 'fy-NAN-shul SPON-ser' },
      { termEn: 'Research assistantship / Scholarship', meaningFa: 'کمک‌هزینه پژوهشی / بورسیه', pronunciation: 'ree-SERCH uh-SIS-tunt-ship' }
    ],
    exampleAnswerEn: 'I am paying for the trip myself using my personal savings and regular income.',
    exampleAnswerFa: 'من هزینه‌های سفر را خودم از محل پس‌انداز شخصی و درآمد ثابتم پرداخت می‌کنم.',
    coachingTipFa: 'اگر والدین حامی مالی شما هستند، شغل و منبع درآمد آن‌ها را هم به طور خلاصه و شفاف به انگلیسی بلد باشید.'
  },
  {
    id: 'vq_8',
    number: 8,
    categoryLabel: 'Family Ties • بستگان در کشور مقصد',
    countryTags: ['ALL', 'US', 'CA', 'GB', 'AU'],
    questionEn: 'Do you have family members in this country?',
    phoneticEn: 'doo yoo hav FAM-uh-lee MEM-berz in this KUN-tree?',
    meaningFa: 'آیا اعضای خانواده یا بستگانی در این کشور دارید؟',
    whatOfficerIsAskingEn: 'This checks your family connections in the destination country. Always answer truthfully and use accurate family relationship words.',
    whatOfficerIsAskingFa: 'این سوال درباره وجود اقوام در کشور مقصد است. همیشه صادقانه پاسخ دهید و نسبت‌های فامیلی را به انگلیسی دقیق بیان کنید.',
    vocabulary: [
      { termEn: 'Immediate family', meaningFa: 'خانواده درجه یک (والدین، همسر، فرزند، خواهر و برادر)', pronunciation: 'i-MEE-dee-it FAM-uh-lee' },
      { termEn: 'Extended relatives', meaningFa: 'بستگان درجه دو (عمو، دایی، خاله، عمه، پسرعمو...)', pronunciation: 'ik-STEN-ded REL-uh-tivz' },
      { termEn: 'Permanent resident / Citizen', meaningFa: 'مقیم دائم / شهروند', pronunciation: 'PER-muh-nunt REZ-i-dunt' }
    ],
    exampleAnswerEn: 'Yes, my older sister lives in Vancouver as a permanent resident, and she works as a pharmacist.',
    exampleAnswerFa: 'بله، خواهر بزرگ‌ترم به عنوان مقیم دائم در ونکوور زندگی می‌کند و داروساز است.',
    coachingTipFa: 'نسبت‌های فامیلی (Uncle, Aunt, Cousin, Niece, Nephew, Brother-in-law) را اشتباه به کار نبرید.'
  },
  {
    id: 'vq_9',
    number: 9,
    categoryLabel: 'Travel History • سوابق سفر خارجی',
    countryTags: ['ALL', 'US', 'CA', 'GB', 'AU'],
    questionEn: 'Have you traveled abroad before?',
    phoneticEn: 'hav yoo TRAV-uld uh-BRAWD bi-FOR?',
    meaningFa: 'آیا قبلاً به خارج از کشور سفر کرده‌اید؟',
    whatOfficerIsAskingEn: 'This present-perfect question asks about your previous international travel history.',
    whatOfficerIsAskingFa: 'این پرسش (با ساختار حال کامل) درباره سفرهای خارجی قبلی شما، کشورها و سال سفر می‌پرسد.',
    vocabulary: [
      { termEn: 'Travel abroad / Overseas', meaningFa: 'سفر به خارج از کشور', pronunciation: 'TRAV-ul uh-BRAWD' },
      { termEn: 'Business trip', meaningFa: 'سفر کاری', pronunciation: 'BIZ-nis trip' },
      { termEn: 'Returned on time', meaningFa: 'بازگشت در موعد مقرر', pronunciation: 'ri-TURND on tyme' }
    ],
    exampleAnswerEn: 'Yes, I have traveled to Turkey and the United Arab Emirates for tourism in 2023 and 2024.',
    exampleAnswerFa: 'بله، من در سال‌های ۲۰۲۳ و ۲۰۲۴ برای گردشگری به ترکیه و امارات متحده عربی سفر کرده‌ام.',
    coachingTipFa: 'اگر قبلاً سفر خارجی نداشته‌اید، با آرامش و صداقت بگویید: "No, this will be my first international trip."'
  },
  {
    id: 'vq_10',
    number: 10,
    categoryLabel: 'Return Plans • برنامه و زمان بازگشت',
    countryTags: ['ALL', 'US', 'CA', 'GB', 'AU'],
    questionEn: 'When do you plan to return?',
    phoneticEn: 'wen doo yoo plan too ri-TURN?',
    meaningFa: 'چه زمانی قصد بازگشت دارید؟',
    whatOfficerIsAskingEn: 'The interviewer wants to know your planned return date and why you need to return on schedule (job, university, family responsibilities).',
    whatOfficerIsAskingFa: 'مصاحبه‌کننده می‌خواهد تاریخ برنامه‌ریزی‌شده بازگشت و دلیل برگشت به موقع شما (تعهد کاری، دانشگاه یا خانواده) را بداند.',
    vocabulary: [
      { termEn: 'Return ticket', meaningFa: 'بلیط بازگشت', pronunciation: 'ri-TURN TIK-it' },
      { termEn: 'Approved leave of absence', meaningFa: 'مرخصی تاییدشده کاری', pronunciation: 'uh-PROOVD leev ov AB-suns' },
      { termEn: 'Resume my job', meaningFa: 'ادامه دادن کارم پس از بازگشت', pronunciation: 'ri-ZOOM mye job' }
    ],
    exampleAnswerEn: 'I plan to return on June 15th because my approved annual leave ends and I must resume my work.',
    exampleAnswerFa: 'من قصد دارم در تاریخ ۱۵ ژوئن بازگردم زیرا مرخصی سالانه تاییدشده‌ام تمام می‌شود و باید به کارم برگردم.',
    coachingTipFa: 'تاریخ بازگشت را همراه با دلیل واقعی بازگشت خود (مانند اتمام مرخصی کاری یا شروع ترم) بیان کنید.'
  },
  {
    id: 'vq_11',
    number: 11,
    categoryLabel: 'Academic Choice • دلیل انتخاب دانشگاه و رشته',
    countryTags: ['ALL', 'US', 'CA', 'GB', 'AU'],
    questionEn: 'Why did you choose this university/program?',
    phoneticEn: 'wye did yoo chooz this yoo-nuh-VER-si-tee or PROH-gram?',
    meaningFa: 'چرا این دانشگاه یا برنامه تحصیلی را انتخاب کردید؟',
    whatOfficerIsAskingEn: 'For student applicants, this checks whether you genuinely researched your curriculum, faculty, and how the program fits your background.',
    whatOfficerIsAskingFa: 'برای متقاضیان تحصیلی، این سوال بررسی می‌کند که آیا واقعاً درباره دروس، اساتید و ارتباط این رشته با سوابق خود تحقیق کرده‌اید.',
    vocabulary: [
      { termEn: 'Specialized curriculum', meaningFa: 'برنامه درسی تخصصی', pronunciation: 'SPESH-uh-lyzd kuh-RIK-yuh-lum' },
      { termEn: 'Research laboratory', meaningFa: 'آزمایشگاه پژوهشی', pronunciation: 'ree-SERCH LAB-ruh-tor-ee' },
      { termEn: 'Academic advisor / Faculty', meaningFa: 'استاد راهنما / هیئت علمی', pronunciation: 'ak-uh-DEM-ik ad-VYE-zer' }
    ],
    exampleAnswerEn: 'I chose this program because of its strong curriculum in renewable energy and Professor Smith’s research lab, which matches my bachelor’s thesis.',
    exampleAnswerFa: 'من این دوره را به خاطر برنامه درسی قوی آن در انرژی‌های تجدیدپذیر و آزمایشگاه تحقیقاتی پروفسور اسمیت که با پایان‌نامه کارشناسی من همخوانی دارد انتخاب کردم.',
    coachingTipFa: 'به جای گفتن جملات کلی مثل «دانشگاه رنکینگ خوبی دارد»، به یک درس، گرایش یا آزمایشگاه مشخص در رشته خود اشاره کنید.'
  },
  {
    id: 'vq_12',
    number: 12,
    categoryLabel: 'Post-Graduation Plans • برنامه پس از فارغ‌التحصیلی',
    countryTags: ['ALL', 'US', 'CA', 'GB', 'AU'],
    questionEn: 'What are your plans after graduation?',
    phoneticEn: 'whut ar yor planz AF-ter graj-oo-AY-shun?',
    meaningFa: 'برنامه شما پس از فارغ‌التحصیلی چیست؟',
    whatOfficerIsAskingEn: 'The interviewer asks how you will use the skills gained from your degree in your future career path.',
    whatOfficerIsAskingFa: 'مصاحبه‌کننده می‌پرسد پس از اتمام درس، چگونه از دانش و مهارت‌های کسب‌شده در مسیر شغلی آینده خود استفاده خواهید کرد.',
    vocabulary: [
      { termEn: 'After graduation', meaningFa: 'پس از فارغ‌التحصیلی', pronunciation: 'AF-ter graj-oo-AY-shun' },
      { termEn: 'Career advancement', meaningFa: 'پیشرفت شغلی', pronunciation: 'kuh-REER ad-VANS-munt' },
      { termEn: 'Industry expertise', meaningFa: 'تخصص صنعتی/حرفه‌ای', pronunciation: 'IN-duh-stree ek-sper-TEEZ' }
    ],
    exampleAnswerEn: 'After graduation, I plan to return and apply my advanced data analytics skills as a project manager in the healthcare sector.',
    exampleAnswerFa: 'پس از فارغ‌التحصیلی، قصد دارم بازگردم و از مهارت‌های پیشرفته تحلیل داده به عنوان مدیر پروژه در بخش سلامت استفاده کنم.',
    coachingTipFa: 'هدف شغلی واقع‌بینانه و مرتبط با رشته تحصیلی خود را به صورت شفاف و با افعال زمان آینده (I plan to...) بیان کنید.'
  }
];

export const COMMON_INTERVIEW_MISTAKES: CommonInterviewMistake[] = [
  {
    id: 'cm_1',
    titleEn: '1. Giving Unnecessarily Long Answers',
    titleFa: '۱. دادن پاسخ‌های طولانی و حاشیه‌روی غیرضروری',
    whyItHappensFa: 'اضطراب باعث می‌شود متقاضی به جای پاسخ مستقیم، داستان طولانی تعریف کند که وقت مصاحبه را می‌گیرد.',
    weakExampleEn: 'Well, since I was a child I loved traveling and my friend told me about New York five years ago so I decided...',
    strongTruthfulExampleEn: 'I am visiting New York for ten days of tourism and sightseeing during my annual vacation.',
    strongTruthfulExampleFa: 'من در تعطیلات سالانه‌ام برای ده روز گردشگری و بازدید از نیویورک سفر می‌کنم.'
  },
  {
    id: 'cm_2',
    titleEn: '2. Misunderstanding the Question',
    titleFa: '۲. متوجه نشدن دقیق سوال و حدس زدن پاسخ',
    whyItHappensFa: 'وقتی متقاضی کلمه‌ای را نمی‌شنود، به جای درخواست محترمانه برای تکرار، پاسخ اشتباه می‌دهد.',
    weakExampleEn: '(Guessing and answering something unrelated when you did not hear the question clearly)',
    strongTruthfulExampleEn: 'Pardon me, Officer, could you please repeat the question?',
    strongTruthfulExampleFa: 'عذر می‌خواهم، آیا ممکن است لطفاً سوال را تکرار بفرمایید؟'
  },
  {
    id: 'cm_3',
    titleEn: '3. Memorizing Unnatural Robotic Answers',
    titleFa: '۳. حفظ کردن پاسخ‌های غیرطبیعی و کتابی',
    whyItHappensFa: 'حفظ کردن متن‌های آماده اینترنتی باعث می‌شود لحن صحبت مصنوعی شود و در صورت تغییر کوچک در سوال، فرد تمرکزش را از دست بدهد.',
    weakExampleEn: 'Esteemed consular officer, it is my paramount aspiration to matriculate at this prestigious institution...',
    strongTruthfulExampleEn: 'I chose this university because its robotics lab matches my three years of work experience.',
    strongTruthfulExampleFa: 'من این دانشگاه را انتخاب کردم چون آزمایشگاه رباتیک آن با سه سال سابقه کاری من همخوانی دارد.'
  },
  {
    id: 'cm_4',
    titleEn: '4. Using Incorrect Verb Tense',
    titleFa: '۴. استفاده از زمان فعل نادرست (گذشته، حال و آینده)',
    whyItHappensFa: 'اشتباه گرفتن زمان گذشته (سفرهای قبلی)، حال (شغل فعلی) و آینده (برنامه سفر پیش رو) باعث ابهام جدی می‌شود.',
    weakExampleEn: 'I go to Canada last year and now I worked in a bank.',
    strongTruthfulExampleEn: 'I visited Turkey last year, and I currently work at a bank.',
    strongTruthfulExampleFa: 'من پارسال از ترکیه دیدن کردم و در حال حاضر در یک بانک کار می‌کنم.'
  },
  {
    id: 'cm_5',
    titleEn: '5. Confusing Dates and Numbers',
    titleFa: '۵. اشتباه گفتن تاریخ‌ها، ماه‌های میلادی و اعداد',
    whyItHappensFa: 'تبدیل نکردن تاریخ‌های شمسی به میلادی (مثلاً سال فارغ‌التحصیلی، شروع کار یا تاریخ پرواز) پیش از جلسه.',
    weakExampleEn: 'I graduated in 1399... sorry, I mean 2019 or 2021.',
    strongTruthfulExampleEn: 'I graduated in September 2020, and my program starts in September 2026.',
    strongTruthfulExampleFa: 'من در سپتامبر ۲۰۲۰ فارغ‌التحصیل شدم و دوره من در سپتامبر ۲۰۲۶ آغاز می‌شود.'
  },
  {
    id: 'cm_6',
    titleEn: '6. Confusing Family Relationship Terms',
    titleFa: '۶. اشتباه گرفتن واژگان نسبت‌های خانوادگی در انگلیسی',
    whyItHappensFa: 'در فارسی برای عمو، دایی، خاله و عمه واژگان جدا داریم اما در انگلیسی باید Uncle, Aunt, Cousin, Nephew, Niece را دقیق به کار برد.',
    weakExampleEn: 'I will stay with my mother’s sister... my uncle.',
    strongTruthfulExampleEn: 'I will stay with my maternal aunt and my cousin in Sydney.',
    strongTruthfulExampleFa: 'من نزد خاله‌ام و فرزند خاله‌ام در سیدنی اقامت خواهم داشت.'
  },
  {
    id: 'cm_7',
    titleEn: '7. Unclear Pronunciation of Key Words',
    titleFa: '۷. تلفظ نامفهوم کلمات کلیدی (رشته تحصیلی، شهر یا شغل)',
    whyItHappensFa: 'تلفظ نادرست نام رشته، دانشگاه یا شهر مقصد باعث می‌شود شنونده متوجه منظور شما نشود.',
    weakExampleEn: 'Mumbling the name of your major or city very quickly.',
    strongTruthfulExampleEn: 'Speak at a steady, calm pace and articulate key nouns clearly: "Mechanical Engineering", "Vancouver".',
    strongTruthfulExampleFa: 'با سرعت آرام و شمرده صحبت کنید و کلمات کلیدی مثل نام رشته و شهر را واضح ادا کنید.'
  },
  {
    id: 'cm_8',
    titleEn: '8. Answering a Different Question',
    titleFa: '۸. پاسخ دادن به سوالی غیر از آنچه پرسیده شده است',
    whyItHappensFa: 'وقتی متقاضی بین "Where will you stay?" (کجا می‌مانید) و "How long will you stay?" (چند وقت می‌مانید) دقت نمی‌کند.',
    weakExampleEn: 'Q: Where will you stay? — A: For two weeks.',
    strongTruthfulExampleEn: 'Q: Where will you stay? — A: At the Hilton Hotel in downtown Boston.',
    strongTruthfulExampleFa: 'سوال: کجا اقامت خواهید داشت؟ — پاسخ صحیح: در هتل هیلتون در مرکز شهر بوستون.'
  },
  {
    id: 'cm_9',
    titleEn: '9. Being Unable to Explain Basic Personal Information',
    titleFa: '۹. ناتوانی در توضیح اطلاعات پایه شغلی و شخصی به انگلیسی ساده',
    whyItHappensFa: 'فرد عنوان شغلی خود را می‌داند اما اگر بپرسند "What are your daily duties?" نمی‌تواند کار روزانه خود را در یک جمله توضیح دهد.',
    weakExampleEn: 'I am manager... I just do office work.',
    strongTruthfulExampleEn: 'I manage a team of five sales specialists and oversee client contracts.',
    strongTruthfulExampleFa: 'من تیمی پنج نفره از کارشناسان فروش را مدیریت می‌کنم و بر قراردادهای مشتریان نظارت دارم.'
  }
];

export const EmbassyVisaEnglish: React.FC<{ onEarnReward?: (pts: number) => void }> = ({ onEarnReward }) => {
  const [activeSubTab, setActiveSubTab] = useState<'questions' | 'listening_loop' | 'mistakes' | 'countries'>('questions');
  const [selectedCountry, setSelectedCountry] = useState<VisaCountryCode>('ALL');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('vq_1');
  const [userPracticeInputs, setUserPracticeInputs] = useState<Record<string, string>>({});
  const [practiceFeedback, setPracticeFeedback] = useState<Record<string, string>>({});
  const [listeningSideId, setListeningSideId] = useState<string | null>(null);
  const [slowAudioMode, setSlowAudioMode] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  const filteredQuestions = COMMON_PRACTICE_QUESTIONS.filter((q) =>
    selectedCountry === 'ALL' ? true : q.countryTags.includes(selectedCountry)
  );

  const activeQuestion =
    COMMON_PRACTICE_QUESTIONS.find((q) => q.id === selectedQuestionId) || COMMON_PRACTICE_QUESTIONS[0];

  const playbackRate = slowAudioMode ? 0.68 : 0.88;

  const handleVoicePractice = (questionId: string) => {
    sound.playClick();
    if (listeningSideId === questionId) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setListeningSideId(null);
      return;
    }

    const SpeechRec =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setPracticeFeedback((prev) => ({
        ...prev,
        [questionId]:
          'میکروفون مرورگر در این دستگاه در دسترس نیست؛ می‌توانید پاسخ تمرینی خود را در کادر متنی تایپ کنید و دکمه بررسی را بزنید.'
      }));
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.onstart = () => setListeningSideId(questionId);
      rec.onresult = (ev: any) => {
        const transcript = ev.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setUserPracticeInputs((prev) => ({ ...prev, [questionId]: transcript }));
          evaluatePracticeAnswer(questionId, transcript);
        }
      };
      rec.onerror = () => setListeningSideId(null);
      rec.onend = () => setListeningSideId(null);
      recognitionRef.current = rec;
      rec.start();
    } catch {
      setListeningSideId(null);
    }
  };

  const evaluatePracticeAnswer = (questionId: string, answerText: string) => {
    const clean = answerText.trim();
    if (!clean) {
      setPracticeFeedback((prev) => ({
        ...prev,
        [questionId]: 'لطفاً ابتدا پاسخ تمرینی خود را به انگلیسی بنویسید یا با میکروفون بیان کنید.'
      }));
      return;
    }

    const words = clean.split(/\s+/).filter(Boolean);
    sound.playCoin();
    if (onEarnReward) onEarnReward(15);

    if (words.length < 4) {
      setPracticeFeedback((prev) => ({
        ...prev,
        [questionId]:
          '💡 بازخورد زبانی: پاسخ شما بسیار کوتاه است. سعی کنید یک جمله کامل و طبیعی با فاعل و فعل (مثلاً "I plan to..." یا "I work as...") بسازید.'
      }));
      return;
    }

    if (words.length > 42) {
      setPracticeFeedback((prev) => ({
        ...prev,
        [questionId]:
          '💡 بازخورد زبانی: پاسخ شما خوب است اما کمی طولانی شده است. در مصاحبه، پاسخ‌های ۱ تا ۲ جمله‌ای (حدود ۱۰ تا ۲۵ کلمه) واضح‌تر و موثرتر هستند.'
      }));
      return;
    }

    setPracticeFeedback((prev) => ({
      ...prev,
      [questionId]:
        '✅ عالی! طول جمله شما متناسب، روشن و در قالب یک پاسخ محترمانه ۱ تا ۲ جمله‌ای است. اکنون روی دکمه «🔊 شنیدن صدای پاسخ خودم» کلیک کنید تا تلفظ آن را هم بشنوید.'
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Mandatory Educational Scope Notice */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border-2 border-indigo-400/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-500/20 border border-indigo-300/40 text-indigo-200 text-xs font-black">
            <span>🛂 EMBASSY & VISA INTERVIEW ENGLISH</span>
            <span>•</span>
            <span>آموزش زبان انگلیسی برای مصاحبه سفارت و ویزا</span>
          </div>

          {/* Slow Audio Accessibility Toggle */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setSlowAudioMode(!slowAudioMode);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all ${
              slowAudioMode
                ? 'bg-amber-400 text-slate-950 border-amber-200'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            🐢 {slowAudioMode ? 'سرعت پخش آهسته و شمرده: فعال (0.68x)' : 'سرعت پخش عادی (کلیک برای پخش شمرده)'}
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
          Practice English for embassy and visa interviews.
        </h2>
        <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
          تمرین تخصصی مهارت شنیدن (Listening)، درک دقیق سوال و بیان پاسخ‌های <strong>روشن، کوتاه، صادقانه و به انگلیسی طبیعی (Clear, Concise, Truthful & Natural English)</strong> برای مصاحبه‌های سفارت، ویزا، تحصیلی و اقامتی.
        </p>

        {/* Ethical & Educational Scope Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-300/50 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-100 space-y-1 leading-relaxed">
            <p className="font-black text-amber-300">
              ⚖️ اطلاعیه آموزشی (Language Education & Interview Practice Only):
            </p>
            <p>
              این بخش صرفاً جهت <strong>آموزش زبان انگلیسی و تمرین مکالمه مصاحبه</strong> طراحی شده است و به هیچ عنوان مشاوره حقوقی یا مهاجرتی ارائه نمی‌دهد و هیچ تضمینی برای صدور ویزا یا اقامت نیست. همیشه در مصاحبه‌ها <strong>صادقانه</strong> پاسخ دهید و برای قوانین و رویه‌های رسمی، حتماً به <strong>منابع رسمی دولتی فعلی هر کشور (Check the current official government source)</strong> مراجعه فرمایید.
            </p>
          </div>
        </div>
      </div>

      {/* Country Organization Selector (US, CA, GB, AU) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-indigo-700" />
            <span>تمرکز لهجه و مثال‌های کاربردی بر اساس کشور (رویه هر کشور مستقل است — منبع رسمی دولتی را بررسی کنید):</span>
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {COUNTRY_PROFILES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedCountry(c.code);
              }}
              className={`p-3 rounded-2xl border text-right transition-all ${
                selectedCountry === c.code
                  ? 'bg-indigo-900 text-white border-indigo-700 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <div className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                <span>{c.flag}</span>
                <span>{c.nameFa}</span>
              </div>
              <div
                className={`text-[11px] mt-0.5 font-mono ${
                  selectedCountry === c.code ? 'text-indigo-200' : 'text-slate-500'
                }`}
                dir="ltr"
              >
                {c.nameEn}
              </div>
            </button>
          ))}
        </div>
        {selectedCountry !== 'ALL' && (
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              <strong>نکته ارتباطی ({COUNTRY_PROFILES.find((c) => c.code === selectedCountry)?.nameEn}):</strong>{' '}
              {COUNTRY_PROFILES.find((c) => c.code === selectedCountry)?.communicationFocusFa}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-[11px] font-bold text-indigo-900 shrink-0" dir="ltr">
              Check the current official government source
            </span>
          </div>
        )}
      </div>

      {/* Sub-Navigation for Training Structure (A/B/C: Questions & Practice | E: Listening Loop | D: Common Mistakes | Countries) */}
      <div className="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveSubTab('questions');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'questions'
              ? 'bg-indigo-800 text-white'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>۱. سوالات متداول تمرینی و ساخت پاسخ (Common Practice Questions)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveSubTab('listening_loop');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'listening_loop'
              ? 'bg-indigo-800 text-white'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>۲. کارگاه تمرین شنیداری (Hear → Understand → Answer → Repeat)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveSubTab('mistakes');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'mistakes'
              ? 'bg-indigo-800 text-white'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>۳. ۹ اشتباه رایج زبانی در مصاحبه (Common Mistakes)</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: COMMON PRACTICE QUESTIONS + UNDERSTANDING + ANSWER PRACTICE    */}
      {/* ===================================================================== */}
      {activeSubTab === 'questions' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-100 px-4 py-2.5 rounded-2xl">
            <span className="text-xs font-black text-slate-700">
              📋 Common practice questions (سوالات تمرینی رایج برای تقویت مهارت زبانی — تضمین‌شده نیستند):
            </span>
            <span className="text-xs font-bold text-indigo-800">
              ۱۲ سوال استاندارد با تحلیل کامل + تمرین صوتی و متنی
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredQuestions.map((q) => {
              const userInput = userPracticeInputs[q.id] || '';
              const feedback = practiceFeedback[q.id];
              const isListening = listeningSideId === q.id;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Question Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-900 font-black text-xs">
                        Practice Question #{q.number} • {q.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => speakEnglish(q.questionEn, playbackRate)}
                          className="px-3 py-1.5 rounded-xl bg-indigo-800 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>🔊 Hear Question</span>
                        </button>
                      </div>
                    </div>

                    {/* 1. English Question & 2. Persian Meaning */}
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-black text-slate-950" dir="ltr">
                        "{q.questionEn}"
                      </h3>
                      <p className="text-xs font-mono text-indigo-700" dir="ltr">
                        Pronunciation: [{q.phoneticEn}]
                      </p>
                      <p className="text-sm sm:text-base font-black text-emerald-900 pt-1">
                        🇮🇷 معنی سوال: «{q.meaningFa}»
                      </p>
                    </div>

                    {/* 4. Explanation of What the Question is Asking */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                      <span className="font-black text-slate-800 block">
                        🎯 منظور و هدف این سوال (What the question is asking):
                      </span>
                      <p className="text-slate-700 leading-relaxed">{q.whatOfficerIsAskingFa}</p>
                      <p className="text-slate-500 italic" dir="ltr">{q.whatOfficerIsAskingEn}</p>
                    </div>

                    {/* 3. Important Vocabulary */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-black text-slate-700 block">
                        🔑 واژگان کلیدی برای پاسخ (Important Vocabulary):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {q.vocabulary.map((v, vIdx) => (
                          <button
                            key={vIdx}
                            type="button"
                            onClick={() => speakEnglish(v.termEn, playbackRate)}
                            className="p-2.5 rounded-xl bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200 text-left transition-all"
                            dir="ltr"
                          >
                            <div className="text-xs font-black text-indigo-950 flex items-center justify-between">
                              <span>{v.termEn}</span>
                              <Volume2 className="w-3 h-3 text-indigo-700 shrink-0" />
                            </div>
                            <div className="text-[10px] font-mono text-slate-500">{v.pronunciation}</div>
                            <div className="text-[11px] font-bold text-emerald-900 mt-0.5" dir="rtl">
                              {v.meaningFa}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 5. Example Answer (Clear, Concise, Truthful, Natural) */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-950">
                          ✅ نمونه پاسخ استاندارد (Clear, Concise & Truthful Example):
                        </span>
                        <button
                          type="button"
                          onClick={() => speakEnglish(q.exampleAnswerEn, playbackRate)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>🔊 Listen</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-slate-900" dir="ltr">
                        "{q.exampleAnswerEn}"
                      </p>
                      <p className="text-xs text-emerald-950 font-bold">
                        ترجمه نمونه: «{q.exampleAnswerFa}»
                      </p>
                      <p className="text-[11px] text-amber-900 bg-amber-100/70 px-2.5 py-1.5 rounded-xl font-bold">
                        💡 نکته پاسخ‌دهی: {q.coachingTipFa}
                      </p>
                    </div>
                  </div>

                  {/* 6. User Practice (Truthful Personal Answer Input + Voice + TTS Playback) */}
                  <div className="pt-3 border-t border-slate-200 space-y-2.5">
                    <label className="text-xs font-black text-slate-800 block">
                      ✍️ تمرین شخصی شما (پاسخ واقعی، کوتاه و صادقانه خودتان را به انگلیسی بنویسید یا بگویید):
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2" dir="ltr">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) =>
                          setUserPracticeInputs((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        placeholder="Type your truthful, concise English answer here..."
                        className="flex-1 px-3.5 py-2 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-bold text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => handleVoicePractice(q.id)}
                        className={`px-3.5 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 ${
                          isListening
                            ? 'bg-rose-600 text-white animate-pulse'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        <span>{isListening ? 'Listening...' : '🎙️ Speak'}</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => evaluatePracticeAnswer(q.id, userInput)}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-black flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>بررسی وضوح و اختصار پاسخ</span>
                      </button>
                      {userInput.trim() && (
                        <button
                          type="button"
                          onClick={() => speakEnglish(userInput, playbackRate)}
                          className="px-3.5 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-black flex items-center gap-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>🔊 شنیدن تلفظ پاسخ خودم</span>
                        </button>
                      )}
                    </div>

                    {feedback && (
                      <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-950">
                        {feedback}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: INTERACTIVE LISTENING LOOP (HEAR → UNDERSTAND → ANSWER → REPEAT)*/}
      {/* ===================================================================== */}
      {activeSubTab === 'listening_loop' && (
        <div className="bg-white rounded-3xl border-2 border-indigo-200 p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black text-indigo-700 block">
                🎧 E) LISTENING PRACTICE WORKFLOW
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                چرخه ۵ مرحله‌ای: Hear → Understand → Answer → Practice → Repeat
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedQuestionId}
                onChange={(e) => setSelectedQuestionId(e.target.value)}
                className="px-3.5 py-2 rounded-xl border-2 border-indigo-200 text-xs sm:text-sm font-black text-slate-900 bg-indigo-50/40"
              >
                {COMMON_PRACTICE_QUESTIONS.map((q) => (
                  <option key={q.id} value={q.id}>
                    #{q.number}: {q.questionEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Step 1: Hear */}
            <div className="p-4 rounded-2xl bg-indigo-950 text-white space-y-2.5">
              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-400 text-slate-950 font-black text-xs">
                1. HEAR (شنیدن)
              </span>
              <p className="text-xs text-indigo-200">
                ابتدا بدون نگاه کردن به متن، سوال افسر مصاحبه را با صدای عادی یا شمرده بشنوید:
              </p>
              <button
                type="button"
                onClick={() => speakEnglish(activeQuestion.questionEn, 0.88)}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 پخش با سرعت عادی</span>
              </button>
              <button
                type="button"
                onClick={() => speakEnglish(activeQuestion.questionEn, 0.65)}
                className="w-full py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🐢 پخش شمرده (Slow)</span>
              </button>
            </div>

            {/* Step 2: Understand */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-900 font-black text-xs">
                2. UNDERSTAND (درک سوال)
              </span>
              <p className="text-xs font-black text-slate-900" dir="ltr">
                "{activeQuestion.questionEn}"
              </p>
              <p className="text-xs font-bold text-emerald-900">
                معنی: «{activeQuestion.meaningFa}»
              </p>
              <button
                type="button"
                onClick={() => speakPersian(activeQuestion.meaningFa, 0.88)}
                className="w-full py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold"
              >
                🔊 شنیدن معنی فارسی
              </button>
            </div>

            {/* Step 3: Answer */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 font-black text-xs">
                3. ANSWER (الگوی پاسخ)
              </span>
              <p className="text-xs font-black text-slate-900" dir="ltr">
                "{activeQuestion.exampleAnswerEn}"
              </p>
              <p className="text-[11px] text-slate-600">
                {activeQuestion.exampleAnswerFa}
              </p>
              <button
                type="button"
                onClick={() => speakEnglish(activeQuestion.exampleAnswerEn, playbackRate)}
                className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                🔊 شنیدن پاسخ نمونه
              </button>
            </div>

            {/* Step 4: Practice */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-950 font-black text-xs">
                4. PRACTICE (تمرین شما)
              </span>
              <p className="text-xs text-slate-600">
                با صدای بلند و رسا پاسخ صادقانه خودتان را ضبط یا تایپ کنید:
              </p>
              <button
                type="button"
                onClick={() => handleVoicePractice(activeQuestion.id)}
                className="w-full py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Mic className="w-4 h-4" />
                <span>🎙️ ضبط پاسخ با میکروفون</span>
              </button>
            </div>

            {/* Step 5: Repeat */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-teal-100 text-teal-950 font-black text-xs">
                5. REPEAT (تکرار و تسلط)
              </span>
              <p className="text-xs text-slate-600">
                سوال بعدی را انتخاب کنید یا همین سوال را بدون نگاه کردن به متن تکرار نمایید:
              </p>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  const idx = COMMON_PRACTICE_QUESTIONS.findIndex((q) => q.id === activeQuestion.id);
                  const next =
                    COMMON_PRACTICE_QUESTIONS[(idx + 1) % COMMON_PRACTICE_QUESTIONS.length];
                  setSelectedQuestionId(next.id);
                  speakEnglish(next.questionEn, playbackRate);
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-black text-xs flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>سوال بعدی و پخش خودکار</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: COMMON MISTAKES IN EMBASSY & VISA INTERVIEWS                   */}
      {/* ===================================================================== */}
      {activeSubTab === 'mistakes' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 space-y-1">
            <h3 className="text-base sm:text-lg font-black text-amber-950">
              ⚠️ ۹ اشتباه رایج زبانی و ارتباطی در مصاحبه‌های سفارت و ویزا (Common Mistakes)
            </h3>
            <p className="text-xs text-amber-900">
              هدف از شناخت این خطاها، بیان <strong>پاسخ‌های روشن، مختصر، صادقانه، مرتبط و به انگلیسی طبیعی (Clear, Concise, Truthful, Relevant & Natural English)</strong> است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMON_INTERVIEW_MISTAKES.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <h4 className="font-black text-sm text-rose-900" dir="ltr">
                    {m.titleEn}
                  </h4>
                  <p className="text-sm font-black text-slate-900">{m.titleFa}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.whyItHappensFa}</p>

                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-1" dir="ltr">
                    <span className="font-black text-rose-800 block">❌ Weak / Problematic:</span>
                    <p className="text-slate-800 italic">"{m.weakExampleEn}"</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1" dir="ltr">
                    <span className="font-black text-emerald-800 block">
                      ✅ Clear, Concise & Truthful English:
                    </span>
                    <p className="font-bold text-slate-900">"{m.strongTruthfulExampleEn}"</p>
                    <p className="text-emerald-900 font-bold pt-1" dir="rtl">
                      «{m.strongTruthfulExampleFa}»
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => speakEnglish(m.strongTruthfulExampleEn, playbackRate)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 شنیدن فرم صحیح انگلیسی</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
