/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import './SlideFirst.scss';
import { SlideData } from '../../types/SlideData';
import { Button } from '../Button';
import { ControlsButtons } from '../ControlsButtons';
import { pageLink } from '../../constants/pageLinks';
import { getPathLink } from '../../helpers/getPathLink';

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
          <ControlsButtons
            color="white"
            handleBtnNext={handleBtnNext}
            handleBtnPrev={handleBtnPrev}
          />
        </div>

        <h2 className="slide-first__title">{slide.title}</h2>

        <Button type="button" $primary path={`/${path}`}>
          Детальніше
        </Button>
      </div>
    </article>
  );
};
