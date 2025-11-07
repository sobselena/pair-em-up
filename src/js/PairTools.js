import { COLUMNS_MAX_COUNT } from './Data.js';
import { CheckedPair } from './CheckedPair.js';

export class PairTools extends CheckedPair {
  #score = 0;
  #points = { identicalPairs: 1, sum10: 2 };
  #validPairs = [];
  #removedCount = 5;
  constructor({ matrix }) {
    super({ matrix });
    this.status = undefined;
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

  addScore() {
    const { num1, num2 } = this.getCurPairNums();
    if (num1 === num2) {
      this.#score += this.#points.identicalPairs;
    }
    if (num1 + num2 === 10) {
      this.#score += this.#points.sum10;
    }
  }

  eraser({ column, row }) {
    if (this.#removedCount > 0) {
      this.matrix[row][column] = '';
      this.#removedCount -= 1;
    }
  }
  getRemovedCount() {
    return this.#removedCount;
  }
}
