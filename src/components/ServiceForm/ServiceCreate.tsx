import * as R from 'react';
import { ServiceForm } from './ServiceForm';

export const ServiceCreate = R.memo(Component);

function Component() {
  return <ServiceForm service={null} />;
}
