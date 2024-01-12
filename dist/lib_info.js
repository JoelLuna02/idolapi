var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { magentaBright, greenBright, cyanBright } = require('colorette');
const ver_express = require('express/package').version;
const ver_project = require('../package').version;
const os = require('os');
const platform = os.platform();
function versions() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[${magentaBright('START')}]` +
            `\n[${magentaBright('START')}]\t Express.js Version: ${greenBright(ver_express)}` +
            `\n[${magentaBright('START')}]\t IdolAPI Version: ${greenBright(ver_project)}`);
        switch (platform) {
            case 'win32':
                console.log(`[${magentaBright('START')}]\t Running on ${cyanBright('Windows')}`);
                break;
            case 'linux':
                console.log(`[${magentaBright('START')}]\t Running on ${'Linux'}`);
                break;
            case 'darwin':
                console.log(`[${magentaBright('START')}]\t Running on ${'MacOS'}`);
                break;
            case 'android':
                console.log(`[${magentaBright('START')}]\t Running on ${greenBright('Android')}`);
                break;
        }
        console.log(`[${magentaBright('START')}]`);
    });
}
;
module.exports = versions;
