import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { useCartStore } from '../../store/cart.store';
import { Loader } from '../../components/Loader';
import { TableProductsBasket } from './table.product.baskets';
import './basket.page.scss';

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

        <div className="basket__buttons">
          <Button $secondary path="..">
            Продовжити покупки
          </Button>

          {!isLoading && !!cartItemsOrder.length && (
            <Button $primary path="/basket/place_an_order">
              Офрормити замовлення
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
