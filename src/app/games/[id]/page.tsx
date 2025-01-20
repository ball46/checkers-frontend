'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GameLayout } from '@/components/game/layout/GameLayout';
import { gameApi } from '@/api/game';
import type { Game } from '@/types/game';
import { Loading } from '@/common/Loading';

export default function GamePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGame = async () => {
      try {
        const data = await gameApi.getGameById(id);
        setGame(data);
      } catch (error) {
        console.error('Failed to load game:', error);
      } finally {
        setLoading(false);
      }
    };
    loadGame();
  }, [id]);

  const handleForfeit = async () => {
    if (window.confirm('Are you sure you want to leave the game?')) {
      router.push('/'); // Navigate back to home page
    }
  };

  if (loading) return <Loading size="lg" className="m-8" />;

  return (
    <main className="container mx-auto px-4 py-8">
      <GameLayout 
        gameId={id}
        game={game}
        onForfeit={handleForfeit}
      />
    </main>
  );
}