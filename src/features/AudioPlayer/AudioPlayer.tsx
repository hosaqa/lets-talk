import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import Button from '../../components/Button/Button';
import { useViewModel } from '../../hooks/useViewModel';
import { AudioPlayerViewModel } from './AudioPlayerViewModel';
import { AudioPlayer } from '../../services/audioPlayer';

function AudioPlayerUI({ audioUrl }: { audioUrl: string }) {
  const { status, play, pause, stop } = useViewModel(
    new AudioPlayerViewModel(new AudioPlayer(), audioUrl)
  );

  return (
    <div>
      {status === 'idle' ? (
        <Button onClick={play}>Play!</Button>
      ) : (
        <>
          <Button onClick={pause}>Pause!</Button>
          <Button onClick={stop}>Play!</Button>
        </>
      )}
    </div>
  );
}

export default observer(AudioPlayerUI);
