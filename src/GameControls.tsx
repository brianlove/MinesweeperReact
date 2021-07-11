
import React from 'react';

import { GameParams } from './game-types';

import './GameControls.css';

type GameControlsProps = {
  gameParams: GameParams,
  flagsUsed: number,
  reset: (params: GameParams) => void,
}

type GameControlsState = {
  size: number,
  mines: number,
  isSizeValid: boolean,
  isMinesValid: boolean,
}

class GameControls extends React.Component<GameControlsProps, GameControlsState> {
  constructor(props: GameControlsProps) {
    super(props);

    this.state = {
      size: props.gameParams.size,
      mines: props.gameParams.mines,
      isSizeValid: true,
      isMinesValid: true,
    }

    this.updateSize = this.updateSize.bind(this);
    this.updateMines = this.updateMines.bind(this);
    this.reset = this.reset.bind(this);
  }

  updateSize(event: React.FormEvent<HTMLInputElement>) {
    const size = parseInt(event.currentTarget.value);
    if ( size ) {
      this.setState({
        ...this.state,
        size: size,
        isSizeValid: true,
      });
    } else {
      this.setState({
        ...this.state,
        isSizeValid: false,
      });
    }
  }

  updateMines(event: React.FormEvent<HTMLInputElement>) {
    const numMines = parseInt(event.currentTarget.value);
    if ( numMines ) {
      this.setState({
        ...this.state,
        mines: numMines,
        isMinesValid: true,
      });
    } else {
      this.setState({
        ...this.state,
        isMinesValid: false,
      });
    }
  }

  reset() {
    this.setState({
      ...this.state,
      isSizeValid: true,
      isMinesValid: true,
    });

    this.props.reset({size: this.state.size, mines: this.state.mines});
  }

  render() {
    return (
      <div className="controls">
        <div className="config">
          <div>
            Size:
            <input type="text" value={this.state.size} onChange={this.updateSize} />
          </div>
          <div>
            Mines:
            <input type="text" value={this.state.mines} onChange={this.updateMines} />
          </div>
          <button type="button" onClick={this.reset}>
            Reset
          </button>
        </div>
        <div className="info">
          <div>
            Flags: {this.props.flagsUsed}
          </div>
          <div>
            Mines left: {this.props.gameParams.mines - this.props.flagsUsed}
          </div>
        </div>
      </div>
    )
  }
}

export default GameControls;