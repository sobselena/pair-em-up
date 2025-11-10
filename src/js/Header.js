import { Component } from './Component.js';
import { createHeaderAssistTools } from './HeaderAssistTools.js';
import { createHeaderInfo } from './HeaderInfo.js';
export function createHeader() {
  return new Component(
    { tag: 'div', classes: ['header'] },
    new Component(
      { tag: 'div', classes: ['wrapper'] },
      createHeaderInfo(),
      createHeaderAssistTools(),
    ),
  );
}
