import { Middleware, ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa';

/**
 * A simple middleware to mark an aborted request
 * @param req
 * @param res
 * @param next
 */
const httpAbortMiddleware: Middleware<ParameterizedContext<DefaultState, DefaultContext>> = async (context, next) => {
  context.req.on('close', () => {
    context.state.requestAborted = true;
  });
  await next();
};

export default httpAbortMiddleware;
