import { Loader } from '../../components/Loader';
import { PageNavigation } from '../../components/PageNavigation';
import { ServiceCard } from '../../components/ServiceCard';
import { useServiceStore } from '../../store/service.store';
import { serviceApi } from '../../api/service.api';
import { ServiceCategory } from '../../types/Service';

export const HangWallpaper = () => {
  // console.log('render');
  const {
    services,
    isLoading,
  } = useServiceStore();

  const visibleServices
    = serviceApi.getByCategory(services, ServiceCategory.HangWallpaper);

  return (
    <div className="
    content
    py-6 sm:py-20 md:py-24
    flex flex-col gap-6"
    >
      <PageNavigation />

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
  );
};
