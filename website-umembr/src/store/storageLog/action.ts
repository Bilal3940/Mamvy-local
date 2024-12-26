import { actionObject } from '../../utils';
import {
  LOG_STORAGE_USAGE,
  GET_STORAGE_LOGS,
  GET_STORAGE_LOG,
  HIDE_STORAGE_POPUP,
  SHOW_STORAGE_POPUP,

} from './action-types';

// Log storage usage
export const logStorageUsage = (payload: any): any =>
  actionObject(LOG_STORAGE_USAGE, payload);

export const UpdatelogStorageUsage = (payload: any): any =>
  actionObject(LOG_STORAGE_USAGE, payload);
// Fetch all storage logs
export const getStorageLogs = (payload: any): any =>
  actionObject(GET_STORAGE_LOGS, payload);

// Fetch a single storage log by ID
export const getStorageLog = (payload: any): any =>
  actionObject(GET_STORAGE_LOG, payload);
export const showPopup = () => actionObject(SHOW_STORAGE_POPUP);
export const hidePopup = () => actionObject(HIDE_STORAGE_POPUP);

