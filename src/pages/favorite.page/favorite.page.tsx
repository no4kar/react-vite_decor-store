import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { ServiceCard } from '../../components/ServiceCard';
import { useFavoriteStore } from '../../store/favourite.store';

import './favorite.page.scss';

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
            {favorites.map(item => (
              <ServiceCard
                key={item.id}
                item={item}
              />
            ))}
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

        <div className="favorite__button">
          <Button $secondary path="..">
            Продовжити покупки
          </Button>
        </div>
      </div>
    </div>
  );
};
