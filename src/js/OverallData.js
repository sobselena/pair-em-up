import { createResult, gameResults, resultsInfo } from './GameResults.js';
import { header } from './Header.js';
import { PairHandler } from './PairHandler.js';
import { createTbody, finishedGames, overlay, startMenu, table } from './StartMenu.js';

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
  header.getChildEl('.button_continue').classList.add('disabled');
  startMenu.getChildEl('.button_continue').classList.add('disabled');
  localStorage.removeItem('autoSave');
  localStorage.removeItem('manualSave');
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
  localStorage.setItem('finishedGames', JSON.stringify(finishedGames));
  updateResultsLayout();
}
export let board = new PairHandler({ initialData, mode });

export function setNewBoard(savedData) {
  const newBoard = new PairHandler({ mode: savedData.mode });
  newBoard.flattenDigits = savedData.flattenDigits;
  newBoard.startingData = savedData.startingData;
  newBoard.matrix = savedData.matrix;
  newBoard.setAddTo(savedData.addTo);
  newBoard.setAddedCount(savedData.addedCount);
  newBoard.setBeforeShuffle(savedData.beforeShuffle);
  newBoard.setIntervalId(savedData.intervalId);
  newBoard.setRemoveCount(savedData.removedCount);
  newBoard.setScore(savedData.score);
  newBoard.setShuffleCount(savedData.shuffleCount);
  newBoard.setTime(savedData.time);
  newBoard.setTotalMoves(savedData.totalMoves);
  newBoard.setValidPairs(savedData.validPairs);
  board = newBoard;
  console.log(board);
}
export function saveData() {
  return {
    startingData: board.startingData,
    flattenDigits: board.flattenDigits,
    matrix: board.matrix,
    mode: board.getMode(),
    addTo: board.getAddTo(),
    addedCount: board.getAddedCount(),
    beforeShuffle: board.getBeforeShuffle(),
    intervalId: board.getIntervalId(),
    removedCount: board.getRemovedCount(),
    score: board.getTotalScore(),
    shuffleCount: board.getShuffleCount(),
    time: board.getCurTime(),
    totalMoves: board.getTotalMoves(),
    validPairs: board.getValidPairs(),
  };
}
window.addEventListener('beforeunload', () => {
  if (!startMenu.getNode().classList.contains('open')) {
    const data = saveData();
    localStorage.setItem('autoSave', JSON.stringify(data));
  }
});
