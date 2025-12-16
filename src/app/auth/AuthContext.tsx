import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { AuthTokens } from './auth.types';

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  isAuthInitialized: boolean;
};

type AuthContextValue = AuthState & {
  login: (tokens: AuthTokens) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const REFRESH_TOKEN_KEY = 'refresh_token';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (storedRefreshToken) {
      // simulate rehydration
      setAccessToken('rehydrated-access-token');
    }

    setIsAuthInitialized(true);
  }, []);

  const login = (tokens: AuthTokens) => {
    setAccessToken(tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(accessToken),
        accessToken,
        isAuthInitialized,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used inside AuthProvider');
  }
  return context;
};
