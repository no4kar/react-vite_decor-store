import * as R from 'react';
import * as RRD from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { PageNavigation } from '../../components/PageNavigation';
import { Loader } from '../../components/Loader';
import { useCartStore } from '../../store/cart.store';

import './productDetails.page.scss';

import { productApi } from '../../api/product.api';
import { ButtonFavorite } from '../../components/ButtonFavorite';
import { Button2, Option as Button2Option } from '../../components/Button2';
import { Counter } from '../../components/Counter';
import { Slider2 } from '../../components/Slider2';
import { NotFoundPage } from '../not-found-page';
import { TyProduct } from '../../types/Products';

export const ProductDetailsPage = () => {
  console.info('render');
  const { id } = RRD.useParams();
  const navigate = RRD.useNavigate();
  const [isLoading, setIsLoading] = R.useState(true);
  const [quantity, setQuantity] = R.useState(1);
  const [selectProduct, setSelectProduct] = R.useState<TyProduct | null>(null);
  const { add: inCartAdd } = useCartStore();

  R.useEffect(() => {
    setIsLoading(true);

    productApi.getFromServerByParams({ id })
      .then(products => {
        if (!products.length) {
          throw new Error("Not found product");
        }

        setSelectProduct(products[0]);
      })
      .catch(() => setSelectProduct(null))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      className="
      content
      py-6 sm:py-20 md:py-24"
    >
      {isLoading && <Loader />}

      {!isLoading && !selectProduct
        && <NotFoundPage title='Not found product' />}

      {!isLoading && selectProduct && (
        <div className="flex flex-col gap-6">
          <PageNavigation prodName={selectProduct.name} />

          <section className="flex flex-col gap-5 md:flex-row">
            <Slider2 selectItem={selectProduct} />

            <div
              className="
                flex flex-col gap-8
                sm:flex-row sm:gap-5
                md:flex-col
                md:w-2/5"
            // border border-solid border-blue-400
            // shadow rounded
            >
              <div // Info
                className="
                    grow flex flex-col gap-6"
              // border border-solid border-blue-400
              >
                <h3 className="title--h3 title--h3-mobile">
                  <span className="uppercase">
                    {selectProduct.producer}
                  </span>
                  &nbsp;
                  <span>
                    {selectProduct.collection}
                  </span>
                  &nbsp;
                  <span>
                    {selectProduct.name}
                  </span>
                </h3>

                <p className="grow text-black">
                  {selectProduct.description}
                </p>

                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    <h4 className="title--h4 text-gray-600">
                      Тон
                    </h4>

                    <p className="text-black">
                      {selectProduct.tone}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="title--h4 text-gray-600">
                      Код товару
                    </h4>

                    <p className="text-black">
                      {selectProduct.code}
                    </p>
                  </div>
                </div>

                <hr
                  className="
                border-b border-solid border-gray-400"
                />
              </div>

              <div // Interact
                className="
                  flex-1"
              // border border-solid border-blue-400
              >
                <div // Counter
                  className="
                  h-12
                  md:h-16
                  flex justify-between"
                >
                  <Counter
                    quantity={quantity}
                    onIncrease={() => setQuantity(prev => prev + 1)}
                    onDecrease={() => setQuantity(prev => prev - 1)}
                    classContainer="
                      w-[96px] h-full
                      flex
                      border border-solid border-gray-400"
                  />

                  <div className="flex">
                    <p>Ціна</p>

                    <p className="pl-3 pr-1 text-accent">
                      {selectProduct.price}
                    </p>

                    <p>грн.</p>
                  </div>
                </div>

                <div // Consault + Favorite buttons
                  className="
                  h-[48px] mt-[44px]
                  flex gap-[10px]
                  md:h-[64px]"
                >
                  <Button2
                    option={Button2Option.SECONDARY}
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

                  <ButtonFavorite selectProduct={selectProduct} />
                </div>

                <div // InCart button
                  className="h-[48px] mt-[24px] md:h-[64px]"
                >
                  <Button2
                    path="/basket"
                    onClick={() => inCartAdd(selectProduct, quantity || 1)}
                  >
                    <span
                      className="
                      group-hover:-translate-x-[5px] transition duration-300"
                    >
                      Додати в кошик
                    </span>

                    <span
                      className="
                      w-[26px] text-3xl
                      group-hover:-translate-x-[-5px] transition duration-300"
                    >
                      &#8594;
                    </span>
                  </Button2>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
