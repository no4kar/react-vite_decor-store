import { ServiceProducts } from '../ServiceProducts/ServiceProducts';

export type ContextType = {
  productsService: ServiceProducts[];
  localStore: ServiceProducts[];
  setLocalStore: (v: ServiceProducts[]) => void;
  handleChooseCart: (card: ServiceProducts, action: string) => void;
};
