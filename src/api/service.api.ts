import { client } from '../utils/fetchClient';
import services from '../../public/data/services.json';
import { TyService } from '../types/Services/Services';
import { MyForm } from '../types/MyForm';

export function getServices() {
  return services as TyService[];
}

export function getServiceById(id: number) {
  return (services as TyService[]).find(service => service.id === id);
}

export function getSendForm(forms: MyForm) {
  return client.post<Comment>('/posts', forms);
}

export function getOffers<T>() {
  return client.offers<T[]>('/v1/offers');
}
