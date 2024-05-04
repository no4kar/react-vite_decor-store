import cn from 'classnames';
import { TyProduct } from '../../types/Products/Products';
import { useFavoriteStore } from '../../store/favourite.store';
import { TyService } from '../../types/Services/Services';

export const ButtonFavorite = ({
  selectProduct,
}: {
  selectProduct: TyProduct | TyService;
}) => {
  const { items: favorites } = useFavoriteStore(state => state);

  return (
    <button
      aria-label="add to favorite"
      type="button"
      className="
                  w-[50px] h-full
                  sm:w-[90px]
                  flex justify-center items-center
                  border border-solid border-black"
      onClick={() => {
        useFavoriteStore.getState().trigger(selectProduct);
      }}
    >
      <i
        className={cn('icon icon--favorite-icon icon--hover', {
          'icon--favorite-icon-blue':
            favorites.find(f => f.id === selectProduct?.id),
        })}
      />
    </button>
  );
};
