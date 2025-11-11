export class App {
  constructor({ header, gameBoard, startMenu, settings, gameResults, overlay }) {
    this.header = header.getNode();
    this.gameBoard = gameBoard.getNode();
    this.startMenu = startMenu.getNode();
    this.settings = settings.getNode();
    this.gameResults = gameResults.getNode();
    this.overlay = overlay.getNode();
  }

  render(root = document.body) {
    root.append(
      this.header,
      this.gameBoard,
      this.startMenu,
      this.settings,
      this.gameResults,
      this.overlay,
    );
  }
}
