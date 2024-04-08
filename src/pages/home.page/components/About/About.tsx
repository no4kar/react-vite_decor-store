import './About.scss';

export const About = () => {
  return (
    <section className="about">
      <div className="about__content content">
        <img src="/img/about.png" alt="Interior" className="about__img" />

        <div className="about__info">
          <h4 className="about__label">Про нас</h4>

          <h2 className="about__title">Сучасність та простота</h2>

          <p className="about__description">
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
