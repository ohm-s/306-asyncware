import { Middleware, ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa';
import BoltLogger from '306-boltlogger';

class Reject {
  private constructor() {}
  private static _instance: Reject;
  public static instance() {
    if (!this._instance) {
      this._instance = new Reject();
    }
    return this._instance;
  }
}

/**
 * Default health middleware
 * @param req
 * @param res
 * @param next
 */
const asyncMiddleware = (timeout: number): Middleware<ParameterizedContext<DefaultState, DefaultContext>> => {
  return async (ctx, next) => {
    await Promise.race([
      next(),
      new Promise((r) => {
        setTimeout(() => {
          r(Reject.instance());
        }, timeout);
      }),
    ])
      .then((e) => {
        if (e === Reject.instance()) {
          ctx.status = 410;
          ctx.body = JSON.stringify({ status: 'timeout' });
        }
      })
      .catch((e) => {
        (ctx.state.logger as BoltLogger).rawerror(e, {uri: ctx.req.url, headers: ctx.req.headers});
        ctx.status = 503;
        ctx.body = JSON.stringify({ status: 'timeout' });
      });
  };
};

export default asyncMiddleware;
