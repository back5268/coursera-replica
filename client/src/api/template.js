import { getData, postData } from '@lib/axios';

export const listTemplateApi = (params) => getData('admin/template/getListTemplate', params);
export const deleteTemplateApi = (params) => postData('admin/template/deleteTemplate', params);
export const addTemplateApi = (params) => postData('admin/template/addTemplate', params);
export const updateTemplateApi = (params) => postData('admin/template/updateTemplate', params);
