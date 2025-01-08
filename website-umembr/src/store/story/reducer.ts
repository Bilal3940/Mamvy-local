import {
  CLEAN_PREV_PROMPTS,
  CREATE_PAYLOAD_TRIGGER,
  CREATE_STORIES_ASYNC,
  SET_CREATE_SECTION_TRIGGER,
  SET_PROMPTS_TRIGGER,
  SET_STEP_CREATE_TRIGGER,
  SET_ACTUAL_STORY_ASYNC,
  RESET_STORY_STATE,
  UPDATE_STORY_ASYNC,
  DELETE_STORY_ASYNC,
  GET_STORY_STATUS_ASYNC,
  SET_PENDING_STORY,
  LOAD_PENDING_STORY,
  CLEAR_PENDING_STORY,
  SET_PENDING_STORY_ASYNC,
  LOAD_PENDING_STORY_ASYNC



} from './action-types';

const initialState = {
  storySection: '',
  createStep: 0,
  stories: [],
  prev_stories: {},
  prompts: {},
  storyStepName: '',
  story: {},
  StoryStatus: {},
  pendingStory: {},
};

const stories = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SET_CREATE_SECTION_TRIGGER:
      return { ...state, storySection: payload };
    case SET_STEP_CREATE_TRIGGER:
      return { ...state, createStep: payload };
    case CREATE_STORIES_ASYNC:
      return { ...state, story: payload };
    case GET_STORY_STATUS_ASYNC:
      return { ...state, StoryStatus: payload };
    case CREATE_PAYLOAD_TRIGGER:
      return { ...state, prev_stories: payload };
    case SET_PROMPTS_TRIGGER:
      return { ...state, prompts: payload };
    case CLEAN_PREV_PROMPTS:
      return { ...state, prev_stories: {}, prompts: {} };
    case SET_ACTUAL_STORY_ASYNC:
      return { ...state, story: payload };
    case RESET_STORY_STATE:
      return { ...initialState };
    case UPDATE_STORY_ASYNC:
      return { ...state, story: payload };
    case DELETE_STORY_ASYNC:
      return { ...state, story: {} };


    case SET_PENDING_STORY_ASYNC:
      return { ...state, pendingStory: payload };
    case LOAD_PENDING_STORY_ASYNC:
      return { ...state };
    case CLEAR_PENDING_STORY:
      return { ...state, pendingStory: null };
    default:
      return state;
  }
};

export default stories;
