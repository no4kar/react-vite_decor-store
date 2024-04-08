import { Button } from '../../../../components/Button';
import './Introduction.scss';

export const Introduction = () => {
  return (
    <section className="introduction">
      <div className="introduction__content">
        <div className="introduction__poster" />

        <div className="introduction__info">
          <h1 className="introduction__title">
            Наші декоративні рішення зроблять ваш простір особливим
          </h1>

          <p className="introduction__description">
            Наш дизайн перетворить будь-який інтер&apos;єр у вишуканий образ,
            втілюючи ваші мрії в реальність
          </p>

          <Button type="button" $primary path="service_decorative">
            Детальніше
          </Button>
        </div>
      </div>
    </section>
  );
};
