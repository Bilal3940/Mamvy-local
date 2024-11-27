// src/store/auth/actions.ts
import {
    LOGIN_USER_VIEW,
    LOGIN_USER_ACTION,
    TRACK_EVENT,
    TRACK_PAGE_VIEW,
    RESET_PASSWORD_VIEW,
    RESET_PASSWORD_ACTION,
    REGISTER_USER_VIEW,
    REGISTER_USER_ACTION,
    SETTINGS_VIEW_G,
    EDIT_PROFILE_VIEW_G,
    EDIT_PROFILE_ACTION_G,
    GENERAL_NOTIFICATIONS_VIEW_G,
  } from './action-types';
  import { actionObject } from '@/utils';
  
  export const loginUserView = () => actionObject(LOGIN_USER_VIEW, {});
  
  export const loginUserAction = (loginType: string, user: any) => 
    actionObject(LOGIN_USER_ACTION, { loginType, user});
  
  export const trackEvent = (event: string, category: string, action: string, label?: string, value?: number) => 
    actionObject(TRACK_EVENT, { event, category, action, label, value });
  
  export const trackPageView = (url: string) => 
    actionObject(TRACK_PAGE_VIEW, { url });

  export const resetPasswordView = () => actionObject(RESET_PASSWORD_VIEW, {});

export const resetPasswordAction = (user: any) => 
  actionObject(RESET_PASSWORD_ACTION, { user });

export const registerUserView = () => actionObject(REGISTER_USER_VIEW, {});

export const registerUserAction = (user: any) => 
  actionObject(REGISTER_USER_ACTION, { user });

export const settingsView = (userId: string) => actionObject(SETTINGS_VIEW_G, { userId });

export const editProfileView = (userId: string) => actionObject(EDIT_PROFILE_VIEW_G, { userId });

export const editProfileAction = (user: any) => 
  actionObject(EDIT_PROFILE_ACTION_G, { user });

export const generalNotificationsView = (userId: string) => actionObject(GENERAL_NOTIFICATIONS_VIEW_G, { userId });
  