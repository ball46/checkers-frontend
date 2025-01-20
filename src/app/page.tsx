'use client';

import { useState } from 'react';
import { GameList } from '@/components/home/GameList';
import { CreateGame } from '@/components/home/CreateGame';
import type { GameListItem } from '@/types/game';

export default function Home() {
  const [games, setGames] = useState<GameListItem[]>([]);

  const handleGameCreated = (newGame: GameListItem) => {
    setGames(prevGames => [...prevGames, newGame]);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Checkers Game</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <CreateGame onGameCreated={handleGameCreated} />
        <GameList games={games} setGames={setGames} />
      </div>
    </main>
  );
}