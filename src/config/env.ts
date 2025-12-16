const getEnv = (key: string): string => {
  const value = import.meta.env[key] as string | undefined;
  if (!value) {
    throw new Error(`Missing env variable: ${key}`);
  }
  return value;
};

export const env = {
  apiBaseUrl: getEnv('VITE_API_BASE_URL'),
};
