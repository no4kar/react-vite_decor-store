import * as R from 'react';
// import cn from 'classnames';
import { Link } from 'react-router-dom';
import { adminApi } from '../../api/admin.api';
import { Loader } from '../Loader';
import { useServiceStore } from '../../store/service.store';

export const ServicesTable = R.memo(FuncComponent);

function FuncComponent() {
  const {
    services,
    isLoading,
    fetchData,
  } = useServiceStore();

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
          <th className="px-2 py-2 text-left">Name</th>
          <th className="px-2 py-2 text-left">Description</th>
          <th className="px-2 py-2 text-left">imageUrls</th>
          <th className="px-2 py-2 text-left w-[100px]">Actions</th>
        </tr>
      </thead>

      <tbody>
        {services.sort((a, b) => (b.id - a.id)).map(service => (
          <tr
            key={service.id}
            className='group/row hover:bg-slate-100'
          >
            <td className="border px-2 py-2">{service.id}</td>
            <td className="border px-2 py-2">{service.name}</td>
            <td className="border px-2 py-2">{service.description}</td>
            <td className="border px-2 py-2">{service.imageUrl.map(item => (<p>{item}</p>))}</td>
            <td
              className="
            border px-2 py-2 group/action invisible
            hover:bg-slate-200 group-hover/row:visible"
            >
              <button
                type="button"
                className="border px-2 py-2 hover:bg-gray-400 active:bg-gray-500"
                onClick={async () => {
                  await adminApi.removeService(service.id);
                  fetchData();
                }}
              >
                Delete
              </button>

              <Link
                className="
                  w-fit border px-2 py-2
                  hover:bg-gray-400 active:bg-gray-500"
                to={`/admin/services/${service.id}`}
              >
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
