
export default class Cell {
  row: number;
  col: number;
  hasMine: boolean;
  hasFlag: boolean;
  isRevealed: boolean;
  numAdjacent: number|null;

  constructor({row, col}: {row: number, col: number}) {
    this.row = row;
    this.col = col;

    this.hasMine = false;
    this.hasFlag = false;
    this.isRevealed = false;
    this.numAdjacent = 0;
  }


  /**
   * Reveal a cell and determine if it contained a mine.
   *
   * @returns `true` if a mine was revealed, `false` otherwise.
   */
  reveal(): boolean {
    if ( this.isRevealed || this.hasFlag ) {
      return false;
    }

    this.isRevealed = true;
    return this.hasMine;
  }


  /**
   * Add or remove a flag on this cell.
   *
   * @returns If the cell currently has a flag
   */
  toggleFlag(): boolean {
    this.hasFlag = !this.hasFlag;
    return this.hasFlag;
  }
};
