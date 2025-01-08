import {
  LOG_STORAGE_USAGE_ASYNC,
  GET_STORAGE_LOGS_ASYNC,
  GET_STORAGE_LOG,
  CLEAR_STORAGE_LOGS_DATA,
  HIDE_STORAGE_POPUP,
  SHOW_STORAGE_POPUP,
} from "./action-types";

const initialState: any = {
  storageLogs: [], 
  storageLog: {}, 
  actionSuccess: null,
  storagePopup: false,
};

const storageLog = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SHOW_STORAGE_POPUP:
      return { ...state, storagePopup: false };
    case HIDE_STORAGE_POPUP:
      const updatedState = { ...state, storagePopup: true };

      return updatedState;
    case LOG_STORAGE_USAGE_ASYNC: 
      return {
        ...state,
        storageLog: payload,
        actionSuccess: true,
      };

    case GET_STORAGE_LOGS_ASYNC: 
      return {
        ...state,
        storageLog: payload, 
        actionSuccess: true,
      };

    case GET_STORAGE_LOG: 
      return {
        ...state,
        storageLog: payload,
        actionSuccess: true,
      };

    case CLEAR_STORAGE_LOGS_DATA: 
      return initialState;

    default:
      return state;
  }
};

export default storageLog;
