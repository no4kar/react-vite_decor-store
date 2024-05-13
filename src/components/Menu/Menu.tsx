import { Link } from 'react-router-dom';
import { TySelectOption } from '../../types/SelectOption';

import './Menu.scss';
import Dropdown from '../Dropdown/Dropdown';

const optionsService: TySelectOption[] = [
  <h4 className="title--h4 font-semibold text-black">
    Послуги
  </h4 >,
  <Link to="/service_decorative">
    <p className="title--body-text">
      Нанесення декоративного покриття
    </p>
  </Link>,
  <Link to="/service_hang_wallpaper">
    <p className="title--body-text">
      Поклейка шпалер
    </p>
  </Link>,
  // <Link to="/paint_tinting">
  //   <p className="title--body-text">
  //     Тонування фарб
  //   </p>
  // </Link>,
].map((item, i) => ({ value: String(i), label: item, }));

const optionsProduct: TySelectOption[] = [
  <h4 className="title--h4 font-semibold text-black">
    Продукція
  </h4 >,
  <Link to="/wallpaper">
    <p className="title--body-text">Шпалери</p>
  </Link>,
  <Link to="/paint">
    <p className="title--body-text">Фарба</p>
  </Link>,
].map((item, i) => ({ value: String(i), label: item, }));


export const Menu = ({
  onBlur = () => { },
}: {
  onBlur: (event: React.FocusEvent<HTMLUListElement> | null) => void,
}) => {

  return (
    <aside
      className="
    absolute top-[76px] left-0 right-0 z-10
    bg-gray-300
    sm:hidden"
      onBlur={() => onBlur(null)}
    >
      <ul
        className="px-[20px] py-[10px]"
      >
        <li>
          <Dropdown
            selectedValue='0'
            options={optionsService}
            isThereSelectedInList={false}
            activeClass='text-accent'
          />
        </li>

        <li>
          <Dropdown
            selectedValue='0'
            options={optionsProduct}
            isThereSelectedInList={false}
            activeClass='text-accent'
          />
        </li>

        <li>
          <div className="p-[10px] flex justify-start">
            <Link to="/about_us">
              <h4 className="title--h4 font-semibold text-black">Про нас</h4>
            </Link>
          </div>
        </li>

        <li>
          <div className="p-[10px] flex justify-start">
            <Link to="/contacts">
              <h4 className="title--h4 font-semibold text-black">Контакти</h4>
            </Link>
          </div>
        </li>
      </ul>
    </aside>
  );
};
