import React, { useState } from 'react';
import cn from 'classnames';
import {
  TyChangeEvtInputElmt, TyMouseEvtButtonElmt
} from '../../types/General';
import { TySelectOption } from '../../types/SelectOption';
import './DropdownMultiSelect.scss';

export default React.memo(DropdownMultiSelect);

function DropdownMultiSelect({
  options,
  selectedOptions = [],
  onChange = () => { },
  placeholder = '',
  classBtnContainer = 'title--body uppercase',
  classBtnActive = 'text-accent',
}: {
  options: TySelectOption[],
  selectedOptions?: string[],
  onChange?: (value: string[]) => void;
  placeholder: string | JSX.Element,
  classBtnContainer?: string,
  classBtnActive?: string,
}) {
  // console.info('render');
  const [isOpen, setIsOpen] = useState(false);

  const handleExpandChange = (event: TyMouseEvtButtonElmt) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleChange = (event: TyChangeEvtInputElmt) => {
    const selectedOptionSet = new Set(selectedOptions);

    if (event.target.checked) {
      selectedOptionSet.add(event.target.value);
    } else {
      selectedOptionSet.delete(event.target.value);
    }

    onChange(Array.from(selectedOptionSet));
  };

  return (
    <div className="w-full cursor-pointer">
      <button
        type="button"
        aria-label="dropdown-menu"
        className={cn(`w-full p-[10px]
        flex items-center justify-between
        border-b border-gray-400`, {
          [classBtnContainer]: true,
          [classBtnActive]: isOpen,
        })}
        onClick={handleExpandChange}
      >
        {placeholder}
      </button >

      {isOpen && (
        <ul className="
        py-4
        flex flex-col gap-4
        border-b border-gray-400"
        >
          {options.map(option => (
            <li
              key={option.value}
            >
              <label className="
            flex gap-2 items-center
            px-3 py-2
            cursor-pointer
            transition-colors
            hover:bg-gray-100 [&:has(input:checked)]:bg-gray-200"
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.value)}
                  value={option.value}
                  className="flex-shrink-0"
                  // className="
                  // w-6 h-6 cursor-pointer flex-shrink-0 appearance-none outline-none
                  // border-2 border-solid border-gray-400 rounded
                  // [&:checked]:bg-transparent
                  // styled-checkbox"
                  onChange={handleChange}
                />
                <span className="title--body">{option.label}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div >
  );
}
