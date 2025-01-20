import type { GameStatus } from '@/types/game';

export const isGameOver = (status: GameStatus): boolean => {
  return status !== 'InProgress';
};