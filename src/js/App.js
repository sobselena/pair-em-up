export class App {
  constructor({ header, gameBoard, startMenu }) {
    this.header = header.getNode();
    this.gameBoard = gameBoard.getNode();
    this.startMenu = startMenu.getNode();
  }

  render(root = document.body) {
    root.append(this.header, this.gameBoard, this.startMenu);
  }
}
