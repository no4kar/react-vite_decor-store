import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import './App.scss';
import { useProductStore } from './store/product.store';
import { useServiceStore } from './store/service.store';

export const App = () => {
  const productStore = useProductStore();
  const serviceStore = useServiceStore();

  React.useEffect(() => {
    productStore.fetchData();
    serviceStore.fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="
      flex flex-col
      min-h-full"
    >
      <ScrollToTop />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
