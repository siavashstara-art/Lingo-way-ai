// کارگاه فوت‌وفن یاد دادن و معلمی زبان
// مخصوص کسانی که زبانشان خوب است و فقط می‌خواهند یاد بگیرند چطور خوب درس بدهند

export interface TeachingSkillLesson {
  id: string;
  titleFa: string;
  titleEn: string;
  problemScenario: string;
  studentQuote: string;
  wrongTeacherResponse: string;
  correctTeacherResponse: string;
  goldenRule: string;
  quickPractice: {
    question: string;
    options: string[];
    correctIndex: number;
    simpleExplanation: string;
  };
}

export const TEACHER_TRAINING_LESSONS: TeachingSkillLesson[] = [
  {
    id: 'tt_1',
    titleFa: 'چطور اشتباه شاگرد را درست کنیم بدون اینکه خجالت بکشد؟',
    titleEn: 'How to correct mistakes gently without hurting confidence',
    problemScenario: 'شاگرد خجالتی در حال حرف زدن است و می‌گوید: "Yesterday I go to market".',
    studentQuote: '"Yesterday I go to market and buyed apples..."',
    wrongTeacherResponse: 'اشتباه است! نباید بگویی go، باید بگویی went! گرامر نخواندی؟ (شاگرد دستپاچه می‌شود و سکوت می‌کند)',
    correctTeacherResponse: 'با لبخند و لحن طبیعی جمله درستش را تکرار کن: "Ah, so yesterday you WENT to the market! Nice! What else did you buy?" (شاگرد خودش متوجه شد و به حرف زدن ادامه داد).',
    goldenRule: 'قانون طلایی: به جای مچ‌گیری، جمله درست را مثل یک دوست در پاسخت تکرار کن تا خودش بشنود و یاد بگیرد.',
    quickPractice: {
      question: 'وقتی شاگرد وسط جمله تپق زد یا زمان فعل را اشتباه گفت، بهترین کار چیست؟',
      options: [
        'فوراً حرفش را قطع کنیم و بگوییم اشتباه گفتی.',
        'بگذاریم جمله‌اش تمام شود، بعد همان جمله را به شکل درست و با لحن دوستانه تکرار کنیم.',
        'نمره منفی به او بدهیم تا بیشتر دقت کند.'
      ],
      correctIndex: 1,
      simpleExplanation: 'این روش به شاگرد شجاعت حرف زدن می‌دهد و ترسی از تپق زدن نخواهد داشت.'
    }
  },
  {
    id: 'tt_2',
    titleFa: 'کاری کن شاگرد بیشتر از خودت حرف بزند!',
    titleEn: 'Let the student talk 70% of the time',
    problemScenario: 'معلم تمام مدت کلاس را خودش حرف می‌زند و برای یک کلمه ساده، ۱۰ دقیقه سخنرانی می‌کند!',
    studentQuote: 'شاگرد فقط سر تکان می‌دهد و خوابش گرفته است.',
    wrongTeacherResponse: 'استاد یک‌نفس گرامر گذشته استمراری را با فرمول‌های سخت توضیح می‌دهد و شاگرد فرصت صحبت پیدا نمی‌کند.',
    correctTeacherResponse: 'یک سوال کوتاه بپرس و سکوت کن: "What did you eat for breakfast today?" بگذار شاگرد با دست‌وپاشکستگی تلاش کند و خودش جمله بسازد.',
    goldenRule: 'قانون طلایی: معلم خوب کمتر حرف می‌زند و بیشتر گوش می‌دهد تا شاگرد زبان باز کند.',
    quickPractice: {
      question: 'در یک کلاس زبان نیم‌ساعته، چه کسی باید بیشتر صحبت کند؟',
      options: [
        'معلم، تا شاگرد به لهجه او گوش بدهد.',
        'شاگرد، حداقل ۷۰ درصد زمان را باید خودش صحبت کند و اشتباهاتش باز شود.',
        'هر دو باید سکوت کنند و فقط متن بخوانند.'
      ],
      correctIndex: 1,
      simpleExplanation: 'زبان با حرف زدن یاد گرفته می‌شود نه با گوش دادن منفعل به سخنرانی معلم!'
    }
  },
  {
    id: 'tt_3',
    titleFa: 'شاگرد کلمه یادش نمی‌آید؟ به او نقشه و سرنخ بده!',
    titleEn: 'Give clues instead of directly giving the answer',
    problemScenario: 'شاگرد کلمه "Refrigerator" (یخچال) یادش رفته و درمانده شده است.',
    studentQuote: '"I put the milk in the... umm... what was it called...?"',
    wrongTeacherResponse: 'فوراً بگویی: "Refrigerator! چرا حفظ نکردی؟"',
    correctTeacherResponse: 'به شوخی اشاره کن: "The big cold box in the kitchen? With ice inside?" شاگرد می‌خندد و یادش می‌آید: "Aha! Fridge! Refrigerator!"',
    goldenRule: 'قانون طلایی: اگر خود شاگرد با سرنخ شما کلمه را پیدا کند، تا آخر عمر فراموشش نمی‌کند.',
    quickPractice: {
      question: 'وقتی شاگرد کلمه‌ای را فراموش می‌کند چطور به او کمک کنیم؟',
      options: [
        'با شوخی و نشانه‌های ساده (مثلاً کجای خانه است؟ چه رنگی است؟) کمک کنیم خودش یادش بیاید.',
        'سریع کلمه را بگوییم و رد شویم.',
        'بگوییم جلسه بعد ده بار از روی آن بنویسد.'
      ],
      correctIndex: 0,
      simpleExplanation: 'سرنخ دادن ذهن شاگرد را فعال می‌کند و اعتمادبه‌نفسش را بالا می‌برد.'
    }
  }
];

