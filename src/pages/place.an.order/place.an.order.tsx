import { useEffect, useRef, useState } from 'react';
import { FormPage } from '../../components/FormPage';
import { PageNavigation } from '../../components/PageNavigation';
import { Loader } from '../../components/Loader';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { TableProductsOrder } from './table.products.order';
import './place.an.order.scss';
import { useCartStore } from '../../store/cart.store';

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
    <div className="placeAnOrder">
      <div className="content">
        <div className="cooperation__nav">
          <PageNavigation />
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <FormPage formVersion="order">
            <TableProductsOrder
              cartItemsOrder={cartItemsOrder}
            />
          </FormPage>
        )}
      </div>
    </div>
  );
};
