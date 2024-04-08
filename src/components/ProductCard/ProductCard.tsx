import React, { memo, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { GlobalContext } from '../../store/GlobalContext';
import { Button } from '../Button';
import { ServiceProducts } from '../../types/ServiceProducts/ServiceProducts';
import './ProductCard.scss';

type Props = {
  product: ServiceProducts;
};

export const ProductCard: React.FC<Props> = memo(({ product }) => {
  const { pathname } = useLocation();
  const { id, img, name, inFavourite, description } = product;
  const { handleChooseCart } = useContext(GlobalContext);

  return (
    <div className="card" key={id}>
      <div className="card__img-container">
        <div className="card__products">
          <img src={img[0]} alt={name} className="card__img" />
        </div>

        <button
          aria-label="add to favorite"
          type="button"
          className="card__button"
          onClick={() => handleChooseCart(product, 'favourites')}
        >
          <div
            className={cn('icon icon--favorite-icon icon--hover card__icon', {
              'icon--favorite-icon-blue': inFavourite,
            })}
          />
        </button>
      </div>

      <div className="description">
        <h4 className="title title--h4 card__title">{name}</h4>

        <p className="card__text">{description}</p>
      </div>

      {pathname !== '/favorite' && (
        <Button $primary path={`${pathname}/${id}`}>
          Детальніше
        </Button>
      )}
    </div>
  );
});
