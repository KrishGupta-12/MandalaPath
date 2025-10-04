import { Icon } from '@/components/shared/icons';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface UserMandalaProgress {
  id: string; // Corresponds to the mandalaId (e.g., 'agni')
  level: number;
}

export interface Mandala {
  id: string;
  name: string;
  imageId: string;
  baseRings: number;
  segments: number;
  symbols: Icon[];
  description: string;
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
