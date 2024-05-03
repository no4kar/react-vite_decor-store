/* eslint-disable jsx-a11y/control-has-associated-label */
// or you can add aria-label on 153
import React, { useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import './Header.scss';
import { useFavoriteStore } from '../../store/favourite.store';
import { useCartStore } from '../../store/cart.store';

type Props = {
  isMenu: boolean;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ isMenu, toggleMenu }) => {
  const [isOpenServices, setIsOpenServices] = useState(false);
  const [isOpenProducts, setIsOpenProducts] = useState(false);
  const { items: cartFavorits } = useFavoriteStore(state => state);
  const { items: cartBaskets } = useCartStore(state => state);

  const handleCategoryBlur = (
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    return () => {
      setTimeout(() => setIsOpen(false), 200);
    };
  };

  return (
    <header className="header">
      <div className="header__content content">
        <nav className="header__nav">
          <Link to="/">
            <img src="./icons/logo.svg" alt="logo" className="logo" />
          </Link>

          <ul className="header__categorys">
            <li className="header__category-item">
              <button
                type="button"
                className="header__category-btn"
                onClick={() => setIsOpenServices(!isOpenServices)}
                onBlur={handleCategoryBlur(setIsOpenServices)}
              >
                <div className="header__category-title">
                  <h4 className="header__category-name">Послуги</h4>

                  <div className="header__icon-arrow">
                    <div
                      className={cn('icon icon--vector2-white w-[10px] h-[10px]', {
                        'scale-y-[-1]': isOpenServices,
                      })}
                    />
                  </div>
                </div>
              </button>

              {isOpenServices && (
                <ul className="header__subcategorys">
                  <li className="header__subcategory-item">
                    <Link to="/service_decorative">
                      <p className="header__subcategory-name">
                        Нанесення декоративного покриття
                      </p>
                    </Link>
                  </li>

                  <li className="header__subcategory-item">
                    <Link to="/service_hang_wallpaper">
                      <p className="header__subcategory-name">
                        Поклейка шпалер
                      </p>
                    </Link>
                  </li>

                  {/* <li className="header__subcategory-item">
                    <Link to="/paint_tinting">
                      <p className="header__subcategory-name">Тонування фарб</p>
                    </Link>
                  </li> */}
                </ul>
              )}
            </li>

            <li className="header__category-item">
              <button
                type="button"
                className="header__category-btn"
                onClick={() => setIsOpenProducts(!isOpenProducts)}
                onBlur={handleCategoryBlur(setIsOpenProducts)}
              >
                <div className="header__category-title">
                  <h4 className="header__category-name">Продукція</h4>

                  <div className="header__icon-arrow">
                    <div
                      className={cn('icon icon--vector2-white w-[10px] h-[10px]', {
                        'scale-y-[-1]': isOpenProducts,
                      })}
                    />
                  </div>
                </div>
              </button>

              {isOpenProducts && (
                <ul className="header__subcategorys">
                  <li className="header__subcategory-item">
                    <Link to="/wallpaper">
                      <p className="header__subcategory-name">Шпалери</p>
                    </Link>
                  </li>

                  <li className="header__subcategory-item">
                    <Link to="/paint">
                      <p className="header__subcategory-name">Фарба</p>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="header__category-item">
              <div className="header__category-title">
                <Link to="/about_us">
                  <h4
                    className="
                      header__category-name
                      header__category-name--color-black"
                  >
                    Про нас
                  </h4>
                </Link>
              </div>
            </li>

            <li className="header__category-item">
              <div className="header__category-title">
                <Link to="/contacts">
                  <h4
                    className="
                      header__category-name
                      header__category-name--color-black"
                  >
                    Контакти
                  </h4>
                </Link>
              </div>
            </li>
          </ul>

          <ul className="header__main-nav">
            <li className="header__main-nav-item">
              <Link to="/favorite">
                <div
                  className={cn('icon icon--favorite hover:scale-105', {
                    'relative': cartFavorits.length,
                  })}
                >
                  {!!cartFavorits.length && (
                    <div className="icon--count"> {cartFavorits.length} </div>
                  )}
                </div>
              </Link>
            </li>

            <li className="header__main-nav-item">
              <Link to="/basket">
                <div
                  className={cn('icon icon--cart hover:scale-105', {
                    'relative': cartBaskets.length,
                  })}
                >
                  {!!cartBaskets.length && (
                    <div className="icon--count">{cartBaskets.length}</div>
                  )}
                </div>
              </Link>
            </li>

            <li className="header__main-nav-item header__menu">
              <button
                type="button"
                className="header__menu-btn"
                onClick={() => toggleMenu(!isMenu)}
              >
                <div
                  className={cn('icon icon--menu hover:scale-105', {
                    'icon--menu-close': isMenu,
                  })}
                />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
