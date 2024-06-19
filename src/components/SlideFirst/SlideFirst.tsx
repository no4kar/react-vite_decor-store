/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import './SlideFirst.scss';
import { SlideData } from '../../types/SlideData';
import { Option, SliderButtons } from '../SliderButtons';
import { pageLink } from '../../constants/pageLinks';
import { getPathLink } from '../../helpers/getPathLink';
import { Button } from '../Button';

type Props = {
  slide: SlideData;
  handleBtnNext: () => void;
  handleBtnPrev: () => void;
};

export const SlideFirst: React.FC<Props> = ({
  slide,
  handleBtnNext,
  handleBtnPrev,
}) => {
  const path = getPathLink(pageLink, slide.title);

  return (
    <article className="slide-first">
      <img className="slide-first__img" src={slide.img} alt={slide.title} />

      <div className="slide-first__info">
        <h4 className="slide-first__label">{slide.label}</h4>

        <div className="slide-first__control">
          <SliderButtons
            onNext={handleBtnNext}
            onPrev={handleBtnPrev}
            option={Option.MAIN_SCREEN}
          />
        </div>

        <h2 className="slide-first__title">{slide.title}</h2>

        <div
          className="h-16 w-full"
        >
          <Button
            path={`/${path}`}
          >
            <span
              className="
          group-hover:-translate-x-[5px] transition duration-300"
            >
              Детальніше
            </span>

            <span
              className="
          w-[26px] text-3xl
          group-hover:-translate-x-[-5px] transition duration-300"
            >
              &#8594;
            </span>
          </Button>
        </div>
      </div>
    </article>
  );
};
