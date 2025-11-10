import { Component } from './Component.js';
import { GridItem, BoardGrid } from './BoardGrid.js';
import { board } from './PairHandler.js';
import { header } from './Header.js';
import { showHints } from './ShowHints.js';
export const gameBoard = new Component(
  { tag: 'main', classes: ['main'] },
  new Component(
    { tag: 'div', classes: ['wrapper'] },
    new Component(
      { tag: 'section', classes: ['game-board'] },
      new BoardGrid({
        classes: ['game-board__grid'],
        gridItems: board.flattenDigits.map((num, index) => {
          const { row, column } = board.translateFlatToMatrixCoords(index);
          return new GridItem({ classes: ['game-board__cell'], row, column, text: num });
        }),
        onGridItemClicked: clickGridItem,
      }),
    ),
  ),
);

function clickGridItem(event) {
  const el = event.target;
  console.log(board);
  if (el.classList.contains('game-board__cell_active')) {
    board.column1 = undefined;
    board.row1 = undefined;
    el.classList.remove('game-board__cell_active');
  } else if (el.classList.contains('game-board__cell') && el.textContent !== '') {
    el.classList.add('game-board__cell_active');
    const column = Number(el.dataset.column);
    const row = Number(el.dataset.row);
    board.setPair({ column, row });
    checkPairs();
    header.getChildEl('.header__score').textContent = board.getTotalScore();
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
      console.log(board.getValidPairs());
      updateStates();
    } else {
      activeEl.classList.remove('game-board__cell_error');
    }
    activeEl.classList.remove('game-board__cell_active');
  }, 300);
}

function updateStates() {
  const validPairsCount = board.getValidPairs().length;
  showHints(board.isHintOn);
  header.getChildEl('.header__hints-count').textContent =
    validPairsCount > 5 ? '5+' : validPairsCount;
}
