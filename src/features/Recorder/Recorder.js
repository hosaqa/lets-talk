import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import useRecorderState from './useRecorderState';

const ProcessButtons = styled.div`
  display: flex;
`;

export default function Recorder() {
  const { currentTime, status, setStatus } = useRecorderState();

  return (
    <div>
      <div>{currentTime / 1000}</div>
      {status === 'idle' ? (
        <Button onClick={() => setStatus('recording')}>💬 Okay, let&apos;s talk!</Button>
      ) : (
        <ProcessButtons>
          {status === 'stopped' ? (
            <div>11</div>
          ) : (
            <>
              {status === 'recording' && <Button onClick={() => setStatus('paused')}>Pause</Button>}
              {status === 'paused' && (
                <Button onClick={() => setStatus('recording')}>Continue</Button>
              )}
              <Button onClick={() => setStatus('stopped')}>Stop it</Button>
            </>
          )}
        </ProcessButtons>
      )}
    </div>
  );
}
