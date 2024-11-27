import { call, put, select, takeLatest } from "redux-saga/effects";
import { authSelector } from "../selectors";
import { FetchService, actionObject, showDialog } from "@/utils";
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_ASYNC, DELETE_NOTIFICATION,
  DELETE_NOTIFICATION_ASYNC,
  ACCEPT_NOTIFICATION_COLLABORATE,
  CLEAR_ALL_NOTIFICATIONS_ASYNC,
  CLEAR_ALL_NOTIFICATIONS
 } from "./action-types";




function* getNotifications() {
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, "notifications", "GET", {}, user?.token);
    const data = {
      allNotifications: result?.allNotifications,
      collaborationNotifications: result?.collaborationNotifications,
      otherNotifications: result?.otherNotifications
    }
    yield put(actionObject(GET_NOTIFICATIONS_ASYNC, data));
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes("error")) message = JSON.parse(message)?.error;

    yield call(showDialog, message, "error");
  }
}

function* deleteNotification({ payload }: any) {
  try {
    const { user } = yield select(authSelector);
    const {result} = yield call(FetchService, `notifications/${payload}`, "DELETE", {}, user?.token);
    yield put(actionObject(DELETE_NOTIFICATION_ASYNC, payload));
    //yield call(showDialog, result?.message, "success");
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes("error")) message = JSON.parse(message)?.error;
    yield call(showDialog, message, "error");
  }
}

function* acceptCollaborateNotification({ payload }: any) {
  try {
    const { user } = yield select(authSelector);
    yield call(FetchService, `notifications`, 'PUT', payload, user?.token);
    
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes("error")) message = JSON.parse(message)?.error;
    yield call(showDialog, message, "error");
  }
}

function* clearAllNotifications({ payload }: any) {
  try {
    const { user } = yield select(authSelector);
    const { result } = yield call(FetchService, "notifications/clear/all", "DELETE", payload, user?.token);
    yield put(actionObject(CLEAR_ALL_NOTIFICATIONS_ASYNC, payload));

    
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes("error")) message = JSON.parse(message)?.error;
    yield call(showDialog, message, "error");
  }
}


export function* watchGetNotifications() {
  yield takeLatest(GET_NOTIFICATIONS, getNotifications);
}

export function* watchDeleteNotification() {
  yield takeLatest(DELETE_NOTIFICATION, deleteNotification);
}

export function* watchAcceptCollaborateNotification() {
  yield takeLatest(ACCEPT_NOTIFICATION_COLLABORATE, acceptCollaborateNotification);
}

export function* watchClearAllNotifications() {
  yield takeLatest(CLEAR_ALL_NOTIFICATIONS, clearAllNotifications);
}