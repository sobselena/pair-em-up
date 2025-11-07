import { COLUMNS_MAX_COUNT } from './Data.js';
import { Pair } from './Pair.js';

export class PairsTools extends Pair {
  #score = 0;
  #points = { identicalPairs: 1, sum10: 2 };
  #previous;
  #validPairs = [];
  constructor({ matrix }) {
    super({ matrix });

    this.column1;
    this.row1;

    this.column2;
    this.row2;
    this.status = undefined;
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

  changeToPrevious() {
    if (!this.#previous) return;
    this.column1 = this.#previous.column1;
    this.column2 = this.#previous.column2;
    this.row1 = this.#previous.row1;
    this.row2 = this.#previous.row2;
  }

  findColumnValue({ row, column }) {
    for (let i = row; i < this.matrix.length; i += 1) {
      if (this.matrix[i][column] !== '') {
        return { column: column, row: i };
      }
    }
    return undefined;
  }

  findRowValue({ row = 0, column = 0 }) {
    for (let i = row; i < this.matrix.length; i += 1) {
      for (let j = i !== row ? 0 : column; j < COLUMNS_MAX_COUNT; j += 1) {
        if (this.matrix[i][j] !== '') {
          return { column: j, row: i };
        }
      }
    }
    return undefined;
  }

  #countValidPairs() {
    let pointer = this.findRowValue({ row: 0, column: 0 });
    if (!pointer) {
      return 'none';
    }

    while (pointer) {
      const rowPointer = this.findRowValue({ row: pointer.row, column: pointer.column + 1 });
      const columnPointer = this.findColumnValue({ row: pointer.row + 1, column: pointer.column });

      const { column: column1, row: row1 } = pointer;
      if (rowPointer) {
        const rowPointerCoords = {
          column1,
          column2: rowPointer.column,
          row1,
          row2: rowPointer.row,
        };

        const rowCheckResults =
          rowPointer.row === row1
            ? this.checkRows(rowPointerCoords)
            : this.checkLineBreak(rowPointerCoords);

        if (rowCheckResults.isValidPair) {
          this.#validPairs.push({ ...rowPointerCoords, ...this.getNums(rowPointerCoords) });
        }
      }

      if (columnPointer) {
        const columnPointerCoords = {
          column1,
          column2: columnPointer.column,
          row1,
          row2: columnPointer.row,
        };
        const columnCheckResults = this.checkColumns(columnPointerCoords);

        if (columnCheckResults.isValidPair) {
          this.#validPairs.push({ ...columnPointerCoords, ...this.getNums(columnPointerCoords) });
        }
      }
      pointer = rowPointer;
    }
  }
  getValidPairs() {
    this.#validPairs = [];
    this.#countValidPairs();
    return this.#validPairs;
  }
  getTotalScore() {
    return this.#score;
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
  addScore() {
    const { num1, num2 } = this.getCurPairNums();
    if (num1 === num2) {
      this.#score += this.#points.identicalPairs;
    }
    if (num1 + num2 === 10) {
      this.#score += this.#points.sum10;
    }
  }

  #removePair() {
    this.setPrevious();
    this.addScore();
    this.removeValues();
  }

  checkStatus() {
    if (this.status.isValidPair) {
      this.#removePair();
    } else {
      this.invalidPair(this.status.checkName);
    }
  }

  invalidPair(check) {
    const { num1, num2 } = this.getCurPairNums();
    console.log(check);
    console.log(
      `${num1} (column: ${this.column1}, row: ${this.row1})and ${num2} (column: ${this.column2}, row: ${this.row2}) are not pair!`,
    );
  }

  removeValues() {
    this.matrix[this.row1][this.column1] = '';
    this.matrix[this.row2][this.column2] = '';
  }
}
