import { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './Menu.scss';

export const Menu = () => {
  const [isOpenServices, setIsOpenServices] = useState(false);
  const [isOpenProducts, setIsOpenProducts] = useState(false);

  return (
    <aside className="menu">
      <div className="menu__content">
        <ul className="menu__categorys">
          <li className="menu__category-item">
            <button
              type="button"
              className="menu__category-btn"
              onClick={() => setIsOpenServices(!isOpenServices)}
            >
              <div className="menu__category-title">
                <h4
                  className={classNames('menu__category-name', {
                    'menu__category-name--is-active': isOpenServices,
                  })}
                >
                  Послуги
                </h4>

                <div
                  className={classNames('icon', 'icon__arrow-blue', {
                    'icon__arrow-blue--up': isOpenServices,
                  })}
                />
              </div>
            </button>

            {isOpenServices && (
              <ul className="menu__subcategorys">
                <li className="menu__subcategory-item">
                  <Link to="/service_decorative">
                    <p className="menu__subcategory-name">
                      Нанесення декоративного покриття
                    </p>
                  </Link>
                </li>

                <li className="menu__subcategory-item">
                  <Link to="/service_hang_wallpaper">
                    <p className="menu__subcategory-name">Поклейка шпалер</p>
                  </Link>
                </li>

                <li className="menu__subcategory-item">
                  <Link to="/paint_tinting">
                    <p className="menu__subcategory-name">Тонування фарб</p>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="menu__category-item">
            <button
              type="button"
              className="menu__category-btn"
              onClick={() => setIsOpenProducts(!isOpenProducts)}
            >
              <div className="menu__category-title">
                <h4
                  className={classNames('menu__category-name', {
                    'menu__category-name--is-active': isOpenProducts,
                  })}
                >
                  Продукція
                </h4>

                <div
                  className={classNames('icon', 'icon__arrow-blue', {
                    'icon__arrow-blue--up': isOpenProducts,
                  })}
                />
              </div>
            </button>

            {isOpenProducts && (
              <ul className="menu__subcategorys">
                <li className="menu__subcategory-item">
                  <Link to="/wallpaper">
                    <p className="menu__subcategory-name">Шпалери</p>
                  </Link>
                </li>

                <li className="menu__subcategory-item">
                  <Link to="/paint">
                    <p className="menu__subcategory-name">Фарба</p>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="menu__category-item">
            <div className="menu__category-title">
              <Link to="/about_us">
                <h4 className="menu__category-name">Про нас</h4>
              </Link>
            </div>
          </li>

          <li className="menu__category-item">
            <div className="menu__category-title">
              <Link to="/contacts">
                <h4 className="menu__category-name">Контакти</h4>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};
