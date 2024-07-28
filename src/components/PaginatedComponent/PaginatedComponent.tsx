import * as R from 'react';
import cn from 'classnames';

export const PaginatedComponent = R.memo(FuncComponent);

function FuncComponent({
  currentPage,
  totalPages,
  onPageChange = () => { },
}: {
  currentPage: number;
  totalPages: number;
  onPageChange?: (pageNumber: number) => void;
}) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const items = [];

  for (let number = 1; number <= totalPages; number += 1) {
    items.push(
      <button
        type="button"
        key={number}
        onClick={() => handlePageChange(number)}
        className={cn('h-full w-[32px]',
          'm-auto',
          'title--h4',
          'border border-solid',
          'hover:bg-gray-300',
          {
            'border-accent text-accent': number === currentPage,
            'border-gray-500': number !== currentPage,
          })}
      >
        {number}
      </button>
    );
  }

  return (
    <div
      className="h-[32px] flex gap-[5px]"
    >
      <button
        type="button"
        className="
      h-full w-fit
      p-[4px]
      flex items-center gap-[10px]
      hover:bg-gray-300"
        // border border-solid border-red-300
        onClick={() => isFirst || handlePageChange(currentPage - 1)}
      >
        <i className="
        icon icon--arrow-black
        box-content
        px-[6px]
        transform rotate-180"
        />
        <p className={cn('title--h4',
          {
            'text-gray-500': isFirst,
          }
        )}>
          Попередня
        </p>
      </button>
      {/* <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
      {items}
      <Pagination.Next onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} /> */}
      {items}

      <button
        type="button"
        className="
      h-full w-fit
      p-[4px]
      flex items-center gap-[10px]
      hover:bg-gray-300"
        // border border-solid border-red-300
        onClick={() => isLast || handlePageChange(currentPage + 1)}
      >
        <p className={cn('title--h4',
          {
            'text-gray-500': isLast,
          }
        )}>
          Наступна
        </p>

        <i className="
        icon icon--arrow-black
        box-content
        px-[6px]"
        />
      </button>
    </div>
  );
};

