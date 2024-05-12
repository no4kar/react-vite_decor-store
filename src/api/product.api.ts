import { getClient } from '../utils/axios.client';
import products from '../../public/data/products.json';
import { initialDelayLoader } from '../constants/initialDelayLoader';
import { wait } from '../helpers/common.func';
import { TyProduct, ProductCategory }
  from '../types/Products/Products';
import env from '../helpers/varsFromEnv';

const client = getClient({
  baseURL: env.API_URL.concat('/v1/products'),
});

function getProducts({
  page = 0,
  size = 100,
}: {
  page?: number,
  size?: number,
} = {}) {
  return wait<TyProduct[]>(initialDelayLoader, () => products);

  return client.get<TyProduct[]>(`?page=${page}&size=${size}`)
    .then(res => res.data);
}

function getProductById(items: TyProduct[], id: number) {
  return items.find(item => item.id === id);
}

function getProductByCategory(
  items: TyProduct[],
  categoryId: ProductCategory,
) {
  return items
    .filter(item => item.categoryId === categoryId);
}

function getWallpapers(items: TyProduct[]) {
  return getProductByCategory(items, ProductCategory.Wallpaper);
  // return client.get<TyProduct['Wallpaper'][]>('/v1/products/all/1');
}

function getPaints(items: TyProduct[]) {
  return getProductByCategory(items, ProductCategory.Paint);
}

export const productApi = {
  getProducts,
  getProductById,
  getProductByCategory,
  getWallpapers,
  getPaints,
};
