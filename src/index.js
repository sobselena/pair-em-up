import { Data } from './js/Data.js';
import { SelectedPair } from './js/SelectedPair.js';
const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const generatedMatrix = new Data({ initialData }).generateMatrix();
const coords = {
  column1: 0,
  row1: 0,
  column2: 0,
  row2: 1,
};
const pair = new SelectedPair({ matrix: generatedMatrix });
pair.setPair(coords);
console.log(pair);
console.log(pair.getValidPairs());
console.log(generatedMatrix);
