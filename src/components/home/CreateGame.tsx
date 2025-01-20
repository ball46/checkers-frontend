'use client';

import React, { useState, useEffect } from 'react';
import { gameApi } from '@/api/game';
import type { GameListItem } from '@/types/game';
import { Loading } from '@/common/Loading';
import { Button } from '@/common/Button';

interface CreateGameProps {
  onGameCreated: (game: GameListItem) => void;
}

export const CreateGame: React.FC<CreateGameProps> = ({ onGameCreated }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingGames, setExistingGames] = useState<GameListItem[]>([]);

  // โหลดรายการเกมที่มีอยู่
  useEffect(() => {
    const loadGames = async () => {
      try {
        const games = await gameApi.getGames();
        setExistingGames(games);
      } catch (err) {
        console.error('Failed to load games:', err);
      }
    };
    loadGames();
  }, []);

  // ตรวจสอบชื่อซ้ำ
  const isNameTaken = (gameName: string): boolean => {
    return existingGames.some(game => 
      game.name === gameName
    );
  };

  // ตรวจสอบความถูกต้องของชื่อ
  const validateName = (gameName: string): string | null => {
    if (gameName.trim().length === 0) {
      return 'Game name cannot be empty';
    }
    if (gameName.length < 3) {
      return 'Game name must be at least 3 characters';
    }
    if (isNameTaken(gameName)) {
      return 'Game name already exists';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    // เพิ่ม validation
    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }
  
    setLoading(true);
    try {
      const newGame = await gameApi.createGame({
        name,
        singlePlayer: false
      });
      setName('');
      // เรียก callback เพื่ออัพเดท GameList
      onGameCreated({
        id: newGame.id,
        name: newGame.name,
        status: newGame.status
      });
    } catch (err) {
      setError('Failed to create game: ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter game name"
            disabled={loading}
            minLength={3}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-gray-100"
          />
          <Button 
            type="submit"
            variant="accent"
            isLoading={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loading size="sm" className="mr-2" />
                Creating...
              </>
            ) : 'Create Game'}
          </Button>
        </div>
      </form>
      {error && (
        <p className="mt-4 p-3 text-sm text-error bg-red-100 rounded-lg">
          {error}
        </p>
      )}
    </div>
  );
};