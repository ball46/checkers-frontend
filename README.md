# Checkers Game

A modern web-based implementation of the classic Checkers board game built with Next.js, TypeScript, and Tailwind CSS.

## Overview

This application provides a full-featured Checkers gaming experience with a responsive interface. Players can create games, join existing ones, and enjoy the classic board game with standard rules including king promotion and mandatory captures.

## Features

* **Game Creation**: Create new games with custom names
* **Real-time Updates**: Automatic game state synchronization
* **Interactive Board**: Visual highlighting of selected pieces and valid moves
* **Game Status Tracking**: Monitor current player turn and game outcome
* **Responsive Design**: Play on any device with a clean, adaptive interface

## Tech Stack

* **Next.js**: React framework for server-rendered applications
* **TypeScript**: Type-safe JavaScript
* **Tailwind CSS**: Utility-first CSS framework
* **Axios**: Promise-based HTTP client

## Architecture

The application follows a clean, component-based architecture:

### Core Components

* **Game Board**: Interactive checkers board with piece movement logic
* **Game Controls**: UI controls for game management (forfeit, restart)
* **Game Status**: Real-time display of game state and current player

### API Integration

* RESTful API client for game state management
* Automatic polling for game state updates
* Error handling and loading states

## Project Structure

```
src/
├── api/         # API client for game operations
├── app/         # Next.js app directory with page components
├── components/  # Reusable UI components
│   ├── common/  # General UI components
│   ├── game/    # Game-specific components
│   └── home/    # Home page components
├── lib/         # Utility libraries
├── types/       # TypeScript type definitions
└── utils/       # Helper functions
```

## Game Flow

1. **Home Page**: Create a new game or join an existing one
2. **Game Page**: Interactive board to play the game
3. **Game Over**: Modal with game results and option to return home

## Related Repositories

* **Backend**: [Checkers Game Backend](https://github.com/ball46/checkers-game) - The backend service that powers this application's game logic and API

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Screenshots

Here are some screenshots of the application:

![Home Screen](/public/images/home-screen.png)
*Home screen with game creation and list*

![Game Board](/public/images/game-board.png)
*The main game board with pieces*

![Game Over](/public/images/game-over.png)
*Game over screen showing the result*