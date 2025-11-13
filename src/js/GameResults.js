import { Button } from './Button.js';
import { Component } from './Component.js';
import { reset } from './HeaderInfo.js';
import { overlay, startMenu } from './StartMenu.js';
{
  /* <div class="game-results">
      <h2 class="header-secondary">Game Outcomes:</h2>
      <div class="game-results__info">
        <div class="game-results__outcome">
          <span class="game-results__outcome-name">Status</span>
          <span class="game-results__status"
            >Win
            <span class="img-container img-container_win"></span>
        </div>
        <div class="game-results__outcome">
          <span class="game-results__outcome-name">Score</span>
          <span class="game-results__score">101</span>
        </div>
        <div class="game-results__outcome">
          <span class="game-results__outcome-name">Moves</span>
          <span class="game-results__score">56</span>
        </div>
        <div class="game-results__outcome">
          <span class="game-results__outcome-name">Time</span>
          <span class="game-results__score">07:10</span>
        </div>
      </div>
      <div class="game-results__actions">
        <button class="button button_menu">
          <span class="img-container img-container_menu">
          </span>
          Menu
        </button>
        <button class="button button_play-again">
          Play Again
          <span class="img-container img-container_replay">
          </span>
        </button>
      </div>
    </div> */
}

export const resultsInfo = new Component({ tag: 'div', classes: ['game-results__info'] });
export const gameResults = new Component(
  { tag: 'div', classes: ['game-results' /*'open'*/] },
  new Component({
    tag: 'h2',
    classes: ['header-secondary', 'game-results__header'],
    text: 'Game Outcomes:',
  }),
  resultsInfo,
  createResultsActions(),
);

export function createResult({ resultName, resultValue }) {
  const statusIcon =
    resultName === 'status'
      ? new Component({
          tag: 'span',
          classes: ['img-container', `img-container_${resultValue.toLowerCase()}`],
        })
      : null;
  return new Component(
    { tag: 'div', classes: ['game-results__outcome'] },
    new Component({ tag: 'span', text: resultName, classes: ['game-results__outcome-name'] }),
    resultName === 'status'
      ? new Component(
          {
            tag: 'span',
            classes: [`game-results__${resultName}-value`],
            text: String(resultValue),
          },
          statusIcon,
        )
      : new Component({
          tag: 'span',
          classes: [`game-results__${resultName}-value`],
          text: String(resultValue),
        }),
  );
}
function playAgain() {
  gameResults.getNode().classList.remove('open');
  overlay.getNode().classList.remove('open');
  reset();
}
function openMenu() {
  gameResults.getNode().classList.remove('open');
  startMenu.getNode().classList.add('open');
}
function createResultsActions() {
  return new Component(
    { tag: 'div', classes: ['game-results__actions'] },
    new Button(
      { classes: ['button_menu'], onClick: openMenu },
      new Component({ tag: 'span', classes: ['img-container', 'img-container_menu'] }),
      new Component({ tag: 'span', text: 'Menu' }),
    ),
    new Button(
      { classes: ['button_play-again'], onClick: playAgain },
      new Component({ tag: 'span', text: 'Play Again' }),
      new Component({
        tag: 'span',
        classes: ['img-container', 'img-container_replay', 'white-theme'],
      }),
    ),
  );
}
{
  /* <div class="game-results__actions">
  <button class="button button_menu">
    <span class="img-container img-container_menu"></span>
    Menu
  </button>
  <button class="button button_play-again">
    Play Again
    <span class="img-container img-container_replay"></span>
  </button>
</div>; */
}
