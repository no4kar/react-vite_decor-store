import * as R from 'react';
import { useLocation } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
// import Select from 'react-select';
import Creatable from 'react-select/creatable';
import cn from 'classnames';

import { MyForm } from '../../types/MyForm';
import { FormField } from '../FormField';
import { Button } from '../Button';
import { Loader } from '../Loader';

import { formApi } from '../../api/form.api';
import { validation } from '../../constants/formValidation';
import { Modal } from '../Modal';
import { delivery, payOption } from '../../constants/radioOptions';
import { RadioButton } from '../RadioButton';
import { formVersionData } from '../../constants/formVersionData';
import { useCartStore } from '../../store/cart.store';
import { TySelectOption } from '../../types/SelectOption';
import { OutcomeReport, Status } from '../../types/Info';
import { article } from '../../constants/footerData';
import { StatusNotification } from '../Notification/StatusNotification';

import './FormComponent.scss';

enum FormVersion {
  CONSULTATION = 'consultation',
  SEND_MESSAGE = 'sendMessage',
  ORDER = 'order',
}

const cityOptions: TySelectOption[] = [
  { label: 'Київ', value: 'Київ' },
  { label: 'Дніпро', value: 'Дніпро' },
  { label: 'Харків', value: 'Харків' },
  { label: 'Рівне', value: 'Рівне' },
];

const customPlaceholder: R.CSSProperties = {
  fontFamily: 'manrope_regular',
  fontWeight: '300',
  fontSize: '18px',
  lineHeight: '130%',
  color: '#d7d7d7',
};

export const FormComponent = R.memo(Component);

