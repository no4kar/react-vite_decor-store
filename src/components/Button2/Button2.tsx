import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import './Button2.scss';

export enum Option {
  PRIMARY,
  SECONDARY,
}

export const Button2 = ({
  children,
  type = 'button',
  path,
  onClick = () => { },
  option = Option.PRIMARY,
  isDisable = false,
  classContainer = "group w-full h-full px-[8px] flex justify-center items-center gap-[10px]"
}: {
  children: React.ReactNode;
  type?: 'reset' | 'submit' | 'button';
  path?: string;
  onClick?: () => void;
  option?: Option;
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
      className={cn('Button2', {
        [classContainer]: true,
        'Button2__primary': option === Option.PRIMARY,
        'Button2__secondary': option === Option.SECONDARY,
        'Button2__primary--disabled': isDisable && option === Option.PRIMARY,
        'Button2__secondary--disabled': isDisable && option === Option.SECONDARY,
      })}
      aria-label="contact us"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
