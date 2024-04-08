import { useContext, useEffect, useRef, useState } from 'react';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { PageNavigation } from '../../components/PageNavigation';
import { Loader } from '../../components/Loader';
import { GlobalContext } from '../../store/GlobalContext';
import { ProductCard } from '../../components/ProductCard';
import { getServiceDecorative } from '../../helpers/getProductsByCategories';
import './decorative.service.page.scss';

export const DecorativeService = () => {
  const { productsService } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const timerId = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, initialDelayLoader);
  }, []);

  const visibleProducts = getServiceDecorative(productsService, 1);

  return (
    <div className="decorativeService">
      <div className="content">
        <div className="decorativeService__nav">
          <PageNavigation />
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <section className="decorativeService__products">
            {visibleProducts.map(item => (
              <ProductCard product={item} key={item.id} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};
