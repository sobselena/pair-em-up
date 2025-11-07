import { COLUMNS_MAX_COUNT } from './Data.js';

export class Pairs {
  #score = 0;
  #points = { identicalPairs: 1, sum10: 2 };
  constructor({ matrix, coords1, coords2 }) {
    const { column1, row1 } = coords1;
    const { column2, row2 } = coords2;

    this.matrix = matrix;

    this.column1 = column1;
    this.row1 = row1;

    this.column2 = column2;
    this.row2 = row2;
  }

  checkPairs() {
    const { num1, num2 } = this.getNums();
    if (num1 !== num2 && num1 + num2 !== 10) {
      this.invalidPair();
      return;
    }
    if (this.column1 === this.column2) {
      this.checkColumns();
    } else if (this.row1 === this.row2) {
      this.checkRows();
    } else {
      this.checkLineBreak();
    }
  }

  compareColumnValues() {
    const minColumnValue = Math.min(this.column1, this.column2);
    const maxColumnValue = Math.max(this.column1, this.column2);
    return { minColumnValue, maxColumnValue };
  }

  compareRowValues() {
    const minRowValue = Math.min(this.row1, this.row2);
    const maxRowValue = Math.max(this.row1, this.row2);
    return { minRowValue, maxRowValue };
  }
  removeValues() {
    this.matrix[this.row1][this.column1] = '';
    this.matrix[this.row2][this.column2] = '';
  }

  checkLineBreak() {
    const { minColumnValue, maxColumnValue } = this.compareColumnValues();
    const { minRowValue, maxRowValue } = this.compareRowValues();

    for (let i = maxColumnValue + 1; i < COLUMNS_MAX_COUNT; i += 1) {
      if (this.matrix[maxRowValue][i] !== '') {
        this.invalidPair('checkLineBreak');
        return;
      }
    }
    for (let i = 0; i < minColumnValue - 1; i += 1) {
      if (this.matrix[minRowValue][i] !== '') {
        this.invalidPair('checkLineBreak');
        return;
      }
    }
    for (let i = minRowValue + 1; i < maxRowValue - 1; i += 1) {
      for (let j = 0; j < COLUMNS_MAX_COUNT; j += 1) {
        if (this.matrix[i][j] !== '') {
          this.invalidPair('checkLineBreak');
          return;
        }
      }
    }

    this.addScore();
    this.removeValues();
  }

  checkColumns() {
    const { maxRowValue, minRowValue } = this.compareRowValues();
    for (let i = minRowValue + 1; i < maxRowValue; i += 1) {
      if (this.matrix[i][this.column1] !== '') {
        this.invalidPair('columns');
        return;
      }
    }
    this.addScore();
    this.removeValues();
  }

  checkRows() {
    const { minColumnValue, maxColumnValue } = this.compareColumnValues();
    for (let i = minColumnValue + 1; i < maxColumnValue; i += 1) {
      if (this.matrix[this.row1][i] !== '') {
        this.invalidPair('rows');
        return;
      }
    }
    this.addScore();
    this.removeValues();
  }
  addScore() {
    const { num1, num2 } = this.getNums();
    if (num1 === num2) {
      this.#score += this.#points.identicalPairs;
    }
    if (num1 + num2 === 10) {
      this.#score += this.#points.sum10;
    }
  }
  getNums() {
    const num1 = Number(this.matrix[this.row1][this.column1]);
    const num2 = Number(this.matrix[this.row2][this.column2]);
    return { num1, num2 };
  }

  invalidPair(check) {
    const { num1, num2 } = this.getNums();
    console.log(check);
    console.log(
      `${num1} (column: ${this.column1}, row: ${this.row1})and ${num2} (column: ${this.column2}, row: ${this.row2}) are not pair!`,
    );
  }

  getTotalScore() {
    return this.#score;
  }
}
