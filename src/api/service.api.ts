import { AxiosError, AxiosRequestConfig } from 'axios';
import { getClient } from '../utils/axios.client';
import services from '../../public/data/services.json';
import { ServiceCategory, TyService } from '../types/Services/Services';
// import { wait } from '../helpers/common.func';
// import { initialDelayLoader } from '../constants/initialDelayLoader';
import env from '../helpers/varsFromEnv';
import { TyServerResponse } from '../types/Server';

type TyServiceParams = {
  page: string;
  size?: string
};

const client = getClient({
  baseURL: env.API_URL.concat('/v1/offers'),
});

// const normalize = ({ typeId, ...rest }: { typeId: number, rest: any[] }) =>
//   ({ ...rest, categoryId: typeId, });

function getAll({
  page = 0,
  size = 100,
}: {
  page?: number,
  size?: number,
} = {}): Promise<TyService[]> {

  const params: TyServiceParams = {
    page: String(page),
  };

  if (size && size > 0) {
    params.size = String(size);
  }

  return client
    .get<TyServerResponse<TyService[]>>('', { params })
    .then<TyService[]>(res => res.data.content)
    .catch((error: AxiosError) => {

      console.error(`
                  Ups
                  ${error.message}
                  ${JSON.stringify(error.response?.data)}
                  `);

      return services;
    });

  // return wait<TyService[]>(initialDelayLoader, () => services);
}

function getById(items: TyService[], id: number) {
  return items.find(item => item.id === id);
}

function getFromServerByParams(params: AxiosRequestConfig['params'])
  : Promise<TyService[]> {
  return client.get<TyServerResponse<TyService[]>>('search', { params })
    .then<TyService[]>(res => res.data.content);
}

function getByCategory(
  items: TyService[],
  categoryId: ServiceCategory,
) {

  console.info(items.filter(item => item.categoryId === categoryId));

  return items
    .filter(item => item.categoryId === categoryId);
}


export const serviceApi = {
  getAll,
  getById,
  getFromServerByParams,
  getByCategory,
};
