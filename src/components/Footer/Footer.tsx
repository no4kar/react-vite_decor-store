import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../Modal/Modal';
import { footerData } from '../../constants/footerData';
import './Footer.scss';

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState({
    title: '',
    description: '',
  });

  return (
    <footer className="footer">
      <div className="content footer__content">
        <div className="footer__top">
          <Link to="/" className="footer__logo">
            <img src="../../../icons/logo.svg" alt="logo" className="logo" />
          </Link>

          <div className="footer__info">
            <section className="footer__section">
              <h4 className="title title--h4"> Полсуги </h4>

              <ul className="footer__list">
                <li className="footer__item">
                  <Link to="/service_decorative" className="footer__link">
                    Нанесення декоративного покриття{' '}
                  </Link>
                </li>
                <li className="footer__item">
                  <Link to="/service_hang_wallpaper" className="footer__link">
                    Поклейка шпалер{' '}
                  </Link>
                </li>
                <li className="footer__item">
                  <Link to="#" className="footer__link">
                    Тонування фарб{' '}
                  </Link>
                </li>
              </ul>
            </section>

            <section className="footer__section">
              <h4 className="title title--h4"> Продукція </h4>

              <ul className="footer__list">
                <li className="footer__item">
                  <Link to="/wallpaper" className="footer__link">
                    Шпалери{' '}
                  </Link>
                </li>
                <li className="footer__item">
                  <Link to="#" className="footer__link">
                    Фарби{' '}
                  </Link>
                </li>
              </ul>
            </section>

            <section className="footer__section">
              <h4 className="title title--h4"> Інформація </h4>

              <ul className="footer__list">
                {footerData.map(el => (
                  <li className="footer__item" key={el.title}>
                    <button
                      type="button"
                      className="footer__button"
                      onClick={() => {
                        setIsModalOpen(true);
                        setDescription({
                          title: el.title,
                          description: el.description,
                        });
                      }}
                    >
                      {el.title}
                    </button>
                  </li>
                ))}
                <Link to="/cooperation" className="footer__link">
                  Співпраця
                </Link>
              </ul>
            </section>

            <section className="footer__section">
              <h4 className="title title--h4"> Контакти </h4>

              <ul className="footer__list ">
                <li className="footer__item">
                  <span className="footer__label">Адреса</span>
                  {/* eslint-disable max-len */}
                  <Link
                    to="https://www.google.com/maps?sca_esv=85af15397c77c0f6&output=search&q=%D0%9A%D0%B8%D1%97%D0%B2,+%D0%B2%D1%83%D0%BB.+%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D0%B8%D0%BD%D1%81%D1%8C%D0%BA%D0%B0,+8&source=lnms&entry=mc"
                    className="footer__link footer__link--contacts"
                    target="_blank"
                  >
                    Київ, вул. Алматинська, 8
                  </Link>
                </li>
                <li className="footer__item">
                  <span className="footer__label">Телефон</span>
                  <Link
                    to="tel:+380505428193"
                    className="footer__link footer__link--contacts"
                  >
                    +38(050)542-81-93{' '}
                  </Link>
                </li>
                <li className="footer__item">
                  <span className="footer__label">E-mail</span>
                  <Link
                    to="mailto:email@gmail.com"
                    className="footer__link footer__link--contacts"
                  >
                    email@gmail.com{' '}
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__icons-box">
            <Link
              to="https://www.tiktok.com/ru-RU/"
              target="_blank"
              className="icon icon--tik-tok icon--hover"
            />
            <Link
              to="https://www.instagram.com/"
              target="_blank"
              className="icon icon--instagram icon--hover"
            />
            <Link
              to="https://www.facebook.com/"
              target="_blank"
              className="icon icon--facebook icon--hover"
            />
          </div>

          <div className="footer__copyright">
            ©2024 - Decorativka_UKR. Всі права захищені.
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          text={description}
        />
      </div>
    </footer>
  );
};
