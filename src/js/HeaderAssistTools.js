import { Component } from './Component.js';
import { Button } from './Button.js';
import { board } from './PairHandler.js';
import { showHints } from './ShowHints.js';
import { gameBoard } from './GameBoard.js';
import { GridItem } from './BoardGrid.js';
import { header } from './Header.js';

function addNumbers() {
  const newNumsArr = board.addNewNums();
  console.log(newNumsArr);
  if (!newNumsArr) return;
  header.getChildEl('.header__add-numbers-count').textContent = board.getAddedCount();
  gameBoard.getChildEl('.game-board__grid').append(
    ...newNumsArr.map((num, index) => {
      const { row, column } = board.translateFlatToMatrixCoords(
        board.flattenDigits.length - newNumsArr.length + index,
      );
      return new GridItem({ classes: ['game-board__cell'], row, column, text: num }).getNode();
    }),
  );
  showHints(board.showHints);
}

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
