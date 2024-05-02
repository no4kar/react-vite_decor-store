import * as R from 'react';
import Slider, { Settings as SliderSettings } from 'react-slick';
import varsStyle from '../../helpers/varsFromStyle';
import { SliderButtons } from '../SliderButtons';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Slider2.scss';

type TyItem = {
  imgUrl: string[];
  [key: string]: number | string | string[];
};

export const Slider2 = ({
  selectItem,
}: {
  selectItem: TyItem,
}) => {
  const [imgIndex, setImgIndex] = R.useState(0);
  const sliderRef = R.useRef<Slider>(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings: SliderSettings = {
    dots: false,
    infinite: true,
    speed: Number(varsStyle.effectDurationNormal) * 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    vertical: true,
    arrows: false,
    afterChange: (currentSlide: number) => {
      setImgIndex(currentSlide);
    },
    centerPadding: '0',
    // centerPadding: '100px',
    responsive: [
      {
        breakpoint: Number(varsStyle.tabletMinWidth),
        settings: {
          slidesToShow: 3,
          vertical: false,
          centerPadding: '0',
        },
      },
    ],
  };

  return (
    <div // Screen + Slider + SliderButtons
      className="
                border border-solid border-red-400
              flex flex-col gap-[20px]
              sm:flex-row
              sm:h-[625px]
              md:flex-1"
    >
      <div // Screen
        style={{
          backgroundImage: `url(${selectItem.imgUrl[imgIndex]})`
        }}
        className="
                  border border-solid border-red-400
                  h-full aspect-square bg-center bg-cover
                  sm:aspect-auto sm:flex-1
                  "
      />

      <div // Slider + SliderButtons
        className="
                  border border-solid border-blue-400
                w-full
                flex flex-col gap-[24px]
                sm:w-fit sm:flex-row sm:gap-[5px]"
      >
        <div // Slider
          className="
                    border border-solid border-blue-400
                  overflow-hidden
                  w-full
                  sm:w-[100px] sm:my-auto"
        >
          <Slider ref={sliderRef} {...settings}>
            {selectItem.imgUrl.map((imgUrl) => (
              <div key={imgUrl}>
                <img
                  src={imgUrl}
                  alt={imgUrl}
                  className="
                          w-[70px] h-[70px]
                          mx-auto my-[20px]
                          object-cover
                          Slider2__item"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div // SliderButtons
          className="
                  flex justify-center"
        >
          <SliderButtons
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
      </div>
    </div>
  );
};
