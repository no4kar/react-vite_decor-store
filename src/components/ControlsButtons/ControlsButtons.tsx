/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';
import './ControlsButtons.scss';

type Props = {
  color: 'white' | 'black';
  handleBtnNext: () => void;
  handleBtnPrev: () => void;
  $detailPage?: boolean;
};

export const ControlsButtons: React.FC<Props> = ({
  color,
  handleBtnNext,
  handleBtnPrev,
  $detailPage,
}) => {
  return (
    <div
      className={cn('control', {
        'control--flex-column': $detailPage,
      })}
    >
      <button onClick={handleBtnPrev} className="control__btn" type="button">
        <div
          className={cn(
            `icon icon__arrow-button icon__arrow-button--${color}`,
            {
              'control--icon-rotate': $detailPage,
            },
          )}
        />
      </button>

      <button onClick={handleBtnNext} className="control__btn" type="button">
        <div
          className={cn(
            `icon icon__arrow-button icon__arrow-button--${color} icon__arrow-button--rigth`,
            {
              'icon__arrow-button--down': $detailPage,
            },
          )}
        />
      </button>
    </div>
  );
};
