export interface Follower {
  id: string;
  username: string;
  profilePicture: string;
  hp: number;
}

export type BattleState = 'idle' | 'ready' | 'fighting' | 'finished';

export interface LogEntry {
  id: number;
  attacker: string;
  defender: string;
  damage: number;
  timestamp: Date;
}