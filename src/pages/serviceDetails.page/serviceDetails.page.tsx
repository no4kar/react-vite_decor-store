import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider, { Settings as SliderSettings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { PageNavigation } from '../../components/PageNavigation';
import { Loader } from '../../components/Loader';
import { SliderButtons } from '../../components/SliderButtons';
import { TyService } from '../../types/Services/Services';
import './serviceDetails.page.scss';

import varsStyle from '../../helpers/varsFromStyle';
import { getServiceById } from '../../api/service.api';
import { ButtonFavorite } from '../../components/ButtonFavorite';
import { Button2 } from '../../components/Button2';

export const ServiceDetailsPage = () => {
  const { id } = useParams();
  const serviceId = +(id || 0);
  const [selectService, setSelectService] = useState<TyService | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const timerId = useRef(0);
  const sliderRef = useRef<Slider>(null);

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
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    vertical: true,
    arrows: false,
    afterChange: (currentSlide: number) => {
      setImgIndex(currentSlide);
    },
    centerPadding: '80px',
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

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, initialDelayLoader);

    setSelectService(getServiceById(serviceId) || null); // remove after API;
  }, []);

  if (!selectService) {
    return null;
  }

  return (
    <div
      className="
      pt-[24px] pb-[24px]
      sm:pb-[89px]
      md:pt-[112px] md:pb-[93px]"
    >
      <div className="content">
        <div className="product-page__nav">
          <PageNavigation prodName={selectService.name} />
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <section className="product-page__section">
            <h3 className="title--h3 title--h3-mobile">
              {selectService.name}
            </h3>

            <div className="product-page__media-content">
              <img
                src={selectService.imgUrl[imgIndex]}
                alt={selectService.imgUrl[imgIndex]}
                className="product-page__selected-img"
              />

              <div className="product-page__carousel">
                <div className="product-page__slider">
                  <Slider ref={sliderRef} {...settings}>
                    {selectService.imgUrl.map((imgUrl) => (
                      <div key={imgUrl}>
                        <img
                          src={imgUrl}
                          alt={imgUrl}
                          className="product-page__slider-item"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>

                <div
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

            <div className="product-page__info">
              <div className="product-page__info-wrap">
                <p className="product-page__description">
                  {selectService.description}
                </p>

                <div className="product-page__care">
                  <h4 className="product-page__subtitle">Склад</h4>
                  <p className="product-page__value">
                    {selectService.categoryId}
                  </p>
                </div>

                <div className="product-page__size-and-code">
                  <div className="product-page__size">
                    <h4 className="product-page__subtitle">Витрата</h4>
                    <p className="product-page__value">
                      {selectService.price}
                    </p>
                  </div>
                </div>

                <hr
                  className="
                mt-[24px]
                sm:mt-[47px]
                border-b border-solid border-gray-400"
                />
              </div>

              <div
                className="
                  h-[48px]
                  flex gap-[10px]
                  md:h-[64px]"
              >
                <Button2
                  path="/contacts"
                >
                  <span
                    className="
                      group-hover:-translate-x-[5px] transition duration-300"
                  >
                    Замовити консультацію
                  </span>

                  <span
                    className="
                      w-[26px] text-3xl
                      group-hover:-translate-x-[-5px] transition duration-300"
                  >
                    &#8594;
                  </span>
                </Button2>

                <ButtonFavorite selectProduct={selectService} />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
