import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  initialState: {
    isLoggedIn: false,
    authToken: '',
    refreshToken: '',
    userId: '',
  },
  name: 'auth',
  reducers: {
    setLoginData(state, action) {
      return {
        ...state,
        isLoggedIn: true,
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.userId,
      };
    },

    logout() {
      return {
        isLoggedIn: false,
        authToken: '',
        refreshToken: '',
        userId: '',
      };
    },
  },
});

const { actions, reducer } = authSlice;

export { actions };
export default reducer;
