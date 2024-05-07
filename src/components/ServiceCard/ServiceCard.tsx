import * as R from 'react';
import cn from 'classnames';

import { ServiceCategory, TyService } from '../../types/Services/Services';
import { useFavoriteStore } from '../../store/favourite.store';
import { Button2 } from '../Button2';

export const ServiceCard = R.memo(
  ({
    item,
  }: {
    item: TyService,
  }) => {
    const { id, imageUrl, name, description } = item;
    const { items: favorites } = useFavoriteStore(state => state);

    const pathname = cn({
      'service_decorative':
        item.categoryId === ServiceCategory.Decorative,
      'service_hang_wallpaper':
        item.categoryId === ServiceCategory.HangWallpaper,
    });

    return (
      <div
        key={id}
        className="
        pt-[10px] pb-[14px] px-[10px]
        w-full min-h-[520px]
      flex flex-col
      shadow rounded"
      >
        <div
          className="relative w-full aspect-square"
        >
          <img
            className="
            absolute inset-0 w-full h-full object-cover"
            src={imageUrl[0]}
            alt={imageUrl[0]}
          />

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
        </div>

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

        <div
          className="h-[48px] mt-auto"
        >
          <Button2
            path={`/${pathname}/${id}`}
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
      </div>
    );
  });