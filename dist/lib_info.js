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
const colorette_1 = require("colorette");
const ver_express = require('express/package').version;
const ver_project = require('../package').version;
const os_1 = __importDefault(require("os"));
const platform = os_1.default.platform();
function versions() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[${(0, colorette_1.magentaBright)('START')}]` +
            `\n[${(0, colorette_1.magentaBright)('START')}]\t Express.js Version: ${(0, colorette_1.greenBright)(ver_express)}` +
            `\n[${(0, colorette_1.magentaBright)('START')}]\t IdolAPI Version: ${(0, colorette_1.greenBright)(ver_project)}`);
        switch (platform) {
            case 'win32':
                console.log(`[${(0, colorette_1.magentaBright)('START')}]\t Running on ${(0, colorette_1.cyanBright)('Windows')}`);
                break;
            case 'linux':
                console.log(`[${(0, colorette_1.magentaBright)('START')}]\t Running on ${'Linux'}`);
                break;
            case 'darwin':
                console.log(`[${(0, colorette_1.magentaBright)('START')}]\t Running on ${'MacOS'}`);
                break;
            case 'android':
                console.log(`[${(0, colorette_1.magentaBright)('START')}]\t Running on ${(0, colorette_1.greenBright)('Android')}`);
                break;
        }
        console.log(`[${(0, colorette_1.magentaBright)('START')}]`);
    });
}
;
exports.default = versions;
