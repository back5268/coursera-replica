import { getData, postData } from '@/lib/axios';

export const listUserApi = (params) => getData('admin/user/getListUser', params);
export const detailUserApi = (params) => getData('admin/user/detailUser', params);
export const deleteUserApi = (params) => postData('admin/user/deleteUser', params);
export const addUserApi = (params) => postData('admin/user/addUser', params);
export const updateUserApi = (params) => postData('admin/user/updateUser', params);
