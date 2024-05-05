import create from 'zustand';
import { getClient } from '../utils/localClient';
import { TyService } from '../types/Services/Services';

export type TyFavoriteItem
  = TyService & { [key: string]: number | number[] | string | string[]; };

const localClient = getClient('favoritesStorage');

type FavoriteState = {
  items: TyFavoriteItem[];
  trigger: (item: TyFavoriteItem) => void;
};

export const useFavoriteStore = create<FavoriteState>((set) => ({
  items: localClient.init([] as TyFavoriteItem[]),
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
