import axios from "axios";
import { Toast } from "vant";
import Qs from 'qs'

const MODE = import.meta.env.MODE;

// 创建一个 axios 实例
const service = axios.create({
  baseURL: MODE == "production" ? "https://shutan.fjjiuquan.com" : "/api", // 所有的请求地址前缀部分
  timeout: 60000, // 请求超时时间毫秒
  withCredentials: false, // 异步请求携带cookie
  headers: {
    // 设置后端需要的传参类型
    // "Accept": '*',
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    console.log("请求拦截",config)
    if(config.method == 'post'){
      config.data = Qs.stringify(config.data)
    }
    let token = localStorage.getItem("Token") || "";
    if(token) config.headers["token"] = token;
    config.headers["content-type"] = 'application/x-www-form-urlencoded ';
    if (!config.customLoading) {
      Toast.loading({
        message: config.loadingMsg,
        // overlay:true,
        forbidClick: true,
        duration:0
      });
    }

    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.log(error);
    Toast.clear();
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    let { code,data } = response;
    if (code == 401) {
      console.log("登录失败");
    } else if (code == 500) {
      console.log("网络错误~");
    }
    const dataAxios = data;
    Toast.clear();
    // dataAxios.code = code;
    return dataAxios;
  },
  function (error) {
    Toast.clear();
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error);
    Toast({
      message: "网络请求错误~",
      position: "top",
    });
    return Promise.reject(error);
  }
);

export default service;
