import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as serviceApi from '../api/service.api';
import * as productApi from '../api/product.api';
import { TyService as TySelected } from '../types/Services/Services';

export const GlobalContext = React.createContext<{
  productsService: TySelected[];
  localStore: TySelected[];
  setLocalStore: (v: TySelected[]) => void;
  handleChooseCart: (card: TySelected, action: string) => void;
}>({
  productsService: [],
  localStore: [],
  setLocalStore: () => { },
  handleChooseCart: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [localSelected, setLocalSelected] = useLocalStorage<TySelected[]>(
    'selected',
    [],
  );

  useEffect(() => {
    const selectedProducts = productApi.getProducts()
      .filter((product) => localSelected.find(e => product.id === e.id));

    setSelected(selectedProducts);
  }, []);

  const handleChooseCart = <T extends TySelected>(card: T, action: string) => {
    const currentProducts = [...selected];
    let currentStore = [...localSelected];
    let updatedCard: T = { ...card };

    if (action === 'addCard') {
      updatedCard = { ...card, inCart: !card.inCart };
    }

    if (action === 'favourites') {
      updatedCard = { ...card, inFavourite: !card.inFavourite };
    }

    if (action === 'delete') {
      updatedCard = { ...card, inCart: false };
    }

    if (action === 'increase' && updatedCard.quantity) {
      updatedCard = { ...card, quantity: updatedCard.quantity + 1 };
    }

    if (action === 'decrease' && updatedCard.quantity) {
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

    setSelected(currentProducts);
    setLocalSelected(currentStore);
  };

  const value = {
    productsService: selected,
    localStore: localSelected,
    setLocalStore: setLocalSelected,
    handleChooseCart,
  };

  return (
    <GlobalContext.Provider value={value}> {children} </GlobalContext.Provider>
  );
};
