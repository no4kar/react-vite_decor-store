import { useEffect, useRef, useState } from 'react';
import { initialDelayLoader } from '../../constants/initialDelayLoader';
import { Loader } from '../../components/Loader';
import { PageNavigation } from '../../components/PageNavigation';
import './paint.page.scss';

export const PaintPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const timerId = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, initialDelayLoader);
  }, []);

  return (
    <div className="paint">
      <div className="content">
        <div className="paint__nav">
          <PageNavigation />
        </div>

        {isLoading && <Loader />}

        {!isLoading && <div>Paint</div>}
      </div>
    </div>
  );
};
