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
  CANCEL_SUBSCRIPTION_ASYNC,
  CANCEL_SUBSCRIPTION,
  RESUME_SUBSCRIPTION,
  RESUME_SUBSCRIPTION_ASYNC,
  RENEW_SUBSCRIPTION_ASYNC,
  RENEW_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION_STATUS_ASYNC,
  UPDATE_SUBSCRIPTION_STATUS,
} from './action-types';
import { authSelector } from '../selectors';
import FetchService from '@/utils/FetchService';
import { REFRESH_USER_DATA } from '../auth/action-types';

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

function* cancelSubscriptionAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const url = `stripe/cancel-subscription`;
    const { result } = yield call(FetchService, url, 'POST', payload, user?.token);
    
    if (result) {
      yield put(actionObject(CANCEL_SUBSCRIPTION_ASYNC, result));
      yield call(showDialog, `Subscription canceled successfully`, 'success');
      yield put(actionObject(REFRESH_USER_DATA))
    }
  } catch (error: any) {
    console.log("I am the error", error);

    // Safely extract the error message
    const message =  JSON.parse(error.message);
    // Display the message in the dialog
    yield call(showDialog, message.message, 'error');
  }
}


function* resumeSubscriptionAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const url = `stripe/resume-subscription`;
    const { result } = yield call(FetchService, url, 'POST', payload, user?.token);
    
    if (result) {
      yield put(actionObject(RESUME_SUBSCRIPTION_ASYNC, result));
      yield call(showDialog, `Subscription canceled successfully`, 'success');
      yield put(actionObject(REFRESH_USER_DATA))
    }
  } catch (error: any) {

    // Safely extract the error message
    const message =  JSON.parse(error.message);
    // Display the message in the dialog
    yield call(showDialog, message.message, 'error');
  }
}


function* renewSubscriptionAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const url = `stripe/renew-subscription`;
    const { result } = yield call(FetchService, url, 'POST', payload, user?.token);
    
    if (result) {
      yield put(actionObject(RENEW_SUBSCRIPTION_ASYNC, result));
      yield call(showDialog, `Subscription renewed successfully.`, 'success');
      yield put(actionObject(REFRESH_USER_DATA))
    }
  } catch (error: any) {

    // Safely extract the error message
    const message =  JSON.parse(error.message);
    // Display the message in the dialog
    yield call(showDialog, message.message, 'error');
  }
}

function* updateSubscriptionStatusAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const url = `/stripe/updateStatusSubscription`;
    const { result } = yield call(FetchService, url, 'POST', payload, user?.token);
    
    if (result) {
      yield put(actionObject(UPDATE_SUBSCRIPTION_STATUS_ASYNC, result));
      yield put(actionObject(REFRESH_USER_DATA))
    }
  } catch (error: any) {

    // Safely extract the error message
    const message =  JSON.parse(error.message);
    // Display the message in the dialog
    yield call(showDialog, message.message, 'error');
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

export function* watchCancelSubscription() {
  yield takeLatest(CANCEL_SUBSCRIPTION, cancelSubscriptionAsync);
}
export function* watchResumeSubscription() {
  yield takeLatest(RESUME_SUBSCRIPTION, resumeSubscriptionAsync);
}
export function* watchRenewSubscription() {
  yield takeLatest(RENEW_SUBSCRIPTION, renewSubscriptionAsync);
}

export function* watchUpdateSubscriptionStatus() {
  yield takeLatest(UPDATE_SUBSCRIPTION_STATUS, updateSubscriptionStatusAsync);
}