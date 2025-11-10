import { createGameBoard } from './GameBoard.js';

export class App {
  constructor() {
    this.gameBoard = createGameBoard();
  }

  render(root = document.body) {
    root.append(this.gameBoard.getNode());
  }
}
