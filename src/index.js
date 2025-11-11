import { App } from './js/App.js';
import { gameBoard } from './js/GameBoard.js';
import { header } from './js/Header.js';
import { startMenu } from './js/StartMenu.js';
import { settings } from './js/Settings.js';
import { gameResults } from './js/GameResults.js';
const app = new App({ header, gameBoard, startMenu, settings, gameResults });
app.render();
