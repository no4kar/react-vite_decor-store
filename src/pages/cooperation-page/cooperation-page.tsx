import React, { useEffect, useRef, useState } from 'react';
import { FormPage } from '../../components/FormPage';
import { PageNavigation } from '../../components/PageNavigation';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { Loader } from '../../components/Loader';
import './cooperation-page.scss';

export const Cooperation: React.FC = () => {
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
    <div className="cooperation">
      <div className="content">
        <div className="cooperation__nav">
          <PageNavigation />
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <>
            <section className="cooperation__first-section">
              <h2 className="title title--h2 cooperation__first-section-title">
                {`Приєднуйтеся до нас сьогодні, щоб разом створювати неповторні і вражаючі інтер'єри для наших клієнтів!`}
              </h2>

              <p className="cooperation__first-section-p">
                {`
            Запрошуємо талановитих дизайнерів і майстрів приєднатися до нашої команди для спільного розвитку та успішних проєктів! Ми пропонуємо широкий вибір декоративної штукатурки, шпалер, фарб та фотошпалер від провідних виробників. Ми цінуємо вашу креативність і професіоналізм, тому пропонуємо вам взаємовигідні умови співпраці, що включають конкурентну винагороду, підтримку та можливості для особистого зростання.
            `}
              </p>
            </section>

            <section className="cooperation__second-section">
              <div className="cooperation__second-section-info">
                <h2 className="title title--h2 cooperation__text-center">
                  Для більш детальних умов співпраці зв’яжіться з нами:
                </h2>

                <div
                  className="
              cooperation__second-section-contacts
              cooperation__text-center
            "
                >
                  <p> Телефон </p>
                  <p> +38(050)542-81-93 </p>
                </div>
              </div>

              <img
                src="/img/cooperation.png"
                alt="our work"
                className="cooperation__img"
              />
            </section>

            <div className="cooperation__form">
              <FormPage formVersion="sendMessage" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
