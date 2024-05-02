import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { TyService as Product } from '../../types/Services/Services';
import { useFavoriteStore } from '../../store/favourite.store';
import { Button2 } from '../Button2';

import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = memo(({ product }) => {
  const { pathname } = useLocation();
  const { id, imgUrl, name, description } = product;
  const { items: favorites } = useFavoriteStore(state => state);

  return (
    <div className="card" key={id}>
      <div className="card__img-container">
        <div className="card__products">
          <img
            src={imgUrl[0]}
            alt={imgUrl[0]}
            className="card__img"
          />
        </div>

        <button
          aria-label="add to favorite"
          type="button"
          className="card__button"
          onClick={() => useFavoriteStore.getState().trigger(product)}
        >
          <div
            className={cn('icon icon--favorite-icon icon--hover card__icon', {
              'icon--favorite-icon-blue':
                favorites.find(f => f.id === id),
            })}
          />
        </button>
      </div>

      <div className="description">
        <h4 className="title title--h4 card__title">{name}</h4>

        <p className="card__text">{description}</p>
      </div>

      {pathname !== '/favorite' && (
        <div
          className="h-[48px] mt-[24px]"
        >
          <Button2
            path={`${pathname}/${id}`}
          >
            <span
              className="
          group-hover:-translate-x-[5px] transition duration-300"
            >
              Детальніше
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
      )}
    </div>
  );
});
