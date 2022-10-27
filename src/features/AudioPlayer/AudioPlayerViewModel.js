import { makeObservable, observable, action, reaction } from 'mobx';
import { AudioPlayer } from '../../services/audioPlayer';

export class AudioPlayerViewModel {
  status = 'idle';

  constructor(audioUrl) {
    this._audioPlayer = new AudioPlayer(audioUrl);

    makeObservable(this, {
      status: observable,
      play: action,
      pause: action,
      stop: action
    });

    this.dispose = reaction(
      () => this.status,
      (status) => {
        if (status === 'playing') {
          this._audioPlayer.play();
        } else if (status === 'paused') {
          this._audioPlayer.pause();
        } else if (status === 'stopped') {
          this._audioPlayer.stop();
        }
      }
    );
  }

  play = () => {
    this.status = 'playing';
  };

  pause = () => {
    this.status = 'paused';
  };

  stop = () => {
    this.status = 'idle';
  };

  destroy = () => {
    this.dispose();
  };
}
