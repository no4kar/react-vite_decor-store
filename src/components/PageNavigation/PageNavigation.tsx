import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { pageLink } from '../../constants/pageLinks';
import './PageNavigation.scss';

type Props = {
  prodName?: string;
};

export const PageNavigation: React.FC<Props> = ({ prodName }) => {
  const { pathname } = useLocation();
  const data = pathname.split('/').slice(1);

  return (
    <div className="page-navigation">
      <Link to="/" className="page-navigation__link ">
        <div className="icon icon__arrow-navigation" />
        Головна
      </Link>

      {data.slice(0, -1).map(el => (
        <React.Fragment key={el}>
          <div className="icon icon__elipse" />
          <Link to=".." className="page-navigation__link">
            {pageLink[el]}
          </Link>
        </React.Fragment>
      ))}

      <div className="icon icon__elipse" />
      <p className="page-navigation__text">
        {!prodName
          ? pageLink[data[data.length - 1]] || data[data.length - 1]
          : prodName}
      </p>
    </div>
  );
};
