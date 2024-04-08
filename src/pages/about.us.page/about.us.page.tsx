import React, { useEffect, useRef, useState } from 'react';
import { PageNavigation } from '../../components/PageNavigation';
import { FormPage } from '../../components/FormPage';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import './about.us.page.scss';
import { Loader } from '../../components/Loader';

export const AboutUsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const timerId = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, initialDelayLoader);
  }, []);

  return (
    <div className="aboutUsPage">
      <div className="content">
        <div className="aboutUsPage__nav">
          <PageNavigation />
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <>
            <section className="aboutUsPage__info">
              <article className="aboutUsPage__first-article">
                <h1 className="title title--h1 aboutUsPage__title">
                  {` Хто ми такі? `}
                </h1>

                <p>
                  Ми - компанія професіоналів.
                  <br />
                  {`
              Наш основний вид діяльності - нанесення та розробка декоративних покриттів будь-якої складності.
            `}
                  <br />
                  Працюємо у м. Київ та область. Виїзд Україною за домовленістю.
                </p>
              </article>

              <article className="aboutUsPage__second-article">
                <img
                  src="/img/about-us.png"
                  alt="It is me"
                  className="aboutUsPage__img"
                />

                <div className="description">
                  <p>
                    {` Всі роботи представлені на сайті зроблені виключно нашими майстрами. `}
                  </p>
                  <br />
                  <p>
                    {` Також розробляємо декоративні техніки нанесення покриттів індивідуально під проект дизайнера.
                Професійне фарбування стель, ліпнини, великих площин, фасадів, фактурних, рельєфних поверхонь, методом напилення. `}
                  </p>
                </div>
              </article>
            </section>

            <FormPage formVersion="consultation" />
          </>
        )}
      </div>
    </div>
  );
};
