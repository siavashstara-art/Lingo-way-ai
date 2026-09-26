// Specialized Persian Carpet Trade & Bazaar Terminology & Trilingual Dialogues (Persian - English - Arabic)
// Dedicated in honored memory of the late Haj Hossein Agha Ali Miri (شادروان حاج حسین آقای علی‌میری)
// Companion educational module to the "Farsh Bazaar (فرش بازار)" app by the same developer.

export interface CarpetTermItem {
  id: string;
  category: 'types' | 'sizes' | 'condition_age' | 'structure_materials';
  categoryLabelFa: string;
  termFa: string;
  fingilish: string;
  termEn: string;
  pronunciationEn: string;
  termAr: string;
  pronunciationAr: string;
  dimensionsMetric?: string;
  dimensionsImperial?: string;
  technicalNoteFa: string;
  merchantPitchEn: string;
  merchantPitchAr: string;
}

export interface CarpetMerchantDialogue {
  id: string;
  stageTitleFa: string;
  stageTitleEn: string;
  customerQuestionEn: string;
  customerQuestionAr: string;
  customerMeaningFa: string;
  merchantReplyFa: string;
  merchantReplyEn: string;
  merchantReplyEnPhonetic: string;
  merchantReplyAr: string;
  merchantReplyArPhonetic: string;
  tradeTipFa: string;
}

export interface CarpetNegotiationQuiz {
  id: string;
  buyerPersona: string;
  buyerQuoteEn: string;
  buyerQuoteAr?: string;
  buyerQuoteFa: string;
  questionFa: string;
  options: Array<{
    textEn: string;
    textFa: string;
    isCorrect: boolean;
    feedbackFa: string;
  }>;
}

