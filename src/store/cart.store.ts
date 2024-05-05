import create from 'zustand';
import { getClient } from '../utils/localClient';
import { TyService } from '../types/Services/Services';

export type TyCartItem
  = TyService & {
    price: number;
    [key: string]: number | number[] | string | string[];
  };
export type TyInCart = TyCartItem & { quantity: number; };

const localClient = getClient('cartStorage');

type CartState = {
  items: TyInCart[];
  increase: (item: TyCartItem) => void;
  decrease: (item: TyCartItem) => void;
  add: (item: TyCartItem, quantity?: TyInCart['quantity']) => void;
  remove: (item: TyCartItem) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: localClient.init([] as TyInCart[]),

  increase: (item) => set((state) => {
    const foundItemIndex = state.items
      .findIndex(inCartItem => inCartItem.id === item.id);
    const newItems = [...state.items];

    if (foundItemIndex !== -1) {
      const foundItem = state.items[foundItemIndex];

      newItems.splice(foundItemIndex, 1, {
        ...foundItem,
        quantity: foundItem.quantity + 1,
      });
    } else {
      newItems.push({
        ...item,
        quantity: 1,
      });
    }

    localClient.write(newItems);

    return { items: newItems };
  }),

  decrease: (item) => set((state) => {
    const foundItemIndex = state.items
      .findIndex(inCartItem => inCartItem.id === item.id);

    if (foundItemIndex === -1) {
      return {};
    }

    const newItems = [...state.items];
    const foundItem = state.items[foundItemIndex];

    if (foundItem.quantity > 1) {
      newItems.splice(foundItemIndex, 1, {
        ...foundItem,
        quantity: foundItem.quantity - 1,
      });
    } else {
      newItems.splice(foundItemIndex, 1);
    }

    localClient.write(newItems);

    return { items: newItems };
  }),

  add: (item, quantity = 1) => set((state) => {
    const newItems = [...state.items, { ...item, quantity }];

    localClient.write(newItems);

    return {
      items: newItems,
    };
  }),

  remove: (item) => set((state) => {
    const newItems = state.items
      .filter(inCartItem => inCartItem.id !== item.id);

    localClient.write(newItems);

    return {
      items: newItems,
    };
  }),

}));

// const items = useItemsStore((state) => state.items);
// useItemsStore.getState().storeMethod(item);
