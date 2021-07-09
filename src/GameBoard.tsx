
import React from 'react';

import GameBoardCell from './GameBoardCell';
import Grid from './grid';
import Cell from './cell';

import './GameBoard.css';

type GameBoardProps = {
  size: number,
  mines: number,
}

type GameBoardState = {
  grid: Grid,
}

class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
  constructor(props: GameBoardProps) {
    super(props);
    console.info("GameBoard:", props); // DEBUG

    this.state = {
      grid: new Grid(props.size, props.mines),
    }

    console.info("GameBoard state:", this.state); // DEBUG
  }

  render() {
    const renderedGrid = this.state.grid.cells.map((row: Array<Cell>, rx: number) => {
      const renderedRow = row.map((cell: Cell, cx: number) => {
        const key = `${rx}-${cx}`;
        return <GameBoardCell cell={cell} key={key}></GameBoardCell>
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
