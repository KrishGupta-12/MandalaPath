import { Mandala, LeaderboardPlayer } from './types';

export const MANDALAS: Mandala[] = [
  {
    id: 'agni',
    name: 'Mandala of Agni',
    imageId: 'mandala-agni',
    unlocked: true,
    rings: 3,
    segments: 8,
    solution: [0, 4, 0],
    symbols: ['fire', 'phoenix', 'fire', 'swastika', 'fire', 'phoenix', 'fire', 'swastika'],
  },
  {
    id: 'jala',
    name: 'Mandala of Jala',
    imageId: 'mandala-jala',
    unlocked: true,
    rings: 4,
    segments: 8,
    solution: [2, 6, 1, 5],
    symbols: ['water', 'garuda', 'water', 'logo', 'water', 'garuda', 'water', 'logo'],
  },
  {
    id: 'prithvi',
    name: 'Mandala of Prithvi',
    imageId: 'mandala-prithvi',
    unlocked: true,
    rings: 5,
    segments: 12,
    solution: [0, 3, 6, 9, 0],
    symbols: ['earth', 'logo', 'earth', 'logo', 'earth', 'swastika', 'earth', 'logo', 'earth', 'logo', 'earth', 'swastika'],
  },
  {
    id: 'vayu',
    name: 'Mandala of Vayu',
    imageId: 'mandala-vayu',
    unlocked: true,
    rings: 5,
    segments: 12,
    solution: [5, 10, 3, 8, 1],
    symbols: ['air', 'phoenix', 'air', 'garuda', 'air', 'logo', 'air', 'phoenix', 'air', 'garuda', 'air', 'logo'],
  },
   {
    id: 'akasha',
    name: 'Mandala of Akasha',
    imageId: 'mandala-akasha',
    unlocked: true,
    rings: 6,
    segments: 12,
    solution: [1, 3, 5, 7, 9, 11],
    symbols: ['logo', 'swastika', 'logo', 'swastika', 'logo', 'swastika', 'logo', 'swastika', 'logo', 'swastika', 'logo', 'swastika'],
  }
];

export const LEADERBOARD_DATA: { global: any[], friends: any[] } = {
    global: [
    ],
    friends: [],
}
