import * as R from 'react';
import * as RRD from 'react-router-dom';
import { TyProduct } from '../../types/Products/Products';
import { productApi } from '../../api/product.api';
import { Loader } from '../Loader';
import { NotFoundPage } from '../../pages/not-found-page';
import { ProductForm } from './ProductForm';

export const ProductEdit = R.memo(Component);

function Component() {
  const { id } = RRD.useParams();
  const [product, setProduct] = R.useState<TyProduct | null>(null);
  const [isLoading, setIsLoading] = R.useState<boolean>(false);

  R.useEffect(() => {
    setIsLoading(true);

    productApi.getFromServerByParams({ id })
      .then((products) => {
        // console.info(products);

        setProduct(products.at(0) || null);
      })
      .finally(() => setIsLoading(false));

  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !product) {
    return <NotFoundPage title="Cant find product" />;
  }

  return <ProductForm product={product} />;
}
