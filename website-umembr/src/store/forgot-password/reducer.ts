import { SET_STEP_TRIGGER } from './action-types';

const initialState = {
  step: 1,
};

const intermitence = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SET_STEP_TRIGGER:
      return {
        ...state,
        step: payload.step,
      };

    default:
      return state;
  }
};

export default intermitence;
