import React, { useState } from 'react';
import cn from 'classnames';
import { TyMouseEvtButtonElmt } from '../../types/General';
import { TySelectOption } from '../../types/SelectOption';

export const Dropdown = React.memo(FuncComponent);

function FuncComponent({
  selectedValue,
  options,
  onChange = () => { },
  isThereSelectedInList = true,
  activeClass = 'text-accent',
  selectedClass = 'w-full p-[10px] flex items-center justify-between',
  listItemClass = 'px-[24px] py-[6px]',
}: {
  selectedValue: string,
  options: TySelectOption[],
  onChange?: (value: string) => void;
  isThereSelectedInList?: boolean,
  activeClass?: string,
  selectedClass?: string,
  listItemClass?: string,
}) {

  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(o => o.value === selectedValue);
  const visibleOptions = isThereSelectedInList
    ? options
    : options.filter(o => o.value !== selectedValue);

  const handleExpandChange = (event: TyMouseEvtButtonElmt) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(prev => !prev);
  };

  return (
    <div className="w-full cursor-pointer">
      <button
        type="button"
        aria-label="dropdown-menu"
        className={selectedClass}
        onClick={handleExpandChange}
      >
        <div
          className={cn({
            [activeClass]: isOpen,
          })}
        >
          {selectedOption?.label}
        </div>

        <div
          className={cn('h-full w-fit', {
            'transform scale-y-[-1]': isOpen,
          })}
        >
          <i className="icon icon--vector2-blue w-[10px] h-[10px]" />
        </div>
      </button >

      <ul
        className={cn(`flex flex-col origin-top`, {
          'hidden': !isOpen,
          'animate-dropdown-menu-open': isOpen,
        })}
      >
        {visibleOptions.map(option => (
          <button
            key={option.value}
            type="button"
            className={listItemClass}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </button>
        ))}
      </ul>
    </div >
  );
}
