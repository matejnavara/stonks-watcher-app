import Config from 'react-native-config';
import axios, {AxiosResponse} from 'axios';

interface Error {
  message: string;
  response?: AxiosResponse;
}

const finnhubApi = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Finnhub-Token': Config.TOKEN,
  },
  timeout: 3000,
});

export const handleError = (error: Error) => {
  return Promise.reject({
    message: error.message,
    data: error.response?.data,
    status: error.response?.status,
    error,
  });
};

finnhubApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return handleError(error);
  }
);

export default finnhubApi;
