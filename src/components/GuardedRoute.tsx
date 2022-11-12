import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useInjection } from '../hooks/useInjection';
import { TYPES } from '../di/types';
import { IAuthService } from '../services/AuthService';

export const GuardedRoute = observer(
  ({ children }: { children: React.ReactNode | React.ReactElement }): JSX.Element => {
    const authService = useInjection<IAuthService>(TYPES.AuthService);
    const navigate = useNavigate();

    useEffect(() => {
      if (authService.authStateRestored && !authService.isLoggedIn) {
        navigate('/login');
      }
    }, [authService.authStateRestored]);

    if (!authService.authStateRestored) {
      return <>restoring...</>;
    }

    if (!authService.isLoggedIn) {
      return <></>;
    }

    return <>{children}</>;
  }
);
