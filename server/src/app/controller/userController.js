import {addUserValid, detailUserValid, listUserValid, updateUserValid} from '@lib/validation';
import { countListUserMd, deleteUserMd, getDetailUserMd, getListUserMd, updateUserMd } from '@models';
import { createUserRp } from '@repository';
import { validateData } from '@utils';
import {uploadFileToFirebase} from "@lib/firebase";

export const getListUser = async (req, res) => {
  try {
    const error = validateData(listUserValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, email, role, status } = req.query;
    const where = {};
    if (keySearch) where.$or = [{ fullName: { $regex: keySearch, $options: 'i' } }, { username: { $regex: keySearch, $options: 'i' } }];
    if (email) where.email = { $regex: email, $options: 'i' };
    if (role) where.role = role;
    if (status || status === 0) where.status = status;
    const documents = await getListUserMd(where, page, limit);
    const total = await countListUserMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListUserInfo = async (req, res) => {
  try {
    const data = await getListUserMd({ status: 1 });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailUser = async (req, res) => {
  try {
    const error = validateData(detailUserValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.query;
    const data = await getDetailUserMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const error = validateData(detailUserValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.body;
    const data = await deleteUserMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addUser = async (req, res) => {
  try {
    const error = validateData(addUserValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });

    if (req.file) {
      req.body.avatar = await uploadFileToFirebase(req.file)
    }

    const { data, mess } = await createUserRp(req.body);
    if (data && !mess) res.json({ status: true, data });
    else res.status(400).json({ status: false, mess });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateUser = async (req, res) => {
  try {
    const error = validateData(updateUserValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { _id, fullName, username, email, password, bio, address, status, role, avatar } = req.body;

    const user = await getDetailUserMd({ _id });
    if (!user) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });

    if (email) {
      const checkEmail = await getDetailUserMd({ email });
      if (checkEmail) return res.status(400).json({ status: false, mess: 'Email đã tồn tại!' });
    }

    if (username) {
      const checkUsername = await getDetailUserMd({ username });
      if (checkUsername) return res.status(400).json({ status: false, mess: 'Username đã tồn tại!' });
    }

    if (req.file) {
      avatar = await uploadFileToFirebase(req.file)
    }

    const attr = { fullName, username, email, bio, address, status, role, avatar };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      attr.password = await bcrypt.hash(password, salt);
    }

    const data = await updateUserMd({ _id }, attr);
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
