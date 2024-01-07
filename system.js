const express = require('express'); // Express.JS

const morgan = require('morgan'); // Morgan middleware
const vtrouter = require('./routes/vtuber.routes.js');
const myCustomFormat = require('./settings.js');
const { bold, whiteBright, green, greenBright, redBright, magentaBright } = require('colorette');
const agencyRoutes = require('./routes/agency.routes.js');
const main_routes = require('./routes/api.routes.js');
const { authrouter } = require('./routes/jwt.routes.js');
const assets = require('./routes/assets.routes.js');
const { marked } = require('marked');
// const cheerio = require('cheerio');
const highlight = require('highlight.js');
require('dotenv').config();
// const fs = require('fs');

const sequelize = require('./database/sequelize');
require('./models/VTuber.js');
require('./models/Hashtag.js');
require('./models/Social.js');
require('./models/Song.js');
require('./models/File.js');
require('./models/User.js');

const PORT = process.env.PORT || 3000;
const startTime = new Date();
const apli = express();
apli.use(express.json());

apli.use(morgan(myCustomFormat));


apli.set('view engine', 'ejs');
apli.set('views', __dirname + '/views');

apli.use('/api', vtrouter);
apli.use('/api', main_routes);
apli.use('/api', agencyRoutes);
apli.use('/api/assets', assets);
apli.use('/api/auth', authrouter);


marked.setOptions({
	highlight: function (code, language) {
		const validLanguage = highlight.getLanguage(language) ? language : 'plaintext';
		return highlight.highlight(validLanguage, code).value;
	},
	renderer: new marked.Renderer()
});

apli.get('*', (req, res) => {
	return res.status(503).send(
		'<title>IdolAPI under maintenance</title>\n' +
		'<h1>IdolAPI under maintenance</h1><hr>' +
		'We are sorry, but IdolAPI is temporarily down for maintenance.'
	);
});

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
		return res.render('index', { vtlst: randomVT, title: 'IdolAPI', analytics });
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
});

apli.get('/docs', (req, res) => {
	const mdfile = fs.readFileSync('views/mdxs/documentation.md', 'utf-8');
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
	const mdfile = fs.readFileSync('views/mdxs/about.md', 'utf-8');
	const markdownContent = marked(mdfile);
	return res.render('about', { title: 'About this project - IdolAPI', about: markdownContent });
});
apli.get('/support-us', (req, res) => {
	const mdfile = fs.readFileSync('views/mdxs/support.md', 'utf-8');
	const markdownContent = marked(mdfile);
	return res.render('support', { title: 'Support us - IdolAPI', support: markdownContent  });
});
apli.get('/code-of-conduct', (req, res) => {
	const mdfile = fs.readFileSync('views/mdxs/conduct.md', 'utf-8');
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

const initialize = async () => {
	try {
		await sequelize.sync();
		console.log(`\n${greenBright('[INFO]')}:\t ${green('Sucess!')} Connection has been established successfully`);
		apli.listen(PORT, (err) => {
			if (err) { console.error(err); }
			console.log(`${greenBright('[INFO]')}:\t Server listening on ${bold(whiteBright(`http://localhost:${PORT}`))}`);
		}); 
	} catch (error) {
		console.error(error);
	}
};

process.on('SIGINT', () => {
	const endTime = new Date();
	const executionTime = endTime - startTime;
	console.log(
		`${greenBright('[INFO]')}:\t Server ${redBright('Terminated!')}\n`+
		`${greenBright('[INFO]')}:\t Execution time: ${magentaBright(executionTime)} ms\n`+
		`${greenBright('[INFO]')}:\t Have a nice day!\n`
	);
	// eslint-disable-next-line no-process-exit
	process.exit();
});

initialize();
module.exports = apli;
