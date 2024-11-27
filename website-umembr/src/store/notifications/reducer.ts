import {
    GET_NOTIFICATIONS_ASYNC,
    DELETE_NOTIFICATION_ASYNC,
    CLEAR_ALL_NOTIFICATIONS_ASYNC
    }
    from './action-types';

const initialState = {
    notifications: {
        allNotifications: [],
        collaborationNotifications: [],
        otherNotifications: [],
    },
};

const notifications = (state = initialState, { type, payload }: any) => {
    switch (type) {
        case GET_NOTIFICATIONS_ASYNC:
            return { ...state, notifications: payload };
        case DELETE_NOTIFICATION_ASYNC:
            return { ...state, notifications: {
                ...state.notifications,
                allNotifications: state.notifications.allNotifications.filter((notification: any) => notification.id !== payload),
                collaborationNotifications: state.notifications.collaborationNotifications.filter((notification: any) => notification.id !== payload),
                otherNotifications: state.notifications.otherNotifications.filter((notification: any) => notification.id !== payload),
            }
             };
        case CLEAR_ALL_NOTIFICATIONS_ASYNC:
            const { type: notificationType } = payload;
            
            return { 
              ...state, 
              notifications: {
                allNotifications: notificationType === 'allNotifications' || !notificationType ? 
                    [] : state.notifications.allNotifications,
                collaborationNotifications: notificationType === 'collaboration' || !notificationType ? 
                  [] : state.notifications.collaborationNotifications,
                otherNotifications: notificationType === 'otherNotifications' || !notificationType ? 
                  [] : state.notifications.otherNotifications,
              }
            };
        default:
            return state;
    }
};

export default notifications;