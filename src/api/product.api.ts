import { AxiosError, AxiosRequestConfig } from 'axios';
import { getClient } from '../utils/axios.client';
import { TyServerResponse } from '../types/Server';
import { TyProduct, ProductCategory }
  from '../types/Product';
import env from '../helpers/varsFromEnv';

import getAllResponse from '../../public/data/products.json';
import { initialDelayLoader } from '../constants/initialDelayLoader';
import { wait } from '../helpers/common.func';

const client = getClient({
  baseURL: env.CORS_PROXY_URL.concat(env.API_URL).concat('/v1/products'),
});

client.interceptors.request.use(request => {
  // request.headers['Content-Security-Policy'] = 'upgrade-insecure-requests';
  // request.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';

  return request;
});

function getAll({
  page = 0,
  size = 100,
}: {
  page?: number,
  size?: number,
} = {},
): Promise<TyProduct.Item[]> {

  const params: TyProduct.Params = {
    page: String(page),
  };

  if (size && size > 0) {
    params.size = String(size);
  }

  return client.get<TyServerResponse<TyProduct.Item[]>>('', { params })
    .then<TyProduct.Item[]>(res => res.data.content)
    .catch((error: AxiosError) => {

      console.error(`
                  Ups
                  ${error.message}
                  ${JSON.stringify(error.response?.data)}
                  `);

      return getAllResponse.content;
    });

  return wait<TyProduct.Item[]>(initialDelayLoader, () => getAllResponse.content);
}

function getById(items: TyProduct.Item[], id: number) {
  return items.find(item => item.id === id);
}

function getFromServerByParams(params: AxiosRequestConfig['params'])
  : Promise<TyProduct.Item[]> {
  return client.get<TyServerResponse<TyProduct.Item[]>>('search', { params })
    .then<TyProduct.Item[]>(res => res.data.content);
}

function getByCategory(
  items: TyProduct.Item[],
  categoryId: ProductCategory,
) {
  return items
    .filter(item => item.categoryId === categoryId);
}

function getWallpapers(items: TyProduct.Item[]) {
  return getByCategory(items, ProductCategory.Wallpaper);
}

function getPaints(items: TyProduct.Item[]) {
  return getByCategory(items, ProductCategory.Paint);
}

export const productApi = {
  getAll,
  getById,
  getFromServerByParams,
  getByCategory,
  getWallpapers,
  getPaints,
};
