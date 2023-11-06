import { createSelector } from '@reduxjs/toolkit';
import { get } from 'lodash';

const authSelector = (state) => get(state, 'domain.auth');

export const tokenSelector = createSelector(
  authSelector,
  (authData) => authData.authToken
);

export const isLoggedInSelector = createSelector(
  authSelector,
  (authData) => authData.isLoggedIn
);

export const userIdSelector = createSelector(
  authSelector,
  (authData) => authData.userId
);
