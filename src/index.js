import { App } from './js/App.js';
import { gameBoard } from './js/GameBoard.js';
import { header } from './js/Header.js';
import { startMenu } from './js/StartMenu.js';
const app = new App({ header, gameBoard, startMenu });
app.render();
