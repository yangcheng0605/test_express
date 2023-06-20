import Logger from "./logger";
const axios = require('axios');
import ID from "../libs/ids";
// Logger("apiRequestOther").info(params);
const path = require('path');

const http = axios.create({
    timeout: 10000, // 设置请求超时时间
  });
  
  http.interceptors.request.use((config:any) => {
    // 记录请求信息
    const requestStartTime = Date.now();
    config.metadata = { requestStartTime, params: JSON.stringify(config.params) || JSON.stringify(config.data) || '' }; // 将请求开始时间存入 metadata 属性中
    // Logger("apiRequestOther").info(`[${config.method.toUpperCase()}]|${config.url}|${JSON.stringify(config.params) || JSON.stringify(config.data) || ''}`);
    // Logger("apiRequestOther").info('request END========')
    return config;
  }, (error:any) => {
    // console.log(error)
    const params = error.config.metadata.params
    // 记录请求错误信息
    Logger("apiRequestOther").error(`[${error.config.method.toUpperCase()}] ${error.config.url}|${params||{}}|Error: ${error.message}`);
    Logger("apiRequestOther").error('request ERROR END========')
    return Promise.reject(error);
  });
  
  http.interceptors.response.use((response:any) => {
    // 记录请求结果信息
    const requestEndTime = Date.now();
    const requestDuration = requestEndTime - response.config.metadata.requestStartTime;
    const params = response.config.metadata.params
    Logger("apiRequestOther").info(`[${response.config.method.toUpperCase()}] ${response.config.url}|${requestDuration}ms|${response.status}|${params||{}}|${JSON.stringify(response.data)}`);
    Logger("apiRequestOther").info('response END========')
    return response;
  }, (error:any) => {
    // 记录请求错误信息
    const requestEndTime = Date.now();
    let requestDuration:any = '-'
    let params = ''
    // console.log(error)
    if (error.config && error.config.metadata) {
      requestDuration = requestEndTime - error.config.metadata.requestStartTime;
      params = error.config.metadata.params
      Logger("apiRequestOther").error(`[${error.config.method.toUpperCase()}] ${error.config.url}|${requestDuration}ms|Error: ${error.message}|${params||{}}|${JSON.stringify(error.response.data)}`);
    } else {
      Logger("apiRequestOther").error(error)
    }
    Logger("apiRequestOther").error('response ERROR END========')
    return Promise.reject(error);
  });
  
  // 导出 http 实例
  module.exports = http;