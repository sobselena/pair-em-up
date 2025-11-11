import { Component } from './Component.js';

export class Link extends Component {
  constructor({ classes = [], href, target = '_blank', text }) {
    super({ tag: 'a', classes, text });

    this.setAttribute('href', href);
    this.setAttribute('target', target);
  }
}
