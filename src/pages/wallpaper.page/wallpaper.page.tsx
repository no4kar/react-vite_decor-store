import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { Loader } from '../../components/Loader';
import { getWallpapers } from '../../api/product.api';
import { TyProduct } from '../../types/Products/Products';
import { PageNavigation } from '../../components/PageNavigation';
import { Button } from '../../components/Button';
import cn from 'classnames';

import './wallpaper.page.scss';

/* eslint no-console: "warn" */

export const WallpaperPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');
  const [products, setProducts] = useState<TyProduct[]>([]);
  const timerId = useRef(0);
  const { pathname } = useLocation();

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

  console.log(products);

  return (
    <div className="Wallpaper">
      <div className="content">
        <PageNavigation />
        {isLoading && <Loader />}

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
                  'bg-blue',
                  'pt-[10px]',
                  'pb-[14px]',
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
                    src={product.imageUrl.at(0)}
                    alt={product.imageUrl.at(0)}
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
                  // onClick={() => handleChooseCart(product, 'favourites')}
                  >
                    <div
                      className={cn(
                        'icon',
                        'icon--favorite-icon',
                        'icon--hover',
                        'card__icon', {
                        // 'icon--favorite-icon-blue': inFavourite,
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
                      <p className="pl-3 pr-1">{product.price}</p>
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
    </div>
  );
};
