import { AxiosRequestConfig } from 'axios';
import { getClient } from '../utils/axios.client';
import { initialDelayLoader } from '../constants/initialDelayLoader';
import { wait } from '../helpers/common.func';
import { TyServerResponse } from '../types/Server';
import { TyProduct, ProductCategory }
  from '../types/Products/Products';
import env from '../helpers/varsFromEnv';
import products from '../../public/data/products.json';

type TyProductParams = {
  page: string;
  size?: string
};

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
  size,
}: {
  page?: number,
  size?: number,
} = {},
): Promise<TyProduct[]> {

  if (env.API_URL) {
    const params: TyProductParams = {
      page: String(page),
    };

    if (size && size > 0) {
      params.size = String(size);
    }

    return client
      .get<TyServerResponse<TyProduct[]>>('', { params })
      .then<TyProduct[]>(res => res.data.content);
  }

  return wait<TyProduct[]>(initialDelayLoader, () => products);
}

function getById(items: TyProduct[], id: number) {
  return items.find(item => item.id === id);
}

function getFromServerByParams(params: AxiosRequestConfig['params'])
  : Promise<TyProduct[]> {
  return client.get<TyServerResponse<TyProduct[]>>('search', { params })
    .then<TyProduct[]>(res => res.data.content);
}

function getByCategory(
  items: TyProduct[],
  categoryId: ProductCategory,
) {
  return items
    .filter(item => item.categoryId === categoryId);
}

function getWallpapers(items: TyProduct[]) {
  return getByCategory(items, ProductCategory.Wallpaper);
}

function getPaints(items: TyProduct[]) {
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
