import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import { useViewModel } from '../../hooks/useViewModel';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import RecorderStore from './RecorderStore/RecorderStore';
import MediaRecordManager from '../../services/mediaRecordManager';

const ProcessButtons = styled.div`
  display: flex;
`;

function Recorder() {
  const { timeInSeconds, status, startRecord, resume, pause, stop, audioUrl, reset } = useViewModel(
    new RecorderStore(new MediaRecordManager())
  );

  return (
    <div>
      {(status === 'recording' || status === 'paused') && <div>{timeInSeconds}</div>}
      {status === 'idle' ? (
        <Button onClick={startRecord}>💬 Okay, let&apos;s talk!</Button>
      ) : (
        <ProcessButtons>
          {status === 'stopped' ? (
            <>
              {audioUrl && (
                <div>
                  <AudioPlayer audioUrl={audioUrl} />
                  <Button onClick={reset}>Reset!</Button>
                </div>
              )}
            </>
          ) : (
            <>
              {status === 'recording' && <Button onClick={pause}>Pause</Button>}
              {status === 'paused' && <Button onClick={resume}>Continue</Button>}
              <Button onClick={stop}>Stop it</Button>
            </>
          )}
        </ProcessButtons>
      )}
    </div>
  );
}

export default observer(Recorder);
