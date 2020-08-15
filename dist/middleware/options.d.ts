import { Middleware, ParameterizedContext, DefaultState, DefaultContext } from 'koa';
/**
 * Express middleware to check CORS
 * N.B. use ".example.tld"
 * @param allowedSuffixHosts
 */
declare const optionsMiddleware: (match?: RegExp | undefined) => Middleware<ParameterizedContext<DefaultState, DefaultContext>>;
export default optionsMiddleware;
