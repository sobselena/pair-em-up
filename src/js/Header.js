import { Component } from './Component.js';
import { createHeaderAssistTools } from './HeaderAssistTools.js';
import { createHeaderInfo } from './HeaderInfo.js';
export const header = new Component(
  { tag: 'div', classes: ['header'] },
  new Component(
    { tag: 'div', classes: ['wrapper'] },
    createHeaderInfo(),
    createHeaderAssistTools(),
  ),
);
