import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import cn from 'classnames';
import { MyForm } from '../../types/MyForm';
import './FormFields.scss';

export const FormFields = ({
  type = 'text',
  name,
  textLabel,
  placeholder = '',
  register,
  errors,
  required,
  validation,
  classContainer = '',
}: {
  type?: string;
  name: keyof MyForm;
  textLabel?: string;
  register: UseFormRegister<MyForm>;
  errors: FieldErrors<MyForm>;
  required?: boolean;
  validation?: RegisterOptions;
  placeholder?: string;
  defaultChecked?: boolean;
  classContainer?: string;
}) => {
  const hasError = errors[name];

  return (
    <div className={cn('formField', `${classContainer}`)}>
      <label
        className={cn('title title--body-text', {
          'formField__label--error': hasError,
          'formField__label--star-after': required,
        })}
        htmlFor={name}
      >
        {textLabel}
      </label>

      {type === 'textarea' ? (
        <textarea
          className="formField__textarea"
          {...register(name, { ...validation })}
        />
      ) : (
        <input
          className={cn('h-45 py-[12px]',
            'border-b border-black',
            'outline-none text-black',
            {
              'text-system-error': hasError,
            })}
          type={type}
          placeholder={placeholder}
          {...register(name, { ...validation })}
        />
      )}

      {hasError && (
        <div className="formField__error">
          {errors[name]?.message || 'Error!'}
        </div>
      )}
    </div>
  );
};