function Component({
  formVersion,
  children,
}: {
  formVersion: keyof typeof formVersionData;
  children?: R.ReactNode;
}) {
  const [selectedCity, setSelectedCity] = R.useState<TySelectOption | null>(null);
  const [isModalOpen, setIsModalOpen] = R.useState(false);
  const [isLoading, setIsLoading] = R.useState(false);
  const [msg, setMsg] = R.useState<OutcomeReport>({
    status: Status.NONE,
    description: '',
  });
  const [description, setDescription] = R.useState({
    title: '',
    description: '',
  });
  const location = useLocation();
  const {
    items: inCartItems,
    removeAll: removeAllCartItems,
  } = useCartStore();

  const isOrderVersion = formVersion === FormVersion.ORDER;
  const isSendMassageVersion = formVersion === FormVersion.SEND_MESSAGE;
  const isConsultationVersion = formVersion === FormVersion.CONSULTATION;

  const handleCityChange = (selectedOption: TySelectOption | null) => {
    setSelectedCity(selectedOption);
  };

  const {
    register,
    formState: { errors, isValid },
    control,
    handleSubmit,
    reset,
  } = useForm<MyForm>({
    defaultValues: {
      phoneNumber: '+380',
    },
    mode: 'all',
  });

  const onSubmit: SubmitHandler<MyForm> = data => {
    // console.log(data);
    setIsLoading(true);

    switch (formVersion) {
      case FormVersion.CONSULTATION: {
        formApi.sendFeedback({
          name: data.firstName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          comment: `
          ${location.state?.from || ''}`,
        })
          .then(() => {
            setMsg({
              status: Status.SUCCESS,
              description: 'Дякуємо, ми зв\'яжемося з вами якомога швидше',
            });
          })
          .catch((error) => {
            if (error.message) {
              setMsg({
                status: Status.ERROR,
                description: error.message,
              });

              return;
            }

            setMsg({
              status: Status.ERROR,
              description: 'Може спробуєте трохи пізніше',
            });
          })
          .finally(() => setIsLoading(false));

        break;
      }

      case FormVersion.SEND_MESSAGE: {
        formApi.sendFeedback({
          name: data.firstName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          comment: `
          ${location.state?.from}
          ${data.message}`,
        })
          .then(() => {
            setMsg({
              status: Status.SUCCESS,
              description: 'Дякуємо, ми цінуємо думку кожного',
            });
          })
          .catch((error) => {
            if (error.message) {
              setMsg({
                status: Status.ERROR,
                description: error.message,
              });

              return;
            }

            setMsg({
              status: Status.ERROR,
              description: 'Може спробуєте трохи пізніше',
            });
          })
          .finally(() => setIsLoading(false));

        break;
      }

      case FormVersion.ORDER: {
        formApi.createOrder({
          orderItems:
            inCartItems.map(({ id, quantity }) => ({ productId: id, quantity })),
          firstName: data.firstName,
          lastName: data.lastName,
          patronymic: data.middleName || '',
          shippingAddress: data.city,
          email: data.email,
          phoneNumber: data.phoneNumber,
          comment:
            `${data.payOption}\n${data.delivery}\n\n${data.message}`,
        })
          .then((response) => {
            console.info(response);

            setMsg({
              status: Status.SUCCESS,
              description:
                `
              Дякуємо.
              Замовлення оброблється.
              Відповідть відправлення до ${response.data?.email}
              `,
            });

            removeAllCartItems();
          })
          .catch((error) => {
            if (error.message) {
              setMsg({
                status: Status.ERROR,
                description: error.message,
              });

              return;
            }

            setMsg({
              status: Status.ERROR,
              description: 'Може спробуєте трохи пізніше',
            });
          })
          .finally(() => setIsLoading(false));

        break;
      }

      default: {
        setMsg({
          status: Status.ERROR,
          description: 'Something went wrong',
        });

        setIsLoading(false);
        break;
      }
    }

    reset();
    setSelectedCity(null);
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={cn({
        'flex justify-center': !isOrderVersion,
        'content__grid gap-y-8 sm:gap-y-16 md:gap-y-0': isOrderVersion,
      })}
    >
      <div
        className={cn('flex flex-col gap-9',
          // 'border border-solid border-red',
          {
            'flex-grow': !isOrderVersion,
            'col-span-2 sm:col-span-6 md:col-start-1 md:col-span-5': isOrderVersion,
          })}
      >
        <div // Form fields
          className="flex flex-col gap-6"
        // border border-solid border-red"
        >
          <FormField<MyForm>
            type="text"
            textLabel="Ваше Ім'я"
            name="firstName"
            register={register}
            validation={validation.firstName}
            errors={errors}
            placeholder="Ім'я"
            required
          />

          {isConsultationVersion && (
            <>
              <FormField<MyForm>
                type="tel"
                name="phoneNumber"
                textLabel="Номер телефону"
                register={register}
                validation={validation.phoneNumber}
                errors={errors}
                required
              />

              <FormField<MyForm>
                type="mail"
                name="email"
                textLabel="E-mail"
                register={register}
                validation={validation.email}
                errors={errors}
                placeholder="some@email.com"
                required
              />
            </>
          )}

          {isSendMassageVersion && (
            <>
              <FormField<MyForm>
                type="tel"
                name="phoneNumber"
                textLabel="Номер телефону"
                register={register}
                validation={validation.phoneNumber}
                errors={errors}
                required
              />

              <FormField<MyForm>
                type="mail"
                name="email"
                textLabel="E-mail"
                register={register}
                validation={validation.email}
                errors={errors}
                placeholder="some@email.com"
                required
              />

              <FormField<MyForm>
                type="textarea"
                name="message"
                textLabel="Повідомлення"
                register={register}
                validation={validation.message}
                errors={errors}
                required
              />
            </>
          )}

          {isOrderVersion && (
            <>
              <FormField<MyForm>
                type="text"
                textLabel="Ваше Прізвище"
                name="lastName"
                register={register}
                errors={errors}
                required
                validation={validation.lastName}
                placeholder="Прізвище"
              />

              <FormField<MyForm>
                type="text"
                textLabel="По батькові"
                name="middleName"
                register={register}
                errors={errors}
                placeholder="По батькові"
              />

              <Controller
                name="city"
                control={control}
                rules={validation.city}
                render={({ field: { onChange, onBlur }, fieldState }) => (
                  <div className="flex flex-col gap-[8px]">
                    <span
                      className={cn('form__select-label title--body', {
                        'text-red': fieldState.error,
                      })}
                    >
                      Місто
                    </span>

                    <Creatable
                      placeholder="Поштовий індекс, місто"
                      options={cityOptions}
                      value={selectedCity}
                      onChange={val => {
                        handleCityChange(val);
                        onChange(val?.value);
                      }}
                      className={cn('form__filter-container', {
                        'text-red': fieldState.error,
                      })}
                      classNamePrefix="form__filter"
                      onBlur={onBlur}
                      styles={{
                        placeholder: (provided) => ({
                          ...provided,
                          ...customPlaceholder,
                        }),
                      }}
                    />

                    {fieldState.error && (
                      <span className="title--micro text-red">
                        {fieldState.error.message}
                      </span>
                    )}
                  </div>
                )}
              />

              <FormField<MyForm>
                type="tel"
                name="phoneNumber"
                textLabel="Номер телефону"
                register={register}
                validation={validation.phoneNumber}
                errors={errors}
                required
              />

              <FormField<MyForm>
                type="mail"
                name="email"
                textLabel="E-mail"
                register={register}
                validation={validation.email}
                errors={errors}
                placeholder="some@email.com"
                required
              />

              <FormField<MyForm>
                type="textarea"
                name="message"
                textLabel="Коментар"
                register={register}
                errors={errors}
              />
            </>
          )}
        </div>

        <div // Agreement on processing of personal data
          className="flex flex-col gap-2"
        >
          <label className="flex gap-1 items-center title--micro">
            <input
              className="flex-shrink-0"
              type="checkbox"
              value="yes"
              defaultChecked
              {...register('agreement', validation.agreement)}
            />
            Я згоден
            <button
              type="button"
              className="title--micro text-accent"
              onClick={() => {
                setIsModalOpen(true);
                setDescription({
                  title: article.personalDataProcessing.title,
                  description: article.personalDataProcessing.description,
                });
              }}
            >
              з умовами обробки персональних даних
            </button>
          </label>

          <p className={cn('title--micro text-red overflow-hidden',
            'transition-all duration-500 ease-in-out',
            {
              'h-0': !errors.agreement,
              'h-4': errors.agreement,
            })}
          >
            {errors.agreement?.message}
          </p>
        </div>

        {!isOrderVersion && (
          <div className="h-16">
            <Button
              type='submit'
              option='primary'
              isDisable={!isValid}
            >
              {isConsultationVersion && !isLoading && (
                'Передзвоніть мені'
              )}

              {isSendMassageVersion && !isLoading && (
                'Надіслати'
              )}

              {isLoading && (<Loader />)}
            </Button>

            {msg.status !== Status.NONE && (
              <StatusNotification msg={msg} setMsg={setMsg} />
            )}
          </div>
        )}
      </div>

      {isOrderVersion && (
        <div
          className={cn('flex flex-col gap-8 sm:gap-16',
            // 'border border-solid border-red',
            'col-span-2 sm:col-span-6 md:col-start-7 md:col-span-6',
          )}
        >
          <div
          // className='border border-solid border-red'
          >
            {children}
          </div>

          <RadioButton
            title="Доставка"
            options={delivery}
            name="delivery"
            register={register}
            validation={validation.delivery}
          />

          <RadioButton
            title="Оплата"
            options={payOption}
            name="payOption"
            register={register}
            validation={validation.payOption}
          />

          <div className="flex gap-6 flex-col sm:flex-row">
            <div className="h-16 flex-grow sm:flex-1">
              <Button
                path='/'
                option='secondary'
              >
                Продовжити покупки
              </Button>
            </div>

            <div className="h-16 flex-grow sm:flex-1">
              <Button
                type='submit'
                option='primary'
                isDisable={!isValid}
              >
                {isOrderVersion && !isLoading && (
                  'Підтвердити замовлення'
                )}
                {isLoading && (<Loader />)}
              </Button>

              {msg.status !== Status.NONE && (
                <StatusNotification msg={msg} setMsg={setMsg} />
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        text={description}
      />
    </form>
  );
}
