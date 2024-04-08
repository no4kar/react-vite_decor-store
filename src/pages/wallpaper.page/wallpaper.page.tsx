import { useEffect, useRef, useState } from 'react';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { Loader } from '../../components/Loader';
import { getWallpaper } from '../../api/product.api';
import { WallpaperProducts } from '../../types/Products/WallpaperProducts';
import { PageNavigation } from '../../components/PageNavigation';
import './wallpaper.page.scss';

/* eslint no-console: "warn" */

export const WallpaperPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');
  const [products, setProducts] = useState<WallpaperProducts[]>([]);
  const timerId = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    const fetchData = async () => {
      setHasError('');

      try {
        const loadedProducts = await getWallpaper();

        setProducts(loadedProducts);
      } catch (error) {
        setHasError('Something went wrong');
      }
    };

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, initialDelayLoader);

    fetchData();
  }, []);

  console.log(products);

  return (
    <div className="wallpaper">
      <div className="content">
        <PageNavigation />
        {isLoading && <Loader />}

        {hasError && !isLoading && <p>{hasError}</p>}

        {!isLoading && !hasError && <p>WallpaperPage</p>}
      </div>
    </div>
  );
};
