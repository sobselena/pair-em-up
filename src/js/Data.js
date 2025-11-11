export const COLUMNS_MAX_COUNT = 9;
export class Data {
  #addedCount = 10;
  #shuffleCount = 5;
  #previousCount = 1;
  #mode;
  #beforeShuffle;
  constructor({ initialData = [], params }) {
    const { mode } = params;
    const splitArr = this.#splitMultiDigits(initialData).flat();
    this.#mode = mode;
    this.flattenDigits = this.#applyMode(splitArr);
    this.updateMatrix();
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

  #applyMode(splitArr) {
    if (this.#mode === 'random') {
      return this.shuffle(splitArr);
    }
    if (this.#mode === 'chaotic') {
      return this.#chaoticMode(splitArr);
    }
    return splitArr;
  }

  #chaoticMode(splitArr) {
    const chaoticArr = [];
    for (let i = 0; i < splitArr.length; i += 1) {
      const randomNum = Math.floor(Math.random() * 9) + 1;
      chaoticArr.push(randomNum.toString());
    }
    return chaoticArr;
  }

  addNewNums() {
    if (this.#addedCount <= 0) return;
    const remainingNums = this.flattenDigits.filter((num) => num !== '');
    let newNums = remainingNums;
    if (this.#mode === 'random') {
      newNums = this.shuffle(remainingNums);
    } else if (this.#mode === 'chaotic') {
      newNums = this.#chaoticMode(remainingNums);
    }
    this.flattenDigits = this.flattenDigits.concat(newNums);
    this.#addedCount -= 1;
    this.updateMatrix();
    return newNums;
  }

  getAddedCount() {
    return this.#addedCount;
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
  shuffle(splitArr) {
    if (this.#shuffleCount <= 0) return;
    this.#previousCount = 1;
    const copyArr = [...splitArr];
    this.#beforeShuffle = splitArr;
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
    this.#shuffleCount -= 1;
    this.updateMatrix();
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
}
