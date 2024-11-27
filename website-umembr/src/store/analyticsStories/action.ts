// src/store/analyticsStories/actions.ts
import { CREATE_MEMORY_ACTION_G, CREATE_MEMORY_VIEW_G, CREATE_STORY_ACTION_G, CREATE_STORY_VIEW_G, DELETE_MEMORY_ACTION_G, DELETE_MEMORY_VIEW_G, DELETE_STORY_ACTION_G, DELETE_STORY_VIEW_G, FILTER_STORY_ACTION_G, UPDATE_MEMORY_ACTION_G, UPDATE_MEMORY_VIEW_G, UPDATE_STORY_ACTION_G, UPDATE_STORY_VIEW_G, VIEW_MEMORY_G, VIEW_STORY_G } from './action-types';
import { actionObject } from '@/utils';

export const viewStoryG = (story: any) => 
  actionObject(VIEW_STORY_G, { story });

export const createStoryViewG = (user_id: string) => actionObject(CREATE_STORY_VIEW_G, { user_id});

export const createStoryActionG = (story: any) => actionObject(CREATE_STORY_ACTION_G, { story });

export const updateStoryViewG = (userId: string) => actionObject(UPDATE_STORY_VIEW_G, { userId });
export const updateStoryActionG = (story: any) => actionObject(UPDATE_STORY_ACTION_G, { story });
export const deleteStoryViewG = (userId: string) => actionObject(DELETE_STORY_VIEW_G, { userId });
export const deleteStoryActionG = (story: any) => actionObject(DELETE_STORY_ACTION_G, { story });
export const filterStoryActionG = (searchValue: string) => actionObject(FILTER_STORY_ACTION_G, { searchValue });

export const createMemoryViewG = (userId: string) => actionObject(CREATE_MEMORY_VIEW_G, { userId });
export const createMemoryActionG = (memory: any) => actionObject(CREATE_MEMORY_ACTION_G, { memory });
export const updateMemoryViewG = (userId: string) => actionObject(UPDATE_MEMORY_VIEW_G, { userId });
export const updateMemoryActionG = (memory: any) => actionObject(UPDATE_MEMORY_ACTION_G, { memory });
export const deleteMemoryViewG = (userId: string) => actionObject(DELETE_MEMORY_VIEW_G, { userId });
export const deleteMemoryActionG = (memory: any) => actionObject(DELETE_MEMORY_ACTION_G, { memory });
export const viewMemoryG = (memory: any) => actionObject(VIEW_MEMORY_G, { memory });