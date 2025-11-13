export const DEFAULT_COUNTS = {
  ADDED_COUNT: 10,
  SHUFFLE_COUNT: 5,
  REMOVED_COUNT: 5,
};
export const COLUMNS_MAX_COUNT = 9;
export class Data {
  #addedCount = DEFAULT_COUNTS.ADDED_COUNT;
  #shuffleCount = DEFAULT_COUNTS.SHUFFLE_COUNT;
  #previousCount = 0;
  #mode;
  #beforeShuffle;
  #addTo;
  #totalMoves = 0;
  constructor({ initialData, mode }) {
    this.#mode = mode;
    this.startingData = this.#splitMultiDigits(initialData).flat();
    this.flattenDigits = this.applyMode(this.startingData);
    this.updateMatrix();
  }
  unsetTotalMoves() {
    this.#totalMoves = 0;
  }
  getTotalMoves() {
    return this.#totalMoves;
  }
  increaseTotalMoves() {
    this.#totalMoves += 1;
  }
  decreaseTotalMoves() {
    this.#totalMoves -= 1;
  }
  getMode() {
    return this.#mode;
  }
  updateMatrix() {
    this.matrix = this.#generateMatrix(this.flattenDigits);
  }
  #splitMultiDigits(values = []) {
    return values.map((value) => {
      const strValue = value.toString();
      return strValue.split('');
    });
  }

  applyMode(splitArr) {
    const copyArr = [...splitArr];
    if (this.#mode === 'random') {
      return this.shuffleFlattenDigits(copyArr);
    }
    if (this.#mode === 'chaotic') {
      return this.#chaoticMode(copyArr);
    }
    return copyArr;
  }

  #chaoticMode(splitArr) {
    const chaoticArr = [];
    for (let i = 0; i < splitArr.length; i += 1) {
      const randomNum = Math.floor(Math.random() * 9) + 1;
      chaoticArr.push(randomNum.toString());
    }
    return chaoticArr;
  }
  getAddTo() {
    return this.#addTo;
  }
  unsetAddTo() {
    this.#addTo = undefined;
  }
  revertAddTo() {
    this.#addedCount += 1;
  }
  setToDefaultNewNums() {
    this.#addedCount = DEFAULT_COUNTS.ADDED_COUNT;
  }
  setToDefaultShuffles() {
    this.#shuffleCount = DEFAULT_COUNTS.SHUFFLE_COUNT;
  }
  addNewNums() {
    if (this.#addedCount <= 0) return;
    this.#totalMoves += 1;
    const remainingNums = this.flattenDigits.filter((num) => num !== '');
    this.#previousCount = 1;
    this.#addTo = this.flattenDigits.length;
    let newNums = remainingNums;
    if (this.#mode === 'random') {
      newNums = this.shuffle(remainingNums);
    } else if (this.#mode === 'chaotic') {
      newNums = this.#chaoticMode(remainingNums);
    }

    this.flattenDigits = this.flattenDigits.concat(newNums);
    this.#addedCount -= 1;
    this.updateMatrix();
    this.unsetBeforeShuffle();
    return newNums;
  }

  getAddedCount() {
    return this.#addedCount;
  }
  setToDefault() {
    this.#addedCount = 10;
  }
  getBeforeShuffle() {
    return this.#beforeShuffle;
  }
  unsetBeforeShuffle() {
    this.#beforeShuffle = undefined;
  }
  getPreviousCount() {
    return this.#previousCount;
  }
  unsetPreviousCount() {
    this.#previousCount = 1;
  }
  setPreviousCount() {
    this.#previousCount = 0;
  }

  shuffleFlattenDigits(arr) {
    const copyArr = [...arr];
    const copyFlatArr = copyArr.filter((cellValue) => cellValue !== '');
    for (let i = copyFlatArr.length - 1; i >= 0; i -= 1) {
      const randomPosition = Math.floor(Math.random() * (i + 1));
      [copyFlatArr[i], copyFlatArr[randomPosition]] = [copyFlatArr[randomPosition], copyFlatArr[i]];
    }
    let i = 0;
    let j = 0;
    while (i < copyArr.length) {
      if (copyArr[i] !== '') {
        copyArr[i] = copyFlatArr[j];
        j += 1;
      }
      i += 1;
    }

    this.flattenDigits = copyArr;
    this.updateMatrix();

    return copyArr;
  }

  shuffle(splitArr) {
    if (this.#shuffleCount <= 0) return [...splitArr];
    this.#totalMoves += 1;
    this.#previousCount = 1;
    this.#beforeShuffle = [...splitArr];
    const copyArr = this.shuffleFlattenDigits(splitArr);
    this.unsetAddTo();
    this.#shuffleCount -= 1;
    return copyArr;
  }

  getShuffleCount() {
    return this.#shuffleCount;
  }
  revertShuffleCount() {
    this.#shuffleCount += 1;
  }

  #generateMatrix() {
    const rowCount = Math.ceil(this.flattenDigits.length / COLUMNS_MAX_COUNT);
    const matrix = [];
    for (let i = 0; i < rowCount; i += 1) {
      matrix.push([]);
      for (let j = 0; j < COLUMNS_MAX_COUNT; j += 1) {
        if (i * COLUMNS_MAX_COUNT + j >= this.flattenDigits.length) return matrix;
        matrix[i][j] = this.flattenDigits[i * COLUMNS_MAX_COUNT + j];
      }
    }

    return matrix;
  }
  translateFlatToMatrixCoords(index) {
    const row = Math.floor(index / COLUMNS_MAX_COUNT);
    const column = index % COLUMNS_MAX_COUNT;
    return { row, column };
  }
  changeMode(mode) {
    this.#mode = mode;
  }
}
