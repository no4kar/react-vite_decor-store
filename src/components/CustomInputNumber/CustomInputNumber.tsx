import React from 'react';
import './CustomInputNumber.scss';

type Props = {
  changeQuantity: (action: string) => void;
  quantity: number;
};

export const CustomInputNumber: React.FC<Props> = ({
  changeQuantity,
  quantity,
}) => {
  const handleIncrease = () => {
    if (quantity && quantity <= 10) {
      changeQuantity('addQuantity');
    }
  };

  const handleDecrease = () => {
    if (quantity && quantity > 1) {
      changeQuantity('deleteQuantity');
    }
  };

  return (
    <div className="quantity">
      <input type="number" step="1" value={quantity} />
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
