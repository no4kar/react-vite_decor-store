import * as R from 'react';
import { useSearchParams } from 'react-router-dom';

import { TyProduct } from '../../types/Products/Products';
import DropdownMultiSelect from '../DropdownMultiSelect/DropdownMultiSelect';
import {
  SearchParams, SearchParamsName, getSearchWith,
} from '../../helpers/searchHelper';

export const ProductDetailsFilters = R.memo(
  ({
    products,
    onClose,
  }: {
    products: TyProduct[];
    onClose?: () => void;
  }) => {
    console.log('render');
    const [searchParams, setSearchParams] = useSearchParams();
    const setSearchWith = R.useCallback((params: SearchParams) => {
      setSearchParams(getSearchWith(searchParams, params));
    }, [setSearchParams, searchParams]);

    const selectedCountries
      = searchParams.getAll(SearchParamsName.COUNTRY);
    const selectedCollections
      = searchParams.getAll(SearchParamsName.COLLECTION);
    const selectedProducers
      = searchParams.getAll(SearchParamsName.PRODUCER);

    const productOptions = R.useMemo(
      () => products.reduce((a, c) => {
        a[SearchParamsName.COUNTRY].add(c[SearchParamsName.COUNTRY]);
        a[SearchParamsName.COLLECTION].add(c[SearchParamsName.COLLECTION]);
        a[SearchParamsName.PRODUCER].add(c[SearchParamsName.PRODUCER]);

        return a;
      }, {
        [SearchParamsName.COUNTRY]: new Set<string>(),
        [SearchParamsName.COLLECTION]: new Set<string>(),
        [SearchParamsName.PRODUCER]: new Set<string>(),
      }),
      [products],
    );

    const productCountries = R.useMemo(
      () => Array.from(productOptions[SearchParamsName.COUNTRY])
        .map((item) => ({ value: item, content: item, })),
      [productOptions],
    );

    const productCollections = R.useMemo(
      () => Array.from(productOptions[SearchParamsName.COLLECTION])
        .map((item) => ({ value: encodeURIComponent(item), content: item, })),
      [productOptions],
    );

    const productProducers = R.useMemo(
      () => Array.from(productOptions[SearchParamsName.PRODUCER])
        .map((item) => ({ value: encodeURIComponent(item), content: item, })),
      [productOptions],
    );

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

    const handleProducerChange = (value: string[]): void => {
      setSearchWith({
        [SearchParamsName.PRODUCER]: value || null,
      });
    };

    return (
      <div
        className="
      h-full w-[320px]
      flex flex-col
      bg-white border border-red-300 border-solid
      "
      >
        {onClose && (
          <div
            className="
        flex justify-end
        h-fit
        border border-red-300 border-solid
        ">
            <button
              type="button"
              aria-label="filter"
              className="
          w-[50px] h-[50px]
          flex justify-center items-center
          border border-gray-100 border-solid
          transform transition duration-300 hover:scale-105 active:scale-100
          "
              onClick={onClose}
            >
              <i className="icon icon--filter" />
            </button>
          </div>
        )}

        <ul
          className="
          px-[24px] pt-[8px]
          "
        >
          <li>
            <DropdownMultiSelect
              placeholder={
                <div className="flex gap-[8px]">
                  <img
                    src="./icons/globe-01.svg"
                    alt="globe-01.svg"
                  />
                  <p>Countries</p>
                </div>
              }
              options={productCountries}
              selectedOptions={selectedCountries}
              onChange={handleCountryChange}
            />
          </li>

          <li>
            <DropdownMultiSelect
              placeholder={
                <div className="flex gap-[8px]">
                  <img
                    src="./icons/grid-01.svg"
                    alt="grid-01.svg"
                  />
                  <p>Collections</p>
                </div>
              }
              options={productCollections}
              selectedOptions={selectedCollections}
              onChange={handleCollectionChange}
            />
          </li>

          <li>
            <DropdownMultiSelect
              placeholder={
                <div className="flex gap-[8px]">
                  <img
                    src="./icons/factory-building.svg"
                    alt="factory-building.svg"
                  />
                  <p>Producers</p>
                </div>
              }
              options={productProducers}
              selectedOptions={selectedProducers}
              onChange={handleProducerChange}
            />
          </li>
        </ul>

        <div
          className="
          mt-[64px]
          h-fit
        flex justify-end
        border border-red-300 border-solid
        ">
          <button
            type="button"
            aria-label="filter"
            className="
          w-full h-[50px]
          py-[6px]
          flex justify-center items-center
          border border-red-300 border-solid
          transform transition duration-300 hover:scale-105 active:scale-100
          "
            onClick={() => {
              setSearchWith({
                [SearchParamsName.COUNTRY]: null,
                [SearchParamsName.COLLECTION]: null,
                [SearchParamsName.PRODUCER]: null,
              });
            }}
          >
            Сlean the filters
            {/* <i className="icon icon--filter" /> */}
          </button>
        </div>
      </div>
    );
  }
);
