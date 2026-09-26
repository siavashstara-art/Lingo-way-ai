// Specialized Persian Carpet Trade & Bazaar Terminology & Trilingual Dialogues (Persian - English - Arabic)
// Dedicated in honored memory of the late Haj Hassan Agha Ali Miri (شادروان حاج حسن آقای علی‌میری)
// Companion educational module to the "Farsh Bazaar (فرش بازار)" app by the same developer.

export interface CarpetTermItem {
  id: string;
  category: 'types' | 'sizes' | 'condition_age' | 'structure_materials' | 'trade_shipping';
  categoryLabelFa: string;
  categoryLabelEn: string;
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
  stage: 'welcome' | 'inspection_age' | 'size_measurement' | 'price_negotiation' | 'shipping_certificate';
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
  options: {
    textEn: string;
    textFa: string;
    isCorrect: boolean;
    feedbackFa: string;
  }[];
}

export const CARPET_TERMINOLOGY_DB: CarpetTermItem[] = [
  // ==========================================
  // 1. CARPET TYPES & WEAVES (انواع فرش، قالی، گلیم، پشتی)
  // ==========================================
  {
    id: 'ct_1',
    category: 'types',
    categoryLabelFa: 'انواع فرش و دستبافته',
    categoryLabelEn: 'Rug & Carpet Classifications',
    termFa: 'قالی دستباف (فرش بزرگ‌پارچه)',
    fingilish: 'Ghâli-ye Dastbâf',
    termEn: 'Hand-Knotted Pile Carpet (Large Area Rug)',
    pronunciationEn: 'hand-NOT-ed pyle KAR-pet',
    termAr: 'سجادة يدوية فاخرة (قالي إيراني)',
    pronunciationAr: 'Sajjāda Yadawiyya Fākhira',
    dimensionsMetric: '۶ متری به بالا (200×300 cm+)',
    dimensionsImperial: "6'7\" × 9'10\" ft and larger",
    technicalNoteFa: 'در اصطلاح تخصصی بازار، به فرش‌های پرزدارِ ۶ متری و بزرگ‌تر «قالی» و به کوچک‌تر از آن «قالیچه» می‌گویند.',
    merchantPitchEn: 'This is a masterwork hand-knotted Persian pile carpet (Ghali), woven node by node with centuries of heritage.',
    merchantPitchAr: 'هذه سجادة إيرانية يدوية فاخرة (قالي)، منسوجة عقدةً بعقدةٍ بأعلى درجات الإتقان.'
  },
  {
    id: 'ct_2',
    category: 'types',
    categoryLabelFa: 'انواع فرش و دستبافته',
    categoryLabelEn: 'Rug & Carpet Classifications',
    termFa: 'قالیچه',
    fingilish: 'Ghâlicheh',
    termEn: 'Fine Area Rug / Scatter Rug (Ghalicheh)',
    pronunciationEn: 'fyne AIR-ee-uh rug',
    termAr: 'سجادة صغيرة نفيسة (قاليجه)',
    pronunciationAr: 'Sajjāda Saghīra Nafīsa (Qālīcha)',
    dimensionsMetric: 'معمولاً زیر ۴ متر مربع (ذرع و نیم تا دو ذرع)',
    dimensionsImperial: "3'5\" × 5' ft up to 4'5\" × 6'7\" ft",
    technicalNoteFa: 'قالیچه‌ها اغلب رج‌شمار بالاتری دارند و برای فضاهای نشیمن، جلوی مبلمان یا کلکسیون استفاده می‌شوند.',
    merchantPitchEn: 'A Ghalicheh is a high-density collector’s area rug, prized for its intricate medallion and delicate weave.',
    merchantPitchAr: 'القاليجه هي سجادة صغيرة عالية الكثافة والدقة، مثالية للصالات الفخمة والمقتنين.'
  },
  {
    id: 'ct_3',
    category: 'types',
    categoryLabelFa: 'انواع فرش و دستبافته',
    categoryLabelEn: 'Rug & Carpet Classifications',
    termFa: 'گلیم دستباف (تخت‌باف / بدون پرز)',
    fingilish: 'Gelîm / Kilim',
    termEn: 'Flat-Woven Tribal Kilim (Pileless Tapestry Rug)',
    pronunciationEn: 'flat-WOH-ven TRY-bul kee-LEEM',
    termAr: 'كليم إيراني منسوج مسطح (بدون وبر)',
    pronunciationAr: 'Kilīm Īrānī Mansūj Musattah',
    technicalNoteFa: 'گلیم از درگیری تار و پود بدون گره پرز بافته می‌شود، سبک است و اغلب نقوش هندسی و عشایری دارد.',
    merchantPitchEn: 'This is an authentic flat-woven Persian Kilim with geometric tribal motifs—lightweight, reversible, and timeless.',
    merchantPitchAr: 'هذا كليم إيراني أصيل منسوج بدون وبر بنقوش هندسية تراثية، خفيف الوزن وعملي جداً.'
  },
  {
    id: 'ct_4',
    category: 'types',
    categoryLabelFa: 'انواع فرش و دستبافته',
    categoryLabelEn: 'Rug & Carpet Classifications',
    termFa: 'پشتی دستباف',
    fingilish: 'Poshti',
    termEn: 'Traditional Persian Bolster / Cushion Rug (Poshti)',
    pronunciationEn: 'truh-DISH-un-ul BOHL-ster kuh-shun rug',
    termAr: 'مسند ظهر تقليدي منسوج يدوياً (بشتي)',
    pronunciationAr: 'Masnad Zahr Taqlīdī (Poshtī)',
    dimensionsMetric: '۶۰×۹۰ سانتی‌متر (یا ۵۰×۱۰۰)',
    dimensionsImperial: "2' × 3' ft",
    technicalNoteFa: 'پشتی کوچک‌ترین قطع رایج فرش است که هم به عنوان روکش پشتی شاه‌نشین و هم پادری لوکس به کار می‌رود.',
    merchantPitchEn: 'This Poshti can be used either as a traditional lounge backrest cushion or as a luxurious accent mat.',
    merchantPitchAr: 'هذا البشتي الإيراني يستخدم كمسند تقليدي فاخر للمجالس العربية أو كقطعة ديكور أرضية.'
  },
  {
    id: 'ct_5',
    category: 'types',
    categoryLabelFa: 'انواع فرش و دستبافته',
    categoryLabelEn: 'Rug & Carpet Classifications',
    termFa: 'فرش مربع و کناره',
    fingilish: 'Farsh-e Morabba\' & Kenâreh',
    termEn: 'Square Rug (Morabba) & Hallway Runner (Kenareh)',
    pronunciationEn: 'skwair rug and HAWL-way RUN-er',
    termAr: 'سجادة مربعة وممر طويل (كناره)',
    pronunciationAr: 'Sajjāda Murabba‘a wa Mamarr Tawīl (Kināra)',
    dimensionsMetric: 'مربع: ۲×۲ یا ۳×۳ متر | کناره: عرض ۸۰ تا ۱۲۰ سانتی‌متر',
    dimensionsImperial: "Square: 6'7\"×6'7\" or 10'×10' | Runner: 2'7\"–4' × 10'–20' ft",
    technicalNoteFa: 'فرش‌های مربع و کناره‌های راهرویی در بازار جهانی (به‌ویژه اروپا و کشورهای خلیج فارس) بسیار کمیاب و پرمتقاضی هستند.',
    merchantPitchEn: 'Square Persian rugs and long corridor runners (Kenareh) require custom loom setups and are highly sought-after.',
    merchantPitchAr: 'السجاد المربع وسجاد الممرات الطويلة (كناره) نادر جداً ومطلوب بقوة للقصور والمداخل الواسعة.'
  },

  // ==========================================
  // 2. TRADITIONAL BAZAAR SIZES (ابعاد سنتی: ذرع و نیم، دو ذرع، ذرع و چارک)
  // ==========================================
  {
    id: 'ct_6',
    category: 'sizes',
    categoryLabelFa: 'ابعاد و مقیاس‌های سنتی بازار',
    categoryLabelEn: 'Traditional Bazaar Size Units (Zar)',
    termFa: 'ذرع و نیم (زرع و نیم)',
    fingilish: 'Zar-o-Nim (Zaronim)',
    termEn: 'Zar-o-Nim Size (~1.5 × 1.05 Meters / 3.5 × 5 Feet)',
    pronunciationEn: 'zar-oh-NEEM syze (three-and-a-half by fyve feet)',
    termAr: 'مقاس ذرع ونصف (١٥٠ × ١٠٥ سم تقريباً)',
    pronunciationAr: 'Maqās Dhar‘ wa Nisf (150 × 105 cm)',
    dimensionsMetric: 'حدود ۱۵۰ × ۱۰۴ سانتی‌متر (۱.۵ متر مربع)',
    dimensionsImperial: "Approx. 3'5\" × 5'0\" ft",
    technicalNoteFa: 'هر «ذرع» بازار فرش حدود ۱۰۴ تا ۱۰۷ سانتی‌متر است. «ذرع و نیم» یعنی طول ۱.۵ ذرع (حدود ۱۵۶ سانت) و عرض ۱ ذرع (۱۰۴ سانت).',
    merchantPitchEn: 'In Persian bazaar terminology, this size is called "Zar-o-Nim", measuring roughly 3.5 by 5 feet (105 by 155 cm).',
    merchantPitchAr: 'في سوق السجاد الإيراني نسمي هذا المقاس «ذرع ونصف»، وأبعاده حوالي متر ونصف في متر.'
  },
  {
    id: 'ct_7',
    category: 'sizes',
    categoryLabelFa: 'ابعاد و مقیاس‌های سنتی بازار',
    categoryLabelEn: 'Traditional Bazaar Size Units (Zar)',
    termFa: 'دو ذرع (دو زرع / قالیچه ۳ متری)',
    fingilish: 'Do-Zar (Dozar)',
    termEn: 'Dozar Size (~2.0 × 1.35 Meters / 4.5 × 6.7 Feet)',
    pronunciationEn: 'doh-ZAR syze (four-and-a-half by six-point-seven feet)',
    termAr: 'مقاس ذرعين / دوزرع (٢٠٠ × ١٣٥ سم تقريباً)',
    pronunciationAr: 'Maqās Dhar‘ayn / Dūzar‘ (200 × 135 cm)',
    dimensionsMetric: 'حدود ۲۰۰ × ۱۳۵ سانتی‌متر (نزدیک به ۳ متر مربع)',
    dimensionsImperial: "Approx. 4'5\" × 6'7\" ft",
    technicalNoteFa: '«دو ذرع» محبوب‌ترین سایز قالیچه در تجارت جهانی است؛ طول آن ۲ ذرع (حدود ۲.۰۸ متر) و عرض آن یک و چارک ذرع است.',
    merchantPitchEn: 'This is a classic "Dozar" rug, approximately 4.5 by 6.7 feet (135 by 200 cm)—the golden standard for living spaces.',
    merchantPitchAr: 'هذا مقاس «دوزرع» الكلاسيكي (مترين في متر و٣٥ سم)، وهو المقاس الأكثر طلباً عالمياً.'
  },
  {
    id: 'ct_8',
    category: 'sizes',
    categoryLabelFa: 'ابعاد و مقیاس‌های سنتی بازار',
    categoryLabelEn: 'Traditional Bazaar Size Units (Zar)',
    termFa: 'ذرع و چارک (زرع و چارک)',
    fingilish: 'Zar-o-Chârak',
    termEn: 'Zar-o-Charak Size (~1.25 × 0.80 Meters / 2.7 × 4.1 Feet)',
    pronunciationEn: 'zar-oh-chah-RAK syze (two-point-seven by four feet)',
    termAr: 'مقاس ذرع وربع (١٢٥ × ٨٠ سم تقريباً)',
    pronunciationAr: 'Maqās Dhar‘ wa Rub‘ (125 × 80 cm)',
    dimensionsMetric: 'حدود ۱۲۵ تا ۱۳۰ × ۸۰ سانتی‌متر (۱ متر مربع)',
    dimensionsImperial: "Approx. 2'7\" × 4'1\" ft",
    technicalNoteFa: '«چارک» یعنی یک‌چهارم ذرع. ذرع و چارک برابر با ۱.۲۵ ذرع طول (حدود ۱۳۰ سانتی‌متر) و عرض ۸۰ سانتی‌متر است.',
    merchantPitchEn: '"Zar-o-Charak" translates to 1.25 Zar in length—roughly 2 foot 7 inches by 4 feet, ideal for entryways or framing.',
    merchantPitchAr: 'مقاس «ذرع وربع» يعادل متراً وربع في ثمانين سنتيمتراً، مثالي للمداخل أو التعليق الجداري.'
  },

  // ==========================================
  // 3. AGE, CONDITION & PATINA (کهنه ذاتی، کارکرده، نوبافت، قدیمی)
  // ==========================================
  {
    id: 'ct_9',
    category: 'condition_age',
    categoryLabelFa: 'قدمت، کهنگی و اصالت فرش',
    categoryLabelEn: 'Age, Patina & Condition Grading',
    termFa: 'کهنه ذاتی (پا-خورده اصیل و طبیعی)',
    fingilish: 'Kohneh-ye Zâti',
    termEn: 'Authentic Naturally Aged Patina (Organic Foot-Worn Vintage)',
    pronunciationEn: 'aw-THEN-tik NACH-ur-uh-lee aydjd puh-TEE-nuh',
    termAr: 'معتّق طبيعي أصيل (تعتيق الزمن بدون كيماويات)',
    pronunciationAr: 'Mu‘attaq Tabī‘ī Asīl (Kohneh Dhātī)',
    technicalNoteFa: '«کهنه ذاتی» مهم‌ترین اصطلاح برای مشتریان خارجی است: یعنی فرشی که در طول دهه‌ها به صورت طبیعی پا خورده و رنگ پخته کرده، نه اینکه با دوا و مواد شیمیایی در کارگاه کهنه‌نما شده باشد!',
    merchantPitchEn: 'This piece is "Kohneh Zaati"—meaning it has a 100% authentic, naturally aged patina mellowed over decades of gentle use, with zero chemical washing.',
    merchantPitchAr: 'هذه القطعة «كهنه ذاتي» أي معتّقة طبيعياً بمرور السنين والاستخدام الأصيل، ولم تتعرض لأي غسيل كيميائي اصطناعي.'
  },
  {
    id: 'ct_10',
    category: 'condition_age',
    categoryLabelFa: 'قدمت، کهنگی و اصالت فرش',
    categoryLabelEn: 'Age, Patina & Condition Grading',
    termFa: 'فرش کهنه، قدیمی و عتیقه (آنتیک)',
    fingilish: 'Farsh-e Kohneh, Ghadimi va Atigheh',
    termEn: 'Antique (80–100+ yrs) & Semi-Antique (50–80 yrs) Collector Rug',
    pronunciationEn: 'an-TEEK and SEM-ee an-teek kuh-LEK-ter rug',
    termAr: 'سجادة أثرية قديمة ونادرة (أنتيك للجمع والاستثمار)',
    pronunciationAr: 'Sajjāda Athariyya Qadīma wa Nādira (Antīk)',
    technicalNoteFa: 'در بازار جهانی، فرش بالای ۵۰ سال Semi-Antique و بالای ۸۰ تا ۱۰۰ سال Antique محسوب می‌شود و حکم سرمایه هنری دارد.',
    merchantPitchEn: 'This is a genuine semi-antique/antique collector’s rug with rare vegetable dyes that are no longer reproducible today.',
    merchantPitchAr: 'هذه سجادة قديمة وأثرية نادرة مصبوغة بأصباغ نباتية طبيعية، وتعد استثماراً فنياً تزداد قيمته مع الوقت.'
  },
  {
    id: 'ct_11',
    category: 'condition_age',
    categoryLabelFa: 'قدمت، کهنگی و اصالت فرش',
    categoryLabelEn: 'Age, Patina & Condition Grading',
    termFa: 'فرش کارکرده (در حد نو / پا-خورده سالم)',
    fingilish: 'Farsh-e Kâr-kardeh',
    termEn: 'Pre-Owned / Gently Used Vintage Condition (Full Pile)',
    pronunciationEn: 'pree-OHND JENT-lee yoozd VIN-tij',
    termAr: 'سجادة مستعملة بحالة ممتازة (وبر كامل ونظيف)',
    pronunciationAr: 'Sajjāda Musta‘mala bi-Hāla Mumtāza',
    technicalNoteFa: 'فرش کارکرده سالم (گوشت‌دار) برای مشتری خارجی بسیار جذاب است چون هم قیمت مناسب‌تری از نوبافت دارد و هم دوام خودش را پس داده است.',
    merchantPitchEn: 'This is a gently pre-owned carpet in mint, full-pile condition—profesionally washed, settled, and ready for decades of use.',
    merchantPitchAr: 'هذه سجادة مستعملة استعمالاً خفيفاً وبحالة ممتازة، وبرها كامل ومغسولة ومجهزة بعناية.'
  },
  {
    id: 'ct_12',
    category: 'condition_age',
    categoryLabelFa: 'قدمت، کهنگی و اصالت فرش',
    categoryLabelEn: 'Age, Patina & Condition Grading',
    termFa: 'فرش نوبافت (آکبند از دار پایین آمده)',
    fingilish: 'Farsh-e Now-bâft',
    termEn: 'Newly Woven / Unwalked Contemporary Masterpiece (Off-the-Loom)',
    pronunciationEn: 'NOO-lee WOH-ven un-WAWKT',
    termAr: 'سجادة حديثة النسيج (جديدة لم تُفرش من قبل)',
    pronunciationAr: 'Sajjāda Hadīthat an-Nasīj (Jadīda)',
    technicalNoteFa: 'فرشی که تازه از دار قالی پایین آمده، پرداخت و شست‌وشوی اول را گذرانده و هیچ پاخوری نداشته است.',
    merchantPitchEn: 'This is a brand-new, unwalked weaving straight from our master weavers’ loom, with crisp shearing and vibrant luster.',
    merchantPitchAr: 'هذه سجادة جديدة تماماً (نوبافت) أُنزلت حديثاً من النول ولم تُفرش من قبل.'
  },

  // ==========================================
  // 4. STRUCTURE & MATERIALS (رج‌شمار، چله ابریشم، رنگ گیاهی)
  // ==========================================
  {
    id: 'ct_13',
    category: 'structure_materials',
    categoryLabelFa: 'مواد اولیه و ساختار بافت',
    categoryLabelEn: 'Materials, Dyes & Knot Density',
    termFa: 'رج‌شمار (مثلاً ۵۰ رج، ۶۰ رج، ۸۰ رج)',
    fingilish: 'Raj-shomâr (50 Raj / 70 Raj)',
    termEn: 'Raj Count / Knot Density (Knots per 7 cm / KPSI)',
    pronunciationEn: 'raj kownt / not DEN-si-tee',
    termAr: 'عدد العُقَد / كثافة النسيج (رج شمار)',
    pronunciationAr: '‘Adad al-‘Uqad / Kathāfat an-Nasīj (Raj)',
    technicalNoteFa: 'هر «رج» تعداد گره‌ها در ۷ سانتی‌متر عرض فرش است. مثلاً ۵۰ رج تقریباً معادل ۵۰۰ تا ۵۵۰ گره در اینچ مربع (KPSI) است.',
    merchantPitchEn: 'This Tabriz/Isfahan piece is 60 Raj—meaning 60 knots per 7 centimeters (over 600 knots per square inch), giving it photographic precision.',
    merchantPitchAr: 'هذه القطعة كثافتها ٦٠ رج (أي ٦٠ عقدة في كل ٧ سم)، مما يمنح النقوش دقةً فائقة الوضوح.'
  },
  {
    id: 'ct_14',
    category: 'structure_materials',
    categoryLabelFa: 'مواد اولیه و ساختار بافت',
    categoryLabelEn: 'Materials, Dyes & Knot Density',
    termFa: 'چله ابریشم و گل ابریشم (پشم کرک مرینوس)',
    fingilish: 'Chelleh Abrisham & Gol-Abrisham',
    termEn: 'Pure Silk Warp/Foundation with Silk Highlights & Kork Lambswool',
    pronunciationEn: 'pyoor silk worp with silk HYE-lytes and kork wool',
    termAr: 'سدى (أساس) من الحرير الخالص مع نقوش حريرية وصوف كرك ناعم',
    pronunciationAr: 'Sadā min al-Harīr al-Khālis ma‘a Nuqūsh Harīriyya',
    technicalNoteFa: 'وقتی تار (چله) فرش از ابریشم باشد، فرش بسیار ظریف‌تر، مقاوم‌تر و باارزش‌تر است و گل‌های برجسته ابریشمی در نور می‌درخشند.',
    merchantPitchEn: 'Built on a 100% pure silk foundation (Chelleh Abrisham) with hand-spun Kork wool and luminous silk highlights in the medallion.',
    merchantPitchAr: 'أساس هذه السجادة من الحرير الخالص (چله ابريشم) مع صوف الكرك الناعم ولمسات الحرير الطبيعي في الزهور.'
  }
];

