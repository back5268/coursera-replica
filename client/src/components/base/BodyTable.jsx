import { Switch } from '../uiCore';
import moment from 'moment';

export const StatusBody = (status) => {
  return (
    <div className="flex justify-center">
      <Switch checked={Boolean(status)} />
    </div>
  );
};

export const TimeBody = (value, type = 'datetime') => {
  let format = type === 'time' ? 'HH:mm:ss' : type === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm:ss';
  if (value) return <p className='text-center'>{moment(value).format(format)}</p>;
};
