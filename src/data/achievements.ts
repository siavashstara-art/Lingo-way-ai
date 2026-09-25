import { Achievement } from '../types';

export const CITY_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_citizen',
    title: 'Tavana First Steps',
    description: 'Arrive in Virtual Tavana City and start your linguistic journey.',
    icon: '🌱',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    rewardLingous: 50
  },
  {
    id: 'ach_wordsmith',
    title: 'Bazaar Merchant',
    description: 'Master at least 5 vocabulary words in the Bazaar.',
    icon: '🏺',
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    rewardLingous: 100
  },
  {
    id: 'ach_grammar',
    title: 'Architect of Syntax',
    description: 'Complete 3 Downtown Grammar lessons with high accuracy.',
    icon: '🏛️',
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    rewardLingous: 120
  },
  {
    id: 'ach_dialogue',
    title: 'Charismatic Diplomat',
    description: 'Complete 2 dialogue simulations at Café Tavana.',
    icon: '☕',
    unlocked: false,
    progress: 0,
    maxProgress: 2,
    rewardLingous: 150
  },
  {
    id: 'ach_streak',
    title: 'Dedication Flame',
    description: 'Maintain a 5-day daily learning streak.',
    icon: '🔥',
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    rewardLingous: 200
  },
  {
    id: 'ach_vault',
    title: 'Lingou Bullion Baron',
    description: 'Accumulate 300 Golden Lingous in your city vault.',
    icon: '🪙',
    unlocked: false,
    progress: 150,
    maxProgress: 300,
    rewardLingous: 250
  }
];

export interface CityMonuments {
  id: string;
  name: string;
  cost: number;
  unlocked: boolean;
  icon: string;
  description: string;
  buff: string;
}

export const CITY_MONUMENTS: CityMonuments[] = [
  {
    id: 'mon_fountain',
    name: 'Fountain of Fluency',
    cost: 100,
    unlocked: true,
    icon: '⛲',
    description: 'Located at the center of Grand Plaza. Clear water inspires linguistic clarity.',
    buff: '+5% XP on all lessons'
  },
  {
    id: 'mon_tower',
    name: 'Clocktower of Discipline',
    cost: 200,
    unlocked: false,
    icon: '🕰️',
    description: 'Rings every hour across Tavana City to honor committed learners.',
    buff: '+10 Streak Shield protection'
  },
  {
    id: 'mon_library',
    name: 'Great Alexandria of Tavana',
    cost: 350,
    unlocked: false,
    icon: '📚',
    description: 'Houses all classical English literature, idioms, and speech archives.',
    buff: 'Unlocks rare idioms in the Bazaar'
  },
  {
    id: 'mon_colossus',
    name: 'Colossus of Tavana',
    cost: 500,
    unlocked: false,
    icon: '🗿',
    description: 'Towering monument guarding the bay of Virtual Tavana City.',
    buff: 'Golden nameplate in Capital Leaderboard'
  }
];
