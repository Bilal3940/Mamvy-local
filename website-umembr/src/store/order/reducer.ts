import {
    CREATE_ORDER_ASYNC,
    GET_ORDERS_ASYNC,
    CLEAR_DATA_ORDERS,
} from './action-types';
  
  // Set up the initial state with the above type
  const initialState: any = {
    products: [],
    product: {},
    actionSuccess: null,
  };

  const orders = (state = initialState, { type, payload }: any) => {
    switch (type) {
        case CREATE_ORDER_ASYNC:
            return { 
                ...state, 
                order: payload, 
                actionSuccess: true 
            };

        case GET_ORDERS_ASYNC:
            return { 
                ...state, 
                orders: payload 
            };

        case CLEAR_DATA_ORDERS:
            return initialState;

        default:
            return state;
    }
};

export default orders;
