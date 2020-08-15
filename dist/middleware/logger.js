"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Add BoltLogger as property in response locals
 * Removes express header
 * @param logger
 */
const loggerMiddleware = (logger) => {
    return (ctx, next) => {
        ctx.res.removeHeader('X-Powered-By');
        logger.log({ url: ctx.req.url, headers: ctx.req.rawHeaders });
        ctx.state.logger = logger;
        next();
    };
};
exports.default = loggerMiddleware;
