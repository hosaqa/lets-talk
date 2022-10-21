import { useRef } from 'react';

export function useViewModel(viewModelInstance) {
  const ref = useRef(viewModelInstance);

  return ref.current;
}
