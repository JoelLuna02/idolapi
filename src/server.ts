import express, {Express, Request, Response} from 'express'; // Express.JS

import morgan from 'morgan'; // Morgan middleware
import vtrouter from './routes/vtuber.routes';
import myCustomFormat from './settings';
import versions from './lib_info';
import { bold, whiteBright, green, greenBright, redBright, yellowBright } from 'colorette';
import main_routes from './routes/api.routes';
import { authrouter } from './routes/jwt.routes';
import assets from './routes/assets.routes';
import covers from './routes/cover.routes';
//const cheerio = require('cheerio');
import { config } from 'dotenv';
//const fs = require('fs');
config();

import sequelize from './database/sequelize';
//const VTuber = require('./models/VTuber.js');
//const Hashtag = require('./models/Hashtag.js');
//const Song = require('./models/Song.js');
//const Social = require('./models/Social.js');
import './models/VTuber';
import './models/Hashtag';
import './models/Social';	
import './models/Song';
import './models/File';
import './models/User';
import './models/Cover';
import './models/OriginalSong';
import path from 'path';
import Cover from './models/Cover';
import VTuber from './models/VTuber';
import Song from './models/Song';

const PORT = process.env.PORT || 3000;

async function initialize(): Promise<void> {
	await versions();
	if (process.env.NODE_ENV) {
		console.log(`[${greenBright('INFO')}]\t Starting server in ${redBright('Production')} mode...`);
	} else {
		console.log(`[${greenBright('INFO')}]\t Starting server in ${yellowBright('Developer')} mode...`);
	}
	try {
		await sequelize.sync();
		console.log(`[${greenBright('INFO')}]\t ${green('Sucess!')} Connection has been established successfully`);
		apli.listen(PORT, () =>{
			console.log(`[${greenBright('INFO')}]\t Server listening on ${bold(whiteBright(`http://localhost:${PORT}`))}`);
		}); 
	} catch (error) {
		console.error(error);
	}
}

process.on('SIGINT', () => {
	console.log(
		`[${greenBright('INFO')}]\t Server ${redBright('Terminated!')}\n`+
		`[${greenBright('INFO')}]\t Have a nice day!\n`
	);
	// eslint-disable-next-line no-process-exit
	process.exit();
});

const apli: Express = express();
apli.use(express.json());
apli.use(morgan(myCustomFormat));
apli.use('/api/auth', authrouter);
apli.use('/api/assets', assets);
apli.use('/api', vtrouter);
apli.use('/api/cover', covers);
apli.use('/api', main_routes);
apli.set('view engine', 'ejs');
apli.set('views', path.join(__dirname, 'views'));
apli.use('/static', express.static(path.join(__dirname, 'views','public')));

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

apli.all('/', async (req: Request, res: Response) => {
	const vtList = 6;
	const covers = await Cover.findAll();
	const vtubers = await VTuber.findAll();
	const randomVT = shuffleArray(vtubers, vtList);

	const songs = await Song.findAll();
	return res.status(200).render('index', {
		title: "Comming soon...", 
		listcovers: covers, listvt: vtubers,
		listsongs: songs, sixvt: randomVT
	});
});

initialize();

export default apli;
