import { getClient } from '../utils/axios.client';
import products from '../../public/data/products.json';
import { initialDelayLoader } from '../constants/initialDelayLoader';
import { wait } from '../helpers/common.func';
import { TyProduct, ProductCategory }
  from '../types/Products/Products';
import env from '../helpers/varsFromEnv';

const client = env.API_URL
  ? getClient(env.API_URL)
  : null;

export function getProducts() {
  return client
    ? client.get<TyProduct[]>('/v1/products?page=0&size=100')
      .then(res => res.data)
    : wait<TyProduct[]>(initialDelayLoader, () => products);
}

export function getProductById(items: TyProduct[], id: number) {
  return items.find(item => item.id === id);
}

export function getProductByCategory(
  items: TyProduct[],
  categoryId: ProductCategory,
) {
  return items
    .filter(item => item.categoryId === categoryId);
}

export function getWallpapers(items: TyProduct[]) {
  return getProductByCategory(items, ProductCategory.Wallpaper);
  // return client.get<TyProduct['Wallpaper'][]>('/v1/products/all/1');
}

export function getPaints(items: TyProduct[]) {
  return getProductByCategory(items, ProductCategory.Paint);
}
