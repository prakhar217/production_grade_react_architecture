import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type FormInputProps = {
  label: string;
  type?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
};

export const FormInput = ({ label, type = 'text', registration, error }: FormInputProps) => {
  return (
    <div>
      <label>
        {label}
        <input type={type} {...registration} />
      </label>

      {error && <p>{error.message}</p>}
    </div>
  );
};
