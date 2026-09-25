import { GrammarLesson } from '../types';

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'g1',
    title: 'تفاوت کارهای روزمره با کارهایی که تمام شده‌اند (Present vs. Past)',
    district: 'پل زمان‌ها',
    level: 'A1-A2',
    summary: 'خیلی ساده و بدون قوانین سخت کتابی: چطور درباره کارهای دیروز و امروز راحت صحبت کنیم.',
    formula: 'امروز و روال عادی: I call | دیروز و گذشته: I called',
    keyPoints: [
      'وقتی از یک عادت یا کار روزمره صحبت می‌کنید، فعل دست‌نخورده می‌ماند: I drink tea every morning (من هر روز صبح چای می‌نوشم).',
      'وقتی کاری در گذشته اتفاق افتاده و تمام شده، معمولاً به آخر فعل یک -ed اضافه می‌شود: I called my friend yesterday (دیروز به دوستم زنگ زدم).',
      'کلماتی مثل yesterday (دیروز)، last night (دیشب) یا an hour ago (یک ساعت پیش) علامت گذشته هستند.'
    ],
    examples: [
      {
        correct: 'I talked to my manager yesterday.',
        wrong: 'I talk to my manager yesterday.',
        note: 'چون اتفاق مال دیروز است، talk تبدیل به talked شده است.'
      },
      {
        correct: 'I check my email every single morning.',
        note: 'چون کار هر روزه است، حالت ساده فعل استفاده شده است.'
      }
    ],
    practice: [
      {
        id: 'gp1_1',
        prompt: 'Yesterday, I ________ the flight tickets online.',
        options: ['booked (رزرو کردم)', 'book (رزرو می‌کنم)', 'booking', 'books'],
        correctAnswer: 0,
        explanation: 'چون صحبت از دیروز (yesterday) است، booked درست است.'
      },
      {
        id: 'gp1_2',
        prompt: 'We usually ________ lunch around 1:30 PM.',
        options: ['have (می‌خوریم)', 'had (خوردیم)', 'having', 'has'],
        correctAnswer: 0,
        explanation: 'چون معمولاً این ساعت ناهار می‌خورید (یک عادت)، have درست است.'
      }
    ]
  },
  {
    id: 'g2',
    title: 'درخواست‌های محترمانه و خودمانی (Could you / Would you)',
    district: 'ارتباطات روزمره',
    level: 'A1-A2',
    summary: 'چطور بدون اینکه خشک یا دستوری به نظر برسیم، از کسی تقاضایی بکنیم.',
    formula: 'Could you please... / Would you mind...',
    keyPoints: [
      'به جای جملات دستوری مثل "Open the door"، گفتن "Could you please open the door?" هم صمیمی است و هم فوق‌العاده باکلاس.',
      'اصطلاح Could I have... برای سفارش دادن در رستوران، فرودگاه یا فروشگاه عالی است: Could I have a bottle of water, please?'
    ],
    examples: [
      {
        correct: 'Could you please send me the file when you have time?',
        wrong: 'Send me the file now.',
        note: 'لحن محترمانه و خودمانی، کار شما را در محیط کار و سفر بسیار راحت‌تر می‌کند.'
      }
    ],
    practice: [
      {
        id: 'gp2_1',
        prompt: '________ you please hold the elevator for a second?',
        options: ['Could (می‌شود لطفاً)', 'Must (باید)', 'Did', 'Are'],
        correctAnswer: 0,
        explanation: 'کلمه Could برای درخواست صمیمانه و مؤدبانه به کار می‌رود.'
      }
    ]
  }
];
