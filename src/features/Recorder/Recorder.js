import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import useRecorderStore from './useRecorderStore';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

const ProcessButtons = styled.div`
  display: flex;
`;

function Recorder() {
  const { timeInSeconds, status, startRecord, pause, stop, audioUrl } = useRecorderStore();

  return (
    <div>
      {(status === 'recording' || status === 'paused') && <div>{timeInSeconds}</div>}
      {status === 'idle' ? (
        <Button onClick={startRecord}>💬 Okay, let&apos;s talk!</Button>
      ) : (
        <ProcessButtons>
          {status === 'stopped' ? (
            <AudioPlayer audioUrl={audioUrl} />
          ) : (
            <>
              {status === 'recording' && <Button onClick={pause}>Pause</Button>}
              {status === 'paused' && <Button onClick={startRecord}>Continue</Button>}
              <Button onClick={stop}>Stop it</Button>
            </>
          )}
        </ProcessButtons>
      )}
    </div>
  );
}

export default observer(Recorder);
