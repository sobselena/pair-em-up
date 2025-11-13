import { createResult, gameResults, resultsInfo } from './GameResults.js';
import { PairHandler } from './PairHandler.js';
import { createTbody, finishedGames, overlay, table } from './StartMenu.js';

const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export let mode = 'classic';
export function setMode(setCurModeTo) {
  mode = setCurModeTo;
}

function updateResultsLayout() {
  const tbodyObj = table.getTbody();
  tbodyObj.getAllChildren().forEach((child) => {
    child.destroy();
  });

  tbodyObj.appendChildren(createTbody());
}
export function saveFinishedGame(status) {
  const gameResultsEl = gameResults.getNode();
  const resultsArr = board.showResult(status);
  console.log(resultsArr);
  resultsInfo.getAllChildren().forEach((child) => {
    child.destroy();
  });
  resultsInfo.appendChildren(
    resultsArr.slice(1).map(([resultName, resultValue]) => {
      return createResult({ resultName, resultValue });
    }),
  );
  gameResultsEl.classList.add('open');
  overlay.getNode().classList.add('open');
  finishedGames.unshift(resultsArr);
  finishedGames.pop();
  finishedGames.forEach((result, i) => {
    result[0][1] = i + 1;
  });
  updateResultsLayout();
}
export const board = new PairHandler({ initialData, mode });
