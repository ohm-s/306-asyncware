import { Middleware, ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa';

/**
 * Default health middleware
 * @param req
 * @param res
 * @param next
 */
const healthMiddleware = (
  healthCheckCallback: () => boolean,
): Middleware<ParameterizedContext<DefaultState, DefaultContext>> => {
  return async (context, next) => {
    if (context.req.url === '/health') {
      if (healthCheckCallback()) {
        context.status = 200;
        context.body = JSON.stringify({ status: 'ok' });
      } else {
        context.status = 500;
        context.body = JSON.stringify({ status: 'failed' });
      }
    } else {
      await next();
    }
  };
};

export default healthMiddleware;
