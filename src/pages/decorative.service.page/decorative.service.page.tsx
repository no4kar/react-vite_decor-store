import { useEffect, useRef, useState } from 'react';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { PageNavigation } from '../../components/PageNavigation';
import { Loader } from '../../components/Loader';
import { ProductCard } from '../../components/ProductCard';
import './decorative.service.page.scss';
import { getServices } from '../../api/service.api';

export const DecorativeService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const timerId = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, initialDelayLoader);
  }, []);

  const visibleProducts = getServices();

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
