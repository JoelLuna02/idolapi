import { renderToString } from 'react-dom/server';
import express, {Express, Request, Response} from 'express'; // Express.JS
import React from 'react';

import path from 'path';
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
config()

require('@babel/register')({
	presets: [
		'@babel/preset-react',
	  	['@babel/preset-typescript', { allExtensions: true }],
	],
});

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

const PORT = process.env.PORT || 3000;
const apli: Express = express();
apli.use(express.json());

apli.use(morgan(myCustomFormat));
apli.set('views', path.join(__dirname, 'views'));
apli.use(express.static(path.join(__dirname, "./views/public")));
apli.use('/api/auth', authrouter);
apli.use('/api/assets', assets);
apli.use('/api', vtrouter);
apli.use('/api/cover', covers);
apli.use('/api', main_routes);
apli.set('view engine','js');
apli.engine('js', (filePath: string, options: any, callback: Function) => {
	try {
		const component = require(filePath).default;
		const html = renderToString(React.createElement(component, options));
		return callback(null, html);
	} catch (error) {
		return callback(error);
	}
});

apli.get('/', (_req: Request, res: Response) => {
	res.status(200).render('Index');
});

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
};

process.on('SIGINT', () => {
	console.log(
		`[${greenBright('INFO')}]\t Server ${redBright('Terminated!')}\n`+
		`[${greenBright('INFO')}]\t Have a nice day!\n`
	);
	// eslint-disable-next-line no-process-exit
	process.exit();
});

initialize();
export default apli;
