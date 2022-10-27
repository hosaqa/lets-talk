import { makeObservable, observable, action, reaction, computed } from 'mobx';
import Stopwatch from '../../../utils/stopwatch';

export default class RecorderStore {
  status = 'idle';
  time = 0;

  constructor(mediaRecordManager) {
    this.mediaRecordManager = mediaRecordManager;

    this.stopwatch = new Stopwatch();
    this.time = this.stopwatch.currentTime;
    this.stopwatch.on('tick', this.setCurrentTime);

    this.audioUrl = null;

    makeObservable(this, {
      status: observable,
      time: observable,
      timeInSeconds: computed,
      startRecord: action,
      pause: action,
      stop: action,
      reset: action,
      setCurrentTime: action,
      audioUrl: observable,
      setAudioUrl: action
    });

    this.dispose = reaction(
      () => this.status,
      (status, prevStatus) => {
        if (status === 'recording') {
          if (prevStatus === 'paused') {
            mediaRecordManager.resume();
            this.stopwatch.resume();
          } else {
            mediaRecordManager.startRecord();
            this.stopwatch.start();
            this.setAudioUrl(null);
          }
        } else if (status === 'paused') {
          mediaRecordManager.pause();
          this.stopwatch.pause();
        } else if (status === 'stopped') {
          mediaRecordManager.stop().then((audioUrl) => {
            this.setAudioUrl(audioUrl);
          });
          this.stopwatch.pause();
        }
      }
    );
  }

  get timeInSeconds() {
    return this.time / 1000;
  }

  setAudioUrl = (audioUrl) => {
    this.audioUrl = audioUrl;
  };

  startRecord = () => {
    this.status = 'recording';
  };

  pause = () => {
    this.status = 'paused';
  };

  resume = () => {
    this.status = 'recording';
  };

  stop = () => {
    this.status = 'stopped';
  };

  reset = () => {
    this.status = 'idle';
    this.time = 0;
  };

  setCurrentTime = (value) => {
    this.time = value;
  };

  destroy = () => {
    this.dispose();
  };
}
