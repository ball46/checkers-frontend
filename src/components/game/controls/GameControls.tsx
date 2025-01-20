import React from 'react';
import { Button } from '@/common/Button';

interface GameControlsProps {
  onForfeit: () => void;
  onRestart?: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ onForfeit, onRestart }) => {
  return (
    <div className="flex space-x-4 p-4">
      <Button 
        variant="error" 
        onClick={onForfeit}
      >
        Forfeit Game
      </Button>
      {onRestart && (
        <Button 
          variant="accent" 
          onClick={onRestart}
        >
          New Game
        </Button>
      )}
    </div>
  );
};