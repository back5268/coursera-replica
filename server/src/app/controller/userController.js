import { addUserValid, listUserValid, updateUserValid } from '@lib/validation';
import { addUserMd, countListUserMd, deleteUserMd, getDetailUserMd, getListUserMd, updateUserMd } from '@models';
import { validateData } from '@utils';

export const getListUser = async (req, res) => {
  try {
    const error = validateData(listUserValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, email, status } = req.query;
    const where = {};
    if (keySearch) where.$or = [{ fullname: { $regex: keySearch, $options: 'i' } }, { username: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (email) where.email = { $regex: email, $options: 'i' };
    const data = await getListUserMd(where, page, limit);
    const total = await countListUserMd(where);
    res.status(200).json({ status: true, data: { data, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailUser = async (req, res) => {
  try {
    const error = validateData({ id: 'string' }, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { id } = req.query;
    const data = await getDetailUserMd({ id });
    if (!data) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const error = validateData({ id: 'string' }, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { id } = req.query;
    const data = await deleteUserMd({ id });
    if (!data) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addUser = async (req, res) => {
  try {
    const error = validateData(addUserValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { fullname, username, email, password, bio, address, status, role } = req.body;

    const checkEmail = await getDetailUserMd({ email });
    if (checkEmail) return res.status(400).json({ status: false, mess: 'Email đã tồn tại!' });
    const checkUsername = await getDetailUserMd({ username });
    if (checkUsername) return res.status(400).json({ status: false, mess: 'Username đã tồn tại!' });

    const data = await addUserMd({ fullname, username, email, password, bio, address, status, role });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateUser = async (req, res) => {
  try {
    const error = validateData(updateUserValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { id, fullname, username, email, password, bio, address, status, role } = req.body;

    if (email) {
      const checkEmail = await getDetailUserMd({ email });
      if (checkEmail) return res.status(400).json({ status: false, mess: 'Email đã tồn tại!' });
    }
    if (username) {
      const checkUsername = await getDetailUserMd({ username });
      if (checkUsername) return res.status(400).json({ status: false, mess: 'Username đã tồn tại!' });
    }

    const data = await updateUserMd({ id }, { fullname, username, email, password, bio, address, status, role });
    if (!data) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
