import { getData, postData } from '@/lib/axios';

export const listPostApi = (params) => getData('admin/post/getListPost', params);
export const detailPostApi = (params) => getData('admin/post/detailPost', params);
export const deletePostApi = (params) => postData('admin/post/deletePost', params);
export const addPostApi = (params) => postData('admin/post/addPost', params);
export const updatePostApi = (params) => postData('admin/post/updatePost', params);
