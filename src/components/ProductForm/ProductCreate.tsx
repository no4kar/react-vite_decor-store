import * as R from 'react';
import { ProductForm } from './ProductForm';

export const ProductCreate = R.memo(MyComponent);

function MyComponent() {
  return <ProductForm product={null} />;
}
