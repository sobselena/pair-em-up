export class App {
  constructor({ header, gameBoard, startMenu, settings, gameResults }) {
    this.header = header.getNode();
    this.gameBoard = gameBoard.getNode();
    this.startMenu = startMenu.getNode();
    this.settings = settings.getNode();
    this.gameResults = gameResults.getNode();
  }

  render(root = document.body) {
    root.append(this.header, this.gameBoard, this.startMenu, this.settings, this.gameResults);
  }
}
