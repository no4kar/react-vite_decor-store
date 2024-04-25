import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider, { Settings as SliderSettings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { PageNavigation } from '../../components/PageNavigation';
import { Loader } from '../../components/Loader';
import { SliderButtons } from '../../components/SliderButtons';
import { TyProduct } from '../../types/Products/Products';
import './productDetails.page.scss';

import varsStyle from '../../helpers/varsFromStyle';
import { getProductById } from '../../api/product.api';
import { ButtonFavorite } from '../../components/ButtonFavorite';
import { Button2, Option as Button2Option } from '../../components/Button2';
import { Counter } from '../../components/Counter';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const productId = +(id || 0);
  const [selectProduct, setSelectProduct] = useState<TyProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(0);
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
              sm:flex-row sm:justify-center sm:h-[625px]
              md:min-w-fit
              "
              >
                <img // Screen
                  src={selectProduct.imgUrl[imgIndex]}
                  alt={selectProduct.imgUrl[imgIndex]}
                  className="
                w-full
                object-cover aspect-square
                sm:h-full sm:aspect-auto sm:flex-1"
                />

                <div // Slider + SliderButtons
                  className="
                w-full
              flex flex-col gap-[24px]
              overflow-hidden
              sm:w-fit sm:flex-row sm:gap-[5px]"
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
                          w-[70px] h-[70px]
                          mx-auto my-[20px]

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
                flex-1 flex flex-col gap-[24px]"
                >
                  <p className="text-black">
                    {selectProduct.description}
                  </p>

                  <div className="flex flex-col gap-[8px]">
                    <h4 className="title--h4 text-gray-600">
                      Догляд
                    </h4>

                    <p className="text-black">
                      Сухе чищення{/* {selectProduct.categoryId} */}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex flex-col gap-[8px]">
                      <h4 className="title--h4 text-gray-600">
                        Тон
                      </h4>

                      <p className="text-black">
                        {selectProduct.tone}
                      </p>
                    </div>

                    <div className="flex flex-col gap-[8px]">
                      <h4 className="title--h4 text-gray-600">
                        Код товару
                      </h4>

                      <p className="text-black">
                        {selectProduct.id}
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

                <div className="flex-1">
                  <div
                    className="
                  h-[48px]
                  flex justify-between
                  md:h-[64px]"
                  >
                    <Counter
                      quantity={quantity}
                      onIncrease={() => setQuantity(prev => prev + 1)}
                      onDecrease={() => setQuantity(prev => prev - 1)}
                      classContainer="
                      w-[96px] h-full
                      flex
                      border border-solid border-gray-400"
                    />

                    <div className="flex">
                      <p>Ціна</p>

                      <p className="pl-3 pr-1 text-accent">
                        {selectProduct.price}
                      </p>

                      <p>грн.</p>
                    </div>
                  </div>

                  <div
                    className="
                  h-[48px] mt-[44px]
                  flex gap-[10px]
                  md:h-[64px]"
                  >
                    <Button2
                      path="/contacts"
                      option={Button2Option.SECONDARY}
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

                    <ButtonFavorite selectProduct={selectProduct} />
                  </div>

                  <div
                    className="h-[48px] mt-[24px] md:h-[64px]"
                  >
                    <Button2
                      path="/basket"
                    >
                      <span
                        className="
                      group-hover:-translate-x-[5px] transition duration-300"
                      >
                        Додати в кошик
                      </span>

                      <span
                        className="
                      w-[26px] text-3xl
                      group-hover:-translate-x-[-5px] transition duration-300"
                      >
                        &#8594;
                      </span>
                    </Button2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
