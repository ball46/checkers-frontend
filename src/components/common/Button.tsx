import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'error' | 'accent';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg transition-colors duration-200 font-medium';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    error: 'bg-error text-white hover:bg-error/90',
    accent: 'bg-accent text-white hover:bg-accent/90'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${
        disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};