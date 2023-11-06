import { configureStore } from '@reduxjs/toolkit';
import { authApi, moneyManagerApi } from './apis';
import domain from './ducks';

function setupStore() {
  const store = configureStore({
    reducer: {
      domain,
      [authApi.reducerPath]: authApi.reducer,
      [moneyManagerApi.reducerPath]: moneyManagerApi.reducer,
    },
    enhancers: [],
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(moneyManagerApi.middleware),
  });

  return store;
}

const store = setupStore();

export default store;
