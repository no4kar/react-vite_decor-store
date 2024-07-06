import R from 'react';
import cn from 'classnames';
import { Notification } from './Notification';
import { OutcomeReport, Status } from '../../types/Info';

export const StatusNotification = R.memo(MyComponent);

function MyComponent({
  msg,
  setMsg,
}: {
  msg: OutcomeReport,
  setMsg: R.Dispatch<R.SetStateAction<OutcomeReport>>,
}) {
  return (
    <div className="relative w-0 h-0">
      <div className="absolute top-1">
        <Notification
          classContainer={cn('w-[250px] h-fit p-[10px] pr-[30px]', {
            'bg-system-success': msg.status === Status.SUCCESS,
            'bg-system-warn': msg.status === Status.WARN,
            'bg-red': msg.status === Status.ERROR,
          })}
          onDelay={() => setMsg({
            status: Status.NONE,
            description: '',
          })}
        >
          <p className='title--body'>{msg.description}</p>
        </Notification>
      </div>
    </div>
  );
}
