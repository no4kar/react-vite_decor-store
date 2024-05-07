import create from 'zustand';
import { getClient } from '../utils/local.client';
import { TyService } from '../types/Services/Services';
import { compareObjectProperties } from '../helpers/common.func';

export type TyFavoriteItem
  = TyService & { [key: string]: number | number[] | string | string[]; };

function isFavoriteItem(item: any) {
  const obj: TyFavoriteItem = {
    id: 0,
    categoryId: 0,
    name: '',
    description: '',
    imageUrl: [''],
  };

  return compareObjectProperties(obj, item);
}

const localClient = getClient('favoritesStorage');

type FavoriteState = {
  items: TyFavoriteItem[];
  trigger: (item: TyFavoriteItem) => void;
};

export const useFavoriteStore = create<FavoriteState>((set) => ({
  items: localClient.init([] as TyFavoriteItem[], isFavoriteItem),
  trigger: (item) => set((state) => {
    const newItems = state.items.find(f => f.id === item.id)
      ? state.items.filter(f => f.id !== item.id)
      : [...state.items, item];

    localClient.write(newItems);

    return { items: newItems };
  }),
}));


// const { items: yourVarName } = useItemsStore();
// useItemsStore.getState().storeMethod(item);
