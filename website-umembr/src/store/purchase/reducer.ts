import {
    CLEAR_DATA_PURCHASE,
    CREATE_USER_PURCHASE_ASYNC,
    GET_USER_PURCHASES_ASYNC,
} from './action-types';
  
  const initialState: any = {
    userPurchases: [],
    purchase:{},
    actionSuccess: null,
  };

  const purchase = (state = initialState, { type, payload }: any) => {
    switch (type) {

            case CREATE_USER_PURCHASE_ASYNC:
                return { 
                  ...state, 
                  purchase: payload, 
                  actionSuccess: true 
                };

                  case GET_USER_PURCHASES_ASYNC:
                    return { 
                      ...state, 
                      userPurchases: payload, 
                      loading: false, 
                      error: null 
                    };

        case CLEAR_DATA_PURCHASE:
            return initialState;

        default:
            return state;
    }
};

export default purchase;
