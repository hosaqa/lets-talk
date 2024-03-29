class MediaRecordManager {
  _mediaRecorder = null;
  _audioChunks = [];
  _status = 'idle';
  _audioUrlPromise = null;

  get isPaused() {
    return this._status === 'paused';
  }

  get isRecording() {
    return this._status === 'recording';
  }

  startRecord = () => {
    this._status = 'recording';

    this._audioUrlPromise = new Promise((resolve) => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this._mediaRecorder = new MediaRecorder(stream);
        this._mediaRecorder.start();

        this._mediaRecorder.addEventListener('dataavailable', (event) => {
          this._audioChunks.push(event.data);
        });
        this._mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(this._audioChunks, { type: 'audio/ogg; codecs=opus' });
          const audioUrl = URL.createObjectURL(audioBlob);
          this._audioChunks.length = 0;

          resolve(audioUrl);
        });
      });
    });
  };

  pause = () => {
    this._status = 'paused';
    this._mediaRecorder.pause();
  };

  resume = () => {
    this._status = 'recording';
    this._mediaRecorder.resume();
  };

  stop = () => {
    this._status = 'idle';
    this._mediaRecorder.stop();

    return this._audioUrlPromise;
  };
}

export default MediaRecordManager;
