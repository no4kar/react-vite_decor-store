import * as R from 'react';
import { ProductForm } from './ProductForm';

export const ProductCreate = R.memo(Component);

function Component() {
  return <ProductForm product={null} />;
}
