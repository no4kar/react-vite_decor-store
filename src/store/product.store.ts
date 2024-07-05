import create from 'zustand';
import { TyProduct } from '../types/Product';
import { productApi } from '../api/product.api';

type ProductState = {
  products: TyProduct.Item[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<TyProduct.Item[]>;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchData: async () => {
    try {
      set(state => ({
        ...state,
        isLoading: true,
        error: null,
      }));

      const products = await productApi.getAll();

      set(state => ({
        ...state,
        products
      }));

      return products;

    } catch (error) {
      set(state => ({
        ...state,
        products: [],
        error: 'Something went wrong',
      }));

      return [] as TyProduct.Item[];

    } finally {
      set(state => ({
        ...state,
        isLoading: false,
      }));
    }
  },
}));
