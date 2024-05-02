// import { client } from '../utils/fetchClient';
import products from '../../public/data/products.json';
import { initialDelayLoader } from '../constants/initialDelayLoader';
import { wait } from '../helpers/common.func';
import { TyProduct, ProductCategory }
  from '../types/Products/Products';

export function getProducts() {
  return wait<TyProduct[]>(initialDelayLoader, () => products);
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
