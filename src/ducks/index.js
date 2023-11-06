import { combineReducers } from '@reduxjs/toolkit';
import auth, { actions as authActions } from './auth';
import dashboard, { actions as dashboardActions } from './dashboard';

export const actions = {
  authActions,
  dashboardActions,
};

export default combineReducers({ auth, dashboard });
