import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Loader } from '../../components/Loader';
import { getWallpapers } from '../../api/product.api';
import { PageNavigation } from '../../components/PageNavigation';
import { Search } from '../../components/Search';

import './wallpaper.page.scss';
import { useProductStore } from '../../store/product.store';
import { SearchParamsName } from '../../helpers/searchHelper';
import ProductCard2 from '../../components/ProductCard2/ProductCard2';

/* eslint no-console: "warn" */

export const WallpaperPage = () => {
  console.log('render');

  const {
    products,
    isLoading,
    error: hasError,
    fetchData,
  } = useProductStore();
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const query
    = (searchParams.get(SearchParamsName.QUERY) || '').toLocaleLowerCase();

  const wallpapers = getWallpapers(products).filter((p) => {
    return `${p.producer}/${p.collection}/${p.country}`
      .toLocaleLowerCase().includes(query);
  });

  useEffect(() => {
    fetchData();
  }, []);


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
        {/* <div className="h-full flex-1 bg-gray-800 opacity-50" /> */}
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

        {!isLoading && hasError && <p>{hasError}</p>}

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
            {wallpapers.map((product) => (
              <ProductCard2
                key={product.id}
                product={product} />
            ))}
          </div >
        )}
      </div>
    </div >
  );
};
