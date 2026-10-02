import React, { useState } from 'react';
import {
  Volume2,
  Share2,
  Copy,
  Check,
  BookOpen,
  Globe,
  ArrowRightLeft,
  Landmark,
  Award,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound, speakPersian, speakEnglish, speakRussian } from '../utils/audio';
import { LatinCyrillicBlackboardStudio } from './LatinCyrillicBlackboardStudio';

interface TajikCyrillicHubProps {
  onEarnLingous: (amount: number) => void;
}

// ============================================================================
// VERBATIM FOUNDER'S GOLDEN HERITAGE TRIBUTE TO TAJIKISTAN, UZBEKISTAN,
// GEORGIA (ქართული) & AFGHAN BROTHERS AND SISTERS
// ============================================================================
export const FOUNDER_TRIBUTE_FA =
  '«به نام پیوند جاودان هم‌ریشگان؛ آریا قوم باستانی ماست و ما حتی پیش از نام‌های امروزین، همگی آریایی بودیم؛ از تمدن کهن ایلام و پارس و ایران تا کُرد و لُر و تاجیک و بلوچ و آذری و گیلک و مازنی و خراسان و افغانستان و ازبکستان و گرجستان و هندوستان، همگی فرزندان یک جهان و شاخه‌های یک درخت کهن و هم‌ریشه‌ایم. در روزگار درخشان سامانیان نیز سمرقند و بخارا و دوشنبه مهد این تمدن بزرگ بودند و مردم شریف و باصفای تاجیکستان همواره همچون ایران قدیم، شیرین و اصیل سخن گفته‌اند. زبان شیرین فارسی، زبان یک تمدن عظیم، زبان تاریخ و فرهنگ و ریشهٔ مشترک و حلقهٔ وصل همهٔ ماست. همهٔ هم‌وطنان نازنینم در ایران و همهٔ هم‌ریشگان عزیزم در سراسر جهان برای من یکسان و عزیزترینند. از صمیم قلب دوستتان دارم و خرسندم که می‌توانم خدمتی در جهت فرهنگ، همبستگی و آموزش رایگان فارسی و انگلیسی به همهٔ شما عزیزان انجام دهم. به امید دیدار شما در تهران، سمرقند، بخارا، دوشنبه، تفلیس، هرات، بلخ و کابل در کنار مجسمه سیاوش و اسماعیل سامانی!»';

export const FOUNDER_TRIBUTE_TG =
  '«Ба номи пайванди ҷовидони ҳамрешагон! Ориё қавми бостонии мост ва мо ҳамагӣ аз як решаи куҳани Ориёӣ ҳастем — аз тамаддуни Элому Порс ва Эрон то Курду Лур, Тоҷику Балуч, Афғонистону Ӯзбекистон, Гурҷистон ва Ҳиндустон, ҳамагӣ фарзандони як ҷаҳон ва шохаҳои як дарахти бузургем. Дар рӯзгори дурахшони Сомониён низ Самарқанду Бухоро ва Душанбе гаҳвораи ин тамаддуни бузург буданд ва мардуми шарифу босафои Тоҷикистон ҳамвора ширину асил сухан гуфтаанд. Забони ширини Форсӣ (Тоҷикӣ / Дарӣ) — забони тамаддуни азим, забони таъриху фарҳанг ва ҳалқаи васли ҳамаи мост! Ҳамаи ҳамватанони азизам дар Эрон ва ҳамаи ҳамрешагонам дар саросари ҷаҳон барои ман яксон ва азизтаринанд. Аз самими қалб дӯстатон дорам ва ба умеди дидори шумо дар Теҳрон, Самарқанд, Бухоро, Душанбе, Тифлис, Ҳирот, Балх ва Кобул дар канори муҷассамаи Сиёвуш ва Исмоили Сомонӣ!»';

export const FOUNDER_TRIBUTE_KA =
  '«გულითადი სალამი და უდიდესი პატივისცემა საქართველოს ძვირფას, კეთილშობილ და დიდებულ ხალხს! ჩვენ საუკუნოვანი მეგობრობა, სიყვარული და კულტურული ძმობა გვაკავშირებს. მიყვარხართ ჩემო ძვირფასებო, თბილისში შეხვედრის იმედით!»';

export const FOUNDER_TRIBUTE_UZ =
  '«Aziz va sharif Oʻzbekiston, Samarqand, Buxoro va Toshkent ahliga qalbim toʻridan eng qaynoq salom va mehrimni yoʻllayman! Bizning tariximiz, madaniyatimiz va ildizimiz birdir. Sizlarni chin dildan yaxshi koʻraman va Samarqand hamda Buxoroda diydor koʻrishishga umid qilaman!»';

export const FOUNDER_TRIBUTE_EN =
  '"In honor of our eternal shared roots: Arya is our ancient ancestral heritage—long before modern borders, from ancient Elam and Pars and Iran to Kurd, Lur, Tajik, Baluch, Afghan, Uzbek, Georgian, and Indian peoples, we have all been branches of one ancient tree and children of one world. During the golden Samanid era, Samarkand, Bukhara, and Dushanbe shone as cradles of this grand civilization. Sweet Persian is the language of a magnificent civilization—the living bridge of our shared history, culture, and roots. All my beloved compatriots across Iran and all our kindred nations worldwide are equally dear to my heart. I love you all deeply and am honored to offer free Persian and English education in service of our unity. Hoping to meet you in Tehran, Samarkand, Bukhara, Dushanbe, Tbilisi, Herat, Balkh, and Kabul beside the monuments of Siavash and Ismail Somoni!"';

// ============================================================================
// 4-ROW SIMULTANEOUS CYRILLIC & NATIVE LESSONS
// (1. Persian Script | 2. Tajik/Cyrillic Phonetics | 3. Russian Meaning | 4. English + Uzbek + Georgian)
// ============================================================================
interface FourRowCyrillicLesson {
  id: string;
  badge: string;
  row1PersianFa: string;
  row2TajikCyrillic: string;
  row3RussianMeaning: string;
  row4EnglishMeaning: string;
  uzbekMeaning: string;
  georgianMeaning: string;
  culturalNoteTg: string;
}

