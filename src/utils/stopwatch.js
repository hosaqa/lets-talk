class Stopwatch {
  constructor({ autorun = false, onTick } = {}) {
    this._current = 0;
    this._started = false;
    this._callbacks = {
      tick: onTick ? [onTick] : []
    };

    if (autorun) {
      this.start();
    }
  }

  _fireEvent = (type, params) => {
    for (const callback of this._callbacks[type]) {
      callback(params);
    }
  };

  get currentTime() {
    return this._current;
  }

  start = () => {
    this._started = true;

    this._tick();
  };

  pause = () => {
    this._started = false;
  };

  resume = () => {
    this.start();
  };

  _tick = () => {
    setTimeout(() => {
      if (this._started) {
        this._current += 1000;

        this._fireEvent('tick', this._current);

        this._tick();
      }
    }, 1000);
  };
}

export default Stopwatch;
