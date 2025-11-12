import { Component } from './Component.js';
import { ButtonIcon } from './Button.js';
import { board } from './OverallData.js';
import { createGrid, gameBoard, updateHints } from './GameBoard.js';
import { header } from './Header.js';
import { openSettings } from './Settings.js';

export function continuePrev() {}

export function reset() {
  board.reset();
  gameBoard.getChildEl('.game-board__grid').remove();
  gameBoard.getChildEl('.game-board').append(createGrid().getNode());

  header.getChildEl('.header__shuffle-count').textContent = board.getShuffleCount();
  header.getChildEl('.header__add-numbers-count').textContent = board.getAddedCount();
  header.getChildEl('.header__revert-count').textContent = board.getPreviousCount();
  header.getChildEl('.header__eraser-count').textContent = board.getRemovedCount();
  header.getChildEl('.header__score').textContent = board.getTotalScore();
  updateHints(board.isHintOn);
}

function save() {}

export function createHeaderInfo() {
  return new Component(
    { tag: 'div', classes: ['header__info'] },
    new Component(
      { tag: 'div', classes: ['header__control-buttons'] },
      new ButtonIcon({
        classes: ['button_continue'],
        onClick: continuePrev,
      }),
      new ButtonIcon({
        classes: ['button_reset'],
        onClick: reset,
      }),
      new ButtonIcon({
        classes: ['button_save'],
        onClick: save,
      }),
      new ButtonIcon({
        classes: ['button_settings'],
        onClick: openSettings,
      }),
    ),
    new Component({ tag: 'h1', classes: ['header-primary'], text: 'Pair `em up' }),
    new Component(
      { tag: 'div', classes: ['header__statistics'] },
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
