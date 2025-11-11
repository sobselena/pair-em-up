export class App {
  constructor({ header, gameBoard, startMenu, settings }) {
    this.header = header.getNode();
    this.gameBoard = gameBoard.getNode();
    this.startMenu = startMenu.getNode();
    this.settings = settings.getNode();
  }

  render(root = document.body) {
    root.append(this.header, this.gameBoard, this.startMenu, this.settings);
  }
}
