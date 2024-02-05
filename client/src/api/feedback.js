import { getData, postData } from '@lib/axios';

export const listFeedbackApi = (params) => getData('admin/feedback/getListFeedback', params);
export const deleteFeedbackApi = (params) => postData('admin/feedback/deleteFeedback', params);
export const addFeedbackApi = (params) => postData('admin/feedback/addFeedback', params);
