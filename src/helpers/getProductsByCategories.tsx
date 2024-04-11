import { TyService as Product } from '../types/Services/Services';

export const getCartFavorites = (localStore: Product[]) => {
  return localStore.filter(el => el.inFavourite);
};

export const getCartBaskets = (localStore: Product[]) => {
  return localStore.filter(el => el.inCart);
};

export function getServiceDecorative(
  products: Product[],
  category: number,
) {
  const visibleProducts = products.filter(el => el.category === category);

  return visibleProducts;
}
