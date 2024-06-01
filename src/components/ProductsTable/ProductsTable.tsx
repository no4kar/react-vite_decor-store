import * as R from 'react';
import { Link } from 'react-router-dom';
// import cn from 'classnames';
import { useProductStore } from '../../store/product.store';
import { adminApi } from '../../api/admin.api';
import { Loader } from '../Loader';

export const ProductsTable = R.memo(
  () => {
    const {
      products,
      isLoading,
      fetchData,
    } = useProductStore();

    R.useEffect(() => {
      fetchData();
    }, []);

    if (isLoading) {
      return <Loader />;
    }

    return (
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 shadow">
            <th className="px-2 py-2 text-left w-14">ID</th>
            <th className="px-2 py-2 text-left">Code</th>
            <th className="px-2 py-2 text-left">Name</th>
            <th className="px-2 py-2 text-left">Price</th>
            <th className="px-2 py-2 text-left">Description</th>
            <th className="px-2 py-2 text-left w-[100px]">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.sort((a, b) => (b.id - a.id)).map(product => (
            <tr
              key={product.id}
              className='group/row hover:bg-slate-100'
            >
              <td className="border px-2 py-2">{product.id}</td>
              <td className="border px-2 py-2">{product.code}</td>
              <td className="border px-2 py-2">{product.name}</td>
              <td className="border px-2 py-2">{product.price}</td>
              <td className="border px-2 py-2">{product.description}</td>
              <td
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
                    fetchData();
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
);
