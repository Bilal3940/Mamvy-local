import {
  CHANGE_BACKGROUND,
  CLOSE_PUBLISH_MODAL,
  COLLAPSE_DRAWER,
  EXPAND_DRAWER,
  HIDE_GRADIENT,
  OPEN_PUBLISH_MODAL,
  SET_SEPARATION,
  SHOW_ACTUAL_SECTION,
} from './action-types';
import { actionObject } from '@/utils';

export const expandDrawer = () => actionObject(EXPAND_DRAWER);
export const collapseDrawer = () => actionObject(COLLAPSE_DRAWER);
export const showActualSection = (payload: any) => actionObject(SHOW_ACTUAL_SECTION, payload);
export const changeBackground = (payload: boolean) => actionObject(CHANGE_BACKGROUND, payload);
export const hideGradient = (payload: boolean) => actionObject(HIDE_GRADIENT, payload);
export const openPublishModal = () => actionObject(OPEN_PUBLISH_MODAL);
export const closePublishModal = () => actionObject(CLOSE_PUBLISH_MODAL);
export const setSeparation = (payload: string) => actionObject(SET_SEPARATION, payload);
