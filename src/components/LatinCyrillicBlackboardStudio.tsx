import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Eraser,
  RotateCcw,
  Volume2,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  PenTool
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound, speakEnglish, speakPersian, speakRussian } from '../utils/audio';

interface EnglishLetterItem {
  id: string;
  upper: string;
  lower: string;
  pair: string;
  nameEn: string;
  nameFa: string;
  nameCyrillic: string;
  soundFa: string;
  soundCyrillic: string;
  exampleEn: string;
  exampleFa: string;
  exampleCyrillic: string;
  strokeTipFa: string;
  strokeTipCyrillic: string;
}

const ENGLISH_ALPHABET_ITEMS: EnglishLetterItem[] = [
  {
    id: 'en_a',
    upper: 'A',
    lower: 'a',
    pair: 'Aa',
    nameEn: 'A /eɪ/',
    nameFa: 'اِی (A)',
    nameCyrillic: 'Эй (A)',
    soundFa: 'صدای «اَ» (مثل Apple) یا «اِی» (مثل Age)',
    soundCyrillic: 'Садои «А / Э» (мисли Apple) ё «Эй» (мисли Age)',
    exampleEn: 'Apple • Amazing',
    exampleFa: 'Apple (سیب) • Amazing (شگفت‌انگیز)',
    exampleCyrillic: 'Apple (Себ) • Amazing (Ҳайратангез)',
    strokeTipFa: 'حرف بزرگ A با دو خط مایل از بالا به پایین و یک خط افقی در وسط؛ حرف کوچک a با یک حلقه در بین دو خط میانی و یک پایه عمودی.',
    strokeTipCyrillic: 'Ҳарфи калони A бо ду хати моил ва як хати уфуқӣ дар миёна навишта мешавад.'
  },
  {
    id: 'en_b',
    upper: 'B',
    lower: 'b',
    pair: 'Bb',
    nameEn: 'B /biː/',
    nameFa: 'بی (B)',
    nameCyrillic: 'Бӣ (B)',
    soundFa: 'صدای «ب» (مثل Book)',
    soundCyrillic: 'Садои «Б» (мисли Book)',
    exampleEn: 'Book • Bridge',
    exampleFa: 'Book (کتاب) • Bridge (پل)',
    exampleCyrillic: 'Book (Китоб) • Bridge (Пул)',
    strokeTipFa: 'یک خط عمودی از بالا تا خط کرسی و دو شکم گرد به سمت راست برای B بزرگ؛ یک خط بلند و یک شکم پایین به راست برای b کوچک.',
    strokeTipCyrillic: 'Хати рост аз боло ба поён ва ду нимдоира ба тарафи рост барои B.'
  },
  {
    id: 'en_c',
    upper: 'C',
    lower: 'c',
    pair: 'Cc',
    nameEn: 'C /siː/',
    nameFa: 'سی (C)',
    nameCyrillic: 'Сӣ (C)',
    soundFa: 'صدای «ک» (مثل Cat) یا «س» (قبل از e, i, y مثل City)',
    soundCyrillic: 'Садои «К» (мисли Cat) ё «С» (мисли City)',
    exampleEn: 'Cat • City • Carpet',
    exampleFa: 'Cat (گربه) • City (شهر) • Carpet (فرش)',
    exampleCyrillic: 'Cat (Гурба) • City (Шаҳр) • Carpet (Қолин)',
    strokeTipFa: 'یک کمان باز به سمت راست (شبیه هلال ماه). شکل بزرگ C و کوچک c یکسان است اما c کوچک بین دو خط میانی قرار می‌گیرد.',
    strokeTipCyrillic: 'Камони кушода ба тарафи рост; шакли калон ва хурди C якхела аст.'
  },
  {
    id: 'en_d',
    upper: 'D',
    lower: 'd',
    pair: 'Dd',
    nameEn: 'D /diː/',
    nameFa: 'دی (D)',
    nameCyrillic: 'Дӣ (D)',
    soundFa: 'صدای «د» (مثل Door)',
    soundCyrillic: 'Садои «Д» (мисли Door)',
    exampleEn: 'Door • Dream',
    exampleFa: 'Door (در) • Dream (رویا)',
    exampleCyrillic: 'Door (Дар) • Dream (Орзу)',
    strokeTipFa: 'خط عمودی سمت چپ و یک کمان بزرگ به راست برای D؛ برای d کوچک، حلقه گرد سمت چپ خط عمودی قرار می‌گیرد (برعکس b).',
    strokeTipCyrillic: 'Барои d хурд доира дар тарафи чапи хати عمودӣ қарор мегирад.'
  },
  {
    id: 'en_e',
    upper: 'E',
    lower: 'e',
    pair: 'Ee',
    nameEn: 'E /iː/',
    nameFa: 'ای (E)',
    nameCyrillic: 'Ӣ (E)',
    soundFa: 'صدای «اِ» (مثل Egg) یا «ای» کشیده (مثل Equal)',
    soundCyrillic: 'Садои «Э» (мисли Egg) ё «Ӣ» (мисли Equal)',
    exampleEn: 'English • Education',
    exampleFa: 'English (انگلیسی) • Education (آموزش)',
    exampleCyrillic: 'English (Англисӣ) • Education (Маориф)',
    strokeTipFa: 'یک ستون عمودی و سه خط افقی (بالا، وسط، پایین) برای E بزرگ؛ یک خط افقی کوتاه و چرخش نیم‌دایره برای e کوچک.',
    strokeTipCyrillic: 'Як хати عمودӣ ва се хати уфуқӣ барои E калон.'
  },
  {
    id: 'en_f',
    upper: 'F',
    lower: 'f',
    pair: 'Ff',
    nameEn: 'F /ɛf/',
    nameFa: 'اِف (F)',
    nameCyrillic: 'Эф (F)',
    soundFa: 'صدای «ف» (مثل Friend)',
    soundCyrillic: 'Садои «Ф» (мисли Friend)',
    exampleEn: 'Friend • Family',
    exampleFa: 'Friend (دوست) • Family (خانواده)',
    exampleCyrillic: 'Friend (Дӯст) • Family (Оила / Хонавода)',
    strokeTipFa: 'شبیه E بزرگ ولی بدون خط افقی پایینی؛ برای f کوچک، از بالا عصایی خمیده کشیده و خط افقی کوچکی در وسط بگذارید.',
    strokeTipCyrillic: 'Монанди E калон, вале бе хати поёнӣ.'
  },
  {
    id: 'en_g',
    upper: 'G',
    lower: 'g',
    pair: 'Gg',
    nameEn: 'G /dʒiː/',
    nameFa: 'جی (G)',
    nameCyrillic: 'Ҷӣ (G)',
    soundFa: 'صدای «گ» (مثل Good) یا «ج» (مثل Gem)',
    soundCyrillic: 'Садои «Г» (мисли Good) ё «Ҷ» (мисли Gem)',
    exampleEn: 'Gold • Garden',
    exampleFa: 'Gold (طلا) • Garden (باغ)',
    exampleCyrillic: 'Gold (Тилло) • Garden (Боғ)',
    strokeTipFa: 'کمان C بزرگ که در پایین با یک لبه افقی به درون می‌چرخد؛ حرف کوچک g دارای دنباله‌ای است که تا خط چهارم (پایین) می‌آید.',
    strokeTipCyrillic: 'Ҳарфи хурди g думчае дорад, ки аз хати асосӣ поёнтар мефарояд.'
  },
  {
    id: 'en_h',
    upper: 'H',
    lower: 'h',
    pair: 'Hh',
    nameEn: 'H /eɪtʃ/',
    nameFa: 'اِیچ (H)',
    nameCyrillic: 'Эйч (H)',
    soundFa: 'صدای «ه‍» (مثل Home)',
    soundCyrillic: 'Садои «Ҳ» (мисли Home)',
    exampleEn: 'Home • Heart • Hope',
    exampleFa: 'Home (خانه) • Heart (قلب) • Hope (امید)',
    exampleCyrillic: 'Home (Хона) • Heart (Қалб / Дил) • Hope (Умед)',
    strokeTipFa: 'دو ستون عمودی موازی با یک پل افقی در میان برای H بزرگ؛ یک دسته بلند و یک قوس به پایین برای h کوچک.',
    strokeTipCyrillic: 'Ду сутуни рост бо як хати уфуқӣ дар миёна барои H.'
  },
  {
    id: 'en_i',
    upper: 'I',
    lower: 'i',
    pair: 'Ii',
    nameEn: 'I /aɪ/',
    nameFa: 'آی (I)',
    nameCyrillic: 'Ай (I)',
    soundFa: 'صدای «ای» کوتاه (مثل In) یا «آی» (مثل Ice)',
    soundCyrillic: 'Садои «И» (мисли In) ё «Ай» (мисли Ice)',
    exampleEn: 'Iran • Idea • Ice',
    exampleFa: 'Iran (ایران) • Idea (ایده) • Ice (یخ)',
    exampleCyrillic: 'Iran (Эрон) • Idea (Идея / Андеша) • Ice (Ях)',
    strokeTipFa: 'یک خط عمودی صاف برای I بزرگ؛ یک خط کوتاه با یک نقطه در بالا برای i کوچک.',
    strokeTipCyrillic: 'Хати рост барои I калон ва хати кӯтоҳ бо нуқта дар боло барои i хурд.'
  },
  {
    id: 'en_j',
    upper: 'J',
    lower: 'j',
    pair: 'Jj',
    nameEn: 'J /dʒeɪ/',
    nameFa: 'جِی (J)',
    nameCyrillic: 'Ҷей (J)',
    soundFa: 'صدای «ج» (مثل Joy)',
    soundCyrillic: 'Садои «Ҷ» (мисли Joy)',
    exampleEn: 'Joy • Justice',
    exampleFa: 'Joy (شادی) • Justice (عدالت)',
    exampleCyrillic: 'Joy (Шодӣ) • Justice (Адолат)',
    strokeTipFa: 'قلاب عصایی به سمت چپ؛ حرف کوچک j از خط میانی شروع شده و قلاب آن تا خط چهارم پایین می‌آید و نقطه دارد.',
    strokeTipCyrillic: 'Ҳарфи j бо қалмоқча ба поён ва як нуқта дар боло навишта мешавад.'
  },
  {
    id: 'en_k',
    upper: 'K',
    lower: 'k',
    pair: 'Kk',
    nameEn: 'K /keɪ/',
    nameFa: 'کِی (K)',
    nameCyrillic: 'Кей (K)',
    soundFa: 'صدای «ک» (مثل Kind)',
    soundCyrillic: 'Садои «К» (мисли Kind)',
    exampleEn: 'Kind • Knowledge',
    exampleFa: 'Kind (مهربان) • Knowledge (دانش)',
    exampleCyrillic: 'Kind (Меҳрубон) • Knowledge (Дониш)',
    strokeTipFa: 'یک خط عمودی در چپ و دو بازوی زاویه‌دار که به وسط آن می‌رسند (توجه: در واژه Knowledge حرف K نوشته می‌شود ولی خوانده نمی‌شود).',
    strokeTipCyrillic: 'Як хати рост ва ду хати кунҷӣ ба тарафи рост.'
  },
  {
    id: 'en_l',
    upper: 'L',
    lower: 'l',
    pair: 'Ll',
    nameEn: 'L /ɛl/',
    nameFa: 'اِل (L)',
    nameCyrillic: 'Эл (L)',
    soundFa: 'صدای «ل» (مثل Love)',
    soundCyrillic: 'Садои «Л» (мисли Love)',
    exampleEn: 'Love • Light • Learn',
    exampleFa: 'Love (عشق و مهر) • Light (نور) • Learn (آموختن)',
    exampleCyrillic: 'Love (Меҳру муҳаббат) • Light (Нур) • Learn (Омӯхтан)',
    strokeTipFa: 'یک خط عمودی بلند و یک خط افقی روی خط کرسی برای L بزرگ؛ یک خط عمودی ساده برای l کوچک.',
    strokeTipCyrillic: 'Хати عمودӣ ва хати уфуқӣ дар поён барои L калон.'
  },
  {
    id: 'en_m',
    upper: 'M',
    lower: 'm',
    pair: 'Mm',
    nameEn: 'M /ɛm/',
    nameFa: 'اِم (M)',
    nameCyrillic: 'Эм (M)',
    soundFa: 'صدای «م» (مثل Mother)',
    soundCyrillic: 'Садои «М» (мисли Mother)',
    exampleEn: 'Mother • Music',
    exampleFa: 'Mother (مادر) • Music (موسیقی)',
    exampleCyrillic: 'Mother (Модар) • Music (Мусиқӣ)',
    strokeTipFa: 'دو قله تیز برای M بزرگ؛ دو تپه گرد پیوسته بین خط میانی و خط کرسی برای m کوچک.',
    strokeTipCyrillic: 'Ду қулла барои M калон ва ду камони пайваста барои m хурд.'
  },
  {
    id: 'en_n',
    upper: 'N',
    lower: 'n',
    pair: 'Nn',
    nameEn: 'N /ɛn/',
    nameFa: 'اِن (N)',
    nameCyrillic: 'Эн (N)',
    soundFa: 'صدای «ن» (مثل Night)',
    soundCyrillic: 'Садои «Н» (мисли Night)',
    exampleEn: 'Name • Nature',
    exampleFa: 'Name (نام) • Nature (طبیعت)',
    exampleCyrillic: 'Name (Ном) • Nature (Табиат)',
    strokeTipFa: 'دو خط عمودی که با یک خط مورب از چپ-بالا به راست-پایین وصل می‌شوند؛ یک قوس برای n کوچک.',
    strokeTipCyrillic: 'Ду хати рост бо як хати моил дар миёна барои N калон.'
  },
  {
    id: 'en_o',
    upper: 'O',
    lower: 'o',
    pair: 'Oo',
    nameEn: 'O /oʊ/',
    nameFa: 'اُو (O)',
    nameCyrillic: 'Оу (O)',
    soundFa: 'صدای «اُ / آ» یا «اُو» (مثل Open)',
    soundCyrillic: 'Садои «О / Оу» (мисли Open)',
    exampleEn: 'Open • Ocean',
    exampleFa: 'Open (باز) • Ocean (اقیانوس)',
    exampleCyrillic: 'Open (Кушода / Боз) • Ocean (Уқёнус)',
    strokeTipFa: 'یک دایره بیضی‌شکل کامل از بالا به پادساعتگرد؛ O بزرگ دو خط بالا را پر می‌کند و o کوچک بین خط میانی و کرسی است.',
    strokeTipCyrillic: 'Доираи пурра барои O калон ва o хурд.'
  },
  {
    id: 'en_p',
    upper: 'P',
    lower: 'p',
    pair: 'Pp',
    nameEn: 'P /piː/',
    nameFa: 'پی (P)',
    nameCyrillic: 'Пӣ (P)',
    soundFa: 'صدای «پ» (مثل Peace)',
    soundCyrillic: 'Садои «П» (мисли Peace)',
    exampleEn: 'Peace • Persian',
    exampleFa: 'Peace (صلح و آرامش) • Persian (فارسی)',
    exampleCyrillic: 'Peace (Сулҳу оромӣ) • Persian (Форсӣ)',
    strokeTipFa: 'برای P بزرگ پایه روی خط کرسی می‌ایستد؛ برای p کوچک پایه تا خط چهارم پایین می‌آید.',
    strokeTipCyrillic: 'Пояи p хурд аз хати асосӣ ба поён мефарояд.'
  },
  {
    id: 'en_q',
    upper: 'Q',
    lower: 'q',
    pair: 'Qq',
    nameEn: 'Q /kjuː/',
    nameFa: 'کیو (Q)',
    nameCyrillic: 'Кю (Q)',
    soundFa: 'صدای «کو» (همیشه همراه u مثل Queen)',
    soundCyrillic: 'Садои «Кв» (ҳамеша бо u мисли Queen)',
    exampleEn: 'Queen • Quality',
    exampleFa: 'Queen (ملکه) • Quality (کیفیت)',
    exampleCyrillic: 'Queen (Малика) • Quality (Сифат)',
    strokeTipFa: 'یک دایره O بزرگ با یک خط کوچک مورب در پایین راست؛ حرف کوچک q برعکس p است و پایه آن به راست است.',
    strokeTipCyrillic: 'Доираи O бо як хатча дар поёни рост барои Q.'
  },
  {
    id: 'en_r',
    upper: 'R',
    lower: 'r',
    pair: 'Rr',
    nameEn: 'R /ɑːr/',
    nameFa: 'آر (R)',
    nameCyrillic: 'Ар (R)',
    soundFa: 'صدای «ر» نرم انگلیسی (مثل Rose)',
    soundCyrillic: 'Садои «Р» (мисли Rose)',
    exampleEn: 'Respect • River',
    exampleFa: 'Respect (احترام) • River (رودخانه)',
    exampleCyrillic: 'Respect (Эҳтиром) • River (Дарё / Рӯд)',
    strokeTipFa: 'مانند P بزرگ به‌علاوه یک پای مایل به راست؛ برای r کوچک یک پایه کوتاه و یک شاخه کوچک در بالا.',
    strokeTipCyrillic: 'Монанди P бо як пояи моил дар поён барои R калон.'
  },
  {
    id: 'en_s',
    upper: 'S',
    lower: 's',
    pair: 'Ss',
    nameEn: 'S /ɛs/',
    nameFa: 'اِس (S)',
    nameCyrillic: 'Эс (S)',
    soundFa: 'صدای «س» (مثل Sun) یا گاهی «ز» در پایان واژه',
    soundCyrillic: 'Садои «С» (мисли Sun)',
    exampleEn: 'Sun • Smile • Silk',
    exampleFa: 'Sun (خورشید) • Smile (لبخند) • Silk (ابریشم)',
    exampleCyrillic: 'Sun (Хуршед / Офтоб) • Smile (Табассум) • Silk (Абрешим)',
    strokeTipFa: 'منحنی موج‌دار شبیه مار؛ شکل S بزرگ و s کوچک یکسان است.',
    strokeTipCyrillic: 'Хати мавҷнок барои S калон ва s хурд.'
  },
  {
    id: 'en_t',
    upper: 'T',
    lower: 't',
    pair: 'Tt',
    nameEn: 'T /tiː/',
    nameFa: 'تی (T)',
    nameCyrillic: 'Тӣ (T)',
    soundFa: 'صدای «ت» (مثل Time)',
    soundCyrillic: 'Садои «Т» (мисли Time)',
    exampleEn: 'Time • Teacher',
    exampleFa: 'Time (زمان) • Teacher (معلم / استاد)',
    exampleCyrillic: 'Time (Вақт / Замон) • Teacher (Омӯзгор / Устод)',
    strokeTipFa: 'یک سقف افقی در بالا و یک ستون عمودی در وسط برای T بزرگ؛ یک صلیب کوچک برای t کوچک.',
    strokeTipCyrillic: 'Боми уфуқӣ ва сутуни рост дар миёна барои T калон.'
  },
  {
    id: 'en_u',
    upper: 'U',
    lower: 'u',
    pair: 'Uu',
    nameEn: 'U /juː/',
    nameFa: 'یو (U)',
    nameCyrillic: 'Ю (U)',
    soundFa: 'صدای «آ» کوتاه (مثل Up) یا «یو» (مثل Unity)',
    soundCyrillic: 'Садои «А» кӯтоҳ (мисли Up) ё «Ю» (мисли Unity)',
    exampleEn: 'Unity • University',
    exampleFa: 'Unity (اتحاد و همبستگی) • University (دانشگاه)',
    exampleCyrillic: 'Unity (Иттиҳод ва Ҳамбастагӣ) • University (Донишгоҳ)',
    strokeTipFa: 'جام نعل‌اسبی رو به بالا؛ برای u کوچک یک پایه عمودی کوتاه در سمت راست اضافه می‌شود.',
    strokeTipCyrillic: 'Шакли наъл ба тарафи боло барои U.'
  },
  {
    id: 'en_v',
    upper: 'V',
    lower: 'v',
    pair: 'Vv',
    nameEn: 'V /viː/',
    nameFa: 'وی (V)',
    nameCyrillic: 'Вӣ (V)',
    soundFa: 'صدای «و» لب‌ودندانی (مثل Victory)',
    soundCyrillic: 'Садои «В» (мисли Victory)',
    exampleEn: 'Victory • Voice',
    exampleFa: 'Victory (پیروزی) • Voice (صدا)',
    exampleCyrillic: 'Victory (Пирӯзӣ / Ғалаба) • Voice (Садо / Овоз)',
    strokeTipFa: 'دو خط مورب که در پایین به شکل عدد ۷ فارسی به هم می‌رسند.',
    strokeTipCyrillic: 'Ду хати моил, ки дар поён ба ҳам мерасанд.'
  },
  {
    id: 'en_w',
    upper: 'W',
    lower: 'w',
    pair: 'Ww',
    nameEn: 'W /ˈdʌbəl.juː/',
    nameFa: 'دابلیو (W)',
    nameCyrillic: 'Дабл-ю (W)',
    soundFa: 'صدای «و» با غنچه شدن لب‌ها (مثل Water)',
    soundCyrillic: 'Садои «В / У» бо лабҳо (мисли Water)',
    exampleEn: 'Water • World • Wisdom',
    exampleFa: 'Water (آب) • World (جهان) • Wisdom (خرد)',
    exampleCyrillic: 'Water (Об) • World (Ҷаҳон) • Wisdom (Хирад)',
    strokeTipFa: 'دو حرف V به هم چسبیده؛ در تلفظ W لب‌ها گرد می‌شوند و دندان بالا به لب پایین نمی‌خورد.',
    strokeTipCyrillic: 'Ду ҳарфи V пайваста ба ҳам.'
  },
  {
    id: 'en_x',
    upper: 'X',
    lower: 'x',
    pair: 'Xx',
    nameEn: 'X /ɛks/',
    nameFa: 'اِکس (X)',
    nameCyrillic: 'Экс (X)',
    soundFa: 'صدای «کس» (مثل Box)',
    soundCyrillic: 'Садои «Кс» (мисли Box)',
    exampleEn: 'Box • Example',
    exampleFa: 'Box (جعبه) • Example (مثال)',
    exampleCyrillic: 'Box (Қуттӣ) • Example (Мисол / Намуна)',
    strokeTipFa: 'دو خط متقاطع ضربدری که از مرکز یکدیگر رد می‌شوند.',
    strokeTipCyrillic: 'Ду хати متقاطع ба шакли зарб.'
  },
  {
    id: 'en_y',
    upper: 'Y',
    lower: 'y',
    pair: 'Yy',
    nameEn: 'Y /waɪ/',
    nameFa: 'وای (Y)',
    nameCyrillic: 'Вай (Y)',
    soundFa: 'صدای «ی» (مثل Yes) یا «آی / ای» در پایان کلمه (مثل Sky / City)',
    soundCyrillic: 'Садои «Й» (мисли Yes) ё «Ай / Ӣ» (мисли Sky / City)',
    exampleEn: 'Yes • Youth',
    exampleFa: 'Yes (بله) • Youth (جوانی)',
    exampleCyrillic: 'Yes (Бале / Ҳа) • Youth (Ҷавонӣ)',
    strokeTipFa: 'شاخه دوشاخه در بالا و پایه عمودی در پایین برای Y بزرگ؛ دنباله y کوچک تا خط چهارم پایین می‌آید.',
    strokeTipCyrillic: 'Думчаи y хурд то хати чорум поён мефарояд.'
  },
  {
    id: 'en_z',
    upper: 'Z',
    lower: 'z',
    pair: 'Zz',
    nameEn: 'Z /ziː/',
    nameFa: 'زی / زِد (Z)',
    nameCyrillic: 'Зӣ / Зед (Z)',
    soundFa: 'صدای «ز» (مثل Zero)',
    soundCyrillic: 'Садои «З» (мисли Zero)',
    exampleEn: 'Zero • Zone',
    exampleFa: 'Zero (صفر) • Zone (منطقه)',
    exampleCyrillic: 'Zero (Сифр) • Zone (Минтақа)',
    strokeTipFa: 'خط افقی بالا، خط مورب به چپ-پایین، و خط افقی روی خط کرسی.',
    strokeTipCyrillic: 'Хати уфуқӣ дар боло, хати моил ва хати уфуқӣ дар поён.'
  }
];

