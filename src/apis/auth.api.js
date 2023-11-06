import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutHeaders } from './baseQuery';
import { AUTH } from '../constants/endpoint';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithoutHeaders,
  endpoints: (builder) => ({
    loginOrSignup: builder.mutation({
      query: ({ userId, password, isLogin }) => ({
        url: isLogin ? AUTH.LOGIN : AUTH.SIGNUP,
        method: 'POST',
        data: { userId, password },
      }),
    }),
  }),
});

export const { useLoginOrSignupMutation } = authApi;
