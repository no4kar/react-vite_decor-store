import { getClient } from '../utils/axios.client';
import services from '../../public/data/services.json';
import { ServiceCategory, TyService } from '../types/Services/Services';
import { MyForm } from '../types/MyForm';
import { wait } from '../helpers/common.func';
import { initialDelayLoader } from '../constants/initialDelayLoader';
import env from '../helpers/varsFromEnv';

const client = getClient(env.API_URL);

export function getServices() {
  return  wait<TyService[]>(initialDelayLoader, () => services);

  // return client
  //   ? client.get<TyService[]>('/v1/offers?page=0&size=100')
  //     .then(res => (res.data).map((typeId, ...rest) => ({
  //       ...rest,
  //       categoryId: typeId,
  //     })))
  //   : wait<TyService[]>(initialDelayLoader, () => services);
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
