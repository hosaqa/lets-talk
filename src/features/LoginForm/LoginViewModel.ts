import { injectable, inject } from 'inversify';
import { useNavigate } from 'react-router-dom';

import { IAuthService } from '../../services/AuthService';
import { TYPES } from '../../di/types';

export interface ILoginViewModel {
  loginByGoogle: () => Promise<void>;
}

@injectable()
export class LoginViewModel implements ILoginViewModel {
  @inject(TYPES.AuthService) private _authService: IAuthService;

  navigate = useNavigate();

  loginByGoogle = async () => {
    try {
      const email = await this._authService.loginByGoogle();
      this.navigate('/');

      alert(`Hello ${email}!`);
    } catch {
      alert('Something went wrong :(');
    }
  };
}