const FOUR_ROW_CYRILLIC_LESSONS: FourRowCyrillicLesson[] = [
  {
    id: 'fr_1',
    badge: '🏛️ ۱. خوش‌آمدگویی در شهر توانا (Шаҳри Тавоно • Город Тавоно)',
    row1PersianFa: 'سلام دوست من، به شهر توانا خوش آمدید! حال شما چطور است؟',
    row2TajikCyrillic: 'Салом дӯсти ман, ба Шаҳри Тавоно хуш омадед! Ҳоли шумо чӣ тавр (четор) аст?',
    row3RussianMeaning: 'Привет, мой друг, добро пожаловать в Город Тавоно! Как ваши дела?',
    row4EnglishMeaning: 'Hello my friend, welcome to Tavana City! How are you doing?',
    uzbekMeaning: 'Salom doʻstim, Tavana shahriga xush kelibsiz! Ahvolingiz qanday?',
    georgianMeaning: 'გამარჯობა ჩემო მეგობარო, კეთილი იყოს თქვენი მობრძანება ქალაქ თავანაში!',
    culturalNoteTg:
      'Дар гуфтугӯи рӯзмарраи Теҳронӣ: «Салом дӯсти ман, ба Шаҳри Тавоно хуш омадӣ! Ҳолат четоре?»'
  },
  {
    id: 'fr_2',
    badge: '🛍️ ۲. تجارت، خرید و بازار (Тиҷорат ва Бозор • Торговля и Бизнес)',
    row1PersianFa: 'سلام دوست من، قیمت این کالا چند است؟ ما آماده همکاری تجاری مستقیم هستیم.',
    row2TajikCyrillic: 'Салом дӯсти ман, қимати ин коло чанд аст? Мо омодаи ҳамкории тиҷоратии мустақим ҳастем.',
    row3RussianMeaning: 'Привет, мой друг, сколько стоит этот товар? Мы готовы к прямому торговому сотрудничеству.',
    row4EnglishMeaning: 'Hello my friend, how much does this item cost? We are ready for direct business cooperation.',
    uzbekMeaning: 'Salom doʻstim, bu mahsulotning narxi qancha? Biz toʻgʻridan-toʻgʻri savdo hamkorligiga tayyormiz.',
    georgianMeaning: 'გამარჯობა მეგობარო, რა ღირს ეს საქონელი? ჩვენ მზად ვართ პირდაპირი სავაჭრო თანამშრომლობისთვის.',
    culturalNoteTg:
      'Вожаи «Коло» (کالا) дар форсии Эрон ба маънои «Мол / Маҳсулот» (Товар) ва «Қимат» ба маънои «Нарх» (Цена) аст.'
  },
  {
    id: 'fr_3',
    badge: '👑 ۳. پیوند سامانیان، سمرقند، بخارا، دوشنبه، تفلیس و کابل',
    row1PersianFa: 'پایتخت سامانیان در سمرقند و بخارا بود و ما در دوشنبه، تفلیس، هرات، بلخ و تهران یک خانواده هستیم.',
    row2TajikCyrillic: 'Пойтахти Сомониён дар Самарқанду Бухоро буд ва мо дар Душанбе, Тифлис, Ҳирот, Балх ва Теҳрон як хонавода ҳастем.',
    row3RussianMeaning: 'Столица Саманидов находилась в Самарканде и Бухаре, и мы в Душанбе, Тбилиси, Герате, Балхе и Тегеране — одна семья.',
    row4EnglishMeaning: 'The Samanid capital was in Samarkand and Bukhara, and in Dushanbe, Tbilisi, Herat, Balkh, and Tehran we are one family.',
    uzbekMeaning: 'Somoniylar poytaxti Samarqand va Buxoroda edi va biz Dushanbe, Tbilisi, Hirot, Balx hamda Tehronda bitta oilamiz.',
    georgianMeaning: 'სამანიდების დედაქალაქი სამარყანდსა და ბუხარაში იყო, და ჩვენ დუშანბეში, თბილისში, ჰერათსა და თეირანში ერთი ოჯახი ვართ.',
    culturalNoteTg:
      'Мероси Исмоили Сомонӣ ва Сиёвуш пайванди абадии миллатҳои мо дар Осиёи Марказӣ, Қафқоз ва Эрон аст.'
  },
  {
    id: 'fr_4',
    badge: '🍵 ۴. مهمان‌نوازی، مهر و احترام (Меҳмоннавозӣ • Гостеприимство)',
    row1PersianFa: 'قدم شما روی چشم! دست شما درد نکند، خیلی خوش آمدید عزیزان من.',
    row2TajikCyrillic: 'Қадами шумо рӯйи чашм! Дасти шумо дард накунад (Раҳмати калон), хеле хуш омадед азизони ман.',
    row3RussianMeaning: 'Добро пожаловать от всего сердца! Большое вам спасибо, мы очень рады вам, дорогие мои.',
    row4EnglishMeaning: 'You are most welcome (your steps upon our eyes)! Thank you so much, welcome my dear ones.',
    uzbekMeaning: 'Qadamingizga hasanot! Qoʻlingiz dard koʻrmasin (Katta rahmat), xush kelibsiz azizlarim.',
    georgianMeaning: 'კეთილი იყოს თქვენი ფეხი! დიდი მადლობა, გულითადად გიმასპინძლებთ ჩემო ძვირფასებო.',
    culturalNoteTg:
      'Ибораи «Дасти шумо дард накунад» дар Эрон ва «Qoʻlingiz dard koʻrmasin» дар Ӯзбекистон ва «Раҳмати калон» дар Тоҷикистон як решаи меҳрубонӣ доранд.'
  },
  {
    id: 'fr_5',
    badge: '✈️ ۵. سفر، فرودگاه و هتل (Сафар ва Меҳмонхона • Путешествие и Отель)',
    row1PersianFa: 'من برای دیدار دوستان و شرکت در همایش فرهنگی به سمرقند، دوشنبه و تفلیس سفر می‌کنم.',
    row2TajikCyrillic: 'Ман барои дидори дӯстон ва ширкат дар ҳамоиши фарҳангӣ ба Самарқанд, Душанбе ва Тифлис сафар мекунам.',
    row3RussianMeaning: 'Я еду в Самарканд, Душанбе и Тбилиси, чтобы встретиться с друзьями и принять участие в культурном форуме.',
    row4EnglishMeaning: 'I am traveling to Samarkand, Dushanbe, and Tbilisi to meet friends and attend a cultural conference.',
    uzbekMeaning: 'Men doʻstlarimni koʻrish va madaniy anjumanda qatnashish uchun Samarqand, Dushanbe va Tbilisiga sayohat qilyapman.',
    georgianMeaning: 'მე ვმოგზაურობ სამარყანდში, დუშანბესა და თბილისში მეგობრების სანახავად და კულტურულ ფორუმზე დასასწრებად.',
    culturalNoteTg:
      'Бо ин ҷумлаҳо ҳар як тоҷик, ӯзбек, гурҷӣ ва русзабон метавонад дар сафар ба Эрон ва ҷаҳон бароҳат суҳбат кунад.'
  }
];

// ============================================================================
// ENGLISH FOR TAJIKS, UZBEKS & RUSSIAN SPEAKERS (`АНГЛИСӢ БАРОИ ТОҶИКОН ВА ӮЗБЕКОН`)
// ============================================================================
const ENGLISH_VIA_CYRILLIC_LESSONS = [
  {
    id: 'ec_1',
    badge: '🌱 A1-A2 • Муошират ва Кор (مکالمه و معرفی شغلی)',
    en: 'Hello! I am glad to meet you. I am learning English and Persian in Tavana City completely for free.',
    cyrillicPron: 'Ҳеллоу! Ай эм глэд ту мит ю. Ай эм лёрнинг Инглиш энд Пёржан ин Тавоно Сити комплитли фор фри.',
    tajikMeaning: 'Салом! Аз дидори шумо шодам. Ман дар Шаҳри Тавоно забони англисӣ ва форсиро комилан ройгон меомӯзам.',
    russianMeaning: 'Здравствуйте! Рад встрече. Я совершенно бесплатно изучаю английский и персидский языки в Городе Тавоно.',
    uzbekMeaning: 'Salom! Sizni koʻrganimdan xursandman. Men Tavana shahrida ingliz va fors tillarini mutlaqo bepul oʻrganyapman.'
  },
  {
    id: 'ec_2',
    badge: '💼 B1-B2 • Тиҷорат ва Музокираи Маош (تجارت و حقوق دلاری)',
    en: 'We would like to sign an international partnership contract and expand our business across Central Asia, Europe, and America.',
    cyrillicPron: 'Ви вуд лайк ту сайн эн интернэшнал партнёршип контрэкт энд экспэнд аур бизнес экрос Сентрал Эйжа, Юроп энд Америка.',
    tajikMeaning: 'Мо мехоҳем шартномаи ҳамкории байналмилалӣ имзо кунем ва тиҷорати худро дар Осиёи Марказӣ, Аврупо ва Амрико густариш диҳем.',
    russianMeaning: 'Мы хотели бы подписать договор о международном партнерстве и расширить наш бизнес в Центральной Азии, Европе и Америке.',
    uzbekMeaning: 'Biz xalqaro hamkorlik shartnomasini imzolashni va Markaziy Osiyo, Yevropa hamda Amerikada biznesimizni kengaytirishni xohlaymiz.'
  },
  {
    id: 'ec_3',
    badge: '💳 C1 • Бонкдорӣ ва Кредит 850 (بانکداری و کردیت اسکور غرب)',
    en: 'By maintaining a credit utilization ratio below 3 percent, I increased my credit score to 820 and qualified for the lowest mortgage rate.',
    cyrillicPron: 'Бай мейнтейнинг э кредит ютилизейшн рейшио билоу сри пёрсент, Ай инкрисд май кредит скор ту 820.',
    tajikMeaning: 'Бо нигоҳ доштани истифодаи кредит зери 3 дарсад, ман имтиёзи кредитии худро ба 820 расондам ва وام مسکن کم‌بهره گرفتم.',
    russianMeaning: 'Поддерживая использование кредита ниже 3%, я повысил свой кредитный рейтинг до 820 и получил минимальную ставку по ипотеке.',
    uzbekMeaning: 'Kreditdan foydalanish darajasini 3 foizdan past saqlab, men kredit reytingimni 820 ga koʻtardim.'
  },
  {
    id: 'ec_4',
    badge: '🛂 B2-C1 • Сафорат, Виза ва Фурудгоҳ (مصاحبه سفارت، ویزا و فرودگاه)',
    en: 'I have been admitted to the university with a full scholarship, and I have strong family and professional ties to my homeland.',
    cyrillicPron: 'Ай ҳэв бин эдмитед ту зе юнивёрсити виз э фул сколаршип, энд Ай ҳэв стронг фэмили энд профешнал тайз ту май ҳоумлэнд.',
    tajikMeaning: 'Ман бо бурсияи комил (Full-Fund) дар донишгоҳ пазируфта шудаам ва бо ватани худ пайвандҳои қавии хонаводагӣ ва корӣ дорам.',
    russianMeaning: 'Я поступил в университет с полной стипендией, и у меня крепкие семейные и профессиональные связи с родиной.',
    uzbekMeaning: 'Men universitetga toʻliq grant (Full-Fund) asosida qabul qilindim va vatanim bilan kuchli oilaviy hamda kasbiy aloqalarim bor.'
  },
  {
    id: 'ec_5',
    badge: '🏥 B1-B2 • Пизишкӣ, Дорухона ва Ёрии Таъҷилӣ (پزشکی و اورژانس در غرب)',
    en: 'I have an appointment with the specialist doctor at 10 AM, and here is my health insurance card.',
    cyrillicPron: 'Ай ҳэв эн эпойнтмент виз зе спешалист доктар эт тен эй-эм, энд ҳир из май ҳелс иншуранс кард.',
    tajikMeaning: 'Ман соати 10-и субҳ бо духтури мутахассис вақти мулоқот дорам ва ин корти суғуртаи дармонии ман аст.',
    russianMeaning: 'У меня приём у врача-специалиста в 10 утра, и вот моя карта медицинского страхования.',
    uzbekMeaning: 'Soat 10:00 da mutaxassis shifokor qabuliga yozilganman, mana mening tibbiy sugʻurta kartam.'
  }
];

