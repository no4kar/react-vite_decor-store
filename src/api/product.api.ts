import { client } from '../utils/fetchClient';
import products from '../../public/data/products.json';
import { TyProduct } from '../types/Products/WallpaperProducts';

export function getProducts() {
  return products as TyProduct['Wallpaper'][];
}

export function getProductById(id: number) {
  return (products as TyProduct['Wallpaper'][]).find(
    product => product.id === id,
  );
}

export function getWallpaper() {
  return client.get<TyProduct['Wallpaper'][]>('/v1/products/all/1');
}
