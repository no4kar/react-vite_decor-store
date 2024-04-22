import './SliderButtons.scss';

export const SliderButtons = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  return (
    <div
      className="
                    flex gap-[20px]
                    sm:flex-col"
    >
      <button
        aria-label="prevSlide"
        type="button"
        className="
                      h-[40px] aspect-square
                      border border-solid border-gray-400
                      rounded-full"
        onClick={onPrev}
      >
        <i
          className="
                        m-auto
                        icon icon__arrow-button--black
                        transform rotate-0 sm:rotate-90"
        />
      </button>

      <button
        aria-label="nextSlide"
        type="button"
        className="
                      h-[40px] aspect-square
                      border border-solid border-gray-400
                      rounded-full"
        onClick={onNext}
      >
        <i
          className="
                        m-auto
                        icon icon__arrow-button--black
                        transform rotate-180 sm:-rotate-90"
        />
      </button>
    </div>
  );
};

// <div
//   className={cn('control', {
//     'control--flex-column': $detailPage,
//   })}
// >
//   <button onClick={handleBtnPrev} className="control__btn" type="button">
//     <div
//       className={cn(
//         `icon icon__arrow-button icon__arrow-button--${color}`,
//         {
//           'control--icon-rotate': $detailPage,
//         },
//       )}
//     />
//   </button>

//   <button onClick={handleBtnNext} className="control__btn" type="button">
//     <div
//       className={cn(
//         `icon icon__arrow-button icon__arrow-button--${color} icon__arrow-button--rigth`,
//         {
//           'icon__arrow-button--down': $detailPage,
//         },
//       )}
//     />
//   </button>
// </div>
