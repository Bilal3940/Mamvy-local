import {
    GET_NOTIFICATIONS,
    DELETE_NOTIFICATION,
    ACCEPT_NOTIFICATION_COLLABORATE,
    CLEAR_ALL_NOTIFICATIONS,
    }
    from './action-types';
import { actionObject } from '@/utils';

export const getNotifications = () => actionObject(GET_NOTIFICATIONS);
export const deleteNotification = (payload: any) => actionObject(DELETE_NOTIFICATION, payload);
export const acceptCollaborateNotification = (payload: any) => actionObject(ACCEPT_NOTIFICATION_COLLABORATE, payload)
export const clearAllNotifications = (payload: any) => actionObject(CLEAR_ALL_NOTIFICATIONS, payload)