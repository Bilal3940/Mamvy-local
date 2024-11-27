import { put, takeLatest } from 'redux-saga/effects';
import {
  CLOSE_PUBLISH_MODAL,
  CLOSE_PUBLISH_MODAL_TRIGGER,
  COLLAPSE_DRAWER,
  COLLAPSE_DRAWER_TRIGGER,
  EXPAND_DRAWER,
  EXPAND_DRAWER_TRIGGER,
  OPEN_PUBLISH_MODAL,
  OPEN_PUBLISH_MODAL_TRIGGER,
} from './action-types';
import { actionObject } from '@/utils';

function* expandDrawerTrigger() {
  yield put(actionObject(EXPAND_DRAWER_TRIGGER));
}

function* collapseDrawerTrigger() {
  yield put(actionObject(COLLAPSE_DRAWER_TRIGGER));
}

function* showPublishModal() {
  yield put(actionObject(OPEN_PUBLISH_MODAL_TRIGGER));
}

function* hidePublishModal() {
  yield put(actionObject(CLOSE_PUBLISH_MODAL_TRIGGER));
}

export function* watchCollapseDrawerSaga() {
  yield takeLatest(COLLAPSE_DRAWER, collapseDrawerTrigger);
}

export function* watchExpandDrawerSaga() {
  yield takeLatest(EXPAND_DRAWER, expandDrawerTrigger);
}

export function* watchShowOpenPublishModal() {
  yield takeLatest(OPEN_PUBLISH_MODAL, showPublishModal);
}

export function* watchHideOpenPublishModal() {
  yield takeLatest(CLOSE_PUBLISH_MODAL, hidePublishModal);
}
