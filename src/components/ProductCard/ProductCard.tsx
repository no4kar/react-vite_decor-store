import * as R from 'react';
import cn from 'classnames';

import { TyProduct } from '../../types/Product';
import { useFavoriteStore } from '../../store/favourite.store';
import { Button } from '../Button';

export const ProductCard = R.memo(FuncComponent);

function FuncComponent({
  product,
  classContainer = '',
}: {
  product: TyProduct.Item;
  classContainer?: string;
}) {
  const { items: favorites } = useFavoriteStore();

  const pathname = cn({
    'paint':
      product.categoryId === TyProduct.Category.Paint,
    'wallpaper':
      product.categoryId === TyProduct.Category.Wallpaper,
  });

  return (
    <div
      className={cn(`p-[10px]
      w-full
      flex flex-col
      shadow rounded
      hover:scale-[1.03]
      transition-transform duration-300 ease-in-out`, {
        [classContainer]: classContainer,
      })}
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
                  favorites.find(f => f.name === product.name),
              })}
          />
        </button>
      </div>

      <div className="pt-6 pb-10">
        <div className=''>
          <p className="title--micro text-gray-600 text-left">
            {product.type}
          </p>

          <div className="pt-2 flex flex-wrap">
            <span className="title--h4 text-black">
              {product.producer}
            </span>
            <span className="title--body text-black">/</span>
            <span className="title--body text-black">
              {product.collection}
            </span>
            <span className="title--body text-black">/</span>
            <span className="title--body text-gray-600">
              {product.country}
            </span>
          </div>
        </div>

        <div className="pt-4 flex justify-between">
          <div className="flex flex-wrap gap-2 items-baseline">
            <p className="title--micro text-gray-600">Код товару:</p>
            <p className="title--body text-black">{product.code}</p>
          </div>

          <div className="flex items-baseline">
            <p className="title--micro text-gray-600">Ціна</p>
            <p className="title--h4 pl-3 pr-1 text-accent">{product.price}</p>
            <p className="title--body text-black">грн.</p>
          </div>
        </div>
      </div>

      <div
        className="h-16 mt-auto"
      >
        <Button
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
        </Button>
      </div>
    </div>
  );
}
