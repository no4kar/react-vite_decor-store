import React, { useState } from 'react';
import cn from 'classnames';
import {
  TyChangeEvtInputElmt, TyMouseEvtButtonElmt
} from '../../types/General';

export type TyDropdownMultiSelectOption = {
  value: string,
  content: string | JSX.Element,
};

/* eslint no-console: "warn" */

function DropdownMultiSelect({
  options,
  selectedOptions = [],
  onChange = () => { },
  activeClass = 'text-accent',
  placeholder = '',
}: {
  options: TyDropdownMultiSelectOption[],
  selectedOptions?: string[],
  onChange?: (value: string[]) => void;
  activeClass?: string,
  placeholder: string | JSX.Element,
}) {
  console.info('render');

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
        className="
        w-full p-[10px]
        flex items-center justify-between
        border-b border-gray-400
        "
        onClick={handleExpandChange}
      >
        <div
          className={cn('title--body-text uppercase',{
            [activeClass]: isOpen,
          })}
        >
          {placeholder}
        </div>

        <div
          className={cn('h-full w-fit', {
            'transform scale-y-[-1]': isOpen,
          })}
        >
          <i className="icon icon--vector2-blue w-[10px] h-[10px]" />
        </div>
      </button >

      {isOpen && (
        <ul className="
        py-[16px]
        flex flex-col gap-[16px]
        border-b border-gray-400
        ">
          {options.map(option => (
            <li
              key={option.value}
            >
              <label className="
            flex gap-[6px]
            px-[10px] py-[6px]
            cursor-pointer
            transition-colors
            hover:bg-gray-100 [&:has(input:checked)]:bg-gray-200
            "
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.value)}
                  value={option.value}
                  className="w-[24px] h-[24px] cursor-pointer checked:bg-white"
                  onChange={handleChange}
                />
                <span className="title--body-text">{option.content}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div >
  );
}

export default React.memo(DropdownMultiSelect);
