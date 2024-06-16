import { Link } from 'react-router-dom';
import { PageNavigation } from '../../components/PageNavigation';
import { FormComponent2 } from '../../components/FormComponent/FormComponent2';
import './contacts.page.scss';

export const Contacts: React.FC = () => {
  return (
    <div className="py-6 sm:py-20 md:py-24
      content content__grid gap-y-6 sm:gap-y-10 md:gap-y-16">
      <div className="col-start-1 col-end-[-1]">
        <PageNavigation />
      </div>

      <img
        src="img/contacts-page.png"
        alt="nice img"
        className="w-full aspect-square object-contain
            col-span-2 sm:col-span-3 md:col-start-1 md:col-span-5"
      />

      <div className="col-span-2 self-center sm:col-span-3 md:col-start-7 md:col-end-[-1]">
        <ul className="flex flex-col gap-8 sm:gap-10 md:gap-16">
          <li className="contactsPage__item">
            <p className="title--body">Адреса</p>
            <Link
              to="https://www.google.com/maps?sca_esv=85af15397c77c0f6&output=search&q=%D0%9A%D0%B8%D1%97%D0%B2,+%D0%B2%D1%83%D0%BB.+%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D0%B8%D0%BD%D1%81%D1%8C%D0%BA%D0%B0,+8&source=lnms&entry=mc"
              className="title--h4"
              target="_blank"
            >
              Київ, вул. Алматинська, 8
            </Link>
          </li>

          <li className="contactsPage__item">
            <p className="title--body">Телефон</p>
            <Link
              to="tel:+380505428193"
              className="title--h4"
            >
              +38(050)542-81-93
            </Link>
          </li>

          <li className="contactsPage__item">
            <p className="title--body">E-mail</p>
            <Link
              to="mailto:decorativka@dekorativka.ua"
              className="title--h4 uppercase"
            >
              decorativka@dekorativka.ua
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-span-2 self-center sm:col-span-3
          md:col-start-2 md:col-span-4">
        <div className="flex flex-col gap-8">
          <h2 className="title--h2">Замовити консультацію</h2>
          <p className="title--body">Заповніть форму і ми зв’яжемося з вами найближчим часом</p>
        </div>
      </div>

      <div className="col-span-2 sm:col-span-3 md:col-start-7 md:col-end-[-1]">
        <FormComponent2 formVersion="consultation" />
      </div>
    </div>
  );
};
