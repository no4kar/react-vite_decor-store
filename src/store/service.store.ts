import create from 'zustand';
import { serviceApi } from '../api/service.api';
import { TyService } from '../types/Service';

type ServiceState = {
  services: TyService.Item[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<TyService.Item[]>;
};

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchData: async () => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        error: null,
      }));

      const services = await serviceApi.getAll();

      set((state) => ({
        ...state,
        services,
      }));

      return services;

    } catch (error) {

      set((state) => ({
        ...state,
        error: 'Something went wrong',
      }));
      throw error;

    } finally {

      set((state) => ({
        ...state,
        isLoading: false,
      }));
    }
  },
}));
