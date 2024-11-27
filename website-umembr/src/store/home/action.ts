import { SET_TAB, SET_CRITERIAS, GET_PROFILE_STORIES } from './action-types';
import { actionObject } from '@/utils';

export const setTab = () => actionObject(SET_TAB);
export const searchStories = (params: any) => actionObject(SET_CRITERIAS, params);
export const getProfileStories = () => actionObject(GET_PROFILE_STORIES);
