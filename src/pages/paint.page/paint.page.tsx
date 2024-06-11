import * as R from 'react';

import { useProductStore } from '../../store/product.store';
import { ProductsPage } from '../products.page';
import { productApi } from '../../api/product.api';

import './paint.page.scss';

export const PaintPage = R.memo(
  () => {
    // console.log('render');
    const {
      products,
      isLoading,
      error: hasError,
    } = useProductStore();

    const paints = R.useMemo(
      () => productApi.getPaints(products),
      [products],
    );

    return (
      <ProductsPage
        products={paints}
        isLoading={isLoading}
        hasError={hasError}
      />
    );
  },
);
