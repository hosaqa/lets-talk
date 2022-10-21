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

    makeObservable(this, {
      status: observable,
      time: observable,
      timeInSeconds: computed,
      startRecord: action,
      pause: action,
      stop: action,
      setCurrentTime: action
    });

    this.dispose = reaction(
      () => this.status,
      (status) => {
        if (status === 'recording') {
          mediaRecordManager.startRecord();
          this.stopwatch.start();
        } else if (status === 'paused') {
          mediaRecordManager.pause();
          this.stopwatch.pause();
        } else if (status === 'stopped') {
          mediaRecordManager.stop();
          this.stopwatch.pause();
        }
      }
    );
  }

  get timeInSeconds() {
    return this.time / 1000;
  }

  get audioUrl() {
    return this.mediaRecordManager.audioUrl;
  }

  startRecord = () => {
    this.status = 'recording';
  };

  pause = () => {
    this.status = 'paused';
  };

  stop = () => {
    this.status = 'stopped';
  };

  setCurrentTime = (value) => {
    this.time = value;
  };
}
