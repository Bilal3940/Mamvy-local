
const intermitenceSelector = (state: any) => state.intermitence;
const hideGradientSelector = (state: any) => state.intermitence?.hideGradient;
const backgroundChangeSelector = (state: any) => state.intermitence?.backgroundChange;
const StoragePopupSelector = (state: any) => state.storageLog?.storagePopup;
const forgotSelector = (state: any) => state.forgotPassword;
const homeSelector = (state: any) => state.home;
const authSelector = (state: any) => state.auth;
const storySelector = (state: any) => state.story;
const currentStorySelector = (state: any) => state.story?.story;
const memorySelector = (state: any) => state.memory;
const collaboratorSelector = (state: any) => state.collaborator
const notificationsSelector = (state: any) => state.notifications;
const analyticsSelector = (state: any) => state.analytics;
const subscriptionSelector =(state: any)=> state.subscription;
const hasChangesSelector = (state:any)=>state.hasChanges;
const templatesSelector = (state:any)=>state.template;
const extrasSelector = (state:any)=>state.extraContent;
const orderSelector = (state: any) => state.orders ?? {};
const purchaseSelector = (state: any) => state.purchase ?? {};
const storagelogSelector = (state: any) => state.storageLog?.storageLog || {};
const pendingStorySelector = (state:any)=> state?.story?.pendingStory || {};

export {pendingStorySelector, analyticsSelector, authSelector,subscriptionSelector,StoragePopupSelector, collaboratorSelector, forgotSelector, homeSelector, intermitenceSelector, hideGradientSelector, backgroundChangeSelector, memorySelector, notificationsSelector, storySelector, currentStorySelector, hasChangesSelector , templatesSelector,purchaseSelector, extrasSelector, orderSelector,storagelogSelector};

