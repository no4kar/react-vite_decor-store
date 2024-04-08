import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.scss';

interface Props {
  type?: 'reset' | 'submit' | 'button';
  children: React.ReactNode;
  $primary?: boolean;
  $secondary?: boolean;
  isValid?: boolean;
  path?: string;
}

export const Button: React.FC<Props> = ({
  children,
  type,
  $primary,
  $secondary,
  isValid = true,
  path,
}) => {
  const navigate = useNavigate();
  const buttonClasses = `Button${$primary ? ' Button--primary' : ''}${
    $secondary ? ' Button--secondary' : ''
  }`;
  const primDisable = !isValid && $primary ? 'Button--primary-disabled' : '';
  const secDisable = !isValid && $secondary ? 'Button--secondary-disabled' : '';

  const onClick = () => {
    if (path) {
      navigate(`${path}`);
    }
  };

  return (
    <button
      type={type} // eslint-disable-line react/button-has-type
      disabled={!isValid}
      className={`${buttonClasses} ${primDisable} ${secDisable}`}
      aria-label="contact us"
      onClick={onClick}
    >
      <span className="Button__text">{children}</span>
      <span className="Button__arrow">&#8594;</span>
    </button>
  );
};
