import { put, takeLatest } from "redux-saga/effects";
import { TOGGLE_HAS_CHANGES, SET_HAS_CHANGES } from "./actions";

function* toggleHasChangesSaga() {
  yield put({ type: SET_HAS_CHANGES, payload: true }); 
}

export function* watchToggleHasChanges() {
  yield takeLatest(TOGGLE_HAS_CHANGES, toggleHasChangesSaga);
}