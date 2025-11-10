// <header class="header">
//   <div class="wrapper">
//     <div class="header__info">
//       <div class="header__control-buttons">
//         <button class="button button_continue img-container"></button>
//         <button class="button button_reset img-container"></button>
//         <button class="button button_save img-container"></button>
//         <button class="button button_settings img-container"></button>
//       </div>

//       <h1 class="header-primary">Pair `em up</h1>

//       <div class="header__statistics">
//         <div class="header__score-container">
//           Score: <span class="header__score">5</span>
//         </div>
//         <div class="header__timer-container">
//           Timer: <span class="header__timer">01:55</span>
//         </div>
//       </div>
//     </div>
//     <div class="header__assist-tools">
//       <button class="button button_hints">
//         Hints (<span class="header__hints-count">5+</span>)
//       </button>
//       <button class="button button_revert">Revert</button>
//       <button class="button button_add-numbers">
//         Add Numbers (<span class="header__add-numbers-count">10</span>)
//       </button>
//       <button class="button button_shuffle">
//         Shuffle (<span class="header__shuffle-count">5</span>)
//       </button>
//       <button class="button button_eraser">
//         Eraser (<span class="header__eraser-count">5</span>)
//       </button>
//     </div>
//   </div>
// </header>
import { Button, ButtonIcon } from './Button.js';
import { Component } from './Component.js';

export function createHeader() {
  return new Component(
    { tag: 'div', classes: ['header'] },
    new Component(
      { tag: 'div', classes: ['wrapper'] },
      createHeaderInfo(),
      createHeaderAssistTools(),
    ),
  );
}

function createHeaderInfo() {
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
        new Component({ tag: 'span', classes: ['header__score'], text: '5' }),
      ),
      new Component(
        { tag: 'div', classes: ['header__timer-container'], text: 'Time: ' },
        new Component({ tag: 'span', classes: ['header__timer'], text: '01:55' }),
      ),
    ),
  );
}

function createHeaderAssistTools() {
  return new Component(
    { tag: 'div', classes: ['header__assist-tools'] },
    new Button(
      { classes: ['button_hints'] },
      new Component({ tag: 'span', text: 'Hints (' }),
      new Component({ tag: 'span', text: '5+', classes: ['header__hints-count'] }),
      new Component({ tag: 'span', text: ')' }),
    ),
    new Button({ classes: ['button_revert'], text: 'Revert' }),
    new Button(
      { classes: ['button_add-numbers'] },
      new Component({ tag: 'span', text: 'Add Numbers (' }),
      new Component({ tag: 'span', text: '10', classes: ['header__add-numbers-count'] }),
      new Component({ tag: 'span', text: ')' }),
    ),
    new Button(
      { classes: ['button_shuffle'] },
      new Component({ tag: 'span', text: 'Shuffle (' }),
      new Component({ tag: 'span', text: '5', classes: ['header__shuffle-count'] }),
      new Component({ tag: 'span', text: ')' }),
    ),
    new Button(
      { classes: ['button_eraser'] },
      new Component({ tag: 'span', text: 'Eraser (' }),
      new Component({ tag: 'span', text: '5', classes: ['header__eraser-count'] }),
      new Component({ tag: 'span', text: ')' }),
    ),
  );
}
