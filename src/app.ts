import 'reflect-metadata'
import * as express from "express";
import { Server } from "http";
import { createExpressServer, useExpressServer } from 'routing-controllers'
import { UserController } from './modules/users/controller'
import helmet from "helmet";  // 设置 HTTP 响应标头帮助保护 Express 应用程序
import * as bodyParser from "body-parser"; // 解析中间件
import { ApiController } from "./modules";
import { createConnection, Connection } from "typeorm";
import { BdConfig } from "./bdConfig";
class App  {
  public port = process.env.PORT || 5555;
  public app
  public server
  public connection:any
  constructor() {
    this.app = express();
    this.app.use(helmet());
    this.app.use(bodyParser.json({ limit: "200mb" }))  // 控制最大请求正文大小
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.createConnection()
    useExpressServer(this.app, {
      // 在routing-controllers注册已创建的express服务
      defaultErrorHandler: false,
      cors: {
        origin: "*",
        allowedHeaders: [
          "content-type",
          "x-access-token",
          "accept-language",
          "x-requested-with"
        ],
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 600 //10分钟
      },
      controllers: ApiController, // 配置(控制器，校验器等)
      // middlewares: this.middleware(), // 中间件
      // routePrefix: "/api", // 全局路由
    });
    this.server = this.app.listen(this.port) 
    console.log('server run on localhost:', this.port)
  }
  // 连接数据库
  private createConnection() {
    createConnection(BdConfig).then(async res=>{
      console.log("Connected to DB");
      this.connection = res;
    })
  }
}

export default new App();

