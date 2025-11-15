import { Component } from './Component.js';
import { ButtonIcon } from './Button.js';
import { board, saveData, setNewBoard } from './OverallData.js';
import { createGrid, gameBoard } from './GameBoard.js';
import { header } from './Header.js';
import { showHints } from './ShowHints.js';
import { COLUMNS_MAX_COUNT } from './Data.js';

export function continueManualSaving() {
  const savedData = JSON.parse(localStorage.getItem('manualSave'));
  if (!savedData) return;
  board.stopTimer();
  setNewBoard(savedData);
  resetLayout();
}

function saveManually() {
  const savedData = saveData();
  localStorage.setItem('manualSave', JSON.stringify(savedData));
  header.getChildEl('.button_continue').classList.remove('disabled');
}
export function setTimer() {
  header.getChildEl('.header__timer').textContent = board.transformTimeFormat();
  const intervalId = setInterval(() => {
    board.increaseCurTime();
    header.getChildEl('.header__timer').textContent = board.transformTimeFormat();
  }, 1000);

  board.setIntervalId(intervalId);
}
export function resetLayout() {
  setTimer();
  gameBoard.getChildEl('.game-board__grid').remove();
  gameBoard.getChildEl('.game-board').append(createGrid().getNode());

  header.getChildEl('.header__shuffle-count').textContent = board.getShuffleCount();
  header.getChildEl('.header__add-numbers-count').textContent = board.getAddedCount();
  header.getChildEl('.header__revert-count').textContent = board.getPreviousCount();
  header.getChildEl('.header__eraser-count').textContent = board.getRemovedCount();
  header.getChildEl('.header__score').textContent = board.getTotalScore();
  header.getChildEl('.header__moves').textContent = board.getTotalMoves();
  header.getChildEl('.header__mode').textContent = board.getMode();
  gameBoard.getChildEl('.game-board__lines-count').textContent = Math.ceil(
    board.flattenDigits.length / COLUMNS_MAX_COUNT,
  );

  showHints(board.isHintOn);
}
export function reset() {
  localStorage.removeItem('manualSave');
  header.getChildEl('.button_continue').classList.add('disabled');
  board.reset();
  resetLayout();
}

export function createHeaderInfo(openSettings) {
  const savedData = localStorage.getItem('manualSave');
  return new Component(
    { tag: 'div', classes: ['header__info'] },
    new Component(
      { tag: 'div', classes: ['header__control-buttons'] },
      new ButtonIcon({
        classes: savedData ? ['button_continue'] : ['button_continue', 'disabled'],
        onClick: continueManualSaving,
      }),
      new ButtonIcon({
        classes: ['button_reset'],
        onClick: reset,
      }),
      new ButtonIcon({
        classes: ['button_save'],
        onClick: saveManually,
      }),
      new ButtonIcon({
        classes: ['button_settings'],
        onClick: openSettings,
      }),
    ),
    new Component(
      { tag: 'div', classes: ['header__mode-container'] },
      new Component({ tag: 'span', text: '( Mode: ' }),
      new Component({ tag: 'span', text: 'Classic', classes: ['header__mode'] }),
      new Component({ tag: 'span', text: ' )' }),
    ),
    new Component({ tag: 'h1', classes: ['header-primary'], text: 'Pair `em up' }),

    new Component(
      { tag: 'div', classes: ['header__statistics'] },
      new Component(
        { tag: 'div', classes: ['header__moves-container'], text: 'Moves: ' },
        new Component({ tag: 'span', classes: ['header__moves'], text: '0' }),
      ),
      new Component(
        { tag: 'div', classes: ['header__score-container'], text: 'Score: ' },
        new Component({ tag: 'span', classes: ['header__score'], text: '0' }),
      ),
      new Component(
        { tag: 'div', classes: ['header__timer-container'], text: 'Time: ' },
        new Component({ tag: 'span', classes: ['header__timer'], text: '00:00' }),
      ),
    ),
  );
}
