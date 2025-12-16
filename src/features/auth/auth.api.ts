import { httpClient } from '../../shared/api/http';
import type { LoginRequest, LoginResponse } from './auth.types';

export const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const response = await httpClient.post<LoginResponse>('/auth/login', payload);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await httpClient.post('/auth/logout');
  },
};
