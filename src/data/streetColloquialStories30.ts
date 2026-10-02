export interface StorySentence {
  id: number;
  en: string;
  enCasualFast?: string;
  fa: string;
  faColloquial: string;
  phoneticFa: string;
  vocabNotes: { wordEn: string; wordFa: string; slangExplanationFa?: string }[];
}

export interface StreetColloquialStory {
  id: string;
  number: number;
  titleEn: string;
  titleFa: string;
  settingFa: string;
  culturalNoteFa: string;
  keySlangTakeawayFa: string;
  sentences: StorySentence[];
}

export const THIRTY_COLLOQUIAL_STORIES: StreetColloquialStory[] = [
  // 1
  {
    id: 'colloq_1',
    number: 1,
    titleEn: '1. Coffee Shop Rush & Splitting the Bill',
    titleFa: '۱. شلوغی کافه و دنگ حساب کردن (دست به جیب نشو!)',
    settingFa: 'کافه شلوغ صبحگاهی در نیویورک / تهران',
    culturalNoteFa: 'اصطلاح "It’s on me" معادل «مهمون من باش!» است و "Go Dutch" یعنی «دنگی‌دونگی حساب کردن».',
    keySlangTakeawayFa: 'I got this! / Put your wallet away! / Let’s go Dutch!',
    sentences: [
      {
        id: 1,
        en: 'Hey bro, put your wallet away right now! I got this, it’s totally on me today.',
        enCasualFast: "Hey bro, putcher wallet away! I got this, totally on me.",
        fa: 'هی داداش، همین الان کیفت رو بذار تو جیبت! من حساب می‌کنم، امروز کلاً مهمون من هستی.',
        faColloquial: 'داداش دست به جیب نشو! خودم حساب می‌کنم، امروز سر تا پاش مهمون منی.',
        phoneticFa: 'هِی برو، پوت یور والِت اِوِی! آی گات دیس، ایتس توتِلی آن می.',
        vocabNotes: [
          { wordEn: 'Put your wallet away', wordFa: 'دست به جیب نشو', slangExplanationFa: 'تعارف صمیمی برای حساب کردن صورت‌حساب' },
          { wordEn: "It's on me", wordFa: 'مهمون من', slangExplanationFa: 'خرج پای من است' }
        ]
      },
      {
        id: 2,
        en: 'No way man, you covered the tab last Friday! Come on, let’s just go Dutch and split it down the middle.',
        enCasualFast: "No way man, you covered the tab last week! Let's go Dutch and split it.",
        fa: 'عمراً رفیق، جمعه پیش کل صورت‌حساب رو تو حساب کردی! بیا دنگی حساب کنیم و نصف‌نصف بدیم.',
        faColloquial: 'نه بابا عمراً! هفته پیش کل حسابو تو پیاده شدی. بیا دنگی‌دونگی نصف کنیم.',
        phoneticFa: 'نو وِی مَن، یو کاوِرد دِ تَب! لِتس گو داچ اَند اسپلیت ایت.',
        vocabNotes: [
          { wordEn: 'Covered the tab', wordFa: 'حساب میز را صاف کردن', slangExplanationFa: 'پرداخت صورت‌حساب بار یا رستوران' },
          { wordEn: 'Go Dutch', wordFa: 'دنگی حساب کردن', slangExplanationFa: 'هرکس سهم خودش را بدهد' }
        ]
      },
      {
        id: 3,
        en: 'Fine, but next round of iced lattes is strictly on you, deal?',
        enCasualFast: "Fine, but next round's on you, deal?",
        fa: 'خیلی خب، اما دور بعدی آیس‌لاته‌ها صددرصد به پای توئه، قبوله؟',
        faColloquial: 'باشه، ولی دفعه بعد قهوه‌ها رو تو باید گردن بگیری، حله؟',
        phoneticFa: 'فاین، بات نِکست راوند ایز آن یو، دیل؟',
        vocabNotes: [{ wordEn: 'Deal?', wordFa: 'قبوله؟ / حله؟', slangExplanationFa: 'بستن قرارداد یا توافق دوستانه' }]
      }
    ]
  },

  // 2
  {
    id: 'colloq_2',
    number: 2,
    titleEn: '2. Haggling at the Flea Market (No Rip-Offs!)',
    titleFa: '۲. چانه‌زنی تو جمعه‌بازار (سر ما کلاه نذار!)',
    settingFa: 'شنبه‌بازار خیابانی عتیقه‌جات و لباس در لندن / بازار تهران',
    culturalNoteFa: 'کلمه Rip-off یعنی گران‌فروشی شاخ‌دار! برای تخفیف گرفتن از "Can you cut me a deal?" استفاده می‌کنند.',
    keySlangTakeawayFa: 'That’s a total rip-off! / Cut me some slack / Final offer',
    sentences: [
      {
        id: 1,
        en: 'Are you kidding me? A hundred bucks for this vintage jacket is a total rip-off!',
        enCasualFast: "You kiddin' me? A hundred bucks is a total rip-off!",
        fa: 'شوخی می‌کنی با من؟ صد دلار برای این کاپشن قدیمی واقعاً کلاهبرداری و گرون‌فروشیه!',
        faColloquial: 'داری شوخی می‌کنی؟! صد چوق برای این کاپشن کهنه؟ رسماً داری کلاه می‌ذاری سرمون!',
        phoneticFa: 'آر یو کیدینگ می؟ اِ هاندِرد باکس فور دیس جیکِت ایز اِ ریپ‌آف!',
        vocabNotes: [
          { wordEn: 'Bucks', wordFa: 'دلار (اصطلاح عامیانه)', slangExplanationFa: 'Buck = یک دلار آمریکا' },
          { wordEn: 'Rip-off', wordFa: 'گران‌فروشی شدید / تیغ زدن' }
        ]
      },
      {
        id: 2,
        en: 'Come on, cut me some slack and give me a decent bargain! I’ve only got fifty bucks in cash.',
        enCasualFast: "C'mon, cut me some slack! I only got fifty in cash.",
        fa: 'بی‌خیال، یه کم به ما تخفیف بده و هوامون رو داشته باش! من کلاً پنجاه دلار نقد دارم.',
        faColloquial: 'کوتاه بیا دیگه داداش، یه تخفیف مشتی بده! کلاً پنجاه تومن نقد تو جیبمه.',
        phoneticFa: 'کام آن، کات می سام اسلَک! آی اونلی گات فیفتی باکس این کَش.',
        vocabNotes: [{ wordEn: 'Cut me some slack', wordFa: 'یه کم با ما راه بیا / هوامون رو داشته باش' }]
      },
      {
        id: 3,
        en: 'Alright, meet me in the middle at sixty-five, and it’s yours. Take it or leave it!',
        enCasualFast: "Alright, sixty-five. Take it or leave it!",
        fa: 'خیلی خب، وسطش رو بگیریم شصت و پنج تا و مال تو. می‌خوای بخواه، نمی‌خوای نخواه!',
        faColloquial: 'خیلی خب، نه سیخ بسوزه نه کباب، شصت و پنج تومن بردار ببر. حرف آخرمه!',
        phoneticFa: 'آل‌رایت، میت می این دِ میدِل اَت سیکستی فایو. تِیک ایت اور لیو ایت!',
        vocabNotes: [
          { wordEn: 'Meet in the middle', wordFa: 'نه سیخ بسوزه نه کباب / وسطش رو گرفتن' },
          { wordEn: 'Take it or leave it', wordFa: 'حرف آخر / همینه که هست' }
        ]
      }
    ]
  },

  // 3
  {
    id: 'colloq_3',
    number: 3,
    titleEn: '3. Stuck in Bumper-to-Bumper Traffic',
    titleFa: '۳. گیر افتادن تو ترافیک وحشتناک (کلافه‌ام کردی!)',
    settingFa: 'پشت فرمان اتومبیل در اتوبان همت یا لس‌آنجلس 405',
    culturalNoteFa: 'کلمه "Bumper-to-bumper" یعنی سپر به سپر و "Going crazy" یعنی دیوانه شدن از معطلی.',
    keySlangTakeawayFa: 'Bumper-to-bumper / Crawling at snail’s pace / Driving me nuts',
    sentences: [
      {
        id: 1,
        en: 'Man, we’ve been stuck in this bumper-to-bumper traffic for forty straight minutes!',
        enCasualFast: "Man, we been stuck in bumper-to-bumper for forty minutes!",
        fa: 'پسر، چهل دقیقه کاملِ که تو این ترافیکِ سپر به سپر گیر افتادیم!',
        faColloquial: 'داداش چهل دقیقه است قفل کردیم تو این ترافیک خر تو خر!',
        phoneticFa: 'مَن، وی بین استاک این بامپِر تو بامپِر ترَفیک فور فورتی مینِتس!',
        vocabNotes: [{ wordEn: 'Bumper-to-bumper', wordFa: 'ترافیک سنگین سپر به سپر' }]
      },
      {
        id: 2,
        en: 'Cars are crawling at a snail’s pace. This constant honking is honestly driving me nuts!',
        enCasualFast: "Cars're crawlin' like snails. Honkin' is drivin' me nuts!",
        fa: 'ماشین‌ها مثل حلزون حرکت می‌کنند. این بوق زدن مدام واقعاً داره من رو روانی می‌کنه!',
        faColloquial: 'ماشین‌ها دارن مورچه‌ای می‌رن. این بوق‌های ممتد رسماً رفته رو مخم!',
        phoneticFa: 'کارز آر کرالینگ اَت اِ اسنِیلز پِیس. دیس ایز درایوینگ می ناتس!',
        vocabNotes: [
          { wordEn: 'Crawling at a snail’s pace', wordFa: 'حرکت حلزونی و بسیار کند' },
          { wordEn: 'Driving me nuts', wordFa: 'رو اعصابم رفتن / کلافه کردن' }
        ]
      },
      {
        id: 3,
        en: 'Take the next off-ramp! Let’s cut through the back alleys to avoid the bottleneck.',
        enCasualFast: "Take the next exit! Let's cut through the alleys.",
        fa: 'از خروجی بعدی بپیچ! بیا از تو کوچه‌پس‌کوچه‌ها میان‌بُر بزنیم تا به گلوگاه ترافیک نخوریم.',
        faColloquial: 'از خروجی بعدی بپیچ! بیا از پس‌کوچه‌ها میانبر بزنیم تا تو گره ترافیک نیفتیم.',
        phoneticFa: 'تِیک دِ نِکست آف-رَمپ! لِتس کات ثرو دِ اَلیز.',
        vocabNotes: [
          { wordEn: 'Off-ramp', wordFa: 'خروجی بزرگراه / رمپ' },
          { wordEn: 'Bottleneck', wordFa: 'گره کور ترافیک / گلوگاه' }
        ]
      }
    ]
  },

  // 4
  {
    id: 'colloq_4',
    number: 4,
    titleEn: '4. Office Gossip & The Spilled Beans',
    titleFa: '۴. شایعه دم آب‌سردکن و لو رفتن قضیه (دهن‌لقی نکن!)',
    settingFa: 'آبدارخانه یا استراحتگاه محل کار',
    culturalNoteFa: 'اصطلاح "Spill the beans" یعنی بند آب دادن یا لو دادن راز، و "Keep it under wraps" یعنی سکرت نگه داشتن.',
    keySlangTakeawayFa: 'Spill the beans / Keep it under wraps / Zip your lips',
    sentences: [
      {
        id: 1,
        en: 'Listen, you’ve got to keep this strictly under wraps. Don’t spill the beans to anyone!',
        enCasualFast: "Keep this under wraps! Don't spill the beans, alright?",
        fa: 'گوش کن، باید این قضیه رو کاملاً مخفی نگه داری. به هیچ‌کس لو نده و بند به آب نده!',
        faColloquial: 'ببین این حرف بین خودمون بمونه‌ها! یه وقت دهن‌لقی نکنی قضیه رو لو بدی!',
        phoneticFa: 'لیسِن، یو گات تو کیپ دیس آندر رَپس. دونت اسپیل دِ بینز!',
        vocabNotes: [
          { wordEn: 'Keep under wraps', wordFa: 'مخفی نگه داشتن / سکرت' },
          { wordEn: 'Spill the beans', wordFa: 'لو دادن راز / بند به آب دادن' }
        ]
      },
      {
        id: 2,
        en: 'My lips are sealed! What happened? Did the boss finally fire that lazy slacker?',
        enCasualFast: "Lips are sealed! Did the boss sack that slacker?",
        fa: 'دهنم قرص و قفله! چی شده؟ آیا بالاخره رئیس اون تنبلِ از زیر کار دررو رو اخراج کرد؟',
        faColloquial: 'خیالت راحت، دهنم قرصه! چی شده مگه؟ بالاخره رئیس اون یارو تن‌پرور رو شوت کرد بیرون؟',
        phoneticFa: 'مای لیپس آر سیلد! دید دِ باس فایر دَت اِسلَکِر؟',
        vocabNotes: [
          { wordEn: 'My lips are sealed', wordFa: 'دهنم قرص است' },
          { wordEn: 'Slacker', wordFa: 'تنبل / علاف / از زیر کار دررو' }
        ]
      },
      {
        id: 3,
        en: 'Worse! He got promoted! Unbelievable, he’s totally sucking up to management.',
        enCasualFast: "Worse! Got promoted! Total brown-noser.",
        fa: 'بدتر! ارتقای شغلی گرفت! باورنکردنیه، حسابی داره برای مدیرها خودشیرینی و پاچه‌خواری می‌کنه.',
        faColloquial: 'بدتر بابا! پست گرفت! یارو هیچی بلد نیست ولی تا دلت بخواد پاچه‌خواری می‌کنه.',
        phoneticFa: 'وێرس! هی گات پروموتِد! توتِلی ساکینگ آپ تو مَنِیجمِنت.',
        vocabNotes: [{ wordEn: 'Suck up to', wordFa: 'پاچه‌خواری و خود‌شیرینی کردن' }]
      }
    ]
  },

  // 5
  {
    id: 'colloq_5',
    number: 5,
    titleEn: '5. The Flea-Bitten Apartment & Leaky Faucet',
    titleFa: '۵. جروبحث با صاحب‌خانه سرِ خرابی شیر آب (خونه کلنگی!)',
    settingFa: 'تماس تلفنی پرخاشگرانه با صاحب‌خانه در ونکوور یا لندن',
    culturalNoteFa: 'عبارت "Cut the crap" یعنی مزخرف نگو و حاشیه نرو! و "Sort this out" یعنی مشکل رو فوراً حل کن.',
    keySlangTakeawayFa: 'Cut the crap / Run-down dump / Sort it out ASAP',
    sentences: [
      {
        id: 1,
        en: 'Look landlord, cut the excuses! The kitchen pipe burst and my floor is flooded.',
        enCasualFast: "Look, cut the crap! Kitchen pipe burst and it's floodin'.",
        fa: 'ببین آقای صاحب‌خانه، بهانه‌ها رو بذار کنار! لوله آشپزخانه ترکیده و آب کف خونه رو برداشته.',
        faColloquial: 'آقا بهانه‌تراشی نکن! لوله آشپزخونه ترکیده و خونه رو آب برداشته.',
        phoneticFa: 'لوک لَندلورد، کات دی اِکسکیوزِز! دِ پایپ بێرست اَند فلوور ایز فلادِد.',
        vocabNotes: [{ wordEn: 'Cut the excuses / Cut the crap', wordFa: 'بهانه نیاور / حاشیه نرو' }]
      },
      {
        id: 2,
        en: 'I pay top dollar for rent every first of the month, not to live in a run-down dump!',
        enCasualFast: "I pay top dollar, not to live in this dump!",
        fa: 'من اول هر ماه بالاترین کرایه رو می‌دم، نه اینکه توی یه دخمه داغون و کلنگی زندگی کنم!',
        faColloquial: 'من سر برج اجاره نقدی و سنگین می‌دم، نیومدم تو این خراب‌شده زندگی کنم!',
        phoneticFa: 'آی پِی تاپ دالار، نات تو لیو این اِ ران-داون دامپ!',
        vocabNotes: [
          { wordEn: 'Top dollar', wordFa: 'پول کلان / کرایه بالا' },
          { wordEn: 'Run-down dump', wordFa: 'خراب‌شده / دخمه کهنه و داغون' }
        ]
      },
      {
        id: 3,
        en: 'Send a licensed plumber today, or I’m calling the municipal tenant board immediately.',
        enCasualFast: "Send a plumber today, or I'm callin' the tenant board.",
        fa: 'همین امروز یه لوله‌کش ماهر بفرست، وگرنه فوراً به اداره حمایت از مستاجران شهرداری زنگ می‌زنم.',
        faColloquial: 'یا امروز لوله‌کش می‌فرستی درستش کنه، یا همین الان زنگ می‌زنم صنف شکایتت رو می‌کنم.',
        phoneticFa: 'سِند اِ پلَامِر تودِی، اور آیم کالینگ دِ تِنَنت بورد.',
        vocabNotes: [{ wordEn: 'Plumber', wordFa: 'لوله‌کش (تلفظ: پلامِر - ب خوانده نمی‌شود)' }]
      }
    ]
  },

  // 6
  {
    id: 'colloq_6',
    number: 6,
    titleEn: '6. Gym Bros & Pushing Past the Burn',
    titleFa: '۶. رفقای باشگاه بدن‌سازی (کم نیار داداش، یکی دیگه بزن!)',
    settingFa: 'باشگاه ورزشی و زیر وزنه هالتر',
    culturalNoteFa: 'در باشگاه "Pumped" یعنی پرانرژی و "One more rep" یعنی یک تکرار بیشتر.',
    keySlangTakeawayFa: 'Hit the gym / No pain no gain / Beast mode',
    sentences: [
      {
        id: 1,
        en: 'Come on bro, don’t chicken out now! Give me two more reps, all you!',
        enCasualFast: "C'mon man, don't wimp out! Two more reps, all you!",
        fa: 'زود باش داداش، الان جا نزن و جاخالی نکن! دو تا حرکت دیگه بزن، همه‌اش با خودته!',
        faColloquial: 'کم نیار پهلوون! دو تا تکرار دیگه بزن، خودت تنهایی می‌تونی، یا علی!',
        phoneticFa: 'کام آن برو، دونت چیکِن آوت ناو! گیو می تو مور رِپس!',
        vocabNotes: [
          { wordEn: 'Chicken out / Wimp out', wordFa: 'جا زدن از ترس / بزدلی نشان دادن' },
          { wordEn: 'Reps', wordFa: 'تکرار حرکت در بدن‌سازی' }
        ]
      },
      {
        id: 2,
        en: 'My chest is literally on fire, man! I’m totally exhausted and wiped out.',
        enCasualFast: "Chest is on fire! Totally gassed, bro.",
        fa: 'سینه‌ام رسماً داره آتیش می‌گیره مرد! من کلاً نفسم بند اومده و جنازه‌ام.',
        faColloquial: 'عضلاتم داره می‌ترکه داداش! رسماً بریدم و انرژی‌م ته کشیده.',
        phoneticFa: 'مای چِست ایز فایِر! آیم توتِلی اِگزاستِد اَند وایپت آوت.',
        vocabNotes: [{ wordEn: 'Wiped out / Gassed', wordFa: 'بریده / جنازه از خستگی' }]
      },
      {
        id: 3,
        en: 'Pain is temporary, pride is forever! Rack the barbell and let’s grab protein shakes.',
        enCasualFast: "Rack the weights, let's grab shakes!",
        fa: 'درد موقتیه، اما افتخار همیشگیه! وزنه رو بذار روی پایه و بریم شیک پروتئین بزنیم.',
        faColloquial: 'دردش یه لحظه‌ست، هیکلش موندگار! هالتِر رو بذار سر جاش بریم یه شیک مشتی بزنیم.',
        phoneticFa: 'پِین ایز تِمپورِری! رَک دِ باربِل اَند گرَب پروتیین شِیکس.',
        vocabNotes: [{ wordEn: 'Rack the barbell', wordFa: 'گذاشتن میله هالتر روی پایه' }]
      }
    ]
  },

  // 7
  {
    id: 'colloq_7',
    number: 7,
    titleEn: '7. The Awkward Blind Date',
    titleFa: '۷. قرار ملاقات معذب‌کننده (پاشو فلنگ رو ببندیم!)',
    settingFa: 'رستوران شیک و مکالمه بی‌حاصل دو نفر',
    culturalNoteFa: 'کلمه "Bail" یعنی در رفتن و فلنگ را بستن! "Ghosting" یعنی غیب شدن و جواب ندادن.',
    keySlangTakeawayFa: 'Total disaster / Bail out / Phony attitude',
    sentences: [
      {
        id: 1,
        en: 'Text message: "SOS! This date is a total train wreck. He won’t stop talking about his ex!"',
        enCasualFast: "SOS! Total train wreck. Dude talks only about his ex!",
        fa: 'پیامک اضطراری: «به دادم برس! این قرار رسماً فاجعه تمام‌عیاره. مدام داره از نامزد سابقش حرف می‌زنه!»',
        faColloquial: 'اس‌ام‌اس: «به دادم برس! قراره رسماً گند خورده توش! یارو فقط داره از عشق سابقش فک می‌زنه!»',
        phoneticFa: 'اِس او اِس! دیس دِیت ایز اِ ترِین رِک. هی وُنت استاپ تاکینگ اِباوت هیز اِکس!',
        vocabNotes: [
          { wordEn: 'Train wreck', wordFa: 'فاجعه تمام‌عیار / افتضاح' },
          { wordEn: 'Ex', wordFa: 'همسر یا نامزد سابق' }
        ]
      },
      {
        id: 2,
        en: 'Call me in two minutes and fake a family emergency so I can bail gracefully!',
        enCasualFast: "Call me in two and fake an emergency so I can bounce!",
        fa: 'دو دقیقه دیگه بهم زنگ بزن و وانمود کن یه موقعیت اضطراری پیش اومده تا بتونم آبرومندانه فلنگ رو ببندم!',
        faColloquial: 'دو دقیقه دیگه زنگ بزن بگو کار فوری پیش اومده تا بتونم شیک از معرکه فرار کنم!',
        phoneticFa: 'کال می این تو مینِتس اَند فِیک اَن ایمِرجِنسی سو آی کَن بِیل!',
        vocabNotes: [
          { wordEn: 'Fake an emergency', wordFa: 'صحنه‌سازی کار اضطراری' },
          { wordEn: 'Bail / Bounce', wordFa: 'جیم شدن / در رفتن' }
        ]
      }
    ]
  },

  // 8
  {
    id: 'colloq_8',
    number: 8,
    titleEn: '8. Street Food Truck & Super Spicy Tacos',
    titleFa: '۸. سفارش غذا کنار دکه خیابونی (دهنم سوخت!)',
    settingFa: 'فودتراک شلوغ غذاهای خیابانی',
    culturalNoteFa: 'اصطلاح "On the house" یعنی مهمان مدیریت یا رایگان است.',
    keySlangTakeawayFa: 'Extra kick / Burning my tongue off / On the house',
    sentences: [
      {
        id: 1,
        en: 'Hey chief, give me two beef tacos with extra jalapeño kick, but easy on the onions!',
        enCasualFast: "Hey chief, two tacos, spicy kick, easy on onions!",
        fa: 'هی اوستا، دو تا تاکوی گوشت با فلفل تند بده، اما پیازش رو کم بریز!',
        faColloquial: 'اوستا دو تا ساندویچ تند و آتیشی ردیف کن، فقط پیازش رو کم‌ملات بذار!',
        phoneticFa: 'هِی چیف، گیو می تو بیف تاکوز ویذ اِکسترا هالاپینیو کیک، ایزی آن دی آنیِنز!',
        vocabNotes: [
          { wordEn: 'Chief / Boss', wordFa: 'اوستا / قربان (خطاب خودمانی)' },
          { wordEn: 'Easy on ...', wordFa: 'کمتر ریختن چیزی (مثلاً کم پیاز)' }
        ]
      },
      {
        id: 2,
        en: 'Holy smokes! This hot sauce is melting my face off. Hand me a cold bottle of soda quick!',
        enCasualFast: "Holy cow! Sauce is burnin' my tongue off. Cold soda, quick!",
        fa: 'یا خدا! این سس تند داره صورتم رو آب می‌کنه. سریع یه شیشه نوشابه خنک بده دستم!',
        faColloquial: 'یا اباالفضل! این سس نیست که، اسید خالصه! زودی یه نوشابه تگری بده دهنم سوخت!',
        phoneticFa: 'هولی اسموکس! دیس هات ساس ایز مِلتینگ مای فِیس آف!',
        vocabNotes: [
          { wordEn: 'Holy smokes / Holy cow', wordFa: 'یا خدا! / عجب چیزی!' },
          { wordEn: 'Melting my face off', wordFa: 'دهنم رو به آتیش کشید' }
        ]
      }
    ]
  },

  // 9
  {
    id: 'colloq_9',
    number: 9,
    titleEn: '9. Flight Delay at the Airport Terminal',
    titleFa: '۹. تاخیر اعصاب‌خردکن پرواز (پروازمون پرید!)',
    settingFa: 'سالن انتظار فرودگاه بین‌المللی',
    culturalNoteFa: 'عبارت "Bummer" یعنی بدشانسی و ضدحال بزرگ.',
    keySlangTakeawayFa: 'What a bummer / Grounded / Compensation voucher',
    sentences: [
      {
        id: 1,
        en: 'What a massive bummer! The red-eye flight to Chicago is grounded due to blizzard weather.',
        enCasualFast: "What a bummer! Red-eye's cancelled due to snow.",
        fa: 'عجب ضدحال سنگینی! پرواز شبانه به شیکاگو به خاطر کولاک زمین‌گیر و لغو شد.',
        faColloquial: 'عجب بدشانسی‌ای! پرواز شبونه‌مون به خاطر برف و بوران پرید و کنسله.',
        phoneticFa: 'وات اِ مَسیو بامِر! دِ رد-آی فلایت ایز گراوندِد.',
        vocabNotes: [
          { wordEn: 'Bummer', wordFa: 'ضدحال / اتفاق ناخوشایند' },
          { wordEn: 'Red-eye flight', wordFa: 'پرواز آخر شب تا صبح' }
        ]
      },
      {
        id: 2,
        en: 'Let’s march over to the gate agent and demand hotel vouchers and meal tickets right away.',
        enCasualFast: "Let's demand hotel vouchers from the agent.",
        fa: 'بیا بریم دم گیت سراغ مسئول پرواز و همین الان کوپن هتل و غذای رایگان بگیریم.',
        faColloquial: 'پاشو بریم یقه متصدی رو بگیریم تا کوپن هتل و ژتون شام رایگان نگرفتیم ول نمی‌کنیم.',
        phoneticFa: 'لِتس مارچ اوور تو دِ گِیت اِیجِنت اَند دیمَند هتل واوچِرز.',
        vocabNotes: [{ wordEn: 'Voucher', wordFa: 'کوپن یا برگه تخفیف/هتل' }]
      }
    ]
  },

  // 10
  {
    id: 'colloq_10',
    number: 10,
    titleEn: '10. Smartphone Battery at 1% & Street Directions',
    titleFa: '۱۰. شارژ ۱ درصد گوشی و گم شدن تو شهر (شارژر دم دستته؟)',
    settingFa: 'وسط خیابان غریب در باران',
    culturalNoteFa: 'کلمه "Dying" برای باتری یعنی در حال خاموش شدن است.',
    keySlangTakeawayFa: 'My phone is dying / Power bank / Lost in the boonies',
    sentences: [
      {
        id: 1,
        en: 'Shoot! My phone is dying, it’s literally sitting at one percent and Google Maps crashed!',
        enCasualFast: "Shoot! Battery's at one percent, maps just died!",
        fa: 'ای وای! گوشیم داره خاموش می‌شه، دقیقاً روی یک درصده و نقشه هم پرید!',
        faColloquial: 'ای داد بیداد! شارژ گوشیم تمومه، رو یه درصده و نقشه هم پرید!',
        phoneticFa: 'شوت! مای فون ایز دایینگ، ایتس اَت وان پِرسِنت!',
        vocabNotes: [{ wordEn: 'My phone is dying', wordFa: 'شارژ گوشیم داره تموم میشه' }]
      },
      {
        id: 2,
        en: 'Do you happen to have a portable power bank, or should we just ask a local for directions?',
        enCasualFast: "Got a power bank, or ask someone for directions?",
        fa: 'آیا پاوربانک همراهت داری، یا اینکه از یکی از محلی‌ها آدرس بپرسیم؟',
        faColloquial: 'پاوربانک دم دستت هست، یا از کاسب‌های محل بپرسیم کدوم طرفی باید بریم؟',
        phoneticFa: 'دو یو هَپِن تو هَو اِ پورتابِل پاور بَنک؟',
        vocabNotes: [{ wordEn: 'Power bank', wordFa: 'شارژر همراه' }]
      }
    ]
  },

  // 11 to 30: real street contexts (Shopping, Barbershop, Doctor, Subway, Job Interview banter, etc.)
  {
    id: 'colloq_11',
    number: 11,
    titleEn: '11. At the Local Barbershop (Just a Trim!)',
    titleFa: '۱۱. تو سلمونی محله (فقط دورش رو سفید کن، کچلم نکنی!)',
    settingFa: 'آرایشگاه مردانه در محله برانکس یا تهران',
    culturalNoteFa: 'اصطلاح "Fade" یعنی سفید کردن و سایه زدن بغل موها.',
    keySlangTakeawayFa: 'Just a trim / Low fade / Don’t butcher it',
    sentences: [
      {
        id: 1,
        en: 'Yo barber, give me a clean low fade on the sides, but leave some length on top, got it?',
        enCasualFast: "Yo, clean fade on the sides, keep the top long.",
        fa: 'سلام اوستا، بغل‌ها رو برام یه سایه تمیز و سفید بزن، ولی روی موها رو بلند بذار، حله؟',
        faColloquial: 'اوستا دورش رو قشنگ سایه بزن و خلوت کن، ولی بالا رو دست نزن بلند بمونه.',
        phoneticFa: 'یو باربِر، گیو می اِ کلین لو فِید آن دِ سایدز!',
        vocabNotes: [{ wordEn: 'Low fade', wordFa: 'سایه زدن کوتاه دور مو' }]
      },
      {
        id: 2,
        en: 'Don’t worry young man, you’re in good hands. I’ll make you look like a Hollywood movie star.',
        enCasualFast: "Don't sweat it, you're in good hands.",
        fa: 'نگران نباش جوان، دست کاربلدی افتادی. کاری می‌کنم مثل ستاره‌های هالیوود بدرخشی.',
        faColloquial: 'خیالت راحت داداش، سپردی به کاربلدش! طوری ردیفت کنم نشناسنت!',
        phoneticFa: 'دونت واری یانگ مَن، یو آر این گود هَندز.',
        vocabNotes: [{ wordEn: 'In good hands', wordFa: 'سپردن کار به کاربلد' }]
      }
    ]
  },

  {
    id: 'colloq_12',
    number: 12,
    titleEn: '12. Roommate War: Dishes Piled Up in the Sink',
    titleFa: '۱۲. دعوای هم‌خانه‌ای سرِ ظرف‌های کثیف (نوبت توئه بشوری!)',
    settingFa: 'آشپزخانه مشترک دانشجویی',
    culturalNoteFa: 'اصطلاح "Pull your weight" یعنی سهم خودت را در کارهای خانه انجام دادن.',
    keySlangTakeawayFa: 'Gross / Pull your weight / Do your dishes',
    sentences: [
      {
        id: 1,
        en: 'Dude, this sink is utterly disgusting! You left greasy pans soaking for three whole days.',
        enCasualFast: "Dude, sink is gross! Greasy pans for three days!",
        fa: 'رفیق، این سینک واقعاً چندش‌آور شده! سه روز تمامه که تابه‌های چرب رو تو آب ول کردی.',
        faColloquial: 'داداش سینک رو گند برداشته! سه روزه قابلمه‌های چرب رو ول کردی تو آب.',
        phoneticFa: 'دود، دیس سینک ایز دیسگاستینگ! یو لِفت گریسی پَنز سوکینگ.',
        vocabNotes: [{ wordEn: 'Disgusting / Gross', wordFa: 'چندش‌آور / حال‌به‌هم‌زن' }]
      },
      {
        id: 2,
        en: 'You need to pull your weight around here, man. I’m your roommate, not your maid!',
        enCasualFast: "Pull your weight! I'm your roommate, not your maid.",
        fa: 'باید سهم خودت رو توی این خونه انجام بدی. من هم‌اتاقیتم، نه کلفت و خدمتکارت!',
        faColloquial: 'یه کم مسئولیت‌پذیر باش داداش! من هم‌خونتم، نوکر بابات که نیستم!',
        phoneticFa: 'یو نید تو پول یور وِیت اِراوند هیر. آیم نات یور مِید!',
        vocabNotes: [
          { wordEn: 'Pull your weight', wordFa: 'سهم خود را در کار انجام دادن' },
          { wordEn: 'Maid', wordFa: 'خدمتکار / کلفت' }
        ]
      }
    ]
  },

  {
    id: 'colloq_13',
    number: 13,
    titleEn: '13. Borrowing a Car (Don’t Scratch My Baby!)',
    titleFa: '۱۳. امانت گرفتن ماشین (یه خط روش بندازی خونت حلاله!)',
    settingFa: 'کوچه جلوی خانه با سوئیچ خودرو',
    culturalNoteFa: 'اصطلاح "My baby" برای ماشین یعنی خودرویی که خیلی رویش تعصب دارند.',
    keySlangTakeawayFa: 'Fill the tank / Don’t scratch it / Safe driving',
    sentences: [
      {
        id: 1,
        en: 'Here are the keys, but I swear to God, if you put a single scratch on my baby, you’re dead!',
        enCasualFast: "Here're the keys. Scratch it and you're dead meat!",
        fa: 'این سوئیچ، ولی به خدا قسم اگه یه دونه خط روی این عروسک من بندازی روزگارت سیاهه!',
        faColloquial: 'بیا این سوئیچ، ولی به پیر به پیغمبر اگه یه خط رو این ماشین بیفته خونت حلاله!',
        phoneticFa: 'هیر آر دِ کیز، بات ایف یو پوت اِ اسکرَچ آن مای بِیبی، یو آر دِد!',
        vocabNotes: [{ wordEn: 'Scratch', wordFa: 'خط و خش افتادن' }]
      },
      {
        id: 2,
        en: 'Relax, I drive like a grandma! And I’ll return it with a full tank of premium gas.',
        enCasualFast: "Relax, I drive slow! I'll fill the tank with premium.",
        fa: 'خیالت راحت، من مثل مادربزرگ‌ها با احتیاط رانندگی می‌کنم! با باک پر از بنزین سوپر هم پس می‌دم.',
        faColloquial: 'آروم باش بابا، من مثل پیرمردها با دنده یک می‌رونم! باک بنزین سوپرشم پر می‌کنم تحویل می‌دم.',
        phoneticFa: 'ریلَکس، آی درایو لایک اِ گرَندما! آی ویل ریتێرن ایت ویذ اِ فول تَنک.',
        vocabNotes: [{ wordEn: 'Full tank', wordFa: 'باک پر بنزین' }]
      }
    ]
  },

  {
    id: 'colloq_14',
    number: 14,
    titleEn: '14. Late for a Job Interview (Sprint to the Subway)',
    titleFa: '۱۴. دویدن به سمت مترو برای مصاحبه کاری (دیر برسم بدبختم!)',
    settingFa: 'ورودی شلوغ ایستگاه مترو در ساعت اوج شلوغی',
    culturalNoteFa: 'اصطلاح "In a jam" یعنی در مخمصه و گیر افتادن.',
    keySlangTakeawayFa: 'In a jam / Sprint / Make or break interview',
    sentences: [
      {
        id: 1,
        en: 'Step aside please! My interview is in twenty minutes and this train is my last hope.',
        enCasualFast: "Step aside! Interview's in twenty, gotta catch this train.",
        fa: 'لطفاً برید کنار! مصاحبه من بیست دقیقه دیگه‌ست و این قطار آخرین امید منه.',
        faColloquial: 'یا علی، بدید کنار توروخدا! بیست دقیقه دیگه مصاحبه استخدامی دارم، جان عزیزتون راه بدید!',
        phoneticFa: 'استِپ اَساید پلیز! مای اینترویو ایز این توِنتی مینِتس.',
        vocabNotes: [{ wordEn: 'Step aside', wordFa: 'کنار رفتن / راه باز کردن' }]
      },
      {
        id: 2,
        en: 'Swipe your transit card fast, the doors are about to shut right in your face!',
        enCasualFast: "Swipe fast, doors are shuttin'!",
        fa: 'کارت مترو رو سریع بزن، درها دارن درست جلوی چشمت بسته می‌شن!',
        faColloquial: 'کارتتو بزن زودی، درها الان بسته میشه جا می‌مونی!',
        phoneticFa: 'سوایپ یور ترَنزیت کارد، دِ دورز آر اِباوت تو شات!',
        vocabNotes: [{ wordEn: 'Swipe', wordFa: 'کارت کشیدن' }]
      }
    ]
  },

  {
    id: 'colloq_15',
    number: 15,
    titleEn: '15. Returning Clothes without a Receipt',
    titleFa: '۱۵. پس دادن پیراهن بدون فاکتور خرید (رسید خریدم گم شده!)',
    settingFa: 'میز خدمات مشتریان فروشگاه بزرگ در لس‌آنجلس',
    culturalNoteFa: 'اصطلاح "Store credit" یعنی بن خرید از فروشگاه به جای پول نقد.',
    keySlangTakeawayFa: 'No receipt / Store credit / Tags still attached',
    sentences: [
      {
        id: 1,
        en: 'I lost my paper receipt, but look, the price tags are still attached and I have never worn it.',
        enCasualFast: "Lost my receipt, but tags are on, never wore it.",
        fa: 'فاکتور کاغذیم گم شده، اما نگاه کنید اتیکت قیمت هنوز بهشه و اصلاً تنم نکردم.',
        faColloquial: 'رسید خریدم گم شده ولی اتیکت لباس روشه، اصلاً نپوشیدمش.',
        phoneticFa: 'آی لاست مای ریسیپت، بات تگز آر اَتَچت.',
        vocabNotes: [{ wordEn: 'Receipt', wordFa: 'رسید خرید (تلفظ: ریسیت - پ خوانده نمی‌شود)' }]
      },
      {
        id: 2,
        en: 'We cannot give cash back without proof of purchase, but I can issue you store credit.',
        enCasualFast: "No cash back, but can give you store credit.",
        fa: 'ما بدون مدرک خرید پول نقد پس نمی‌دیم، ولی می‌تونم براتون بن خرید از فروشگاه صادر کنم.',
        faColloquial: 'پول نقد رو نمی‌تونم برگردونم، ولی کارت اعتباری همین فروشگاه رو شارژ می‌کنم براتون.',
        phoneticFa: 'وی کَن‌نات گیو کَش بَک، بات آی کَن ایشو استور کرِدیت.',
        vocabNotes: [{ wordEn: 'Store credit', wordFa: 'اعتبار خرید از فروشگاه' }]
      }
    ]
  },

  // 16 to 30: Continue rich, hilarious, real-life street scenarios
  {
    id: 'colloq_16',
    number: 16,
    titleEn: '16. Overhearing a Phone Call on the Bus',
    titleFa: '۱۶. بلند بلند حرف زدن با گوشی تو اتوبوس (گوشمون کر شد!)',
    settingFa: 'اتوبوس شهری با مسافری که با صدای بلند با تلفن فریاد می‌زند',
    culturalNoteFa: 'اصطلاح "Indoor voice" یعنی صدای آرام و مناسب محیط سربسته.',
    keySlangTakeawayFa: 'Use your indoor voice / Eavesdropping / Public nuisance',
    sentences: [
      {
        id: 1,
        en: 'Ma’am, with all due respect, please use your indoor voice! The whole bus can hear your drama.',
        enCasualFast: "Excuse me lady, keep it down! Whole bus hears you.",
        fa: 'خانم، با نهایت احترام، لطفاً صداتون رو بیارید پایین! کل مسافران اتوبوس دارن دعوای خانوادگی شما رو می‌شنوند.',
        faColloquial: 'خانم محترم یواش‌تر صحبت کنید لطفاً! گوشمون کر شد، همه دارن دعوای شما رو می‌شنون!',
        phoneticFa: 'مَم، پلیز یوز یور ایندور وویس! دِ هول باس کَن هیر.',
        vocabNotes: [{ wordEn: 'Indoor voice', wordFa: 'صدای ملایم و کنترل‌شده' }]
      }
    ]
  },

  {
    id: 'colloq_17',
    number: 17,
    titleEn: '17. Ordering Fast Food Drive-Thru Glitch',
    titleFa: '۱۷. سفارش غذا پشت بلندگوی درایو-ترو (صدات خرخر می‌کنه!)',
    settingFa: 'لاین سفارش سواره رستوران مک‌دونالد',
    culturalNoteFa: 'اصطلاح "Combo meal" یعنی ساندویچ همراه سیب‌زمینی و نوشابه.',
    keySlangTakeawayFa: 'Static noise / Drive-thru / Make it a meal',
    sentences: [
      {
        id: 1,
        en: 'Speakerbox: "Welcome, order when ready." — "Hello? You’re cutting in and out, can you hear me?"',
        enCasualFast: "Hello? Speaker's buzzy, can you hear me?",
        fa: 'بلندگو: «خوش آمدید، هر وقت آماده‌اید سفارش بدید.» — «الو؟ صداتون هی خش‌خش و قطع و وصل می‌شه، صدای منو دارید؟»',
        faColloquial: 'بلندگو: «بفرمایید.» — «الو؟ صدات قطعه اوستا! متوجه شدی چی گفتم؟»',
        phoneticFa: 'هلو؟ یو آر کاتینگ این اَند آوت!',
        vocabNotes: [{ wordEn: 'Cutting in and out', wordFa: 'قطع و وصل شدن صدا' }]
      }
    ]
  },

  {
    id: 'colloq_18',
    number: 18,
    titleEn: '18. Babysitting a Hyperactive Toddler',
    titleFa: '۱۸. نگهداری از بچه تخس و شیطون (خونه رو گذاشته رو سرش!)',
    settingFa: 'اتاق نشیمن با اسباب‌بازی‌های پخش و پلا',
    culturalNoteFa: 'اصطلاح "Bouncing off the walls" یعنی از در و دیوار بالا رفتن بچه.',
    keySlangTakeawayFa: 'Bouncing off the walls / Sugar rush / Tantrum',
    sentences: [
      {
        id: 1,
        en: 'This five-year-old ate two chocolate bars and now he’s literally bouncing off the walls!',
        enCasualFast: "Kid ate chocolate, now bouncing off the walls!",
        fa: 'این بچه پنج ساله دو تا شکلات خورد و الان رسماً داره از در و دیوار بالا می‌ره!',
        faColloquial: 'این وروجک دو تا کاکائو زد به رگ، الان خونه رو گذاشته رو سرش!',
        phoneticFa: 'دیس کید اِیت چاکلِت اَند ایز باونسینگ آف دِ والز!',
        vocabNotes: [{ wordEn: 'Bouncing off the walls', wordFa: 'از در و دیوار بالا رفتن از سر پرانرژی بودن' }]
      }
    ]
  },

  {
    id: 'colloq_19',
    number: 19,
    titleEn: '19. The Used Car Inspection Scam',
    titleFa: '۱۹. خرید ماشین دست دوم (موتورش روغن‌سوزی داره!)',
    settingFa: 'پارکینگ فروش خودرو با کاپوت بالا زده',
    culturalNoteFa: 'اصطلاح "Lemon" یعنی خودروی قراضه و پر از عیب و ایراد مخفی.',
    keySlangTakeawayFa: 'Total lemon / Kicking the tires / Hidden flaws',
    sentences: [
      {
        id: 1,
        en: 'Nice try buddy, but this engine is burning oil and blowing blue smoke. This car is a total lemon!',
        enCasualFast: "Nice try, but engine's smokin'. Car's a total lemon!",
        fa: 'تلاش خوبی بود داداش، ولی این موتور داره روغن می‌سوزونه و دود آبی میده. این ماشین رسماً یه قراضه‌ست!',
        faColloquial: 'خسته نباشی داداش! موتورش که داره روغن می‌سوزونه دود آبی می‌ده. این که رسماً لگنه!',
        phoneticFa: 'دیس اینجین ایز بێرنینگ اویل. دیس کار ایز اِ لِمون!',
        vocabNotes: [{ wordEn: 'Lemon', wordFa: 'ماشین پر از عیب و قراضه' }]
      }
    ]
  },

  {
    id: 'colloq_20',
    number: 20,
    titleEn: '20. Cheering at the Sports Stadium',
    titleFa: '۲۰. هورا کشیدن تو استادیوم مسابقه (داور دقت کن!)',
    settingFa: 'سکوهای پر از تماشاگر مسابقه فوتبال',
    culturalNoteFa: 'اصطلاح "Bad call" یعنی سوت یا خطای اشتباه داور.',
    keySlangTakeawayFa: 'Ref is blind / Bad call / What a goal',
    sentences: [
      {
        id: 1,
        en: 'Are you blind, referee? That was a blatant red card foul, get some glasses!',
        enCasualFast: "You blind ref? Red card, get glasses!",
        fa: 'کوری مگه آقای داور؟ اون خطای تابلوی کارت قرمز بود، یه عینک بزن چشمت ببینه!',
        faColloquial: 'داور مگه کوری؟! اون خطا کارت قرمز مستقیم داشت! داور دقت کن!',
        phoneticFa: 'آر یو بلایند، رِفِری؟ گِت سام گلَسِز!',
        vocabNotes: [{ wordEn: 'Ref / Referee', wordFa: 'داور مسابقه' }]
      }
    ]
  },

  {
    id: 'colloq_21',
    number: 21,
    titleEn: '21. Binge-Watching TV Shows All Night',
    titleFa: '۲۱. تا صبح بیدار موندن برای دیدن سریال (چشمام داره آلبالو گیلاس می‌چینه!)',
    settingFa: 'روی کاناپه با پاکت چیپس و کنترل تلویزیون',
    culturalNoteFa: 'اصطلاح "Binge-watch" یعنی تماشای ممتد و پشت سر هم قسمت‌های سریال.',
    keySlangTakeawayFa: 'Binge-watch / Cliffhanger / Pulling an all-nighter',
    sentences: [
      {
        id: 1,
        en: 'I told myself just one episode, but that cliffhanger hooked me and now it’s four in the morning!',
        enCasualFast: "Said one episode, now it's 4 AM!",
        fa: 'به خودم گفتم فقط یه قسمت، اما انتهای هیجانی فیلم منو پای تلویزیون میخکوب کرد و الان چهار صبحه!',
        faColloquial: 'گفتم فقط یه قسمتشو می‌بینم می‌خوابم، تهش طوری تموم شد که خواب از سرم پرید و تا چهار صبح نگاه کردم!',
        phoneticFa: 'آی تولد مای‌سِلف جاست وان اِپیسود، بات ناوتس فور این دِ مورنینگ!',
        vocabNotes: [{ wordEn: 'Cliffhanger', wordFa: 'پایان معلق و هیجان‌انگیز داستان' }]
      }
    ]
  },

  {
    id: 'colloq_22',
    number: 22,
    titleEn: '22. Returning Home to an Empty Fridge',
    titleFa: '۲۲. یخچال خالی و شکم گرسنه بعد از نیمه‌شب (مگس توش پر نمی‌زنه!)',
    settingFa: 'آشپزخانه نیمه‌تاریک جلوی در باز یخچال',
    culturalNoteFa: 'اصطلاح "Order takeout" یعنی غذا از بیرون سفارش دادن.',
    keySlangTakeawayFa: 'Starving / Empty fridge / Order delivery',
    sentences: [
      {
        id: 1,
        en: 'I’m completely famished and there is literally nothing in this fridge except baking soda and old ketchup.',
        enCasualFast: "I'm starvin' and fridge is empty!",
        fa: 'دارم از گرسنگی تلف می‌شم و در این یخچال به جز جوش‌شیرین و سس کچاپ بیات واقعاً هیچی نیست.',
        faColloquial: 'از گشنگی ضعف کردم، تو این یخچال لعنتی هم مگس پر نمی‌زنه!',
        phoneticFa: 'آیم فَمیشت اَند دِر ایز ناتینگ این دیس فریج!',
        vocabNotes: [{ wordEn: 'Famished / Starving', wordFa: 'خیلی گرسنه / هلاک از گرسنگی' }]
      }
    ]
  },

  {
    id: 'colloq_23',
    number: 23,
    titleEn: '23. Wi-Fi Down during an Online Exam',
    titleFa: '۲۳. قطعی اینترنت وسط امتحان آنلاین (خدا منو بکشه، نتم قطع شد!)',
    settingFa: 'پشت لپ‌تاپ با چشم‌های هراسان',
    culturalNoteFa: 'اصطلاح "Freaking out" یعنی وحشت کردن و هول شدن شدید.',
    keySlangTakeawayFa: 'Freaking out / Router reset / Disconnected',
    sentences: [
      {
        id: 1,
        en: 'Unplug the router and plug it back in right now! The timer is ticking down and I’m totally freaking out.',
        enCasualFast: "Reset the router quick! I'm freak' out!",
        fa: 'همین الان مودم رو از برق بکش دوباره بزن! تایمر داره تموم میشه و من رسماً دارم سکته می‌کنم.',
        faColloquial: 'مودم رو از برق بکش دوباره بزن جون مادرت! وقت امتحان داره تموم میشه هول شدم!',
        phoneticFa: 'آن‌پلاگ دِ روتر! آیم توتِلی فریکینگ آوت.',
        vocabNotes: [{ wordEn: 'Freaking out', wordFa: 'وحشت کردن / به سیم آخر زدن از استرس' }]
      }
    ]
  },

  {
    id: 'colloq_24',
    number: 24,
    titleEn: '24. Running into an Old School Buddy',
    titleFa: '۲۴. برخورد اتفاقی با همکلاسی قدیمی (پسر! کجایی تو، دلمون تنگ بود!)',
    settingFa: 'وسط پیاده‌رو شلوغ خیابان ولیعصر یا برادوی',
    culturalNoteFa: 'اصطلاح "Long time no see" معادل «پارسال دوست امسال آشنا» است.',
    keySlangTakeawayFa: 'Long time no see / Catch up / How’ve you been',
    sentences: [
      {
        id: 1,
        en: 'Holy cow, Ali?! Long time no see, man! What have you been up to all these years?',
        enCasualFast: "Holy cow, Ali! Long time no see bro!",
        fa: 'یا خدا، علی خودتی؟! پارسال دوست امسال آشنا مرد! این چند سال کجا بودی و چیکار می‌کردی؟',
        faColloquial: 'به‌به علی آقا! پارسال دوست، امسال آشنا رفیق! کجایی نیستی؟ چقدر عوض شدی کلک!',
        phoneticFa: 'هولی کاو، علی؟! لانگ تایم نو سی، مَن!',
        vocabNotes: [{ wordEn: 'Long time no see', wordFa: 'خیلی وقته ندیدمت / پارسال دوست امسال آشنا' }]
      }
    ]
  },

  {
    id: 'colloq_25',
    number: 25,
    titleEn: '25. Grocery Shopping with an Impatient Kid',
    titleFa: '۲۵. خرید سوپرمارکت با بچه بی‌طاقت (نق نزن برات می‌خرم!)',
    settingFa: 'راهروی شکلات‌های سوپرمارکت',
    culturalNoteFa: 'اصطلاح "Stop whining" یعنی غرغر نکن و نق نزن.',
    keySlangTakeawayFa: 'Stop whining / In a minute / Sweet tooth',
    sentences: [
      {
        id: 1,
        en: 'Stop whining and put that box of sugary cereal back on the shelf, dinner is in twenty minutes!',
        enCasualFast: "Stop whinin', put that box back, dinner's soon!",
        fa: 'انقدر نق نزن و اون جعبه کورن‌فلکس پر از شکر رو بذار سر جاش تو قفسه، بیست دقیقه دیگه شامه!',
        faColloquial: 'انقدر غرغر نکن بچه! اون پفک رو بذار سر جاش، نیم‌ساعت دیگه شام حاضره!',
        phoneticFa: 'استاپ واینینگ اَند پوت دَت بَک آن دِ شِلف!',
        vocabNotes: [{ wordEn: 'Whining', wordFa: 'نق زدن / بهانه‌گیری با صدای کشدار' }]
      }
    ]
  },

  {
    id: 'colloq_26',
    number: 26,
    titleEn: '26. Loud Upstairs Neighbors at 2 AM',
    titleFa: '۲۶. همسایه طبقه بالایی ساعت دو نصفه‌شب (اسب می‌دوونن بالا؟!)',
    settingFa: 'تخت‌خواب با سقف لرزان از صدای کوبیدن پا',
    culturalNoteFa: 'اصطلاح "Heavy-footed" یعنی کسی که پایش را محکم به زمین می‌کوبد.',
    keySlangTakeawayFa: 'Heavy-footed / Banging on the ceiling / Call security',
    sentences: [
      {
        id: 1,
        en: 'Are they wearing concrete boots up there or bowling in their hallway? It’s past two in the morning!',
        enCasualFast: "Are they wearin' boots or bowlin' up there?!",
        fa: 'اون بالا پوتین سیمانی پاشونه یا دارن تو راهرو بولینگ بازی می‌کنن؟! از دو نصفه‌شب گذشته!',
        faColloquial: 'بالا دارن اسب می‌دوونن یا با چکمه راه می‌رن؟! دو نصفه‌شب وقت پارتیه آخه؟!',
        phoneticFa: 'آر دِی وِرینگ کانکریت بوتس آپ دِر؟! ایتس پَست تو این دِ مورنینگ!',
        vocabNotes: [{ wordEn: 'Concrete boots', wordFa: 'پوتین‌های سنگین سیمانی' }]
      }
    ]
  },

  {
    id: 'colloq_27',
    number: 27,
    titleEn: '27. The Endless DMV Queue',
    titleFa: '۲۷. صف بی‌پایان گواهینامه و اداری (نوبتمون کی می‌شه؟!)',
    settingFa: 'سالن اداره راهنمایی و رانندگی آمریکا (DMV) با نمره نوبت کاغذی',
    culturalNoteFa: 'اصطلاح "Bureaucracy" یعنی کاغذبازی و سیستم خسته‌کننده اداری.',
    keySlangTakeawayFa: 'Take a number / Endless queue / Red tape',
    sentences: [
      {
        id: 1,
        en: 'They called number 42, but my slip says number 280! I’m going to grow old and die in this waiting room.',
        enCasualFast: "Called 42, my ticket's 280! I'm gonna rot here.",
        fa: 'شماره ۴۲ رو صدا زدن، ولی برگه من شماره ۲۸۰ئه! من تو این سالن انتظار موهام سفید میشه و می‌میرم.',
        faColloquial: 'شماره ۴۲ رو خوندن، نوبت من ۲۸۰ئه! علف زیر پامون سبز شد از بس نشستیم!',
        phoneticFa: 'دِی کالد نامبِر فورتی تو، بات مای اسلیپ سِیز تو هاندِرد اِیتی!',
        vocabNotes: [{ wordEn: 'Slip / Ticket', wordFa: 'برگه نوبت' }]
      }
    ]
  },

  {
    id: 'colloq_28',
    number: 28,
    titleEn: '28. A Bad Haircut Crisis',
    titleFa: '۲۸. خراب شدن موها بعد از آرایشگاه (کلاه‌گیس از کجا پیدا کنم؟!)',
    settingFa: 'جلوی آینه دستشویی با قیچی و گریه',
    culturalNoteFa: 'اصطلاح "Butchered" برای مو یعنی به طرز فجیعی خراب کردن و کچل کردن.',
    keySlangTakeawayFa: 'Butchered my hair / Wear a beanie / Disastrous cut',
    sentences: [
      {
        id: 1,
        en: 'The barber completely butchered my hair! I look like a plucked rooster, hand me a baseball cap immediately.',
        enCasualFast: "Barber butchered my hair! Looks like a plucked rooster.",
        fa: 'آرایشگره رسماً موهام رو به باد فنا داد و سلاخی کرد! شبیه خروس پرکنده شدم، سریع یه کلاه لبه‌دار بده من!',
        faColloquial: 'آرایشگره گند زد به سرم! کچلم کرده شبیه جوجه‌تیغی شدم، اون کلاه لبه‌دار رو بده سرم کنم!',
        phoneticFa: 'دِ باربِر بوتچِرد مای هِر! آی لوک لایک اِ پلاکت روستر!',
        vocabNotes: [{ wordEn: 'Plucked rooster', wordFa: 'خروس پرکنده' }]
      }
    ]
  },

  {
    id: 'colloq_29',
    number: 29,
    titleEn: '29. Rainstorm Without an Umbrella',
    titleFa: '۲۹. بارون سیل‌آسا بدون چتر (موش آب‌کشیده شدیم!)',
    settingFa: 'زیر سایه‌بان مغازه در حال چکیدن آب از سر و صورت',
    culturalNoteFa: 'اصطلاح "Drenched" و "Soaked to the bone" یعنی تا مغز استخوان خیس شدن.',
    keySlangTakeawayFa: 'Drenched / Soaked to the bone / It’s pouring',
    sentences: [
      {
        id: 1,
        en: 'The weather forecast swore it was zero percent chance of rain, and now we’re soaked to the bone!',
        enCasualFast: "Forecast said zero rain, now we're soaked!",
        fa: 'هواشناسی قسم می‌خورد احتمال بارندگی صفره، و حالا جفتمون مثل موش آب‌کشیده تا استخون خیس شدیم!',
        faColloquial: 'هواشناسی می‌گفت هوا آفتابیه، حالا ببین مثل موش آب‌کشیده شدیم کفشامون پر آب شده!',
        phoneticFa: 'دِ فورکَست سوور ایت واز زیرو پِرسِنت، اَند ناوت وی آر سوکت تو دِ بون!',
        vocabNotes: [{ wordEn: 'Soaked to the bone', wordFa: 'موش آب‌کشیده / خیس تا مغز استخوان' }]
      }
    ]
  },

  {
    id: 'colloq_30',
    number: 30,
    titleEn: '30. The Surprise Birthday Party Slip-Up',
    titleFa: '۳۰. لو رفتن جشن تولد غافلگیرکننده (سوپرایزمون سوخت!)',
    settingFa: 'پشت مبل قایم شده با کیک و فشفشه',
    culturalNoteFa: 'اصطلاح "Blow the cover" یعنی لو دادن نقشه‌ای که باید مخفی می‌ماند.',
    keySlangTakeawayFa: 'Blew our cover / Act surprised / Happy birthday',
    sentences: [
      {
        id: 1,
        en: 'Shh! Turn off the chandelier! She’s unlocking the front door right now, nobody breathe a word!',
        enCasualFast: "Shh! Kill the lights! She's unlocking the door!",
        fa: 'هیس! چراغ لوستر رو خاموش کن! همین الان داره کلید میندازه در ورودی رو باز می‌کنه، نفس نکشید!',
        faColloquial: 'هیس! برقا رو خاموش کن! کلید انداخت تو در، هیچ‌کی جیکش درنیاد!',
        phoneticFa: 'شِش! تێرن آف دِ لایتس! نوبادی برید اِ وِرد!',
        vocabNotes: [{ wordEn: 'Not breathe a word', wordFa: 'جیک نزدن / لام تا کام حرف نزدن' }]
      },
      {
        id: 2,
        en: 'SURPRISE! Happy birthday, old timer! You genuinely had no idea, did you?',
        enCasualFast: "SURPRISE! Happy birthday man!",
        fa: 'تولدت مبارک! هورا غافلگیر شدی رفیق کهنسال! واقعاً روحت هم خبر نداشت، درسته؟',
        faColloquial: 'تولدت مبارک سلطان! اصلاً روحت هم خبر نداشت نه؟ مبارکت باشه پیرمرد!',
        phoneticFa: 'سِرپرایز! هَپی بێرث‌دِی اولد تایمِر!',
        vocabNotes: [{ wordEn: 'Old timer', wordFa: 'پیرمرد / رفیق قدیمی (شوخی خودمانی)' }]
      }
    ]
  }
];
