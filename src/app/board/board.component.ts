import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  @Input() board: Array<string>;
  @Input() players: Array<string>;
  @Output() cellClick = new EventEmitter();

  showCellNums = false;

  /**
   * Gets the number of the player in the specified cell on the board, if there is one.
   * Can be used for styling.
   * @param cellNum the number of the board cell to check
   * @returns the number of the player in the cell, or `0` if cell is empty
   */
  getPlayerNum(cellNum: number): number {
    return 1 + this.players.findIndex(player => player === this.board[cellNum]);
  }
}
