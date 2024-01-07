const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
	dialect: 'postgres',
	database: process.env.POSTGRES_DB,
	username: process.env.POSTGRES_USER, 
	password: process.env.POSTGRES_PASS, 
	host: process.env.POSTGRES_HOST,
	port: parseInt(process.env.POSTGRES_PORT),
	logging: false
});

module.exports = sequelize;