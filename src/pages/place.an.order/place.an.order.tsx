import { useEffect, useRef, useState } from 'react';
import { PageNavigation } from '../../components/PageNavigation';
import { Loader } from '../../components/Loader';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { TableProductsOrder } from './table.products.order';
import './place.an.order.scss';
import { useCartStore } from '../../store/cart.store';
import { FormComponent } from '../../components/FormComponent/FormComponent';

export const PlaceAnOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { items: cartItemsOrder } = useCartStore(state => state);
  const timerId = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, initialDelayLoader);
  }, []);

  return (
    <div className="content
      flex flex-col gap-6 sm:gap-10 md:gap-16
      py-6 sm:py-20 md:py-24">
      <div className="cooperation__nav">
        <PageNavigation />
      </div>

      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div
            className="
            flex flex-col gap-8"
          // border border-solid border-red
          >
            <h2 className="title--h2 text-center">Оформлення замовлення</h2>
            <p className="title--body text-center">Заповніть ваші контактні дані</p>
          </div>

          <FormComponent formVersion="order">
            <TableProductsOrder cartItemsOrder={cartItemsOrder} />
          </FormComponent>
        </>
      )}
    </div>
  );
};