interface TajikCyrillicBoardItem {
  id: string;
  cyrillicPair: string;
  persianEq: string;
  englishEq: string;
  exampleTg: string;
  exampleFa: string;
  exampleEn: string;
  soundHintFa: string;
  soundHintTg: string;
}

const TAJIK_CYRILLIC_BOARD_ITEMS: TajikCyrillicBoardItem[] = [
  { id: 'tg_a', cyrillicPair: 'А а', persianEq: 'اَ / آ', englishEq: 'A a', exampleTg: 'Абр • Самарқанд', exampleFa: 'ابر • سمرقند', exampleEn: 'Cloud • Samarkand', soundHintFa: 'صدای فتحه و الف (a)', soundHintTg: 'Садои «А» (Абр, Самарқанд)' },
  { id: 'tg_b', cyrillicPair: 'Б б', persianEq: 'ب', englishEq: 'B b', exampleTg: 'Бародар • Бухоро', exampleFa: 'برادر • بخارا', exampleEn: 'Brother • Bukhara', soundHintFa: 'حرف ب (b)', soundHintTg: 'Ҳарфи «Б» (Бародар, Бухоро)' },
  { id: 'tg_v', cyrillicPair: 'В в', persianEq: 'و', englishEq: 'V v', exampleTg: 'Ватан • Вафо', exampleFa: 'وطن • وفا', exampleEn: 'Homeland • Loyalty', soundHintFa: 'حرف و (v)', soundHintTg: 'Ҳарфи «В» (Ватан)' },
  { id: 'tg_g', cyrillicPair: 'Г г', persianEq: 'گ', englishEq: 'G g', exampleTg: 'Гул • Гуфтор', exampleFa: 'گل • گفتار', exampleEn: 'Flower • Speech', soundHintFa: 'حرف گ (g)', soundHintTg: 'Ҳарфи «Г» (Гул)' },
  { id: 'tg_gh', cyrillicPair: 'Ғ ғ', persianEq: 'غ', englishEq: 'Gh gh', exampleTg: 'Ғазал • Ғурур', exampleFa: 'غزل • غرور', exampleEn: 'Ghazal • Pride', soundHintFa: 'حرف ویژه تاجیکی: غ (gh)', soundHintTg: 'Ҳарфи хоси тоҷикӣ «Ғ» (Ғазал)' },
  { id: 'tg_d', cyrillicPair: 'Д д', persianEq: 'د', englishEq: 'D d', exampleTg: 'Дӯст • Душанбе', exampleFa: 'دوست • دوشنبه', exampleEn: 'Friend • Dushanbe', soundHintFa: 'حرف د (d)', soundHintTg: 'Ҳарфи «Д» (Дӯст, Душанбе)' },
  { id: 'tg_e', cyrillicPair: 'Е е', persianEq: 'اِ / ـه', englishEq: 'E e / Ye', exampleTg: 'Меҳр • Теҳрон', exampleFa: 'مهر • تهران', exampleEn: 'Kindness • Tehran', soundHintFa: 'صدای کسره کشیده (e)', soundHintTg: 'Ҳарфи «Е» (Меҳр, Теҳрон)' },
  { id: 'tg_yo', cyrillicPair: 'Ё ё', persianEq: 'یا', englishEq: 'Yo / Ya', exampleTg: 'Ёр • Сиёвуш', exampleFa: 'یار • سیاوش', exampleEn: 'Beloved • Siavash', soundHintFa: 'ترکیب یا (yo/yā)', soundHintTg: 'Ҳарфи «Ё» (Ёр, Сиёвуш)' },
  { id: 'tg_zh', cyrillicPair: 'Ж ж', persianEq: 'ژ', englishEq: 'Zh zh', exampleTg: 'Жола • Пажӯҳиш', exampleFa: 'ژاله • پژوهش', exampleEn: 'Dew • Research', soundHintFa: 'حرف ژ (zh)', soundHintTg: 'Ҳарфи «Ж» (Жола)' },
  { id: 'tg_z', cyrillicPair: 'З з', persianEq: 'ز / ذ / ض / ظ', englishEq: 'Z z', exampleTg: 'Забон • Замин', exampleFa: 'زبان • زمین', exampleEn: 'Language • Earth', soundHintFa: 'صدای ز (z)', soundHintTg: 'Ҳарфи «З» (Забон)' },
  { id: 'tg_i', cyrillicPair: 'И и', persianEq: 'اِ / ی', englishEq: 'I i', exampleTg: 'Ишқ • Исмоил', exampleFa: 'عشق • اسماعیل', exampleEn: 'Love • Ismail', soundHintFa: 'صدای ای کوتاه (i)', soundHintTg: 'Ҳарфи «И» (Ишқ)' },
  { id: 'tg_ii', cyrillicPair: 'Ӣ ӣ', persianEq: 'ی (پایان واژه)', englishEq: 'Ī ī', exampleTg: 'Тоҷикӣ • Эронӣ • Форсӣ', exampleFa: 'تاجیکی • ایرانی • فارسی', exampleEn: 'Tajik • Iranian • Persian', soundHintFa: 'ی کشیده در پایان کلمه (ī)', soundHintTg: 'Ҳарфи хоси «Ӣ» дар охири калима (Тоҷикӣ, Форсӣ)' },
  { id: 'tg_y', cyrillicPair: 'Й й', persianEq: 'ی (صامت)', englishEq: 'Y y', exampleTg: 'Пайванд • Майдон', exampleFa: 'پیوند • میدان', exampleEn: 'Bond • Square', soundHintFa: 'ی صامت (y)', soundHintTg: 'Ҳарфи «Й» (Пайванд)' },
  { id: 'tg_k', cyrillicPair: 'К к', persianEq: 'ک', englishEq: 'K k', exampleTg: 'Китоб • Кабир', exampleFa: 'کتاب • کبیر', exampleEn: 'Book • Great', soundHintFa: 'حرف ک (k)', soundHintTg: 'Ҳарфи «К» (Китоб)' },
  { id: 'tg_q', cyrillicPair: 'Қ қ', persianEq: 'ق', englishEq: 'Q q', exampleTg: 'Қалб • Қолин', exampleFa: 'قلب • قالی', exampleEn: 'Heart • Carpet', soundHintFa: 'حرف ویژه تاجیکی: ق (q)', soundHintTg: 'Ҳарфи хоси тоҷикӣ «Қ» (Қалб, Қолин)' },
  { id: 'tg_l', cyrillicPair: 'Л л', persianEq: 'ل', englishEq: 'L l', exampleTg: 'Лабханд • Лола', exampleFa: 'لبخند • لاله', exampleEn: 'Smile • Tulip', soundHintFa: 'حرف ل (l)', soundHintTg: 'Ҳарфи «Л» (Лабханд)' },
  { id: 'tg_m', cyrillicPair: 'М м', persianEq: 'م', englishEq: 'M m', exampleTg: 'Модар • Меҳан', exampleFa: 'مادر • میهن', exampleEn: 'Mother • Homeland', soundHintFa: 'حرف م (m)', soundHintTg: 'Ҳарфи «М» (Модар)' },
  { id: 'tg_n', cyrillicPair: 'Н н', persianEq: 'ن', englishEq: 'N n', exampleTg: 'Нон • Наврӯз', exampleFa: 'نان • نوروز', exampleEn: 'Bread • Nowruz', soundHintFa: 'حرف ن (n)', soundHintTg: 'Ҳарфи «Н» (Нон, Наврӯз)' },
  { id: 'tg_o', cyrillicPair: 'О о', persianEq: 'آ', englishEq: 'O o / Ā', exampleTg: 'Офтоб • Озодӣ', exampleFa: 'آفتاب • آزادی', exampleEn: 'Sunshine • Freedom', soundHintFa: 'صدای آ کشیده (ā)', soundHintTg: 'Ҳарфи «О» баробари «آ» дар форсӣ (Офтоб)' },
  { id: 'tg_p', cyrillicPair: 'П п', persianEq: 'پ', englishEq: 'P p', exampleTg: 'Падар • Пойтахт', exampleFa: 'پدر • پایتخت', exampleEn: 'Father • Capital', soundHintFa: 'حرف پ (p)', soundHintTg: 'Ҳарфи «П» (Падар)' },
  { id: 'tg_r', cyrillicPair: 'Р р', persianEq: 'ر', englishEq: 'R r', exampleTg: 'Рӯдакӣ • Реша', exampleFa: 'رودکی • ریشه', exampleEn: 'Rudaki • Root', soundHintFa: 'حرف ر (r)', soundHintTg: 'Ҳарфи «Р» (Рӯдакӣ, Реша)' },
  { id: 'tg_s', cyrillicPair: 'С с', persianEq: 'س / ث / ص', englishEq: 'S s', exampleTg: 'Салом • Сомонӣ', exampleFa: 'سلام • سامانی', exampleEn: 'Hello • Samanid', soundHintFa: 'صدای س (s)', soundHintTg: 'Ҳарфи «С» (Салом)' },
  { id: 'tg_t', cyrillicPair: 'Т т', persianEq: 'ت / ط', englishEq: 'T t', exampleTg: 'Тоҷикистон • Тавоно', exampleFa: 'تاجیکستان • توانا', exampleEn: 'Tajikistan • Mighty', soundHintFa: 'صدای ت (t)', soundHintTg: 'Ҳарфи «Т» (Тоҷикистон, Тавоно)' },
  { id: 'tg_u', cyrillicPair: 'У у', persianEq: 'اُ / و کوتاه', englishEq: 'U u', exampleTg: 'Умед • Гулистон', exampleFa: 'امید • گلستان', exampleEn: 'Hope • Rose Garden', soundHintFa: 'صدای اُ / و کوتاه (u)', soundHintTg: 'Ҳарфи «У» (Умед)' },
  { id: 'tg_uu', cyrillicPair: 'Ӯ ӯ', persianEq: 'و کشیده (او)', englishEq: 'Ū ū', exampleTg: 'Дӯст • Рӯзгор', exampleFa: 'دوست • روزگار', exampleEn: 'Friend • Life/Era', soundHintFa: 'حرف ویژه تاجیکی: او کشیده (ū)', soundHintTg: 'Ҳарфи хоси «Ӯ» (Дӯст, Рӯзгор)' },
  { id: 'tg_f', cyrillicPair: 'Ф ф', persianEq: 'ف', englishEq: 'F f', exampleTg: 'Фарҳанг • Фирдавсӣ', exampleFa: 'فرهنگ • فردوسی', exampleEn: 'Culture • Ferdowsi', soundHintFa: 'حرف ف (f)', soundHintTg: 'Ҳарфи «Ф» (Фарҳанг)' },
  { id: 'tg_kh', cyrillicPair: 'Х х', persianEq: 'خ', englishEq: 'Kh kh', exampleTg: 'Хона • Хуршед', exampleFa: 'خانه • خورشید', exampleEn: 'Home • Sun', soundHintFa: 'حرف خ (kh)', soundHintTg: 'Ҳарфи «Х» (Хона)' },
  { id: 'tg_h', cyrillicPair: 'Ҳ ҳ', persianEq: 'ه / ح', englishEq: 'H h', exampleTg: 'Ҳамреша • Ҳофиз', exampleFa: 'هم‌ریشه • حافظ', exampleEn: 'Kindred • Hafez', soundHintFa: 'حرف ویژه تاجیکی: ه/ح (h)', soundHintTg: 'Ҳарфи хоси «Ҳ» (Ҳамреша, Ҳофиз)' },
  { id: 'tg_ch', cyrillicPair: 'Ч ч', persianEq: 'چ', englishEq: 'Ch ch', exampleTg: 'Чашм • Чаман', exampleFa: 'چشم • چمن', exampleEn: 'Eye • Meadow', soundHintFa: 'حرف چ (ch)', soundHintTg: 'Ҳарфи «Ч» (Чашм)' },
  { id: 'tg_j', cyrillicPair: 'Ҷ ҷ', persianEq: 'ج', englishEq: 'J j', exampleTg: 'Ҷон • Тоҷик', exampleFa: 'جان • تاجیک', exampleEn: 'Soul • Tajik', soundHintFa: 'حرف ویژه تاجیکی: ج (j)', soundHintTg: 'Ҳарфи хоси «Ҷ» (Ҷон, Тоҷик)' },
  { id: 'tg_sh', cyrillicPair: 'Ш ш', persianEq: 'ش', englishEq: 'Sh sh', exampleTg: 'Шаҳр • Ширин', exampleFa: 'شهر • شیرین', exampleEn: 'City • Sweet', soundHintFa: 'حرف ش (sh)', soundHintTg: 'Ҳарфи «Ш» (Шаҳр, Ширин)' },
  { id: 'tg_ain', cyrillicPair: 'Ъ ъ', persianEq: 'ع / ء', englishEq: '’ (Glottal)', exampleTg: 'Шеър • Маъно', exampleFa: 'شعر • معنا', exampleEn: 'Poetry • Meaning', soundHintFa: 'حرف ع و همزه (’)', soundHintTg: 'Аломати сакта «Ъ» баробари «ع» (Шеър)' },
  { id: 'tg_ee', cyrillicPair: 'Э э', persianEq: 'ایـ / اِ', englishEq: 'E e', exampleTg: 'Эрон • Эҳтиром', exampleFa: 'ایران • احترام', exampleEn: 'Iran • Respect', soundHintFa: 'ایـ در ابتدای واژه (E)', soundHintTg: 'Ҳарфи «Э» дар аввали калима (Эрон)' },
  { id: 'tg_yu', cyrillicPair: 'Ю ю', persianEq: 'یو', englishEq: 'Yu yu', exampleTg: 'Юсуф', exampleFa: 'یوسف', exampleEn: 'Yusuf / Joseph', soundHintFa: 'ترکیب یو (yu)', soundHintTg: 'Ҳарфи «Ю» (Юсуф)' },
  { id: 'tg_ya', cyrillicPair: 'Я я', persianEq: 'یَ / یک', englishEq: 'Ya ya', exampleTg: 'Як • Ягона', exampleFa: 'یک • یگانه', exampleEn: 'One • Unique', soundHintFa: 'ترکیب یَ (ya)', soundHintTg: 'Ҳарфи «Я» (Як, Ягона)' }
];

