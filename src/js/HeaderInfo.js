import { Component } from './Component.js';
import { ButtonIcon } from './Button.js';
export function createHeaderInfo() {
  return new Component(
    { tag: 'div', classes: ['header__info'] },
    new Component(
      { tag: 'div', classes: ['header__control-buttons'] },
      new ButtonIcon({
        classes: ['button_continue'],
        onClick: () => {},
      }),
      new ButtonIcon({
        classes: ['button_reset'],
        onClick: () => {},
      }),
      new ButtonIcon({
        classes: ['button_save'],
        onClick: () => {},
      }),
      new ButtonIcon({
        classes: ['button_settings'],
        onClick: () => {},
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
