/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { SlideData } from '../../../../../types/SlideData';
import './Advantage.scss';
import { ControlsButtons } from '../../../../../components/ControlsButtons';

type Props = {
  slide: SlideData;
  handleBtnNext: () => void;
  handleBtnPrev: () => void;
};

export const AdvantageItem: React.FC<Props> = ({
  slide,
  handleBtnNext,
  handleBtnPrev,
}) => {
  return (
    <article className="advantage">
      <img className="advantage__img" src={slide.img} alt={slide.title} />

      <div className="advantage__info">
        <h3 className="advantage__title">{slide.title}</h3>

        <p className="advantage__text">{slide.text}</p>

        <div className="advantage__separator" />

        <div className="advantage__control">
          <button
            onClick={handleBtnPrev}
            className="advantage__btn"
            type="button"
            aria-label="back"
          >
            <div
              className="
                icon
                icon__arrow-button
                icon__arrow-button--black"
            />
          </button>

          <button
            onClick={handleBtnNext}
            className="advantage__btn"
            type="button"
            aria-label="forward"
          >
            <div
              className="
                icon
                icon__arrow-button
                icon__arrow-button--black
                icon__arrow-button--rigth"
            />
          </button>
          <ControlsButtons
            color="black"
            handleBtnNext={handleBtnNext}
            handleBtnPrev={handleBtnPrev}
          />
        </div>
      </div>
    </article>
  );
};
