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
const express_1 = __importDefault(require("express")); // Express.JS
const morgan_1 = __importDefault(require("morgan")); // Morgan middleware
const vtuber_routes_1 = __importDefault(require("./routes/vtuber.routes"));
const settings_1 = __importDefault(require("./settings"));
const lib_info_1 = __importDefault(require("./lib_info"));
const colorette_1 = require("colorette");
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const jwt_routes_1 = require("./routes/jwt.routes");
const assets_routes_1 = __importDefault(require("./routes/assets.routes"));
const cover_routes_1 = __importDefault(require("./routes/cover.routes"));
//const cheerio = require('cheerio');
const dotenv_1 = require("dotenv");
//const fs = require('fs');
(0, dotenv_1.config)();
const sequelize_1 = __importDefault(require("./database/sequelize"));
//const VTuber = require('./models/VTuber.js');
//const Hashtag = require('./models/Hashtag.js');
//const Song = require('./models/Song.js');
//const Social = require('./models/Social.js');
require("./models/VTuber");
require("./models/Hashtag");
require("./models/Social");
require("./models/Song");
require("./models/File");
require("./models/User");
require("./models/Cover");
require("./models/OriginalSong");
const path_1 = __importDefault(require("path"));
const Cover_1 = __importDefault(require("./models/Cover"));
const VTuber_1 = __importDefault(require("./models/VTuber"));
const Song_1 = __importDefault(require("./models/Song"));
const PORT = process.env.PORT || 3000;
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, lib_info_1.default)();
        if (process.env.NODE_ENV) {
            console.log(`[${(0, colorette_1.greenBright)('INFO')}]\t Starting server in ${(0, colorette_1.redBright)('Production')} mode...`);
        }
        else {
            console.log(`[${(0, colorette_1.greenBright)('INFO')}]\t Starting server in ${(0, colorette_1.yellowBright)('Developer')} mode...`);
        }
        try {
            yield sequelize_1.default.sync();
            console.log(`[${(0, colorette_1.greenBright)('INFO')}]\t ${(0, colorette_1.green)('Sucess!')} Connection has been established successfully`);
            apli.listen(PORT, () => {
                console.log(`[${(0, colorette_1.greenBright)('INFO')}]\t Server listening on ${(0, colorette_1.bold)((0, colorette_1.whiteBright)(`http://localhost:${PORT}`))}`);
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
process.on('SIGINT', () => {
    console.log(`[${(0, colorette_1.greenBright)('INFO')}]\t Server ${(0, colorette_1.redBright)('Terminated!')}\n` +
        `[${(0, colorette_1.greenBright)('INFO')}]\t Have a nice day!\n`);
    // eslint-disable-next-line no-process-exit
    process.exit();
});
const apli = (0, express_1.default)();
apli.use(express_1.default.json());
apli.use((0, morgan_1.default)(settings_1.default));
apli.use('/api/auth', jwt_routes_1.authrouter);
apli.use('/api/assets', assets_routes_1.default);
apli.use('/api', vtuber_routes_1.default);
apli.use('/api/cover', cover_routes_1.default);
apli.use('/api', api_routes_1.default);
apli.set('view engine', 'ejs');
apli.set('views', path_1.default.join(__dirname, 'views'));
apli.use('/static', express_1.default.static(path_1.default.join(__dirname, 'views', 'public')));
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffleArray(array, numb) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, numb);
}
apli.all('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vtList = 6;
    const covers = yield Cover_1.default.findAll();
    const vtubers = yield VTuber_1.default.findAll();
    const randomVT = shuffleArray(vtubers, vtList);
    const songs = yield Song_1.default.findAll();
    return res.status(200).render('index', {
        title: "Comming soon...",
        listcovers: covers, listvt: vtubers,
        listsongs: songs, sixvt: randomVT
    });
}));
initialize();
exports.default = apli;
