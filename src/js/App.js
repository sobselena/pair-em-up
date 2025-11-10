import { createGameBoard } from './GameBoard.js';
import { createHeader } from './Header.js';

export class App {
  constructor() {
    this.header = createHeader();
    this.gameBoard = createGameBoard();
  }

  render(root = document.body) {
    root.append(this.header.getNode(), this.gameBoard.getNode());
  }
}
