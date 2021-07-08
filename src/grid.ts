
import Cell from './cell';

export default class Grid {
  size: number;
  mines: number;
  cells: Cell[][];

  constructor(size: number, mines: number) {
    this.size = size;
    this.mines = mines;

    this.cells = this.__initializeGrid();

    // Count adjacent cells
    let row, col;
    for ( row = 0; row < this.size; row++ ) {
      for ( col = 0; col < this.size; col++ ) {
        this.cells[row][col].numAdjacent = this.countAdjacentMines(this.cells[row][col]);
      }
    }
  }


  /**
   * Create the Minesweeper grid and populate it with mines.
   *
   * @returns An initialized grid.
   */
  __initializeGrid(): Cell[][] {
    console.info("initializing grid"); // DEBUG
    const cells = Array(this.size);
    let row, col;

    // Create the grid's structure
    for ( row = 0; row < this.size; row++ ) {
      cells[row] = Array(this.size);
      for ( col = 0; col < this.size; col++ ) {
        cells[row][col] = new Cell({row, col});
      }
    }

    // Determine where the mines go
    for ( let i = 0; i < this.mines; i++ ) {
      do {
        row = Math.floor(Math.random() * this.size);
        col = Math.floor(Math.random() * this.size);
      } while ( cells[row][col].hasMine )
      cells[row][col].hasMine = true;
    }

    return cells;
  }



  /**
   * Count the number of mines adjacent to the target cell.
   *
   * @param cell The target cell.
   * @returns The number of adjacent cells.
   */
  countAdjacentMines(cell: Cell): number {
    let adjacent: number = 0;
    let rowTemp, colTemp;

    for ( let rowDelta = -1; rowDelta <= 1; rowDelta++) {
      for ( let colDelta = -1; colDelta <= 1; colDelta++ ) {
        // Don't check the current cell
        if ( rowDelta == 0 && colDelta == 0 ) {
          continue;
        }

        rowTemp = cell.row + rowDelta;
        colTemp = cell.col + colDelta;

        if ( rowTemp >= 0 && rowTemp < this.size && colTemp >= 0 && colTemp < this.size ) {
          // console.debug("checking:", rowTemp, colTemp, this.cells[rowTemp][colTemp].hasMine); // DEBUG
          if ( this.cells[rowTemp][colTemp].hasMine ) {
            adjacent++;
          }
        }
      }
    }

    return adjacent;
  }


  /**
   * Click a cell on the board and take the appropriate actions.
   *
   * @param clickedCell The cell that was clicked
   * @returns An object representing whether the game is continuing (`gameActive`)
   *          and, if not, whether or not the player won (`playerVictory`).
   */
  clickCell(clickedCell: Cell): { gameActive: boolean, playerVictory?: boolean } {
    console.debug("[Grid] clicked cell:", clickedCell); // DEBUG

    if ( clickedCell.hasFlag ) {
      return {
        gameActive: true,
      };
    }

    if ( clickedCell.hasMine ) {
      clickedCell.isRevealed = true;
      return {
        gameActive: false,
        playerVictory: false,
      };
    }

    this.revealCells(clickedCell.row, clickedCell.col);

    if ( this.checkSolution() ) {
      return {
        gameActive: false,
        playerVictory: true,
      };
    } else {
      return {
        gameActive: true,
      };
    }
  }


  /**
   * Flag a cell and take the appropriate action.
   *
   * @param flaggedCell The cell that was flagged (or unflagged)
   * @returns An object representing whether the game is continuing (`gameActive`)
   *          and, if not, whether or not the player won (`playerVictory`).
   */
  toggleFlag(flaggedCell: Cell): { gameActive: boolean, playerVictory?: boolean } {
    if ( flaggedCell.isRevealed ) {
      return {
        gameActive: true,
      };
    }

    flaggedCell.toggleFlag();

    if ( this.checkSolution() ) {
      return {
        gameActive: false,
        playerVictory: true,
      };
    } else {
      return {
        gameActive: true,
      };
    }
  }


  /**
   * Determine how many cells on the game board have been flagged.
   *
   * @returns The number of cells that have been flagged.
   */
  countFlaggedCells(): number {
    return this.cells.flat()
                     .map(cell => cell.hasFlag)
                     .filter(val => val)
                     .length;
  }


  /**
   * Determine which adjacent cells can be revealed to the player.
   *
   * @param row The target cell's row
   * @param col The target cell's column
   */
  revealCells(row: number, col: number) {
    // It should never come to this, but just in case.
    if ( this.cells[row][col].hasMine ) {
      return;
    }

    // Already checked this cell.
    if ( this.cells[row][col].isRevealed ) {
      return;
    }

    // Normal base condition.  Reveal and terminate.
    if ( this.cells[row][col].numAdjacent != 0 ) {
      this.cells[row][col].isRevealed = true;
      return;
    }

    this.cells[row][col].isRevealed = true;

    // Recursive step.  Call on adjacent cells.
    let rowTemp, colTemp;
    for ( let rowDelta = -1; rowDelta <= 1; rowDelta++ ) {
      for ( let colDelta = -1; colDelta <= 1; colDelta++ ) {
        rowTemp = row + rowDelta;
        colTemp = col + colDelta;

        if ( rowTemp >= 0 && rowTemp < this.size && colTemp >= 0 && colTemp < this.size ) {
          this.revealCells(rowTemp, colTemp);
        }
      }
    }
  }


  /**
   * Determine if all mines have been found and no extraneous flags have been used.
   *
   * @returns `true` if all mines have been found, `false` otherwise
   */
  checkSolution(): boolean {
    // The solution is correct if every cell with a mine has been flagged and every
    // cell with a flag has a mine.  So, check if hasMine === hasFlag.
    // TODO: Also, make sure that every cell has either been revealed or has a flag.

    let numRevealedOrFlagged = 0;

    for ( let row = 0; row < this.cells.length; row++ ) {
      for ( let col = 0; col < this.cells[row].length; col++ ) {
        if ( this.cells[row][col].hasFlag != this.cells[row][col].hasMine ) {
          // If hasFlag != hasMine, then the solution isn't correct.
          return false;
        }

        // This is to make sure that we don't declare victory
        // before revealing or flagging all cells.
        if ( this.cells[row][col].hasFlag || this.cells[row][col].isRevealed ) {
          numRevealedOrFlagged += 1;
        }
      }
    }

    if ( numRevealedOrFlagged == this.size * this.size ) {
      return true;
    } else {
      return false;
    }
  }
};
