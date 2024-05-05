import React from 'react';
import { CustomInputNumber } from '../../../components/CustomInputNumber';
import './table.products.order.scss';
import { TyInCart } from '../../../store/cart.store';

type Props = {
  cartItemsOrder: TyInCart[];
};

export const TableProductsOrder: React.FC<Props> = ({
  cartItemsOrder,
}) => {
  const totalPrice = cartItemsOrder.reduce(
    (acc, el) => acc + el.price * el.quantity,
    0,
  );

  return (
    <div className="TableProductsOrder">
      <table className="table">
        <thead className="table__thead table__thead--hiden">
          <tr className="table__tr table__tr--flex">
            <th>Товари в кошику</th>
            <th>Кількість</th>
          </tr>
        </thead>

        <tbody>
          {cartItemsOrder.map(product => (
            <tr className="table__tr table__tr--flex" key={product.id}>
              <th aria-label="product img and main info">
                <div className="mainInfo">
                  <img
                    src={product.imgUrl.at(0) || '/img/products/01.png'}
                    alt={product.name}
                    className="mainInfo__img"
                  />

                  <div className="mainInfo__info">
                    <p className="mainInfo__categories">{product.name}</p>
                    <p className="mainInfo__name">{product.name}</p>
                    <p className="mainInfo__id">
                      Код товару
                      <span className="mainInfo__id-code">{`   ${product.id}`}</span>
                    </p>
                  </div>
                </div>
              </th>

              <th aria-label="you can control quantity">
                <CustomInputNumber
                  item={product}
                />
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totalAmount">
        Сума:
        <span className="totalAmount__price">{totalPrice}</span>
        <span className="totalAmount__currency">грн.</span>
      </div>
    </div>
  );
};
