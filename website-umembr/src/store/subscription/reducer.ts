import {
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  GET_PRODUCTS_ASYNC,
  GET_PRODUCT_ASYNC,
  CLEAR_DATA_PRODUCTS,
  UPDATE_PRODUCT_ASYNC,
  CREATE_PRODUCT_ASYNC,
  GET_PRODUCTS,
  GET_PRODUCT,
  SET_SELECTED_TIER_ASYNC,
  CLEAR_SELECTED_TIER,
  CREATE_CHECKOUT_SESSION,
  CREATE_CHECKOUT_SESSION_ASYNC,
  CANCEL_SUBSCRIPTION_ASYNC,
  RESUME_SUBSCRIPTION_ASYNC,
  RENEW_SUBSCRIPTION_ASYNC,
  UPDATE_SUBSCRIPTION_STATUS_ASYNC,
  GET_PAYMENT_METHOD_ASYNC,
  UPDATE_PAYMENT_METHOD_ASYNC,
  FETCH_LATEST_INVOICE_ASYNC
} from './action-types';

const initialState: any = {
  products: [],
  product: {},
  selectedTier: null,
  actionSuccess: null,
  checkoutSession: null, 
  SubscriptionStatus: [],
  paymentMethod: null, 
  latestInvoice: null, 
};

const subscription = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case UPDATE_PRODUCT:
    case CREATE_PRODUCT:
    case GET_PRODUCTS:
    case GET_PRODUCT:
    case CREATE_CHECKOUT_SESSION:
      return {
        ...state,
        actionSuccess: null,
      };
      case CANCEL_SUBSCRIPTION_ASYNC:
        return {
          ...state,
          subscriptionStatus: payload,
          actionSuccess: true,
        };
        case RESUME_SUBSCRIPTION_ASYNC:
          return {
            ...state,
            subscriptionStatus: payload,
            actionSuccess: true,
          };
          case RENEW_SUBSCRIPTION_ASYNC:
            return {
              ...state,
              subscriptionStatus: payload,
              actionSuccess: true,
            };
          case UPDATE_SUBSCRIPTION_STATUS_ASYNC:
            return {
              ...state,
              SubscriptionStatus:payload,
              actionSuccess: true,
            }
    case UPDATE_PRODUCT_ASYNC:
    case CREATE_PRODUCT_ASYNC:
      return {
        ...state,
        product: payload,
        actionSuccess: true,
      };

    case GET_PRODUCT_ASYNC:
      return {
        ...state,
        product: payload,
      };

    case GET_PRODUCTS_ASYNC:
      return {
        ...state,
        products: payload,
      };

    case SET_SELECTED_TIER_ASYNC:
      return {
        ...state,
        selectedTier: payload,
        actionSuccess: true,
      };

    case CREATE_CHECKOUT_SESSION_ASYNC: // Add case for handling async session creation
      return {
        ...state,
        checkoutSession: payload,
        actionSuccess: true,
      };
      case GET_PAYMENT_METHOD_ASYNC:
        return {
          ...state,
          paymentMethod: payload, // Assuming `paymentMethod` field for storing API response
          actionSuccess: true,
        };
  
      case UPDATE_PAYMENT_METHOD_ASYNC:
        return {
          ...state,
          paymentMethod: { ...state.paymentMethod, ...payload }, // Update payment method details
          actionSuccess: true,
        };
        case FETCH_LATEST_INVOICE_ASYNC:
          return {
            ...state,
            latestInvoice: payload, // Store the latest invoice data
            actionSuccess: true,
          };

    case CLEAR_SELECTED_TIER:
      return initialState;

    case CLEAR_DATA_PRODUCTS:
      return initialState;

    default:
      return state;
  }
};

export default subscription;
