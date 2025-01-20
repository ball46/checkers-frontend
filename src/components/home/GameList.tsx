'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { gameApi } from '@/api/game';
import type { GameListItem } from '@/types/game';
import { Loading } from '@/common/Loading';

interface GameListProps {
  games: GameListItem[];
  setGames: (games: GameListItem[]) => void;
}

export const GameList: React.FC<GameListProps> = ({ games, setGames }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await gameApi.getGames();
        setGames(data);
      } catch (err) {
        setError('Failed to load games: ' + err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [setGames]);

  if (loading) return <Loading size="lg" className="my-8" />;
  if (error) return <div className="p-4 text-error bg-red-100 rounded-lg">{error}</div>;

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this game?')) {
      return;
    }

    try {
      await gameApi.deleteGame(id);
      setGames(games.filter(game => game.id !== id));
    } catch (err) {
      console.error('Failed to delete game:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-primary mb-6">Available Games</h2>
      <div className="space-y-4">
        {games.map((game) => (
          <div 
            key={game.id} 
            className="flex justify-between items-center p-4 bg-board-light rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <Link 
              href={`/games/${game.id}`}
              className="flex-1 text-lg font-medium text-primary hover:text-accent transition-colors"
            >
              {game.name}
            </Link>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                game.status === 'InProgress' 
                  ? 'bg-accent text-white' 
                  : 'bg-secondary text-white'
              }`}>
                {game.status}
              </span>
              {game.status !== 'InProgress' && (
                <button 
                  className="px-4 py-2 bg-error text-white rounded hover:bg-red-700 transition-colors duration-200"
                  onClick={() => handleDelete(game.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};