export const CARPET_MERCHANT_DIALOGUES: CarpetMerchantDialogue[] = [
  {
    id: 'cmd_1',
    stage: 'welcome',
    stageTitleFa: '۱. خوش‌آمدگویی سنتی در حجره و دعوت به چای زعفرانی',
    stageTitleEn: '1. Traditional Showroom Welcome & Hospitality',
    customerQuestionEn: 'Hello! We are admiring these carpets in the window. May we come inside and look around?',
    customerQuestionAr: 'السلام عليكم، أعجبتنا هذه السجادات المعروضة، هل يمكننا الدخول والمشاهدة؟',
    customerMeaningFa: 'سلام! ما محو تماشای این فرش‌های ویترین شدیم. اجازه هست داخل بیاییم و نگاه کنیم؟',
    merchantReplyFa: 'قدمتان روی چشم! به حجره ما خیلی خوش آمدید. اینجا خانه خودتان است؛ بفرمایید بنشینید تا چای زعفرانی تازه دم بیاوریم و فرش‌ها را برایتان پهن کنیم.',
    merchantReplyEn: 'You honor us with your steps! Welcome to our showroom. Feel completely at home—please have a seat while we serve fresh saffron tea and unroll the carpets for you.',
    merchantReplyEnPhonetic: 'yoo ON-er us! wel-kum too owr SHOW-room. pleez hav ah seet wyle wee serv saf-ron tee',
    merchantReplyAr: 'أهلاً وسهلاً بكم، شرّفتم معرضنا! المكان مكانكم، تفضّلوا بالجلوس لنقدّم لكم الشاي بالزعفران ونفرش لكم أجمل القطع.',
    merchantReplyArPhonetic: 'Ahlan wa sahlan bikum, sharraftum ma‘ridanā! Tafaddalū bil-julūs linuqaddima lakum ash-shāy bil-za‘farān.',
    tradeTipFa: 'نکته مرحوم حاج حسن آقا علی‌میری: در تجارت فرش، مشتری ابتدا «حرمت، آرامش و صداقت حجره» را می‌خرد و سپس فرش را؛ هرگز در دقایق اول صحبت از قیمت نکنید.'
  },
  {
    id: 'cmd_2',
    stage: 'inspection_age',
    stageTitleFa: '۲. توضیح تفاوت «کهنه ذاتی» با کهنه‌شویی شیمیایی و اصالت رنگ',
    stageTitleEn: '2. Explaining "Kohneh Zaati" (Natural Aging) & Vegetable Dyes',
    customerQuestionEn: 'Is this vintage rug naturally aged over time, or has it been chemically distressed?',
    customerQuestionAr: 'هل هذه السجادة قديمة ومعتّقة بشكل طبيعي أم تم غسلها بمواد كيميائية؟',
    customerMeaningFa: 'آیا این فرش واقعاً در طول زمان به شکل طبیعی کهنه شده (کهنه ذاتی است) یا با مواد شیمیایی کهنه‌نما شده است؟',
    merchantReplyFa: 'سوال بسیار دقیقی پرسیدید! این فرش صد در صد «کهنه ذاتی» است؛ یعنی در طول چهل سال به‌طور طبیعی پا خورده، ریشه‌هایش سالم است و رنگ‌هایش از روناس، پوست گردو و نیل طبیعی گرفته شده است.',
    merchantReplyEn: 'Excellent question! This carpet is 100% "Kohneh Zaati"—naturally aged over forty years of organic use. Look at the back of the knots: the wool retains its natural lanolin, and the dyes are pure madder root, walnut husk, and indigo.',
    merchantReplyEnPhonetic: 'this kar-pet iz koh-neh zaa-tee — nach-ur-uh-lee aydjd oh-ver for-tee yeerz with pyoor vej-tuh-bul dyez.',
    merchantReplyAr: 'سؤال دقيق جداً! هذه السجادة «كهنه ذاتي» أي معتّقة طبيعياً عبر أربعين عاماً، وألوانها نباتية خالصة من الفوة وقشر الجوز والنيلة الطبيعية.',
    merchantReplyArPhonetic: 'Hādhihi as-sajjāda Kohneh Dhātī, mu‘attaqa tabī‘iyyan, wa alwānuhā nabātiyya khālisa.',
    tradeTipFa: 'نکته طلایی: همیشه پشت فرش (گره‌ها) را به مشتری خارجی نشان دهید؛ یکنواخت نبودن ملایم رنگ (ابرش / Abrash) و نرمی پشم، سندِ «کهنه ذاتی» و رنگ گیاهی است.'
  },
  {
    id: 'cmd_3',
    stage: 'size_measurement',
    stageTitleFa: '۳. اعلام دقیق ابعاد سنتی (ذرع و نیم، دو ذرع، چارک) به متر و فوت',
    stageTitleEn: '3. Converting Traditional Bazaar Sizes (Zar) to Feet & Meters',
    customerQuestionEn: 'What are the exact dimensions of this Ghalicheh and the smaller rug next to it in feet or meters?',
    customerQuestionAr: 'ما هي الأبعاد الدقيقة لهذه القاليجه والسجادة الأصغر بجانبها بالمتر أو القدم؟',
    customerMeaningFa: 'ابعاد دقیق این قالیچه و آن فرش کوچک‌تر کنارش به متر یا فوت چقدر است؟',
    merchantReplyFa: 'این قالیچه بزرگ‌تر سایز «دو ذرع» است یعنی ۲۰۰ در ۱۳۵ سانتی‌متر (۴.۵ در ۶.۷ فوت)، و آن قطعه کوچک‌تر «ذرع و نیم» است یعنی ۱۵۰ در ۱۰۵ سانتی‌متر (۳.۵ در ۵ فوت). سایز «ذرع و چارک» (۱۲۵ در ۸۰ سانت) هم موجود داریم.',
    merchantReplyEn: 'This larger Ghalicheh is a classic "Dozar" measuring 200 by 135 cm (4 foot 5 inches by 6 foot 7 inches). The smaller one is a "Zar-o-Nim" at 150 by 105 cm (3.5 by 5 feet), and we also have "Zar-o-Charak" at 125 by 80 cm.',
    merchantReplyEnPhonetic: 'this iz ah doh-zar at 200 bye 135 sen-ti-mee-terz (four-point-fyve bye six-point-sev-en feet).',
    merchantReplyAr: 'هذه القاليجه مقاسها «دوزرع» أي ٢٠٠ في ١٣٥ سم (حوالي ٤.٥ في ٦.٧ قدم)، والأصغر مقاسها «ذرع ونصف» أي ١٥٠ في ١٠٥ سم، ولدينا أيضاً «ذرع وربع».',
    merchantReplyArPhonetic: 'Hādhihi maqāsuhā Dūzar‘ (200 × 135 cm), wal-asghar Dhar‘ wa Nisf (150 × 105 cm).',
    tradeTipFa: 'مشتریان آمریکایی و انگلیسی ابعاد را فقط با «فوت و اینچ (Feet & Inches)» و مشتریان عرب و اروپایی با «سانتی‌متر و متر» تجسم می‌کنند. ذکر هر دو نشانه حرفه‌ای بودن تاجر است.'
  },
  {
    id: 'cmd_4',
    stage: 'price_negotiation',
    stageTitleFa: '۴. مذاکره قیمت، تخفیف تجاری و احترام متقابل در معامله',
    stageTitleEn: '4. Honourable Price Negotiation & Collector Value',
    customerQuestionEn: 'We love both the Kilim and the Dozar carpet. If we buy both pieces together, what is your best merchant price?',
    customerQuestionAr: 'أعجبنا الكليم وسجادة الدوزرع معاً، إذا اشترينا القطعتين فكم يكون السعر النهائي الخاص؟',
    customerMeaningFa: 'ما هم گلیم و هم قالیچه دو ذرع را پسندیدیم. اگر هر دو را با هم برداریم، بهترین قیمت تجاری شما چقدر است؟',
    merchantReplyFa: 'اصلاً قابل شما را ندارد! چون هر دو تخته را با هم انتخاب کردید و قدردان هنر دست بافندگان ایرانی هستید، ۱۰ درصد تخفیف ویژه همکار و کلکسیونر تقدیمتان می‌کنم تا خیرش به خانه شما برسد.',
    merchantReplyEn: 'First of all, it is unworthy of your honor ("Ghabel nadareh")! Because you appreciate the weavers’ artistry and are acquiring both pieces together, I will extend a 10% collector’s bundle discount with our blessing.',
    merchantReplyEnPhonetic: 'be-kawz yoo a-pree-shee-ayt theh art, eye wil giv yoo ah ten per-sent kuh-lek-terz dis-kownt.',
    merchantReplyAr: 'مقدّمة لكم ولا تغلى عليكم! وتقديراً لذوقكم الرفيع واختياركم القطعتين معاً، سأقدم لكم خصماً خاصاً بنسبة ١٠٪ مباركاً لكم.',
    merchantReplyArPhonetic: 'Muqaddama lakum! Sa-uqaddimu lakum khasman khāssan bi-nisbat 10% mubārakan lakum.',
    tradeTipFa: 'در فرهنگ بازار فرش ایران، جمله «خیرش به خانه‌تان برسد (May it bring blessing to your home)» معامله را از یک خرید سرد به یک پیوند فرهنگی ماندگار تبدیل می‌کند.'
  },
  {
    id: 'cmd_5',
    stage: 'shipping_certificate',
    stageTitleFa: '۵. صدور شناسنامه اصالت فرش، بسته‌بندی و ارسال هوایی بین‌المللی',
    stageTitleEn: '5. Certificate of Authenticity & Door-to-Door International Shipping',
    customerQuestionEn: 'How can we take this large 9-meter carpet on our flight, and do you provide an official certificate of origin?',
    customerQuestionAr: 'كيف يمكننا شحن هذه السجادة الكبيرة (٩ أمتار) إلى بلدنا، وهل ترفقون معها شهادة منشأ وأصالة؟',
    customerMeaningFa: 'چطور می‌توانیم این فرش بزرگ ۹ متری را در پرواز با خودمان ببریم و آیا شناسنامه رسمی اصالت و مبدا می‌دهید؟',
    merchantReplyFa: 'خاطرتان کاملاً جمع باشد! ما شناسنامه رسمی اصالت (شامل محل بافت، رج‌شمار، نوع پشم و ابریشم و قدمت) صادر می‌کنیم؛ فرش را به روش استاندارد تا و وکیوم ضدآب می‌کنیم و یا از طریق کارگو هوایی با بیمه کامل درب منزل شما در کشورتان تحویل می‌دهیم.',
    merchantReplyEn: 'Rest completely assured! We issue an official signed Certificate of Authenticity detailing the city of origin, Raj knot density, natural dyes, and age. We can either fold and vacuum-seal it for checked luggage, or ship it insured via air cargo directly to your doorstep.',
    merchantReplyEnPhonetic: 'wee ish-oo an of-ish-ul ser-tif-i-kut ov aw-then-tis-i-tee and ship in-shoord too yoor dor-step.',
    merchantReplyAr: 'اطمئنوا تماماً! نصدر لكم شهادة أصالة رسمية توضح مدينة النسيج وعدد العقد والأصباغ والقدم، ونقوم بتغليفها حرارياً ضد الماء أو شحنها جوياً مع التأمين الشامل حتى باب منزلكم.',
    merchantReplyArPhonetic: 'Nusdiru lakum shahādat asāla rasmiyya wa nashhanuhā jawwiyyan hattā bāb manzilikum.',
    tradeTipFa: 'بسیاری از توریست‌ها به خاطر ترس از حمل‌ونقل از خرید قالی بزرگ منصرف می‌شوند؛ توضیح دقیق درباره «بسته‌بندی کتابی/وکیوم» یا «ارسال درب منزل (Door-to-door DHL/Air Cargo)» فروش شما را چند برابر می‌کند.'
  }
];

