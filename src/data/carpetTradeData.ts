// Specialized Persian Carpet Trade & Bazaar Terminology & Trilingual Offline Sentence Bank (Persian - English - Arabic)
// Dedicated in honored memory of the late Haj Hossein Agha Ali Miri (شادروان حاج حسین آقای علی‌میری)
// Official linguistic & trade companion to the "Farsh Bazaar (فرش بازار)" app by developer Siavash Ali Miri.

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

export interface OfflineCarpetSentence {
  id: string;
  topic: 'welcome' | 'types_kurd' | 'sizes_dimensions' | 'age_kohneh' | 'knots_materials' | 'price_shipping';
  topicLabelFa: string;
  fa: string;
  en: string;
  pronEn: string;
  ar: string;
  pronAr: string;
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
    technicalNoteFa: 'مهم‌ترین اصطلاح بازار فرش کهنه‌فروشی: فرشی که رنگ‌های گیاهی آن در اثر گذر دهه‌ها و پاخور طبیعی پخته و مخملی شده، نه با اسیدشویی یا دکلره شیمیایی (تیغ‌خور و دواشور نشده).',
    merchantPitchEn: 'This piece is 100% "Kohneh Zaati"—its lustrous patina developed naturally over decades of gentle use, never chemically washed.',
    merchantPitchAr: 'هذه القطعة «كهنه ذاتي» ١٠٠٪، فقد اكتسبت لمعانها وهدوء ألوانها طبيعياً عبر العقود بدون أي معالجة كيميائية.'
  },
  {
    id: 'ct_kurd',
    category: 'types',
    categoryLabelFa: 'انواع دستبافته (فرش کُرد)',
    termFa: 'فرش کُرد (قالی کردی: بیجار، سنه سنندج، کلیایی و افشار)',
    fingilish: 'Farsh-e Kord (Kurdish Rug: Bidjar, Senneh, Kolyaei)',
    termEn: 'Kurdish Hand-Knotted Rug — "The Iron Rug of Persia" (Bidjar, Senneh & Kolyaei)',
    pronunciationEn: 'KUR-dish hand-NOT-ed rug — theh EYE-urn rug ov PER-zhuh (bee-JAR & seh-NEH)',
    termAr: 'السجاد الكردي الإيراني الأصيل (بيجار «سجادة الحديد»، سنه سنندج، وكليائي)',
    pronunciationAr: 'As-Sajjād al-Kurdī al-Īrānī (Bījār wa Sanandaj)',
    dimensionsMetric: 'ذرع و نیم، دو ذرع، کناره و قالی بزرگ‌پارچه',
    dimensionsImperial: "All collector sizes (3.5×5 ft, 4.5×6.7 ft & Runners)",
    technicalNoteFa: 'فرش کُرد در بازار جهانی به «فرش آهنین ایران (Iron Rug of Persia)» شهرت دارد؛ به دلیل بافت لول و کوبیده، گره متقارن مستحکم، پشم دست‌ریس کوهستان و طرح‌های اصیل هراتی، ماهی در هم و ترنج کُردی که تا بیش از یک قرن عمر می‌کند.',
    merchantPitchEn: 'This is an authentic Kurdish Persian rug ("Farsh-e Kord" from Bidjar/Senneh), famous worldwide as the "Iron Rug of Persia" for its ultra-dense compacted weave and vibrant mountain wool.',
    merchantPitchAr: 'هذه سجادة كردية إيرانية أصيلة (من بيجار وسنندج)، وتُلقّب عالمياً بـ«سجادة الحديد الفارسية» لمتانتها الفائقة وصوفها الجبلي الطبيعي.'
  },
  {
    id: 'ct_2',
    category: 'sizes',
    categoryLabelFa: 'سایز و قواره (ذرع)',
    termFa: 'قالیچه دو ذرع (دوزرع)',
    fingilish: 'Ghalicheh Do-Zar (Dozar)',
    termEn: 'Dozar Area Rug (Classic 2-Zar Ghalicheh — 4.5 × 6.7 ft)',
    pronunciationEn: 'doh-ZAR air-ee-uh rug (4.5 by 6.7 feet)',
    termAr: 'قاليجه مقاس دوزرع (ذراعان: ٢٠٠ × ١٣٥ سم / ٤.٥ × ٦.٧ قدم)',
    pronunciationAr: 'Qālījah maqās Do-Zar (200 × 135 cm)',
    dimensionsMetric: '200 × 135 cm (تا 210 × 140 cm)',
    dimensionsImperial: "4'5\" × 6'7\" ft (approx. 4.5 × 6.7 feet)",
    technicalNoteFa: 'پرطرفدارترین قواره قالیچه ایرانی در بازار جهانی که خریداران غربی آن را با نام Dozar یا 4.5x6.7 ft می‌شناسند.',
    merchantPitchEn: 'This is a classic Persian "Dozar" area rug, measuring 200 by 135 centimeters, which is about 4.5 by 6.7 feet.',
    merchantPitchAr: 'هذه قاليجه إيرانية بمقاس «دوزرع» الكلاسيكي، وأبعادها ٢٠٠ في ١٣٥ سنتيمتراً (٤.٥ في ٦.٧ قدم).'
  },
  {
    id: 'ct_3',
    category: 'sizes',
    categoryLabelFa: 'سایز و قواره (ذرع)',
    termFa: 'ذرع و نیم / زرع و نیم / زرنیم',
    fingilish: 'Zar-o-Nim (Zarnim)',
    termEn: 'Zar-o-Nim Accent Rug (1.5 Zar — 3.5 × 5.0 ft)',
    pronunciationEn: 'zar-oh-NEEM rug (3.5 by 5 feet)',
    termAr: 'قاليجه مقاس ذرع ونصف / زرنيم (١٥٠ × ١٠٥ سم / ٣.٥ × ٥ قدم)',
    pronunciationAr: 'Maqās Zar wa Nisf / Zarnīm (150 × 105 cm)',
    dimensionsMetric: '150 × 105 cm (تا 160 × 110 cm)',
    dimensionsImperial: "3'5\" × 5'0\" ft (3.5 × 5 feet)",
    technicalNoteFa: 'قالیچه ۱.۵ ذرع (که در بازار به آن ذرع و نیم، زرع و نیم یا زرنیم می‌گویند)، محبوب‌ترین سایز برای کلکسیونرها و مسافران هوایی چون به راحتی در چمدان جا می‌شود.',
    merchantPitchEn: 'This "Zar-o-Nim" (Zarnim) piece measures 150 by 105 cm (3.5 by 5 feet)—ideal as a collector’s focal rug and easy to pack in your luggage.',
    merchantPitchAr: 'هذا المقاس يسمى «ذرع ونصف» (١٥٠×١٠٥ سم أي ٣.٥×٥ قدم)، وهو مثالي للمقتنين وسهل الحمل في حقيبة السفر.'
  },
  {
    id: 'ct_4',
    category: 'sizes',
    categoryLabelFa: 'سایز و قواره (ذرع)',
    termFa: 'ذرع و چارک / زرع چارک',
    fingilish: 'Zar-o-Charak (Zarcharak)',
    termEn: 'Zar-o-Charak Small Collector Rug (1.25 Zar — 2.7 × 4.1 ft)',
    pronunciationEn: 'zar-oh-cha-RAK (2.7 by 4.1 feet)',
    termAr: 'مقاس ذرع وربع / زرع تشارك (١٢٥ × ٨٠ سم / ٢.٧ × ٤.١ قدم)',
    pronunciationAr: 'Maqās Zar wa Rub‘ (125 × 80 cm)',
    dimensionsMetric: '125 × 80 cm',
    dimensionsImperial: "2'7\" × 4'1\" ft (2.7 × 4.1 feet)",
    technicalNoteFa: 'معادل یک ذرع و یک چهارم ذرع (زرع چارک)؛ مناسب ورودی، جلوی میز کار یا قاب کردن به عنوان اثر هنری.',
    merchantPitchEn: 'This size is called "Zar-o-Charak" (125 by 80 cm or 2.7 by 4.1 feet), perfect for entryways, study rooms, or hanging on a wall.',
    merchantPitchAr: 'هذا المقاس يسمى «ذرع وربع» (١٢٥×٨٠ سم أي ٢.٧×٤.١ قدم)، وهو رائع للمداخل أو للتعليق كلوحة فنية.'
  },
  {
    id: 'ct_5',
    category: 'types',
    categoryLabelFa: 'انواع دستبافته',
    termFa: 'قالی، قالیچه و فرش دستباف ایرانی',
    fingilish: 'Ghali, Ghalicheh & Farsh-e Dastbaaf',
    termEn: 'Hand-Knotted Palace Carpet (Ghali) & Fine Area Rug (Ghalicheh)',
    pronunciationEn: 'hand-NOT-ed GHA-lee and gha-lee-CHEH',
    termAr: 'قالي (سجادة كبيرة) وقاليجه (سجادة متوسطة) وفرش إيراني يدوي الصنع',
    pronunciationAr: 'Qālī wa Qālījah Yadawiyyah',
    dimensionsMetric: 'قالی: ۶ متری (200×300)، ۹ متری (250×350)، ۱۲ متری (300×400 cm)',
    dimensionsImperial: "Ghali: 6.7×10 ft (6m), 8.2×11.5 ft (9m), 10×13.1 ft (12m)",
    technicalNoteFa: 'در بازار ایران فرش‌های ۶ متری (سه‌ذرع) و بزرگ‌تر را «قالی» و فرش‌های کوچک‌تر از ۴ متر (مثل دوزرع، زرنیم و زرع چارک) را «قالیچه» می‌نامند.',
    merchantPitchEn: 'In Persian tradition, large room carpets (6m² / 6.7×10 ft and larger) are called "Ghali", while finer smaller rugs like Dozar and Zar-o-Nim are called "Ghalicheh".',
    merchantPitchAr: 'في التراث الإيراني نسمي السجاد الكبير (٦ أو ٩ أو ١٢ متراً) «قالي»، بينما القطع المتوسطة والدقيقة نسميها «قاليجه».'
  },
  {
    id: 'ct_6',
    category: 'types',
    categoryLabelFa: 'انواع دستبافته',
    termFa: 'گلیم و گلیم‌فرش دستباف (سنه، سیرجان و قشقایی)',
    fingilish: 'Gelim (Kilim) & Gelim-Farsh (Soumak)',
    termEn: 'Reversible Flat-Woven Tribal Kilim (Gelim) & Embossed Soumak Weave',
    pronunciationEn: 'flat-WOH-ven kee-LEEM and soo-MAK',
    termAr: 'كليم إيراني منسوج مسطح ذو وجهين (كليم وسوماك)',
    pronunciationAr: 'Kilīm Īrānī Musattah wa Sūmāk',
    dimensionsMetric: '100×150 cm تا 200×300 cm',
    dimensionsImperial: "3.3×5 ft up to 6.7×10 ft",
    technicalNoteFa: 'گلیم دستباف بدون پرز، سبک و دوطرفه است (مخصوصاً گلیم سنه کُردستان، شیرکی‌پیچ سیرجان و قشقایی) و برای دکوراسیون مدرن بسیار پرفروش است.',
    merchantPitchEn: 'This is a handwoven flat-weave Persian "Gelim" (Kilim) made with 100% hand-spun wool and vegetable dyes—lightweight, reversible, and timeless.',
    merchantPitchAr: 'هذا «كليم» إيراني منسوج يدوياً بدون وبر من الصوف الطبيعي والأصباغ النباتية، خفيف الوزن ويمكن استخدامه على الوجهين.'
  },
  {
    id: 'ct_poshti',
    category: 'types',
    categoryLabelFa: 'انواع دستبافته',
    termFa: 'پشتی دستباف سنتی (قالیچه پشتی)',
    fingilish: 'Poshti-ye Dastbaaf',
    termEn: 'Traditional Hand-Knotted Persian Poshti (Accent & Bolster Rug — 2 × 3 ft)',
    pronunciationEn: 'truh-DISH-un-ul posh-TEE rug (2 by 3 feet)',
    termAr: 'بشتي إيراني تقليدي معقود يدوياً (مقاس ٩٠ × ٦٠ سم / ٢ × ٣ قدم)',
    pronunciationAr: 'Pushtī Īrānī Taqlīdī (90 × 60 cm)',
    dimensionsMetric: '90 × 60 cm (تا 100 × 70 cm)',
    dimensionsImperial: "2'0\" × 3'0\" ft (2 × 3 feet)",
    technicalNoteFa: 'پشتی (نیم‌ذرع) هم به عنوان تکیه‌گاه شاه‌نشین سنتی و هم به عنوان قالیچه ورودی، پادری لوکس یا اثر کلکسیونی روی دیوار به توریست‌ها فروخته می‌شود.',
    merchantPitchEn: 'This charming piece is a traditional Persian "Poshti" measuring 90 by 60 cm (2 by 3 feet), ideal as an accent mat, chair throw, or collector wall art.',
    merchantPitchAr: 'هذه القطعة الجميلة تسمى «بشتي» بمقاس ٩٠×٦٠ سم (٢×٣ قدم)، وهي مثالية كسجادة مدخل فاخرة أو لوحة جدارية.'
  },
  {
    id: 'ct_7',
    category: 'types',
    categoryLabelFa: 'انواع دستبافته و ابعاد خاص',
    termFa: 'فرش مربع (چهارگوش) و کناره راهرویی',
    fingilish: 'Farsh-e Morabba & Kenareh',
    termEn: 'Custom Square Carpet (Morabba) & Long Hallway Runner (Kenareh)',
    pronunciationEn: 'skwair kar-pet (mo-rab-BA) and RUN-er (ke-na-REH)',
    termAr: 'سجادة مربعة (مربع) وسجادة ممر طويلة (كناره)',
    pronunciationAr: 'Sajjāda Murabba‘a wa Kinārah',
    dimensionsMetric: 'مربع: 150×150، 200×200، 250×250، 300×300 cm | کناره: عرض 80–120 cm',
    dimensionsImperial: "Square: 5×5 ft, 6.7×6.7 ft, 8.2×8.2 ft, 10×10 ft",
    technicalNoteFa: 'فرش مربع به دلیل نیاز به دار عریض اختصاصی، در بازار کمیاب‌تر و بسیار مورد تقاضای معماران و خریداران خارجی برای زیر میز گرد یا اتاق‌های مربع است.',
    merchantPitchEn: 'Square Persian carpets ("Morabba", such as 6.7×6.7 ft or 10×10 ft) are specially woven on wide custom looms, while "Kenareh" runners fit long hallways.',
    merchantPitchAr: 'السجاد المربع (مثل ٢×٢ أو ٣×٣ متر) يُنسج خصيصاً على أنوال عريضة للغرف المتناظرة، والـ«كناره» مخصصة للممرات الطويلة.'
  },
  {
    id: 'ct_8',
    category: 'condition_age',
    categoryLabelFa: 'قدمت و وضعیت (کهنه، قدیمی و نوبافت)',
    termFa: 'کهنه و قدیمی (عتیقه) در برابر نوبافت (آکبند)',
    fingilish: 'Kohneh va Ghadimi (Antique) vs. Now-baaft (Newly Woven)',
    termEn: 'Antique & Vintage Collector Rugs (Kohneh & Ghadimi) vs. Newly Woven Off-Loom (Now-baft)',
    pronunciationEn: 'an-TEEK and VIN-tij vs noo-lee WOH-ven (now-baft)',
    termAr: 'السجاد القديم والأثري المعتّق (كهنه وقديمي) مقابل الجديد من النول (نوبافت)',
    pronunciationAr: 'Qadīm wa Atharī (Kohneh) muqābil Jadīd (Now-bāft)',
    technicalNoteFa: 'در اصطلاح بازار: «نوبافت» یعنی آکبند و پا نخورده؛ «کهنه و قدیمی» (بین ۳۰ تا ۸۰ سال) دارای ارزش کلکسیونی و رنگ‌پختگی است؛ و بالای ۸۰-۱۰۰ سال «عتیقه (Antique)» محسوب می‌شود.',
    merchantPitchEn: 'We offer both "Now-baft" (brand-new off the loom, never walked on) and rare "Kohneh & Ghadimi" (vintage and antique pieces aged 40 to 90+ years with full authentic pile).',
    merchantPitchAr: 'يتوفر لدينا السجاد «نوبافت» الجديد تماماً من النول، وكذلك القطع «القديمة والأثرية» المعتّقة التي يتراوح عمرها بين ٤٠ و٩٠ عاماً بحالة ممتازة.'
  },
  {
    id: 'ct_9',
    category: 'structure_materials',
    categoryLabelFa: 'بافت، ابریشم و رج‌شمار',
    termFa: 'رج‌شمار (۳۰ تا ۸۰ رج)، چله ابریشم، کرک و رنگ گیاهی',
    fingilish: 'Raj-shomar, Chelleh Abrisham, Kork & Rang-e Giyahi',
    termEn: 'Knot Density (Raj / KPSI), Pure Silk Foundation, Kork Wool & 100% Vegetable Dyes',
    pronunciationEn: 'not DEN-si-tee, pyoor silk fown-DAY-shun, vej-tuh-bul dyez',
    termAr: 'كثافة العقد (الرج)، سدى الحرير الخالص، صوف الكرك، وأصباغ نباتية طبيعية ١٠٠٪',
    pronunciationAr: 'Kathāfat al-‘Uqad (Raj), Sadā al-Harīr, wa Asbāgh Nabātiyyah',
    technicalNoteFa: 'هر «رج» تعداد گره در هر ۷ سانتی‌متر عرض فرش است (مثلاً ۵۰ رج معادل حدود ۳۳۰ گره در اینچ مربع / KPSI و ۶۰ رج معادل حدود ۴۷۵ KPSI).',
    merchantPitchEn: 'This is a 60-Raj masterpiece on a pure silk warp foundation, woven with Kork lambswool and 100% natural vegetable dyes (madder root, walnut husk, and saffron).',
    merchantPitchAr: 'هذه تحفة فنية بكثافة ٦٠ رج على أساس من الحرير الخالص، منسوجة بصوف الكرك وألوان نباتية طبيعية ١٠٠٪ (من الفوة وقشر الجوز والزعفران).'
  },
  {
    id: 'ct_appraisal',
    category: 'structure_materials',
    categoryLabelFa: 'کارشناسی فنی بازار',
    termFa: 'ابرش (دورنگه طبیعی)، گوشت‌دار، تیغ‌خور نشده و سلامت ریشه و شیرازه',
    fingilish: 'Abrash, Goosht-daar, Bedoone Tigh-khor, Shirzeh Saalem',
    termEn: 'Natural Abrash Color Striation, Full Thick Pile, Unshaved & Original Selvedge/Fringes',
    pronunciationEn: 'NACH-ur-ul ah-BRASH, ful pyle, or-IJ-in-ul sel-vij',
    termAr: 'تموّج لوني طبيعي (أبرش)، وبر كامل وسميك، وحواف وشراريب أصلية سليمة',
    pronunciationAr: 'Tamawwuj Lawnī Tabī‘ī (Abrash) wa Wabar Kāmil',
    technicalNoteFa: 'مشتریان حرفه‌ای خارجی عاشق «ابرش طبیعی (Natural Abrash)» در فرش‌های عشایری و کُردی هستند چون اثبات می‌کند پشم‌ها به صورت دست‌ریس و با دیگ‌های رنگرزی سنتی رنگ شده‌اند.',
    merchantPitchEn: 'Notice the subtle "Abrash" color variation—this proves the wool was hand-spun and dyed in small organic batches. It also has full thick pile ("Goosht-dar") and original borders.',
    merchantPitchAr: 'لاحظ التدرج اللوني الطبيعي المسمى «أبرش»، وهو دليل قاطع على الغزل اليدوي والصباغة الطبيعية، كما أن وبر السجادة كامل وحوافها أصلية تماماً.'
  },
  {
    id: 'ct_raj_khaneh_khofteh_la',
    category: 'structure_materials',
    categoryLabelFa: 'واحدهای سنتی تراکم بافت (رج / خانه / خفته / لا)',
    termFa: 'رج (تبریز)، خانه (کاشان و اصفهان)، خفته (خراسان و مشهد) و لا (نائین: ۹ لا، ۶ لا، ۴ لا)',
    fingilish: 'Raj, Khaneh, Khofteh & La (9-La, 6-La, 4-La)',
    termEn: 'Traditional Persian Density Terminology: Raj, Khaneh, Khofteh & La (Ply Count)',
    pronunciationEn: 'RAJ, kha-NEH, khof-TEH, and LAH (ply kownt)',
    termAr: 'مصطلحات كثافة النسيج الإيرانية التقليدية: الرج، الخانه، الخفته، واللا (عدد طيات الخيط)',
    pronunciationAr: 'Mustalahāt al-Kathāfah: Raj, Khāneh, Khofteh, wa Lā',
    technicalNoteFa: 'در ایران هر منطقه واحد سنتی خود را دارد: «رج» در تبریز و تهران (تعداد گره در ۷ سانتی‌متر / یک گره ذرع)، «خانه» در کاشان، اصفهان و کرمان (هر خانه معمولاً ۱۰ گره در مقیاس گره ذرع مقاطعه)، «خفته» در مشهد و خراسان (تعداد گره در واحد گره خراسانی، مثلاً ۳۰ خفته یا ۳۵ خفته) و «لا» در نائین و طبس (تعداد نخ‌های ظریف تابیده در چله: ۹ لا، ۶ لا و ۴ لا؛ هرچه عدد لا کمتر باشد فرش ریزباف‌تر است). بدون فرمول ساختگی، هر واحد در چارچوب سنت همان منطقه سنجیده می‌شود.',
    merchantPitchEn: 'Depending on the regional weaving tradition, Persian weavers describe density using "Raj" (knots per ~7 cm in Tabriz/Qom), "Khaneh" (in Kashan/Isfahan), "Khofteh" (in Mashhad/Khorasan), or "La" warp ply count (such as Nain 9-La, 6-La, or ultra-fine 4-La).',
    merchantPitchAr: 'تختلف تسمية كثافة العقد حسب المدرسة الإيرانية: «الرج» في تبريز وقم، و«الخانه» في كاشان وأصفهان، و«الخفته» في مشهد وخراسان، و«اللا» في نائين (٩ لا، ٦ لا، ٤ لا).'
  },
  {
    id: 'ct_anatomy_warp_weft_knot',
    category: 'structure_materials',
    categoryLabelFa: 'کالبدشناسی بافت (گره، چله/تار، پود، ریشه و شیرازه)',
    termFa: 'گره (متقارن ترکی / نامتقارن فارسی)، چله (تار)، پود (زیر و رو)، ریشه و شیرازه (حاشیه)',
    fingilish: 'Gereh (Knot), Chelleh/Taar (Warp), Pood (Weft), Risheh (Fringe) & Shirzeh/Hashiyeh (Border)',
    termEn: 'Knot (Symmetrical/Asymmetrical), Warp (Chelleh), Weft (Pood), Fringe (Risheh) & Border (Hashiyeh)',
    pronunciationEn: 'NOT, WARP (chel-leh), WEFT (pood), FRINJ (ree-sheh), BOR-der (ha-shee-yeh)',
    termAr: 'العقدة (متماثلة/غير متماثلة)، السدى (جله)، اللحمة (بود)، الشراريب (ريشه)، والحاشية (شيرازه)',
    pronunciationAr: 'Al-‘Uqdah, As-Sadā (Chelleh), Al-Luhmah (Pood), Ash-Sharārīb, wal-Hāshiyah',
    technicalNoteFa: 'اسکلت اصلی فرش دستباف از «چله یا تار» (نخ پنبه، ابریشم یا پشم)، «پود» (پود کلفت زیرین و پود نازک رویی)، «گره» یا پرز (گره ترکی دوگره و گره فارسی تک‌گره)، «ریشه» (امتداد چله در دو سر فرش) و «شیرازه» (کلاف‌پیچی دو طرف عرض فرش) تشکیل می‌شود.',
    merchantPitchEn: 'Every handwoven Persian carpet is built on vertical "Warp" threads (Chelleh), locked horizontally by "Weft" shoots (Pood), with hand-tied "Knots" (Gereh), natural "Fringes" (Risheh), and reinforced "Borders" (Hashiyeh/Shirzeh).',
    merchantPitchAr: 'تتكون السجادة اليدوية من خيوط السدى العمودية (جله)، وخيوط اللحمة الأفقية (بود)، والعُقد اليدوية، والشراريب الطبيعية (ريشه)، والحاشية المتينة.'
  },
  {
    id: 'ct_design_medallion_field_motif',
    category: 'types',
    categoryLabelFa: 'اجزای نقشه و طرح (ترنج، لچک، متن، حاشیه و نقش‌مایه)',
    termFa: 'ترنج (Medallion)، لچک (Corner)، متن/زمینه (Field)، حاشیه (Border) و نقش‌مایه (Motif: شاه‌عباسی، ماهی، هراتی، بته)',
    fingilish: 'Toranj (Medallion), Lachak (Corner), Matn/Zamineh (Field), Hashiyeh (Border) & Naghsh-mayeh (Motif)',
    termEn: 'Central Medallion (Toranj), Corner Spandrels (Lachak), Field (Matn), Border (Hashiyeh) & Classical Motifs',
    pronunciationEn: 'me-DAL-yun (to-ranj), FELD (matn), BOR-der (ha-shee-yeh), moh-TEEF',
    termAr: 'الترنج الأوسط (الميدالية)، الزوايا (لجك)، المتن/الخلفية (زمينه)، الحاشية، والزخارف (شاه عباسي، ماهي، بته)',
    pronunciationAr: 'At-Toranj, Al-Lachak, Al-Matn, Al-Hāshiyah, wal-Zakhārif',
    technicalNoteFa: 'در توصیف ظاهری طرح فرش برای خریدار خارجی، همیشه به جای ادعای قطعی محل بافت از روی عکس، از «شباهت بصری طرح (Style & Pattern Visual Similarity)» استفاده کنید؛ مانند طرح لچک و ترنج کاشان/اصفهان، طرح ماهی در هم، طرح افشان یا طرح هندسی هریس.',
    merchantPitchEn: 'Looking at the design composition: the central "Medallion" (Toranj) floats on the main "Field" (Matn), framed by floral "Motifs" (Shah Abbasi palmettes) and a multi-band "Border" (Hashiyeh).',
    merchantPitchAr: 'بالنظر إلى تكوين التصميم: يتوسط «الترنج» خلفية «المتن»، وتحيط به الزخارف النباتية و«الحاشية» المتعددة الإطارات.'
  },
  {
    id: 'ct_materials_cotton_wool_silk',
    category: 'structure_materials',
    categoryLabelFa: 'الیاف طبیعی (پشم، کرک، ابریشم و نخ پنبه)',
    termFa: 'پشم دست‌ریس (Wool)، کرک (Fine Lambswool)، ابریشم خالص (Silk) و چله نخ پنبه (Cotton Foundation)',
    fingilish: 'Pashm (Wool), Kork (Lambswool), Abrisham (Silk) & Nakh-e Panbeh (Cotton)',
    termEn: 'Hand-Spun Wool (Pashm), Kork Lambswool, Pure Natural Silk (Abrisham) & Cotton Warp (Panbeh)',
    pronunciationEn: 'WOOL (pashm), KORK, SILK (ab-ree-sham), and KOT-un (pan-beh)',
    termAr: 'الصوف الطبيعي (بشم)، صوف الكرك الناعم، الحرير الخالص (أبريشم)، والقطن الطبيعي للسدى (بنبه)',
    pronunciationAr: 'As-Sūf, Sūf al-Kork, Al-Harīr al-Khālis, wal-Qutn',
    technicalNoteFa: 'بخش بزرگی از قالی‌های اصیل و بادوام ایران روی «چله نخ پنبه اعلا (Cotton Warp)» با پرز پشم یا کرک و گل‌ابریشم بافته می‌شوند و قالی‌های بسیار ریزباف روی «چله ابریشم (Silk Warp)» قرار دارند.',
    merchantPitchEn: 'This handwoven carpet combines a strong natural "Cotton" warp foundation (Chelleh Nakh) with a soft "Wool" and "Silk"-highlighted pile for lifelong durability.',
    merchantPitchAr: 'تجمع هذه السجادة اليدوية بين سدى «القطن» المتين ووبر «الصوف» المطعّم بـ«الحرير» الطبيعي لضمان المتانة والجمال مدى الحياة.'
  }
];

