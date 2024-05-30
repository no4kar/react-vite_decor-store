import * as R from 'react';
import {
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
  Path,
} from 'react-hook-form';
import cn from 'classnames';
import './FormFields.scss';

export const FormFields2 = <T extends Record<string, any>>({
  type,
  name,
  // value,
  textLabel,
  placeholder = '',
  register,
  errors,
  required,
  validation,
  classContainer = '',
}: {
  type: R.HTMLInputTypeAttribute;
  name: Path<T>;
  // value?: string;
  textLabel?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  required?: boolean;
  validation?: RegisterOptions<T>;
  placeholder?: string;
  defaultChecked?: boolean;
  classContainer?: string;
}) => {
  const hasError = errors[name];

  return (
    <div className={cn('formField', classContainer)}>
      {textLabel && (
        <label
          htmlFor={name}
          className={cn('title title--body-text', {
            'formField__label--error': hasError,
            'formField__label--star-after': required,
          })}
        >
          {textLabel}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={name}
          placeholder={placeholder}
          className="formField__textarea"
          {...register(name, { ...validation })}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={cn(
            'h-45 py-[12px] border-b border-black outline-none text-black',
            {
              'text-red-500': hasError,
            },

          )}
          {...register(name, { ...validation })}
        />
      )}

      {hasError && (
        <div className="formField__error">
          {(hasError?.message as string) || 'Error!'}
        </div>
      )}
    </div>
  );
};
