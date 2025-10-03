import { Icon } from '@/components/shared/icons';

export interface UserProfile {
  id: string;
  googleId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  unlockedMandalaIds?: string[];
}

export interface Mandala {
  id: string;
  name: string;
  imageId: string;
  unlocked: boolean;
  rings: number;
  segments: number;
  solution: number[];
  symbols: Icon[];
}

export interface LeaderboardEntry {
    id: string;
    userId: string;
    mandalaId: string;
    score: number;
    displayName: string;
    photoURL?: string;
    timestamp: any; // Firestore timestamp
}

export interface LeaderboardPlayer {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  userId: string;
}
