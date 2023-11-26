/* eslint-disable camelcase */
const express = require('express'); // Express.JS

const morgan = require('morgan'); // Morgan middleware
const prisma = require('./prisma/database.js');
const vtrouter = require('./routes/vtuber.routes.js');
const agencyRoutes = require('./routes/agency.routes.js');
const main_routes = require('./routes/api.routes.js');
const { authrouter } = require('./routes/jwt.routes.js');
const gradient = require('gradient-string');
const figlet = require('figlet');
const assets = require('./routes/assets.routes.js');

const PORT = process.env.PORT || 3000;

const apli = express();
apli.use(express.json());
apli.use(morgan('dev'));

apli.set('view engine', 'ejs');
apli.set('views', __dirname + '/views');

apli.use('/api', vtrouter);
apli.use('/api', main_routes);
apli.use('/api', agencyRoutes);
apli.use('/api/assets', assets);
apli.use('/api/auth', authrouter);
apli.use(express.static('public'));
apli.use('/favicon.ico', express.static('public/favicon.ico'));

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
		const vtubers = await prisma.vTuber.findMany({
			include: {
				hashtag: { select: { general: true, stream: true, fanart: true, memes: true } },
				songs: { select: { id: true, name: true, album: true, releasedate: true, compositor: true, lyrics: true, mixing: true } },
				social: { select: { id: true, application: true, socialurl: true } }
			}
		});
		if (vtubers.length < vtList) {
			return res.status(400).json({ error: 'Not enough vtubers available' });
		}
		const randomVT = shuffleArray(vtubers, vtList);
		return res.render('index', { vtlst: randomVT, title: 'IdolAPI' });
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
});

apli.get('/docs', (req, res) => {
	return res.render('docs', { title: 'Documentation - IdolAPI' });
});
apli.get('/about', (req, res) => {
	return res.render('about', { title: 'About this project - IdolAPI' });
});
apli.get('/support-us', (req, res) => {
	return res.render('support', { title: 'Support us - IdolAPI' });
});

apli.listen(PORT, () => {
	const banner = figlet.textSync(' IdolAPI', { font: 'Colossal' });
	const info = '\n Server listening in ';
	console.log(
		gradient.fruit('\n' + banner + '\n\t\t A fanmade RESTful API based in Idol\n'),
		'\n Express.js Version: ' + gradient.cristal('4.18.2'),
		'\n IdolAPI Version: ' + gradient.summer('BETA 0.5.1'),
		info + gradient(['#00ff00', '#00ff00'])(`http://localhost:${PORT}`)
	);
});

module.exports = apli;
