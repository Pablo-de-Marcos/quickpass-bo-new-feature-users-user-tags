import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import Config from '../config/index';

type ApiConfig = {
  url: string;
  timeout: number;
};

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000
};

const axiosInt = axios.create({
  baseURL: DEFAULT_API_CONFIG.url,
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: {
    Accept: 'application/json'
  }
});

axiosInt.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'There is an error!'
    )
);

export const mock = new AxiosMockAdapter(axiosInt, { delayResponse: 0 });

export default axiosInt;
