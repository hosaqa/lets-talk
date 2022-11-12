import { useState, useLayoutEffect, useRef } from 'react';
import Stopwatch from '../utils/stopwatch';

export default function useStopwatch() {
  const stopwatchRef = useRef(new Stopwatch());
  const [currentTime, setCurrentTime] = useState(stopwatchRef.current.currentTime);

  useLayoutEffect(() => {
    stopwatchRef.current.on('tick', setCurrentTime);
  }, []);

  return {
    currentTime,
    start: () => stopwatchRef.current.start(),
    pause: () => stopwatchRef.current.pause(),
    resume: () => stopwatchRef.current.resume(),
  };
}
