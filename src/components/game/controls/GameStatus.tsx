import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Game } from '@/types/game';
import { isGameOver } from '@/utils/gameHelpers';
import { gameApi } from '@/api/game';
import { Modal } from '@/components/common/Modal';

interface GameStatusProps {
  game: Game;
  gameId: string;
}

export const GameStatus: React.FC<GameStatusProps> = ({ game, gameId }) => {
  const router = useRouter();
  const [currentGame, setCurrentGame] = useState<Game>(game);
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isGameOver(currentGame.status)) {
        try {
          const updatedGame = await gameApi.getGameById(gameId);
          setCurrentGame(updatedGame);
          
          // Check if game just ended
          if (isGameOver(updatedGame.status)) {
            setShowGameOver(true);
          }
        } catch (error) {
          console.error('Failed to update game status:', error);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameId, currentGame.status]);

  useEffect(() => {
    setCurrentGame(game);
  }, [game]);

  return (
    <>
      <div className="p-4 bg-board-light rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-primary">Game Status</h3>
        <div className="mt-2 space-y-2">
          {!isGameOver(currentGame.status) ? (
            <p className="text-lg">Current Player: 
              <span className={`font-bold ${
                currentGame.currentPlayer === 'Black' 
                  ? 'text-piece-black' 
                  : 'text-primary'
              }`}>
                {currentGame.currentPlayer}
              </span>
            </p>
          ) : (
            <p className="text-lg font-bold text-accent">
              Game Over: {currentGame.status}
            </p>
          )}
        </div>
      </div>

      <Modal 
        isOpen={showGameOver} 
        onClose={() => setShowGameOver(false)}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <p className="text-xl mb-6">
            {currentGame.status === 'Draw' 
              ? 'Game ended in a Draw!'
              : `${currentGame.status} Won!`}
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
          >
            Return to Home
          </button>
        </div>
      </Modal>
    </>
  );
};