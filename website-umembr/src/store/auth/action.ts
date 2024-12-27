import {
  DELETE_USER,
  FORGOT_PASSWORD,
  LOGIN_APPLE,
  LOGIN_FACEBOOK,
  LOGIN_GOOGLE,
  LOGIN_USER,
  LOGOUT_USER_ASYNC,
  REFRESH_user_DATA,
  REFRESH_USER_DATA,
  REGISTER_USER,
  RESET_FORGOT_PASSWORD,
  RESET_PASSWORD,
  UPDATE_USER_DATA,
  VALIDATE_RESET_CODE,
} from './action-types';
import { actionObject } from '../../utils';

export const registerUser = (data: any) => actionObject(REGISTER_USER, data);
export const logout = () => actionObject(LOGOUT_USER_ASYNC);
export const loginUser = (data: any) => actionObject(LOGIN_USER, data);
export const forgotPassword = (data: any) => actionObject(FORGOT_PASSWORD, data);
export const resetForgotPassword = () => actionObject(RESET_FORGOT_PASSWORD);
export const validateResetCode = (data: any) => actionObject(VALIDATE_RESET_CODE, data);
export const resetPassword = (data: any) => actionObject(RESET_PASSWORD, data);
export const loginGoogle = (data: any) => actionObject(LOGIN_GOOGLE, data);
export const loginFacebook = (data: any) => actionObject(LOGIN_FACEBOOK, data);
export const loginApple = (data: any) => actionObject(LOGIN_APPLE, data);

export const updateUserData = (data: any) => actionObject(UPDATE_USER_DATA, data)

export const refreshUserData = () => actionObject(REFRESH_USER_DATA)
export const refreshuserData = ()=> actionObject(REFRESH_user_DATA)
export const deleteUser = (payload: any) => actionObject(DELETE_USER, payload);