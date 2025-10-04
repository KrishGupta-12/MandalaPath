import { Mandala } from './types';

// This defines the base configuration for each mandala path.
// Each mandala has 9 levels of progression.
export const MANDALAS: Mandala[] = [
  {
    id: 'agni', // Fire
    name: 'Mandala of Agni',
    imageId: 'mandala-agni',
    baseRings: 3,
    segments: 8,
    symbols: ['fire', 'phoenix', 'fire', 'phoenix', 'logo', 'phoenix', 'fire', 'phoenix'],
    description: "Explore the purifying power of the fire god, Agni.",
  },
  {
    id: 'jala', // Water
    name: 'Mandala of Jala',
    imageId: 'mandala-jala',
    baseRings: 3,
    segments: 8,
    symbols: ['water', 'garuda', 'water', 'garuda', 'logo', 'garuda', 'water', 'garuda'],
    description: "Uncover the mysteries of the water element and its deities.",
  },
  {
    id: 'prithvi', // Earth
    name: 'Mandala of Prithvi',
    imageId: 'mandala-prithvi',
    baseRings: 3,
    segments: 12,
    symbols: ['earth', 'lotus', 'earth', 'lotus', 'earth', 'lotus', 'logo', 'lotus', 'earth', 'lotus', 'earth', 'lotus'],
    description: "Connect with the stability and patience of the Earth Mother.",
  },
  {
    id: 'vayu', // Air
    name: 'Mandala of Vayu',
    imageId: 'mandala-vayu',
    baseRings: 4,
    segments: 12,
    symbols: ['air', 'phoenix', 'air', 'garuda', 'air', 'logo', 'air', 'phoenix', 'air', 'garuda', 'air', 'logo'],
    description: "Embrace the life-giving force of Vayu, the wind god.",
  },
  {
    id: 'akasha', // Ether/Space
    name: 'Mandala of Akasha',
    imageId: 'mandala-akasha',
    baseRings: 4,
    segments: 12,
    symbols: ['fire', 'water', 'earth', 'air', 'phoenix', 'garuda', 'logo', 'garuda', 'phoenix', 'air', 'earth', 'water'],
    description: "Meditate on the endless expanse of space and consciousness.",
  },
  {
    id: 'surya', // Sun
    name: 'Mandala of Surya',
    imageId: 'mandala-surya',
    baseRings: 5,
    segments: 8,
    symbols: ['fire', 'logo', 'fire', 'lotus', 'fire', 'logo', 'fire', 'lotus'],
    description: "Bask in the radiant energy of Surya, the sun deity.",
  },
  {
    id: 'chandra', // Moon
    name: 'Mandala of Chandra',
    imageId: 'mandala-chandra',
    baseRings: 5,
    segments: 8,
    symbols: ['water', 'logo', 'water', 'lotus', 'water', 'logo', 'water', 'lotus'],
    description: "Find tranquility in the cool, serene light of the Moon god.",
  },
  {
    id: 'dharma', // Righteousness
    name: 'Mandala of Dharma',
    imageId: 'mandala-dharma',
    baseRings: 6,
    segments: 12,
    symbols: ['trishul', 'lotus', 'trishul', 'logo', 'trishul', 'lotus', 'trishul', 'logo', 'trishul', 'lotus', 'trishul', 'logo'],
    description: "Follow the path of righteousness and cosmic order.",
  },
  {
    id: 'aranyani', // Goddess of Forests
    name: 'Mandala of Aranyani',
    imageId: 'mandala-aranyani',
    baseRings: 4,
    segments: 8,
    symbols: ['earth', 'lotus', 'air', 'phoenix', 'logo', 'earth', 'lotus', 'air'],
    description: "Discover the secrets of the elusive goddess of forests.",
  },
  {
    id: 'soma', // Ritual Drink/Deity
    name: 'Mandala of Soma',
    imageId: 'mandala-soma',
    baseRings: 5,
    segments: 10,
    symbols: ['water', 'lotus', 'water', 'logo', 'water', 'lotus', 'water', 'logo', 'water', 'lotus'],
    description: "Learn of the celestial drink of the gods and its power.",
  },
  {
    id: 'brahman', // The Ultimate Reality
    name: 'Mandala of Brahman',
    imageId: 'mandala-brahman',
    baseRings: 7,
    segments: 12,
    symbols: ['logo', 'fire', 'water', 'earth', 'air', 'lotus', 'trishul', 'phoenix', 'garuda', 'fire', 'water', 'earth'],
    description: "Contemplate the nature of the ultimate, formless reality.",
  }
];

export const TOTAL_LEVELS_PER_MANDALA = 9;

// Player Titles based on total mandalas completed
export const PLAYER_TITLES = {
  NOVICE: 'Mandala Novice',
  APPRENTICE: 'Dharma Apprentice',
  SEEKER: 'Gita Seeker',
  SCHOLAR: 'Vedic Scholar',
  GUARDIAN: 'Brahman Guardian',
  ENLIGHTENED: 'Enlightened Soul',
};

// We now base titles on the number of MANDALAS completed (all 9 levels).
export const getTitleByMandalasCompleted = (completedMandalas: number): string => {
  if (completedMandalas >= 10) return PLAYER_TITLES.ENLIGHTENED;
  if (completedMandalas >= 7) return PLAYER_TITLES.GUARDIAN;
  if (completedMandalas >= 5) return PLAYER_TITLES.SCHOLAR;
  if (completedMandalas >= 3) return PLAYER_TITLES.SEEKER;
  if (completedMandalas >= 1) return PLAYER_TITLES.APPRENTICE;
  return PLAYER_TITLES.NOVICE;
};
