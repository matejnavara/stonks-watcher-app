import axios, {AxiosResponse} from 'axios';

import {apiConfig} from '../../config/finnhub.config';

interface Error {
  message: string;
  response?: AxiosResponse;
}

const finnhubApi = axios.create({
  baseURL: apiConfig.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Finnhub-Token': apiConfig.TOKEN,
  },
  timeout: 3000,
});

export const handleError = (error: Error) => {
  return Promise.reject({
    message: error.message,
    data: error.response?.data,
    status: error.response?.status,
  });
};

finnhubApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return handleError(error);
  }
);

export default finnhubApi;
