export type LanguageProficiencyTier = 
  | 'beginner'          // A1-A2 مبتدی
  | 'intermediate'      // B1 اینترمدیت
  | 'upper_intermediate'// B2 آپر اینترمدیت
  | 'professional'      // C1 حرفه‌ای
  | 'grandmaster';      // C2 فوق حرفه‌ای (استاد اعظم)

export interface HierarchyLevelInfo {
  tier: LanguageProficiencyTier;
  titleFa: string;
  titleEn: string;
  badge: string;
  canTeachTier: LanguageProficiencyTier | null;
  targetMenteesNameFa: string;
  minPlacementScore: number; // 0 to 100
  canHostRoom: boolean;
  teachingSalaryLingous: number; // Salary earned per teaching session
  challengeRiskThreshold: number; // 3 failed challenges = demotion
}

export const PROFICIENCY_TIERS: Record<LanguageProficiencyTier, HierarchyLevelInfo> = {
  beginner: {
    tier: 'beginner',
    titleFa: 'شاگرد مبتدی (Learner)',
    titleEn: 'Beginner Learner',
    badge: '🌱',
    canTeachTier: null,
    targetMenteesNameFa: 'هنوز مجاز به تدریس نیست (نیازمند کسب مهارت)',
    minPlacementScore: 0,
    canHostRoom: false,
    teachingSalaryLingous: 0,
    challengeRiskThreshold: 0
  },
  intermediate: {
    tier: 'intermediate',
    titleFa: 'استادیار مبتدیان (مرحله متوسط / Intermediate)',
    titleEn: 'Intermediate Mentor',
    badge: '🥋',
    canTeachTier: 'beginner',
    targetMenteesNameFa: 'آموزش به افراد مبتدی',
    minPlacementScore: 40,
    canHostRoom: true,
    teachingSalaryLingous: 30,
    challengeRiskThreshold: 3
  },
  upper_intermediate: {
    tier: 'upper_intermediate',
    titleFa: 'استاد مرحله متوسط (آپر اینترمدیت / Upper-Intermediate)',
    titleEn: 'Upper-Intermediate Master',
    badge: '⚔️',
    canTeachTier: 'intermediate',
    targetMenteesNameFa: 'آموزش به افراد اینترمدیت',
    minPlacementScore: 65,
    canHostRoom: true,
    teachingSalaryLingous: 50,
    challengeRiskThreshold: 3
  },
  professional: {
    tier: 'professional',
    titleFa: 'استاد حرفه‌ای (Professional Master)',
    titleEn: 'Professional Master',
    badge: '🏅',
    canTeachTier: 'upper_intermediate',
    targetMenteesNameFa: 'آموزش به افراد آپر-اینترمدیت',
    minPlacementScore: 85,
    canHostRoom: true,
    teachingSalaryLingous: 80,
    challengeRiskThreshold: 3
  },
  grandmaster: {
    tier: 'grandmaster',
    titleFa: 'استاد فوق‌حرفه‌ای و مربی ارشد (Grandmaster)',
    titleEn: 'Grandmaster Educator',
    badge: '👑',
    canTeachTier: 'professional',
    targetMenteesNameFa: 'آموزش به افراد حرفه‌ای و نظارت بر کل سیستم تدریس',
    minPlacementScore: 95,
    canHostRoom: true,
    teachingSalaryLingous: 120,
    challengeRiskThreshold: 3
  }
};

export interface TeachingRoom {
  id: string;
  hostName: string;
  hostTier: LanguageProficiencyTier;
  targetTier: LanguageProficiencyTier;
  title: string;
  topicFa: string;
  activeApprenticesCount: number;
  maxCapacity: number;
  currentLessonPhrase: string;
  currentLessonPhonetic: string;
  pedagogicalFocus: string; // روش تدریس: مثلاً اصلاح لحن، ریتم شادوینگ، تکنیک سوال معکوس
  isLive: boolean;
  consecutiveDefeats: number; // 0, 1, 2, 3
}

export interface StudentChallengeQuestion {
  id: string;
  askedByStudent: string;
  studentTier: LanguageProficiencyTier;
  questionText: string;
  options: { text: string; isCorrectTeachingPedagogy: boolean; explanation: string }[];
  context: string;
}

