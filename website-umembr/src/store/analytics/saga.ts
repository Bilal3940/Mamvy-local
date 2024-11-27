import { call, takeLatest } from 'redux-saga/effects';
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
import { sendEvent } from '@/utils/analytics';

// Worker Saga: handle track event
function* handleTrackEvent({ payload }: any): any {
  yield call(sendEvent, payload);
}

// Worker Saga: handle track page view
function* handleTrackPageView({ payload }: any): any {
  yield call(sendEvent, {
    event: 'page_view',
    category: 'Navigation',
    action: 'Page View',
    label: payload.url,
  });
}

// Worker Saga: handle login user view
function* handleLoginUserView(): any {
  yield call(sendEvent, {
    event: 'login_user_view',
    category: 'User Management',
    action: 'View Login Page',
  });
}

// Worker Saga: handle login user action
function* handleLoginUserAction({ payload }: any): any {
  const { loginType, user } = payload;
  yield call(sendEvent, {
    event: 'login_user_action',
    category: 'User Management',
    action: 'Attempt Login',
    label: loginType,
    email: user?.email,
    loginType,
    userId: user?.id,
    name: user?.name,
    lastName: user?.lastname,
  });
}
function* handleResetPasswordView(): any {
  yield call(sendEvent, {
    event: 'reset_password_view',
    category: 'User Management',
    action: 'View Reset Password Page',
  });
}

function* handleResetPasswordAction({ payload }: any): any {
  const { user } = payload;
  yield call(sendEvent, {
    event: 'reset_password_action',
    category: 'User Management',
    action: 'Attempt Reset Password',
    email: user?.email,
    userId: user?.id,
    name: user?.name,
    lastName: user?.lastname,
  });
}

function* handleRegisterUserView(): any {
  yield call(sendEvent, {
    event: 'register_user_view',
    category: 'User Management',
    action: 'View Register Page',
  });
}

function* handleRegisterUserAction({ payload }: any): any {
  const { user } = payload;
  yield call(sendEvent, {
    event: 'register_user_action',
    category: 'User Management',
    action: 'Complete Registration',
    email: user?.email,
    userId: user?.id,
    name: user?.name,
    lastName: user?.lastname,
  });
}
function* handleSettingsView({ payload }: any): any {
  const { userId } = payload;
  yield call(sendEvent, {
    event: 'settings_view',
    category: 'Settings and Profile',
    action: 'View Settings Page',
    userId,
  });
}

function* handleEditProfileView({ payload }: any): any {
  const { userId } = payload;
  yield call(sendEvent, {
    event: 'edit_profile_view',
    category: 'Settings and Profile',
    action: 'View Edit Profile Page',
    userId,
  });
}

function* handleEditProfileAction({ payload }: any): any {
  const { user } = payload;
  yield call(sendEvent, {
    event: 'edit_profile_action',
    category: 'Settings and Profile',
    action: 'Attempt Edit Profile',
    email: user?.email,
    userId: user?.id,
    name: user?.name,
    lastName: user?.lastname,
  });
}

function* handleGeneralNotificationsView({ payload }: any): any {
  const { userId } = payload;
  yield call(sendEvent, {
    event: 'general_notifications_view',
    category: 'Settings and Profile',
    action: 'View General Notifications Page',
    userId,
  });
}

export function* watchLoginUserView() {
  yield takeLatest(LOGIN_USER_VIEW, handleLoginUserView);
}

export function* watchLoginUserAction() {
  yield takeLatest(LOGIN_USER_ACTION, handleLoginUserAction);
}

export function* watchTrackEvent() {
  yield takeLatest(TRACK_EVENT, handleTrackEvent);
}

export function* watchTrackPageView() {
  yield takeLatest(TRACK_PAGE_VIEW, handleTrackPageView);
}

export function* watchResetPasswordView() {
  yield takeLatest(RESET_PASSWORD_VIEW, handleResetPasswordView);
}

export function* watchResetPasswordAction() {
  yield takeLatest(RESET_PASSWORD_ACTION, handleResetPasswordAction);
}

export function* watchRegisterUserView() {
  yield takeLatest(REGISTER_USER_VIEW, handleRegisterUserView);
}

export function* watchRegisterUserAction() {
  yield takeLatest(REGISTER_USER_ACTION, handleRegisterUserAction);
}

export function* watchSettingsView() {
  yield takeLatest(SETTINGS_VIEW_G, handleSettingsView);
}

export function* watchEditProfileView() {
  yield takeLatest(EDIT_PROFILE_VIEW_G, handleEditProfileView);
}

export function* watchEditProfileAction() {
  yield takeLatest(EDIT_PROFILE_ACTION_G, handleEditProfileAction);
}

export function* watchGeneralNotificationsView() {
  yield takeLatest(GENERAL_NOTIFICATIONS_VIEW_G, handleGeneralNotificationsView);
}
