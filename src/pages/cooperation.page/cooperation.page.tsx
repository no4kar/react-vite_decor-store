import { FormComponent2 } from '../../components/FormComponent/FormComponent2';
import { PageNavigation } from '../../components/PageNavigation';
import './cooperation.page.scss';

export const Cooperation: React.FC = () => {
  return (
    <div className="py-6 sm:py-20 md:py-24
      content content__grid gap-y-6 sm:gap-y-10 md:gap-y-16">
      <div className="col-start-1 col-end-[-1]">
        <PageNavigation />
      </div>

      <h2 className="col-span-2 sm:col-span-6 md:col-start-2 md:col-span-7
          title--h2 text-center sm:text-justify md:text-left">
        {`Приєднуйтеся до нас сьогодні, щоб разом створювати неповторні і вражаючі інтер'єри для наших клієнтів!`}
      </h2>

      <p className="col-span-2 sm:col-span-6 md:col-start-2 md:col-span-5
          title--body text-justify md:text-left">
        {`
            Запрошуємо талановитих дизайнерів і майстрів приєднатися до нашої команди для спільного розвитку та успішних проєктів! Ми пропонуємо широкий вибір декоративної штукатурки, шпалер, фарб та фотошпалер від провідних виробників. Ми цінуємо вашу креативність і професіоналізм, тому пропонуємо вам взаємовигідні умови співпраці, що включають конкурентну винагороду, підтримку та можливості для особистого зростання.
            `}
      </p>

      <div className="col-span-2 sm:col-span-3 md:col-start-2 md:col-span-5
          self-center flex flex-col items-center sm:items-start"
      >
        <h2 className="title--h2 text-center sm:text-left">
          Для більш детальних умов співпраці зв’яжіться з нами:
        </h2>

        <p className="mt-8 title--body">Телефон</p>
        <h3 className="mt-6 title--h3">+38(050)542-81-93</h3>
      </div>

      <img
        src="./img/cooperation.png"
        alt="our work"
        className="w-fill aspect-square object-contain
            col-span-2 sm:col-span-3 md:col-start-8 md:col-span-5"
      />

      <div className="col-span-2 self-center sm:col-span-3
          md:col-start-2 md:col-span-4">
        <div className="flex flex-col gap-8">
          <h2 className="title--h2">Або напишіть нам</h2>
          <p className="title--body">Заповніть форму і ми зв’яжемося з вами найближчим часом</p>
        </div>
      </div>

      <div className="col-span-2 sm:col-span-3 md:col-start-7 md:col-span-5">
        <FormComponent2 formVersion="sendMessage" />
      </div>
    </div>
  );
};
