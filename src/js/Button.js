import { Component } from './Component.js';

export class Button extends Component {
  constructor({ classes, text = '', onClick }, ...children) {
    super({ tag: 'button', classes: ['button', ...classes], text }, ...children);

    if (onClick) {
      this.onClick = onClick;
      this.addListener('click', onClick);
    }
  }
}

export class ButtonIcon extends Button {
  constructor({ classes, onClick }) {
    super({ classes: ['img-container', ...classes], onClick });
  }
}
