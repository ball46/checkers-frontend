import React from 'react';
import { GameBoard } from '@/game/board/GameBoard';
import { GameStatus } from '@/game/controls/GameStatus';
import { GameControls } from '@/game/controls/GameControls';
import { Game } from '@/types/game';

interface GameLayoutProps {
  gameId: string;
  game: Game | null;
  onForfeit: () => void;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ gameId, game, onForfeit }) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <GameBoard gameId={gameId} />
        </div>
        <div className="space-y-4">
          {game && <GameStatus game={game} gameId={gameId} />}
          <GameControls onForfeit={onForfeit} />
        </div>
      </div>
    </div>
  );
};