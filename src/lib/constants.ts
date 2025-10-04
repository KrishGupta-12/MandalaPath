import { Mandala } from './types';

// This defines the base configuration for each of the 12 mandala paths.
// Each mandala has 9 levels of progression.
export const MANDALAS: Mandala[] = [
  // 1. Truth (Satya)
  {
    id: 'satya',
    name: 'Mandala of Truth',
    imageId: 'mandala-satya',
    baseRings: 3,
    segments: 8,
    symbols: ['logo', 'lotus', 'logo', 'lotus', 'logo', 'lotus', 'logo', 'lotus'],
    description: "Theme: Honesty & moral grounding. Unlocks teachings on Dharma, Karma, and Satya.",
  },
  // 2. Compassion (Karuna)
  {
    id: 'karuna',
    name: 'Mandala of Compassion',
    imageId: 'mandala-karuna',
    baseRings: 3,
    segments: 8,
    symbols: ['earth', 'water', 'earth', 'water', 'logo', 'earth', 'water', 'earth'],
    description: "Theme: Empathy & kindness. Learn from the stories of Buddha and Hanuman's humility.",
  },
   // 3. Energy (Agni)
  {
    id: 'agni',
    name: 'Mandala of Energy',
    imageId: 'mandala-agni',
    baseRings: 3,
    segments: 8,
    symbols: ['fire', 'phoenix', 'fire', 'phoenix', 'logo', 'phoenix', 'fire', 'phoenix'],
    description: "Theme: Fire, transformation & effort. Learn about yajnas and purity.",
  },
  // 4. Purity (Ganga)
  {
    id: 'ganga',
    name: 'Mandala of Purity',
    imageId: 'mandala-ganga',
    baseRings: 4,
    segments: 8,
    symbols: ['water', 'lotus', 'water', 'lotus', 'logo', 'water', 'lotus', 'water'],
    description: "Theme: Flow, clarity & cleansing. Discover the story of Ganga’s descent from heaven.",
  },
   // 5. Devotion (Bhakti)
  {
    id: 'bhakti',
    name: 'Mandala of Devotion',
    imageId: 'mandala-bhakti',
    baseRings: 4,
    segments: 10,
    symbols: ['lotus', 'trishul', 'lotus', 'trishul', 'logo', 'lotus', 'trishul', 'lotus', 'trishul', 'lotus'],
    description: "Theme: Love, faith & surrender. Inspired by the stories of Mirabai and Prahlada.",
  },
  // 6. Wisdom (Gyaan)
  {
    id: 'gyaan',
    name: 'Mandala of Wisdom',
    imageId: 'mandala-gyaan',
    baseRings: 4,
    segments: 12,
    symbols: ['phoenix', 'garuda', 'phoenix', 'garuda', 'phoenix', 'garuda', 'logo', 'phoenix', 'garuda', 'phoenix', 'garuda', 'phoenix'],
    description: "Theme: Knowledge, learning & curiosity. Ponder that knowledge gives humility.",
  },
  // 7. Balance (Yoga)
  {
    id: 'yoga',
    name: 'Mandala of Balance',
    imageId: 'mandala-yoga',
    baseRings: 5,
    segments: 12,
    symbols: ['fire', 'air', 'water', 'earth', 'fire', 'air', 'logo', 'water', 'earth', 'fire', 'air', 'water'],
    description: "Theme: Mind-body harmony & focus. For symmetry-based pattern alignment.",
  },
  // 8. Prosperity (Lakshmi)
  {
    id: 'lakshmi',
    name: 'Mandala of Prosperity',
    imageId: 'mandala-lakshmi',
    baseRings: 5,
    segments: 10,
    symbols: ['lotus', 'logo', 'lotus', 'logo', 'lotus', 'logo', 'lotus', 'logo', 'lotus', 'logo'],
    description: "Theme: Gratitude, abundance, and the balance of effort and reward.",
  },
  // 9. Courage (Veer)
  {
    id: 'veer',
    name: 'Mandala of Courage',
    imageId: 'mandala-veer',
    baseRings: 5,
    segments: 12,
    symbols: ['trishul', 'phoenix', 'trishul', 'phoenix', 'trishul', 'phoenix', 'logo', 'trishul', 'phoenix', 'trishul', 'phoenix', 'trishul'],
    description: "Theme: Bravery & determination. Reflect on Arjuna’s dilemma and Hanuman’s leap.",
  },
  // 10. Nature (Prakriti)
  {
    id: 'prakriti',
    name: 'Mandala of Nature',
    imageId: 'mandala-prakriti',
    baseRings: 6,
    segments: 12,
    symbols: ['earth', 'air', 'water', 'earth', 'air', 'water', 'logo', 'earth', 'air', 'water', 'earth', 'air'],
    description: "Theme: Harmony with the environment and the five elements.",
  },
  // 11. Light (Jyoti)
  {
    id: 'jyoti',
    name: 'Mandala of Light',
    imageId: 'mandala-jyoti',
    baseRings: 6,
    segments: 8,
    symbols: ['fire', 'logo', 'fire', 'logo', 'fire', 'logo', 'fire', 'logo'],
    description: "Theme: Knowledge overcoming ignorance. From darkness, lead me to light.",
  },
  // 12. Liberation (Moksha)
  {
    id: 'moksha',
    name: 'Mandala of Liberation',
    imageId: 'mandala-moksha',
    baseRings: 7,
    segments: 12,
    symbols: ['fire', 'water', 'earth', 'air', 'lotus', 'trishul', 'logo', 'phoenix', 'garuda', 'fire', 'water', 'earth'],
    description: "Theme: Ultimate realization and unity. I am Brahman.",
  },
];


export const TOTAL_LEVELS_PER_MANDALA = 9;

// Player Titles based on the number of MANDALAS completed.
export const PLAYER_TITLES = [
    { completed: 0, title: 'Mandala Novice' },
    { completed: 1, title: 'Seeker of Truth' },
    { completed: 2, title: 'Compassionate Soul' },
    { completed: 3, title: 'Bearer of the Flame' },
    { completed: 4, title: 'River of Purity' },
    { completed: 5, title: 'Devoted Heart' },
    { completed: 6, title: 'Gita Guardian' },
    { completed: 7, title: 'Yogic Master' },
    { completed: 8, title: 'Embodiment of Abundance' },
    { completed: 9, title: 'Courageous Warrior' },
    { completed: 10, title: 'Child of Nature' },
    { completed: 11, title: 'Beacon of Light' },
    { completed: 12, title: 'Enlightened Soul' }
];

export const getTitleByMandalasCompleted = (completedMandalas: number): string => {
  const foundTitle = PLAYER_TITLES.slice().reverse().find(t => completedMandalas >= t.completed);
  return foundTitle ? foundTitle.title : PLAYER_TITLES[0].title;
};
