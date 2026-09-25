import { DialogueScenario } from '../types';

export const DIALOGUE_SCENARIOS: DialogueScenario[] = [
  {
    id: 'd1',
    title: 'سفارش قهوه و نوشیدنی در کافه ☕',
    location: 'کافه دنج شهر',
    character: 'سام',
    role: 'باریستای کافه',
    level: 'A1-A2',
    description: 'یک مکالمه روزمره، صمیمانه و عامیانه برای سفارش دادن نوشیدنی مورد علاقه‌تان.',
    steps: [
      {
        id: 's1',
        speaker: 'سام (باریستا)',
        speakerRole: 'کافه',
        speakerAvatar: '☕',
        message: 'Hi there! How are you doing today? What can I get started for you?',
        choices: [
          {
            text: 'I am fine. Give me coffee.',
            isOptimal: false,
            feedback: 'کمی خشک و اداری بود. در زبان عامیانه انگلیسی بهتر است بگویید: Could I get a cappuccino, please?',
            response: 'Sure! What kind of coffee would you like?',
            nextStepId: 's2'
          },
          {
            text: 'Hey! Doing well, thanks. Could I get a hot cappuccino with oat milk, please?',
            isOptimal: true,
            feedback: 'فوق‌العاده طبیعی و گرم! هم حال و احوال کردید و هم با لحنی دوستانه سفارش دادید.',
            response: 'Coming right up! For here or to go?',
            nextStepId: 's2'
          }
        ]
      },
      {
        id: 's2',
        speaker: 'سام (باریستا)',
        speakerRole: 'کافه',
        speakerAvatar: '☕',
        message: 'For here or to go? And do you need a receipt?',
        choices: [
          {
            text: 'To go, please. And no receipt needed, thank you!',
            isOptimal: true,
            feedback: 'عالی و کاملاً مثل یک فرد بومی (Native) انگلیسی‌زبان!',
            response: 'Perfect! Have a great rest of your day, take care!'
          }
        ]
      }
    ]
  },
  {
    id: 'd2',
    title: 'خرید و پرسیدن قیمت در فروشگاه 🛍️',
    location: 'فروشگاه پوشاک و لوازم',
    character: 'الکس',
    role: 'فروشنده مهربان',
    level: 'A1-A2',
    description: 'چطور راحت و بدون خجالت در یک فروشگاه سوال بپرسیم و خرید کنیم.',
    steps: [
      {
        id: 's1',
        speaker: 'الکس (فروشنده)',
        speakerRole: 'فروشگاه',
        speakerAvatar: '🏬',
        message: 'Hello! Just let me know if you need any help finding sizes or colors.',
        choices: [
          {
            text: 'Thanks! Excuse me, do you have this jacket in a medium size?',
            isOptimal: true,
            feedback: 'بسیار روان و کاربردی! اصطلاح Excuse me بهترین شروع برای سوال پرسیدن است.',
            response: 'Yes, we actually have one left in the back! Let me grab it for you.'
          },
          {
            text: 'Where is size M?',
            isOptimal: false,
            feedback: 'قابل فهم است اما با افزودن Excuse me یا Could you check خیلی محترمانه‌تر می‌شود.',
            response: 'Let me check the rack for you right now.'
          }
        ]
      }
    ]
  }
];
