export class App {
  constructor({ header, gameBoard }) {
    this.header = header;
    this.gameBoard = gameBoard;
  }

  render(root = document.body) {
    root.append(this.header.getNode(), this.gameBoard.getNode());
  }
}