export const CARPET_NEGOTIATION_QUIZZES: CarpetNegotiationQuiz[] = [
  {
    id: 'cnq_1',
    buyerPersona: 'Mr. Arthur Pendelton (London Art Collector 🇬🇧)',
    buyerQuoteEn: 'I am looking for a rug around 4.5 by 6.5 feet that has aged organically over decades, not washed with bleach or acid. What do you call that in the Iranian bazaar and what size should I ask for?',
    buyerQuoteFa: 'من دنبال فرشی در ابعاد حدود ۴.۵ در ۶.۵ فوت هستم که در طول دهه‌ها به صورت طبیعی کهنه شده باشد، نه اینکه با اسید و مواد شیمیایی شسته شده باشد. در بازار ایران به این چه می‌گویید و چه سایزی باید بخواهم؟',
    questionFa: 'به عنوان یک تاجر حرفه‌ای فرش، کدام پاسخ انگلیسی دقیق‌ترین و اصیل‌ترین راهنمایی است؟',
    options: [
      {
        textEn: 'You are looking for a "Dozar" Ghalicheh (approx. 200×135 cm / 4.5×6.7 ft) with "Kohneh Zaati" (authentic naturally aged patina) and pure vegetable dyes!',
        textFa: 'شما به دنبال یک قالیچه «دو ذرع» (۲۰۰×۱۳۵ سانت) با ویژگی «کهنه ذاتی» و رنگ گیاهی هستید!',
        isCorrect: true,
        feedbackFa: 'آفرین! استفاده دقیق از اصطلاح «Dozar» همراه با معادل فوت و توضیح «Kohneh Zaati» اعتماد کامل کلکسیونر انگلیسی را جلب می‌کند.'
      },
      {
        textEn: 'This is a Poshti rug made yesterday with synthetic chemical wash.',
        textFa: 'این یک پشتی است که دیروز با شست‌وشوی شیمیایی ساخته شده است.',
        isCorrect: false,
        feedbackFa: 'پشتی ۶۰×۹۰ سانتی‌متر است و شست‌وشوی شیمیایی دقیقاً نقطه مقابل خواسته مشتری است.'
      },
      {
        textEn: 'We only have 12-meter machine-made plastic rugs.',
        textFa: 'ما فقط فرش ماشینی ۱۲ متری پلاستیکی داریم.',
        isCorrect: false,
        feedbackFa: 'مشتری کلکسیونر به دنبال قالیچه دستباف اصیل است.'
      }
    ]
  },
  {
    id: 'cnq_2',
    buyerPersona: 'Sheikh Tariq Al-Mansoor (Dubai & Riyadh Interior Designer 🇦🇪🇸🇦)',
    buyerQuoteEn: 'We need a pair of smaller rugs around 150×105 cm and a flat-woven tribal piece without pile for our Majlis.',
    buyerQuoteAr: 'نحتاج إلى زوج من السجاد الصغير بمقاس ١٥٠×١٠٥ سم تقريباً، بالإضافة إلى قطعة تراثية منسوجة بدون وبر للمجلس.',
    buyerQuoteFa: 'ما برای مجلس خود به یک جفت قالیچه در ابعاد حدود ۱۵۰×۱۰۵ سانتی‌متر و یک دستبافته سنتی بدون پرز (تخت‌باف) نیاز داریم.',
    questionFa: 'کدام ترکیب اصطلاحات تخصصی برای پاسخ به این مشتری عرب و انگلیسی‌زبان صحیح است؟',
    options: [
      {
        textEn: 'I recommend a matched pair of "Zar-o-Nim" (ذرع ونصف - 150×105 cm) silk-inlaid rugs, paired with a handwoven Qashqai "Kilim" (كليم بدون وبر)!',
        textFa: 'پیشنهاد من یک جفت قالیچه «ذرع و نیم» (۱۵۰×۱۰۵ سانت) به همراه یک «گلیم» دستباف قشقایی (بدون پرز) است!',
        isCorrect: true,
        feedbackFa: 'عالی! «ذرع و نیم» دقیقاً ۱۵۰×۱۰۵ سانتی‌متر است و «گلیم (Kilim / كليم)» دستبافته بدون پرز است.'
      },
      {
        textEn: 'A 12-meter palace carpet with thick pile.',
        textFa: 'یک فرش ۱۲ متری پرزبلند.',
        isCorrect: false,
        feedbackFa: 'ابعاد ۱۵۰×۱۰۵ سانتی‌متر معادل ذرع و نیم است، نه ۱۲ متری.'
      }
    ]
  }
];
