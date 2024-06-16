import * as R from 'react';
import { useLocation } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
// import Select from 'react-select';
import Creatable from 'react-select/creatable';
import cn from 'classnames';

// import { FormFields } from '../FormFields/FormFields';
import { MyForm } from '../../types/MyForm';
import { FormFields2 } from '../FormFields/FormFields2';

import { Button2, Option as Button2Option } from '../Button2';

import { formApi } from '../../api/form.api';
import { validation } from '../../constants/formValidation';
import { Modal } from '../Modal';
import { delivery, payOption } from '../../constants/radioOptions';
import { RadioButtonGroup } from '../RadioButtonGroup/RadioButtonGroup';
import { formVersionData } from '../../constants/formVersionData';
import { Notification } from '../Notification';
import { useCartStore } from '../../store/cart.store';
import { TySelectOption } from '../../types/SelectOption';
import { OutcomeReport, Status } from '../../types/Info';
import { article } from '../../constants/footerData';

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

export const FormComponent = ({
  formVersion,
  children,
}: {
  formVersion: keyof typeof formVersionData;
  children?: R.ReactNode;
}) => {
  const [selectedCity, setSelectedCity] = R.useState<TySelectOption | null>(null);
  const [isModalOpen, setIsModalOpen] = R.useState(false);
  const [msg, setMsg]
    = R.useState<OutcomeReport>({ status: Status.NONE, description: '', });
  const [description, setDescription] = R.useState({
    title: '',
    description: '',
  });
  const location = useLocation();
  const { items: inCartItems } = useCartStore();

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
          });

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
          });

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
          });

        break;
      }

      default: {
        setMsg({
          status: Status.ERROR,
          description: 'Something went wrong',
        });

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
      className="form"
    >

      {/* <input style={} /> */}
      <div
        className={cn('form__wrap', {
          'form__wrap--flex-column': isOrderVersion,
        })}
      >
        <div
          className={cn('form__first-part', {
            'form__first-part--consultation': isConsultationVersion,
            'form__first-part--order': isOrderVersion,
            'form__first-part--sendMessage': isSendMassageVersion,
          })}
        >
          <div
            className={cn('form__title-wrap', {
              'form__title-wrap--no-alight-center': !isOrderVersion,
            })}
          >
            <h2
              className={cn('title title--h2 form__title', {
                'form__title--text-left': !isOrderVersion,
              })}
            >
              {formVersionData[formVersion].title}
            </h2>
            <p
              className={cn('form__title-description', {
                'form__title-description--text-left': !isOrderVersion,
              })}
            >
              {formVersionData[formVersion].description}
            </p>
          </div>

          <div className="form__group-fields">
            <div className="form__group-inputs">
              <FormFields2<MyForm>
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
                  <FormFields2<MyForm>
                    type="tel"
                    name="phoneNumber"
                    textLabel="Номер телефону"
                    register={register}
                    validation={validation.phoneNumber}
                    errors={errors}
                    required
                  />

                  <FormFields2<MyForm>
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
                  <FormFields2<MyForm>
                    type="tel"
                    name="phoneNumber"
                    textLabel="Номер телефону"
                    register={register}
                    validation={validation.phoneNumber}
                    errors={errors}
                    required
                  />

                  <FormFields2<MyForm>
                    type="mail"
                    name="email"
                    textLabel="E-mail"
                    register={register}
                    validation={validation.email}
                    errors={errors}
                    placeholder="some@email.com"
                    required
                  />

                  <FormFields2<MyForm>
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
                  <FormFields2<MyForm>
                    type="text"
                    textLabel="Ваше Прізвище"
                    name="lastName"
                    register={register}
                    errors={errors}
                    required
                    validation={validation.lastName}
                    placeholder="Прізвище"
                  />

                  <FormFields2<MyForm>
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
                          <span className="text-red">
                            {fieldState.error.message}
                          </span>
                        )}
                      </div>
                    )}
                  />

                  <FormFields2<MyForm>
                    type="tel"
                    name="phoneNumber"
                    textLabel="Номер телефону"
                    register={register}
                    validation={validation.phoneNumber}
                    errors={errors}
                    required
                  />

                  <FormFields2<MyForm>
                    type="mail"
                    name="email"
                    textLabel="E-mail"
                    register={register}
                    validation={validation.email}
                    errors={errors}
                    placeholder="some@email.com"
                    required
                  />

                  <FormFields2<MyForm>
                    type="textarea"
                    name="message"
                    textLabel="Коментар"
                    register={register}
                    errors={errors}
                  />
                </>
              )}
            </div>

            <div className="form__checkbox-agreement">
              <label className="form__checkbox-agreement-label">
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
                  className="form__checkbox-agreement-button"
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
              {errors.agreement && (
                <p className="flex flex-wrap title--micro text-red">
                  {errors.agreement.message}
                </p>
              )}
            </div>

            {!isOrderVersion && (
              <div className="h-16">
                <Button2
                  type='submit'
                  option={Button2Option.PRIMARY}
                  isDisable={!isValid}
                >
                  {isConsultationVersion
                    ? 'Передзвоніть мені'
                    : 'Надіслати'}
                </Button2>

                {msg.status !== Status.NONE && (
                  <div className="relative w-0 h-0">
                    <div className="absolute top-1">
                      <Notification
                        classContainer={cn('w-[250px] h-fit p-[10px] pr-[30px]', {
                          'bg-system-success': msg.status === Status.SUCCESS,
                          'bg-red': msg.status === Status.ERROR,
                        })}
                        onDelay={() => setMsg({
                          status: Status.NONE,
                          description: '',
                        })}
                      >
                        <p className='title--body'>{msg.description}</p>
                      </Notification>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          className={cn('form__second-part', {
            'form__second-part--order': isOrderVersion,
          })}
        >
          {isOrderVersion && ( // When the cads be ready we can add rules about length
            <div>{children}</div>
          )}

          <div className="form__group-radio">
            {isOrderVersion && (
              <>
                <RadioButtonGroup
                  title="Доставка"
                  options={delivery}
                  name="delivery"
                  register={register}
                  validation={validation.delivery}
                />

                <RadioButtonGroup
                  title="Оплата"
                  options={payOption}
                  name="payOption"
                  register={register}
                  validation={validation.payOption}
                />
              </>
            )}
          </div>

          {isOrderVersion && (
            <div className="form__order-group-button">
              <div className="h-16">
                <Button2
                  path='/'
                  option={Button2Option.SECONDARY}
                >
                  <span
                    className="
          group-hover:-translate-x-[5px] transition duration-300"
                  >
                    Продовжити покупки
                  </span>

                  <span
                    className="
          w-6 text-3xl
          group-hover:-translate-x-[-5px] transition duration-300"
                  >
                    &#8594;
                  </span>
                </Button2>
              </div>

              <div className="h-16">
                <Button2
                  type='submit'
                  option={Button2Option.PRIMARY}
                  isDisable={!isValid}
                >
                  Підтвердити замовлення
                </Button2>

                {msg.status !== Status.NONE && (
                  <div className="relative w-0 h-0">
                    <div className="absolute top-1">
                      <Notification
                        classContainer={cn('w-[250px] h-fit p-[10px] pr-[30px]', {
                          'bg-system-success': msg.status === Status.SUCCESS,
                          'bg-red': msg.status === Status.ERROR,
                        })}
                        onDelay={() => setMsg({
                          status: Status.NONE,
                          description: '',
                        })}
                      >
                        <p className='title--body'>{msg.description}</p>
                      </Notification>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        text={description}
      />
    </form>
  );
};
