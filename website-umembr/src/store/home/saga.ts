import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  SET_CRITERIAS_ASYNC,
  SET_CRITERIAS,
  GET_PROFILE_STORIES,
  GET_PROFILE_STORIES_ASYNC,
  SET_HOME_LOADING,
} from './action-types';
import { FetchService, actionObject, showDialog } from '@/utils';
import { authSelector } from '../selectors';
import { filterStoryActionG } from '../actions';

function* getProfileStoriesAsync(): any {
  try {
    yield put(actionObject(SET_HOME_LOADING, true));
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, 'main/stories', 'GET', {}, user?.token);
    const data = {
      draftStories: result?.draftStories,
      publishedStories: result?.publishedStories,
      collaboratorStories: result?.collaboratorStories,
      purchasedStories:result?.purchasedStories,
    };
    yield put(actionObject(GET_PROFILE_STORIES_ASYNC, data));
    yield put(actionObject(SET_HOME_LOADING, false));
  } catch (error: any) {
    let message = error?.message;
    yield call(showDialog,"No token provided", 'error')
    yield put(actionObject(SET_HOME_LOADING, false));
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}

function* filterStories({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const response = yield call(FetchService, 'main/search', 'POST', payload, user?.token, false);
    yield put(
      actionObject(SET_CRITERIAS_ASYNC, {
        criterias: payload,
        result: response?.result,
      }),
    );
    if (payload?.search !== '') {
      yield put(filterStoryActionG(payload?.search));
    }
  } catch (error: any) {
    console.log(error);
  }
}

export function* watchFilterStories() {
  yield takeLatest(SET_CRITERIAS, filterStories);
}

export function* watchGetProfileStories() {
  yield takeLatest(GET_PROFILE_STORIES, getProfileStoriesAsync);
}
