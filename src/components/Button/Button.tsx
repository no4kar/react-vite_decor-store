import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import './Button.scss';

enum Option {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export const Button = ({
  children,
  type = 'button',
  path,
  onClick = () => { },
  option = Option.PRIMARY,
  isDisable = false,
  classContainer = "group w-full h-full flex justify-center items-center gap-[10px]"
}: {
  children: React.ReactNode;
  type?: 'reset' | 'submit' | 'button';
  path?: string;
  onClick?: () => void;
  option?: `${Option}`;
  isDisable?: boolean;
  classContainer?: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();

    if (path) {
      navigate(path);
    }
  };

  return (
    <button
      type={type} // eslint-disable-line react/button-has-type
      disabled={isDisable}
      className={cn('Button', {
        [classContainer]: true,
        'Button__primary': option === Option.PRIMARY,
        'Button__secondary': option === Option.SECONDARY,
        'Button__primary--disabled': isDisable && option === Option.PRIMARY,
        'Button__secondary--disabled': isDisable && option === Option.SECONDARY,
      })}
      aria-label={path}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
