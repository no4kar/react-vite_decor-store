import { Link, useNavigate } from 'react-router-dom';
import { TySelectOption } from '../../types/SelectOption';

import './Menu.scss';
import Dropdown from '../Dropdown/Dropdown';

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


export const Menu = ({
  onCloseMenu = () => { },
}: {
  onCloseMenu: () => void,
}) => {

  const navigate = useNavigate();
  const handleBtnClick = (path: string) => {
    return () => {
      navigate(path);
      onCloseMenu();
    };
  };

  return (
    <aside
      className="
    absolute top-[76px] left-0 right-0 z-[5]
    bg-gray-300
    sm:hidden"
    >
      <ul
        className="px-5 py-3"
      >
        <li>
          <Dropdown
            selectedValue='0'
            options={optionsService}
            isThereSelectedInList={false}
            onChange={() => onCloseMenu()}
            activeClass='text-accent'
          />
        </li>

        <li>
          <Dropdown
            selectedValue='0'
            options={optionsProduct}
            isThereSelectedInList={false}
            onChange={() => onCloseMenu()}
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
  );
};
