import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_EXTRA_CONTENT, GET_EXTRA_CONTENT_SUCCESS } from './action-types';
import { FetchService } from '@/utils';

function* handleGetExtraContent(action: any) {
  try {
    const { storyId } = action.payload;
    const {response} = yield call(FetchService,`/extra/extra-content/${storyId}`, '');

    // Dispatch the success action
    yield put({ type: GET_EXTRA_CONTENT_SUCCESS, payload: response });

    // Trigger the callback, if any
    if (action.callback) {
      action.callback(null, response);
    }
  } catch (error: any) {
    // Trigger the callback with an error
    if (action.callback) {
      action.callback(error.message);
    }
  }
}

export function* watchExtraContentSaga() {
  yield takeLatest(GET_EXTRA_CONTENT, handleGetExtraContent);
}
