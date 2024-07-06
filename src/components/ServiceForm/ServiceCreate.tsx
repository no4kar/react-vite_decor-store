import * as R from 'react';
import { ServiceForm } from './ServiceForm';

export const ServiceCreate = R.memo(MyComponent);

function MyComponent() {
  return <ServiceForm service={null} />;
}
