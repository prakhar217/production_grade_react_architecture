import type { LoginFormValues } from './login.schema';

export type LoginRequest = LoginFormValues;

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};
