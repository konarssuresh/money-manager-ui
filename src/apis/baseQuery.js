import axios from 'axios';
import { MONEY_MANAGER_SERVICE_BASE_URL } from '../constants/endpoint';
import { tokenSelector } from '../selectors';

export const baseQuery = ({
  baseURL,
  requestInterceptors = [],
  responseInterceptors = [],
}) => {
  return async (args, api, extraOptions) => {
    console.log(args);
    const instance = axios.create({
      baseURL,
    });

    requestInterceptors.forEach((interceptorFunc) => {
      instance.interceptors.request.use((config) => {
        const updatedConfig = interceptorFunc(config, {
          api,
          args,
          extraOptions,
        });
        return updatedConfig;
      });
    });

    responseInterceptors.forEach((interceptorFunc) => {
      instance.interceptors.response.use((response) => {
        const updatedResponse = interceptorFunc(response, {
          api,
          extraOptions,
          args,
        });

        return updatedResponse;
      });
    });

    try {
      const result = await instance(args);
      return { data: result.data };
    } catch (e) {
      return { error: e };
    }
  };
};

export const baseQueryWithoutHeaders = baseQuery({
  baseURL: MONEY_MANAGER_SERVICE_BASE_URL,
  requestInterceptors: [
    (config) => {
      config.headers['Content-Type'] = 'application/json';

      return config;
    },
  ],
});

export const baseQueryWithHeaders = baseQuery({
  baseURL: MONEY_MANAGER_SERVICE_BASE_URL,
  requestInterceptors: [
    (config, { api }) => {
      const token = tokenSelector(api.getState());
      config.headers['Content-Type'] = 'application/json';
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
  ],
});
