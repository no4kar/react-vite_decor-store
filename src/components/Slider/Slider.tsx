import React, { useState } from 'react';
import { SlideData } from '../../types/SlideData';

import './Slider.scss';

type SlideProps = {
  slide: SlideData;
  handleBtnNext: () => void;
  handleBtnPrev: () => void;
};

type Props = {
  Slide: React.FC<SlideProps>;
  slides: SlideData[];
  classParent: string;
};

export const Slider: React.FC<Props> = ({ Slide, slides, classParent }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const nextSlide = () => {
    setImageIndex(currentIndex =>
      currentIndex === slides.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const prevSlide = () => {
    setImageIndex(currentIndex =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1,
    );
  };

  return (
    <ul className={`${classParent}__slider slider`}>
      {slides.map(slideCurrent => (
        <li
          className="slider__item"
          key={slideCurrent.id}
          style={{
            translate: `${-100 * imageIndex}%`,
          }}
        >
          <Slide
            slide={slideCurrent}
            handleBtnNext={nextSlide}
            handleBtnPrev={prevSlide}
          />
        </li>
      ))}
    </ul>
  );
};
