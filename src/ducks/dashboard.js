import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    selectedYear: new Date().getFullYear(),
    selectedMonth: new Date().getMonth() + 1,
  },
  reducers: {
    setSelectedYear(state, action) {
      state.selectedYear = action.payload;
    },
    setSelectedMonth(state, action) {
      state.selectedMonth = action.payload;
    },
  },
});

const { actions, reducer } = dashboardSlice;
export { actions };
export default reducer;
