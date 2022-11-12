import { useRef, useEffect } from 'react';

export function useViewModel<T extends { destroy?: () => void | undefined }>(viewModelInstance: T) {
  const ref = useRef<T>(viewModelInstance);

  useEffect(() => {
    return () => {
      if (typeof ref.current.destroy === 'function') {
        ref.current.destroy();
      }
    };
  }, []);

  return ref.current;
}
