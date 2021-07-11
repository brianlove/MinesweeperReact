
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
      gameKey: 0,
    }

    this.onGameFinished = this.onGameFinished.bind(this);
    this.onGameReset = this.onGameReset.bind(this);
    this.onUpdateFlagCount = this.onUpdateFlagCount.bind(this);
  }

  onGameFinished(didPlayerWin: boolean|undefined) {
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
      isGameActive: true,
      didPlayerWin: false,
      gameKey: this.state.gameKey + 1,
    });
  }

  onUpdateFlagCount(flagsUsed: number) {
    this.setState({
      ...this.state,
      flagsUsed: flagsUsed,
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
          <GameControls gameParams={{size: this.state.size, mines: this.state.mines}} flagsUsed={this.state.flagsUsed} reset={this.onGameReset}></GameControls>
          <GameBoard gameState={this.state} gameFinished={this.onGameFinished} updateFlagCount={this.onUpdateFlagCount} key={this.state.gameKey}></GameBoard>

          {notifications}
        </div>
      </div>
    )
  }
}

export default Game;
