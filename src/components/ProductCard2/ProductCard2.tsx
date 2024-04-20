import React from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

import { TyProduct } from '../../types/Products/Products';
import { Button } from '../Button';
import { useFavoriteStore } from '../../store/favourite.store';

const ProductCard2 = ({
  product
}: {
  product: TyProduct;
}) => {
  const { items: favorites } = useFavoriteStore();
  const { pathname } = useLocation();

  return (
    <div
      className={cn(
        'pt-[10px] pb-[14px] px-[10px]',
        'shadow',
        'rounded',
      )}
    >
      <div
        className={cn(
          'relative',
          'w-full',
          'aspect-square',
        )}
      >
        <img
          src={product.imgUrl.at(0)}
          alt={product.imgUrl.at(0)}
          className={cn('absolute',
            'inset-0',
            'w-full',
            'h-full',
            'object-cover',
          )}
        />

        <button
          aria-label="add to favorite"
          type="button"
          className="card__button"
          onClick={() => useFavoriteStore.getState().trigger(product)}
        >
          <div
            className={cn(
              'icon',
              'icon--favorite-icon',
              'icon--hover',
              'card__icon', {
              'icon--favorite-icon-blue'
                : favorites.find(f => f.id === product.id),
            })}
          />
        </button>
      </div>

      <div className="pt-[24px]">
        <div>
          <p className="title--micro title--secondary-color text-left">
            {product.description}
          </p>

          <div className="pt-[7px]">
            <span className="title--h4-main">
              {product.producer}
            </span>
            <span>/</span>
            <span className="title--body-text">
              {product.collection}
            </span>
            <span>/</span>
            <span className="title--body-text title--secondary-color">
              {product.country}
            </span>
          </div>
        </div>

        <div className="pt-[20px] flex justify-between">
          <div className="flex gap-[9px]">
            <p>Код товару</p>
            <p>{product.id}</p>
          </div>
          <div className="flex">
            <p>Ціна</p>
            <p className="pl-3 pr-1 text-accent">{product.price}</p>
            <p>грн.</p>
          </div>
        </div>
      </div>

      <div
        className="pt-[40px]"
      >
        <Button $primary path={`${pathname}/${product.id}`}>
          Детальніше
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ProductCard2);
