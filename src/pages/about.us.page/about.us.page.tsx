import { PageNavigation } from '../../components/PageNavigation';
import { FormComponent2 } from '../../components/FormComponent/FormComponent2';
import './about.us.page.scss';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="py-6 sm:py-20 md:py-24
      content content__grid gap-y-6 sm:gap-y-10 md:gap-y-16">
      <div className="col-start-1 col-end-[-1]">
        <PageNavigation />
      </div>

      <article className="col-span-2 sm:col-start-2 sm:col-span-5
          md:col-start-2 md:col-span-5 md:self-center">
        <div className="flex flex-col gap-8">
          <h1 className="title--h1">
            {` Хто ми такі? `}
          </h1>

          <p className="title--body">
            Ми - компанія професіоналів.
            <br />
            {`
              Наш основний вид діяльності - нанесення та розробка декоративних покриттів будь-якої складності.
            `}
            <br />
            Працюємо у м. Київ та область. Виїзд Україною за домовленістю.
          </p>
        </div>
      </article>

      <img
        src="./img/about-us.png"
        alt="It is me"
        className="w-full aspect-square object-contain
            col-span-2 sm:col-span-3 md:col-start-1 md:col-span-5"
      />

      <div className="col-span-2 self-center sm:col-span-3
          md:col-start-7 md:col-span-5">
        <p className="title--body">
          {` Всі роботи представлені на сайті зроблені виключно нашими майстрами. `}
        </p>
        <br />
        <p className="title--body">
          {` Також розробляємо декоративні техніки нанесення покриттів індивідуально під проект дизайнера.
                Професійне фарбування стель, ліпнини, великих площин, фасадів, фактурних, рельєфних поверхонь, методом напилення. `}
        </p>
      </div>

      <div className="col-span-2 self-center sm:col-span-3
          md:col-start-2 md:col-span-4">
        <div className="flex flex-col gap-8">
          <h2 className="title--h2">Замовити консультацію</h2>
          <p className="title--body">Заповніть форму і ми зв’яжемося з вами найближчим часом</p>
        </div>
      </div>

      <div className="col-span-2 sm:col-span-3 md:col-start-7 md:col-span-5">
        <FormComponent2 formVersion="consultation" />
      </div>
    </div>
  );
};
