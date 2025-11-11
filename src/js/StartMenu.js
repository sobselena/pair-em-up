import { Button, ButtonIcon } from './Button.js';
import { Component } from './Component.js';
import { Link } from './Link.js';
import { Table, Tr } from './Table.js';

const statistics = ['№', 'Mode', 'Score', 'Moves', 'Status', 'Time'];

const results = [
  [1, 'Classic', 6, 3, 'Loss', '01:55'],
  [2, 'Random', 101, 58, 'Win', '07:10'],
  [3, 'Random', 101, 58, 'Win', '07:10'],
  [4, 'Random', 101, 58, 'Win', '07:10'],
  [5, 'Random', 101, 58, 'Win', '07:10'],
];
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

export const startMenu = new Component(
  { tag: 'div', classes: ['start-menu' /* 'open' */] },
  new ButtonIcon({ classes: ['button_settings'] }),
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

function createActionsLayout() {
  return new Component(
    { tag: 'div', classes: ['start-menu__actions'] },
    new Component(
      { tag: 'div', classes: ['start-menu__modes-container'] },
      new Button({ classes: ['button_classic-mode'], text: 'Classic' }),
      new Button({ classes: ['button_random-mode'], text: 'Random' }),
      new Button({ classes: ['button_chaotic-mode'], text: 'Random' }),
    ),
    new Button({ classes: ['button_continue'], text: 'Continue Previous' }),
  );
}

function Results() {
  return new Component(
    { tag: 'div', classes: ['start-menu__results'] },
    new Component({ tag: 'h2', classes: ['header-secondary'], text: 'Results:' }),
    new Table({
      classes: ['start-menu__table'],
      thead: [new Tr(...statistics.map((statisticOption) => th(statisticOption)))],
      tbody: results.map((result) => {
        return new Tr(
          ...result.map((option) => {
            if (option === 'Win' || option === 'Loss') {
              return tdStatus(option);
            }
            return td(option);
          }),
        );
      }),
    }),
  );
}
