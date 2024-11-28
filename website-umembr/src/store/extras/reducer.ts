import { GET_EXTRA_CONTENT, GET_EXTRA_CONTENT_SUCCESS } from './action-types';


const initialState = {
  extraContent: null,
  loading: false,
  error: null,
};

const extraContent = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_EXTRA_CONTENT:
      return { ...state, loading: true, error: null };

    case GET_EXTRA_CONTENT_SUCCESS:
      return { ...state, loading: false, extraContent: action.payload };

    default:
      return state;
  }
};

export default extraContent;