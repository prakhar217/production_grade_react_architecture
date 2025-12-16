import { useMutation } from '@tanstack/react-query';
import { authApi } from '../auth.api';
import type { LoginRequest } from '../auth.types';
import { useAuthContext } from '../../../app/auth/AuthContext';

export const useLogin = () => {
  const { login } = useAuthContext();

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),

    onSuccess: (data) => {
      // Single source of truth
      console.log('data-->>', data);
      login({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    },
  });
};
