/* eslint-disable camelcase */
const express = require('express'); // Express.JS

const morgan = require('morgan'); // Morgan middleware
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

apli.get('/', (req, res) => {
	// Renderizar la vista 'index.ejs'
	res.render('index', { title: 'Mi Aplicación' });
});

apli.listen(PORT, () => {
	const banner = figlet.textSync(' IdolAPI', { font: 'Colossal' });
	const info = '\n Server listening in ';
	console.log(
		gradient.fruit('\n' + banner + '\n\t\t A fanmade RESTful API based in Idol\n'),
		'\n Express.js Version: ' + gradient.cristal('4.18.2'),
		'\n IdolAPI Version: ' + gradient.summer('BETA 0.5.1'),
		info + gradient(['#00ff00', '#00ff00'])(`http://localhost:${PORT}`));
});

module.exports = apli;
