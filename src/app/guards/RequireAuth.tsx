import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';
import React from 'react';

export const RequireAuth = ({ children }: { children: React.JSX.Element }) => {
  const { isAuthenticated, isAuthInitialized } = useAuthContext();

  // ⛔ Wait until auth is rehydrated
  if (!isAuthInitialized) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
