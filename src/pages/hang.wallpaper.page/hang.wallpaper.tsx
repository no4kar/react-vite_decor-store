import { useEffect, useRef, useState } from 'react';
import './hang.wallpaper.scss';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { Loader } from '../../components/Loader';
import { PageNavigation } from '../../components/PageNavigation';
import { ProductCard } from '../../components/ProductCard';
import { ProductCategory } from '../../types/Products/Products';
import { getProducts } from '../../api/product.api';

export const HangWallpaper = () => {
  const products = getProducts();
  const [isLoading, setIsLoading] = useState(false);
  const timerId = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, initialDelayLoader);
  }, []);

  const visibleProducts = products.filter(
    p => p.categoryId === ProductCategory.Wallpaper
  );

  return (
    <div className="hangWallpaper">
      <div className="content">
        <div className="hangWallpaper__nav">
          <PageNavigation />
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <section className="hangWallpaper__products">
            {visibleProducts.map(item => (
              <ProductCard product={item} key={item.id} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};