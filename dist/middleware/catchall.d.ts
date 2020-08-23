import { Middleware, ParameterizedContext, DefaultState, DefaultContext } from 'koa';
export declare type DefaultParameterizedContext = ParameterizedContext<ParameterizedContext<DefaultState, DefaultContext>, DefaultContext>;
declare type catchAllMiddlewareType = (responseCode: number, responseBody: string, optionalCallback?: (ctx: any) => void) => Middleware<ParameterizedContext<DefaultState, DefaultContext>>;
/**
 * A default response when a router is not available
 * @param req
 * @param res
 * @param next
 */
declare const catchAllMiddleware: catchAllMiddlewareType;
export default catchAllMiddleware;
