import * as R from 'react';
import {
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
  Path,
} from 'react-hook-form';
import cn from 'classnames';
import './FormField.scss';

export const FormField = <T extends Record<string, any>>({
  type,
  textLabel,
  name,
  register,
  validation,
  errors,
  placeholder = '',
  required,
  classContainer = '',
}: {
  type: R.HTMLInputTypeAttribute;
  textLabel?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  required?: boolean;
  classContainer?: string;
}) => {
  const hasError = errors[name];

  return (
    <div className={cn('flex flex-col gap-2', classContainer)}>
      {textLabel && (
        <label
          htmlFor={name}
          className={cn('title title--body', {
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
          className="
          h-48 text-black
          border-b border-black outline-none resize-none
          title"
          {...register(name, { ...validation })}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={cn(
            'h-45 py-3 border-b border-black outline-none text-black',
            {
              'text-red': hasError,
            },

          )}
          {...register(name, { ...validation })}
        />
      )}

      {hasError && (
        <div className="title--micro text-red">
          {(hasError?.message as string) || 'Error!'}
        </div>
      )}
    </div>
  );
};
