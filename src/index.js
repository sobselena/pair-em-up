import { Data } from './js/Data.js';
import { Pairs } from './js/Pairs.js';
const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const generateMatrix = new Data({ initialData }).generateMatrix();
const checkPairs1 = new Pairs({
  matrix: generateMatrix,
  coords1: { column1: 0, row1: 0 },
  coords2: { column2: 0, row2: 1 },
});
checkPairs1.checkPairs();
const checkPairs2 = new Pairs({
  matrix: generateMatrix,
  coords1: { column1: 8, row1: 0 },
  coords2: { column2: 1, row2: 1 },
});
checkPairs2.checkPairs();
const checkPairs3 = new Pairs({
  matrix: generateMatrix,
  coords1: { column1: 8, row1: 1 },
  coords2: { column2: 8, row2: 2 },
});
checkPairs3.checkPairs();
console.log(checkPairs1.matrix);
console.log(checkPairs2.matrix);
console.log(checkPairs3.matrix);

console.log(generateMatrix);
