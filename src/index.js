import { App } from './js/App.js';
import { gameBoard } from './js/GameBoard.js';
import { header } from './js/Header.js';

const app = new App({ header, gameBoard });
app.render();
