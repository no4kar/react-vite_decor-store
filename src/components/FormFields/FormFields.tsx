import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import cn from 'classnames';
import { MyForm } from '../../types/MyForm';
import './FormFields.scss';

export interface InputFieldProps {
  className?: string;
  type?: string;
  textLabel?: string;
  name: keyof MyForm;
  register: UseFormRegister<MyForm>;
  errors: FieldErrors<MyForm>;
  validation?: RegisterOptions;
  placeholderName?: string;
  defaultChecked?: boolean;
}

export const FormFields: React.FC<InputFieldProps> = ({
  className,
  type = 'text',
  textLabel,
  name,
  register,
  errors,
  validation,
  placeholderName = '',
}) => {
  const hasError = errors[name];

  return (
    <div className={`formField ${className}`}>
      <label
        className={cn('formField__label', {
          'formField__label--error': hasError,
          'formField__label--star-after': name !== 'middleName',
        })}
        htmlFor={name}
      >
        {textLabel}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          className="formField__textarea"
          {...register(name, { ...validation })}
        />
      ) : (
        <input
          className={cn('formField__input', {
            'formField__input--error': hasError,
          })}
          id={name}
          type={type}
          placeholder={placeholderName}
          defaultValue={name === 'phoneNumber' ? '+380' : ''}
          {...register(name, { ...validation })}
        />
      )}
      {errors[name] && (
        <div className="formField__error">
          {errors[name]?.message || 'Error!'}
        </div>
      )}
    </div>
  );
};
