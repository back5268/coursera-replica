import { getData, postData } from '@lib/axios';

export const getListPostApi = (params) => getData('/admin/post/getListPost', params);
export const deletePostApi = (params) => postData('/admin/post/deletePost', params);
export const addPostApi = (params) => postData('/admin/post/addPost', params, true);
export const updatePostApi = (params) => postData('/admin/post/updatePost', params, true);
