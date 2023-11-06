import { createSelector } from '@reduxjs/toolkit';
import { get } from 'lodash';

const dashboardSelector = (state) => get(state, 'domain.dashboard');

export const selectedMonthAndYearSelector = createSelector(
  dashboardSelector,
  ({ selectedMonth, selectedYear }) => ({ selectedMonth, selectedYear })
);
