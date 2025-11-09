import { GameBoard } from './GameBoard.js';

export class App {
  constructor() {
    this.gameBoard = new GameBoard().gameBoard;
  }

  render(root = document.body) {
    root.append(this.gameBoard.getNode());
  }
}
