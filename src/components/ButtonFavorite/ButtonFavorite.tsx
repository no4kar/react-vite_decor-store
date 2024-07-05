import cn from 'classnames';
import { TyProduct } from '../../types/Product';
import { useFavoriteStore } from '../../store/favourite.store';
import { TyService } from '../../types/Service';

export const ButtonFavorite = ({
  selectProduct,
}: {
  selectProduct: TyProduct.Item | TyService.Item;
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
            favorites.find(f => f.name === selectProduct?.name),
        })}
      />
    </button>
  );
};
