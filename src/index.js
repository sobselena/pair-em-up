import { Data } from './js/Data.js';
import { Pair } from './js/Pair.js';
import { PairsTools } from './js/PairTools.js';
const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const generateMatrix = new Data({ initialData }).generateMatrix();
const coords = {
  column1: 0,
  row1: 0,
  column2: 0,
  row2: 1,
};
const selectedPair = new PairsTools({ matrix: generateMatrix });
selectedPair.setPair(coords);
console.log(selectedPair);
console.log(selectedPair.getValidPairs());
console.log(generateMatrix);
