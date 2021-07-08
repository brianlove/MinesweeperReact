
import GameBoardCell from './GameBoardCell';
import Grid from './grid';

// function GameBoardRow(size) {
//   return (
//     <div className="row">

//     </div>
//   )
// }

type GameBoardProps = {
  size: number,
  mines: number,
}

// future props: grid
function GameBoard(props: GameBoardProps) {
  console.info("GameBoard:", props); // DEBUG

  const grid = new Grid(props.size, props.mines);
  console.info("--grid:", grid); // DEBUG

  const renderedGrid = grid.cells.map(row => {
    const renderedRow = row.map(cell => <GameBoardCell cell={cell}></GameBoardCell>)
    return <div className="row">{renderedRow}</div>
  });
  console.info("--renderedGrid:", renderedGrid); // DEBUG

  // const row = new Array(props.size).fill(<GameBoardCell></GameBoardCell>);
  // console.info("--row:", row); // DEBUG
  return (
    <div className="game-board">
      {renderedGrid}
      {/* <div className="row">
        {row}
      </div> */}
    </div>
  )
}

export default GameBoard;

