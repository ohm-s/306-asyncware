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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
/**
 * Express middleware to check CORS
 * N.B. use ".example.tld"
 * @param allowedSuffixHosts
 */
const optionsMiddleware = (match) => {
    return (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { req, res } = ctx;
        if (req.method === 'OPTIONS') {
            const origin = req.headers.origin || 'http://localhost';
            const parts = url_1.default.parse(origin);
            if (parts.host) {
                let sent = false;
                if (!match || match.test(parts.host)) {
                    ctx.status = 200;
                    res.setHeader('Access-Control-Allow-Credentials', 'true');
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
                    res.setHeader('Access-Control-Allow-Origin', parts.host);
                    res.setHeader('Access-Control-Allow-Credentials', 'true');
                    res.write(JSON.stringify({ status: 'OK' }));
                    res.end();
                    sent = true;
                }
                if (!sent) {
                    ctx.status = 400;
                    ctx.body = JSON.stringify({ status: 'rejected' });
                }
            }
            else {
                ctx.status = 400;
                ctx.body = JSON.stringify({ status: 'rejected' });
            }
        }
        else {
            yield next();
        }
    });
};
exports.default = optionsMiddleware;
