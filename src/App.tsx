import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import './App.scss';
import { useProductStore } from './store/product.store';
import { useServiceStore } from './store/service.store';

export const App = () => {
  console.log('render');

  const [isMenu, setIsMenuActive] = useState(false);
  const handleMenuBlur = useCallback(() => {
    setTimeout(() => setIsMenuActive(false), 200);
  }, []);
  const productStore = useProductStore();
  const serviceStore = useServiceStore();

  useEffect(() => {
    productStore.fetchData();
    serviceStore.fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="
     flex flex-col min-h-full"
    >
      <Header
        isMenu={isMenu}
        toggleMenu={setIsMenuActive}
      />

      <main>
        <ScrollToTop />
        {isMenu && <Menu onBlur={handleMenuBlur} />}

        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
