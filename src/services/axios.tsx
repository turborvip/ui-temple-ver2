import axiosInstance from 'axios';
import ENDPOINT from './endpoint';
import local from '../utils/localStorage';
import { message as $message } from 'antd';


const axios = axiosInstance.create({
  baseURL: ENDPOINT.BASE_URL,
  timeout: 60000,
  headers: {'Access-Control-Allow-Headers':'Content-Type' },
});

axios.interceptors.request.use(
   async(config) =>{
    const accessToken = 'Bearer '+ local.get('accessToken') ?? null;
    // if(config.url?.indexOf('./login') >= 0 || config.url?.indexOf('./getToken') >= 0 ){
    //   return config
    // }
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
  async(res) => {
    // $message.success(response?.data?.msg);
    console.log(res);
    if(res?.data?.status == 401 && !res?.data?.auth){
      //refresh token...
      const refreshToken = local.get('refreshToken') || null;
      const result = await axios.post('/getToken',{refreshToken})
      if(result?.status === 200){
        local.add('accessToken',JSON.stringify(result.data.accessToken));
      }
    }
    return res;
  },
  (err) => {
    console.log('err',err)
    $message.error(err?.response?.data.msg);
    if(!err?.response?.data?.refreshToken){
      local.clear();
      window.confirm("Your session is expired...");
      window.location.replace('./login');
    }
    return err
  }
);


export default axios;
