import { FetchService, actionObject, showDialog } from '@/utils';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  actualStory as actualStoryAction,
  actualStoryAsync,
  createStoryActionG,
  deleteStoryActionG,
  updateStory,
  updateStoryActionG,
  updateStoryAsyncAction,
} from '../actions';
import { authSelector } from '../selectors';
import {
  CLEAN_PREV_PROMPTS,
  CREATE_PAYLOAD,
  CREATE_PAYLOAD_TRIGGER,
  CREATE_STORIES,
  CREATE_STORIES_ASYNC,
  DELETE_STORY,
  DELETE_STORY_ASYNC,
  GET_STORY_STATUS_ASYNC,
  SET_ACTUAL_STORY,
  SET_CODE,
  SET_CREATE_SECTION,
  SET_CREATE_SECTION_TRIGGER,
  SET_PROMPTS,
  SET_PROMPTS_TRIGGER,
  SET_PUBLICATION,
  SET_STEP_CREATE,
  SET_STEP_CREATE_TRIGGER,
  UPDATE_STORY,
  UPDATE_STORY_ASYNC,
} from './action-types';

function* setCreateSectionName({ payload }: any) {
  yield put(actionObject(SET_CREATE_SECTION_TRIGGER, payload));
}

function* setCreateStep({ payload }: any) {
  yield put(actionObject(SET_STEP_CREATE_TRIGGER, payload));
}

function* createPayload({ payload }: any) {
  yield put(actionObject(CREATE_PAYLOAD_TRIGGER, payload));
}

function* setPrompts({ payload }: any) {
  yield put(actionObject(SET_PROMPTS_TRIGGER, payload));
}

function* getStoryStatus({ payload }: any){
try{
  const { result } = yield call(FetchService, 'stories/getStoryStatus', 'GET', payload);
  yield put(actionObject(GET_STORY_STATUS_ASYNC, result));
}catch(error){

}

}

function* createStory({ payload }: any) {
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, 'stories', 'POST', payload, user?.token);
    yield put(actionObject(CREATE_STORIES_ASYNC, result));
    yield put(actionObject(CLEAN_PREV_PROMPTS));
    yield put(createStoryActionG(result));
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}

function* actualStory({ payload }: ReturnType<typeof actualStoryAction>) {
  const { confirmPassword, id, router } =
    typeof payload === 'object'
      ? {
          ...payload,
          confirmPassword: payload.confirmPassword ? `/${payload.confirmPassword}` : '',
        }
      : {
          id: payload,
          router: undefined,
          confirmPassword: '',
        };
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, `stories/${id}${confirmPassword}`, 'GET', {}, user?.token);
    yield put(actualStoryAsync(result));
  } catch (error: any) {
  //  if (user.token) router?.push('/app/home');
   // else {
      // router?.push('/app/login');
   // }
  }
}


function* updateStoryAsync({payload}: ReturnType<typeof updateStory>) {
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, `stories/${payload.id}`, 'PUT', payload, user?.token);
    yield put(updateStoryAsyncAction(result));
    yield put(updateStoryActionG(result));
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}



function* deleteStoryAsync({ payload }: any) {
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, `stories/${payload}`, 'DELETE', {}, user?.token);
    yield put(actionObject(DELETE_STORY_ASYNC));
    yield put(deleteStoryActionG(result));
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}

function* setPublicationStory({ payload }: any) {
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, `stories/publish/${payload?.id}`, 'PUT', payload, user?.token);
    yield put(actionObject(UPDATE_STORY_ASYNC, result));
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}

function* setCodeStory({ payload }: any) {
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, `stories/checkPassword`, 'POST', payload, user?.token);
    yield put(actionObject(UPDATE_STORY_ASYNC, result));
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}

export function* watchCreateSectionStory() {
  yield takeLatest(SET_CREATE_SECTION, setCreateSectionName);
}

export function* watchSetCreateStep() {
  yield takeLatest(SET_STEP_CREATE, setCreateStep);
}

export function* watchCreateStory() {
  yield takeLatest(CREATE_STORIES, createStory);
}
export function* watchStoryActions() {
  yield takeLatest(GET_STORY_STATUS_ASYNC, getStoryStatus);
}

export function* watchCreatePayload() {
  yield takeLatest(CREATE_PAYLOAD, createPayload);
}

export function* watchSetPrompts() {
  yield takeLatest(SET_PROMPTS, setPrompts);
}

export function* watchActualStory() {
  yield takeLatest(SET_ACTUAL_STORY, actualStory);
}

export function* watchUpdateStory() {
  yield takeLatest(UPDATE_STORY, updateStoryAsync);
}

export function* watchDeleteStory() {
  yield takeLatest(DELETE_STORY, deleteStoryAsync);
}

export function* watchSetPublicationStory() {
  yield takeLatest(SET_PUBLICATION, setPublicationStory);
}

export function* watchSetCodeStory() {
  yield takeLatest(SET_CODE, setCodeStory);
}
