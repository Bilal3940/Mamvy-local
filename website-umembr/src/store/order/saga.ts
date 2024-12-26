import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionObject, showDialog } from '../../utils/common';

import {
    CREATE_ORDER,
    CREATE_ORDER_ASYNC,
    GET_ORDERS,
    GET_ORDERS_ASYNC,
    ORDER_FAILURE,
} from './action-types';
import { authSelector } from '../selectors';
import FetchService from '@/utils/FetchService';
import { CLOSE_SUBSCRIPTION_POPUP } from '../intermitence/action-types';
import { REFRESH_USER_DATA } from '../auth/action-types';

function* getOrdersAsync({ payload }: any): any {
    try {
        const { user } = yield select(authSelector);
        let url = `/order/all?page=${payload.page}&pageSize=${payload.pageSize}`;
        if (payload.search) url += `&search=${payload.search}`;
        const { result } = yield call(FetchService, url, 'GET', '', user?.token);
        if (result) {
            yield put(actionObject(GET_ORDERS_ASYNC, result));
        }
    } catch (error: any) {
        const message = error?.message?.includes('error') 
            ? JSON.parse(error.message).error 
            : error.message;
        yield call(showDialog, message, 'error');
    }
}

function* createOrderAsync({ payload }: any): any {
    try {
        const { user } = yield select(authSelector);
        const url = `order/create`;
        const { result } = yield call(FetchService, url, 'POST', payload, user?.token);
        if (result) {
            yield put(actionObject(CREATE_ORDER_ASYNC, result));
            yield call(showDialog, 'Payment successful', 'success');
            yield put(actionObject(REFRESH_USER_DATA))
            yield put(actionObject(CLOSE_SUBSCRIPTION_POPUP))
        }
    } catch (error: any) {
        const message = error?.message?.includes('error') 
            ? JSON.parse(error.message).error 
            : error.message;
            yield put(actionObject(ORDER_FAILURE, message));
        yield call(showDialog, message, 'error');
    }
}

export function* watchGetOrders() {
    yield takeLatest(GET_ORDERS, getOrdersAsync);
}

export function* watchCreateOrder() {
    yield takeLatest(CREATE_ORDER, createOrderAsync);
}

