import {
    CLEAR_DATA_PURCHASE,
    CREATE_USER_PURCHASE_ASYNC,
} from './action-types';
  
  // Set up the initial state with the above type
  const initialState: any = {
    purchase:{},
    actionSuccess: null,
  };

  const purchase = (state = initialState, { type, payload }: any) => {
    switch (type) {

            case CREATE_USER_PURCHASE_ASYNC:
                return { 
                  ...state, 
                  purchase: payload, // Update the `purchase` field with the response payload
                  actionSuccess: true 
                };

        case CLEAR_DATA_PURCHASE:
            return initialState;

        default:
            return state;
    }
};

export default purchase;
