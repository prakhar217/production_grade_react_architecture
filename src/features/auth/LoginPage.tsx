import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type LoginFormValues } from './login.schema';
import { useLogin } from './hooks/useLogin';
import { FormInput } from '../../shared/components/form/FormInput';
import type { ApiError } from '../../shared/api/apiError';

export const LoginPage = () => {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
    >
      <h3>Login</h3>

      <FormInput label="Email" registration={register('email')} error={errors.email} />

      <FormInput
        label="Password"
        type="password"
        registration={register('password')}
        error={errors.password}
      />

      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>

      {error && <p>{(error as ApiError).message}</p>}
    </form>
  );
};