export const CARPET_TERMINOLOGY_DB: CarpetTermItem[] = [
  {
    id: 'ct_1',
    category: 'condition_age',
    categoryLabelFa: 'قدمت و اصالت (کهنه ذاتی)',
    termFa: 'کهنه ذاتی (پاخورده طبیعی و اصیل)',
    fingilish: 'Kohneh-ye Zaati',
    termEn: 'Authentic Naturally Aged Patina (Kohneh Zaati / Unbleached)',
    pronunciationEn: 'aw-THEN-tik NACH-ur-uh-lee aydjd puh-TEE-nuh',
    termAr: 'سجادة معتّقة طبيعياً (كهنه ذاتي أصيل بدون غسيل كيميائي)',
    pronunciationAr: 'Sajjāda mu‘attaqa tabī‘iyyan (Kohneh Zātī)',
    technicalNoteFa: 'مهم‌ترین اصطلاح بازار فرش کهنه‌فروشی: فرشی که رنگ‌های گیاهی آن در اثر گذر دهه‌ها و پاخور طبیعی پخته و مخملی شده، نه با اسیدشویی یا دکلره شیمیایی.',
    merchantPitchEn: 'This piece is 100% "Kohneh Zaati"—its lustrous patina developed naturally over decades of gentle use, never chemically washed.',
    merchantPitchAr: 'هذه القطعة «كهنه ذاتي» ١٠٠٪، فقد اكتسبت لمعانها وهدوء ألوانها طبيعياً عبر العقود بدون أي معالجة كيميائية.'
  },
  {
    id: 'ct_2',
    category: 'sizes',
    categoryLabelFa: 'سایز و قواره (ذرع)',
    termFa: 'قالیچه دو ذرع (دوزرع)',
    fingilish: 'Ghalicheh Do-Zar (Dozar)',
    termEn: 'Dozar Area Rug (Classic 2-Zar Ghalicheh)',
    pronunciationEn: 'doh-ZAR air-ee-uh rug (4.5 by 6.7 feet)',
    termAr: 'قاليجه مقاس دوزرع (ذراعان: ٢٠٠ × ١٣٥ سم)',
    pronunciationAr: 'Qālījah maqās Do-Zar (200 × 135 cm)',
    dimensionsMetric: '200 × 135 cm (تا 210 × 140 cm)',
    dimensionsImperial: "4'5\" × 6'7\" ft (approx. 4.5 × 6.7 feet)",
    technicalNoteFa: 'پرطرفدارترین قواره قالیچه ایرانی در بازار جهانی که خریداران غربی آن را با نام Dozar یا 4.5x6.7 ft می‌شناسند.',
    merchantPitchEn: 'This is a classic Persian "Dozar" area rug, measuring 200 by 135 centimeters, which is about 4.5 by 6.7 feet.',
    merchantPitchAr: 'هذه قاليجه إيرانية بمقاس «دوزرع» الكلاسيكي، وأبعادها ٢٠٠ في ١٣٥ سنتيمتراً.'
  },
  {
    id: 'ct_3',
    category: 'sizes',
    categoryLabelFa: 'سایز و قواره (ذرع)',
    termFa: 'ذرع و نیم (زرع و نیم)',
    fingilish: 'Zar-o-Nim',
    termEn: 'Zar-o-Nim Accent Rug (1.5 Zar)',
    pronunciationEn: 'zar-oh-NEEM rug (3.5 by 5 feet)',
    termAr: 'قاليجه مقاس ذرع ونصف (١٥٥ × ١٠٥ سم)',
    pronunciationAr: 'Maqās Zar wa Nisf (155 × 105 cm)',
    dimensionsMetric: '150 × 105 cm (تا 160 × 110 cm)',
    dimensionsImperial: "3'5\" × 5'0\" ft",
    technicalNoteFa: 'قالیچه ۱.۵ ذرع، بسیار محبوب برای کلکسیونرها و مسافران هوایی چون به راحتی در چمدان جا می‌شود.',
    merchantPitchEn: 'This "Zar-o-Nim" piece measures 150 by 105 cm (3.5 by 5 feet)—ideal as a collector’s focal rug and easy to pack in your luggage.',
    merchantPitchAr: 'هذا المقاس يسمى «ذرع ونصف» (١٥٠×١٠٥ سم)، وهو مثالي للمقتنين وسهل الحمل في حقيبة السفر.'
  },
  {
    id: 'ct_4',
    category: 'sizes',
    categoryLabelFa: 'سایز و قواره (ذرع)',
    termFa: 'ذرع و چارک (زرع و چارک)',
    fingilish: 'Zar-o-Charak',
    termEn: 'Zar-o-Charak Small Rug (1.25 Zar)',
    pronunciationEn: 'zar-oh-cha-RAK (2.7 by 4.1 feet)',
    termAr: 'مقاس ذرع وربع (١٢٥ × ٨٠ سم)',
    pronunciationAr: 'Maqās Zar wa Rub‘ (125 × 80 cm)',
    dimensionsMetric: '125 × 80 cm',
    dimensionsImperial: "2'7\" × 4'1\" ft",
    technicalNoteFa: 'معادل یک ذرع و یک چهارم ذرع؛ مناسب ورودی، جلوی میز کار یا قاب کردن به عنوان اثر هنری.',
    merchantPitchEn: 'This size is called "Zar-o-Charak" (125 by 80 cm or 2.7 by 4.1 feet), perfect for entryways or hanging on a wall.',
    merchantPitchAr: 'هذا المقاس يسمى «ذرع وربع» (١٢٥×٨٠ سم)، وهو رائع للمداخل أو للتعليق كلوحة فنية.'
  },
  {
    id: 'ct_5',
    category: 'types',
    categoryLabelFa: 'انواع دستبافته',
    termFa: 'قالی و قالیچه دستباف',
    fingilish: 'Ghali & Ghalicheh Dastbaaf',
    termEn: 'Hand-Knotted Palace Carpet (Ghali) & Area Rug (Ghalicheh)',
    pronunciationEn: 'hand-NOT-ed GHA-lee and gha-lee-CHEH',
    termAr: 'قالي (سجادة كبيرة) وقاليجه (سجادة متوسطة) يدوية الصنع',
    pronunciationAr: 'Qālī wa Qālījah Yadawiyyah',
    technicalNoteFa: 'در بازار ایران فرش‌های ۶ متری و بزرگ‌تر را «قالی» و فرش‌های کوچک‌تر از ۴ متر (مثل دو ذرع و ذرع و نیم) را «قالیچه» می‌نامند.',
    merchantPitchEn: 'In Persian tradition, large room carpets (6m² and above) are called "Ghali", while finer smaller pieces like Dozar are called "Ghalicheh".',
    merchantPitchAr: 'في التراث الإيراني نسمي السجاد الكبير «قالي»، بينما القطع المتوسطة والدقيقة نسميها «قاليجه».'
  },
  {
    id: 'ct_6',
    category: 'types',
    categoryLabelFa: 'انواع دستبافته',
    termFa: 'گلیم و پشتی دستباف',
    fingilish: 'Gelim (Kilim) & Poshti',
    termEn: 'Flat-Woven Tribal Kilim & Traditional Bolster Rug (Poshti)',
    pronunciationEn: 'flat-WOH-ven kee-LEEM and posh-TEE',
    termAr: 'كليم منسوج مسطح وبشتي تقليدي (٦٠×٩٠ سم)',
    pronunciationAr: 'Kilīm wa Pushtī Taqlīdī',
    dimensionsMetric: 'پشتی: 90 × 60 cm',
    dimensionsImperial: "Poshti: 2'0\" × 3'0\" ft",
    technicalNoteFa: 'گلیم بدون پرز و دوطرفه است و پشتی (۹۰×۶۰ سانت) برای تکیه‌گاه سنتی یا پادری نفیس کاربرد دارد.',
    merchantPitchEn: 'This is a reversible flat-woven tribal Kilim, and beside it is a hand-knotted "Poshti" (2 by 3 feet).',
    merchantPitchAr: 'هذا كليم عشائري مسطح ذو وجهين، وبجانبه «بشتي» تقليدي معقود يدوياً بمقاس ٩٠×٦٠ سم.'
  },
  {
    id: 'ct_7',
    category: 'types',
    categoryLabelFa: 'انواع دستبافته',
    termFa: 'فرش مربع و کناره راهرویی',
    fingilish: 'Farsh-e Morabba & Kenareh',
    termEn: 'Square Carpet (Morabba) & Hallway Runner (Kenareh)',
    pronunciationEn: 'skwair kar-pet (mo-rab-BA) and RUN-er (ke-na-REH)',
    termAr: 'سجادة مربعة (مربع) وسجادة ممر طويلة (كناره)',
    pronunciationAr: 'Sajjāda Murabba‘a wa Kinārah',
    dimensionsMetric: 'مربع: 200×200 یا 300×300 cm | کناره: عرض 80-120 cm',
    dimensionsImperial: "Square: 6'7\"×6'7\" or 10'×10' ft",
    technicalNoteFa: 'فرش مربع برای زیر میز ناهارخوری گرد/مربع و فضاهای متقارن بسیار کمیاب و ارزشمند است.',
    merchantPitchEn: 'Square Persian carpets ("Morabba") are specially commissioned on wide looms, and "Kenareh" runners are tailored for corridors.',
    merchantPitchAr: 'السجاد المربع يُنسج خصيصاً على أنوال عريضة للغرف المتناظرة، والـ«كناره» مخصصة للممرات الطويلة.'
  },
  {
    id: 'ct_8',
    category: 'condition_age',
    categoryLabelFa: 'قدمت و وضعیت',
    termFa: 'نوبافت، کارکرده و کهنه عتیقه',
    fingilish: 'Now-baaft, Kaar-kardeh, Kohneh Atigheh',
    termEn: 'Newly Woven (Off-Loom), Pre-Owned Full-Pile & Antique Collector Rug',
    pronunciationEn: 'noo-lee WOH-ven, pree-OHND, and an-TEEK',
    termAr: 'نوبافت (جديد من النول)، مستعمل بحالة ممتازة، وقديم أثري (أنتيك)',
    pronunciationAr: 'Now-bāft (Jadīd), Musta‘mal, wa Qadīm Atharī',
    technicalNoteFa: 'تفکیک شفاف سه وضعیت فرش برای جلب اعتماد کامل خریدار خارجی.',
    merchantPitchEn: 'We categorize our collection transparently: "Now-baft" (brand new off the loom), gently pre-owned full-pile vintage, and rare "Kohneh" antiques.',
    merchantPitchAr: 'نصنّف مجموعتنا بشفافية تامة: «نوبافت» الجديد تماماً، والمستعمل النظيف ذو الوبر الكامل، والقطع الأثرية النادرة.'
  },
  {
    id: 'ct_9',
    category: 'structure_materials',
    categoryLabelFa: 'بافت، ابریشم و رج‌شمار',
    termFa: 'رج‌شمار (۵۰ تا ۸۰ رج)، چله ابریشم و رنگ گیاهی',
    fingilish: 'Raj-shomar, Chelleh Abrisham, Rang-e Giyahi',
    termEn: 'Knot Density (Raj / KPSI), Pure Silk Foundation & 100% Vegetable Dyes',
    pronunciationEn: 'not DEN-si-tee, pyoor silk fown-DAY-shun, vej-tuh-bul dyez',
    termAr: 'كثافة العقد (الرج)، سدى الحرير الخالص، وأصباغ نباتية طبيعية ١٠٠٪',
    pronunciationAr: 'Kathāfat al-‘Uqad (Raj), Sadā al-Harīr, wa Asbāgh Nabātiyyah',
    technicalNoteFa: 'هر «رج» تعداد گره در هر ۷ سانتی‌متر عرض فرش است (مثلاً ۶۰ رج معادل حدود ۶۵۰ گره در اینچ مربع / KPSI).',
    merchantPitchEn: 'This is a 60-Raj masterpiece on a pure silk warp foundation, woven with Kork lambswool and 100% natural vegetable dyes.',
    merchantPitchAr: 'هذه تحفة فنية بكثافة ٦٠ رج على أساس من الحرير الخالص، منسوجة بصوف الكرك وألوان نباتية طبيعية ١٠٠٪.'
  }
];

