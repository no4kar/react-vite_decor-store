import * as R from 'react';
import * as RRD from 'react-router-dom';
import { TyService } from '../../types/Service';
import { serviceApi } from '../../api/service.api';
import { Loader } from '../Loader';
import { NotFoundPage } from '../../pages/not-found.page';
import { ServiceForm } from './ServiceForm';

export const ServiceEdit = R.memo(Component);

function Component() {
  const { id } = RRD.useParams();
  const [service, setService] = R.useState<TyService.Item | null>(null);
  const [isLoading, setIsLoading] = R.useState<boolean>(false);

  R.useEffect(() => {
    setIsLoading(true);

    serviceApi.getFromServerByParams({ id })
      .then((services) => {
        setService(services.at(0) || null);
      })
      .catch(e => console.error(e.message))
      .finally(() => setIsLoading(false));

  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !service) {
    return <NotFoundPage title={`Can't find service with ID=${id}`} />;
  }

  return <ServiceForm service={service} />;
}
