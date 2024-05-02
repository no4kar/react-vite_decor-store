import { client } from '../utils/fetchClient';
import services from '../../public/data/services.json';
import { ServiceCategory, TyService } from '../types/Services/Services';
import { MyForm } from '../types/MyForm';
import { wait } from '../helpers/common.func';
import { initialDelayLoader } from '../constants/initialDelayLoader';

export function getServices() {
  return wait<TyService[]>(initialDelayLoader, () => services);
}

export function getServiceById(items: TyService[], id: number) {
  return items.find(item => item.id === id);
}

export function getServiceByCategory(
  items: TyService[],
  categoryId: ServiceCategory,
) {
  return items
    .filter(item => item.categoryId === categoryId);
}

export function getSendForm(forms: MyForm) {
  return client.post<Comment>('/posts', forms);
}

export function getOffers<T>() {
  return client.offers<T[]>('/v1/offers');
}
