import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useState } from 'react';
// import Select from 'react-select';
import Creatable from 'react-select/creatable';
import cn from 'classnames';

import { FormFields } from '../FormFields/FormFields';
import { MyForm } from '../../types/MyForm';

import { Button2, Option as Button2Option } from '../Button2';

import { formApi } from '../../api/form.api';
import { validation } from '../../constants/formValidation';
import { Modal } from '../Modal';
import { delivery, payOption } from '../../constants/radioOptions';
import { RadioButtonGroup } from '../RadioButtonGroup/RadioButtonGroup';
import { formVersionData } from '../../constants/formVersionData';
import './FormPage.scss';
import { Notification } from '../Notification/Notification';

/* eslint no-console: "warn" */

type FormProps = {
  formVersion: keyof typeof formVersionData;
  children?: React.ReactNode;
};

interface CitiesOptions {
  label: string;
  value: string;
}

enum Status {
  NONE,
  SUCCESS,
  ERROR,
}

type OutcomeReport = {
  status: Status;
  description: string;
};

const cityOptions: CitiesOptions[] = [
  { label: 'Київ', value: 'Київ' },
  { label: 'Дніпро', value: 'Дніпро' },
  { label: 'Харків', value: 'Харків' },
  { label: 'Рівне', value: 'Рівне' },
];

