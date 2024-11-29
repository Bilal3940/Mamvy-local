import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionObject, showDialog } from '../../utils/common';

import {
    CREATE_USER_PURCHASE,
    CREATE_USER_PURCHASE_ASYNC,

} from './action-types';
import { authSelector } from '../selectors';
import FetchService from '@/utils/FetchService';


function* createUserPurchaseAsync({ payload }: any): any {
    console.log("i am the payload", payload)
    try {
        const { user } = yield select(authSelector);
        const url = `/order/one-time-order`;
        const { result } = yield call(FetchService, url, 'POST', payload, user?.token);
        console.log("i am trhe result", result)
        if (result) {
            yield put(actionObject(CREATE_USER_PURCHASE_ASYNC, result));

            yield call(showDialog, 'Order successful', 'success');
        }
    } catch (error: any) {
        const message = error?.message?.includes('error') 
            ? JSON.parse(error.message).error 
            : error.message;
        yield call(showDialog, message, 'error');
    }
}


export function* watchCreateUserPurchase() {
    yield takeLatest(CREATE_USER_PURCHASE, createUserPurchaseAsync);
}

