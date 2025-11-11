import { COLUMNS_MAX_COUNT, Data } from './Data.js';

export class CheckedPair extends Data {
  #status = undefined;
  constructor({ initialData, params }) {
    super({ initialData: initialData, params });
  }
  getStatus() {
    return this.#status;
  }
  unsetStatus() {
    this.#status = undefined;
  }
  checkValues({ column1, column2, row1, row2 }) {
    const { num1, num2 } = this.getNums({ column1, row1, column2, row2 });
    if (num1 !== num2 && num1 + num2 !== 10) {
      return (this.#status = {
        isValidPair: false,
        checkName: 'sum to 10 and identical numbers check',
      });
    }
    return (this.#status = {
      isValidPair: true,
      checkName: 'sum to 10 and identical numbers check',
    });
  }

  checkPair({ column1, column2, row1, row2 }) {
    if (row1 === row2) {
      return this.checkRows({ column1, column2, row1, row2 });
    }
    if (column1 === column2) {
      return this.checkColumns({ column1, column2, row1, row2 });
    }
    return this.checkLineBreak({ column1, column2, row1, row2 });
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

  #checkRightLineBreak({ column1, column2, row1, row2 }) {
    const { maxColumnValue } = this.compareColumnValues({ column1, column2 });
    const { maxRowValue } = this.compareRowValues({ row1, row2 });
    for (let i = maxColumnValue + 1; i < COLUMNS_MAX_COUNT; i += 1) {
      console.log(this.matrix[maxRowValue][i]);
      if (this.matrix[maxRowValue][i] !== '') {
        return (this.#status = { isValidPair: false, checkName: 'linebreak checkRightLineBreak' });
      }
    }
  }
  #checkLeftLineBreak({ column1, column2, row1, row2 }) {
    const { minColumnValue } = this.compareColumnValues({ column1, column2 });
    const { maxRowValue } = this.compareRowValues({ row1, row2 });
    for (let i = 0; i < minColumnValue - 1; i += 1) {
      if (this.matrix[maxRowValue][i] !== '') {
        return (this.#status = { isValidPair: false, checkName: 'linebreak checkLeftLineBreak' });
      }
    }
  }
  #checkBetweenLineBreak({ row1, row2 }) {
    const { minRowValue, maxRowValue } = this.compareRowValues({ row1, row2 });
    for (let i = minRowValue + 1; i < maxRowValue - 1; i += 1) {
      for (let j = 0; j < COLUMNS_MAX_COUNT; j += 1) {
        if (this.matrix[i][j] !== '') {
          return (this.#status = {
            isValidPair: false,
            checkName: 'linebreak checkBetweenLineBreak',
          });
        }
      }
    }
  }

  checkLineBreak({ column1, row1, column2, row2 }) {
    const checkValuesResult = this.checkValues({ column1, column2, row1, row2 });
    if (!checkValuesResult.isValidPair) return checkValuesResult;

    const failRight = this.#checkRightLineBreak({ column1, column2, row1, row2 });
    if (failRight) return failRight;

    const failLeft = this.#checkLeftLineBreak({ column1, column2, row1, row2 });
    if (failLeft) return failLeft;

    const failBetween = this.#checkBetweenLineBreak({ row1, row2 });
    if (failBetween) return failBetween;

    return (this.#status = { isValidPair: true, checkName: 'linebreak' });
  }

  #checkColumn({ column1, row1, row2 }) {
    const { maxRowValue, minRowValue } = this.compareRowValues({ row1, row2 });
    for (let i = minRowValue + 1; i < maxRowValue; i += 1) {
      if (this.matrix[i][column1] !== '') {
        return (this.#status = { isValidPair: false, checkName: 'columns' });
      }
    }
  }

  checkColumns({ column1, row1, row2, column2 }) {
    const checkValuesResult = this.checkValues({ column1, column2, row1, row2 });
    if (!checkValuesResult.isValidPair) return checkValuesResult;

    const failColumn = this.#checkColumn({ column1, row1, row2 });
    if (failColumn) return failColumn;
    return (this.#status = { isValidPair: true, checkName: 'columns' });
  }

  #checkRow({ column1, column2, row1 }) {
    const { minColumnValue, maxColumnValue } = this.compareColumnValues({ column1, column2 });
    for (let i = minColumnValue + 1; i < maxColumnValue; i += 1) {
      if (this.matrix[row1][i] !== '') {
        return (this.#status = { isValidPair: false, checkName: 'rows' });
      }
    }
  }

  checkRows({ column1, row1, column2, row2 }) {
    const checkValuesResult = this.checkValues({ column1, column2, row1, row2 });
    if (!checkValuesResult.isValidPair) return checkValuesResult;

    const failRow = this.#checkRow({ column1, column2, row1 });
    if (failRow) return failRow;

    return (this.#status = { isValidPair: true, checkName: 'rows' });
  }

  getNums({ column1, row1, column2, row2 }) {
    const num1 = Number(this.matrix[row1][column1]);
    const num2 = column2 === undefined ? undefined : Number(this.matrix[row2][column2]);

    return { num1, num2 };
  }
}
