import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Request } from "express";
import Logger from "../libs/logger";
import ENV from "../config";
// import { labelsMethod } from "../utils/prom";

let getClientIp = function(req: Request) {
  const LoggerInstance = Logger("IP:");
  LoggerInstance.info("REQUEST:START========");
  LoggerInstance.info("x-forwarded-for    = " + req.header("x-forwarded-for")); // 各阶段ip的CSV, 最左侧的是原始ip
  LoggerInstance.info(
    "ips                          = " + JSON.stringify(req.ips)
  ); // 相当于(req.header('x-forwarded-for') || '').split(',')
  LoggerInstance.info("remote Address     = " + req.connection.remoteAddress); // 未发生代理时，请求的ip
  LoggerInstance.info("ip                            = " + req.ip); // 同req.connection.remoteAddress, 但是格式要好一些
  return "";
};

@Middleware({ type: "before" })
export class ResponseTimeMiddleware implements ExpressMiddlewareInterface {
  private logger: any;
  constructor() {
    this.logger = Logger("apiResponseTime");
  }
  use(request: any, response: any, next: (err?: any) => any): void {
    request._startTime = new Date().getTime(); // 获取时间 t1
    getClientIp(request);
    const calResponseTime = function(type: any) {
      let params, ignore= ['export','/scenes?','/scenes/language','/process/master']
      let now = new Date().getTime(); //获取时间 t2
      const deltaTime = now - request._startTime;
      if (type == 'finish') {
        if (ignore.findIndex(item => request.url.indexOf(item) != -1) != -1) {
          params = `[${request.method}] ${request.url}|${deltaTime * 1}ms|${response.statusCode}|${JSON.stringify(request.query) || JSON.stringify(request.params) || JSON.stringify(request.body)}`
        } else {
          params = `[${request.method}] ${request.url}|${deltaTime * 1}ms|${response.statusCode}|${JSON.stringify(request.query) || JSON.stringify(request.params) || JSON.stringify(request.body)}|${JSON.stringify(response.locals.data)}`
        }
        this.logger.info(params);
        this.logger.info("REQUEST:END========");
      }
      if (type == 'close') {
      }
    };

    response.once("finish", calResponseTime.bind(this, 'finish'));
    response.once("close", calResponseTime.bind(this,'close'));
    // console.log("do something...");
    // labelsMethod(request)
    next();
  }
}
