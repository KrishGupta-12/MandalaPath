import { Icon } from '@/components/shared/icons';

export interface UserProfile {
  id: string;
  googleId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  // This is deprecated in favor of the subcollection but kept for potential data migration.
  unlockedMandalaIds?: string[];
}

export interface UserMandalaProgress {
  id: string; // Corresponds to the mandalaId (e.g., 'agni')
  level: number;
  completed?: boolean;
}

export interface Mandala {
  id: string;
  name: string;
  imageId: string;
  baseRings: number;
  maxRings: number;
  segments: number;
  symbols: Icon[];
}

export interface MandalaLevel {
  id: string; // e.g. 'agni-1'
  mandalaId: string;
  name: string;
  level: number;
  rings: number;
  segments: number;
  symbols: Icon[];
}
