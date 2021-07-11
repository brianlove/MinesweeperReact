
interface GameParams {
  size: number,
  mines: number,
}

type GameState = {
  size: number,
  mines: number,
  flagsUsed: number,
  isGameActive: boolean,
  didPlayerWin: boolean,
}

export type {
  GameParams,
  GameState,
};
