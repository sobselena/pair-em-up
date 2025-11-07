import { COLUMNS_MAX_COUNT } from './Data.js';

export class Pair {
  constructor({ matrix }) {
    this.matrix = matrix;
  }

  checkPair({ column1, row1, column2, row2 }) {
    const { num1, num2 } = this.getNums({ column1, row1, column2, row2 });
    if (num1 !== num2 && num1 + num2 !== 10) {
      return { isValidPair: false, checkName: 'sum to 10 and identical numbers check' };
    }
    if (row1 === row2) {
      return this.checkRows({ column1, row1, column2, row2 });
    }
    if (column1 === column2) {
      return this.checkColumns({ column1, row1, column2, row2 });
    }
    return this.checkLineBreak({ column1, row1, column2, row2 });
  }

  compareColumnValues({ column1, column2 }) {
    const minColumnValue = Math.min(column1, column2);
    const maxColumnValue = Math.max(column1, column2);
    return { minColumnValue, maxColumnValue };
  }

  compareRowValues({ row1, row2 }) {
    const minRowValue = Math.min(row1, row2);
    const maxRowValue = Math.max(row1, row2);
    return { minRowValue, maxRowValue };
  }

  checkLineBreak({ column1, row1, column2, row2 }) {
    const { minColumnValue, maxColumnValue } = this.compareColumnValues({ column1, column2 });
    const { minRowValue, maxRowValue } = this.compareRowValues({ row1, row2 });

    for (let i = maxColumnValue + 1; i < COLUMNS_MAX_COUNT; i += 1) {
      if (this.matrix[maxRowValue][i] !== '') {
        return { isValidPair: false, checkName: 'linebreak' };
      }
    }
    for (let i = 0; i < minColumnValue - 1; i += 1) {
      if (this.matrix[minRowValue][i] !== '') {
        return { isValidPair: false, checkName: 'linebreak' };
      }
    }
    for (let i = minRowValue + 1; i < maxRowValue - 1; i += 1) {
      for (let j = 0; j < COLUMNS_MAX_COUNT; j += 1) {
        if (this.matrix[i][j] !== '') {
          return { isValidPair: false, checkName: 'linebreak' };
        }
      }
    }
    return { isValidPair: true, checkName: 'linebreak' };
  }

  checkColumns({ column1, row1, row2 }) {
    const { maxRowValue, minRowValue } = this.compareRowValues({ row1, row2 });
    for (let i = minRowValue + 1; i < maxRowValue; i += 1) {
      if (this.matrix[i][column1] !== '') {
        return { isValidPair: false, checkName: 'columns' };
      }
    }
    return { isValidPair: true, checkName: 'columns' };
  }

  checkRows({ column1, row1, column2 }) {
    const { minColumnValue, maxColumnValue } = this.compareColumnValues({ column1, column2 });
    for (let i = minColumnValue + 1; i < maxColumnValue; i += 1) {
      if (this.matrix[row1][i] !== '') {
        return { isValidPair: false, checkName: 'rows' };
      }
    }
    return { isValidPair: true, checkName: 'rows' };
  }

  getNums({ column1, row1, column2, row2 }) {
    const num1 = Number(this.matrix[row1][column1]);
    const num2 = Number(this.matrix[row2][column2]);
    return { num1, num2 };
  }
}