export const FormPage: React.FC<FormProps> = ({ formVersion, children }) => {
  const [selectedCity, setSelectedCity] = useState<CitiesOptions | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msg, setMsg]
    = useState<OutcomeReport>({ status: Status.NONE, description: '', });
  const [description, setDescription] = useState({
    title: '',
    description: '',
  });

  const handleCityChange = (selectedOption: CitiesOptions | null) => {
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
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<MyForm> = data => {
    console.log(data);

    formApi.sendForm(data)
      .then(() => {
        setMsg({
          status: Status.SUCCESS,
          description: 'Дякуємо, наші консультанти звяжуться з Вами',
        });
      })
      .catch(() => {
        setMsg({
          status: Status.ERROR,
          description: 'Може спробуєте трохи пізніше',
        });
      });

    reset();
    setSelectedCity(null);
  };

  const { title, titleDescription } = formVersionData[formVersion];

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="form"
    >
      <div
        className={cn('form__wrap', {
          'form__wrap--flex-column': formVersion === 'order',
        })}
      >
        <div
          className={cn('form__first-part', {
            'form__first-part--consultation': formVersion === 'consultation',
            'form__first-part--order': formVersion === 'order',
            'form__first-part--sendMessage': formVersion === 'sendMessage',
          })}
        >
          <div
            className={cn('form__title-wrap', {
              'form__title-wrap--no-alight-center': formVersion !== 'order',
            })}
          >
            <h2
              className={cn('title title--h2 form__title', {
                'form__title--text-left': formVersion !== 'order',
              })}
            >
              {title}
            </h2>
            <p
              className={cn('form__title-description', {
                'form__title-description--text-left': formVersion !== 'order',
              })}
            >
              {titleDescription}
            </p>
          </div>

          <div className="form__group-fields">
            <div className="form__group-inputs">
              <FormFields
                textLabel="Ваше Ім'я"
                name="firstName"
                register={register}
                validation={validation.firstName}
                errors={errors}
                placeholder="Ім'я"
                required
              />

              {formVersion === 'consultation' && (
                <FormFields
                  textLabel="Номер телефону"
                  type="tel"
                  name="phoneNumber"
                  register={register}
                  validation={validation.phoneNumber}
                  errors={errors}
                  required
                />
              )}

              {formVersion === 'sendMessage' && (
                <>
                  <FormFields
                    type="mail"
                    textLabel="E-mail"
                    name="email"
                    register={register}
                    errors={errors}
                    required
                    validation={validation.email}
                    placeholder="Email"
                  />

                  <FormFields
                    type="textarea"
                    textLabel="Повідомлення"
                    name="message"
                    register={register}
                    errors={errors}
                    required
                    validation={validation.message}
                  />
                </>
              )}

              {formVersion === 'order' && (
                <>
                  <FormFields
                    textLabel="Ваше Прізвище"
                    name="lastName"
                    register={register}
                    errors={errors}
                    required
                    validation={validation.lastName}
                    placeholder="Прізвище"
                  />

                  <FormFields
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
                          className={cn('form__select-label title--body-text', {
                            'text-red-500': fieldState.error,
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
                            'text-red-500': fieldState.error,
                          })}
                          classNamePrefix="form__filter"
                          onBlur={onBlur}
                        />
                        {fieldState.error && (
                          <span className="text-red-500">
                            {fieldState.error.message}
                          </span>
                        )}
                      </div>
                    )}
                  />

                  <FormFields
                    textLabel="Номер телефону"
                    type="tel"
                    name="phoneNumber"
                    register={register}
                    errors={errors}
                    required
                    validation={validation.phoneNumber}
                  />

                  <FormFields
                    type="mail"
                    textLabel="E-mail"
                    name="email"
                    register={register}
                    errors={errors}
                    required
                    validation={validation.email}
                    placeholder="Email"
                  />

                  <FormFields
                    type="textarea"
                    textLabel="Коментар"
                    name="message"
                    register={register}
                    errors={errors}
                  />
                </>
              )}
            </div>

            <div className="form__checkbox-agreement">
              <label className="form__checkbox-agreement-label">
                <input
                  className="form__checkbox-agreement-input"
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
                      title: 'Згідно закону України ..',
                      description: '',
                    });
                  }}
                >
                  з умовами обробки персональних даних
                </button>
              </label>
              {errors.agreement && (
                <p className="form__checkbox-error-message">
                  {errors.agreement.message}
                </p>
              )}
            </div>

            {formVersion !== 'order' && (
              <div className="h-[48px]">
                <Button2
                  type='submit'
                  option={Button2Option.PRIMARY}
                  isDisable={!isValid}
                >
                  {formVersion === 'consultation'
                    ? 'Передзвоніть мені'
                    : 'Надіслати'}
                </Button2>

                {msg.description && (
                  <div className="relative w-0 h-0">
                    <div className="absolute top-1">
                      <Notification
                        classContainer={cn('w-[250px] h-fit p-[10px] pr-[30px]', {
                          'bg-system-success': msg.status === Status.SUCCESS,
                          'bg-red-500': msg.status === Status.ERROR,
                        })}
                        onDelay={() => setMsg({
                          status: Status.NONE,
                          description: '',
                        })}
                      >
                        <p>{msg.description}</p>
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
            'form__second-part--order': formVersion === 'order',
          })}
        >
          {formVersion === 'order' && ( // When the cads be ready we can add rules about length
            <div>{children}</div>
          )}

          <div className="form__group-radio">
            {formVersion === 'order' && (
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

          {formVersion === 'order' && (
            <div className="form__order-group-button">
              <div className="h-[48px]">
                <Button2
                  path='/'
                  option={Button2Option.SECONDARY}
                >
                  Продовжити покупки
                </Button2>
              </div>

              <div className="h-[48px]">
                <Button2
                  type='submit'
                  option={Button2Option.PRIMARY}
                  isDisable={!isValid}
                >
                  Підтвердити замовлення
                </Button2>

                {msg.description && (
                  <div className="relative w-0 h-0">
                    <div className="absolute top-1">
                      <Notification
                        classContainer={cn('w-[250px] h-fit p-[10px] pr-[30px]', {
                          'bg-system-success': msg.status === Status.SUCCESS,
                          'bg-red-500': msg.status === Status.ERROR,
                        })}
                        onDelay={() => setMsg({
                          status: Status.NONE,
                          description: '',
                        })}
                      >
                        <p>{msg.description}</p>
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
