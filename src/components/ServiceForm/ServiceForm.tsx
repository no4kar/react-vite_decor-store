import * as R from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FormField } from '../FormField';
import { adminApi } from '../../api/admin.api';
import { TyService } from '../../types/Service';
import { OutcomeReport, Status } from '../../types/Info';
import { Button } from '../Button';
import { validation } from '../../constants/formAdminValidation';
import { StatusNotification } from '../Notification/StatusNotification';

enum FormVersion {
  EDIT = 'edit',
  CREATE = 'create',
}

export const ServiceForm = R.memo(Component);

function Component({
  service,
}: {
  service: TyService.Item | null
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
  } = useForm<TyService.ForForm>(// if is :id need defult values
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

  const onSubmit: SubmitHandler<TyService.ForForm> = async (data) => {
    // console.log(data);

    // normalize
    const serviceForServer: TyService.Item = {
      ...data,
      imageUrl: data.imageUrls
        .split(/\s+/g)
        .reduce((a, c) => {
          const trimedCurrent = c.trim();

          if (trimedCurrent) {
            a.push(trimedCurrent);
          }

          return a;
        }, [] as TyService.Item['imageUrl']),
    };

    // console.log(serviceForServer);
    let serviceFromServer: TyService.Item | null = null;

    // return;

    switch (formVersion) {
      case FormVersion.EDIT: {
        serviceFromServer = await adminApi
          .editService<TyService.Item>(serviceForServer)
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
          .createService<TyService.Item>(newService)
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
          <FormField<TyService.ForForm>
            type="number"
            textLabel="ID"
            name='id'
            register={register}
            errors={errors}
            required
            validation={validation.id}
          />
        )}

        <FormField<TyService.ForForm>
          type="text"
          textLabel="Name"
          name="name"
          register={register}
          errors={errors}
          required
          validation={validation.name}
        />

        <FormField<TyService.ForForm>
          type="number"
          textLabel="CategoryId"
          name="categoryId"
          register={register}
          errors={errors}
          required
          validation={validation.categoryId}
        />

        <FormField<TyService.ForForm>
          type="textarea"
          name="description"
          textLabel="Description"
          register={register}
          errors={errors}
        />

        <FormField<TyService.ForForm>
          type="textarea"
          name="imageUrls"
          textLabel="Images links(space must separate images links)"
          register={register}
          errors={errors}
        />
      </div>

      <div className="h-12">
        <Button
          type='submit'
          option='primary'
          isDisable={!isValid}
        >
          {(!isSubmitting && !isLoading)
            ? 'Submit'
            : 'Submitting...'}
        </Button>

        {msg.status !== Status.NONE && (
          <StatusNotification msg={msg} setMsg={setMsg} />
        )}
      </div>
    </form >
  );
}
