export class Component {
  #node;
  #children = [];
  constructor({ tag = 'div', text = '', classes = [] }, ...children) {
    const node = document.createElement(tag);
    node.textContent = text;
    node.classList.add(...classes);
    this.#node = node;
    if (children.length > 0) {
      this.appendChildren(children);
    }
  }

  appendChildren(children) {
    children.forEach((child) => {
      this.#children.push(child);
      this.#node.append(child.getNode());
    });
  }

  getNode() {
    return this.#node;
  }
  getAllChildren() {
    return this.#children;
  }

  setAttribute(attribute, value) {
    this.#node.setAttribute(attribute, value);
  }

  addListener(event, callback) {
    this.#node.addEventListener(event, callback);
  }

  getChildEl(selector) {
    return this.#node.querySelector(selector);
  }
  getChildrenEl(selector) {
    return this.#node.querySelectorAll(selector);
  }
}
