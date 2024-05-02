import create from 'zustand';
import { TyProduct } from '../types/Products/Products';
import { getProducts } from '../api/product.api';

type ProductState = {
  products: TyProduct[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<TyProduct[]>;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchData: async () => {
    try {
      set({ isLoading: true, error: null });

      const products = await getProducts();

      set({ products });

      return products;

    } catch (error) {
      set({ error: 'Something went wrong' });
      throw error;

    } finally {
      set({ isLoading: false });
    }
  },
}));
