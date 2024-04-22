import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import Slider, { Settings as SliderSettings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { PageNavigation } from '../../components/PageNavigation';
import { Loader } from '../../components/Loader';
import { SliderButtons } from '../../components/SliderButtons';
import { Button } from '../../components/Button';
import { TyProduct } from '../../types/Products/Products';
import './productDetails.page.scss';

import varsStyle from '../../helpers/varsFromStyle';
import { useFavoriteStore } from '../../store/favourite.store';
import { getProductById } from '../../api/product.api';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const productId = +(id || 0);
  const [selectProduct, setSelectProduct] = useState<TyProduct | null>(null);

  const { items: favorites } = useFavoriteStore(state => state);
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
    centerPadding: '100px',
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

    setSelectProduct(getProductById(productId) || null); // remove after API;
  }, []);

  if (!selectProduct) {
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
        <div
          className="
        pb-[24px]
        sm:pb-[40px]
        md:pb-[64px]"
        >
          <PageNavigation prodName={selectProduct.name} />
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <section
            className="
            flex flex-col gap-[20px]
            sm:gap-[24px]"
          >
            <h3 className="title--h3 title--h3-mobile">
              {selectProduct.name}
            </h3>

            <div className="flex flex-col gap-[20px] md:flex-row">
              <div // Screen + Slider + SliderButtons
                className="
              flex flex-col gap-[20px]
              sm:flex-row sm:justify-center
              md:min-w-fit"
              >
                <img // Screen
                  src={selectProduct.imgUrl[imgIndex]}
                  alt={selectProduct.imgUrl[imgIndex]}
                  className="
                w-full
                aspect-square
                sm:w-auto sm:h-full"
                />

                <div // Slider + SliderButtons
                  className="
                w-full
              flex flex-col gap-[24px]
              overflow-hidden
              sm:w-fit
              sm:flex-row"
                >
                  <div // Slider
                    className="
                w-full
                sm:w-[100px] sm:my-auto"
                  >
                    <Slider ref={sliderRef} {...settings}>
                      {selectProduct.imgUrl.map((imgUrl) => (
                        <div key={imgUrl}>
                          <img
                            src={imgUrl}
                            alt={imgUrl}
                            className="
                          w-[58px] h-[58px]
                          mx-auto my-[20px]
                          sm:my-[15px]
                          object-cover
                          slick-slider__item"
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

              <div
                className="
              flex flex-col gap-[32px]
              md:flex-col md:grow
              sm:flex-row sm:gap-[20px]"
              >
                <div
                  className="
                flex flex-col gap-[24px]"
                >
                  <p
                    className="
                  text-black"
                  >
                    {selectProduct.description}
                  </p>

                  <div>
                    <h4 className="text-gray-600">Склад</h4>
                    <p
                      className="
                    text-black"
                    >
                      {selectProduct.categoryId}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-gray-600">Витрата</h4>
                    <p className="text-black">
                      {selectProduct.price}
                    </p>
                  </div>

                  <hr
                    className="
                h-[1px]
                mt-[24px]
                sm:mt-[47px]
                border border-solid border-black"
                  />
                </div>

                <div
                  className="
              flex flex-1 gap-[10px] md:items-end"
                >
                  <Button $primary path="/contacts">
                    Замовити консультацію
                  </Button>

                  <button
                    aria-label="add to favorite"
                    type="button"
                    className="
                  w-[50px] h-[48px]
                  sm:w-[90px] sm:h-[64px]
                  flex justify-center items-center
                  border border-solid border-black
                  "
                    onClick={() => {
                      useFavoriteStore.getState().trigger(selectProduct);
                    }}
                  >
                    <div
                      className={cn('icon icon--favorite-icon icon--hover', {
                        'icon--favorite-icon-blue':
                          favorites.find(f => f.id === selectProduct?.id),
                      })}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
