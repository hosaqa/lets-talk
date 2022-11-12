import { injectable } from 'inversify';

export interface IAudioPlayer {
  play: () => void;
  pause: () => void;
  stop: () => void;
  setSrc: (audioUrl: string) => void;
}

@injectable()
export class AudioPlayer implements IAudioPlayer {
  private _audio: HTMLAudioElement = new Audio();

  setSrc = (audioUrl: string) => {
    this._audio.src = audioUrl;
  };

  play = () => {
    this._audio.play();
  };

  pause = () => {
    this._audio.pause();
  };

  stop = () => {
    throw new Error('should be implemented');
  };
}
