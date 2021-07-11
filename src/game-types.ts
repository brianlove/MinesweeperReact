
interface GameParams {
  size: number,
  mines: number,
}

interface GameState {
  size: number,
  mines: number,
  flagsUsed: number,
  isGameActive: boolean,
  didPlayerWin: boolean,
  gameKey: number,
}

export type {
  GameParams,
  GameState,
};
