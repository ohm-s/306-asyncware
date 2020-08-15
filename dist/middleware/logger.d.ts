import { Middleware, ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import BoltLogger from '306-boltlogger';
/**
 * Add BoltLogger as property in response locals
 * Removes express header
 * @param logger
 */
declare const loggerMiddleware: (logger: BoltLogger) => Middleware<ParameterizedContext<DefaultState, DefaultContext>>;
export default loggerMiddleware;
