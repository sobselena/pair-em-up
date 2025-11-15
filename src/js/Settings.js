import { Component } from './Component.js';
import { Button, ButtonIcon } from './Button.js';
import { overlay, startMenu } from './StartMenu.js';
import { board } from './OverallData.js';
import { setTimer } from './HeaderInfo.js';
import { showHints } from './ShowHints.js';

const audioOptions = [
  'Cell Selection \\ Deselection',
  'Valid Pair Attempts',
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

function formatName(optionName) {
  return optionName
    .split(' ')
    .map((value) => {
      return value.trim().toLowerCase();
    })
    .join('-');
}

export const settingsOptions =
  JSON.parse(localStorage.getItem('settings')) ||
  [...audioOptions, themeSelection[0]].reduce((acc, optionName) => {
    const formattedName = formatName(optionName);
    acc[formattedName] = 'on';
    return acc;
  }, {});

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

function changeTheme(option) {
  if (option === formatName(themeSelection[0])) {
    if (settingsOptions[option] === 'off') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    if (!startMenu.getNode().classList.contains('open')) {
      showHints();
    }
  }
}

changeTheme('background-colors');

function changeSettings(option, optionButton) {
  const curValue = settingsOptions[option];
  const isOn = curValue === 'on';
  settingsOptions[option] = isOn ? 'off' : 'on';
  optionButton.getNode().classList.add(settingsOptions[option]);
  optionButton.getNode().classList.remove(curValue);
  localStorage.setItem('settings', JSON.stringify(settingsOptions));
  changeTheme(option);
}

function createOption({ text, span, isThemeSection }) {
  const optionTextEl = span
    ? new Component({ tag: 'div', text, classes: ['settings__option-text'] }, span)
    : new Component({ tag: 'div', text, classes: ['settings__option-text'] });
  const objName = formatName(text);
  const optionButton = new Button({
    classes: ['button_on-off', settingsOptions[objName]],
    onClick: () => changeSettings(objName, optionButton),
  });
  return new Component(
    { tag: 'div', classes: ['settings__option'] },
    optionTextEl,
    ...(!settingsOptions[objName]
      ? []
      : [
          new Component(
            { tag: 'div', classes: ['settings__button-container'] },
            new Component({
              tag: 'span',
              classes: isThemeSection
                ? ['img-container', 'img-container_bright-theme']
                : ['settings__on-off'],
              text: isThemeSection ? '' : 'ON',
            }),
            optionButton,
            new Component({
              tag: 'span',
              classes: isThemeSection
                ? ['img-container', 'img-container_dark-theme']
                : ['settings__on-off'],
              text: isThemeSection ? '' : 'OFF',
            }),
          ),
        ]),
  );
}
