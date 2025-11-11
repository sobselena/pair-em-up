import { COLUMNS_MAX_COUNT } from './Data.js';
import { PairTools } from './PairTools.js';

class PairHandler extends PairTools {
  #previousCoords;
  #previousNums;
  #score = 0;
  #previousFlattenDigits;
  #previousScore = 0;
  #removedCount = 5;
  #points = { identicalPairs: 1, sum10: 2 };
  isHintOn = false;
  constructor({ initialData, params }) {
    super({ initialData, params });

    this.column1 = undefined;
    this.row1 = undefined;

    this.column2 = undefined;
    this.row2 = undefined;
  }

  #removePair() {
    this.setPrevious();
    this.unsetBeforeShuffle();
    this.addScore();
    this.#removeValues();
    this.updateMatrix();
  }
  setPair({ column, row }) {
    if (this.column1 === undefined) {
      this.column1 = column;
      this.row1 = row;
    } else if (this.column2 === undefined) {
      this.column2 = column;
      this.row2 = row;
    }
  }
  #unsetPair() {
    this.column1 = undefined;
    this.row1 = undefined;

    this.column2 = undefined;
    this.row2 = undefined;
  }

  #getPairCoords() {
    return {
      column1: this.column1,
      column2: this.column2,
      row1: this.row1,
      row2: this.row2,
    };
  }

  setPrevious() {
    this.unsetPreviousCount();
    this.#previousCoords = this.#getPairCoords();
    this.#previousNums = this.getCurPairNums();
  }
  getPreviousCoords() {
    return this.#previousCoords;
  }
  getCurPairNums() {
    const { num1, num2 } = this.getNums(this.#getPairCoords());

    return { num1, num2 };
  }
  invalidPair(check) {
    const { num1, num2 } = this.getCurPairNums();
    console.log(check);
    console.log(
      `${num1} (column: ${this.column1}, row: ${this.row1})and ${num2} (column: ${this.column2}, row: ${this.row2}) are not pair!`,
    );
  }
  checkPairStatus() {
    this.checkPair(this.#getPairCoords());
    if (this.getStatus().isValidPair) {
      this.#removePair();
    } else {
      this.invalidPair(this.getStatus());
    }
    this.#unsetPair();
  }

  #removeValues() {
    this.flattenDigits[this.row1 * COLUMNS_MAX_COUNT + this.column1] = '';
    this.flattenDigits[this.row2 * COLUMNS_MAX_COUNT + this.column2] = '';
  }

  changeToPrevious() {
    if (this.getPreviousCount() === 0) return;
    this.setPreviousCount();
    const beforeShuffle = this.getBeforeShuffle();
    if (beforeShuffle) {
      this.flattenDigits = beforeShuffle;
      this.revertShuffleCount();
      this.updateMatrix();
      return;
    }

    const { column1, row1, column2, row2 } = this.#previousCoords;
    const { num1, num2 } = this.#previousNums;
    this.flattenDigits[column1 + row1 * COLUMNS_MAX_COUNT] = num1;
    if (column2 !== undefined && num2 !== undefined) {
      this.flattenDigits[column2 + row2 * COLUMNS_MAX_COUNT] = num2;
    } else {
      this.#removedCount += 1;
    }
    this.#score = this.#previousScore;
    this.updateMatrix();
    this.#unsetPair();
  }

  getPreviousScore() {
    return this.#previousScore;
  }
  getPreviousNums() {
    return this.#previousNums;
  }

  getTotalScore() {
    return this.#score;
  }

  addScore() {
    const { num1, num2 } = this.getCurPairNums();
    this.#previousScore = this.#score;
    if (num1 === num2) {
      this.#score += this.#points.identicalPairs;
    }
    if (num1 + num2 === 10) {
      this.#score += this.#points.sum10;
    }
  }

  eraser() {
    if (this.#removedCount === 0) return;
    this.#previousCoords = {
      column1: this.column1,
      row1: this.row1,
      column2: undefined,
      row2: undefined,
    };

    this.#previousNums = {
      num1: this.flattenDigits[this.row1 * COLUMNS_MAX_COUNT + this.column1],
      num2: undefined,
    };
    this.unsetPreviousCount();
    this.flattenDigits[this.row1 * COLUMNS_MAX_COUNT + this.column1] = '';
    this.#removedCount -= 1;
    this.column1 = undefined;
    this.row1 = undefined;
    this.updateMatrix();
  }
  getRemovedCount() {
    return this.#removedCount;
  }

  getPreviousFlattenDigits() {
    return this.#previousFlattenDigits;
  }
}

const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const params = {
  mode: 'classic',
};

export const board = new PairHandler({ initialData, params });
