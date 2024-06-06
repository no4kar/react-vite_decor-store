import { Button } from '../../../../components/Button';
import './Introduction.scss';

export const Introduction = () => {
  return (
    <section
      className="
      relative
    bg-black"
    >
      <div className="
      static
      w-full h-80
      bg-cover bg-no-repeat bg-center
      sm:absolute sm:w-[50%]
      sm:left-[50%] sm:h-full
      introduction__poster"
      />

      <div
        className="
    content
    grid grid-cols-6 gap-x-6
    sm:gap-x-10
    "
      >
        <div
          className="
        px-5 py-8
        col-span-6
        flex flex-col gap-12 items-center
        sm:col-span-3 sm:col-start-1 sm:items-start
        sm:px-0 sm:pt-10 sm:pb-20
        md:pt-[130px] md:pb-[200px]
        "
        >
          <h1 className="
          text-center text-4xl text-gray-300
          sm:text-left
          md:text-5xl"
          >
            Наші декоративні рішення зроблять ваш простір особливим
          </h1>

          <p className="
          text-center text-base font-light text-gray-300
          sm:text-left
          md:text-lg"
          // title--light
          >
            Наш дизайн перетворить будь-який інтер&apos;єр у вишуканий образ,
            втілюючи ваші мрії в реальність
          </p>

          <div className="w-2/3 h-12">
            <Button type="button" $primary path="service_decorative">
              Детальніше
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
