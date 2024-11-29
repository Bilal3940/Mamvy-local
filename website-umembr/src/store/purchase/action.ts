import { actionObject } from '../../utils';
import {CLEAR_DATA_PURCHASE, CREATE_USER_PURCHASE} from './action-types';

// Action creators for orders
export const createUserPurchase = (payload: any) => actionObject(CREATE_USER_PURCHASE, payload);
export const clearDataPurchase = () => actionObject(CLEAR_DATA_PURCHASE);
