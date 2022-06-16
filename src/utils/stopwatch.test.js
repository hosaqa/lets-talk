import Stopwatch from './stopwatch';

jest.useFakeTimers();

test('after initialization current time should be 0', () => {
  const stopwatch = new Stopwatch();

  expect(stopwatch.currentTime).toBe(0);
});

test('after starting in 10 seconds currentTime should be 10 000', () => {
  const stopwatch = new Stopwatch();

  stopwatch.start();

  jest.advanceTimersByTime(10000);

  stopwatch.pause();

  expect(stopwatch.currentTime).toBe(10000);
});

test('onTick callback should be called every second with param currentTime', () => {
  const callback = jest.fn();
  const stopwatch = new Stopwatch({ onTick: callback });

  stopwatch.start();

  jest.advanceTimersByTime(33000);

  stopwatch.pause();

  expect(callback).toHaveBeenCalledTimes(33);

  expect(callback).toHaveBeenNthCalledWith(1, 1000);
  expect(callback).toHaveBeenNthCalledWith(2, 2000);

  expect(callback).toHaveBeenNthCalledWith(10, 10000);
  expect(callback).toHaveBeenNthCalledWith(32, 32000);
  expect(callback).toHaveBeenNthCalledWith(33, 33000);
});

test('onTick callback should be called ONLY after an integer number of seconds', () => {
  const callback = jest.fn();
  const stopwatch = new Stopwatch({ onTick: callback });

  stopwatch.start();

  jest.advanceTimersByTime(3333);

  stopwatch.pause();

  expect(callback).toHaveBeenCalledTimes(3);
});

test('pause method should stop ticking', () => {
  const callback = jest.fn();
  const stopwatch = new Stopwatch({ onTick: callback });

  stopwatch.start();
  jest.advanceTimersByTime(5000);
  stopwatch.pause();

  jest.advanceTimersByTime(5000);

  expect(stopwatch.currentTime).toBe(5000);
});

test('resume method should continue ticking', () => {
  const callback = jest.fn();
  const stopwatch = new Stopwatch({ onTick: callback });

  stopwatch.start();
  jest.advanceTimersByTime(5000);
  stopwatch.pause();

  jest.advanceTimersByTime(5000);

  stopwatch.resume();

  jest.advanceTimersByTime(12000);
  stopwatch.pause();

  expect(stopwatch.currentTime).toBe(17000);
});

test('method on should add a callback for on the related event', () => {
  const callback = jest.fn();
  const stopwatch = new Stopwatch();

  stopwatch.on('tick', callback);

  stopwatch.start();
  jest.advanceTimersByTime(3000);

  stopwatch.pause();

  expect(callback).toHaveBeenCalledTimes(3);
});
