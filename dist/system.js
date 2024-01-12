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
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan")); // Morgan middleware
//const vtrouter = require('./routes/vtuber.routes.js');
const myCustomFormat = require('./settings');
const versions = require('./lib_info');
const colorette_1 = require("colorette");
// const main_routes = require('./routes/api.routes.js');
// const { authrouter } = require('./routes/jwt.routes.js');
// const assets = require('./routes/assets.routes.js');
// const covers = require('./routes/cover.routes.js');
//const cheerio = require('cheerio');
const dotenv_1 = require("dotenv");
//const fs = require('fs');
(0, dotenv_1.config)();
const sequelize_1 = __importDefault(require("./database/sequelize"));
//const VTuber = require('./models/VTuber.js');
//const Hashtag = require('./models/Hashtag.js');
//const Song = require('./models/Song.js');
//const Social = require('./models/Social.js');
require('./models/VTuber');
require('./models/Hashtag');
require('./models/Social');
require('./models/Song');
require('./models/File');
require('./models/User');
require('./models/Cover');
require('./models/OriginalSong');
const PORT = process.env.PORT || 3000;
const apli = (0, express_1.default)();
apli.use(express_1.default.json());
apli.use((0, morgan_1.default)(myCustomFormat));
apli.set('view engine', 'ejs');
apli.set('views', path_1.default.join(__dirname, 'views'));
apli.use(express_1.default.static('./views/public'));
/* apli.use('/api', vtrouter);
apli.use('/api', main_routes);
apli.use('/api/assets', assets);
apli.use('/api/auth', authrouter);
apli.use('/api/cover', covers); */
/*
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

 apli.get('/', async (req, res) => {
    try {
        const vtList = 6;
        const vtubers = await VTuber.findAll({
            include: [
                { model: Hashtag, attributes: ['general', 'stream', 'fanart', 'memes']},
                { model: Song,    attributes: ['id', 'name', 'album', 'releasedate', 'compositor', 'mixing', 'lyrics']},
                { model: Social,  attributes: ['id', 'application', 'socialurl']}
            ]
        });
        if (vtubers.length < vtList) {
            return res.status(400).json({ error: 'Not enough vtubers available' });
        }
        const randomVT = shuffleArray(vtubers, vtList);
        return res.render('index', { vtlst: randomVT, title: 'IdolAPI'});
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

apli.get('/docs', (req, res) => {
    const mdfile = fs.readFileSync('views/mdxs/documentation.mdx', 'utf-8');
    const $ = cheerio.load(marked(mdfile));
    const headers = [];

    $(':header:not([id])').each((index, element) => {
        $(element).attr('id', $(element).text().toLowerCase().replace(/\s+/g, '-'));
    });

    $(':header').each((index, element) => {
        const id = $(element).attr('id');
        const text = $(element).text();
        headers.push({ id, text });
    });
    return res.render('docs', { title: 'Documentation - IdolAPI', doc: $.html(), headers });
});
apli.get('/about', (req, res) => {
    const mdfile = fs.readFileSync('views/mdxs/about.mdx', 'utf-8');
    const markdownContent = marked(mdfile);
    return res.render('about', { title: 'About this project - IdolAPI', about: markdownContent });
});
apli.get('/support-us', (req, res) => {
    const mdfile = fs.readFileSync('views/mdxs/support.mdx', 'utf-8');
    const markdownContent = marked(mdfile);
    return res.render('support', { title: 'Support us - IdolAPI', support: markdownContent  });
});
apli.get('/code-of-conduct', (req, res) => {
    const mdfile = fs.readFileSync('views/mdxs/conduct.mdx', 'utf-8');
    const $ = cheerio.load(marked(mdfile));
    const headers = [];

    $(':header:not([id])').each((index, element) => {
        $(element).attr('id', $(element).text().toLowerCase().replace(/\s+/g, '-'));
    });

    $(':header').each((index, element) => {
        const id = $(element).attr('id');
        const text = $(element).text();
        headers.push({ id, text });
    });
    return res.render('conduct', { title: 'Code of conduct - IdolAPI', code: $.html(), headers });
}); */
apli.get('*', (_req, res) => {
    return res.status(503).render('503');
});
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield versions();
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
;
process.on('SIGINT', () => {
    console.log(`[${(0, colorette_1.greenBright)('INFO')}]\t Server ${(0, colorette_1.redBright)('Terminated!')}\n` +
        `[${(0, colorette_1.greenBright)('INFO')}]\t Have a nice day!\n`);
    // eslint-disable-next-line no-process-exit
    process.exit();
});
initialize();
exports.default = apli;
