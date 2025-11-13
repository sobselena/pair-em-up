import { Component } from './Component.js';

export class Table extends Component {
  constructor({ classes, thead, tbody }) {
    super({ tag: 'table', classes });
    this.theadObj = new Component({ tag: 'thead' }, ...thead);
    this.tbodyObj = new Component({ tag: 'tbody' }, ...tbody);
    this.appendChildren([this.theadObj, this.tbodyObj]);
  }

  getTbody() {
    return this.tbodyObj;
  }
}

export class Tr extends Component {
  constructor(...children) {
    super({ tag: 'tr' }, ...children);
  }
}