interface LatinCyrillicBlackboardStudioProps {
  mode: 'english_for_persian' | 'tajik_cyrillic_english';
  onEarnLingous: (amount: number) => void;
}

export const LatinCyrillicBlackboardStudio: React.FC<LatinCyrillicBlackboardStudioProps> = ({
  mode,
  onEarnLingous
}) => {
  // For Tajik mode, user can toggle between practicing Tajik Cyrillic (А-Я), English (A-Z), or Persian Equivalent on the board
  const [boardScriptTab, setBoardScriptTab] = useState<'english_az' | 'tajik_cyrillic' | 'persian_script'>(
    mode === 'tajik_cyrillic_english' ? 'tajik_cyrillic' : 'english_az'
  );

  const [enIndex, setEnIndex] = useState<number>(0);
  const [tgIndex, setTgIndex] = useState<number>(0);
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const [chalkColor, setChalkColor] = useState<string>('#ffffff');
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [strokeCount, setStrokeCount] = useState<number>(0);
  const [practicedIds, setPracticedIds] = useState<string[]>([]);

  // Smart Auto-Type Ink-to-Text state (requested by Founder so drawing a letter automatically types it in standard size and clears the big stroke)
  const [autoTypeEnabled, setAutoTypeEnabled] = useState<boolean>(true);
  const [autoAdvanceNext, setAutoAdvanceNext] = useState<boolean>(true);
  const [useLowercaseInAutoType, setUseLowercaseInAutoType] = useState<boolean>(false);
  const [typedBoardText, setTypedBoardText] = useState<string>('');
  const [lastTypedFlash, setLastTypedFlash] = useState<string | null>(null);
  const [targetDictationWord, setTargetDictationWord] = useState<string>('FRIEND');
  const [showFullSentenceInTopBar, setShowFullSentenceInTopBar] = useState<boolean>(true);
  const [sentenceOrderErrorFa, setSentenceOrderErrorFa] = useState<string | null>(null);

  const TARGET_SENTENCES_MAP: Record<
    string,
    {
      fullSentence: string;
      colloquialFa: string;
      blocks: string[];
    }
  > = {
    FRIEND: {
      fullSentence: "Hey buddy, you're a true friend!",
      colloquialFa: 'ایول رفیق، تو یه دوست واقعی و بامرامی!',
      blocks: ['Hey buddy,', "you're", 'a true', 'friend!']
    },
    APPLE: {
      fullSentence: "Grab an apple, it's super fresh!",
      colloquialFa: 'یه سیب بردار، خیلی تازه و آبداره!',
      blocks: ['Grab', 'an apple,', "it's super", 'fresh!']
    },
    KNOWLEDGE: {
      fullSentence: 'Real street knowledge opens every door!',
      colloquialFa: 'تجربه و دانش واقعی هر دری رو به روت باز می‌کنه!',
      blocks: ['Real street', 'knowledge', 'opens', 'every door!']
    },
    PEACE: {
      fullSentence: 'Take it easy man, peace and love!',
      colloquialFa: 'سخت نگیر بابا، دلت آروم و لبت خندون باشه!',
      blocks: ['Take it easy', 'man,', 'peace', 'and love!']
    },
    CARPET: {
      fullSentence: 'This Persian carpet is a total masterpiece!',
      colloquialFa: 'این فرش دستباف ایرانی واقعاً یه شاهکاره!',
      blocks: ['This Persian', 'carpet', 'is a total', 'masterpiece!']
    },
    САЛОМ: {
      fullSentence: 'Салом дӯстам, аҳволат чӣ хел аст?',
      colloquialFa: 'سلام رفیق، حال و احوالت چطوره؟ همه چی میزونه؟',
      blocks: ['Салом', 'дӯстам,', 'аҳволат', 'чӣ хел аст?']
    },
    ДӮСТ: {
      fullSentence: 'Дӯсти хуб дар рӯзи сахт маълум мешавад!',
      colloquialFa: 'رفیق خوب و بامرام تو روز سخت معلوم میشه!',
      blocks: ['Дӯсти хуб', 'дар рӯзи сахт', 'маълум', 'мешавад!']
    },
    ТОҶИК: {
      fullSentence: 'Мо тоҷику эронӣ ҳама аз як решаем!',
      colloquialFa: 'ما تاجیک و ایرانی همه از یک ریشه و یک خانواده‌ایم!',
      blocks: ['Мо тоҷику', 'эронӣ', 'ҳама аз', 'як решаем!']
    },
    САМАРҚАНД: {
      fullSentence: 'Самарқанду Бухоро гавҳари тамаддуни мост!',
      colloquialFa: 'سمرقند و بخارا نگین تمدن و فرهنگ مشترک ماست!',
      blocks: ['Самарқанду', 'Бухоро', 'гавҳари', 'тамаддуни мост!']
    },
    ЭРОН: {
      fullSentence: 'Имрӯзҳо дар Эрон ҳама худмонӣ гап мезананд!',
      colloquialFa: 'این روزا تو ایران همه خیلی خودمانی و گرم صحبت می‌کنن!',
      blocks: ['Имрӯзҳо', 'дар Эрон', 'ҳама худмонӣ', 'гап мезананд!']
    },
    سلام: {
      fullSentence: 'سلام رفیق، حالت چطوره؟ همه چی میزونه؟',
      colloquialFa: 'احوال‌پرسی خودمانی و صمیمی در گفتار روزمره ایران',
      blocks: ['سلام رفیق،', 'حالت چطوره؟', 'همه چی', 'میزونه؟']
    },
    تهران: {
      fullSentence: 'این روزا تو تهران دستم یکم خالیه ولی دلم خوشه!',
      colloquialFa: 'کنایه خودمانی از وضع مالی («دستم خالیه») همراه با روحیه شاد',
      blocks: ['این روزا', 'تو تهران', 'دستم یکم خالیه', 'ولی دلم خوشه!']
    },
    خواهش: {
      fullSentence: 'خواهش می‌کنم رفیق، قابلی نداشت، دمت گرم!',
      colloquialFa: 'پاسخ گرم و خودمانی در تعارف و رفاقت روزمره',
      blocks: ['خواهش می‌کنم', 'رفیق،', 'قابلی نداشت،', 'دمت گرم!']
    },
    ایران: {
      fullSentence: 'هر جای ایران بری با آغوش باز تحویلت می‌گیرن!',
      colloquialFa: 'مهمان‌نوازی گرم و خودمانی مردم ایران',
      blocks: ['هر جای ایران', 'بری', 'با آغوش باز', 'تحویلت می‌گیرن!']
    },
    دوست: {
      fullSentence: 'دوست خوب مثل طلا می‌مونه، واقعاً سنگ تموم گذاشتی!',
      colloquialFa: 'تعریف صمیمانه و خودمانی از رفیق بامرام',
      blocks: ['دوست خوب', 'مثل طلا می‌مونه،', 'واقعاً', 'سنگ تموم گذاشتی!']
    }
  };

  const activeTargetSentenceData = TARGET_SENTENCES_MAP[targetDictationWord] || {
    fullSentence: targetDictationWord,
    colloquialFa: 'واژه و جمله هدف برای تمرین دیکته و جمله‌سازی',
    blocks: [targetDictationWord]
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const autoTypeTimerRef = useRef<number | null>(null);

  const currentEn = ENGLISH_ALPHABET_ITEMS[enIndex];
  const currentTg = TAJIK_CYRILLIC_BOARD_ITEMS[tgIndex];

  // Common Misspellings Dictionary + Target Dictation Check
  const evaluateDictationSpelling = useCallback(
    (rawInput: string, targetWord: string) => {
      const cleaned = rawInput.trim();
      if (!cleaned) {
        return { isError: false, correctSpelling: targetWord, hintFa: '' };
      }

      const commonFixes: Record<string, { correct: string; hintFa: string }> = {
        aple: { correct: 'APPLE', hintFa: 'واژه Apple دارای دو حرف P است (A-P-P-L-E).' },
        frend: { correct: 'FRIEND', hintFa: 'در واژه Friend قبل از E یک حرف I قرار دارد (F-R-I-E-N-D).' },
        freind: { correct: 'FRIEND', hintFa: 'ترتیب صحیح حروف میانی I و سپس E است (F-R-I-E-N-D).' },
        nowlege: { correct: 'KNOWLEDGE', hintFa: 'واژه Knowledge با K بی‌صدا شروع می‌شود و دارای D قبل از G است.' },
        nowledge: { correct: 'KNOWLEDGE', hintFa: 'حرف K در ابتدای Knowledge نوشته می‌شود هرچند تلفظ نمی‌شود.' },
        knowlege: { correct: 'KNOWLEDGE', hintFa: 'در پایان Knowledge قبل از GE حرف D نوشته می‌شود (D-G-E).' },
        peece: { correct: 'PEACE', hintFa: 'صلح به صورت P-E-A-C-E نوشته می‌شود.' },
        салам: { correct: 'САЛОМ', hintFa: 'در خط سیریلیک تاجیکی، صدای «آ» با حرف «О» نوشته می‌شود: САЛОМ.' },
        дуст: { correct: 'ДӮСТ', hintFa: 'در الفبای تاجیکی، «و» کشیده در واژه دوست با حرف ویژه «Ӯ» نوشته می‌شود: ДӮСТ.' },
        точик: { correct: 'ТОҶИК', hintFa: 'صدای «ج» در الفبای تاجیکی با «Ҷ» (دارای دنباله) نوشته می‌شود: ТОҶИК.' },
        صلام: { correct: 'سلام', hintFa: 'واژه «سلام» با حرف «س» (سین) نوشته می‌شود، نه «ص».' },
        طهران: { correct: 'تهران', hintFa: 'املای استاندارد امروز «تهران» با حرف «ت» دو نقطه است.' },
        خاهش: { correct: 'خواهش', hintFa: 'واژه «خواهش» دارای «و» معدوله است که نوشته می‌شود ولی خوانده نمی‌شود.' }
      };

      const lowerCleaned = cleaned.toLowerCase();
      if (commonFixes[lowerCleaned]) {
        return {
          isError: true,
          correctSpelling: commonFixes[lowerCleaned].correct,
          hintFa: commonFixes[lowerCleaned].hintFa
        };
      }

      const normInput = cleaned.toUpperCase();
      const normTarget = targetWord.trim().toUpperCase();
      if (normTarget && !normTarget.startsWith(normInput) && normInput !== normTarget) {
        return {
          isError: true,
          correctSpelling: targetWord,
          hintFa: `حرف نوشته شده با دیکته صحیح واژه هدف («${targetWord}») مطابقت ندارد.`
        };
      }

      return { isError: false, correctSpelling: targetWord, hintFa: '' };
    },
    []
  );

  const spellingStatus = evaluateDictationSpelling(typedBoardText, targetDictationWord);

  // Determine the single standard character that gets typed when the user finishes drawing on the board
  const activeTypedChar =
    boardScriptTab === 'english_az'
      ? useLowercaseInAutoType
        ? currentEn.lower
        : currentEn.upper
      : boardScriptTab === 'tajik_cyrillic'
      ? useLowercaseInAutoType
        ? currentTg.cyrillicPair.split(' ')[1] || currentTg.cyrillicPair.split(' ')[0]
        : currentTg.cyrillicPair.split(' ')[0]
      : currentTg.persianEq.split('/')[0].trim();

  // Determine the guide text displayed on the blackboard
  const guideTextOnBoard =
    boardScriptTab === 'english_az'
      ? currentEn.pair
      : boardScriptTab === 'tajik_cyrillic'
      ? currentTg.cyrillicPair
      : currentTg.persianEq;

  const activeItemId =
    boardScriptTab === 'english_az' ? currentEn.id : `${currentTg.id}_${boardScriptTab}`;

  const renderCanvasGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // 1. Rich Vintage School Blackboard Texture
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#0c261d';
    ctx.fillRect(0, 0, w, h);

    // Subtle chalk dust grain
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    for (let i = 0; i < 40; i++) {
      const rx = (i * 97) % w;
      const ry = (i * 53) % h;
      ctx.fillRect(rx, ry, 18, 2);
    }

    // Top Standard-Sized Auto-Typed Strip + Live Correct Dictation Bar inside the Blackboard Canvas
    ctx.save();
    ctx.fillStyle = spellingStatus.isError ? 'rgba(127, 29, 29, 0.94)' : 'rgba(2, 44, 34, 0.88)';
    ctx.fillRect(14, 10, w - 28, 44);
    ctx.strokeStyle = spellingStatus.isError ? '#fb7185' : 'rgba(251, 191, 36, 0.55)';
    ctx.lineWidth = 2;
    ctx.strokeRect(14, 10, w - 28, 44);

    ctx.font = 'bold 19px sans-serif';
    ctx.fillStyle = spellingStatus.isError ? '#fecdd3' : '#fef08a';
    const isRtlScript = boardScriptTab === 'persian_script';
    ctx.textAlign = isRtlScript ? 'right' : 'left';
    const displayLine = spellingStatus.isError
      ? `❌ اشتباه: ${typedBoardText}  ➔  ✅ دیکته صحیح: ${spellingStatus.correctSpelling} (${spellingStatus.correctSpelling.split('').join('-')})`
      : typedBoardText.length > 0
      ? `✅ ${typedBoardText}▋   (واژه هدف دیکته: ${targetDictationWord})`
      : isRtlScript
      ? `سطر تایپ و دیکته خودکار (واژه هدف: ${targetDictationWord})...`
      : `Auto-Typed Line (Target Dictation: ${targetDictationWord})...`;
    ctx.fillText(displayLine, isRtlScript ? w - 24 : 24, 38);
    ctx.restore();

    // 2. 4-Line Notebook / Calligraphy Ruling (`چهارخط استاندارد انگلیسی و سیریلیک`)
    const ascenderY = h * 0.28;
    const midlineY = h * 0.5;
    const baselineY = h * 0.76;
    const descenderY = h * 0.91;

    ctx.save();
    // Ascender line (Top)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(20, ascenderY);
    ctx.lineTo(w - 20, ascenderY);
    ctx.stroke();

    // Midline / x-height
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.32)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(20, midlineY);
    ctx.lineTo(w - 20, midlineY);
    ctx.stroke();

    // Baseline (Main solid line)
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.55)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(20, baselineY);
    ctx.lineTo(w - 20, baselineY);
    ctx.stroke();

    // Descender line (Bottom)
    ctx.strokeStyle = 'rgba(244, 114, 182, 0.22)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 6]);
    ctx.beginPath();
    ctx.moveTo(20, descenderY);
    ctx.lineTo(w - 20, descenderY);
    ctx.stroke();

    // Line labels in corner
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = 'rgba(167, 243, 208, 0.65)';
    ctx.textAlign = 'left';
    ctx.fillText('1. Ascender (خط بالا)', 24, ascenderY - 5);
    ctx.fillText('2. Midline (خط میانی)', 24, midlineY - 5);
    ctx.fillText('3. Baseline (خط کرسی اصلی)', 24, baselineY - 6);
    ctx.fillText('4. Descender (خط پایین: g, j, p, q, y)', 24, descenderY - 5);
    ctx.restore();

    // 3. Dotted Traceable Stencil Guide (`شابلون نقطه‌چین برای مشق روی تخته`)
    if (showGuide) {
      ctx.save();
      ctx.font = 'bold 138px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
      ctx.lineWidth = 3.5;
      ctx.setLineDash([7, 7]);
      ctx.strokeText(guideTextOnBoard, w / 2, baselineY);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillText(guideTextOnBoard, w / 2, baselineY);
      ctx.restore();
    }
  }, [guideTextOnBoard, showGuide, typedBoardText, boardScriptTab, spellingStatus, targetDictationWord]);

  useEffect(() => {
    renderCanvasGuide();
    setStrokeCount(0);
  }, [renderCanvasGuide]);

  useEffect(() => {
    return () => {
      if (autoTypeTimerRef.current) {
        window.clearTimeout(autoTypeTimerRef.current);
      }
    };
  }, []);

  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (autoTypeTimerRef.current) {
      window.clearTimeout(autoTypeTimerRef.current);
      autoTypeTimerRef.current = null;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const pos = getPointerPos(e);
    lastPosRef.current = pos;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, isEraser ? 16 : 6.5, 0, Math.PI * 2);
    ctx.fillStyle = isEraser ? '#0c261d' : chalkColor;
    ctx.fill();
    ctx.restore();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !lastPosRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getPointerPos(e);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = isEraser ? '#0c261d' : chalkColor;
    ctx.lineWidth = isEraser ? 32 : 13;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = isEraser ? 'transparent' : chalkColor;
    ctx.shadowBlur = isEraser ? 0 : 3;
    ctx.stroke();
    ctx.restore();

    lastPosRef.current = pos;
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPosRef.current = null;
    if (!isEraser) {
      setStrokeCount((prev) => prev + 1);

      // Smart Auto-Type: After 650ms of finishing the letter stroke, convert handwriting to standard typed letter & clear big chalk stroke!
      if (autoTypeEnabled) {
        if (autoTypeTimerRef.current) {
          window.clearTimeout(autoTypeTimerRef.current);
        }
        autoTypeTimerRef.current = window.setTimeout(() => {
          sound.playPop();
          setTypedBoardText((prev) => prev + activeTypedChar);
          setLastTypedFlash(activeTypedChar);
          setTimeout(() => setLastTypedFlash(null), 900);

          if (boardScriptTab === 'english_az') {
            speakEnglish(activeTypedChar, 0.9);
          } else if (boardScriptTab === 'tajik_cyrillic') {
            speakRussian(activeTypedChar, 0.9);
          } else {
            speakPersian(activeTypedChar, 0.9);
          }

          onEarnLingous(5);

          if (autoAdvanceNext) {
            if (boardScriptTab === 'english_az') {
              setEnIndex((prev) => (prev < ENGLISH_ALPHABET_ITEMS.length - 1 ? prev + 1 : 0));
            } else {
              setTgIndex((prev) =>
                prev < TAJIK_CYRILLIC_BOARD_ITEMS.length - 1 ? prev + 1 : 0
              );
            }
          }
        }, 650);
      }
    }
  };

  const handleClearBoard = () => {
    sound.playPop();
    renderCanvasGuide();
    setStrokeCount(0);
  };

  const handleSpeakActive = () => {
    if (boardScriptTab === 'english_az') {
      speakEnglish(`${currentEn.upper}. ${currentEn.exampleEn}`, 0.85);
    } else if (boardScriptTab === 'tajik_cyrillic') {
      speakRussian(`${currentTg.exampleTg}`, 0.85);
    } else {
      speakPersian(`${currentTg.exampleFa}`, 0.85);
    }
    onEarnLingous(5);
  };

  const handleCompleteLetter = () => {
    sound.playSuccess();
    handleSpeakActive();
    if (!practicedIds.includes(activeItemId)) {
      setPracticedIds((prev) => [...prev, activeItemId]);
      onEarnLingous(15);
      try {
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
  };

  return (
    <section
      aria-label="تخته سیاه تعاملی با گچ رنگی و پاک‌کن روی تخته"
      className="rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white p-5 sm:p-6 border-4 border-amber-500/80 shadow-2xl space-y-5"
    >
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-700/60 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
            <PenTool className="w-3.5 h-3.5" />
            <span>
              {mode === 'english_for_persian'
                ? '🖍️ تخته سیاه تعاملی الفبای انگلیسی (A–Z) با پاک‌کن روی تخته'
                : '🖍️ ТАХТАИ СИЁҲИ ИНТЕРАКТИВӢ (А–Я ва A–Z) • تخته سیاه سیریلیک، انگلیسی و فارسی با پاک‌کن'}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-amber-300">
            {mode === 'english_for_persian'
              ? 'مشق لمسی حروف بزرگ و کوچک انگلیسی (Aa – Zz) روی چهارخط با گچ رنگی و پاک‌کن دستی'
              : 'Машқи Хати Кириллӣ (А–Я), Англисӣ (A–Z) ва Форсӣ бо Тахтапоккун • مشق لمسی سیریلیک و انگلیسی'}
          </h3>
        </div>

        {/* Mode Switcher when inside Tajik Hub */}
        {mode === 'tajik_cyrillic_english' && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setBoardScriptTab('tajik_cyrillic');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
                boardScriptTab === 'tajik_cyrillic'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-[1.02]'
                  : 'bg-emerald-900/70 text-emerald-100 border border-emerald-700 hover:bg-emerald-800'
              }`}
            >
              🇹🇯 ۱. الفبای سیریلیک تاجیکی (А–Я • ۳۵ حرف)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setBoardScriptTab('english_az');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
                boardScriptTab === 'english_az'
                  ? 'bg-cyan-400 text-slate-950 shadow-md scale-[1.02]'
                  : 'bg-emerald-900/70 text-emerald-100 border border-emerald-700 hover:bg-emerald-800'
              }`}
            >
              🇬🇧 ۲. الفبای انگلیسی با توضیح سیریلیک (A–Z)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setBoardScriptTab('persian_script');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
                boardScriptTab === 'persian_script'
                  ? 'bg-emerald-400 text-slate-950 shadow-md scale-[1.02]'
                  : 'bg-emerald-900/70 text-emerald-100 border border-emerald-700 hover:bg-emerald-800'
              }`}
            >
              🇮🇷 ۳. معادل خط فارسی روی تخته (ا – ی)
            </button>
          </div>
        )}
      </div>

      {/* Alphabet Selector Strip */}
      {boardScriptTab === 'english_az' ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
            <span>حرف انگلیسی را برای مشق روی تخته انتخاب کنید (۲۶ حرف بزرگ و کوچک Aa – Zz):</span>
            <span className="text-amber-300 font-black">
              {enIndex + 1} / {ENGLISH_ALPHABET_ITEMS.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5" dir="ltr">
            {ENGLISH_ALPHABET_ITEMS.map((item, idx) => {
              const isSelected = idx === enIndex;
              const isDone = practicedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setEnIndex(idx);
                    speakEnglish(item.upper, 0.85);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all border ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-lg scale-105'
                      : isDone
                      ? 'bg-emerald-700 text-white border-emerald-400'
                      : 'bg-emerald-900/60 text-emerald-100 border-emerald-700/70 hover:bg-emerald-800'
                  }`}
                >
                  {item.pair}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
            <span>
              حرف سیریلیک تاجیکی و معادل فارسی آن را برای مشق روی تخته انتخاب کنید (۳۵ حرف А–Я):
            </span>
            <span className="text-amber-300 font-black">
              {tgIndex + 1} / {TAJIK_CYRILLIC_BOARD_ITEMS.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5" dir="ltr">
            {TAJIK_CYRILLIC_BOARD_ITEMS.map((item, idx) => {
              const isSelected = idx === tgIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setTgIndex(idx);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all border ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-lg scale-105'
                      : 'bg-emerald-900/60 text-emerald-100 border-emerald-700/70 hover:bg-emerald-800'
                  }`}
                >
                  <span>{item.cyrillicPair}</span>
                  <span className="text-[10px] opacity-80 ml-1">({item.persianEq})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Grid: Left Info Card + Right Interactive Blackboard with Eraser */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Letter Guide & Pronunciation Details */}
        <div className="lg:col-span-5 rounded-2xl bg-emerald-900/50 border border-emerald-700/70 p-4 flex flex-col justify-between space-y-4">
          {boardScriptTab === 'english_az' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-amber-300 block">
                    حرف بزرگ و کوچک انگلیسی:
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-wider" dir="ltr">
                    {currentEn.upper} {currentEn.lower}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    speakEnglish(`${currentEn.upper}. ${currentEn.exampleEn}`, 0.85);
                    onEarnLingous(5);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 تلفظ انگلیسی</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-emerald-700/60 space-y-1.5 text-xs">
                <p className="font-black text-amber-300">
                  نام حرف: <span className="text-white">{currentEn.nameFa}</span> •{' '}
                  <span className="text-cyan-300" dir="ltr">
                    {currentEn.nameEn}
                  </span>
                  {mode === 'tajik_cyrillic_english' && (
                    <span className="text-emerald-300 ml-2">({currentEn.nameCyrillic})</span>
                  )}
                </p>
                <p className="text-emerald-100 leading-relaxed">{currentEn.soundFa}</p>
                {mode === 'tajik_cyrillic_english' && (
                  <p className="text-cyan-200 font-bold" dir="ltr">
                    🇹🇯 {currentEn.soundCyrillic}
                  </p>
                )}
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/80 border border-amber-400/30 space-y-1">
                <span className="text-[11px] font-bold text-amber-300 block">
                  واژه‌های نمونه برای تمرین:
                </span>
                <p className="text-sm font-black text-white">{currentEn.exampleFa}</p>
                {mode === 'tajik_cyrillic_english' && (
                  <p className="text-xs font-bold text-cyan-300" dir="ltr">
                    🇹🇯 {currentEn.exampleCyrillic}
                  </p>
                )}
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-700/50 text-xs text-emerald-100 leading-relaxed">
                <strong className="text-amber-300 block mb-0.5">✍️ راهنمای رسم‌الخط روی تخته:</strong>
                {currentEn.strokeTipFa}
                {mode === 'tajik_cyrillic_english' && (
                  <span className="block text-cyan-200 mt-1" dir="ltr">
                    {currentEn.strokeTipCyrillic}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-amber-300 block">
                    پل سه‌زبانه (سیریلیک ⇄ فارسی ⇄ انگلیسی):
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3 pt-1">
                    <span className="text-amber-300" dir="ltr">
                      {currentTg.cyrillicPair}
                    </span>
                    <span className="text-emerald-400">⇄</span>
                    <span className="text-white">{currentTg.persianEq}</span>
                    <span className="text-emerald-400">⇄</span>
                    <span className="text-cyan-300 text-2xl" dir="ltr">
                      {currentTg.englishEq}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => speakRussian(currentTg.exampleTg, 0.85)}
                  className="px-3 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 تلفظ سیریلیک تاجیکی</span>
                </button>
                <button
                  type="button"
                  onClick={() => speakPersian(currentTg.exampleFa, 0.85)}
                  className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 تلفظ فارسی</span>
                </button>
                <button
                  type="button"
                  onClick={() => speakEnglish(currentTg.exampleEn, 0.85)}
                  className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-black text-xs flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 English</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-emerald-700/60 space-y-1.5 text-xs">
                <p className="font-black text-amber-300">{currentTg.soundHintFa}</p>
                <p className="font-bold text-cyan-200" dir="ltr">
                  🇹🇯 {currentTg.soundHintTg}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/80 border border-amber-400/30 space-y-1 text-xs">
                <p className="font-black text-white">
                  🇹🇯 سیریلیک: <span dir="ltr">{currentTg.exampleTg}</span>
                </p>
                <p className="font-black text-amber-300">🇮🇷 فارسی: {currentTg.exampleFa}</p>
                <p className="font-bold text-cyan-300" dir="ltr">
                  🇬🇧 English: {currentTg.exampleEn}
                </p>
              </div>
            </div>
          )}

          {/* Previous / Next Navigation */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-emerald-800/70">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                if (boardScriptTab === 'english_az') {
                  setEnIndex((prev) => (prev > 0 ? prev - 1 : ENGLISH_ALPHABET_ITEMS.length - 1));
                } else {
                  setTgIndex((prev) =>
                    prev > 0 ? prev - 1 : TAJIK_CYRILLIC_BOARD_ITEMS.length - 1
                  );
                }
              }}
              className="px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              <span>حرف قبلی</span>
            </button>

            <button
              type="button"
              onClick={handleCompleteLetter}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>ثبت تمرین (+۱۵ سکه)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playPop();
                if (boardScriptTab === 'english_az') {
                  setEnIndex((prev) => (prev < ENGLISH_ALPHABET_ITEMS.length - 1 ? prev + 1 : 0));
                } else {
                  setTgIndex((prev) =>
                    prev < TAJIK_CYRILLIC_BOARD_ITEMS.length - 1 ? prev + 1 : 0
                  );
                }
              }}
              className="px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1"
            >
              <span>حرف بعدی</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Blackboard Canvas + Chalk & Eraser Toolbar */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          {/* Smart Auto-Type Ink-to-Standard-Text Control Bar */}
          <div className="bg-emerald-950/90 p-3.5 rounded-2xl border-2 border-amber-400/70 space-y-2.5 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-xs sm:text-sm font-black text-amber-300">
                  ✨ تایپ خودکار هوشمند روی تخته (تبدیل دست‌خط به اندازه استاندارد بدون پر شدن صفحه):
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setAutoTypeEnabled((prev) => !prev);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-black border transition-all ${
                    autoTypeEnabled
                      ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-sm'
                      : 'bg-slate-800 text-slate-300 border-slate-600'
                  }`}
                >
                  {autoTypeEnabled ? '⚡ تایپ خودکار: روشن' : 'تایپ خودکار: خاموش'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setAutoAdvanceNext((prev) => !prev);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-black border transition-all ${
                    autoAdvanceNext
                      ? 'bg-emerald-400 text-slate-950 border-emerald-200'
                      : 'bg-slate-800 text-slate-300 border-slate-600'
                  }`}
                >
                  {autoAdvanceNext ? '⏭️ رفتن خودکار به حرف بعد: روشن' : 'تکرار همین حرف'}
                </button>
                {boardScriptTab !== 'persian_script' && (
                  <button
                    type="button"
                    onClick={() => setUseLowercaseInAutoType((prev) => !prev)}
                    className="px-2.5 py-1 rounded-xl bg-cyan-900/80 hover:bg-cyan-800 text-cyan-200 border border-cyan-500/40 text-[11px] font-black"
                  >
                    {useLowercaseInAutoType ? 'حروف کوچک (a-z / а-я)' : 'حروف بزرگ (A-Z / А-Я)'}
                  </button>
                )}
              </div>
            </div>

            {/* Standard-Size Typed Output Box + Editable Input & Target Dictation Picker */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-black text-emerald-200">
                  🎯 انتخاب واژه هدف برای تمرین دیکته روی تخته:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(boardScriptTab === 'english_az'
                    ? ['FRIEND', 'APPLE', 'KNOWLEDGE', 'PEACE', 'CARPET']
                    : boardScriptTab === 'tajik_cyrillic'
                    ? ['САЛОМ', 'ДӮСТ', 'ТОҶИК', 'САМАРҚАНД', 'ЭРОН']
                    : ['سلام', 'تهران', 'خواهش', 'ایران', 'دوست']
                  ).map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setTargetDictationWord(w);
                        setTypedBoardText('');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-black border transition-all ${
                        targetDictationWord === w
                          ? 'bg-amber-400 text-slate-950 border-amber-200'
                          : 'bg-slate-900 text-emerald-200 border-emerald-700/60 hover:bg-slate-800'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      if (boardScriptTab === 'english_az') {
                        setTargetDictationWord('FRIEND');
                        setTypedBoardText('FREND');
                      } else if (boardScriptTab === 'tajik_cyrillic') {
                        setTargetDictationWord('САЛОМ');
                        setTypedBoardText('САЛАМ');
                      } else {
                        setTargetDictationWord('سلام');
                        setTypedBoardText('صلام');
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/25 hover:bg-rose-500/40 text-rose-200 border border-rose-400/50 text-[11px] font-black"
                  >
                    🧪 تست غلط املایی و نمایش نوار دیکته صحیح
                  </button>
                </div>
              </div>

              {/* TOP-OF-BLACKBOARD LIVE SPELLING, DICTATION & COMPLETE SENTENCE BANNER */}
              {(spellingStatus.isError || sentenceOrderErrorFa || showFullSentenceInTopBar) && (
                <div
                  className={`p-3.5 rounded-2xl border-2 shadow-xl space-y-2 ${
                    spellingStatus.isError || sentenceOrderErrorFa
                      ? 'bg-gradient-to-r from-rose-950 via-red-900 to-amber-950 border-amber-400 animate-pulse'
                      : 'bg-slate-950/95 border-emerald-500/70'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black ${
                          spellingStatus.isError || sentenceOrderErrorFa
                            ? 'bg-rose-500 text-white'
                            : 'bg-amber-400 text-slate-950'
                        }`}
                      >
                        {spellingStatus.isError || sentenceOrderErrorFa
                          ? '🚨 نوار بالای تخته: اصلاح دیکته و نمایش کل جمله صحیح'
                          : '✅ نوار بالای تخته: دیکته صحیح و کل جمله خودمانی'}
                      </span>
                      {spellingStatus.isError && typedBoardText && (
                        <span className="text-xs font-bold text-rose-200">
                          نوشته شما: <del className="font-black text-rose-300 mx-1">{typedBoardText}</del>
                        </span>
                      )}
                      <span className="text-xs sm:text-sm font-black text-emerald-300">
                        ✅ دیکته صحیح واژه: «{spellingStatus.correctSpelling}» (
                        {spellingStatus.correctSpelling.split('').join(' - ')})
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          sound.playSuccess();
                          setTypedBoardText(activeTargetSentenceData.fullSentence);
                          setSentenceOrderErrorFa(null);
                          if (boardScriptTab === 'english_az') {
                            speakEnglish(activeTargetSentenceData.fullSentence, 0.88);
                          } else if (boardScriptTab === 'tajik_cyrillic') {
                            speakRussian(activeTargetSentenceData.fullSentence, 0.88);
                          } else {
                            speakPersian(activeTargetSentenceData.fullSentence, 0.88);
                          }
                        }}
                        className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md"
                      >
                        ✨ درج کل جمله صحیح روی تخته
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (boardScriptTab === 'english_az') {
                            speakEnglish(activeTargetSentenceData.fullSentence, 0.88);
                          } else if (boardScriptTab === 'tajik_cyrillic') {
                            speakRussian(activeTargetSentenceData.fullSentence, 0.88);
                          } else {
                            speakPersian(activeTargetSentenceData.fullSentence, 0.88);
                          }
                        }}
                        className="px-2.5 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>🔊 شنیدن کل جمله</span>
                      </button>
                    </div>
                  </div>

                  {/* Full Correct Sentence Display at Top of Board */}
                  <div className="p-2.5 rounded-xl bg-black/45 border border-amber-400/40 space-y-1">
                    <p
                      className="text-sm sm:text-base font-black text-amber-300"
                      dir={boardScriptTab === 'persian_script' ? 'rtl' : 'ltr'}
                    >
                      🌟 کل جمله صحیح: «{activeTargetSentenceData.fullSentence}»
                    </p>
                    <p className="text-xs font-bold text-emerald-200" dir="rtl">
                      🗣️ معادل خودمانی و عامیانه: {activeTargetSentenceData.colloquialFa}
                    </p>
                    {(spellingStatus.hintFa || sentenceOrderErrorFa) && (
                      <p className="text-xs text-rose-200 font-bold" dir="rtl">
                        💡 راهنما: {sentenceOrderErrorFa || spellingStatus.hintFa}
                      </p>
                    )}
                  </div>

                  {/* Interactive Sentence Word Blocks + "Couldn't Build Sentence" Rescue Button */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-black text-amber-200">
                        🧩 ساخت جمله با قطعات:
                      </span>
                      {activeTargetSentenceData.blocks.map((blk, bIdx) => (
                        <button
                          key={bIdx}
                          type="button"
                          onClick={() => {
                            sound.playPop();
                            if (!typedBoardText.trim() && bIdx !== 0) {
                              setSentenceOrderErrorFa(
                                `اگر در ساختن جمله اشتباه کردید یا نتوانستید جمله را بسازید، کل جمله صحیح در کادر بالا برایتان نمایش داده شده است: «${activeTargetSentenceData.fullSentence}»`
                              );
                            } else {
                              setSentenceOrderErrorFa(null);
                            }
                            setTypedBoardText((prev) => (prev ? `${prev.trim()} ${blk}` : blk));
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-200 border border-amber-400/40 text-xs font-black"
                          dir={boardScriptTab === 'persian_script' ? 'rtl' : 'ltr'}
                        >
                          {blk}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playSuccess();
                        setShowFullSentenceInTopBar(true);
                        setSentenceOrderErrorFa(
                          `کل جمله صحیح و دیکته کامل در نوار بالا نمایش داده شد: «${activeTargetSentenceData.fullSentence}»`
                        );
                        setTypedBoardText(activeTargetSentenceData.fullSentence);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/30 hover:bg-rose-500/50 text-amber-200 border border-amber-300/50 text-[11px] font-black"
                    >
                      🆘 نتوانستم جمله را بسازم (نمایش کل جمله صحیح در نوار بالا)
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/90 px-3.5 py-2.5 rounded-xl border border-emerald-600/60">
                <input
                  type="text"
                  value={typedBoardText}
                  onChange={(e) => setTypedBoardText(e.target.value)}
                  dir={boardScriptTab === 'persian_script' ? 'rtl' : 'ltr'}
                  placeholder="با کشیدن هر حرف روی تخته (یا تایپ در اینجا)، کلمه با اندازه استاندارد نوشته و دیکته آن بررسی می‌شود..."
                  className="flex-1 min-w-[210px] bg-transparent text-base sm:text-lg font-black text-amber-200 placeholder:text-xs placeholder:text-emerald-300/60 focus:outline-none"
                />
                {lastTypedFlash && (
                  <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-black animate-bounce">
                    +{lastTypedFlash} تایپ شد!
                  </span>
                )}

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setTypedBoardText((prev) => prev + ' ')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-black border border-slate-600"
                  >
                    ␣ فاصله
                  </button>
                  <button
                    type="button"
                    onClick={() => setTypedBoardText((prev) => prev.slice(0, -1))}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-200 text-xs font-black border border-slate-600"
                  >
                    ⌫ حذف حرف
                  </button>
                  {typedBoardText.trim().length > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          if (boardScriptTab === 'english_az') speakEnglish(typedBoardText, 0.88);
                          else if (boardScriptTab === 'tajik_cyrillic') speakRussian(typedBoardText, 0.88);
                          else speakPersian(typedBoardText, 0.88);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>خواندن واژه</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTypedBoardText('')}
                        className="px-2.5 py-1 rounded-lg bg-rose-900/70 hover:bg-rose-800 text-rose-100 text-xs font-black"
                      >
                        پاک کردن سطر
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Chalk & Eraser Toolbar right above the board */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 p-3 rounded-2xl border border-emerald-700/70">
            {/* Chalk Colors */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-emerald-200">🖍️ رنگ گچ:</span>
              {[
                { color: '#ffffff', label: 'گچ سفید' },
                { color: '#fde047', label: 'گچ زرد' },
                { color: '#38bdf8', label: 'گچ آبی' },
                { color: '#f472b6', label: 'گچ صورتی' }
              ].map((c) => (
                <button
                  key={c.color}
                  type="button"
                  onClick={() => {
                    setChalkColor(c.color);
                    setIsEraser(false);
                  }}
                  title={c.label}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 border transition-all ${
                    !isEraser && chalkColor === c.color
                      ? 'border-amber-400 bg-emerald-900 text-white scale-105 shadow-md'
                      : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block border border-white/40"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="hidden sm:inline">{c.label}</span>
                </button>
              ))}
            </div>

            {/* Interactive Hand Eraser on Board + Full Board Clear + Guide Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setIsEraser((prev) => !prev);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all border ${
                  isEraser
                    ? 'bg-rose-500 text-white border-rose-300 shadow-lg scale-105'
                    : 'bg-slate-800 text-rose-200 border-rose-500/40 hover:bg-slate-700'
                }`}
              >
                <Eraser className="w-4 h-4" />
                <span>{isEraser ? '🧽 پاک‌کن روی تخته (فعال)' : '🧽 پاک‌کن دستی روی تخته'}</span>
              </button>

              <button
                type="button"
                onClick={handleClearBoard}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-black flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>پاک کردن کل تخته</span>
              </button>

              <button
                type="button"
                onClick={() => setShowGuide((prev) => !prev)}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-800/70 hover:bg-emerald-700 text-emerald-100 text-xs font-bold flex items-center gap-1"
              >
                {showGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showGuide ? 'مخفی کردن شابلون' : 'نمایش شابلون'}</span>
              </button>
            </div>
          </div>

          {/* Wooden Framed School Blackboard Canvas */}
          <div className="relative rounded-2xl overflow-hidden border-[6px] border-amber-800 shadow-2xl bg-[#0c261d]">
            <canvas
              ref={canvasRef}
              width={680}
              height={320}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="w-full h-[260px] sm:h-[300px] touch-none cursor-crosshair block"
            />
            <div className="bg-amber-900/95 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-100 border-t border-amber-700">
              <span className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {isEraser
                  ? '🧽 حالت پاک‌کن دستی فعال است: انگشت یا ماوس را روی خطوط گچی بکشید تا پاک شوند.'
                  : '✍️ با انگشت یا ماوس روی نقطه‌چین‌های تخته سیاه بکشید و مشق بنویسید.'}
              </span>
              <span className="font-black text-amber-300">
                تعداد حرکت گچ: {strokeCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
