import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as serviceApi from '../api/service.api';
import { ServiceProducts } from '../types/ServiceProducts/ServiceProducts';
import { ContextType } from '../types/ContextType/ContextType';

export const GlobalContext = React.createContext<ContextType>({
  productsService: [],
  localStore: [],
  setLocalStore: () => {},
  handleChooseCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [localStore, setLocalStore] = useLocalStorage<ServiceProducts[]>(
    'products',
    [],
  );
  const [productsService, setProductsService] = useState<ServiceProducts[]>([]);

  useEffect(() => {
    const updatedProducts = serviceApi.getServices().map(item => {
      const elem = localStore.find(e => item.id === e.id);

      if (elem) {
        return elem;
      }

      return {
        ...item,
        inFavourite: false,
        inCart: false,
        quantity: 1,
      };
    });

    setProductsService(updatedProducts);
  }, []);

  const handleChooseCart = (card: ServiceProducts, action: string) => {
    const currentProducts = [...productsService];
    let currentStore = [...localStore];
    let updatedCard: ServiceProducts = { ...card };

    if (action === 'addCard') {
      updatedCard = { ...card, inCart: !card.inCart };
    }

    if (action === 'favourites') {
      updatedCard = { ...card, inFavourite: !card.inFavourite };
    }

    if (action === 'delete') {
      updatedCard = { ...card, inCart: false };
    }

    if (action === 'addQuantity' && updatedCard.quantity) {
      updatedCard = { ...card, quantity: updatedCard.quantity + 1 };
    }

    if (action === 'deleteQuantity' && updatedCard.quantity) {
      updatedCard = { ...card, quantity: updatedCard.quantity - 1 };
    }

    if (!updatedCard.inCart && !updatedCard.inFavourite) {
      currentStore = currentStore.filter(el => el.id !== updatedCard.id);
    } else {
      const indexStore = currentStore.findIndex(
        storeEl => storeEl.id === card.id,
      );

      if (indexStore !== -1) {
        currentStore.splice(indexStore, 1, updatedCard);
      } else {
        currentStore = [...currentStore, updatedCard];
      }
    }

    const index = currentProducts.findIndex(el => el.id === card.id);

    currentProducts.splice(index, 1, updatedCard);

    setProductsService(currentProducts);
    setLocalStore(currentStore);
  };

  const value = {
    productsService,
    localStore,
    setLocalStore,
    handleChooseCart,
  };

  return (
    <GlobalContext.Provider value={value}> {children} </GlobalContext.Provider>
  );
};
