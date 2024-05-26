import * as R from 'react';
import { Link, useParams } from 'react-router-dom';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

import cn from 'classnames';

import { validation } from '../../constants/formAdminValidation';
import { Button2, Option as Button2Option } from '../../components/Button2';
import { MyForm } from '../../types/MyForm';
import { FormFields } from '../../components/FormFields';
import { Loader } from '../../components/Loader';
import { TySelectOption } from '../../types/SelectOption';
import { ProductsTable } from '../../components/ProductsTable/ProductsTable';
import { ServicesTable } from '../../components/ServicesTable/ServicesTable';

enum AdminAction {
  PRODUCT_CREATE = 'productCreate',
  PRODUCT_REMOVE = 'productremove',
}

const actions: TySelectOption[] = [
  { value: AdminAction.PRODUCT_CREATE, label: 'Creat product', },
  { value: AdminAction.PRODUCT_REMOVE, label: 'Remove product', },
];


export const AdminPage = () => {
  const [selectedAction, setSelectedAction]
    = R.useState<TySelectOption | null>(null);
  const params = useParams();

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm<MyForm>({
    defaultValues: {
      adminAction: AdminAction.PRODUCT_CREATE,
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<MyForm> = async (data) => {
    console.log(data);

  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="mt-4 text-center font-bold">Admin</h2>
        </div>
        <nav className="mt-6">
          {['products', 'services', 'orders'].map(item => (
            <Link
              key={item}
              to={`/admin/${item}`}
              className={cn("block px-6 py-2 text-gray-700",
                {
                  'hover:bg-gray-300': item !== params.option,
                  'bg-gray-500': item === params.option,
                }
              )}>
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Users</h1>
          <input type="text" placeholder="Search here..." className="p-2 border rounded-md" />
        </div> */}

        <div className="mt-6 bg-white shadow-md rounded-lg">
          {params.option === 'products' && (
            <ProductsTable />
          )}

          {params.option === 'services' && (
            <ServicesTable />
          )}

          <div className="p-4 flex justify-between items-center">
            <div className="text-sm text-gray-700">Showing 1 to 10 of 50 entries</div>
            <div>
              {[1, 2, 3, 4, 5].map(item => (
                <button
                  key={item}
                  type="button"
                  className={cn('px-4 py-2 border rounded', {
                    'hover:bg-blue-300': item !== 2,
                    'bg-blue-500 text-white': item === 2,
                  })}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="
    content
    flex flex-col gap-[20px]
    pt-[24px] pb-[4px]
    sm:pb-[62px] sm:flex-row
    md:pt-[92px] md:pb-[84px]"
    >
      <form
        className="
        flex-1
        flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className="
        flex flex-col"
        >
          <div
            className="
          flex flex-col gap-[24px] items-center justify-center"
          >
            <h2
              className="
            title title--h2"
            >
              Title
            </h2>

            <p
              className="title title--body-text"
            >
              Description
            </p>
          </div>

          {isSubmitting
            ? <Loader />
            : (
              <div className="flex-1">
                <div className="flex flex-col gap-[8px]">
                  <FormFields
                    type="text"
                    textLabel="Name"
                    name="name"
                    register={register}
                    errors={errors}
                    required
                    validation={validation.name}
                    placeholder="Name"
                  />

                  <FormFields
                    type="number"
                    textLabel="categoryId"
                    name="categoryId"
                    register={register}
                    errors={errors}
                    required
                    validation={validation.categoryId}
                    placeholder="categoryId"
                  />
                </div>
              </div>
            )}
        </div>

        <div className="h-[48px]">
          <Button2
            type='submit'
            option={Button2Option.PRIMARY}
            isDisable={!isValid}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button2>

          {/* {msg.description && (
            <div className="relative w-0 h-0">
              <div className="absolute top-1">
                <Notification
                  msg={msg.description}
                  classContainer={cn('w-[250px] h-fit p-[10px] pr-[30px]', {
                    'bg-green-300': msg.status === Status.SUCCESS,
                    'bg-red-300': msg.status === Status.ERROR,
                  })}
                  onDelay={() => setMsg({
                    status: Status.NONE,
                    description: '',
                  })}
                />
              </div>
            </div>
          )} */}
        </div>

        {/* <div className="mb-4">
          <button
            type="submit"
            className={cn('button', 'w-full', 'bg-green-500', 'text-white', 'font-bold', 'py-2', 'rounded', 'focus:outline-none', 'focus:shadow-outline', {
              'opacity-50 cursor-not-allowed': isSubmitting,
            })}
            disabled={isSubmitting || isValid}
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>
        </div> */}

        {/* <p className="text-sm">Do not have an account? <Link to="/sign-up" className="text-blue-500">Sign up</Link></p> */}
      </form>

      <Controller
        name="adminAction"
        control={control}
        rules={validation.adminAction}
        render={({ field: { onChange, onBlur }, fieldState }) => (
          <div className="flex flex-col gap-[8px]">
            <span
              className={cn('form__select-label title--body-text', {
                'text-red-500': fieldState.error,
              })}
            >
              Actions
            </span>

            <Select
              placeholder="Select action"
              options={actions}
              value={selectedAction}
              onChange={val => {
                setSelectedAction(val);
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
    </div>

  );
};

