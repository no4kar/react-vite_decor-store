/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { SlideData } from '../../../../../types/SlideData';
import './Advantage.scss';
import { SliderButtons, Option } from '../../../../../components/SliderButtons';

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

        <hr
          className="
          hidden
          mt-[15px]
          border-b border-solid border-gray-400
          sm:block sm:my-[30px]"
        />

        <div className="advantage__control">
          <SliderButtons
            onNext={handleBtnNext}
            onPrev={handleBtnPrev}
            option={Option.MAIN_SCREEN}
          />
        </div>
      </div>
    </article>
  );
};
