import { getData, postData } from '@lib/axios';

export const getListCourseApi = (params) => getData('/admin/course/getListCourse', params);
export const deleteCourseApi = (params) => postData('/admin/course/deleteCourse', params);
export const addCourseApi = (params) => postData('/admin/course/addCourse', params);
export const updateCourseApi = (params) => postData('/admin/course/updateCourse', params);
