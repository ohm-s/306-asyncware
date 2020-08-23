import { Middleware, ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa';
import { callbackify } from 'util';

export type DefaultParameterizedContext = ParameterizedContext<ParameterizedContext<DefaultState, DefaultContext>, DefaultContext>;

type catchAllMiddlewareType =  (responseCode: number, responseBody: string, optionalCallback?: (ctx: any) => void) => Middleware<ParameterizedContext<DefaultState, DefaultContext>> ;
/**
 * A default response when a router is not available
 * @param req
 * @param res
 * @param next
 */
const catchAllMiddleware: catchAllMiddlewareType = (responseCode: number, responseBody: string, optionalCallback?: (ctx: DefaultParameterizedContext) => void)  => {
  return async (context, next) => {
    context.status = responseCode;
    context.body = responseBody;
    if(optionalCallback) {
      optionalCallback(context);
    }      
  };
}  


export default catchAllMiddleware;
