import create from 'zustand';
import { getClient } from '../utils/localClient';
import { TyProduct } from '../types/Products/Products';

export type TyInCart = TyProduct & { quantity: number };

const localClient = getClient('cartStorage');

type CartState = {
  items: TyInCart[];
  increase: (item: TyProduct) => void;
  decrease: (item: TyProduct) => void;
  remove: (item: TyProduct) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: localClient.init([] as TyInCart[]),

  increase: (item) => set((state) => {
    const foundItem = state.items.find(inCartItem => inCartItem.id === item.id);
    let newItems: TyInCart[];

    if (foundItem) {
      newItems = [
        ...state.items, {
          ...foundItem,
          quantity: foundItem.quantity + 1,
        }];
    } else {
      newItems = [
        ...state.items, {
          ...item,
          quantity: 1,
        }];
    }

    localClient.write(newItems);

    return { items: newItems };
  }),

  decrease: (item) => set((state) => {
    const foundItem = state.items.find(inCartItem => inCartItem.id === item.id);
    let newItems: TyInCart[];

    if (!foundItem) {
      return { items: state.items };
    }

    if (foundItem.quantity > 1) {
      newItems = [
        ...state.items, {
          ...foundItem,
          quantity: foundItem.quantity - 1,
        }];
    } else {
      newItems = state.items.filter(inCartItem => inCartItem.id !== item.id);
    }

    localClient.write(newItems);

    return { items: newItems };
  }),

  remove: (item) => set((state) => {
    return {
      items: state.items.filter(inCartItem => inCartItem.id !== item.id),
    };
  }),

}));

// const { items: yourVarName } = useItemsStore((state) => state);
// useItemsStore.getState().storeMethod(item);
