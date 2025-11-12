import { Component } from './Component.js';

export class Table extends Component {
  constructor({ classes, thead, tbody }) {
    super({ tag: 'table', classes });
    const theadEl = new Component({ tag: 'thead' }, ...thead);
    const tbodyEl = new Component({ tag: 'tbody' }, ...tbody);
    this.appendChildren([theadEl, tbodyEl]);
  }
}

export class Tr extends Component {
  constructor(...children) {
    super({ tag: 'tr' }, ...children);
  }
}
