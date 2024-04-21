import * as R from 'react';
import { getWallpapers } from '../../api/product.api';

import './wallpaper.page.scss';
import { useProductStore } from '../../store/product.store';
import { ProductsPage } from '../products.page';

export const WallpaperPage = () => {
  console.log('render');
  const {
    products,
    isLoading,
    error: hasError,
    fetchData,
  } = useProductStore();

  const wallpapers = R.useMemo(
    () => getWallpapers(products),
    [products],
  );

  R.useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProductsPage
      products={wallpapers}
      isLoading={isLoading}
      hasError={hasError}
    />
  );
};
