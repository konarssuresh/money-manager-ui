import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithHeaders } from './baseQuery';
import { TRANSACTIONS } from '../constants/endpoint';
import { userIdSelector } from '../selectors';
import { getFormattedDate } from '../utils/commonUtils';

export const moneyManagerApi = createApi({
  reducerPath: 'moneyManager',
  baseQuery: baseQueryWithHeaders,
  endpoints: (builder) => ({
    getTransactionByMonthAndYear: builder.query({
      query: ({ year, month }) => ({
        url: TRANSACTIONS.GET_TRANSACTIONS,
        method: 'POST',
        data: {
          year,
          month,
        },
      }),
      providesTags: () => ['transactions'],
    }),
    transactionTypes: builder.query({
      query: () => ({
        method: 'GET',
        url: TRANSACTIONS.GET_TYPES,
      }),
      providesTags: () => ['types'],
    }),
    addType: builder.mutation({
      query: ({ type, name }) => ({
        method: 'POST',
        data: { name, type },
        url: TRANSACTIONS.ADD_TYPE,
      }),
      invalidatesTags: () => ['types'],
    }),

    addTransaction: builder.mutation({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const userId = userIdSelector(api.getState());
        const reqObj = {
          ...args,
          value: parseFloat(args.value),
          transactionDate: getFormattedDate(args.transactionDate, 'YYYY-MM-DD'),
          userId,
        };

        try {
          const response = await baseQuery({
            url: TRANSACTIONS.ADD_TRANSACTION,
            method: 'POST',
            data: reqObj,
          });
          return { data: response?.data };
        } catch (e) {
          return {
            error: e,
          };
        }
      },
      invalidatesTags: () => ['transactions'],
    }),

    updateTransaction: builder.mutation({
      query: (args) => {
        console.log(args.value);
        console.log(typeof args.value);
        const req = {
          ...args,
          value: parseFloat(args.value),
          transactionDate: getFormattedDate(args.transactionDate, 'YYYY-MM-DD'),
        };
        return {
          method: 'PUT',
          url: TRANSACTIONS.UPDATE_TRANSACTION,
          data: req,
        };
      },
      invalidatesTags: () => ['transactions'],
    }),

    deleteTransaction: builder.mutation({
      query: ({ transactionId }) => ({
        url: TRANSACTIONS.DELETE_TRANSACTION,
        method: 'DELETE',
        data: { transactionId },
      }),
      invalidatesTags: () => ['transactions'],
    }),
  }),
});

const {
  useGetTransactionByMonthAndYearQuery,
  useTransactionTypesQuery,
  useAddTypeMutation,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = moneyManagerApi;

export {
  useGetTransactionByMonthAndYearQuery,
  useTransactionTypesQuery,
  useAddTypeMutation,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
};
