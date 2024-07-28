import * as R from 'react';
import { ServiceForm } from './ServiceForm';

export const ServiceCreate = R.memo(FuncComponent);

function FuncComponent() {
  return <ServiceForm service={null} />;
}
