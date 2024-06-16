import React, { useEffect, useRef, useState } from 'react';
import { useCartStore } from '../../store/cart.store';
import { Loader } from '../../components/Loader';
import { TableProductsBasket } from './table.product.baskets';
import './basket.page.scss';
import { Button2, Option as Button2Option } from '../../components/Button2';

export const BasketPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { items: cartItemsOrder } = useCartStore(state => state);
  const timerId = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="basket">
      <div className="content">
        <div className="basket__nav">
          <div className="icon icon--hover icon--basket basket__icon" />
          <h3 className="title title--h3 basket__title">КОШИК</h3>
        </div>

        {isLoading && <Loader />}

        {!isLoading && !!cartItemsOrder.length && (
          <section className="basket__table-products">
            <TableProductsBasket
              cartItemsOrder={cartItemsOrder}
            />
          </section>
        )}

        {!isLoading && !cartItemsOrder.length && (
          <section>
            <div className="basket__table">
              <p className="basket__table-text">Ваш кошик порожній</p>
            </div>
          </section>
        )}

        <div className="mt-16 flex flex-col gap-5
        sm:flex-row sm:justify-between sm:mt-24">
          <div className="w-full h-16 sm:w-[310px] md:w-[420px]">
            <Button2
              path='/'
              option={Button2Option.SECONDARY}
            >
              <span
                className="
          group-hover:-translate-x-[5px] transition duration-300"
              >
                Продовжити покупки
              </span>

              <span
                className="
          w-6 text-3xl
          group-hover:-translate-x-[-5px] transition duration-300"
              >
                &#8594;
              </span>
            </Button2>
          </div>

          {!isLoading && !!cartItemsOrder.length && (
            <div className="w-full h-16 sm:w-[310px] md:w-[420px]">
              <Button2
                path='/basket/place_an_order'
                option={Button2Option.PRIMARY}
              >
                <span
                  className="
          group-hover:-translate-x-[5px] transition duration-300"
                >
                  Оформити замовлення
                </span>

                <span
                  className="
          w-6 text-3xl
          group-hover:-translate-x-[-5px] transition duration-300"
                >
                  &#8594;
                </span>
              </Button2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
