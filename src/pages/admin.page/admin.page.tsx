// import * as R from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

import cn from 'classnames';

export const AdminPage = () => {
  // const [selectedAction, setSelectedAction]
  //   = R.useState<TySelectOption | null>(null);
  const params = useParams();

  // const {
  //   register,
  //   formState: { errors, isValid, isSubmitting },
  //   control,
  //   handleSubmit,
  // } = useForm<MyForm>({
  //   defaultValues: {
  //     adminAction: AdminAction.PRODUCT_CREATE,
  //   },
  //   mode: 'onBlur',
  // });

  // const onSubmit: SubmitHandler<MyForm> = async (data) => {
  //   console.log(data);

  // };

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
          <Outlet />

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
};

