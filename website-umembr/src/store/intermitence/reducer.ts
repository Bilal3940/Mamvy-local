import {
  SHOW_TOAST,
  EXPAND_DRAWER_TRIGGER,
  COLLAPSE_DRAWER_TRIGGER,
  SHOW_LOADING,
  SHOW_ACTUAL_SECTION,
  CHANGE_BACKGROUND,
  OPEN_PUBLISH_MODAL_TRIGGER,
  CLOSE_PUBLISH_MODAL_TRIGGER,
  SET_SEPARATION,
  HIDE_GRADIENT,
} from './action-types';

const initialState = {
  toast: {
    text: '',
    type: 'success',
    show: false,
  },
  drawerOpen: false,
  loading: false,
  actualSection: '',
  backgroundChange: false,
  showPublishModal: false,
  separation: 0,
  hideGradient: false,
};

const intermitence = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SHOW_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          ...payload,
        },
      };
    case EXPAND_DRAWER_TRIGGER:
      return { ...state, drawerOpen: true };
    case COLLAPSE_DRAWER_TRIGGER:
      return { ...state, drawerOpen: false };
    case SHOW_LOADING:
      return { ...state, loading: payload };
    case SHOW_ACTUAL_SECTION:
      return { ...state, actualSection: payload };
    case CHANGE_BACKGROUND:
      return { ...state, backgroundChange: payload };
    case OPEN_PUBLISH_MODAL_TRIGGER:
      return { ...state, showPublishModal: true };
    case CLOSE_PUBLISH_MODAL_TRIGGER:
      return { ...state, showPublishModal: false };
    case SET_SEPARATION:
      return { ...state, separation: payload };
    case HIDE_GRADIENT:
      return { ...state, hideGradient: payload };
    default:
      return state;
  }
};

export default intermitence;
