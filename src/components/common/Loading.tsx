import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`
          ${sizeClasses[size]}
          border-accent
          border-t-transparent
          rounded-full
          animate-spin
          ${className}
        `}
      />
    </div>
  );
};