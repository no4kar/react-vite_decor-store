import * as R from 'react';
import Slider, { Settings as SliderSettings } from 'react-slick';
import varsStyle from '../../helpers/varsFromStyle';
import { SliderButtons } from '../SliderButtons';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Slider2.scss';

type TyItem = {
  imageUrl: string[];
  [key: string]: number | string | string[];
};

export const Slider2 = ({
  selectItem,
}: {
  selectItem: TyItem,
}) => {
  const [imgIndex, setImgIndex] = R.useState(0);
  const sliderRef = R.useRef<Slider>(null);
  const imageUrlLength = selectItem.imageUrl.length;

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
    slidesToShow: imageUrlLength > 5 ? 5 : imageUrlLength,
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
          slidesToShow: imageUrlLength > 5 ? 3 : imageUrlLength,
          // slidesToShow: 1,
          vertical: false,
          centerPadding: '0',
        },
      },
    ],
  };

  return (
    <div // Screen + Slider + SliderButtons
      className="
      flex flex-col gap-[20px]
      sm:flex-row
      sm:h-[625px]
      md:flex-1"
    >
      <div // Screen
        style={{
          backgroundImage: `url(${selectItem.imageUrl[imgIndex]})`
        }}
        className="
        w-full
        flex-1
        aspect-square bg-center bg-cover
        shadow rounded
        sm:aspect-auto sm:flex-1"
      // border border-solid border-red-400
      />

      <div // Slider + SliderButtons
        className="
        w-full
        flex flex-col gap-[24px]
        sm:w-fit sm:flex-row sm:gap-[5px]"
      >
        <div // Slider
          className="
          overflow-hidden
          w-full
          sm:w-[100px] sm:my-auto"
        >
          <Slider ref={sliderRef} {...settings}>
            {selectItem.imageUrl.map((imageUrl) => (
              <div key={imageUrl}>
                <img
                  src={imageUrl}
                  alt={imageUrl}
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
