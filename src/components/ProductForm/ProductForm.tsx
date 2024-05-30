import * as R from 'react';
import * as RRD from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import cn from 'classnames';
import { FormFields2 } from '../FormFields/FormFields2';
import { adminApi } from '../../api/admin.api';
import { TyProduct } from '../../types/Products/Products';
import { OutcomeReport, Status } from '../../types/Info';
import { Notification } from '../Notification';
import { Button2, Option as Button2Option } from '../Button2';
import { validation } from '../../constants/formAdminValidation';
// import { Loader } from '../Loader';

enum FormVersion {
  EDIT = 'edit',
  CREATE = 'create',
}

export const ProductForm = R.memo(Component);

function Component() {
  const { id } = RRD.useParams();
  const [msg, setMsg]
    = R.useState<OutcomeReport>({ status: Status.NONE, description: '', });
  const formVersion = id ? FormVersion.EDIT : FormVersion.CREATE;
  const { state: { product } }
    = RRD.useLocation() as { state: { product: TyProduct } };

  const {
    register,
    formState: { errors, isValid, isSubmitting, isLoading },
    // control,
    handleSubmit,
    // getValues,
    reset,
  } = useForm<TyProduct>(// if is :id need defult values
    {
      defaultValues: {
        id: product?.id,
        name: product?.name,
        categoryId: product?.categoryId,
        price: product?.price,
        country: product?.country,
        producer: product?.producer,
        collection: product?.collection,
        type: product?.type,
        code: product?.code,
        tone: product?.tone,
        room: product?.room,
        description: product?.description,
        imageUrl: product?.imageUrl || [],
      },
      mode: 'all',
    }
  );

  const onSubmit: SubmitHandler<TyProduct> = async (data) => {
    data.imageUrl.forEach((item, i, arr) => {
      arr[i] = item.trim();
    });

    // console.log(data);
    let productFromServer: TyProduct | null = null;
    // return;

    switch (formVersion) {
      case FormVersion.EDIT: {
        productFromServer = await adminApi
          .editProduct<TyProduct>(data)
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

        break;
      }

      default: {


        break;
      }
    }

    // console.info(productFromServer);

    if (productFromServer) {
      reset(productFromServer);
    } else {
      reset();
    }
  };

  // R.useEffect(() => {
  //   productApi.getFromServerByParams({ id })
  //     .then((data) => {
  //       console.log(data.at(0));
  //       setProduct(data.at(0) || null);
  //     })
  //     .catch((error) => {
  //       if (error.message) {
  //         setMsg({
  //           status: Status.ERROR,
  //           description: error.message,
  //         });

  //         return;
  //       }

  //       setMsg({
  //         status: Status.ERROR,
  //         description: 'Unknown error',
  //       });
  //     });

  // }, []);

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="
    w-full h-full
    p-3
    flex flex-col gap-3"
      >
        <h1 className="title--h1">{id}</h1>

        <FormFields2<TyProduct>
          type="number"
          textLabel="ID"
          name='id'
          register={register}
          errors={errors}
          required
          validation={validation.id}
        />

        <FormFields2<TyProduct>
          type="text"
          textLabel="Name"
          name="name"
          register={register}
          errors={errors}
          required
          validation={validation.name}
        />

        <FormFields2<TyProduct>
          type="number"
          textLabel="CategoryId"
          name="categoryId"
          register={register}
          errors={errors}
          required
          validation={validation.categoryId}
        />

        <FormFields2<TyProduct>
          type="text"
          textLabel="Price"
          name="price"
          register={register}
          errors={errors}
          required
          validation={validation.price}
        />

        <FormFields2<TyProduct>
          type="text"
          textLabel="Country"
          name="country"
          register={register}
          errors={errors}
          required
          validation={validation.country}
        />

        <FormFields2<TyProduct>
          type="text"
          textLabel="Producer"
          name="producer"
          register={register}
          errors={errors}
          required
          validation={validation.producer}
        />

        <FormFields2<TyProduct>
          type="text"
          textLabel="Collection"
          name="collection"
          register={register}
          errors={errors}
          required
          validation={validation.collection}
        />

        <FormFields2<TyProduct>
          type="text"
          textLabel="Type"
          name="type"
          register={register}
          errors={errors}
          required
          validation={validation.type}
        />

        <FormFields2<TyProduct>
          type="text"
          textLabel="Code"
          name="code"
          register={register}
          errors={errors}
          required
        // validation={validation.code}
        />

        <FormFields2<TyProduct>
          type="text"
          textLabel="Tone"
          name="tone"
          register={register}
          errors={errors}
          required
        // validation={validation.tone}
        />

        <FormFields2<TyProduct>
          type="text"
          textLabel="Room"
          name="room"
          register={register}
          errors={errors}
          required
        // validation={validation.price}
        />

        <FormFields2
          type="textarea"
          name="description"
          textLabel="Description"
          register={register}
          errors={errors}
        />

        <FormFields2
          type="textarea"
          name='imageUrl'
          // value={getValues('imageUrl').join('\n')}
          textLabel="Images links"
          register={register}
          errors={errors}
        />
      </div>

      <div className="h-[48px]">
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
    </form >
  );
}
