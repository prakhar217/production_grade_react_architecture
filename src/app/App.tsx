import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';

import { router } from './router';
import { AuthProvider } from './auth/AuthContext';
import { queryClient } from './query/queryClient';
import { ErrorBoundary } from './boundaries/ErrorBoundary';
import { LoadingFallback } from './boundaries/LoadingFallback';

export const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<LoadingFallback />}>
            <RouterProvider router={router} />
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};
