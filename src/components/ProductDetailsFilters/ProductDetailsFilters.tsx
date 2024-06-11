import * as R from 'react';
import { useSearchParams } from 'react-router-dom';

import { TyProduct } from '../../types/Products';
import DropdownMultiSelect from '../DropdownMultiSelect/DropdownMultiSelect';
import {
  SearchParams, SearchParamsName, getSearchWith,
} from '../../helpers/searchHelper';
import { TySelectOption } from '../../types/SelectOption';

export const ProductDetailsFilters = R.memo(
  ({
    products,
    onClose,
  }: {
    products: TyProduct[];
    onClose?: () => void;
  }) => {
    // console.log('render');
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
    // const selectedRooms
    //   = searchParams.getAll(SearchParamsName.ROOM);

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

    const handleCommonChange = (searchName: SearchParamsName) => (
      (value: string[]): void => {
        setSearchWith({
          [searchName]: value || null,
          [SearchParamsName.PAGE]: null,
        });
      }
    );

    const productCommonOption = (searchName: keyof (typeof productOptions)) => (
      () => Array.from(productOptions[searchName])
        .map((item) => ({ value: encodeURIComponent(item), label: item, }))
    );

    const productTypes: TySelectOption[] = R.useMemo(
      productCommonOption(SearchParamsName.TYPE),
      [productOptions],
    );

    const productCountries: TySelectOption[] = R.useMemo(
      productCommonOption(SearchParamsName.COUNTRY),
      [productOptions],
    );

    const productProducers: TySelectOption[] = R.useMemo(
      productCommonOption(SearchParamsName.PRODUCER),
      [productOptions],
    );

    const productCollections: TySelectOption[] = R.useMemo(
      productCommonOption(SearchParamsName.COLLECTION),
      [productOptions],
    );

    const productTones: TySelectOption[] = R.useMemo(
      productCommonOption(SearchParamsName.TONE),
      [productOptions],
    );

    // const productRooms: TySelectOption[] = R.useMemo(
    //   productCommonOption(SearchParamsName.ROOM),
    //   [productOptions],
    // );

    const handleTypeChange
      = handleCommonChange(SearchParamsName.TYPE);

    const handleCountryChange
      = handleCommonChange(SearchParamsName.COUNTRY);

    const handleProducerChange
      = handleCommonChange(SearchParamsName.PRODUCER);

    const handleCollectionChange
      = handleCommonChange(SearchParamsName.COLLECTION);

    const handleToneChange
      = handleCommonChange(SearchParamsName.TONE);

    // const handleRoomChange
    //   = handleCommonChange(SearchParamsName.ROOM);

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

          {/* <li>
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
          </li> */}
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
