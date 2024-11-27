import { call, select, takeEvery } from 'redux-saga/effects';
import { FetchService, showDialog } from '@/utils';
import { authSelector } from '../selectors';
import { GET_SIGNED_URL, GET_UPLOAD_SIGNED_URL } from './action-types';

function* getSignedUploadUrlAsync({ payload, callback }: any): any {
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, 'file/upload', 'POST', payload, user?.token);
    if (result) {
      if (callback) callback({ ok: true, value: result });
    }
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}
function* getSignedUrlAsync({ payload, callback }: any): any {
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, 'file', 'POST', payload, user?.token, false);
    if (result) {
      if (callback) callback({ ok: true, value: result });
    }
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}
export function* watchGetUploadSignedUrl() {
  yield takeEvery(GET_UPLOAD_SIGNED_URL, getSignedUploadUrlAsync);
}

export function* watchGetSignedUrl() {
  yield takeEvery(GET_SIGNED_URL, getSignedUrlAsync);
}
