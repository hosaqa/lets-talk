class MediaRecordManager {
  _mediaRecorder = null;
  _audioChunks = [];
  _status = 'idle';
  _audioUrl = null;

  constructor() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this._mediaRecorder = new MediaRecorder(stream);

      this._mediaRecorder.addEventListener('dataavailable', (event) => {
        this._audioChunks.push(event.data);
      });
      this._mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(this._audioChunks, { type: 'audio/ogg; codecs=opus' });
        const audioUrl = URL.createObjectURL(audioBlob);
        this._audioChunks.length = 0;

        this._audioUrl = audioUrl;
      });
    });
  }

  get isPaused() {
    return this._status === 'paused';
  }

  get isRecording() {
    return this._status === 'recording';
  }

  get audioUrl() {
    return this._audioUrl;
  }

  startRecord = () => {
    this._status = 'recording';
    this._mediaRecorder.start();
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
  };
}

export default MediaRecordManager;
