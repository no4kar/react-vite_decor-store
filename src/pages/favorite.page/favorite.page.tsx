import { useEffect, useRef, useState } from 'react';
import { Loader } from '../../components/Loader';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { ServiceCard } from '../../components/ServiceCard';
import { useFavoriteStore } from '../../store/favourite.store';

import './favorite.page.scss';
import { Button2, Option as Button2Option } from '../../components/Button2';
import ProductCard from '../../components/ProductCard/ProductCard';
import { TyProduct } from '../../types/Products/Products';

export const FavoritePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { items: favorites } = useFavoriteStore(state => state);
  const timerId = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, initialDelayLoader);
  }, []);

  return (
    <div className="favorite">
      <div className="content">
        <div className="favorite__nav">
          <div
            className="
              icon
              icon--hover
              icon--favorite-icon
              favorite__icon
            "
          />
          <h3 className="title title--h3 favorite__title">Обране</h3>
        </div>

        {isLoading && <Loader />}

        {!isLoading && !!favorites.length && (
          <section className="favorite__products">
            {favorites.map(item => {
              console.info(item);

              return ('price' in item)
                ? (
                  <ProductCard
                    key={item.id}
                    product={item as TyProduct}
                  />
                )
                : (
                  <ServiceCard
                    key={item.id}
                    item={item}
                  />
                );
            })}
          </section>
        )}

        {!isLoading && !favorites.length && (
          <section>
            <div className="favorite__table">
              <p className="favorite__table-text">
                У Вас не має обраних товарів
              </p>
            </div>
          </section>
        )}

        <div
          className="h-[60px]"
        >
          <Button2
            path='..'
            option={Button2Option.SECONDARY}
          >
            <span
              className="
          group-hover:-translate-x-[5px] transition duration-300"
            >
              Продовжити покупки
            </span>

            <span
              className="
          w-[26px] text-3xl
          group-hover:-translate-x-[-5px] transition duration-300"
            >
              &#8594;
            </span>
          </Button2>
        </div>
      </div>
    </div>
  );
};
