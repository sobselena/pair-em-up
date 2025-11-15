import { Component } from './Component.js';
import { Button } from './Button.js';
import { board, saveFinishedGame } from './OverallData.js';
import { showHints } from './ShowHints.js';
import { gameBoard } from './GameBoard.js';
import { GridItem } from './BoardGrid.js';
import { header } from './Header.js';
import { COLUMNS_MAX_COUNT } from './Data.js';
import { audioPromisesObj, playAudio } from './Audio.js';
import { settingsOptions } from './Settings.js';

function addNumbers() {
  const newNumsArr = board.addNewNums();
  if (!newNumsArr) return;
  if (settingsOptions['assist-tool-usage'] === 'on') {
    audioPromisesObj['assist-tools'].then((buffer) => {
      playAudio(buffer);
    });
  }

  if (Math.ceil(board.flattenDigits.length / COLUMNS_MAX_COUNT) > 50) {
    saveFinishedGame('Loss');
    board.changeToPrevious();
    return;
  }

  if (board.checkIfLossCondition()) {
    saveFinishedGame('Loss');
    return;
  }

  gameBoard.getChildEl('.game-board__grid').append(
    ...newNumsArr.map((num, index) => {
      const { row, column } = board.translateFlatToMatrixCoords(
        board.flattenDigits.length - newNumsArr.length + index,
      );
      return new GridItem({ classes: ['game-board__cell'], row, column, text: num }).getNode();
    }),
  );

  header.getChildEl('.header__add-numbers-count').textContent = board.getAddedCount();
  header.getChildEl('.header__revert-count').textContent = board.getPreviousCount();
  header.getChildEl('.header__moves').textContent = board.getTotalMoves();
  gameBoard.getChildEl('.game-board__lines-count').textContent = Math.ceil(
    board.flattenDigits.length / COLUMNS_MAX_COUNT,
  );
  showHints(board.showHints);
}

function shuffle() {
  if (board.getShuffleCount() === 0) return;
  if (settingsOptions['assist-tool-usage'] === 'on') {
    audioPromisesObj['assist-tools'].then((buffer) => {
      playAudio(buffer);
    });
  }

  board.shuffle(board.flattenDigits);
  gameBoard.getChildrenEl('.game-board__cell').forEach((child, index) => {
    child.textContent = board.flattenDigits[index];
  });
  header.getChildEl('.header__shuffle-count').textContent = board.getShuffleCount();
  header.getChildEl('.header__revert-count').textContent = board.getPreviousCount();
  header.getChildEl('.header__moves').textContent = board.getTotalMoves();
  showHints(board.isHintOn);

  if (board.checkIfLossCondition()) {
    saveFinishedGame('Loss');
  }
}

function erase() {
  if (!gameBoard.getChildEl('.game-board__cell_active') || board.getRemovedCount() === 0) return;
  if (settingsOptions['assist-tool-usage'] === 'on') {
    audioPromisesObj['assist-tools'].then((buffer) => {
      playAudio(buffer);
    });
  }
  board.eraser();
  header.getChildEl('.header__eraser-count').textContent = board.getRemovedCount();
  const erasedEl = gameBoard.getChildEl(`.game-board__cell_active`);
  erasedEl.textContent = '';

  erasedEl.classList.remove('game-board__cell_active');
  header.getChildEl('.header__revert-count').textContent = board.getPreviousCount();
  header.getChildEl('.header__moves').textContent = board.getTotalMoves();
  showHints(board.isHintOn);
  if (board.flattenDigits.filter((num) => num !== '').length === 0) {
    saveFinishedGame('Loss');
  }
  if (board.checkIfLossCondition()) {
    saveFinishedGame('Loss');
  }
}

function revert() {
  if (board.getPreviousCount() === 0) return;
  if (settingsOptions['assist-tool-usage'] === 'on') {
    audioPromisesObj['assist-tools'].then((buffer) => {
      playAudio(buffer);
    });
  }
  board.changeToPrevious();
  const addTo = board.getAddTo();
  header.getChildEl('.header__moves').textContent = board.getTotalMoves();

  if (addTo) {
    for (let i = addTo; i < board.flattenDigits.length; i += 1) {
      const { row, column } = board.translateFlatToMatrixCoords(i);
      gameBoard
        .getChildEl(`.game-board__cell[data-row="${row}"][data-column="${column}"]`)
        .remove();
    }
    board.flattenDigits = board.flattenDigits.slice(0, addTo);
    header.getChildEl('.header__add-numbers-count').textContent = board.getAddedCount();
    board.updateMatrix();
    board.unsetAddTo();
  } else if (board.getBeforeShuffle()) {
    gameBoard.getChildrenEl('.game-board__cell').forEach((child, index) => {
      child.textContent = board.flattenDigits[index];
    });
    header.getChildEl('.header__shuffle-count').textContent = board.getShuffleCount();
    board.unsetBeforeShuffle();
  } else {
    const previousCoords = board.getPreviousCoords();
    const previousNums = board.getPreviousNums();

    const { column1, row1, column2, row2 } = previousCoords;
    const { num1, num2 } = previousNums;

    if (column1 === undefined && num1 === undefined) return;
    gameBoard.getChildEl(
      `.game-board__cell[data-row="${row1}"][data-column="${column1}"]`,
    ).textContent = num1;
    if (column2 !== undefined && num2 !== undefined) {
      gameBoard.getChildEl(
        `.game-board__cell[data-row="${row2}"][data-column="${column2}"]`,
      ).textContent = num2;
    }
    board.unsetPreviousCoordsNums();
  }

  header.getChildEl('.header__revert-count').textContent = board.getPreviousCount();
  header.getChildEl('.header__score').textContent = board.getPreviousScore();
  header.getChildEl('.header__eraser-count').textContent = board.getRemovedCount();
  gameBoard.getChildEl('.game-board__lines-count').textContent = Math.ceil(
    board.flattenDigits.length / COLUMNS_MAX_COUNT,
  );
  showHints(board.isHintOn);
}

export function createHeaderAssistTools() {
  return new Component(
    { tag: 'div', classes: ['header__assist-tools'] },
    new Button(
      {
        classes: ['button_hints'],
        onClick: () => {
          if (settingsOptions['assist-tool-usage'] === 'on') {
            audioPromisesObj['assist-tools'].then((buffer) => {
              playAudio(buffer);
            });
          }
          board.isHintOn = !board.isHintOn;
          showHints(board.isHintOn);
        },
      },
      new Component({ tag: 'span', text: 'Hints (' }),
      new Component({ tag: 'span', text: '5+', classes: ['header__hints-count'] }),
      new Component({ tag: 'span', text: ')' }),
    ),
    new Button(
      { classes: ['button_revert'], onClick: revert },
      new Component({ tag: 'span', text: 'Revert (' }),
      new Component({ tag: 'span', text: '0', classes: ['header__revert-count'] }),
      new Component({ tag: 'span', text: ')' }),
    ),
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
