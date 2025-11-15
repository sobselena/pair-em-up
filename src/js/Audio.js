const ctx = new AudioContext();

const audioURLs = [
  'assist-tools',
  'cell-selection',
  'cell-deselection',
  'game-start',
  'invalid-pairs',
  'valid-pairs',
];

export const audioPromisesObj = {};
async function fetchAudio(url) {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

  return audioBuffer;
}

audioURLs.forEach((audioName) => {
  audioPromisesObj[audioName] = fetchAudio(`src/assets/audio/${audioName}.mp3`);
});

export function playAudio(buffer, start = 0, duration = 1) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);

  source.start(0, start, duration);
}
