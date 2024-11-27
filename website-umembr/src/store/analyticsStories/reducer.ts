// src/store/analyticsStories/reducer.ts
import { CREATE_MEMORY_ACTION_G, CREATE_MEMORY_VIEW_G, CREATE_STORY_ACTION_G, CREATE_STORY_VIEW_G, DELETE_MEMORY_ACTION_G, DELETE_MEMORY_VIEW_G, DELETE_STORY_ACTION_G, DELETE_STORY_VIEW_G, UPDATE_MEMORY_ACTION_G, UPDATE_MEMORY_VIEW_G, UPDATE_STORY_ACTION_G, UPDATE_STORY_VIEW_G, VIEW_MEMORY_G, VIEW_STORY_G } from './action-types';

const initialState = {
  storyViews: [],
  createStoryViews: [],
  createStoryActions: [],
  updateStoryViews: [],
  updateStoryActions: [],
  deleteStoryViews: [],
  deleteStoryActions: [],
  memoryViews: [],
  memoryActions: [],
};

const analyticsStories = (state = initialState, action: any) => {
  switch (action.type) {
    case VIEW_STORY_G:
      return {
        ...state,
        storyViews: [...state.storyViews, action.payload],
      };
      case CREATE_STORY_VIEW_G:
      return {
        ...state,
        createStoryViews: [...state.createStoryViews, action.payload],
      };
    case CREATE_STORY_ACTION_G:
      return {
        ...state,
        createStoryActions: [...state.createStoryActions, action.payload?.story],
      };
      case UPDATE_STORY_VIEW_G:
        return {
          ...state,
          updateStoryViews: [...state.updateStoryViews, action.payload],
        };
      case UPDATE_STORY_ACTION_G:
        return {
          ...state,
          updateStoryActions: [...state.updateStoryActions, action.payload?.story],
        };
      case DELETE_STORY_VIEW_G:
        return {
          ...state,
          deleteStoryViews: [...state.deleteStoryViews, action.payload],
        };
      case DELETE_STORY_ACTION_G:
        return {
          ...state,
          deleteStoryActions: [...state.deleteStoryActions, action.payload],
        };
        case CREATE_MEMORY_VIEW_G:
        case UPDATE_MEMORY_VIEW_G:
        case DELETE_MEMORY_VIEW_G:
        case VIEW_MEMORY_G:
        return {
          ...state,
          memoryViews: [...state.memoryViews, action.payload],
        };
        case CREATE_MEMORY_ACTION_G:
        case UPDATE_MEMORY_ACTION_G:
        case DELETE_MEMORY_ACTION_G:
          return {
          ...state,
          memoryActions: [...state.memoryActions, action.payload],
        };
     default:
      return state;
  }
};

export default analyticsStories;
