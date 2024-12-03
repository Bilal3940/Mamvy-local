import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionObject, showDialog } from '../../utils/common';

import {
  GET_PRODUCTS,
  GET_PRODUCTS_ASYNC,
  GET_PRODUCT,
  GET_PRODUCT_ASYNC,
  CREATE_PRODUCT,
  CREATE_PRODUCT_ASYNC,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_ASYNC,
  SET_SELECTED_TIER,
  SET_SELECTED_TIER_ASYNC,
  CREATE_CHECKOUT_SESSION_ASYNC,
  CREATE_CHECKOUT_SESSION,
} from './action-types';
import { authSelector } from '../selectors';
import FetchService from '@/utils/FetchService';

function* getProductsAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    // if (!checkPermissions(user?.roles, 'PRODUCTS_GET')) throw new Error('not_allowed');
    let url = `/subscription/subscription-list`;
    if (payload.search) url += `&search=${payload.search}`;
    const { result } = yield call(FetchService, url, 'GET', '', user?.token);
    if (result) {
      yield put(actionObject(GET_PRODUCTS_ASYNC, result));
    }
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}


function* createCheckoutSessionAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    // if (!checkPermissions(user?.roles, 'PRODUCTS_GET')) throw new Error('not_allowed');
    let url = `/subscription/create-checkout-session`;
    const { result } = yield call(FetchService, url, 'POST', payload, user?.token);
    if (result) {
      yield put(actionObject(CREATE_CHECKOUT_SESSION_ASYNC, result));
    }
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}




function* getProductAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    // if (!checkPermissions(user?.roles, 'PRODUCT_GET')) throw new Error('not_allowed');
    const url = `/api/products/${payload}`;
    const { result } = yield call(FetchService, url, 'GET', '', user?.token);
    if (result) yield put(actionObject(GET_PRODUCT_ASYNC, result));
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}

function* createProductAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    // if (!checkPermissions(user?.roles, 'PRODUCT_CREATE')) throw new Error('not_allowed');
    const url = `/subscription/create-subscription-options`;
    const { result } = yield call(FetchService, url, 'POST', payload, user?.token);
    if (result) {
      yield put(actionObject(CREATE_PRODUCT_ASYNC, result));
      yield call(showDialog, `Product created successfully`, 'success');
    }
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}

function* updateProductAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    // if (!checkPermissions(user?.roles, 'PRODUCT_UPDATE')) throw new Error('not_allowed');
    const url = `/subscription/update-subscription-options`;
    const { result } = yield call(FetchService, url, 'PUT', payload, user?.token);
    if (result) {
      yield put(actionObject(UPDATE_PRODUCT_ASYNC, result));
      yield call(showDialog, `Product updated successfully`, 'success');
    }
  } catch (error: any) {
    let message = error?.message;
    if (error?.message?.includes('error')) message = JSON.parse(message)?.error;
    yield call(showDialog, message, 'error');
  }
}

function* setSelectedTierAsync({ payload }: any): any {
  try {
    // Call any additional services here if needed, otherwise just dispatch the payload
    yield put(actionObject(SET_SELECTED_TIER_ASYNC, payload));
  } catch (error: any) {
    const message = error?.message?.includes('error')
      ? JSON.parse(error.message).error
      : error.message;
    yield call(showDialog, message, 'error');
  }
}

export function* watchSetSelectedTier() {
  yield takeLatest(SET_SELECTED_TIER, setSelectedTierAsync);
}

export function* watchcreateCheckoutSession() {
  yield takeLatest(CREATE_CHECKOUT_SESSION, createCheckoutSessionAsync);
}

export function* watchGetProducts() {
  yield takeLatest(GET_PRODUCTS, getProductsAsync);
}

export function* watchGetProduct() {
  yield takeLatest(GET_PRODUCT, getProductAsync);
}

export function* watchCreateProduct() {
  yield takeLatest(CREATE_PRODUCT, createProductAsync);
}

export function* watchUpdateProduct() {
  yield takeLatest(UPDATE_PRODUCT, updateProductAsync);
}

