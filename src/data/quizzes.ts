import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    category: 'مکالمه روزمره ☕',
    level: 'A1-A2',
    question: 'وقتی کسی از شما تشکر می‌کند (Thank you)، کدام پاسخ خودمانی‌تر و طبیعی‌تر است؟',
    options: [
      'No problem at all! (خواهش می‌کنم، قابلی نداشت)',
      'You must thank me',
      'I am sad',
      'Go away'
    ],
    correctAnswer: 0,
    explanation: 'عبارت "No problem at all" یا "You\'re welcome" طبیعی‌ترین و صمیمانه‌ترین جواب است.',
    lingouReward: 20
  },
  {
    id: 'q2',
    type: 'sentence-scramble',
    category: 'ساخت جمله برای سفر ✈️',
    level: 'A1-A2',
    question: 'کلمات را مرتب کنید تا جمله "یک فنجان چای لطفاً" درست شود:',
    scrambledWords: ['could', 'I', 'have', 'some', 'tea', 'please'],
    correctAnswer: 'could i have some tea please',
    explanation: 'جمله کامل: Could I have some tea please (می‌شود لطفاً کمی چای به من بدهید؟)',
    lingouReward: 25
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    category: 'درخواست محترمانه 🤝',
    level: 'A1-A2',
    question: 'کدام گزینه یعنی: "ممکنه یک لحظه صبر کنید؟"',
    options: [
      'Could you wait a moment, please?',
      'Stop talking forever',
      'Wait for eternity',
      'Where is your ticket?'
    ],
    correctAnswer: 0,
    explanation: 'جمله "Could you wait a moment, please?" دقیقاً برای این موقعیت است.',
    lingouReward: 20
  }
];
