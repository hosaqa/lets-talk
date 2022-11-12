import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './styles';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DIContainerProvider } from './providers/DIContainerProvider';
import { GuardedRoute } from './components/GuardedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <GuardedRoute>
        <HomePage />
      </GuardedRoute>
    ),
    //TODO: what is this
    index: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export function App() {
  return (
    <>
      <GlobalStyle />
      <DIContainerProvider>
        <RouterProvider router={router} />
      </DIContainerProvider>
    </>
  );
}
