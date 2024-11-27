import { FetchService, actionObject, areUrlsEqual, showDialog } from '@/utils';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  createMemoryActionG,
  deleteMemoryActionG,
  paginateMemoryAction,
  paginateMemoryActionAsync,
  removeMemory,
  setMemoryTypesAsync,
  updateMemoryActionG,
} from '../actions';
import { UPDATE_USER_DATA_ASYNC } from '../auth/action-types';
import { SET_CRITERIAS_ASYNC } from '../home/action-types';
import { authSelector, memorySelector } from '../selectors';
import {
  APPROVE_MEMORY,
  APPROVE_MEMORY_ASYNC,
  CREATE_MEMORY,
  CREATE_MEMORY_ASYNC,
  DELETE_MEMORY,
  DELETE_MEMORY_ASYNC,
  GET_MEMORIES,
  GET_MEMORIES_ASYNC,
  PAGINATE_BUBBLES,
  SET_MEDIA_TYPE,
  SET_MEDIA_TYPE_TRIGGER,
  SET_STEP_CREATE_MEMORY,
  SET_STEP_CREATE_MEMORY_TRIGGER,
  UPDATE_MEMORY,
  UPDATE_MEMORY_ASYNC,
  VIEW_MEMORY,
} from './action-types';
import { RefreshUserData } from '@/utils/fetchUserData';

function* setCreateMemoryStep({ payload }: any) {
  yield put(actionObject(SET_STEP_CREATE_MEMORY_TRIGGER, payload));
}

function* setMediaType({ payload }: any) {
  yield put(actionObject(SET_MEDIA_TYPE_TRIGGER, payload));
}























































function* createMemory({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);

    
    let totalSize = 0;

    
    if (payload.media && payload.media.size) {
      totalSize += payload.media.size;
    }

    
    if (payload.complementaryMedia && Array.isArray(payload.complementaryMedia)) {
      payload.complementaryMedia.forEach((file: File) => {
        if (file.size) {
          totalSize += file.size;
        }
      });
    }
    
    const payloadMemory = {
      ...payload,
      totalSize,
    };

    
    const response = yield call(FetchService, 'memory', 'POST', payloadMemory, user?.token);
    yield put(actionObject(CREATE_MEMORY_ASYNC, response?.result));
    yield put(createMemoryActionG(response?.result));
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    
    alert(message);
    
  }
}



















































function* updateMemoryAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);

    
    let totalSize = 0;

    
    if (payload.media && payload.media.size) {
      totalSize += payload.media.size;
    }

    
    if (payload.complementaryMedia && Array.isArray(payload.complementaryMedia)) {
      payload.complementaryMedia.forEach((file: File) => {
        if (file.size) {
          totalSize += file.size;
        }
      });
    }

    
    const payloadMemory = {
      ...payload,
      totalSize, 
    };
    
    const response = yield call(
      FetchService,
      `memory/${payload?.story_id}/${payload?.id}`,
      'PUT',
      payloadMemory,
      user?.token,
    );

    
    yield put(actionObject(UPDATE_MEMORY_ASYNC, response?.result?.updatedMemory));
    yield put(updateMemoryActionG(response?.result?.updatedMemory));
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) {
      message = JSON.parse(message)?.error;
    }
    
    alert(message);
  }
}

function* approveUpdateMemoryAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);

    const response = yield call(
      FetchService,
      `memory/approval/${payload?.id}/${payload?.story_id}`,
      'PUT',
      {},
      user?.token,
    );

    yield put(actionObject(APPROVE_MEMORY_ASYNC, response?.result?.updatedMemory));
    yield call(showDialog, response?.result?.message, 'success');
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}
function* getMemoriesStory({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, `memory/${payload?.story_id}`, 'POST', payload?.query, user?.token);
    const memories = [...(result || [])];
    yield put(actionObject(GET_MEMORIES_ASYNC, memories));
    yield put(
      actionObject(SET_CRITERIAS_ASYNC, {
        criterias: payload?.query || { search: '', prompts: [], collaborators: [] },
        result: [],
      }),
    );
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}

function* deleteMemoryAsync({ payload, callback }: ReturnType<typeof removeMemory>): any {
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(
      FetchService,
      `memory/${payload?.story_id}/${payload?.id}`,
      'DELETE',
      {},
      user?.token,
    );

    if (callback) {
      callback({
        ok: true,
      });
    }
    yield put(actionObject(DELETE_MEMORY_ASYNC, payload?.id));
    yield put(deleteMemoryActionG(result?.memory));
    
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
    if (callback) {
      callback({
        ok: false,
        message,
      });
    }
  }
}

function* viewMemoryAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, `memory/view/${payload}`, 'GET', {}, user?.token);
    yield put(actionObject(UPDATE_USER_DATA_ASYNC, { ...user, ...result }));
  } catch (error: any) {
    let message = error?.message;
  }
}

function* paginateBubbles({ payload, callback }: ReturnType<typeof paginateMemoryAction>) {
  try {
    const { criterias } = payload;
    const { user } = yield select(authSelector);
    const paramObj = {
      ...(payload.page ? { page: String(payload.page) } : {}),
      ...(payload.limit ? { limit: String(payload.limit) } : {}),
      ...criterias,
    };
    const { result } = yield call(FetchService, `memory/bubbles/${payload?.storyId}`, 'POST', paramObj, user?.token);
    const { memoriesLoaded = [] }: { memoriesLoaded: { id: string; [key: string]: unknown }[] } = yield select(
      memorySelector,
    );
    const updatedData = updateAndMerge(memoriesLoaded, result.data);
    yield put(paginateMemoryActionAsync(updatedData));
    yield put(setMemoryTypesAsync(result?.filters || []));
    if (callback) {
      callback({
        ok: true,
        data: result,
      });
    }
  } catch (error: any) {
    let message = error?.message;
    if (callback) {
      callback({
        ok: false,
        message,
      });
    }
  }
}

function updateAndMerge<T extends { id: string; [key: string]: unknown }>(oldData: T[], newData: T[]) {
  const dataMap = new Map(oldData.map((item) => [item.id, item]));
  newData.forEach((item) => dataMap.set(item.id, item));
  return [...dataMap.values()];
}
export function* watchSetCreateMemoryStep() {
  yield takeLatest(SET_STEP_CREATE_MEMORY, setCreateMemoryStep);
}

export function* watchSetMediaType() {
  yield takeLatest(SET_MEDIA_TYPE, setMediaType);
}

export function* watchCreateMemory() {
  yield takeLatest(CREATE_MEMORY, createMemory);
}

export function* watchGetMemoriesStory() {
  yield takeLatest(GET_MEMORIES, getMemoriesStory);
}

export function* watchDeleteMemory() {
  yield takeLatest(DELETE_MEMORY, deleteMemoryAsync);
}

export function* watchUpdateMemory() {
  yield takeLatest(UPDATE_MEMORY, updateMemoryAsync);
}

export function* watchApproveUpdateMemory() {
  yield takeLatest(APPROVE_MEMORY, approveUpdateMemoryAsync);
}

export function* watchViewMemory() {
  yield takeLatest(VIEW_MEMORY, viewMemoryAsync);
}

export function* watchPaginateBubbles() {
  yield takeLatest(PAGINATE_BUBBLES, paginateBubbles);
}
