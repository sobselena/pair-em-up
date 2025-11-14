import { Component } from './Component.js';
import { Button, ButtonIcon } from './Button.js';
import { overlay, startMenu } from './StartMenu.js';
import { board } from './OverallData.js';
import { setTimer } from './HeaderInfo.js';

const audioOptions = [
  'Cell Selection',
  'Cell Deselection',
  'Invalid Pair Attempts',
  'Assist Tool Usage',
  'Game Start And End Events',
];

const themeSelection = [
  'Background Colors',
  'Game Grid And Cell Colors',
  'UI Element Colors',
  'All Interactive Elements And Indicators',
];
const createAudioControls = createOptionsLayout({
  classes: ['settings__audio-controls'],
  optionsTitle: 'Audio Controls',
  exception: 'Assist Tool Usage',
  exceptionText: ' (Add Numbers, Shuffle)',
  optionsArr: audioOptions,
});
const createThemeSelection = createOptionsLayout({
  classes: ['settings__theme-selection'],
  optionsTitle: 'Theme Selection',
  exception: 'UI Element Colors',
  exceptionText: ' (Buttons, Counters, Text)',
  optionsArr: themeSelection,
});
export const settings = new Component(
  { tag: 'div', classes: ['settings' /* 'open' */] },
  createTitleContainer(),
  createAudioControls,
  createThemeSelection,
);
export function openSettings() {
  overlay.getNode().classList.add('open');
  settings.getNode().classList.add('open');
  board.stopTimer();
}

function closeSettings() {
  settings.getNode().classList.remove('open');
  if (!startMenu.getNode().classList.contains('open')) {
    overlay.getNode().classList.remove('open');
    setTimer();
  }
}
function createTitleContainer() {
  return new Component(
    { tag: 'div', classes: ['settings__title-container'] },
    new Component({ tag: 'h2', classes: ['header-secondary'], text: 'Settings Panel' }),
    new ButtonIcon({ classes: ['button_close'], onClick: closeSettings }),
  );
}
function createOptionsLayout({ classes, optionsTitle, exception, exceptionText, optionsArr }) {
  return new Component(
    { tag: 'div', classes },
    new Component({ tag: 'h3', classes: ['header-tertiary'], text: optionsTitle }),
    ...optionsArr.map((option) => {
      if (option === exception) {
        const span = new Component({ tag: 'span', text: exceptionText });
        return createOption({
          text: option,
          span,
          isThemeSection: optionsTitle === 'Theme Selection',
        });
      }
      return createOption({ text: option, isThemeSection: optionsTitle === 'Theme Selection' });
    }),
  );
}

function createOption({ text, span, isThemeSection }) {
  const optionTextEl = span
    ? new Component({ tag: 'div', text, classes: ['settings__option-text'] }, span)
    : new Component({ tag: 'div', text, classes: ['settings__option-text'] });
  return new Component(
    { tag: 'div', classes: ['settings__option'] },
    optionTextEl,
    new Component(
      { tag: 'div', classes: ['settings__button-container'] },
      new Component({
        tag: 'span',
        classes: isThemeSection
          ? ['img-container', 'img-container_bright-theme']
          : ['settings__on-off'],
        text: isThemeSection ? '' : 'ON',
      }),
      new Button({ classes: ['button_on-off'] }),
      new Component({
        tag: 'span',
        classes: isThemeSection
          ? ['img-container', 'img-container_dark-theme']
          : ['settings__on-off'],
        text: isThemeSection ? '' : 'OFF',
      }),
    ),
  );
}
