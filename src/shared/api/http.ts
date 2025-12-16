import axios from 'axios';

import type { AxiosError } from 'axios';
import type { ApiError } from './apiError';
import { setAccessToken } from './token';

interface ApiErrorResponse {
  message?: string;
  code?: string;
}

const normalizeError = (error: unknown): ApiError => {
  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    const message =
      axiosError.response?.data?.message ?? axiosError.message ?? 'Something went wrong';
    const statusCode = axiosError.response?.status;
    const code = axiosError.response?.data?.code;

    return {
      message,
      statusCode,
      code,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'Unknown error occurred' };
};

export const httpClient = axios.create({
  baseURL: import.meta.env['VITE_API_BASE_URL'],
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const normalized = normalizeError(error);

    if (normalized.statusCode === 401) {
      setAccessToken(null);
      localStorage.removeItem('refresh_token');
      window.location.href = '/auth/login';
    }

    // Wrap normalized error in an Error object for Promise.reject
    const rejectionError = new Error(normalized.message);
    Object.assign(rejectionError, normalized);

    return Promise.reject(rejectionError);
  },
);
