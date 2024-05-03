import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import './App.scss';

export const App = () => {
  const [isMenu, setIsMenuActive] = useState(false);
  const handleMenuBlur = useCallback(() => {
    setTimeout(() => setIsMenuActive(false), 200);
  }, []);

  useEffect(() => {
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
