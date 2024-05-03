import * as R from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { TyService } from '../../types/Services/Services';
import { useFavoriteStore } from '../../store/favourite.store';
import { Button2 } from '../Button2';

export const ServiceCard = R.memo(
  ({
    item,
  }: {
    item: TyService,
  }) => {
    const { pathname } = useLocation();
    const { id, imgUrl, name, description } = item;
    const { items: favorites } = useFavoriteStore(state => state);

    return (
      <div
        key={id}
        className="
      w-[310px] h-[520px] p-[10px]
      flex flex-col justify-between"
      >
        <div className="
        relative"
        >
          <div className="">
            <img
              className="
            w-[290px] h-[290px]
            object-cover"
              src={imgUrl[0]}
              alt={imgUrl[0]}
            />
          </div>

          <button
            aria-label="add to favorite"
            type="button"
            className="
          w-[40px] h-[40px]
          absolute top-[20px] right-[10px]
          bg-white rounded-full shadow"
            onClick={() => useFavoriteStore.getState().trigger(item)}
          >
            <i
              className={cn('icon icon--favorite-icon icon--hover m-auto', {
                'icon--favorite-icon-blue':
                  favorites.find(f => f.id === id),
              })}
            />
          </button>

          <div className="description
        mt-[24px]"
          >
            <h4 className="title--h4
          uppercase"
            >
              {name}
            </h4>

            <p className="mt-[8px] title--body-text">
              {description.slice(0, 100).concat('...')}
            </p>
          </div>
        </div>


        {pathname !== '/favorite' && (
          <div
            className="h-[48px]"
          >
            <Button2
              path={`${pathname}/${id}`}
            >
              <span
                className="
          group-hover:-translate-x-[5px] transition duration-300"
              >
                Детальніше
              </span>

              <span
                className="
          w-[26px] text-3xl
          group-hover:-translate-x-[-5px] transition duration-300"
              >
                &#8594;
              </span>
            </Button2>
          </div>
        )}
      </div>
    );
  });
