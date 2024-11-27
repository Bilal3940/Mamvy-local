import { TOGGLE_HAS_CHANGES, SET_HAS_CHANGES } from "./actions";

const initialState = {
  hasChanges: false,
};

const hasChangesReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case TOGGLE_HAS_CHANGES:
      return {
        ...state,
        hasChanges: !state.hasChanges,
      };
    case SET_HAS_CHANGES:
      return {
        ...state,
        hasChanges: action.payload,
      };
    default:
      return state;
  }
};

export default hasChangesReducer;
