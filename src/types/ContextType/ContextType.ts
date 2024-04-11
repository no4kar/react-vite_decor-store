import { TyService } from '../Services/Services';

export type ContextType = {
  productsService: TyService[];
  localStore: TyService[];
  setLocalStore: (v: TyService[]) => void;
  handleChooseCart: (card: TyService, action: string) => void;
};
