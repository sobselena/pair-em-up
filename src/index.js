import { App } from './js/App.js';
import { gameBoard } from './js/GameBoard.js';
import { header } from './js/Header.js';
import { startMenu } from './js/StartMenu.js';
import { settings } from './js/Settings.js';
const app = new App({ header, gameBoard, startMenu, settings });
app.render();
