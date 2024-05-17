import { getClient } from '../utils/axios.client';
import products from '../../public/data/products.json';
import { initialDelayLoader } from '../constants/initialDelayLoader';
import { wait } from '../helpers/common.func';
import { TyProduct, ProductCategory }
  from '../types/Products/Products';
import env from '../helpers/varsFromEnv';
import { TyServerResponse } from '../types/Server';

const client = getClient({
  baseURL: env.API_URL.concat('/v1/products'),
});

function getProducts({
  page = 0,
  size,
}: {
  page?: number,
  size?: number,
} = {},
): Promise<TyProduct[]> {
  if (env.API_URL) {
    return client
      .get('', { params: { page: String(page), size: String(size) } })
      .then<TyServerResponse<TyProduct[]>>(res => res.data)
      .then<TyProduct[]>(data => data.content);
  }

  return wait<TyProduct[]>(initialDelayLoader, () => products);
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
