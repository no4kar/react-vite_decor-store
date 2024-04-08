import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('..');
  }, 2000);

  return (
    <div className="not-found-page">
      <strong>Page not found</strong>
    </div>
  );
};
