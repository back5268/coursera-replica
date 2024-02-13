import { getData, postData } from '@lib/axios';

export const getListCourseApi = (params) => getData('/admin/course/getListCourse', params);
export const detailCourseApi = (params) => getData('/admin/course/detailCourse', params);
export const deleteCourseApi = (params) => postData('/admin/course/deleteCourse', params);
export const addCourseApi = (params) => postData('/admin/course/addCourse', params, true);
export const updateCourseApi = (params) => postData('/admin/course/updateCourse', params, true);

export const getListCourseWebApi = (params) => getData('/course/getListCourseWeb', params);
export const detailCourseWebApi = (params) => getData('/course/detailCourseWeb', params);
export const getListSearchApi = (params) => getData('/course/getListSearch', params);
