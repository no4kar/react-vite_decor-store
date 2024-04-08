import { products } from '../../../../constants/products';
import { SlideFirst } from '../../../../components/SlideFirst';

import './Products.scss';
import { Slider } from '../../../../components/Slider';

export const Products = () => {
  return (
    <section className="products">
      <div className="products__content content">
        <Slider Slide={SlideFirst} slides={products} classParent="advantages" />
      </div>
    </section>
  );
};
