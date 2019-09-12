import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tic-Tac-Toe';
  currPlayer = 'X';
  winner = null;
  boardSize = 3;
  board = new Array(this.boardSize * this.boardSize).fill('');

  onCellClick(cellNum) {
    if (this.winner) return;
    const row = Math.floor(cellNum / this.boardSize);
    const col = cellNum % this.boardSize;
    console.log(`(${row}, ${col})`);
  }

  reset() {
    // TODO: actually reset stuff
  }
}