// ============================================================================
// COMPLETE 35-LETTER TAJIK CYRILLIC ⇄ PERSIAN ALPHABET BRIDGE + SWEET DICTIONARY
// ============================================================================
const TAJIK_ALPHABET_BRIDGE = [
  { cyrillic: 'А а', persian: 'اَ / َ / ه', exampleTg: 'Абр / Саمرқанд', exampleFa: 'ابر / سمرقند', soundHint: 'صدای فتحه (a)' },
  { cyrillic: 'Б б', persian: 'ب', exampleTg: 'Бародар / Бухоро', exampleFa: 'برادر / بخارا', soundHint: 'حرف ب (b)' },
  { cyrillic: 'В в', persian: 'و (صامت)', exampleTg: 'Ватан / Вафо', exampleFa: 'وطن / وفا', soundHint: 'حرف و (v)' },
  { cyrillic: 'Г г', persian: 'گ', exampleTg: 'Гул / Гуфтор', exampleFa: 'گل / گفتار', soundHint: 'حرف گ (g)' },
  { cyrillic: 'Ғ ғ', persian: 'غ', exampleTg: 'Ғурур / Ғазал', exampleFa: 'غرور / غزل', soundHint: 'حرف ویژه تاجیکی: غ (gh)' },
  { cyrillic: 'Д д', persian: 'د', exampleTg: 'Дӯст / Душанбе', exampleFa: 'دوست / دوشنبه', soundHint: 'حرف د (d)' },
  { cyrillic: 'Е е', persian: 'اِ / ـه / یه', exampleTg: 'Меҳр / Теҳрон', exampleFa: 'مهر / تهران', soundHint: 'صدای کسره کشیده (e/ye)' },
  { cyrillic: 'Ё ё', persian: 'یا', exampleTg: 'Ёр / Сиёвуш', exampleFa: 'یار / سیاوش', soundHint: 'ترکیب یا (yo/yā)' },
  { cyrillic: 'Ж ж', persian: 'ژ', exampleTg: 'Жола / Пажӯҳиш', exampleFa: 'ژاله / پژوهش', soundHint: 'حرف ژ (zh)' },
  { cyrillic: 'З з', persian: 'ز / ذ / ض / ظ', exampleTg: 'Забон / Замин', exampleFa: 'زبان / زمین', soundHint: 'صدای ز (z)' },
  { cyrillic: 'И и', persian: 'اِ / ی کوتاه', exampleTg: 'Ишқ / Исмоил', exampleFa: 'عشق / اسماعیل', soundHint: 'کسره یا ی کوتاه (i/e)' },
  { cyrillic: 'Ӣ ӣ', persian: 'ی (در پایان واژه)', exampleTg: 'Тоҷикӣ / Эронӣ', exampleFa: 'تاجیکی / ایرانی', soundHint: 'حرف ویژه تاجیکی: ی پایانی (ī)' },
  { cyrillic: 'Й й', persian: 'ی (صامت)', exampleTg: 'Пайванд / Майдон', exampleFa: 'پیوند / میدان', soundHint: 'حرف ی (y)' },
  { cyrillic: 'К к', persian: 'ک', exampleTg: 'Китоб / Кабир', exampleFa: 'کتاب / کبیر', soundHint: 'حرف ک (k)' },
  { cyrillic: 'Қ қ', persian: 'ق', exampleTg: 'Қалб / Самарқанд', exampleFa: 'قلب / سمرقند', soundHint: 'حرف ویژه تاجیکی: ق (q)' },
  { cyrillic: 'Л л', persian: 'ل', exampleTg: 'Лабханд / Лола', exampleFa: 'لبخند / لاله', soundHint: 'حرف ل (l)' },
  { cyrillic: 'М м', persian: 'م', exampleTg: 'Модар / Меҳан', exampleFa: 'مادر / میهن', soundHint: 'حرف م (m)' },
  { cyrillic: 'Н н', persian: 'ن', exampleTg: 'Нон / Наврӯз', exampleFa: 'نان / نوروز', soundHint: 'حرف ن (n)' },
  { cyrillic: 'О о', persian: 'آ / ا', exampleTg: 'Оفتоб / Озодӣ', exampleFa: 'آفتاب / آزادی', soundHint: 'الف کشیده فارسی (ā)' },
  { cyrillic: 'П п', persian: 'پ', exampleTg: 'Падар / Пойтахт', exampleFa: 'پدر / پایتخت', soundHint: 'حرف پ (p)' },
  { cyrillic: 'Р р', persian: 'ر', exampleTg: 'Рӯдакӣ / Реша', exampleFa: 'رودکی / ریشه', soundHint: 'حرف ر (r)' },
  { cyrillic: 'С с', persian: 'س / ث / ص', exampleTg: 'Салом / Сомонӣ', exampleFa: 'سلام / سامانی', soundHint: 'صدای س (s)' },
  { cyrillic: 'Т т', persian: 'ت / ط', exampleTg: 'Тоҷикистон / Тавоно', exampleFa: 'تاجیکستان / توانا', soundHint: 'صدای ت (t)' },
  { cyrillic: 'У у', persian: 'اُ / و کوتاه', exampleTg: 'Умед / Гулистон', exampleFa: 'امید / گلستان', soundHint: 'ضمه (o/u)' },
  { cyrillic: 'Ӯ ӯ', persian: 'و کشیده / او', exampleTg: 'Дӯст / Рӯзгор', exampleFa: 'دوست / روزگار', soundHint: 'حرف ویژه تاجیکی: او کشیده (ū)' },
  { cyrillic: 'Ф ф', persian: 'ف', exampleTg: 'Фарҳанг / Фирдавсӣ', exampleFa: 'فرهنگ / فردوسی', soundHint: 'حرف ف (f)' },
  { cyrillic: 'Х х', persian: 'خ', exampleTg: 'Хона / Хуршед', exampleFa: 'خانه / خورشید', soundHint: 'حرف خ (kh)' },
  { cyrillic: 'Ҳ ҳ', persian: 'ه / ح', exampleTg: 'Ҳамреша / Ҳофиз', exampleFa: 'هم‌ریشه / حافظ', soundHint: 'حرف ویژه تاجیکی: ه/ح (h)' },
  { cyrillic: 'Ч ч', persian: 'چ', exampleTg: 'Чашм / Чаман', exampleFa: 'چشم / چمن', soundHint: 'حرف چ (ch)' },
  { cyrillic: 'Ҷ ҷ', persian: 'ج', exampleTg: 'Ҷон / Тоҷик', exampleFa: 'جان / تاجیک', soundHint: 'حرف ویژه تاجیکی: ج (j)' },
  { cyrillic: 'Ш ш', persian: 'ش', exampleTg: 'Шаҳр / Ширин', exampleFa: 'شهر / شیرین', soundHint: 'حرف ش (sh)' },
  { cyrillic: 'Ъ ъ', persian: 'ع / ء', exampleTg: 'Шеър / Маъно', exampleFa: 'شعر / معنا', soundHint: 'حرف ع و همزه (’)' },
  { cyrillic: 'Э э', persian: 'ایـ / اِ (اول واژه)', exampleTg: 'Эрон / Эҳтиром', exampleFa: 'ایران / احترام', soundHint: 'ایـ در ابتدای کلمه (E)' },
  { cyrillic: 'Ю ю', persian: 'یو', exampleTg: 'Юсуф', exampleFa: 'یوسف', soundHint: 'ترکیب یو (yu)' },
  { cyrillic: 'Я я', persian: 'یَ / یه', exampleTg: 'Як / Ягона', exampleFa: 'یک / یگانه', soundHint: 'ترکیب یَ (ya)' }
];

const SWEET_TAJIK_IRANIAN_DICTIONARY = [
  {
    tgCyrillic: 'Раҳмати калон! / Саломат бошед!',
    tgPersianScript: 'رحمتِ کلان! / سلامت باشید!',
    iranianFa: 'دست شما درد نکند! / خیلی ممنون!',
    note: 'اصیل‌ترین عبارت سپاسگزاری در دوشنبه، سمرقند و بخارا'
  },
  {
    tgCyrillic: 'Нағз / Соз (Нағз ҳастед?)',
    tgPersianScript: 'نَغز / ساز (نغز هستید؟)',
    iranianFa: 'خوب / عالی (حالتان خوب است؟)',
    note: 'واژهٔ کهن رودکی و شاهنامه که در تاجیکستان زنده و روزمره است'
  },
  {
    tgCyrillic: 'Пагоҳ / Бегоҳ',
    tgPersianScript: 'پگاه / بیگاه',
    iranianFa: 'فردا صبح / عصر و غروب',
    note: 'فارسی ناب سامانی که در گفتار روزانهٔ مردم تاجیک می‌درخشد'
  },
  {
    tgCyrillic: 'Калон / Хурд',
    tgPersianScript: 'کلان / خُرد',
    iranianFa: 'بزرگ / کوچک',
    note: 'در تاجیکستان، ازبکستان و افغانستان بسیار پرکاربرد است'
  },
  {
    tgCyrillic: 'Фурудгоҳ / Донишгоҳ / Истгоҳ',
    tgPersianScript: 'فرودگاه / دانشگاه / ایستگاه',
    iranianFa: 'فرودگاه / دانشگاه / ایستگاه',
    note: 'واژگان مشترک زیبای فارسی معاصر در تهران و دوشنبه'
  },
  {
    tgCyrillic: 'Дӯстатон дорам, ҳамрешаи азизам!',
    tgPersianScript: 'دوستتان دارم، هم‌ریشهٔ عزیزم!',
    iranianFa: 'دوستتان دارم، هم‌ریشهٔ عزیزم!',
    note: 'پیام محبت جاودان میان ایران، تاجیکستان، ازبکستان و افغانستان'
  }
];

