class Timer {
  constructor(timeout) {
    this._toEnd = timeout;
    this._callbacks = {
      onTick: [],
      onEnd: [],
    };
  }

  _tick = () => {
    setTimeout(() => {
      this._toEnd = this._toEnd - 1000;

      this._fireEvent('onTick', this._toEnd);

      if (this._toEnd !== 0) {
        this._tick();
      } else {
        this._fireEvent('onEnd');
      }
    }, 1000);
  };

  _registerCallback = (event, callback) => {
    this._callbacks[event].push(callback);
  };

  _fireEvent = (event, params) => {
    for (const callbackItem of this._callbacks[event]) {
      callbackItem(params);
    }
  };

  onTick = (callback) => {
    this._registerCallback('onTick', callback);
  };

  onEnd = (callback) => {
    this._registerCallback('onEnd', callback);
  };

  start = () => {
    this._tick();
  };
}

export default Timer;
