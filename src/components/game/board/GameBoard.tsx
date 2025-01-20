'use client';

import React, { useEffect, useState } from 'react';
import { gameApi } from '@/api/game';
import type { Game, Move } from '@/types/game';
import { Loading } from '@/common/Loading';
import { isGameOver } from '@/utils/gameHelpers';

interface GameBoardProps {
  gameId: string;
}

export const GameBoard = ({ gameId }: GameBoardProps) => {
  const [game, setGame] = useState<Game | null>(null);
  const [selectedCell, setSelectedCell] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const loadGame = async () => {
      const data = await gameApi.getGameById(gameId);
      setGame(data);
    };
    loadGame();
  }, [gameId]);

  const handleCellClick = async (x: number, y: number) => {
    if (!game || isGameOver(game.status)) return;

    // Check if it's player's turn and piece exists
    const clickedCell = game.board.find(cell => cell.x === x && cell.y === y);

    if (!selectedCell) {
      // Selecting a piece
      if (clickedCell?.piece?.color === game.currentPlayer) {
        // Check if piece has valid moves
        if (game.validMoves[`${x},${y}`]?.length > 0) {
          setSelectedCell({ x, y });
        }
      }
      return;
    }

    // Making a move
    const validMoves = game.validMoves[`${selectedCell.x},${selectedCell.y}`] || [];
    const isValidMove = validMoves.some(
      move => move.to.x === x && move.to.y === y
    );

    if (isValidMove) {
      try {
        const move: Move = {
          from: selectedCell,
          to: { x, y }
        };
        const updatedGame = await gameApi.makeMove(gameId, move);
        setGame(updatedGame);
      } catch (err) {
        console.error('Invalid move:', err);
      }
    }
    
    setSelectedCell(null);
  };

  if (!game) return <Loading size="lg" className="my-8" />;

  return (
    <div className="grid grid-cols-8 gap-0 w-[640px] h-[640px] border-2 border-primary">
      {game.board.map((cell) => {
        const isSelected = selectedCell?.x === cell.x && selectedCell?.y === cell.y;
        const isValidMove = selectedCell && game.validMoves[`${selectedCell.x},${selectedCell.y}`]?.some(
          move => move.to.x === cell.x && move.to.y === cell.y
        );

        return (
          <div
            key={`${cell.x},${cell.y}`}
            onClick={() => handleCellClick(cell.x, cell.y)}
            className={`
              w-full h-full
              ${(cell.x + cell.y) % 2 === 0 ? 'bg-board-light' : 'bg-board-dark'}
              ${isSelected ? 'ring-2 ring-highlight' : ''}
              ${isValidMove ? 'bg-highlight/50' : ''}
              relative cursor-pointer
            `}
          >
            {cell.piece && (
              <div className={`
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                w-[80%] h-[80%] rounded-full
                ${cell.piece.color === 'Black' ? 'bg-piece-black' : 'bg-piece-white'}
                ${cell.piece.color === 'Black' ? 'border-2 border-white' : 'border-2 border-black'}
                flex items-center justify-center
              `}>
                {cell.piece.isKing && (
                  <span className={`
                    text-2xl
                    ${cell.piece.color === 'Black' ? 'text-white' : 'text-black'}
                  `}>
                    👑
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};