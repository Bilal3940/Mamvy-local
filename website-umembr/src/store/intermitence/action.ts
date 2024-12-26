import {
  CHANGE_BACKGROUND,
  CLOSE_DELETE_MODAL,
  CLOSE_MODAL,
  CLOSE_PUBLISH_MODAL,
  CLOSE_SUBSCRIPTION_MODAL,
  CLOSE_SUBSCRIPTION_POPUP,
  COLLAPSE_DRAWER,
  EXPAND_DRAWER,
  HIDE_GRADIENT,

  OPEN_DELETE_MODAL,
  OPEN_MODAL,
  OPEN_PUBLISH_MODAL,
  OPEN_SUBSCRIPTION_MODAL,
  OPEN_SUBSCRIPTION_POPUP,
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

export const openModal = (content:any) => ({
  type: OPEN_MODAL,
  payload: content,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
// Delete modal actions
export const openDeleteModal = () => ({
  type: OPEN_DELETE_MODAL,
});

export const closeDeleteModal = () => ({
  type: CLOSE_DELETE_MODAL,
});

// Subscription modal actions
export const openSubscriptionModal = () => ({
  type: OPEN_SUBSCRIPTION_MODAL,
});

export const closeSubscriptionModal = () => ({
  type: CLOSE_SUBSCRIPTION_MODAL,
});

export const openSubscriptionPopup = () => ({
  type: OPEN_SUBSCRIPTION_POPUP,
});

export const closeSubscriptionPopup = () => ({
  type: CLOSE_SUBSCRIPTION_POPUP,
});



