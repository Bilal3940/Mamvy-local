import {
  LOG_STORAGE_USAGE_ASYNC,
  GET_STORAGE_LOGS_ASYNC,
  GET_STORAGE_LOG,
  CLEAR_STORAGE_LOGS_DATA,
  HIDE_STORAGE_POPUP,
  SHOW_STORAGE_POPUP,
} from "./action-types";

const initialState: any = {
  storageLogs: [], // Array to store logs if needed
  storageLog: {}, // Object to store the latest log or detailed log
  actionSuccess: null,
  storagePopup: false,
};

const storageLog = (state = initialState, { type, payload }: any) => {
  switch (type) {
        case SHOW_STORAGE_POPUP:
          return { ...state, storagePopup: false };
          case HIDE_STORAGE_POPUP:
            const updatedState = { ...state, storagePopup: true };
            console.log("Updated State: dev-test", updatedState);
            return updatedState;
    case LOG_STORAGE_USAGE_ASYNC: // For creating a new log
      return {
        ...state,
        storageLog: payload,
        actionSuccess: true,
      };

    case GET_STORAGE_LOGS_ASYNC: // Update this to store in `storageLog`
      return {
        ...state,
        storageLog: payload, // Store the result in `storageLog` instead of `storageLogs`
        actionSuccess: true,
      };

    case GET_STORAGE_LOG: // For fetching a single log if needed
      return {
        ...state,
        storageLog: payload,
        actionSuccess: true,
      };

    case CLEAR_STORAGE_LOGS_DATA: // Reset state
      return initialState;

    default:
      return state;
  }
};

export default storageLog;
