import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Game theme colors
        'board-light': '#F0D9B5',
        'board-dark': '#B58863',
        'piece-black': '#000000',
        'piece-white': '#FFFFFF',
        'piece-border': '#333333',
        'highlight': '#769656',
        'highlight-move': 'rgba(255, 255, 0, 0.5)',
        // UI colors
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
        'primary': '#4A5568',
        'secondary': '#718096',
        'accent': '#48BB78',
        'error': '#F56565',
      },
      spacing: {
        'board': '640px',
        'cell': '80px',
      },
      gridTemplateColumns: {
        'board': 'repeat(8, minmax(0, 1fr))',
      },
      animation: {
        'bounce-piece': 'bounce 0.5s ease-in-out',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;