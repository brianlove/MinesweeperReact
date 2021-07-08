
import Cell from './cell';

import './GameBoardCell.css';

type GameBoardCellProps = {
  cell: Cell,
}

function GameBoardCell(props: GameBoardCellProps) {
  let contents;
  if ( props.cell.hasMine ) {
    contents = <span>X</span>
  } else {
    contents = <span>O</span>
  }
  return (
    <div className="cell">
      {contents}
    </div>
  );
}

export default GameBoardCell;
