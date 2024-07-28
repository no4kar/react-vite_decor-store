import create from 'zustand';
import { adminApi } from '../api/admin.api';

type AdminState = {
  isChecked: boolean;
  isLoading: boolean;
  error: string | null;

c
};

export const useAdminStore = create<AdminState>((set) => ({
  isChecked: false,
  isLoading: false,
  error: null,

  login: async ({ email, password }) => {
    set({
      isChecked: false,
      isLoading: true,
      error: null,
    });

    try {
      const isChecked = await adminApi.login({ email, password });

      set({
        isChecked,
      });

      if(!isChecked){
        throw new Error();
      }

    } catch (error) {
      set({
        error: 'Something went wrong',
      });

    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));


// const { items: yourVarName } = useItemsStore();
// useItemsStore.getState().storeMethod(item);
