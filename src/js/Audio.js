import assistTools from '../assets/audio/assist-tools.mp3';
import cellSelection from '../assets/audio/cell-selection.mp3';
import cellDeselection from '../assets/audio/cell-deselection.mp3';
import gameStart from '../assets/audio/game-start.mp3';
import invalidPairs from '../assets/audio/invalid-pairs.mp3';
import validPairs from '../assets/audio/valid-pairs.mp3';

const ctx = new AudioContext();

const audioURLs = {
  'assist-tools': assistTools,
  'cell-selection': cellSelection,
  'cell-deselection': cellDeselection,
  'game-start': gameStart,
  'invalid-pairs': invalidPairs,
  'valid-pairs': validPairs,
};

export const audioPromisesObj = {};
async function fetchAudio(url) {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

  return audioBuffer;
}

Object.entries(audioURLs).forEach(([audioName, audioURL]) => {
  audioPromisesObj[audioName] = fetchAudio(audioURL);
});

export function playAudio(buffer, start = 0, duration = 1) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);

  source.start(0, start, duration);
}
