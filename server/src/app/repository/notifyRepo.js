import { addNotifyMd } from '@models';
import { ioSk } from 'src';

export const addNotifyRp = async ({ fromBy, by, to, content, objectId, type, data }) => {
  await addNotifyMd({ fromBy, by, to, content, objectId, type, data, status: 0 });
  ioSk.emit(`notifies_${to}`, { time: Date.now() });
};
