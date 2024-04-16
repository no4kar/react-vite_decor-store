import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

import { useFavoriteStore } from '../../store/favourite.store';

import { Loader } from '../../components/Loader';
import { getWallpapers } from '../../api/product.api';
import { TyProduct } from '../../types/Products/Products';
import { PageNavigation } from '../../components/PageNavigation';
import { Button } from '../../components/Button';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { Search } from '../../components/Search';

import './wallpaper.page.scss';

/* eslint no-console: "warn" */

export const WallpaperPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [hasError, setHasError] = useState('');
  const [products, setProducts] = useState<TyProduct[]>([]);
  const timerId = useRef(0);
  const { pathname } = useLocation();
  const { items: favorites } = useFavoriteStore(state => state);

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    const fetchData = async () => {
      setHasError('');

      try {
        const loadedProducts = await getWallpapers();

        setProducts(loadedProducts);
      } catch (error) {
        setHasError('Something went wrong');
      }
    };

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, initialDelayLoader);

    fetchData();
  }, []);

  console.log('render');

  return (
    <div className="Wallpaper relative">
      <aside
        id="sidebar"
        className={cn(
          'absolute top-0 left-0 bottom-0 right-0 z-10',
          'flex flex-row',
          'w-full',
          'border border-red-500 border-solid',
          'pointer-events-none',
          'transform -translate-x-full',
          'transition-transform',
          'duration-1000',
          {
            'transform translate-x-0 pointer-events-auto': isAsideOpen,
          }
        )}
      >
        <div className="h-full w-[320px] bg-white uppercase">
          <button
            type="button"
            aria-label="filter"
            className="
          w-[50px] h-[50px]
          flex justify-center items-center
          border border-gray-100 border-solid
          hover:scale-110
          "
            onClick={() => setIsAsideOpen(false)}
          >
            <i className="icon icon--filter" />
          </button>
        </div>
        <div className="h-full flex-1 bg-gray-800 opacity-50" />
      </aside>

      <div className={cn('content flex flex-col gap-[40px]', {
        'pointer-events-none': isAsideOpen,
      })}>
        <PageNavigation />
        {isLoading && <Loader />}

        <div className="
        w-full
        h-[44px]
        border
        border-accent
        border-solid
        ">
          <Search placeholder="Введіть назву або код товару" />
        </div>

        <div className="
        w-full h-[44px]
        flex justify-between sm:justify-evenly
        border border-red-500 border-solid
        ">
          <button
            type="button"
            aria-label="filter"
            className="
          w-[50px] h-full
          flex justify-center items-center
          border border-red-500 border-solid
          hover:scale-110
          "
            onClick={() => setIsAsideOpen(true)}
          >
            <i className="icon icon--filter" />
          </button>

          <div className="
          h-full
          flex items-center
          border border-red-500 border-solid
          ">
            <p className="text-black uppercase">ціна за зростанням</p>
          </div>
        </div>

        {hasError && !isLoading && <p>{hasError}</p>}

        {!isLoading && !hasError && (
          <div
            className={cn(
              'grid',
              'grid-cols-1',
              'gap-[24px]',
              'sm:grid-cols-2',
              'md:grid-cols-4',
            )}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={cn(
                  'pt-[10px] pb-[14px] px-[10px]',
                  'shadow',
                  'rounded',
                )}
              >
                <div className={cn(
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
            ))}
          </div >
        )}
      </div>
    </div >
  );
};
