/* eslint-disable jsx-a11y/control-has-associated-label */
// or you can add aria-label on 153
import React from 'react';
import * as RRD from 'react-router-dom';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { useFavoriteStore } from '../../store/favourite.store';
import { useCartStore } from '../../store/cart.store';
import { Dropdown } from '../Dropdown';
import { TySelectOption } from '../../types/SelectOption';

import './Header.scss';

const optionsService: TySelectOption[] = [
  <h4 className="title--h4 font-semibold text-black">
    Послуги
  </h4 >,
  <Link to="/service_decorative">
    <p className="title--body">
      Нанесення декоративного покриття
    </p>
  </Link>,
  <Link to="/service_hang_wallpaper">
    <p className="title--body">
      Поклейка шпалер
    </p>
  </Link>,
  // <Link to="/paint_tinting">
  //   <p className="title--body">
  //     Тонування фарб
  //   </p>
  // </Link>,
].map((item, i) => ({ value: String(i), label: item, }));

const optionsProduct: TySelectOption[] = [
  <h4 className="title--h4 font-semibold text-black">
    Продукція
  </h4 >,
  <Link to="/wallpaper">
    <p className="title--body">Шпалери</p>
  </Link>,
  <Link to="/paint">
    <p className="title--body">Фарба</p>
  </Link>,
].map((item, i) => ({ value: String(i), label: item, }));


export const Header = () => {
  const [isAside, setIsAside] = React.useState(false);
  const [isOpenServices, setIsOpenServices] = React.useState(false);
  const [isOpenProducts, setIsOpenProducts] = React.useState(false);
  const { items: cartFavorits } = useFavoriteStore(state => state);
  const { items: cartBaskets } = useCartStore(state => state);

  const navigate = RRD.useNavigate();
  const handleBtnClick = (path: string) => {
    return () => {
      navigate(path);
      setIsAside(false);
    };
  };

  const setStateAfter
    = <T extends boolean>(
      setIsOpen: React.Dispatch<React.SetStateAction<T>>,
      value: T,
      delay: number,
    ) => {
      return () => {
        setTimeout(() => setIsOpen(value), delay);
      };
    };

  return (
    <div className="sticky top-0 z-[5]">
      <header
        className="
        py-3
        border-b border-gray-300 bg-black
        sm:py-4"
      >
        <nav className="content flex justify-between">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth', })}
          >
            <i
              className="
            icon icon--logo-header
            w-14 h-14 transition-transform duration-300 hover:scale-110
            md:w-[200px]"
            />
          </Link>

          <ul className="header__categorys">
            <li className="header__category-item">
              <button
                type="button"
                className="header__category-btn"
                onClick={() => setIsOpenServices(!isOpenServices)}
                onBlur={setStateAfter<boolean>(setIsOpenServices, false, 200)}
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
                onBlur={setStateAfter<boolean>(setIsOpenProducts, false, 200)}
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

            <li className="
          header__main-nav-item header__menu"
            // border border-red-300 border-solid
            >
              <button
                type="button"
                className="header__menu-btn"
                onClick={() => setIsAside(!isAside)}
              >
                <div
                  className={cn('icon icon--menu hover:scale-105', {
                    'icon--menu-close': isAside,
                  })}
                />
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div className='relative w-full h-0'>
        <aside
          className={cn(`
          absolute top-0 left-0 right-0 z-[5] origin-top
          bg-gray-300
          sm:hidden`, {
            'hidden': !isAside,
            'animate-aside-menu-open': isAside,
          })}
        >
          <ul className="px-5 py-3">
            <li>
              <Dropdown
                selectedValue='0'
                options={optionsService}
                isThereSelectedInList={false}
                onChange={setStateAfter<boolean>(setIsAside, false, 200)}
                activeClass='text-accent'
              />
            </li>

            <li>
              <Dropdown
                selectedValue='0'
                options={optionsProduct}
                isThereSelectedInList={false}
                onChange={setStateAfter<boolean>(setIsAside, false, 200)}
                activeClass='text-accent'
              />
            </li>

            <li
              className="p-[10px] flex justify-start"
            >
              <button
                type="button"
                onClick={handleBtnClick('/about_us')}>
                <h4 className="title--h4 font-semibold text-black">Про нас</h4>
              </button>
            </li>

            <li
              className="p-[10px] flex justify-start"
            >
              <button
                type="button"
                onClick={handleBtnClick('/contacts')}>
                <h4 className="title--h4 font-semibold text-black">Контакти</h4>
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};
