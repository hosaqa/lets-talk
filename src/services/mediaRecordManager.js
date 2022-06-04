class MediaRecordManager {
  _mediaRecorder = null;
  _audioChunks = [];

  constructor() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this._mediaRecorder = new MediaRecorder(stream);
        debugger
        this._mediaRecorder.addEventListener('dataavailable', event => {
          this._audioChunks.push(event.data);
        });
      });
  }
  
  startRecord = () => {
    this._mediaRecorder.start();
  }

  pause = () => {
    this._mediaRecorder.pause();
  }

  resume = () => {
    this._mediaRecorder.resume();
  }

  stop = () => {
    this._mediaRecorder.stop();
    debugger
    const audioBlob = new Blob(this._audioChunks, { 'type': 'audio/ogg; codecs=opus' });
    const audioUrl = URL.createObjectURL(audioBlob);

    this._audioChunks.length = 0;

    return audioUrl;
  }
}

export default new MediaRecordManager();