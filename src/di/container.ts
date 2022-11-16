import { Container } from 'inversify';
import { IAudioPlayer, AudioPlayer } from '../services/audioPlayer';
import { ITagsService, TagsService } from '../services/TagsService';
import { IAuthService, FirebaseAuthService } from '../services/AuthService';
import { ILoginViewModel, LoginViewModel } from '../features/LoginForm/LoginViewModel';
import { IAddTagViewModel, AddTagViewModel } from '../features/Tags/AddTagForm/AddTagViewModel';
import { ITagsListViewModel, TagsListViewModel } from '../features/Tags/TagsList/TagsListViewModel';

import { TYPES } from './types';

export const container = new Container();

container.bind<IAudioPlayer>(TYPES.AudioPlayer).to(AudioPlayer);
container.bind<IAuthService>(TYPES.AuthService).to(FirebaseAuthService).inSingletonScope();
container.bind<ITagsService>(TYPES.TagsService).to(TagsService).inSingletonScope();

container.bind<ILoginViewModel>(TYPES.LoginViewModel).to(LoginViewModel);
container.bind<IAddTagViewModel>(TYPES.AddTagViewModel).to(AddTagViewModel);
container.bind<ITagsListViewModel>(TYPES.TagsListViewModel).to(TagsListViewModel);
