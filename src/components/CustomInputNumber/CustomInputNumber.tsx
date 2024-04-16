import React from 'react';
import './CustomInputNumber.scss';
import { useCartStore } from '../../store/cart.store';
import { TyProduct } from '../../types/Products/Products';

type Props = {
  product: TyProduct;
};

export const CustomInputNumber: React.FC<Props> = ({
  product
}) => {
  const { items: productsInCart } = useCartStore(state => state);
  const foundProduct = productsInCart.find(p => p.id === product.id);

  const handleIncrease = () => {
    useCartStore.getState().increase(product);
  };

  const handleDecrease = () => {
    useCartStore.getState().decrease(product);
  };

  return (
    <div className="quantity">
      <input type="number" step="1" value={foundProduct?.quantity} />
      <div className="quantity-nav">
        <button
          className="quantity-button quantity-up"
          type="button"
          aria-label="increase amount"
          onClick={handleIncrease}
        >
          &#x25B2;
        </button>

        <button
          className="quantity-button quantity-down"
          type="button"
          aria-label="reduce amount"
          onClick={handleDecrease}
        >
          &#x25BC;
        </button>
      </div>
    </div>
  );
};
