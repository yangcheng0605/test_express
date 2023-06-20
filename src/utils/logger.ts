/*
 * @Author: perry
 * @Date:   2018-03-15 10:18:01
 * @Last Modified by: perry
 * @Last Modified time: 2020-11-09 17:26:31
 */
// ENV.LOG_ENV 环境
// process.pid  进程id

import ENV from "../config";
const log4js = require("log4js");
const dayjs = require("dayjs");

// 进程
const processInstanceIdx = process.env.NODE_APP_INSTANCE === null ? 0 : process.env.NODE_APP_INSTANCE;

log4js.addLayout("dbjson", function(config: any) {
  return function(logEvent: any) {
    const params = {
      log_type: "callbot_service",
      app_type: "callbotAdminServer",
      env: ENV.serverDist ? ENV.serverDist : "shanghai",
      method: "",
      data_type: "mysql", //http|mysql|redis|api
      scheme: "",
      host: "",
      url: "",
      originalUrl: "",
      status_code: 0,
      req_body: "",
      rsp_body: "success",
      start_at: dayjs(logEvent.startTime).unix(),
      elapsed: logEvent.data[0] * 1,
      other: logEvent.data[1]
    };
    return JSON.stringify(params);
  };
});
log4js.configure({
  // 定义以怎样的方式输出，输出到哪里
  appenders: {
    out: { type: "stdout" },
    everything: {
      type: "dateFile",
      filename: `logs/all-the-logs.log`,
      maxLogSize: 33554432,
      backups: 30,
      pattern: ".yyyy-MM-dd",
      compress: true,
      daysToKeep: 10
    },
    BadRequestError: {
      type: "dateFile",
      filename: "logs/request-bad-logs.log",
      maxLogSize: 33554432,
      backups: 30,
      pattern: ".yyyy-MM-dd",
      compress: true,
      daysToKeep: 10
    },
    QueryFailedError: {
      type: "dateFile",
      filename: "logs/query-failed-logs.log",
      maxLogSize: 33554432,
      backups: 30,
      pattern: ".yyyy-MM-dd",
      compress: true,
      daysToKeep: 10
    },
    apiResponseTime: {
      type: "dateFile",
      filename: `logs/http.log`,
      maxLogSize: 33554432,
      backups: 30,
      pattern: ".yyyy-MM-dd",
      compress: true,
      daysToKeep: 10
    },
    apiRequestOther: {
      type: "dateFile",
      filename: `logs/api.log`,
      maxLogSize: 33554432,
      backups: 30,
      pattern: ".yyyy-MM-dd",
      compress: true,
      daysToKeep: 10
    },
    slowQueryTime: {
      type: "file",
      filename: `logs/query_slow.log`,
      maxLogSize: 33554432,
      backups: 30,
      compress: true,
      daysToKeep: 10
      // layout: { type: "dbjson", separator: "," }
    },
    errorQueryTime: {
      type: "file",
      filename: `logs/query_error_${dayjs().format("YYYYMMDD")}.log`,
      maxLogSize: 33554432,
      backups: 30,
      compress: true,
      daysToKeep: 10
      // layout: { type: "dbjson", separator: "," }
    },
    logicError: {
      type: "dateFile",
      filename: "logs/logicError.log",
      pattern: ".yyyy-MM-dd",
      compress: true,
      daysToKeep: 10
    },
    db: {
      type: "dateFile",
      filename: "logs/db-logs.log",
      maxLogSize: 33554432,
      backups: 30,
      pattern: ".yyyy-MM-dd",
      compress: true,
      daysToKeep: 10
    },
    ServiceRequestError: {
      type: "dateFile",
      filename: "logs/service-error-logs.log",
      pattern: ".yyyy-MM-dd",
      compress: true,
      daysToKeep: 10
    },
    QueueTask: {
      type: "dateFile",
      filename: "logs/QueueTask.log",
      maxLogSize: 33554432,
      backups: 30,
      pattern: ".yyyy-MM-dd",
      compress: true,
      daysToKeep: 10
    },
    redis: {
      type: "dateFile",
      filename: "logs/redis-logs.log",
      maxLogSize: 33554432,
      pattern: ".yyyy-MM-dd",
      compress: true,
      daysToKeep: 10
    },
    alert: {
      type: "dateFile",
      filename: "logs/alert.log",
      maxLogSize: 33554432,
      pattern: ".yyyy-MM-dd",
      compress: true,
      daysToKeep: 10
    }
    // redis:
    //   ENV.DB_CACHE_REDIS_OPEN * 1
    //     ? {
    //         type: "@log4js-node/redis",
    //         host: ENV.DB_CACHE_REDIS_HOST,
    //         port: ENV.DB_CACHE_REDIS_PORT,
    //         pass: ENV.DB_CACHE_REDIS_PASSWORD,
    //         channel: "q_log",
    //         layout: {
    //           type: "pattern",
    //           pattern: "%d{yyyy-MM-dd-hh:mm:ss hh:mm:ss:SSS}#%p#%m"
    //         }
    //       }
    //     : {
    //         type: "dateFile",
    //         filename: "logs/redis-logs.log",
    //         pattern: ".yyyy-MM-dd-hh:mm:ss",
    //         compress: true
    //       }
  },
  // 定义日志输出的规则然后调用之前定义好的 appenders 进行输出  输出等级均为 debug
  categories: {
    default: {
      appenders: ["everything"],
      level: "DEBUG"
    },
    db: {
      appenders: ["db"],
      level: "DEBUG"
    },
    redis: {
      appenders: ["redis"],
      level: "DEBUG"
    },
    alert: {
      appenders: ["alert"],
      level: "DEBUG"
    },
    QueryFailedError: {
      appenders: ["QueryFailedError"],
      level: "DEBUG"
    },
    BadRequestError: {
      appenders: ["BadRequestError"],
      level: "DEBUG"
    },
    apiResponseTime: {
      appenders: ["apiResponseTime"],
      level: "DEBUG"
    },
    apiRequestOther: {
      appenders: ["apiRequestOther"],
      level: "DEBUG"
    },
    logicError: {
      appenders: ["logicError"],
      level: "DEBUG"
    },
    service: {
      appenders: ["ServiceRequestError"],
      level: "DEBUG"
    },
    slowQuery: {
      appenders: ["slowQueryTime"],
      level: "DEBUG"
    },
    errorQuery: {
      appenders: ["errorQueryTime"],
      level: "DEBUG"
    },
    QueueTask: {
      appenders: ["QueueTask"],
      level: "DEBUG"
    }
    // local: { appenders: ['app'], level: process.env.NODE_ENV == 'production' ? 'info' : 'debug' }
  },
  // pm2: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'test' ? true : false
  pm2: true,
  disableClustering: true
  // process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
  //   ? true
  //   : false
});

const Logger = function(name: string) {
  name = name || "";
  const logger = log4js.getLogger(name);
  return logger;
};

export default Logger;
