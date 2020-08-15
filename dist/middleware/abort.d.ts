import { Middleware, ParameterizedContext, DefaultState, DefaultContext } from 'koa';
/**
 * A simple middleware to mark an aborted request
 * @param req
 * @param res
 * @param next
 */
declare const httpAbortMiddleware: Middleware<ParameterizedContext<DefaultState, DefaultContext>>;
export default httpAbortMiddleware;
