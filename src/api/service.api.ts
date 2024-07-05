import { AxiosError, AxiosRequestConfig } from 'axios';
import { getClient } from '../utils/axios.client';
import { ServiceCategory, TyService } from '../types/Service';
import env from '../helpers/varsFromEnv';
import { TyServerResponse } from '../types/Server';

import getAllResponse from '../../public/data/services.json';
import { initialDelayLoader } from '../constants/initialDelayLoader';
import { wait } from '../helpers/common.func';

const client = getClient({
  baseURL: env.API_URL.concat('/v1/offers'),
});

function getAll({
  page = 0,
  size = 100,
}: {
  page?: number,
  size?: number,
} = {}): Promise<TyService.Item[]> {

  const params: TyService.Params = {
    page: String(page),
  };

  if (size && size > 0) {
    params.size = String(size);
  }

  return client.get<TyServerResponse<TyService.Item[]>>('', { params })
    .then<TyService.Item[]>(res => res.data.content)
    .catch((error: AxiosError) => {

      console.error(`
                  Ups
                  ${error.message}
                  ${JSON.stringify(error.response?.data)}
                  `);

      return getAllResponse.content;
    });

  return wait<TyService.Item[]>(initialDelayLoader, () => getAllResponse.content);
}

function getById(items: TyService.Item[], id: number) {
  return items.find(item => item.id === id);
}

function getFromServerByParams(params: AxiosRequestConfig['params'])
  : Promise<TyService.Item[]> {
  return client.get<TyServerResponse<TyService.Item[]>>('search', { params })
    .then<TyService.Item[]>(res => res.data.content);
}

function getByCategory(
  items: TyService.Item[],
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
