import { combineReducers } from 'redux';
import intermitence from './intermitence/reducer';
import forgotPassword from './forgot-password/reducer';
import home from './home/reducer';
import auth from './auth/reducer';
import story from './story/reducer';
import memory from './memory/reducer';
import collaborator from './collaborator/reducer';
import notifications from './notifications/reducer';
import analytics from './analytics/reducer';
import analyticsStories from './analyticsStories/reducer';
import subscription from './subscription/reducer';
import orders from './order/reducer';
import hasChanges from './hasChanges/reducer';
import template from './tempConfig/reducer';
import extraContent from './extras/reducer';
import purchase from './purchase/reducer';
import storageLog from './storageLog/reducer';

const reducers: any = combineReducers({
  intermitence,
  template,
  purchase,
  forgotPassword,
  home,
  auth,
  story,
  memory,
  orders,
  collaborator,
  notifications,
  analytics,
  subscription,
  analyticsStories,
  hasChanges,
  extraContent,
  storageLog,
});

export default reducers;
