import { useEffect } from 'react';
import { Loader } from '../../components/Loader';
import { PageNavigation } from '../../components/PageNavigation';
import { ServiceCard } from '../../components/ServiceCard';
import { useServiceStore } from '../../store/service.store';
import { getServiceByCategory } from '../../api/service.api';
import { ServiceCategory } from '../../types/Services/Services';

export const HangWallpaper = () => {
  console.log('render');
  const {
    services,
    isLoading,
    fetchData,
  } = useServiceStore();

  useEffect(() => {
    fetchData();
  }, []);

  const visibleServices
    = getServiceByCategory(services, ServiceCategory.HangWallpaper);

  return (
    <div className="
    pt-[24px] pb-[4px]
    sm:pb-[62px]
    md:pt-[92px] md:pb-[84px]"
    >
      <div className="content">
        <div className="
        mb-[24px]
        sm:mb-[40px]
        md:mb-[4px]">
          <PageNavigation />
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <section className="
          grid
          grid-cols-[repeat(auto-fill,minmax(310px,1fr))]
          justify-items-center
          gap-y-[64px] gap-x-[10px]"
          >
            {visibleServices.map(item => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};
