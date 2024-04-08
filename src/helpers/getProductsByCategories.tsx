import { ServiceProducts } from '../types/ServiceProducts/ServiceProducts';

export const getCartFavorites = (localStore: ServiceProducts[]) => {
  return localStore.filter(el => el.inFavourite);
};

export const getCartBaskets = (localStore: ServiceProducts[]) => {
  return localStore.filter(el => el.inCart);
};

export function getServiceDecorative(
  products: ServiceProducts[],
  category: number,
) {
  const visibleProducts = products.filter(el => el.category === category);

  return visibleProducts;
}
