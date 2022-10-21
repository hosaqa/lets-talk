export class AudioPlayer {
  constructor(audioUrl) {
    this._audio = new Audio(audioUrl);
  }

  play = () => {
    this._audio.play();
  };

  pause = () => {};

  stop = () => {};
}
