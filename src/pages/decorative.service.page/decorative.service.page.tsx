// import { useEffect } from 'react';
import { PageNavigation } from '../../components/PageNavigation';
import { Loader } from '../../components/Loader';
import { ServiceCard } from '../../components/ServiceCard';
import { serviceApi } from '../../api/service.api';
import { useServiceStore } from '../../store/service.store';
import { ServiceCategory } from '../../types/Service';

export const DecorativeService = FuncComponent;

function FuncComponent() {
  // console.log('render');
  const {
    services,
    isLoading,
  } = useServiceStore();

  const visibleServices
    = serviceApi.getByCategory(services, ServiceCategory.Decorative);

  return (
    <div
      className="content
      flex flex-col gap-6
      py-6 sm:py-20 md:py-24"
    >
      <PageNavigation />

      {isLoading && <Loader />}

      {!isLoading && (
        <section className="
        grid
        grid-cols-[repeat(auto-fill,minmax(290px,1fr))]
        justify-items-center
        gap-6
        sm:gap-y-8
        md:gap-y-16"
        >
          {visibleServices.map(item => (
            <ServiceCard
              key={item.id}
              item={item}
            />
          ))}
        </section>
      )}
    </div>
  );
}
