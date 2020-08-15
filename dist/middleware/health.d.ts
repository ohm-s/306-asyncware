import { Middleware, ParameterizedContext, DefaultState, DefaultContext } from 'koa';
/**
 * Default health middleware
 * @param req
 * @param res
 * @param next
 */
declare const healthMiddleware: (healthCheckCallback: () => boolean) => Middleware<ParameterizedContext<DefaultState, DefaultContext>>;
export default healthMiddleware;
