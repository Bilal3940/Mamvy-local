import { GET_SIGNED_URL, GET_UPLOAD_SIGNED_URL } from './action-types';
import { actionObject } from '@/utils';

export const getUploadSignedUrl = (data: any, callback: any) => actionObject(GET_UPLOAD_SIGNED_URL, data, callback);
export const getSignedUrl = (data: any, callback: any) => actionObject(GET_SIGNED_URL, data, callback)