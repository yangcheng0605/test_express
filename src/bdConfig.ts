import ENV from './config'
import { Entities } from './modules'
export const BdConfig:any = {
    type: "mysql",
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    username: ENV.DB_USER_NAME,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_DATABASE,
    synchronize: false, //开启此按钮即可 设置为true
    dropSchema: false,
    logging: true,
    //logging: "all",
    connectTimeout: 10000,
    maxQueryExecutionTime: 1,
    // logger: new MyTypeormLogger(), // 自定义日志
    entities: Entities,
    // cache: true
  };
  