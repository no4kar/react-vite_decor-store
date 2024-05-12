import { getClient } from '../utils/axios.client';
import services from '../../public/data/services.json';
import { ServiceCategory, TyService } from '../types/Services/Services';
import { wait } from '../helpers/common.func';
import { initialDelayLoader } from '../constants/initialDelayLoader';
import env from '../helpers/varsFromEnv';

const client = getClient({
  baseURL: env.API_URL.concat('/v1/offers'),
});

const normalize = ({ typeId, ...rest }: { typeId: number, rest: any[] }) =>
  ({ ...rest, categoryId: typeId, });

function getServices({
  page = 0,
  size = 100,
}: {
  page?: number,
  size?: number,
} = {}): Promise<TyService[]> {
  return wait<TyService[]>(initialDelayLoader, () => services);

  return client.get('', { params: { page: String(page), size: String(size) } })
    .then<TyService[]>(res => res.data.map(normalize));
}

function getServiceById(items: TyService[], id: number) {
  return items.find(item => item.id === id);
}

function getServiceByCategory(
  items: TyService[],
  categoryId: ServiceCategory,
) {
  return items
    .filter(item => item.categoryId === categoryId);
}


export const serviceApi = {
  getServices,
  getServiceById,
  getServiceByCategory,
};
