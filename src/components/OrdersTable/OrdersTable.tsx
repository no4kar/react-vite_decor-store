import * as R from 'react';
// import cn from 'classnames';
import { adminApi } from '../../api/admin.api';
import { Loader } from '../Loader';
import { TyOrder } from '../../types/Orders';

export const OrdersTable = R.memo(Component);

function Component() {
  const [orders, setOrders] = R.useState<TyOrder[]>([]);
  const [isLoading, setIsLoading] = R.useState<boolean>(true);

  R.useEffect(() => {
    setIsLoading(true);

    adminApi.getOrders()
      .then(res => setOrders(res.data))
      .catch(e => console.error(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-200 shadow">
          <th className="px-2 py-2 text-left w-14">ID</th>
          <th className="px-2 py-2 text-left w-14">Email</th>
          <th className="px-2 py-2 text-left w-14">PhoneNumber</th>
          <th className="px-2 py-2 text-left w-14">Status</th>
          <th className="px-2 py-2 text-left">Comment</th>
          <th className="px-2 py-2 text-left">Order item</th>
          {/* <th className="px-2 py-2 text-left w-[100px]">Actions</th> */}
        </tr>
      </thead>

      <tbody>
        {orders.sort((a, b) => (b.id - a.id)).map(service => (
          <tr
            key={service.id}
            className='group/row hover:bg-slate-100 title--body'
          >
            <td className="border px-2 py-2">{service.id}</td>
            <td className="border px-2 py-2">{service.email}</td>
            <td className="border px-2 py-2">{service.phoneNumber}</td>
            <td className="border px-2 py-2">{service.status}</td>
            <td className="border px-2 py-2">{service.comment}</td>
            <td className="border px-2 py-2 flex flex-col gap-2">{service.orderItems
              .map(item => (
                <div
                  key={item.id}
                  className='border p-1 flex flex-col gap-2'
                >
                  {/* <p>Or. id: {item.id}</p> */}
                  <p>Pr.id: {item.productId}</p>
                  <p>Price: {item.price}</p>
                  <p>Quan.: {item.quantity}</p>
                </div>
              ))}
            </td>
            {/* <td
              className="
              border px-2 py-2 group/action
              flex
              invisible
              hover:bg-slate-200 group-hover/row:visible"
            >
              <button
                type="button"
                className="border px-2 py-2 hover:bg-gray-400 active:bg-gray-500"
                onClick={async () => {
                  await adminApi.removeProduct(product.id);
                  adminApi.getOrders()
                    .then(res => setOrders(res.data))
                    .catch(e => console.error(e.message))
                    .finally(() => setIsLoading(false));
                }}
              >
                Delete
              </button>

              <Link
                className="
                  w-fit border px-2 py-2
                  hover:bg-gray-400 active:bg-gray-500"
                to={`/admin/products/${product.id}`}
              >
                Edit
              </Link>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
