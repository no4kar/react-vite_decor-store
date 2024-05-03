import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { PageNavigation } from '../../components/PageNavigation';
import { Loader } from '../../components/Loader';
import { useCartStore } from '../../store/cart.store';

import './productDetails.page.scss';

import { getProductById } from '../../api/product.api';
import { ButtonFavorite } from '../../components/ButtonFavorite';
import { Button2, Option as Button2Option } from '../../components/Button2';
import { Counter } from '../../components/Counter';
import { useProductStore } from '../../store/product.store';
import { Slider2 } from '../../components/Slider2';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const productId = +(id || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const timerId = useRef(0);
  const { products } = useProductStore();
  const selectProduct = useMemo(
    () => getProductById(products, productId) || null,
    [productId],
  );
  const { add: inCartAdd } = useCartStore();

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, initialDelayLoader);

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
          // border border-solid border-blue-400
        >
          <PageNavigation prodName={selectProduct.name} />
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <section
            className="
            flex flex-col gap-[20px]
            sm:gap-[24px]"
            // border border-solid border-blue-400
          >
            <h3 className="title--h3 title--h3-mobile">
              {selectProduct.name}
            </h3>

            <div className="flex flex-col gap-[20px] md:flex-row">
              <Slider2 selectItem={selectProduct}/>

              <div
                className="
                flex flex-col gap-[32px]
                sm:flex-row sm:gap-[20px]
                md:flex-col
                md:w-2/5"
                // shadow rounded
                // border border-solid border-blue-400
              >
                <div // Info
                  className="
                  flex-1 flex flex-col gap-[24px]"
                  // border border-solid border-blue-400
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

                <div // Interact
                  className="
                  flex-1"
                  // border border-solid border-blue-400
                >
                  <div // Counter
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

                  <div // Consault + Favorite buttons
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

                  <div // InCart button
                    className="h-[48px] mt-[24px] md:h-[64px]"
                  >
                    <Button2
                      path="/basket"
                      onClick={() => inCartAdd(selectProduct, quantity)}
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
