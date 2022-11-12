import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../../components/Button/Button';
import { useViewModel } from '../../hooks/useViewModel';
import { useInjection } from '../../hooks/useInjection';
import { LoginViewModel, ILoginViewModel } from './LoginViewModel';
import { TYPES } from '../../di/types';

function LoginForm() {
  const loginViewModel = useInjection<ILoginViewModel>(TYPES.LoginViewModel);
  const { loginByGoogle } = useViewModel<LoginViewModel>(loginViewModel);

  return (
    <div>
      <Button onClick={loginByGoogle}>✋ Login by google</Button>
    </div>
  );
}

export default observer(LoginForm);
