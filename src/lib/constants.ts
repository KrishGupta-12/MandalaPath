import { Mandala } from './types';

export const MANDALAS: Mandala[] = [
  {
    id: 'agni',
    name: 'Mandala of Agni',
    imageId: 'mandala-agni',
    unlocked: true,
    rings: 3,
    segments: 8,
    // The goal is to align the 'swastika' symbol, which is at index 3 and 7. 
    // We'll set the solution to 0 for all rings, and the puzzle is solved when all rings are at rotation 0.
    // The visual logic is that the swastika symbol is at the top.
    solution: [0, 0, 0], 
    symbols: ['fire', 'phoenix', 'fire', 'swastika', 'fire', 'phoenix', 'fire', 'logo'],
  },
  {
    id: 'jala',
    name: 'Mandala of Jala',
    imageId: 'mandala-jala',
    unlocked: true,
    rings: 4,
    segments: 8,
    solution: [0, 0, 0, 0],
    symbols: ['water', 'garuda', 'water', 'swastika', 'water', 'garuda', 'water', 'logo'],
  },
  {
    id: 'prithvi',
    name: 'Mandala of Prithvi',
    imageId: 'mandala-prithvi',
    unlocked: true,
    rings: 5,
    segments: 12,
    solution: [0, 0, 0, 0, 0],
    symbols: ['earth', 'logo', 'earth', 'logo', 'earth', 'swastika', 'earth', 'logo', 'earth', 'logo', 'earth', 'logo'],
  },
  {
    id: 'vayu',
    name: 'Mandala of Vayu',
    imageId: 'mandala-vayu',
    unlocked: true,
    rings: 5,
    segments: 12,
    solution: [0, 0, 0, 0, 0],
    symbols: ['air', 'phoenix', 'air', 'garuda', 'air', 'swastika', 'air', 'phoenix', 'air', 'garuda', 'air', 'logo'],
  },
   {
    id: 'akasha',
    name: 'Mandala of Akasha',
    imageId: 'mandala-akasha',
    unlocked: true,
    rings: 6,
    segments: 12,
    solution: [0,0,0,0,0,0],
    symbols: ['logo', 'swastika', 'logo', 'phoenix', 'logo', 'garuda', 'logo', 'swastika', 'logo', 'phoenix', 'logo', 'garuda'],
  }
];

export const LEADERBOARD_DATA: { global: any[], friends: any[] } = {
    global: [
    ],
    friends: [],
}
