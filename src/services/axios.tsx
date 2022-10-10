import axiosInstance from 'axios';
import ENDPOINT from './endpoint';
import localStorage from '../utils/localStorage';
import { message as $message } from 'antd';


const axios = axiosInstance.create({
  baseURL: ENDPOINT.BASE_URL,
  timeout: 60000,
  headers: {'Access-Control-Allow-Headers':'Content-Type' },
});

axios.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.get('accessToken') ?? null;
    if (accessToken) {
      return {
        ...config,
        headers: {
          Authorization:accessToken,  // auto attach token
          ...config.headers, // but you can override for some requests
        }
      }
    }
    return config
  },
  
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    $message.success(response?.data?.msg);
    return response;
  },
  function (error) {
    $message.error(error?.response.data.msg);
    // console.log(error.response.data.msg)
    return Promise.reject(error);
  }
);

export default axios;
