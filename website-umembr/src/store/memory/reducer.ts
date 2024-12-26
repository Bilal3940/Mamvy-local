import { PositionedItem } from '@/utils/bubblePositioning/interfaces';
import type { MemoryActionTypes } from './action';
import {
  APPROVE_MEMORY_ASYNC,
  CREATE_MEMORY_ASYNC,
  DELETE_MEMORY_ASYNC,
  GET_MEMORIES_ASYNC,
  PAGINATE_BUBBLES_ASYNC,
  PREVIEW_MEMORY,
  RESET_OPERATION_STATE,
  SELECT_EDIT_MEMORY,
  SET_HIDE_MEDIA_BUTTONS,
  SET_MEDIA_TYPE_SCREEN,
  SET_MEDIA_TYPE_TRIGGER,
  SET_MEMORY_TYPES_ASYNC,
  SET_SHOW_MEDIA_BUTTONS,
  SET_STEP_CREATE_MEMORY_TRIGGER,
  UPDATE_MEMORY_ASYNC
} from './action-types';

const initialState = {
  createMemoryStep: 0,
  mediaType: '',
  showMediaButtons: false,
  mediaScreenType: 'form',
  memoriesLoaded: [],
  newMemoryCreated: false,
  memoryEdit: null,
  memoryPreview: null,
  memoryTypes: [],
  actionSuccess: false,
};
export type MemoriesState = typeof initialState

const memories = (state = initialState, { type, payload }: MemoryActionTypes) => {
  switch (type) {
    case SET_STEP_CREATE_MEMORY_TRIGGER:
      return { ...state, createMemoryStep: payload };
    case SET_MEDIA_TYPE_TRIGGER:
      return { ...state, mediaType: payload };
    case SET_SHOW_MEDIA_BUTTONS:
      return { ...state, showMediaButtons: true };
    case SET_HIDE_MEDIA_BUTTONS:
      return { ...state, showMediaButtons: false };
    case SET_MEDIA_TYPE_SCREEN:
      return { ...state, mediaScreenType: payload };
    case CREATE_MEMORY_ASYNC:
      return { ...state, memoriesLoaded: [...state.memoriesLoaded, payload], newMemoryCreated: true };
    case RESET_OPERATION_STATE:
      return { ...initialState };
    case PAGINATE_BUBBLES_ASYNC:
    case GET_MEMORIES_ASYNC:
      return { ...state, memoriesLoaded: payload, actionSuccess: true };
    case SET_MEMORY_TYPES_ASYNC:
      return { ...state, memoryTypes: payload }
    case DELETE_MEMORY_ASYNC:
      return { ...state, memoriesLoaded: state.memoriesLoaded.filter((memory: any) => memory.id !== payload) };
    case UPDATE_MEMORY_ASYNC:
      return {
        ...state,
        memoriesLoaded: state.memoriesLoaded.map((memory: any) => (memory.id === payload.id ? payload : memory)),
      };
    case APPROVE_MEMORY_ASYNC:
      return {
        ...state,
        memoriesLoaded: state.memoriesLoaded.map((memory: any) => (memory.id === payload.id ? payload : memory)),
      };
    case SELECT_EDIT_MEMORY:
      return { ...state, memoryEdit: payload };
    case PREVIEW_MEMORY:
      return { ...state, memoryPreview: payload };
    default:
      return state;
  }
};

export default memories;
