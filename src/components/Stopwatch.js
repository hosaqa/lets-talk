import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Stopwatch from '../utils/stopwatch';

const Text = styled.div`
  font-size: 18px;
`;

export default function UIStopwatch({ className, onTick }) {
  const stopwatchRef = useRef(new Stopwatch({ onTick }));

  const [ms, setMs] = useState(timeout);

  const text = ms / 1000;

  useEffect(() => {
    timerRef.current.start();

    timerRef.current.onTick((toEnd) => setMs(toEnd));

    timerRef.current.onEnd(() => {
      if (typeof onExpire === 'function') {
        onExpire();
      }
    });
  }, []);

  return <Text className={className}>{text}</Text>;
}

Stopwatch.propTypes = {
  className: PropTypes.string,
  onTick: PropTypes.func
};