const RUDAKI_SAMANID_POEMS = [
  {
    poet: 'استاد شاعران، ابوعبدالله رودکی سمرقندی (Устод Абӯабдуллоҳи Рӯдакӣ)',
    title: 'قصیدهٔ جاودان بخارا و مولیان (Бӯйи ҷӯйи Мӯлиён)',
    faVerse: 'بوی جوی مولیان آید همی ••• یاد یار مهربان آید همی\nریگ آموی و درشتی راه او ••• زیر پایم پرنیان آید همی',
    tgVerse: 'Бӯйи ҷӯйи Мӯлиён ояд ҳаме ••• Ёди ёри меҳрубон ояд ҳаме\nРеги Омую дуруштии роҳи ӯ ••• Зери поям парниён ояд ҳаме',
    enMeaning: 'The scent of the Muliyan stream comes floating by; the memory of the kind beloved comes to mind. The sands of the Oxus (Amu Darya) feel like pure silk beneath my feet.'
  },
  {
    poet: 'حکیم ابوالقاسم فردوسی توسی (Ҳаким Абулқосими Фирдавсӣ)',
    title: 'خرد و نام نیک در شاهنامه (Хирад ва Номи Нек)',
    faVerse: 'توانا بود هر که دانا بود ••• ز دانش دل پیر برنا بود\nبیا تا جهان را به بد نسپریم ••• به کوشش همه دست نیکی بریم',
    tgVerse: 'Тавоно бувад ҳар кӣ доно бувад ••• Зи дониш дили пир барно бувад\nБиё то ҷаҳонро ба бад наспарем ••• Ба кӯшиш ҳама дасти некӣ барем',
    enMeaning: 'Mighty is the one who has knowledge ("Tavana"); through wisdom, even an ancient heart grows young. Come, let us join hands in goodness and effort.'
  }
];

