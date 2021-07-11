
import React from 'react';

import GameBoardCell from './GameBoardCell';
import Grid from './grid';
import Cell from './cell';

import { GameParams, GameState } from './game-types';

import './GameBoard.css';

type GameBoardProps = {
  gameState: GameState,
  gameFinished: (didPlayerWin: boolean|undefined) => void,
  reset: (params: GameParams) => void,
}

type GameBoardState = {
  grid: Grid,
}

class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
  constructor(props: GameBoardProps) {
    super(props);
    console.info("GameBoard:", props); // DEBUG

    this.state = {
      grid: new Grid(props.gameState.size, props.gameState.mines),
    }

    this.clickCell = this.clickCell.bind(this);
    this.toggleFlag = this.toggleFlag.bind(this);

    console.info("GameBoard state:", this.state); // DEBUG
  }

  clickCell(clickedCell: Cell) {
    console.info("GameBoard.clickCell():", clickedCell);
    if ( ! this.props.gameState.isGameActive ) {
      return;
    }

    const result = this.state.grid.clickCell(clickedCell);

    // Update the state so that React triggers things to re-render
    this.setState({grid: this.state.grid});

    if ( !result.gameActive ) {
      console.info("GAME OVER:", result); // DEBUG
      this.props.gameFinished(result?.playerVictory);
    }
  }

  toggleFlag(flaggedCell: Cell) {
    if ( ! this.props.gameState.isGameActive ) {
      return;
    }

    const result = this.state.grid.toggleFlag(flaggedCell);

    this.setState({grid: this.state.grid});

    const flagsUsed = this.state.grid.countFlaggedCells();
    // TODO: pass this info up

    if ( ! result.gameActive ) {
      console.info("GAME OVER:", result); // DEBUG
      this.props.gameFinished(result?.playerVictory);
    }
  }

  render() {
    const renderedGrid = this.state.grid.cells.map((row: Array<Cell>, rx: number) => {
      const renderedRow = row.map((cell: Cell, cx: number) => {
        const key = `${rx}-${cx}`;
        return <GameBoardCell cell={cell} onCellClick={this.clickCell} onToggleFlag={this.toggleFlag} key={key}></GameBoardCell>
      });
      return <div className="row" key={rx}>{renderedRow}</div>
    });
    console.info("--renderedGrid:", renderedGrid); // DEBUG

    return (
      <div className="game-board">
        {renderedGrid}
      </div>
    )
  }
}

export default GameBoard;
