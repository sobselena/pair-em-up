import { PairHandler } from './js/PairHandler.js';
const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const params = {
  mode: 'classic',
};
const board = new PairHandler({ initialData, params });
console.log(board);
// board.setPair({ column1: 0, column2: 0, row1: 0, row2: 1 });
// console.log(board.matrix);
// console.log(board.getStatus());
// board.setPair({ column1: 8, column2: 1, row1: 0, row2: 1 });
// console.log(board.matrix);
// console.log(board.getStatus());
// board.setPair({ column1: 7, column2: 8, row1: 2, row2: 2 });
// console.log(board.matrix);
// console.log(board.getStatus());
board.addNewNums();
console.log(board.matrix);
board.addNewNums();
console.log(board.matrix);
