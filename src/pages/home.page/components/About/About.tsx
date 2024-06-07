import './About.scss';

export const About = () => {
  return (
    <section className="about">
      <div
        className="content content__grid
      gap-y-5
      sm:gap-y-0"
      >
        <img
          src="./img/about.png"
          alt="Interior"
          className="w-full object-cover col-span-2 aspect-[336/282]
          sm:h-auto sm:aspect-square sm:col-span-3
          md:col-start-2 md:col-span-5"
        />

        <div className="col-span-2 my-auto flex flex-col gap-5 items-center
        sm:col-span-3 sm:items-start
        md:col-start-8 md:col-span-4"
        >
          <h4 className="about__label">Про нас</h4>

          <h2 className="about__title text-center sm:text-start">Сучасність та простота</h2>

          <p className="about__description text-justify sm:text-start">
            Ми спеціалізуємося на створенні просторів, які вражають своєю
            оригінальністю та водночас простим, сучасним дизайном. Наша команда
            майстрів вміло поєднує мистецтво декору та технічні знання для того,
            щоб ваші ідеї стали реальністю.
          </p>
        </div>
      </div>
    </section>
  );
};
