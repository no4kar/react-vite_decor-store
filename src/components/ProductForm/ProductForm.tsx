import * as R from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FormField } from '../FormField';
import { adminApi } from '../../api/admin.api';
import { TyProduct, TyProductForForm } from '../../types/Products';
import { OutcomeReport, Status } from '../../types/Info';
import { Button } from '../Button';
import { validation } from '../../constants/formAdminValidation';
import { StatusNotification } from '../Notification/StatusNotification';

enum FormVersion {
  EDIT = 'edit',
  CREATE = 'create',
}

export const ProductForm = R.memo(Component);

function Component({
  product,
}: {
  product: TyProduct | null
}) {
  const [msg, setMsg]
    = R.useState<OutcomeReport>({ status: Status.NONE, description: '', });
  const formVersion = product ? FormVersion.EDIT : FormVersion.CREATE;

  const {
    register,
    formState: { errors, isValid, isSubmitting, isLoading },
    // control,
    handleSubmit,
    // getValues,
    reset,
  } = useForm<TyProductForForm>(// if is :id need defult values
    {
      defaultValues: {
        id: product?.id || 0,
        name: product?.name || 'product?.name',
        categoryId: product?.categoryId || 1,
        price: product?.price || 9999,
        country: product?.country || 'product?.country',
        producer: product?.producer || 'product?.producer',
        collection: product?.collection || 'product?.collection',
        type: product?.type || 'product?.type',
        code: product?.code || 'product?.code',
        tone: product?.tone || 'product?.tone',
        room: product?.room || 'product?.room',
        description: product?.description || 'product?.description',
        imageUrls: product?.imageUrl.join('\n') || '',
      },
      mode: 'all',
    }
  );

  const onSubmit: SubmitHandler<TyProductForForm> = async (data) => {
    // console.log(data);

    // normalize
    const productForServer: TyProduct = {
      ...data,
      imageUrl: data.imageUrls
        .split(/\s+/g)
        .reduce((a, c) => {
          const trimedCurrent = c.trim();

          if (trimedCurrent) {
            a.push(trimedCurrent);
          }

          return a;
        }, [] as TyProduct['imageUrl']),
    };

    let productFromServer: TyProduct | null = null;

    // return;

    switch (formVersion) {
      case FormVersion.EDIT: {
        productFromServer = await adminApi
          .editProduct<TyProduct>(productForServer)
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
        const { id, ...newProduct } = productForServer;

        productFromServer = await adminApi
          .createProduct<TyProduct>(newProduct)
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

    if (productFromServer) {
      reset({
        ...productFromServer,
        imageUrls: productFromServer?.imageUrl.join('\n'),
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
        <h1 className="title--h1">{product ? `Edit ID=${product.id}` : 'New'}</h1>

        {product !== null && (
          <FormField<TyProductForForm>
            type="number"
            textLabel="ID"
            name='id'
            register={register}
            errors={errors}
            required
            validation={validation.id}
          />
        )}

        <FormField<TyProductForForm>
          type="text"
          textLabel="Name"
          name="name"
          register={register}
          errors={errors}
          required
          validation={validation.name}
        />

        <FormField<TyProductForForm>
          type="number"
          textLabel="CategoryId"
          name="categoryId"
          register={register}
          errors={errors}
          required
          validation={validation.categoryId}
        />

        <FormField<TyProductForForm>
          type="text"
          textLabel="Price"
          name="price"
          register={register}
          errors={errors}
          required
          validation={validation.price}
        />

        <FormField<TyProductForForm>
          type="text"
          textLabel="Country"
          name="country"
          register={register}
          errors={errors}
          required
          validation={validation.country}
        />

        <FormField<TyProductForForm>
          type="text"
          textLabel="Producer"
          name="producer"
          register={register}
          errors={errors}
          required
          validation={validation.producer}
        />

        <FormField<TyProductForForm>
          type="text"
          textLabel="Collection"
          name="collection"
          register={register}
          errors={errors}
          required
          validation={validation.collection}
        />

        <FormField<TyProductForForm>
          type="text"
          textLabel="Type"
          name="type"
          register={register}
          errors={errors}
          required
          validation={validation.type}
        />

        <FormField<TyProductForForm>
          type="text"
          textLabel="Code"
          name="code"
          register={register}
          errors={errors}
          required
          validation={validation.code}
        />

        <FormField<TyProductForForm>
          type="text"
          textLabel="Tone"
          name="tone"
          register={register}
          errors={errors}
          required
          validation={validation.tone}
        />

        <FormField<TyProductForForm>
          type="text"
          textLabel="Room"
          name="room"
          register={register}
          errors={errors}
          required
          validation={validation.room}
        />

        <FormField<TyProductForForm>
          type="textarea"
          name="description"
          textLabel="Description"
          register={register}
          errors={errors}
        />

        <FormField<TyProductForForm>
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
          // <div className="relative w-0 h-0">
          //   <div className="absolute top-1">
          //     <Notification
          //       classContainer={cn('w-[250px] h-fit p-4 pr-8', {
          //         'bg-system-success': msg.status === Status.SUCCESS,
          //         'bg-red': msg.status === Status.ERROR,
          //       })}
          //       onDelay={() => setMsg({
          //         status: Status.NONE,
          //         description: '',
          //       })}
          //     >
          //       <p className='title--body'>{msg.description}</p>
          //     </Notification>
          //   </div>
          // </div>
        )}
      </div>
    </form >
  );
}
