import { Mandala } from './types';

// This defines the base configuration for each mandala path.
// The number of rings will be determined by the user's progress for that mandala.
export const MANDALAS: Mandala[] = [
  {
    id: 'agni', // Fire
    name: 'Mandala of Agni',
    imageId: 'mandala-agni',
    baseRings: 3,
    maxRings: 11, // 3 base + 8 levels
    segments: 8,
    symbols: ['fire', 'phoenix', 'fire', 'phoenix', 'logo', 'phoenix', 'fire', 'phoenix'],
  },
  {
    id: 'jala', // Water
    name: 'Mandala of Jala',
    imageId: 'mandala-jala',
    baseRings: 3,
    maxRings: 11,
    segments: 8,
    symbols: ['water', 'garuda', 'water', 'garuda', 'logo', 'garuda', 'water', 'garuda'],
  },
  {
    id: 'prithvi', // Earth
    name: 'Mandala of Prithvi',
    imageId: 'mandala-prithvi',
    baseRings: 3,
    maxRings: 11,
    segments: 12,
    symbols: ['earth', 'lotus', 'earth', 'lotus', 'earth', 'lotus', 'logo', 'lotus', 'earth', 'lotus', 'earth', 'lotus'],
  },
  {
    id: 'vayu', // Air
    name: 'Mandala of Vayu',
    imageId: 'mandala-vayu',
    baseRings: 4,
    maxRings: 12, // 4 base + 8 levels
    segments: 12,
    symbols: ['air', 'phoenix', 'air', 'garuda', 'air', 'logo', 'air', 'phoenix', 'air', 'garuda', 'air', 'logo'],
  },
  {
    id: 'akasha', // Ether/Space
    name: 'Mandala of Akasha',
    imageId: 'mandala-akasha',
    baseRings: 4,
    maxRings: 12,
    segments: 12,
    symbols: ['fire', 'water', 'earth', 'air', 'phoenix', 'garuda', 'logo', 'garuda', 'phoenix', 'air', 'earth', 'water'],
  },
  {
    id: 'surya', // Sun
    name: 'Mandala of Surya',
    imageId: 'mandala-surya',
    baseRings: 5,
    maxRings: 13,
    segments: 8,
    symbols: ['fire', 'logo', 'fire', 'lotus', 'fire', 'logo', 'fire', 'lotus'],
  },
  {
    id: 'chandra', // Moon
    name: 'Mandala of Chandra',
    imageId: 'mandala-chandra',
    baseRings: 5,
    maxRings: 13,
    segments: 8,
    symbols: ['water', 'logo', 'water', 'lotus', 'water', 'logo', 'water', 'lotus'],
  },
  {
    id: 'dharma', // Righteousness
    name: 'Mandala of Dharma',
    imageId: 'mandala-dharma',
    baseRings: 6,
    maxRings: 14,
    segments: 12,
    symbols: ['trishul', 'lotus', 'trishul', 'logo', 'trishul', 'lotus', 'trishul', 'logo', 'trishul', 'lotus', 'trishul', 'logo'],
  }
];
