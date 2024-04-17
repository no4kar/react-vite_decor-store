// import { client } from '../utils/fetchClient';
import products from '../../public/data/products.json';
import { TyProduct, ProductCategory }
  from '../types/Products/Products';

export function getProducts() {
  return products as TyProduct[];
}

export function getProductById(id: number) {
  return (products as TyProduct[]).find(
    product => product.id === id,
  );
}

export function getWallpapers(items: TyProduct[]) {
  return items.filter(
    item => item.categoryId === ProductCategory.Wallpaper);
  // return client.get<TyProduct['Wallpaper'][]>('/v1/products/all/1');
}
