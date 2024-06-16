import * as R from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import cn from 'classnames';
import { FormFields2 } from '../FormFields/FormFields2';
import { adminApi } from '../../api/admin.api';
import { TyService, TyServiceForForm } from '../../types/Services';
import { OutcomeReport, Status } from '../../types/Info';
import { Notification } from '../Notification';
import { Button2, Option as Button2Option } from '../Button2';
import { validation } from '../../constants/formAdminValidation';

enum FormVersion {
  EDIT = 'edit',
  CREATE = 'create',
}

export const ServiceForm = R.memo(Component);

function Component({
  service,
}: {
  service: TyService | null
}) {
  const [msg, setMsg]
    = R.useState<OutcomeReport>({ status: Status.NONE, description: '', });
  const formVersion = service ? FormVersion.EDIT : FormVersion.CREATE;

  const {
    register,
    formState: { errors, isValid, isSubmitting, isLoading },
    // control,
    handleSubmit,
    // getValues,
    reset,
  } = useForm<TyServiceForForm>(// if is :id need defult values
    {
      defaultValues: {
        id: service?.id || 0,
        name: service?.name || 'service?.name',
        categoryId: service?.categoryId || 1,
        description: service?.description || 'service?.description',
        imageUrls: service?.imageUrl.join('\n') || '',
      },
      mode: 'all',
    }
  );

  const onSubmit: SubmitHandler<TyServiceForForm> = async (data) => {
    // console.log(data);

    // normalize
    const serviceForServer: TyService = {
      ...data,
      imageUrl: data.imageUrls
        .split(/\s+/g)
        .reduce((a, c) => {
          const trimedCurrent = c.trim();

          if (trimedCurrent) {
            a.push(trimedCurrent);
          }

          return a;
        }, [] as TyService['imageUrl']),
    };

    // console.log(serviceForServer);
    let serviceFromServer: TyService | null = null;

    // return;

    switch (formVersion) {
      case FormVersion.EDIT: {
        serviceFromServer = await adminApi
          .editService<TyService>(serviceForServer)
          .then(res => {
            setMsg({
              status: Status.SUCCESS,
              description: 'Changes have been committed',
            });

            return res.data;
          })
          .catch((error) => {
            if (error.message) {
              setMsg({
                status: Status.ERROR,
                description: error.message,
              });

              return null;
            }

            setMsg({
              status: Status.ERROR,
              description: 'Unknown error',
            });

            return null;
          });

        break;
      }

      case FormVersion.CREATE: {
        const { id, ...newService } = serviceForServer;

        serviceFromServer = await adminApi
          .createService<TyService>(newService)
          .then(res => {
            setMsg({
              status: Status.SUCCESS,
              description: 'Changes have been committed',
            });

            return res.data || null;
          })
          .catch((error) => {
            if (error.message) {
              setMsg({
                status: Status.ERROR,
                description: error.message,
              });

              return null;
            }

            setMsg({
              status: Status.ERROR,
              description: 'Unknown error',
            });

            return null;
          });
        break;
      }

      default: {


        break;
      }
    }

    if (serviceFromServer) {
      reset({
        ...serviceFromServer,
        imageUrls: serviceFromServer?.imageUrl.join('\n'),
      });
    } else {
      reset();
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="
    w-full h-full p-3
    flex flex-col gap-3"
      >
        <h1 className="title--h1">{service ? `Edit ID=${service.id}` : 'New'}</h1>

        {service !== null && (
          <FormFields2<TyServiceForForm>
            type="number"
            textLabel="ID"
            name='id'
            register={register}
            errors={errors}
            required
            validation={validation.id}
          />
        )}

        <FormFields2<TyServiceForForm>
          type="text"
          textLabel="Name"
          name="name"
          register={register}
          errors={errors}
          required
          validation={validation.name}
        />

        <FormFields2<TyServiceForForm>
          type="number"
          textLabel="CategoryId"
          name="categoryId"
          register={register}
          errors={errors}
          required
          validation={validation.categoryId}
        />

        <FormFields2<TyServiceForForm>
          type="textarea"
          name="description"
          textLabel="Description"
          register={register}
          errors={errors}
        />

        <FormFields2<TyServiceForForm>
          type="textarea"
          name="imageUrls"
          textLabel="Images links(space must separate images links)"
          register={register}
          errors={errors}
        />
      </div>

      <div className="h-12">
        <Button2
          type='submit'
          option={Button2Option.PRIMARY}
          isDisable={!isValid}
        >
          {(!isSubmitting && !isLoading)
            ? 'Submit'
            : 'Submitting...'}
        </Button2>

        {msg.status !== Status.NONE && (
          <div className="relative w-0 h-0">
            <div className="absolute top-1">
              <Notification
                classContainer={cn('w-[250px] h-fit p-4 pr-8', {
                  'bg-system-success': msg.status === Status.SUCCESS,
                  'bg-red': msg.status === Status.ERROR,
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
    </form >
  );
}
