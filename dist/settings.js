"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colorette_1 = require("colorette");
const http_1 = __importDefault(require("http"));
const myCustomFormat = (tokens, req, res) => {
    const status = tokens.status(req, res);
    const statusdesc = http_1.default.STATUS_CODES[status] || 'Unknown';
    const colorizedStatus = parseInt(status) >= 500 ? `\x1b[31m${status} ${statusdesc}\x1b[0m` :
        parseInt(status) >= 400 ? `\x1b[33m${status} ${statusdesc}\x1b[0m` :
            parseInt(status) >= 300 ? `\x1b[36m${status} ${statusdesc}\x1b[0m` :
                `\x1b[32m${status} ${statusdesc}\x1b[0m`;
    return [
        `[${(0, colorette_1.cyan)('INFO')}]\t`,
        (0, colorette_1.whiteBright)(`"${tokens.method(req, res)} ${tokens.url(req, res)}"`),
        '-', (0, colorette_1.bold)(colorizedStatus),
        tokens.res(req, res, 'content-length'), '-',
        `${(0, colorette_1.yellowBright)(tokens['response-time'](req, res))}`, 'ms',
    ].join(' ');
};
exports.default = myCustomFormat;
