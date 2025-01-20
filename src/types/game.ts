enum Color {
    Black = 'Black',
    White = 'White',
}

export enum GameStatus {
    InProgress = 'InProgress',
    Draw = 'Draw',
    White_winner = 'White Won',
    Black_winner = 'Black Won',
}
  
export interface Piece {
    color: Color;
    isKing: boolean;
}
  
export interface Cell {
    x: number;
    y: number;
    piece: Piece | null;
}
  
export interface Move {
    from: {
      x: number;
      y: number;
    };
    to: {
      x: number;
      y: number;
    };
}
  
export interface ValidMoves {
    [key: string]: Move[];
}

export interface GameListItem {
    id: string;
    name: string;
    status: GameStatus;
}
  
export interface Game {
    id: string;
    name: string;
    board: Cell[];
    currentPlayer: Color;
    status: GameStatus;
    validMoves: ValidMoves;
}
  
export interface CreateGameRequest {
    name: string;
    singlePlayer: boolean;
}