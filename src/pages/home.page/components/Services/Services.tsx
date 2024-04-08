import { services } from '../../../../constants/services';
import { SlideFirst } from '../../../../components/SlideFirst';

import './Services.scss';
import { Slider } from '../../../../components/Slider';

export const Services = () => {
  return (
    <section className="services">
      <div className="services__content content">
        <Slider Slide={SlideFirst} slides={services} classParent="advantages" />
      </div>
    </section>
  );
};
