import * as rateLimit from "express-rate-limit";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";

@Middleware({ type: "before" })
export class RateLimiterMiddleware implements ExpressMiddlewareInterface {
  public use(request: any, response: any, next?: (err?: any) => any): any {
    const apiLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs,
      message:
        "Too many accounts created from this IP, please try again after an hour"
    });
    return apiLimiter(request, response, next);
  }
}
