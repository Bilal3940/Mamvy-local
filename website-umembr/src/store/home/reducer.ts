import { SET_CRITERIAS_ASYNC, SET_TAB_TRIGGER, GET_PROFILE_STORIES_ASYNC, SET_HOME_LOADING } from './action-types';

const initialState = {
  criterias: {
    search: '',
    prompts: [],
    collaborators: [],
    tab: 0,
  },
  stories: {
    draftStories: [],
    publishedStories: [],
    collaboratorStories: [],
  },
  storiesResult: [],
  homeLoading: true,
};

const intermitence = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SET_TAB_TRIGGER:
      return { ...state, criterias: payload };
    case SET_CRITERIAS_ASYNC:
      return { ...state, criterias: { ...payload.criterias }, storiesResult: [...payload.result] };
    case GET_PROFILE_STORIES_ASYNC:
      return { ...state, stories: payload };
    case SET_HOME_LOADING:
      return { ...state, homeLoading: payload };

    default:
      return state;
  }
};

export default intermitence;
