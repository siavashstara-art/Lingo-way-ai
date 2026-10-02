export interface StorySentence {
  id: number;
  en: string;
  fa: string;
  phoneticFa: string;
  vocabNotes: { wordEn: string; wordFa: string }[];
}

export interface BilingualStory {
  id: string;
  number: number;
  titleEn: string;
  titleFa: string;
  category: 'fable_wisdom' | 'persian_heritage' | 'daily_life' | 'humor_anecdote';
  moralEn: string;
  moralFa: string;
  level: 'Beginner (A1–A2)' | 'Intermediate (B1–B2)' | 'Advanced (C1)';
  sentences: StorySentence[];
}

export const THIRTY_BILINGUAL_STORIES: BilingualStory[] = [
  // 1
  {
    id: 'story_1',
    number: 1,
    titleEn: 'The Ant and the Dove (Aesop)',
    titleFa: 'مورچه و کبوتر (حکمت مهربانی)',
    category: 'fable_wisdom',
    level: 'Beginner (A1–A2)',
    moralEn: 'One good turn deserves another.',
    moralFa: 'تو نیکی می‌کن و در دجله انداز، که ایزد در بیابانت دهد باز.',
    sentences: [
      {
        id: 1,
        en: 'A thirsty ant went down to the river to drink some water.',
        fa: 'مورچه‌ای تشنه برای نوشیدن کمی آب به کنار رودخانه رفت.',
        phoneticFa: 'اِ ثِرستی اَنت وِنت داون تو دِ ریور تو درینک سام واتر.',
        vocabNotes: [{ wordEn: 'Thirsty', wordFa: 'تشنه' }, { wordEn: 'River', wordFa: 'رودخانه' }]
      },
      {
        id: 2,
        en: 'Suddenly, a strong current swept her away into the deep water.',
        fa: 'ناگهان، جریان شدید آب او را به درون آب عمیق کشاند.',
        phoneticFa: 'سادِنلی، اِ استرانگ کارِنت سوِپت هِر اِوِی اینتو دِ دیپ واتر.',
        vocabNotes: [{ wordEn: 'Current', wordFa: 'جریان آب' }, { wordEn: 'Swept away', wordFa: 'با خود برد' }]
      },
      {
        id: 3,
        en: 'A gentle dove in a nearby tree dropped a green leaf to save her.',
        fa: 'کبوتری مهربان روی درختی در همان نزدیکی، برگی سبز انداخت تا او را نجات دهد.',
        phoneticFa: 'اِ جِنتِل داو این اِ نیربای تری دراپت اِ گرین لیف تو سِیو هِر.',
        vocabNotes: [{ wordEn: 'Gentle', wordFa: 'آرام و مهربان' }, { wordEn: 'Leaf', wordFa: 'برگ' }]
      },
      {
        id: 4,
        en: 'Later, the ant bit a hunter’s ankle to save the dove from his trap.',
        fa: 'مدتی بعد، مورچه پای یک شکارچی را گاز گرفت تا کبوتر را از دام نجات دهد.',
        phoneticFa: 'لِیتر، دی اَنت بیت اِ هانتِرز اَنکِل تو سِیو دِ داو فرام هیز ترَپ.',
        vocabNotes: [{ wordEn: 'Hunter', wordFa: 'شکارچی' }, { wordEn: 'Trap', wordFa: 'تله / دام' }]
      }
    ]
  },

  // 2
  {
    id: 'story_2',
    number: 2,
    titleEn: 'Simurgh and the Peak of Mount Qaf',
    titleFa: 'سیمرغ و قله کوه قاف (منطق‌الطیر عطار)',
    category: 'persian_heritage',
    level: 'Intermediate (B1–B2)',
    moralEn: 'Truth and strength lie within ourselves when we unite.',
    moralFa: 'حقیقت و پادشاهی درون جان خود ماست، آنگاه که یکی شویم.',
    sentences: [
      {
        id: 1,
        en: 'Thirty birds crossed dangerous valleys to find their mythical king.',
        fa: 'سی مرغ از دره‌های خطرناک گذشتند تا پادشاه افسانه‌ای خود را بیابند.',
        phoneticFa: 'ثِرتی بێردز کراست دِینجرِس وَلیز تو فایند دِیر میثیکال کینگ.',
        vocabNotes: [{ wordEn: 'Valleys', wordFa: 'دره‌ها' }, { wordEn: 'Mythical', wordFa: 'افسانه‌ای و کهن' }]
      },
      {
        id: 2,
        en: 'When they reached Mount Qaf, they looked into a pure crystal mirror.',
        fa: 'وقتی به کوه قاف رسیدند، در آینه‌ای از بلور پاک نگریستند.',
        phoneticFa: 'وِن دِی ریچت ماونت قاف، دِی لوکت اینتو اِ پیور کریستال میرور.',
        vocabNotes: [{ wordEn: 'Reached', wordFa: 'رسیدند' }, { wordEn: 'Crystal mirror', wordFa: 'آینه بلورین' }]
      },
      {
        id: 3,
        en: 'They realized that together, the thirty birds themselves were the Simurgh.',
        fa: 'آن‌ها دریافتند که با هم، خودِ آن سی مرغ همان سیمرغ جاودان هستند.',
        phoneticFa: 'دِی ریِلایزد دَت توگِدِر، دِ ثِرتی بێردز دِمسِلوْز وِر دِ سیمُرغ.',
        vocabNotes: [{ wordEn: 'Realized', wordFa: 'پی بردند / فهمیدند' }, { wordEn: 'Together', wordFa: 'با هم و در کنار هم' }]
      }
    ]
  },

  // 3
  {
    id: 'story_3',
    number: 3,
    titleEn: 'The Wise Merchant and the Magic Camel',
    titleFa: 'بازرگان دانا و شتر بارکش',
    category: 'daily_life',
    level: 'Beginner (A1–A2)',
    moralEn: 'Patience and observation reveal secrets hidden in plain sight.',
    moralFa: 'صبر و دقت نظر، رازهای پنهان را آشکار می‌سازد.',
    sentences: [
      {
        id: 1,
        en: 'An old merchant walked along the desert trail near Isfahan.',
        fa: 'بازرگانی کهنسال در امتداد مسیر کویری نزدیک اصفهان قدم می‌زد.',
        phoneticFa: 'اَن اولد مێرچَنت واکت اِلانگ دِ دِزِرت ترِیل نیر اصفهان.',
        vocabNotes: [{ wordEn: 'Merchant', wordFa: 'بازرگان' }, { wordEn: 'Trail', wordFa: 'مسیر / کوره راه' }]
      },
      {
        id: 2,
        en: 'He noticed footprints with wheat on one side and honey on the other.',
        fa: 'او رد پاهایی دید که در یک سو گندم ریخته بود و در سوی دیگر عسل.',
        phoneticFa: 'هی نوتیست فوت‌پرینتس ویذ ویت آن وان ساید اَند هانی آن دی آدر.',
        vocabNotes: [{ wordEn: 'Footprints', wordFa: 'رد پاها' }, { wordEn: 'Wheat', wordFa: 'گندم' }]
      },
      {
        id: 3,
        en: 'With quiet intellect, he solved the riddle before sunset.',
        fa: 'با خرد و آرامش، او پیش از غروب آفتاب معما را گشود.',
        phoneticFa: 'ویذ کوایِت اینتِلِکت، هی سالود دِ ریدِل بیفور سانسِت.',
        vocabNotes: [{ wordEn: 'Intellect', wordFa: 'خرد / عقل' }, { wordEn: 'Riddle', wordFa: 'معما' }]
      }
    ]
  },

  // 4
  {
    id: 'story_4',
    number: 4,
    titleEn: 'Molla Nasreddin and the Lost Ring',
    titleFa: 'ملا نصرالدین و انگشتر گمشده',
    category: 'humor_anecdote',
    level: 'Beginner (A1–A2)',
    moralEn: 'Do not search for solutions in easy places when the problem is elsewhere.',
    moralFa: 'چیزی را که در تاریکی گم کرده‌ای در روشنایی بی‌فایده مجو!',
    sentences: [
      {
        id: 1,
        en: 'Nasreddin was searching for his lost ring under a bright street lamp.',
        fa: 'ملا نصرالدین زیر چراغ روشن کوچه به دنبال انگشتر گمشده‌اش می‌گشت.',
        phoneticFa: 'نصرالدین واز سێرچینگ فور هیز لاست رینگ آندر اِ برایت استریت لَمپ.',
        vocabNotes: [{ wordEn: 'Searching', wordFa: 'جست‌وجو کردن' }, { wordEn: 'Lamp', wordFa: 'چراغ' }]
      },
      {
        id: 2,
        en: 'His neighbor asked, "Did you drop it here in the street?"',
        fa: 'همسایه‌اش پرسید: «آیا آن را اینجا در کوچه انداختی؟»',
        phoneticFa: 'هیز نِیبِر اَسکد: دید یو دراپ ایت هیر این دِ استریت؟',
        vocabNotes: [{ wordEn: 'Neighbor', wordFa: 'همسایه' }, { wordEn: 'Drop', wordFa: 'انداختن / افتادن' }]
      },
      {
        id: 3,
        en: 'He replied, "No, I dropped it inside my dark cellar, but here there is light!"',
        fa: 'او پاسخ داد: «خیر! در زیرزمین تاریک انداختم، ولی اینجا نور هست!»',
        phoneticFa: 'هی ریپلاید: نو، آی دراپت ایت اینساید مای دارک سِلار، بات هیر دِر ایز لایت!',
        vocabNotes: [{ wordEn: 'Cellar', wordFa: 'زیرزمین تاریک' }, { wordEn: 'Replied', wordFa: 'پاسخ داد' }]
      }
    ]
  },

  // 5
  {
    id: 'story_5',
    number: 5,
    titleEn: 'The Boy Who Cried Wolf (Aesop)',
    titleFa: 'چوپان دروغگو (گرگ آمد)',
    category: 'fable_wisdom',
    level: 'Beginner (A1–A2)',
    moralEn: 'Nobody believes a liar, even when he tells the truth.',
    moralFa: 'دروغگو حتی هنگامی که راست بگوید، باورش نمی‌کنند.',
    sentences: [
      {
        id: 1,
        en: 'A young shepherd boy watched sheep on a hillside and grew bored.',
        fa: 'چوپان جوانی گوسفندان را روی تپه می‌چراند و خسته و بی‌حوصله شد.',
        phoneticFa: 'اِ یانگ شِپێرد بوی واچت شیپ آن اِ هیل‌ساید اَند گرو بورد.',
        vocabNotes: [{ wordEn: 'Shepherd', wordFa: 'چوپان' }, { wordEn: 'Bored', wordFa: 'بی‌حوصله و کلافه' }]
      },
      {
        id: 2,
        en: 'He tricked the villagers twice by shouting, "Wolf! Wolf!"',
        fa: 'او دو بار با فریاد «گرگ! گرگ!» اهالی روستا را فریب داد.',
        phoneticFa: 'هی تریکت دِ ویلِجِرز توایس بای شوتینگ: وُلف! وُلف!',
        vocabNotes: [{ wordEn: 'Tricked', wordFa: 'فریب داد' }, { wordEn: 'Villagers', wordFa: 'اهالی روستا' }]
      },
      {
        id: 3,
        en: 'When a real wolf appeared, nobody came to help him.',
        fa: 'هنگامی که گرگی واقعی پدیدار شد، هیچ‌کس برای کمک به او نیامد.',
        phoneticFa: 'وِن اِ ریِل وُلف اَپیرد، نوبادی کِیم تو هِلپ هیم.',
        vocabNotes: [{ wordEn: 'Appeared', wordFa: 'پدیدار شد' }, { wordEn: 'Nobody', wordFa: 'هیچ‌کس' }]
      }
    ]
  },

  // 6
  {
    id: 'story_6',
    number: 6,
    titleEn: 'Rumi and the Four Travelers (Angur and Inab)',
    titleFa: 'مولانا و چهار مسافر (انگور و عنب)',
    category: 'persian_heritage',
    level: 'Intermediate (B1–B2)',
    moralEn: 'Disputes often arise from language differences, not conflicting desires.',
    moralFa: 'جنگ هفتاد و دو ملت همه را عذر بنه، چون ندیدند حقیقت ره افسانه زدند.',
    sentences: [
      {
        id: 1,
        en: 'Four men from different lands received a silver coin to buy food.',
        fa: 'چهار مرد از سرزمین‌های گوناگون سکه‌ای نقره برای خرید غذا دریافت کردند.',
        phoneticFa: 'فور مَن فرام دیفرِنت لَندز ریسیود اِ سیلور کوین تو بای فود.',
        vocabNotes: [{ wordEn: 'Silver coin', wordFa: 'سکه نقره' }, { wordEn: 'Lands', wordFa: 'سرزمین‌ها' }]
      },
      {
        id: 2,
        en: 'The Persian said "Angur", the Arab said "Inab", and the Turk said "Uzum".',
        fa: 'فارسی‌زبان گفت «انگور»، عرب گفت «عنب»، و ترک گفت «اوزوم».',
        phoneticFa: 'دِ پێرژَن سِد انگور، دی اَرَب سِد عنب، اَند دِ تێرک سِد اوزوم.',
        vocabNotes: [{ wordEn: 'Said', wordFa: 'گفت' }, { wordEn: 'Different', wordFa: 'متفاوت' }]
      },
      {
        id: 3,
        en: 'A wise linguist bought grapes and satisfied them all at once.',
        fa: 'زبان‌دانی خردمند یک سبد انگور خرید و همگی را در آنِ واحد خشنود ساخت.',
        phoneticFa: 'اِ وایز لینگوئیست بات گرِیپس اَند سَتیسفاید دِم آل اَت وانس.',
        vocabNotes: [{ wordEn: 'Linguist', wordFa: 'زبان‌شناس' }, { wordEn: 'Grapes', wordFa: 'انگور' }]
      }
    ]
  },

  // 7
  {
    id: 'story_7',
    number: 7,
    titleEn: 'The Tortoise and the Hare',
    titleFa: 'لاک‌پشت و خرگوش شتاب‌زده',
    category: 'fable_wisdom',
    level: 'Beginner (A1–A2)',
    moralEn: 'Slow and steady wins the race.',
    moralFa: 'رهرو آن نیست که گه تند و گهی خسته رود، رهرو آن است که آهسته و پیوسته رود.',
    sentences: [
      {
        id: 1,
        en: 'A proud hare mocked a slow tortoise and challenged him to a sprint.',
        fa: 'خرگوشی مغرور لاک‌پشتی آرام را مسخره کرد و او را به مسابقه دو فراخواند.',
        phoneticFa: 'اِ پراود هِر ماکت اِ اسلو تورتِس اَند چَلِنجد هیم تو اِ اسپرینت.',
        vocabNotes: [{ wordEn: 'Mocked', wordFa: 'مسخره کرد' }, { wordEn: 'Tortoise', wordFa: 'لاک‌پشت' }]
      },
      {
        id: 2,
        en: 'Confident of victory, the hare took a nap under a shady tree.',
        fa: 'خرگوش با اطمینان از پیروزی، زیر درختی سایه‌دار چرت زد.',
        phoneticFa: 'کانفیدِنت آو ویکتوری، دِ هِر توک اِ نَپ آندر اِ شِیدی تری.',
        vocabNotes: [{ wordEn: 'Confident', wordFa: 'مطمئن و با اعتماد به نفس' }, { wordEn: 'Nap', wordFa: 'چرت کوتاه' }]
      },
      {
        id: 3,
        en: 'The steady tortoise walked tirelessly and crossed the finish line first.',
        fa: 'لاک‌پشت پیگیر و خستگی‌ناپذیر گام برداشت و نخستین نفر از خط پایان گذشت.',
        phoneticFa: 'دِ استِدی تورتِس واکت تایِرلِسلی اَند کراست دِ فینیش لاین فێرست.',
        vocabNotes: [{ wordEn: 'Tirelessly', wordFa: 'خستگی‌ناپذیر' }, { wordEn: 'Finish line', wordFa: 'خط پایان' }]
      }
    ]
  },

  // 8
  {
    id: 'story_8',
    number: 8,
    titleEn: 'Saadi and the Clay from the Hammam',
    titleFa: 'سعدی و گل خوشبوی حمام (گلستان)',
    category: 'persian_heritage',
    level: 'Intermediate (B1–B2)',
    moralEn: 'Good company elevates the soul.',
    moralFa: 'گِلی خوشبوی در حمام روزی، رسید از دست محبوبی به دستم...',
    sentences: [
      {
        id: 1,
        en: 'In a bathhouse, someone handed the poet a piece of perfumed clay.',
        fa: 'در گرمابه‌ای، فردی قطعه‌ای گِل خوشبو به شاعر داد.',
        phoneticFa: 'این اِ بَث‌هاوس، سام‌وان هَندِد دِ پویِت اِ پیس آو پِرفیومد کلِی.',
        vocabNotes: [{ wordEn: 'Bathhouse', wordFa: 'حمام / گرمابه' }, { wordEn: 'Perfumed clay', wordFa: 'گِل معطر' }]
      },
      {
        id: 2,
        en: 'He asked, "Are you musk or ambergris? Your fragrance enchants me!"',
        fa: 'او پرسید: «آیا تو مشکی یا عنبر؟ بوی دلاویزت مرا مست کرد!»',
        phoneticFa: 'هی اَسکد: آر یو ماسک اور اَمبِرگریس؟ یور فرِیگرَنس اینچَنتس می!',
        vocabNotes: [{ wordEn: 'Fragrance', wordFa: 'بوی خوش و عطر' }, { wordEn: 'Musk', wordFa: 'مُشک' }]
      },
      {
        id: 3,
        en: 'The clay replied, "I was humble mud, but I sat beside a sweet rose."',
        fa: 'گِل پاسخ داد: «من خاکی ناچیز بودم، ولی مدتی با گل سرخ همنشین گشتم.»',
        phoneticFa: 'دِ کلِی ریپلاید: آی واز هامبِل ماد، بات آی سَت بیْساید اِ سوئیت روز.',
        vocabNotes: [{ wordEn: 'Humble mud', wordFa: 'گِل ناچیز و فروتن' }, { wordEn: 'Beside', wordFa: 'در کنار و همجوار' }]
      }
    ]
  },

  // 9
  {
    id: 'story_9',
    number: 9,
    titleEn: 'The Crow and the Pitcher',
    titleFa: 'کلاغ باهوش و کوزه آب',
    category: 'fable_wisdom',
    level: 'Beginner (A1–A2)',
    moralEn: 'Necessity is the mother of invention.',
    moralFa: 'نیاز، مادر اختراع و نوآوری است.',
    sentences: [
      {
        id: 1,
        en: 'A thirsty crow found a tall pitcher with water only at the bottom.',
        fa: 'کلاغی تشنه کوزه‌ای بلند یافت که تنها در تهِ آن اندکی آب بود.',
        phoneticFa: 'اِ ثِرستی کرو فاوند اِ تال پیچِر ویذ واتر اونلی اَت دِ باتِم.',
        vocabNotes: [{ wordEn: 'Pitcher', wordFa: 'کوزه آب' }, { wordEn: 'Bottom', wordFa: 'ته / قعر' }]
      },
      {
        id: 2,
        en: 'His beak could not reach down to drink.',
        fa: 'منقارش نمی‌توانست برای نوشیدن به پایین برسد.',
        phoneticFa: 'هیز بیک کود نات ریچ داون تو درینک.',
        vocabNotes: [{ wordEn: 'Beak', wordFa: 'منقار' }, { wordEn: 'Reach', wordFa: 'رسیدن' }]
      },
      {
        id: 3,
        en: 'He dropped pebbles one by one until the water rose to the brim.',
        fa: 'او سنگ‌ریزه‌ها را دانه‌دانه انداخت تا آب تا لبه کوزه بالا آمد.',
        phoneticFa: 'هی دراپت پِبِلز وان بای وان آنتیل دِ واتر روز تو دِ بریم.',
        vocabNotes: [{ wordEn: 'Pebbles', wordFa: 'سنگ‌ریزه‌ها' }, { wordEn: 'Brim', wordFa: 'لبه ظرف' }]
      }
    ]
  },

  // 10
  {
    id: 'story_10',
    number: 10,
    titleEn: 'Molla Nasreddin and the Cauldron that Gave Birth',
    titleFa: 'ملا نصرالدین و دیگی که زایید!',
    category: 'humor_anecdote',
    level: 'Beginner (A1–A2)',
    moralEn: 'If you accept an illogical gain, you must accept an illogical loss.',
    moralFa: 'کسی که سود نامعقول را باور کند، ناچار زیانش را نیز خواهد پذیرفت.',
    sentences: [
      {
        id: 1,
        en: 'Nasreddin borrowed a large bronze cauldron from his greedy neighbor.',
        fa: 'ملا دیگ بزرگ برنزی را از همسایه طمع‌کارش قرض گرفت.',
        phoneticFa: 'نصرالدین بارود اِ لارج برانز کولدران فرام هیز گریدی نِیبِر.',
        vocabNotes: [{ wordEn: 'Borrowed', wordFa: 'قرض گرفت' }, { wordEn: 'Cauldron', wordFa: 'دیگ بزرگ' }]
      },
      {
        id: 2,
        en: 'He returned it with a small pot, claiming the cauldron had given birth.',
        fa: 'او دیگ را با دیگچه‌ای کوچک پس داد و ادعا کرد دیگ زاییده است!',
        phoneticFa: 'هی ریتێرند ایت ویذ اِ اسمال پات، کلِیمینگ دِ کولدران هَد گیون بێرث.',
        vocabNotes: [{ wordEn: 'Claiming', wordFa: 'ادعا کنان' }, { wordEn: 'Given birth', wordFa: 'زاییدن' }]
      },
      {
        id: 3,
        en: 'Later, when the cauldron was not returned, he said, "Alas, it passed away!"',
        fa: 'بعدها وقتی دیگ را پس نداد گفت: «افسوس! دیگ شما مرحوم شد و مُرد!»',
        phoneticFa: 'لِیتر، وِن دِ کولدران واز نات ریتێرند، هی سِد: اَلاس، ایت پَست اِوِی!',
        vocabNotes: [{ wordEn: 'Alas', wordFa: 'دریغا / افسوس' }, { wordEn: 'Passed away', wordFa: 'فوت کرد / مرد' }]
      }
    ]
  },

  // 11
  {
    id: 'story_11',
    number: 11,
    titleEn: 'The Lion and the Mouse (Aesop)',
    titleFa: 'شیر نیرومند و موش کوچک',
    category: 'fable_wisdom',
    level: 'Beginner (A1–A2)',
    moralEn: 'Even the smallest friend can be of great help.',
    moralFa: 'هیچ‌کس را کوچک مشمار؛ گاه موشی شیری را از بند می‌رهاند.',
    sentences: [
      {
        id: 1,
        en: 'A mighty lion spared the life of a tiny mouse running across his paws.',
        fa: 'شیری نیرومند از جان موش کوچکی که از روی پنجه‌هایش گذشت درگذشت.',
        phoneticFa: 'اِ مایتی لایِن اسپِرد دِ لایف آو اِ تاینی ماوس رانینگ اِکراس هیز پاز.',
        vocabNotes: [{ wordEn: 'Mighty', wordFa: 'نیرومند' }, { wordEn: 'Paws', wordFa: 'پنجه‌ها' }]
      },
      {
        id: 2,
        en: 'Days later, the king of the jungle was trapped in thick ropes by hunters.',
        fa: 'چند روز بعد، پادشاه جنگل در طناب‌های ضخیم شکارچیان به دام افتاد.',
        phoneticFa: 'دِیز لِیتر، دِ کینگ آو دِ جانگِل واز ترَپت این ثیک روپس بای هانتِرز.',
        vocabNotes: [{ wordEn: 'Trapped', wordFa: 'به دام افتاد' }, { wordEn: 'Ropes', wordFa: 'طناب‌ها' }]
      },
      {
        id: 3,
        en: 'The brave mouse gnawed through the ropes and set the lion free.',
        fa: 'موش شجاع طناب‌ها را جوید و شیر را آزاد ساخت.',
        phoneticFa: 'دِ برِیو ماوس ناد ثرو دِ روپس اَند سِت دِ لایِن فری.',
        vocabNotes: [{ wordEn: 'Gnawed', wordFa: 'جوید با دندان' }, { wordEn: 'Free', wordFa: 'رها و آزاد' }]
      }
    ]
  },

  // 12
  {
    id: 'story_12',
    number: 12,
    titleEn: 'Ferdowsi and the Sultan’s Broken Promise',
    titleFa: 'فردوسی طوسی و عهدشکنی سلطان',
    category: 'persian_heritage',
    level: 'Advanced (C1)',
    moralEn: 'Integrity and timeless art outlive worldly palaces and golden crowns.',
    moralFa: 'بسی رنج بردم در این سال سی، عجم زنده کردم بدین پارسی.',
    sentences: [
      {
        id: 1,
        en: 'The poet devoted thirty years of his life to revive the Persian language.',
        fa: 'شاعر سی سال از عمر خویش را صرف زنده نگاه داشتن زبان پارسی کرد.',
        phoneticFa: 'دِ پویِت دیووتِد ثِرتی ییرز آو هیز لایف تو ریوایو دِ پێرژَن لَنگویج.',
        vocabNotes: [{ wordEn: 'Devoted', wordFa: 'وقف کرد' }, { wordEn: 'Revive', wordFa: 'احیا کردن' }]
      },
      {
        id: 2,
        en: 'When silver arrived instead of promised gold, he gave it to a bath attendant.',
        fa: 'هنگامی که به جای طلای وعده‌داده‌شده نقره آوردند، آن را به حمامی و فقیران بخشید.',
        phoneticFa: 'وِن سیلور اَرایود اینستِد آو پرامِست گلد، هی گِیو ایت تو اِ بَث اَتِندَنت.',
        vocabNotes: [{ wordEn: 'Promised', wordFa: 'وعده داده شده' }, { wordEn: 'Instead of', wordFa: 'به جای' }]
      },
      {
        id: 3,
        en: 'His poetic monument remains immortal across human history.',
        fa: 'بنای نظم او تا ابد در تاریخ بشر جاودان و گزندناپذیر برجای ماند.',
        phoneticFa: 'هیز پویِتیک مانیومِنت ریمِینز ایمورتال اِکراس هیومَن هیستوری.',
        vocabNotes: [{ wordEn: 'Immortal', wordFa: 'جاودان / بی‌مرگ' }, { wordEn: 'Monument', wordFa: 'بنای ماندگار' }]
      }
    ]
  },

  // 13
  {
    id: 'story_13',
    number: 13,
    titleEn: 'The Fox and the Crow with Cheese (Aesop)',
    titleFa: 'روباه مکار و زاغ و پنیر',
    category: 'fable_wisdom',
    level: 'Beginner (A1–A2)',
    moralEn: 'Flattery is food for fools.',
    moralFa: 'فریب زبان‌بازی و چاپلوسی فریبکاران را مخور.',
    sentences: [
      {
        id: 1,
        en: 'A black crow held a delicious chunk of cheese in his beak.',
        fa: 'زاغی تکه‌ای پنیر خوشمزه را به منقار گرفته بود.',
        phoneticFa: 'اِ بلَک کرو هِلد اِ دِلیشِس چانک آو چیز این هیز بیک.',
        vocabNotes: [{ wordEn: 'Delicious', wordFa: 'خوشمزه' }, { wordEn: 'Chunk', wordFa: 'تکه بزرگ' }]
      },
      {
        id: 2,
        en: 'A sly fox praised his feathers and begged him to sing a song.',
        fa: 'روباهی حیله‌گر پرهای او را ستود و التماس کرد آوازی بخواند.',
        phoneticFa: 'اِ اسلای فاکس پرِیزد هیز فِدِرز اَند بَگد هیم تو سینگ اِ سانگ.',
        vocabNotes: [{ wordEn: 'Sly', wordFa: 'حیله‌گر و مکار' }, { wordEn: 'Praised', wordFa: 'ستایش کرد' }]
      },
      {
        id: 3,
        en: 'When the crow opened his mouth to caw, the cheese fell straight to the fox.',
        fa: 'همین که زاغ دهان به قارقار گشود، پنیر صاف به دهان روباه افتاد.',
        phoneticFa: 'وِن دِ کرو اوپِند هیز ماوث تو کاو، دِ چیز فِل استرِیت تو دِ فاکس.',
        vocabNotes: [{ wordEn: 'Caw', wordFa: 'قارقار کردن' }, { wordEn: 'Fell', wordFa: 'افتاد' }]
      }
    ]
  },

  // 14
  {
    id: 'story_14',
    number: 14,
    titleEn: 'The Two Friends and the Bear',
    titleFa: 'دو دوست و خرس در جنگل',
    category: 'daily_life',
    level: 'Beginner (A1–A2)',
    moralEn: 'Misfortune tests the sincerity of friends.',
    moralFa: 'دوست آن باشد که گیرد دست دوست، در پریشان‌حالی و درماندگی.',
    sentences: [
      {
        id: 1,
        en: 'Two companions were walking along a forest path when a brown bear charged.',
        fa: 'دو همسفر در راه جنگلی می‌رفتند که ناگهان خرسی قهوه‌ای به سویشان هجوم آورد.',
        phoneticFa: 'تو کامپَنیِنز وِر واکینگ اِلانگ اِ فارِست پَث وِن اِ براون بێر چارجت.',
        vocabNotes: [{ wordEn: 'Companions', wordFa: 'همسفران / یاران' }, { wordEn: 'Charged', wordFa: 'حمله آورد' }]
      },
      {
        id: 2,
        en: 'One man climbed a pine tree, leaving his companion alone on the ground.',
        fa: 'یک نفر از درخت کاج بالا رفت و رفیقش را تنها روی زمین رها کرد.',
        phoneticFa: 'وان مَن کلایمد اِ پاین تری، لیوینگ هیز کامپَنیِن اَلون آن دِ گراوند.',
        vocabNotes: [{ wordEn: 'Climbed', wordFa: 'بالا رفت' }, { wordEn: 'Alone', wordFa: 'تنها' }]
      },
      {
        id: 3,
        en: 'The other pretended to be dead; the bear sniffed his ears and walked away.',
        fa: 'دیگری خود را به مردن زد؛ خرس گوش‌هایش را بویید و رد شد و رفت.',
        phoneticFa: 'دی آدر پریتِندِد تو بی دِد؛ دِ بێر اسنیفت هیز ایرز اَند واکت اِوِی.',
        vocabNotes: [{ wordEn: 'Pretended', wordFa: 'وانمود کرد' }, { wordEn: 'Sniffed', wordFa: 'بو کشید' }]
      }
    ]
  },

  // 15
  {
    id: 'story_15',
    number: 15,
    titleEn: 'Anushiravan and the Old Walnut Planter',
    titleFa: 'انوشیروان و پیرمرد درختکار (حکمت گردو)',
    category: 'persian_heritage',
    level: 'Intermediate (B1–B2)',
    moralEn: 'Others planted so that we could eat; we plant so that others may eat.',
    moralFa: 'دیگران کاشتند و ما خوردیم، ما بکاریم تا دیگران بخورند.',
    sentences: [
      {
        id: 1,
        en: 'The king passed an eighty-year-old farmer planting a tiny walnut sapling.',
        fa: 'پادشاه از کنار کشاورزی هشتاد ساله گذشت که نهال باریک گردو می‌کاشت.',
        phoneticFa: 'دِ کینگ پَست اَن اِیتی ییر اولد فارمِر پلَنتینگ اِ تاینی والنات سَپلینگ.',
        vocabNotes: [{ wordEn: 'Walnut sapling', wordFa: 'نهال گردو' }, { wordEn: 'Farmer', wordFa: 'کشاورز' }]
      },
      {
        id: 2,
        en: 'The king asked, "Old man, will you ever live long enough to taste its nuts?"',
        fa: 'شاه پرسید: «ای پیرمرد، آیا آن‌قدر زنده خواهی ماند که میوه‌اش را بچشی؟»',
        phoneticFa: 'دِ کینگ اَسکد: اولد مَن، ویل یو اِور لیو لانگ ایناف تو تِست ایتس ناتس؟',
        vocabNotes: [{ wordEn: 'Long enough', wordFa: 'به اندازه کافی' }, { wordEn: 'Taste', wordFa: 'چشیدن' }]
      },
      {
        id: 3,
        en: 'The old man smiled and answered, "Ancestors planted and we ate; we plant so descendants can eat."',
        fa: 'پیرمرد تبسم کرد و گفت: «پیشینیان کاشتند و ما خوردیم، ما می‌کاریم تا آیندگان بخورند.»',
        phoneticFa: 'دی اولد مَن اسمایلد اَند اَنسِرد: اَنسِستِرز پلَنتِد اَند وی اِیت؛ وی پلَنت سو دیسِندَنتس کَن ایت.',
        vocabNotes: [{ wordEn: 'Ancestors', wordFa: 'اجداد و پیشینیان' }, { wordEn: 'Descendants', wordFa: 'نوادگان و آیندگان' }]
      }
    ]
  },

  // 16 to 30: curated wisdom, world literature, and Persian cultural bridges
  {
    id: 'story_16',
    number: 16,
    titleEn: 'The Wind and the Sun (Aesop)',
    titleFa: 'باد و خورشید (نیروی مهر و ملایمت)',
    category: 'fable_wisdom',
    level: 'Beginner (A1–A2)',
    moralEn: 'Warmth and kindness achieve what force and bluster never can.',
    moralFa: 'درشتی و تندی کارساز نیست؛ مهربانی جامه از تن رقیب برمی‌کند.',
    sentences: [
      {
        id: 1,
        en: 'The Wind and Sun argued over who could force a traveler to remove his coat.',
        fa: 'باد و خورشید بر سر اینکه کدام‌یک زودتر کُت مسافر را درمی‌آورند بحث کردند.',
        phoneticFa: 'دِ ویند اَند سان آرگیود اوور هو کود فورس اِ ترَوِلِر تو ریمو هیز کوت.',
        vocabNotes: [{ wordEn: 'Argued', wordFa: 'بحث کردند' }, { wordEn: 'Remove', wordFa: 'درآوردن' }]
      },
      {
        id: 2,
        en: 'The wind blew violently, but the man only wrapped his cloak tighter.',
        fa: 'باد با خشونت وزید، اما مرد تنها قبایش را محکم‌تر به دور خود پیچید.',
        phoneticFa: 'دِ ویند بلو وایولِنتلی، بات دِ مَن اونلی رَپت هیز کلوک تایتِر.',
        vocabNotes: [{ wordEn: 'Violently', wordFa: 'با شدت و خشونت' }, { wordEn: 'Tighter', wordFa: 'تنگ‌تر و سفت‌تر' }]
      },
      {
        id: 3,
        en: 'Then the sun beamed warm gentle rays, and the man took off his coat gladly.',
        fa: 'سپس خورشید پرتوهای گرم و لطیف تابید و مرد با رضایت کتش را درآورد.',
        phoneticFa: 'دِن دِ سان بیِمد وارم جِنتِل رِیز، اَند دِ مَن توک آف هیز کوت گلَدلی.',
        vocabNotes: [{ wordEn: 'Gentle rays', wordFa: 'پرتوهای ملایم' }, { wordEn: 'Gladly', wordFa: 'با میل و خوشحالی' }]
      }
    ]
  },

  {
    id: 'story_17',
    number: 17,
    titleEn: 'Hafez and the Rose of Shiraz',
    titleFa: 'حافظ و راز گل سرخ شیراز',
    category: 'persian_heritage',
    level: 'Intermediate (B1–B2)',
    moralEn: 'The scent of love and art outlasts worldly gold.',
    moralFa: 'هرگز نمیرد آنکه دلش زنده شد به عشق، ثبت است بر جریده عالم دوام ما.',
    sentences: [
      {
        id: 1,
        en: 'Beneath the cypress trees of Shiraz, the master tuned his soul to poetry.',
        fa: 'زیر سایه سروهای شیراز، استاد جان خویش را با نغمه شعر کوک کرد.',
        phoneticFa: 'بینِیث دِ سایپرِس تریز آو شیراز، دِ ماستِر تیوند هیز سول تو پویِتری.',
        vocabNotes: [{ wordEn: 'Cypress trees', wordFa: 'درختان سرو' }, { wordEn: 'Tuned', wordFa: 'تنظیم و کوک کرد' }]
      },
      {
        id: 2,
        en: 'He wrote, "No garden on earth is as radiant as the garden of the pure heart."',
        fa: 'او نوشت: «هیچ گلستانی بر روی زمین تابان‌تر از باغ دلی زلال نیست.»',
        phoneticFa: 'هی روت: نو گاردِن آن اێرث ایز اَز رِیدیَنت اَز دِ گاردِن آو دِ پیور هارت.',
        vocabNotes: [{ wordEn: 'Radiant', wordFa: 'تابان و درخشان' }, { wordEn: 'Pure heart', wordFa: 'دل پاک' }]
      }
    ]
  },

  {
    id: 'story_18',
    number: 18,
    titleEn: 'The Goose that Laid the Golden Eggs',
    titleFa: 'غاز تخم‌طلا و طمع آدمی',
    category: 'fable_wisdom',
    level: 'Beginner (A1–A2)',
    moralEn: 'Greed often destroys the very source of good fortune.',
    moralFa: 'طمع بسیار، اندک را هم بر باد می‌دهد.',
    sentences: [
      {
        id: 1,
        en: 'A cottage owner found one pure golden egg in his nest every single morning.',
        fa: 'کلبه‌نشینی هر بامداد یک تخم طلای ناب در لانه غازش می‌یافت.',
        phoneticFa: 'اِ کاتِج اونِر فاوند وان پیور گلدِن اِگ این هیز نِست اِوری سینگِل مورنینگ.',
        vocabNotes: [{ wordEn: 'Golden egg', wordFa: 'تخم طلا' }, { wordEn: 'Nest', wordFa: 'لانه' }]
      },
      {
        id: 2,
        en: 'Greedy for all the gold at once, he foolishly killed the precious bird.',
        fa: 'به طمع به دست آوردن یک‌جای طلاها، از روی نادانی پرنده گرانبها را کشت.',
        phoneticFa: 'گریدی فور آل دِ گلد اَت وانس، هی فولیشلی کِیلد دِ پرِشِس بێرد.',
        vocabNotes: [{ wordEn: 'Foolishly', wordFa: 'احمقانه و نادانسته' }, { wordEn: 'Precious', wordFa: 'گرانبها' }]
      },
      {
        id: 3,
        en: 'Inside, he discovered she was just like any other goose.',
        fa: 'در درون، دریافت که او نیز همچون غازهای دیگر بود و چیزی نیافت.',
        phoneticFa: 'اینساید، هی دیسکاوِرد شی واز جاست لایک اِنی آدر گوس.',
        vocabNotes: [{ wordEn: 'Discovered', wordFa: 'کشف کرد / فهمید' }]
      }
    ]
  },

  {
    id: 'story_19',
    number: 19,
    titleEn: 'Avicenna and the Prince with the Illness of Love',
    titleFa: 'ابن سینا و شاهزاده درمانده (علاج عشق)',
    category: 'persian_heritage',
    level: 'Advanced (C1)',
    moralEn: 'Listening to the heartbeat reveals truth when words fail.',
    moralFa: 'علت عاشق ز علت‌ها جداست، عشق اسطرلاب اسرار خداست.',
    sentences: [
      {
        id: 1,
        en: 'A young prince wasted away, suffering from an ailment no physician could cure.',
        fa: 'شاهزاده‌ای جوان بر اثر بیماری عجیبی که هیچ طبیبی درمانش نمی‌دانست آب می‌شد.',
        phoneticFa: 'اِ یانگ پرینس وِستِد اِوِی، سافِرینگ فرام اَن اِیل‌مِنت نو فیزیزَن کود کیور.',
        vocabNotes: [{ wordEn: 'Ailment', wordFa: 'بیماری و رنجوری' }, { wordEn: 'Physician', wordFa: 'طبیب / پزشک' }]
      },
      {
        id: 2,
        en: 'Avicenna held the young man’s pulse while reciting names of city streets.',
        fa: 'ابن سینا نبض جوان را به دست گرفت و نام کوچه‌های شهر را برشمرد.',
        phoneticFa: 'اَویسِنا هِلد دِ یانگ مَنز پالس وایل ریسایتینگ نِیمز آو سیتی استریتس.',
        vocabNotes: [{ wordEn: 'Pulse', wordFa: 'نبض' }, { wordEn: 'Reciting', wordFa: 'برشمردن و خواندن' }]
      },
      {
        id: 3,
        en: 'At one specific alley and maiden’s name, the pulse leaped with secret love.',
        fa: 'با ذکر نام کوچه‌ای خاص و دوشیزه‌ای، نبض از عشقی پنهان به تپش افتاد.',
        phoneticFa: 'اَت وان اسپِسیفیک اَلی اَند مِیدِنز نِیم، دِ پالس لیپت ویذ سیکرِت لاو.',
        vocabNotes: [{ wordEn: 'Leaped', wordFa: 'جهید / تپید' }, { wordEn: 'Secret love', wordFa: 'عشق پنهانی' }]
      }
    ]
  },

  {
    id: 'story_20',
    number: 20,
    titleEn: 'Molla Nasreddin and the Soup of the Duck Soup',
    titleFa: 'ملا نصرالدین و آبِ آبگوشتِ اردک!',
    category: 'humor_anecdote',
    level: 'Beginner (A1–A2)',
    moralEn: 'Empty pretexts only yield empty results.',
    moralFa: 'از تعارفات دور و بی‌ریشه، جز کاسه‌ای آب گرم نصیب نخواهد شد.',
    sentences: [
      {
        id: 1,
        en: 'A villager brought Nasreddin a fat roast duck as a pleasant gift.',
        fa: 'روستایی برای ملا اردک بریان چاقی به عنوان پیشکشی آورد.',
        phoneticFa: 'اِ ویلِجِر برات نصرالدین اِ فَت روست داک اَز اِ پلِزَنت گیفت.',
        vocabNotes: [{ wordEn: 'Roast duck', wordFa: 'اردک بریان' }, { wordEn: 'Gift', wordFa: 'پیشکش / هدیه' }]
      },
      {
        id: 2,
        en: 'A week later, strangers arrived saying, "We are the cousins of the duck-bringer!"',
        fa: 'هفته بعد غریبه‌هایی آمدند و گفتند: «ما پسرعموهای آورنده اردک هستیم!»',
        phoneticFa: 'اِ ویک لِیتر، استرِینجِرز اَرایود سِیینگ: وی آر دِ کازنْز آو دِ داک برینگِر!',
        vocabNotes: [{ wordEn: 'Strangers', wordFa: 'غریبه‌ها' }, { wordEn: 'Cousins', wordFa: 'پسرعموها / خویشان' }]
      },
      {
        id: 3,
        en: 'Nasreddin served them bowls of plain hot water, smiling: "This is the broth of the duck broth!"',
        fa: 'ملا کاسه‌ای آب داغ خالی جلویشان گذاشت و لبخند زد: «این آبِ آبِ اردک است!»',
        phoneticFa: 'نصرالدین سێرود دِم بولز آو پلِین هات واتر: دیس ایز دِ براث آو دِ داک براث!',
        vocabNotes: [{ wordEn: 'Broth', wordFa: 'آبگوشت / سوپ رقیق' }]
      }
    ]
  },

  // Stories 21 - 30 (Timeless worldwide fables and heritage treasures)
  {
    id: 'story_21',
    number: 21,
    titleEn: 'The Miller, His Son, and Their Donkey',
    titleFa: 'آسیابان، پسرش و الاغ (قضاوت مردم)',
    category: 'fable_wisdom',
    level: 'Beginner (A1–A2)',
    moralEn: 'Try to please everyone, and you will please no one.',
    moralFa: 'در بند سخن مردم بودن، حاصلی جز سرگردانی ندارد.',
    sentences: [
      {
        id: 1,
        en: 'A father and son led their donkey to market on foot.',
        fa: 'پدر و پسری پیاده الاغ خود را به سوی بازار هدایت می‌کردند.',
        phoneticFa: 'اِ فادِر اَند سان لِد دِیر دانکی تو مارکِت آن فوت.',
        vocabNotes: [{ wordEn: 'Market', wordFa: 'بازار' }, { wordEn: 'On foot', wordFa: 'پیاده' }]
      },
      {
        id: 2,
        en: 'Passersby criticized them whichever one rode or walked.',
        fa: 'رهگذران هر بار سوار یا پیاده می‌شدند از آن‌ها خرده می‌گرفتند.',
        phoneticFa: 'پاسِرزبای کریتیسایزد دِم ویچ‌اِور وان رود اور واکت.',
        vocabNotes: [{ wordEn: 'Passersby', wordFa: 'رهگذران' }, { wordEn: 'Criticized', wordFa: 'انتقاد کردند' }]
      },
      {
        id: 3,
        en: 'In the end, they carried the donkey on a pole and lost it in the river!',
        fa: 'سرانجام الاغ را بر چوبی به دوش کشیدند و الاغ در آب رودخانه افتاد!',
        phoneticFa: 'این دی اِند، دِی کَرید دِ دانکی آن اِ پول اَند لاست ایت این دِ ریور!',
        vocabNotes: [{ wordEn: 'Carried', wordFa: 'حمل کردند' }]
      }
    ]
  },

  {
    id: 'story_22',
    number: 22,
    titleEn: 'The Pearl of Oman and the Drop of Rain',
    titleFa: 'قطره باران و مروارید دریای عمان (بوستان سعدی)',
    category: 'persian_heritage',
    level: 'Intermediate (B1–B2)',
    moralEn: 'Humility turns the smallest drop into an eternal gem.',
    moralFa: 'یکی قطره باران ز ابری چکید، خجل شد چو پهنای دریا بدید...',
    sentences: [
      {
        id: 1,
        en: 'A tiny raindrop fell from a cloud into the vast open ocean.',
        fa: 'قطره باران خردی از ابری به درون اقیانوس پهناور چکید.',
        phoneticFa: 'اِ تاینی رِین‌دراپ فِل فرام اِ کلاود اینتو دِ واست اوپِن اوشِن.',
        vocabNotes: [{ wordEn: 'Raindrop', wordFa: 'قطره باران' }, { wordEn: 'Vast', wordFa: 'پهناور و بی‌کران' }]
      },
      {
        id: 2,
        en: 'Ashamed of her smallness, she whispered, "What am I beside this greatness?"',
        fa: 'از خردی خویش شرمسار شد و نالید: «در برابر این عظمت، من که باشم؟»',
        phoneticFa: 'اَشِیمد آو هێر اسمال‌نِس، شی ویسپِرد: وات اَم آی بیْساید دیس گرِیت‌نِس؟',
        vocabNotes: [{ wordEn: 'Whispered', wordFa: 'زمزمه کرد' }]
      },
      {
        id: 3,
        en: 'An oyster welcomed her humble heart, transforming her into a royal pearl.',
        fa: 'صدفی آن قلب فروتن را به آغوش کشید و او را به مرواریدی شاهوار بدل ساخت.',
        phoneticFa: 'اَن اویستِر وِلکامد هێر هامبِل هارت، ترَنسفورمینگ هێر اینتو اِ رویال پِرل.',
        vocabNotes: [{ wordEn: 'Oyster', wordFa: 'صدف' }, { wordEn: 'Pearl', wordFa: 'مروارید' }]
      }
    ]
  },

  {
    id: 'story_23',
    number: 23,
    titleEn: 'The Honest Woodcutter and the Golden Axe',
    titleFa: 'هیزم‌شکن درستکار و تبر زرین',
    category: 'fable_wisdom',
    level: 'Beginner (A1–A2)',
    moralEn: 'Honesty is always rewarded with honor and peace.',
    moralFa: 'راستی و صداقت، همواره پاداشی زرین به همراه دارد.',
    sentences: [
      {
        id: 1,
        en: 'A poor woodcutter accidentally dropped his iron axe into a deep lake.',
        fa: 'هیزم‌شکنی فقیر تصادفاً تبر آهنی‌اش در دریاچه‌ای عمیق افتاد.',
        phoneticFa: 'اِ پور وودکاتِر اَکسیدِنتِلی دراپت هیز آیرِن اَکس اینتو اِ دیپ لِیک.',
        vocabNotes: [{ wordEn: 'Woodcutter', wordFa: 'هیزم‌شکن' }, { wordEn: 'Iron axe', wordFa: 'تبر آهنی' }]
      },
      {
        id: 2,
        en: 'The spirit of the water offered gold and silver axes, but he refused both.',
        fa: 'فرشته آب تبری از طلا و سپس نقره آورد، ولی مرد هیچ‌کدام را نپذیرفت.',
        phoneticFa: 'دِ اسپیرِت آو دِ واتر آفِرد گلد اَند سیلور اَکسِز، بات هی ریفیوزد بوث.',
        vocabNotes: [{ wordEn: 'Refused', wordFa: 'رد کرد و نپذیرفت' }]
      },
      {
        id: 3,
        en: 'Impressed by his honesty, the spirit gifted him all three axes.',
        fa: 'فرشته که مجذوب صداقت او شده بود، هر سه تبر را به او هدیه کرد.',
        phoneticFa: 'ایمپرِست بای هیز آنِستی، دِ اسپیرِت گیفتِد هیم آل ثری اَکسِز.',
        vocabNotes: [{ wordEn: 'Honesty', wordFa: 'درستکاری و صداقت' }]
      }
    ]
  },

  {
    id: 'story_24',
    number: 24,
    titleEn: 'Molla Nasreddin and the Taste of Vinegar',
    titleFa: 'ملا نصرالدین و سرکه هفت‌ساله!',
    category: 'humor_anecdote',
    level: 'Beginner (A1–A2)',
    moralEn: 'Frugality without generosity benefits nobody.',
    moralFa: 'مالی که بخشیده نشود، ارزش نگهداری ندارد.',
    sentences: [
      {
        id: 1,
        en: 'A man told Nasreddin, "You have vintage vinegar that has aged forty years!"',
        fa: 'مردی به ملا گفت: «شنیده‌ام سرکه‌ای چهل‌ساله داری که بسیار کهنه و مرغوب است!»',
        phoneticFa: 'اِ مَن تولد نصرالدین: یو هَو وینتِج وینِگِر دَت هَز اِیجد فورتی ییرز!',
        vocabNotes: [{ wordEn: 'Vinegar', wordFa: 'سرکه' }, { wordEn: 'Aged', wordFa: 'جاافتاده و کهنسال' }]
      },
      {
        id: 2,
        en: 'The man requested, "Please give me a small cup to cure my headache."',
        fa: 'مرد درخواست کرد: «کمی به من بده تا سردردم آرام گیرد.»',
        phoneticFa: 'دِ مَن ریکوِستِد: پلیز گیو می اِ اسمال کاپ تو کیور مای هِدِیک.',
        vocabNotes: [{ wordEn: 'Headache', wordFa: 'سردرد' }]
      },
      {
        id: 3,
        en: 'Nasreddin replied, "If I gave it away to everyone, it would never have reached forty years!"',
        fa: 'ملا گفت: «اگر به هر کس می‌بخشیدم، هرگز چهل‌ساله نمی‌شد!»',
        phoneticFa: 'نصرالدین ریپلاید: ایف آی گِیو ایت اِوِی تو اِوری‌وان، ایت وود نِوِر هَو ریچت فورتی ییرز!',
        vocabNotes: [{ wordEn: 'Gave away', wordFa: 'بخشیدن رایگان' }]
      }
    ]
  },

  {
    id: 'story_25',
    number: 25,
    titleEn: 'The Town Mouse and the Country Mouse',
    titleFa: 'موش شهری و موش روستایی',
    category: 'daily_life',
    level: 'Beginner (A1–A2)',
    moralEn: 'A peaceful crust in safety is better than a royal feast in fear.',
    moralFa: 'نان و پنیر در آسایش، به از چلوکباب در بیم و دلهره.',
    sentences: [
      {
        id: 1,
        en: 'A town mouse invited his country cousin to taste magnificent cheese and pies.',
        fa: 'موش شهری پسرخاله روستایی‌اش را به چشیدن پنیرها و کیک‌های مجلل فراخواند.',
        phoneticFa: 'اِ تاون ماوس اینوایتِد هیز کانتری کازن تو تِست مَگنیفیسِنت چیز اَند پایز.',
        vocabNotes: [{ wordEn: 'Magnificent', wordFa: 'باشکوه و مجلل' }]
      },
      {
        id: 2,
        en: 'Midway through the feast, ferocious dogs and cats chased them into dark cracks.',
        fa: 'در میان بزم شاهانه، سگ‌ها و گربه‌های خشمگین آن‌ها را به شکاف دیوار راندند.',
        phoneticFa: 'میدوِی ثرو دِ فیست، فِروشِس داگز اَند کَتس چِیسد دِم اینتو دارک کرَکس.',
        vocabNotes: [{ wordEn: 'Feast', wordFa: 'جشن و ضیافت' }, { wordEn: 'Ferocious', wordFa: 'درنده و خشمگین' }]
      },
      {
        id: 3,
        en: 'The country mouse packed his bag: "Better bare wheat in peace than luxury in panic!"',
        fa: 'موش روستایی بقچه‌اش را بست: «گندم ساده در آرامش، به از خوان شاهانه در ترس!»',
        phoneticFa: 'دِ کانتری ماوس پَکت هیز بَگ: بَتِر بێر ویت این پیس دَن لاکژِری این پَنیک!',
        vocabNotes: [{ wordEn: 'Panic', wordFa: 'وحشت و هراس' }]
      }
    ]
  },

  {
    id: 'story_26',
    number: 26,
    titleEn: 'Kaveh the Blacksmith and the Banner of Justice',
    titleFa: 'کاوه آهنگر و درفش کاویانی (شاهنامه)',
    category: 'persian_heritage',
    level: 'Advanced (C1)',
    moralEn: 'Courage of the common people overthrows tyrants.',
    moralFa: 'چو کاوه برون شد ز درگاه شاه، برآورد فریاد بر پیشگاه.',
    sentences: [
      {
        id: 1,
        en: 'An oppressed blacksmith raised his leather leather apron on a spear.',
        fa: 'آهنگری ستمدیده پیش‌بند چرمین کار خود را بر سر نیزه افراشت.',
        phoneticFa: 'اَن آپرِست بلَک‌اسمِث رِیزد هیز لِدِر اِیپران آن اِ اسپیر.',
        vocabNotes: [{ wordEn: 'Blacksmith', wordFa: 'آهنگر' }, { wordEn: 'Spear', wordFa: 'نیزه' }]
      },
      {
        id: 2,
        en: 'He called upon the people to rise against Zahhak’s cruelty.',
        fa: 'او مردم را فراخواند تا علیه بیداد و ستم ضحاک به پا خیزند.',
        phoneticFa: 'هی کالد اَپان دِ پیپِل تو رایز اِگِینست ضحاکس کروئِلتی.',
        vocabNotes: [{ wordEn: 'Cruelty', wordFa: 'بیدادگری و ستم' }]
      },
      {
        id: 3,
        en: 'That simple leather apron became Iran’s celebrated banner of liberty.',
        fa: 'آن پیش‌بند چرمین ساده، پرچم پرآوازه آزادی و دادگری ایران‌زمین گشت.',
        phoneticFa: 'دَت سیمپِل لِدِر اِیپران بیکِیم ایرانز سِلِبریتِد بَنِر آو لیبێرتی.',
        vocabNotes: [{ wordEn: 'Liberty', wordFa: 'آزادی و رهایی' }]
      }
    ]
  },

  {
    id: 'story_27',
    number: 27,
    titleEn: 'The Ant and the Grasshopper (Aesop)',
    titleFa: 'مورچه دوراندیش و ملخ بازیگوش',
    category: 'fable_wisdom',
    level: 'Beginner (A1–A2)',
    moralEn: 'Prepare today for the wants of tomorrow.',
    moralFa: 'تابستان کار کن تا در زمستان آسوده سر بر بالین نهی.',
    sentences: [
      {
        id: 1,
        en: 'All summer long, an ant hauled grains of corn while a grasshopper sang.',
        fa: 'تمام تابستان مورچه دانه‌های ذرت را به انبار می‌برد در حالی که ملخ آواز می‌خواند.',
        phoneticFa: 'آل سامِر لانگ، اَن اَنت هالد گرِینز آو کورن وایل اِ گرَس‌هاپِر سَنگ.',
        vocabNotes: [{ wordEn: 'Hauled', wordFa: 'حمل کرد' }, { wordEn: 'Grasshopper', wordFa: 'ملخ' }]
      },
      {
        id: 2,
        en: 'When freezing snow covered the fields, the hungry grasshopper begged for food.',
        fa: 'هنگامی که برف سوزان دشت‌ها را پوشاند، ملخ گرسنه برای لقمه‌ای التماس کرد.',
        phoneticFa: 'وِن فریزینگ اسنو کاوِرد دِ فیلدز، دِ هَنگری گرَس‌هاپِر بَگد فور فود.',
        vocabNotes: [{ wordEn: 'Freezing snow', wordFa: 'برف یخبندان' }]
      },
      {
        id: 3,
        en: 'The ant replied, "You danced in summer, now dance the winter away!"',
        fa: 'مورچه گفت: «تابستان که رقصیدی، حال در سوز زمستان نیز پایکوبی کن!»',
        phoneticFa: 'دی اَنت ریپلاید: یو دَنست این سامِر، ناو دَنس دِ وینتِر اِوِی!',
        vocabNotes: [{ wordEn: 'Replied', wordFa: 'پاسخ داد' }]
      }
    ]
  },

  {
    id: 'story_28',
    number: 28,
    titleEn: 'Molla Nasreddin and the Mirror',
    titleFa: 'ملا نصرالدین و کشف آینه!',
    category: 'humor_anecdote',
    level: 'Beginner (A1–A2)',
    moralEn: 'Self-awareness requires looking into the glass with clarity.',
    moralFa: 'آینه چون نقش تو بنمود راست، خود شکن آینه شکستن خطاست.',
    sentences: [
      {
        id: 1,
        en: 'Nasreddin found a shiny silver mirror in the grass for the first time.',
        fa: 'ملا برای نخستین بار آینه‌ای سیمین و درخشان میان علف‌ها پیدا کرد.',
        phoneticFa: 'نصرالدین فاوند اِ شاینی سیلور میرور این دِ گرَس فور دِ فێرست تایم.',
        vocabNotes: [{ wordEn: 'Mirror', wordFa: 'آینه' }, { wordEn: 'Grass', wordFa: 'علفزار' }]
      },
      {
        id: 2,
        en: 'Peering into the glass, he gasped: "Pardon me brother, I didn’t know it was yours!"',
        fa: 'در شیشه نگریست و حیران گفت: «ببخش برادر! نمی‌دانستم تو اینجا خوابیده‌ای!»',
        phoneticFa: 'پیرینگ اینتو دِ گلَس، هی گَسپت: پاردِن می برادِر، آی دیدِنت نو ایت واز یورز!',
        vocabNotes: [{ wordEn: 'Pardon me', wordFa: 'مرا ببخش' }]
      },
      {
        id: 3,
        en: 'He carefully placed it back so as not to disturb the reflection.',
        fa: 'آینه را آرام سر جایش گذاشت تا مزاحم آن مرد نشود!',
        phoneticFa: 'هی کِرفولی پلِست ایت بَک سو اَز نات تو دیستِرب دِ ریفلِکشِن.',
        vocabNotes: [{ wordEn: 'Reflection', wordFa: 'تصویر و بازتاب' }]
      }
    ]
  },

  {
    id: 'story_29',
    number: 29,
    titleEn: 'The Golden Apple and Three Weavers',
    titleFa: 'سیب زرین و سه قالی‌باف کاشان',
    category: 'persian_heritage',
    level: 'Intermediate (B1–B2)',
    moralEn: 'Master craftsmanship transforms thread into eternal poetry.',
    moralFa: 'تار و پود عشق و اصالت، با هنر سرانگشتان معنا می‌یابد.',
    sentences: [
      {
        id: 1,
        en: 'Three master carpet weavers competed to knot the most breathtaking silk garden.',
        fa: 'سه استاد قالی‌باف به رقابت برخاستند تا چشم‌نوازترین باغ ابریشم را گره زنند.',
        phoneticFa: 'ثری ماستِر کارپِت ویوِرز کامپیتِد تو نات دِ موست برِث‌تِیکینگ سیلک گاردِن.',
        vocabNotes: [{ wordEn: 'Weavers', wordFa: 'بافندگان' }, { wordEn: 'Silk', wordFa: 'ابریشم' }]
      },
      {
        id: 2,
        en: 'The eldest knotted geometry; the second dyed rich indigo and madder.',
        fa: 'اولی نقشه هندسی نگاشت، دومی نیل و روناس درخشان در هم آمیخت.',
        phoneticFa: 'دی اِلدِست ناتِد جِیامِتری؛ دِ سِکِند داید ریچ ایندیگو اَند مَدِر.',
        vocabNotes: [{ wordEn: 'Indigo', wordFa: 'نیل طبیعی' }, { wordEn: 'Madder', wordFa: 'روناس' }]
      },
      {
        id: 3,
        en: 'The youngest wove his mother’s lullaby into the border, captivating every heart.',
        fa: 'جوان‌ترین لالایی مادر را بر حاشیه تاروپود نشاند و دل همگان را ربود.',
        phoneticFa: 'دِ یانگِست ووو هیز مادِرز لالابای اینتو دِ بوردِر، کَپتیوِیتینگ اِوری هارت.',
        vocabNotes: [{ wordEn: 'Lullaby', wordFa: 'لالایی مادر' }, { wordEn: 'Border', wordFa: 'حاشیه فرش' }]
      }
    ]
  },

  {
    id: 'story_30',
    number: 30,
    titleEn: 'The Starfish on the Shore',
    titleFa: 'ستاره دریایی و پسرک ساحل',
    category: 'fable_wisdom',
    level: 'Beginner (A1–A2)',
    moralEn: 'Even if you cannot save everyone, you make a world of difference to the one you help.',
    moralFa: 'شاید نتوانی تمام جهان را نجات دهی، ولی برای آن یکی که یاری‌اش کردی، جهانی را ساختی.',
    sentences: [
      {
        id: 1,
        en: 'Thousands of starfish were stranded on the beach under a blazing sun.',
        fa: 'هزاران ستاره دریایی زیر آفتاب سوزان بر ماسه‌های ساحل گرفتار شده بودند.',
        phoneticFa: 'ثاوزَندز آو استارفیش وِر استرَندِد آن دِ بیچ آندر اِ بلِیزینگ سان.',
        vocabNotes: [{ wordEn: 'Starfish', wordFa: 'ستاره دریایی' }, { wordEn: 'Stranded', wordFa: 'به گل نشسته و گرفتار' }]
      },
      {
        id: 2,
        en: 'An old man saw a boy tossing them gently back into the waves one by one.',
        fa: 'پیرمردی دید پسربچه‌ای دانه‌دانه آن‌ها را با مهربانی به درون امواج برمی‌گرداند.',
        phoneticFa: 'اَن اولد مَن سا اِ بوی تاسینگ دِم جِنتلی بَک اینتو دِ وِیوْز وان بای وان.',
        vocabNotes: [{ wordEn: 'Tossing', wordFa: 'پرتاب کردن آرام' }, { wordEn: 'Waves', wordFa: 'امواج' }]
      },
      {
        id: 3,
        en: 'He said, "There are miles of beach! Does your effort really make a difference?"',
        fa: 'گفت: «کیلومترها ساحل پر است! آیا کار تو فرقی هم به حال این‌ها می‌کند؟»',
        phoneticFa: 'هی سِد: دِر آر مایلز آو بیچ! دَز یور اِفورت ریِلی مِیک اِ دیفرِنس؟',
        vocabNotes: [{ wordEn: 'Effort', wordFa: 'تلاش و کوشش' }]
      },
      {
        id: 4,
        en: 'The boy tossed another into the water and smiled: "It made a difference to that one!"',
        fa: 'پسرک ستاره دیگری را به آب سپرد و تبسم کرد: «برای این یکی دنیا فرق کرد!»',
        phoneticFa: 'دِ بوی تdefault_api:аст اَنادر اینتو دِ واتر اَند اسمایلد: ایت مِید اِ دیفرِنس تو دَت وان!',
        vocabNotes: [{ wordEn: 'Smiled', wordFa: 'لبخند زد' }]
      }
    ]
  }
];
