import { Component } from './Component.js';
import { GridItem, BoardGrid } from './BoardGrid.js';
import { board, saveFinishedGame } from './OverallData.js';
import { header } from './Header.js';
import { showHints } from './ShowHints.js';

const WIN_SCORE = 100;
export const grid = createGrid();
export const gameBoard = createGameBoard();

export function createGridItems() {
  return board.flattenDigits.map((num, index) => {
    const { row, column } = board.translateFlatToMatrixCoords(index);
    return new GridItem({ classes: ['game-board__cell'], row, column, text: num });
  });
}

export function createGrid() {
  return new BoardGrid({
    classes: ['game-board__grid'],
    gridItems: createGridItems(),
    onGridItemClicked: clickGridItem,
  });
}
export function createGameBoard() {
  return new Component(
    { tag: 'main', classes: ['main'] },
    new Component(
      { tag: 'div', classes: ['wrapper'] },
      new Component({ tag: 'section', classes: ['game-board'] }, grid, createLinesCount()),
    ),
  );
}

function createLinesCount() {
  return new Component(
    { tag: 'div', classes: ['game-board__lines'] },
    new Component({ tag: 'span', text: 'Lines: ' }),
    new Component({ tag: 'span', text: '3', classes: ['game-board__lines-count'] }),
  );
}

function clickGridItem(event) {
  const el = event.target;
  if (el.classList.contains('game-board__cell_active')) {
    if (el.dataset.row === board.row1 && el.dataset.column === board.column1) {
      board.column1 = undefined;
      board.row1 = undefined;
    }
    el.classList.remove('game-board__cell_active');
  } else if (el.classList.contains('game-board__cell') && el.textContent !== '') {
    el.classList.add('game-board__cell_active');
    const column = Number(el.dataset.column);
    const row = Number(el.dataset.row);
    board.setPair({ column, row });
    checkPairs();
    header.getChildEl('.header__score').textContent = board.getTotalScore();
    header.getChildEl('.header__moves').textContent = board.getTotalMoves();
    console.log(board.getTotalScore());

    if (board.getTotalScore() >= WIN_SCORE) {
      saveFinishedGame('Win');
    }

    if (board.flattenDigits.filter((num) => num !== '').length === 0) {
      saveFinishedGame('Loss');
    }

    if (board.checkIfLossCondition()) {
      saveFinishedGame('Loss');
    }
  }
}

function checkPairs() {
  const activeElNodes = document.querySelectorAll(`.game-board__cell_active`);
  if (activeElNodes.length === 2) {
    board.checkPairStatus();
    const isValid = board.getStatus().isValidPair;
    board.unsetStatus();
    activeElNodes.forEach((activeEl) => {
      if (isValid) {
        activeEl.classList.add('game-board__cell_success');
      } else {
        activeEl.classList.add('game-board__cell_error');
      }
      processEvents(isValid, activeEl);
    });
  }
}

function processEvents(isValid, activeEl) {
  setTimeout(() => {
    if (isValid) {
      activeEl.textContent = '';
      activeEl.classList.remove('game-board__cell_success');
      activeEl.style.backgroundColor = '';
      activeEl.style.color = '';
      header.getChildEl('.header__revert-count').textContent = board.getPreviousCount();
      showHints();
    } else {
      activeEl.classList.remove('game-board__cell_error');
    }
    activeEl.classList.remove('game-board__cell_active');
  }, 300);
}
