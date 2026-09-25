// بازی تمرینی تعارف و اصطلاحات روزمره فارسی
// به انگلیسی‌زبان‌ها یاد می‌دهد چطور مثل خود ایرانی‌ها خیلی راحت و صمیمی تعارف کنند

export interface TaarofDialogueRound {
  npcVoiceText: string;
  npcFingilish: string;
  npcPersian: string;
  npcRole: string;
  npcIntentHint: string;
  situationContext: string;
  options: {
    fingilish: string;
    persian: string;
    englishMeaning: string;
    isCulturallyCorrect: boolean;
    feedbackMessage: string;
  }[];
}

export interface TaarofScenario {
  id: string;
  titleEn: string;
  titleFa: string;
  location: string;
  opponentName: string;
  opponentRole: string;
  avatar: string;
  descriptionEn: string;
  descriptionFa: string;
  rounds: TaarofDialogueRound[];
  rewardLingous: number;
}

export const TAAROF_DUELS: TaarofScenario[] = [
  {
    id: 'duel_bazaar_taxi',
    titleEn: 'Paying Taxi Fare (The Courtesy Game)',
    titleFa: 'بازی تعارف کرایه تاکسی (چطور حساب کنیم؟)',
    location: 'Tehran, Azadi Square',
    opponentName: 'Agha Ghasem',
    opponentRole: 'راننده خوش‌برخورد تاکسی زرد',
    avatar: '🚕',
    descriptionEn: 'You reach your destination and ask for the fare. The driver smiles and says "Ghabel nadareh" (It is free/on the house)...',
    descriptionFa: 'رسیدید به مقصد و می‌خواهید کرایه را حساب کنید. راننده با لبخند دستش را تکان می‌دهد و می‌گوید قابلی ندارد...',
    rewardLingous: 45,
    rounds: [
      {
        npcVoiceText: 'دست شما درد نکنه، قابلی نداره، مهمان ما باشید!',
        npcFingilish: 'Daste shomâ dard nakoneh, ghâbeli nadâreh, mehmâne mâ bâshid!',
        npcPersian: 'دست شما درد نکنه، قابلی نداره، مهمان ما باشید!',
        npcRole: 'مرحله ۱: تعارف اول راننده',
        npcIntentHint: 'تعارف صمیمی و مودبانه (واقعاً پول را می‌خواهد، فرار نکنید!)',
        situationContext: 'پرسیدید چقدر میشه؟ راننده شروع کرد به تعارف کردن.',
        options: [
          {
            fingilish: 'Khahesh mikonam, khedmat az mâst! Lotfan befarmâeed, zahmat keshidid.',
            persian: 'خواهش می‌کنم، خدمت از ماست! لطفاً بفرمایید، زحمت کشیدید.',
            englishMeaning: 'Please take it, you worked hard, the pleasure is ours!',
            isCulturallyCorrect: true,
            feedbackMessage: 'خیلی عالی و مؤدبانه! پاسخ درست و صمیمی به تعارف اول.'
          },
          {
            fingilish: 'Merci! Khodahafez!',
            persian: 'مرسی! خداحافظ!',
            englishMeaning: 'Thanks, bye! (Walking away without paying)',
            isCulturallyCorrect: false,
            feedbackMessage: 'اشتباه شد! هرگز جمله «قابل نداره» را جدی نگیرید، این فقط تعارف و احترام است.'
          },
          {
            fingilish: 'Chon gofti ghabel nadareh, pool nemidam.',
            persian: 'چون گفتی قابل نداره پول نمیدم.',
            englishMeaning: 'Because you said it has no worth, I will not pay.',
            isCulturallyCorrect: false,
            feedbackMessage: 'بی‌احترامی به حساب می‌آید. باید پول را پرداخت کنید.'
          }
        ]
      },
      {
        npcVoiceText: 'شرمنده نکنید قربان، واقعاً راضی به زحمت نیستم، قدمتون روی چشم بود!',
        npcFingilish: 'Sharmandeh nakonid ghorbân, vâghean râzi be zahmat nistam, ghadametoon rooye cheshm bood!',
        npcPersian: 'شرمنده نکنید قربان، واقعاً راضی به زحمت نیستم، قدمتون روی چشم بود!',
        npcRole: 'مرحله ۲: پافشاری مهربانانه راننده',
        npcIntentHint: 'تعارف دوم (باز هم باید اصرار کنید که کرایه را بگیرد)',
        situationContext: 'راننده دستش را روی سینه می‌گذارد و ادای احترام می‌کند.',
        options: [
          {
            fingilish: 'Ekhtiâr dârid! Shomâ zahmat keshidid, befarmâyid dastetoon dard nakoneh.',
            persian: 'اختیار دارید! شما زحمت کشیدید، بفرمایید دستتون درد نکنه.',
            englishMeaning: 'Not at all! You put in the effort, here you go, thank you!',
            isCulturallyCorrect: true,
            feedbackMessage: 'آفرین! اصطلاح «اختیار دارید» بهترین جواب برای مرحله دوم تعارف است.'
          },
          {
            fingilish: 'Bashad, miravam.',
            persian: 'باشد، می‌روم.',
            englishMeaning: 'Okay, I am leaving.',
            isCulturallyCorrect: false,
            feedbackMessage: 'خیلی سرد و تند بود. گفت‌وگوی ایرانی نرم و آهنگین است.'
          }
        ]
      },
      {
        npcVoiceText: 'زنده باشید! سلامت و تندرست باشید ان‌شاءالله. خیلی خوش آمدید!',
        npcFingilish: 'Zendeh bâshid! Salâmat o tandorost bâshid enshâ-allâh. Kheyli khosh âmadid!',
        npcPersian: 'زنده باشید! سلامت و تندرست باشید ان‌شاءالله. خیلی خوش آمدید!',
        npcRole: 'مرحله ۳: گرفتن پول و دعای خیر',
        npcIntentHint: 'قبول کردن کرایه با تشکر و خوش‌رویی',
        situationContext: 'راننده پول را تحویل گرفت و برایتان آرزوی سلامتی کرد.',
        options: [
          {
            fingilish: 'Ghorbâne shomâ, salâmat bâshid, roozetoon be-kheyr o barakat!',
            persian: 'قربان شما، سلامت باشید، روزتون به‌خیر و برکت!',
            englishMeaning: 'Thank you so much, be healthy and have a great day!',
            isCulturallyCorrect: true,
            feedbackMessage: 'عالی بود! شما رسم تعارف را مثل یک ایرانی اصیل و خوش‌برخورد انجام دادید.'
          },
          {
            fingilish: 'Finally you took it.',
            persian: 'بالاخره گرفتیش.',
            englishMeaning: 'Finally you took it.',
            isCulturallyCorrect: false,
            feedbackMessage: 'در پایان باید با لبخند و آرزوی سلامتی خداحافظی کنید.'
          }
        ]
      }
    ]
  },
  {
    id: 'duel_dinner_party',
    titleEn: 'Offering More Food at Dinner',
    titleFa: 'بازی تعارف غذای مهمانی (بشقاب دوم قورمه‌سبزی)',
    location: 'Isfahan, Traditional Family Home',
    opponentName: 'Maman Parvin',
    opponentRole: 'مادر مهربان و مهمان‌نواز ایرانی',
    avatar: '🍲',
    descriptionEn: 'You finished your food. The Iranian host comes with a big spoon of delicious food to serve you more...',
    descriptionFa: 'غذایتان تمام شده. صاحب‌خانه مهربان با کفگیر قورمه‌سبزی می‌آید و می‌گوید اصلاً چیزی نخوردید...',
    rewardLingous: 55,
    rounds: [
      {
        npcVoiceText: 'اصلاً هیچی نخوردید! بفرمایید یک کفگیر دیگه برنج زعفرانی و قورمه‌سبزی بکشم!',
        npcFingilish: 'Aslan hichi nakhordid! Befarmâyid yek kafgir digeh berenj o ghormeh-sabzi bekesham!',
        npcPersian: 'اصلاً هیچی نخوردید! بفرمایید یک کفگیر دیگه برنج زعفرانی و قورمه‌سبزی بکشم!',
        npcRole: 'مرحله ۱: اصرار مادرانه برای کشیدن غذای بیشتر',
        npcIntentHint: 'می‌خواهد مطمئن شود سیر شده‌اید',
        situationContext: 'کفگیر را بالای بشقاب شما گرفته است.',
        options: [
          {
            fingilish: 'Dastetoon dard nakoneh, vâghean bi-nazir bood! Kheyli sir shodam ama faghat yek ghashogh befarmâyid!',
            persian: 'دستتون درد نکنه، واقعاً بی‌نظیر بود! خیلی سیر شدم اما فقط یک قاشق بفرمایید!',
            englishMeaning: 'Thank you so much, it was delicious! I am so full, but please just a single spoonful!',
            isCulturallyCorrect: true,
            feedbackMessage: 'بهترین پاسخ! هم از دستپخت تعریف کردید و هم احترام گذاشتید.'
          },
          {
            fingilish: 'Ghazatoon bad bood nemikhoram.',
            persian: 'غذاتون بد بود نمی‌خورم.',
            englishMeaning: 'Your food was bad, I will not eat.',
            isCulturallyCorrect: false,
            feedbackMessage: 'هرگز از دستپخت میزبان گلایه نکنید!'
          }
        ]
      },
      {
        npcVoiceText: 'نوش جان! جونتون سلامت، الهی همیشه سفره‌هاتون پربرکت باشه!',
        npcFingilish: 'Noosh-e jân! Joonetoon salâmat, elâhi hamisheh sofreh-hâtoon por-barakat bâsheh!',
        npcPersian: 'نوش جان! جونتون سلامت، الهی همیشه سفره‌هاتون پربرکت باشه!',
        npcRole: 'مرحله ۲: دعای خیر پای سفره',
        npcIntentHint: 'آرزوی سلامتی و برکت برای مهمان',
        situationContext: 'با خوشحالی به شما لبخند می‌زند.',
        options: [
          {
            fingilish: 'Salâmat bâshid, sâyatoon mostadâm, kheyli zahmat keshidid!',
            persian: 'سلامت باشید، سایه‌تون مستدام، خیلی زحمت کشیدید!',
            englishMeaning: 'May you stay healthy, thank you so much for your hospitality!',
            isCulturallyCorrect: true,
            feedbackMessage: 'فوق‌العاده بود! پاسخ با آرزوی سلامتی و تشکر از زحمت میزبان.'
          },
          {
            fingilish: 'Give me soda.',
            persian: 'نوشابه بده.',
            englishMeaning: 'Give me soda.',
            isCulturallyCorrect: false,
            feedbackMessage: 'به دعای خیر میزبان با آرزوی سلامتی پاسخ دهید.'
          }
        ]
      }
    ]
  }
];
