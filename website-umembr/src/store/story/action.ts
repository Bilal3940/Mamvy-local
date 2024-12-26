import type { NextRouter } from 'next/router';
import {
  SET_CREATE_SECTION,
  SET_STEP_CREATE,
  CREATE_STORIES,
  CREATE_PAYLOAD,
  SET_PROMPTS,
  CLEAN_PREV_PROMPTS,
  SET_ACTUAL_STORY,
  RESET_STORY_STATE,
  UPDATE_STORY,
  DELETE_STORY,
  SET_PUBLICATION,
  SET_CODE,
  SET_ACTUAL_STORY_ASYNC,
  GET_STORY_STATUS,
  GET_STORY_STATUS_ASYNC,
  UPDATE_STORY_ASYNC,
  SET_PENDING_STORY,
  LOAD_PENDING_STORY,
  CLEAR_PENDING_STORY,
} from './action-types';

import { actionObject, SagaCallback } from '@/utils';

export const setCreateSection = (section: string) => actionObject(SET_CREATE_SECTION, section);
export const setCreateStep = (step: number) => actionObject(SET_STEP_CREATE, step);

export const createStories = (data: any) => actionObject(CREATE_STORIES, data);
export const createPayload = (data: any) => actionObject(CREATE_PAYLOAD, data);
type ActualStoryPayload = {
  id: string;
  confirmPassword?: unknown;
  router: NextRouter;
} | string
type UpdateStoryPayload ={
  data: any;
  router: NextRouter;
} | any
export function actualStory(data: ActualStoryPayload) { return actionObject(SET_ACTUAL_STORY, data); }
export const actualStoryAsync = (data: any) => actionObject(SET_ACTUAL_STORY_ASYNC, data);
export const setPrompts = (data: {}) => actionObject(SET_PROMPTS, data);

export const cleanPrevPrompts = () => actionObject(CLEAN_PREV_PROMPTS);
export const resetStoryState = () => actionObject(RESET_STORY_STATE)

export const updateStory = (data: UpdateStoryPayload) => actionObject(UPDATE_STORY, data)
export const updateStoryAsyncAction = (data: any) => actionObject(UPDATE_STORY_ASYNC, data)

export const deleteStory = (data: any) => actionObject(DELETE_STORY, data)

export const setPublication = (data: any) => actionObject(SET_PUBLICATION, data)
export const setCode = (data: any) => actionObject(SET_CODE, data)

export const getStoryStatus = (data: any) => actionObject(GET_STORY_STATUS, data);
export const getStoryStatusAsync = (data: any, callback?: SagaCallback) => 
  actionObject(GET_STORY_STATUS_ASYNC, { data, callback });

export const setPendingStory = (data: any) => actionObject(SET_PENDING_STORY, data);
export const loadPendingStory = () => actionObject(LOAD_PENDING_STORY);
export const clearPendingStory = () => actionObject(CLEAR_PENDING_STORY);