import { getData } from '@lib/axios';

export const listUserInfoApi = (params) => getData('info/getListUser', params);
export const listCourseInfoApi = (params) => getData('info/getListCourse', params);
