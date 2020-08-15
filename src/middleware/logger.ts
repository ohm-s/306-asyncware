import { Middleware, ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa';
import  BoltLogger from '306-boltlogger';

/**
 * Add BoltLogger as property in response locals
 * Removes express header
 * @param logger
 */
const loggerMiddleware = (logger: BoltLogger): Middleware<ParameterizedContext<DefaultState, DefaultContext>> => {
  return (ctx, next) => {
    ctx.res.removeHeader('X-Powered-By');
    logger.log({ url: ctx.req.url, headers: ctx.req.rawHeaders });
    ctx.state.logger = logger;
    next();
  };
};

export default loggerMiddleware;
