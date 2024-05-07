import * as R from 'react';
import cn from 'classnames';

import { ProductCategory, TyProduct } from '../../types/Products/Products';
import { useFavoriteStore } from '../../store/favourite.store';
import { Button2 } from '../Button2';

const ProductCard = ({
  product
}: {
  product: TyProduct;
}) => {
  const { items: favorites } = useFavoriteStore();

  const pathname = cn({
    'paint':
      product.categoryId === ProductCategory.Paint,
    'wallpaper':
      product.categoryId === ProductCategory.Wallpaper,
  });

  return (
    <div
      className="
      pt-[10px] pb-[14px] px-[10px]
      w-full
      shadow rounded"
    >
      <div
        className="relative w-full aspect-square"
      >
        <img
          src={product.imageUrl.at(0)}
          alt={product.imageUrl.at(0)}
          className='absolute inset-0 w-full h-full object-cover'
        />

        <button
          aria-label="add to favorite"
          type="button"
          className="w-[40px] h-[40px]
          absolute top-[20px] right-[10px]
          bg-white rounded-full shadow"
          onClick={() => useFavoriteStore.getState().trigger(product)}
        >
          <i
            className={cn('icon icon--favorite-icon icon--hover m-auto',
              {
                'icon--favorite-icon-blue':
                  favorites.find(f => f.id === product.id),
              })}
          />
        </button>
      </div>

      <div className="pt-[24px]">
        <div>
          <p className="title--micro title--secondary-color text-left">
            {product.type}
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
        className="h-[48px] mt-[40px]"
      >
        <Button2
          path={`/${pathname}/${product.id}`}
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
    </div>
  );
};

export default R.memo(ProductCard);