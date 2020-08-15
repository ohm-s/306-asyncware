import { Middleware, ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa';

import url from 'url';

/**
 * Express middleware to check CORS
 * N.B. use ".example.tld"
 * @param allowedSuffixHosts
 */
const optionsMiddleware = (match?: RegExp): Middleware<ParameterizedContext<DefaultState, DefaultContext>> => {
  return async (ctx, next) => {
    const { req, res } = ctx;
    if (req.method === 'OPTIONS') {
      const origin = req.headers.origin || 'http://localhost';
      const parts = url.parse(origin);
      if (parts.host) {
        let sent = false;
        if (!match || match.test(parts.host)) {
          ctx.status = 200;
          res.setHeader('Access-Control-Allow-Credentials', 'true');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
          res.setHeader('Access-Control-Allow-Origin', parts.host!);
          res.setHeader('Access-Control-Allow-Credentials', 'true');
          res.write(JSON.stringify({ status: 'OK' }));
          res.end();
          sent = true;
        }
        if (!sent) {
          ctx.status = 400;
          ctx.body = JSON.stringify({ status: 'rejected' });
        }
      } else {
        ctx.status = 400;
        ctx.body = JSON.stringify({ status: 'rejected' });
      }
    } else {
      await next();
    }
  };
};

export default optionsMiddleware;
