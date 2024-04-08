import { client } from '../utils/fetchClient';
import services from '../../public/data/services.json';
import { ServiceProducts } from '../types/ServiceProducts/ServiceProducts';
import { MyForm } from '../types/MyForm';

export function getServices() {
  return services as ServiceProducts[];
}

export function getServiceById(id: number) {
  return (services as ServiceProducts[]).find(service => service.id === id);
}

export function getSendForm(forms: MyForm) {
  return client.post<Comment>('/posts', forms);
}

export function getOffers<T>() {
  return client.offers<T[]>('/v1/offers');
}
