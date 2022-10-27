import { useRef, useEffect } from 'react';

export function useViewModel(viewModelInstance) {
  const ref = useRef(viewModelInstance);

  useEffect(() => {
    return () => {
      if (typeof ref.current.destroy === 'function') {
        ref.current.destroy();
      }
    };
  }, []);

  return ref.current;
}
