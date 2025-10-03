import { Mandala } from './types';

// This defines the base configuration for each mandala path.
// The number of rings will be determined by the user's progress for that mandala.
// All mandalas now have 9 levels, so maxRings = baseRings + 8.
export const MANDALAS: Mandala[] = [
  {
    id: 'agni',
    name: 'Mandala of Agni',
    imageId: 'mandala-agni',
    baseRings: 3,
    maxRings: 11, // 3 + 8 = 11, for 9 levels
    segments: 8,
    symbols: ['fire', 'phoenix', 'fire', 'phoenix', 'logo', 'phoenix', 'fire', 'phoenix'],
  },
  {
    id: 'jala',
    name: 'Mandala of Jala',
    imageId: 'mandala-jala',
    baseRings: 3,
    maxRings: 11, // 3 + 8 = 11, for 9 levels
    segments: 8,
    symbols: ['water', 'garuda', 'water', 'garuda', 'logo', 'garuda', 'water', 'garuda'],
  },
  {
    id: 'prithvi',
    name: 'Mandala of Prithvi',
    imageId: 'mandala-prithvi',
    baseRings: 3,
    maxRings: 11, // 3 + 8 = 11, for 9 levels
    segments: 12,
    symbols: ['earth', 'fire', 'earth', 'water', 'earth', 'air', 'logo', 'air', 'earth', 'water', 'earth', 'fire'],
  },
  {
    id: 'vayu',
    name: 'Mandala of Vayu',
    imageId: 'mandala-vayu',
    baseRings: 4,
    maxRings: 12, // 4 + 8 = 12, for 9 levels
    segments: 12,
    symbols: ['air', 'phoenix', 'air', 'garuda', 'air', 'logo', 'air', 'phoenix', 'air', 'garuda', 'air', 'logo'],
  },
   {
    id: 'akasha',
    name: 'Mandala of Akasha',
    imageId: 'mandala-akasha',
    baseRings: 4,
    maxRings: 12, // 4 + 8 = 12, for 9 levels
    segments: 12,
    symbols: ['fire', 'water', 'earth', 'air', 'phoenix', 'garuda', 'logo', 'garuda', 'phoenix', 'air', 'earth', 'water'],
  }
];
