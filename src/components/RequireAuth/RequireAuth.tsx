import * as R from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminStore } from '../../store/admin.store';
import { Loader } from '../Loader';

export const RequireAuth = ({
  children,
}: {
  children?: R.ReactNode,
}) => {
  const { isChecked, isLoading } = useAdminStore();
  const location = useLocation();

  if (isLoading && !isChecked) {
    return <Loader />;
  }

  if (!isChecked) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};
