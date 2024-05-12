import { useEffect, useState } from 'react';

export const useError = (initialError: any, delay: number = 0) => {
  const [error, setError] = useState(initialError);

  useEffect(() => {

    if (!error || delay <= 0) {
      return;
    }

    const timerId = setTimeout(() => {
      setError('');
    }, delay);

    return () => {
      clearTimeout(timerId);
    };

  }, [error]);

  return [error, setError];
};
