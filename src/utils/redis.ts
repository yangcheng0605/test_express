import ENV from "../config";
const dayjs = require("dayjs");
const redis = require("redis");
const { promisify } = require("util");
const password = ENV.DB_CACHE_REDIS_PASSWORD;

class Redis {
  constructor() {
    // this.init();
  }
  init() {
    const subscriber = redis.createClient(
      ENV.DB_CACHE_REDIS_PORT,
      ENV.DB_CACHE_REDIS_HOST
    );
    subscriber.auth(password);
    const publisher = redis.createClient(
      ENV.DB_CACHE_REDIS_PORT,
      ENV.DB_CACHE_REDIS_HOST,
      { db: ENV.DB_CACHE_REDIS_DB }
    );
    publisher.auth(password);

    // if you'd like to select database 3, instead of 0 (default), call
    // client.select(3, function() {
    //   /* ... */
    // });
    const timeD = dayjs().format("YYYYMMDD");
    subscriber.on("connect", function() {
      subscriber.subscribe("q_log");
    });
    subscriber.on("message", function(channel: any, message: any) {
      const key = `callbot_operation_logs${timeD}`;
      publisher.expire(key, ENV.DB_CACHE_REDIS_EXPIRE);
      publisher.LPUSH(key, message);
      if (message == "demo") {
        subscriber.publish("demo", "demo msg");
      }
      if (message == "quit1") {
        subscriber.unsubscribe("channel");
        // client2.quite();
      }
    });

    subscriber.on("error", function(err: any) {});
  }
  getInstanceClient() {
    const client = redis.createClient(
      ENV.DB_CACHE_REDIS_PORT,
      ENV.DB_CACHE_REDIS_HOST
    );
    client.auth(password);
    return client;
  }
  getAsync(client: any) {
    const getAsync = promisify(client.get).bind(client);
    return getAsync;
  }
  setAsync(client: any) {
    const setAsync = promisify(client.set).bind(client);
    return setAsync;
  }
}

export default new Redis();