export const CARPET_MERCHANT_DIALOGUES: CarpetMerchantDialogue[] = [
  {
    id: 'cmd_1',
    stageTitleFa: '۱. خوش‌آمدگویی اصیل حجره و پذیرایی (چای زعفرانی)',
    stageTitleEn: 'Stage 1: Traditional Showroom Hospitality',
    customerQuestionEn: 'Hello! We are admiring these Persian carpets. May we take a look inside?',
    customerQuestionAr: 'السلام عليكم! لقد أعجبنا هذا السجاد الإيراني الفاخر، هل يمكننا الدخول للمشاهدة؟',
    customerMeaningFa: 'سلام! ما محو تماشای این فرش‌های ایرانی شدیم، می‌توانیم داخل حجره را ببینیم؟',
    merchantReplyFa: 'قدم رنجه فرمودید! حجره متعلق به خودتان است. بفرمایید استراحت کنید و چای زعفرانی میل بفرمایید تا فرش‌های دستباف و کهنه ذاتی را برایتان پهن کنم.',
    merchantReplyEn: 'You honor us! Our showroom is your home. Please have a seat and enjoy fresh saffron tea while we unroll our finest hand-knotted carpets for you—with no obligation to buy.',
    merchantReplyEnPhonetic: 'yoo ON-er us! wel-kum too owr SHOW-room. pleez hav ah seet wyle wee serv saf-ron tee',
    merchantReplyAr: 'أهلاً وسهلاً بكم، شرّفتم معرضنا! المكان مكانكم، تفضّلوا بالجلوس لنقدّم لكم الشاي بالزعفران ونفرش لكم أجمل القطع اليدوية.',
    merchantReplyArPhonetic: 'Ahlan wa sahlan bikum, sharraftum ma‘ridanā! Tafaddalū bil-julūs linuqaddima lakum ash-shāy bil-za‘farān.',
    tradeTipFa: 'نکته شادروان حاج حسین آقای علی‌میری: در تجارت فرش، مشتری ابتدا «حرمت، آرامش و صداقت حجره» را می‌خرد و سپس فرش را؛ هرگز در دقایق اول صحبت از قیمت نکنید.'
  },
  {
    id: 'cmd_2',
    stageTitleFa: '۲. توضیح تخصصی «کهنه ذاتی» و سایز «دو ذرع / ذرع و نیم»',
    stageTitleEn: 'Stage 2: Explaining Kohneh Zaati & Traditional Zar Sizes',
    customerQuestionEn: 'This rug has such a soft, antique glow! Is it chemically washed, and what is its exact size?',
    customerQuestionAr: 'هذه السجادة لها بريق هادئ وعتيق جداً! هل هي مغسولة كيميائياً وما هو مقاسها الدقيق؟',
    customerMeaningFa: 'این قالیچه درخشش عتیقه و ملایمی دارد! آیا شست‌وشوی شیمیایی شده و سایز دقیقش چیست؟',
    merchantReplyFa: 'این قالیچه سایز «دو ذرع» (۲۰۰ در ۱۳۵ سانتی‌متر) و صد در صد «کهنه ذاتی» است؛ یعنی درخشش و پختگی رنگ‌های گیاهی آن حاصل دهه‌ها گذر طبیعی زمان است، نه اسیدشویی شیمیایی.',
    merchantReplyEn: 'This is a classic "Dozar" Ghalicheh measuring 200 by 135 cm (4.5 by 6.7 feet). Its sheen is 100% "Kohneh Zaati"—naturally aged over decades with pure vegetable dyes, never chemically treated.',
    merchantReplyEnPhonetic: 'this iz ah doh-ZAR rug (4.5 bye 6.7 feet). it iz 100% koh-neh zaa-tee, nach-ur-uh-lee aydjd',
    merchantReplyAr: 'هذه قاليجه بمقاس «دوزرع» (٢٠٠×١٣٥ سم). وبريقها «كهنه ذاتي» أصيل ١٠٠٪، أي معتّقة طبيعياً عبر السنين بأصباغ نباتية خالصة بدون أي مواد كيميائية.',
    merchantReplyArPhonetic: 'Hādhihi Qālījah Dozar (200×135 cm), wa hiya Kohneh Zātī mu‘attaqa tabī‘iyyan.',
    tradeTipFa: 'وقتی به مشتری خارجی تفاوت «کهنه ذاتی (Naturally Aged Patina)» و «کهنه‌شویی شیمیایی (Chemical Wash)» را پشت فرش نشان می‌دهید، ارزش فرش در نگاه او چند برابر می‌شود.'
  },
  {
    id: 'cmd_3',
    stageTitleFa: '۳. مذاکره قیمت، شناسنامه اصالت و ارسال هوایی (کارگو)',
    stageTitleEn: 'Stage 3: Pricing, Certificate of Authenticity & Worldwide Shipping',
    customerQuestionEn: 'We love this Zar-o-Nim silk foundation rug! What is your best price, and how can we take it home?',
    customerQuestionAr: 'لقد أعجبتنا هذه القطعة (ذرع ونصف) ذات الأساس الحريري! ما هو السعر النهائي وكيف يمكن شحنها؟',
    customerMeaningFa: 'ما عاشق این قالیچه ذرع و نیم چله ابریشم شدیم! بهترین قیمت شما چقدر است و چطور آن را ببریم؟',
    merchantReplyFa: 'قابل شما را ندارد! به رسم یادگاری و برکت حجره، تخفیف ویژه پای معامله تقدیمتان می‌کنم، همراه با شناسنامه رسمی اصالت و بسته‌بندی چمدانی یا ارسال هوایی بیمه‌شده درب منزل شما.',
    merchantReplyEn: 'It is unworthy of your honor ("Ghabel nadareh")! I will offer you our best collector’s discount, complete with a signed Certificate of Authenticity and either compact luggage wrapping or insured DHL door-to-door shipping.',
    merchantReplyEnPhonetic: 'eye wil of-er owr best kuh-LEK-terz dis-kownt with ah ser-TIF-i-kut ov aw-then-TIS-i-tee',
    merchantReplyAr: 'إنها مقدّمة لكم ولا تغلى عليكم! سأمنحكم خصماً خاصاً للمقتنين مع شهادة أصالة رسمية، وتغليف مدمج للطائرة أو شحن جوي مؤمّن حتى باب منزلكم.',
    merchantReplyArPhonetic: 'Sa-amnahukum khasman khāssan ma‘a shahādat asālah wa shahn jawwī mu’amman.',
    tradeTipFa: 'همیشه به توریست اطمینان دهید که فرش ذرع و نیم یا دو ذرع را می‌توانید به اندازه یک کیف دستی کوچک «وکیوم چمدانی» کنید یا با کارگو بفرستید.'
  }
];

