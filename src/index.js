import { Data } from './js/Data.js';
import { Pair } from './js/Pair.js';
const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const generateMatrix = new Data({ initialData }).generateMatrix();
console.log(generateMatrix);
