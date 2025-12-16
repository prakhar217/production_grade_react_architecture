import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { PublicLayout } from './layouts/public/PublicLayout';
import { ProtectedLayout } from './layouts/protected/ProtectedLayout';

import { HomePage } from '../features/home/HomePage';
import { LoginPage } from '../features/auth/LoginPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: 'auth',
        element: <PublicLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },

      {
        path: 'app',
        element: <ProtectedLayout />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
]);
