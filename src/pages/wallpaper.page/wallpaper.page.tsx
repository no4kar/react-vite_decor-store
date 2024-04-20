import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Loader } from '../../components/Loader';
import { getWallpapers } from '../../api/product.api';
import { PageNavigation } from '../../components/PageNavigation';
import { Search } from '../../components/Search';

import './wallpaper.page.scss';
import { useProductStore } from '../../store/product.store';
import {
  SearchParams, SearchParamsName, getSearchWith
} from '../../helpers/searchHelper';
import ProductCard2 from '../../components/ProductCard2/ProductCard2';
import DropdownMultiSelect
  from '../../components/DropdownMultiSelect/DropdownMultiSelect';


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
  const [searchParams, setSearchParams] = useSearchParams();
  const setSearchWith = useCallback((params: SearchParams) => {
    setSearchParams(getSearchWith(searchParams, params));
  }, [setSearchParams, searchParams]);

  const query
    = (searchParams.get(SearchParamsName.QUERY) || '').toLocaleLowerCase();
  const selectedCountries
    = searchParams.getAll(SearchParamsName.COUNTRY);
  const selectedCollections
    = searchParams.getAll(SearchParamsName.COLLECTION);

  const wallpapers = React.useMemo(
    () => getWallpapers(products),
    [products],
  );

  const wallpaperOptions = React.useMemo(
    () => wallpapers.reduce((a, c) => {
      a[SearchParamsName.COUNTRY].add(c[SearchParamsName.COUNTRY]);
      a[SearchParamsName.COLLECTION].add(c[SearchParamsName.COLLECTION]);

      return a;
    }, {
      [SearchParamsName.COUNTRY]: new Set<string>(),
      [SearchParamsName.COLLECTION]: new Set<string>(),
    }),
    [wallpapers],
  );

  const wallpaperCountries = React.useMemo(
    () => Array.from(wallpaperOptions[SearchParamsName.COUNTRY])
      .map((item) => ({ value: item, content: item, })),
    [wallpaperOptions],
  );

  const wallpaperCollections = React.useMemo(
    () => Array.from(wallpaperOptions[SearchParamsName.COLLECTION])
      .map((item) => ({ value: encodeURIComponent(item), content: item, })),
    [wallpaperOptions],
  );

  const visibleWallpapers = wallpapers
    .filter((p) => (
      (selectedCountries.length
        ? selectedCountries.includes(p.country)
        : true)
      && (selectedCollections.length
        ? selectedCollections.includes(encodeURIComponent(p.collection))
        : true)
    ))
    .filter((p) => {
      return `${p.id}/${p.producer}/${p.collection}/${p.country}`
        .toLocaleLowerCase().includes(query);
    });

  useEffect(() => {
    fetchData();
  }, []);

  const handleCountryChange = (value: string[]): void => {
    setSearchWith({
      [SearchParamsName.COUNTRY]: value || null,
    });
  };

  const handleCollectionChange = (value: string[]): void => {
    setSearchWith({
      [SearchParamsName.COLLECTION]: value || null,
    });
  };

  return (
    <div className="Wallpaper relative min-h-screen">
      <aside
        id="sidebar"
        className={cn(
          'absolute top-0 left-0 bottom-0 right-0 z-10',
          'flex flex-col',
          'h-full w-[320px]',
          'bg-white',
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
        <div className="
        flex justify-end
        h-fit
        border border-red-500 border-solid
        ">
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

        <ul
          className="
          px-[24px] pt-[8px]
          "
        >
          <li>
            <DropdownMultiSelect
              placeholder={
                <div className="flex gap-[8px]">
                  <img src="./icons/globe-01.svg" alt="globe-01.svg" />
                  <p>Countries</p>
                </div>
              }
              options={wallpaperCountries}
              selectedOptions={selectedCountries}
              onChange={handleCountryChange}
            />
          </li>

          <li>
            <DropdownMultiSelect
              placeholder={
                <div className="flex gap-[8px]">
                  <img src="./icons/grid-01.svg" alt="globe-01.svg" />
                  <p>Collections</p>
                </div>
              }
              options={wallpaperCollections}
              selectedOptions={selectedCollections}
              onChange={handleCollectionChange}
            />
          </li>
        </ul>


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
            {visibleWallpapers.map((product) => (
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
