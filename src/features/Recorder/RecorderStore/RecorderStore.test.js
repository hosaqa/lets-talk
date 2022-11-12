/* eslint-disable @typescript-eslint/no-empty-function */
import RecorderStore from './RecorderStore';

test('initial status should be "idle"', () => {
  const recorderStore = new RecorderStore({
    startRecord: () => {},
    pause: () => {},
    stop: () => {},
  });

  expect(recorderStore.status).toBe('idle');
});

test('stardRecord method should set status to "recording"', () => {
  const recorderStore = new RecorderStore({
    startRecord: () => {},
    pause: () => {},
    stop: () => {},
  });

  recorderStore.startRecord();

  expect(recorderStore.status).toBe('recording');
});

test('after calling stardRecord method should be called stardRecord method of MediaRecordManager', () => {
  const mediaRecordManager = {
    startRecord: jest.fn(),
    pause: () => {},
    stop: () => {},
  };
  const recorderStore = new RecorderStore(mediaRecordManager);

  recorderStore.startRecord();

  expect(mediaRecordManager.startRecord).toHaveBeenCalled();
});

test('method pause should set status to "paused"', () => {
  const mediaRecordManager = {
    startRecord: () => {},
    pause: () => {},
    stop: () => {},
  };
  const recorderStore = new RecorderStore(mediaRecordManager);

  recorderStore.startRecord();
  recorderStore.pause();

  expect(recorderStore.status).toBe('paused');
});

test('after calling method pause should be called "pause" method of MediaRecordManager', () => {
  const mediaRecordManager = {
    startRecord: () => {},
    pause: jest.fn(),
    stop: () => {},
  };
  const recorderStore = new RecorderStore(mediaRecordManager);

  recorderStore.startRecord();
  recorderStore.pause();

  expect(mediaRecordManager.pause).toHaveBeenCalled();
});

test('method stop should set status to "stopped"', () => {
  const mediaRecordManager = {
    startRecord: () => {},
    pause: () => {},
    stop: () => {},
  };
  const recorderStore = new RecorderStore(mediaRecordManager);

  recorderStore.startRecord();
  recorderStore.stop();

  expect(recorderStore.status).toBe('stopped');
});

test('after calling method stop should be called "stop" method of MediaRecordManager', () => {
  const mediaRecordManager = {
    startRecord: () => {},
    pause: () => {},
    stop: jest.fn(),
  };
  const recorderStore = new RecorderStore(mediaRecordManager);

  recorderStore.startRecord();
  recorderStore.stop();

  expect(mediaRecordManager.stop).toHaveBeenCalled();
});
