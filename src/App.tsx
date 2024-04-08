import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import './App.scss';

export const App = () => {
  const [isMenu, setIsMenuActive] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Header isMenu={isMenu} toggleMenu={setIsMenuActive} />

      <ScrollToTop />
      {isMenu && <Menu />}

      <Outlet />

      <Footer />
    </div>
  );
};
