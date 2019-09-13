import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  player1: string;
  player2: string;
  boardSize: number;
  currPlayer: string;
  winner: string;
  draw: boolean;
  board: Array<string>;

  constructor() {
    this.reset();
  }

  /**
   * Event handler triggered by a board cell being clicked
   * @param cellNum the number index of the clicked cell
   */
  onCellClick(cellNum: number): void {
    if (!!this.winner || this.draw) return;
    if (this.board[cellNum]) return;

    // console.log(this.getCoords(cellNum));

    this.board[cellNum] = this.currPlayer;

    this.winner = this.checkWin();
    if (!!this.winner) return;

    this.draw = this.checkDraw(true);

    this.currPlayer = this.nextPlayer();
  }

  // ==========================================================================

  /**
   * Pure helper function to check if there is a win (full row, column, or diagonal)
   * of the same symbol
   * @returns the character symbol of the winner, if there is one, empty string otherwise
   */
  checkWin(): string {
    for (let coord = 0; coord < this.boardSize; coord++) {
      // check horizontals
      const rowMatch = this.checkCharsMatch(this.getBoardLine('row', coord));
      if (!!rowMatch) return rowMatch;

      // check verticals
      const colMatch = this.checkCharsMatch(this.getBoardLine('col', coord));
      if (!!colMatch) return colMatch;
    }
    // check diagonals
    let diagMatch = this.checkCharsMatch(this.getBoardLine('diag', 1));
    if (!!diagMatch) return diagMatch;
    diagMatch = this.checkCharsMatch(this.getBoardLine('diag', -1));
    if (!!diagMatch) return diagMatch;

    return '';
  }

  // ==========================================================================
  // ==========================================================================

  /**
   * Pure helper function to get just the elements of the board in the desired row or column
   * @param direction specifies which direction; should be `row`, `col`, or `diag`
   * @param selector the `coordinate number` of the desired row or column, or an indicator
   *                 for diagonal up or down (`number > 0` for up, `number < 0` for down)
   */
  getBoardLine(direction: string, selector: number): Array<string> {
    // diagonal down
    if (direction === 'diag' && selector < 0) {
      return this.board.filter((_, cellNum) => {
        const { row, col } = this.getCoords(cellNum);
        return row === col;
      });
    }
    // diagonal up
    if (direction === 'diag' && selector > 0) {
      return this.board.filter((_, cellNum) => {
        const { row, col } = this.getCoords(cellNum);
        return row + col + 1 === this.boardSize;
      });
    }
    // any row or column
    return this.board.filter(
      (_, cellNum) => this.getCoords(cellNum)[direction] === selector,
    );
  }

  /**
   * Pure helper function to check if all the strings in a given set are all the same, or
   * all match a specified string.
   * @param chars an array of strings to check
   * @param [charToMatch] optional string to specify what everything should match
   * @returns the matching symbol if all strings match, and an empty string otherwise
   */
  checkCharsMatch(chars: Array<string>, charToMatch: string = chars[0]): string {
    return chars.every(char => char === charToMatch) ? charToMatch : '';
  }

  /**
   * Pure helper function to check if all the cells on the board in a given set match.
   * Intended to check a single line for a win.
   * @param cellNums an array of indices for cells to check on the board
   * @param [charToMatch] optional string to specify what everything should match
   * @returns the matching symbol if all strings match, and an empty string otherwise
   */
  checkCellsMatch(
    cellNums: Array<number>,
    charToMatch: string = this.boardSize[cellNums[0]],
  ): string {
    return cellNums.every(cellNum => this.board[cellNum] === charToMatch)
      ? charToMatch
      : '';
  }

  // ==========================================================================

  /**
   * Pure helper function to check if there is a draw (no win but full board)
   * @returns true if there is a draw, false otherwise
   */
  checkDraw(alreadyCheckedWin: boolean = false): boolean {
    /* NOTE: having to check if there's a win first is somewhat inefficient, 
       but safer than assuming it has already been checked */
    if (!alreadyCheckedWin && !!this.checkWin()) return false;
    for (let index = 0; index < this.board.length; index++) {
      // if there is any empty cell, not a draw yet
      if (!this.board[index]) return false;
    }
    return true;
  }

  // ==========================================================================

  /**
   * Small, pure helper function to get the character for the next player
   * @returns the character for the next player
   */
  nextPlayer(): string {
    return this.currPlayer === this.player1 ? this.player2 : this.player1;
  }

  /**
   * Helper function to get the number of the current player, can be used for styling
   */
  currPlayerNumber(): number {
    return this.currPlayer === this.player1 ? 1 : 2;
  }

  // ==========================================================================

  /**
   * Pure helper function to calculate the grid coordinates of the given cell
   * @param cellNum the number of the cell
   */
  getCoords(cellNum: number): { row: number; col: number } {
    return {
      row: Math.floor(cellNum / this.boardSize),
      col: cellNum % this.boardSize,
    };
  }

  /**
   * Calculates the spot in the single layer array corresponding to the coordinates if
   * it was a 2D array
   * @param row the row coordinate
   * @param col the column coordinate
   * @returns the index in the board array corresponding to the given coordinates
   */
  getIndex(row: number, col: number): number {
    return row * this.boardSize + col;
  }

  // ==========================================================================
  // ==========================================================================

  /**
   * Resets all game variables to start state
   * @param p1 {string} the character for the first player
   * @param p2 {string} the character for the second player
   * @param boardSize {number} the dimension of the board
   */
  reset(p1: string = '#', p2: string = '?', boardSize: number = 3): void {
    this.player1 = p1;
    this.player2 = p2;
    this.boardSize = boardSize;
    // TODO: set style variable of <app-board> inline?
    this.currPlayer = this.player1;
    this.winner = null;
    this.draw = false;
    this.board = new Array(this.boardSize * this.boardSize).fill('');
  }
}
