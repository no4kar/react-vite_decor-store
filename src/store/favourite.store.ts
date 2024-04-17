import create from 'zustand';
import { getClient } from '../utils/localClient';

export type TyFavorite = {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string[];
  [key: string]: number | string | string[];
};

const localClient = getClient('favoritesStorage');

type FavoriteState = {
  items: TyFavorite[];
  trigger: (item: TyFavorite) => void;
};

export const useFavoriteStore = create<FavoriteState>((set) => ({
  items: localClient.init([] as TyFavorite[]),
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
