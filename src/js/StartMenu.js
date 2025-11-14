import { Button, ButtonIcon } from './Button.js';
import { Component } from './Component.js';
import { reset, resetLayout } from './HeaderInfo.js';
import { Link } from './Link.js';
import { board, setNewBoard } from './OverallData.js';
import { Table, Tr } from './Table.js';
import { openSettings } from './Settings.js';
import { createGrid, createGridItems, grid } from './GameBoard.js';
import { header } from './Header.js';
const statistics = ['№', 'Mode', 'Score', 'Moves', 'Status', 'Time'];
export const finishedGames =
  JSON.parse(localStorage.getItem('finishedGames')) ||
  Array.from({ length: 5 }, (_, i) => {
    return [
      ['position', i + 1],
      ['mode', ''],
      ['score', ''],
      ['moves', ''],
      ['status', ''],
      ['time', ''],
    ];
  });

function getTimeInSec(time) {
  return time.split(':').reduce((acc, value) => acc + Number(value), 0);
}
function sortFinishedGames() {
  const sortedGames = [...finishedGames].sort((a, b) => {
    const firstTimeOriginal = a.at(-1)[1];
    const secondTimeOriginal = b.at(-1)[1];

    if (firstTimeOriginal === '' && secondTimeOriginal !== '') {
      return 1;
    } else if (firstTimeOriginal !== '' && secondTimeOriginal === '') {
      return -1;
    } else if (firstTimeOriginal === '' && secondTimeOriginal == '') {
      return 0;
    }
    const firstTime = getTimeInSec(firstTimeOriginal);
    const secondTime = getTimeInSec(secondTimeOriginal);
    return firstTime - secondTime;
  });

  sortedGames.forEach((result, i) => {
    result[0][1] = i + 1;
  });
  return sortedGames;
}

const th = function (text) {
  return new Component({ tag: 'th', text });
};

const td = function (text) {
  return new Component({ tag: 'td', text });
};

const tdStatus = function (text) {
  return new Component(
    { tag: 'td', text, classes: ['start-menu__status'] },
    new Component({
      tag: 'span',
      classes: ['img-container', `img-container_${text.toLowerCase()}`],
    }),
  );
};
export const overlay = new Component({ tag: 'div', classes: ['overlay', 'open'] });

export const table = new Table({
  classes: ['start-menu__table'],
  thead: [new Tr(...statistics.map((statisticOption) => th(statisticOption)))],
  tbody: createTbody(),
});
export const startMenu = new Component(
  { tag: 'div', classes: ['start-menu', 'open'] },
  new ButtonIcon({ classes: ['button_settings'], onClick: openSettings }),
  createTitleContainer(),
  createActionsLayout(),
  Results(),
);

function createTitleContainer() {
  return new Component(
    { tag: 'div', classes: ['start-menu__title-container'] },
    new Component({ tag: 'h2', classes: ['header-secondary'], text: 'Pair `em up' }),
    new Component(
      { tag: 'div', classes: ['start-menu__github-link'] },
      new Link({ href: 'https://github.com/sobselena', text: 'sobselena' }),
      new Link({
        href: 'https://github.com/sobselena',
        classes: ['start-menu__github-img-link', 'img-container'],
      }),
    ),
  );
}

function chooseMode(event, modesContainer) {
  const el = event.target;
  if (!el.classList.contains('button_mode')) return;
  modesContainer.getAllChildren().forEach((child) => {
    child.getNode().classList.remove('active');
  });
  board.changeMode(el.textContent.toLowerCase());

  el.classList.add('active');
}

function startNewGame() {
  startMenu.getNode().classList.remove('open');
  overlay.getNode().classList.remove('open');
  reset();
}
function continuePreviousAutoGame() {
  const savedData = JSON.parse(localStorage.getItem('autoSave'));
  console.log(savedData);
  if (!savedData) return;
  startMenu.getNode().classList.remove('open');
  overlay.getNode().classList.remove('open');
  setNewBoard(savedData);
  resetLayout();
}
function createModesContainer() {
  const modesContainer = new Component(
    { tag: 'div', classes: ['start-menu__modes-container'] },
    new Button({ classes: ['button_mode', 'active'], text: 'Classic' }),
    new Button({ classes: ['button_mode'], text: 'Random' }),
    new Button({ classes: ['button_mode'], text: 'Chaotic' }),
  );

  modesContainer.addListener('click', (event) => chooseMode.call(null, event, modesContainer));
  return modesContainer;
}
function createActionsLayout() {
  return new Component(
    { tag: 'div', classes: ['start-menu__actions'] },
    createModesContainer(),
    new Component(
      { tag: 'div', classes: ['start-menu__action-container'] },
      new Button({ classes: ['button_continue'], text: 'Start New Game', onClick: startNewGame }),
      new Button({
        classes: ['button_continue'],
        text: 'Continue Previous',
        onClick: continuePreviousAutoGame,
      }),
    ),
  );
}

function createTd(option) {
  if (option === 'Win' || option === 'Loss') {
    return tdStatus(option);
  }
  return td(option);
}

export function createTbody() {
  return sortFinishedGames().map((result) => {
    return new Tr(...result.map(([, option]) => createTd(option)));
  });
}

function Results() {
  return new Component(
    { tag: 'div', classes: ['start-menu__results'] },
    ...(finishedGames.length === 0
      ? []
      : [new Component({ tag: 'h2', classes: ['header-secondary'], text: 'Results:' }), table]),
  );
}
