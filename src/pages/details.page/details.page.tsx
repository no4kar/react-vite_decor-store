import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import Slider, { Settings as SliderSettings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { PageNavigation } from '../../components/PageNavigation';
import { Loader } from '../../components/Loader';
import { ControlsButtons } from '../../components/ControlsButtons';
import { Button } from '../../components/Button';
import { ServiceProducts } from '../../types/ServiceProducts/ServiceProducts';
import { GlobalContext } from '../../store/GlobalContext';
import './details.page.scss';

import varsStyle from '../../helpers/varsFromStyle';
import { getServiceById } from '../../api/service.api';

/* eslint max-len: "warn" */
/* eslint no-console: "warn" */

export const DetailsPage = () => {
  const { id } = useParams();
  const serviceId = +(id || 0);
  const { productsService, handleChooseCart } = useContext(GlobalContext);
  const [selectService, setSelectService] = useState<ServiceProducts | null>(null);

  const generalProduct = serviceId
    ? productsService.find(el => el.id === +serviceId)
    : null;
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
          centerPadding: '50px',
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

  return (
    <div className="product-page">
      <div className="content">
        <div className="product-page__nav">
          <PageNavigation prodName={selectService?.name} />
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <section className="product-page__section">
            <h3 className="title--h3 title--h3-mobile">
              {selectService?.name}
            </h3>

            <div className="product-page__media-content">
              <img
                src={selectService?.img[imgIndex]}
                alt={`${selectService?.name}-img-${imgIndex + 1}`}
                className="product-page__selected-img"
              />

              <div className="product-page__carousel">
                <div className="product-page__slider">
                  <Slider ref={sliderRef} {...settings}>
                    {selectService?.img.map((imgUrl, i) => (
                      <div key={imgUrl}>
                        <img
                          src={imgUrl}
                          alt={`img-${i}`}
                          className="product-page__slider-item"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>

                <div className="product-page__control">
                  <ControlsButtons
                    $detailPage
                    color="black"
                    handleBtnNext={handleNext}
                    handleBtnPrev={handlePrev}
                  />
                </div>
              </div>
            </div>

            <div className="product-page__info">
              <div className="product-page__info-wrap">
                <p className="product-page__description">
                  {selectService?.description}
                </p>

                <div className="product-page__care">
                  <h4 className="product-page__subtitle">Склад</h4>
                  <p className="product-page__value">
                    {selectService?.category}
                  </p>
                </div>

                <div className="product-page__size-and-code">
                  <div className="product-page__size">
                    <h4 className="product-page__subtitle">Витрата</h4>
                    <p className="product-page__value">
                      {selectService?.price}
                    </p>
                  </div>
                </div>

                <div className="product-page__separator" />
              </div>

              <div className="product-page__button-wrap">
                <Button $primary path="/contacts">
                  Замовити консультацію
                </Button>

                <button
                  aria-label="add to favorite"
                  type="button"
                  className="product-page__button"
                  onClick={() => {
                    if (generalProduct) {
                      handleChooseCart(generalProduct, 'favourites');
                    }
                  }}
                >
                  <div
                    className={cn('icon icon--favorite-icon icon--hover', {
                      'icon--favorite-icon-blue': generalProduct?.inFavourite,
                    })}
                  />
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