// درس‌های پیشرفته ویژه کسانی که تعیین سطح بالا آورده‌اند و درس‌های معمولی برایشان ساده است
export interface AdvancedPersonalizedUnit {
  id: string;
  topicFa: string;
  topicEn: string;
  proPhrases: {
    naturalNative: string;
    textbookBoring: string;
    whyItSoundsBetter: string;
  }[];
}

export const ADVANCED_PERSONALIZED_UNITS: AdvancedPersonalizedUnit[] = [
  {
    id: 'adv_1',
    topicFa: 'اصطلاحات خودمانی و شیک روزمره (صحبت مثل یک متولد لندن یا نیویورک)',
    topicEn: 'Natural Native Idioms instead of Textbook English',
    proPhrases: [
      {
        naturalNative: 'I am beat! Let\'s call it a day.',
        textbookBoring: 'I am very tired. We must stop working now.',
        whyItSoundsBetter: 'اهل زبان وقتی خیلی خسته هستند نمی‌گویند very tired، خیلی راحت می‌گویند I am beat (داغونم!).'
      },
      {
        naturalNative: 'It completely slipped my mind!',
        textbookBoring: 'I forgot it.',
        whyItSoundsBetter: 'به جای forgot خشک و خالی، این عبارت صمیمی و محترمانه نشان می‌دهد که واقعاً از ذهنتان پریده بود.'
      },
      {
        naturalNative: 'I am on the fence about it.',
        textbookBoring: 'I cannot decide between these two options.',
        whyItSoundsBetter: 'یعنی هنوز دو دل هستم و تصمیم قطعی نگرفته‌ام.'
      }
    ]
  },
  {
    id: 'adv_2',
    topicFa: 'حرف زدن خودمانی و شوخ‌طبعی در مکالمه دوستانه',
    topicEn: 'Friendly humor and casual banter',
    proPhrases: [
      {
        naturalNative: 'No hard feelings, we are all good!',
        textbookBoring: 'I am not angry at you anymore.',
        whyItSoundsBetter: 'یعنی دلخوری نداریم و رفاقتمان سر جایش است.'
      },
      {
        naturalNative: 'Are you pulling my leg?',
        textbookBoring: 'Are you lying to me or joking?',
        whyItSoundsBetter: 'معادل خودمانی و باحال «داری سربه سرم می‌ذاری؟» است.'
      }
    ]
  }
];
