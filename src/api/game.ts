import { apiClient } from '@/lib/client';
import type { Move, Game, GameListItem, CreateGameRequest } from '@/types/game';

/**
 * Checkers game API client
 */
export const gameApi = {
  getGames: async () => {
    try {
      const response = await apiClient.get<GameListItem[]>('/games');
      return response.data;
    } catch (error) {
      console.error('Failed to get games:', error);
      throw error;
    }
  },
  
  getGameById: async (id: string) => {
    try {
      const response = await apiClient.get<Game>(`/games/id/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get game by id:', error);
      throw error;
    }
  },

  getGameByName: async (name: string) => {
    try {
      const response = await apiClient.get<Game>(`/games/name/${name}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get game by name:', error);
      throw error;
    }
  },
  
  createGame: async (data: CreateGameRequest) => {
    try {
      const response = await apiClient.post<Game>('/games', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create game:', error);
      throw error;
    }
  },
  
  deleteGame: async (id: string) => {
    try {
      const response = await apiClient.delete<void>(`/games/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete game:', error);
      throw error;
    }
  },
  
  makeMove: async (gameId: string, move: Move) => {
    try {
      const response = await apiClient.post<Game>(`/games/${gameId}/move`, move);
      return response.data;
    } catch (error) {
      console.error('Failed to make move:', error);
      throw error;
    }
  }
};

// Export type for client usage
export type GameApiClient = typeof gameApi;