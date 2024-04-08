import { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { getCartFavorites } from '../../helpers/getProductsByCategories';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { ProductCard } from '../../components/ProductCard';
import './favorite.page.scss';

export const FavoritePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { localStore } = useContext(GlobalContext);
  const timerId = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, initialDelayLoader);
  }, []);

  const cartFavorites = getCartFavorites(localStore);

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

        {!isLoading && !!cartFavorites.length && (
          <section className="favorite__products">
            {cartFavorites.map(item => (
              <ProductCard product={item} key={item.id} />
            ))}
          </section>
        )}

        {!isLoading && !cartFavorites.length && (
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
