import * as R from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Loader } from '../../components/Loader';
import { PageNavigation } from '../../components/PageNavigation';
import { Search } from '../../components/Search';

import {
  SearchParams,
  SearchParamsName,
  getSearchWith
} from '../../helpers/searchHelper';
import ProductCard from '../../components/ProductCard/ProductCard';
import { TyProduct } from '../../types/Products/Products';

import './products.page.scss';
import { ProductDetailsFilters } from '../../components/ProductDetailsFilters';

export const ProductsPage = ({
  products,
  isLoading,
  hasError,
}: {
  products: TyProduct[];
  isLoading: boolean;
  hasError: string | null,
}) => {
  console.log('render');
  const [isAsideOpen, setIsAsideOpen] = R.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchWith = R.useCallback((params: SearchParams) => {
    setSearchParams(getSearchWith(searchParams, params));
  }, [setSearchParams, searchParams]);

  const query
    = (searchParams.get(SearchParamsName.QUERY) || '').toLocaleLowerCase();
  const selectedTypes
    = searchParams.getAll(SearchParamsName.TYPE);
  const selectedCountries
    = searchParams.getAll(SearchParamsName.COUNTRY);
  const selectedProducers
    = searchParams.getAll(SearchParamsName.PRODUCER);
  const selectedCollections
    = searchParams.getAll(SearchParamsName.COLLECTION);
  const selectedTones
    = searchParams.getAll(SearchParamsName.TONE);
  const selectedRooms
    = searchParams.getAll(SearchParamsName.ROOM);
  const sortByPrice
    = searchParams.get(SearchParamsName.SORT_BY_PRICE);


  const handleSortByPriceChange = (value: 'inc' | 'dec'): void => {
    setSearchWith({
      [SearchParamsName.SORT_BY_PRICE]: value || null,
    });
  };

  const visibleProducts = products
    .filter((p) => {
      // console.info((selectedTypes.length
      //   ? selectedTypes.includes(encodeURIComponent(p.type))
      //   : true));
      // console.info(encodeURIComponent(p.type));
      // console.info(p.type);

      return (
        (selectedCountries.length
          ? selectedCountries.includes(p.country)
          : true)
        && (selectedCollections.length
          ? selectedCollections.includes(encodeURIComponent(p.collection))
          : true)
        && (selectedProducers.length
          ? selectedProducers.includes(encodeURIComponent(p.producer))
          : true)
        && (selectedTypes.length
          ? selectedTypes.includes(encodeURIComponent(p.type))
          : true)
        && (selectedTones.length
          ? selectedTones.includes(encodeURIComponent(p.tone))
          : true)
        && (selectedRooms.length
          ? selectedRooms.includes(encodeURIComponent(p.room))
          : true)
      );
    })
    .filter((p) => {
      return `${p.id}/${p.producer}/${p.collection}/${p.country}`
        .toLocaleLowerCase().includes(query);
    })
    .sort((a, b) => {
      return (a.price - b.price) * (sortByPrice?.includes('inc') ? 1 : -1);
    });

  console.info(visibleProducts.length);

  return (
    <div className="Wallpaper
    relative min-h-screen
    border border-blue-300 border-solid
    "
    >
      <aside
        id="sidebar"
        className={cn(
          'absolute top-0 left-0 bottom-0 right-0 z-10',
          // 'border border-red-300 border-solid',
          'pointer-events-none',
          'transform -translate-x-full',
          'transition-transform',
          'duration-1000',
          'md:hidden',
          {
            'transform translate-x-0 pointer-events-auto': isAsideOpen,
          }
        )}
      >
        <ProductDetailsFilters
          products={products}
          onClose={() => setIsAsideOpen(false)}
        />
      </aside>

      <div className={cn('content flex flex-col gap-[40px]',
        'pt-[24px] pb-[4px] sm:pb-[62px] md:pt-[92px] md:pb-[84px]',
        // 'border border-red-300 border-solid',
        {
          'pointer-events-none': isAsideOpen,
        })}>
        <div className="
          mb-[24px]
          sm:mb-[40px]
          md:mb-[4px]"
        >
          <PageNavigation />
        </div>

        <div className="
        flex flex-col gap-[40px]
        md:flex-row md:gap-[130px]"
        >
          <div className="
          w-full h-[44px]
          shadow rounded
          md:flex-1"
          // border border-accent border-solid
          >
            <Search placeholder="Введіть назву або код товару" />
          </div>

          <div className="
        w-full h-[44px]
        flex gap-[20px]
        sm:justify-evenly
        shadow rounded
        md:w-[310px]"
          // border border-red-300 border-solid
          >
            <button
              type="button"
              aria-label="filter"
              className="
          w-[50px] h-full
          flex justify-center items-center
          transform transition duration-300 hover:scale-105 active:scale-100
          shadow rounded
          md:hidden"
              // border border-red-300 border-solid
              onClick={() => setIsAsideOpen(true)}
            >
              <i className="icon icon--filter" />
            </button>

            <button
              type="button"
              aria-label="sortByPrice"
              className="
          h-full px-[17px]
          flex-1 flex justify-between items-center
          transform transition duration-300 hover:scale-105 active:scale-100
          sm:flex-none sm:gap-[10px]
          shadow rounded
          md:w-full"
              // border border-red-300 border-solid
              onClick={() => handleSortByPriceChange(
                sortByPrice?.includes('inc')
                  ? 'dec'
                  : 'inc'
              )}
            >
              <i className="icon icon--vector-switch" />
              <p className="text-black uppercase">
                {cn('ціна за ', {
                  'зростанням': sortByPrice?.includes('inc'),
                  'спаданням': sortByPrice?.includes('dec'),
                })}
              </p>
            </button>
          </div>
        </div>

        <div className="flex gap-[24px]">
          <aside
            id="sidebar"
            className="
            hidden
            shadow rounded
            md:block"
          >
            <ProductDetailsFilters
              products={products}
            />
          </aside>

          {isLoading && <Loader />}

          {!isLoading && hasError && <p>{hasError}</p>}

          {!isLoading && !hasError && (
            <div
              className="
              flex-1
              grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-[24px]
              justify-items-center"
            >
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product} />
              ))}
            </div >
          )}
        </div>
      </div>
    </div >
  );
};
