import { all, fork } from 'redux-saga/effects';
import {
  watchExpandDrawerSaga,
  watchCollapseDrawerSaga,
  watchShowOpenPublishModal,
  watchHideOpenPublishModal,
} from '@/store/intermitence/saga';
import { watchSetNextStep } from './forgot-password/saga';
import {
  watchFacebookGoogle,
  watchForgotPassword,
  watchLoginApple,
  watchLoginGoogle,
  watchLoginUser,
  watchRefreshUserData,
  watchRegisterUser,
  watchResetPassword,
  watchUpdateUserData,
  watchValidateResetCode,
  watchDeleteUser,
} from './auth/saga';
import { watchFilterStories, watchGetProfileStories } from './home/saga';
import {
  watchCreateSectionStory,
  watchSetCreateStep,
  watchCreateStory,
  watchCreatePayload,
  watchSetPrompts,
  watchStoryActions,
  watchActualStory,
  watchUpdateStory,
  watchDeleteStory,
  watchSetPublicationStory,
  watchSetCodeStory,
} from './story/saga';
import { watchGetSignedUrl, watchGetUploadSignedUrl } from './file/saga';
import {watchExtraContentSaga} from  './extras/saga';
import {
  watchApproveUpdateMemory,
  watchCreateMemory,
  watchDeleteMemory,
  watchGetMemoriesStory,
  watchPaginateBubbles,
  watchSetCreateMemoryStep,
  watchSetMediaType,
  watchUpdateMemory,
  watchViewMemory,
} from './memory/saga';
import {
  watchGetCollaboratorStory,
  watchSetInviteAccepted,
  watchSetInviteCollaborator,
  watchSetRemoveCollaborator,
  watchSetRemoveCollaboratorNoRegister,
} from './collaborator/saga';
import {
  watchAcceptCollaborateNotification,
  watchClearAllNotifications,
  watchDeleteNotification,
  watchGetNotifications,
} from './notifications/saga';
import {
  watchLoginUserView, watchLoginUserAction,
  watchTrackEvent, watchTrackPageView, watchRegisterUserAction, watchRegisterUserView,
  watchResetPasswordAction, watchResetPasswordView, watchEditProfileAction,
  watchEditProfileView, watchSettingsView, watchGeneralNotificationsView
} from './analytics/saga';
import {
  watchViewStoryG, watchCreateStoryAction, watchCreateStoryView,
  watchDeleteStoryAction, watchDeleteStoryView, watchUpdateStoryAction, watchUpdateStoryView,
  watchCreateMemoryAction, watchCreateMemoryView, watchDeleteMemoryAction, watchDeleteMemoryView,
  watchUpdateMemoryAction, watchUpdateMemoryView, watchViewMemoryG, watchFilterStoryAction
} from './analyticsStories/saga';

import { watchToggleHasChanges } from './hasChanges/saga';

import {  watchGetProducts,watchSetSelectedTier, watchCancelSubscription,watchResumeSubscription,watchRenewSubscription,watchUpdateSubscriptionStatus} from './subscription/saga'
import {    watchGetOrders,
  watchCreateOrder} from './order/saga';
import {watchCreateUserPurchase,watchGetUserPurchases} from './purchase/saga'
import {watchGetTemplate} from'./tempConfig/saga';
import { watchGetStorageLogs, watchLogStorageUsage, watchUpdateLogStorageUsage } from './storageLog/saga';
export default function* allSagas() {
  yield all([
    fork(watchUpdateLogStorageUsage),
    fork(watchGetStorageLogs),
    fork(watchLogStorageUsage),
    fork(watchDeleteUser),
    fork(watchStoryActions),
    fork(watchGetUserPurchases),
    fork(watchExtraContentSaga),
    fork(watchUpdateSubscriptionStatus),
    fork(watchRenewSubscription),
    fork(watchResumeSubscription),
    fork(watchCancelSubscription),
    fork(watchCreateUserPurchase),
    fork(watchGetProducts),
    fork(watchGetOrders),
    fork(watchGetTemplate),
    fork(watchSetSelectedTier),
    fork(watchCreateOrder),
    fork(watchExpandDrawerSaga),
    fork(watchCollapseDrawerSaga),
    fork(watchSetNextStep),
    fork(watchFilterStories),
    fork(watchRegisterUser),
    fork(watchLoginUser),
    fork(watchForgotPassword),
    fork(watchValidateResetCode),
    fork(watchResetPassword),
    fork(watchLoginGoogle),
    fork(watchFacebookGoogle),
    fork(watchGetProfileStories),
    fork(watchUpdateUserData),
    fork(watchSetCreateStep),
    fork(watchCreateSectionStory),
    fork(watchCreateStory),
    fork(watchCreatePayload),
    fork(watchSetPrompts),
    fork(watchGetUploadSignedUrl),
    fork(watchGetSignedUrl),
    fork(watchSetCreateMemoryStep),
    fork(watchSetMediaType),
    fork(watchActualStory),
    fork(watchCreateMemory),
    fork(watchGetMemoriesStory),
    fork(watchRefreshUserData),
    fork(watchDeleteMemory),
    fork(watchUpdateMemory),
    fork(watchApproveUpdateMemory),
    fork(watchSetInviteCollaborator),
    fork(watchSetInviteAccepted),
    fork(watchUpdateStory),
    fork(watchDeleteStory),
    fork(watchSetPublicationStory),
    fork(watchSetCodeStory),
    fork(watchGetNotifications),
    fork(watchDeleteNotification),
    fork(watchAcceptCollaborateNotification),
    fork(watchClearAllNotifications),
    fork(watchSetRemoveCollaborator),
    fork(watchGetCollaboratorStory),
    fork(watchShowOpenPublishModal),
    fork(watchHideOpenPublishModal),
    fork(watchLoginUserView),
    fork(watchLoginUserAction),
    fork(watchTrackEvent),
    fork(watchTrackPageView),
    fork(watchRegisterUserAction),
    fork(watchRegisterUserView),
    fork(watchResetPasswordAction),
    fork(watchResetPasswordView),
    fork(watchViewStoryG),
    fork(watchCreateStoryAction),
    fork(watchCreateStoryView),
    fork(watchUpdateStoryView),
    fork(watchUpdateStoryAction),
    fork(watchDeleteStoryAction),
    fork(watchDeleteStoryView),
    fork(watchDeleteMemoryAction),
    fork(watchDeleteMemoryView),
    fork(watchUpdateMemoryAction),
    fork(watchUpdateMemoryView),
    fork(watchCreateMemoryAction),
    fork(watchCreateMemoryView),
    fork(watchViewMemoryG),
    fork(watchEditProfileAction),
    fork(watchEditProfileView),
    fork(watchSettingsView),
    fork(watchGeneralNotificationsView),
    fork(watchFilterStoryAction),
    fork(watchViewMemory),
    fork(watchLoginApple),
    fork(watchSetRemoveCollaboratorNoRegister),
    fork(watchPaginateBubbles),
    fork(watchToggleHasChanges),
  ]);
}
