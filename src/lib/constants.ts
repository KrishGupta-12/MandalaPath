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
    symbols: ['fire', 'phoenix', 'fire'],
  },
  {
    id: 'jala',
    name: 'Mandala of Jala',
    imageId: 'mandala-jala',
    unlocked: true,
    rings: 4,
    segments: 8,
    solution: [2, 6, 2, 6],
    symbols: ['water', 'garuda', 'water', 'garuda'],
  },
  {
    id: 'prithvi',
    name: 'Mandala of Prithvi',
    imageId: 'mandala-prithvi',
    unlocked: false,
    rings: 5,
    segments: 12,
    solution: [0, 3, 6, 9, 0],
    symbols: ['earth', 'logo', 'earth', 'logo', 'earth'],
  },
  {
    id: 'vayu',
    name: 'Mandala of Vayu',
    imageId: 'mandala-vayu',
    unlocked: false,
    rings: 5,
    segments: 12,
    solution: [5, 10, 3, 8, 1],
    symbols: ['air', 'phoenix', 'air', 'garuda', 'air'],
  },
];

export const LEADERBOARD_DATA: { global: LeaderboardPlayer[], friends: LeaderboardPlayer[] } = {
    global: [
      { rank: 1, name: 'Enlightened Master', time: '0:32', moves: 5, avatar: '/avatars/1.png' },
      { rank: 2, name: 'Cosmic-Traveler', time: '0:45', moves: 8, avatar: '/avatars/2.png' },
      { rank: 3, name: 'Aether-Mind', time: '0:51', moves: 11, avatar: '/avatars/3.png' },
      { rank: 4, name: 'Guest User', time: '1:12', moves: 15, avatar: '/avatars/4.png' },
      { rank: 5, name: 'Chakra-Spinner', time: '1:25', moves: 20, avatar: '/avatars/5.png' },
    ],
    friends: [],
}
