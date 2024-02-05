import { getData, postData } from '@lib/axios';

export const listLessonApi = (params) => getData('admin/lesson/getListLesson', params);
export const detailLessonApi = (params) => getData('admin/lesson/detailLesson', params);
export const deleteLessonApi = (params) => postData('admin/lesson/deleteLesson', params);
export const addLessonApi = (params) => postData('admin/lesson/addLesson', params);
export const updateLessonApi = (params) => postData('admin/lesson/updateLesson', params);
