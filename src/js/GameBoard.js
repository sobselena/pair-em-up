import { Component } from './Component.js';
import { GridItem, BoardGrid } from './BoardGrid.js';
import { PairHandler } from './PairHandler.js';

const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const params = {
  mode: 'classic',
};

const board = new PairHandler({ initialData, params });

export class GameBoard {
  constructor() {
    this.gameBoard = new Component(
      { tag: 'main', classes: ['main'] },
      new Component(
        { tag: 'div', classes: ['wrapper'] },
        new Component(
          { tag: 'section', classes: ['game-board'] },
          new BoardGrid({
            classes: ['game-board__grid'],
            gridItems: board.flattenDigits.map((num, index) => {
              const { row, column } = board.translateFlatToMatrixCoords(index);
              return new GridItem({ classes: ['game-board__cell'], row, column, text: num });
            }),
            onGridItemClicked: (event) => {
              const el = event.target;
              console.log(board);
              if (
                el.classList.contains('game-board__cell') &&
                !el.classList.contains('game-board__cell_active') &&
                el.textContent !== ''
              ) {
                el.classList.add('game-board__cell_active');
                const column = Number(el.dataset.column);
                const row = Number(el.dataset.row);
                board.setPair({ column, row });
                const activeElNodes = document.querySelectorAll(`.game-board__cell_active`);
                if (activeElNodes.length === 2) {
                  board.checkPairStatus();
                  const isValid = board.getStatus().isValidPair;
                  board.unsetStatus();
                  activeElNodes.forEach((activeEl) => {
                    if (isValid) {
                      activeEl.classList.add('game-board__cell_success');
                    } else {
                      activeEl.classList.add('game-board__cell_error');
                    }
                    setTimeout(() => {
                      if (isValid) {
                        activeEl.textContent = '';
                        activeEl.classList.remove('game-board__cell_success');
                      } else {
                        activeEl.classList.remove('game-board__cell_error');
                      }
                      activeEl.classList.remove('game-board__cell_active');
                    }, 300);
                  });
                }
              }
            },
          }),
        ),
      ),
    );
  }
}
