import { gameBoard } from './GameBoard.js';
import { board } from './OverallData.js';
import { header } from './Header.js';
function getRandomColor() {
  const results = document.body.classList.contains('black-theme')
    ? Array(3)
        .fill(0)
        .map(() => Math.floor(Math.random() * (205 - 0 + 1) + 0))
    : Array(3)
        .fill(0)
        .map(() => Math.floor(Math.random() * (255 - 50 + 1) + 50));
  return results;
}

function addHintColors({ row, column, randomBackgroundColor, changeColor }) {
  const cellEl = gameBoard.getChildEl(
    `.game-board__cell[data-row="${row}"][data-column="${column}"]`,
  );
  if (board.isHintOn) {
    cellEl.style.backgroundColor = randomBackgroundColor;
    if (!document.body.classList.contains('black-theme')) {
      cellEl.style.color = changeColor ? '#e9ecef' : '#222';
    } else {
      cellEl.style.color = changeColor ? '#222' : '#fff';
    }
    cellEl.classList.add('game-board__cell_hint');
  } else {
    cellEl.style.backgroundColor = '';
    cellEl.style.color = '';
    cellEl.classList.add('game-board__cell_hint');
  }
}

export function showHints(on = board.isHintOn) {
  board.isHintOn = on;
  console.log(board);

  const validPairs = board.getValidPairs();

  gameBoard.getChildrenEl('.game-board__cell_hint').forEach((hintEl) => {
    hintEl.style.backgroundColor = '';
    hintEl.style.color = '';
  });
  header.getChildEl('.header__hints-count').textContent =
    validPairs.length > 5 ? '5+' : validPairs.length;
  if (!board.isHintOn) return;

  validPairs.forEach((pairNums) => {
    const { column1, column2, row1, row2 } = pairNums;
    const colorArr = getRandomColor();
    const randomBackgroundColor = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
    const brightness = (colorArr[0] * 299 + colorArr[1] * 587 + colorArr[2] * 114) / 1000;
    const changeColor = brightness < 128;
    addHintColors({ column: column1, row: row1, randomBackgroundColor, changeColor });
    addHintColors({ column: column2, row: row2, randomBackgroundColor, changeColor });
  });
}
