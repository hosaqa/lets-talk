import { useState, useEffect, useRef } from 'react';
import MediaRecordManager from '../../services/mediaRecordManager';
import AudioPlayer from '../../services/audioPlayer';
import useStopwatch from '../../hooks/useStopwatch';

export default function useRecorderState() {
  const mediaRecordManagerRef = useRef(new MediaRecordManager());

  const [status, setStatus] = useState('idle'); // idle | recording | paused | stopped

  const { currentTime, start, pause } = useStopwatch();

  useEffect(() => {
    if (status === 'recording') {
      if (mediaRecordManagerRef.current.isPaused) {
        mediaRecordManagerRef.current.resume();
      } else {
        mediaRecordManagerRef.current.startRecord();
      }
      start();
    } else if (status === 'paused') {
      mediaRecordManagerRef.current.pause();
      pause();
    } else if (status === 'stopped') {
      pause();
      const audioUrl = mediaRecordManagerRef.current.stop();

      const player = new AudioPlayer(audioUrl);

      player.play();
    }
  }, [status]);

  return {
    currentTime,
    status,
    setStatus
  };
}
