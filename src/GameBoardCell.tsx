
import Cell from './cell';

import './GameBoardCell.css';

type GameBoardCellProps = {
  cell: Cell,
}

function GameBoardCell(props: GameBoardCellProps) {
  function clickCell(e: any) {
    console.info("clicked cell:", e); // DEBUG
  }

  let contents;
  if ( props.cell.hasMine ) {
    contents = <span>X</span>
  } else {
    contents = <span>O</span>
  }
  return (
    <div className="cell" onClick={clickCell}>
      {contents}
    </div>
  );
}

export default GameBoardCell;
