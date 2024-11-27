import { actionObject } from '../../utils';
import { 
  UPDATE_PRODUCT, 
  CREATE_PRODUCT, 
  GET_PRODUCTS, 
  GET_PRODUCT, 
  CLEAR_DATA_PRODUCTS, 
  SET_SELECTED_TIER,
  CLEAR_SELECTED_TIER,
  CREATE_CHECKOUT_SESSION, // Import the new action type
} from './action-types';

export const updateProduct = (body: any): any =>
  actionObject(UPDATE_PRODUCT, body);

export const createProduct = (body: any): any =>
  actionObject(CREATE_PRODUCT, body);

export const getProducts = (payload: any): any =>
  actionObject(GET_PRODUCTS, payload);

export const getProduct = (payload: any): any =>
  actionObject(GET_PRODUCT, payload);

export const clearDataProducts = (): any =>
  actionObject(CLEAR_DATA_PRODUCTS);

export const setSelectedTier = (payload: any): any => 
  actionObject(SET_SELECTED_TIER, payload);

export const clearSelectedTier = (): any => 
  actionObject(CLEAR_SELECTED_TIER);

// New action creator for creating checkout sessions
export const createCheckoutSession = (payload: any): any =>
  actionObject(CREATE_CHECKOUT_SESSION, payload);
