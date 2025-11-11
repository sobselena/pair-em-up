import { Component } from './Component.js';

export class Table extends Component {
  constructor({ classes, thead, tbody }) {
    super({ tag: 'table', classes });
    this.appendChildren([...thead, ...tbody]);
  }
}

export class Tr extends Component {
  constructor(...children) {
    super({ tag: 'tr' }, ...children);
  }
}
