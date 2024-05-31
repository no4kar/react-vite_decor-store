// import React from 'react';
import {
  Navigate,
  useLocation,
} from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
// import cn from 'classnames';
import { validation } from '../../constants/formValidation';
import { Button2, Option as Button2Option } from '../../components/Button2';
import { MyForm } from '../../types/MyForm';
import { FormFields } from '../../components/FormFields';
import { useAdminStore } from '../../store/admin.store';
import { Loader } from '../../components/Loader';

export const LoginPage = () => {
  const location = useLocation();
  const { login, isLoading, isChecked } = useAdminStore();
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<MyForm>({
    defaultValues: {
      email: 'antonbabi13@gmail.com',
      password: 'password',
    },
    mode: 'onBlur',
  });

  if (isChecked) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />;
  }

  const onSubmit: SubmitHandler<MyForm> = async (data) => {

    try {
      await login(data);
      // navigate(location.state?.from?.pathname || '/');
    } catch (error) {
      console.error(error);
      alert((error as AxiosError).message);
    }
  };

  return (
    <form
      className="
      content
      pt-[24px] pb-[4px]
      flex flex-col gap-5
      sm:pb-[62px]
      md:pt-[92px] md:pb-[84px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="
          flex flex-col gap-[24px] items-center justify-center"
      >
        <h2
          className="
            title title--h2"
        >
          LOGIN AS ADMIN
        </h2>

        <p
          className="title title--body-text"
        >
          fill all fields
        </p>
      </div>

      {isLoading
        ? <Loader />
        : (
          <div className="flex-1">
            <div className="flex flex-col gap-[8px]">
              <FormFields
                type="email"
                textLabel="E-mail"
                name="email"
                register={register}
                errors={errors}
                required
                validation={validation.email}
                placeholder="Email"
              />

              <FormFields
                type="password"
                textLabel="Password"
                name="password"
                register={register}
                errors={errors}
                required
                validation={validation.password}
                placeholder="Email"
              />
            </div>
          </div>
        )}

      <div className="h-[48px]">
        <Button2
          type='submit'
          option={Button2Option.PRIMARY}
          isDisable={!isValid}
        >
          {isSubmitting ? 'Logging in...' : 'Log in'}
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
  );
};

