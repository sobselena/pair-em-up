import { createResult, gameResults, resultsInfo } from './GameResults.js';
import { PairHandler } from './PairHandler.js';
import { overlay } from './StartMenu.js';

const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const finishedGames = [];
export let mode = 'classic';
export function setMode(setCurModeTo) {
  mode = setCurModeTo;
}
export function saveFinishedGame(status) {
  const gameResultsEl = gameResults.getNode();
  const resultsObj = board.showResult(status);
  console.log(resultsObj);
  resultsInfo.getAllChildren().forEach((child) => {
    child.destroy();
  });
  resultsInfo.appendChildren(
    Object.entries(resultsObj).map(([resultName, resultValue]) => {
      return createResult({ resultName, resultValue });
    }),
  );
  gameResultsEl.classList.add('open');
  overlay.getNode().classList.add('open');
  finishedGames.push(resultsObj);
}
export const board = new PairHandler({ initialData, mode });
