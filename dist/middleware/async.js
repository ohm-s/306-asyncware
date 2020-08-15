"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Reject {
    constructor() { }
    static instance() {
        if (!this._instance) {
            this._instance = new Reject();
        }
        return this._instance;
    }
}
/**
 * Default health middleware
 * @param req
 * @param res
 * @param next
 */
const asyncMiddleware = (timeout) => {
    return (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.race([
            next(),
            new Promise((r) => {
                setTimeout(() => {
                    r(Reject.instance());
                }, timeout);
            }),
        ])
            .then((e) => {
            if (e === Reject.instance()) {
                ctx.status = 410;
                ctx.body = JSON.stringify({ status: 'timeout' });
            }
        })
            .catch((e) => {
            ctx.state.logger.rawerror(e, { uri: ctx.req.url, headers: ctx.req.headers });
            ctx.status = 503;
            ctx.body = JSON.stringify({ status: 'timeout' });
        });
    });
};
exports.default = asyncMiddleware;
