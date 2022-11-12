import { makeObservable, observable, action, reaction, IReactionDisposer } from 'mobx';
import { IAudioPlayer } from '../../services/audioPlayer';

export class AudioPlayerViewModel {
  status: 'idle' | 'playing' | 'paused' | 'stopped' = 'idle';
  private _disposeStatusReaction: IReactionDisposer;
  private _audioPlayer: IAudioPlayer;

  public constructor(audioPlayer: IAudioPlayer, audioUrl: string) {
    makeObservable(this, {
      status: observable,
      play: action,
      pause: action,
      stop: action,
    });

    this._disposeStatusReaction = reaction(
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

    this._audioPlayer = audioPlayer;
    this._audioPlayer.setSrc(audioUrl);
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
    this._disposeStatusReaction();
  };
}
