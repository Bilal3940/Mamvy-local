import { put, takeLatest } from 'redux-saga/effects';
import { SET_STEP, SET_STEP_TRIGGER } from './action-types';
import { actionObject } from '@/utils';

function* setNextStep({ payload }: any) {
  const { step } = payload;

  yield put(actionObject(SET_STEP_TRIGGER, { step: step }));
}

export function* watchSetNextStep() {
  yield takeLatest(SET_STEP, setNextStep);
}