export const CARPET_NEGOTIATION_QUIZZES: CarpetNegotiationQuiz[] = [
  {
    id: 'cnq_1',
    buyerPersona: 'کلکسیونر آمریکایی در حجره شما',
    buyerQuoteEn: 'I want a rug that aged organically over 50 years, not one bleached with chlorine. How do you call this in Iran and is this Dozar piece authentic?',
    buyerQuoteAr: 'أريد سجادة معتقة طبيعياً عبر السنين وليست مغسولة بالكلور. ماذا تسمون هذا في إيران؟',
    buyerQuoteFa: 'من فرشی می‌خواهم که به صورت طبیعی در طول ۵۰ سال کهنه شده باشد، نه با کلر و مواد شیمیایی. در ایران به آن چه می‌گویید؟',
    questionFa: 'بهترین و حرفه‌ای‌ترین پاسخ شما به عنوان تاجر فرش چیست؟',
    options: [
      {
        textEn: 'In Iran we call this "Kohneh Zaati" (authentic naturally aged patina). Look at the back of the knots—the vegetable dyes mellowed naturally from the tip while the root remains rich.',
        textFa: 'در ایران به این «کهنه ذاتی» می‌گوییم. به پشت گره‌ها نگاه کنید؛ رنگ گیاهی از نوک پرز به صورت طبیعی پخته شده و ریشه رنگ اصیل خود را حفظ کرده است.',
        isCorrect: true,
        feedbackFa: 'آفرین! دقیق‌ترین توضیح کارشناسی کهنه ذاتی که اعتماد ۱۰۰٪ کلکسیونر را جلب می‌کند.'
      },
      {
        textEn: 'Yes it is old carpet, very cheap price for you.',
        textFa: 'بله فرش قدیمی است و قیمتش ارزان است.',
        isCorrect: false,
        feedbackFa: 'این پاسخ ارزش هنری و تخصصی فرش «کهنه ذاتی» شما را پایین می‌آورد.'
      }
    ]
  }
];
