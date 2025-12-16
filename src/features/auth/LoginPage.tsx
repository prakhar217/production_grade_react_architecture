import { useLogin } from './hooks/useLogin';
import type { ApiError } from '../../shared/api/apiError';

export const LoginPage = () => {
  const { mutate: login, isPending, error } = useLogin();

  const handleLogin = () => {
    login({
      email: 'test@test.com',
      password: 'password',
    });
  };

  return (
    <div>
      <h3>Login</h3>

      <button onClick={handleLogin} disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>

      {error && <p>{(error as ApiError).message}</p>}
    </div>
  );
};
