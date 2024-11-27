import { actionObject } from '../../utils';
import { CREATE_ORDER, GET_ORDERS, CLEAR_DATA_ORDERS } from './action-types';

// Action creators for orders
export const createOrder = (payload: any) => actionObject(CREATE_ORDER, payload);
export const getOrders = (payload: any) => actionObject(GET_ORDERS, payload);
export const clearDataOrders = () => actionObject(CLEAR_DATA_ORDERS);
