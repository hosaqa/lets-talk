import { Container } from 'inversify';
import { IAudioPlayer, AudioPlayer } from '../services/audioPlayer';
import { IAuthService, FirebaseAuthService } from '../services/AuthService';
import { ILoginViewModel, LoginViewModel } from '../features/LoginForm/LoginViewModel';
import { TYPES } from './types';

export const container = new Container();

container.bind<IAudioPlayer>(TYPES.AudioPlayer).to(AudioPlayer);
container.bind<IAuthService>(TYPES.AuthService).to(FirebaseAuthService).inSingletonScope();
container.bind<ILoginViewModel>(TYPES.LoginViewModel).to(LoginViewModel);
