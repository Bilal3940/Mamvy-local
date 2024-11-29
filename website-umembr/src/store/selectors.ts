
const intermitenceSelector = (state: any) => state.intermitence;
const hideGradientSelector = (state: any) => state.intermitence?.hideGradient;
const backgroundChangeSelector = (state: any) => state.intermitence?.backgroundChange;
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
const templatesSelector = (state:any)=>state.templates;
const extrasSelector = (state:any)=>state.extraContent;
const orderSelector = (state: any) => state.order ?? {};
const purchaseSelector = (state: any) => state.purchase ?? {};

export { analyticsSelector, authSelector,subscriptionSelector, collaboratorSelector, forgotSelector, homeSelector, intermitenceSelector, hideGradientSelector, backgroundChangeSelector, memorySelector, notificationsSelector, storySelector, currentStorySelector, hasChangesSelector , templatesSelector,purchaseSelector, extrasSelector, orderSelector};

