import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import Timer from '../utils/timer';

const Text = styled.div`
  font-size: 18px;
`;

export default function UITimer ({ className, timeout, onExpire }) {
  const timerRef = useRef(new Timer(timeout));

  const [ms, setMs] = useState(timeout);

  const msRef = useRef(ms);


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
  
  return (
    <Text className={className}>
      {text}
    </Text>
  )
}