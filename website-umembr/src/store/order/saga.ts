import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionObject, showDialog } from '../../utils/common';

import {
    CREATE_ORDER,
    CREATE_ORDER_ASYNC,
    GET_ORDERS,
    GET_ORDERS_ASYNC,
} from './action-types';
import { authSelector } from '../selectors';
import FetchService from '@/utils/FetchService';
import { refreshUserData } from '../actions';
import { useDispatch } from 'react-redux';
// Saga to handle getting orders
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

// Saga to handle creating an order
function* createOrderAsync({ payload }: any): any {
    try {
        const { user } = yield select(authSelector);
        const url = `order/create`;
        const { result } = yield call(FetchService, url, 'POST', payload, user?.token);
        if (result) {
            yield put(actionObject(CREATE_ORDER_ASYNC, result));

            yield call(showDialog, 'Payment successful', 'success');
        }
    } catch (error: any) {
        const message = error?.message?.includes('error') 
            ? JSON.parse(error.message).error 
            : error.message;
        yield call(showDialog, message, 'error');
    }
}

// Watcher functions
export function* watchGetOrders() {
    yield takeLatest(GET_ORDERS, getOrdersAsync);
}

export function* watchCreateOrder() {
    yield takeLatest(CREATE_ORDER, createOrderAsync);
}

