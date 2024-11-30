import { FetchService, actionObject, showDialog } from "@/utils";
import { COLLABORATOR_GET, COLLABORATOR_GET_ASYNC, INVITE_ACCEPTED, INVITE_ACCEPTED_ASYNC, INVITE_COLLABORATOR, REMOVE_COLLABORATOR, REMOVE_COLLABORATOR_NOREGISTER } from "./action-types";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { authSelector } from "../selectors";
import { UPDATE_STORY_ASYNC } from "../story/action-types";

function* setInviteCollaborator({ payload }: any): any {
    try {
      // console.log("i am the invitation payload", payload)
      const { user } = yield select(authSelector);
      const response = yield call(FetchService, 'main/stories/invite', 'POST', payload, user?.token);
      yield call(showDialog, response?.result?.message, 'success');
      if(response?.result?.story){
        yield put(actionObject(UPDATE_STORY_ASYNC, response?.result?.story));
      }
    } catch (error: any) {
      let message = error?.message;
      if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
      yield call(showDialog, message, 'error');
    }
}


function* setInviteAccepted({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const response = yield call(FetchService, 'main/stories/invite-accept', 'POST', payload, user?.token);
    if(response?.result?.roleUser){
      yield put(actionObject(INVITE_ACCEPTED_ASYNC, response?.result?.roleUser));
      if(response?.result?.message){
      yield call(showDialog, response?.result?.message, response?.result?.roleUser === 'active' ? 'success' : 'error' );
      }
    }
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}

function* getCollaboratorStory({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const response = yield call(FetchService, `main/stories/collaborators/${payload}`, 'GET', {}, user?.token);
    yield put(actionObject(COLLABORATOR_GET_ASYNC, response?.result));
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}

function* setRemoveCollaborator({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const response = yield call(FetchService, 'main/stories/remove-collaborator', 'PUT', payload, user?.token);
    yield put(actionObject(COLLABORATOR_GET_ASYNC, response?.result));
    yield call(showDialog, response?.result?.message, 'success');
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}

function* setRemoveCollaboratorNoRegister ({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const response = yield call(FetchService, 'main/stories/inviteNoRegister', 'PUT', payload, user?.token);
    yield put(actionObject(UPDATE_STORY_ASYNC, response?.result?.story));
    yield call(showDialog, response?.result?.message, 'success');
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}


export function* watchSetInviteCollaborator() {
  yield takeLatest(INVITE_COLLABORATOR, setInviteCollaborator);
}

export function* watchSetInviteAccepted() {
  yield takeLatest(INVITE_ACCEPTED, setInviteAccepted);
}

export function* watchGetCollaboratorStory() {
  yield takeLatest(COLLABORATOR_GET, getCollaboratorStory);
}

export function* watchSetRemoveCollaborator() {
  yield takeLatest(REMOVE_COLLABORATOR, setRemoveCollaborator);
}

export function* watchSetRemoveCollaboratorNoRegister() {
  yield takeLatest(REMOVE_COLLABORATOR_NOREGISTER, setRemoveCollaboratorNoRegister);
}
