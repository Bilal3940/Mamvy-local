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
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_DELETE_MODAL,
  CLOSE_DELETE_MODAL,
  OPEN_SUBSCRIPTION_MODAL,
  CLOSE_SUBSCRIPTION_MODAL,
  OPEN_SUBSCRIPTION_POPUP,
  CLOSE_SUBSCRIPTION_POPUP,

} from './action-types';

const initialState = {
  toast: {
    text: '',
    type: 'success',
    show: false,
  },
  modal: {
    open: false,
    content: '',
  },
  subscriptionModal:{
    open: false,
  },
  deletionModal:{
    open: false,
  },
  subscriptionPopup: {
    open: false,
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

    case OPEN_SUBSCRIPTION_POPUP:
      return {
        ...state,
        subscriptionPopup: {
          open: true,
        },
      };
    case CLOSE_SUBSCRIPTION_POPUP:
      return {
        ...state,
        subscriptionPopup: {
          open: false,
        },
      };
    case SHOW_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          ...payload,
        },
      };
      case OPEN_DELETE_MODAL:
        return {
          ...state,
          deletionModal: {
            open: true,
          },
        };
      case CLOSE_DELETE_MODAL:
        return {
          ...state,
          deletionModal: {
            open: false,

          },
        };
        case OPEN_SUBSCRIPTION_MODAL:
          return {
            ...state,
            subscriptionModal: {
              open: true,
  
            },
          };
        case CLOSE_SUBSCRIPTION_MODAL:
          return {
            ...state,
            subscriptionModal: {
              open: false,
  
            },
          };
      case OPEN_MODAL:
        return {
          ...state,
          modal: {
            open: true,
            content: payload.content,
          },
        };
      case CLOSE_MODAL:
        return {
          ...state,
          modal: {
            open: false,
            content: '',
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
