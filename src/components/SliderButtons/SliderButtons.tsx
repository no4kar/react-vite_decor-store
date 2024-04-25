import cn from 'classnames';

import './SliderButtons.scss';
// 40px 70px

export enum Option {
  PRIMARY,
  SECONDARY,
  MAIN_SCREEN,
}

export const SliderButtons = ({
  onNext,
  onPrev,
  option = Option.PRIMARY,
}: {
  onNext: () => void;
  onPrev: () => void;
  option?: Option;
}) => {
  return (
    <div className={cn('flex gap-[20px] ', {
      'h-[40px] sm:flex-col sm:h-auto sm:w-[40px]':
        option === Option.PRIMARY || option === Option.SECONDARY,
      'h-[70px]':
        option === Option.MAIN_SCREEN,
    })}>
      <button
        aria-label="prevSlide"
        type="button"
        className="
      aspect-square
      border border-solid border-gray-400
      rounded-full
      hover:bg-gray-300"
        onClick={onPrev}
      >
        <i
          className={cn('m-auto icon icon--arrow-black transform rotate-180', {
            'sm:-rotate-90':
              option !== Option.MAIN_SCREEN,
          })}
        />
      </button>

      <button
        aria-label="nextSlide"
        type="button"
        className="
      aspect-square
      border border-solid border-gray-400
      rounded-full
      hover:bg-gray-300"
        onClick={onNext}
      >
        <i
          className={cn('m-auto icon icon--arrow-black transform rotate-0', {
            'sm:rotate-90':
              option !== Option.MAIN_SCREEN,
          })}
        />
      </button>
    </div>
  );
};
