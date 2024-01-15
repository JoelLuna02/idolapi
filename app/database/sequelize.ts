import { Sequelize } from 'sequelize';
import pg from 'pg';
import { config } from 'dotenv';

config();

export const sequelize = new Sequelize({
	dialect: 'postgres',
	protocol: 'postgres',
	database: process.env.POSTGRES_DATABASE,
	username: process.env.POSTGRES_USER, 
	password: process.env.POSTGRES_PASSWORD, 
	host: process.env.POSTGRES_HOST,
	port: 5432, /*
	dialectOptions: {
		ssl: { require: true }
	}, */
	dialectModule: pg,
	logging: false,
});

export default sequelize;