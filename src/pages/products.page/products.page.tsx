import * as R from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Loader } from '../../components/Loader';
import { PageNavigation } from '../../components/PageNavigation';
import { Search } from '../../components/Search';

import {
  SearchParamsName
} from '../../helpers/searchHelper';
import ProductCard2 from '../../components/ProductCard2/ProductCard2';
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
  const [searchParams] = useSearchParams();
  const [sortByPriceInc, setSortByPriceInc] = R.useState<boolean>(true);

  const query
    = (searchParams.get(SearchParamsName.QUERY) || '').toLocaleLowerCase();
  const selectedCountries
    = searchParams.getAll(SearchParamsName.COUNTRY);
  const selectedCollections
    = searchParams.getAll(SearchParamsName.COLLECTION);
  const selectedProducers
    = searchParams.getAll(SearchParamsName.PRODUCER);

  const visibleProducts = products
    .filter((p) => (
      (selectedCountries.length
        ? selectedCountries.includes(p.country)
        : true)
      && (selectedCollections.length
        ? selectedCollections.includes(encodeURIComponent(p.collection))
        : true)
      && (selectedProducers.length
        ? selectedProducers.includes(encodeURIComponent(p.producer))
        : true)
    ))
    .filter((p) => {
      return `${p.id}/${p.producer}/${p.collection}/${p.country}`
        .toLocaleLowerCase().includes(query);
    })
    .sort((a, b) => {
      return (a.price - b.price) * (sortByPriceInc ? 1 : -1);
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
          'border border-red-300 border-solid',
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
        'border border-red-300 border-solid',
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
          border border-accent border-solid
          md:flex-1
          ">
            <Search placeholder="Введіть назву або код товару" />
          </div>

          <div className="
        w-full h-[44px]
        flex gap-[20px]
        sm:justify-evenly
        border border-red-300 border-solid
        md:w-[310px]
        ">
            <button
              type="button"
              aria-label="filter"
              className="
          w-[50px] h-full
          flex justify-center items-center
          border border-red-300 border-solid
          transform transition duration-300 hover:scale-105 active:scale-100
          md:hidden
          "
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
          border border-red-300 border-solid
          transform transition duration-300 hover:scale-105 active:scale-100
          sm:flex-none sm:gap-[10px]
          md:w-full
          "
              onClick={() => setSortByPriceInc(prev => !prev)}
            >
              <i className="icon icon--filter" />
              <p className="text-black uppercase">ціна за зростанням</p>
            </button>
          </div>
        </div>

        {isLoading && <Loader />}

        {!isLoading && hasError && <p>{hasError}</p>}

        <div className="flex gap-[24px]">
          <aside
            id="sidebar"
            className="
            hidden
            border border-red-300 border-solid
            md:block"
          >
            <ProductDetailsFilters
              products={products}
            />
          </aside>

          {!isLoading && !hasError && (
            <div
              className="
              flex-1
              grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-[24px]
              justify-items-center"
            >
              {visibleProducts.map((product) => (
                <ProductCard2
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
