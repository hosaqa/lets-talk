import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import Button from '../../components/Button/Button';
import { useViewModel } from '../../hooks/useViewModel';
import { AudioPlayerViewModel } from './AudioPlayerViewModel';

function AudioPlayer({ audioUrl }) {
  const { status, play, pause, stop } = useViewModel(new AudioPlayerViewModel(audioUrl));

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

AudioPlayer.propTypes = {
  audioUrl: PropTypes.any
};

export default observer(AudioPlayer);
