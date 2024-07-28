import * as R from 'react';
import cn from 'classnames';

export const Notification = R.memo(FuncComponent);

function FuncComponent({
  children,
  delay = 5000,
  onDelay = () => { },
  classContainer = "w-[250px] h-fit p-[10px]",
}: {
  children: R.ReactNode;
  delay?: number;
  onDelay?: () => void;
  classContainer?: string;
}) {
  const [isVisible, setIsVisible] = R.useState(true);

  const handleDelay = () => {
    onDelay();
    setIsVisible(false);
  };

  R.useEffect(() => {
    const timeoutID = setTimeout(handleDelay, delay);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [onDelay]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(classContainer,
        'relative shadow rounded',
        {
          'hidden pointer-events-none': !isVisible,
        })}
    >
      {children}

      <button
        data-cy="HideErrorButton"
        type="button"
        className="absolute top-[5px] right-[5px] p-1 shadow rounded-full"
        aria-label="HideErrorButton"
        onClick={handleDelay}
      >
        <i className="icon icon--close icon--hover w-[10px] h-[10px]" />
      </button>
    </div>
  );
}
