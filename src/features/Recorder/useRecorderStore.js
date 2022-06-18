import { useRef } from 'react';
import RecorderStore from './RecorderStore/RecorderStore';
import MediaRecordManager from '../../services/mediaRecordManager';

export default function useRecorderStore() {
  const storeRef = useRef(new RecorderStore(new MediaRecordManager()));

  return storeRef.current;
}
