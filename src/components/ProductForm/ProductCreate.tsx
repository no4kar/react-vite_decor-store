import * as R from 'react';
import { ProductForm } from './ProductForm';

export const ProductCreate = R.memo(FuncComponent);

function FuncComponent() {
  return <ProductForm product={null} />;
}
