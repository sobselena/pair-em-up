import { COLUMNS_MAX_COUNT } from './Data.js';
import { PairTools } from './PairTools.js';

export class PairHandler extends PairTools {
  #previous;
  #score = 0;
  #points = { identicalPairs: 1, sum10: 2 };
  constructor({ initialData, params }) {
    super({ initialData, params });

    this.column1 = undefined;
    this.row1 = undefined;

    this.column2 = undefined;
    this.row2 = undefined;
  }

  #removePair() {
    this.setPrevious();
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
    this.#previous = this.#getPairCoords();
  }
  getPrevious() {
    return this.#previous;
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
      this.invalidPair(this.getStatus().checkName);
    }
    this.#unsetPair();
  }

  #removeValues() {
    this.flattenDigits[this.row1 * COLUMNS_MAX_COUNT + this.column1] = '';
    this.flattenDigits[this.row2 * COLUMNS_MAX_COUNT + this.column2] = '';
  }

  changeToPrevious() {
    if (!this.#previous) return;
    this.column1 = this.#previous.column1;
    this.column2 = this.#previous.column2;
    this.row1 = this.#previous.row1;
    this.row2 = this.#previous.row2;
  }

  getTotalScore() {
    return this.#score;
  }

  addScore() {
    const { num1, num2 } = this.getCurPairNums();
    if (num1 === num2) {
      this.#score += this.#points.identicalPairs;
    }
    if (num1 + num2 === 10) {
      this.#score += this.#points.sum10;
    }
  }
}
