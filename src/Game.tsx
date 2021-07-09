
import React from 'react';

import GameBoard from './GameBoard';
import GameControls from './GameControls';

import './Game.css';

type GameState = {
  isGameActive: boolean,
  didPlayerWin: boolean,
  size: number,
  mines: number,
  flagsUsed: number,
}

class Game extends React.Component<{}, GameState> {
  // size = 8;
  // mines = 8;

  constructor(props: any) {
    super(props);
    this.state = {
      isGameActive: true,
      didPlayerWin: false,
      size: 8,
      mines: 8,
      flagsUsed: 0,
    }
    console.info("Game:", this); // DEBUG
  }

  render() {
    return (
      <div className="minesweeper">
        <div className="container">
          <h1>MinesweeperReact</h1>
          <GameControls></GameControls>
          <GameBoard size={this.state.size} mines={this.state.mines}></GameBoard>
        </div>
      </div>
    )
  }
}

export default Game;
