import { countListNotifyMd, getListNotifyMd, updateNotifyMd } from '@models';
import { validateData } from '@utils';
import { listNotifyValid, updateNotifyValid } from '@lib/validation';

export const getListNotify = async (req, res) => {
  try {
    const { error, value } = validateData(listNotifyValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, status } = value;
    const where = { to: req.userInfo._id };
    if (status || status === 0) where.status = status;
    const documents = await getListNotifyMd(where, page, limit);
    const total = await countListNotifyMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateStatusNotify = async (req, res) => {
  try {
    const { error, value } = validateData(updateNotifyValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, status } = value;
    const data = await updateNotifyMd({ _id, to: req.userInfo._id }, { status });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const readAllNotify = async (req, res) => {
  try {
    const { error, value } = validateData(updateNotifyValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { status } = value;
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
