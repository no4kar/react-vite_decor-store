import * as R from 'react';
import { useNavigate } from 'react-router-dom';

import { Loader } from "../../components/Loader";

export const NotFoundPage = R.memo(FuncComponent);

function FuncComponent({
  title = 'Page not found',
  navigateTo,
  classContainer = 'content min-h-96',
}: {
  title?: string;
  navigateTo?: string;
  classContainer?: string;
}) {
  const navigate = useNavigate();

  R.useEffect(() => {
    if (navigateTo) {
      const timeoutId = setTimeout(() => {
        navigate(navigateTo);
      }, 2000);

      return () => window.clearTimeout(timeoutId);
    }

    return () => { };
  }, []);


  return (
    <div
      className={`flex flex-col gap-16 items-center justify-center ${classContainer}`}
    >
      <h1 className="title--h1">{title}</h1>

      {navigateTo && (
        <Loader />
      )}
    </div>
  );
}
