import create from 'zustand';
import { getServices } from '../api/service.api';
import { TyService } from '../types/Services/Services';

type ServiceState = {
  services: TyService[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<TyService[]>;
};

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchData: async () => {
    try {
      set({ isLoading: true, error: null });

      const services = await getServices();

      set({ services });

      return services;

    } catch (error) {
      set({ error: 'Something went wrong' });
      throw error;

    } finally {
      set({ isLoading: false });
    }
  },
}));
