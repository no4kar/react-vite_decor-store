import { UseFormRegister, RegisterOptions } from 'react-hook-form';
import React from 'react';
import { DeliveryOption, MyForm } from '../../types/MyForm';
import './RadioButtonGroup.scss';

type Props = {
  options: DeliveryOption[];
  name: keyof MyForm;
  register: UseFormRegister<MyForm>;
  validation: RegisterOptions;
  title: string;
};

export const RadioButtonGroup: React.FC<Props> = ({
  title,
  options,
  name,
  register,
  validation,
}) => {
  return (
    <div className="radio-group">
      <h3 className="title title--h3 title--h3-mobile">{title}</h3>

      <div className="radio-group__options">
        {options.map(option => (
          <label key={option.id} className="radio-group__label">
            <input
              type="radio"
              className="radio-group__input"
              value={option.value}
              {...register(name, { ...validation })}
              onBlur={
                register(name, { ...validation, onBlur: () => {} }).onBlur
              }
            />
            <span>{option.value}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
