import { actionObject, SagaCallback } from '@/utils';
import {
  APPROVE_MEMORY,
  APPROVE_MEMORY_ASYNC,
  CREATE_MEMORY,
  CREATE_MEMORY_ASYNC,
  DELETE_MEMORY,
  DELETE_MEMORY_ASYNC,
  GET_MEMORIES,
  GET_MEMORIES_ASYNC,
  PAGINATE_BUBBLES,
  PAGINATE_BUBBLES_ASYNC,
  PREVIEW_MEMORY,
  RESET_OPERATION_STATE,
  SELECT_EDIT_MEMORY,
  SET_HIDE_MEDIA_BUTTONS,
  SET_MEDIA_TYPE,
  SET_MEDIA_TYPE_SCREEN,
  SET_MEDIA_TYPE_TRIGGER,
  SET_MEMORY_TYPES_ASYNC,
  SET_SHOW_MEDIA_BUTTONS,
  SET_STEP_CREATE_MEMORY,
  SET_STEP_CREATE_MEMORY_TRIGGER,
  UPDATE_MEMORY,
  UPDATE_MEMORY_ASYNC,
  VIEW_MEMORY
} from './action-types';

export const setCreateMemoryStep = (step: number) => actionObject(SET_STEP_CREATE_MEMORY, step);
export const setMediaType = (type: string) => actionObject(SET_MEDIA_TYPE, type);
export const setMediaScreenType = (mediaType: string) => actionObject(SET_MEDIA_TYPE_SCREEN, mediaType);

export const setShowMediaButton = () => actionObject(SET_SHOW_MEDIA_BUTTONS);
export const setHideMediaButton = () => actionObject(SET_HIDE_MEDIA_BUTTONS);
export const sendMemory = (payload: any) => actionObject(CREATE_MEMORY, payload);
export const getMemories = (payload: any, query?: any) => actionObject(GET_MEMORIES, { story_id: payload, query });
export const resetMemoryState = () => actionObject(RESET_OPERATION_STATE);
export const removeMemory = (data: any, callback?: SagaCallback) => actionObject(DELETE_MEMORY, data, callback)
export const updateMemory = (data: any) => actionObject(UPDATE_MEMORY, data)
export const selectEditMemory = (data: any) => actionObject(SELECT_EDIT_MEMORY, data)
export const previewMemory = (data: any) => actionObject(PREVIEW_MEMORY, data)
export const approveMemory = (data: any) => actionObject(APPROVE_MEMORY, data)
export const viewMemory = (data: any) => actionObject(VIEW_MEMORY, data)
export const approveMemoryAsync = (data: any) => actionObject(APPROVE_MEMORY_ASYNC, data)
export const updateMemoryAsync = (data: any) => actionObject(UPDATE_MEMORY_ASYNC, data)
export const getMemoriesAsync = (data: any) => actionObject(GET_MEMORIES_ASYNC, data)
export const createMemoryAsync = (data: any) => actionObject(CREATE_MEMORY_ASYNC, data)
export const deleteMemoryAsync = (data: any) => actionObject(DELETE_MEMORY_ASYNC, data)
export const setMediatypeTrigger = (data: any) => actionObject(SET_MEDIA_TYPE_TRIGGER, data)
export const setStepCreateMemoryTrigger = (data: any) => actionObject(SET_STEP_CREATE_MEMORY_TRIGGER, data)
export const setMemoryTypesAsync = (data: any) => actionObject(SET_MEMORY_TYPES_ASYNC, data)
export const paginateMemoryAction = (data: { storyId: string; page: number; limit: number; criterias?: any }, callback: SagaCallback<{
  page: number,
  limit: number,
  totalPages: number,
  totalMemories: number,
  data: { [key: string]: unknown }[],
}>) => actionObject(PAGINATE_BUBBLES, data, callback)
export const paginateMemoryActionAsync = (data: { id: string, [key: string]: unknown }[]) => actionObject(PAGINATE_BUBBLES_ASYNC, data)

export type MemoryActionTypes =
  | ReturnType<typeof setCreateMemoryStep>
  | ReturnType<typeof setMediaType>
  | ReturnType<typeof setMediaScreenType>
  | ReturnType<typeof setShowMediaButton>
  | ReturnType<typeof setHideMediaButton>
  | ReturnType<typeof sendMemory>
  | ReturnType<typeof getMemories>
  | ReturnType<typeof resetMemoryState>
  | ReturnType<typeof removeMemory>
  | ReturnType<typeof updateMemory>
  | ReturnType<typeof selectEditMemory>
  | ReturnType<typeof previewMemory>
  | ReturnType<typeof approveMemory>
  | ReturnType<typeof viewMemory>
  | ReturnType<typeof paginateMemoryAction>
  | ReturnType<typeof paginateMemoryActionAsync>
  | ReturnType<typeof approveMemoryAsync>
  | ReturnType<typeof updateMemoryAsync>
  | ReturnType<typeof getMemoriesAsync>
  | ReturnType<typeof createMemoryAsync>
  | ReturnType<typeof deleteMemoryAsync>
  | ReturnType<typeof setMediatypeTrigger>
  | ReturnType<typeof setStepCreateMemoryTrigger>
  | ReturnType<typeof setMemoryTypesAsync>
