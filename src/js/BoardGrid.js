import { Component } from './Component.js';

export class BoardGrid extends Component {
  constructor({ classes, onGridItemClicked, gridItems }) {
    super({ tag: 'div', classes });

    if (onGridItemClicked) {
      this.onClick = onGridItemClicked;
      this.addListener('click', onGridItemClicked);
    }

    this.appendChildren(gridItems);
  }
}

export class GridItem extends Component {
  constructor({ classes, row, column, text }) {
    super({ tag: 'div', classes, text });

    this.setAttribute('data-row', row);
    this.setAttribute('data-column', column);
  }

  removeGridItem() {
    super.delete();
  }
}