// Comprehensive 100% Offline Carpet Trade Sentences for Instant Showroom Conversation (Persian, English, Arabic)
export const OFFLINE_CARPET_TRADE_SENTENCES: OfflineCarpetSentence[] = [
  {
    id: 'ocs_1',
    topic: 'welcome',
    topicLabelFa: '۱. خوش‌آمدگویی و تعارف در حجره',
    fa: 'خوش آمدید! قدم رنجه فرمودید، بفرمایید بنشینید و چای زعفرانی میل کنید تا فرش‌ها را بدون هیچ اجباری برایتان پهن کنم.',
    en: 'Welcome! You honor our showroom. Please have a seat and enjoy fresh saffron tea while we unroll our carpets for you—with zero obligation to buy.',
    pronEn: 'wel-kum! yoo on-er owr show-room. pleez hav ah seet and en-joy saf-ron tee',
    ar: 'أهلاً وسهلاً بكم، شرّفتم معرضنا! تفضّلوا بالجلوس وتناول الشاي بالزعفران بينما نفرش لكم السجاد للمشاهدة بكل راحة وبدون أي التزام بالشراء.',
    pronAr: 'Ahlan wa sahlan bikum! Tafaddalū bil-julūs wa tanāwul ash-shāy bil-za‘farān.'
  },
  {
    id: 'ocs_2',
    topic: 'types_kurd',
    topicLabelFa: '۲. معرفی انواع فرش (قالی، قالیچه، گلیم، پشتی، مربع و فرش کُرد)',
    fa: 'در حجره ما انواع قالی بزرگ، قالیچه، گلیم دستباف، پشتی، فرش مربع و همچنین فرش کُرد اصیل (بیجار و سنه) موجود است.',
    en: 'In our collection we have large room carpets (Ghali), area rugs (Ghalicheh), flat-woven Kilims, traditional Poshti bolsters, custom Square rugs, and authentic Kurdish "Iron Rugs" from Bidjar and Senneh.',
    pronEn: 'in owr kuh-lek-shun wee hav gha-lee, gha-lee-cheh, kee-leem, posh-tee, skwair rugz, and kur-dish eye-urn rugz',
    ar: 'يتوفر في معرضنا السجاد الكبير (قالي)، والقاليجه، والكليم اليدوي، والبشتي التقليدي، والسجاد المربع، بالإضافة إلى السجاد الكردي الأصيل (بيجار وسنندج).',
    pronAr: 'Yatawaffaru fī ma‘ridinā al-Qālī, wal-Qālījah, wal-Kilīm, wal-Pushtī, was-Sajjād al-Kurdī al-Asīl.'
  },
  {
    id: 'ocs_3',
    topic: 'types_kurd',
    topicLabelFa: '۲. معرفی انواع فرش (قالی، قالیچه، گلیم، پشتی، مربع و فرش کُرد)',
    fa: 'این یک «فرش کُرد» اصیل و کهنه است که در جهان به «فرش آهنین ایران» شهرت دارد؛ با پشم کوهستان و گره فوق‌العاده محکم که صد سال عمر می‌کند.',
    en: 'This is a genuine vintage Kurdish rug ("Farsh-e Kord"), world-renowned as the "Iron Rug of Persia"—hand-knotted with highland wool so densely compacted that it lasts for over a century.',
    pronEn: 'this iz ah jen-yoo-in kur-dish rug, nohn az theh eye-urn rug ov per-zhuh',
    ar: 'هذه سجادة كردية إيرانية أصيلة ومعتّقة، تُعرف عالمياً بـ«سجادة الحديد الفارسية» لشدة تماسك عقدها وصوفها الجبلي الذي يدوم لأكثر من مئة عام.',
    pronAr: 'Hādhihi sajjāda Kurdiyyah asīlah tu‘rafu bi-sajjādat al-hadīd al-Fārisiyyah.'
  },
  {
    id: 'ocs_4',
    topic: 'sizes_dimensions',
    topicLabelFa: '۳. اعلام تخصصی ابعاد به انگلیسی و عربی (ذرع، متر و فوت)',
    fa: 'این قالیچه سایز «دو ذرع (دوزرع)» است؛ ابعاد دقیق آن ۲۰۰ در ۱۳۵ سانتی‌متر، معادل ۴.۵ در ۶.۷ فوت (4.5 × 6.7 feet) می‌باشد.',
    en: 'This area rug is the classic Persian "Dozar" size—measuring 200 by 135 centimeters, which equals 4 feet 5 inches by 6 feet 7 inches (4.5 × 6.7 ft).',
    pronEn: 'this iz theh doh-zar syze, 200 bye 135 sen-ti-mee-terz, or 4.5 bye 6.7 feet',
    ar: 'هذه القاليجه بمقاس «دوزرع» الكلاسيكي، وأبعادها الدقيقة ٢٠٠ في ١٣٥ سنتيمتراً، أي ما يعادل ٤.٥ في ٦.٧ قدم.',
    pronAr: 'Hādhihi al-Qālījah bi-maqās Dozar: 200 fī 135 cm (4.5 × 6.7 qadam).'
  },
  {
    id: 'ocs_5',
    topic: 'sizes_dimensions',
    topicLabelFa: '۳. اعلام تخصصی ابعاد به انگلیسی و عربی (ذرع، متر و فوت)',
    fa: 'این سایز را در ایران «ذرع و نیم (زرنیم)» می‌نامیم؛ ابعاد آن ۱۵۰ در ۱۰۵ سانتی‌متر (معادل ۳.۵ در ۵ فوت) است و به راحتی داخل چمدان شما جا می‌شود.',
    en: 'In Iran we call this size "Zar-o-Nim" (Zarnim). It measures 150 by 105 centimeters (3.5 by 5 feet) and folds compactly right inside your suitcase.',
    pronEn: 'wee kawl this zar-oh-neem, 150 bye 105 cm (3.5 bye 5 feet), ee-zee too pak in yor soot-kays',
    ar: 'نسمي هذا المقاس في إيران «ذرع ونصف (زرنيم)»، وأبعاده ١٥٠ في ١٠٥ سنتيمتر (٣.٥ في ٥ قدم)، ويمكن طيّه بسهولة داخل حقيبة السفر.',
    pronAr: 'Nusammī hādhal-maqās Zar wa Nisf (150 × 105 cm), wa yudha‘u bi-suhūlah fī haqībat as-safar.'
  },
  {
    id: 'ocs_6',
    topic: 'sizes_dimensions',
    topicLabelFa: '۳. اعلام تخصصی ابعاد به انگلیسی و عربی (ذرع، متر و فوت)',
    fa: 'این قالیچه کوچک‌تر سایز «ذرع و چارک (زرع چارک)» با ابعاد ۱۲۵ در ۸۰ سانتی‌متر (۲.۷ در ۴.۱ فوت) و آن یکی «پشتی» سایز ۹۰ در ۶۰ سانتی‌متر (۲ در ۳ فوت) است.',
    en: 'This smaller rug is a "Zar-o-Charak" measuring 125 by 80 cm (2.7 by 4.1 feet), and the smaller accent piece is a "Poshti" measuring 90 by 60 cm (2 by 3 feet).',
    pronEn: 'zar-oh-cha-rak iz 2.7 bye 4.1 feet, and posh-tee iz 2 bye 3 feet',
    ar: 'هذه القطعة بمقاس «ذرع وربع» وأبعادها ١٢٥×٨٠ سم (٢.٧×٤.١ قدم)، والقطعة الأصغر هي «بشتي» بمقاس ٩٠×٦٠ سم (٢×٣ قدم).',
    pronAr: 'Hādhihi Zar wa Rub‘ (125×80 cm), wal-asghar hiya Pushtī (90×60 cm).'
  },
  {
    id: 'ocs_7',
    topic: 'sizes_dimensions',
    topicLabelFa: '۳. اعلام تخصصی ابعاد به انگلیسی و عربی (ذرع، متر و فوت)',
    fa: 'این یک «فرش مربع» کمیاب سایز ۲۰۰ در ۲۰۰ سانتی‌متر (۶.۷ در ۶.۷ فوت) است، و قالی‌های بزرگ ما ۶ متری (6.7×10 ft)، ۹ متری (8.2×11.5 ft) و ۱۲ متری (10×13.1 ft) هستند.',
    en: 'This is a rare Square carpet ("Morabba") measuring 200 by 200 cm (6.7 by 6.7 feet). Our large room carpets are 6-meter (6.7×10 ft), 9-meter (8.2×11.5 ft), and 12-meter (10×13.1 ft).',
    pronEn: 'this iz ah skwair kar-pet (6.7 bye 6.7 feet), and wee hav 6, 9, and 12 mee-ter gha-leez',
    ar: 'هذه سجادة مربعة نادرة بمقاس ٢٠٠×٢٠٠ سم (٦.٧×٦.٧ قدم)، ولدينا أيضاً قالي كبير بمقاسات ٦ أمتار (٢×٣ م) و٩ أمتار (٢.٥×٣.٥ م) و١٢ متراً (٣×٤ م).',
    pronAr: 'Hādhihi sajjāda murabba‘a nādirah (200×200 cm), wa ladaynā Qālī 6 wa 9 wa 12 mitran.'
  },
  {
    id: 'ocs_8',
    topic: 'age_kohneh',
    topicLabelFa: '۴. توضیح تخصصی کهنه ذاتی، کهنه قدیمی و نوبافت',
    fa: 'این فرش صد در صد «کهنه ذاتی» است؛ یعنی رنگ‌های گیاهی آن در طول ۵۰ سال به صورت طبیعی پخته و مخملی شده و هیچ‌گونه شست‌وشوی شیمیایی یا اسیدی ندارد.',
    en: 'This carpet is 100% "Kohneh Zaati" (authentic naturally aged patina). Its vegetable dyes mellowed organically over 50 years with zero acid or chemical washing.',
    pronEn: 'this kar-pet iz 100 per-sent koh-neh zaa-tee — nach-ur-uh-lee aydjd with zee-roh kem-i-kul wash-ing',
    ar: 'هذه السجادة «كهنه ذاتي» ١٠٠٪، أي أن ألوانها النباتية تعتّقت طبيعياً عبر خمسين عاماً ولم تتعرض لأي غسيل كيميائي أو حمضي.',
    pronAr: 'Hādhihi as-sajjāda Kohneh Zātī 100%, mu‘attaqa tabī‘iyyan bidūn aiyy ghasīl kīmiyā’ī.'
  },
  {
    id: 'ocs_9',
    topic: 'age_kohneh',
    topicLabelFa: '۴. توضیح تخصصی کهنه ذاتی، کهنه قدیمی و نوبافت',
    fa: 'به ریشه گره‌ها در پشت فرش نگاه کنید: فرش «کهنه و قدیمی» اصیل، پرز گوشت‌دار دارد، اما فرش «نوبافت» تازه از دار قالی پایین آمده و آکبند است.',
    en: 'Look at the base of the knots on the back: this genuine "Kohneh & Ghadimi" (vintage/antique) piece still has a full healthy pile, whereas that "Now-baft" piece is brand-new off the loom.',
    pronEn: 'look at theh bak ov theh nots: this koh-neh pees haz ful pyle, and that now-baft iz brand noo',
    ar: 'انظر إلى جذور العقد خلف السجادة: هذه القطعة «القديمة والأصيلة» تحتفظ بوبرها الكامل، بينما تلك القطعة «نوبافت» جديدة تماماً من النول.',
    pronAr: 'Unzur ilā khalf as-sajjāda: hādhihi al-qit‘a al-qadīmah wabaruhā kāmil, wa tilka Now-bāft jadīdah.'
  },
  {
    id: 'ocs_10',
    topic: 'knots_materials',
    topicLabelFa: '۵. توضیح چله ابریشم، پشم کرک، رجشمار و رنگ گیاهی',
    fa: 'چله و گل‌های این فرش ابریشم خالص است، پشم آن کرک دست‌ریس است و با روناس، پوست گردو، نیل و زعفران به صورت ۱۰۰٪ گیاهی رنگرزی شده است.',
    en: 'The warp foundation and highlights are 100% pure natural silk, the pile is hand-spun Kork lambswool, and the dyes are 100% organic—extracted from madder root, walnut husk, indigo, and saffron.',
    pronEn: 'pyoor silk fown-day-shun, hand-spun kork wool, and 100 per-sent vej-tuh-bul dyez',
    ar: 'سدى هذه السجادة ونقوشها البارزة من الحرير الطبيعي الخالص ١٠٠٪، والوبر من صوف الكرك المغزول يدوياً، والأصباغ نباتية خالصة من الفوة وقشر الجوز والنيلي والزعفران.',
    pronAr: 'Sadā as-sajjāda min al-harīr al-khālis, wal-wabar sūf al-kork, wal-asbāgh nabātiyyah 100%.'
  },
  {
    id: 'ocs_11',
    topic: 'price_shipping',
    topicLabelFa: '۶. مذاکره قیمت، تخفیف، شناسنامه اصالت و ارسال هوایی',
    fa: 'قابل شما را ندارد! به احترام حضور شما، بهترین قیمت کلکسیونی را با تخفیف ویژه حساب می‌کنم و شناسنامه رسمی اصالت و بسته‌بندی چمدانی تقدیمتان می‌کنم.',
    en: 'It is unworthy of your honor ("Ghabel nadareh")! Out of respect for your visit, I will give you our best collector’s price with an official Certificate of Authenticity and compact luggage wrapping.',
    pronEn: 'eye wil giv yoo owr best kuh-lek-terz prys with ah ser-tif-i-kut ov aw-then-tis-i-tee',
    ar: 'إنها مقدّمة لكم ولا تغلى عليكم! تكريماً لزيارتكم سأحسب لكم أفضل سعر خاص للمقتنين مع شهادة أصالة رسمية وتغليف مدمج مناسب لحقيبة الطائرة.',
    pronAr: 'Innahā muqaddamah lakum! Sa-ahsubu lakum afdal si‘r ma‘a shahādat asālah wa taghlīf lil-tā’irah.'
  },
  {
    id: 'ocs_12',
    topic: 'price_shipping',
    topicLabelFa: '۶. مذاکره قیمت، تخفیف، شناسنامه اصالت و ارسال هوایی',
    fa: 'ما فرش‌های بزرگ را از طریق کارگو هوایی بین‌المللی (DHL / Aramex) با بیمه کامل ظرف ۵ تا ۷ روز کاری مستقیماً درب منزل شما در کشورتان تحویل می‌دهیم.',
    en: 'For larger carpets, we provide fully insured door-to-door international air cargo shipping (via DHL or Aramex) delivered directly to your home address within 5 to 7 business days.',
    pronEn: 'wee pro-vyde ful-ee in-shoord dor-too-dor in-ter-nash-un-ul air ship-ing in 5 too 7 dayz',
    ar: 'بالنسبة للسجاد الكبير، نوفر شحناً جوياً دولياً مؤمّناً بالكامل (عبر DHL أو أرامكس) يصل مباشرة إلى باب منزلكم خلال ٥ إلى ٧ أيام عمل.',
    pronAr: 'Nuwaffiru shahnan jawwiyan mu’ammanan bil-kāmil ilā bāb manzilikum khilāl 5 ilā 7 ayyām.'
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
    stageTitleFa: '۲. توضیح تخصصی «کهنه ذاتی»، «کهنه قدیمی» و سایز «دو ذرع / ذرع و نیم (زرنیم)»',
    stageTitleEn: 'Stage 2: Explaining Kohneh Zaati & Traditional Zar Sizes',
    customerQuestionEn: 'This rug has such a soft, antique glow! Is it chemically washed, and what is its exact size in feet?',
    customerQuestionAr: 'هذه السجادة لها بريق هادئ وعتيق جداً! هل هي مغسولة كيميائياً وما هو مقاسها الدقيق؟',
    customerMeaningFa: 'این قالیچه درخشش عتیقه و ملایمی دارد! آیا شست‌وشوی شیمیایی شده و سایز دقیقش به فوت چیست؟',
    merchantReplyFa: 'این قالیچه سایز «دو ذرع» (۲۰۰ در ۱۳۵ سانتی‌متر معادل ۴.۵ در ۶.۷ فوت) و صد در صد «کهنه ذاتی» است؛ یعنی درخشش و پختگی رنگ‌های گیاهی آن حاصل دهه‌ها گذر طبیعی زمان است، نه اسیدشویی شیمیایی.',
    merchantReplyEn: 'This is a classic "Dozar" Ghalicheh measuring 200 by 135 cm (4.5 by 6.7 feet). Its sheen is 100% "Kohneh Zaati"—naturally aged over decades with pure vegetable dyes, never chemically treated.',
    merchantReplyEnPhonetic: 'this iz ah doh-ZAR rug (4.5 bye 6.7 feet). it iz 100% koh-neh zaa-tee, nach-ur-uh-lee aydjd',
    merchantReplyAr: 'هذه قاليجه بمقاس «دوزرع» (٢٠٠×١٣٥ سم / ٤.٥×٦.٧ قدم). وبريقها «كهنه ذاتي» أصيل ١٠٠٪، أي معتّقة طبيعياً عبر السنين بأصباغ نباتية خالصة بدون أي مواد كيميائية.',
    merchantReplyArPhonetic: 'Hādhihi Qālījah Dozar (200×135 cm), wa hiya Kohneh Zātī mu‘attaqa tabī‘iyyan.',
    tradeTipFa: 'وقتی به مشتری خارجی تفاوت «کهنه ذاتی (Naturally Aged Patina)» و «کهنه‌شویی شیمیایی (Chemical Wash)» را پشت فرش نشان می‌دهید، ارزش فرش در نگاه او چند برابر می‌شود.'
  },
  {
    id: 'cmd_kurd',
    stageTitleFa: '۳. معرفی تخصصی «فرش کُرد (بیجار و سنه)»، «گلیم»، «پشتی» و «فرش مربع»',
    stageTitleEn: 'Stage 3: Presenting Kurdish "Iron Rugs", Kilims, Poshti & Square Carpets',
    customerQuestionEn: 'We also want a very durable tribal rug or a flat-woven Kilim. What makes Kurdish Persian rugs so famous?',
    customerQuestionAr: 'نبحث أيضاً عن سجادة عشائرية شديدة التحمل أو كليم يدوي. لماذا يشتهر السجاد الكردي الإيراني بهذا القدر؟',
    customerMeaningFa: 'ما یک فرش عشایری بسیار بادوام یا یک گلیم دستباف هم می‌خواهیم. چرا فرش کُرد ایرانی این‌قدر مشهور است؟',
    merchantReplyFa: 'این «فرش کُرد» اصیل (بافت بیجار و سنه) در جهان به «فرش آهنین ایران» معروف است چون گره‌های آن با شانه آهنی کوبیده شده و بیش از صد سال عمر می‌کند. در کنار آن هم گلیم دوطرفه، پشتی (۲ در ۳ فوت) و فرش مربع داریم.',
    merchantReplyEn: 'This authentic Kurdish rug ("Farsh-e Kord" from Bidjar and Senneh) is known worldwide as the "Iron Rug of Persia" because its wet-compacted knots last over a century. Beside it we also have reversible Senneh Kilims, 2×3 ft Poshtis, and rare Square rugs.',
    merchantReplyEnPhonetic: 'this kur-dish rug iz nohn az theh eye-urn rug ov per-zhuh, las-ting oh-ver ah sen-chuh-ree',
    merchantReplyAr: 'هذه السجادة الكردية الأصيلة (من بيجار وسنندج) تُلقب عالمياً بـ«سجادة الحديد الفارسية» لأن عقدها المضغوطة تدوم لأكثر من مئة عام، وبجانبها كليم سنندج ذو الوجهين والبشتي والسجاد المربع.',
    merchantReplyArPhonetic: 'Hādhihi as-sajjāda al-Kurdiyyah tu‘rafu bi-sajjādat al-hadīd al-Fārisiyyah.',
    tradeTipFa: 'خریداران اروپایی و عرب وقتی عبارت «Iron Rug of Persia (فرش آهنین ایران)» را درباره فرش کُرد بیجار و سنه می‌شنوند و استحکام پشت فرش را لمس می‌کنند، به شدت مجذوب خرید آن می‌شوند.'
  },
  {
    id: 'cmd_3',
    stageTitleFa: '۴. مذاکره قیمت، شناسنامه اصالت و ارسال هوایی (کارگو)',
    stageTitleEn: 'Stage 4: Pricing, Certificate of Authenticity & Worldwide Shipping',
    customerQuestionEn: 'We love this Zar-o-Nim silk foundation rug! What is your best price, and how can we take it home?',
    customerQuestionAr: 'لقد أعجبتنا هذه القطعة (ذرع ونصف) ذات الأساس الحريري! ما هو السعر النهائي وكيف يمكن شحنها؟',
    customerMeaningFa: 'ما عاشق این قالیچه ذرع و نیم (زرنیم) چله ابریشم شدیم! بهترین قیمت شما چقدر است و چطور آن را ببریم؟',
    merchantReplyFa: 'قابل شما را ندارد! به رسم یادگاری و برکت حجره، تخفیف ویژه پای معامله تقدیمتان می‌کنم، همراه با شناسنامه رسمی اصالت و بسته‌بندی چمدانی یا ارسال هوایی بیمه‌شده درب منزل شما.',
    merchantReplyEn: 'It is unworthy of your honor ("Ghabel nadareh")! I will offer you our best collector’s discount, complete with a signed Certificate of Authenticity and either compact luggage wrapping or insured DHL door-to-door shipping.',
    merchantReplyEnPhonetic: 'eye wil of-er owr best kuh-LEK-terz dis-kownt with ah ser-TIF-i-kut ov aw-then-TIS-i-tee',
    merchantReplyAr: 'إنها مقدّمة لكم ولا تغلى عليكم! سأمنحكم خصماً خاصاً للمقتنين مع شهادة أصالة رسمية، وتغليف مدمج للطائرة أو شحن جوي مؤمّن حتى باب منزلكم.',
    merchantReplyArPhonetic: 'Sa-amnahukum khasman khāssan ma‘a shahādat asālah wa shahn jawwī mu’amman.',
    tradeTipFa: 'همیشه به توریست اطمینان دهید که فرش ذرع و نیم (زرنیم) یا دو ذرع را می‌توانید به اندازه یک کیف دستی کوچک «وکیوم چمدانی» کنید یا با کارگو بفرستید.'
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
