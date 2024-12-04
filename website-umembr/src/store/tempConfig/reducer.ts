import {
    GET_TEMPLATES,
    GET_TEMPLATES_ASYNC,
    GET_TEMPLATE,
    GET_TEMPLATE_ASYNC,
    CREATE_TEMPLATE,
    CREATE_TEMPLATE_ASYNC,
    UPDATE_TEMPLATE,
    UPDATE_TEMPLATE_ASYNC,
    DELETE_TEMPLATE,
    DELETE_TEMPLATE_ASYNC,
    CLEAR_TEMPLATES_DATA,
  } from "./action-types";
  
  const initialState: any = {
    templates: [],
    template: {},
    actionSuccess: null,
  };
  
  const templates = (state = initialState, { type, payload }: any) => {
    switch (type) {
      case CREATE_TEMPLATE:
      case UPDATE_TEMPLATE:
      case DELETE_TEMPLATE:
      case GET_TEMPLATES:
      case GET_TEMPLATE:
        return {
          ...state,
          actionSuccess: true,
        };
  
      case CREATE_TEMPLATE_ASYNC:
      case UPDATE_TEMPLATE_ASYNC:
        return {
          ...state,
          template: payload,
          actionSuccess: true,
        };
  
      case DELETE_TEMPLATE_ASYNC:
        return {
          ...state,
          actionSuccess: true,
        };
  
      case GET_TEMPLATE_ASYNC:
        return {
          ...state,
          template: payload,
        };
  
      case GET_TEMPLATES_ASYNC:
        return {
          ...state,
          templates: payload,
        };
  
      case CLEAR_TEMPLATES_DATA:
        return initialState;
  
      default:
        return state;
    }
  };
  
  export default templates;
  