import { useNavigate } from 'react-router-dom';

import { Loader } from "../../components/Loader";

export const NotFoundPage = ({
  title = 'Page not found',
}: {
  title?: string;
}) => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('..');
  }, 2000);

  return (
    <div
      className="
    content
    min-h-96
    flex flex-col gap-16 items-center justify-center"
    >
      <h1 className="title--h1">{title}</h1>
      <Loader />
    </div>
  );
};
