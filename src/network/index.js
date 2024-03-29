// import axios from 'axios'
// export function request(config){
//   // 1.创建axios的实例
//   const instance = axios.create({
//     baseURL: "http://192.168.8.101:8447",
//     timeout: 5000
//
//   })
//   //2.axios拦截器
//   //2.1.请求拦截
//   instance.interceptors.request.use(config => {
//     return config
//   }, error => {
//     // 请求错误处理
//     console.log(error)
//   })
//   //2.2响应拦截
//   instance.interceptors.response.use(res => {
//     return res.data
//   }, error => {
//     // 响应错误处理
//     // console.log(error)
//   })
//   // 发送真正的网络请求
//   return instance(config)
//
// }

import axios from 'axios';
const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  // easy-mock服务挂了，暂时不使用了
  // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
  baseURL: "http://8.140.21.128:8447",
  // baseURL: "http://192.168.8.101:8447",
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    } else {
      Promise.reject();
    }
  },
  error => {
    console.log(error);
    return Promise.reject();
  }
);

export default service;
