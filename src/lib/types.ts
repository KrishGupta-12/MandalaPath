import { Icon } from '@/components/shared/icons';

export interface User {
  name: string;
  email: string;
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

export interface LeaderboardPlayer {
    rank: number;
    name: string;
    time: string;
    moves: number;
    avatar: string;
}
