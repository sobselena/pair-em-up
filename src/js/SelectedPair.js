import { PairTools } from './PairTools.js';

export class SelectedPair extends PairTools {
  #previous;
  constructor({ matrix }) {
    super({ matrix });

    this.column1;
    this.row1;

    this.column2;
    this.row2;
  }
  #removePair() {
    this.setPrevious();
    this.addScore();
    this.removeValues();
  }
  setPair({ column1, column2, row1, row2 }) {
    this.column1 = column1;
    this.row1 = row1;

    this.column2 = column2;
    this.row2 = row2;
  }
  setPrevious() {
    this.#previous = {
      column1: this.column1,
      column2: this.column2,
      row1: this.row1,
      row2: this.row2,
    };
  }
  getPrevious() {
    return this.#previous;
  }
  getCurPairNums() {
    const { num1, num2 } = this.getNums({
      column1: this.column1,
      column2: this.column2,
      row1: this.row1,
      row2: this.row2,
    });

    return { num1, num2 };
  }
  invalidPair(check) {
    const { num1, num2 } = this.getCurPairNums();
    console.log(check);
    console.log(
      `${num1} (column: ${this.column1}, row: ${this.row1})and ${num2} (column: ${this.column2}, row: ${this.row2}) are not pair!`,
    );
  }
  checkStatus() {
    if (this.status.isValidPair) {
      this.#removePair();
    } else {
      this.invalidPair(this.status.checkName);
    }
  }
  removeValues() {
    this.matrix[this.row1][this.column1] = '';
    this.matrix[this.row2][this.column2] = '';
  }
  changeToPrevious() {
    if (!this.#previous) return;
    this.column1 = this.#previous.column1;
    this.column2 = this.#previous.column2;
    this.row1 = this.#previous.row1;
    this.row2 = this.#previous.row2;
  }
}
