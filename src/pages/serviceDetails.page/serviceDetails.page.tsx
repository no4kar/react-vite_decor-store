import * as R from 'react';
import * as RRD from 'react-router-dom';

import { PageNavigation } from '../../components/PageNavigation';
import { Loader } from '../../components/Loader';
import { TyService } from '../../types/Services';
import { serviceApi } from '../../api/service.api';
import { ButtonFavorite } from '../../components/ButtonFavorite';
import { Button2 } from '../../components/Button2';
// import { useServiceStore } from '../../store/service.store';

import './serviceDetails.page.scss';
import { Slider2 } from '../../components/Slider2';
import { NotFoundPage } from '../not-found-page';


export const ServiceDetailsPage = Component;

function Component() {
  const { id } = RRD.useParams();
  const navigate = RRD.useNavigate();

  /* it will be need if server will ofeer service-info and service-detailed-info */
  const [isLoading, setIsLoading] = R.useState(true);
  const [selectService, setSelectService] = R.useState<TyService | null>(null);

  R.useEffect(() => {
    serviceApi.getFromServerByParams({ id })
      .then(services => {
        if (!services.length) {
          throw new Error("Not found product");
        }

        setSelectService(services[0]);
      })
      .catch(() => setSelectService(null))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      className="
      content
      py-6 sm:py-20 md:py-24"
    >
      {isLoading && <Loader />}

      {!isLoading && !selectService
        && <NotFoundPage title='Not found service' />}

      {!isLoading && selectService && (
        <div
          className="
          flex flex-col gap-6"
        >
          <PageNavigation prodName={selectService.name} />

          <section className="flex flex-col gap-6 md:flex-row">
            <Slider2 selectItem={selectService} />

            <div className="
              flex flex-col gap-8
              md:flex-col
              md:w-2/5"
              // sm:flex-row sm:gap-6
              // border border-solid border-blue-400
            // shadow rounded
            >
              <div className="
                grow flex flex-col gap-6"
              // border border-solid border-blue-400
              >
                <h3 className="title--h3">
                  {selectService.name}
                </h3>

                <p className="grow
                  text-black whitespace-pre-wrap text-justify"
                >
                  {selectService.description}
                </p>

                <hr
                  className="
                border-b border-solid border-gray-400"
                />
              </div>

              <div // Cansult button
                className="
                  h-[48px]
                  flex gap-[10px]
                  sm:w-90
                  sm:h-16
                  md:w-auto"
              >
                <Button2
                  onClick={() => {
                    navigate('/contacts', { state: { from: window.location.href } });
                  }}
                >
                  <span
                    className="
                      group-hover:-translate-x-[5px] transition duration-300"
                  >
                    Замовити консультацію
                  </span>

                  <span
                    className="
                      w-[26px] text-3xl
                      group-hover:-translate-x-[-5px] transition duration-300"
                  >
                    &#8594;
                  </span>
                </Button2>

                <ButtonFavorite selectProduct={selectService} />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
