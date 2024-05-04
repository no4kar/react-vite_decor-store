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

    const productOptions = R.useMemo(
      () => products.reduce((a, c) => {
        a[SearchParamsName.TYPE].add(c[SearchParamsName.TYPE]);
        a[SearchParamsName.COUNTRY].add(c[SearchParamsName.COUNTRY]);
        a[SearchParamsName.PRODUCER].add(c[SearchParamsName.PRODUCER]);
        a[SearchParamsName.COLLECTION].add(c[SearchParamsName.COLLECTION]);
        a[SearchParamsName.TONE].add(c[SearchParamsName.TONE]);
        a[SearchParamsName.ROOM].add(c[SearchParamsName.ROOM]);

        return a;
      }, {
        [SearchParamsName.TYPE]: new Set<string>(),
        [SearchParamsName.COUNTRY]: new Set<string>(),
        [SearchParamsName.PRODUCER]: new Set<string>(),
        [SearchParamsName.COLLECTION]: new Set<string>(),
        [SearchParamsName.TONE]: new Set<string>(),
        [SearchParamsName.ROOM]: new Set<string>(),
      }),
      [products],
    );

    const productTypes = R.useMemo(
      () => Array.from(productOptions[SearchParamsName.TYPE])
        .map((item) => ({ value: encodeURIComponent(item), content: item, })),
      [productOptions],
    );

    const productCountries = R.useMemo(
      () => Array.from(productOptions[SearchParamsName.COUNTRY])
        .map((item) => ({ value: item, content: item, })),
      [productOptions],
    );

    const productProducers = R.useMemo(
      () => Array.from(productOptions[SearchParamsName.PRODUCER])
        .map((item) => ({ value: encodeURIComponent(item), content: item, })),
      [productOptions],
    );

    const productCollections = R.useMemo(
      () => Array.from(productOptions[SearchParamsName.COLLECTION])
        .map((item) => ({ value: encodeURIComponent(item), content: item, })),
      [productOptions],
    );

    const productTones = R.useMemo(
      () => Array.from(productOptions[SearchParamsName.TONE])
        .map((item) => ({ value: encodeURIComponent(item), content: item, })),
      [productOptions],
    );

    const productRooms = R.useMemo(
      () => Array.from(productOptions[SearchParamsName.ROOM])
        .map((item) => ({ value: encodeURIComponent(item), content: item, })),
      [productOptions],
    );

    const handleTypeChange = (value: string[]): void => {
      setSearchWith({
        [SearchParamsName.TYPE]: value || null,
      });
    };

    const handleCountryChange = (value: string[]): void => {
      setSearchWith({
        [SearchParamsName.COUNTRY]: value || null,
      });
    };

    const handleProducerChange = (value: string[]): void => {
      setSearchWith({
        [SearchParamsName.PRODUCER]: value || null,
      });
    };

    const handleCollectionChange = (value: string[]): void => {
      setSearchWith({
        [SearchParamsName.COLLECTION]: value || null,
      });
    };

    const handleToneChange = (value: string[]): void => {
      setSearchWith({
        [SearchParamsName.TONE]: value || null,
      });
    };

    const handleRoomChange = (value: string[]): void => {
      setSearchWith({
        [SearchParamsName.ROOM]: value || null,
      });
    };

    return (
      <div
        className="
      h-full w-[320px]
      flex flex-col
      shadow rounded bg-white"
      // border border-red-300 border-solid
      >
        {onClose && (
          <div
            className="
        flex justify-end
        shadow rounded
        h-fit"
          // border border-red-300 border-solid
          >
            <button
              type="button"
              aria-label="filter"
              className="
          w-[50px] h-[50px]
          flex justify-center items-center
          border border-gray-100 border-solid
          transform transition duration-300 hover:scale-105 active:scale-100"
              onClick={onClose}
            >
              <i className="icon icon--filter" />
            </button>
          </div>
        )}

        <ul
          className="
          px-[24px] pt-[8px]"
        >
          <li>
            <DropdownMultiSelect
              placeholder={
                <div className="flex gap-[8px]">
                  <img
                    src="./icons/intersect-square.svg"
                    alt="intersect-square.svg"
                  />
                  <p>ТИП</p>
                </div>
              }
              options={productTypes}
              selectedOptions={selectedTypes}
              onChange={handleTypeChange}
            />
          </li>

          <li>
            <DropdownMultiSelect
              placeholder={
                <div className="flex gap-[8px]">
                  <img
                    src="./icons/globe-01.svg"
                    alt="globe-01.svg"
                  />
                  <p>КРАЇНА</p>
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
                    src="./icons/factory-building.svg"
                    alt="factory-building.svg"
                  />
                  <p>ВИРОБНИК</p>
                </div>
              }
              options={productProducers}
              selectedOptions={selectedProducers}
              onChange={handleProducerChange}
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
                  <p>КОЛЕКЦІЯ</p>
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
                    src="./icons/colors.svg"
                    alt="colors.svg"
                  />
                  <p>ТОН</p>
                </div>
              }
              options={productTones}
              selectedOptions={selectedTones}
              onChange={handleToneChange}
            />
          </li>

          <li>
            <DropdownMultiSelect
              placeholder={
                <div className="flex gap-[8px]">
                  <img
                    src="./icons/home-01.svg"
                    alt="home-01.svg"
                  />
                  <p>ПРИМІЩЕННЯ</p>
                </div>
              }
              options={productRooms}
              selectedOptions={selectedRooms}
              onChange={handleRoomChange}
            />
          </li>
        </ul>

        <div
          className="
          mt-[64px]
          h-fit
        flex justify-end"
        // border border-red-300 border-solid
        >
          <button
            type="button"
            aria-label="filter"
            className="
          w-full h-[50px]
          py-[6px]
          flex justify-center items-center
          shadow rounded
          transform transition duration-300 hover:scale-105 active:scale-100"
            // border border-red-300 border-solid
            onClick={() => {
              setSearchWith({
                [SearchParamsName.TYPE]: null,
                [SearchParamsName.COUNTRY]: null,
                [SearchParamsName.PRODUCER]: null,
                [SearchParamsName.COLLECTION]: null,
                [SearchParamsName.TONE]: null,
                [SearchParamsName.ROOM]: null,
                [SearchParamsName.SORT_BY_PRICE]: null,
              });
            }}
          >
            Очистити фільтри
          </button>
        </div>
      </div>
    );
  }
);
