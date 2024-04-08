import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageNavigation } from '../../components/PageNavigation';
import { FormPage } from '../../components/FormPage';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { Loader } from '../../components/Loader';
import './contacts.page.scss';

export const Contacts: React.FC = () => {
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
    <div className="contactsPage">
      <div className="content">
        <div className="contactsPage__nav">
          <PageNavigation />
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <>
            <section className="contactsPage__info">
              <img
                src="img/contacts-page.png"
                alt="nice img"
                className="contactsPage__img"
              />

              <ul className="contactsPage__list ">
                <li className="contactsPage__item">
                  <span className="contactsPage__label">Адреса</span>
                  {/* eslint-disable max-len */}
                  <Link
                    to="https://www.google.com/maps?sca_esv=85af15397c77c0f6&output=search&q=%D0%9A%D0%B8%D1%97%D0%B2,+%D0%B2%D1%83%D0%BB.+%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D0%B8%D0%BD%D1%81%D1%8C%D0%BA%D0%B0,+8&source=lnms&entry=mc"
                    className="contactsPage__link contactsPage__link--contacts"
                    target="_blank"
                  >
                    Київ, вул. Алматинська, 8
                  </Link>
                </li>
                <li className="contactsPage__item">
                  <span className="contactsPage__label">Телефон</span>
                  <Link
                    to="tel:+380505428193"
                    className="contactsPage__link contactsPage__link--contacts"
                  >
                    +38(050)542-81-93
                  </Link>
                </li>
                <li className="contactsPage__item">
                  <span className="contactsPage__label">E-mail</span>
                  <Link
                    to="mailto:email@gmail.com"
                    className="fcontactsPage__link contactsPage__link--contacts"
                  >
                    email@gmail.com
                  </Link>
                </li>
              </ul>
            </section>

            <FormPage formVersion="consultation" />
          </>
        )}
      </div>
    </div>
  );
};
