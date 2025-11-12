{
  /* <div class="settings">
  <div class="settings__title-container">
    <h2 class="header-secondary">Settings Panel</h2>
    <button class="button button_close img-container"></button>
  </div>

  <div class="settings__audio-controls">
    <h3 class="header-tertiary">Audio controls</h3>
    <div class="settings__audio-option">
      <div>Cell Selection</div>

      <button class="button button_on-off"></button>
    </div>
    <div class="settings__audio-option">
      <div>Cell Deselection</div>

      <button class="button button_on-off"></button>
    </div>
    <div class="settings__audio-option">
      <div>Successful Pair Matching</div>
      <button class="button button_on-off"></button>
    </div>
    <div class="settings__audio-option">
      <div>Invalid Pair Attempts</div>
      <button class="button button_on-off"></button>
    </div>
    <div class="settings__audio-option">
      <div>
        Assist Tool Usage <span>(Add Numbers, Shuffle)</span>
      </div>
      <button class="button button_on-off"></button>
    </div>
    <div class="settings__audio-option">
      <div>Game Start And End Events</div>
      <button class="button button_on-off"></button>
    </div>
  </div>

  <div class="settings__theme-selection">
    <h3 class="header-tertiary">Theme selection</h3>
    <div class="settings__audio-option">
      <div>Background Colors</div>
      <button class="button button_on-off"></button>
    </div>
    <div class="settings__audio-option">
      <div>Game Grid And Cell Colors</div>

      <button class="button button_on-off"></button>
    </div>
    <div class="settings__audio-option">
      <div>
        UI Element Colors <span>(Buttons, Counters, Text)</span>
      </div>

      <button class="button button_on-off"></button>
    </div>
    <div class="settings__audio-option">
      <div>All Interactive Elements And Indicators</div>
      <button class="button button_on-off"></button>
    </div>
  </div>
</div>; */
}

import { Component } from './Component.js';
import { Button, ButtonIcon } from './Button.js';
import { overlay, startMenu } from './StartMenu.js';

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
}

function closeSettings() {
  settings.getNode().classList.remove('open');
  if (!startMenu.getNode().classList.contains('open')) {
    overlay.getNode().classList.remove('open');
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
        return createOption(option, span);
      }
      return createOption(option);
    }),
  );
}

function createOption(text, span) {
  const optionTextEl = span
    ? new Component({ tag: 'div', text }, span)
    : new Component({ tag: 'div', text });
  return new Component(
    { tag: 'div', classes: ['settings__option'] },
    optionTextEl,
    new Button({ classes: ['button_on-off'] }),
  );
}
