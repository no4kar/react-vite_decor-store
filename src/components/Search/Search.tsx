import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { TyChangeEvtInputElmt } from '../../types/General';
import {
  SearchParams, SearchParamsName, getSearchWith,
} from '../../helpers/searchHelper';

import './Search.scss';
/* eslint no-console: "warn" */
export const Search = React.memo(
  ({
    placeholder = 'Search...',
  }: {
    placeholder: string;
  }) => {
    console.info('render');
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery]
      = useState(searchParams.get(SearchParamsName.QUERY) || '');

    const setSearchWith = (params: SearchParams) => {
      setSearchParams(getSearchWith(searchParams, params));
    };

    const applyQuery = useCallback(
      debounce(setSearchWith, 1000),
      [location.pathname, searchParams],
    );// bag correction

    useEffect(() => { // search when switch on other page
      setSearchWith({ [SearchParamsName.QUERY]: query.trim() || null });
    }, [location.pathname]);

    const handleQueryChange = (event: TyChangeEvtInputElmt) => {
      setQuery(event.target.value);
      applyQuery({
        [SearchParamsName.QUERY]:
          event.target.value.trim() || null,
      });
    };

    const handleQueryClear = () => {
      setQuery('');
      setSearchWith({ [SearchParamsName.QUERY]: null });
    };

    return (
      <div className="
      relative h-full
      ">
        <input
          type="input"
          className="w-full h-full pl-[40px] outline-none"
          placeholder={placeholder}
          value={query}
          onChange={handleQueryChange}
        />

        {query ? (
          <button
            data-cy="searchDelete"
            type="button"
            aria-label="searchDelete"
            className="
            absolute top-1/2 left-[20px]
            w-[32px] h-[32px] p-0
            flex justify-center items-center
            transform -translate-x-1/2 -translate-y-1/2
            border-none bg-transparent
            cursor-pointer"
            onClick={handleQueryClear}
          >
            <i className="icon icon--close" />
          </button>
        ) : (
          <span className="
            absolute top-1/2 left-[20px]
            w-[32px] h-[32px] p-0
            flex justify-center items-center
            transform -translate-x-1/2 -translate-y-1/2
            border-none bg-transparent
            cursor-pointer"
          >
            <i className="icon icon--search" />
          </span>
        )}
      </div>
    );
  },
);
