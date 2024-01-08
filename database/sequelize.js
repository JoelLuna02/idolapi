const { Sequelize } = require('sequelize');
const pg = require('pg');
require('dotenv').config();

const sequelize = new Sequelize({
	dialect: 'postgres',
	protocol: 'postgres',
	database: process.env.POSTGRES_DATABASE,
	username: process.env.POSTGRES_USER, 
	password: process.env.POSTGRES_PASSWORD, 
	host: process.env.POSTGRES_HOST,
	port: parseInt(process.env.POSTGRES_PORT) || 5432,
	dialectOptions: {
		ssl: { require: true }
	},
	dialectModule: pg,
	logging: false,
});

module.exports = sequelize;