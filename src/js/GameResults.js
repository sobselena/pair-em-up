import { Button } from './Button.js';
import { Component } from './Component.js';
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

const resultsInfo = {
  status: 'Win',
  Mode: 'Random',
  Score: 101,
  Moves: 56,
  Time: '07:10',
};
export const gameResults = new Component(
  { tag: 'div', classes: ['game-results' /*'open'*/] },
  new Component({ tag: 'h2', classes: ['header-secondary'], text: 'Game Outcomes:' }),
  createResultsInfo(),
  createResultsActions(),
);

function createResultsInfo() {
  return new Component(
    { tag: 'div', classes: ['game-results__info'] },
    ...Object.entries(resultsInfo).map(([resultName, resultValue]) => {
      return createResult({ resultName, resultValue });
    }),
  );
}

function createResult({ resultName, resultValue }) {
  const statusIcon =
    resultName === 'status'
      ? new Component({
          tag: 'span',
          classes: ['img-container', `img-container_${String(resultValue).toLowerCase()}`],
        })
      : null;
  return new Component(
    { tag: 'div', classes: ['game-results__outcome'] },
    new Component({ tag: 'span', classes: ['game-results__outcome-name'], text: resultName }),
    resultName === 'status'
      ? new Component(
          { tag: 'span', classes: ['game-results__status'], text: resultValue },
          statusIcon,
        )
      : new Component({ tag: 'span', classes: ['game-results__status'], text: resultValue }),
  );
}

function createResultsActions() {
  return new Component(
    { tag: 'div', classes: ['game-results__actions'] },
    new Button(
      { classes: ['button_menu'] },
      new Component({ tag: 'span', classes: ['img-container', 'img-container_menu'] }),
      new Component({ tag: 'span', text: 'Menu' }),
    ),
    new Button(
      { classes: ['button_play-again'] },
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
