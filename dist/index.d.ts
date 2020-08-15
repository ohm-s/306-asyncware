import httpAbortMiddleware from './middleware/abort';
import healthMiddleware from './middleware/health';
import loggerMiddleware from './middleware/logger';
import optionsMiddleware from './middleware/options';
import asyncMiddleware from './middleware/async';
import BoltLogger from '306-boltlogger';
/**
 * An interface of possibly define locals in express
 * if the middleware are added to the express call chain
 */
interface CommonLocals {
    logger?: BoltLogger;
    requestAborted?: boolean;
}
export { httpAbortMiddleware, healthMiddleware, loggerMiddleware, optionsMiddleware, asyncMiddleware, CommonLocals };
