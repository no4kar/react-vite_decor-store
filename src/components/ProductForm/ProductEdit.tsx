import * as R from 'react';
import * as RRD from 'react-router-dom';
import { TyProduct } from '../../types/Products';
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
        setProduct(products.at(0) || null);
      })
      .catch(e => console.error(e.message))
      .finally(() => setIsLoading(false));

  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !product) {
    return <NotFoundPage title={`Can't find product with ID=${id}`} />;
  }

  return <ProductForm product={product} />;
}