export const TajikCyrillicHub: React.FC<TajikCyrillicHubProps> = ({ onEarnLingous }) => {
  const [activeTrack, setActiveTrack] = useState<
    | 'four_row_persian'
    | 'iranian_spoken_slang'
    | 'english_via_cyrillic'
    | 'alphabet_dictionary_poetry'
    | 'script_converter'
  >('iranian_spoken_slang');
  const [showBlackboard, setShowBlackboard] = useState<boolean>(true);
  const [copiedTribute, setCopiedTribute] = useState<boolean>(false);
  const [sharedStatus, setSharedStatus] = useState<string | null>(null);
  const [converterInput, setConverterInput] = useState<string>('Салом дӯсти ман, ба Шаҳри Тавоно хуш омадед аз Самарқанд, Бухоро, Душанбе ва Тифлис');

  const handleCopyTribute = () => {
    sound.playCoin();
    const fullText = `${FOUNDER_TRIBUTE_FA}\n\n${FOUNDER_TRIBUTE_TG}\n\n${FOUNDER_TRIBUTE_KA}\n\n${FOUNDER_TRIBUTE_UZ}\n\n${FOUNDER_TRIBUTE_EN}`;
    navigator.clipboard?.writeText(fullText);
    setCopiedTribute(true);
    onEarnLingous(25);
    setTimeout(() => setCopiedTribute(false), 2500);
  };

  const handleShareTribute = async () => {
    sound.playLevelUp();
    try {
      confetti({ particleCount: 55, spread: 70 });
    } catch {}
    onEarnLingous(30);
    const shareData = {
      title: 'لوح زرین پیام مهر و هم‌ریشگی بنیان‌گذار خطاب به ملت شریف تاجیکستان، ازبکستان، گرجستان و افغانستان',
      text: `${FOUNDER_TRIBUTE_FA}\n\n${FOUNDER_TRIBUTE_TG}\n\n${FOUNDER_TRIBUTE_KA}`
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard?.writeText(shareData.text);
        setSharedStatus('✅ لوح زرین ۵ زبانه کپی شد تا با عزیزان در سمرقند، بخارا، دوشنبه، تفلیس، هرات، بلخ و کابل به اشتراک بگذارید!');
        setTimeout(() => setSharedStatus(null), 4000);
      }
    } catch {
      setSharedStatus('✅ آماده اشتراک‌گذاری با هم‌ریشگان عزیز!');
    }
  };

  const convertTajikCyrillicToPersianPreview = (input: string): string => {
    const dictionaryMap: Array<[RegExp, string]> = [
      [/салом/gi, 'سلام'],
      [/дӯсти/gi, 'دوستِ'],
      [/дӯст/gi, 'دوست'],
      [/азизи/gi, 'عزیزِ'],
      [/азиз/gi, 'عزیز'],
      [/ман/gi, 'من'],
      [/ба/gi, 'به'],
      [/шаҳри/gi, 'شهرِ'],
      [/тавоно/gi, 'توانا'],
      [/хуш/gi, 'خوش'],
      [/омадед/gi, 'آمدید'],
      [/аз/gi, 'از'],
      [/душанбе/gi, 'دوشنبه'],
      [/самарқанд/gi, 'سمرقند'],
      [/бухоро/gi, 'بخارا'],
      [/тифлис/gi, 'تفلیس'],
      [/тоҷикистон/gi, 'تاجیکستان'],
      [/эрон/gi, 'ایران'],
      [/ӯзбекистон/gi, 'ازبکستان'],
      [/гурҷистон/gi, 'گرجستان'],
      [/ва/gi, 'و']
    ];
    let result = input;
    for (const [regex, faWord] of dictionaryMap) {
      result = result.replace(regex, faWord);
    }
    const charMap: Record<string, string> = {
      а: 'اَ', б: 'ب', в: 'و', г: 'گ', ғ: 'غ', д: 'د', е: 'ه', ё: 'یا', ж: 'ژ', з: 'ز',
      и: 'ی', ӣ: 'ی', й: 'ی', к: 'ک', қ: 'ق', л: 'ل', м: 'م', н: 'ن', о: 'آ', п: 'پ',
      р: 'ر', с: 'س', т: 'ت', у: 'و', ӯ: 'و', ф: 'ف', х: 'خ', ҳ: 'ه', ч: 'چ', ҷ: 'ج',
      ш: 'ش', ъ: 'ع', э: 'اِ', ю: 'یو', я: 'یه'
    };
    return result
      .split('')
      .map((ch) => {
        const lower = ch.toLowerCase();
        return charMap[lower] !== undefined ? charMap[lower] : ch;
      })
      .join('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* =================================================================== */}
      {/* ROYAL TURQUOISE & GOLD FOUNDER'S GOLDEN HERITAGE TRIBUTE CARD       */}
      {/* (تاجیکستان، ازبکستان، گرجستان، افغانستان و همه فارسی‌زبانان جهان)   */}
      {/* =================================================================== */}
      <section
        aria-label="لوح زرین پیام مهر، درود و هم‌ریشگی بنیان‌گذار"
        className="rounded-3xl bg-gradient-to-br from-teal-950 via-cyan-900 to-emerald-950 text-white p-6 sm:p-8 border-4 border-amber-400 shadow-2xl space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-amber-400/50 pb-4">
          <div className="space-y-1">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md">
              <Landmark className="w-4 h-4" />
              <span>👑 ЛАВҲИ ЗАРРИНИ ҲАМРЕШАГӢ • لوح زرین پیام مهر و هم‌ریشگی بنیان‌گذار</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-300 pt-1 leading-snug">
              🇹🇯🇺🇿🇬🇪🇦🇫🇮🇷 پیام عاشقانه بنیان‌گذار خطاب به ملت شریف تاجیکستان، ازبکستان، مردم عالیقدر گرجستان و برادران و خواهران عزیز افغانستانی
            </h2>
          </div>

          {/* Audio Playback & Share Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                speakPersian(FOUNDER_TRIBUTE_FA, 0.86);
                onEarnLingous(20);
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 پخش صوتی فارسی</span>
            </button>

            <button
              type="button"
              onClick={() => {
                speakRussian(FOUNDER_TRIBUTE_TG, 0.85);
                onEarnLingous(20);
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 Шунидан (Тоҷикӣ / Кириллӣ)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                speakEnglish(FOUNDER_TRIBUTE_EN, 0.88);
                onEarnLingous(20);
              }}
              className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-amber-200 border border-amber-300/50 font-black text-xs flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 Listen in English</span>
            </button>

            <button
              type="button"
              onClick={handleShareTribute}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
            >
              <Share2 className="w-4 h-4" />
              <span>📤 اشتراک‌گذاری لوح زرین</span>
            </button>

            <button
              type="button"
              onClick={handleCopyTribute}
              className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 text-amber-300 border border-amber-400/50 font-black text-xs flex items-center gap-1"
            >
              {copiedTribute ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedTribute ? 'کپی شد!' : 'کپی متن کامل'}</span>
            </button>
          </div>
        </div>

        {sharedStatus && (
          <div className="p-3 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs text-center shadow-md">
            {sharedStatus}
          </div>
        )}

        {/* 1. Complete Persian / Dari Script */}
        <div className="p-5 sm:p-6 rounded-2xl bg-black/45 border-2 border-amber-400/70 space-y-2 shadow-lg" dir="rtl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-xs">
              🇮🇷🇦🇫 متن کامل فارسی و دری (یادداشت بنیان‌گذار: سیاوش علی‌میری)
            </span>
            <span className="text-xs font-bold text-cyan-300">
              سمرقند • بخارا • دوشنبه • تفلیس • هرات • بلخ • کابل
            </span>
          </div>
          <p className="text-sm sm:text-base font-black text-amber-200 leading-loose text-justify">
            {FOUNDER_TRIBUTE_FA}
          </p>
        </div>

        {/* 2. Complete Tajik Cyrillic Script (Тоҷикӣ) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/90 via-teal-950/90 to-slate-950/90 border-2 border-cyan-400/60 space-y-2 shadow-lg" dir="ltr">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-lg bg-cyan-400 text-slate-950 font-black text-xs">
              🇹🇯🇺🇿 Матни Тоҷикӣ (Бо хати Кириллӣ — Душанбе, Самарқанд ва Бухоро)
            </span>
            <span className="text-xs font-bold text-amber-300">Пайванди ҷовидони Ориёӣ • Сиёвуш ва Исмоили Сомонӣ</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-cyan-100 leading-relaxed text-justify">
            {FOUNDER_TRIBUTE_TG}
          </p>
        </div>

        {/* 3. Dedicated Greeting in Georgian Script (ქართული) & Uzbek (Oʻzbekcha) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="ltr">
          <div className="p-4 rounded-2xl bg-rose-950/70 border-2 border-amber-300/50 space-y-1.5">
            <span className="px-2.5 py-1 rounded-lg bg-amber-300 text-slate-950 font-black text-xs inline-block">
              🇬🇪 درود اختصاصی به خط گرجی خطاب به مردم عالیقدر گرجستان (ქართული — თბილისი)
            </span>
            <p className="text-xs sm:text-sm font-bold text-amber-100 leading-relaxed">
              {FOUNDER_TRIBUTE_KA}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/80 border-2 border-emerald-400/50 space-y-1.5">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-400 text-slate-950 font-black text-xs inline-block">
              🇺🇿 درود اختصاصی به خط ازبکی خطاب به مردم شریف سمرقند، بخارا و تاشکند (Oʻzbekcha)
            </span>
            <p className="text-xs sm:text-sm font-bold text-emerald-100 leading-relaxed">
              {FOUNDER_TRIBUTE_UZ}
            </p>
          </div>
        </div>

        {/* 4. Complete English Translation */}
        <div className="p-5 rounded-2xl bg-white/10 border border-amber-300/40 space-y-2" dir="ltr">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-lg bg-white text-slate-950 font-black text-xs">
              🇬🇧🇺🇸 Founder’s Golden Heritage Tribute in English
            </span>
            <span className="text-xs font-bold text-amber-300">100% Free Forever • AbleWay / Tavana City</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-emerald-100 leading-relaxed text-justify">
            {FOUNDER_TRIBUTE_EN}
          </p>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4 TRACK SELECTOR TABS                                               */}
      {/* =================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTrack('four_row_persian');
          }}
          className={`p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
            activeTrack === 'four_row_persian'
              ? 'bg-gradient-to-r from-teal-800 to-emerald-900 text-white border-amber-400 shadow-lg'
              : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div>
            <span className="text-xs sm:text-sm font-black block">
              🇹🇯🇷🇺🇺🇿🇬🇪➔🇮🇷 ۱. آموزش ۴ ردیفه فارسی ایران (با خط سیریلیک، روسی، ازبکی و گرجی)
            </span>
            <span className="text-[11px] opacity-85 block" dir="ltr">
              Персидский для Таджиков, Русскоязычных (250M), Узбеков и Грузин
            </span>
          </div>
          <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTrack('iranian_spoken_slang');
          }}
          className={`p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
            activeTrack === 'iranian_spoken_slang'
              ? 'bg-gradient-to-r from-rose-900 via-amber-900 to-teal-950 text-white border-amber-400 shadow-lg'
              : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div>
            <span className="text-xs sm:text-sm font-black block">
              🗣️🇮🇷➔🇹🇯🇦🇫🇺🇿 ۲. فارسی گفتاری امروز ایران و اصطلاحات خودمانی (ویژه تاجیک، افغان و ازبک)
            </span>
            <span className="text-[11px] opacity-85 block" dir="ltr">
              Гуфтори зиндаи имрӯзи Эрон ва истилоҳоти Теҳронӣ барои Тоҷикистон, Афғонистон ва Ӯзбекистон
            </span>
          </div>
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTrack('english_via_cyrillic');
          }}
          className={`p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
            activeTrack === 'english_via_cyrillic'
              ? 'bg-gradient-to-r from-indigo-800 to-cyan-900 text-white border-amber-400 shadow-lg'
              : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div>
            <span className="text-xs sm:text-sm font-black block">
              🇹🇯🇷🇺🇺🇿➔🇬🇧 ۲. آموزش انگلیسی با خط سیریلیک و ازبکی
            </span>
            <span className="text-[11px] opacity-85 block" dir="ltr">
              Англисӣ барои Тоҷикон, Русзабонон ва Ӯзбекон
            </span>
          </div>
          <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTrack('alphabet_dictionary_poetry');
          }}
          className={`p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
            activeTrack === 'alphabet_dictionary_poetry'
              ? 'bg-gradient-to-r from-purple-900 to-indigo-900 text-white border-amber-400 shadow-lg'
              : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div>
            <span className="text-xs sm:text-sm font-black block">
              🔤📜 ۳. پل ۳۵ حرف الفبای تاجیکی + واژه‌نامه شیرین و شعر رودکی
            </span>
            <span className="text-[11px] opacity-85 block" dir="ltr">
              Алифбои 35-ҳарфа, Луғати Ширин ва Шеъри Рӯдакӣ
            </span>
          </div>
          <Award className="w-5 h-5 text-amber-300 shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTrack('script_converter');
          }}
          className={`p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
            activeTrack === 'script_converter'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 border-slate-900 shadow-lg'
              : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div>
            <span className="text-xs sm:text-sm font-black block">
              🔄 ۴. مبدل زنده خط سیریلیک ⇄ خط فارسی
            </span>
            <span className="text-[11px] opacity-85 block" dir="ltr">
              Табдилдиҳандаи зиндаи Кириллӣ ⇄ Хати Форсӣ
            </span>
          </div>
          <ArrowRightLeft className="w-5 h-5 shrink-0" />
        </button>
      </div>

      {/* Interactive Dual-Script Blackboard (Tajik Cyrillic А–Я + English A–Z + Persian) with Hand Eraser */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-emerald-950/90 text-white px-4 py-2.5 rounded-2xl border border-amber-400/50">
          <span className="text-xs sm:text-sm font-black text-amber-300">
            🖍️ تخته سیاه تعاملی زبان‌آموزی با سیریلیک (А–Я)، الفبای انگلیسی (A–Z) و فارسی همراه با پاک‌کن روی تخته
          </span>
          <button
            type="button"
            onClick={() => setShowBlackboard((prev) => !prev)}
            className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black"
          >
            {showBlackboard ? 'بستن موقت تخته سیاه' : 'باز کردن تخته سیاه سیریلیک و انگلیسی'}
          </button>
        </div>
        {showBlackboard && (
          <LatinCyrillicBlackboardStudio
            mode="tajik_cyrillic_english"
            onEarnLingous={onEarnLingous}
          />
        )}
      </div>

      {/* =================================================================== */}
      {/* TRACK: IRANIAN SPOKEN PERSIAN & STREET IDIOMS FOR TAJIK/AFGHAN/UZBEK */}
      {/* =================================================================== */}
      {activeTrack === 'iranian_spoken_slang' && (
        <div className="space-y-4">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 border-2 border-amber-400 shadow-xl space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
              🇮🇷🗣️ پل آشنایی با فارسی گفتاری امروز ایران • ویژه هم‌زبانان تاجیکستان، افغانستان و ازبکستان
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-amber-300">
              آشنایی با فارسی زنده و اصطلاحات روزمره که امروز در ایران صحبت می‌شود (با آوانگاری سیریلیک، معادل تاجیکی/دری و انگلیسی)
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              علاوه بر فارسی ادبی و رسمی که میراث مشترک همهٔ ما در تهران، دوشنبه، کابل، هرات، سمرقند و بخاراست، در گفتار روزمرهٔ امروز ایران اصطلاحات شیرین و خودمانی رایج است که ممکن است در کشورهای دیگر کمتر شنیده شده باشد. در این بخش، این اصطلاحات را به همراه تلفظ سیریلیک، معنی دقیق به فارسی تاجیکی و دری و معادل انگلیسی می‌آموزید:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: 'ir_slang_1',
                badge: '۱. اصطلاح روزمره زمین خوردن یا شوکه شدن',
                iranianFa: 'با فک خوردم زمین!',
                cyrillicPron: 'Бо фак хӯрдам замин! (Bā fak khordam zamin!)',
                meaningFaAndDari:
                  'معنی در فارسی معیار، تاجیکی و دری: خیلی محکم و بدجور با صورت زمین خوردم! (یا در معنای مجازی: از شدت تعجب یا خستگی نقش بر زمین شدم).',
                meaningTajikCyrillic:
                  'Маъно дар Тоҷикӣ ва Дарӣ: Сахт бо рӯй ба замин афтодам! / Нақши замин шудам.',
                dialogueFa: 'مثال در مکالمه: «پله‌ها لیز بود، حواسم نبود یهو با فک خوردم زمین!»',
                dialogueCyrillic: '«Зинаҳо лағжонак буд, ногаҳон бо фак хӯрдам замин!»',
                enEquivalent: 'I fell flat on my face! / I wiped out hard!'
              },
              {
                id: 'ir_slang_2',
                badge: '۲. بیان دلگیری و کسالت روحی',
                iranianFa: 'امروز حالم تو قوطیه!',
                cyrillicPron: 'Имрӯз ҳолам ту қуттие! (Emrooz hālam too ghootiyeh!)',
                meaningFaAndDari:
                  'معنی در فارسی معیار، تاجیکی و دری: امروز حالم گرفته است، کسل و بی‌حوصله‌ام و روحیه‌ام خوب نیست.',
                meaningTajikCyrillic:
                  'Маъно дар Тоҷикӣ ва Дарӣ: Имрӯз табъам хира аст, дилгиру беҳавсала ҳастам.',
                dialogueFa: 'مثال در مکالمه: «نمی‌دونم چرا از صبح حالم تو قوطیه و حوصله هیچ کاری رو ندارم.»',
                dialogueCyrillic: '«Намедонам чаро аз субҳ ҳолам ту қуттие ва ҳавсала надорам.»',
                enEquivalent: "I'm feeling down in the dumps / I'm in a funk / out of sorts today."
              },
              {
                id: 'ir_slang_3',
                badge: '۳. نهایت تعجب و شگفتی در گفتار جوانان',
                iranianFa: 'پشمام ریخت! (معادل مؤدبانه و خانوادگی: برگام ریخت!)',
                cyrillicPron: 'Пашмом рехт! / Баргом рехт! (Pashmām rikht! / Bargām rikht!)',
                meaningFaAndDari:
                  'معنی در فارسی معیار، تاجیکی و دری: به شدت تعجب کردم و هوش از سرم پرید! (نکته فرهنگی: «پشمام ریخت» بسیار خودمانی است و در جمع‌های خانوادگی به جای آن «برگام ریخت!» گفته می‌شود).',
                meaningTajikCyrillic:
                  'Маъно дар Тоҷикӣ ва Дарӣ: Сахт ҳайрон шудам! Ҳушам аз сарам парид! («Баргом рехт» шакли боадабонаи он аст).',
                dialogueFa: 'مثال در مکالمه: «وقتی سرعت پیشرفت هوش مصنوعی رو دیدم، واقعاً برگام ریخت!»',
                dialogueCyrillic: '«Вақте суръати пешрафтро дидам, воқеан баргом рехт!»',
                enEquivalent: 'My mind was blown! / I was totally shocked!'
              },
              {
                id: 'ir_slang_4',
                badge: '۴. احوال‌پرسی صمیمی و پرسیدن از روبه‌راه بودن اوضاع',
                iranianFa: 'میزونی؟ — نه، بدجوری این روزا درگیرم!',
                cyrillicPron: 'Мизӯнӣ? — На, бадҷӯрӣ ин рӯзо даргирам! (Mizooni? — Nah, bad-joori...)',
                meaningFaAndDari:
                  'معنی در فارسی معیار، تاجیکی و دری: «میزونی؟» یعنی حالت خوب و روبه‌راه است؟ کارهایت مرتب است؟ و «بدجوری» یعنی خیلی شدید و حسابی.',
                meaningTajikCyrillic:
                  'Маъно дар Тоҷикӣ ва Дарӣ: «Мизӯнӣ?» яъне «Нағзӣ? Корҳоят соз аст?» ва «Бадҷӯрӣ» яъне «Хеле сахт / бениҳоят».',
                dialogueFa: 'مثال در مکالمه: «سلام رفیق، میزونی؟ — نه والا، این روزا بدجوری سرم شلوغه.»',
                dialogueCyrillic: '«Салом рафиқ, мизӯнӣ? — На валлоҳ, ин рӯзҳо бадҷӯрӣ сарам شلوغ (банд) аст.»',
                enEquivalent: 'Are you all good / sorted? — Nah, I’m swamped / having a rough time these days.'
              },
              {
                id: 'ir_slang_5',
                badge: '۵. کنایه طنز به دست‌وپاچلفتی بودن یا ناهماهنگی',
                iranianFa: 'فلانی این پاش به اون پاش پنالتی می‌زنه! (یا به اون پاش می‌گه فلان)',
                cyrillicPron: 'Фалонӣ ин пош ба ун пош пеналтӣ мезане! (In pāsh beh oon pāsh penālti mizaneh)',
                meaningFaAndDari:
                  'معنی در فارسی معیار، تاجیکی و دری: کنایه شوخ‌طبعانه به کسی که از خستگی یا دست‌وپاچلفتی بودن، پایش به پای دیگرش گیر می‌کند یا کارهایش را کاملاً ناهماهنگ انجام می‌دهد.',
                meaningTajikCyrillic:
                  'Маъно дар Тоҷикӣ ва Дарӣ: Кинояи шӯхиомез ба касе, ки пояш ба пояш мепечад ё дар корҳояш бетартибу ноҳамоҳанг аст.',
                dialogueFa: 'مثال در مکالمه: «انقدر خسته است که موقع راه رفتن این پاش به اون پاش پنالتی می‌زنه!»',
                dialogueCyrillic: '«Ин қадар хаста аст, ки ин пош ба ун пош пеналтӣ мезане!»',
                enEquivalent: 'He is tripping over his own two feet! / Totally uncoordinated!'
              },
              {
                id: 'ir_slang_6',
                badge: '۶. دلداری دادن به دوستی که قیافه‌اش درهم و غمگین است',
                iranianFa: 'چته؟ چرا کشتی‌هات غرق شده؟',
                cyrillicPron: 'Чете? Чаро киштиҳот ғарқ шуде? (Cheteh? Cherā keshti-hāt ghargh shodeh?)',
                meaningFaAndDari:
                  'معنی در فارسی معیار، تاجیکی و دری: تو را چه شده است؟ چرا این‌قدر غمگین و درهم نشسته‌ای، انگار تمام کشتی‌های تجاری‌ات در دریا غرق شده است؟',
                meaningTajikCyrillic:
                  'Маъно дар Тоҷикӣ ва Дарӣ: Ба ту чӣ шудааст? Чаро ин қадар ғамгину дилшикаста нишастаӣ?',
                dialogueFa: 'مثال در مکالمه: «پاشو لبخند بزن رفیق! چته از صبح کشتی‌هات غرق شده؟»',
                dialogueCyrillic: '«Хез табассум кун рафиқ! Чете аз субҳ киштиҳот ғарқ шуде?»',
                enEquivalent: "What's wrong with you? Why the long face—did all your ships sink?"
              },
              {
                id: 'ir_slang_7',
                badge: '۷. شوخی صمیمانه با دوستی که سرحال است یا رازی دارد',
                iranianFa: 'چیه کلک؟ امروز خبریه؟',
                cyrillicPron: 'Чие калак? Имрӯз хабарие? (Chiyeh kalak? Emrooz khabariyeh?)',
                meaningFaAndDari:
                  'معنی در فارسی معیار، تاجیکی و دری: در گفتار صمیمی ایران، «کلک» بین دوستان به معنی «زرنگ، شوخ و باحال» است (نه فریبکار). وقتی دوستی لباس نو پوشیده یا لبخند مرموز دارد به شوخی به او می‌گویند.',
                meaningTajikCyrillic:
                  'Маъно дар Тоҷикӣ ва Дарӣ: Дар гуфтори дӯстонаи Эрон «Калак» ба маънои «Шӯх ва зирак» аст: «Чӣ гап аст, дӯсти зирак? Имрӯз ягон хабари хуш ҳаст?»',
                dialogueFa: 'مثال در مکالمه: «به به، چه تیپی زدی! چیه کلک؟ امروز خبریه؟»',
                dialogueCyrillic: '«Баҳ-баҳ, чӣ либоси зебое! Чие калак? Имрӯз хабарие?»',
                enEquivalent: "What's up, you sly fox? Looking sharp—is something special going on today?"
              },
              {
                id: 'ir_slang_8',
                badge: '۸. درخواست برای تمام کردن اصرار، غر زدن یا کلافه کردن',
                iranianFa: 'بابا انقدر رو مخ من راه نرو! / انقدر تو مخ من نرو!',
                cyrillicPron: 'Бобо инқадар рӯ мухи ман роҳ нарав! / Ту мухи ман нарав!',
                meaningFaAndDari:
                  'معنی در فارسی معیار، تاجیکی و دری: «مخ» در گفتار خودمانی یعنی ذهن و اعصاب؛ یعنی این‌قدر اعصاب مرا خرد نکن، گیر نده و کلافه‌ام نکن!',
                meaningTajikCyrillic:
                  'Маъно дар Тоҷикӣ ва Дарӣ: «Мух» яъне майна ва асаб. Маънояш: «Ин қадар ба асаби ман нарас ва маро хаставу дилгир накун!»',
                dialogueFa: 'مثال در مکالمه: «باشه فهمیدم، بابا انقدر از صبح رو مخ من راه نرو!»',
                dialogueCyrillic: '«Бошад фаҳмидам, бобо инқадар аз субҳ рӯ мухи ман роҳ нарав!»',
                enEquivalent: 'Man, stop walking all over my nerves! / Quit getting in my head and bugging me!'
              },
              {
                id: 'ir_slang_9',
                badge: '۹. وقتی کسی ناگهانی شما را می‌ترساند یا حال خوشتان را می‌گیرد',
                iranianFa: 'بابا هرچی زده بودیم پرید!',
                cyrillicPron: 'Бобо ҳарчӣ зада будем парид! (Bābā harchi zadeh boodim parid!)',
                meaningFaAndDari:
                  'معنی در فارسی معیار، تاجیکی و دری: اصطلاح طنزآمیز در ایران وقتی کسی ناگهان شما را می‌ترساند، غافلگیر می‌کند یا با یک حرف، کل شادی، انرژی و حال خوشتان را در یک لحظه از بین می‌برد!',
                meaningTajikCyrillic:
                  'Маъно дар Тоҷикӣ ва Дарӣ: Истилоҳи шӯхиомез вақте касе ногаҳон шуморо метарсонад ё бо як гап ҳамаи кайфияту шодии шуморо мепарронад!',
                dialogueFa: 'مثال در مکالمه: «چرا یهو داد زدی ترسوندیمون؟ بابا هرچی زده بودیم پرید!»',
                dialogueCyrillic: '«Чаро ногаҳон дод задӣ тарсондӣ моро? Бобо ҳарчӣ зада будем парид!»',
                enEquivalent: 'Man, you startled me so bad you totally killed my buzz / ruined the whole vibe!'
              },
              {
                id: 'ir_slang_10',
                badge: '۱۰. کنایه بسیار رایج از وضع نامساعد مالی و کمبود پول',
                iranianFa: 'این روزا دستم خیلی خالیه! (یا: هشتم گروِ نُهُمه)',
                cyrillicPron: 'Ин рӯзо дастам хеле холие! (In roozā dastam kheyli khāliyeh!)',
                meaningFaAndDari:
                  'معنی در فارسی معیار، تاجیکی و دری: کنایه مؤدبانه و عامیانه از وضع نامساعد مالی، کمبود نقدینگی و بی‌پولی موقت (به جای اینکه مستقیم بگویند «پول ندارم»، می‌گویند «دستم خالیه» یا «دست‌و بالم تنگه»).',
                meaningTajikCyrillic:
                  'Маъно дар Тоҷикӣ ва Дарӣ: Киноя аз вазъи номусоиди молӣ ва камбуди пул («Дастам تنگ / холӣ аст» яъне феълан пули кофӣ надорам).',
                dialogueFa: 'مثال در مکالمه: «والا خیلی دوست داشتم تو این سفر باهاتون بیام، ولی این روزا دستم خیلی خالیه.»',
                dialogueCyrillic: '«Хеле дӯст доштам ҳамроҳатон биёям, вале ин рӯзо дастам хеле холие.»',
                enEquivalent: "I'm really strapped for cash / short on money / broke these days."
              },
              {
                id: 'ir_slang_11',
                badge: '۱۱. کنایه از شدت مشغله کاری و نداشتن فرصت',
                iranianFa: 'سرم خیلی شلوغه، اصلاً وقت سر خاروندن ندارم!',
                cyrillicPron: 'Сарам хеле شلوغ (банд) аст, аслан вақти сар хорундан надорам!',
                meaningFaAndDari:
                  'معنی در فارسی معیار، تاجیکی و دری: کنایه از اینکه کارها آن‌قدر زیاد و فشرده است که حتی یک ثانیه هم وقت استراحت ندارم.',
                meaningTajikCyrillic:
                  'Маъно дар Тоҷикӣ ва Дарӣ: Корам бениҳоят зиёд аст ва ҳатто як лаҳза вақти холӣ надорам.',
                dialogueFa: 'مثال در مکالمه: «ببخشید دیر جواب دادم، این هفته وقت سر خاروندن نداشتم!»',
                dialogueCyrillic: '«Бубахшед дер ҷавоб додам, ин ҳафта вақти сар хорундан надоштам!»',
                enEquivalent: "I'm completely swamped—I barely have time to breathe!"
              },
              {
                id: 'ir_slang_12',
                badge: '۱۲. قدردانی گرم و صمیمانه در ایران',
                iranianFa: 'دمت گرم! واقعاً سنگ تموم گذاشتی!',
                cyrillicPron: 'Дамат гарм! Воқеан санги тамум гузоштӣ! (Damet garm! Sang-e tamoom gozāshti!)',
                meaningFaAndDari:
                  'معنی در فارسی معیار، تاجیکی و دری: نفست گرم و دستت درد نکند! واقعاً در محبت و مهمان‌نوازی هیچ کم نگذاشتی و بهترین کار را کردی.',
                meaningTajikCyrillic:
                  'Маъно дар Тоҷикӣ ва Дарӣ: Нафасат гарм ва раҳмати калон! Дар меҳрубонӣ ва меҳмоннавозӣ ҳеҷ камбудӣ нагузоштӣ.',
                dialogueFa: 'مثال در مکالمه: «دمت گرم رفیق، با این کمکت واقعاً سنگ تموم گذاشتی!»',
                dialogueCyrillic: '«Дамат гарм рафиқ, бо ин кумакат воқеан санги тамум гузоштӣ!»',
                enEquivalent: 'Bless you, my friend! You truly went above and beyond!'
              }
            ].map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border-2 border-teal-500/40 p-5 space-y-3 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-950 font-black text-xs border border-amber-300">
                      {item.badge}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          speakPersian(`${item.iranianFa}. ${item.dialogueFa}`, 0.86);
                          onEarnLingous(5);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-teal-900 hover:bg-teal-800 text-amber-300 font-black text-xs flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>🔊 فارسی ایران</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          speakRussian(item.cyrillicPron, 0.85);
                          onEarnLingous(5);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-black text-xs flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>🔊 Кириллӣ</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          speakEnglish(item.enEquivalent, 0.88);
                          onEarnLingous(5);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>🔊 EN</span>
                      </button>
                    </div>
                  </div>

                  {/* Iranian Spoken Expression */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 to-teal-900 text-white space-y-1">
                    <div className="text-lg sm:text-xl font-black text-amber-300">
                      🇮🇷 {item.iranianFa}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-cyan-200" dir="ltr">
                      🇹🇯 {item.cyrillicPron}
                    </div>
                  </div>

                  {/* Meaning in Persian / Dari / Tajik */}
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5 text-xs">
                    <p className="font-bold text-slate-900 leading-relaxed">
                      📖 {item.meaningFaAndDari}
                    </p>
                    <p className="font-bold text-teal-900 leading-relaxed" dir="ltr">
                      🇹🇯🇦🇫🇺🇿 {item.meaningTajikCyrillic}
                    </p>
                  </div>

                  {/* Real-world Example + English Equivalent */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                    <p className="font-black text-emerald-950">{item.dialogueFa}</p>
                    <p className="font-bold text-slate-700" dir="ltr">
                      {item.dialogueCyrillic}
                    </p>
                    <p className="font-black text-indigo-900 pt-1 border-t border-slate-200" dir="ltr">
                      🇬🇧 English Idiom: {item.enEquivalent}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TRACK 1: 4-ROW SIMULTANEOUS DISPLAY (PERSIAN + CYRILLIC + RU + EN/UZ/KA) */}
      {/* =================================================================== */}
      {activeTrack === 'four_row_persian' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-teal-950 text-white border border-amber-400/50 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-black text-amber-300">
              🌟 سیستم ۴ ردیفه هم‌زمان: ۱) خط فارسی ایران • ۲) تلفظ دقیق فارسی با خط سیریلیک (ویژه تاجیکان و خوانش فوری روس‌ها) • ۳) معنی روسی (ویژه ۲۵۰ میلیون روس‌زبان) • ۴) معنی انگلیسی، ازبکی و گرجی
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {FOUR_ROW_CYRILLIC_LESSONS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border-2 border-teal-500/40 p-6 space-y-3 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-xl bg-teal-50 text-teal-950 font-black text-xs border border-teal-200">
                    {item.badge}
                  </span>
                  <div className="flex flex-wrap gap-2" dir="ltr">
                    <button
                      type="button"
                      onClick={() => {
                        speakPersian(item.row1PersianFa, 0.86);
                        onEarnLingous(15);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>🔊 صدای فارسی ایران</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => speakRussian(item.row2TajikCyrillic, 0.85)}
                      className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>🔊 Тоҷикӣ (Кириллӣ)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => speakRussian(item.row3RussianMeaning, 0.86)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-black text-xs flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>🔊 По-русски</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => speakEnglish(item.row4EnglishMeaning, 0.88)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-900 font-black text-xs"
                    >
                      🔊 English
                    </button>
                  </div>
                </div>

                {/* 4 Simultaneous Rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-950 text-white p-4 rounded-2xl border border-amber-400/40">
                  {/* Row 1: Iranian Persian Script */}
                  <div className="p-3 rounded-xl bg-white/5 border border-amber-400/30 space-y-1" dir="rtl">
                    <span className="text-[11px] font-black text-amber-300 block">
                      ۱. خط فارسی ایران و دری (Persian Script):
                    </span>
                    <p className="text-base sm:text-lg font-black text-amber-200">
                      🇮🇷🇦🇫 «{item.row1PersianFa}»
                    </p>
                  </div>

                  {/* Row 2: Exact Persian Pronunciation in Cyrillic (Tajik & Instant Russian Reading) */}
                  <div className="p-3 rounded-xl bg-white/5 border border-cyan-400/30 space-y-1" dir="ltr">
                    <span className="text-[11px] font-black text-cyan-300 block">
                      2. Талаффузи форсӣ бо хати Кириллӣ (تاجیکی و خوانش فوری روس‌ها):
                    </span>
                    <p className="text-sm sm:text-base font-black text-cyan-200">
                      🇹🇯 «{item.row2TajikCyrillic}»
                    </p>
                  </div>

                  {/* Row 3: Meaning in Russian (For 250M Russian Speakers) */}
                  <div className="p-3 rounded-xl bg-white/5 border border-indigo-400/30 space-y-1" dir="ltr">
                    <span className="text-[11px] font-black text-indigo-300 block">
                      3. Перевод на русский язык (معنی روسی ویژه ۲۵۰ میلیون روس‌زبان):
                    </span>
                    <p className="text-sm font-bold text-indigo-100">
                      🇷🇺 «{item.row3RussianMeaning}»
                    </p>
                  </div>

                  {/* Row 4: Meaning in English, Uzbek & Georgian */}
                  <div className="p-3 rounded-xl bg-white/5 border border-emerald-400/30 space-y-1" dir="ltr">
                    <span className="text-[11px] font-black text-emerald-300 block">
                      4. English, Oʻzbekcha &amp; ქართული (انگلیسی، ازبکی و گرجی):
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      🇬🇧 {item.row4EnglishMeaning}
                    </p>
                    <p className="text-xs font-bold text-emerald-200">
                      🇺🇿 Oʻzbekcha: {item.uzbekMeaning}
                    </p>
                    <p className="text-xs font-bold text-amber-200">
                      🇬🇪 ქართული: {item.georgianMeaning}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950" dir="ltr">
                  💡 {item.culturalNoteTg}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TRACK 2: ENGLISH COURSE VIA CYRILLIC & UZBEK                        */}
      {/* =================================================================== */}
      {activeTrack === 'english_via_cyrillic' && (
        <div className="grid grid-cols-1 gap-4" dir="ltr">
          {ENGLISH_VIA_CYRILLIC_LESSONS.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-3xl border-2 border-indigo-200 p-6 space-y-3 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-xl bg-indigo-100 text-indigo-950 font-black text-xs">
                  {lesson.badge}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      speakEnglish(lesson.en, 0.86);
                      onEarnLingous(15);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-black text-xs flex items-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 Hear English</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => speakRussian(lesson.tajikMeaning, 0.85)}
                    className="px-3 py-2 rounded-xl bg-cyan-100 hover:bg-cyan-200 text-cyan-950 font-black text-xs"
                  >
                    🔊 Тоҷикӣ / Русский
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <p className="text-base sm:text-lg font-black text-amber-300">🇬🇧 "{lesson.en}"</p>
                <p className="text-xs sm:text-sm font-mono text-cyan-300">
                  🗣️ Талаффузи Кириллӣ: [{lesson.cyrillicPron}]
                </p>
                <p className="text-xs sm:text-sm font-bold text-emerald-300">
                  🇹🇯 Тоҷикӣ: «{lesson.tajikMeaning}»
                </p>
                <p className="text-xs sm:text-sm font-bold text-indigo-200">
                  🇷🇺 Русский: «{lesson.russianMeaning}»
                </p>
                <p className="text-xs sm:text-sm font-bold text-amber-200">
                  🇺🇿 Oʻzbekcha: «{lesson.uzbekMeaning}»
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =================================================================== */}
      {/* TRACK 3: 35-LETTER ALPHABET BRIDGE, SWEET DICTIONARY & RUDAKI POETRY */}
      {/* =================================================================== */}
      {activeTrack === 'alphabet_dictionary_poetry' && (
        <div className="space-y-6">
          {/* Section A: Complete 35-Letter Tajik Cyrillic to Persian Alphabet Bridge */}
          <div className="bg-white rounded-3xl border-2 border-purple-500/40 p-6 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span>🔤 جدول کامل تطبیقی ۳۵ حرف سیریلیک تاجیکی با خط فارسی ایران (Алифбои Тоҷикӣ ⇄ Хати Форсӣ)</span>
                </h3>
                <p className="text-xs font-bold text-slate-600">
                  با کلیک روی هر حرف، تلفظ اصیل فارسی و تاجیکیِ واژهٔ نمونه را بشنوید (شامل ۶ حرف ویژه تاجیکی: Ғ, Ӣ, Қ, Ӯ, Ҳ, Ҷ)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2.5">
              {TAJIK_ALPHABET_BRIDGE.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    speakPersian(item.exampleFa, 0.85);
                    onEarnLingous(5);
                  }}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-purple-950 text-white border border-purple-400/40 transition-all text-center space-y-1 shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-1">
                    <span className="font-black text-cyan-300 text-base" dir="ltr">
                      {item.cyrillic}
                    </span>
                    <span className="font-black text-amber-300 text-base" dir="rtl">
                      {item.persian}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-emerald-200" dir="ltr">
                    {item.exampleTg}
                  </p>
                  <p className="text-xs font-black text-amber-200" dir="rtl">
                    {item.exampleFa}
                  </p>
                  <span className="text-[10px] text-slate-300 block">{item.soundHint}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section B: Sweet Tajik ⇄ Tehran Vocabulary Dictionary */}
          <div className="bg-gradient-to-br from-teal-950 to-slate-900 text-white rounded-3xl border-2 border-amber-400/60 p-6 space-y-4 shadow-lg">
            <h3 className="text-lg sm:text-xl font-black text-amber-300">
              🍯 فرهنگ واژگان شیرین و اصیل تاجیکی (سمرقند، بخارا و دوشنبه) ⇄ فارسی معاصر تهران
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SWEET_TAJIK_IRANIAN_DICTIONARY.map((entry, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/10 border border-amber-300/30 space-y-1.5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-black text-cyan-300" dir="ltr">
                        🇹🇯 {entry.tgCyrillic}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          speakPersian(entry.iranianFa, 0.86);
                          onEarnLingous(10);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-[11px]"
                      >
                        🔊 پخش صوتی
                      </button>
                    </div>
                    <p className="text-xs font-bold text-amber-200" dir="rtl">
                      📜 به خط فارسی: «{entry.tgPersianScript}» ⇄ در تهران: «{entry.iranianFa}»
                    </p>
                  </div>
                  <p className="text-[11px] text-emerald-200 pt-1 border-t border-white/10" dir="rtl">
                    💡 {entry.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section C: Rudaki Samarkandi & Ferdowsi Samanid Poetry Hall */}
          <div className="bg-white rounded-3xl border-2 border-amber-400 p-6 space-y-4 shadow-md">
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              👑 تالار شعر و ادب سامانیان: رودکی سمرقندی و فردوسی به دو خط فارسی و سیریلیک تاجیکی
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RUDAKI_SAMANID_POEMS.map((poem, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950 text-white border-2 border-amber-400/50 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-2">
                    <div>
                      <span className="text-xs font-black text-amber-300 block">{poem.poet}</span>
                      <span className="text-sm font-black text-white">{poem.title}</span>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          speakPersian(poem.faVerse, 0.82);
                          onEarnLingous(15);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs"
                      >
                        🔊 دکلمه فارسی
                      </button>
                      <button
                        type="button"
                        onClick={() => speakRussian(poem.tgVerse, 0.84)}
                        className="px-3 py-1.5 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs"
                      >
                        🔊 Тоҷикӣ
                      </button>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base font-black text-amber-200 whitespace-pre-line leading-relaxed" dir="rtl">
                    {poem.faVerse}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-cyan-200 whitespace-pre-line leading-relaxed" dir="ltr">
                    {poem.tgVerse}
                  </p>
                  <p className="text-xs text-slate-300 italic" dir="ltr">
                    🇬🇧 {poem.enMeaning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TRACK 4: LIVE CYRILLIC ⇄ PERSIAN SCRIPT CONVERTER                   */}
      {/* =================================================================== */}
      {activeTrack === 'script_converter' && (
        <div className="bg-white rounded-3xl border-2 border-teal-500 p-6 sm:p-8 space-y-4 shadow-md">
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            🔄 مبدل هوشمند خط سیریلیک تاجیکی به خط فارسی ایران (Табдилдиҳандаи Кириллӣ ба Хати Форсӣ)
          </h3>
          <input
            type="text"
            value={converterInput}
            onChange={(e) => setConverterInput(e.target.value)}
            dir="ltr"
            className="w-full px-4 py-3 rounded-2xl bg-slate-100 border-2 border-slate-300 font-bold text-sm text-slate-900"
          />
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-amber-300">🇮🇷 خروجی به خط فارسی ایران:</span>
              <button
                type="button"
                onClick={() => {
                  speakPersian(convertTajikCyrillicToPersianPreview(converterInput), 0.85);
                  onEarnLingous(15);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 شنیدن تلفظ فارسی ایران</span>
              </button>
            </div>
            <p className="text-xl sm:text-2xl font-black text-amber-300" dir="rtl">
              {convertTajikCyrillicToPersianPreview(converterInput)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