export interface PlacementTestQuestion {
  id: string;
  tierTarget: LanguageProficiencyTier;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const PLACEMENT_TEST_QUESTIONS: PlacementTestQuestion[] = [
  {
    id: 'pt_1',
    tierTarget: 'beginner',
    question: 'در مکالمه روزمره هنگام ورود به کافه، کدام عبارت برای شروع محترمانه‌تر است؟',
    options: [
      'Give me coffee fast',
      'Could I please have a cappuccino?',
      'I want drink now',
      'Where is food?'
    ],
    correctIndex: 1,
    explanation: 'استفاده از Could I please have... الگوی استاندارد درخواست محترمانه است.'
  },
  {
    id: 'pt_2',
    tierTarget: 'intermediate',
    question: 'کدام گزینه تفاوت بین "I have worked here for 2 years" و "I worked here for 2 years" را دقیق بیان می‌کند؟',
    options: [
      'هیچ فرقی ندارند و سلیقه‌ای است',
      'جمله اول یعنی هنوز هم آنجا کار می‌کنم، ولی جمله دوم یعنی کارم تمام شده است',
      'جمله اول مربوط به آینده است و دومی مال گذشته',
      'جمله اول فقط برای حالت مکتوب است'
    ],
    correctIndex: 1,
    explanation: 'حال کامل (Present Perfect) نشان‌دهنده تداوم تا زمان حال است، اما گذشته ساده ارتباطش با حال قطع شده.'
  },
  {
    id: 'pt_3',
    tierTarget: 'upper_intermediate',
    question: 'اصطلاح کنایی "Let\'s play it by ear" در یک جلسه کاری به چه معناست؟',
    options: [
      'باید موزیک پخش کنیم و گوش بدهیم',
      'اجازه دهید طبق شرایط پیش برویم و بعداً بدون نقشه صلب تصمیم بگیریم',
      'جلسه باید لغو شود',
      'با دقت به گوشی پزشکی گوش کنیم'
    ],
    correctIndex: 1,
    explanation: 'اصطلاح "Play it by ear" یعنی منعطف عمل کردن بر اساس نحوه پیشرفت اوضاع.'
  },
  {
    id: 'pt_4',
    tierTarget: 'professional',
    question: 'به عنوان یک استاد و مدرس زبان، اگر شاگرد بگوید "He explained me the lesson"، بهترین واکنش آموزشی چیست؟',
    options: [
      'دعوا کردن شاگرد و گفتن نمره صفر',
      'توضیح اینکه فعل explain مفعول غیرمستقیم را با to می‌گیرد: "He explained the lesson to me"',
      'تایید جمله چون در خیابان همه می‌فهمند',
      'حذف کامل فعل از درس'
    ],
    correctIndex: 1,
    explanation: 'مهارت تدریس مستلزم این است که مدرس الگوی دستوری ساختار فعل (Verb Patterns) را دقیق آموزش دهد.'
  },
  {
    id: 'pt_5',
    tierTarget: 'grandmaster',
    question: 'کدام عبارت در تحلیل زبانی بیانگر بالاترین درجه بلاغت و درک ظرافت‌های فرهنگی (Nuances & Pragmatics) است؟',
    options: [
      '"I understand what you\'re saying, but I respectfully beg to differ."',
      '"You are totally wrong and lying."',
      '"What is your problem mister?"',
      '"Stop talking immediately."'
    ],
    correctIndex: 0,
    explanation: 'بیان مخالفت محترمانه و دیپلماتیک با عباراتی مثل "I respectfully beg to differ" نشانه تسلط در سطح C2 است.'
  }
];

export const INITIAL_TEACHING_ROOMS: TeachingRoom[] = [
  {
    id: 'room_1',
    hostName: 'سارا رضایی (استاد فوق حرفه‌ای)',
    hostTier: 'grandmaster',
    targetTier: 'professional',
    title: 'کلاس تربیت مدرس: فنون انتقال مفاهیم انتزاعی به حرفه‌ای‌ها',
    topicFa: 'متدولوژی تدریس و نحوه ارائه فیدبک سازنده',
    activeApprenticesCount: 6,
    maxCapacity: 12,
    currentLessonPhrase: 'Constructive pedagogical feedback turns errors into milestones.',
    currentLessonPhonetic: '/kənˈstrʌk.tɪv ˌped.əˈɡɒdʒ.ɪ.kəl ˈfiːd.bæk/',
    pedagogicalFocus: 'تکنیک ساندویچی در ارائه فیدبک به دانش‌آموز (تعریف + تصحیح + تشویق)',
    isLive: true,
    consecutiveDefeats: 0
  },
  {
    id: 'room_2',
    hostName: 'کامران یزدانی (استاد حرفه‌ای)',
    hostTier: 'professional',
    targetTier: 'upper_intermediate',
    title: 'کارگاه اصطلاحات خیابانی و عامیانه (Idioms & Phrasal Verbs)',
    topicFa: 'چطور اصطلاحات را بدون حفظ کردن، در موقعیت واقعی به کار بگیریم',
    activeApprenticesCount: 9,
    maxCapacity: 15,
    currentLessonPhrase: 'Hit the ground running without overthinking every minor detail.',
    currentLessonPhonetic: '/hɪt ðə ɡraʊnd ˈrʌn.ɪŋ/',
    pedagogicalFocus: 'استفاده از شبیه‌سازی داستانی به جای لیست لغات خشک',
    isLive: true,
    consecutiveDefeats: 1
  },
  {
    id: 'room_3',
    hostName: 'مهسا نوری (استاد آپر-اینترمدیت)',
    hostTier: 'upper_intermediate',
    targetTier: 'intermediate',
    title: 'تمرین جمله‌سازی روان و غلبه بر خجالت مکالمه',
    topicFa: 'چطور مکث‌های بیهوده بین جملات را با تکیه‌کلام‌های استاندارد پر کنیم',
    activeApprenticesCount: 14,
    maxCapacity: 20,
    currentLessonPhrase: 'As a matter of fact, let me elaborate on that point.',
    currentLessonPhonetic: '/æz ə ˈmæt.ər əv fækt/',
    pedagogicalFocus: 'تکنیک گسترش ایده با ۵W (Who, What, When, Where, Why)',
    isLive: true,
    consecutiveDefeats: 2 // Danger! If challenged again, gets demoted!
  }
];

export const STUDENT_CHALLENGES_BANK: StudentChallengeQuestion[] = [
  {
    id: 'sc_1',
    askedByStudent: 'امیرعلی (شاگرد کنجکاو کلاس)',
    studentTier: 'intermediate',
    questionText: 'استاد! یکی از بچه‌ها گفت: "I look forward to meet you". من گفتم باید بگه "to meeting you" اما دلیلش رو نتونستم توضیح بدم. چرا بعد از to فعل ing گرفت؟',
    context: 'چالش درک ساختار حروف اضافه در مقابل مصدری',
    options: [
      {
        text: 'در این اصطلاح، "to" یک حرف اضافه (Preposition) است نه علامت مصدر، و بعد از حروف اضافه همیشه اسم یا فعل ing-دار می‌آید.',
        isCorrectTeachingPedagogy: true,
        explanation: 'پاسخ علمی، دقیق و قابل فهم برای شاگرد.'
      },
      {
        text: 'این یک استثنای الکی در انگلیسیه و قاعده خاصی نداره، فقط حفظش کنید.',
        isCorrectTeachingPedagogy: false,
        explanation: 'استاد باید منطق ساختار را توضیح دهد، نه اینکه آموزش را به حفظ کورکورانه محدود کند.'
      },
      {
        text: 'اصلاً فرقی نمی‌کنه هر دوتاش درسته!',
        isCorrectTeachingPedagogy: false,
        explanation: 'این پاسخ غلط است و به اعتبار علمی مدرس لطمه می‌زند.'
      }
    ]
  },
  {
    id: 'sc_2',
    askedByStudent: 'نگار (شاگرد مستعد کلاس)',
    studentTier: 'beginner',
    questionText: 'استاد، من تفاوت Could you و Can you رو متوجه نمیشم. آیا Could مال گذشته نیست؟ چرا الان به کار میره؟',
    context: 'چالش وجهی بودن افعال مدال در زمان حال',
    options: [
      {
        text: 'بله Could گذشته است ولی در درخواست‌های حال حاضر، گذشته بودن نشان‌دهنده فاصله اجتماعی و نهایت ادب و احترام است.',
        isCorrectTeachingPedagogy: true,
        explanation: 'آموزش مفهوم کاربردی (Pragmatics) و کاربرد ادب به شاگرد.'
      },
      {
        text: 'نه Could اصلاً ربطی به گذشته نداره و کلاً یک کلمه جداست.',
        isCorrectTeachingPedagogy: false,
        explanation: 'از نظر دستوری نادرست است؛ Could شکل گذشته Can نیز هست.'
      },
      {
        text: 'هر وقت حال کردی Can بگو، هر وقت خسته بودی Could بگو!',
        isCorrectTeachingPedagogy: false,
        explanation: 'غیرحرفه‌ای و فاقد ارزش پداگوژیک.'
      }
    ]
  },
  {
    id: 'sc_3',
    askedByStudent: 'پوریا (شاگرد تیزبین کلاس)',
    studentTier: 'upper_intermediate',
    questionText: 'استاد! اگر بخواهیم یک اصطلاح معادل «تعارف شاه‌عبدالعظیمی» یا «خالی‌بندی محترمانه» به انگلیسی به کار ببریم، کدام گزینه طبیعی‌ترین بار معنایی را دارد؟',
    context: 'چالش تطبیق فرهنگی دوجانبه فارسی و انگلیسی',
    options: [
      {
        text: 'اصطلاح "Lip service" (تعارف توخالی) یا "Half-hearted invitation" دقیق‌ترین معادل برای تعارف بدون نیت واقعی است.',
        isCorrectTeachingPedagogy: true,
        explanation: 'پاسخ حرفه‌ای که پل فرهنگی بین فارسی و انگلیسی را شفاف می‌سازد.'
      },
      {
        text: 'ترجمه کلمه به کلمه مثل "Shah Abdol-Azim polite offer"!',
        isCorrectTeachingPedagogy: false,
        explanation: 'ترجمه تحت‌اللفظی غلط و بی‌معنی برای مخاطب انگلیسی‌زبان.'
      },
      {
        text: 'در غرب اصلاً تعارف وجود ندارد و همه با هم دعوا دارند.',
        isCorrectTeachingPedagogy: false,
        explanation: 'تصور کلیشه‌ای و نادرست.'
      }
    ]
  }
];
