import { GET_EXTRA_CONTENT, GET_EXTRA_CONTENT_SUCCESS } from './action-types';
import { actionObject } from '@/utils';

export const getExtraContent = (storyId: string, callback?: any) =>
  actionObject(GET_EXTRA_CONTENT, { storyId }, callback);

export const getExtraContentSuccess = (data: any) =>
  actionObject(GET_EXTRA_CONTENT_SUCCESS, data);
