// src/store/auth/reducer.ts
import {
    LOGIN_USER_VIEW,
    LOGIN_USER_ACTION,
    TRACK_EVENT, RESET_PASSWORD_ACTION, REGISTER_USER_VIEW, REGISTER_USER_ACTION,
    TRACK_PAGE_VIEW, RESET_PASSWORD_VIEW,
    SETTINGS_VIEW_G,
    EDIT_PROFILE_VIEW_G,
    EDIT_PROFILE_ACTION_G,
    GENERAL_NOTIFICATIONS_VIEW_G, 
  } from './action-types';
  
  const initialState = {
    events: [],
    pageViews: [],
    loginAttempts: [],
    resetPasswordAttempts: [],
    registerUserAttempts: [],
    settingsViews: [],
    profileEdits: [],
    generalNotificationViews: []
  };
  
  const analytics = (state = initialState, action: any) => {
    switch (action.type) {
      case LOGIN_USER_VIEW:
        return {
          ...state,
          events: [...state.events, { event: 'login_user_view', category: 'User Management', action: 'View Login Page' }],
        };
      case LOGIN_USER_ACTION:
        return {
          ...state,
          loginAttempts: [...state.loginAttempts, action.payload],
        };
      case TRACK_EVENT:
        return {
          ...state,
          events: [...state.events, action.payload],
        };
      case TRACK_PAGE_VIEW:
        return {
          ...state,
          pageViews: [...state.pageViews, action.payload],
        };
        case RESET_PASSWORD_VIEW:
          return {
            ...state,
            events: [...state.events, { event: 'reset_password_view', category: 'User Management', action: 'View Reset Password Page' }],
          };
        case RESET_PASSWORD_ACTION:
          return {
            ...state,
            resetPasswordAttempts: [...state.resetPasswordAttempts, action.payload?.user],
          };
        case REGISTER_USER_VIEW:
          return {
            ...state,
            events: [...state.events, { event: 'register_user_view', category: 'User Management', action: 'View Register Page' }],
          };
        case REGISTER_USER_ACTION:
          return {
            ...state,
            registerUserAttempts: [...state.registerUserAttempts, action.payload?.user],
          };
        case SETTINGS_VIEW_G:
      return {
        ...state,
        settingsViews: [...state.settingsViews, { event: 'settings_view', category: 'Settings and Profile', action: 'View Settings Page', userId: action.payload.userId }],
      };
    case EDIT_PROFILE_VIEW_G:
      return {
        ...state,
        events: [...state.events, { event: 'edit_profile_view', category: 'Settings and Profile', action: 'View Edit Profile Page', userId: action.payload.userId }],
      };
    case EDIT_PROFILE_ACTION_G:
      return {
        ...state,
        profileEdits: [...state.profileEdits, action.payload?.user],
      };
    case GENERAL_NOTIFICATIONS_VIEW_G:
      return {
        ...state,
        generalNotificationViews: [...state.generalNotificationViews, { event: 'general_notifications_view', category: 'Settings and Profile', action: 'View General Notifications Page', userId: action.payload.userId }],
      };
      default:
        return state;
    }
  };
  
  export default analytics;
  