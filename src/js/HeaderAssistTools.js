import { Component } from './Component.js';
import { Button } from './Button.js';
import { board } from './PairHandler.js';
import { gameBoard } from './GameBoard.js';

function getRandomColor() {
  return Array(3)
    .fill(0)
    .map(() => Math.floor(Math.random() * (255 - 50 + 1) + 50));
}

function addHintColors({ row, column, randomBackgroundColor, changeColor }) {
  const cellEl = gameBoard.getChildEl(
    `.game-board__cell[data-row="${row}"][data-column="${column}"]`,
  );
  if (board.isHintOn) {
    cellEl.style.backgroundColor = randomBackgroundColor;
    cellEl.style.color = changeColor ? '#fff' : '';
    cellEl.classList.add('game-board__cell_hint');
  } else {
    cellEl.style.backgroundColor = '';
    cellEl.style.color = '';
    cellEl.classList.add('game-board__cell_hint');
  }
}

export function showHints(on = board.isHintOn) {
  board.isHintOn = on;
  const validPairs = board.getValidPairs();

  gameBoard.getChildrenEl('.game-board__cell_hint').forEach((hintEl) => {
    hintEl.style.backgroundColor = '';
    hintEl.style.color = '';
  });

  validPairs.forEach((pairNums) => {
    const { column1, column2, row1, row2 } = pairNums;
    console.log(pairNums);
    const colorArr = getRandomColor();
    const randomBackgroundColor = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
    const changeColor = colorArr[0] < 125 && colorArr[1] < 125 && colorArr[2] < 125;
    addHintColors({ column: column1, row: row1, randomBackgroundColor, changeColor });
    addHintColors({ column: column2, row: row2, randomBackgroundColor, changeColor });
  });
}

function addNumbers() {}
function shuffle() {}
function erase() {}
export function createHeaderAssistTools() {
  return new Component(
    { tag: 'div', classes: ['header__assist-tools'] },
    new Button(
      { classes: ['button_hints'], onClick: () => showHints(!board.isHintOn) },
      new Component({ tag: 'span', text: 'Hints (' }),
      new Component({ tag: 'span', text: '5+', classes: ['header__hints-count'] }),
      new Component({ tag: 'span', text: ')' }),
    ),
    new Button({ classes: ['button_revert'], text: 'Revert' }),
    new Button(
      { classes: ['button_add-numbers'], onClick: addNumbers },
      new Component({ tag: 'span', text: 'Add Numbers (' }),
      new Component({ tag: 'span', text: '10', classes: ['header__add-numbers-count'] }),
      new Component({ tag: 'span', text: ')' }),
    ),
    new Button(
      { classes: ['button_shuffle'], onClick: shuffle },
      new Component({ tag: 'span', text: 'Shuffle (' }),
      new Component({ tag: 'span', text: '5', classes: ['header__shuffle-count'] }),
      new Component({ tag: 'span', text: ')' }),
    ),
    new Button(
      { classes: ['button_eraser'], onClick: erase },
      new Component({ tag: 'span', text: 'Eraser (' }),
      new Component({ tag: 'span', text: '5', classes: ['header__eraser-count'] }),
      new Component({ tag: 'span', text: ')' }),
    ),
  );
}
