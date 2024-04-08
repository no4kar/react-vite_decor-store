import { About } from './components/About';
import { Introduction } from './components/Introduction';
import { Gallery } from './components/Gallery';
import { Advantages } from './components/Advantages';
import { Services } from './components/Services';
import { Products } from './components/Products';
import { FormHome } from './components/FormHome';
import './home-page.scss';

export const HomePage = () => {
  return (
    <main className="home-page">
      <Introduction />
      <About />
      <Services />
      <Gallery />
      <Advantages />
      <Products />
      <FormHome />
    </main>
  );
};
