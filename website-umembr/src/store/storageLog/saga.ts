import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionObject, showDialog } from '../../utils/common';

import {
  GET_STORAGE_LOGS,
  GET_STORAGE_LOGS_ASYNC,
  LOG_STORAGE_USAGE,
  LOG_STORAGE_USAGE_ASYNC,
} from './action-types';
import { authSelector } from '../selectors';
import FetchService from '@/utils/FetchService';


function* logStorageUsageAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const url = `storageLogs/log`;
    const { result } = yield call(FetchService, url, 'POST', payload, user?.token);
    if (result) {
      yield put(actionObject(LOG_STORAGE_USAGE_ASYNC, result));
      // yield call(showModal, 'You have used 80% of your storage', 'SHOW_MODAL');
    //   yield call(showDialog, 'Storage log created successfully', 'success');

    }
  } catch (error: any) {
    const message = error?.message?.includes('error')
      ? JSON.parse(error.message).error
      : error.message;
    yield call(showDialog, message, 'error');
  }
}

function* UpdatelogStorageUsageAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const url = `storageLogs/update`;
    const { result } = yield call(FetchService, url, 'POST', payload, user?.token);
    if (result) {
      yield put(actionObject(LOG_STORAGE_USAGE_ASYNC, result));
    //   yield call(showDialog, 'Storage log created successfully', 'success');

    }
  } catch (error: any) {
    const message = error?.message?.includes('error')
      ? JSON.parse(error.message).error
      : error.message;
    yield call(showDialog, message, 'error');
  }
}

function* getStorageLogsAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    let url = `/storageLogs/logs/${payload}`;
    const { result } = yield call(FetchService, url, 'GET', '', user?.token);
    if (result) {
      yield put(actionObject(GET_STORAGE_LOGS_ASYNC, result));
    }
  } catch (error: any) {
    const message = error?.message?.includes('error')
      ? JSON.parse(error.message).error
      : error.message;
    yield call(showDialog, message, 'error');
  }
}


export function* watchLogStorageUsage() {
  yield takeLatest(LOG_STORAGE_USAGE, logStorageUsageAsync);
}
export function* watchUpdateLogStorageUsage() {
  yield takeLatest(LOG_STORAGE_USAGE, UpdatelogStorageUsageAsync);
}
export function* watchGetStorageLogs() {
  yield takeLatest(GET_STORAGE_LOGS, getStorageLogsAsync);
}
