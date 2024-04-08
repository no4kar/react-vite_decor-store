import { advantages } from '../../../../constants/advantages';
import { AdvantageItem } from './Advantage';

import './Advantages.scss';
import { Slider } from '../../../../components/Slider';

export const Advantages = () => {
  return (
    <section className="advantages">
      <div className="advantages__content content">
        <h2 className="advantages__title">Наші переваги</h2>

        <Slider
          Slide={AdvantageItem}
          slides={advantages}
          classParent="advantages"
        />
      </div>
    </section>
  );
};
