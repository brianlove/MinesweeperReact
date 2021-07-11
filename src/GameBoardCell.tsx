import { MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons';

import Cell from './cell';

import './GameBoardCell.css';

const classList = require('dynamic-class-list').classList;

type GameBoardCellProps = {
  cell: Cell,
  onCellClick: (clickedCell: Cell) => void,
  onToggleFlag: (flaggedCell: Cell) => void,
}

function GameBoardCell(props: GameBoardCellProps) {
  function clickCell(e: MouseEvent) {
    e.preventDefault();
    props.onCellClick(props.cell);
  }

  function flagCell(e: MouseEvent) {
    e.preventDefault();
    props.onToggleFlag(props.cell);
  }

  let contents;
  if ( props.cell.isRevealed && !props.cell.hasFlag && !props.cell.hasMine ) {
    contents = <span>{props.cell.numAdjacent > 0 ? props.cell.numAdjacent : ''}</span>
  } else if ( props.cell.isRevealed && props.cell.hasMine ) {
    contents = <FontAwesomeIcon icon={faBomb}></FontAwesomeIcon>
  } else if ( props.cell.hasFlag ) {
    contents = <FontAwesomeIcon icon={faFlag}></FontAwesomeIcon>
  }

  const numAdjacentClass = props.cell.isRevealed && (props.cell.numAdjacent > 0) ? `adjacent-${props.cell.numAdjacent}` : '';
  const cellClasses = classList(
    'cell',
    numAdjacentClass,
    {
      adjacent: props.cell.isRevealed && props.cell.numAdjacent > 0,
      mine: props.cell.isRevealed && props.cell.hasMine,
      flag: props.cell.hasFlag,
      revealed: props.cell.isRevealed,
    }
  );

  return (
    <div className={cellClasses} onClick={clickCell} onContextMenu={flagCell}>
      {contents}
    </div>
  );
}

export default GameBoardCell;
