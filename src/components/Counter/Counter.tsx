import * as R from 'react';
import cn from 'classnames';
import { TyInCartItem } from '../../store/cart.store';

export const Counter = R.memo(
  ({
    quantity,
    onIncrease,
    onDecrease,
    classContainer,
  }: {
    quantity: TyInCartItem['quantity'],
    onIncrease?: () => void;
    onDecrease?: () => void;
    classContainer?: string;
  }) => {
    const isFirst = quantity <= 1;

    return (
      <div className={`w-[96px] h-[48px] flex border border-solid border-gray-400 ${classContainer}`}>
        <div className="
        h-full
        flex-1
        flex justify-center items-center
        title--body"
        >
          {quantity}
        </div>

        <div className="
        w-[25px] h-full
        flex flex-col
        border-l border-solid border-gray-300"
        >
          <button
            data-cy="paginationRight"
            type="button"
            aria-label="quantityIncrease"
            className="
            flex-1
            hover:bg-gray-300
            active:scale-90"
            onClick={onIncrease}
          >
            <i className="
            icon icon--vector
            w-[10px] h-[10px] m-auto
            transform scale-y-[-1]"
            />
          </button>

          <button
            type="button"
            aria-label="quantityDecrease"
            className={cn('flex-1', {
              'hover:bg-gray-300 active:scale-90': !isFirst,
              'bg-gray-200': isFirst,
            })}
            disabled={isFirst}
            onClick={onDecrease}
          >
            <i className="
            icon icon--vector
            w-[10px] h-[10px] m-auto"
            />
          </button>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.quantity === nextProps.quantity
);
