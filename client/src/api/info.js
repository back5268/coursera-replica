import { getData } from '@/lib/axios';

export const listUserInfoApi = (params) => getData('info/getListCourse', params);
export const listCourseInfoApi = (params) => getData('info/getListUser', params);
