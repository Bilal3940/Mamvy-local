import {
    CREATE_ORDER_ASYNC,
    GET_ORDERS_ASYNC,
    CLEAR_DATA_ORDERS,
    ORDER_FAILURE, // Add the new action type
} from './action-types';
  
// Set up the initial state
const initialState: any = {
    products: [],
    product: {},
    orders: [],
    order: null,
    actionSuccess: false,
    error: null, // Add an error field to track failures
};

const orders = (state = initialState, { type, payload }: any) => {
    switch (type) {
        case CREATE_ORDER_ASYNC:
            return { 
                ...state, 
                order: payload, 
                actionSuccess: true, 
                error: null, // Clear any previous error on success
            };

        case GET_ORDERS_ASYNC:
            return { 
                ...state, 
                orders: payload,
                error: null, // Clear any previous error on success
            };

        case ORDER_FAILURE: // Handle order-related failures
            return {
                ...state,
                error: payload, // Store error details in the state
                actionSuccess: true, // Indicate the action was not successful 
            };

        case CLEAR_DATA_ORDERS:
            return initialState;

        default:
            return state;
    }
};

export default orders;
