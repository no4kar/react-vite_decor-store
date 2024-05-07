import create from 'zustand';
import { getClient } from '../utils/local.client';
import { TyService } from '../types/Services/Services';
import { compareObjectProperties } from '../helpers/common.func';

export type TyCartItem
  = TyService & {
    price: number;
    [key: string]: number | number[] | string | string[];
  };
export type TyInCartItem = TyCartItem & { quantity: number; };

function isInCartItem(item: any) {
  const obj: TyInCartItem = {
    id: 0,
    categoryId: 0,
    name: '',
    description: '',
    imageUrl: [''],
    price: 0,
    quantity: 0,
  };

  return compareObjectProperties(obj, item);
}

const localClient = getClient('cartStorage');

type CartState = {
  items: TyInCartItem[];
  increase: (item: TyCartItem) => void;
  decrease: (item: TyCartItem) => void;
  add: (item: TyCartItem, quantity?: TyInCartItem['quantity']) => void;
  remove: (item: TyCartItem) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: localClient.init([] as TyInCartItem[], isInCartItem),

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
