import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './styles';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { TagsPage } from './pages/TagsPage';

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
  {
    path: '/tags',
    element: (
      <GuardedRoute>
        <TagsPage />
      </GuardedRoute>
    ),
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
