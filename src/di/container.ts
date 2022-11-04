import { Container } from 'inversify';
import { IAudioPlayer, AudioPlayer } from '../services/audioPlayer';
import { TYPES } from './types';

export const container = new Container();

container.bind<IAudioPlayer>(TYPES.AudioPlayer).to(AudioPlayer);