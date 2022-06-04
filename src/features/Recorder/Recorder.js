import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import mediaRecordManager from '../../services/mediaRecordManager';
import AudioPlayer from '../../services/audioPlayer';
import Timer from '../../components/Timer';

const ProcessButtons = styled.div`
  display: flex;
`;

export default function Recorder () {
  const [status, setStatus] = useState('idle'); // idle | recording | paused | stopped
  const [recorded, setRecorder] = useState(0);
  const stopFnRef = useRef(null);
  
  useEffect(() => {
    if (status === 'recording') {
      mediaRecordManager.startRecord();
    } else if (status === 'paused') {

    } else if (status === 'stopped') {
      const audioUrl = mediaRecordManager.stop();

      const player = new AudioPlayer(audioUrl);
      debugger
      player.play();
    }
  }, [status]);

  return <div>
    {status === 'idle' 
      ? <Button onClick={() => setStatus('recording')}>💬 Okay, let's talk!</Button>
      : <ProcessButtons>
        <Timer timeout={5000}/>
        {status === 'paused'
          ? <Button onClick={() => setStatus('recording')}>Continue</Button>
          : <Button onClick={() => setStatus('paused')}>Pause</Button>
        }
        <Button onClick={() => setStatus('stopped')}>Stop it</Button>
      </ProcessButtons>
    }
  </div>
}