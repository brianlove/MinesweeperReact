
import React from 'react';

import GameBoard from './GameBoard';
import GameControls from './GameControls';

import { GameParams, GameState } from './game-types';

import './Game.css';


class Game extends React.Component<{}, GameState> {
  constructor(props: any) {
    super(props);
    this.state = {
      size: 8,
      mines: 8,
      flagsUsed: 0,
      isGameActive: true,
      didPlayerWin: false,
    }
    console.info("Game:", this); // DEBUG

    this.onGameFinished = this.onGameFinished.bind(this);
    this.onGameReset = this.onGameReset.bind(this);
  }

  onGameFinished(didPlayerWin: boolean|undefined) {
    console.info("Game over - player won?", didPlayerWin); // DEBUG
    this.setState({
      ...this.state,
      isGameActive: false,
      didPlayerWin: didPlayerWin || false,
    })
  }

  onGameReset({size, mines}: GameParams) {
    this.setState({
      size: size,
      mines: mines,
      flagsUsed: 0,
    });
  }

  render() {
    let notifications;
    if ( !this.state.isGameActive ) {
      if ( this.state.didPlayerWin ) {
        notifications = <div className="notifications victory">You won!</div>
      } else {
        notifications = <div className="notifications defeat">You lose!</div>
      }
    }

    return (
      <div className="minesweeper">
        <div className="container">
          <h1>MinesweeperReact</h1>
          <GameControls></GameControls>
          <GameBoard gameState={this.state} gameFinished={this.onGameFinished} reset={this.onGameReset}></GameBoard>

          {notifications}
        </div>
      </div>
    )
  }
}

export default Game;
