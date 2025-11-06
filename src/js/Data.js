export const COLUMNS_MAX_COUNT = 9;
export class Data {
  constructor({ initialData, mode = 'classic' }) {
    const splitArr = this.splitMultiDigits(initialData).flat();
    this.mode = mode;
    this.flattenDigits = this.applyMode(splitArr);
  }

  applyMode(splitArr) {
    if (this.mode === 'random') {
      return this.shuffle(splitArr);
    }
    if (this.mode === 'chaotic') {
      return this.chaoticMode(splitArr);
    }
    return splitArr;
  }

  generateNewNums() {
    const remainingNums = this.flattenDigits.filter((num) => num !== '');
    let newNums = remainingNums;
    if (this.mode === 'random') {
      newNums = this.shuffle(remainingNums);
    } else if (this.mode === 'chaotic') {
      newNums = this.chaoticMode(remainingNums);
    }
    this.flattenDigits = this.flattenDigits.concat(newNums);
  }

  shuffle(splitArr) {
    const copyFlatArr = [...splitArr];
    for (let i = copyFlatArr.length - 1; i >= 0; i -= 1) {
      const randomPosition = Math.floor(Math.random() * (i + 1));
      [copyFlatArr[i], copyFlatArr[randomPosition]] = [copyFlatArr[randomPosition], copyFlatArr[i]];
    }
    return copyFlatArr;
  }
  chaoticMode(splitArr) {
    const chaoticArr = [];
    for (let i = 0; i < splitArr.length; i += 1) {
      const randomNum = Math.floor(Math.random() * 9) + 1;
      chaoticArr.push(randomNum.toString());
    }
    return chaoticArr;
  }
  generateMatrix() {
    const rowCount = Math.ceil(this.flattenDigits.length / this.COLUMNS_MAX_COUNT);
    const matrix = [];
    for (let i = 0; i < rowCount; i += 1) {
      matrix.push([]);
      for (let j = 0; j < this.COLUMNS_MAX_COUNT; j += 1) {
        matrix[i][j] = this.flattenDigits[i * this.COLUMNS_MAX_COUNT + j] || '';
      }
    }

    return matrix;
  }

  splitMultiDigits(values = []) {
    return values.map((value) => {
      const strValue = value.toString();
      return strValue.split('');
    });
  }
}
